const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();

function readModule(filename) {
  filename = path.resolve(filename);
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const localRequire = name => name.startsWith('.')
    ? readModule(path.resolve(path.dirname(filename), `${name}.ts`))
    : require(name);
  new Function('require', 'module', 'exports', output)(localRequire, module, module.exports);
  return module.exports;
}

const { COURSES_DATA } = readModule('src/data/coursesData.ts');
const { LAB_CATALOG } = readModule('src/data/labCatalog.ts');
const studio = fs.readFileSync('src/components/interactive/ExperimentStudio.tsx', 'utf8');
const seen = new Set();
function unique(id) {
  assert.ok(id && !seen.has(id), `Missing or duplicate id: ${id}`);
  seen.add(id);
}
function pair(en, ar, label) {
  assert.equal(typeof en, 'string', `${label}: English is missing`);
  assert.ok(en.trim(), `${label}: English is empty`);
  assert.ok(!/[\u0600-\u06ff]/.test(en), `${label}: English field contains Arabic`);
  assert.equal(typeof ar, 'string', `${label}: Arabic is missing`);
  assert.ok(ar.trim(), `${label}: Arabic is empty`);
}
function question(q, parent) {
  unique(q.id);
  assert.equal(q.courseId, parent.courseId, `${q.id}: wrong course`);
  assert.equal(q.lectureId, parent.id, `${q.id}: wrong lecture`);
  pair(q.question, q.questionAr, q.id);
  if (q.type === 'mcq') {
    assert.ok(q.options?.length > 1, `${q.id}: missing options`);
    assert.equal(q.options.length, q.optionsAr?.length, `${q.id}: option translation count`);
    q.options.forEach((option, index) => pair(option, q.optionsAr[index], `${q.id}: option ${index}`));
    assert.ok(Number.isInteger(q.correctAnswer) && q.correctAnswer >= 0 && q.correctAnswer < q.options.length, `${q.id}: invalid answer index`);
  } else if (q.type === 'true_false') {
    assert.equal(typeof q.correctAnswer, 'boolean', `${q.id}: boolean answer required`);
  } else {
    pair(q.modelAnswer, q.modelAnswerAr, `${q.id}: model answer`);
  }
  if (q.type !== 'essay') pair(q.explanation, q.explanationAr, `${q.id}: explanation`);
}

for (const course of COURSES_DATA) {
  unique(course.id);
  pair(course.title, course.titleAr, course.id);
  for (const lecture of course.lectures) {
    unique(lecture.id);
    assert.equal(lecture.courseId, course.id);
    pair(lecture.title, lecture.titleAr, lecture.id);
    assert.ok(lecture.sections.length, `${lecture.id}: empty lecture`);
    for (const section of lecture.sections) {
      pair(section.content, section.contentAr, section.title);
      assert.equal(section.bulletPoints?.length ?? 0, section.bulletPointsAr?.length ?? 0, `${lecture.id}: bullet translation count`);
      if (section.quickCheck) {
        const q = section.quickCheck;
        pair(q.question, q.questionAr, `${lecture.id}: quick check`);
        assert.equal(q.options.length, q.optionsAr.length);
        assert.ok(Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < q.options.length);
      }
    }
    for (const id of lecture.interactiveTools) assert.ok(LAB_CATALOG.some(lab => lab.id === id), `${lecture.id}: unregistered lab ${id}`);
    lecture.questions.forEach(q => question(q, lecture));
  }
  for (const sheet of course.sheets ?? []) {
    unique(sheet.id);
    assert.equal(sheet.courseId, course.id);
    if (sheet.problems) assert.equal(sheet.problemsCount, sheet.problems.length, `${sheet.id}: problem count`);
    for (const problem of sheet.problems ?? []) {
      unique(problem.id);
      pair(problem.question, problem.questionAr, problem.id);
      if (sheet.hasSolution) pair(problem.solution, problem.solutionAr, `${problem.id}: solution`);
    }
  }
}
for (const lab of LAB_CATALOG) {
  unique(lab.id);
  const lecture = COURSES_DATA.find(c => c.id === lab.courseId)?.lectures.find(l => l.id === lab.lectureId);
  assert.ok(lecture, `${lab.id}: directory destination missing`);
  assert.ok(lecture.interactiveTools.includes(lab.id), `${lab.id}: destination does not include lab`);
  assert.ok(studio.includes(`'${lab.id}': lazy(`), `${lab.id}: missing lazy component`);
}
const lectures = COURSES_DATA.flatMap(c => c.lectures);
console.log(`Curriculum checks passed: ${COURSES_DATA.length} courses, ${lectures.length} lectures, ${lectures.reduce((n, l) => n + l.questions.length, 0)} questions, ${LAB_CATALOG.length} registered experiments.`);

module.exports = { COURSES_DATA, LAB_CATALOG };

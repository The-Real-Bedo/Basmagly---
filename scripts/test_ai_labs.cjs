// New AI model fixtures and real browser flows. Run with the Vite dev server.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const puppeteer = require('puppeteer-core');
const { LAB_CATALOG } = require('./test_curriculum.cjs');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const base = process.env.BASMAGLY_TEST_URL || 'http://127.0.0.1:3000/';
const modelModule = { exports: {} };
new Function('module', 'exports', ts.transpileModule(fs.readFileSync('src/components/interactive/aiLabModels.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText)(modelModule, modelModule.exports);
const m = modelModule.exports;

assert.deepEqual(m.trainSample(m.initialTraining(), 'AND').weights, [0, 0, -1]);
assert.equal(m.errorCount([1, 1, -1.5], 'AND'), 0);
assert.equal(m.errorCount([1, 1, -.5], 'OR'), 0);
for (const gate of ['AND', 'OR', 'XOR']) {
  let training = m.initialTraining();
  for (let i = 0; i < m.TRAINING_LIMIT; i++) training = m.trainSample(training, gate);
  assert.equal(m.errorCount(training.weights, gate) === 0, gate !== 'XOR');
  assert.equal(m.trainSample(training, gate), training, 'Training must stop on convergence or its display cap');
}
for (const weights of [[0, 0, 0], [0, 0, -1], [1, 0, -.5], [0, 1, -.5], [-1, -1, 1]]) {
  const region = m.decisionRegion(weights);
  assert.ok(region.flat().every(Number.isFinite));
  assert.ok(region.every(point => m.activation(weights, point) >= -1e-12));
}
assert.equal(m.decisionRegion([0, 0, 0]).length, 4);
assert.equal(m.decisionRegion([0, 0, -1]).length, 0);

for (const [preset, shortest] of [['near', 2], ['detour', 4], ['scramble', 8]]) {
  const start = m.PUZZLE_PRESETS[preset], saved = [...start];
  const result = m.solvePuzzle(start);
  assert.equal(result.status, 'solved');
  assert.equal(result.path.length - 1, shortest);
  // Each legal slide changes Manhattan distance by one: these paths meet its lower bound.
  const distance = start.reduce((sum, tile, i) => tile === 0 ? sum : sum + Math.abs(i % 3 - (tile - 1) % 3) + Math.abs(Math.floor(i / 3) - Math.floor((tile - 1) / 3)), 0);
  assert.equal(distance, shortest);
  assert.deepEqual(start, saved, 'Planning must preserve the input board');
  assert.deepEqual(result.path.at(-1), [1, 2, 3, 4, 5, 6, 7, 8, 0]);
  result.path.forEach((board, i) => {
    assert.deepEqual([...board].sort(), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    assert.equal(m.inversions(board) % 2, 0);
    if (i) {
      const previous = result.path[i - 1];
      const before = previous.indexOf(0), after = board.indexOf(0);
      assert.equal(Math.abs(before % 3 - after % 3) + Math.abs(Math.floor(before / 3) - Math.floor(after / 3)), 1);
      assert.equal(board[before], previous[after]);
      assert.deepEqual(board.filter((_, j) => j !== before && j !== after), previous.filter((_, j) => j !== before && j !== after));
    }
  });
}
assert.equal(m.solvePuzzle(m.PUZZLE_PRESETS.parity).status, 'unsolvable');
assert.equal(m.solvePuzzle(m.PUZZLE_PRESETS.scramble, 1).status, 'limit');
assert.deepEqual(m.solvePuzzle(m.PUZZLE_GOAL).path, [m.PUZZLE_GOAL]);
assert.deepEqual(m.slideTile(m.PUZZLE_PRESETS.near, 6), m.PUZZLE_PRESETS.near, 'A row-wrapping move must be rejected');
assert.throws(() => m.solvePuzzle([0, 0, 0]), /each tile/);

for (const graph of [false, true]) {
  let state = m.initialStateSearch();
  for (let i = 0; i < 3; i++) state = m.expandState(state, graph);
  assert.equal(state.records.filter(n => n.state === 'C').length, graph ? 1 : 2);
  assert.equal(state.records.filter(n => n.state === 'S').length, graph ? 1 : 2);
  assert.equal(state.rejected.length, graph ? 2 : 0);
  while (state.status === 'ready') state = m.expandState(state, graph);
  assert.equal(state.status, 'found');
  assert.deepEqual(state.records[state.solution].path, ['S', 'A', 'C', 'G']);
  assert.equal(state.records[state.solution].cost, 3);
  assert.equal(state.expanded.length, graph ? 4 : 5);
  state.records.forEach(n => {
    if (n.parent !== null) {
      const parent = state.records[n.parent];
      assert.ok(m.SEARCH_WORLD[parent.state].includes(n.state));
      assert.equal(n.depth, parent.depth + 1);
    }
  });
}
console.log('AI model fixtures passed: training, clipping, legal shortest paths, parity and duplicate handling.');

(async () => {
  const browser = await puppeteer.launch({ executablePath: process.env.BASMAGLY_BROWSER_PATH || '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', headless: true, pipe: true });
  const page = await browser.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  let root;
  async function press(label) {
    await page.$$eval(`${root} button`, (buttons, label) => {
      const b = buttons.find(b => (b.getAttribute('aria-label') || b.textContent.trim()) === label);
      if (!b || b.disabled) throw Error(`Unavailable control: ${label}`);
      b.click();
    }, label);
    await delay(60);
  }
  async function text(id) { return page.$eval(`${root} [data-testid="${id}"]`, e => e.textContent); }
  async function select(value) {
    await page.$eval(`${root} select`, (e, value) => { e.value = value; e.dispatchEvent(new Event('change', { bubbles: true })); }, value);
    await delay(60);
  }
  async function waitText(id, value) { await page.waitForFunction((root, id, value) => document.querySelector(`${root} [data-testid="${id}"]`)?.textContent.includes(value), { timeout: 15000 }, root, id, value); }
  async function setInput(label, value) {
    await page.$eval(`${root} input[aria-label="${label}"]`, (e, value) => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(e, String(value));
      e.dispatchEvent(new Event('input', { bubbles: true }));
    }, value);
    await delay(60);
  }
  try {
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    await page.goto(base);
    await page.waitForSelector('button[aria-label="Toggle theme"]');
    assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), false, 'Fresh visitor must see light even on a dark OS');
    await page.click('button[aria-label="Toggle theme"]');
    await page.waitForFunction(() => document.documentElement.classList.contains('dark') && localStorage.getItem('basmagly-theme') === 'dark');
    await page.reload();
    await page.waitForSelector('button[aria-label="Toggle theme"][aria-pressed="true"]');
    await page.click('button[aria-label="Toggle theme"]');
    await page.waitForFunction(() => !document.documentElement.classList.contains('dark') && localStorage.getItem('basmagly-theme') === 'light');
    await page.reload();
    await page.waitForSelector('button[aria-label="Toggle theme"][aria-pressed="false"]');
    const blocked = await browser.newPage();
    await blocked.evaluateOnNewDocument(() => {
      Storage.prototype.getItem = () => { throw new Error('Storage disabled'); };
      Storage.prototype.setItem = () => { throw new Error('Storage disabled'); };
    });
    await blocked.goto(base);
    await blocked.waitForSelector('button[aria-label="Toggle theme"][aria-pressed="false"]');
    await blocked.click('button[aria-label="Toggle theme"]');
    await blocked.waitForSelector('button[aria-label="Toggle theme"][aria-pressed="true"]');
    await blocked.close();
    console.log('Theme passed: fresh default, persisted dark/light choices and unavailable storage.');

    const captures = process.env.BASMAGLY_CAPTURE_DIR;
    if (captures) fs.mkdirSync(captures, { recursive: true });
    for (const width of [375, 1280]) for (const theme of ['light', 'dark']) for (const id of ['ai-perceptron', 'ai-eight-puzzle', 'ai-search-states']) {
      await page.setViewport({ width, height: 1000 });
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.evaluate(theme => localStorage.setItem('basmagly-theme', theme), theme);
      const lab = LAB_CATALOG.find(l => l.id === id);
      await page.goto(`${base}?ai-review=${width}-${theme}#course=ai&lecture=${lab.lectureId}&tab=interactive`);
      await page.waitForSelector(`[data-testid="open-${id}"]`);
      await page.$eval(`[data-testid="open-${id}"]`, e => e.click());
      root = `[data-testid="experiment-${id}"]`;
      await page.waitForFunction(root => document.querySelector(root)?.querySelector('h3') && !document.querySelector(root).innerText.includes('Preparing'), {}, root);
      assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), theme === 'dark');
      if (id === 'ai-perceptron') {
        await press('Step sample');
        assert.match(await text('perceptron-update'), /New weights: \[0, 0, -1\]/);
        await press('1, 1');
        assert.equal(await page.$eval(`${root} table button[aria-pressed="true"]`, e => e.textContent), '1, 1');
        await press('Run training');
        await waitText('perceptron-status', '0 / 4 errors');
        await press('OR');
        await press('Run training');
        await waitText('perceptron-status', '0 / 4 errors');
        await press('XOR');
        await press('Run training');
        assert.equal(await page.$$eval(`${root} input`, els => els.every(e => e.disabled)), true);
        await press('Pause training');
        const paused = await text('perceptron-status');
        await delay(450);
        assert.equal(await text('perceptron-status'), paused);
        await press('Run training');
        await waitText('perceptron-status', '80 samples');
        assert.doesNotMatch(await text('perceptron-status'), /0 \/ 4 errors/);
        await setInput('Weight w₁', 1.25);
        assert.match(await text('perceptron-status'), /0 samples/);
        assert.equal(await page.$(`${root} [data-testid="perceptron-update"]`), null);
        await press('Run training');
        await press('Reset neuron');
        await delay(450);
        assert.match(await text('perceptron-status'), /0 samples/);
        await setInput('Weight w₁', 1);
        await setInput('Weight w₂', 1);
        await setInput('Bias b', -1.5);
      } else if (id === 'ai-eight-puzzle') {
        await page.focus(`${root} [data-testid="puzzle-board"]`);
        await page.keyboard.press('ArrowLeft');
        assert.equal(await page.$eval(`${root} [data-testid="puzzle-blank"]`, e => e.dataset.position), '6', 'No row wrapping');
        await page.keyboard.press('ArrowRight');
        assert.equal(await page.$eval(`${root} [data-testid="puzzle-blank"]`, e => e.dataset.position), '7');
        await press('Reset board');
        await press('Slide tile 7');
        await press('Find shortest path');
        assert.match(await text('puzzle-status'), /1 moves/);
        await press('Step solution');
        assert.match(await text('puzzle-status'), /Goal reached/);
        await select('detour');
        await press('Find shortest path');
        assert.match(await text('puzzle-status'), /4 moves/);
        await press('Run solution');
        assert.equal(await page.$eval(`${root} select`, e => e.disabled), true);
        await delay(650);
        await press('Pause solution');
        const paused = await text('puzzle-status');
        await press('2D');
        await press('3D');
        await delay(650);
        assert.equal(await text('puzzle-status'), paused);
        await press('Run solution');
        await waitText('puzzle-status', 'Goal reached');
        await select('scramble');
        await press('Find shortest path');
        assert.match(await text('puzzle-status'), /8 moves/);
        await press('Run solution');
        await press('Reset board');
        await delay(650);
        assert.doesNotMatch(await text('puzzle-status'), /Replay:/);
        await select('parity');
        await press('Find shortest path');
        assert.match(await text('puzzle-status'), /Unsolvable/);
        await select('near');
        // 3D object action uses the same board as keyboard/mouse controls.
        await press('Tile 7');
        await page.$eval(`${root} [data-workbench-inspector] button`, e => e.closest('[data-workbench-inspector]').querySelector('button:not([aria-pressed])').click());
        await delay(80);
        assert.equal(await page.$eval(`${root} [data-testid="puzzle-blank"]`, e => e.dataset.position), '7');
      } else {
        for (let i = 0; i < 3; i++) await press('Step BFS');
        assert.equal(await page.$$eval(`${root} [data-testid="search-records"] tr[data-state="C"]`, els => els.length), 2);
        await press('n5');
        assert.match(await text('search-record-inspector'), /S → B → C/);
        await press('Search tree view');
        const unchanged = await text('state-search-status');
        await press('2D');
        await press('3D');
        assert.equal(await text('state-search-status'), unchanged);
        await press('Graph search');
        for (let i = 0; i < 3; i++) await press('Step BFS');
        assert.equal(await page.$$eval(`${root} [data-testid="search-records"] tr[data-state="C"]`, els => els.length), 1);
        assert.match(await text('state-search-status'), /2 duplicates skipped/);
        await press('Step BFS');
        assert.match(await text('state-search-status'), /Goal generated: S → A → C → G/);
        await press('Tree search');
        await press('Run BFS');
        assert.equal(await page.$eval(`${root} [aria-label="Repeated state handling"] button`, e => e.disabled), true);
        await press('Pause BFS');
        const paused = await text('state-search-status');
        await delay(600);
        assert.equal(await text('state-search-status'), paused);
        await press('Run BFS');
        await waitText('state-search-status', 'Goal generated');
        assert.match(await text('state-search-status'), /5 expansions/);
        await press('Reset search');
        await press('Run BFS');
        await press('Reset search');
        await delay(600);
        assert.match(await text('state-search-status'), /0 expansions/);
        for (let i = 0; i < 3; i++) await press('Step BFS');
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), true, `${id}: page overflow`);
      if (captures) {
        await page.$eval(root, e => e.scrollIntoView({ behavior: 'instant', block: 'start' }));
        await page.screenshot({ path: `${captures}/${id}-${width}-${theme}.png` });
        await page.$eval(root, e => (e.querySelector("figure") || e.querySelector('[data-testid="workbench-viewport"]')).scrollIntoView({ behavior: "instant", block: "start" }));
        await page.screenshot({ path: `${captures}/${id}-${width}-${theme}-visual.png` });
      }
      console.log(`AI interaction passed: ${id} ${width} ${theme}`);
    }
    // Open both inline search labs in the summary: theory IDs must not steal jump targets.
    await page.goto(`${base}?ai-inline#course=ai&lecture=ai-lec-3&tab=summary`);
    for (const id of ['ai-eight-puzzle', 'ai-search-states']) {
      await page.waitForSelector(`[data-testid="inline-${id}"] summary`);
      await page.$eval(`[data-testid="inline-${id}"] summary`, e => e.click());
      await page.waitForSelector(`[data-testid="experiment-${id}"] [id$="-theory"]`);
    }
    assert.equal(await page.$$eval('[id]', els => els.map(e => e.id).length === new Set(els.map(e => e.id)).size), true, 'Inline lab theory IDs must be unique');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), true);
    assert.deepEqual(errors, [], 'Application/console errors');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

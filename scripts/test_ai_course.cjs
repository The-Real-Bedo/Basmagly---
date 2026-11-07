const puppeteer = require('puppeteer-core');

const executablePath = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';

async function run() {
  console.log('Launching browser at:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Load Homepage
  console.log('1. Navigating to http://localhost:3000/#course=ai ...');
  await page.goto('http://localhost:3000/#course=ai', { waitUntil: 'networkidle0' });

  // Verify course detail for AI
  const courseHeader = await page.evaluate(() => {
    return document.body.innerText;
  });

  if (!courseHeader.includes('Artificial Intelligence') && !courseHeader.includes('الذكاء الاصطناعي')) {
    throw new Error('AI course page did not render course title!');
  }
  console.log('✓ AI course page loaded successfully');

  // Verify 4 lectures
  const hasLec1 = courseHeader.includes('Introduction to AI') || courseHeader.includes('مدخل إلى الذكاء الاصطناعي');
  const hasLec2 = courseHeader.includes('Intelligent Agents') || courseHeader.includes('الوكلاء الأذكياء');
  const hasLec3 = courseHeader.includes('Search Problem Formulation') || courseHeader.includes('صياغة مسائل البحث');
  const hasLec4 = courseHeader.includes('Uninformed Search Strategies') || courseHeader.includes('استراتيجيات البحث غير الموجه');

  console.log('Lecture checks:', { hasLec1, hasLec2, hasLec3, hasLec4 });
  if (!hasLec1 || !hasLec2 || !hasLec3 || !hasLec4) {
    throw new Error('One or more of the 4 AI lectures are missing!');
  }
  console.log('✓ All 4 AI lectures rendered');

  // 2. Open Lecture 1
  console.log('2. Navigating directly to Lecture 1: #course=ai&lecture=ai-lec-1&tab=summary ...');
  await page.goto('http://localhost:3000/#course=ai&lecture=ai-lec-1&tab=summary', { waitUntil: 'networkidle0' });

  let textLec1 = await page.evaluate(() => document.body.innerText);
  if (!textLec1.includes('Oxford') && !textLec1.includes('أكسفورد')) {
    throw new Error('Lecture 1 content did not render expected Oxford definition!');
  }
  console.log('✓ Lecture 1 summary rendered');

  // Check Quick Concept Check
  const hasQuickCheck = textLec1.includes('جرب فهمك') || textLec1.includes('Quick Concept Check');
  console.log('Quick check badge visible:', hasQuickCheck);
  if (!hasQuickCheck) {
    throw new Error('Quick Concept Check widget not found in Lecture 1!');
  }

  // Click an answer option in Quick Concept Check
  console.log('Clicking an answer option in quick check...');
  const clicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const optBtn = buttons.find(b => b.innerText.includes('Big Data') || b.innerText.includes('البيانات الضخمة'));
    if (optBtn) {
      optBtn.click();
      return true;
    }
    return false;
  });
  console.log('Clicked option:', clicked);
  await new Promise(r => setTimeout(r, 600));

  textLec1 = await page.evaluate(() => document.body.innerText);
  const hasFeedback = textLec1.includes('إجابة صحيحة') || textLec1.includes('Correct') || textLec1.includes('الوقود');
  console.log('Feedback displayed:', hasFeedback);

  // 3. Test In-place Reload on Lecture 1 Interactive Tab
  console.log('3. Navigating to #course=ai&lecture=ai-lec-1&tab=interactive and testing reload...');
  await page.goto('http://localhost:3000/#course=ai&lecture=ai-lec-1&tab=interactive', { waitUntil: 'networkidle0' });
  await page.reload({ waitUntil: 'networkidle0' });

  const currentUrl = page.url();
  console.log('URL after reload:', currentUrl);
  if (!currentUrl.includes('#course=ai&lecture=ai-lec-1&tab=interactive')) {
    throw new Error('URL state lost after reload! In-place refresh failed!');
  }
  const textTuring = await page.evaluate(() => document.body.innerText);
  if (!textTuring.includes('Turing') && !textTuring.includes('تورينج')) {
    throw new Error('Turing Test lab not rendered after reload!');
  }
  console.log('✓ In-place reload preserved Lecture 1 Interactive tab');

  // 4. Test Lecture 4 Search Visualizer Lab
  console.log('4. Navigating to Lecture 4 interactive search lab...');
  await page.goto('http://localhost:3000/#course=ai&lecture=ai-lec-4&tab=interactive', { waitUntil: 'networkidle0' });

  let textSearch = await page.evaluate(() => document.body.innerText);
  if (!textSearch.includes('Uninformed Search') && !textSearch.includes('البحث غير الموجه')) {
    throw new Error('SearchAlgorithmLab not rendered in Lecture 4!');
  }
  console.log('✓ Search visualizer lab rendered');

  // Click DFS tab
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const dfsBtn = buttons.find(b => b.innerText.includes('DFS') || b.innerText.includes('البحث في العمق'));
    if (dfsBtn) dfsBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Click Step button
  console.log('Clicking Step button in search simulator...');
  const stepped = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const stepBtn = buttons.find(b => b.innerText.includes('Step') || b.innerText.includes('خطوة'));
    if (stepBtn) {
      stepBtn.click();
      return true;
    }
    return false;
  });
  console.log('Stepped:', stepped);
  await new Promise(r => setTimeout(r, 400));

  textSearch = await page.evaluate(() => document.body.innerText);
  const hasVisited = textSearch.includes('Current Node') || textSearch.includes('Steps Taken: 1');
  console.log('Search step state updated:', hasVisited);

  // 5. Test Sheets UI for AI Course
  console.log('5. Navigating to AI course sheets: #course=ai ...');
  await page.goto('http://localhost:3000/#course=ai', { waitUntil: 'networkidle0' });

  // Click Sheets tab
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const sheetsTab = buttons.find(b => b.innerText.includes('الشيتات') || b.innerText.includes('Sheets'));
    if (sheetsTab) sheetsTab.click();
  });
  await new Promise(r => setTimeout(r, 600));

  let sheetsText = await page.evaluate(() => document.body.innerText);
  console.log('Sheets view preview:', sheetsText.slice(0, 300).replace(/\n/g, ' '));

  // Verify all 4 sheets are present
  const hasSheet1 = sheetsText.includes('شيت المحاضرة الأولى') || sheetsText.includes('Lecture 1 Sheet');
  const hasSheet2 = sheetsText.includes('شيت المحاضرة الثانية') || sheetsText.includes('Lecture 2 Sheet');
  const hasSheet3 = sheetsText.includes('شيت المحاضرة الثالثة') || sheetsText.includes('Lecture 3 Sheet');
  const hasSheet4 = sheetsText.includes('شيت المحاضرة الرابعة') || sheetsText.includes('Lecture 4 Sheet');

  console.log('Sheets found:', { hasSheet1, hasSheet2, hasSheet3, hasSheet4 });
  if (!hasSheet1 || !hasSheet2 || !hasSheet3 || !hasSheet4) {
    throw new Error('One or more of the 4 official AI sheets is missing!');
  }
  console.log('✓ All 4 official AI sheets rendered');

  // Open Sheet 1 to view problem cards and solutions
  console.log('Opening Sheet 1 by clicking "فتح الشيت وحل المسائل"...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const openBtn = buttons.find(b => b.innerText.includes('فتح الشيت') || b.innerText.includes('Open Sheet'));
    if (openBtn) openBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Verify solutions are hidden by default and reveal button exists
  const showBtnExists = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.some(b => b.innerText.includes('عرض الحل النموذجي'));
  });
  console.log('Show solution buttons present:', showBtnExists);
  if (!showBtnExists) {
    throw new Error('No "عرض الحل النموذجي" buttons found! Solutions might be showing by default or missing buttons.');
  }

  // Click on "عرض الحل النموذجي" on the first problem
  console.log('Clicking "عرض الحل النموذجي" to reveal solution...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('عرض الحل النموذجي'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  sheetsText = await page.evaluate(() => document.body.innerText);
  const solutionRevealed = sheetsText.includes('إخفاء الحل') && (sheetsText.includes('الخوارزميات المتقدمة') || sheetsText.includes('Advanced Algorithms'));
  console.log('Solution revealed successfully:', solutionRevealed);
  if (!solutionRevealed) {
    throw new Error('Clicking reveal button did not show the model solution!');
  }

  // 6. Test In-place Reload on Sheet 4
  console.log('6. Navigating to #course=ai&sheet=ai-sheet-4 and testing reload...');
  await page.goto('http://localhost:3000/#course=ai&sheet=ai-sheet-4', { waitUntil: 'networkidle0' });
  await page.reload({ waitUntil: 'networkidle0' });

  const sheetUrlAfterReload = page.url();
  console.log('Sheet URL after reload:', sheetUrlAfterReload);
  if (!sheetUrlAfterReload.includes('#course=ai&sheet=ai-sheet-4')) {
    throw new Error('Sheet in-place reload failed! Lost hash state.');
  }

  const sheet4Text = await page.evaluate(() => document.body.innerText);
  if (!sheet4Text.includes('شيت المحاضرة الرابعة') && !sheet4Text.includes('Lecture 4 Sheet')) {
    throw new Error('Sheet 4 title not rendered after reload!');
  }
  console.log('✓ In-place reload preserved Sheet 4 view perfectly');

  await browser.close();
  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

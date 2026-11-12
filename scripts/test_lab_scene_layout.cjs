// Run against npm run dev; optional screenshots stay outside the public repository.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const puppeteer = require('puppeteer-core');
const { LAB_CATALOG } = require('./test_curriculum.cjs');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Projection checks exercise off-centre, tall and wide layouts at different aspects.
(async () => {
  const three = await import('three');
  const ts = require('typescript');
  const moduleState = { exports: {} };
  const framingSource = fs.readFileSync('src/components/interactive/sceneFraming.ts', 'utf8');
  new Function('require', 'module', 'exports', ts.transpileModule(framingSource, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText)(name => name === 'three' ? three : require(name), moduleState, moduleState.exports);
  const { Box3, PerspectiveCamera, Vector3 } = three;
  let framingChecks = 0;
  for (const [min, max] of [[[-5, 0, -1], [7, 2, 1]], [[4, 0, -5], [8, 4, 2]], [[-1.5, 0, -1], [1.5, 6, 1]]]) {
    const bounds = new Box3(new Vector3(...min), new Vector3(...max));
    for (const [width, height] of [[297, 340], [297, 650], [900, 430]])
      for (const direction of [new Vector3(.5, .7, 1), new Vector3(1, .7, .2), new Vector3(-.5, .7, 1), new Vector3(0, 1, .001)]) {
        const camera = new PerspectiveCamera(44, width / height, .1, 150);
        const target = moduleState.exports.fitSceneCamera(camera, bounds, direction, width, height);
        assert.ok(target.distanceTo(bounds.getCenter(new Vector3())) < 1e-9, 'Camera target must centre asymmetric bounds');
        for (const x of [min[0], max[0]]) for (const y of [min[1], max[1]]) for (const z of [min[2], max[2]]) {
          const projected = new Vector3(x, y, z).project(camera);
          assert.ok(Math.abs(projected.x) <= .821 && Math.abs(projected.y) <= .801 && Math.abs(projected.z) < 1, 'Scene corners must fit with annotation margins');
        }
        framingChecks++;
      }
  }

  const browser = await puppeteer.launch({
    executablePath: process.env.BASMAGLY_BROWSER_PATH || '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    headless: true, pipe: true,
  });
  const page = await browser.newPage(), errors = [];
  const captures = process.env.BASMAGLY_CAPTURE_DIR;
  if (captures) fs.mkdirSync(captures, { recursive: true });
  // The app follows a saved choice, so seed matrix themes explicitly.
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('basmagly-theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    // Dismiss the below-768px warning gate so mobile panels render the app.
    try { sessionStorage.setItem('basmagly-gate-dismissed', '1'); } catch { /* opaque origins deny storage */ }
  });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  let root, labelChecks = 0, sceneChecks = 0, actionChecks = 0;
  async function inspectLabels(context) {
    // Label projection follows container size; give the resize observer two frames
    // plus a short settle so a just-closed dialog cannot be measured mid-relayout.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await delay(140);
    const result = await page.$eval(root, element => {
      const rect = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, w: r.width, h: r.height }; };
      const labels = [...element.querySelectorAll('[data-scene-label]')].filter(e => getComputedStyle(e).display !== 'none');
      const clipped = [], overlaps = [];
      labels.forEach((label, i) => {
        const a = rect(label), bounds = rect(label.parentElement);
        if (a.x < bounds.x - 1 || a.y < bounds.y - 1 || a.right > bounds.right + 1 || a.bottom > bounds.bottom + 1) clipped.push({ text: label.textContent, rect: a, bounds });
        labels.slice(i + 1).forEach(other => {
          if (other.parentElement !== label.parentElement) return;
          const b = rect(other);
          if (a.x < b.right && b.x < a.right && a.y < b.bottom && b.y < a.bottom) overlaps.push([label.textContent, other.textContent]);
        });
      });
      return { count: labels.length, clipped, overlaps };
    });
    assert.deepEqual(result.clipped, [], `${context}: clipped annotations`);
    assert.deepEqual(result.overlaps, [], `${context}: overlapping annotations`);
    assert.ok(result.count > 0, `${context}: no visible annotations`);
    labelChecks++;
  }
  async function capture(selector, filename) {
    if (!captures) return;
    await page.addStyleTag({ content: 'header.sticky, nav.sticky {visibility:hidden}' });
    await page.$eval(selector, e => {
      const pane = e.closest(':modal')?.querySelector('[data-testid="expanded-lab-body"]');
      if (pane) pane.scrollTop += e.getBoundingClientRect().top - pane.getBoundingClientRect().top;
      else window.scrollTo({ top: window.scrollY + e.getBoundingClientRect().top, behavior: 'instant' });
    });
    await delay(150);
    const clip = await page.$eval(selector, e => {
      const r = e.getBoundingClientRect(), x = Math.max(0, r.x), y = Math.max(0, r.y);
      return { x: x + scrollX, y: y + scrollY, width: Math.min(innerWidth, r.right) - x, height: Math.min(innerHeight, r.bottom) - y };
    });
    // Element screenshots can enlarge the browser viewport and alter responsive scenes.
    await page.screenshot({ path: `${captures}/${filename}.png`, clip, captureBeyondViewport: false });
  }
  async function press(label) {
    await page.$$eval(`${root} button`, (buttons, label) => {
      const button = buttons.find(b => (b.getAttribute('aria-label') || b.textContent) === label);
      if (!button || button.disabled) throw Error(`Missing control: ${label}`);
      button.click();
    }, label);
    await delay(120);
  }
  try {
    for (const width of (process.env.BASMAGLY_TEST_WIDTHS || '375,1280').split(',').map(Number))
      for (const theme of (process.env.BASMAGLY_TEST_THEMES || 'light,dark').split(','))
        for (const lab of LAB_CATALOG.filter(l => !process.env.BASMAGLY_LAB_FILTER || process.env.BASMAGLY_LAB_FILTER.split(',').includes(l.id))) {
          await page.setViewport({ width, height: 1000 });
          await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: theme }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
          await page.goto(`${process.env.BASMAGLY_TEST_URL || 'http://127.0.0.1:3000/'}?scene-layout=${width}-${theme}#course=${lab.courseId}&lecture=${lab.lectureId}&tab=interactive`);
          await page.waitForSelector(`[data-testid="open-${lab.id}"]`);
          await page.$eval(`[data-testid="open-${lab.id}"]`, e => e.click());
          root = `[data-testid="experiment-${lab.id}"]`;
          await page.waitForFunction(root => { const e = document.querySelector(root); return e?.querySelector('h3') && !e.innerText.includes('Preparing'); }, {}, root);
          await delay(200);
          assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), theme === 'dark');
          const actions = await page.$eval(root, e => {
            const expand = e.querySelector('[data-testid="expand-experiment"]'), reset = e.querySelector('[data-testid="restart-experiment"]');
            const a = expand.getBoundingClientRect(), b = reset.getBoundingClientRect();
            return { height: a.height, resetHeight: b.height, width: a.width, parentWidth: expand.parentElement.clientWidth, gradient: getComputedStyle(expand).backgroundImage, label: expand.textContent };
          });
          assert.ok(actions.height >= 64 && actions.height > actions.resetHeight, 'Expand must be the prominent action');
          assert.match(actions.gradient, /linear-gradient/);
          assert.match(actions.label, /Full-screen workspace/);
          if (width === 375) assert.ok(Math.abs(actions.width - actions.parentWidth) < 2, 'Mobile Expand must be full width');
          actionChecks++;
          const canvas = await page.$(`${root} canvas`);
          if (canvas) {
            const context = `${lab.id} ${width} ${theme}`;
            await inspectLabels(context);
            const bench = await page.$(`${root} [data-testid="lab-workbench"]`);
            const sceneSelector = bench ? `${root} [data-testid="workbench-viewport"]` : `${root} canvas`;
            await capture(sceneSelector, `${lab.id}-${width}-${theme}-scene`);
            await capture(`${root} [aria-label="Guided comparison"]`, `${lab.id}-${width}-${theme}-action`);
            await page.focus(`${root} [data-testid="expand-experiment"]`);
            await page.keyboard.press('Enter');
            await delay(180);
            assert.equal(await canvas.evaluate(e => e.isConnected && e.closest('dialog').matches(':modal')), true, 'Expand replaced the canvas');
            await inspectLabels(`${context} expanded`);
            await capture(bench ? `${root} [data-testid="lab-workbench"]` : sceneSelector, `${lab.id}-${width}-${theme}-expanded`);
            if (bench) {
              const layout = await bench.evaluate(e => ({ width: e.clientWidth, mode: getComputedStyle(e.querySelector('[data-workbench-layout]')).display }));
              assert.equal(layout.mode === 'grid', layout.width >= 900, 'Inspector does not respond to bench width');
              await press('Top view');
              await inspectLabels(`${context} top`);
              await capture(sceneSelector, `${lab.id}-${width}-${theme}-top`);
              await press('Perspective');
              await press('Rotate camera left');
              await inspectLabels(`${context} rotated`);
              await press('Zoom camera in');
              await inspectLabels(`${context} zoomed`);
              await press('Reset camera');
              const inspection = await page.$$eval(`${root} [aria-label="Inspect scene objects"] button`, buttons => {
                const last = buttons.at(-1); if (last && !last.disabled) last.click();
                return last?.textContent.trim();
              });
              await delay(150);
              await inspectLabels(`${context} selection`);
              assert.ok(await page.$eval(root, e => e.querySelector('[data-workbench-inspector]').textContent.includes('Object inspector')));
              assert.ok(inspection);
            }
            await page.keyboard.press('Escape');
            await delay(100);
            assert.equal(await canvas.evaluate(e => e.isConnected && !e.closest('dialog').matches(':modal')), true);
            await inspectLabels(`${context} restored`);
            await canvas.dispose();
            sceneChecks++;
          }
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), true, `${lab.id}: page overflow`);
          console.log(`Scene layout passed: ${lab.id} ${width} ${theme}`);
        }
    assert.deepEqual(errors, [], 'Application/console errors');
    console.log(`Passed ${framingChecks} camera fits, ${actionChecks} prominent-action checks, ${sceneChecks} scene flows and ${labelChecks} annotation layouts.`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

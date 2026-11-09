// Run against `npm run dev -- --port 3000`; set BASMAGLY_BROWSER_PATH for your browser.
const assert = require('node:assert/strict');
const puppeteer = require('puppeteer-core');
const { LAB_CATALOG } = require('./test_curriculum.cjs');
const browserPath =
  process.env.BASMAGLY_BROWSER_PATH ||
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const base = process.env.BASMAGLY_TEST_URL || 'http://127.0.0.1:3000/';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    pipe: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 900 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  let root;
  async function open(id) {
    const lab = LAB_CATALOG.find((item) => item.id === id);
    assert.ok(lab);
    await page.goto(
      `${base}?interactions#course=${lab.courseId}&lecture=${lab.lectureId}&tab=interactive`,
    );
    await page.waitForSelector(`[data-testid="open-${id}"]`);
    await page.$eval(`[data-testid="open-${id}"]`, (element) =>
      element.click(),
    );
    root = `[data-testid="experiment-${id}"]`;
    await ready();
  }
  async function ready() {
    await page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return (
          element?.querySelector('h3') &&
          !element.innerText.includes('Preparing')
        );
      },
      { timeout: 30000 },
      root,
    );
    await delay(200);
  }
  async function text() {
    return page.$eval(root, (element) => element.children[1].innerText);
  }
  async function button(pattern, inspector = false, ordinal = 0) {
    await page.$eval(
      root,
      (element, { source, inspector, ordinal }) => {
        const candidates = [...element.querySelectorAll('button')].filter(
          (button) =>
            (inspector || !button.closest('[data-testid="lab-workbench"]')) &&
            new RegExp(source, 'i').test(
              button.innerText || button.getAttribute('aria-label') || '',
            ),
        );
        const button = candidates[ordinal];
        if (!button || button.disabled)
          throw new Error(`Missing or disabled button: ${source}`);
        button.click();
      },
      { source: pattern.source, inspector, ordinal },
    );
    await delay(50);
  }
  async function select(index, value) {
    await page.$$eval(
      `${root} select`,
      (elements, { index, value }) => {
        const element = elements[index];
        if (!element || element.disabled) throw new Error('Select unavailable');
        element.value = value;
        element.dispatchEvent(new Event('change', { bubbles: true }));
      },
      { index, value },
    );
    await delay(50);
  }
  async function input(selector, value) {
    await page.$eval(
      `${root} ${selector}`,
      (element, value) => {
        if (element.disabled) throw new Error('Input is locked');
        Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value',
        ).set.call(element, value);
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      },
      String(value),
    );
    await delay(50);
  }
  async function expect(pattern) {
    assert.match(await text(), pattern);
  }
  async function restart() {
    await page.$eval(`${root} [data-testid="restart-experiment"]`, (element) =>
      element.click(),
    );
    await ready();
  }
  async function toggleView(mode) {
    await page.$$eval(
      `${root} [aria-label="Visualization mode"] button`,
      (elements, mode) =>
        elements.filter((e) => e.innerText === mode).forEach((e) => e.click()),
      mode,
    );
    await ready();
  }
  async function byteCount(count) {
    assert.equal(
      await page.$$eval(
        `${root} [aria-label="Inspect scene objects"] button`,
        (elements) => elements.length,
      ),
      count,
    );
  }
  async function unlocked(pattern) {
    await page.waitForFunction(
      (selector, source) =>
        [...document.querySelectorAll(`${selector} button`)].some(
          (e) => !e.disabled && new RegExp(source, 'i').test(e.innerText),
        ),
      { timeout: 12000 },
      root,
      pattern.source,
    );
  }
  try {
    for (const lab of LAB_CATALOG.filter(
      (lab) =>
        !process.env.BASMAGLY_LAB_FILTER ||
        process.env.BASMAGLY_LAB_FILTER.split(',').includes(lab.id),
    )) {
      await open(lab.id);
      const before = await text();
      switch (lab.id) {
        case 'ai-fuel':
          await button(/Data-poor/);
          await button(/Run check/);
          await expect(/constraint|bottleneck/i);
          await button(/^Data readiness/, true);
          await button(/Increase resource level/, true);
          await expect(/Inputs changed/);
          break;
        case 'ai-history':
          await button(/Hide dates/);
          assert.ok(await page.$(`${root} input`));
          await button(/Next milestone/);
          await expect(/Turing/);
          break;
        case 'ai-foundations':
          await button(/^Mathematics/);
          await select(0, 'medical');
          await expect(/medical/i);
          break;
        case 'ai-approaches':
          await button(/^Thinking Humanly/);
          await button(/Next scenario/);
          await expect(/clinician/i);
          break;
        case 'turing-test':
          await button(/السؤال 2/);
          break;
        case 'ai-rationality':
          await button(/Safe route/);
          await expect(/Rational under this model/);
          await button(/Clear day/);
          await expect(/Actual time: 8 min/);
          await toggleView('2D');
          await expect(/Actual time: 8 min/);
          await toggleView('3D');
          await expect(/Actual time: 8 min/);
          await input('input[type="range"]', 10);
          await button(/Shortcut/);
          await expect(/3\.8 min/);
          break;
        case 'vacuum-world':
          for (let i = 0; i < 3; i++) await button(/^Step/);
          await expect(/Performance score: 4 · Actions: 3/);
          await expect(/Task complete/);
          await toggleView('2D');
          await expect(/Performance score: 4/);
          await restart();
          await button(/Auto play/);
          await restart();
          await delay(1100);
          await expect(/Performance score: 0 · Actions: 0/);
          break;
        case 'vacuum-world-3d':
          await button(/All dirty/);
          await button(/^Agent view/);
          await expect(/Unknown/);
          for (let i = 0; i < 7; i++) await button(/^Step/);
          await expect(/Score is now 16/);
          await expect(/simulator has stopped/);
          break;
        case 'agent-architecture':
          for (let i = 0; i < 4; i++) await button(/Next step/);
          await button(/Next cycle/);
          await expect(/Cycle 2 · Step 1/);
          await button(/Autonomous taxi/);
          await expect(/Cycle 1 · Step 1/);
          break;
        case 'search-visualizer':
          for (const [algorithm, expectedExpansions] of [
            ['BFS', 12],
            ['UCS', 15],
            ['DFS', 7],
          ]) {
            await button(new RegExp('^' + algorithm));
            for (let i = 0; i < 20; i++) {
              const done = await page.$$eval(
                `${root} button`,
                (elements) =>
                  elements.find((e) => /^Step/.test(e.innerText))?.disabled,
              );
              if (done) break;
              await button(/^Step/);
            }
            await expect(/Path: A → B → G → L → O · Cost: 4/);
            await expect(
              new RegExp('Expanded: ' + expectedExpansions + ' · Goal: O'),
            );
          }
          break;
        case 'network-devices':
          await button(/إرسال عادي/);
          await unlocked(/إرسال عادي/);
          await expect(/discard|drop/i);
          await button(/Switch/);
          await button(/إرسال متزامن/);
          await restart();
          await delay(4500);
          await expect(/Choose a device, sender/);
          break;
        case 'network-3d':
          await select(0, 'switch');
          await select(1, 'pair');
          await button(/^Step$/);
          await button(/^Step$/);
          await expect(/separate known-destination ports/);
          const macs = await page.$$eval(
            `${root} tbody tr td:first-child`,
            (elements) => elements.map((e) => e.innerText),
          );
          assert.ok(
            macs.every((mac) => /^([A-F0-9]{2}:){5}[A-F0-9]{2}$/.test(mac)),
          );
          await select(0, 'router');
          await select(1, 'broadcast');
          await button(/^Step$/);
          await button(/^Step$/);
          await expect(/stops the broadcast/);
          await select(0, 'hub');
          await select(1, 'pair');
          await button(/^Step$/);
          await button(/^Step$/);
          await expect(/Collision:/);
          break;
        case 'topology-simulator':
          await page.$eval(
            `${root} [aria-label="Change link state"] button`,
            (e) => e.click(),
          );
          await button(/ابعت حزمة/);
          await unlocked(/ابعت حزمة/);
          await button(/Mesh/);
          break;
        case 'transmission-lab':
          await button(/^Broadcast$/);
          await button(/إرسال الفريم الآن/);
          await unlocked(/إرسال الفريم الآن/);
          assert.equal(
            await page.$$eval(
              `${root} [aria-label="Inspect scene objects"] button`,
              (elements) =>
                elements.filter((e) => e.querySelector('.bg-emerald-600'))
                  .length,
            ),
            4,
          );
          break;
        case 'packet-journey':
          await button(/الخطوة الجاية/);
          await button(/الخطوة الجاية/);
          await expect(/CC:33:CC:33:CC:33/);
          await expect(/192\.168\.1\.10/);
          await expect(/10\.0\.0\.50/);
          await toggleView('2D');
          await expect(/CC:33:CC:33:CC:33/);
          break;
        case 'osi-visualizer':
          await button(/Live Packet Trace/);
          await delay(950);
          await restart();
          await delay(1400);
          await expect(/Application Layer/);
          assert.ok(!(await text()).includes('جاري التغليف'));
          break;
        case 'subnet-calculator':
          await input('input[type="text"]', '192.168.1.130');
          await input('input[type="range"]', 26);
          await expect(/192\.168\.1\.128/);
          await expect(/192\.168\.1\.191/);
          await input('input[type="range"]', 0);
          await expect(/255\.255\.255\.255/);
          await input('input[type="range"]', 31);
          await expect(/point.to.point/i);
          await input('input[type="range"]', 32);
          await expect(/single host/i);
          break;
        case 'edge-vs-cloud':
          await button(/^Cloud/);
          await input('input[type="range"]', 70);
          await button(/Internet connected/);
          await button(/Run scenario/);
          await delay(1100);
          await expect(/No internet route/);
          await restart();
          await input('input[type="range"]', 70);
          await button(/Run scenario/);
          await delay(800);
          await expect(/actuator turns on/);
          break;
        case 'iot-simulator':
          await button(/Run flow/);
          await delay(2400);
          await expect(/irrigation pump/);
          await input('input[type="range"]', 30);
          await button(/Run flow/);
          await delay(2400);
          await expect(/actuator stays on standby/);
          break;
        case 'iot-stack-lab':
          await button(/Auto trace/);
          await delay(3400);
          await expect(/5 of 5|Layer 05|Application/);
          await button(/Practical 6/);
          await expect(/six practical|six.*blocks|Cloud Applications/i);
          await button(/TCP vs/);
          for (let i = 0; i < 5; i++) await button(/Next packet/);
          await expect(/ACK=181/);
          await button(/^UDP/);
          await button(/Next packet/);
          await expect(/DATAGRAM 1/);
          break;
        case 'windows-message-loop':
          await button(/^Press A/);
          for (let i = 0; i < 8; i++) {
            const enabled = await page.$$eval(`${root} button`, (elements) =>
              elements.some(
                (e) =>
                  !e.disabled &&
                  /GetMessage|TranslateMessage|DispatchMessage/.test(
                    e.innerText,
                  ),
              ),
            );
            if (!enabled) break;
            await button(/GetMessage|TranslateMessage|DispatchMessage/);
          }
          break;
        case 'event-driven-lab':
          await button(/^Button click/);
          await button(/Get next event/);
          await button(/Run handler/);
          await expect(/1 handled/);
          break;
        case 'signal-sampling':
          await input('input[aria-label="Input frequency in hertz"]', 4);
          await input(
            'input[aria-label="Sampling rate in samples per second"]',
            4,
          );
          await button(/Run sampling/);
          break;
        case 'discrete-signals':
          await input('input[aria-label="Integer time shift"]', 3);
          await button(/^Even part$/);
          break;
        case 'win32-code-lab':
          await button(/^Press A/);
          await button(/Run all/);
          await expect(/WM_CHAR/);
          break;
        case 'win32-types-lab':
          await button(/^DWORD$/);
          await byteCount(4);
          await button(/^x64$/);
          await byteCount(4);
          await button(/^Strings and text/);
          await button(/^char$/);
          await byteCount(1);
          await button(/^Unicode build/);
          await byteCount(1);
          await button(/^TCHAR$/);
          await byteCount(2);
          await button(/^Narrow build/);
          await byteCount(1);
          await button(/^LPSTR/);
          await byteCount(8);
          await button(/^x86$/);
          await byteCount(4);
          break;
        case 'network-media':
          await button(/Long/);
          await button(/Interference/);
          await input('input[type="range"]', 1200);
          for (const medium of ['Copper', 'Fiber', 'Wireless']) {
            await button(new RegExp('^' + medium));
            const match = (await text()).match(
              /(\d+) Mbps modeled throughput \/ (\d+) Mbps modeled capacity/,
            );
            assert.ok(match && Number(match[1]) <= Number(match[2]));
          }
          break;
        case 'ai-environments':
          await button(/Advance one traffic/);
          await button(/^Cell 14$/, true);
          await expect(/Cell 14 · Unknown/);
          await button(/World view/);
          await expect(/Cell 14 · YOU/);
          await button(/Agent view/);
          await expect(/Cell 14 · Unknown/);
          await button(/^Chess with/);
          await button(/Think one modeled minute/);
          await expect(/09:00/);
          await button(/^Image analysis/);
          await button(/Load next independent/);
          await expect(/Sample 2/);
          break;
        case 'signal-support':
          await button(/^Reverse in time/);
          await input('input[type="range"]', 3);
          await expect(/−4.*2|-4.*2/s);
          break;
        case 'signal-periodicity':
          await button(/^Step-function anomaly$/);
          break;
        case 'signal-systems':
          await select(0, 'gain');
          await expect(/Linear|linearity/i);
          break;
        case 'signal-convolution':
          for (let i = 0; i < 5; i++) await button(/^Step n/);
          assert.ok(
            await page.$(
              `${root} button[aria-label="All output samples computed"]:disabled`,
            ),
          );
          break;
        default:
          throw new Error(`Missing interaction flow: ${lab.id}`);
      }
      if (
        !['vacuum-world', 'network-devices', 'osi-visualizer'].includes(lab.id)
      )
        assert.notEqual(
          await text(),
          before,
          `${lab.id}: interaction had no visible effect`,
        );
      await restart();
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth ===
            document.documentElement.clientWidth,
        ),
        true,
        `${lab.id}: overflow`,
      );
      console.log(`Interaction passed: ${lab.id}`);
    }
    await page.setViewport({
      width: 375,
      height: 900,
      isMobile: true,
      hasTouch: true,
    });
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);
    await page.goto('about:blank');
    await open('ai-rationality');
    assert.equal(
      await page.$eval(`${root} canvas`, (e) => e.style.touchAction),
      'pan-y',
    );
    await button(/Enable touch orbit/, true);
    assert.equal(
      await page.$eval(`${root} canvas`, (e) => e.style.touchAction),
      'none',
    );
    await button(/Finish orbiting/, true);
    assert.equal(
      await page.$eval(`${root} canvas`, (e) => e.style.touchAction),
      'pan-y',
    );
    await page.focus(`${root} button[aria-label="Rotate camera right"]`);
    await page.keyboard.press('Enter');
    await ready();
    await page.$eval(`${root} canvas`, (canvas) =>
      canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true })),
    );
    await button(/Open 2D view/, true);
    assert.equal(
      await page.$$eval(`${root} canvas`, (elements) => elements.length),
      0,
    );
    await button(/Safe route/);
    await button(/Clear day/);
    await expect(/Actual time: 8 min/);
    assert.deepEqual(errors, [], 'Application errors during interactions');
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

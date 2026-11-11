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
  // The app gates screens below 768px behind a warning; dismiss it for the
  // mobile matrix so the real layout is still exercised at 375px.
  await page.evaluateOnNewDocument(() => {
    try { sessionStorage.setItem('basmagly-gate-dismissed', '1'); } catch { /* about:blank and opaque origins deny storage */ }
  });
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
      `${root} select:not([data-challenge-select])`,
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
  async function checkbox(index) {
    await page.$$eval(
      `${root} input[type="checkbox"]`,
      (elements, index) => {
        const element = elements[index];
        if (!element || element.disabled) throw new Error('Checkbox unavailable');
        element.click();
      },
      index,
    );
    await delay(120);
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
        case 'ai-perceptron':
          await button(/Step sample/);
          await expect(/New weights: \[0, 0, -1\]/);
          await button(/^XOR$/);
          await button(/Run training/);
          await page.waitForFunction(root => document.querySelector(`${root} [data-testid="perceptron-status"]`)?.textContent.includes('80 samples'), { timeout: 30000 }, root);
          await expect(/80 samples/);
          await expect(/cannot be separated/);
          break;
        case 'ai-eight-puzzle':
          await button(/Find shortest path/);
          await expect(/2 moves/);
          await button(/Step solution/);
          await button(/Step solution/);
          await expect(/Goal reached/);
          await select(0, 'parity');
          await button(/Find shortest path/);
          await expect(/Unsolvable for this goal/);
          break;
        case 'ai-search-states':
          for (let i = 0; i < 3; i++) await button(/Step BFS/);
          assert.equal(await page.$$eval(`${root} [data-testid="search-records"] tr[data-state="C"]`, rows => rows.length), 2);
          await button(/^Graph search$/);
          for (let i = 0; i < 4; i++) await button(/Step BFS/);
          await expect(/Goal generated: S → A → C → G/);
          await expect(/3 duplicates skipped/);
          break;
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
          // Default preset is now the Goal-13 slide tree; the A → B → G → L → O
          // trace lives in the "Lecture 4 tree · Goal O" preset.
          await button(/Lecture 4 tree/);
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
          await button(/^Weighted routes/);
          await toggleView('2D');
          assert.equal(await page.$$eval(`${root} [data-search-node]`,nodes=>nodes.every(node=>{const frame=node.closest('svg').parentElement.getBoundingClientRect(),r=node.getBoundingClientRect();return r.left>=frame.left && r.right<=frame.right;})),true,'All weighted-route nodes must be visible together on mobile');
          await toggleView('3D');
          for (const [algorithm, cost, path, steps] of [['BFS',9,'S → A → G',2], ['UCS',4,'S → B → G',4], ['DFS',9,'S → A → G',3]]) {
            await button(new RegExp('^'+algorithm));
            for(let i=0;i<steps;i++)await button(/^Step/);
            await expect(new RegExp('Path: '+path+' · Cost: '+cost));
            assert.equal(await page.$eval(`${root} [data-testid="search-frontier"]`,e=>/Expand /.test(e.parentElement.innerText)),false,'Finished search must not advertise another expansion');
            await button(/^G$/,true);
            await expect(/On the solution path/);
          }
          break;
        case 'network-devices':
          await button(/إرسال عادي/);
          await unlocked(/إرسال عادي/);
          await expect(/discard|drop/i);
          await button(/Switch/);
          await button(/إرسال متزامن/);
          assert.equal(await page.$$eval(`${root} select:not([data-challenge-select])`,elements=>elements.every(e=>e.disabled)),true,'Network inputs must lock during transmission');
          await button(/Reset simulation/);
          await delay(4500);
          await expect(/Choose a device, sender/);
          assert.equal(await page.$$eval(`${root} select:not([data-challenge-select])`,elements=>elements.every(e=>!e.disabled)),true,'Reset must unlock the network inputs');
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
          await expect(/02:33:CC:33:CC:33/);
          await expect(/192\.168\.1\.10/);
          await expect(/10\.0\.0\.50/);
          await toggleView('2D');
          await expect(/02:33:CC:33:CC:33/);
          assert.equal(await page.$eval(root,e=>[...e.querySelectorAll('span')].find(s=>s.textContent==='IPv4 TTL').parentElement.parentElement.children[1].textContent.trim()),'63');
          await button(/تشغيل تلقائي/);
          await button(/إيقاف مؤقت/);
          const pausedPacket = await text();
          await delay(3300);
          assert.equal(await text(),pausedPacket,'Paused routing must retain the current hop');
          break;
        case 'osi-visualizer':
          await button(/^L3/, true);
          assert.equal(await page.$eval(`${root} [data-testid="osi-selected-layer"]`, e => e.textContent), 'Network Layer');
          for (let i = 0; i < 14; i++) {
            await button(/^Step trace$/);
            const layer = i < 7 ? 7 - i : i - 6;
            const phase = i < 7 ? 'Sender · Encapsulation' : 'Receiver · Decapsulation';
            assert.match(await page.$eval(`${root} [data-testid="osi-trace-status"]`, e => e.innerText), new RegExp(`Step ${i + 1} of 14 · ${phase} · Layer ${layer}`));
            assert.equal(await page.$eval(`${root} [aria-label="Inspect scene objects"] button[aria-pressed="true"]`, e => e.innerText.split(' · ')[0]), `L${layer}`);
          }
          await expect(/Complete/);
          await button(/Replay trace/);
          await delay(850);
          await button(/Pause trace/);
          const paused = await page.$eval(`${root} [data-testid="osi-trace-status"]`, e => e.innerText);
          await delay(1000);
          assert.equal(await page.$eval(`${root} [data-testid="osi-trace-status"]`, e => e.innerText), paused);
          await toggleView('2D');
          await toggleView('3D');
          assert.equal(await page.$eval(`${root} [data-testid="osi-trace-status"]`, e => e.innerText), paused);
          await button(/Resume trace/);
          assert.ok(await page.$(`${root} [aria-label="Inspect scene objects"] button:disabled`));
          await page.$eval(`${root} button[aria-label="Reset packet trace"]`, e => e.click());
          await delay(1400);
          await expect(/Trace ready/);
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
          await button(/Show folded candidate/);
          for(const frequency of [1,4,7,8]) for(const rate of [2,8,14,24]) for(const phase of [0,90]) for(const bits of [2,6]) {
            await input('input[aria-label="Input frequency in hertz"]',frequency);
            await input('input[aria-label="Sampling rate in samples per second"]',rate);
            await input('input[aria-label="Quantization bit depth"]',bits);
            await button(new RegExp('^'+phase+'°$'));
            assert.equal(await page.$(`${root} [data-testid="sample-inspector"]`),null,'Editing the ADC must clear its result');
            await button(/Run sampling/);
            const plotted = await page.$eval(root,e=>{
              const svg=e.querySelector('svg[aria-label="Sine wave with sample points and quantized sample levels"]');
              const points=svg.querySelector('[data-testid="alias-candidate"]').getAttribute('d').match(/-?\d+(?:\.\d+)?/g).map(Number);
              const curve=Array.from({length:points.length/2},(_,i)=>({x:points[2*i],y:points[2*i+1]}));
              return [...svg.querySelectorAll('circle[data-sample-index]')].map(marker=>{
                const x=Number(marker.getAttribute('cx'));
                const after=Math.max(1,curve.findIndex(p=>p.x>=x));
                const a=curve[after-1],b=curve[after];
                return {n:Number(marker.dataset.sampleIndex),raw:(137-Number(marker.getAttribute('cy')))/88,q:(137-Number(marker.parentElement.querySelector('rect').getAttribute('y'))-3.5)/88,alias:(137-(a.y+(b.y-a.y)*(x-a.x)/(b.x-a.x)))/88};
              });
            });
            assert.equal(plotted.length,rate*2+1);
            const step=2/(2**bits-1);
            for(const sample of plotted) {
              const expected=Math.sin(2*Math.PI*frequency*sample.n/rate+phase*Math.PI/180);
              assert.ok(Math.abs(sample.raw-expected)<1e-10,'Ideal samples must match the selected sine and phase');
              assert.ok(Math.abs(sample.raw-sample.q)<=step/2+1e-10,'Every rounding error must satisfy Δ/2');
              assert.ok(Math.abs((sample.q+1)/step-Math.round((sample.q+1)/step))<1e-9,'Quantized values must lie on a valid level');
              assert.ok(Math.abs(sample.alias-sample.raw)<0.009,'The rendered folded candidate must meet the ideal sample instants');
            }
            if(frequency===7 && rate===14 && phase===0) assert.ok(plotted.every(s=>s.raw===0),'Zero-phase Nyquist sine samples must be zero');
            if(frequency===7 && rate===14 && phase===90) assert.ok(plotted.every(s=>Math.abs(s.raw-((-1)**s.n))<1e-10),'90-degree Nyquist samples alternate ±1');
          }
          await input('#sample-inspector-index',48);
          assert.equal(await page.$eval(`${root} circle[data-sample-index="48"]`,e=>{const p=e.closest('[role="region"]').getBoundingClientRect(),r=e.getBoundingClientRect();return r.left>=p.left && r.right<=p.right;}),true,'The inspected sample must be visible on mobile');
          await button(/Reset/);
          assert.equal(await page.$(`${root} [data-testid="sample-inspector"]`),null);
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
          assert.match(await page.$$eval(`${root} [data-highlighted="true"] code`,els=>els.map(e=>e.textContent).join('\n')),/case WM_CHAR:/);
          await button(/^Close and quit/);
          await button(/Run trace/);
          for(let i=0;i<3;i++) await button(/Step/);
          await expect(/GetMessage = 0/);
          await expect(/message loop exited/);
          assert.equal(await page.$eval(`${root} [aria-label="Queued messages"]`,e=>e.innerText.includes('WM_QUIT')),false);
          const lines = await page.$$eval(`${root} [data-highlighted="true"] code`,els=>els.map(e=>e.textContent));
          assert.equal(lines.length,1);
          assert.match(lines[0],/while.*GetMessageW/);
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
          await button(/^Fiber/);
          await expect(/1140 Mbps modeled throughput/);
          assert.equal(await page.$eval(`${root} [aria-label="Inspect scene objects"] button[aria-pressed="true"]`,e=>e.innerText),'Fiber','Media controls and scene inspection must agree');
          await button(/Clear/);
          await expect(/1140 Mbps modeled throughput/);
          await button(/^Wireless$/,true);
          await expect(/Wireless: 360 Mbps modeled throughput/);
          await toggleView('2D');
          await toggleView('3D');
          await expect(/Wireless: 360 Mbps modeled throughput/);
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
          // Check each aligned product independently, including reversed asymmetric h.
          for (const [preset, x] of [['book', [3, 0, 6]], ['pulse', [1, 2, 1]], ['ramp', [0, 1, 2, 1]]]) {
            await select(0, preset);
            for (const [kernel, h] of [['average', [1 / 3, 1 / 3, 1 / 3]], ['impulse', [1]], ['weighted', [1, 2, 0.5]]]) {
              await select(1, kernel);
              for (let n = 0; n < x.length + h.length - 1; n++) {
                await input('#convolution-index', n);
                assert.equal(await page.$eval(`${root} [data-testid="convolution-overlap"]`, table => {
                  const region = table.parentElement.getBoundingClientRect();
                  return [...table.querySelectorAll('tbody tr:first-child td[data-overlap="true"]')].some(cell => {
                    const rect = cell.getBoundingClientRect();
                    return rect.left >= region.left + 111 && rect.right <= region.right + 1;
                  });
                }), true, 'An overlapping sample must be visible on mobile without manual scrolling');
                const rows = await page.$$eval(`${root} [data-testid="convolution-overlap"] tbody tr`, elements => elements.map(e => [...e.querySelectorAll('td')].map(td => ({k: Number(td.dataset.k), value: Number(td.dataset.value), overlap: td.dataset.overlap === 'true'}))));
                const sum = rows[2].reduce((total, cell) => {
                  const expected = (x[cell.k] ?? 0) * (h[n - cell.k] ?? 0);
                  assert.ok(Math.abs(cell.value - expected) < 1e-10);
                  assert.equal(cell.overlap, cell.k >= 0 && cell.k < x.length && n - cell.k >= 0 && n - cell.k < h.length);
                  return total + cell.value;
                }, 0);
                if (preset === 'book') {
                  const knownOutputs = { average: [1, 1, 3, 2, 2], impulse: [3, 0, 6], weighted: [3, 6, 7.5, 12, 3] };
                  assert.ok(Math.abs(sum - knownOutputs[kernel][n]) < 1e-10);
                }
                assert.ok(Math.abs(sum - x.reduce((total, value, k) => total + value * (h[n - k] ?? 0), 0)) < 1e-10);
                for (const cell of rows[1]) assert.equal(cell.value, h[n - cell.k] ?? 0);
                if (kernel === 'weighted' && n === 2) assert.deepEqual(rows[1].filter(c => c.k >= 0 && c.k <= 2).map(c => c.value), [0.5, 2, 1]);
              }
            }
          }
          await page.$eval(`${root} button[aria-label="Reset convolution lab"]`, e => e.click());
          for (let i = 0; i < 5; i++) {
            await button(/^Step n/);
            await expect(new RegExp(`Current sum · n = ${i} · computed`, 'i'));
          }
          assert.ok(
            await page.$(
              `${root} button[aria-label="All output samples computed"]:disabled`,
            ),
          );
          break;
        case 'bfs-queue-lab':
          await button(/^Step/);
          await expect(/Steps: 1 \| Current Queue: 2/);
          await expect(/Dequeued 1 \(depth 0\)\. Enqueued 2 children \[2, 3\] at tail/);
          await button(/^Step/);
          await button(/^Step/);
          // Both depth-1 siblings must leave the head before any depth-2 node.
          await expect(/Dequeued 3 \(depth 1\)/);
          for (let i = 0; i < 3; i++) await button(/^Step/);
          await expect(/Goal 13 Found!/);
          await expect(/Goal 13 GENERATED and enqueued/);
          break;
        case 'dfs-stack-lab':
          await button(/^Step/);
          await button(/^Step/);
          await expect(/Current Stack Depth: 3/);
          await button(/^Step/);
          await expect(/All children of F exhausted\. Backtracking: Popped F from stack, returning to B/);
          await expect(/Current Stack Depth: 2/);
          await expect(/Peak Depth \(Max O\(bm\)\): 3/);
          break;
        case 'ucs-priority-lab':
          await button(/^Step/);
          await expect(/Expanded S \(g=0\)\. Relaxed 3 edges\. Reordered Priority Queue/);
          await button(/^Step/);
          await expect(/Expanded A \(g=1\)/);
          await button(/^Step/);
          await expect(/Expanded B \(g=3\)/);
          await button(/^Step/);
          await expect(/Optimal Solution Found by UCS!/);
          await expect(/g\(n\) = 4/);
          break;
        case 'ipv6-compress':
          await checkbox(0);
          await expect(/2041:0:140f:0:0:0:875b:131b/);
          await expect(/Rule 1 applied/);
          await checkbox(1);
          await expect(/2041:0:140f::875b:131b/);
          await expect(/Both rules applied/);
          await select(0, 'expand');
          await expect(/fd00:0000:0000:4100:0000:0000:0000:0000/);
          await expect(/The double colon had covered 4 missing zero hextets/);
          break;
        case 'eui-64-lab':
          await select(0, 'FC-99-47-75-CE-E0');
          await button(/^Step/);
          await expect(/STEP 1 \/ 3/);
          await button(/^Step/);
          await expect(/STEP 2 \/ 3/);
          await expect(/inserted/);
          await button(/^Step/);
          await expect(/STEP 3 \/ 3/);
          await expect(/FE99:47FF:FE75:CEE0/);
          await expect(/2001:0DB8:ACAD:0001:FE99:47FF:FE75:CEE0\/64/);
          break;
        case 'ipv6-structure-3d':
          await expect(/Inspecting · all eight hextets/i);
          await button(/Subnet ID · \/16/);
          await expect(/Inspecting · Subnet ID/i);
          await expect(/1 hextet · 16 bits/);
          await button(/Global Routing Prefix · \/48/);
          await expect(/3 hextets · 48 bits/);
          await button(/Top view/);
          await button(/Reset 3D camera/);
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
    const canvas = await page.$(`${root} canvas`);
    const beforeZoom = Buffer.from(await canvas.screenshot());
    await page.focus(`${root} button[aria-label="Zoom camera in"]`);
    await page.keyboard.press('Enter');
    await ready();
    assert.equal(beforeZoom.equals(Buffer.from(await canvas.screenshot())), false, 'Keyboard zoom must change the rendered view');
    await page.focus(`${root} button[aria-label="Zoom camera out"]`);
    await page.keyboard.press('Enter');
    await ready();
    await page.focus(`${root} button[aria-label="Reset camera"]`);
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

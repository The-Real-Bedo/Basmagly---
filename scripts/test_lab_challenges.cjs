// Run against npm run dev. Browser and URL overrides match test_lab_interactions.cjs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const puppeteer = require('puppeteer-core');
const { LAB_CATALOG } = require('./test_curriculum.cjs');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const practice = new Set(['transmission-lab', 'topology-simulator', 'subnet-calculator', 'vacuum-world', 'edge-vs-cloud', 'iot-simulator', 'signal-convolution', 'win32-types-lab', 'network-devices', 'packet-journey', 'network-media', 'search-visualizer', 'signal-sampling', 'win32-code-lab', 'bfs-queue-lab', 'dfs-stack-lab', 'ucs-priority-lab', 'ipv6-compress', 'eui-64-lab', 'ipv6-structure-3d']);
const captures = process.env.BASMAGLY_CAPTURE_DIR;
(async () => {
  const browser = await puppeteer.launch({ executablePath: process.env.BASMAGLY_BROWSER_PATH || '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', headless: true, pipe: true });
  const page = await browser.newPage();
  const errors = [];
  // The app follows a saved choice, so seed matrix themes explicitly.
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('basmagly-theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    // Dismiss the below-768px warning gate so 375px panels render the app.
    try { sessionStorage.setItem('basmagly-gate-dismissed', '1'); } catch { /* opaque origins deny storage */ }
  });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  let root;
  let expandedChecks = 0, missionChecks = 0;
  async function ready() {
    await page.waitForFunction(root => { const e = document.querySelector(root); return e?.querySelector('h3') && !e.innerText.includes('Preparing'); }, { timeout: 30000 }, root);
    await delay(150);
  }
  async function click(selector) { await page.$eval(`${root} ${selector}`, e => { if (e.disabled) throw Error('Disabled control ' + selector); e.click(); }); await delay(30); }
  async function button(regex, inspector = false, ordinal = 0) {
    await page.$eval(root, (e, {source, inspector, ordinal}) => {
      const buttons = [...e.querySelectorAll('button')].filter(b => !b.closest('[data-testid="lab-challenge"]') && (inspector || !b.closest('[data-testid="lab-workbench"]')) && new RegExp(source, 'i').test(b.innerText || b.getAttribute('aria-label') || ''));
      const b = buttons.at(ordinal);
      if (!b || b.disabled) throw Error('Button unavailable ' + source);
      b.click();
    }, {source:regex.source, inspector, ordinal});
    await delay(50);
  }
  async function select(index, value, mission = false) {
    await page.$$eval(`${root} select${mission ? '[data-challenge-select]' : ':not([data-challenge-select])'}`, (els, {index,value}) => { const e=els[index]; if (!e || e.disabled) throw Error('Select unavailable'); e.value=value; e.dispatchEvent(new Event('change',{bubbles:true})); }, {index,value});
    await delay(40);
  }
  async function input(selector, value) {
    await page.$eval(`${root} ${selector}`, (e,value) => { if(e.disabled) throw Error('Input locked'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,String(value)); e.dispatchEvent(new Event('input',{bubbles:true})); e.dispatchEvent(new Event('change',{bubbles:true})); }, value);
    await delay(40);
  }
  async function status(expected) {
    assert.equal(await page.$eval(`${root} [data-testid="challenge-feedback"]`, e=>e.dataset.status), expected);
  }
  async function autoPlay() {
    await button(/^Auto play/i);
    await page.waitForFunction(root => {
      const buttons = [...document.querySelectorAll(`${root} button`)].filter(b => !b.closest('[data-testid="lab-workbench"]'));
      // While playing the toggle reads "Pause"; the search is done when it returns.
      if (buttons.some(b => /^Pause/.test(b.innerText))) return false;
      const step = buttons.find(b => /^Step/.test(b.innerText));
      return !step || step.disabled;
    }, {timeout: 30000}, root);
    await delay(120);
  }
  async function checkbox(index) {
    await page.$$eval(`${root} [data-lab-body] input[type="checkbox"]`, (els, index) => {
      // The challenge panel renders inside the lab body; its prediction boxes are not lab controls.
      const boxes = els.filter(e => !e.closest('[data-testid="lab-challenge"]'));
      const e = boxes[index];
      if (!e || e.disabled) throw Error('Checkbox unavailable');
      if (!e.checked) e.click();
    }, index);
    await delay(80);
  }
  async function predict(value) {
    await page.$eval(`${root} [data-testid="lab-challenge"] input[value="${value}"]`, e => { if (e.disabled) throw Error('Prediction locked'); e.click(); });
    await delay(60);
  }
  async function formState() {
    return page.$$eval(`${root} [data-lab-body] input, ${root} [data-lab-body] select, ${root} [data-lab-body] button[aria-pressed]`, els => els.map(e=>({tag:e.tagName,value:e.value,checked:e.checked,pressed:e.getAttribute('aria-pressed')})));
  }
  async function expand() {
    await page.focus(`${root} [data-testid="expand-experiment"]`);
    await page.keyboard.press('Enter');
    await page.waitForFunction(root => document.querySelector(root).closest('dialog').matches(':modal'),{},root);
    await delay(120);
  }
  async function shrink() {
    await page.keyboard.press('Escape');
    await page.waitForFunction(root => !document.querySelector(root).closest('dialog').matches(':modal'),{},root);
    await delay(100);
  }
  async function jump(part) {
    await page.$eval(root,(e,part)=>{const d=e.closest('dialog');[...d.querySelectorAll('[aria-label="Expanded lab navigation"] button')].find(b=>b.innerText===part).click();},part);
    assert.equal(await page.$eval(root,e=>{
      const d=e.closest('dialog'),header=d.firstElementChild,rect=header.getBoundingClientRect();
      return d.scrollTop===0 && rect.top>=0 && rect.bottom<=innerHeight;
    }),true,`${part} hid the expanded toolbar`);
  }
  try {
    if (captures) fs.mkdirSync(captures, {recursive:true});
    for (const width of (process.env.BASMAGLY_TEST_WIDTHS || '375,1280').split(',').map(Number)) for (const dark of (process.env.BASMAGLY_TEST_THEMES || 'light,dark').split(',').map(v=>v==='dark')) {
      await page.setViewport({width,height:900});
      await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:dark?'dark':'light'}]);
      for (const lab of LAB_CATALOG.filter(l=>!process.env.BASMAGLY_LAB_FILTER || process.env.BASMAGLY_LAB_FILTER.split(',').includes(l.id))) {
        await page.goto(`${process.env.BASMAGLY_TEST_URL || 'http://127.0.0.1:3000/'}?challenge-review=${width}-${dark}#course=${lab.courseId}&lecture=${lab.lectureId}&tab=interactive`);
        await page.waitForSelector(`[data-testid="open-${lab.id}"]`);
        await page.$eval(`[data-testid="open-${lab.id}"]`,e=>e.click());
        root=`[data-testid="experiment-${lab.id}"]`;
        await ready();
        assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('dark')),dark);
        const before=await formState();
        const canvas=await page.$(`${root} canvas`);
        const originalOverflow=await page.evaluate(()=>document.body.style.overflow);
        await expand();
        assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
        assert.deepEqual(await formState(),before,'Expansion changed inputs');
        if(canvas) assert.equal(await canvas.evaluate(e=>e.isConnected && e.closest('dialog').matches(':modal')),true,'Expansion replaced the canvas');
        for(let i=0;i<6;i++){await page.keyboard.press('Tab');assert.equal(await page.$eval(root,e=>e.closest('dialog').contains(document.activeElement)),true,'Focus escaped the modal');}
        await jump('Scene');
        assert.equal(await page.$eval(root,e=>{const d=e.closest('dialog'),b=d.querySelector('[data-testid="expanded-lab-body"]');return d.scrollWidth<=d.clientWidth && b.scrollWidth<=b.clientWidth}),true,`${lab.id}: expanded overflow`);
        if(captures && ['osi-visualizer','network-3d','signal-convolution'].includes(lab.id)) await page.screenshot({path:`${captures}/${lab.id}-expanded-${width}-${dark}.png`});
        await jump('Explanation');
        assert.equal(await page.$eval(`${root} [data-lab-observation]`,e=>e.open),true);
        await jump('Controls');
        await shrink();
        assert.equal(await page.evaluate(()=>document.body.style.overflow),originalOverflow);
        assert.equal(await page.$eval(`${root} [data-testid="expand-experiment"]`,e=>e===document.activeElement),true,'Exit did not restore focus');
        assert.deepEqual(await formState(),before,'Closing changed inputs');
        if(canvas) {assert.equal(await canvas.evaluate(e=>e.isConnected),true,'Exit replaced the canvas');await canvas.dispose();}
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth===document.documentElement.clientWidth),true,`${lab.id}: normal overflow`);
        expandedChecks++;
        if (practice.has(lab.id)) {
          const missions=await page.$$eval(`${root} [data-challenge-select] option`,els=>els.map(e=>e.value));
          assert.ok(missions.length>=2,`${lab.id}: expected at least two missions, found ${missions.length}`);
          for (const [index, mission] of missions.entries()) {
            await select(0,mission,true);
            await click('[data-testid="start-challenge"]');
            assert.equal(await page.$(`${root} [data-testid="challenge-feedback"]`),null,'Restart retained old feedback');
            await click('[data-testid="check-challenge"]');
            assert.notEqual(await page.$eval(`${root} [data-testid="challenge-feedback"]`,e=>e.dataset.status),'success','Mission passed without its required actions');
            switch(lab.id) {
              case 'transmission-lab':
                if(index===0) {
                  await click('[data-testid="lab-challenge"] input[value="2"]');
                  await button(/إرسال الفريم الآن/);await delay(1000);await status('retry');
                  await click('[data-testid="lab-challenge"] input[value="2"]');
                  await click('[data-testid="lab-challenge"] input[value="3"]');
                } else {
                  await button(/^PC-4$/,true);await button(/Leave group/,true);
                  await button(/^PC-5$/,true);await button(/Join group/,true);
                  await button(/إرسال الفريم الآن/);await delay(1000);
                }
                break;
              case 'topology-simulator':
                if(index===0) await button(/^Switch to PC-3 cable$/,true);
                await button(/ابعت حزمة/);await delay(1100);
                break;
              case 'subnet-calculator':
                await input('input[type="range"]',index===0?24:32);await status('retry');
                await input('input[type="range"]',index===0?26:31);
                break;
              case 'vacuum-world':
                for(let i=0;i<(index===0?3:2);i++)await button(/^Step/);
                break;
              case 'edge-vs-cloud':
                if(index===0) await button(/^Edge/);
                else await button(/Internet disconnected/);
                await button(/Run scenario/);
                if(index===0){await expand();await delay(800);await shrink();}else await delay(1100);
                break;
              case 'iot-simulator':
                await input('#iot-reading',index===0?18:28);
                await button(/Run flow/);await status('pending');await delay(2400);
                break;
              case 'signal-convolution':
                if (mission === 'sig-slide-example1') {
                  for(let i=0;i<4;i++)await button(/^Step n/);
                } else if (mission === 'sig-slide-example2') {
                  await input('input[aria-label="Convolution observation window size W"]',12);
                } else if (mission === 'average-peak') {
                  await select(0,'book');
                  await select(1,'average');
                  for(let i=0;i<5;i++)await button(/^Step n/);
                  await input('#convolution-index',2);
                } else {
                  await select(1,'weighted');
                  for(let i=0;i<3;i++)await button(/^Step n/);
                  await input('#convolution-index',2);
                }
                break;
              case 'win32-types-lab':
                if(index===0){await button(/^Message parameters/);await button(/^UINT_PTR$/,false,-1);}else await button(/^Unicode build/);
                break;
              case 'network-devices':
                await button(index===0?/Hub/:/Switch/);
                if(index===1) await click('[data-testid="lab-challenge"] input[value="pca"]');
                await button(index===0?/إرسال متزامن/:/إرسال عادي/);await delay(index===0?4000:3000);
                if(index===1){await status('retry');await click('[data-testid="lab-challenge"] input[value="pca"]');await click('[data-testid="lab-challenge"] input[value="pcc"]');}
                break;
              case 'packet-journey':
                await button(/الخطوة الجاية/);
                if(index===1){await button(/الخطوة الجاية/);for(const value of ['sourceMac','destMac','ttl'])await click(`[data-testid="lab-challenge"] input[value="${value}"]`);}
                else {await click('[data-testid="lab-challenge"] input[value="ttl"]');await status('retry');await click('[data-testid="lab-challenge"] input[value="ttl"]');}
                break;
              case 'network-media':
                if(index===0) await button(/^Fiber/);
                else await button(/Clear/);
                break;
              case 'search-visualizer':
                // Missions: Goal-13 slide trace (BFS), least-cost route (UCS), BFS cost trap.
                if (mission === 'dual-target-trace') {
                  await button(/^BFS/);
                  for(let i=0;i<6;i++)await button(/^Step/);
                } else if (mission === 'least-cost') {
                  await button(/^UCS/);
                  for(let i=0;i<4;i++)await button(/^Step/);
                } else {
                  await button(/^BFS/);
                  for(let i=0;i<2;i++)await button(/^Step/);
                }
                break;
              case 'bfs-queue-lab':
                await autoPlay();
                break;
              case 'dfs-stack-lab':
                await autoPlay();
                break;
              case 'ucs-priority-lab':
                await autoPlay();
                break;
              case 'ipv6-compress':
                if (mission === 'm-expand-4100') {
                  await select(1, 'p-expand-4100');
                } else {
                  await checkbox(0);
                  await checkbox(1);
                  if (mission === 'm-run-choice') await predict('run-long');
                }
                break;
              case 'eui-64-lab':
                for(let i=0;i<3;i++)await button(/^Step/);
                if (mission === 'm-eui-predict') await predict('p-fe');
                break;
              case 'ipv6-structure-3d':
                if (mission === 'm-structure-predict') {
                  await predict('p-subnet');
                  await button(/Subnet ID · \/16/);
                } else {
                  await button(/Global Routing Prefix · \/48/);
                  await button(/Subnet ID · \/16/);
                  await button(/Interface ID · \/64/);
                }
                break;
              case 'signal-sampling':
                await input(index===0?'input[aria-label="Sampling rate in samples per second"]':'input[aria-label="Quantization bit depth"]',index===0?14:5);
                await button(/Run sampling/);await status('retry');
                await input(index===0?'input[aria-label="Sampling rate in samples per second"]':'input[aria-label="Quantization bit depth"]',index===0?15:6);
                await button(/Run sampling/);
                break;
              case 'win32-code-lab':
                await button(index===0?/^Press A/:/^Close and quit/);
                await button(/Run trace/);
                for(let i=0;i<(index===0?5:3);i++)await button(/Step/);
                break;
            }
            await status('success');
            missionChecks++;
            if(captures) {
              await page.addStyleTag({content:'header.sticky, nav.sticky {visibility:hidden}'});
              await (await page.$(`${root} [data-testid="lab-challenge"]`)).screenshot({path:`${captures}/${lab.id}-${mission}-${width}-${dark}.png`});
            }
            // Success must be revoked by a changed scenario, not kept as a badge.
            if(index===1) {
              switch(lab.id) {
                case 'transmission-lab':await button(/^PC-4$/,true);await button(/Join group/,true);break;
                case 'topology-simulator':await button(/^PC-1 to PC-3 link$/,true);break;
                case 'subnet-calculator':await input('input[type="range"]',30);break;
                case 'vacuum-world':await button(/^Room A$/,true);await button(/Toggle dirt/,true);break;
                case 'edge-vs-cloud':await button(/Internet connected/);break;
                case 'iot-simulator':await input('#iot-reading',29);break;
                case 'signal-convolution':await select(1,'impulse');break;
                case 'win32-types-lab':await button(/^Narrow build/);break;
                case 'network-devices':await select(1,'pcb');break;
                case 'packet-journey':await button(/الخطوة الجاية/);break;
                case 'network-media':await button(/Interference/);break;
                case 'search-visualizer':await button(/^Lecture 4 tree/);break;
                case 'bfs-queue-lab':await button(/^Reset/);break;
                case 'dfs-stack-lab':await button(/^Reset/);break;
                case 'ucs-priority-lab':await button(/^Reset/);break;
                case 'ipv6-compress':await select(0,'compress');break;
                case 'eui-64-lab':await select(0,'FC-99-47-75-CE-E0');break;
                case 'ipv6-structure-3d':await button(/All cells/);break;
                case 'signal-sampling':await input('input[aria-label="Quantization bit depth"]',5);break;
                case 'win32-code-lab':await button(/^Press A/);break;
              }
              assert.notEqual(await page.$eval(`${root} [data-testid="challenge-feedback"]`,e=>e.dataset.status),'success','Changed state retained a stale pass');
            }
          }
          await click('[data-testid="start-challenge"]');
          await click('[data-testid="check-challenge"]');
          assert.notEqual(await page.$eval(`${root} [data-testid="challenge-feedback"]`,e=>e.dataset.status),'success');
        }
        console.log(`Feature checks passed: ${lab.id} ${width} ${dark?'dark':'light'}`);
      }
    }
    assert.deepEqual(errors,[],'Application errors');
    console.log(`Expanded views: ${expandedChecks}; completed missions: ${missionChecks}.`);
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});

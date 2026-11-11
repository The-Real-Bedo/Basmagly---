import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Binary, Play, RotateCcw, StepForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabChallenge, challengeFeedback, type ChallengeMission } from './LabChallenge';

const PRESETS = [
  { label: 'Deck example · FC-99-47-75-CE-E0', value: 'FC-99-47-75-CE-E0' },
  { label: 'Cisco-looking · 00-1A-2B-3C-4D-5E', value: '00-1A-2B-3C-4D-5E' },
  { label: 'All zeros · 00-00-00-00-00-00', value: '00-00-00-00-00-00' },
];

const normalizeMac = (input: string): string[] | null => {
  const cleaned = input.trim().replace(/[-\s:]/g, '');
  if (!/^[0-9a-fA-F]{12}$/.test(cleaned)) return null;
  return cleaned.match(/.{2}/g)!.map(byte => byte.toUpperCase());
};

const toBinary = (byte: string) => parseInt(byte, 16).toString(2).padStart(8, '0');
const flipUlBit = (byte: string) => (parseInt(byte, 16) ^ 0x02).toString(16).toUpperCase().padStart(2, '0');

const buildSteps = (bytes: string[]) => {
  const flippedFirst = flipUlBit(bytes[0]);
  const modified = [flippedFirst, bytes[1], bytes[2], 'FF', 'FE', bytes[3], bytes[4], bytes[5]];
  const interfaceId = [0, 2, 4, 6].map(start => modified.slice(start, start + 2).join('')).join(':');
  return { flippedFirst, modified, interfaceId };
};

export const Eui64Lab: React.FC = () => {
  const [macInput, setMacInput] = useState(PRESETS[0].value);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const bytes = useMemo(() => normalizeMac(macInput), [macInput]);
  const built = useMemo(() => (bytes ? buildSteps(bytes) : null), [bytes]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const reset = () => { clearTimers(); setRunning(false); setStep(0); };
  useEffect(() => { reset(); }, [macInput]);
  useEffect(() => () => clearTimers(), []);

  const run = () => {
    if (!bytes) return;
    reset();
    setRunning(true);
    [1, 2, 3].forEach((nextStep, index) => {
      timers.current.push(setTimeout(() => setStep(nextStep), index * 900));
    });
    timers.current.push(setTimeout(() => setRunning(false), 2800));
  };
  const stepForward = () => setStep(value => Math.min(value + 1, 3));

  const missions: ChallengeMission[] = [
    {
      id: 'm-eui-deck', title: 'Rebuild the deck example', titleAr: 'أعد بناء مثال الديك',
      goal: 'Load FC-99-47-75-CE-E0 and walk through all three EUI-64 steps to reach FE99:47FF:FE75:CEE0.',
      goalAr: 'حمّل العنوان FC-99-47-75-CE-E0 وامشِ على خطوات الـ EUI-64 التلاتة لحد ما توصل ‏FE99:47FF:FE75:CEE0.',
      hint: 'Insert FFFE first, then flip the 7th bit of the OUI: FC (1111 1100) becomes FE (1111 1110).',
      hintAr: 'أدرج FFFE الأول، وبعدها اقلب البتة السابعة من الـ OUI: ‏FC (1111 1100) بتقوى FE (1111 1110).',
      start: () => { setMacInput(PRESETS[0].value); reset(); },
      evaluate: () => (step === 3 && built?.interfaceId === 'FE99:47FF:FE75:CEE0'
        ? challengeFeedback('success', 'Correct: FE99:47FF:FE75:CEE0 — the same Interface ID as the lecture diagram.', 'صح: ‏FE99:47FF:FE75:CEE0 — نفس الـ Interface ID اللي في رسم المحاضرة.')
        : challengeFeedback('retry', 'Advance all three steps (split, insert, flip) with the deck MAC loaded.', 'كمّل الخطوات التلاتة (تقسيم، إدراج، قلب) وعنوان الـ MAC بتاع الديك محمّل.')),
    },
    {
      id: 'm-eui-001a', title: 'Flip an all-zero OUI', titleAr: 'اقلب OUI كله أصفار',
      goal: 'Load 00-1A-2B-3C-4D-5E and complete the process. Watch what flipping the U/L bit does to 00.',
      goalAr: 'حمّل العنوان 00-1A-2B-3C-4D-5E وكمّل العملية. شوف قلب بتة الـ U/L بيعمل إيه في 00.',
      hint: '00 is 0000 0000; flipping the second-least-significant bit turns it into 02.',
      hintAr: 'الـ 00 هي 0000 0000؛ وقلب البتة التانية من اليمين بيحوّلها لـ 02.',
      start: () => { setMacInput(PRESETS[1].value); reset(); },
      evaluate: () => (step === 3 && built?.interfaceId === '021A:2BFF:FE3C:4D5E'
        ? challengeFeedback('success', 'Correct: 021A:2BFF:FE3C:4D5E — the 00 OUI became 02 after the U/L flip.', 'صح: ‏021A:2BFF:FE3C:4D5E — الـ OUI بتاع 00 بقى 02 بعد قلب بتة الـ U/L.')
        : challengeFeedback('retry', 'Complete the three steps with this MAC and compare the first octet before and after the flip.', 'كمّل الخطوات التلاتة بالـ MAC ده وقارن أول octet قبل وبعد القلب.')),
    },
    {
      id: 'm-eui-predict', title: 'Predict the U/L flip result', titleAr: 'توقّع نتيجة قلب بتة الـ U/L',
      goal: 'With FC-99-47-75-CE-E0 loaded, predict the first octet after the U/L bit flip, then verify with Step 3.',
      goalAr: 'وعنوان FC-99-47-75-CE-E0 محمّل، توقّع قيمة أول octet بعد قلب بتة الـ U/L، وبعدها اتأكد بالخطوة 3.',
      hint: 'The U/L bit is the second bit from the right of the first octet: 1111 1100 → flip → 1111 1110.',
      hintAr: 'بتة الـ U/L هي التانية من اليمين في أول octet: ‏1111 1100 → قلب → 1111 1110.',
      prediction: {
        label: 'After the flip, FC becomes…', labelAr: 'بعد القلب، الـ FC بتبقى…',
        options: [
          { id: 'p-fe', label: 'FE (1111 1110)' },
          { id: 'p-ff', label: 'FF (1111 1111)' },
          { id: 'p-fc', label: 'FC (stays the same)' },
        ],
      },
      start: () => { setMacInput(PRESETS[0].value); reset(); },
      evaluate: (prediction) => {
        if (step < 3) return challengeFeedback('pending', 'Advance to Step 3 to verify your prediction.', 'اتقدّم للخطوة 3 عشان تتأكد من توقعك.');
        if (!prediction.includes('p-fe')) return challengeFeedback('retry', 'The flip touches exactly one bit — check the highlighted position in the binary row.', 'القلب بيمس بتة واحدة بس — بص على المكان المظلل في صف الـ binary.');
        return challengeFeedback('success', 'Correct: flipping the U/L bit turned FC into FE, so the Interface ID starts with FE99.', 'صح: قلب بتة الـ U/L حوّل FC لـ FE، فالـ Interface ID بيبدأ بـ FE99.');
      },
    },
  ];

  const binaryRow = bytes ? toBinary(bytes[0]) : '';
  const binaryAfter = bytes ? toBinary(built!.flippedFirst) : '';
  const stepStatusEn = (() => {
    if (!bytes) return 'Enter a valid 12-digit hexadecimal MAC address (with or without separators).';
    if (step === 0) return 'Ready: the MAC address is loaded — walk through the three EUI-64 steps (split, insert FFFE, flip the U/L bit).';
    if (step === 1) return 'Step 1 · Split: the 24-bit OUI (first three bytes) is separated from the 24-bit device identifier (last three bytes).';
    if (step === 2) return 'Step 2 · Insert: the 16-bit value FFFE is placed in the middle, turning 48 bits into 64.';
    return 'Step 3 · Flip: the 7th bit (the Universally/Locally bit) of the OUI is reversed — FC becomes FE. The result is the EUI-64 Interface ID.';
  })();
  const stepStatusAr = (() => {
    if (!bytes) return 'اكتب عنوان MAC صحيح من 12 خانة ست عشرية (بفواصل أو من غيرها).';
    if (step === 0) return 'جاهز: عنوان الـ MAC متحمّل ومستني خطوات الـ EUI-64 التلاتة.';
    if (step === 1) return 'الخطوة 1 · تقسيم: فصلنا الـ OUI (24 بت — أول تلات بايتات) عن معرّف الجهاز (24 بت — آخر تلات بايتات).';
    if (step === 2) return 'الخطوة 2 · إدراج: القيمة FFFE (16 بت) اتحطت في النص، فالعنوان بقى 64 بت.';
    return 'الخطوة 3 · قلب: البتة السابعة (بتة الـ Universally/Locally) في الـ OUI اتقلبت — الـ FC بقت FE. والناتج هو الـ EUI-64 Interface ID.';
  })();

  const slotBytes = bytes ? (step >= 3 ? built!.modified : step >= 2 ? [bytes[0], bytes[1], bytes[2], 'FF', 'FE', bytes[3], bytes[4], bytes[5]] : [bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5]]) : [];

  return (
    <section aria-labelledby="eui64-title" className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm space-y-5 dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Binary className="h-5 w-5" /></div>
          <div>
            <h3 id="eui64-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">EUI-64 Interface ID Builder</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">حوّل الـ MAC بتاع 48 بت لـ Interface ID بطول 64 بت بخطوات المحاضرة</ArabicText>
          </div>
        </div>
        <button type="button" onClick={reset} aria-label="Reset EUI-64 steps" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-beige-300 bg-white text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200"><RotateCcw className="h-4 w-4" /></button>
      </header>

      <LabChallenge missions={missions} busy={running} />

      <div className="space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-[13px] font-semibold text-stone-700 dark:text-zinc-300">MAC address</span>
            <input
              aria-label="MAC address input"
              value={macInput}
              disabled={running}
              onChange={event => setMacInput(event.target.value)}
              spellCheck={false}
              className="min-h-11 w-full rounded-xl border border-beige-300 bg-white px-3 font-mono text-sm text-stone-800 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200"
            />
          </label>
          <label className="space-y-1.5">
            <span className="text-[13px] font-semibold text-stone-700 dark:text-zinc-300">Preset</span>
            <select aria-label="MAC preset" disabled={running} value={PRESETS.some(p => p.value === macInput) ? macInput : ''} onChange={event => setMacInput(event.target.value)} className="min-h-11 w-full rounded-xl border border-beige-300 bg-white px-3 text-sm text-stone-800 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200">
              <option value="" disabled>Choose a deck MAC…</option>
              {PRESETS.map(preset => <option key={preset.value} value={preset.value}>{preset.label}</option>)}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={running || !bytes || step === 3} onClick={run} className="inline-flex min-h-11 min-w-36 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-stone-900 px-4 text-sm font-bold text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"><Play className="h-4 w-4" /><span className="font-arabic">تشغيل</span><span className="font-mono text-[13px] opacity-80">(Run)</span></button>
          <button type="button" disabled={running || !bytes || step === 3} onClick={stepForward} className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-beige-300 bg-white px-4 text-sm font-semibold text-stone-800 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200"><StepForward className="h-4 w-4" />Step</button>
          <button type="button" onClick={reset} aria-label="Reset EUI-64 simulation" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-beige-300 bg-white text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200"><RotateCcw className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <div>
          <p className="pb-2 font-mono text-[13px] font-bold uppercase text-stone-500 dark:text-zinc-400">{step >= 2 ? 'Modified 64-bit EUI-64 (Step 2 view)' : 'Original 48-bit MAC'}</p>
          {bytes ? (
            <div className="flex flex-wrap items-start gap-2">
              {(step >= 2 ? slotBytes : bytes).map((byte, index) => {
                const isInserted = step >= 2 && (index === 3 || index === 4);
                const isFlipped = step >= 3 && index === 0;
                const tone = step >= 2
                  ? index <= 2 ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200' : isInserted ? 'border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-200' : 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200'
                  : 'border-beige-300 bg-[#FAF7F2] text-stone-800 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-200';
                const label = isInserted ? 'inserted' : isFlipped ? 'flipped' : step >= 2 ? (index <= 2 ? 'OUI' : 'device') : index < 3 ? 'OUI · 24 bits' : 'device · 24 bits';
                return (
                  <React.Fragment key={index}>
                    {step >= 1 && step < 2 && index === 3 && (
                      <span aria-hidden="true" className="mx-1 flex min-h-14 flex-col items-center justify-center px-1">
                        <span className="h-8 w-px bg-stone-400 dark:bg-zinc-500" />
                        <span className="text-[13px] font-semibold text-stone-500 dark:text-zinc-400">split</span>
                      </span>
                    )}
                    <span className={`inline-flex min-w-14 flex-col items-center rounded-lg border px-3 py-2 font-mono text-sm font-bold ${tone} ${isFlipped ? 'ring-2 ring-amber-400 dark:ring-amber-500' : ''}`}>
                      {byte}
                      <span className="text-[13px] font-semibold text-stone-500 dark:text-zinc-400">{label}</span>
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-stone-600 dark:text-zinc-400">Waiting for a valid MAC address… <span className="font-arabic">في انتظار عنوان MAC صحيح…</span></p>
          )}
        </div>
        {bytes && (
          <div className="rounded-xl border border-beige-300 bg-[#FAF7F2] p-3 font-mono text-[13px] text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-300">
            <p>U/L flip · first octet:</p>
            <p className="pt-1">
              <span>{binaryRow.slice(0, 6)}</span>
              <span className={step >= 3 ? 'rounded bg-amber-200 px-1 font-bold text-amber-900 dark:bg-amber-800 dark:text-amber-100' : ''}>{binaryRow.slice(6)}</span>
              <span className="px-2 text-stone-400">→</span>
              <span>{step >= 3 ? binaryAfter.slice(0, 6) : '······'}</span>
              <span className={step >= 3 ? 'rounded bg-amber-300 px-1 font-bold text-amber-950 dark:bg-amber-700 dark:text-amber-50' : ''}>{step >= 3 ? binaryAfter.slice(6) : '··'}</span>
            </p>
          </div>
        )}
      </div>

      <div aria-live="polite" className="space-y-2 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[13px] font-bold uppercase text-amber-900 dark:text-amber-300">Step {step} / 3 · Interface ID</span>
          {built && bytes && <span className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">{step >= 3 ? built.interfaceId : '— : — : — : —'}</span>}
        </div>
        <p className="text-[15px] font-semibold text-stone-800 dark:text-zinc-200">{stepStatusEn}</p>
        <ArabicText className="text-sm text-stone-700 dark:text-zinc-300">{stepStatusAr}</ArabicText>
        {bytes && built && (
          <p className="text-[13px] text-stone-600 dark:text-zinc-400">
            With a /64 prefix such as <span className="font-mono">2001:0DB8:ACAD:0001::/64</span>, the host address becomes <span className="font-mono font-bold">2001:0DB8:ACAD:0001:{step >= 3 ? built.interfaceId : '…'}/64</span>.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">What to observe</h4>
        <p className="pt-1 text-sm leading-relaxed text-stone-700 dark:text-zinc-300">The EUI-64 Interface ID is made of three parts: the 24-bit OUI with the 7th bit reversed, the inserted 16-bit FFFE, and the 24-bit device identifier. Under SLAAC the client may instead generate a random 64-bit Interface ID — Windows uses that method.</p>
        <ArabicText className="pt-1 text-sm leading-relaxed text-stone-600 dark:text-zinc-400">الـ EUI-64 Interface ID متكوّن من تلات أجزاء: الـ OUI (24 بت) وبتته السابعة مقلوبة، والقيمة FFFE المدرجة (16 بت)، ومعرّف الجهاز (24 بت). وتحت الـ SLAAC العميل ممكن بدل كده يولّد Interface ID عشوائي بطول 64 بت — وWindows بيستخدم الطريقة دي.</ArabicText>
      </div>
    </section>
  );
};

export default Eui64Lab;

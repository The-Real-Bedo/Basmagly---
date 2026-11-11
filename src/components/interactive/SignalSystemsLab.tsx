import React, { useState } from 'react';
import { Activity, RotateCcw, Sliders, Calculator, CheckCircle2 } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

type SystemKind = 'movingAverage' | 'accumulator' | 'gain' | 'square' | 'index' | 'advance';
type VectorKind = 'mixed' | 'ramp' | 'impulse';
type LabMode = 'properties' | 'difference-equation';

const INDEXES = [-2, -1, 0, 1, 2];
const VECTORS: Record<VectorKind, number[]> = {
  mixed: [1, 2, -1, 0, 1],
  ramp: [-1, 0, 1, 2, 1],
  impulse: [0, 0, 1, 0, 0],
};
const SYSTEMS: Record<SystemKind, { name: string; formula: string; linear: boolean; invariant: boolean; stable: boolean; note: string; noteAr: string }> = {
  movingAverage: { name: '★ SIG Ex 1: 3-Pt Moving Avg', formula: 'y[n] = ⅓(x[n] + x[n−1] + x[n−2])', linear: true, invariant: true, stable: true, note: 'From SIG Slide p. 21. LTI FIR moving-average filter; output is the average of current and past 2 inputs.', noteAr: 'من سلايد 21 في ملف SIG. مرشح متوسط متحرك LTI FIR؛ الخرج هو متوسط المدخل الحالي والمدخلين السابقين.' },
  accumulator: { name: '★ SIG Ex 2: Accumulator', formula: 'y[n] = y[n−1] + x[n]', linear: true, invariant: true, stable: false, note: 'From SIG Slide p. 24. LTI IIR recursive accumulator; output is running sum from initial rest.', noteAr: 'من سلايد 24 في ملف SIG. مجمّع تكراري LTI IIR؛ الخرج هو المجموع التراكمي من حالة السكون الابتدائية.' },
  gain: { name: 'Gain ×2', formula: 'T{x}[n] = 2x[n]', linear: true, invariant: true, stable: true, note: 'A fixed gain preserves superposition, shifts, and boundedness.', noteAr: 'المعامل الثابت بيحافظ على التراكب والإزاحة ومحدودية الخرج.' },
  square: { name: 'Square', formula: 'T{x}[n] = x[n]²', linear: false, invariant: true, stable: true, note: 'Squaring breaks superposition, but is shift-invariant and maps bounded inputs to bounded outputs.', noteAr: 'التربيع بيكسر التراكب، لكنه ثابت مع الإزاحة وبيحوّل المدخل المحدود لخرج محدود.' },
  index: { name: 'Index-weighted', formula: 'T{x}[n] = n · x[n]', linear: true, invariant: false, stable: false, note: 'The index multiplier preserves superposition, but it changes when the signal is shifted; a bounded constant input also produces an unbounded output.', noteAr: 'الضرب في رقم العينة بيحافظ على التراكب، لكنه بيتغير مع الإزاحة؛ ومدخل ثابت ومحدود ممكن يطلع خرج غير محدود.' },
  advance: { name: 'Advance by one', formula: 'T{x}[n] = x[n + 1]', linear: true, invariant: true, stable: true, note: 'A fixed one-sample advance preserves superposition and time shifts.', noteAr: 'التقديم بعينة واحدة بيحافظ على التراكب وعلى الإزاحة الزمنية.' },
};

const valueAt = (values: number[], n: number) => INDEXES.includes(n) ? values[n + 2] : 0;
const apply = (kind: SystemKind, source: (n: number) => number, n: number) => {
  if (kind === 'movingAverage') return (source(n) + source(n - 1) + source(n - 2)) / 3;
  if (kind === 'accumulator') {
    let sum = 0;
    for (let k = -2; k <= n; k++) sum += source(k);
    return sum;
  }
  if (kind === 'gain') return 2 * source(n);
  if (kind === 'square') return source(n) ** 2;
  if (kind === 'index') return n * source(n);
  return source(n + 1);
};
const clean = (value: number) => Number(value.toFixed(2));
const show = (value: number) => Object.is(value, -0) ? '0' : `${clean(value)}`;

const Sequence: React.FC<{ title: string; values: number[]; accent?: boolean }> = ({ title, values, accent = false }) => (
  <div className="min-w-0">
    <p className="mb-2 text-xs font-semibold text-stone-700 dark:text-stone-300">{title}</p>
    <div className="flex flex-wrap gap-2" role="list" aria-label={title}>
      {values.map((value, index) => (
        <div key={`${title}-${index}`} role="listitem" className={`min-w-12 rounded-xl border px-2 py-1 text-center ${accent ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30' : 'border-beige-300 bg-white dark:border-stone-700 dark:bg-stone-900'}`}>
          <span className="block font-mono text-xs text-stone-500 dark:text-zinc-400">n={INDEXES[index]}</span>
          <span className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100">{show(value)}</span>
        </div>
      ))}
    </div>
  </div>
);

export const SignalSystemsLab: React.FC = () => {
  const [labMode, setLabMode] = useState<LabMode>('properties');

  // --- Properties Mode State ---
  const [system, setSystem] = useState<SystemKind>('movingAverage');
  const [firstVector, setFirstVector] = useState<VectorKind>('mixed');
  const [secondVector, setSecondVector] = useState<VectorKind>('impulse');
  const [alpha, setAlpha] = useState(1);
  const [beta, setBeta] = useState(1);
  const [shift, setShift] = useState(1);

  // --- Difference Equation Studio State ---
  // Feedback order N (0 ... 5), feedforward order M (0 ... 5)
  const [orderN, setOrderN] = useState<number>(0);
  const [orderM, setOrderM] = useState<number>(2);
  // Feedforward b0 ... b5, Feedback a1 ... a5 (a0 is normalized to 1)
  const [bCoeffs, setBCoeffs] = useState<number[]>([1 / 3, 1 / 3, 1 / 3, 0, 0, 0]);
  const [aCoeffs, setACoeffs] = useState<number[]>([-1, 0, 0, 0, 0]); // a1, a2, a3, a4, a5
  const [diffInputSignal, setDiffInputSignal] = useState<'impulse' | 'step' | 'pulse' | 'ramp'>('impulse');

  const x = VECTORS[firstVector];
  const z = VECTORS[secondVector];
  const sourceA = (n: number) => valueAt(x, n);
  const sourceB = (n: number) => valueAt(z, n);
  const combined = INDEXES.map((n) => alpha * sourceA(n) + beta * sourceB(n));
  const left = INDEXES.map((n) => clean(apply(system, (m) => valueAt(combined, m), n)));
  const right = INDEXES.map((n) => clean(alpha * apply(system, sourceA, n) + beta * apply(system, sourceB, n)));
  const delayed = (n: number) => sourceA(n - shift);
  const shiftedBefore = INDEXES.map((n) => clean(apply(system, delayed, n)));
  const shiftedAfter = INDEXES.map((n) => clean(apply(system, sourceA, n - shift)));
  const sameLinear = left.every((value, i) => Math.abs(value - right[i]) < 1e-8);
  const sameShift = shiftedBefore.every((value, i) => Math.abs(value - shiftedAfter[i]) < 1e-8);
  const properties = SYSTEMS[system];

  // Difference Equation Dynamic Computation
  const NUM_SAMPLES = 12;
  const inputSequence: number[] = Array.from({ length: NUM_SAMPLES }, (_, n) => {
    if (diffInputSignal === 'impulse') return n === 0 ? 1 : 0;
    if (diffInputSignal === 'step') return 1;
    if (diffInputSignal === 'pulse') return [1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0][n] ?? 0;
    return n; // ramp
  });

  // y[n] = sum_{k=0}^M b_k x[n-k] - sum_{k=1}^N a_k y[n-k]
  const diffOutputSequence: number[] = [];
  const calculationSteps: { n: number; xVal: number; ff: number; fb: number; yVal: number }[] = [];

  for (let n = 0; n < NUM_SAMPLES; n++) {
    let ff = 0;
    for (let k = 0; k <= orderM; k++) {
      const xDelayed = (n - k >= 0) ? inputSequence[n - k] : 0;
      ff += (bCoeffs[k] ?? 0) * xDelayed;
    }

    let fb = 0;
    for (let k = 1; k <= orderN; k++) {
      const yDelayed = (n - k >= 0) ? (diffOutputSequence[n - k] ?? 0) : 0;
      // In LCCDE standard form: a_0 y[n] + sum a_k y[n-k] = ... => y[n] = ... - sum a_k y[n-k]
      fb -= (aCoeffs[k - 1] ?? 0) * yDelayed;
    }

    const yVal = ff + fb;
    diffOutputSequence.push(clean(yVal));
    calculationSteps.push({ n, xVal: inputSequence[n], ff: clean(ff), fb: clean(fb), yVal: clean(yVal) });
  }

  // Symbolic Equation String Formatter
  const renderFormula = () => {
    const ffParts: string[] = [];
    for (let k = 0; k <= orderM; k++) {
      const b = clean(bCoeffs[k] ?? 0);
      if (b === 0 && orderM > 0) continue;
      const bStr = Math.abs(b) === 1 && k > 0 ? '' : `${clean(Math.abs(b))}`;
      const sign = b < 0 ? '− ' : (ffParts.length > 0 ? '+ ' : '');
      const term = k === 0 ? 'x[n]' : `x[n−${k}]`;
      ffParts.push(`${sign}${bStr}${term}`);
    }

    const fbParts: string[] = [];
    for (let k = 1; k <= orderN; k++) {
      const a = clean(aCoeffs[k - 1] ?? 0);
      if (a === 0) continue;
      // Subtracting a_k: - a_k y[n-k]
      const sign = a > 0 ? '− ' : '+ ';
      const aStr = Math.abs(a) === 1 ? '' : `${clean(Math.abs(a))}`;
      fbParts.push(`${sign}${aStr}y[n−${k}]`);
    }

    const rightHand = [...ffParts, ...fbParts].join(' ') || '0';
    return `y[n] = ${rightHand}`;
  };

  const loadPreset = (preset: 'sig-ma' | 'sig-acc' | 'decay' | 'resonator') => {
    if (preset === 'sig-ma') {
      setOrderN(0);
      setOrderM(2);
      setBCoeffs([1 / 3, 1 / 3, 1 / 3, 0, 0, 0]);
      setACoeffs([0, 0, 0, 0, 0]);
      setDiffInputSignal('step');
    } else if (preset === 'sig-acc') {
      setOrderN(1);
      setOrderM(0);
      setBCoeffs([1, 0, 0, 0, 0, 0]);
      setACoeffs([-1, 0, 0, 0, 0]); // y[n] = y[n-1] + x[n] => a1 = -1
      setDiffInputSignal('impulse');
    } else if (preset === 'decay') {
      setOrderN(1);
      setOrderM(0);
      setBCoeffs([1, 0, 0, 0, 0, 0]);
      setACoeffs([-0.5, 0, 0, 0, 0]); // y[n] = 0.5 y[n-1] + x[n]
      setDiffInputSignal('impulse');
    } else if (preset === 'resonator') {
      setOrderN(2);
      setOrderM(0);
      setBCoeffs([1, 0, 0, 0, 0, 0]);
      setACoeffs([-0.8, 0.64, 0, 0, 0]); // y[n] = 0.8 y[n-1] - 0.64 y[n-2] + x[n]
      setDiffInputSignal('impulse');
    }
  };

  const reset = () => {
    setSystem('movingAverage');
    setFirstVector('mixed');
    setSecondVector('impulse');
    setAlpha(1);
    setBeta(1);
    setShift(1);
    loadPreset('sig-ma');
  };

  const selectClass = 'w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100';

  const missions: ChallengeMission[] = [
    {
      id: 'verify-linearity',
      title: 'Verify Linearity on Moving Average vs Square',
      titleAr: 'تحقق من خطية المتوسط المتحرك مقابل عدم خطية التربيع',
      goal: 'Switch between the 3-Point Moving Average (linear) and Square (nonlinear) to inspect superposition Path A vs Path B.',
      goalAr: 'بدّل بين المتوسط المتحرك ثلاثي النقاط (خطي) والتربيع (غير خطي) وافحص مساري التراكب A و B.',
      hint: 'A linear system satisfies T(ax1 + bx2) = aT(x1) + bT(x2).',
      hintAr: 'النظام الخطي يحقق شرط التراكب التام لمساري الجمع والتطبيق.',
      start: () => { setLabMode('properties'); setSystem('movingAverage'); },
      evaluate: () => system === 'movingAverage' && sameLinear ? feedback('success', 'Linearity verified: 3-Point Moving Average satisfies superposition.', 'تم التحقق: مرشح المتوسط المتحرك يحقق خاصية التراكب والخطية.') : feedback('pending', 'Select 3-Point Moving Average and verify Path A matches Path B.', 'اختر المتوسط المتحرك وتأكد من تطابق المسارين A و B.'),
    },
    {
      id: 'verify-sig-ma-equation',
      title: 'SIG Slide p. 21: 3-Pt Moving Average Difference Equation',
      titleAr: 'معادلة المتوسط المتحرك من سلايد 21 (FIR رتبة M=2)',
      goal: 'In Difference Equation Studio, load the SIG Slide 21 preset (N=0, M=2, b=[0.33, 0.33, 0.33]) and verify the FIR output response.',
      goalAr: 'في استوديو معادلات الفروق، حمّل إعداد سلايد 21 (N=0, M=2) وتأكد من استجابة نظام FIR.',
      hint: 'Slide 21 presents y[n] = 1/3(x[n] + x[n-1] + x[n-2]) as an LTI FIR system.',
      hintAr: 'يعرض السلايد 21 معادلة المتوسط المتحرك كنظام FIR غير تكراري.',
      start: () => { setLabMode('difference-equation'); loadPreset('sig-ma'); },
      evaluate: () => labMode === 'difference-equation' && orderN === 0 && orderM === 2 ? feedback('success', 'SIG Slide 21 verified: N=0 (FIR non-recursive), M=2 (3-term feedforward).', 'تم التحقق من سلايد 21: نظام FIR غير تكراري بثلاث عينات دخل متتالية.') : feedback('pending', 'Open Difference Equation Studio and load SIG Slide 21 preset.', 'افتح استوديو معادلات الفروق وحمّل إعداد سلايد 21.'),
    },
    {
      id: 'verify-sig-acc-equation',
      title: 'SIG Slide p. 24: Recursive Accumulator Difference Equation',
      titleAr: 'معادلة المجمّع التكراري من سلايد 24 (IIR رتبة N=1)',
      goal: 'In Difference Equation Studio, load the SIG Slide 24 Accumulator preset (N=1, M=0, a1=-1, b0=1) to verify y[n] = y[n-1] + x[n].',
      goalAr: 'في استوديو معادلات الفروق، حمّل إعداد المجمّع التكراري من سلايد 24 للتحقق من y[n] = y[n-1] + x[n].',
      hint: 'Slide 24 presents the accumulator as a recursive IIR difference equation.',
      hintAr: 'يعرض السلايد 24 المجمّع كمعادلة فروق تكرارية IIR برتبة ارتداد واحدة.',
      start: () => { setLabMode('difference-equation'); loadPreset('sig-acc'); },
      evaluate: () => labMode === 'difference-equation' && orderN === 1 && Math.abs(aCoeffs[0] - (-1)) < 0.05 ? feedback('success', 'SIG Slide 24 verified: N=1 (IIR recursive accumulator), y[n] = y[n-1] + x[n].', 'تم التحقق من سلايد 24: نظام IIR تكراري برتبة أولى يراكم المدخلات.') : feedback('pending', 'Load SIG Slide 24 Accumulator preset in Difference Equation Studio.', 'حمّل إعداد المجمّع التكراري لسلايد 24 في استوديو معادلات الفروق.'),
    },
  ];

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="signal-systems-title">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Activity size={20} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <h3 id="signal-systems-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">Discrete-Time Systems &amp; Difference Equations</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">فحص خواص الأنظمة (الخطية وثبات الزمن) ومعادلات الفروق العامة من الرتبة N (FIR و IIR).</ArabicText>
        </div>
        <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-beige-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Reset signal systems lab">
          <RotateCcw size={15} aria-hidden="true" /><span className="hidden sm:inline">Reset</span>
        </button>
      </header>

      <div className="mb-4 rounded-2xl border border-amber-300 bg-amber-50/80 p-3.5 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200 flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold">★ Important Lab (SIG File) · معمل أساسي مبني على سلايدات د. مسعد حسن الرسمية</span>
        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 font-bold">LTI &amp; N-th Order Difference Equations</span>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="mb-5 flex rounded-2xl border border-stone-200 bg-stone-100 p-1 dark:border-stone-800 dark:bg-stone-950">
        <button
          type="button"
          onClick={() => setLabMode('properties')}
          className={`flex-1 rounded-xl py-2.5 px-3 text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
            labMode === 'properties'
              ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-stone-100'
              : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
          }`}
        >
          <Sliders size={15} />
          <span>System Property Bench (Linearity &amp; Shift)</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('difference-equation')}
          className={`flex-1 rounded-xl py-2.5 px-3 text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
            labMode === 'difference-equation'
              ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-stone-100'
              : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
          }`}
        >
          <Calculator size={15} />
          <span>General N-th Order Difference Equation Studio (LCCDE)</span>
        </button>
      </div>

      <LabChallenge missions={missions} />

      {labMode === 'properties' ? (
        /* --- MODE 1: System Properties Bench --- */
        <>
          <div className="mb-5 grid grid-cols-1 gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">System
              <select value={system} onChange={(event) => setSystem(event.target.value as SystemKind)} className={selectClass}>
                {(Object.keys(SYSTEMS) as SystemKind[]).map((key) => <option key={key} value={key}>{SYSTEMS[key].name}</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Input x₁[n]
              <select value={firstVector} onChange={(event) => setFirstVector(event.target.value as VectorKind)} className={selectClass}>
                <option value="mixed">Mixed [1, 2, −1, 0, 1]</option><option value="ramp">Ramp [−1, 0, 1, 2, 1]</option><option value="impulse">Impulse [0, 0, 1, 0, 0]</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Input x₂[n]
              <select value={secondVector} onChange={(event) => setSecondVector(event.target.value as VectorKind)} className={selectClass}>
                <option value="impulse">Impulse [0, 0, 1, 0, 0]</option><option value="mixed">Mixed [1, 2, −1, 0, 1]</option><option value="ramp">Ramp [−1, 0, 1, 2, 1]</option>
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">α
                <input type="number" min={-2} max={2} step={1} value={alpha} onChange={(event) => setAlpha(Number(event.target.value))} className={selectClass} />
              </label>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">β
                <input type="number" min={-2} max={2} step={1} value={beta} onChange={(event) => setBeta(Number(event.target.value))} className={selectClass} />
              </label>
            </div>
          </div>

          <div className="mb-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">Linearity · two paths</h4>
              <code dir="ltr" className="font-mono text-xs text-stone-600 dark:text-zinc-400">T(αx₁ + βx₂) ?= αT(x₁) + βT(x₂)</code>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Sequence title="Path A · combine inputs, then apply T" values={left} accent />
              <Sequence title="Path B · apply T, then combine outputs" values={right} />
            </div>
            <p className={`mt-4 rounded-xl border px-3 py-2 text-sm font-semibold ${properties.linear ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300' : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300'}`} aria-live="polite">
              {properties.linear ? 'Analytic label: linear' : 'Analytic label: nonlinear'} · This vector check {sameLinear ? 'matches' : 'differs'} for the selected inputs.
            </p>
          </div>

          <div className="mb-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div><h4 className="font-semibold text-stone-900 dark:text-stone-100">Time invariance · shift test</h4><code dir="ltr" className="font-mono text-xs text-stone-600 dark:text-zinc-400">{'T{x[n − k]} ?= y[n − k]'}</code></div>
              <label className="flex items-center gap-3 text-xs font-semibold text-stone-700 dark:text-stone-300">Shift k={shift}
                <input type="range" min={1} max={2} value={shift} onChange={(event) => setShift(Number(event.target.value))} aria-label="Input time shift k" className="accent-amber-600 dark:accent-amber-400" />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2"><Sequence title="Shift input, then apply T" values={shiftedBefore} accent /><Sequence title="Apply T, then shift output" values={shiftedAfter} /></div>
            <p className={`mt-4 rounded-xl border px-3 py-2 text-sm font-semibold ${properties.invariant ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300' : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300'}`} aria-live="polite">
              {properties.invariant ? 'Analytic label: time-invariant' : 'Analytic label: time-varying'} · This vector check {sameShift ? 'matches' : 'differs'} for the selected shift.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
              <p className="mb-1 font-mono text-xs uppercase text-stone-500 dark:text-zinc-400">Selected system</p>
              <code dir="ltr" className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100">{properties.formula}</code>
              <p className="mt-2 text-sm text-stone-700 dark:text-stone-300">{properties.note}</p>
              <ArabicText className="mt-2 text-sm text-stone-600 dark:text-zinc-400">{properties.noteAr}</ArabicText>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
              <p className="font-semibold">Analytic properties · not inferred from a finite plot</p>
              <p className="mt-1">{properties.stable ? 'BIBO stable' : 'Not BIBO stable'} by the system rule. These short vectors illustrate tests; they cannot prove a property for every possible input.</p>
              <ArabicText className="mt-2 text-sm text-sky-800 dark:text-sky-300">الحكم على الثبات مبني على قاعدة النظام لكل المدخلات المحدودة، مش على رسم عينات قليلة.</ArabicText>
            </div>
          </div>
        </>
      ) : (
        /* --- MODE 2: General N-th Order Difference Equation Studio --- */
        <div className="space-y-5">
          {/* Preset Buttons */}
          <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">Academic &amp; Classic LCCDE Presets</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadPreset('sig-ma')}
                className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
              >
                ★ SIG Slide 21: 3-Pt Moving Avg (FIR, N=0, M=2)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('sig-acc')}
                className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
              >
                ★ SIG Slide 24: Accumulator (IIR, N=1, M=0)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('decay')}
                className="rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
              >
                1st-Order Decay (IIR, a₁=−0.5)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('resonator')}
                className="rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
              >
                2nd-Order Resonator (IIR, N=2, M=0)
              </button>
            </div>
          </div>

          {/* Configurable N and M Order Steppers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">Feedback Order N (Autoregressive / y-delays)</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-amber-700 dark:text-amber-300">
                  N = {orderN} {orderN === 0 ? '(FIR)' : '(IIR)'}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                value={orderN}
                onChange={(e) => setOrderN(Number(e.target.value))}
                aria-label="Feedback order N"
                className="w-full accent-amber-600 dark:accent-amber-400 mb-2"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                <span>0 (Pure FIR)</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5 (5th Order)</span>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">Feedforward Order M (Moving Average / x-delays)</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-amber-700 dark:text-amber-300">
                  M = {orderM} ({orderM + 1} taps)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                value={orderM}
                onChange={(e) => setOrderM(Number(e.target.value))}
                aria-label="Feedforward order M"
                className="w-full accent-amber-600 dark:accent-amber-400 mb-2"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                <span>0 (1 tap)</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5 (6 taps)</span>
              </div>
            </div>
          </div>

          {/* Coefficient Editors */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
              Coefficients Configuration (General N-th Order LCCDE)
            </h4>

            {/* Feedforward Coefficients b_k */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Feedforward Coefficients <code className="font-mono text-amber-700 dark:text-amber-300">b₀ ... b_{orderM}</code>:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {Array.from({ length: orderM + 1 }, (_, k) => (
                  <label key={`b-${k}`} className="text-xs font-mono text-stone-600 dark:text-stone-400">
                    b_{k}
                    <input
                      type="number"
                      step={0.1}
                      value={clean(bCoeffs[k] ?? 0)}
                      onChange={(e) => {
                        const next = [...bCoeffs];
                        next[k] = Number(e.target.value);
                        setBCoeffs(next);
                      }}
                      className="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1 text-xs font-mono dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Feedback Coefficients a_k */}
            {orderN > 0 ? (
              <div>
                <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Feedback Coefficients <code className="font-mono text-amber-700 dark:text-amber-300">a₁ ... a_{orderN}</code> (where a₀ = 1):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {Array.from({ length: orderN }, (_, k) => {
                    const idx = k + 1;
                    return (
                      <label key={`a-${idx}`} className="text-xs font-mono text-stone-600 dark:text-stone-400">
                        a_{idx}
                        <input
                          type="number"
                          step={0.1}
                          value={clean(aCoeffs[k] ?? 0)}
                          onChange={(e) => {
                            const next = [...aCoeffs];
                            next[k] = Number(e.target.value);
                            setACoeffs(next);
                          }}
                          className="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1 text-xs font-mono dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500 italic">No feedback coefficients (Pure FIR: output depends strictly on current and past inputs).</p>
            )}
          </div>

          {/* Formatted Difference Equation Card */}
          <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 dark:border-amber-800 dark:bg-amber-950/30">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase text-amber-950 dark:text-amber-200">Resulting Difference Equation</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                orderN === 0
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
              }`}>
                {orderN === 0 ? 'FIR (Finite Impulse Response - Non-Recursive)' : `IIR (Infinite Impulse Response - Order N=${orderN})`}
              </span>
            </div>
            <code dir="ltr" className="block font-mono text-base font-bold text-amber-950 dark:text-amber-100 bg-white/80 dark:bg-stone-900/80 p-3 rounded-xl border border-amber-200 dark:border-amber-900 overflow-x-auto">
              {renderFormula()}
            </code>
            <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
              Standard normalized form: <code className="font-mono">y[n] = Σ b_k x[n−k] − Σ a_k y[n−k]</code> (assuming initial rest: zero state for n &lt; 0).
            </p>
          </div>

          {/* Input Signal Selector */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">Test Input Signal x[n] (n = 0 ... 11)</span>
              <select
                value={diffInputSignal}
                onChange={(e) => setDiffInputSignal(e.target.value as any)}
                className="rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              >
                <option value="impulse">Unit Impulse δ[n] (Computes Impulse Response h[n])</option>
                <option value="step">Unit Step u[n] (Computes Step Response s[n])</option>
                <option value="pulse">Short Pulse [1, 2, 3, 2, 1, 0, ...]</option>
                <option value="ramp">Ramp Sequence x[n] = n</option>
              </select>
            </div>

            {/* Stem Output Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2">Input x[n]</p>
                <div className="flex flex-wrap gap-1.5">
                  {inputSequence.map((val, n) => (
                    <div key={`x-${n}`} className="min-w-9 rounded-lg border border-stone-200 bg-stone-50 p-1 text-center dark:border-stone-800 dark:bg-stone-950">
                      <span className="block font-mono text-[10px] text-stone-400">n={n}</span>
                      <span className="block font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{show(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2">Computed Output y[n]</p>
                <div className="flex flex-wrap gap-1.5">
                  {diffOutputSequence.map((val, n) => (
                    <div key={`y-${n}`} className="min-w-9 rounded-lg border border-amber-300 bg-amber-50/70 p-1 text-center dark:border-amber-800 dark:bg-amber-950/40">
                      <span className="block font-mono text-[10px] text-amber-700 dark:text-amber-400">n={n}</span>
                      <span className="block font-mono text-xs font-bold text-amber-950 dark:text-amber-100">{show(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Step-by-Step Calculation Table */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-3">
              Step-by-Step Delay Accumulation Trace (Initial Rest: y[n]=0, x[n]=0 for n &lt; 0)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500">
                    <th className="py-2 px-2">n</th>
                    <th className="py-2 px-2">x[n]</th>
                    <th className="py-2 px-2">Feedforward Σ b_k x[n-k]</th>
                    <th className="py-2 px-2">Feedback −Σ a_k y[n-k]</th>
                    <th className="py-2 px-2 font-bold text-amber-700 dark:text-amber-300">y[n]</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                  {calculationSteps.map(({ n, xVal, ff, fb, yVal }) => (
                    <tr key={`step-${n}`} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="py-1.5 px-2 font-semibold text-stone-400">{n}</td>
                      <td className="py-1.5 px-2">{show(xVal)}</td>
                      <td className="py-1.5 px-2 text-stone-600 dark:text-stone-300">{show(ff)}</td>
                      <td className="py-1.5 px-2 text-stone-600 dark:text-stone-300">{orderN === 0 ? '0 (FIR)' : show(fb)}</td>
                      <td className="py-1.5 px-2 font-bold text-stone-900 dark:text-stone-100">{show(yVal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Verification Note */}
      <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
        <p className="font-semibold flex items-center gap-1.5">
          <CheckCircle2 size={16} className="text-sky-600 dark:text-sky-400" />
          Academic Scope Verification (Dr. Mousaad Hassan SIG Slides)
        </p>
        <p className="mt-1 text-xs">
          Verified against Dr. Mousaad Hassan&apos;s official 27-page SIG lecture presentation: the curriculum is strictly discrete-time (n, δ[n], u[n], y[n]). The official source contains <strong>zero continuous-time derivations or limits</strong>. All difference equations, LTI operations, and stability criteria in this lab adhere faithfully to that discrete-time specification without inventing outside material.
        </p>
        <ArabicText className="mt-1.5 text-xs text-sky-800 dark:text-sky-300">
          توثيق الأمانة العلمية: تم التحقق من سلايدات د. مسعد حسن الرسمية (27 صفحة)؛ نطاق المنهج متقطع زمنياً بالكامل (Discrete-time)، ولا يتضمن أي إثباتات أو نهايات للزمن المستمر؛ يلتزم المعمل بدقة بالمنهج الأصلي دون إضافة معلومات خارجية غير معتمدة.
        </ArabicText>
      </div>
    </section>
  );
};

export default SignalSystemsLab;
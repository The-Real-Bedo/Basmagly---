import React, { useState } from 'react';
import { Activity, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type SystemKind = 'gain' | 'square' | 'index' | 'advance';
type VectorKind = 'mixed' | 'ramp' | 'impulse';

const INDEXES = [-2, -1, 0, 1, 2];
const VECTORS: Record<VectorKind, number[]> = {
  mixed: [1, 2, -1, 0, 1],
  ramp: [-1, 0, 1, 2, 1],
  impulse: [0, 0, 1, 0, 0],
};
const SYSTEMS: Record<SystemKind, { name: string; formula: string; linear: boolean; invariant: boolean; stable: boolean; note: string; noteAr: string }> = {
  gain: { name: 'Gain ×2', formula: 'T{x}[n] = 2x[n]', linear: true, invariant: true, stable: true, note: 'A fixed gain preserves superposition, shifts, and boundedness.', noteAr: 'المعامل الثابت بيحافظ على التراكب والإزاحة ومحدودية الخرج.' },
  square: { name: 'Square', formula: 'T{x}[n] = x[n]²', linear: false, invariant: true, stable: true, note: 'Squaring breaks superposition, but is shift-invariant and maps bounded inputs to bounded outputs.', noteAr: 'التربيع بيكسر التراكب، لكنه ثابت مع الإزاحة وبيحوّل المدخل المحدود لخرج محدود.' },
  index: { name: 'Index-weighted', formula: 'T{x}[n] = n · x[n]', linear: true, invariant: false, stable: false, note: 'The index multiplier preserves superposition, but it changes when the signal is shifted; a bounded constant input also produces an unbounded output.', noteAr: 'الضرب في رقم العينة بيحافظ على التراكب، لكنه بيتغير مع الإزاحة؛ ومدخل ثابت ومحدود ممكن يطلع خرج غير محدود.' },
  advance: { name: 'Advance by one', formula: 'T{x}[n] = x[n + 1]', linear: true, invariant: true, stable: true, note: 'A fixed one-sample advance preserves superposition and time shifts.', noteAr: 'التقديم بعينة واحدة بيحافظ على التراكب وعلى الإزاحة الزمنية.' },
};

const valueAt = (values: number[], n: number) => INDEXES.includes(n) ? values[n + 2] : 0;
const apply = (kind: SystemKind, source: (n: number) => number, n: number) => {
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
  const [system, setSystem] = useState<SystemKind>('square');
  const [firstVector, setFirstVector] = useState<VectorKind>('mixed');
  const [secondVector, setSecondVector] = useState<VectorKind>('impulse');
  const [alpha, setAlpha] = useState(1);
  const [beta, setBeta] = useState(1);
  const [shift, setShift] = useState(1);
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

  const reset = () => {
    setSystem('square');
    setFirstVector('mixed');
    setSecondVector('impulse');
    setAlpha(1);
    setBeta(1);
    setShift(1);
  };
  const selectClass = 'w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100';

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="signal-systems-title">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Activity size={20} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <h3 id="signal-systems-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">Signal Systems: Superposition & Shifts</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">جرّب التراكب والإزاحة الزمنية على نفس النظام وشوف الفرق بين الاختبار العددي والقاعدة التحليلية.</ArabicText>
        </div>
        <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-beige-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Reset signal systems lab">
          <RotateCcw size={15} aria-hidden="true" /><span className="hidden sm:inline">Reset</span>
        </button>
      </header>

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
    </section>
  );
};

export default SignalSystemsLab;

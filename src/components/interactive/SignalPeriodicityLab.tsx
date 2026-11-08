import React, { useMemo, useState } from 'react';
import { CircleDot, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type ViewKind = 'exponential' | 'step-anomaly';
const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);
const mod = (a: number, b: number) => ((a % b) + b) % b;
const clean = (value: number) => Math.abs(value) < 1e-10 ? 0 : Number(value.toFixed(3));
const fmt = (value: number) => `${clean(value)}`;

export const SignalPeriodicityLab: React.FC = () => {
  const [view, setView] = useState<ViewKind>('exponential');
  const [numerator, setNumerator] = useState(7);
  const [denominator, setDenominator] = useState(2);
  const [requestedShift, setRequestedShift] = useState(2);
  const divisor = gcd(Math.abs(numerator), denominator);
  const fundamental = denominator / divisor;
  const shift = Math.max(-fundamental, Math.min(fundamental, requestedShift));
  const exponentialPoints = useMemo(() => Array.from({ length: Math.max(2, fundamental * 2) }, (_, n) => {
    const phase = 2 * Math.PI * numerator / denominator * n;
    const shiftedPhase = 2 * Math.PI * numerator / denominator * (n + shift);
    return { n, real: clean(Math.cos(phase)), imag: clean(Math.sin(phase)), shiftedReal: clean(Math.cos(shiftedPhase)), shiftedImag: clean(Math.sin(shiftedPhase)) };
  }), [fundamental, numerator, denominator, shift]);
  const sameAfterShift = mod(numerator * shift, denominator) === 0;
  const reset = () => { setView('exponential'); setNumerator(7); setDenominator(2); setRequestedShift(2); };
  const selectClass = 'rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100';
  const panelWidth = 300;
  const x0 = 44;
  const x1 = 288;
  const pointX = (index: number) => exponentialPoints.length <= 1 ? x0 : x0 + index / (exponentialPoints.length - 1) * (x1 - x0);
  const reY = (value: number) => 57 - value * 27;
  const imY = (value: number) => 163 - value * 27;
  const baseRe = exponentialPoints.map((point) => `${pointX(point.n)},${reY(point.real)}`).join(' ');
  const shiftedRe = exponentialPoints.map((point) => `${pointX(point.n)},${reY(point.shiftedReal)}`).join(' ');
  const baseIm = exponentialPoints.map((point) => `${pointX(point.n)},${imY(point.imag)}`).join(' ');
  const shiftedIm = exponentialPoints.map((point) => `${pointX(point.n)},${imY(point.shiftedImag)}`).join(' ');

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="signal-periodicity-title">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><CircleDot size={20} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1"><h3 id="signal-periodicity-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">Discrete-Time Periodicity</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">النقطة الأساسية إن الإشارة لازم تكرر نفسها بعد عدد صحيح موجب من العينات.</ArabicText></div>
        <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-beige-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Reset periodicity lab"><RotateCcw size={15} aria-hidden="true" /><span className="hidden sm:inline">Reset</span></button>
      </header>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Choose signal for periodicity check">
        <button type="button" onClick={() => setView('exponential')} aria-pressed={view === 'exponential'} className={`rounded-full border px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 ${view === 'exponential' ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 text-stone-700 hover:bg-[#FAF7F2] dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800'}`}>Complex exponential</button>
        <button type="button" onClick={() => setView('step-anomaly')} aria-pressed={view === 'step-anomaly'} className={`rounded-full border px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 ${view === 'step-anomaly' ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 text-stone-700 hover:bg-[#FAF7F2] dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800'}`}>Step-function anomaly</button>
      </div>

      {view === 'exponential' ? <>
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Integer p
            <select value={numerator} onChange={(event) => setNumerator(Number(event.target.value))} className={`${selectClass} mt-1 block`}>
              {Array.from({ length: 17 }, (_, i) => i - 8).map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <span className="pb-2 font-mono text-lg text-stone-700 dark:text-stone-300">/</span>
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Positive integer q
            <select value={denominator} onChange={(event) => setDenominator(Number(event.target.value))} className={`${selectClass} mt-1 block`}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((q) => <option key={q} value={q}>{q}</option>)}
            </select>
          </label>
          <label className="min-w-48 flex-1 text-xs font-semibold text-stone-700 dark:text-stone-300">Compare shift k = {shift}
            <input type="range" min={-fundamental} max={fundamental} value={shift} onChange={(event) => setRequestedShift(Number(event.target.value))} aria-label="Integer shift k" className="mt-2 block w-full accent-amber-600 dark:accent-amber-400" />
          </label>
          <p className="w-full font-mono text-sm text-stone-800 dark:text-stone-200">x[n] = e<sup>j2π({numerator}/{denominator})n</sup> · compare x[n + k] with x[n]</p>
        </div>

        <div className="mb-4 overflow-hidden rounded-2xl border border-beige-300 bg-white p-3 dark:border-stone-800 dark:bg-stone-900 sm:p-4">
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-700 dark:text-stone-300"><span><i className="mr-1 inline-block h-3 w-3 rounded-full bg-stone-500 dark:bg-stone-400" />Original x[n]</span><span><i className="mr-1 inline-block h-3 w-3 rounded-full bg-amber-500 dark:bg-amber-400" />Shifted x[n + k]</span></div>
          <svg viewBox={`0 0 ${panelWidth} 218`} className="h-auto w-full" role="img" aria-label={`Real and imaginary parts of the complex exponential for two periods. Shift by ${shift} samples.`}>
            <text x="4" y="18" className="fill-stone-700 text-[13px] font-semibold dark:fill-stone-300">Real part</text><text x="4" y="123" className="fill-stone-700 text-[13px] font-semibold dark:fill-stone-300">Imaginary part</text>
            <line x1={x0} y1="57" x2={x1} y2="57" className="stroke-stone-300 dark:stroke-stone-700" /><line x1={x0} y1="163" x2={x1} y2="163" className="stroke-stone-300 dark:stroke-stone-700" />
            <polyline points={baseRe} fill="none" className="stroke-stone-500 dark:stroke-stone-400" strokeWidth="2" /><polyline points={shiftedRe} fill="none" className="stroke-amber-500 dark:stroke-amber-400" strokeWidth="2" />
            <polyline points={baseIm} fill="none" className="stroke-stone-500 dark:stroke-stone-400" strokeWidth="2" /><polyline points={shiftedIm} fill="none" className="stroke-amber-500 dark:stroke-amber-400" strokeWidth="2" />
            {exponentialPoints.map((point) => <g key={point.n}>
              <circle cx={pointX(point.n)} cy={reY(point.real)} r="4" className="fill-stone-500 dark:fill-stone-400" /><circle cx={pointX(point.n)} cy={reY(point.shiftedReal)} r="3" className="fill-amber-500 dark:fill-amber-400" />
              <circle cx={pointX(point.n)} cy={imY(point.imag)} r="4" className="fill-stone-500 dark:fill-stone-400" /><circle cx={pointX(point.n)} cy={imY(point.shiftedImag)} r="3" className="fill-amber-500 dark:fill-amber-400" />
              {(point.n === 0 || point.n === fundamental || point.n === 2 * fundamental - 1) && <text x={pointX(point.n)} y="210" textAnchor="middle" className="fill-stone-600 text-[13px] font-mono dark:fill-stone-400">n={point.n}</text>}
            </g>)}
          </svg>
          <p className={`mt-3 rounded-xl border px-3 py-2 text-sm font-semibold ${sameAfterShift ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300' : 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300'}`} aria-live="polite">
            {sameAfterShift ? `This shift repeats the sequence; fundamental period N₀ = q / gcd(|p|, q) = ${denominator} / ${divisor} = ${fundamental}.` : `This shift does not repeat it (p·k is not divisible by q). Fundamental period N₀ = ${fundamental}.`}
          </p>
          <ArabicText className="mt-2 text-sm text-stone-600 dark:text-zinc-400">لـ e^(j2π(p/q)n)، الإشارة دورية لما p/q كسر نسبي، وأصغر فترة موجبة هي q على القاسم المشترك الأكبر بين |p| وq.</ArabicText>
        </div>
      </> : <div className="mb-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <p className="font-mono text-sm text-stone-900 dark:text-stone-100">x[n] = u[n] + u[−n] · using u[0] = 1</p>
        <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Anomalous step sequence from n equals minus five to five">
          {Array.from({ length: 11 }, (_, index) => index - 5).map((n) => {
            const value = Number(n >= 0) + Number(-n >= 0);
            return <div key={n} role="listitem" className={`min-w-12 rounded-xl border px-2 py-2 text-center ${n === 0 ? 'border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30' : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-700 dark:bg-stone-950'}`}><span className="block font-mono text-xs text-stone-500 dark:text-zinc-400">n={n}</span><span className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100">{value}</span></div>;
          })}
        </div>
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300"><strong>Not periodic:</strong> x[0] = 2, while x[N] = 1 for every positive integer N. The single value at n = 0 breaks every possible period.</p>
        <ArabicText className="mt-2 text-sm text-stone-600 dark:text-zinc-400">خد بالك من تعريف u[0]: قيمته هنا 1، فالمجموع بيطلع 2 عند الصفر و1 في باقي العينات؛ وده بيكسر أي فترة موجبة محتملة.</ArabicText>
      </div>}

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
        <p className="font-semibold">Analytic check matters</p>
        <p className="mt-1">The plotted samples help compare a shift, but a finite plot alone cannot prove periodicity for all integer n.</p>
        <ArabicText className="mt-2 text-sm text-sky-800 dark:text-sky-300">الرسم بيساعدك تقارن عينات، لكنه لوحده مش برهان على التكرار لكل n صحيح.</ArabicText>
      </div>
    </section>
  );
};

export default SignalPeriodicityLab;

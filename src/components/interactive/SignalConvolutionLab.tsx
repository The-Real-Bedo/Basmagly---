import React, { useState } from 'react';
import { AudioWaveform, RotateCcw, SkipForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type InputPreset = 'book' | 'pulse' | 'ramp';
type KernelPreset = 'average' | 'impulse';
const INPUTS: Record<InputPreset, number[]> = { book: [3, 0, 6], pulse: [1, 2, 1], ramp: [0, 1, 2, 1] };
const KERNELS: Record<KernelPreset, number[]> = { average: [1 / 3, 1 / 3, 1 / 3], impulse: [1] };
const clean = (value: number) => Number(value.toFixed(2));
const show = (value: number) => Number.isInteger(value) ? `${value}` : `${clean(value)}`;

const StemRow: React.FC<{ name: string; values: number[]; active?: number; completed?: number }> = ({ name, values, active = -1, completed = -1 }) => {
  const max = Math.max(1, ...values.map(Math.abs));
  return (
    <div className="min-w-0">
      <p className="mb-2 text-xs font-semibold text-stone-700 dark:text-stone-300">{name}</p>
      <div className="flex flex-wrap gap-2" role="list" aria-label={name}>
        {values.map((value, index) => {
          const state = index === active ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30' : index <= completed ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30' : 'border-beige-300 bg-white dark:border-stone-700 dark:bg-stone-900';
          return <div key={`${name}-${index}`} role="listitem" className={`min-w-14 rounded-xl border px-2 py-2 text-center ${state}`}>
            <span className="block font-mono text-xs text-stone-500 dark:text-zinc-400">n={index}</span>
            <span className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100">{show(value)}</span>
            <span className="mt-1 block h-1 rounded-full bg-stone-200 dark:bg-stone-700" aria-hidden="true"><span className="block h-full rounded-full bg-amber-500 dark:bg-amber-400" style={{ width: `${Math.max(4, Math.abs(value) / max * 100)}%` }} /></span>
          </div>;
        })}
      </div>
    </div>
  );
};

export const SignalConvolutionLab: React.FC = () => {
  const [inputPreset, setInputPreset] = useState<InputPreset>('book');
  const [kernelPreset, setKernelPreset] = useState<KernelPreset>('average');
  const [steppedThrough, setSteppedThrough] = useState(-1);
  const x = INPUTS[inputPreset];
  const h = KERNELS[kernelPreset];
  const output = Array.from({ length: x.length + h.length - 1 }, (_, n) => clean(x.reduce((sum, value, k) => sum + value * (h[n - k] ?? 0), 0)));
  const active = Math.min(steppedThrough + 1, output.length - 1);
  const terms = x.map((value, k) => ({ k, hIndex: active - k, xValue: value, hValue: h[active - k] ?? 0, product: clean(value * (h[active - k] ?? 0)) }));
  const averagePreset = inputPreset === 'book' && kernelPreset === 'average';
  const reset = () => { setInputPreset('book'); setKernelPreset('average'); setSteppedThrough(-1); };
  const updateInput = (value: InputPreset) => { setInputPreset(value); setSteppedThrough(-1); };
  const updateKernel = (value: KernelPreset) => { setKernelPreset(value); setSteppedThrough(-1); };
  const selectClass = 'w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100';

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="signal-convolution-title">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><AudioWaveform size={20} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1"><h3 id="signal-convolution-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">Convolution: Multiply, Shift, Sum</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">حرّك استجابة النظام خطوة خطوة، واضرب العينات المتقابلة واجمع نواتج الضرب.</ArabicText></div>
        <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-beige-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Reset convolution lab"><RotateCcw size={15} aria-hidden="true" /><span className="hidden sm:inline">Reset</span></button>
      </header>

      <div className="mb-5 grid grid-cols-1 gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-2">
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Input x[n] · index starts at 0
          <select value={inputPreset} onChange={(event) => updateInput(event.target.value as InputPreset)} className={selectClass}>
            <option value="book">Worked input: [3, 0, 6]</option><option value="pulse">Pulse: [1, 2, 1]</option><option value="ramp">Short pulse: [0, 1, 2, 1]</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Impulse response h[n] · index starts at 0
          <select value={kernelPreset} onChange={(event) => updateKernel(event.target.value as KernelPreset)} className={selectClass}>
            <option value="average">Moving average: [1/3, 1/3, 1/3]</option><option value="impulse">Unit impulse: [1]</option>
          </select>
        </label>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-2">
        <StemRow name={`Input x[n] = [${x.map(show).join(', ')}]`} values={x} />
        <StemRow name={`Response h[n] = [${h.map(show).join(', ')}]`} values={h} />
      </div>

      <div className="mb-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div><h4 className="font-semibold text-stone-900 dark:text-stone-100">Full output y[n] = x[n] * h[n]</h4><p className="text-xs text-stone-600 dark:text-zinc-400">Output indices: 0 through {output.length - 1}</p></div>
          <button type="button" onClick={() => setSteppedThrough(Math.min(output.length - 1, active))} disabled={steppedThrough >= output.length - 1} className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white" aria-label={steppedThrough >= output.length - 1 ? 'All output samples computed' : `Step convolution output n=${active}`}>
            <SkipForward size={16} aria-hidden="true" />{steppedThrough >= output.length - 1 ? 'Complete' : `Step n = ${active}`}
          </button>
        </div>
        <StemRow name="Accumulated output samples" values={output} active={steppedThrough < output.length - 1 ? active : -1} completed={steppedThrough} />
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900 dark:bg-amber-950/20">
          <p className="mb-2 text-xs font-semibold uppercase text-amber-900 dark:text-amber-300">Current sum · n = {active}{steppedThrough >= active ? ' · computed' : ' · next step'}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map(({ k, hIndex, xValue, hValue, product }) => <div key={`${active}-${k}`} className={`rounded-xl border px-3 py-2 font-mono text-xs ${hValue ? 'border-amber-300 bg-white text-stone-900 dark:border-amber-800 dark:bg-stone-900 dark:text-stone-100' : 'border-beige-300 bg-[#FAF7F2] text-stone-600 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-400'}`}>
              x[{k}] × h[{hIndex}] = {show(xValue)} × {show(hValue)} = <strong>{show(product)}</strong>
            </div>)}
          </div>
          <p className="mt-3 font-mono text-sm font-bold text-stone-900 dark:text-stone-100">y[{active}] = {terms.map(({ product }) => show(product)).join(' + ')} = {show(output[active])}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
        <p className="font-semibold">Model assumptions</p>
        <p className="mt-1">Both sequences are zero outside their listed samples. This is full, zero-state discrete convolution; it is not a circular convolution.</p>
        <ArabicText className="mt-2 text-sm text-sky-800 dark:text-sky-300">العينات خارج القيم المعروضة بتساوي صفر، والنموذج بيحسب الالتفاف الكامل مع حالة ابتدائية صفرية، مش التفافًا دائريًا.</ArabicText>
        {averagePreset && <p className="mt-2 font-mono text-xs text-sky-800 dark:text-sky-300">Worked check: [3, 0, 6] * [1/3, 1/3, 1/3] = [1, 1, 3, 2, 2]</p>}
        <p className="mt-2 text-xs text-sky-800 dark:text-sky-300">The three averaging coefficients follow the book equation. Input presets are teaching examples; other displayed decimals are rounded.</p>
        <ArabicText className="mt-1 text-xs text-sky-800 dark:text-sky-300">معاملات المتوسط التلاتة من معادلة الكتاب. المدخلات أمثلة تعليمية؛ وباقي القيم العشرية المعروضة متقرّبة.</ArabicText>
      </div>
    </section>
  );
};

export default SignalConvolutionLab;

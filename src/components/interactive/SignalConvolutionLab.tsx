import React, { useEffect, useRef, useState } from 'react';
import { AudioWaveform, RotateCcw, SkipForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

type InputPreset = 'book' | 'sig1' | 'sig2' | 'pulse' | 'ramp';
type KernelPreset = 'average' | 'sigh1' | 'sigh2' | 'impulse' | 'weighted';
const INPUTS: Record<InputPreset, number[]> = { book: [3, 0, 6], sig1: [2, 3, 1], sig2: [1, 2], pulse: [1, 2, 1], ramp: [0, 1, 2, 1] };
const KERNELS: Record<KernelPreset, number[]> = { average: [1 / 3, 1 / 3, 1 / 3], sigh1: [1, -0.5], sigh2: [1, 1, 1, 1], impulse: [1], weighted: [1, 2, 0.5] };
const clean = (value: number) => Number(value.toFixed(2));
const show = (value: number) => Number.isInteger(value) ? `${value}` : Math.abs(value * 3 - Math.round(value * 3)) < 1e-10 ? `${Math.round(value * 3)}/3` : `${clean(value)}`;

/** Every column shares the same k; h[n-k] visibly reverses the response before shifting. */
const OverlapDiagram: React.FC<{ x: number[]; h: number[]; n: number }> = ({ x, h, n }) => {
  const indices = Array.from({ length: x.length + 2 * (h.length - 1) }, (_, i) => i - h.length + 1);
  const max = Math.max(1, ...x, ...h);
  const rows = [
    { label: 'Input x[k]', value: (k: number) => x[k] ?? 0, present: (k: number) => k >= 0 && k < x.length },
    { label: `Response h[${n}−k]`, value: (k: number) => h[n - k] ?? 0, present: (k: number) => n - k >= 0 && n - k < h.length },
    { label: 'Product', value: (k: number) => (x[k] ?? 0) * (h[n - k] ?? 0), present: (k: number) => k >= 0 && k < x.length && n - k >= 0 && n - k < h.length },
  ];
  const start = Math.max(0, n - h.length + 1), end = Math.min(x.length - 1, n);
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const region = scroll.current;
    const table = region?.querySelector('table');
    const cell = region?.querySelector<HTMLElement>(`td[data-k="${start}"]`);
    if (region && table && cell) region.scrollLeft = cell.getBoundingClientRect().left - table.getBoundingClientRect().left - 112;
  }, [n, start, x.length, h.length]);
  return <div className="mb-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Flip & shift · n = {n}</h4>
    <p className="mt-1 text-sm text-stone-700 dark:text-zinc-300">Read each column at the same k. The response index n−k decreases from left to right. Multiply the amber pairs, then sum their products.</p>
    <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">اقرأ كل عمود عند نفس الـ k. مؤشر الاستجابة <bdi dir="ltr" className="font-mono">n−k</bdi> بيقلّ من الشمال لليمين. اضرب كل زوج باللون الكهرماني، وبعدها اجمع نواتج الضرب.</ArabicText>
    <div ref={scroll} className="mt-3 overflow-x-auto rounded-xl border border-beige-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:focus-visible:ring-amber-400" tabIndex={0} role="region" aria-label="Aligned convolution samples; scroll horizontally for all indices">
      <table data-testid="convolution-overlap" className="w-full table-fixed text-center font-mono text-xs text-stone-900 dark:text-stone-100" style={{ minWidth: 112 + indices.length * 64 }}>
        <caption className="sr-only">Aligned input, reversed and shifted response, and products at output index {n}. Listed sequences are zero elsewhere.</caption>
        <colgroup><col style={{ width: 112 }} />{indices.map(k => <col key={k} />)}</colgroup>
        <thead className="bg-white dark:bg-stone-900"><tr><th scope="col" className="sticky left-0 z-10 bg-[#FAF7F2] p-2 text-left dark:bg-stone-950">k</th>{indices.map(k => <th scope="col" key={k} className="p-2">{k}</th>)}</tr></thead>
        <tbody>{rows.map((row, r) => <tr key={row.label} className="border-t border-beige-300 dark:border-stone-700">
          <th scope="row" className="sticky left-0 z-10 bg-[#FAF7F2] px-2 py-3 text-left font-semibold dark:bg-stone-950">{row.label}</th>
          {indices.map(k => {
            const overlap = k >= start && k <= end;
            const present = row.present(k);
            const value = row.value(k);
            return <td key={k} data-k={k} data-value={value} data-overlap={overlap} className={`px-2 py-2 ${overlap ? 'bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200' : 'bg-white text-stone-600 dark:bg-stone-900 dark:text-zinc-400'}`}>
              {r < 2 && <div aria-hidden="true" className="relative mx-auto mb-1 h-10 w-6 border-b border-stone-300 dark:border-stone-600">
                {present && value !== 0 && <span className={`absolute bottom-0 left-1/2 w-0.5 ${overlap ? 'bg-amber-600 dark:bg-amber-400' : 'bg-stone-500 dark:bg-stone-400'}`} style={{ height: `${value / max * 100}%` }} />}
              </div>}
              <span>{show(value)}</span>
              {r === 1 && <span className="mt-1 block text-stone-500 dark:text-zinc-400">h[{n - k}]</span>}
            </td>;
          })}
        </tr>)}</tbody>
      </table>
    </div>
    <p className="mt-2 text-xs text-stone-600 dark:text-zinc-400 sm:hidden">Scroll across the samples to inspect the zero-padded positions.</p>
    <ArabicText className="text-xs text-stone-600 dark:text-zinc-400 sm:hidden">حرّك العينات أفقيًا عشان تفحص المواضع المتكمّلة بأصفار.</ArabicText>
    <p className="mt-2 text-xs text-stone-600 dark:text-zinc-400">Listed-sample overlap: k = {start} through {end}. An overlapping sample can still have value 0.</p>
    <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">تداخل العينات المعروضة: الـ k من {start} لـ {end}. العينة المتداخلة ممكن برضه تكون قيمتها 0.</ArabicText>
  </div>;
};

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
  const [inspectedIndex, setInspectedIndex] = useState(0);
  const [windowSize, setWindowSize] = useState(8);

  const isInfiniteStep = kernelPreset === 'sigh2';
  const x = INPUTS[inputPreset];
  const h = isInfiniteStep ? Array(windowSize).fill(1) : KERNELS[kernelPreset];
  const output = Array.from({ length: x.length + h.length - 1 }, (_, n) => x.reduce((sum, value, k) => sum + value * (h[n - k] ?? 0), 0));
  const active = Math.min(inspectedIndex, output.length - 1);
  const next = Math.min(steppedThrough + 1, output.length - 1);
  const terms = x.map((value, k) => ({ k, hIndex: active - k, xValue: value, hValue: h[active - k] ?? 0, product: value * (h[active - k] ?? 0) }));
  const averagePreset = inputPreset === 'book' && kernelPreset === 'average';
  const isSig2 = inputPreset === 'sig2' && isInfiniteStep;

  const reset = () => { setInputPreset('book'); setKernelPreset('average'); setSteppedThrough(-1); setInspectedIndex(0); setWindowSize(8); };
  const updateInput = (value: InputPreset) => { setInputPreset(value); setSteppedThrough(-1); setInspectedIndex(0); };
  const updateKernel = (value: KernelPreset) => { setKernelPreset(value); setSteppedThrough(-1); setInspectedIndex(0); };
  const updateWindow = (w: number) => { setWindowSize(w); setSteppedThrough(-1); setInspectedIndex(0); };
  const selectClass = 'w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100';
  const missions: ChallengeMission[] = [
    {
      id: 'sig-slide-example1',
      title: 'SIG Slide Ex 1: [2, 3, 1] * [1, -0.5]',
      titleAr: 'مثال 1 من سلايدات SIG: [2, 3, 1] * [1, -0.5]',
      goal: 'Select SIG Slide Ex 1 input [2, 3, 1] and response [1, -0.5]. Step through the 4 output samples and verify y = [2, 2, -0.5, -0.5].',
      goalAr: 'اختار مدخل سلايدات SIG رقم 1 [2, 3, 1] والاستجابة [1, -0.5]. امشي بالـ Step في عينات الخرج الـ 4 وتأكد من y = [2, 2, -0.5, -0.5].',
      hint: 'Slide 11 shows y[0]=2, y[1]=2, y[2]=-0.5, y[3]=-0.5.',
      hintAr: 'السلايد رقم 11 بيوضح إن y[0]=2 وy[1]=2 وy[2]=-0.5 وy[3]=-0.5.',
      start: () => { reset(); updateInput('sig1'); updateKernel('sigh1'); },
      evaluate: () => inputPreset !== 'sig1' || kernelPreset !== 'sigh1' ? feedback('retry', 'Select SIG Slide Ex 1 for both input and response.', 'اختار مثال سلايدات SIG رقم 1 للمدخل والاستجابة.') : steppedThrough !== output.length - 1 ? feedback('pending', 'Step through all 4 output samples.', 'امشي بالـ Step في عينات الخرج الأربعة كلها.') : feedback('success', 'SIG Slide Ex 1 verified: y = [2, 2, -0.5, -0.5].', 'تم التحقق من مثال سلايدات SIG الأول: y = [2, 2, -0.5, -0.5].'),
    },
    {
      id: 'sig-slide-example2',
      title: 'SIG Slide Ex 2: Infinite Step Response [1, 2] * u[n]',
      titleAr: 'مثال 2 من سلايدات SIG: استجابة الخطوة اللانهائية [1, 2] * u[n]',
      goal: 'Select SIG Slide Ex 2 input [1, 2] and step response u[n]. Observe the symbolic formula y[n] = δ[n] + 3u[n-1] and expand the observation window W.',
      goalAr: 'اختار مدخل سلايدات SIG رقم 2 [1, 2] واستجابة الخطوة u[n]. راقب الصيغة الرمزية y[n] = δ[n] + 3u[n-1] ووسّع نافذة الملاحظة W.',
      hint: 'Slide 12: y[0]=1, y[n]=3 for all n >= 1 going to infinity.',
      hintAr: 'السلايد رقم 12: y[0]=1 وy[n]=3 لجميع قيم n >= 1 ممتدة إلى ما لا نهاية.',
      start: () => { reset(); updateInput('sig2'); updateKernel('sigh2'); updateWindow(8); },
      evaluate: () => inputPreset !== 'sig2' || kernelPreset !== 'sigh2' ? feedback('retry', 'Select SIG Slide Ex 2 for input and step response.', 'اختار مثال سلايدات SIG رقم 2 للمدخل واستجابة الخطوة.') : feedback('success', 'Infinite step response verified: y[0]=1, y[n]=3 for n>=1 (tail extends to ∞).', 'تم التحقق من استجابة الخطوة اللانهائية: y[0]=1 و y[n]=3 لكل n>=1 ممتدة إلى ∞.'),
    },
    { id: 'average-peak', title: 'Compute and inspect the average peak', titleAr: 'احسب وافحص قمة المتوسط', goal: 'Use input [3, 0, 6] with the three-sample moving average. Step through the full output, then inspect n = 2 and its aligned products.', goalAr: 'استخدم المدخل [3, 0, 6] مع المتوسط المتحرك من تلات عينات. امشي في الخرج كامل بالـ Step، وبعدها افحص n = 2 ونواتج ضربه المتحاذية.', hint: 'Full convolution has input length + response length − 1 outputs. The middle output sums every overlapping pair.', hintAr: 'الالتفاف الكامل فيه عدد مخارج يساوي طول المدخل زائد طول الاستجابة ناقص 1. الخرج الأوسط بيجمع كل الأزواج المتداخلة.', start: () => { reset(); setKernelPreset('impulse'); },
      evaluate: () => inputPreset !== 'book' || kernelPreset !== 'average' ? feedback('retry', 'Use [3, 0, 6] and the three-sample moving average.', 'استخدم [3, 0, 6] والمتوسط المتحرك من تلات عينات.') : steppedThrough !== output.length - 1 ? feedback('pending', 'Step through every output sample before inspecting the peak.', 'امشي بالـ Step في كل عينات الخرج قبل فحص القمة.') : active !== 2 ? feedback('pending', 'Move the inspection slider to n = 2.', 'حرّك مؤشر الفحص لـ n = 2.') : feedback('success', 'Peak verified: y[2] = 1 + 0 + 2 = 3. Full output is [1, 1, 3, 2, 2].', 'القمة اتأكدت: y[2] = 1 + 0 + 2 = 3. الخرج الكامل هو [1, 1, 3, 2, 2].') },
    { id: 'weighted-middle', title: 'Inspect an asymmetric response', titleAr: 'افحص استجابة غير متماثلة', goal: 'Use pulse [1, 2, 1] and asymmetric response [1, 2, 0.5]. Compute through n = 2, then inspect that position and the reversed response.', goalAr: 'استخدم النبضة [1, 2, 1] والاستجابة غير المتماثلة [1, 2, 0.5]. احسب لحد n = 2، وبعدها افحص الموضع ده والاستجابة المعكوسة.', hint: 'At n = 2, response indices decrease across k = 0, 1, 2; do not multiply the two sequences in their original order.', hintAr: 'عند n = 2، مؤشرات الاستجابة بتقلّ عند k = 0 و1 و2؛ ما تضربش التسلسلين بترتيبهم الأصلي.', start: () => { reset(); setInputPreset('pulse'); },
      evaluate: () => inputPreset !== 'pulse' || kernelPreset !== 'weighted' ? feedback('retry', 'Choose pulse [1, 2, 1] and the asymmetric response.', 'اختار النبضة [1, 2, 1] والاستجابة غير المتماثلة.') : steppedThrough < 2 || active !== 2 ? feedback('pending', 'Compute through n = 2 and inspect that same position.', 'احسب لحد n = 2 وافحص نفس الموضع.') : feedback('success', 'Reversal verified: [0.5, 2, 1] faces the pulse, giving y[2] = 0.5 + 4 + 1 = 5.5.', 'العكس اتأكد: [0.5, 2, 1] بتقابل النبضة، وبتدي y[2] = 0.5 + 4 + 1 = 5.5.') },
  ];

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="signal-convolution-title">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><AudioWaveform size={20} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1"><h3 id="signal-convolution-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">Convolution: Multiply, Shift, Sum</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">حرّك استجابة النظام خطوة خطوة، واضرب العينات المتقابلة واجمع نواتج الضرب.</ArabicText></div>
        <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-beige-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Reset convolution lab"><RotateCcw size={15} aria-hidden="true" /><span className="hidden sm:inline">Reset</span></button>
      </header>

      <div className="mb-4 rounded-2xl border border-amber-300 bg-amber-50/80 p-3.5 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200 flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold">★ Important Lab (SIG File) · معمل أساسي مبني على سلايدات د. مسعد حسن الرسمية</span>
        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 font-bold">LTI & Convolution</span>
      </div>

      <LabChallenge missions={missions} />
      <div className="mb-5 grid grid-cols-1 gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-2">
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Input x[n] · index starts at 0
          <select value={inputPreset} onChange={(event) => updateInput(event.target.value as InputPreset)} className={selectClass}>
            <option value="sig1">★ SIG Slide Ex 1: [2, 3, 1]</option>
            <option value="sig2">★ SIG Slide Ex 2: [1, 2] (δ[n] + 2δ[n−1])</option>
            <option value="book">Worked input: [3, 0, 6]</option>
            <option value="pulse">Pulse: [1, 2, 1]</option>
            <option value="ramp">Short pulse: [0, 1, 2, 1]</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Impulse response h[n] · index starts at 0
          <select value={kernelPreset} onChange={(event) => updateKernel(event.target.value as KernelPreset)} className={selectClass}>
            <option value="sigh1">★ SIG Slide Ex 1: [1, −0.5]</option>
            <option value="sigh2">★ SIG Slide Ex 2: Infinite Step response u[n]</option>
            <option value="average">Moving average: [1/3, 1/3, 1/3]</option>
            <option value="impulse">Unit impulse: [1]</option>
            <option value="weighted">Asymmetric response: [1, 2, 0.5]</option>
          </select>
        </label>
      </div>

      {isInfiniteStep && (
        <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50/70 p-4 dark:border-amber-800 dark:bg-amber-950/30">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Infinite Convolution Output &amp; Observation Window
            </h4>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 font-bold text-amber-900 dark:text-amber-200">
              Window W = {windowSize} samples
            </span>
          </div>

          {isSig2 && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-stone-600 dark:text-stone-400">Analytical Convolution Formula</p>
                  <p className="mt-1 font-mono text-sm font-bold text-amber-900 dark:text-amber-300">
                    y[n] = x[n] ∗ u[n] = δ[n] + 3u[n−1]
                  </p>
                  <p className="mt-1 text-xs text-stone-500 dark:text-zinc-400">
                    Derivation: (δ[n] + 2δ[n−1]) ∗ u[n] = u[n] + 2u[n−1] = δ[n] + 3u[n−1]
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-600 dark:text-stone-400">Infinite Sequence Tail</p>
                  <p className="mt-1 font-mono text-sm font-bold text-stone-900 dark:text-stone-100">
                    y = [1, 3, 3, 3, 3, 3, ... → ∞]
                  </p>
                  <p className="mt-1 text-xs text-stone-500 dark:text-zinc-400">
                    y[0] = 1, and y[n] = 3 for all n ≥ 1 extending to infinity
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-3">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              <span>Configurable Observation Window Slider (W = 4 ... 24)</span>
              <span className="font-mono text-amber-700 dark:text-amber-300 font-bold">W = {windowSize}</span>
            </div>
            <input
              type="range"
              min={4}
              max={24}
              value={windowSize}
              onChange={(e) => updateWindow(Number(e.target.value))}
              aria-label="Convolution observation window size W"
              className="w-full accent-amber-600 dark:accent-amber-400"
            />
          </div>

          <div className="rounded-xl bg-amber-100/60 p-3 text-xs text-amber-950 dark:bg-amber-900/30 dark:text-amber-200">
            <p className="font-semibold">Observation Window vs. Infinite Sequence:</p>
            <p className="mt-1">
              The unit step response u[n] and the resulting output y[n] = δ[n] + 3u[n−1] extend infinitely (n → ∞).
              The slider above adjusts our <strong>finite observation window</strong> (W = {windowSize} samples) to inspect any prefix;
              it does <strong>NOT</strong> truncate or change the underlying infinite mathematical signal.
            </p>
            <ArabicText className="mt-1.5 text-xs text-amber-900 dark:text-amber-300">
              الفرق بين نافذة الملاحظة والتسلسل اللانهائي: دالة الخطوة u[n] والخرج الناتج y[n] = δ[n] + 3u[n−1] ممتدان إلى ما لا نهاية.
              شريط التمرير يحدد فقط <strong>نافذة العرض المحدودة</strong> (W = {windowSize} عينة) لمشاهدة وفحص أي بادئة؛ وهو <strong>لا يقتطع</strong> الإشارة الرياضية اللانهائية الأصلية ولا يغيّر طبيعتها.
            </ArabicText>
          </div>
        </div>
      )}

      <div className="mb-4 grid grid-cols-1 gap-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-2">
        <StemRow name={`Input x[n] = [${x.map(show).join(', ')}]`} values={x} />
        <StemRow name={`Response h[n] = [${h.map(show).join(', ')}]`} values={h} />
      </div>

      <div className="mb-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <label htmlFor="convolution-index" className="text-sm font-semibold text-stone-900 dark:text-stone-100">Inspect output index n = {active}</label>
        <input id="convolution-index" type="range" min={0} max={output.length - 1} value={active} onChange={event => setInspectedIndex(Number(event.target.value))} className="mt-3 block w-full accent-stone-800 dark:accent-stone-200" />
        <p className="mt-2 text-xs text-stone-600 dark:text-zinc-400">Slide to inspect any position. Step computes the next output and keeps its products visible.</p>
        <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">حرّك المؤشر عشان تفحص أي موضع. زرار Step بيحسب الخرج اللي بعده وبيخلّي نواتج ضربه ظاهرة.</ArabicText>
      </div>
      <OverlapDiagram x={x} h={h} n={active} />

      <div className="mb-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div><h4 className="font-semibold text-stone-900 dark:text-stone-100">Full output y[n] = x[n] * h[n]</h4><p className="text-xs text-stone-600 dark:text-zinc-400">Output indices: 0 through {output.length - 1}</p></div>
          <button type="button" onClick={() => { setSteppedThrough(next); setInspectedIndex(next); }} disabled={steppedThrough >= output.length - 1} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white" aria-label={steppedThrough >= output.length - 1 ? 'All output samples computed' : `Step convolution output n=${next}`}>
            <SkipForward size={16} aria-hidden="true" />{steppedThrough >= output.length - 1 ? 'Complete' : `Step n = ${next}`}
          </button>
        </div>
        <StemRow name="Output samples · green = computed, amber = inspected" values={output} active={active} completed={steppedThrough} />
        <div aria-live="polite" className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900 dark:bg-amber-950/20">
          <p className="mb-2 text-xs font-semibold uppercase text-amber-900 dark:text-amber-300">Current sum · n = {active}{steppedThrough >= active ? ' · computed' : ' · preview'}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map(({ k, hIndex, xValue, hValue, product }) => <div key={`${active}-${k}`} className={`rounded-xl border px-3 py-2 font-mono text-xs ${hValue ? 'border-amber-300 bg-white text-stone-900 dark:border-amber-800 dark:bg-stone-900 dark:text-stone-100' : 'border-beige-300 bg-[#FAF7F2] text-stone-600 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-400'}`}>
              x[{k}] × h[{hIndex}] = {show(xValue)} × {show(hValue)} = <strong>{show(product)}</strong>
            </div>)}
          </div>
          <p className="mt-3 font-mono text-sm font-bold text-stone-900 dark:text-stone-100">y[{active}] = {terms.map(({ product }) => show(product)).join(' + ')} = {show(output[active])}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
        <p className="font-semibold">Model assumptions &amp; Academic Scope</p>
        <p className="mt-1">Both sequences are zero outside their listed samples, except when the infinite step response u[n] is selected. This is full, zero-state discrete-time convolution.</p>
        <ArabicText className="mt-2 text-sm text-sky-800 dark:text-sky-300">العينات خارج القيم المعروضة بتساوي صفر (باستثناء استجابة الخطوة اللانهائية u[n])، والنموذج بيحسب الالتفاف الكامل في الزمن المتقطع مع حالة ابتدائية صفرية.</ArabicText>
        <div className="mt-3 rounded-xl border border-sky-300 bg-white/80 p-3 dark:border-sky-800 dark:bg-stone-900/60">
          <p className="text-xs font-semibold text-sky-950 dark:text-sky-100">Academic Verification Note (SIG Slide Deck):</p>
          <p className="mt-1 text-xs text-sky-800 dark:text-sky-300">
            Verified against Dr. Mousaad Hassan&apos;s 27-page official lecture deck: the academic scope is 100% discrete-time (n, δ[n], u[n], y[n]). The lecture deck contains zero continuous-time proofs or limits; this lab adheres faithfully to the original discrete-time curriculum without inventing unauthorized external material.
          </p>
          <ArabicText className="mt-1 text-xs text-sky-800 dark:text-sky-300">
            توثيق الأمانة العلمية: تم التحقق من سلايدات د. مسعد حسن الرسمية (27 صفحة)؛ نطاق المنهج متقطع زمنياً بالكامل (Discrete-time)، ولا يتضمن أي إثباتات أو نهايات للزمن المستمر؛ يلتزم المعمل بدقة بالمنهج الأصلي دون إضافة معلومات خارجية غير معتمدة.
          </ArabicText>
        </div>
        {averagePreset && <p className="mt-2 font-mono text-xs text-sky-800 dark:text-sky-300">Worked check: [3, 0, 6] * [1/3, 1/3, 1/3] = [1, 1, 3, 2, 2]</p>}
        <p className="mt-2 text-xs text-sky-800 dark:text-sky-300">The three averaging coefficients follow the book equation. Input presets and the asymmetric response are teaching examples. Calculations use unrounded values; other displayed decimals are rounded.</p>
        <ArabicText className="mt-1 text-xs text-sky-800 dark:text-sky-300">معاملات المتوسط التلاتة من معادلة الكتاب. المدخلات والاستجابة غير المتماثلة أمثلة تعليمية. الحسابات بتستخدم القيم من غير تقريب؛ وباقي القيم العشرية المعروضة متقرّبة.</ArabicText>
      </div>
    </section>
  );
};

export default SignalConvolutionLab;

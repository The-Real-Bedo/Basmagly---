import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, Play, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

export const SIGNAL_SAMPLING_LAB_ID = 'signal-sampling';

const duration = 2;
const width = 640;
const height = 280;
const left = 48;
const right = 18;
const baseline = 137;
const amplitude = 88;
const plotWidth = width - left - right;

const fieldClass = 'w-full accent-amber-600 dark:accent-amber-400';
const panelClass = 'rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950';

function pathFor(points: { t: number; value: number }[]) {
  return points.map(({ t, value }, index) => {
    const x = left + (t / duration) * plotWidth;
    const y = baseline - value * amplitude;
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function quantize(value: number, bits: number) {
  const levels = 2 ** bits;
  const step = 2 / (levels - 1);
  return Math.max(-1, Math.min(1, -1 + Math.round((value + 1) / step) * step));
}

export function SignalSamplingLab() {
  const [frequency, setFrequency] = useState(2);
  const [sampleRate, setSampleRate] = useState(12);
  const [bits, setBits] = useState(4);
  const [hasRun, setHasRun] = useState(false);
  const [phase, setPhase] = useState(0);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [showAlias, setShowAlias] = useState(false);
  const plot = useRef<HTMLDivElement>(null);

  const signal = (t: number) => { const value = Math.sin(2 * Math.PI * frequency * t + phase * Math.PI / 180); return Math.abs(value) < 1e-12 ? 0 : value; };
  const wavePath = useMemo(() => pathFor(Array.from({ length: 401 }, (_, i) => {
    const t = (i / 400) * duration;
    return { t, value: signal(t) };
  })), [frequency, phase]);
  const samples = useMemo(() => Array.from({ length: sampleRate * duration + 1 }, (_, n) => {
    const t = n / sampleRate;
    const raw = signal(t);
    return { n, t, raw, quantized: quantize(raw, bits) };
  }), [frequency, sampleRate, bits, phase]);
  const maxError = Math.max(...samples.map(({ raw, quantized }) => Math.abs(raw - quantized)));
  const nyquistLimit = 2 * frequency;
  const signedAlias = ((frequency + sampleRate / 2) % sampleRate) - sampleRate / 2;
  const aliasFrequency = Math.abs(signedAlias);
  const aliasPath = pathFor(Array.from({ length: 401 }, (_, i) => { const t = i / 400 * duration; return { t, value: Math.sin(2 * Math.PI * signedAlias * t + phase * Math.PI / 180) }; }));
  const inspected = samples[Math.min(sampleIndex, samples.length - 1)];
  const errorBound = 1 / (2 ** bits - 1);

  useEffect(() => {
    const region = plot.current;
    const marker = region?.querySelector<SVGCircleElement>(`circle[data-sample-index="${inspected.n}"]`);
    if (!hasRun || !region || !marker) return;
    const bounds = region.getBoundingClientRect();
    const point = marker.getBoundingClientRect();
    if (point.left < bounds.left + 12 || point.right > bounds.right - 12) {
      region.scrollLeft += point.left - bounds.left - bounds.width / 2;
    }
  }, [hasRun, inspected.n, sampleRate]);

  const update = (setter: (value: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(Number(event.target.value));
    setHasRun(false);
    setSampleIndex(0);
  };

  const reset = () => {
    setFrequency(2);
    setSampleRate(12);
    setBits(4);
    setHasRun(false);
    setPhase(0);
    setSampleIndex(0);
    setShowAlias(false);
  };
  const missions: ChallengeMission[] = [
    { id: 'avoid-alias', title: 'Sample a 7 Hz sine safely', titleAr: 'خد عينات موجة 7 Hz بمعدل كافي', goal: 'Keep the input at 7 Hz with zero phase. Raise the sample rate strictly above twice that frequency, then run sampling.', goalAr: 'خلّي الدخل عند 7 Hz والطور صفر. زوّد معدل العينات لأكبر من ضعف التردد بشكل صارم، وبعدها شغّل أخذ العينات.', hint: 'A rate of exactly 14 samples/s is the boundary. Compare the original sine with the folded candidate at 8 samples/s.', hintAr: 'معدل 14 عينة في الثانية بالضبط هو الحدّ. قارن الموجة الأصلية بالبديل المطوي عند 8 عينات في الثانية.', start: () => { reset(); setFrequency(7); setSampleRate(8); setShowAlias(true); }, evaluate: () => frequency !== 7 || phase !== 0 ? feedback('retry', 'Keep 7 Hz and zero phase.', 'خلّي التردد 7 Hz والطور صفر.') : !hasRun ? feedback('pending', 'Choose the sample rate, then run sampling.', 'اختار معدل العينات، وبعدها شغّل أخذ العينات.') : sampleRate > 14 ? feedback('success', 'The sample rate exceeds 14 samples/s for this ideal band-limited sine. Quantization remains a separate error source.', 'معدل العينات عَدّى 14 عينة في الثانية للموجة المثالية المحدودة النطاق دي. التكميم بيفضل مصدر خطأ منفصل.') : feedback('retry', 'Use more than 14 samples/s; equality is still the ambiguous boundary.', 'استخدم أكتر من 14 عينة في الثانية؛ التساوي لسه هو الحدّ الملتبس.') },
    { id: 'quantization-bound', title: 'Find the smallest adequate bit depth', titleAr: 'اعثر على أصغر عمق بتات مناسب', goal: 'Keep 2 Hz, 12 samples/s and zero phase. Find the smallest bit depth with rounding-error bound at most 0.02 normalized amplitude, then run sampling.', goalAr: 'خلّي التردد 2 Hz والمعدل 12 عينة في الثانية والطور صفر. اعثر على أصغر عمق بتات حدّ خطأ التقريب فيه 0.02 من السعة المطبّعة على الأكثر، وبعدها شغّل أخذ العينات.', hint: 'The endpoint quantizer has bound Δ/2 = 1/(2ᴮ−1). Compare five and six bits.', hintAr: 'حدّ مكمّم الطرفين هو نص خطوة التكميم: 1 مقسوم على (2 أس B ناقص 1). قارن خمسة وستة بتات.', start: () => { reset(); setBits(2); }, evaluate: () => frequency !== 2 || sampleRate !== 12 || phase !== 0 ? feedback('retry', 'Keep 2 Hz, 12 samples/s and zero phase.', 'خلّي التردد 2 Hz والمعدل 12 عينة في الثانية والطور صفر.') : !hasRun ? feedback('pending', 'Select bit depth and run sampling.', 'اختار عمق البتات وشغّل أخذ العينات.') : bits === 6 && maxError <= errorBound + 1e-10 ? feedback('success', 'Six bits is the smallest fit: 1/63 ≈ 0.01587. Five bits gives 1/31 ≈ 0.03226.', 'ستة بتات أصغر اختيار مناسب: 1/63 حوالي 0.01587. خمسة بتات بتدي 1/31 حوالي 0.03226.') : feedback('retry', bits > 6 ? 'A smaller bit depth also meets the bound. Compare six bits.' : 'Increase bit depth until the guaranteed rounding bound meets 0.02.', bits > 6 ? 'عمق بتات أصغر يحقق الحدّ برضه. قارن ستة بتات.' : 'زوّد عمق البتات لحد ما حدّ التقريب المضمون يحقق 0.02.') },
  ];

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Activity size={20} aria-hidden="true" /></span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Sampling and Quantization Lab</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">معمل أخذ العينات والتكميم</ArabicText>
        </div>
      </header>

      <LabChallenge missions={missions} />
      <div className="grid gap-4 sm:grid-cols-3">
        <label className={panelClass}>
          <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Input frequency · {frequency} Hz</span>
          <ArabicText className="mb-3 mt-1 text-sm text-stone-600 dark:text-zinc-400">تردد الدخل</ArabicText>
          <input aria-label="Input frequency in hertz" className={fieldClass} type="range" min="1" max="8" step="1" value={frequency} onChange={update(setFrequency)} />
          <span className="mt-1 flex justify-between text-[13px] text-stone-500 dark:text-zinc-400"><span>1 Hz</span><span>8 Hz</span></span>
        </label>
        <label className={panelClass}>
          <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Sampling rate · {sampleRate} samples/s</span>
          <ArabicText className="mb-3 mt-1 text-sm text-stone-600 dark:text-zinc-400">معدل أخذ العينات</ArabicText>
          <input aria-label="Sampling rate in samples per second" className={fieldClass} type="range" min="2" max="24" step="1" value={sampleRate} onChange={update(setSampleRate)} />
          <span className="mt-1 flex justify-between text-[13px] text-stone-500 dark:text-zinc-400"><span>2</span><span>24</span></span>
        </label>
        <label className={panelClass}>
          <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Bit depth · {bits} bits ({2 ** bits} levels)</span>
          <ArabicText className="mb-3 mt-1 text-sm text-stone-600 dark:text-zinc-400">عمق البِت</ArabicText>
          <input aria-label="Quantization bit depth" className={fieldClass} type="range" min="2" max="8" step="1" value={bits} onChange={update(setBits)} />
          <span className="mt-1 flex justify-between text-[13px] text-stone-500 dark:text-zinc-400"><span>2 bits</span><span>8 bits</span></span>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Sine phase"><span className="text-sm text-stone-700 dark:text-zinc-300">Sine phase:</span>{[0, 90].map(value => <button type="button" key={value} aria-pressed={phase === value} onClick={() => { setPhase(value); setHasRun(false); setSampleIndex(0); }} className={`min-h-11 rounded-xl border px-3 text-sm font-semibold ${phase === value ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300'}`}>{value}°</button>)}<button type="button" aria-pressed={showAlias} onClick={() => setShowAlias(value => !value)} className="min-h-11 rounded-xl border border-beige-300 px-3 text-sm font-semibold text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800">{showAlias ? 'Hide folded candidate' : 'Show folded candidate'}</button></div>
      <p className="mt-2 text-xs text-stone-600 dark:text-zinc-400">At Fₛ = 2f₀, zero phase gives zero ideal samples; 90° gives alternating ±1. Changing phase exposes the boundary but does not remove its ambiguity.</p>
      <ArabicText className="mt-1 text-xs text-stone-600 dark:text-zinc-400">لما معدل العينات يساوي ضعف التردد، الطور صفر بيدي عينات مثالية صفرية؛ وطور 90 درجة بيدي 1 و−1 بالتبادل. تغيير الطور بيوضّح الحدّ بس مش بيشيل الالتباس.</ArabicText>
      <div className="my-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => setHasRun(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 motion-reduce:transition-none dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white dark:focus-visible:outline-amber-400"><Play size={16} aria-hidden="true" /> Run sampling</button>
        <button type="button" onClick={reset} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-beige-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-beige-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 motion-reduce:transition-none dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 dark:focus-visible:outline-amber-400"><RotateCcw size={16} aria-hidden="true" /> Reset</button>
      </div>

      <div className={panelClass}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Analog input and ADC samples</p>
          <p className="text-[13px] text-stone-500 dark:text-zinc-400">2-second teaching window · normalized amplitude</p>
        </div>
        <div ref={plot} className="w-full min-w-0 overflow-x-auto" tabIndex={0} role="region" aria-label="Sampling plot; scroll horizontally on small screens">
          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Sine wave with sample points and quantized sample levels" className="mx-auto block h-auto w-full min-w-[640px] max-w-[800px]">
            <line x1={left} y1={baseline} x2={width - right} y2={baseline} className="stroke-stone-400 dark:stroke-stone-600" strokeWidth="1.5" />
            <line x1={left} y1="30" x2={left} y2="244" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="1" />
            <line x1={left} y1={baseline - amplitude} x2={width - right} y2={baseline - amplitude} className="stroke-stone-200 dark:stroke-stone-800" strokeDasharray="4 5" />
            <line x1={left} y1={baseline + amplitude} x2={width - right} y2={baseline + amplitude} className="stroke-stone-200 dark:stroke-stone-800" strokeDasharray="4 5" />
            <path d={wavePath} fill="none" className="stroke-stone-500 dark:stroke-stone-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {hasRun && showAlias && <path data-testid="alias-candidate" d={aliasPath} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2" strokeDasharray="7 5" />}
            {hasRun && samples.map(({ n, t, raw, quantized }) => {
              const x = left + (t / duration) * plotWidth;
              const rawY = baseline - raw * amplitude;
              const qY = baseline - quantized * amplitude;
              return <g key={n}>
                <line x1={x} y1={baseline} x2={x} y2={qY} className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="1" />
                {Math.abs(raw - quantized) > 0.001 && <line x1={x} y1={rawY} x2={x} y2={qY} className="stroke-rose-500 dark:stroke-rose-400" strokeDasharray="3 3" strokeWidth="2" />}
                <circle data-sample-index={n} cx={x} cy={rawY} r={n === sampleIndex ? '6' : '4'} className="fill-amber-500 dark:fill-amber-400"><title>{`Sample ${n}: ${raw.toFixed(3)}`}</title></circle>
                <rect x={x - 3.5} y={qY - 3.5} width="7" height="7" rx="1" className="fill-rose-600 dark:fill-rose-400"><title>{`Quantized sample ${n}: ${quantized.toFixed(3)}`}</title></rect>
              </g>;
            })}
            <text x={left} y="266" className="fill-stone-600 dark:fill-zinc-400 text-[13px]" fontSize="13">0 s</text>
            <text x={width - right} y="266" textAnchor="end" className="fill-stone-600 dark:fill-zinc-400 text-[13px]" fontSize="13">2 s</text>
            <text x="8" y="37" className="fill-stone-600 dark:fill-zinc-400 text-[13px]" fontSize="13">+1</text>
            <text x="18" y={baseline + 5} className="fill-stone-600 dark:fill-zinc-400 text-[13px]" fontSize="13">0</text>
            <text x="10" y={baseline + amplitude + 4} className="fill-stone-600 dark:fill-zinc-400 text-[13px]" fontSize="13">−1</text>
          </svg>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-stone-600 dark:text-zinc-300" aria-label="Chart legend">
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 bg-stone-500 dark:bg-stone-300" /> Continuous input</span>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500 dark:bg-amber-400" /> Sampled value</span>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-rose-600 dark:bg-rose-400" /> Quantized level</span>
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 border-t-2 border-dashed border-rose-500 dark:border-rose-400" /> Quantization error</span>
          {showAlias && <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 border-t-2 border-dashed border-sky-600 dark:border-sky-400" /> Folded candidate</span>}
        </div>
      </div>

      {hasRun && <div className={`${panelClass} mt-4`} data-testid="sample-inspector"><label htmlFor="sample-inspector-index" className="text-sm font-semibold text-stone-900 dark:text-stone-100">Inspect sample n = {inspected.n}</label><input id="sample-inspector-index" type="range" min={0} max={samples.length - 1} value={sampleIndex} onChange={event => setSampleIndex(Number(event.target.value))} className="mt-3 w-full accent-amber-600 dark:accent-amber-400" /><p className="mt-2 break-words font-mono text-sm text-stone-900 dark:text-stone-100">t = {inspected.t.toFixed(4)} s · raw = {inspected.raw.toFixed(5)} · quantized = {inspected.quantized.toFixed(5)}</p><p className="mt-2 text-sm text-stone-700 dark:text-zinc-300">Absolute rounding error: {Math.abs(inspected.raw - inspected.quantized).toFixed(5)}. Bound Δ/2: {errorBound.toFixed(5)}. The folded curve matches ideal sample instants; it is one candidate, not a reconstruction of the quantized output.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">خطأ التقريب المطلق: {Math.abs(inspected.raw - inspected.quantized).toFixed(5)}. حدّ نص خطوة التكميم: {errorBound.toFixed(5)}. المنحنى المطوي بيطابق لحظات العينات المثالية؛ ده بديل ممكن، مش استرجاع للخرج المتكمّم.</ArabicText></div>}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className={panelClass}><p className="break-words font-mono text-sm text-stone-900 dark:text-stone-100">x[n] = sin(2π f₀ n / Fₛ + φ)</p><p className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">Sampling selects time instants; φ is the phase in radians.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">الـ Sampling بيختار لحظات الزمن؛ وφ هو الطور بالراديان.</ArabicText></div>
        <div className={panelClass}><p className="font-mono text-sm text-stone-900 dark:text-stone-100">Δ = 2 / (2ᴮ − 1)</p><p className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">Uniform levels include both −1 and +1.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">المستويات المتساوية بتشمل <bdi dir="ltr">−1</bdi> و<bdi dir="ltr">+1</bdi>.</ArabicText></div>
        <div className={panelClass}><p className="font-mono text-sm text-stone-900 dark:text-stone-100">|error| ≤ Δ / 2</p><p className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">Ideal rounding bound; no overload.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">حدّ التقريب المثالي من غير تجاوز المدى.</ArabicText></div>
      </div>

      <div aria-live="polite" className={`mt-4 rounded-2xl border p-4 ${hasRun && sampleRate <= nyquistLimit ? 'border-amber-200 bg-amber-50/70 dark:border-amber-900 dark:bg-amber-950/20' : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950'}`}>
        {hasRun ? <>
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{sampleRate < nyquistLimit ? `Aliasing risk: Fₛ = ${sampleRate} samples/s is below 2f₀ = ${nyquistLimit} samples/s.` : sampleRate === nyquistLimit ? 'Nyquist boundary: this phase can produce ambiguous samples.' : 'The sample rate is above twice this sine frequency.'}</p>
          <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">Folded alias frequency in this idealized model: {aliasFrequency.toFixed(2)} Hz. {samples.length} samples; largest observed quantization error: {maxError.toFixed(3)}.</p>
          <ArabicText className="mt-2 text-sm text-stone-700 dark:text-stone-300">{sampleRate < nyquistLimit ? `فيه خطر Aliasing: معدل أخذ العينات ${sampleRate} عينة/ثانية أقل من 2f₀ = ${nyquistLimit} عينة/ثانية.` : sampleRate === nyquistLimit ? 'إحنا على حد Nyquist؛ العينات ممكن تبقى ملتبسة حسب طور الإشارة.' : 'معدل أخذ العينات أعلى من ضعفي تردد الموجة دي.'} التردد الظاهر في النموذج المثالي {aliasFrequency.toFixed(2)} Hz. عدد العينات {samples.length}؛ وأكبر خطأ تكميم مقاس {maxError.toFixed(3)}.</ArabicText>
        </> : <>
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">Choose the input frequency, sampling rate, and bit depth, then run the ADC model.</p>
          <ArabicText className="mt-1 text-sm text-stone-700 dark:text-stone-300">اختار تردد الدخل ومعدل أخذ العينات وعمق البِت، وبعدها شغّل نموذج الـ ADC.</ArabicText>
        </>}
      </div>
      <p className="mt-3 text-[13px] text-stone-500 dark:text-zinc-400">Teaching model: ideal sine, uniform endpoint quantizer, and no noise or reconstruction filter. The Nyquist rule is shown as supplementary context; it assumes a band-limited input.</p>
      <ArabicText className="mt-1 text-sm text-stone-500 dark:text-zinc-400">نموذج تعليمي: موجة جيبية مثالية ومكمّم منتظم بيشمل طرفَي المدى، ومن غير ضوضاء أو مرشح استرجاع. قاعدة Nyquist معلومة إضافية وبتفترض إن الدخل محدود النطاق.</ArabicText>
    </section>
  );
}

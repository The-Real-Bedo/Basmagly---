import { useMemo, useState } from 'react';
import { Activity, Play, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

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

  const signal = (t: number) => Math.sin(2 * Math.PI * frequency * t);
  const wavePath = useMemo(() => pathFor(Array.from({ length: 401 }, (_, i) => {
    const t = (i / 400) * duration;
    return { t, value: Math.sin(2 * Math.PI * frequency * t) };
  })), [frequency]);
  const samples = useMemo(() => Array.from({ length: sampleRate * duration + 1 }, (_, n) => {
    const t = n / sampleRate;
    const raw = signal(t);
    return { n, t, raw, quantized: quantize(raw, bits) };
  }), [frequency, sampleRate, bits]);
  const maxError = Math.max(...samples.map(({ raw, quantized }) => Math.abs(raw - quantized)));
  const nyquistLimit = 2 * frequency;
  const aliasFrequency = Math.abs((((frequency + sampleRate / 2) % sampleRate) - sampleRate / 2));

  const update = (setter: (value: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(Number(event.target.value));
    setHasRun(false);
  };

  const reset = () => {
    setFrequency(2);
    setSampleRate(12);
    setBits(4);
    setHasRun(false);
  };

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Activity size={20} aria-hidden="true" /></span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Sampling and Quantization Lab</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">معمل أخذ العينات والتكميم</ArabicText>
        </div>
      </header>

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

      <div className="my-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => setHasRun(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 motion-reduce:transition-none dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white dark:focus-visible:outline-amber-400"><Play size={16} aria-hidden="true" /> Run sampling</button>
        <button type="button" onClick={reset} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-beige-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-beige-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 motion-reduce:transition-none dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 dark:focus-visible:outline-amber-400"><RotateCcw size={16} aria-hidden="true" /> Reset</button>
      </div>

      <div className={panelClass}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Analog input and ADC samples</p>
          <p className="text-[13px] text-stone-500 dark:text-zinc-400">2-second teaching window · normalized amplitude</p>
        </div>
        <div className="w-full min-w-0">
          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Sine wave with sample points and quantized sample levels" className="mx-auto block h-auto w-full max-w-[800px] overflow-visible">
            <line x1={left} y1={baseline} x2={width - right} y2={baseline} className="stroke-stone-400 dark:stroke-stone-600" strokeWidth="1.5" />
            <line x1={left} y1="30" x2={left} y2="244" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="1" />
            <line x1={left} y1={baseline - amplitude} x2={width - right} y2={baseline - amplitude} className="stroke-stone-200 dark:stroke-stone-800" strokeDasharray="4 5" />
            <line x1={left} y1={baseline + amplitude} x2={width - right} y2={baseline + amplitude} className="stroke-stone-200 dark:stroke-stone-800" strokeDasharray="4 5" />
            <path d={wavePath} fill="none" className="stroke-stone-500 dark:stroke-stone-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {hasRun && samples.map(({ n, t, raw, quantized }) => {
              const x = left + (t / duration) * plotWidth;
              const rawY = baseline - raw * amplitude;
              const qY = baseline - quantized * amplitude;
              return <g key={n}>
                <line x1={x} y1={baseline} x2={x} y2={qY} className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="1" />
                {Math.abs(raw - quantized) > 0.001 && <line x1={x} y1={rawY} x2={x} y2={qY} className="stroke-rose-500 dark:stroke-rose-400" strokeDasharray="3 3" strokeWidth="2" />}
                <circle cx={x} cy={rawY} r="4" className="fill-amber-500 dark:fill-amber-400"><title>{`Sample ${n}: ${raw.toFixed(3)}`}</title></circle>
                <rect x={x - 3.5} y={qY - 3.5} width="7" height="7" rx="1" className="fill-rose-600 dark:fill-rose-400"><title>{`Quantized sample ${n}: ${quantized.toFixed(3)}`}</title></rect>
              </g>;
            })}
            <text x={left} y="266" className="fill-stone-600 dark:fill-zinc-400 [font-size:30px] sm:[font-size:13px]" fontSize="13">0 s</text>
            <text x={width - right} y="266" textAnchor="end" className="fill-stone-600 dark:fill-zinc-400 [font-size:30px] sm:[font-size:13px]" fontSize="13">2 s</text>
            <text x="8" y="37" className="fill-stone-600 dark:fill-zinc-400 [font-size:30px] sm:[font-size:13px]" fontSize="13">+1</text>
            <text x="18" y={baseline + 5} className="fill-stone-600 dark:fill-zinc-400 [font-size:30px] sm:[font-size:13px]" fontSize="13">0</text>
            <text x="10" y={baseline + amplitude + 4} className="fill-stone-600 dark:fill-zinc-400 [font-size:30px] sm:[font-size:13px]" fontSize="13">−1</text>
          </svg>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-stone-600 dark:text-zinc-300" aria-label="Chart legend">
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 bg-stone-500 dark:bg-stone-300" /> Continuous input</span>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500 dark:bg-amber-400" /> Sampled value</span>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-rose-600 dark:bg-rose-400" /> Quantized level</span>
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 border-t-2 border-dashed border-rose-500 dark:border-rose-400" /> Quantization error</span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className={panelClass}><p className="font-mono text-sm text-stone-900 dark:text-stone-100">x[n] = sin(2π f₀ n / Fₛ)</p><p className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">Sampling selects the time instants.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">الـ Sampling بيختار لحظات الزمن.</ArabicText></div>
        <div className={panelClass}><p className="font-mono text-sm text-stone-900 dark:text-stone-100">Δ = 2 / (2ᴮ − 1)</p><p className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">Uniform levels include both −1 and +1.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">المستويات المتساوية بتشمل −1 و+1.</ArabicText></div>
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
      <ArabicText className="mt-1 text-sm text-stone-500 dark:text-zinc-400">نموذج تعليمي: موجة جيبية مثالية ومكمّم منتظم من غير ضوضاء أو مرشح استرجاع. قاعدة Nyquist معلومة إضافية وبتفترض إن الدخل محدود النطاق.</ArabicText>
    </section>
  );
}

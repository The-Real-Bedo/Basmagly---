import { useMemo, useState } from 'react';
import { Activity, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

export const DISCRETE_SIGNALS_LAB_ID = 'discrete-signals';

type SignalKind = 'impulse' | 'step' | 'exponential';
type ViewKind = 'signal' | 'even' | 'odd';

const indices = Array.from({ length: 11 }, (_, index) => index - 5);
const cardClass = 'rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950';
const inputClass = 'mt-2 w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:focus-visible:outline-amber-400';

function clean(value: number) {
  const rounded = Math.abs(value) < 1e-10 ? 0 : Number(value.toFixed(3));
  return Object.is(rounded, -0) ? '0' : String(rounded);
}

export function DiscreteSignalsLab() {
  const [kind, setKind] = useState<SignalKind>('impulse');
  const [shift, setShift] = useState(0);
  const [reversed, setReversed] = useState(false);
  const [base, setBase] = useState(-0.5);
  const [view, setView] = useState<ViewKind>('signal');
  const [inspectN, setInspectN] = useState(1);

  const sourceAt = (n: number) => {
    if (kind === 'impulse') return n === 0 ? 1 : 0;
    if (kind === 'step') return n >= 0 ? 1 : 0;
    return base ** n;
  };
  const signalAt = (n: number) => sourceAt(reversed ? shift - n : n - shift);
  const componentAt = (n: number, component: Exclude<ViewKind, 'signal'>) => {
    const positive = signalAt(n);
    const reflected = signalAt(-n);
    return component === 'even' ? (positive + reflected) / 2 : (positive - reflected) / 2;
  };
  const values = useMemo(() => indices.map((n) => ({
    n,
    value: view === 'signal' ? signalAt(n) : componentAt(n, view),
  })), [kind, shift, reversed, base, view]);
  const scale = Math.max(1, ...values.map(({ value }) => Math.abs(value)));
  const width = 640;
  const height = 278;
  const left = 48;
  const right = 18;
  const baseline = 133;
  const plotWidth = width - left - right;
  const plotHeight = 96;
  const xOf = (index: number) => left + (index / (indices.length - 1)) * plotWidth;
  const yOf = (value: number) => baseline - (value / scale) * plotHeight;
  const inspectedSignal = signalAt(inspectN);
  const inspectedEven = componentAt(inspectN, 'even');
  const inspectedOdd = componentAt(inspectN, 'odd');

  const reset = () => {
    setKind('impulse');
    setShift(0);
    setReversed(false);
    setBase(-0.5);
    setView('signal');
    setInspectN(1);
  };

  const title = view === 'signal' ? 'x[n]' : view === 'even' ? 'xₑ[n]' : 'xₒ[n]';
  const equation = reversed ? `x[${shift} − n]` : shift === 0 ? 'x[n]' : `x[n − (${shift})]`;

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Activity size={20} aria-hidden="true" /></span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Discrete-Time Signals Lab</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">معمل إشارات الزمن المتقطع</ArabicText>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className={cardClass}>
          <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Signal type</span>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">نوع الإشارة</ArabicText>
          <select className={inputClass} aria-label="Signal type" value={kind} onChange={(event) => setKind(event.target.value as SignalKind)}>
            <option value="impulse">Unit impulse δ[n]</option>
            <option value="step">Unit step u[n]</option>
            <option value="exponential">Exponential aⁿ</option>
          </select>
        </label>
        <label className={cardClass}>
          <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Shift · n₀ = {shift}</span>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">الإزاحة</ArabicText>
          <input className="mt-3 w-full accent-amber-600 dark:accent-amber-400" type="range" min="-4" max="4" step="1" value={shift} aria-label="Integer time shift" onChange={(event) => setShift(Number(event.target.value))} />
          <span className="mt-1 flex justify-between text-[13px] text-stone-500 dark:text-zinc-400"><span>−4</span><span>+4</span></span>
        </label>
        {kind === 'exponential' ? <label className={cardClass}>
          <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Base · a = {base}</span>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">الأساس</ArabicText>
          <select className={inputClass} aria-label="Exponential base" value={base} onChange={(event) => setBase(Number(event.target.value))}>
            <option value="0.5">0.5 · positive decay</option>
            <option value="0.8">0.8 · slow positive decay</option>
            <option value="1">1 · constant</option>
            <option value="1.2">1.2 · positive growth</option>
            <option value="-0.5">−0.5 · alternating decay</option>
            <option value="-1.2">−1.2 · alternating growth</option>
          </select>
        </label> : <div className={`${cardClass} flex flex-col justify-center`}>
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Exponential control</p>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">تحكم الإشارة الأسية</ArabicText>
          <p className="mt-2 text-[13px] text-stone-500 dark:text-zinc-400">Select the exponential type to change a.</p>
        </div>}
        <label className={cardClass}>
          <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Inspect index · n = {inspectN}</span>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">الفهرس اللي هنعرضه</ArabicText>
          <input className="mt-3 w-full accent-amber-600 dark:accent-amber-400" type="range" min="-5" max="5" step="1" value={inspectN} aria-label="Index to inspect" onChange={(event) => setInspectN(Number(event.target.value))} />
          <span className="mt-1 flex justify-between text-[13px] text-stone-500 dark:text-zinc-400"><span>−5</span><span>+5</span></span>
        </label>
      </div>

      <div className="my-4 flex flex-wrap items-center gap-3">
        <label className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-3 py-2 text-sm font-medium text-stone-700 dark:border-stone-700 dark:text-stone-200">
          <input type="checkbox" className="accent-amber-600 dark:accent-amber-400" checked={reversed} onChange={(event) => setReversed(event.target.checked)} />
          <span>Reverse in time</span>
        </label>
        <div className="flex min-h-11 flex-wrap items-center gap-1 rounded-xl border border-beige-300 p-1 dark:border-stone-700" role="group" aria-label="Choose plotted sequence">
          {(['signal', 'even', 'odd'] as const).map((item) => <button key={item} type="button" aria-pressed={view === item} onClick={() => setView(item)} className={`min-h-9 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 dark:focus-visible:outline-amber-400 ${view === item ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-600 hover:bg-beige-100 dark:text-zinc-300 dark:hover:bg-stone-800'}`}>{item === 'signal' ? 'Signal' : item === 'even' ? 'Even part' : 'Odd part'}</button>)}
        </div>
        <button type="button" onClick={reset} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-beige-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-beige-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 motion-reduce:transition-none dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 dark:focus-visible:outline-amber-400"><RotateCcw size={16} aria-hidden="true" /> Reset</button>
      </div>

      <div className={cardClass}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Stem plot · {title}</p>
          <p className="font-mono text-[13px] text-stone-500 dark:text-zinc-400">Current sequence: {equation}</p>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title} stem plot for integer indices from minus five to five`} className="mx-auto block h-auto w-full max-w-[800px]">
          <line x1={left} y1={baseline} x2={width - right} y2={baseline} className="stroke-stone-400 dark:stroke-stone-600" strokeWidth="1.5" />
          <line x1={left} y1="24" x2={left} y2="242" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="1" />
          {values.map(({ n, value }, index) => {
            const x = xOf(index);
            const y = yOf(value);
            return <g key={n}>
              <line x1={x} y1={baseline} x2={x} y2={y} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="2" />
              <circle cx={x} cy={y} r="4.5" className="fill-amber-600 dark:fill-amber-400"><title>{`n=${n}, ${title}=${clean(value)}`}</title></circle>
              {n % 2 === 0 && <text x={x} y="253" textAnchor="middle" className="fill-stone-600 dark:fill-zinc-400 [font-size:30px] sm:[font-size:13px]" fontSize="13">{n}</text>}
            </g>;
          })}
          <text x="15" y="34" className="fill-stone-600 dark:fill-zinc-400 [font-size:30px] sm:[font-size:13px]" fontSize="13">{title}</text>
          <text x={width - right} y="273" textAnchor="end" className="fill-stone-600 dark:fill-zinc-400 [font-size:30px] sm:[font-size:13px]" fontSize="13">n</text>
        </svg>
        <p className="mt-1 text-[13px] text-stone-500 dark:text-zinc-400">The vertical scale auto-fits the largest visible value.</p>
        <ArabicText className="mt-1 text-sm text-stone-500 dark:text-zinc-400">المقياس الرأسي بيتظبط تلقائيًا على أكبر قيمة ظاهرة.</ArabicText>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div aria-live="polite" className={cardClass}>
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">At n = {inspectN}</p>
          <p className="mt-2 font-mono text-sm text-stone-900 dark:text-stone-100">x[n] = {clean(inspectedSignal)}</p>
          <p className="font-mono text-sm text-stone-900 dark:text-stone-100">xₑ[n] = {clean(inspectedEven)}</p>
          <p className="font-mono text-sm text-stone-900 dark:text-stone-100">xₒ[n] = {clean(inspectedOdd)}</p>
          <ArabicText className="mt-2 text-sm text-stone-600 dark:text-zinc-400">الجزء الزوجي والجزء الفردي بيتحسبوا من الإشارة بعد الإزاحة وعكس الزمن.</ArabicText>
        </div>
        <div className={cardClass}>
          <p className="font-mono text-sm text-stone-900 dark:text-stone-100">xₑ[n] = (x[n] + x[−n]) / 2</p>
          <p className="font-mono text-sm text-stone-900 dark:text-stone-100">xₒ[n] = (x[n] − x[−n]) / 2</p>
          <p className="mt-1 font-mono text-sm text-stone-900 dark:text-stone-100">x[n] = xₑ[n] + xₒ[n]</p>
          <ArabicText className="mt-2 text-sm text-stone-600 dark:text-zinc-400">اختار Even part أو Odd part عشان تعرض كل مكوّن لوحده على الرسم.</ArabicText>
        </div>
      </div>

      <div aria-live="polite" className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900 dark:bg-amber-950/20">
        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{kind === 'impulse' ? 'Impulse: only the zero-index sample is nonzero; shifting moves the stem.' : kind === 'step' ? 'Step: the sequence turns on at its shifted step index.' : `Exponential: a = ${base}; ${Math.abs(base) < 1 ? 'magnitude decays toward increasing n' : Math.abs(base) > 1 ? 'magnitude grows toward increasing n' : 'magnitude stays constant'}${base < 0 ? ' and the sign alternates' : ''}.`}</p>
        <ArabicText className="mt-1 text-sm text-stone-700 dark:text-stone-300">{kind === 'impulse' ? 'النبضة: العينة غير الصفرية عند فهرس واحد؛ والإزاحة بتنقل العمود.' : kind === 'step' ? 'الخطوة: التتابع بيبدأ عند فهرس الخطوة بعد الإزاحة.' : `الإشارة الأسية: a = ${base}؛ ${Math.abs(base) < 1 ? 'المقدار بيقل مع زيادة n' : Math.abs(base) > 1 ? 'المقدار بيزيد مع زيادة n' : 'المقدار ثابت'}${base < 0 ? ' والإشارة بتتبادل' : ''}.`}</ArabicText>
      </div>
    </section>
  );
}

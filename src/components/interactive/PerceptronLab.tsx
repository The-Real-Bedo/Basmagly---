import { useEffect, useId, useRef, useState } from 'react';
import { Brain, Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LectureSection } from '../LectureSection';
import { activation, BINARY_INPUTS, decisionRegion, errorCount, initialTraining, predict, targetFor, TRAINING_LIMIT, trainEpoch, trainSample, type Gate, type Weights } from './aiLabModels';

const control = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400';
const neutral = 'border-beige-300 bg-white text-stone-800 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200 dark:hover:bg-stone-800';
const active = 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900';
const button = `${control} ${neutral}`;
const pointX = (value: number) => 24 + (value + .35) / 1.7 * 272;
const pointY = (value: number) => 296 - (value + .35) / 1.7 * 272;

export function PerceptronLab() {
  const theoryId = useId();
  const [gate, setGate] = useState<Gate>('AND');
  const [training, setTraining] = useState(initialTraining);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const reset = () => { clearTimers(); setPlaying(false); setTraining(initialTraining()); setSelected(0); };
  const mistakes = errorCount(training.weights, gate);
  const finished = mistakes === 0 || training.steps >= TRAINING_LIMIT;
  useEffect(() => {
    if (!playing) return;
    if (finished) { setPlaying(false); return; }
    timers.current.push(setTimeout(() => setTraining(state => trainEpoch(state, gate)), 300));
    return clearTimers;
  }, [playing, training, gate, finished]);
  useEffect(() => () => clearTimers(), []);
  const setWeight = (index: number, value: number) => {
    if (playing) return;
    clearTimers();
    const weights = [...training.weights] as Weights;
    weights[index] = value;
    setTraining({ weights, steps: 0 });
  };
  const region = decisionRegion(training.weights);
  const boundary = training.weights[0] || training.weights[1] ? region.filter(point => Math.abs(activation(training.weights, point)) < 1e-8) : [];
  const sample = BINARY_INPUTS[selected];
  const observation = mistakes === 0
    ? ['All four examples match. The current threshold separates the target classes.', 'الأمثلة الأربعة متطابقة. العتبة الحالية بتفصل التصنيفات المطلوبة.']
    : training.steps >= TRAINING_LIMIT
      ? gate === 'XOR' ? ['Training stopped at the display limit. XOR cannot be separated by one straight boundary; this limit alone is not the proof.', 'التدريب وقف عند حد العرض. XOR ما ينفعش تتفصل بحد مستقيم واحد؛ والحد ده لوحده مش البرهان.'] : ['The display limit was reached. Reset or adjust the initial weights; a finite training limit does not prove non-separability.', 'وصلنا لحد العرض. صفّر أو غيّر الأوزان الابتدائية؛ حد تدريب محدود مش دليل إن الفصل الخطي مستحيل.']
      : ['Change the weights or step through training. A sample update uses its target minus its current prediction.', 'غيّر الأوزان أو تابع التدريب خطوة خطوة. تحديث العينة بيستخدم التصنيف المطلوب ناقص التوقع الحالي.'];

  return <section className="space-y-5 rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
    <header className="flex items-start gap-3"><span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Brain className="h-5 w-5" /></span><div><h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Perceptron & XOR Studio</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">حرّك الحد الفاصل وشوف عصبون واحد بيتعلّم إيه</ArabicText></div></header>
    <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Target truth table">
        {(['AND', 'OR', 'XOR'] as const).map(value => <button key={value} type="button" disabled={playing} aria-pressed={gate === value} onClick={() => { setGate(value); reset(); }} className={`${control} ${gate === value ? active : neutral}`}>{value}</button>)}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {(['Weight w₁', 'Weight w₂', 'Bias b'] as const).map((label, i) => <label key={label} className="min-w-0 space-y-2"><span className="flex items-center justify-between gap-2 text-sm text-stone-700 dark:text-zinc-300"><span>{label}</span><output className="font-mono font-bold">{training.weights[i].toFixed(2)}</output></span><input type="range" aria-label={label} min={-8} max={8} step={.25} value={training.weights[i]} disabled={playing} onChange={e => setWeight(i, Number(e.target.value))} className="w-full accent-amber-600 dark:accent-amber-400" /></label>)}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => { if (playing) clearTimers(); setPlaying(!playing); }} disabled={finished && !playing} className={button}>{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{playing ? 'Pause training' : 'Run training'}</button>
        <button type="button" onClick={() => setTraining(state => trainSample(state, gate))} disabled={playing || finished} className={button}><StepForward className="h-4 w-4" />Step sample</button>
        <button type="button" onClick={reset} className={button}><RotateCcw className="h-4 w-4" />Reset neuron</button>
      </div>
    </div>
    <div className="grid min-w-0 gap-4 lg:grid-cols-2">
      <figure data-lab-scene className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950">
        <svg viewBox="0 0 320 320" className="mx-auto w-full max-w-lg text-stone-500 dark:text-zinc-400" role="img" aria-label="Perceptron decision boundary and four binary training inputs">
          <rect x="24" y="24" width="272" height="272" rx="10" fill="none" stroke="currentColor" opacity=".4" />
          {region.length > 0 && <polygon points={region.map(([x, y]) => `${pointX(x)},${pointY(y)}`).join(' ')} className="fill-amber-100 dark:fill-amber-950/60" />}
          {[0, 1].map(value => <g key={value}><line x1={pointX(value)} y1="24" x2={pointX(value)} y2="296" stroke="currentColor" opacity=".2" /><line x1="24" y1={pointY(value)} x2="296" y2={pointY(value)} stroke="currentColor" opacity=".2" /></g>)}
          {boundary.length >= 2 && <line x1={pointX(boundary[0][0])} y1={pointY(boundary[0][1])} x2={pointX(boundary[1][0])} y2={pointY(boundary[1][1])} className="stroke-amber-700 dark:stroke-amber-400" strokeWidth="3" />}
          {BINARY_INPUTS.map((x, i) => <g key={i}>
            <circle cx={pointX(x[0])} cy={pointY(x[1])} r="13" className={targetFor(gate, x) ? 'fill-stone-900 dark:fill-stone-100' : 'fill-white dark:fill-stone-950'} stroke="currentColor" strokeWidth="2" />
            {predict(training.weights, x) !== targetFor(gate, x) && <circle cx={pointX(x[0])} cy={pointY(x[1])} r="19" fill="none" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" />}
            <text x={pointX(x[0])} y={pointY(x[1]) + 39} textAnchor="middle" fill="currentColor" fontSize="20">{`(${x[0]}, ${x[1]})`}</text>
          </g>)}
          <text x="285" y="316" fill="currentColor" fontSize="20">x₁</text><text x="2" y="30" fill="currentColor" fontSize="20">x₂</text>
        </svg>
        <figcaption className="mt-2 text-xs text-stone-600 dark:text-zinc-400"><p>Amber region → predicted 1 · Filled dot → target 1 · Rose ring → error</p><ArabicText className="text-xs text-stone-600 dark:text-zinc-400">المنطقة الكهرمانية: التوقع 1؛ النقطة المليانة: المطلوب 1؛ الحلقة الوردية: خطأ.</ArabicText></figcaption>
      </figure>
      <div className="min-w-0 space-y-4">
        <div data-testid="perceptron-status" aria-live="polite" className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <p className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">{mistakes} / {BINARY_INPUTS.length} errors · {training.steps} samples</p>
          <p className="mt-2 text-sm text-stone-700 dark:text-zinc-300">{observation[0]}</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">{observation[1]}</ArabicText>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-beige-300 dark:border-stone-800">
          <table className="w-full text-left text-sm text-stone-700 dark:text-zinc-300"><thead className="bg-[#FAF7F2] dark:bg-stone-950"><tr>{['Input', 'Target', 'Predicted'].map(text => <th key={text} className="p-3">{text}</th>)}</tr></thead><tbody>{BINARY_INPUTS.map((x, i) => <tr key={i} className="border-t border-beige-300 dark:border-stone-800"><td className="p-2"><button type="button" onClick={() => setSelected(i)} aria-pressed={selected === i} className={`${control} ${selected === i ? active : neutral}`}>{`${x[0]}, ${x[1]}`}</button></td><td className="p-3 font-mono">{targetFor(gate, x)}</td><td className={`p-3 font-mono ${predict(training.weights, x) === targetFor(gate, x) ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>{predict(training.weights, x)}</td></tr>)}</tbody></table>
        </div>
        <div className="space-y-2 rounded-2xl border border-beige-300 p-4 dark:border-stone-800">
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">Selected input · ({sample.join(', ')})</p>
          <p className="break-words font-mono text-sm text-stone-700 dark:text-zinc-300">z = {training.weights[0]} × {sample[0]} + {training.weights[1]} × {sample[1]} + ({training.weights[2]}) = {activation(training.weights, sample).toFixed(2)}</p>
          <p className="text-sm text-stone-600 dark:text-zinc-400">Prediction = 1 when z ≥ 0, otherwise 0.</p>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">التوقع 1 لما z تكون صفر أو أكتر، وغير كده 0.</ArabicText>
          {training.last && <p data-testid="perceptron-update" className="break-words text-sm text-stone-700 dark:text-zinc-300">Last sample ({BINARY_INPUTS[training.last.sample].join(', ')}): target {training.last.target} − prediction {training.last.predicted} = error {training.last.error}. New weights: [{training.weights.join(', ')}].</p>}
          {training.last && <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{`آخر عينة (${BINARY_INPUTS[training.last.sample].join(', ')}): المطلوب ${training.last.target} ناقص التوقع ${training.last.predicted} بيدي خطأ ${training.last.error}. الأوزان الجديدة: [${training.weights.join(', ')}].`}</ArabicText>}
        </div>
      </div>
    </div>
    <LectureSection anchorId={`${theoryId}-theory`} index={0} total={1} section={{ title: '1. Why One Boundary Has Limits', titleAr: '1. ليه حد فاصل واحد ليه حدود؟', content: 'A perceptron computes a weighted sum and applies a binary threshold. Its positive class is a half-plane in this two-input example.', contentAr: 'الـ Perceptron بيحسب مجموع موزون وبيطبّق عتبة بتطلع صفر أو واحد. التصنيف الموجب بيمثل نصف مستوى في مثال المدخلين ده.', bulletPoints: ['Update: w ← w + (target − prediction) × input; b ← b + (target − prediction). The learning rate is fixed at 1.', 'AND and OR: A straight boundary can separate their four binary examples.', 'XOR: The two positive corners and two negative corners share the same midpoint, so no linear threshold separates them.', 'Scope: The lecture introduces perceptrons and the XOR limitation in AI 1, pp. 6–9. These truth tables, training rule and plot are supplementary teaching examples. The display stops after 80 samples.'], bulletPointsAr: ['التحديث: زوّد الوزن بخطأ التوقع مضروب في المدخل، وزوّد الـ Bias بخطأ التوقع. معدل التعلّم ثابت عند 1.', 'AND وOR: حد مستقيم يقدر يفصل الأمثلة الثنائية الأربعة لكل واحدة.', 'XOR: الركنين الموجبين والركنين السالبين ليهم نفس نقطة المنتصف، فمفيش عتبة خطية تقدر تفصلهم.', 'النطاق: المحاضرة بتقدّم الـ Perceptrons وقيد XOR في AI 1، ص 6–9. جداول القيم وقاعدة التدريب والرسم أمثلة تعليمية إضافية. العرض بيقف بعد 80 عينة.'], keyRule: 'XOR failure is a limitation of one linear threshold neuron, not of all neural networks or all AI.', keyRuleAr: 'فشل XOR قيد في عصبون واحد بعتبة خطية، مش في كل الشبكات العصبية ولا كل الـ AI.' }} />
  </section>;
}

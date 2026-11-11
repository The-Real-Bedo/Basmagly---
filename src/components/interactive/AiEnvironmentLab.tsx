import { LabWorkbench, type WorkbenchNode } from './LabWorkbench';
import { useState } from 'react';
import { Clock3, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type Task = 'taxi' | 'chess' | 'image';
type Classification = {
  observability: string;
  agents: string;
  uncertainty: string;
  taskStructure: string;
  dynamics: string;
  stateSpace: string;
};

const PRESETS: Record<Task, { name: string; nameAr: string; classification: Classification }> = {
  taxi: {
    name: 'Taxi driving', nameAr: 'قيادة التاكسي',
    classification: { observability: 'Partially observable', agents: 'Multiagent', uncertainty: 'Stochastic', taskStructure: 'Sequential', dynamics: 'Dynamic', stateSpace: 'Continuous' },
  },
  chess: {
    name: 'Chess with a clock', nameAr: 'شطرنج بساعة',
    classification: { observability: 'Fully observable', agents: 'Multiagent', uncertainty: 'Deterministic', taskStructure: 'Sequential', dynamics: 'Semidynamic', stateSpace: 'Discrete' },
  },
  image: {
    name: 'Image analysis', nameAr: 'تحليل الصور',
    classification: { observability: 'Fully observable', agents: 'Single-agent', uncertainty: 'Deterministic', taskStructure: 'Episodic', dynamics: 'Semidynamic', stateSpace: 'Continuous' },
  },
};

const DIMENSIONS: { key: keyof Classification; label: string; labelAr: string; options: string[] }[] = [
  { key: 'observability', label: 'Observability', labelAr: 'قابلية الملاحظة', options: ['Fully observable', 'Partially observable'] },
  { key: 'agents', label: 'Agents', labelAr: 'عدد الوكلاء', options: ['Single-agent', 'Multiagent'] },
  { key: 'uncertainty', label: 'Outcomes', labelAr: 'نتائج الأفعال', options: ['Deterministic', 'Stochastic'] },
  { key: 'taskStructure', label: 'Task structure', labelAr: 'ترابط المهمة', options: ['Episodic', 'Sequential'] },
  { key: 'dynamics', label: 'Dynamics', labelAr: 'التغيّر مع الوقت', options: ['Static', 'Semidynamic', 'Dynamic'] },
  { key: 'stateSpace', label: 'State and actions', labelAr: 'الحالات والأفعال', options: ['Discrete', 'Continuous'] },
];

const CHESS = ['♜', '', '', '♚', '', '♟', '', '', '', '', '♙', '', '♖', '', '', '♔'];
const IMAGE_SAMPLES = [
  [0, 0, 1, 2, 0, 1, 3, 3, 1, 2, 3, 2, 0, 1, 2, 1],
  [0, 1, 2, 1, 1, 3, 3, 2, 2, 3, 3, 1, 1, 2, 1, 0],
];
const IMAGE_SHADE = [
  'bg-stone-100 dark:bg-stone-800',
  'bg-stone-300 dark:bg-stone-600',
  'bg-stone-500 dark:bg-stone-400',
  'bg-stone-700 dark:bg-stone-300',
];

export function AiEnvironmentLab() {
  const [task, setTask] = useState<Task>('taxi');
  const [classification, setClassification] = useState<Classification>(PRESETS.taxi.classification);
  const [view, setView] = useState<'world' | 'percept'>('percept');
  const [step, setStep] = useState(0);
  const [clockSeconds, setClockSeconds] = useState(600);
  const [imageSample, setImageSample] = useState(0);
  const isPartiallyObservable = classification.observability === 'Partially observable';
  const hiddenCells = new Set([3, 6, 10, 13]);
  const showOcclusion = view === 'percept' && isPartiallyObservable;

  const chooseTask = (nextTask: Task) => {
    setTask(nextTask);
    setClassification({ ...PRESETS[nextTask].classification });
    setView('percept');
    setStep(0);
    setClockSeconds(600);
    setImageSample(0);
  };

  const reset = () => chooseTask(task);
  const advance = () => {
    setStep((current) => current + 1);
    if (task === 'chess') setClockSeconds((current) => Math.max(0, current - 60));
    if (task === 'image') setImageSample((current) => (current + 1) % IMAGE_SAMPLES.length);
  };

  const sceneCaption = task === 'taxi'
    ? 'Scripted traffic moves between decisions; this is a sketch, not a driving prediction.'
    : task === 'chess'
      ? 'The board stays still while modeled thinking time falls: the semidynamic case.'
      : 'Each image is a separate episode; one sample does not change the next sample.';
  const sceneCaptionAr = task === 'taxi'
    ? 'حركة المرور التوضيحية بتتغير بين القرارات؛ ده رسم مبسّط مش توقّع للقيادة.'
    : task === 'chess'
      ? 'اللوحة ثابتة ووقت التفكير الممثّل بيقل: دي الحالة شبه الديناميكية.'
      : 'كل صورة حلقة مستقلة؛ العينة الواحدة ما بتغيّرش العينة اللي بعدها.';

  const renderCell = (index: number, label: string, className = '') => {
    const occluded = showOcclusion && hiddenCells.has(index);
    return (
      <div key={index} className={`flex aspect-square items-center justify-center rounded-md border border-beige-300 text-[13px] font-semibold text-stone-800 dark:border-stone-600 dark:text-stone-100 ${className} ${occluded ? 'bg-stone-300 text-stone-500 dark:bg-stone-700 dark:text-stone-400' : ''}`}>
        {occluded ? '?' : label}
      </div>
    );
  };

  const renderScene = () => {
    if (task === 'taxi') {
      const taxi = 12 + (step % 3);
      const otherCar = 5 + (step % 2);
      return (
        <div className="grid w-full max-w-[256px] grid-cols-4 gap-1" role="img" aria-label="Illustrative taxi scene with partial visibility">
          {Array.from({ length: 16 }, (_, index) => {
            const marker = index === taxi ? 'YOU' : index === otherCar ? 'CAR' : index === 2 ? 'PAX' : '';
            return renderCell(index, marker, marker ? 'bg-amber-100 dark:bg-amber-950/50' : 'bg-[#FAF7F2] dark:bg-stone-950');
          })}
        </div>
      );
    }
    if (task === 'chess') {
      return (
        <div className="grid w-full max-w-[256px] grid-cols-4 gap-1" role="img" aria-label="Illustrative unchanged chessboard">
          {CHESS.map((piece, index) => renderCell(index, piece, (Math.floor(index / 4) + index) % 2 === 0 ? 'bg-[#FAF7F2] dark:bg-stone-950' : 'bg-stone-200 dark:bg-stone-700'))}
        </div>
      );
    }
    return (
      <div className="grid w-full max-w-[256px] grid-cols-4 gap-1" role="img" aria-label={`Illustrative image sample ${imageSample + 1}`}>
        {IMAGE_SAMPLES[imageSample].map((shade, index) => renderCell(index, '', IMAGE_SHADE[shade]))}
      </div>
    );
  };

  const minutes = Math.floor(clockSeconds / 60).toString().padStart(2, '0');
  const seconds = (clockSeconds % 60).toString().padStart(2, '0');
  const advanceLabel = task === 'taxi' ? 'Advance one traffic step' : task === 'chess' ? 'Think one modeled minute' : 'Load next independent image';
  const advanceLabelAr = task === 'taxi' ? 'تقدّم خطوة مرور' : task === 'chess' ? 'فكّر دقيقة ممثّلة' : 'اعرض الصورة المستقلة التالية';

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Eye size={20} /></span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">AI Task Environment Explorer</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">استكشاف بيئة مهمة الوكيل</ArabicText>
          </div>
        </div>
        <button type="button" onClick={reset} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-beige-300 px-3 text-sm text-stone-700 hover:bg-[#FAF7F2] dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800" aria-label="Reset selected task">
          <RotateCcw size={16} /><span>Reset</span>
        </button>
      </header>

      <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="min-w-0 space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <div>
            <p className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-200">اختار مثالًا (Choose a task)</p>
            <div className="grid gap-2">
              {(Object.keys(PRESETS) as Task[]).map((preset) => (
                <button key={preset} type="button" onClick={() => chooseTask(preset)} aria-pressed={task === preset} className={`min-h-11 rounded-xl border px-3 py-2 text-left text-sm font-medium ${task === preset ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200'}`}>
                  {PRESETS[preset].name}<ArabicText className="text-[13px]">{PRESETS[preset].nameAr}</ArabicText>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-200">خصائص البيئة (Environment properties)</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {DIMENSIONS.map(({ key, label, labelAr, options }) => (
                <label key={key} className="min-w-0 text-[13px] text-stone-700 dark:text-stone-300">
                  <ArabicText className="mb-1 font-semibold">{`${labelAr} (${label})`}</ArabicText>
                  <select value={classification[key]} onChange={(event) => setClassification((current) => ({ ...current, [key]: event.target.value }))} className="min-h-10 w-full rounded-lg border border-beige-300 bg-white px-2 text-[13px] text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100">
                    {options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              ))}
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-stone-600 dark:text-zinc-400">Presets follow the lecture examples; changing a selector creates your own classification.</p>
          <ArabicText className="text-[13px] leading-relaxed text-stone-600 dark:text-zinc-400">الأمثلة متوافقة مع المحاضرة؛ تغيير أي اختيار بيكوّن تصنيفك الخاص.</ArabicText>
        </div>

        <div className="min-w-0 space-y-3">
          <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{PRESETS[task].name} · Step {step}</p>
                <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{PRESETS[task].nameAr} · الخطوة {step}</ArabicText>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setView('percept')} aria-pressed={view === 'percept'} className={`inline-flex min-h-10 items-center gap-1 rounded-lg border px-2 text-[13px] ${view === 'percept' ? 'border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200' : 'border-beige-300 text-stone-700 dark:border-stone-700 dark:text-stone-200'}`}><Eye size={15} /> إدراك الوكيل (Agent view)</button>
                <button type="button" onClick={() => setView('world')} aria-pressed={view === 'world'} className={`inline-flex min-h-10 items-center gap-1 rounded-lg border px-2 text-[13px] ${view === 'world' ? 'border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200' : 'border-beige-300 text-stone-700 dark:border-stone-700 dark:text-stone-200'}`}><EyeOff size={15} /> حالة العالم (World view)</button>
              </div>
            </div>
            <div className="flex min-h-[210px] flex-col items-center justify-center gap-3 rounded-xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <LabWorkbench title="Agent · visible environment" motionKey={task+'-'+step+'-'+view}
 nodes={Array.from({length:16},(_,index):WorkbenchNode=>{
 const hidden=showOcclusion&&hiddenCells.has(index);
 const marker=hidden?'':task==='taxi'?(index===12+step%3?'YOU':index===5+step%2?'CAR':index===2?'PAX':''):task==='chess'?CHESS[index]:'';
 const shade=hidden?0:task==='image'?IMAGE_SAMPLES[imageSample][index]:0;
 return {id:'cell-'+index,label:'Cell '+(index+1),sceneLabel:hidden?'?':marker||String(shade),showValue:false,kind:marker==='YOU'||marker==='CAR'?'car':'layer',size:marker==='YOU'||marker==='CAR'?undefined:[1.1,.15+(task==='image'?shade*.25:0),1.1],position:[(index%4-1.5)*1.35,0,(Math.floor(index/4)-1.5)*1.35],tone:hidden?'neutral':marker?'active':'neutral',value:hidden?'Unknown':marker||(task==='image'?'Intensity '+shade:'Empty cell'),decorative:!hidden&&!marker&&task!=='image',detail:hidden?'Outside the current percept: its state is unknown.':'Visible cell in the illustrative environment.',detailAr:hidden?'برّه الـ Percept الحالي: حالتها مجهولة.':'خلية ظاهرة في البيئة التوضيحية.'};
 })}>{renderScene()}</LabWorkbench>
              <p className="text-center text-[13px] text-stone-700 dark:text-stone-300" aria-live="polite">
                {showOcclusion ? 'Some state is hidden from this percept.' : 'The displayed state is fully visible in this view.'}
              </p>
              {task === 'chess' && <p className="inline-flex items-center gap-2 font-mono text-sm text-stone-800 dark:text-stone-100"><Clock3 size={16} /> {minutes}:{seconds}</p>}
              {task === 'image' && <p className="text-[13px] text-stone-600 dark:text-zinc-400">Sample {imageSample + 1} · illustrative pixels</p>}
            </div>
            <button type="button" onClick={advance} className="mt-3 min-h-11 w-full rounded-xl bg-stone-900 px-4 text-sm font-semibold text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white">
              {advanceLabel}<ArabicText className="text-[13px] text-stone-200 dark:text-stone-700">{advanceLabelAr}</ArabicText>
            </button>
            <p className="mt-3 text-[13px] leading-relaxed text-stone-600 dark:text-zinc-400">{sceneCaption}</p>
            <ArabicText className="text-[13px] leading-relaxed text-stone-600 dark:text-zinc-400">{sceneCaptionAr}</ArabicText>
          </div>

          <div className="rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">Current classification</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {DIMENSIONS.map(({ key }) => <span key={key} className="rounded-full border border-beige-300 bg-[#FAF7F2] px-2 py-1 text-[13px] text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200">{classification[key]}</span>)}
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-stone-600 dark:text-zinc-400">A semidynamic task can keep its visible state fixed while its performance measure changes during deliberation, as in chess with a clock. Taxonomy examples: AI lecture pp. 22–23.</p>
            <ArabicText className="mt-1 text-[13px] leading-relaxed text-stone-600 dark:text-zinc-400">المهمة شبه الديناميكية ممكن تفضل حالتها الظاهرة ثابتة بينما مقياس الأداء يتغيّر وقت التفكير، زي الشطرنج بساعة. أمثلة التصنيف: محاضرة الذكاء الاصطناعي، ص 22–23.</ArabicText>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-sky-50 p-3 text-[13px] leading-relaxed text-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
        Teaching sketches only: the taxi motion, chess clock, and pixel patterns are simplified illustrations, not full task models or performance predictions.
        <ArabicText className="mt-1 text-[13px] leading-relaxed text-sky-900 dark:text-sky-200">رسومات تعليمية مبسّطة فقط: حركة التاكسي والساعة ونمط البكسلات مش نماذج كاملة للمهمة ولا توقّعات للأداء.</ArabicText>
      </div>
    </section>
  );
}

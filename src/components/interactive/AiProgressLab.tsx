import { useId, useState } from 'react';
import {
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Database,
  History,
  Play,
  RotateCcw,
} from 'lucide-react';
import ArabicText from '../ArabicText';

type FuelKey = 'data' | 'algorithm' | 'compute';
type FuelValues = Record<FuelKey, number>;

const LEVEL_NAMES = ['Constrained', 'Limited', 'Developing', 'Ready', 'Strong'];

const FUEL_PILLARS: {
  key: FuelKey;
  title: string;
  titleAr: string;
  lectureCue: string;
  lectureCueAr: string;
  icon: typeof Database;
}[] = [
  {
    key: 'data',
    title: 'Data readiness · quality and coverage',
    titleAr: 'جاهزية البيانات · الجودة والتغطية',
    lectureCue: 'Lecture driver: data availability',
    lectureCueAr: 'ركن المحاضرة: توافر البيانات',
    icon: Database,
  },
  {
    key: 'algorithm',
    title: 'Algorithm suitability',
    titleAr: 'ملاءمة الخوارزمية',
    lectureCue: 'Lecture driver: software algorithms',
    lectureCueAr: 'ركن المحاضرة: خوارزميات البرمجيات',
    icon: Brain,
  },
  {
    key: 'compute',
    title: 'Computing resources',
    titleAr: 'موارد الحوسبة',
    lectureCue: 'Lecture driver: computing power',
    lectureCueAr: 'ركن المحاضرة: قوة الحوسبة',
    icon: Cpu,
  },
];

const PRESETS: { id: string; title: string; titleAr: string; values: FuelValues }[] = [
  {
    id: 'data-poor',
    title: 'Data-poor',
    titleAr: 'بيانات محدودة',
    values: { data: 1, algorithm: 4, compute: 5 },
  },
  {
    id: 'compute-limited',
    title: 'Compute-limited',
    titleAr: 'حوسبة محدودة',
    values: { data: 4, algorithm: 4, compute: 1 },
  },
  {
    id: 'algorithm-limited',
    title: 'Algorithm-limited',
    titleAr: 'خوارزمية غير ملائمة',
    values: { data: 4, algorithm: 1, compute: 4 },
  },
  {
    id: 'balanced',
    title: 'Balanced',
    titleAr: 'متوازن',
    values: { data: 4, algorithm: 4, compute: 4 },
  },
];

const PIPELINE_STEPS = [
  { title: 'Data', titleAr: 'البيانات' },
  { title: 'Algorithm', titleAr: 'الخوارزمية' },
  { title: 'Compute', titleAr: 'الحوسبة' },
  { title: 'Compare', titleAr: 'المقارنة' },
];

const BOTTLENECK_NOTES: Record<FuelKey, { en: string; ar: string }> = {
  data: {
    en: 'A large raw volume alone does not guarantee useful coverage or quality. More compute cannot supply missing or unsuitable data.',
    ar: 'كتر السجلات لوحده مش ضمان لتغطية مفيدة أو جودة مناسبة. الحوسبة الأقوى مش هتعوّض بيانات ناقصة أو مش ملائمة.',
  },
  algorithm: {
    en: 'More data and compute do not replace an algorithm that fits the task. The lecture names algorithm development as a separate driver.',
    ar: 'زيادة البيانات والحوسبة مش بديل عن خوارزمية مناسبة للمهمة. المحاضرة بتذكر تطور الخوارزميات كعامل مستقل.',
  },
  compute: {
    en: 'Useful data and a suitable algorithm still need enough computing resources for the intended work.',
    ar: 'البيانات المفيدة والخوارزمية المناسبة لسه محتاجين موارد حوسبة كفاية للشغل المطلوب.',
  },
};

function assessFuel(values: FuelValues) {
  const lowest = Math.min(values.data, values.algorithm, values.compute);
  const bottlenecks = FUEL_PILLARS.filter((pillar) => values[pillar.key] === lowest).map(
    (pillar) => pillar.key,
  );

  return { lowest, bottlenecks, balanced: lowest >= 4 };
}

function copyFuelValues(values: FuelValues): FuelValues {
  return { data: values.data, algorithm: values.algorithm, compute: values.compute };
}

export function AiFuelLab() {
  const id = useId();
  const [values, setValues] = useState<FuelValues>({ data: 4, algorithm: 4, compute: 4 });
  const [selectedPreset, setSelectedPreset] = useState<string | null>('balanced');
  const [completedSteps, setCompletedSteps] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof assessFuel> | null>(null);
  const [status, setStatus] = useState({
    en: 'Choose a preset or adjust the three pillars, then run or step through the check.',
    ar: 'اختار إعداد جاهز أو ظبّط الأركان التلاتة، وبعدها شغّل التقييم أو امشِ فيه خطوة خطوة.',
  });

  const clearResult = () => {
    setResult(null);
    setCompletedSteps(0);
    setStatus({
      en: 'Inputs changed. Run the check again to update the qualitative result.',
      ar: 'الإعدادات اتغيرت. شغّل التقييم تاني عشان تحدّث النتيجة النوعية.',
    });
  };

  const choosePreset = (preset: (typeof PRESETS)[number]) => {
    setValues(copyFuelValues(preset.values));
    setSelectedPreset(preset.id);
    setResult(null);
    setCompletedSteps(0);
    setStatus({
      en: `${preset.title} settings loaded. Run the check or step through the pipeline.`,
      ar: `إعداد ${preset.titleAr} اتحمّل. شغّل التقييم أو امشِ في خطواته.`,
    });
  };

  const runCheck = () => {
    setResult(assessFuel(values));
    setCompletedSteps(PIPELINE_STEPS.length);
    setStatus({
      en: 'Qualitative check complete. The result identifies a relative constraint, not model accuracy.',
      ar: 'التقييم النوعي خلص. النتيجة بتحدد نقطة ضعف نسبية، مش دقة نموذج.',
    });
  };

  const advancePipeline = () => {
    if (completedSteps === PIPELINE_STEPS.length) {
      setCompletedSteps(0);
      setResult(null);
      setStatus({
        en: 'Step sequence restarted. Advance to review each pillar.',
        ar: 'بدأنا تسلسل الخطوات من الأول. كمّل عشان تراجع كل ركن.',
      });
      return;
    }

    const nextStep = completedSteps + 1;
    setCompletedSteps(nextStep);
    if (nextStep === PIPELINE_STEPS.length) {
      setResult(assessFuel(values));
      setStatus({
        en: 'Step 4 of 4: compare the selected settings and inspect the lowest pillar.',
        ar: 'الخطوة 4 من 4: قارن الإعدادات وشوف أقل ركن في الاختيار ده.',
      });
      return;
    }

    setResult(null);
    const currentStep = PIPELINE_STEPS[nextStep - 1];
    setStatus({
      en: `Step ${nextStep} of 4: review the ${currentStep.title.toLowerCase()} setting.`,
      ar: `الخطوة ${nextStep} من 4: راجع إعداد ${currentStep.titleAr}.`,
    });
  };

  const reset = () => {
    setValues({ data: 4, algorithm: 4, compute: 4 });
    setSelectedPreset('balanced');
    setResult(null);
    setCompletedSteps(0);
    setStatus({ en: 'Balanced preset restored.', ar: 'رجعنا للإعداد المتوازن.' });
  };

  const assessment = result;

  return (
    <section
      data-testid="ai-fuel"
      className="rounded-3xl border border-beige-300 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6"
    >
      <header className="flex items-start gap-3 border-b border-beige-200 pb-4 dark:border-stone-800">
        <div className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <Database aria-hidden="true" className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">AI Fuel Lab</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
            جرّب إزاي البيانات والخوارزميات وقوة الحوسبة بيكملوا بعض.
          </ArabicText>
        </div>
      </header>

      <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-800/80 dark:bg-amber-950/20">
        <p className="text-sm font-semibold text-amber-950 dark:text-amber-200">
          The lecture names algorithms, data, and computing power as drivers of recent progress.
        </p>
        <ArabicText className="mt-1 text-sm text-amber-950 dark:text-amber-200">
          المحاضرة بتذكر الخوارزميات والبيانات وقوة الحوسبة كعوامل وراء التقدم الحديث.
        </ArabicText>
        <p className="mt-2 text-[13px] leading-5 text-stone-700 dark:text-zinc-300">
          The 1–5 controls are a classroom lens, not source measurements or predicted accuracy. Data quality and coverage help discuss usefulness; the slide names data availability and quantity.
        </p>
        <ArabicText className="mt-1 text-[13px] leading-5 text-stone-700 dark:text-zinc-300">
          مقياس 1–5 هنا وسيلة تعليمية، مش قياسات من المصدر ولا توقع للدقة. الجودة والتغطية بيساعدوا في مناقشة فائدة البيانات؛ والمحاضرة بتذكر توافر البيانات وكميتها.
        </ArabicText>
      </div>

      <figure className="mt-5 rounded-2xl border border-beige-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-stone-950 p-3 sm:p-5">
        <svg viewBox="0 0 600 210" className="w-full text-stone-600 dark:text-zinc-400" role="img" aria-label="Three adjustable resource towers feed an AI system; the lowest tower constrains this teaching model">
          <path d="M100 165 H500 M100 165 V182 H300 V165 M300 182 H500 V165" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          {FUEL_PILLARS.map((pillar, index) => {
            const x = 45 + index * 205;
            const level = values[pillar.key];
            const highlighted = completedSteps > index;
            return <g key={pillar.key}>
              <rect x={x} y="25" width="100" height="125" rx="12" fill="currentColor" opacity="0.07" />
              {[1, 2, 3, 4, 5].map(block => <rect key={block} x={x + 10} y={150 - block * 24} width="80" height="18" rx="5" fill={block <= level ? '#b45309' : 'currentColor'} opacity={block <= level ? (highlighted ? 0.95 : 0.55) : 0.08} className="transition-all duration-300" />)}
              <circle cx={x + 50} cy="165" r="5" fill={highlighted ? '#b45309' : 'currentColor'} className={highlighted ? 'motion-safe:animate-pulse' : ''} />
              <text x={x + 50} y="205" textAnchor="middle" fill="currentColor" fontSize="26">{pillar.key === 'data' ? 'Data' : pillar.key === 'algorithm' ? 'Algorithm' : 'Compute'}</text>
            </g>;
          })}
        </svg>
        <figcaption className="mt-2 text-[13px] text-stone-600 dark:text-zinc-400">Move a slider to reshape a pillar. Step through the flow to locate a relative constraint, not an accuracy score.</figcaption>
        <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400 mt-1">حرّك السلايدر عشان تغيّر شكل الركن. الخطوات بتوضح القيد النسبي، مش درجة دقة للنموذج.</ArabicText>
      </figure>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Choose a preset">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            aria-pressed={selectedPreset === preset.id}
            onClick={() => choosePreset(preset)}
            className={`rounded-full border px-3 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 ${
              selectedPreset === preset.id
                ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                : 'border-beige-300 bg-white text-stone-700 hover:bg-[#FAF7F2] dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800'
            }`}
          >
            <ArabicText as="span" className="text-inherit">{`${preset.titleAr} (${preset.title})`}</ArabicText>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3">
        {FUEL_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          const sliderId = `${id}-${pillar.key}`;
          return (
            <fieldset
              key={pillar.key}
              className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <label htmlFor={sliderId} className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
                    <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
                    <span>{pillar.title}</span>
                  </label>
                  <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">
                    {pillar.titleAr}
                  </ArabicText>
                </div>
                <span className="shrink-0 rounded-lg bg-white px-2 py-1 text-right text-[13px] font-semibold text-stone-700 dark:bg-stone-900 dark:text-zinc-300">
                  {LEVEL_NAMES[values[pillar.key] - 1]}
                  <span className="ml-1 font-mono text-[13px]">{values[pillar.key]}/5</span>
                </span>
              </div>
              <input
                id={sliderId}
                type="range"
                min={1}
                max={5}
                step={1}
                value={values[pillar.key]}
                aria-valuetext={LEVEL_NAMES[values[pillar.key] - 1]}
                onChange={(event) => {
                  setValues((previous) => ({ ...previous, [pillar.key]: Number(event.target.value) }));
                  setSelectedPreset(null);
                  clearResult();
                }}
                className="mt-4 h-2 w-full cursor-pointer accent-amber-600 dark:accent-amber-400"
              />
              <p className="mt-2 text-[13px] text-stone-500 dark:text-zinc-400">{pillar.lectureCue}</p>
              <ArabicText className="mt-1 text-[13px] text-stone-500 dark:text-zinc-400">
                {pillar.lectureCueAr}
              </ArabicText>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Qualitative pipeline</p>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">خطوات التقييم النوعي</ArabicText>
        </div>
        <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PIPELINE_STEPS.map((step, index) => {
            const isComplete = completedSteps > index;
            const isCurrent = completedSteps === index && completedSteps < PIPELINE_STEPS.length;
            return (
              <li
                key={step.title}
                className={`min-w-0 rounded-xl border p-3 ${
                  isComplete
                    ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
                    : isCurrent
                      ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30'
                      : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-900'
                }`}
              >
                <p className="flex items-center gap-2 text-[13px] font-semibold text-stone-800 dark:text-stone-200">
                  {isComplete ? <Check aria-hidden="true" className="h-4 w-4 text-emerald-700 dark:text-emerald-300" /> : null}
                  <span>{String(index + 1).padStart(2, '0')} · {step.title}</span>
                </p>
                <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">{step.titleAr}</ArabicText>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={runCheck}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white dark:focus-visible:ring-amber-400"
          >
            <Play aria-hidden="true" className="h-4 w-4" />
            <ArabicText as="span" className="text-inherit">شغّل التقييم (Run check)</ArabicText>
          </button>
          <button
            type="button"
            onClick={advancePipeline}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
            <ArabicText as="span" className="text-inherit">
              {completedSteps === PIPELINE_STEPS.length ? 'ابدأ الخطوات من جديد (Restart steps)' : 'خطوة واحدة (Step once)'}
            </ArabicText>
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            <ArabicText as="span" className="text-inherit">إعادة الضبط (Reset)</ArabicText>
          </button>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`mt-4 rounded-2xl border p-4 ${
          assessment?.balanced
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
            : assessment
              ? 'border-amber-200 bg-amber-50/70 dark:border-amber-800 dark:bg-amber-950/20'
              : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-900'
        }`}
      >
        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{status.en}</p>
        <ArabicText className="mt-1 text-sm text-stone-700 dark:text-zinc-300">{status.ar}</ArabicText>
        {assessment ? (
          <div className="mt-3 space-y-3">
            {assessment.balanced ? (
              <div>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  No low pillar stands out in this selected setup.
                </p>
                <ArabicText className="mt-1 text-sm text-emerald-900 dark:text-emerald-200">
                  مفيش ركن منخفض بشكل واضح في الإعداد المختار.
                </ArabicText>
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold text-amber-950 dark:text-amber-200">
                  Relative bottleneck to inspect: {assessment.bottlenecks
                    .map((key) => FUEL_PILLARS.find((pillar) => pillar.key === key)?.title.split(' · ')[0])
                    .join(' and ')}.
                </p>
                <ArabicText className="mt-1 text-sm text-amber-950 dark:text-amber-200">
                  دي أقل نقطة في الاختيار ده؛ ولو أكتر من ركن متساوي، كلهم ظاهرين كنقاط محتاجة مراجعة.
                </ArabicText>
                {assessment.bottlenecks.map((key) => (
                  <div key={key} className="border-t border-amber-200/80 pt-3 dark:border-amber-800/80">
                    <p className="text-[13px] leading-5 text-stone-800 dark:text-stone-200">{BOTTLENECK_NOTES[key].en}</p>
                    <ArabicText className="mt-1 text-[13px] leading-5 text-stone-800 dark:text-stone-200">
                      {BOTTLENECK_NOTES[key].ar}
                    </ArabicText>
                  </div>
                ))}
              </>
            )}
            <p className="border-t border-beige-300 pt-3 text-[13px] leading-5 text-stone-600 dark:border-stone-700 dark:text-zinc-400">
              This simple comparison is not a real performance, accuracy, or training-cost estimate.
            </p>
            <ArabicText className="text-[13px] leading-5 text-stone-600 dark:text-zinc-400">
              المقارنة المبسطة دي مش تقدير حقيقي للأداء أو الدقة أو تكلفة التدريب.
            </ArabicText>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-[13px] text-stone-500 dark:text-zinc-400">
        Source cue: AI-1 review, recent-progress drivers (PDF p. 9).
      </p>
      <ArabicText className="mt-1 text-[13px] text-stone-500 dark:text-zinc-400">
        مرجع المحاضرة: مراجعة AI-1، عوامل التقدم الحديث (صفحة 9 من الـ PDF).
      </ArabicText>
    </section>
  );
}

type HistoryEvent = {
  date: string;
  title: string;
  titleAr: string;
  summary: string;
  summaryAr: string;
  capability: string;
  capabilityAr: string;
  context: string;
  contextAr: string;
  constraint: string;
  constraintAr: string;
};

const HISTORY_EVENTS: HistoryEvent[] = [
  {
    date: '1943',
    title: 'McCulloch & Pitts model',
    titleAr: 'نموذج ماكولوتش وبيتس',
    summary: 'The lecture lists a neural, Boolean-circuit model among the early meetings of neural and computer science.',
    summaryAr: 'المحاضرة بتذكر نموذجًا عصبيًا بدائرة منطقية ضمن بدايات تقاطع علوم الأعصاب والحاسوب.',
    capability: 'A mathematical model connected neurons with Boolean circuits.',
    capabilityAr: 'نموذج رياضي ربط الخلايا العصبية بالدوائر المنطقية.',
    context: 'The slide groups this with early neural and computer science; it gives no computing-capacity figures.',
    contextAr: 'الشريحة بتحطه ضمن بدايات علوم الأعصاب والحاسوب، من غير أرقام عن قدرة الحوسبة.',
    constraint: 'It is an early model in the story, not a claim that modern AI already existed.',
    constraintAr: 'ده نموذج مبكر في الحكاية، مش معناه إن الذكاء الاصطناعي الحديث كان موجود وقتها.',
  },
  {
    date: '1950',
    title: "Turing's question about machine intelligence",
    titleAr: 'سؤال تورينج عن ذكاء الآلة',
    summary: "Alan Turing's 1950 paper, “Computing Machinery and Intelligence,” is a listed milestone.",
    summaryAr: 'ورقة آلان تورينج سنة 1950 بعنوان «Computing Machinery and Intelligence» من محطات الخط الزمني.',
    capability: 'The lecture connects this paper with the Turing Test and judging written conversation.',
    capabilityAr: 'المحاضرة بتربط الورقة باختبار تورينج وتقييم المحادثة المكتوبة.',
    context: 'This is a conceptual milestone; the source gives no machine or compute budget for it.',
    contextAr: 'دي محطة فكرية؛ المصدر مش بيذكر مواصفات آلة أو ميزانية حوسبة مرتبطة بيها.',
    constraint: 'The test asks whether a judge can tell the replies apart; it is not a universal definition of intelligence.',
    constraintAr: 'الاختبار بيسأل إذا كان المحكّم يقدر يفرّق بين الردود؛ مش تعريف شامل لكل الذكاء.',
  },
  {
    date: '1950s',
    title: 'Early logic-driven programs',
    titleAr: 'برامج منطقية مبكرة',
    summary: "The lecture names Newell & Simon's Logic Theorist among early AI programs.",
    summaryAr: 'المحاضرة بتذكر Logic Theorist بتاع نيويل وسايمون ضمن برامج الذكاء الاصطناعي المبكرة.',
    capability: 'Programs began tackling formal tasks, including theorem proving and checkers.',
    capabilityAr: 'البرامج بدأت تتعامل مع مهام رسمية، منها إثبات النظريات ولعبة الداما.',
    context: 'The source places these examples in a logic-driven period and gives no resource figures.',
    contextAr: 'المصدر بيحط الأمثلة دي في فترة معتمدة على المنطق، من غير أرقام للموارد.',
    constraint: 'Success on a defined formal task does not by itself show broad, human-like understanding.',
    constraintAr: 'النجاح في مهمة رسمية محددة لوحده مش دليل على فهم واسع شبه الإنسان.',
  },
  {
    date: '1956',
    title: 'Dartmouth meeting',
    titleAr: 'اجتماع دارتموث',
    summary: 'The lecture says the Dartmouth meeting adopted “Artificial Intelligence” as the field name.',
    summaryAr: 'المحاضرة بتقول إن اجتماع دارتموث اعتمد اسم «Artificial Intelligence» للمجال.',
    capability: 'Researchers from several fields gathered to explore “thinking machines.”',
    capabilityAr: 'باحثون من مجالات مختلفة اتجمعوا لاستكشاف فكرة «الآلات المفكرة».',
    context: 'The milestone is a meeting and research agenda; the source gives no compute measurements.',
    contextAr: 'دي محطة اجتماع وأجندة بحثية؛ المصدر مش بيذكر قياسات للحوسبة.',
    constraint: 'Naming the field set a direction for research; it did not mean the goals were already solved.',
    constraintAr: 'تسمية المجال رسمت اتجاهًا للبحث، لكنها مش معناها إن الأهداف اتحققت وقتها.',
  },
  {
    date: '1969–79',
    title: 'Knowledge-based systems develop',
    titleAr: 'بدايات الأنظمة المعتمدة على المعرفة',
    summary: 'The timeline marks early development of knowledge-based systems in this period.',
    summaryAr: 'الخط الزمني بيحدد بدايات تطوير الأنظمة المعتمدة على المعرفة في الفترة دي.',
    capability: 'The approach emphasized representing knowledge for a system to use.',
    capabilityAr: 'النهج ركّز على تمثيل المعرفة عشان النظام يستخدمها.',
    context: 'The lecture shifts from its earlier logic-driven period to knowledge-based approaches; it gives no resource totals.',
    contextAr: 'المحاضرة بتنقل التركيز من فترة المنطق السابقة لأساليب معتمدة على المعرفة، من غير إجمالي للموارد.',
    constraint: 'This is a change in approach, not evidence that one method removed every limitation.',
    constraintAr: 'ده تغيير في النهج، مش دليل إن طريقة واحدة شالت كل القيود.',
  },
  {
    date: '1980–88',
    title: 'Expert-systems boom',
    titleAr: 'ازدهار الأنظمة الخبيرة',
    summary: 'The lecture says the expert-systems industry boomed and also lists backpropagation.',
    summaryAr: 'المحاضرة بتقول إن صناعة الأنظمة الخبيرة ازدهرت، وبتذكر كمان الانتشار العكسي.',
    capability: 'Expert systems became a prominent industry; backpropagation appears in the same period.',
    capabilityAr: 'الأنظمة الخبيرة بقت صناعة بارزة، والانتشار العكسي مذكور في نفس الفترة.',
    context: 'The source describes an industry boom but supplies no funding curve or compute measurements.',
    contextAr: 'المصدر بيوصف ازدهارًا صناعيًا، لكنه مش بيقدم منحنى تمويل أو قياسات حوسبة.',
    constraint: 'The next listed interval is a bust, so the boom should not be read as permanent success.',
    constraintAr: 'الفترة اللي بعدها موصوفة كتراجع، فمينفعش نفهم الازدهار كأنه نجاح دائم.',
  },
  {
    date: '1988–93',
    title: 'Expert-systems bust · AI winter',
    titleAr: 'تراجع الأنظمة الخبيرة · شتاء الذكاء الاصطناعي',
    summary: 'The lecture labels the expert-systems industry bust “AI Winter.”',
    summaryAr: 'المحاضرة بتسمي تراجع صناعة الأنظمة الخبيرة «شتاء الذكاء الاصطناعي».',
    capability: 'This is a change in the field’s trajectory, not a new system capability.',
    capabilityAr: 'دي محطة بتوضح تغيير مسار المجال، مش قدرة جديدة لنظام.',
    context: 'The source names the downturn but does not attribute it to one cause or give precise funding data.',
    contextAr: 'المصدر بيذكر التراجع، لكنه مش بيرجعه لسبب واحد ولا بيقدم بيانات تمويل دقيقة.',
    constraint: 'Expectations and industry momentum can change; the slide does not offer a single-cause explanation.',
    constraintAr: 'التوقعات وزخم الصناعة ممكن يتغيروا؛ والشريحة مش بتقدم تفسيرًا بسبب واحد.',
  },
  {
    date: '1997',
    title: 'Deep Blue defeats Kasparov',
    titleAr: 'ديب بلو يهزم كاسباروف',
    summary: 'IBM’s Deep Blue defeats chess champion Garry Kasparov in the lecture timeline.',
    summaryAr: 'ديب بلو من IBM هزم بطل الشطرنج جاري كاسباروف حسب الخط الزمني للمحاضرة.',
    capability: 'The milestone is a high-profile result in chess.',
    capabilityAr: 'المحطة دي نتيجة بارزة في لعبة الشطرنج.',
    context: 'The source identifies the system and match, but gives no compute specifications here.',
    contextAr: 'المصدر بيحدد النظام والمباراة، لكنه مش بيذكر مواصفات الحوسبة هنا.',
    constraint: 'A win in a bounded game is a milestone, not a claim of general human-level intelligence.',
    constraintAr: 'الفوز في لعبة محددة محطة مهمة، مش ادعاء بذكاء عام بمستوى الإنسان.',
  },
  {
    date: '2012',
    title: 'AlexNet and deep learning',
    titleAr: 'أليكس نت والتعلم العميق',
    summary: 'AlexNet wins the ImageNet competition; the lecture places it in the Big Data, GPUs, and deep-learning era.',
    summaryAr: 'أليكس نت فاز بمسابقة ImageNet؛ والمحاضرة بتحطه في عصر البيانات الضخمة ووحدات GPU والتعلم العميق.',
    capability: 'The slide records a concrete image-recognition competition result.',
    capabilityAr: 'الشريحة بتسجل نتيجة واضحة في مسابقة للتعرّف على الصور.',
    context: 'The broader period is labeled 2010–17 and links Big Data, GPUs, and deep learning; no per-event totals are given.',
    contextAr: 'الفترة الأوسع متسجلة من 2010 لـ2017 وبتربط البيانات الضخمة وGPU والتعلم العميق، من غير أرقام لكل حدث.',
    constraint: 'A result on ImageNet is a task milestone, not proof of general intelligence.',
    constraintAr: 'النجاح في ImageNet محطة لمهمة محددة، مش إثبات لذكاء عام.',
  },
  {
    date: '2017',
    title: 'Transformers and scaling up',
    titleAr: 'المحوّلات والتوسع',
    summary: 'The lecture lists Transformers in 2017 and describes the period as scaling up toward large language models.',
    summaryAr: 'المحاضرة بتذكر المحوّلات سنة 2017 وبتوصف الفترة بالتوسع ناحية نماذج اللغة الكبيرة.',
    capability: 'The Transformer architecture becomes a named milestone on the timeline.',
    capabilityAr: 'معمارية Transformer بقت محطة واضحة في الخط الزمني.',
    context: 'The source discusses scaling, but does not give per-model compute or funding figures here.',
    contextAr: 'المصدر بيتكلم عن التوسع، لكنه مش بيذكر أرقام حوسبة أو تمويل لكل نموذج هنا.',
    constraint: 'An architecture milestone is not a guarantee that every later task will work well.',
    constraintAr: 'محطة المعمارية مش ضمان إن كل مهمة لاحقة هتنجح.',
  },
  {
    date: '2022',
    title: 'ChatGPT release',
    titleAr: 'إطلاق ChatGPT',
    summary: 'OpenAI releases ChatGPT in November 2022; the lecture links the period with mass adoption.',
    summaryAr: 'OpenAI أطلقت ChatGPT في نوفمبر 2022؛ والمحاضرة بتربط الفترة بانتشار واسع.',
    capability: 'A conversational AI service becomes widely accessible to the public.',
    capabilityAr: 'خدمة ذكاء اصطناعي للمحادثة بقت متاحة على نطاق واسع للجمهور.',
    context: 'The lecture explains recent progress through algorithms, data, and computing power, not a single release-specific resource figure.',
    contextAr: 'المحاضرة بتفسر التقدم الحديث بالخوارزميات والبيانات وقوة الحوسبة، مش برقم موارد خاص بالإطلاق ده.',
    constraint: 'Mass adoption describes reach and use; it does not by itself prove universal intelligence.',
    constraintAr: 'الانتشار الواسع بيوصف الوصول والاستخدام، لكنه لوحده مش إثبات لذكاء شامل.',
  },
];

function normalizeDate(value: string) {
  return value.trim().replace(/[–—]/g, '-').replace(/\s+/g, '').toLowerCase();
}

export function AiHistoryLab() {
  const id = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDates, setShowDates] = useState(true);
  const [guess, setGuess] = useState('');
  const [guessFeedback, setGuessFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const event = HISTORY_EVENTS[selectedIndex];

  const selectEvent = (index: number) => {
    setSelectedIndex(index);
    setGuess('');
    setGuessFeedback(null);
  };

  const toggleDates = () => {
    setShowDates((current) => !current);
    setGuess('');
    setGuessFeedback(null);
  };

  const checkGuess = () => {
    setGuessFeedback(normalizeDate(guess) === normalizeDate(event.date) ? 'correct' : 'incorrect');
  };

  return (
    <section
      data-testid="ai-history"
      className="rounded-3xl border border-beige-300 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6"
    >
      <header className="flex items-start gap-3 border-b border-beige-200 pb-4 dark:border-stone-800">
        <div className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <History aria-hidden="true" className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">AI History Lab</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
            اختار محطة وشوف إيه اللي اتغير وإيه اللي فضل مقيّد التقدم.
          </ArabicText>
        </div>
      </header>

      <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-800/80 dark:bg-amber-950/20">
        <p className="text-sm text-stone-800 dark:text-stone-200">
          Explore source-listed milestones. The timeline keeps the lecture’s years and ranges; it does not guess dates for events the source leaves broad.
        </p>
        <ArabicText className="mt-1 text-sm text-stone-800 dark:text-stone-200">
          استكشف المحطات اللي في المصدر. الخط الزمني محافظ على السنين والفترات زي ما المحاضرة كاتباها، ومش بيخمن تواريخ دقيقة للأحداث العامة.
        </ArabicText>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Select a milestone</p>
        <button
          type="button"
          onClick={toggleDates}
          aria-pressed={!showDates}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 bg-white px-3 py-2 text-[13px] font-semibold text-stone-700 transition-colors hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400"
        >
          <ArabicText as="span" className="text-inherit">
            {showDates ? 'اخفي التواريخ وخمّن (Hide dates & guess)' : 'أظهر التواريخ (Reveal dates)'}
          </ArabicText>
        </button>
      </div>

      <nav
        aria-label="AI history timeline"
        className="mt-3 flex gap-2 overflow-x-auto pb-2"
      >
        {HISTORY_EVENTS.map((item, index) => {
          const selected = index === selectedIndex;
          return (
            <button
              key={`${item.date}-${item.title}`}
              type="button"
              aria-current={selected ? 'step' : undefined}
              aria-label={`Milestone ${index + 1}: ${item.title}`}
              onClick={() => selectEvent(index)}
              className={`min-w-[8.5rem] max-w-[9.5rem] shrink-0 rounded-2xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 ${
                selected
                  ? 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30'
                  : 'border-beige-300 bg-white hover:bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800'
              }`}
            >
              <span className="block text-[13px] font-mono font-semibold text-amber-800 dark:text-amber-300">
                {showDates ? item.date : `#${String(index + 1).padStart(2, '0')}`}
              </span>
              <span className="mt-1 block text-[13px] font-semibold leading-5 text-stone-900 dark:text-stone-100">
                {item.title}
              </span>
              <ArabicText className="mt-1 text-[13px] leading-5 text-stone-600 dark:text-zinc-400">
                {item.titleAr}
              </ArabicText>
            </button>
          );
        })}
      </nav>

      <div className="mt-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
              {showDates ? event.date : `Milestone ${String(selectedIndex + 1).padStart(2, '0')}`}
            </p>
            <h4 className="mt-1 text-lg font-bold text-stone-900 dark:text-stone-100">{event.title}</h4>
            <ArabicText as="h4" className="mt-1 text-base font-semibold text-stone-700 dark:text-zinc-300">
              {event.titleAr}
            </ArabicText>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Previous milestone"
              disabled={selectedIndex === 0}
              onClick={() => selectEvent(selectedIndex - 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-beige-300 bg-white text-stone-700 transition-colors hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next milestone"
              disabled={selectedIndex === HISTORY_EVENTS.length - 1}
              onClick={() => selectEvent(selectedIndex + 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-beige-300 bg-white text-stone-700 transition-colors hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {!showDates ? (
          <div className="mt-4 rounded-xl border border-beige-300 bg-white p-3 dark:border-stone-800 dark:bg-stone-900">
            <label htmlFor={`${id}-date-guess`} className="block text-sm font-semibold text-stone-800 dark:text-stone-200">
              Guess the year or range
            </label>
            <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">
              خمن السنة أو الفترة المكتوبة في المحاضرة.
            </ArabicText>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                id={`${id}-date-guess`}
                type="text"
                dir="auto"
                value={guess}
                onChange={(event) => {
                  setGuess(event.target.value);
                  setGuessFeedback(null);
                }}
                placeholder="e.g. 1956 or 1988–93"
                className="min-h-11 min-w-0 flex-1 rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-zinc-500 dark:focus-visible:ring-amber-400"
              />
              <button
                type="button"
                disabled={!guess.trim()}
                onClick={checkGuess}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white dark:focus-visible:ring-amber-400"
              >
                <Check aria-hidden="true" className="h-4 w-4" />
                <ArabicText as="span" className="text-inherit">راجع التخمين (Check)</ArabicText>
              </button>
            </div>
            {guessFeedback ? (
              <div
                aria-live="polite"
                className={`mt-3 rounded-xl border p-3 ${
                  guessFeedback === 'correct'
                    ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
                    : 'border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30'
                }`}
              >
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {guessFeedback === 'correct' ? 'Correct — that matches the lecture label.' : 'Not quite — try another year or range.'}
                </p>
                <ArabicText className="mt-1 text-sm text-stone-700 dark:text-zinc-300">
                  {guessFeedback === 'correct' ? 'صح — ده مطابق للتاريخ المكتوب في المحاضرة.' : 'مش بالظبط — جرّب سنة أو فترة تانية.'}
                </ArabicText>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-4">
          <p className="text-sm text-stone-800 dark:text-stone-200">{event.summary}</p>
          <ArabicText className="mt-1 text-sm text-stone-800 dark:text-stone-200">{event.summaryAr}</ArabicText>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">What changed around this milestone?</h4>
          <ArabicText className="text-[13px] font-semibold text-stone-600 dark:text-zinc-400">إيه اللي اتغير حوالين المحطة دي؟</ArabicText>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            { label: 'Capability', labelAr: 'القدرة', text: event.capability, textAr: event.capabilityAr },
            { label: 'Resources / context', labelAr: 'الموارد والسياق', text: event.context, textAr: event.contextAr },
            { label: 'Expectation / constraint', labelAr: 'التوقع أو القيد', text: event.constraint, textAr: event.constraintAr },
          ].map((item) => (
            <article
              key={item.label}
              className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950"
            >
              <p className="text-[13px] font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">{item.label}</p>
              <ArabicText className="mt-1 text-[13px] font-semibold text-amber-900 dark:text-amber-200">
                {item.labelAr}
              </ArabicText>
              <p className="mt-3 text-[13px] leading-5 text-stone-800 dark:text-stone-200">{item.text}</p>
              <ArabicText className="mt-2 text-[13px] leading-5 text-stone-800 dark:text-stone-200">{item.textAr}</ArabicText>
            </article>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[13px] text-stone-500 dark:text-zinc-400">
        Source cue: AI-1 review, history timeline (PDF p. 8) and recent-progress drivers (PDF p. 9).
      </p>
      <ArabicText className="mt-1 text-[13px] text-stone-500 dark:text-zinc-400">
        مرجع المحاضرة: مراجعة AI-1، الخط الزمني (صفحة 8) وعوامل التقدم الحديث (صفحة 9 من الـ PDF).
      </ArabicText>
      <p className="sr-only" role="status" aria-live="polite">
        Selected milestone {selectedIndex + 1} of {HISTORY_EVENTS.length}: {showDates ? event.date : event.title}.
      </p>
    </section>
  );
}

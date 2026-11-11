import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';
import { useState } from 'react';
import { Activity, ArrowRight, BrainCircuit, Eye, RotateCcw, Target, Wind, Zap } from 'lucide-react';
import ArabicText from '../ArabicText';

type ScenarioId = 'vacuum' | 'taxi' | 'spam';

type Scenario = {
  label: string;
  labelAr: string;
  peas: { performance: string; environment: string; actuators: string; sensors: string };
  loop: [string, string, string, string, string];
};

const scenarios: Record<ScenarioId, Scenario> = {
  vacuum: {
    label: 'Vacuum cleaner',
    labelAr: 'مكنسة ذكية',
    peas: {
      performance: 'Clean rooms; avoid unnecessary actions.',
      environment: 'Two rooms, A and B, with changing dirt.',
      actuators: 'Suck, move left, move right.',
      sensors: 'Current location and dirt sensor.',
    },
    loop: [
      'Room A is dirty; the agent is at A.',
      'Read location and dirt; retain no previous percept.',
      'IF current room is dirty THEN suck.',
      'Suck in room A.',
      'Room A becomes clean; sense again.',
    ],
  },
  taxi: {
    label: 'Autonomous taxi',
    labelAr: 'تاكسي ذاتي القيادة',
    peas: {
      performance: 'Safe, timely, comfortable journeys.',
      environment: 'Roads, traffic, passengers, and weather.',
      actuators: 'Steer, accelerate, brake, and signal.',
      sensors: 'Cameras, GPS, speed and engine sensors.',
    },
    loop: [
      'A camera detects a stopped car ahead.',
      'Estimate lane position and nearby traffic.',
      'Goal: avoid collision and remain on route.',
      'Brake and prepare a safe route adjustment.',
      'Traffic changes; take a new percept.',
    ],
  },
  spam: {
    label: 'Email spam filter',
    labelAr: 'مرشّح رسائل مزعجة',
    peas: {
      performance: 'Catch spam while limiting false positives.',
      environment: 'Incoming messages and the mailbox.',
      actuators: 'Label, move, or leave a message.',
      sensors: 'Sender, content, and message metadata.',
    },
    loop: [
      'A new message and its metadata arrive.',
      'Compare sender and content with the model.',
      'Goal: reduce spam without hiding wanted mail.',
      'Label the message or move it to Spam.',
      'Use later feedback to improve classification.',
    ],
  },
};

const stages = [
  { title: 'Perceive', titleAr: 'إدراك', icon: Eye, hint: 'Sensors provide a percept.' },
  { title: 'Update model', titleAr: 'تحديث النموذج', icon: BrainCircuit, hint: 'Update internal state when the task requires it.' },
  { title: 'Choose', titleAr: 'اختيار', icon: Target, hint: 'Rules or goals guide the decision.' },
  { title: 'Act', titleAr: 'تنفيذ الفعل', icon: Zap, hint: 'Actuators affect the environment.' },
  { title: 'Feedback', titleAr: 'استجابة البيئة', icon: Activity, hint: 'The changed world creates new percepts.' },
];

const peasLabels = [
  { key: 'performance', en: 'Performance', ar: 'الأداء' },
  { key: 'environment', en: 'Environment', ar: 'البيئة' },
  { key: 'actuators', en: 'Actuators', ar: 'المشغّلات' },
  { key: 'sensors', en: 'Sensors', ar: 'المستشعرات' },
] as const;

export function AgentArchitectureLab() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('vacuum');
  const [stageIndex, setStageIndex] = useState(0);
  const [cycle, setCycle] = useState(1);
  const scenario = scenarios[scenarioId];

  const reset = () => {
    setStageIndex(0);
    setCycle(1);
  };

  const advance = () => {
    if (stageIndex === stages.length - 1) {
      setStageIndex(0);
      setCycle((value) => value + 1);
      return;
    }
    setStageIndex((value) => value + 1);
  };

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><BrainCircuit size={21} aria-hidden="true" /></span>
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Agent Architecture Loop</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">دورة عمل الـ Agent من الإدراك لحد الفعل</ArabicText>
        </div>
      </header>

      <div className="mb-5 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100">Choose a task environment</h4>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">اختار بيئة المهمة اللي هنجربها</ArabicText>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Task environment">
            {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={scenarioId === id}
                onClick={() => { setScenarioId(id); reset(); }}
                className={`rounded-full border px-3 py-2 text-sm transition-colors ${scenarioId === id ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800'}`}
              >
                {scenarios[id].label}<ArabicText as="span" className={`mt-0.5 block text-xs font-normal ${scenarioId === id ? 'text-stone-200 dark:text-stone-600' : 'text-stone-600 dark:text-zinc-400'}`}>{scenarios[id].labelAr}</ArabicText>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div aria-live="polite">
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">Cycle {cycle} · Step {stageIndex + 1} of {stages.length}</p>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">الدورة {cycle} · الخطوة {stageIndex + 1} من {stages.length}</ArabicText>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-3 text-sm font-medium text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800">
            <RotateCcw size={16} aria-hidden="true" /> Reset <span className="font-arabic">إعادة</span>
          </button>
          <button type="button" onClick={advance} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-semibold text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white">
            {stageIndex === stages.length - 1 ? 'Next cycle' : 'Next step'} <span className="font-arabic">{stageIndex === stages.length - 1 ? 'الدورة التالية' : 'الخطوة التالية'}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <LabWorkbench title="Agent · perception and action" motionKey={cycle+'-'+stageIndex}
 nodes={stages.map<WorkbenchNode>((stage,index)=>({id:String(index),label:stage.title,sceneLabel:String(index+1),showValue:false,kind: ['sensor','server','chip','robot','computer'][index] as WorkbenchNode['kind'],position:[Math.cos(index*Math.PI*2/5)*2.8,0,Math.sin(index*Math.PI*2/5)*2.8],tone:stageIndex===index?'active':'neutral',value:scenario.loop[index],detail:stage.title,detailAr:stage.titleAr}))}
 links={stages.map<WorkbenchLink>((_,index)=>({id:String(index),from:String((index+4)%5),to:String(index),tone:stageIndex===index?'active':'neutral',moving:stageIndex===index}))}>
<div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Agent perception and action loop">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const active = stageIndex === index;
          return (
            <div key={stage.title} className={`relative rounded-2xl border p-3 transition-all duration-300 motion-reduce:transition-none ${active ? 'border-amber-400 bg-amber-50/70 shadow-sm dark:border-amber-700 dark:bg-amber-950/30' : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-900'}`}>
              <div className="mb-2 flex items-center gap-2">
                <span className={`rounded-lg p-2 ${active ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300' : 'bg-[#FAF7F2] text-stone-700 dark:bg-stone-950 dark:text-zinc-300'}`}>
                  <Icon size={17} aria-hidden="true" className={active ? 'motion-safe:animate-pulse' : ''} />
                </span>
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">{stage.title}</span>
              </div>
              <ArabicText className="mb-2 text-sm font-semibold text-stone-700 dark:text-zinc-300">{stage.titleAr}</ArabicText>
              <p className="text-sm text-stone-600 dark:text-zinc-400">{stage.hint}</p>
              <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">
                {[
                  'الـ Sensors بتوفّر إدراك.',
                  'حدّث الحالة الداخلية لو المهمة محتاجة.',
                  'القواعد أو الأهداف بتوجّه القرار.',
                  'الـ Actuators بتأثر في البيئة.',
                  'تغيّر العالم بيولّد إدراكات جديدة.',
                ][index]}
              </ArabicText>
            </div>
          );
        })}
      </div>
</LabWorkbench>

      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 dark:border-sky-900 dark:bg-sky-950/30">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-300">Current percept · {scenario.label}</p>
          <p className="mt-2 text-base font-semibold text-stone-900 dark:text-stone-100">{scenario.loop[0]}</p>
          <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">
            {scenarioId === 'vacuum' ? 'الغرفة A متّسخة والـ Agent موجود فيها.' : scenarioId === 'taxi' ? 'الكاميرا رصدت عربية متوقفة قدام التاكسي.' : 'وصلت رسالة جديدة ومعاها بياناتها.'}
          </ArabicText>
        </div>
        <div className="hidden items-center text-stone-400 dark:text-zinc-500 lg:flex" aria-hidden="true"><ArrowRight size={24} /></div>
        <div aria-live="polite" className={`rounded-2xl border p-4 transition-colors duration-300 motion-reduce:transition-none ${stageIndex === 3 ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30' : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950'}`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-600 dark:text-zinc-400">{stages[stageIndex].title} · {scenario.label}</p>
          <p className="mt-2 text-base font-semibold text-stone-900 dark:text-stone-100">{scenario.loop[stageIndex]}</p>
          <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">
            {scenarioId === 'vacuum'
              ? ['المكنسة بتشوف إن الغرفة A متّسخة.', 'اقرأ الموقع والتراب الحاليين من غير ما تحتفظ بالإدراك السابق.', 'القاعدة بتقول: لو الغرفة متّسخة، نضّفها.', 'المكنسة بتشفط التراب من الغرفة A.', 'الغرفة A بقت نضيفة؛ خد إدراك جديد.'][stageIndex]
              : scenarioId === 'taxi'
                ? ['الكاميرا شايفة عربية واقفة قدام التاكسي.', 'الـ Model بيقدّر الحارة ومواقع العربيات.', 'الهدف: تجنب التصادم مع الحفاظ على المسار.', 'الـ Agent بيفرمل وبيجهّز تعديل آمن للمسار.', 'المرور اتغير؛ اجمع إدراك جديد.'][stageIndex]
                : ['وصلت رسالة جديدة وبياناتها.', 'الـ Model بيقارن المرسل والمحتوى.', 'الهدف: تقليل الرسائل المزعجة من غير إخفاء رسائل مهمة.', 'الـ Agent بيصنّف الرسالة أو ينقلها للمزعج.', 'التقييم اللاحق يساعد في تحسين التصنيف.'][stageIndex]}
          </ArabicText>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <Wind size={17} className="text-stone-700 dark:text-zinc-300" aria-hidden="true" />
        <h4 className="font-bold text-stone-900 dark:text-stone-100">Describe the task with PEAS</h4>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {peasLabels.map(({ key, en, ar }) => (
          <div key={key} className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950">
            <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{en}</p>
            <ArabicText className="text-sm font-semibold text-stone-700 dark:text-zinc-300">{ar}</ArabicText>
            <p className="mt-2 text-sm text-stone-700 dark:text-zinc-300">{scenario.peas[key]}</p>
            <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">
              {scenarioId === 'vacuum'
                ? ({ performance: 'تنضيف الغرف وتجنب الأفعال غير الضرورية.', environment: 'غرفتين A وB وفيهم تراب بيتغير.', actuators: 'شفط، حركة شمال، حركة يمين.', sensors: 'الموقع الحالي ومستشعر التراب.' }[key])
                : scenarioId === 'taxi'
                  ? ({ performance: 'رحلات آمنة وفي وقت مناسب ومريحة.', environment: 'طرق ومرور وركاب وطقس.', actuators: 'توجيه وزيادة سرعة وفرامل وإشارات.', sensors: 'كاميرات وGPS ومستشعرات سرعة ومحرك.' }[key])
                  : ({ performance: 'اكتشاف المزعج مع تقليل تصنيف الرسائل المهمة بالخطأ.', environment: 'رسائل واردة وصندوق البريد.', actuators: 'تصنيف الرسالة أو نقلها أو تركها.', sensors: 'المرسل والمحتوى وبيانات الرسالة.' }[key])}
            </ArabicText>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AgentArchitectureLab;

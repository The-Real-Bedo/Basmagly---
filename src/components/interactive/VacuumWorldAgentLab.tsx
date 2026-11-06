import React, { useEffect, useReducer, useState } from 'react';
import { Bot, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type Room = 'A' | 'B';
type PeasKey = 'performance' | 'environment' | 'actuators' | 'sensors';

interface Bilingual {
  en: string;
  ar: string;
}

interface PeasScenario extends Record<PeasKey, Bilingual> {
  title: string;
  titleAr: string;
}

const PEAS_FIELDS: { key: PeasKey; letter: string; ar: string; en: string }[] = [
  { key: 'performance', letter: 'P', ar: 'مقياس الأداء', en: 'Performance Measure' },
  { key: 'environment', letter: 'E', ar: 'البيئة', en: 'Environment' },
  { key: 'actuators', letter: 'A', ar: 'المحركات', en: 'Actuators' },
  { key: 'sensors', letter: 'S', ar: 'الحساسات', en: 'Sensors' },
];

const PEAS_DATA: PeasScenario[] = [
  {
    title: 'Automated Vacuum Cleaner',
    titleAr: 'المكنسة الآلية (Vacuum World)',
    performance: {
      en: 'Floor cleanliness, battery efficiency, time taken, minimal noise.',
      ar: 'نظافة الأرضية، توفير شحن البطارية، الوقت المستغرق، وأقل ضجيج ممكن.',
    },
    environment: {
      en: 'Room floors, carpets, dirt, furniture obstacles, stairs.',
      ar: 'أرضية السيراميك والسجاد، التراب والزبالة، الكراسي والعفش (عوائق)، والسلالم (خطر السقوط).',
    },
    actuators: {
      en: 'Drive wheels, suction motor, rotating brush, audio alarm.',
      ar: 'عجلات الحركة (يمين وشمال)، موتور الشفط، الفرشاة الدوارة، وسرينة التنبيه.',
    },
    sensors: {
      en: 'Dirt sensor, bump sensor, cliff sensor (IR), wheel encoder.',
      ar: 'حساس التراب، حساس الاصطدام، حساس الحافة (Infrared) للسلالم، وحساس دوران العجلات (Wheel Encoder).',
    },
  },
  {
    title: 'Autonomous Self-Driving Taxi (Waymo/Tesla)',
    titleAr: 'تاكسي بدون سائق (Self-Driving Taxi)',
    performance: {
      en: 'Passenger safety, reaching the destination, obeying traffic laws, smooth ride.',
      ar: 'أمان الركاب أولاً، الوصول للوجهة بسرعة، احترام قوانين وإشارات المرور، وركوبة مريحة من غير فرملة مفاجئة.',
    },
    environment: {
      en: 'City roads, pedestrians, other vehicles, rain/fog, traffic lights.',
      ar: 'شوارع المدينة، المشاة اللي بيعدوا فجأة، العربيات التانية، المطر والشبورة، وإشارات المرور.',
    },
    actuators: {
      en: 'Steering, accelerator, brakes, turn signals, horn.',
      ar: 'الدركسيون (التوجيه)، دواسة البنزين، الفرامل، إشارات الانعطاف، والكلاكس.',
    },
    sensors: {
      en: 'LiDAR, HD cameras, radar, GPS, sonar distance sensors, speedometer.',
      ar: 'كاميرات عالية الدقة، رادار، LiDAR، حساسات سونار لقياس المسافات، GPS، وعداد السرعة.',
    },
  },
  {
    title: 'Medical Diagnosis AI System',
    titleAr: 'نظام تشخيص طبي بالذكاء الاصطناعي',
    performance: {
      en: 'High diagnostic accuracy, reduced treatment costs, faster patient recovery.',
      ar: 'دقة التشخيص وتجنب الأخطاء الخطيرة، تقليل تكلفة الفحوصات غير الضرورية، وسرعة تعافي المريض.',
    },
    environment: {
      en: 'Hospital/clinic, patient symptoms and medical history, lab results, disease databases.',
      ar: 'المستشفى أو العيادة، شكوى المريض وأعراضه وتاريخه الطبي، نتائج التحاليل والأشعة، وقواعد بيانات الأمراض.',
    },
    actuators: {
      en: 'Screen display, prescription generation, test referral orders, dosage alerts.',
      ar: 'شاشة عرض التشخيص للدكتور، طباعة الروشتة، طلب تحاليل إضافية لو فيه شك، وتنبيه بجرعات الدواء.',
    },
    sensors: {
      en: 'Keyboard entry of symptoms, EHR (electronic health records), lab analyzer results.',
      ar: 'إدخال الأعراض من لوحة المفاتيح، الربط مع السجلات الطبية الإلكترونية (EHR)، ونتائج أجهزة التحاليل.',
    },
  },
];

/* ---------- Simulation ---------- */

const STEP_MS = 1000;
const SUCK_MS = 500;

const DIRT_EMOJI: Record<Room, string[]> = {
  A: ['🍂', '🍪', '🌾', '🍂'],
  B: ['🍂', '🍂', '🍞', '🍂'],
};

// Simple reflex agent (Russell & Norvig, Fig. 2.8): percept = [location, status].
const AGENT_RULES = [
  { percept: '[A or B, Dirty]', action: 'Suck' },
  { percept: '[A, Clean]', action: 'Move to B' },
  { percept: '[B, Clean]', action: 'Move to A' },
];

const otherRoom = (room: Room): Room => (room === 'A' ? 'B' : 'A');
const cleanCount = (dirty: Record<Room, boolean>) => (dirty.A ? 0 : 1) + (dirty.B ? 0 : 1);
const formatScore = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `\u2212${Math.abs(n)}` : '0');

const LOG_INITIAL = 'الوكيل جاهز في الغرفة A. اضغط "خطوة واحدة" أو "تشغيل تلقائي" وشوف بيتصرف إزاي.';
const LOG_RESET = 'تم ضبط المحاكي من الأول: الغرفتين فيهم تراب والوكيل في الغرفة A.';
const LOG_DONE =
  '🎉 الغرفتين بقوا نضاف والمحاكاة وقفت. الـ Simple Reflex Agent مش بيفتكر إن الغرفة التانية نضيفة، فكان هيفضل يتحرك ويخسر نقطة في كل خطوة.';

interface World {
  dirty: Record<Room, boolean>;
  pos: Room;
  score: number;
  steps: number;
  sucking: boolean;
  autoPlay: boolean;
  log: string;
}

type WorldAction =
  | { type: 'STEP'; auto?: boolean }
  | { type: 'SUCK_DONE' }
  | { type: 'TOGGLE_DIRT'; room: Room }
  | { type: 'TOGGLE_AUTO' }
  | { type: 'RESET' };

const INITIAL_WORLD: World = {
  dirty: { A: true, B: true },
  pos: 'A',
  score: 0,
  steps: 0,
  sucking: false,
  autoPlay: false,
  log: LOG_INITIAL,
};

function worldReducer(s: World, a: WorldAction): World {
  switch (a.type) {
    case 'STEP': {
      if (s.sucking) return s;
      if (a.auto && !s.dirty.A && !s.dirty.B) return { ...s, autoPlay: false, log: LOG_DONE };

      const steps = s.steps + 1;
      if (s.dirty[s.pos]) {
        // The room is removed from `dirty` on SUCK_DONE (after the animation),
        // but this step's score already counts it as clean.
        const score = s.score + cleanCount({ ...s.dirty, [s.pos]: false });
        return {
          ...s,
          steps,
          score,
          sucking: true,
          log: `🧹 الإجراء: Suck. الغرفة ${s.pos} كان فيها تراب، فالوكيل شفطه.`,
        };
      }

      const next = otherRoom(s.pos);
      return {
        ...s,
        pos: next,
        steps,
        score: s.score + cleanCount(s.dirty) - 1,
        log: `➡️ الإجراء: Move to ${next}. الغرفة ${s.pos} نضيفة، فالوكيل انتقل للغرفة التانية.`,
      };
    }
    case 'SUCK_DONE': {
      if (!s.sucking) return s;
      const dirty = { ...s.dirty, [s.pos]: false };
      const finished = s.autoPlay && !dirty.A && !dirty.B;
      return {
        ...s,
        dirty,
        sucking: false,
        autoPlay: finished ? false : s.autoPlay,
        log: finished ? LOG_DONE : s.log,
      };
    }
    case 'TOGGLE_DIRT':
      return { ...s, dirty: { ...s.dirty, [a.room]: !s.dirty[a.room] } };
    case 'TOGGLE_AUTO':
      return { ...s, autoPlay: !s.autoPlay };
    case 'RESET':
      return { ...INITIAL_WORLD, log: LOG_RESET };
  }
}

/* ---------- Shared styles ---------- */

const pillClass = (active: boolean) =>
  `px-3 py-1.5 rounded-xl text-sm font-arabic transition-all ${
    active
      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
      : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
  }`;

const secondaryBtn =
  'px-3.5 py-2 rounded-xl font-arabic text-sm font-bold bg-white dark:bg-stone-900 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700 hover:bg-beige-100 dark:hover:bg-stone-800 shadow-sm transition-colors';

const infoCard =
  'p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-2';

export const VacuumWorldAgentLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'peas'>('simulation');
  const [selectedPeasIndex, setSelectedPeasIndex] = useState<number>(0);
  const [world, dispatch] = useReducer(worldReducer, INITIAL_WORLD);

  // Suck animation: the room is cleaned when the timer fires.
  useEffect(() => {
    if (!world.sucking) return;
    const id = setTimeout(() => dispatch({ type: 'SUCK_DONE' }), SUCK_MS);
    return () => clearTimeout(id);
  }, [world.sucking]);

  useEffect(() => {
    if (!world.autoPlay) return;
    const id = setInterval(() => dispatch({ type: 'STEP', auto: true }), STEP_MS);
    return () => clearInterval(id);
  }, [world.autoPlay]);

  const currentPeas = PEAS_DATA[selectedPeasIndex];
  const activeRule = world.dirty[world.pos] ? 0 : world.pos === 'A' ? 1 : 2;

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Bot className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Rational Agent & Vacuum World Lab
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                جرب بنفسك إزاي الوكيل العقلاني (Rational Agent) بيتصرف في عالم المكنسة (Vacuum World)، وراجع جدول الـ PEAS للامتحان
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="self-start sm:self-auto bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl flex flex-wrap items-center gap-1 font-bold border border-beige-300 dark:border-stone-700">
          <button
            dir="rtl"
            aria-pressed={activeTab === 'simulation'}
            onClick={() => setActiveTab('simulation')}
            className={pillClass(activeTab === 'simulation')}
          >
            المحاكاة (Simulation) 🧹
          </button>
          <button
            dir="rtl"
            aria-pressed={activeTab === 'peas'}
            onClick={() => setActiveTab('peas')}
            className={pillClass(activeTab === 'peas')}
          >
            جدول PEAS 📋
          </button>
        </div>
      </div>

      {activeTab === 'simulation' ? (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-[#FAF7F2] dark:bg-stone-950 p-4 rounded-2xl border border-beige-300 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-sm">
            {/* Score & Time Step */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white dark:bg-stone-900 px-3.5 py-2 rounded-xl border border-beige-300 dark:border-stone-700">
                <ArabicText as="span" className="block text-xs text-stone-600 dark:text-zinc-400">
                  النتيجة (Performance Score)
                </ArabicText>
                <span
                  dir="ltr"
                  className={`block text-lg font-bold font-mono ${
                    world.score > 0
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : world.score < 0
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-stone-800 dark:text-stone-200'
                  }`}
                >
                  {formatScore(world.score)}
                </span>
              </div>
              <div className="bg-white dark:bg-stone-900 px-3.5 py-2 rounded-xl border border-beige-300 dark:border-stone-700">
                <ArabicText as="span" className="block text-xs text-stone-600 dark:text-zinc-400">
                  الخطوة (Time Step)
                </ArabicText>
                <span dir="ltr" className="block text-lg font-bold font-mono text-stone-800 dark:text-stone-200">
                  {world.steps}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {(['A', 'B'] as const).map((room) => (
                <button
                  key={room}
                  dir="rtl"
                  onClick={() => dispatch({ type: 'TOGGLE_DIRT', room })}
                  className={secondaryBtn}
                >
                  {world.dirty[room] ? `نضّف ${room} يدوياً 🧽` : `ارمي تراب في ${room} 🍂`}
                </button>
              ))}

              <button
                dir="rtl"
                onClick={() => dispatch({ type: 'STEP' })}
                disabled={world.autoPlay || world.sucking}
                className="px-4 py-2 rounded-xl font-arabic text-sm bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                خطوة واحدة ⏭️
              </button>

              <button
                dir="rtl"
                onClick={() => dispatch({ type: 'TOGGLE_AUTO' })}
                className={`px-4 py-2 rounded-xl font-arabic text-sm font-bold border transition-all shadow-sm ${
                  world.autoPlay
                    ? 'bg-amber-500 hover:bg-amber-400 border-amber-500 text-stone-900'
                    : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-900 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:border-amber-700/60 dark:text-amber-200'
                }`}
              >
                {world.autoPlay ? 'إيقاف مؤقت ⏸️' : 'تشغيل تلقائي ▶️'}
              </button>

              <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="p-2.5 rounded-xl bg-beige-100 dark:bg-stone-800 hover:bg-beige-200 dark:hover:bg-stone-700 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700 shadow-sm transition-colors"
                title="إعادة ضبط"
                aria-label="إعادة ضبط"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2-Room Floor Environment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF7F2] dark:bg-stone-950 p-4 sm:p-6 rounded-2xl border border-beige-300 dark:border-stone-800">
            {(['A', 'B'] as const).map((room) => {
              const isDirty = world.dirty[room];
              return (
                <div
                  key={room}
                  className={`p-4 sm:p-6 min-h-[240px] rounded-2xl border-2 transition-all flex flex-col justify-between gap-4 relative overflow-hidden ${
                    isDirty
                      ? 'border-amber-400/80 bg-amber-50/50 dark:border-amber-500/50 dark:bg-amber-950/20'
                      : 'border-emerald-400/70 bg-emerald-50/30 dark:border-emerald-600/50 dark:bg-emerald-950/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <ArabicText as="span" className="text-base font-extrabold text-stone-800 dark:text-stone-200">
                      {`الغرفة ${room}`}
                    </ArabicText>
                    <ArabicText
                      as="span"
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isDirty
                          ? 'bg-amber-200 text-amber-900 dark:bg-amber-900/70 dark:text-amber-200'
                          : 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900/70 dark:text-emerald-200'
                      }`}
                    >
                      {isDirty ? '🍂 مليانة تراب (Dirty)' : '✨ نضيفة (Clean)'}
                    </ArabicText>
                  </div>

                  {isDirty && (
                    <div aria-hidden="true" className="flex justify-around opacity-80 animate-pulse text-2xl">
                      {DIRT_EMOJI[room].map((emoji, i) => (
                        <span key={i}>{emoji}</span>
                      ))}
                    </div>
                  )}

                  {world.pos === room && (
                    <div
                      className={`mt-auto mx-auto p-3 sm:p-4 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border border-stone-700 dark:border-stone-300 shadow-xl flex items-center gap-3 transition-transform ${
                        world.sucking ? 'vacuum-active scale-105' : ''
                      }`}
                    >
                      <div className="w-9 h-9 shrink-0 rounded-xl bg-amber-500 text-stone-900 flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-sm font-bold block">Vacuum Agent</span>
                        <span
                          dir="rtl"
                          className="font-arabic text-xs font-semibold block text-amber-300 dark:text-amber-800"
                        >
                          {world.sucking ? 'بيشفط التراب…' : 'بيفحص الأرضية'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Log Commentary */}
          <div
            aria-live="polite"
            className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-700/60 text-sm space-y-1.5"
          >
            <ArabicText as="div" className="font-bold text-amber-900 dark:text-amber-300">
              🤖 آخر إجراء للوكيل (Action Log)
            </ArabicText>
            <ArabicText className="text-sm text-stone-800 dark:text-stone-200 font-medium">{world.log}</ArabicText>
          </div>

          {/* Agent Program, Performance Measure & Concept Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className={infoCard}>
              <ArabicText as="div" className="font-bold text-stone-900 dark:text-stone-100">
                برنامج الوكيل (Simple Reflex Agent)
              </ArabicText>
              <ArabicText className="text-sm text-stone-700 dark:text-zinc-400">
                الوكيل بيشوف الـ Percept الحالي بس (مكانه وحالة الغرفة) من غير ذاكرة، وبيرد عليه بواحدة من القواعد دي:
              </ArabicText>
              <ul dir="ltr" className="space-y-1.5 font-mono text-xs">
                {AGENT_RULES.map((rule, i) => (
                  <li
                    key={rule.percept}
                    className={`flex flex-wrap items-center justify-between gap-x-3 px-3 py-1.5 rounded-lg border transition-colors ${
                      i === activeRule
                        ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-700/60 dark:text-amber-200'
                        : 'bg-white border-beige-300 text-stone-700 dark:bg-stone-900 dark:border-stone-800 dark:text-zinc-300'
                    }`}
                  >
                    <span>{rule.percept}</span>
                    <span className="font-bold">→ {rule.action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={infoCard}>
              <ArabicText as="div" className="font-bold text-stone-900 dark:text-stone-100">
                مقياس الأداء (Performance Measure)
              </ArabicText>
              <ArabicText className="text-sm text-stone-700 dark:text-zinc-400">
                في آخر كل خطوة (Time Step) الوكيل بياخد{' '}
                <span dir="ltr" className="font-mono font-bold">+1</span> عن كل غرفة نضيفة، ويخسر{' '}
                <span dir="ltr" className="font-mono font-bold">{'\u2212'}1</span> لو اتحرك (استهلاك كهربا). عشان كده الحركة من غير داعي بتقلل النتيجة.
              </ArabicText>
            </div>

            <div className={infoCard}>
              <ArabicText as="div" className="font-bold text-stone-900 dark:text-stone-100">
                مفهوم العقلانية (Rationality)
              </ArabicText>
              <ArabicText className="text-sm text-stone-700 dark:text-zinc-400">
                الوكيل العقلاني مش بيعمل "سحر"، هو بيختار الإجراء (Action) المتوقع إنه يحقق أعلى مقياس أداء (Performance Measure) بناءً على سلسلة الإدراكات (Percept Sequence) اللي شافها والمعرفة المدمجة عنده.
              </ArabicText>
            </div>

            <div className={infoCard}>
              <ArabicText as="div" className="font-bold text-stone-900 dark:text-stone-100">
                العقلانية مش علم مطلق (Omniscience)
              </ArabicText>
              <ArabicText className="text-sm text-stone-700 dark:text-zinc-400">
                الدكتورة بتسأل في النقطة دي دايماً: الوكيل العقلاني بيعمل الصح بناءً على اللي يقدر يعرفه وقت القرار، أما الـ Omniscience فمعناها إنه يعرف النتيجة الفعلية لكل إجراء مسبقاً، وده مستحيل عملياً.
              </ArabicText>
            </div>
          </div>
        </div>
      ) : (
        /* PEAS Framework Tab */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {PEAS_DATA.map((p, idx) => (
              <button
                key={p.title}
                dir="rtl"
                aria-pressed={selectedPeasIndex === idx}
                onClick={() => setSelectedPeasIndex(idx)}
                className={`px-4 py-2 rounded-xl font-arabic font-bold border transition-all ${
                  selectedPeasIndex === idx
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-zinc-300 border-beige-300 dark:border-stone-800 hover:bg-beige-100 dark:hover:bg-stone-800'
                }`}
              >
                {p.titleAr}
              </button>
            ))}
          </div>

          {/* PEAS 4-Quadrant Matrix */}
          <div className="bg-[#FAF7F2] dark:bg-stone-950 p-4 sm:p-6 rounded-2xl border border-beige-300 dark:border-stone-800 space-y-5">
            <div className="border-b border-beige-200 dark:border-stone-800 pb-3">
              <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">{currentPeas.title}</h4>
              <ArabicText className="text-sm text-stone-700 dark:text-zinc-400">
                {`${currentPeas.titleAr}: عناصر الـ PEAS الأربعة للمثال ده`}
              </ArabicText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PEAS_FIELDS.map((field) => (
                <div
                  key={field.key}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold font-mono text-sm flex items-center justify-center">
                      {field.letter}
                    </span>
                    <ArabicText as="div" className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {`${field.ar} (${field.en})`}
                    </ArabicText>
                  </div>
                  <p dir="ltr" className="text-sm text-stone-800 dark:text-stone-200 font-sans">
                    {currentPeas[field.key].en}
                  </p>
                  <div className="pt-2 border-t border-beige-200 dark:border-stone-800">
                    <ArabicText className="text-sm text-stone-700 dark:text-zinc-400">
                      {currentPeas[field.key].ar}
                    </ArabicText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacuumWorldAgentLab;

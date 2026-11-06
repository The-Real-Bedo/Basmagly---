import React, { useState, useEffect } from 'react';
import { Bot, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

interface PeasScenario {
  title: string;
  titleAr: string;
  performance: { en: string; ar: string };
  environment: { en: string; ar: string };
  actuators: { en: string; ar: string };
  sensors: { en: string; ar: string };
}

const PEAS_DATA: PeasScenario[] = [
  {
    title: 'Automated Vacuum Cleaner',
    titleAr: 'المكنسة الذكية (عالم المكنسة الشهير)',
    performance: {
      en: 'Cleanliness percentage, battery efficiency, time taken, minimal noise.',
      ar: 'نسبة النظافة، توفير شحن البطارية، الوقت المستغرق، وعدم الخبط في الحيطان.'
    },
    environment: {
      en: 'Room flooring, carpets, dirt particles, furniture obstacles, stairs.',
      ar: 'أرضية السيراميك، السجاد، التراب والزبالة، الكراسي والعفش، والسلالم عشان متقعش.'
    },
    actuators: {
      en: 'Drive wheels, suction motor, spinning brush, audio speaker/alarm.',
      ar: 'عجلات الحركة يمين وشمال، ماتور الشفط القوي، الفرش الدوارة، وسارينة التنبيه.'
    },
    sensors: {
      en: 'Dirt sensor, bump bumper, cliff detector (IR), wheel optical encoder.',
      ar: 'حساس كشف التراب، حساس الصدمات، حساس الحافة (إنفراريد للسلالم)، وحساس دوران العجل.'
    }
  },
  {
    title: 'Autonomous Self-Driving Taxi (Waymo/Tesla)',
    titleAr: 'تاكسي القيادة الذاتية بدون سائق',
    performance: {
      en: 'Passenger safety, reaching destination, obeying traffic laws, smooth ride.',
      ar: 'أمان الركاب أولاً، الوصول السريع للوجهة، احترام إشارات المرور، وركوبة مريحة بدون فرملة مفاجئة.'
    },
    environment: {
      en: 'Urban city roads, pedestrians, other vehicles, rain/fog, traffic lights.',
      ar: 'شوارع المدينة، المشاة اللي بيعدوا فجأة، العربيات التانية، المطرة والشبورة، وإشارات المرور.'
    },
    actuators: {
      en: 'Steering wheel motor, accelerator pedal, disc brakes, turn signals, horn.',
      ar: 'دركسيون التوجيه، دواسة البنزين، فرامل الطوارئ، إشارات الانعطاف، والكلاكس.'
    },
    sensors: {
      en: 'LiDAR, HD cameras, RADAR, GPS, sonar distance sensors, speedometer.',
      ar: 'كاميرات عالية الدقة 360، رادار وليدار لقياس المسافات، GPS، وحساس السرعة.'
    }
  },
  {
    title: 'Medical Diagnosis AI System',
    titleAr: 'نظام التشخيص الطبي الذكي للمرضى',
    performance: {
      en: 'High diagnostic accuracy, reduced treatment cost, patient recovery speed.',
      ar: 'دقة التشخيص وخلوه من الأخطاء القاتلة، تقليل تكاليف الفحوصات غير الضرورية، وسرعة شفاء المريض.'
    },
    environment: {
      en: 'Hospital clinic, patient symptoms, lab test results, disease databases.',
      ar: 'المستشفى والعيادة، شكوى المريض وأعراضه، نتائج التحاليل والأشعة، وتاريخه الطبي.'
    },
    actuators: {
      en: 'Screen display, prescription generation, test referral order, dosage alert.',
      ar: 'شاشة التقرير للدكتور، طباعة الروشتة وجرعات العلاج، وطلب تحاليل إضافية لو شاكك.'
    },
    sensors: {
      en: 'Keyboard symptom input, EHR electronic records, blood analyzer scanner.',
      ar: 'لوحة المفاتيح لإدخال الأعراض، الربط بقاعدة بيانات التحاليل، وقارئ الأشعة السينية.'
    }
  }
];

export const VacuumWorldAgentLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'peas'>('simulation');
  const [roomAIsDirty, setRoomAIsDirty] = useState<boolean>(true);
  const [roomBIsDirty, setRoomBIsDirty] = useState<boolean>(true);
  const [agentPos, setAgentPos] = useState<'A' | 'B'>('A');
  const [isSucking, setIsSucking] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [actionLog, setActionLog] = useState<string>('الوكيل جاهز في غرفة A. اضغط على أزرار التحكم وجرب الذكاء الاصطناعي.');
  const [agentType, setAgentType] = useState<'reflex' | 'rational'>('rational');

  const [selectedPeasIndex, setSelectedPeasIndex] = useState<number>(0);

  // Single step execution
  const executeStep = () => {
    const isCurrentDirty = agentPos === 'A' ? roomAIsDirty : roomBIsDirty;

    if (isCurrentDirty) {
      // Suck action
      setIsSucking(true);
      setActionLog(`🧹 الإجراء: SUCK! الغرفة ${agentPos} كان فيها تراب، الوكيل الذكي شفط الزبالة.`);
      setScore(prev => prev + 10);

      setTimeout(() => {
        if (agentPos === 'A') setRoomAIsDirty(false);
        else setRoomBIsDirty(false);
        setIsSucking(false);
      }, 500);
    } else {
      // Move action
      const nextPos = agentPos === 'A' ? 'B' : 'A';
      setAgentPos(nextPos);
      setScore(prev => prev - 1); // Movement cost penalty
      setActionLog(`➡️ الإجراء: MOVE TO ${nextPos}! الغرفة ${agentPos} خلاص نضيفة، الوكيل اتحرك للغرفة التانية.`);
    }
  };

  // Auto clean simulation loop
  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        const isCurrentDirty = agentPos === 'A' ? roomAIsDirty : roomBIsDirty;
        const otherIsDirty = agentPos === 'A' ? roomBIsDirty : roomAIsDirty;

        if (isCurrentDirty) {
          executeStep();
        } else if (otherIsDirty) {
          executeStep();
        } else {
          // Both clean!
          setIsAutoPlaying(false);
          setActionLog('🎉 الله ينور! كل الغرف بقت بتبرق ونظيفة 100%! الوكيل وقف عشان يوفر بطارية.');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, agentPos, roomAIsDirty, roomBIsDirty]);

  const handleReset = () => {
    setIsAutoPlaying(false);
    setRoomAIsDirty(true);
    setRoomBIsDirty(true);
    setAgentPos('A');
    setScore(0);
    setIsSucking(false);
    setActionLog('تم تصفير الغرف ورجع التراب والوكيل في غرفة A.');
  };

  const currentPeas = PEAS_DATA[selectedPeasIndex];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            <Bot className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Rational Agents & Vacuum World Interactive Lab
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
              محاكي الوكيل العقلاني (Russell & Norvig Vacuum Environment) وإطار الـ PEAS للامتحانات
            </ArabicText>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1.5 bg-beige-100 dark:bg-stone-800 p-1.5 rounded-2xl border border-beige-300 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'simulation'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-700'
                : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            عالم المكنسة التفاعلي 🧹
          </button>
          <button
            onClick={() => setActiveTab('peas')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'peas'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-700'
                : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            مصفوفة PEAS للامتحان ⚡
          </button>
        </div>
      </div>

      {activeTab === 'simulation' ? (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-[#FAF7F2] dark:bg-stone-950 p-5 rounded-2xl border border-beige-300 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-sm">
            {/* Score & Agent Mode */}
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-stone-900 px-3.5 py-2 rounded-xl border border-beige-300 dark:border-stone-700">
                <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-mono">Performance Score</span>
                <span className={`text-lg font-bold font-mono ${score >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'}`}>
                  {score > 0 ? `+${score}` : score} pts
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-700 dark:text-zinc-300">نوع الوكيل:</span>
                <button
                  onClick={() => setAgentType(agentType === 'reflex' ? 'rational' : 'reflex')}
                  className="px-3 py-1.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-900 dark:text-zinc-100 font-mono font-bold hover:bg-beige-300 dark:hover:bg-stone-700 transition-colors"
                >
                  {agentType === 'rational' ? 'Rational Agent (عقلاني ذكي)' : 'Simple Reflex (رد فعل مباشر)'}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setRoomAIsDirty(!roomAIsDirty)}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 font-bold hover:bg-beige-100 dark:hover:bg-stone-800 shadow-2xs"
              >
                {roomAIsDirty ? 'كنس A يدوياً 🧽' : 'رمي تراب في A 🍂'}
              </button>

              <button
                onClick={() => setRoomBIsDirty(!roomBIsDirty)}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 font-bold hover:bg-beige-100 dark:hover:bg-stone-800 shadow-2xs"
              >
                {roomBIsDirty ? 'كنس B يدوياً 🧽' : 'رمي تراب في B 🍂'}
              </button>

              <button
                onClick={executeStep}
                disabled={isAutoPlaying}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold transition-all shadow-sm disabled:opacity-40"
              >
                خطوة واحدة ⏯️
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-sm"
              >
                {isAutoPlaying ? 'إيقاف مؤقت ⏸️' : 'تشغيل ذكي تلقائي 🤖'}
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-beige-100 dark:bg-stone-800 hover:bg-beige-200 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700 shadow-2xs"
                title="تصفير"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2-Room Floor Environment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] dark:bg-stone-950 p-6 rounded-3xl border border-beige-300 dark:border-stone-800 min-h-[280px]">
            {/* Room A */}
            <div className={`p-6 rounded-2xl border-2 transition-all flex flex-col justify-between relative overflow-hidden ${
              roomAIsDirty
                ? 'border-amber-400/80 bg-amber-50/50 dark:bg-amber-950/20'
                : 'border-emerald-400/70 bg-emerald-50/20 dark:bg-emerald-950/10'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-extrabold text-stone-800 dark:text-stone-200">
                  ROOM A (الغرفة أ)
                </span>
                <span className={`px-3 py-1 rounded-full text-[13px] font-bold ${
                  roomAIsDirty ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200' : 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
                }`}>
                  {roomAIsDirty ? '🍂 Dirty (مليانة تراب)' : '✨ Clean (نظيفة بتبرق)'}
                </span>
              </div>

              {/* Dirt Visuals in Room A */}
              {roomAIsDirty && (
                <div className="my-6 flex justify-around opacity-80 animate-pulse text-2xl">
                  <span>🍂</span>
                  <span>🍪</span>
                  <span>🌾</span>
                  <span>🍂</span>
                </div>
              )}

              {/* Vacuum Robot inside Room A */}
              {agentPos === 'A' && (
                <div className={`mt-auto mx-auto p-4 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border border-stone-700 shadow-xl flex items-center gap-3 transition-transform ${
                  isSucking ? 'vacuum-active scale-105' : ''
                }`}>
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-900 flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-sm font-bold block">VACUUM ROBOT</span>
                    <span className="text-[13px] text-amber-400 dark:text-amber-600 font-mono font-semibold">
                      {isSucking ? '🌀 SUCKING DIRT...' : '👀 SENSING FLOOR'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Room B */}
            <div className={`p-6 rounded-2xl border-2 transition-all flex flex-col justify-between relative overflow-hidden ${
              roomBIsDirty
                ? 'border-amber-400/80 bg-amber-50/50 dark:bg-amber-950/20'
                : 'border-emerald-400/70 bg-emerald-50/20 dark:bg-emerald-950/10'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-extrabold text-stone-800 dark:text-stone-200">
                  ROOM B (الغرفة ب)
                </span>
                <span className={`px-3 py-1 rounded-full text-[13px] font-bold ${
                  roomBIsDirty ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200' : 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
                }`}>
                  {roomBIsDirty ? '🍂 Dirty (مليانة تراب)' : '✨ Clean (نظيفة بتبرق)'}
                </span>
              </div>

              {/* Dirt Visuals in Room B */}
              {roomBIsDirty && (
                <div className="my-6 flex justify-around opacity-80 animate-pulse text-2xl">
                  <span>🍂</span>
                  <span>🍂</span>
                  <span>🍞</span>
                  <span>🍂</span>
                </div>
              )}

              {/* Vacuum Robot inside Room B */}
              {agentPos === 'B' && (
                <div className={`mt-auto mx-auto p-4 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border border-stone-700 shadow-xl flex items-center gap-3 transition-transform ${
                  isSucking ? 'vacuum-active scale-105' : ''
                }`}>
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-900 flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-sm font-bold block">VACUUM ROBOT</span>
                    <span className="text-[13px] text-amber-400 dark:text-amber-600 font-mono font-semibold">
                      {isSucking ? '🌀 SUCKING DIRT...' : '👀 SENSING FLOOR'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Log Commentary */}
          <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-700/60 text-sm space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
              <span>🤖</span>
              <span>تفسير تصرف الوكيل الذكي:</span>
            </div>
            <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 font-medium leading-[1.75]">
              {actionLog}
            </ArabicText>
          </div>

          {/* Core Concept Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                مفهوم العقلانية (Rationality):
              </span>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
                الوكيل العقلاني مش بيعمل "سحر"، هو بيختار الإجراء (Action) اللي يعظم مقياس الأداء (Performance Measure) بناءً على إدراكه بالبيئة (Percept Sequence) والمعرفة المخزنة عنده.
              </ArabicText>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                العقلانية ليست المعرفة المطلقة (Omniscience):
              </span>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
                الدكتورة بتسأل في دي دايماً: العقلاني بيعمل الصح بناءً على اللي يقدر يعرفه، إنما الـ Omniscience بيعرف الغيب والمستقبل وده مستحيل عملياً!
              </ArabicText>
            </div>
          </div>
        </div>
      ) : (
        /* PEAS Framework Tab */
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
            {PEAS_DATA.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPeasIndex(idx)}
                className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
                  selectedPeasIndex === idx
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-zinc-300 hover:bg-beige-100 dark:hover:bg-stone-800 border border-beige-300 dark:border-stone-800'
                }`}
              >
                {p.titleAr}
              </button>
            ))}
          </div>

          {/* PEAS 4-Quadrant Matrix */}
          <div className="bg-[#FAF8F5] dark:bg-stone-950 p-6 rounded-3xl border border-beige-300 dark:border-stone-800 space-y-5">
            <div className="border-b border-beige-200 dark:border-stone-800 pb-3">
              <h4 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                {currentPeas.title}
              </h4>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 pt-1">
                {currentPeas.titleAr} — تفصيلة عناصر الـ PEAS الأربعة المعتمدة في الامتحان
              </ArabicText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* P: Performance */}
              <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold font-mono text-sm flex items-center justify-center">P</span>
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100">Performance Measure (مقياس الأداء والنجاح)</span>
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 font-sans">{currentPeas.performance.en}</p>
                <div className="pt-2 border-t border-beige-200 dark:border-stone-800">
                  <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
                    <strong>الخلاصة: </strong> {currentPeas.performance.ar}
                  </ArabicText>
                </div>
              </div>

              {/* E: Environment */}
              <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold font-mono text-sm flex items-center justify-center">E</span>
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100">Environment (بيئة العمل الخارجية)</span>
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 font-sans">{currentPeas.environment.en}</p>
                <div className="pt-2 border-t border-beige-200 dark:border-stone-800">
                  <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
                    <strong>الخلاصة: </strong> {currentPeas.environment.ar}
                  </ArabicText>
                </div>
              </div>

              {/* A: Actuators */}
              <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-bold font-mono text-sm flex items-center justify-center">A</span>
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100">Actuators (المحركات ووسائل التأثير)</span>
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 font-sans">{currentPeas.actuators.en}</p>
                <div className="pt-2 border-t border-beige-200 dark:border-stone-800">
                  <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
                    <strong>الخلاصة: </strong> {currentPeas.actuators.ar}
                  </ArabicText>
                </div>
              </div>

              {/* S: Sensors */}
              <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 font-bold font-mono text-sm flex items-center justify-center">S</span>
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100">Sensors (الحساسات ومستقبلات الداتا)</span>
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 font-sans">{currentPeas.sensors.en}</p>
                <div className="pt-2 border-t border-beige-200 dark:border-stone-800">
                  <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
                    <strong>الخلاصة: </strong> {currentPeas.sensors.ar}
                  </ArabicText>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacuumWorldAgentLab;

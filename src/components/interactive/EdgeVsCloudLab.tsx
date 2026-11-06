import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Cloud, Thermometer, Droplets, Flame, WifiOff, Wifi, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type Mode = 'edge' | 'cloud';
type Tone = 'good' | 'warn' | 'bad' | 'neutral';

const FIRE_THRESHOLD_C = 60;
const INITIAL_TEMP_C = 30;
const EDGE_LATENCY_MS = 3;
const CLOUD_LATENCY_MS = 240;
// Simulated run durations (compressed so the gap is visible but quick).
const EDGE_RUN_MS = 350;
const CLOUD_RUN_MS = 1600;
const CLOUD_TIMEOUT_MS = 1500;

// `!` is needed because ArabicText's default text colors win over plain color utilities.
const TONE_CLASS: Record<Tone, string> = {
  good: 'text-emerald-700 dark:text-emerald-400',
  warn: 'text-amber-800 dark:text-amber-400',
  bad: 'text-rose-700 dark:text-rose-400',
  neutral: '',
};

interface Cell {
  text: string;
  tone: Tone;
}

interface ComparisonRow {
  id: string;
  criterion: string;
  edge: Cell;
  cloud: Cell;
}

const COMPARISON: ComparisonRow[] = [
  {
    id: 'latency',
    criterion: 'زمن الاستجابة (Latency)',
    edge: { text: 'قليل جدًا، القرار بيتاخد جنب الجهاز مباشرة', tone: 'good' },
    cloud: { text: 'أعلى، وبيتغير حسب سرعة النت والمسافة للسيرفر', tone: 'warn' },
  },
  {
    id: 'bandwidth',
    criterion: 'استهلاك الإنترنت (Bandwidth)',
    edge: { text: 'قليل، بيعالج البيانات محليًا ويبعت الملخص بس', tone: 'good' },
    cloud: { text: 'عالي، كل البيانات الخام بتتبعت للسحابة', tone: 'warn' },
  },
  {
    id: 'offline',
    criterion: 'الشغل من غير إنترنت (Offline Resilience)',
    edge: { text: 'بيشتغل عادي حتى لو النت قطع', tone: 'good' },
    cloud: { text: 'لو النت قطع السيستم يقف', tone: 'bad' },
  },
  {
    id: 'compute',
    criterion: 'قوة المعالجة (Compute Power)',
    edge: { text: 'محدودة، زي ESP32 أو Raspberry Pi', tone: 'warn' },
    cloud: { text: 'عالية جدًا وقابلة للتوسع، مناسبة لـ Big Data وموديلات AI', tone: 'good' },
  },
  {
    id: 'privacy',
    criterion: 'الخصوصية (Privacy)',
    edge: { text: 'أعلى، البيانات الحساسة بتفضل جوه المصنع', tone: 'good' },
    cloud: { text: 'محتاجة تشفير وصلاحيات، لأن البيانات بتخرج برا المصنع', tone: 'warn' },
  },
  {
    id: 'best-for',
    criterion: 'الاستخدام الأمثل (Best For)',
    edge: { text: 'قرارات لحظية حرجة (Mission-Critical) زي الحريق والفرامل', tone: 'neutral' },
    cloud: { text: 'تحليل Big Data وتدريب نماذج AI', tone: 'neutral' },
  },
];

const ACTIVE_COL = 'bg-amber-50/70 dark:bg-amber-950/20';

export const EdgeVsCloudLab: React.FC = () => {
  const [mode, setMode] = useState<Mode>('edge');
  const [temperature, setTemperature] = useState<number>(INITIAL_TEMP_C);
  const [internetConnected, setInternetConnected] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [sprinklerActive, setSprinklerActive] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [failed, setFailed] = useState<boolean>(false);
  const [runMessage, setRunMessage] = useState<string | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const fireActive = temperature >= FIRE_THRESHOLD_C;

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  };

  useEffect(() => () => clearTimers(), []);

  // Clears the last run's result (and any pending timers) without touching inputs.
  const clearRun = () => {
    clearTimers();
    setIsProcessing(false);
    setSprinklerActive(false);
    setLatencyMs(null);
    setFailed(false);
    setRunMessage(null);
  };

  const changeMode = (next: Mode) => {
    if (next === mode) return;
    clearRun();
    setMode(next);
  };

  const changeTemperature = (value: number) => {
    clearRun();
    setTemperature(value);
  };

  const toggleInternet = () => {
    clearRun();
    setInternetConnected((prev) => !prev);
  };

  const triggerEmergency = () => {
    if (isProcessing || !fireActive) return;
    clearRun();
    setIsProcessing(true);

    if (mode === 'edge') {
      setRunMessage(`⚡ الحرارة وصلت ${temperature} درجة مئوية، والـ Edge Gateway اللي جنب الحساس بيحلل القراءة محليًا...`);
      schedule(() => {
        setLatencyMs(EDGE_LATENCY_MS);
        setSprinklerActive(true);
        setIsProcessing(false);
        setRunMessage(`✅ الرشاش اشتغل بعد ${EDGE_LATENCY_MS}ms بس! القرار اتاخد جنب الحساس من غير ما يحتاج إنترنت أصلًا.`);
      }, EDGE_RUN_MS);
      return;
    }

    if (!internetConnected) {
      setRunMessage('📡 الـ Gateway بيحاول يبعت القراءة للسحابة (Cloud) وبيستنى رد...');
      schedule(() => {
        setFailed(true);
        setIsProcessing(false);
        setRunMessage(
          `❌ فشل كامل! الإنترنت فاصل، فالقراءة معرفتش توصل للسحابة ولا أمر إطفاء رجع. المصنع بيولع (${temperature} درجة مئوية) والرشاش لسه مقفول، وده خطر الاعتماد على الـ Cloud في الأنظمة اللحظية (Real-time).`
        );
      }, CLOUD_TIMEOUT_MS);
      return;
    }

    setRunMessage('🌐 القراءة طالعة للسحابة (AWS/Azure)... Routing وتشفير، والسيرفر بيحلل ويرجّع أمر الإطفاء.');
    schedule(() => {
      setLatencyMs(CLOUD_LATENCY_MS);
      setSprinklerActive(true);
      setIsProcessing(false);
      setRunMessage(
        `✅ أمر الإطفاء وصل من الـ Cloud بعد حوالي ${CLOUD_LATENCY_MS}ms. الرشاش اشتغل، بس التأخير أكبر بكتير من الـ Edge (${EDGE_LATENCY_MS}ms).`
      );
    }, CLOUD_RUN_MS);
  };

  const handleReset = () => {
    clearRun();
    setMode('edge');
    setTemperature(INITIAL_TEMP_C);
    setInternetConnected(true);
  };

  const idleNarrative = fireActive
    ? `الحرارة وصلت ${temperature} درجة مئوية، يعني فيه حريق! دوس على «شغّل سيناريو الحريق» وشوف الفرق بين Edge و Cloud.`
    : `الحالة طبيعية (${temperature} درجة مئوية). ارفع الحرارة لـ ${FIRE_THRESHOLD_C} درجة مئوية أو أكتر عشان يحصل إنذار حريق، وبعدها شوف مين هيستجيب أسرع.`;
  const narrative = runMessage ?? idleNarrative;

  const latencyLabel = isProcessing
    ? 'Latency: measuring…'
    : failed
    ? 'Timeout: no response'
    : latencyMs === null
    ? 'Latency: —'
    : `Latency: ~${latencyMs} ms`;

  const modeButtonClass = (active: boolean) =>
    `flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-sm font-bold transition-all disabled:cursor-not-allowed ${
      active
        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
        : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-50'
    }`;

  const nodeBase = 'w-full max-w-xs lg:w-44 lg:max-w-none lg:shrink-0 p-4 rounded-2xl border-2 transition-all text-center space-y-1.5';
  const pathBase = 'w-full max-w-xs lg:max-w-none lg:flex-1 flex flex-col items-center justify-center gap-1.5 lg:px-2';

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Cpu className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Edge vs Cloud Computing Tradeoff Lab
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                جرّب بنفسك الفرق بين المعالجة الطرفية (Edge) والحوسبة السحابية (Cloud) في إنترنت الأشياء
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div
          role="group"
          aria-label="Processing mode"
          className="bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl flex items-center gap-1 border border-beige-300 dark:border-stone-700"
        >
          <button
            type="button"
            onClick={() => changeMode('edge')}
            disabled={isProcessing}
            aria-pressed={mode === 'edge'}
            className={modeButtonClass(mode === 'edge')}
          >
            <span dir="rtl" className="font-arabic">معالجة محلية (Edge) ⚡</span>
          </button>
          <button
            type="button"
            onClick={() => changeMode('cloud')}
            disabled={isProcessing}
            aria-pressed={mode === 'cloud'}
            className={modeButtonClass(mode === 'cloud')}
          >
            <span dir="rtl" className="font-arabic">معالجة سحابية (Cloud) ☁️</span>
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 p-4 rounded-2xl border border-beige-300 dark:border-stone-800 flex flex-wrap items-end justify-between gap-4 text-sm">
        {/* Temperature Slider */}
        <div className="w-full sm:w-72 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <ArabicText as="span" className="font-bold text-sm">درجة الحرارة (Sensor Reading)</ArabicText>
            <span
              className={`font-mono font-bold text-sm ${
                fireActive ? 'text-rose-600 dark:text-rose-400 animate-pulse' : 'text-stone-800 dark:text-stone-200'
              }`}
            >
              {temperature}°C
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={100}
            value={temperature}
            disabled={isProcessing}
            onChange={(e) => changeTemperature(Number(e.target.value))}
            aria-label="Temperature (°C)"
            className="w-full accent-amber-600 dark:accent-amber-500 disabled:opacity-50"
          />
          <ArabicText
            className={`text-xs ${
              fireActive ? 'font-bold text-rose-700 dark:text-rose-400' : 'text-sky-800 dark:text-sky-300'
            }`}
          >
            {fireActive
              ? `🔥 حريق! الحرارة عدّت ${FIRE_THRESHOLD_C} درجة مئوية`
              : `💡 الحرارة لازم توصل ${FIRE_THRESHOLD_C} درجة مئوية عشان سيناريو الحريق يشتغل`}
          </ArabicText>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Internet Toggle (Cloud mode only) */}
          {mode === 'cloud' && (
            <button
              type="button"
              onClick={toggleInternet}
              disabled={isProcessing}
              aria-pressed={internetConnected}
              title={internetConnected ? 'اضغط لقطع الإنترنت' : 'اضغط لإرجاع الإنترنت'}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold border text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                internetConnected
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-800'
              }`}
            >
              {internetConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4 animate-pulse" />}
              <span dir="rtl" className="font-arabic">{internetConnected ? 'الإنترنت شغال' : 'الإنترنت مقطوع'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={triggerEmergency}
            disabled={isProcessing || !fireActive}
            title={fireActive ? undefined : `ارفع الحرارة لـ ${FIRE_THRESHOLD_C} درجة مئوية الأول`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white font-bold text-sm shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Flame className="w-4 h-4" />
            <span dir="rtl" className="font-arabic">شغّل سيناريو الحريق</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-beige-100 hover:bg-beige-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-sm border border-beige-300 dark:border-stone-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span dir="rtl" className="font-arabic">إعادة ضبط</span>
          </button>
        </div>
      </div>

      {/* Visual Simulation Architecture */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
        {/* Step 1: Physical Sensor Unit */}
        <div
          className={`${nodeBase} ${
            fireActive
              ? 'border-rose-500 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/40'
              : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center mx-auto text-amber-800 dark:text-amber-300">
            <Thermometer className="w-5 h-5" />
          </div>
          <span className="font-mono text-xs font-bold block text-stone-900 dark:text-stone-100">Temperature Sensor</span>
          <ArabicText className="text-xs text-stone-600 dark:text-zinc-400 text-center">حساس الحرارة في المصنع</ArabicText>
          <span
            className={`font-mono text-sm font-bold block ${
              fireActive ? 'text-rose-700 dark:text-rose-400' : 'text-amber-800 dark:text-amber-300'
            }`}
          >
            {temperature}°C
          </span>
        </div>

        {/* Path Indicator */}
        <div className={pathBase}>
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 text-center">
            {mode === 'edge' ? 'Local Bus (I2C / SPI)' : 'WAN / Cellular → Cloud API'}
          </span>
          <div className="w-full h-1.5 bg-beige-200 dark:bg-stone-800 rounded-full overflow-hidden">
            {isProcessing && <div className="h-full w-1/3 bg-amber-500 rounded-full animate-[packetMove_1.2s_infinite]" />}
            {failed && <div className="h-full w-1/3 bg-rose-500 rounded-full" />}
          </div>
          <span
            className={`text-xs font-mono font-bold text-center ${
              failed ? 'text-rose-700 dark:text-rose-400' : 'text-amber-800 dark:text-amber-400'
            }`}
            aria-live="polite"
          >
            {latencyLabel}
          </span>
        </div>

        {/* Step 2: Processing Engine (Edge or Cloud) */}
        <div
          className={`${nodeBase} ${
            mode === 'edge'
              ? 'border-emerald-500 bg-emerald-50/60 dark:border-emerald-600 dark:bg-emerald-950/40'
              : internetConnected
              ? 'border-sky-500 bg-sky-50/60 dark:border-sky-600 dark:bg-sky-950/40'
              : 'border-rose-500 bg-rose-50 dark:border-rose-600 dark:bg-rose-950/40'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center mx-auto">
            {mode === 'edge' ? (
              <Cpu className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            ) : (
              <Cloud className="w-5 h-5 text-sky-700 dark:text-sky-400" />
            )}
          </div>
          <span className="font-mono text-xs font-bold block text-stone-900 dark:text-stone-100">
            {mode === 'edge' ? 'Edge Gateway' : 'Cloud Data Center'}
          </span>
          <ArabicText className="text-xs text-stone-600 dark:text-zinc-400 text-center">
            {mode === 'edge' ? 'معالج محلي جنب الجهاز (ESP32 أو Raspberry Pi)' : 'سيرفرات بعيدة في Data Center'}
          </ArabicText>
          <span className="px-2.5 py-1 rounded text-xs font-bold font-mono inline-block bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200">
            {mode === 'edge' ? 'Local Rule Engine' : internetConnected ? 'Heavy AI / Big Data' : 'Unreachable'}
          </span>
        </div>

        {/* Path to Actuator */}
        <div className={pathBase}>
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 text-center">Relay Control Line</span>
          <div className="w-full h-1.5 bg-beige-200 dark:bg-stone-800 rounded-full overflow-hidden">
            {sprinklerActive && <div className="h-full bg-emerald-500 rounded-full" />}
          </div>
        </div>

        {/* Step 3: Actuator / Water Sprinkler */}
        <div
          className={`${nodeBase} ${
            sprinklerActive
              ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/50 shadow-md'
              : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto">
            <Droplets
              className={`w-5 h-5 ${
                sprinklerActive ? 'text-emerald-700 dark:text-emerald-400 animate-bounce' : 'text-stone-500 dark:text-zinc-500'
              }`}
            />
          </div>
          <span className="font-mono text-xs font-bold block text-stone-900 dark:text-stone-100">Fire Sprinkler Relay</span>
          <ArabicText className="text-xs text-stone-600 dark:text-zinc-400 text-center">رشاش مياه الإطفاء الآلي</ArabicText>
          <ArabicText
            className={`text-xs font-bold text-center ${
              sprinklerActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-stone-600 dark:text-zinc-400'
            }`}
          >
            {sprinklerActive ? '💧 الرشاش شغال' : '⏸️ مقفول ومستني الأمر'}
          </ArabicText>
        </div>
      </div>

      {/* Egyptian Narrative Box */}
      <div
        aria-live="polite"
        className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-1.5"
      >
        <ArabicText as="div" className="text-sm font-bold text-amber-900 dark:text-amber-300">
          ⚡ بيحصل إيه دلوقتي (Live Narration)
        </ArabicText>
        <ArabicText className="text-sm font-medium text-stone-900">{narrative}</ArabicText>
      </div>

      {/* Comparison Exam Table */}
      <div className="border border-beige-300 dark:border-stone-800 rounded-2xl overflow-hidden text-sm" dir="rtl">
        <div className="bg-beige-100 dark:bg-stone-800 px-4 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <ArabicText as="span" className="font-bold text-stone-900 dark:text-stone-100">
            مقارنة الامتحان (Edge vs Cloud)
          </ArabicText>
          <ArabicText as="span" className="text-xs text-stone-600 dark:text-zinc-400">
            سؤال مقالي بيتكرر في امتحانات الدكتورة
          </ArabicText>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] dark:bg-stone-950 border-b border-beige-300 dark:border-stone-800">
                <th scope="col" className="w-1/4 px-3 py-2.5 text-right">
                  <ArabicText as="span" className="text-xs font-bold text-stone-900 dark:text-stone-100">المعيار (Criterion)</ArabicText>
                </th>
                <th scope="col" className={`px-3 py-2.5 text-right ${mode === 'edge' ? ACTIVE_COL : ''}`}>
                  <ArabicText as="span" className="text-xs font-bold text-stone-900 dark:text-stone-100">المعالجة الطرفية (Edge)</ArabicText>
                </th>
                <th scope="col" className={`px-3 py-2.5 text-right ${mode === 'cloud' ? ACTIVE_COL : ''}`}>
                  <ArabicText as="span" className="text-xs font-bold text-stone-900 dark:text-stone-100">الحوسبة السحابية (Cloud)</ArabicText>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-beige-200 dark:border-stone-800 bg-white dark:bg-stone-900 even:bg-[#FAF7F2] dark:even:bg-stone-950"
                >
                  <th scope="row" className="px-3 py-3 align-top text-right">
                    <ArabicText as="span" className="text-sm font-bold text-stone-900 dark:text-stone-100">{row.criterion}</ArabicText>
                  </th>
                  <td className={`px-3 py-3 align-top text-right ${mode === 'edge' ? ACTIVE_COL : ''}`}>
                    <ArabicText className={`text-sm font-medium ${TONE_CLASS[row.edge.tone]}`}>{row.edge.text}</ArabicText>
                  </td>
                  <td className={`px-3 py-3 align-top text-right ${mode === 'cloud' ? ACTIVE_COL : ''}`}>
                    <ArabicText className={`text-sm font-medium ${TONE_CLASS[row.cloud.tone]}`}>{row.cloud.text}</ArabicText>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

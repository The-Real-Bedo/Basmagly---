import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Play } from 'lucide-react';
import { ArabicText } from '../ArabicText';

interface Scenario {
  id: string;
  name: string;
  nameAr: string;
  shortLabel: string;
  shortLabelAr: string;
  metric: string;
  unit: string;
  unitAr: string;
  defaultVal: number;
  min: number;
  max: number;
  threshold: number;
  thresholdType: 'above' | 'below';
  thresholdText: string;
  thresholdTextAr: string;
  actuatorAction: string;
  actuatorActionAr: string;
  networkType: string;
}

interface StatusLog {
  en: string;
  ar: string;
}

// Arabic strings spell units out because "%" and "°" flip next to numbers in RTL text.
const SCENARIOS: Scenario[] = [
  {
    id: 'agriculture',
    name: 'Smart Agriculture (Soil Monitoring)',
    nameAr: 'الزراعة الذكية ومراقبة رطوبة التربة',
    shortLabel: 'Smart Agriculture',
    shortLabelAr: 'الزراعة الذكية',
    metric: 'Soil Moisture Level',
    unit: '%',
    unitAr: 'في المية',
    defaultVal: 18,
    min: 0,
    max: 100,
    threshold: 25,
    thresholdType: 'below',
    thresholdText: 'Moisture < 25%',
    thresholdTextAr: 'الرطوبة أقل من 25 في المية',
    actuatorAction: 'Activate drip irrigation pump and smart solenoid valves.',
    actuatorActionAr: 'مضخة الري بالتنقيط والصمامات الذكية اشتغلت فورًا 💧',
    networkType: 'LoRaWAN / Cellular',
  },
  {
    id: 'smarthome',
    name: 'Smart Home (Climate & Energy)',
    nameAr: 'المنزل الذكي وضبط المناخ والطاقة',
    shortLabel: 'Smart Home',
    shortLabelAr: 'المنزل الذكي',
    metric: 'Room Temperature',
    unit: '°C',
    unitAr: 'درجة مئوية',
    defaultVal: 31,
    min: 15,
    max: 45,
    threshold: 28,
    thresholdType: 'above',
    thresholdText: 'Temperature > 28°C',
    thresholdTextAr: 'الحرارة أكتر من 28 درجة مئوية',
    actuatorAction: 'Engage inverter cooling compressor and adjust smart louvers.',
    actuatorActionAr: 'ضاغط التكييف اشتغل وفتحات التهوية الذكية اتظبطت ❄️',
    networkType: 'Zigbee / Wi-Fi 6',
  },
  {
    id: 'safety',
    name: 'Industrial Fire & Gas Safety',
    nameAr: 'السلامة الصناعية وكشف الغاز والدخان',
    shortLabel: 'Industrial Safety',
    shortLabelAr: 'السلامة الصناعية',
    metric: 'Smoke & Gas Density',
    unit: 'PPM',
    unitAr: 'PPM',
    defaultVal: 130,
    min: 0,
    max: 300,
    threshold: 100,
    thresholdType: 'above',
    thresholdText: 'Density > 100 PPM',
    thresholdTextAr: 'التركيز أكتر من 100 PPM',
    actuatorAction: 'Sound sirens, unlock emergency fire doors, and notify dispatch.',
    actuatorActionAr: 'صفارات الإنذار اشتغلت وأبواب الطوارئ اتفتحت والدفاع المدني اتبلّغ 🚨',
    networkType: '5G Low-Latency',
  },
];

const IDLE_LOG: StatusLog = {
  en: 'System idle. Adjust the reading, then execute the pipeline.',
  ar: 'النظام جاهز. حرّك القراءة وبعدين شغّل الدورة.',
};

const READING_CHANGED_LOG: StatusLog = {
  en: 'Reading updated. Execute the pipeline to see the new result.',
  ar: 'القراءة اتغيّرت. شغّل الدورة وشوف النتيجة الجديدة.',
};

const STEP_DELAYS_MS = [700, 1400, 2100] as const;

interface StageCardProps {
  n: number;
  title: string;
  caption: string;
  current: boolean;
  highlighted?: boolean;
  children: React.ReactNode;
}

const StageCard: React.FC<StageCardProps> = ({ n, title, caption, current, highlighted = false, children }) => (
  <li
    className={`p-4 rounded-2xl border space-y-2 text-center transition-all ${
      highlighted
        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700 shadow-sm'
        : 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-300 dark:border-stone-800'
    } ${current ? 'ring-2 ring-amber-400 dark:ring-amber-500' : ''}`}
  >
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-beige-200 dark:bg-stone-800 font-mono text-xs font-bold text-stone-800 dark:text-stone-200">
      {n}
    </span>
    <ArabicText className="text-sm font-bold text-center text-stone-900 dark:text-stone-100">{title}</ArabicText>
    {children}
    <ArabicText className="text-xs text-center text-stone-600 dark:text-zinc-400">{caption}</ArabicText>
  </li>
);

const CHIP_BASE = 'inline-block max-w-full px-2.5 py-1 rounded-lg text-xs font-bold border';
const CHIP_NEUTRAL =
  'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-700 text-stone-900 dark:text-stone-100';

export const IotPipelineSimulator: React.FC = () => {
  const [selectedSc, setSelectedSc] = useState<Scenario>(SCENARIOS[0]);
  const [val, setVal] = useState<number>(SCENARIOS[0].defaultVal);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [statusLog, setStatusLog] = useState<StatusLog>(IDLE_LOG);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isTriggered = selectedSc.thresholdType === 'below'
    ? val < selectedSc.threshold
    : val > selectedSc.threshold;

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  };

  useEffect(() => () => clearTimers(), []);

  const handleSelectScenario = (sc: Scenario) => {
    if (isProcessing) return;
    clearTimers();
    setSelectedSc(sc);
    setVal(sc.defaultVal);
    setStage(0);
    setStatusLog({
      en: `Switched to ${sc.name}. Ready to execute.`,
      ar: `اخترت سيناريو ${sc.nameAr}. دوس على «شغّل الدورة» وشوف اللي هيحصل.`,
    });
  };

  const handleValChange = (next: number) => {
    setVal(next);
    if (stage !== 0) {
      setStage(0);
      setStatusLog(READING_CHANGED_LOG);
    }
  };

  const runPipeline = () => {
    if (isProcessing) return;
    clearTimers();

    // Snapshot the inputs so every log line matches what the user saw at click time.
    const sc = selectedSc;
    const reading = val;
    const triggered = isTriggered;
    const networkAr = sc.networkType.replace(' / ', ' أو ');

    setIsProcessing(true);
    setStage(1);
    setStatusLog({
      en: `[Step 1: Sense] Sensor measured ${reading} ${sc.unit} and converted it into a digital signal.`,
      ar: `المرحلة 1 (Sense): الحساس قاس ${reading} ${sc.unitAr} وحوّل القياس لإشارة رقمية.`,
    });

    schedule(() => {
      setStage(2);
      setStatusLog({
        en: `[Step 2: Transmit] Packet sent over ${sc.networkType} to the IoT gateway, then published to the cloud via MQTT.`,
        ar: `المرحلة 2 (Transmit): القراءة بتتبعت عبر ${networkAr} للـ Gateway، ومنه للسحابة بـ MQTT.`,
      });
    }, STEP_DELAYS_MS[0]);

    schedule(() => {
      setStage(3);
      setStatusLog({
        en: `[Step 3: Analyze] Rule: ${sc.thresholdText}. Current reading: ${reading} ${sc.unit}. Result: ${triggered ? 'TRIGGERED' : 'NORMAL'}.`,
        ar: `المرحلة 3 (Analyze): الشرط ${sc.thresholdTextAr}، والقراءة الحالية ${reading} ${sc.unitAr}. النتيجة: ${triggered ? 'الشرط اتحقق' : 'الوضع طبيعي'}.`,
      });
    }, STEP_DELAYS_MS[1]);

    schedule(() => {
      setStage(4);
      setIsProcessing(false);
      setStatusLog(
        triggered
          ? {
              en: `[Step 4: Act] Action dispatched: ${sc.actuatorAction}`,
              ar: `المرحلة 4 (Act): ${sc.actuatorActionAr}`,
            }
          : {
              en: '[Step 4: Act] Reading within limits. Actuator stays in standby.',
              ar: 'المرحلة 4 (Act): القراءة في النطاق الطبيعي، فالمشغّل فضل في وضع الانتظار (Standby).',
            }
      );
    }, STEP_DELAYS_MS[2]);
  };

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
                IoT End-to-End Pipeline Simulator
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                شغّل رحلة البيانات الكاملة في إنترنت الأشياء (IoT) من القراءة لحد التنفيذ، وشوف القرار بيتاخد إزاي في كل مرحلة
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Scenario Switcher */}
        <div
          role="group"
          aria-label="Scenario"
          className="flex flex-wrap items-center gap-1 bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl border border-beige-300 dark:border-stone-700"
        >
          {SCENARIOS.map((sc) => {
            const isSelected = selectedSc.id === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScenario(sc)}
                disabled={isProcessing}
                aria-pressed={isSelected}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-sm font-bold transition-all disabled:cursor-not-allowed ${
                  isSelected
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                    : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-50'
                }`}
              >
                <span dir="rtl" className="font-arabic">{`${sc.shortLabelAr} (${sc.shortLabel})`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sensor Input Slider */}
      <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <span className="text-xs font-mono font-bold text-stone-600 dark:text-zinc-400 uppercase tracking-wider block">
              Active Transducer / Sensor
            </span>
            <h4 className="font-bold text-base text-stone-900 dark:text-stone-100">{selectedSc.name}</h4>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{selectedSc.nameAr}</ArabicText>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-stone-600 dark:text-zinc-400 block">{selectedSc.metric}</span>
            <span
              className={`font-mono text-2xl font-extrabold ${
                isTriggered ? 'text-amber-800 dark:text-amber-400' : 'text-stone-800 dark:text-stone-200'
              }`}
            >
              {val} {selectedSc.unit}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <ArabicText as="span" className="text-sm font-medium text-stone-600 dark:text-zinc-400">
              حرّك المؤشر عشان تغيّر قراءة الحساس (Sensor Reading)
            </ArabicText>
            <span className="inline-flex flex-wrap items-center gap-2">
              <ArabicText as="span" className="text-sm font-medium text-stone-600 dark:text-zinc-400">
                شرط التفعيل (Rule)
              </ArabicText>
              <span
                className={`px-2 py-0.5 rounded-md border font-mono text-xs font-bold ${
                  isTriggered
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                    : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-zinc-200 border-beige-300 dark:border-stone-700'
                }`}
              >
                {selectedSc.thresholdText}
              </span>
            </span>
          </div>
          <input
            type="range"
            min={selectedSc.min}
            max={selectedSc.max}
            value={val}
            disabled={isProcessing}
            onChange={(e) => handleValChange(parseInt(e.target.value, 10))}
            aria-label={selectedSc.metric}
            className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-700 dark:accent-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex justify-between font-mono text-xs text-stone-600 dark:text-zinc-400">
            <span>{selectedSc.min} {selectedSc.unit}</span>
            <span>{selectedSc.max} {selectedSc.unit}</span>
          </div>
        </div>
      </div>

      {/* 4 Pipeline Stages: Sense -> Transmit -> Analyze -> Act */}
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StageCard
          n={1}
          title="الاستشعار (Sense)"
          caption="الحساس بيرصد القراءة الفيزيائية ويحوّلها لإشارة رقمية"
          current={stage === 1}
        >
          <span className={`${CHIP_BASE} font-mono ${CHIP_NEUTRAL}`}>{val} {selectedSc.unit}</span>
        </StageCard>

        <StageCard
          n={2}
          title="النقل (Transmit)"
          caption="القراءة بتتبعت عبر الشبكة للـ Gateway، ومنه للسحابة بـ MQTT"
          current={stage === 2}
        >
          <span className={`${CHIP_BASE} font-mono ${CHIP_NEUTRAL}`}>{selectedSc.networkType}</span>
        </StageCard>

        <StageCard
          n={3}
          title="التحليل (Analyze)"
          caption="السحابة أو الـ Edge بتقارن القراءة بالشرط وتاخد القرار"
          current={stage === 3}
        >
          <span
            dir="rtl"
            className={`${CHIP_BASE} font-arabic ${
              isTriggered
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                : CHIP_NEUTRAL
            }`}
          >
            {isTriggered ? 'الشرط اتحقق (Triggered)' : 'طبيعي (Normal)'}
          </span>
        </StageCard>

        <StageCard
          n={4}
          title="التنفيذ (Act)"
          caption="المشغّل (Actuator) بينفّذ الفعل الحقيقي في الواقع"
          current={stage === 4}
          highlighted={isTriggered}
        >
          <span
            dir="rtl"
            className={`${CHIP_BASE} font-arabic ${
              isTriggered
                ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100'
                : 'border-beige-300 dark:border-stone-700 text-stone-600 dark:text-zinc-400'
            }`}
          >
            {isTriggered ? 'المشغّل شغال (Active)' : 'مستني (Standby)'}
          </span>
        </StageCard>
      </ol>

      {/* Terminal Output: `dark` keeps ArabicText's inline English terms readable on the always-dark panel. */}
      <div className="dark bg-stone-950 text-stone-100 p-5 rounded-2xl border border-stone-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono text-zinc-400">IoT Bus Telemetry Trace</span>
          <button
            type="button"
            onClick={runPipeline}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-white text-stone-900 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-sm"
          >
            <Play className="w-3.5 h-3.5" />
            <span dir="rtl" className="font-arabic">
              {isProcessing ? 'بيشتغل...' : 'شغّل الدورة (Execute Pipeline)'}
            </span>
          </button>
        </div>

        <div className="border-t border-stone-800 pt-2.5 space-y-1" aria-live="polite">
          <p className="font-mono text-sm text-zinc-200">{statusLog.en}</p>
          <ArabicText className="text-sm text-zinc-300">{statusLog.ar}</ArabicText>
        </div>
      </div>
    </div>
  );
};

export default IotPipelineSimulator;

import React, { useState } from 'react';
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
  defaultVal: number;
  min: number;
  max: number;
  threshold: number;
  thresholdType: 'above' | 'below';
  thresholdText: string;
  actuatorAction: string;
  actuatorActionAr: string;
  networkType: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'agriculture',
    name: 'Smart Agriculture (Soil Monitoring)',
    nameAr: 'الزراعة الذكية ومراقبة رطوبة التربة',
    shortLabel: 'Smart Agriculture',
    shortLabelAr: 'الزراعة الذكية',
    metric: 'Soil Moisture Level',
    unit: '%',
    defaultVal: 18,
    min: 0,
    max: 100,
    threshold: 25,
    thresholdType: 'below',
    thresholdText: 'Moisture < 25%',
    actuatorAction: 'Activate drip irrigation water pump & smart solenoids.',
    actuatorActionAr: 'تشغيل مضخة الري بالتنقيط وصمامات المياه الذكية فوراً 💧',
    networkType: 'LoRaWAN / Cellular'
  },
  {
    id: 'smarthome',
    name: 'Smart Climate & Energy',
    nameAr: 'المنازل الذكية وضبط المناخ والطاقة',
    shortLabel: 'Smart Home',
    shortLabelAr: 'المنزل الذكي',
    metric: 'Room Temperature',
    unit: '°C',
    defaultVal: 31,
    min: 15,
    max: 45,
    threshold: 28,
    thresholdType: 'above',
    thresholdText: 'Temperature > 28°C',
    actuatorAction: 'Engage inverter cooling compressor and adjust smart louvers.',
    actuatorActionAr: 'تشغيل مكيف الهواء وخفض فتحات التهوية الذكية ❄️',
    networkType: 'Zigbee / Wi-Fi 6'
  },
  {
    id: 'safety',
    name: 'Industrial Fire Safety',
    nameAr: 'السلامة الصناعية وكشف الغاز والدخان',
    shortLabel: 'Industrial Safety',
    shortLabelAr: 'السلامة الصناعية',
    metric: 'Smoke & Gas Density',
    unit: 'PPM',
    defaultVal: 130,
    min: 0,
    max: 300,
    threshold: 100,
    thresholdType: 'above',
    thresholdText: 'Density > 100 PPM',
    actuatorAction: 'Sound sirens, unlock emergency fire doors, and notify dispatch.',
    actuatorActionAr: 'إطلاق صفارات الإنذار وفتح مخارج الطوارئ وإخطار الدفاع المدني 🚨',
    networkType: '5G Low-Latency'
  }
];

export const IotPipelineSimulator: React.FC = () => {
  const [selectedSc, setSelectedSc] = useState<Scenario>(SCENARIOS[0]);
  const [val, setVal] = useState<number>(selectedSc.defaultVal);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusLog, setStatusLog] = useState<{ en: string; ar: string }>({
    en: 'System idle and reading telemetry...',
    ar: 'النظام في وضع الاستعداد ورصد القراءات الحية...'
  });

  const isTriggered = selectedSc.thresholdType === 'below'
    ? val < selectedSc.threshold
    : val > selectedSc.threshold;

  const handleSelectScenario = (sc: Scenario) => {
    setSelectedSc(sc);
    setVal(sc.defaultVal);
    setStatusLog({
      en: `Switched to ${sc.name}. Waiting for telemetry execution.`,
      ar: `تم التحويل إلى ${sc.nameAr}. في انتظار تشغيل الدورة.`
    });
  };

  const runPipeline = () => {
    setIsProcessing(true);
    setStatusLog({
      en: `[Step 1: Sensor] Physical phenomenon converted into digital telemetry (${val} ${selectedSc.unit}).`,
      ar: `[المرحلة 1: المستشعر] التقاط القراءة الفيزيائية وتحويلها إلى قيمة رقمية.`
    });

    setTimeout(() => {
      setStatusLog({
        en: `[Step 2: Network] Transmitting telemetry packet over ${selectedSc.networkType} to IoT gateway...`,
        ar: `[المرحلة 2: الشبكة] نقل الحزمة عبر ${selectedSc.networkType} إلى بوابة السحابة...`
      });
    }, 700);

    setTimeout(() => {
      setStatusLog({
        en: `[Step 3: Cloud Processing] Rule evaluated: ${selectedSc.thresholdText}. Status: ${isTriggered ? 'TRIGGERED' : 'NORMAL'}.`,
        ar: `[المرحلة 3: السحابة] تقييم شرط الأمان: ${selectedSc.thresholdText}. الحالة: ${isTriggered ? 'تجاوز الحد' : 'طبيعي'}.`
      });
    }, 1400);

    setTimeout(() => {
      setIsProcessing(false);
      if (isTriggered) {
        setStatusLog({
          en: `[Step 4: Actuator] Action Dispatched: ${selectedSc.actuatorAction}`,
          ar: `[المرحلة 4: المشغل] تم تنفيذ الإجراء المادي: ${selectedSc.actuatorActionAr}`
        });
      } else {
        setStatusLog({
          en: 'All telemetry within safety limits. Actuator stays in sleep mode.',
          ar: 'البيانات ضمن النطاق الآمن، لا حاجة لتدخل المشغلات.'
        });
      }
    }, 2100);
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            <Cpu className="w-5 h-5" />
          </span>
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              IoT End-to-End Pipeline Simulator
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
              محاكي الدورة الثلاثية لإنترنت الأشياء (Sensor ➔ Network ➔ Cloud ➔ Actuator)
            </ArabicText>
          </div>
        </div>

        {/* Bug #6 Fixed: Scenario Switcher with unique, correct labels */}
        <div className="flex flex-wrap items-center gap-1.5 bg-beige-100 dark:bg-stone-800 p-1.5 rounded-2xl border border-beige-300 dark:border-stone-700">
          {SCENARIOS.map(sc => {
            const isSelected = selectedSc.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc)}
                className={`px-3 py-1.5 rounded-xl text-[13px] font-bold transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-700'
                    : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {sc.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sensor Input Slider */}
      <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 uppercase tracking-wider block">
              Active Transducer / Sensor
            </span>
            <h4 className="font-bold text-base text-stone-900 dark:text-stone-100">{selectedSc.name}</h4>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">{selectedSc.nameAr}</ArabicText>
          </div>

          <div className="text-right font-mono shrink-0">
            <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-sans">Telemetry:</span>
            <span className={`text-2xl font-extrabold ${isTriggered ? 'text-amber-700 dark:text-amber-400' : 'text-stone-800 dark:text-stone-200'}`}>
              {val} {selectedSc.unit}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-stone-600 dark:text-zinc-300 font-medium">
            <span>Adjust slider to change environmental reading:</span>
            <span className="font-mono font-bold text-stone-800 dark:text-zinc-200">Critical Rule: {selectedSc.thresholdText}</span>
          </div>
          <input
            type="range"
            min={selectedSc.min}
            max={selectedSc.max}
            value={val}
            onChange={(e) => setVal(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-700 dark:accent-zinc-300"
          />
        </div>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-center">
        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 block">1. SENSORS COLLECT</span>
          <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">Physical to Digital</h5>
          <span className="inline-block px-2.5 py-1 rounded text-[13px] font-mono font-bold bg-white dark:bg-stone-900 border border-beige-200 dark:border-stone-700 text-stone-900 dark:text-stone-100">
            {val} {selectedSc.unit}
          </span>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 pt-1 text-center">
            رصد المتغير الفيزيائي وتحويله لإشارة
          </ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 block">2. CONNECTIVITY TRANSMITS</span>
          <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">Transport Layer</h5>
          <span className="inline-block px-2.5 py-1 rounded text-[13px] font-mono font-bold bg-white dark:bg-stone-900 border border-beige-200 dark:border-stone-700 text-stone-900 dark:text-stone-100">
            {selectedSc.networkType}
          </span>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 pt-1 text-center">
            نقل البيانات عبر الشبكات اللاسلكية
          </ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 block">3. CLOUD / EDGE ANALYZES</span>
          <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">Rule Logic</h5>
          <span className={`inline-block px-2.5 py-1 rounded text-[13px] font-bold border ${
            isTriggered
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700'
              : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-zinc-300 border-stone-200 dark:border-stone-700'
          }`}>
            {isTriggered ? 'ALERT TRIGGERED' : 'NORMAL RANGE'}
          </span>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 pt-1 text-center">
            تحليل البيانات واتخاذ القرار
          </ArabicText>
        </div>

        <div className={`p-4 rounded-2xl border space-y-1.5 transition-all ${
          isTriggered
            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 shadow-sm'
            : 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-300 dark:border-stone-800'
        }`}>
          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 block">4. ACTUATOR FIRES</span>
          <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">Physical Action</h5>
          <span className={`inline-block px-2.5 py-1 rounded text-[13px] font-bold ${
            isTriggered
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
              : 'text-stone-600 dark:text-zinc-400'
          }`}>
            {isTriggered ? 'ACTUATOR ACTIVE' : 'STANDBY'}
          </span>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 pt-1 text-center">
            تنفيذ الفعل الحقيقي في الواقع
          </ArabicText>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-stone-900 text-stone-100 p-5 rounded-2xl border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-mono text-zinc-400">IoT Bus Telemetry Trace:</span>
          <button
            onClick={runPipeline}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-white text-stone-900 text-sm font-bold transition-all disabled:opacity-50 active:scale-95 shadow-sm"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Execute Pipeline</span>
          </button>
        </div>

        <div className="font-mono text-sm space-y-1 border-t border-stone-800 pt-2.5">
          <p className="text-zinc-200">{statusLog.en}</p>
          <ArabicText className="text-zinc-300 text-sm">
            {statusLog.ar}
          </ArabicText>
        </div>
      </div>
    </div>
  );
};

export default IotPipelineSimulator;

import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';
import React, { useEffect, useRef, useState } from 'react';
import { Activity, Cpu, Factory, LucideIcon, Play, Radio, RotateCcw, Sprout, Thermometer, Zap } from 'lucide-react';
import { ArabicText } from '../ArabicText';

interface Scenario {
  id: string;
  name: string;
  nameAr: string;
  metric: string;
  unit: string;
  defaultValue: number;
  min: number;
  max: number;
  threshold: number;
  comparison: 'below' | 'above';
  network: string;
  action: string;
  actionAr: string;
  icon: LucideIcon;
}

interface BilingualMessage {
  en: string;
  ar: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'agriculture', name: 'Smart agriculture', nameAr: 'الزراعة الذكية', metric: 'Soil moisture', unit: '%',
    defaultValue: 18, min: 0, max: 100, threshold: 25, comparison: 'below', network: 'LoRaWAN / cellular',
    action: 'The irrigation pump and smart valves turn on.', actionAr: 'مضخة الري والصمامات الذكية اشتغلوا.', icon: Sprout,
  },
  {
    id: 'home', name: 'Smart home', nameAr: 'المنزل الذكي', metric: 'Room temperature', unit: '°C',
    defaultValue: 31, min: 15, max: 45, threshold: 28, comparison: 'above', network: 'Zigbee / Wi-Fi',
    action: 'The cooling system turns on.', actionAr: 'نظام التبريد اشتغل.', icon: Thermometer,
  },
  {
    id: 'safety', name: 'Industrial safety', nameAr: 'السلامة الصناعية', metric: 'Smoke and gas density', unit: 'ppm',
    defaultValue: 130, min: 0, max: 300, threshold: 100, comparison: 'above', network: 'Industrial wireless',
    action: 'The alarm sounds and an emergency notification is sent.', actionAr: 'الإنذار اشتغل واتبعث إشعار طوارئ.', icon: Factory,
  },
];

const STAGES = [
  { step: 1, title: 'Collect', titleAr: 'جمع البيانات', detail: 'A sensor samples the physical condition.', detailAr: 'الحساس بياخد قراءة من الحالة الفيزيائية.', icon: Activity },
  { step: 2, title: 'Transmit', titleAr: 'نقل البيانات', detail: 'A network carries the reading to a processor.', detailAr: 'الشبكة بتنقل القراءة لوحدة المعالجة.', icon: Radio },
  { step: 3, title: 'Analyze', titleAr: 'تحليل البيانات', detail: 'Edge or cloud software checks the rule.', detailAr: 'برمجيات الـ Edge أو السحابة بتراجع القاعدة.', icon: Cpu },
  { step: 4, title: 'Act · extension', titleAr: 'التنفيذ · امتداد تعليمي', detail: 'An actuator carries out the decision.', detailAr: 'المشغّل بينفّذ القرار.', icon: Zap },
];

const IDLE_MESSAGE: BilingualMessage = {
  en: 'Choose a scenario, adjust its sensor reading, then run the data flow.',
  ar: 'اختار سيناريو، وغيّر قراءة الحساس، وبعدها شغّل تدفق البيانات.',
};

const STAGE_MESSAGES: Record<number, BilingualMessage> = {
  1: { en: 'Collect: the sensor converts the physical condition into a reading.', ar: 'الجمع: الحساس بيحوّل الحالة الفيزيائية لقراءة.' },
  2: { en: 'Transmit: the reading travels over the selected network.', ar: 'النقل: القراءة بتتنقل عبر الشبكة المختارة.' },
  3: { en: 'Analyze: the processor compares the reading with the scenario rule.', ar: 'التحليل: وحدة المعالجة بتقارن القراءة بقاعدة السيناريو.' },
};

export const IotPipelineSimulator: React.FC = () => {
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [reading, setReading] = useState(SCENARIOS[0].defaultValue);
  const [stage, setStage] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(IDLE_MESSAGE);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const triggered = scenario.comparison === 'below' ? reading < scenario.threshold : reading > scenario.threshold;
  const SensorIcon = scenario.icon;

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const clearRun = (nextMessage: BilingualMessage = IDLE_MESSAGE) => {
    clearTimers();
    setStage(0);
    setHasRun(false);
    setIsProcessing(false);
    setMessage(nextMessage);
  };

  const selectScenario = (next: Scenario) => {
    if (isProcessing) return;
    clearRun();
    setScenario(next);
    setReading(next.defaultValue);
  };

  const runPipeline = () => {
    if (isProcessing) return;
    clearTimers();
    const snapshot = { scenario, reading, triggered };
    setStage(1);
    setHasRun(true);
    setIsProcessing(true);
    setMessage(STAGE_MESSAGES[1]);

    [2, 3].forEach((nextStage, index) => {
      timersRef.current.push(setTimeout(() => {
        setStage(nextStage);
        setMessage(STAGE_MESSAGES[nextStage]);
      }, (index + 1) * 750));
    });
    timersRef.current.push(setTimeout(() => {
      setStage(4);
      setIsProcessing(false);
      setMessage(snapshot.triggered
        ? { en: 'Act: the rule matched. ' + snapshot.scenario.action, ar: 'التنفيذ: الشرط اتحقق. ' + snapshot.scenario.actionAr }
        : { en: 'Act: the reading is within range, so the actuator stays on standby.', ar: 'التنفيذ: القراءة ضمن النطاق، فالمشغّل في وضع الاستعداد.' });
    }, 2250));
  };

  const reset = () => {
    clearRun();
    setReading(scenario.defaultValue);
  };

  const updateReading = (value: number) => {
    clearRun({ en: 'Reading changed. Run the flow to inspect the new result.', ar: 'القراءة اتغيّرت. شغّل التدفق عشان تشوف النتيجة الجديدة.' });
    setReading(value);
  };

  const valuePosition = ((reading - scenario.min) / (scenario.max - scenario.min)) * 100;
  const thresholdPosition = ((scenario.threshold - scenario.min) / (scenario.max - scenario.min)) * 100;
  const SensorGlyph = SensorIcon;

  return (
    <section className="space-y-6 rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="flex flex-col gap-4 border-b border-beige-200 pb-5 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Activity className="h-5 w-5" /></span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">IoT Data-Flow Simulator</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">محاكي تدفق بيانات إنترنت الأشياء من الحساس لحد القرار</ArabicText>
          </div>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select a scenario">
          {SCENARIOS.map((item) => (
            <button key={item.id} type="button" onClick={() => selectScenario(item)} disabled={isProcessing} aria-pressed={scenario.id === item.id}
              className={'rounded-xl border px-3 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ' + (scenario.id === item.id ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-300 dark:hover:border-stone-500')}>
              <span className="block text-sm font-semibold">{item.name}</span>
              <ArabicText className={"text-[13px] " + (scenario.id === item.id ? "text-white dark:text-stone-900" : "text-stone-600 dark:text-zinc-400")}>{item.nameAr}</ArabicText>
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-xl border border-beige-300 bg-white p-2 text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200"><SensorGlyph className="h-5 w-5" /></span>
              <div>
                <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">{scenario.metric}</h4>
                <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{scenario.nameAr}</ArabicText>
              </div>
            </div>
            <output className="shrink-0 font-mono text-2xl font-bold text-stone-900 dark:text-stone-100" aria-live="polite">{reading} {scenario.unit}</output>
          </div>
          <div><label htmlFor="iot-reading" className="block text-sm font-medium text-stone-700 dark:text-zinc-300">Adjust sensor reading</label><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">غيّر قراءة الحساس</ArabicText></div>
          <input id="iot-reading" type="range" min={scenario.min} max={scenario.max} value={reading} disabled={isProcessing}
            onChange={(event) => updateReading(Number(event.target.value))} aria-valuetext={reading + ' ' + scenario.unit}
            className="h-3 w-full cursor-pointer accent-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:accent-stone-200" />
          <div className="relative h-2 rounded-full bg-stone-200 dark:bg-stone-800" aria-hidden="true">
            <div className="absolute inset-y-0 left-0 rounded-full bg-amber-400 dark:bg-amber-500" style={{ width: valuePosition + '%' }} />
            <span className="absolute -top-1 h-4 w-1 rounded-full bg-stone-700 dark:bg-stone-200" style={{ left: thresholdPosition + '%' }} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-stone-600 dark:text-zinc-400">
            <span>{scenario.min} {scenario.unit}</span>
            <span>Rule: {scenario.comparison === 'below' ? '<' : '>'} {scenario.threshold} {scenario.unit}</span>
            <span>{scenario.max} {scenario.unit}</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-beige-300 bg-white p-3 dark:border-stone-800 dark:bg-stone-900">
            <span className={'h-2.5 w-2.5 shrink-0 rounded-full ' + (triggered ? 'bg-amber-500 dark:bg-amber-400' : 'bg-emerald-600 dark:bg-emerald-400')} />
            <div>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{triggered ? 'Rule matched' : 'Reading is in range'}</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{triggered ? 'شرط التفعيل اتحقق' : 'القراءة ضمن النطاق الطبيعي'}</ArabicText>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">Follow the reading</h4>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">تابع القراءة وهي بتعدّي على المراحل</ArabicText>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={runPipeline} disabled={isProcessing}
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white">
                <Play className="h-4 w-4" /> Run flow
              </button>
              <button type="button" onClick={reset} aria-label="Reset simulator" title="Reset simulator"
                className="rounded-xl border border-beige-300 p-2 text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800"><RotateCcw className="h-4 w-4" /></button>
            </div>
          </div>
          <LabWorkbench title="IoT · sensor to action" motionKey={scenario.id+'-'+stage}
 nodes={STAGES.map<WorkbenchNode>((item,index)=>({id:String(item.step),label:item.title,sceneLabel:['Sensor','Link','Rule','Actuator'][index],kind:index===0?'sensor':index===1?'router':index===2?'cloud':scenario.id==='home'?'fan':scenario.id==='agriculture'?'water':'chip',position:[index===0||index===3?-2:2,0,index<2?-1.5:1.5],tone:stage===item.step?'active':stage>item.step?'success':'neutral',value:index===0?reading+scenario.unit:index===3&&stage===4&&hasRun?(triggered?'Activated':'No action'):undefined,detail:item.detail,detailAr:item.detailAr}))}
 links={STAGES.slice(0,-1).map<WorkbenchLink>((item,index)=>({id:'flow-'+index,from:String(item.step),to:String(item.step+1),tone:stage===item.step+1?'active':stage>item.step+1?'success':'neutral',moving:stage===item.step+1}))}>
<ol className="grid gap-3 sm:grid-cols-2">
            {STAGES.map((item) => {
              const Icon = item.icon;
              const active = stage === item.step && isProcessing;
              const complete = hasRun && !isProcessing && stage >= item.step;
              return (
                <li key={item.step} aria-current={active ? 'step' : undefined}
                  className={'relative min-w-0 rounded-2xl border p-4 transition-colors ' + (active ? 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30' : complete ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/20' : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-950')}>
                  <div className="flex items-center gap-3">
                    <span className={'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ' + (active ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200 motion-safe:animate-pulse motion-reduce:animate-none' : complete ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-beige-100 text-stone-700 dark:bg-stone-800 dark:text-zinc-300')}><Icon className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{item.title}</p>
                      <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{item.titleAr}</ArabicText>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-zinc-300">{item.detail}</p>
                  <ArabicText className="text-[13px] leading-relaxed text-stone-600 dark:text-zinc-400">{item.detailAr}</ArabicText>
                  {item.step === 4 && <div className="mt-2 border-t border-beige-200 pt-2 dark:border-stone-800"><p className="text-[13px] text-stone-600 dark:text-zinc-400">The lecture source diagram has three stages; Act is an added feedback extension.</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">رسم المحاضرة فيه ثلاث مراحل؛ ومرحلة التنفيذ امتداد إضافي للتغذية الراجعة.</ArabicText></div>}
                </li>
              );
            })}
          </ol>
</LabWorkbench>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-800 bg-stone-950 p-4 text-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100" aria-live="polite">
        <p className="text-sm leading-relaxed">{message.en}</p>
        <ArabicText className="text-sm leading-relaxed text-zinc-300 dark:text-zinc-300">{message.ar}</ArabicText>
      </div>
    </section>
  );
};

export default IotPipelineSimulator;

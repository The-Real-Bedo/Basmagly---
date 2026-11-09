import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Cloud, Cpu, Droplets, Flame, Play, RotateCcw, Thermometer, Wifi, WifiOff } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type ProcessingMode = 'edge' | 'cloud';
type RunState = 'idle' | 'running' | 'success' | 'failure';

const FIRE_THRESHOLD = 60;
const START_TEMPERATURE = 30;

const COMPARISON = [
  { criterion: 'Response path', criterionAr: 'مسار الاستجابة', edge: 'Decision stays near the device.', edgeAr: 'القرار بيتاخد قريب من الجهاز.', cloud: 'Reading travels to a remote service and back.', cloudAr: 'القراءة بتروح لخدمة بعيدة وبترجع.' },
  { criterion: 'Connectivity', criterionAr: 'الاتصال', edge: 'A local rule can run without internet.', edgeAr: 'القاعدة المحلية ممكن تشتغل من غير إنترنت.', cloud: 'Needs a working route to the cloud service.', cloudAr: 'محتاج مسار شغال لخدمة السحابة.' },
  { criterion: 'Compute and scale', criterionAr: 'المعالجة والتوسع', edge: 'Device resources are limited.', edgeAr: 'موارد الجهاز محدودة.', cloud: 'Remote services can offer more scalable compute.', cloudAr: 'الخدمات البعيدة ممكن توفر معالجة أوسع.' },
  { criterion: 'Data handling', criterionAr: 'التعامل مع البيانات', edge: 'Can keep raw readings local.', edgeAr: 'ممكن يحتفظ بالقراءات الخام محليًا.', cloud: 'Data leaves the device; protect it in transit and at rest.', cloudAr: 'البيانات بتغادر الجهاز؛ لازم تحميها أثناء النقل والتخزين.' },
];

export const EdgeVsCloudLab: React.FC = () => {
  const [mode, setMode] = useState<ProcessingMode>('edge');
  const [temperature, setTemperature] = useState(START_TEMPERATURE);
  const [online, setOnline] = useState(true);
  const [runState, setRunState] = useState<RunState>('idle');
  const [sprinklerActive, setSprinklerActive] = useState(false);
  const [message, setMessage] = useState({ en: 'Set the temperature, choose where the rule runs, and simulate the fire response.', ar: 'اضبط الحرارة، واختار مكان تشغيل القاعدة، وبعدها جرّب الاستجابة للحريق.' });
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const fireDetected = temperature >= FIRE_THRESHOLD;

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const clearResult = () => {
    clearTimers();
    setRunState('idle');
    setSprinklerActive(false);
    setMessage({ en: 'Inputs changed. Run the scenario to see the updated path.', ar: 'المدخلات اتغيّرت. شغّل السيناريو عشان تشوف المسار الجديد.' });
  };

  const reset = () => {
    clearTimers();
    setMode('edge');
    setTemperature(START_TEMPERATURE);
    setOnline(true);
    setRunState('idle');
    setSprinklerActive(false);
    setMessage({ en: 'Simulator reset. Choose a mode and set the sensor reading.', ar: 'المحاكي اتصفّر. اختار الوضع واضبط قراءة الحساس.' });
  };

  const runScenario = () => {
    if (runState === 'running' || !fireDetected) return;
    clearTimers();
    const snapshot = { mode, temperature, online };
    setRunState('running');
    setSprinklerActive(false);
    setMessage(snapshot.mode === 'edge'
      ? { en: 'Sensor detected the example threshold. The local Edge rule is evaluating the reading.', ar: 'الحساس رصد تجاوز الحدّ الافتراضي. قاعدة الـ Edge المحلية بتحلل القراءة.' }
      : { en: 'Sensor reading is being sent to the cloud service for evaluation.', ar: 'قراءة الحساس بتتبعت لخدمة السحابة عشان تحللها.' });

    const playbackDelay = snapshot.mode === 'edge' ? 650 : 950;
    timersRef.current.push(setTimeout(() => {
      if (snapshot.mode === 'cloud' && !snapshot.online) {
        setRunState('failure');
        setSprinklerActive(false);
        setMessage({ en: 'No internet route: the cloud rule cannot return a command, so the sprinkler remains off.', ar: 'مفيش اتصال بالإنترنت: قاعدة السحابة مش هتعرف ترجع أمر، فالرشاش يفضل مطفي.' });
        return;
      }
      setRunState('success');
      setSprinklerActive(true);
      setMessage(snapshot.mode === 'edge'
        ? { en: 'The local rule matched at ' + snapshot.temperature + '°C. The actuator turns on without a cloud round trip.', ar: 'القاعدة المحلية اتحققت عند ' + snapshot.temperature + ' درجة مئوية. المشغّل اشتغل من غير رحلة للسحابة.' }
        : { en: 'The cloud response arrived and the rule matched at ' + snapshot.temperature + '°C. This is a simulated path, not a measured latency.', ar: 'رد السحابة وصل والقاعدة اتحققت عند ' + snapshot.temperature + ' درجة مئوية. ده مسار محاكاة مش قياس فعلي للتأخير.' });
    }, playbackDelay));
  };

  const modeText = mode === 'edge' ? 'Edge processing' : 'Cloud processing';

  return (
    <section className="space-y-6 rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="flex items-start gap-3 border-b border-beige-200 pb-5 dark:border-stone-800">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Cpu className="h-5 w-5" /></span>
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Edge vs. Cloud Decision Lab</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">قارن اتخاذ قرار محلي عند الـ Edge بقرار يعتمد على السحابة</ArabicText>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="space-y-5 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950 sm:p-5">
          <div>
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Where should the rule run?</p><ArabicText className="mb-2 text-[13px] text-stone-600 dark:text-zinc-400">القاعدة هتشتغل فين؟</ArabicText>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Processing location">
              {(['edge', 'cloud'] as const).map((option) => {
                const selected = mode === option;
                const Icon = option === 'edge' ? Cpu : Cloud;
                return <button key={option} type="button" onClick={() => { if (runState === 'running') return; clearResult(); setMode(option); }} disabled={runState === 'running'} aria-pressed={selected}
                  className={'flex min-w-0 items-center gap-2 rounded-xl border p-3 text-left disabled:opacity-50 ' + (selected ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300')}>
                  <Icon className="h-5 w-5 shrink-0" />
                  <span><span className="block text-sm font-semibold">{option === 'edge' ? 'Edge' : 'Cloud'}</span><ArabicText className={"text-[13px] " + (selected ? "text-white dark:text-stone-900" : "text-stone-600 dark:text-zinc-400")}>{option === 'edge' ? 'معالجة محلية' : 'خدمة بعيدة'}</ArabicText></span>
                </button>;
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div><label htmlFor="fire-temperature" className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Sensor temperature</label><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">حرارة الحساس</ArabicText></div>
              <output htmlFor="fire-temperature" className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100">{temperature}°C</output>
            </div>
            <input id="fire-temperature" type="range" min="20" max="100" value={temperature} disabled={runState === 'running'} onChange={(event) => { clearResult(); setTemperature(Number(event.target.value)); }}
              aria-valuetext={temperature + ' degrees Celsius'} className="h-3 w-full cursor-pointer accent-stone-800 disabled:opacity-50 dark:accent-stone-200" />
            <div className="flex justify-between text-sm text-stone-600 dark:text-zinc-400"><span>20°C</span><span><span className="block">Example rule: ≥ {FIRE_THRESHOLD}°C</span><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">شرط تجريبي</ArabicText></span><span>100°C</span></div>
            <div className={'flex items-center gap-2 rounded-xl border p-3 ' + (fireDetected ? 'border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30' : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-900')}>
              <Flame className={'h-5 w-5 ' + (fireDetected ? 'text-rose-700 dark:text-rose-400' : 'text-stone-500 dark:text-zinc-400')} />
              <div><p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{fireDetected ? 'Fire rule is active' : 'Below the example threshold'}</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{fireDetected ? 'القراءة وصلت لحدّ التفعيل أو عدّته' : 'القراءة أقل من حدّ التفعيل الافتراضي'}</ArabicText></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-beige-200 pt-4 dark:border-stone-800">
            <button type="button" onClick={() => { if (runState !== 'running') { clearResult(); setOnline(!online); } }} disabled={mode !== 'cloud' || runState === 'running'} aria-pressed={online}
              className="inline-flex items-center gap-2 rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm font-semibold text-stone-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300">
              {online ? <Wifi className="h-4 w-4 text-emerald-700 dark:text-emerald-400" /> : <WifiOff className="h-4 w-4 text-rose-700 dark:text-rose-400" />}
              {online ? 'Internet connected' : 'Internet disconnected'}<ArabicText as="span" className="text-[13px]">{online ? 'الإنترنت متصل' : 'الإنترنت مفصول'}</ArabicText>
            </button>
            <div className="flex gap-2">
              <button type="button" onClick={runScenario} disabled={!fireDetected || runState === 'running'} className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"><Play className="h-4 w-4" /><span>{runState === 'running' ? 'Evaluating…' : 'Run scenario'}</span></button>
              <button type="button" onClick={reset} title="Reset simulator" aria-label="Reset simulator" className="rounded-xl border border-beige-300 p-2 text-stone-700 dark:border-stone-700 dark:text-zinc-300"><RotateCcw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div><h4 className="text-base font-bold text-stone-900 dark:text-stone-100">Live response path</h4><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">مسار الاستجابة أثناء المحاكاة</ArabicText></div>
            <span className="rounded-full border border-beige-300 bg-[#FAF7F2] px-3 py-1 text-sm font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-300">{modeText}</span>
          </div>
          <LabWorkbench title="Edge & cloud · response path" motionKey={runState}
 nodes={[
 {id:'sensor',label:'Temperature sensor',kind:'sensor',position:[-3,0,0],tone:fireDetected?'active':'neutral',value:temperature+'°C',detail:'The example fire rule triggers at 60°C or above.',detailAr:'قاعدة الحريق الافتراضية بتشتغل عند 60 درجة مئوية أو أكتر.'},
 {id:'processor',label:mode==='edge'?'Local Edge rule':'Cloud rule',kind:mode==='edge'?'chip':'cloud',position:[0,0,mode==='cloud'?-1:0],tone:runState==='failure'?'error':runState==='running'?'active':'info',detail:mode==='edge'?'The decision runs locally, without a WAN round trip.':'The decision needs an internet route to the cloud.',detailAr:mode==='edge'?'القرار بيتاخد محليًا، من غير رحلة على شبكة WAN.':'القرار محتاج مسار إنترنت للـ Cloud.'},
 {id:'actuator',label:'Sprinkler',kind:'water',position:[3,0,0],tone:sprinklerActive?'success':'neutral',value:sprinklerActive?'Active':'Standby',detail:'The sprinkler only activates when the rule returns a command.',detailAr:'الرشاش بيشتغل بس لما القاعدة ترجع أمر تشغيل.'}
 ]}
 links={[
 {id:'reading',from:'sensor',to:'processor',tone:mode==='cloud'&&!online?'error':runState==='running'?'active':'neutral',moving:runState==='running'},
 {id:'command',from:'processor',to:'actuator',tone:runState==='failure'?'error':sprinklerActive?'success':'neutral',moving:sprinklerActive}
 ]}>
<div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="flex min-w-0 flex-col items-center justify-center rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 text-center dark:border-stone-800 dark:bg-stone-950"><Thermometer className="mb-2 h-6 w-6 text-stone-700 dark:text-zinc-300" /><p className="text-sm font-bold text-stone-900 dark:text-stone-100">Temperature sensor</p><p className="font-mono text-sm text-stone-600 dark:text-zinc-400">{temperature}°C</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">حساس الحرارة</ArabicText></div>
            <div className="hidden items-center text-stone-400 dark:text-zinc-500 sm:flex"><ArrowRight className="h-5 w-5" /></div>
            <div className={'flex min-w-0 flex-col items-center justify-center rounded-2xl border p-3 text-center transition-colors ' + (runState === 'running' ? 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30' : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950')}>
              {mode === 'edge' ? <Cpu className="mb-2 h-6 w-6 text-stone-700 dark:text-zinc-300" /> : <Cloud className="mb-2 h-6 w-6 text-stone-700 dark:text-zinc-300" />}
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{mode === 'edge' ? 'Local Edge rule' : 'Cloud rule'}</p>
              <p className="text-[13px] text-stone-600 dark:text-zinc-400">{mode === 'edge' ? 'No WAN round trip' : 'Internet route required'}</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{mode === 'edge' ? 'قاعدة محلية' : 'قاعدة سحابية'}</ArabicText>
            </div>
            <div className="hidden items-center text-stone-400 dark:text-zinc-500 sm:flex"><ArrowRight className="h-5 w-5" /></div>
            <div className={'flex min-w-0 flex-col items-center justify-center rounded-2xl border p-3 text-center transition-colors ' + (sprinklerActive ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30' : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950')}>
              <Droplets className={'mb-2 h-6 w-6 ' + (sprinklerActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-500 dark:text-zinc-400')} />
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Sprinkler actuator</p>
              <p className="text-[13px] text-stone-600 dark:text-zinc-400">{sprinklerActive ? 'Active' : 'Standby'}</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{sprinklerActive ? 'المشغّل اشتغل' : 'المشغّل مستني'}</ArabicText>
            </div>
          </div>
</LabWorkbench>
          <div className="rounded-2xl border border-stone-800 bg-stone-950 p-4 text-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100" aria-live="polite">
            <p className="text-sm leading-relaxed">{message.en}</p><ArabicText className="text-sm leading-relaxed text-zinc-300 dark:text-zinc-300">{message.ar}</ArabicText>
            <p className="mt-3 border-t border-stone-800 pt-3 text-[13px] text-zinc-400">Illustrative rule and animation only; playback timing is not a network measurement.</p><ArabicText className="text-[13px] text-zinc-400 dark:text-zinc-400">القاعدة والحركة للتوضيح فقط؛ وتوقيت العرض مش قياسًا للشبكة.</ArabicText>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-base font-bold text-stone-900 dark:text-stone-100">Architecture trade-offs</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {COMPARISON.map((row) => <article key={row.criterion} className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <h5 className="text-sm font-bold text-stone-900 dark:text-stone-100">{row.criterion}</h5><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{row.criterionAr}</ArabicText>
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-beige-200 pt-3 dark:border-stone-800">
              <div><p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Edge</p><p className="text-sm text-stone-700 dark:text-zinc-300">{row.edge}</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{row.edgeAr}</ArabicText></div>
              <div><p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Cloud</p><p className="text-sm text-stone-700 dark:text-zinc-300">{row.cloud}</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{row.cloudAr}</ArabicText></div>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  );
};

export default EdgeVsCloudLab;

import { useState } from 'react';
import { Activity, Cable, Radio, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type Medium = 'copper' | 'fiber' | 'wireless';
type Distance = 'short' | 'long';
type Environment = 'clear' | 'interference';

const MEDIA: Record<Medium, { name: string; nameAr: string; capacity: number; icon: typeof Cable }> = {
  copper: { name: 'Copper', nameAr: 'نحاس', capacity: 800, icon: Cable },
  fiber: { name: 'Fiber', nameAr: 'ألياف ضوئية', capacity: 1200, icon: Activity },
  wireless: { name: 'Wireless', nameAr: 'لاسلكي', capacity: 600, icon: Radio },
};

const distanceFactor = (medium: Medium, distance: Distance) => {
  if (distance === 'short') return 1;
  return { copper: 0.65, fiber: 0.95, wireless: 0.6 }[medium];
};

const environmentFactor = (medium: Medium, environment: Environment) => {
  if (environment === 'clear') return 1;
  return { copper: 0.9, fiber: 0.95, wireless: 0.55 }[medium];
};

const mediaNote: Record<Medium, { en: string; ar: string }> = {
  copper: {
    en: 'A wired electrical path; compare its distance and installation environment.',
    ar: 'مسار سلكي بإشارات كهربائية؛ راعي المسافة وبيئة التركيب.',
  },
  fiber: {
    en: 'A light-based path; useful when the link calls for longer reach or high data rates.',
    ar: 'مسار بيعتمد على الضوء؛ مناسب لما الوصلة تحتاج مدى أطول أو معدل بيانات مرتفع.',
  },
  wireless: {
    en: 'A radio path; the surrounding environment and distance affect the link.',
    ar: 'مسار لاسلكي بإشارات راديوية؛ البيئة المحيطة والمسافة بيأثروا على الوصلة.',
  },
};

function SignalPath({ medium }: { medium: Medium }) {
  return (
    <svg viewBox="0 0 360 92" className="h-24 w-full" role="img" aria-label={`${MEDIA[medium].name} signal path`}>
      <rect x="12" y="21" width="58" height="50" rx="12" className="fill-[#FAF7F2] stroke-stone-300 dark:fill-stone-950 dark:stroke-stone-700" />
      <rect x="290" y="21" width="58" height="50" rx="12" className="fill-[#FAF7F2] stroke-stone-300 dark:fill-stone-950 dark:stroke-stone-700" />
      <text x="41" y="50" textAnchor="middle" className="fill-stone-800 dark:fill-stone-200" fontSize="13">Source</text>
      <text x="319" y="50" textAnchor="middle" className="fill-stone-800 dark:fill-stone-200" fontSize="13">Device</text>
      {medium === 'wireless' ? (
        <g className="fill-none stroke-amber-600 dark:stroke-amber-400" strokeWidth="3" strokeLinecap="round">
          <path d="M82 46H104M256 46H278" />
          <path d="M128 31a22 22 0 0 0 0 30M149 23a34 34 0 0 0 0 46M232 31a22 22 0 0 1 0 30M211 23a34 34 0 0 1 0 46" />
        </g>
      ) : (
        <g className="fill-none stroke-amber-600 dark:stroke-amber-400" strokeWidth={medium === 'fiber' ? 7 : 4} strokeLinecap="round">
          <path d="M72 46H288" />
          {medium === 'fiber' && <path d="M72 46H288" className="stroke-amber-200 dark:stroke-amber-200" strokeWidth="2" />}
        </g>
      )}
      <circle cx="110" cy="46" r="4" className="fill-amber-500" />
      <circle cx="250" cy="46" r="4" className="fill-amber-500" />
    </svg>
  );
}

export function NetworkMediaLab() {
  const [distance, setDistance] = useState<Distance>('short');
  const [environment, setEnvironment] = useState<Environment>('clear');
  const [requiredMbps, setRequiredMbps] = useState(250);
  const [selected, setSelected] = useState<Medium>('copper');

  const results = (Object.keys(MEDIA) as Medium[]).map((medium) => {
    const capacity = MEDIA[medium].capacity;
    const throughput = Math.round(capacity * distanceFactor(medium, distance) * environmentFactor(medium, environment));
    return { medium, capacity, throughput, meetsTarget: throughput >= requiredMbps };
  });
  const current = results.find((result) => result.medium === selected)!;

  const reset = () => {
    setDistance('short');
    setEnvironment('clear');
    setRequiredMbps(250);
    setSelected('copper');
  };

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Activity size={20} /></span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Network Media Match Lab</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">محاكاة اختيار وسيط الشبكة</ArabicText>
          </div>
        </div>
        <button type="button" onClick={reset} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-beige-300 px-3 text-sm text-stone-700 hover:bg-[#FAF7F2] dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800" aria-label="Reset media choices">
          <RotateCcw size={16} /><span>Reset</span>
        </button>
      </header>

      <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-200">المسافة (Distance)</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['short', 'long'] as const).map((value) => (
                <button key={value} type="button" onClick={() => setDistance(value)} aria-pressed={distance === value} className={`min-h-11 rounded-xl border px-3 text-sm font-medium ${distance === value ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200'}`}>
                  {value === 'short' ? 'قصير (Short)' : 'طويل (Long)'}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-200">البيئة (Environment)</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['clear', 'interference'] as const).map((value) => (
                <button key={value} type="button" onClick={() => setEnvironment(value)} aria-pressed={environment === value} className={`min-h-11 rounded-xl border px-2 text-sm font-medium ${environment === value ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200'}`}>
                  {value === 'clear' ? 'هادئة (Clear)' : 'تشويش (Interference)'}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200" htmlFor="media-rate">
            معدل البيانات المطلوب (Required rate): <span className="font-mono">{requiredMbps} Mbps</span>
            <input id="media-rate" type="range" min="50" max="1200" step="50" value={requiredMbps} onChange={(event) => setRequiredMbps(Number(event.target.value))} className="mt-3 w-full accent-amber-600" />
            <span className="mt-1 flex justify-between text-[13px] font-normal text-stone-600 dark:text-zinc-400"><span>50 Mbps</span><span>1,200 Mbps</span></span>
          </label>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {results.map(({ medium, capacity, throughput, meetsTarget }) => {
              const Icon = MEDIA[medium].icon;
              const active = selected === medium;
              return (
                <button key={medium} type="button" onClick={() => setSelected(medium)} aria-pressed={active} className={`rounded-2xl border p-3 text-left transition-colors motion-reduce:transition-none ${active ? 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30' : 'border-beige-300 bg-white hover:bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800'}`}>
                  <span className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100"><Icon size={17} />{MEDIA[medium].name}</span>
                  <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">{MEDIA[medium].nameAr}</ArabicText>
                  <span className="mt-2 block text-[13px] text-stone-600 dark:text-zinc-400">Model capacity: {capacity} Mbps</span>
                  <span className={`mt-1 block text-[13px] ${meetsTarget ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                    {meetsTarget ? 'Meets modeled target' : 'Below modeled target'}
                  </span>
                  <span className="mt-1 block text-[13px] text-stone-600 dark:text-zinc-400">Modeled: {throughput} Mbps</span>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-2xl border border-beige-300 bg-[#FAF7F2] px-3 py-2 dark:border-stone-800 dark:bg-stone-950">
            <SignalPath medium={selected} />
            <p className="text-center text-[13px] font-medium text-stone-700 dark:text-stone-300">{MEDIA[selected].name} signal path · select a medium to switch it</p>
            <ArabicText className="text-center text-[13px] text-stone-600 dark:text-zinc-400">مسار الإشارة · اختار وسيطًا لتغييره</ArabicText>
          </div>

          <div className="rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900" aria-live="polite">
            <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{MEDIA[selected].name}: {current.throughput} Mbps modeled throughput / {current.capacity} Mbps modeled capacity</p>
            <p className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">{mediaNote[selected].en}</p>
            <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">{mediaNote[selected].ar}</ArabicText>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800" role="img" aria-label={`Modeled throughput ${current.throughput} of ${current.capacity} Mbps capacity`}>
              <div className="h-full rounded-full bg-amber-500 dark:bg-amber-400" style={{ width: `${Math.min(100, (current.throughput / current.capacity) * 100)}%` }} />
            </div>
            <p className="mt-2 text-[13px] font-medium text-stone-700 dark:text-stone-300">
              {current.meetsTarget ? 'The selected path meets the requested rate in this model.' : 'The selected path is below the requested rate in this model.'}
            </p>
            <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{current.meetsTarget ? 'المسار المختار بيحقق المعدل المطلوب في النموذج ده.' : 'المسار المختار أقل من المعدل المطلوب في النموذج ده.'}</ArabicText>
          </div>
        </div>
      </div>

      <p className="mt-4 rounded-xl bg-sky-50 p-3 text-[13px] leading-relaxed text-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
        Teaching model only: the Mbps capacities and condition factors are illustrative, not certified medium limits or measured performance. Actual selection also considers installation, cost, and equipment. Throughput is capped at modeled capacity by construction.
        <ArabicText className="mt-1 text-[13px] leading-relaxed text-sky-900 dark:text-sky-200">النموذج للتعليم فقط: سعات Mbps ومعاملات الظروف توضيحية، مش حدود معيارية للوسيط ولا قياسات أداء فعلية. الاختيار الحقيقي بيراعي كمان التركيب والتكلفة والأجهزة. الـThroughput ما بيعدّيش السعة الممثلة في النموذج.</ArabicText>
      </p>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Pause, Play, RotateCcw, Sparkles, StepForward, Wind } from 'lucide-react';
import ArabicText from '../ArabicText';

type Location = 'A' | 'B';
type Room = 'clean' | 'dirty';
type WorldState = {
  rooms: Record<Location, Room>;
  location: Location;
  score: number;
  steps: number;
  done: boolean;
  action: string;
};

const initialState = (): WorldState => ({
  rooms: { A: 'dirty', B: 'dirty' },
  location: 'A',
  score: 0,
  steps: 0,
  done: false,
  action: 'Ready: observe the current room.',
});

const takeReflexAction = (state: WorldState): WorldState => {
  if (state.done) return state;
  const rooms = { ...state.rooms };
  let location = state.location;
  let action: string;
  if (rooms[location] === 'dirty') {
    rooms[location] = 'clean';
    action = `Suck in room ${location}`;
  } else {
    location = location === 'A' ? 'B' : 'A';
    action = `Move to room ${location}`;
  }
  const cleanRooms = Number(rooms.A === 'clean') + Number(rooms.B === 'clean');
  const steps = state.steps + 1;
  const done = rooms.A === 'clean' && rooms.B === 'clean';
  return { rooms, location, score: state.score + cleanRooms, steps, done, action };
};

const examples = [
  {
    title: 'Vacuum cleaner', titleAr: 'مكنسة ذكية',
    peas: ['Clean rooms; avoid unnecessary actions.', 'Two rooms with dirt that may change.', 'Suck, move left, move right.', 'Current location and dirt sensor.'],
    peasAr: ['تنضيف الغرف وتجنب الأفعال غير الضرورية.', 'غرفتين ممكن يتغير فيهم التراب.', 'شفط، حركة شمال، حركة يمين.', 'الموقع الحالي ومستشعر التراب.'],
  },
  {
    title: 'Autonomous taxi', titleAr: 'تاكسي ذاتي القيادة',
    peas: ['Safe, timely, comfortable journeys.', 'Roads, traffic, passengers, weather.', 'Steer, accelerate, brake, signal.', 'Cameras, GPS, speed and engine sensors.'],
    peasAr: ['رحلات آمنة وفي وقت مناسب ومريحة.', 'طرق ومرور وركاب وطقس.', 'توجيه وزيادة سرعة وفرامل وإشارات.', 'كاميرات وGPS ومستشعرات سرعة ومحرك.'],
  },
  {
    title: 'Medical diagnosis system', titleAr: 'نظام تشخيص طبي',
    peas: ['Accurate, timely diagnoses with patient safety.', 'Patients, clinics, and available tests.', 'Request tests, recommend or update a diagnosis.', 'Symptoms, history, examination and test results.'],
    peasAr: ['تشخيص دقيق وفي وقته مع الحفاظ على سلامة المريض.', 'المرضى والعيادات والفحوص المتاحة.', 'طلب فحوص أو اقتراح التشخيص أو تحديثه.', 'الأعراض والتاريخ الطبي والفحص والنتائج.'],
  },
];

const peasHeadings = [
  ['Performance', 'مقياس الأداء'],
  ['Environment', 'البيئة'],
  ['Actuators', 'المشغّلات'],
  ['Sensors', 'المستشعرات'],
];

export function VacuumWorldAgentLab() {
  const [state, setState] = useState<WorldState>(initialState);
  const [playing, setPlaying] = useState(false);
  const [view, setView] = useState<'world' | 'peas'>('world');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing || state.done || view !== 'world') return;
    timerRef.current = window.setInterval(() => {
      setState((current) => takeReflexAction(current));
    }, 850);
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [playing, state.done, view]);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (state.done) setPlaying(false);
  }, [state.done]);

  const reset = () => {
    setPlaying(false);
    setState(initialState());
  };

  const editRoom = (room: Location) => {
    if (playing) return;
    setState((current) => ({
      ...current,
      rooms: { ...current.rooms, [room]: current.rooms[room] === 'dirty' ? 'clean' : 'dirty' },
      done: false,
      action: `Environment changed: room ${room} is ${current.rooms[room] === 'dirty' ? 'clean' : 'dirty'}.`,
    }));
  };

  const moveAgent = (location: Location) => {
    if (playing) return;
    setState((current) => ({ ...current, location, done: false, action: `Agent repositioned to room ${location}.` }));
  };

  const changeView = (next: 'world' | 'peas') => {
    setPlaying(false);
    setView(next);
  };

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Wind size={21} aria-hidden="true" /></span>
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Vacuum World · Simple Reflex Agent</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">عالم المكنسة · وكيل ردّ فعل بسيط</ArabicText>
        </div>
      </header>

      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Vacuum agent views">
        <button type="button" aria-pressed={view === 'world'} onClick={() => changeView('world')}
          className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${view === 'world' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-600 hover:bg-beige-100 dark:text-zinc-400 dark:hover:bg-stone-800'}`}>
          Simulator <span className="font-arabic">المحاكي</span>
        </button>
        <button type="button" aria-pressed={view === 'peas'} onClick={() => changeView('peas')}
          className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${view === 'peas' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-600 hover:bg-beige-100 dark:text-zinc-400 dark:hover:bg-stone-800'}`}>
          PEAS examples <span className="font-arabic">أمثلة PEAS</span>
        </button>
      </div>

      {view === 'world' ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <div>
              <p className="font-semibold text-stone-900 dark:text-stone-100">Performance score: {state.score} · Actions: {state.steps}</p>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">النقاط: {state.score} · عدد الأفعال: {state.steps}</ArabicText>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setPlaying((value) => !value)} disabled={state.done}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-3 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white">
                {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{playing ? 'Pause' : 'Auto play'}
                <span className="font-arabic">{playing ? 'إيقاف مؤقت' : 'تشغيل تلقائي'}</span>
              </button>
              <button type="button" onClick={() => setState((current) => takeReflexAction(current))} disabled={playing || state.done}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-3 text-sm font-semibold text-stone-700 hover:bg-beige-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800">
                <StepForward size={16} aria-hidden="true" /> Step <span className="font-arabic">خطوة</span>
              </button>
              <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-3 text-sm font-semibold text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800">
                <RotateCcw size={16} aria-hidden="true" /> Reset <span className="font-arabic">إعادة</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr]" aria-label="Two-room vacuum world">
            {(['A', 'B'] as Location[]).map((room, index) => {
              const dirty = state.rooms[room] === 'dirty';
              const occupied = state.location === room;
              return (
                <div key={room} className={`relative rounded-3xl border-2 p-5 transition-colors duration-300 motion-reduce:transition-none ${index === 1 ? 'md:col-start-3' : ''} ${dirty ? 'border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/25' : 'border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/25'}`}>
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <div><p className="text-xl font-bold text-stone-900 dark:text-stone-100">Room {room}</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">الغرفة {room}</ArabicText></div>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${dirty ? 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200' : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'}`}>
                      {dirty ? 'Dirty · متّسخة' : 'Clean · نضيفة'}
                    </span>
                  </div>
                  <div className="mb-5 flex min-h-24 items-center justify-center rounded-2xl border border-beige-300 bg-white/80 dark:border-stone-700 dark:bg-stone-900/80">
                    {dirty ? <div className="flex items-center gap-3 text-rose-800 dark:text-rose-300"><Sparkles size={30} className="rotate-180" aria-hidden="true" /><span className="text-sm font-medium">Dirt detected<br /><ArabicText>تراب ظاهر على الأرض</ArabicText></span></div> : <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300"><CheckCircle2 size={30} aria-hidden="true" /><span className="text-sm font-medium">Clean floor<br /><ArabicText>الأرض نضيفة</ArabicText></span></div>}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => editRoom(room)} disabled={playing} aria-label={`Toggle room ${room} dirt`} className="min-h-11 rounded-xl border border-beige-300 bg-white px-3 text-sm font-medium text-stone-700 hover:bg-beige-100 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800">
                      Toggle dirt <span className="font-arabic">تغيير التراب</span>
                    </button>
                    <button type="button" onClick={() => moveAgent(room)} disabled={playing} aria-pressed={occupied} className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold disabled:opacity-50 ${occupied ? 'bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-200' : 'text-stone-600 hover:bg-beige-100 dark:text-zinc-400 dark:hover:bg-stone-800'}`}>
                      {occupied && <Wind size={16} aria-hidden="true" />} {occupied ? 'Agent here' : 'Place agent'} <span className="font-arabic">{occupied ? 'الوكيل هنا' : 'حط الوكيل'}</span>
                    </button>
                  </div>
                  {occupied && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-bold text-amber-950 shadow-sm dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">Agent · الـ Agent</div>}
                </div>
              );
            })}
            <div aria-hidden="true" className="hidden items-center justify-center text-stone-400 dark:text-zinc-500 md:col-start-2 md:row-start-1 md:flex"><ArrowRight size={24} /></div>
          </div>

          <div aria-live="polite" className={`mt-4 rounded-2xl border p-4 ${state.done ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30' : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950'}`}>
            <p className="font-semibold text-stone-900 dark:text-stone-100">{state.done ? 'Task complete: both rooms are clean.' : `Agent rule: ${state.action}`}</p>
            <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">
              {state.done ? 'المهمة خلصت: الغرفتين بقوا نضاف.' : state.action.startsWith('Suck') ? `الإدراك الحالي: الغرفة ${state.location} متّسخة؛ قاعدة الشرط والفعل اختارت الشفط.` : state.action.startsWith('Move') ? `الإدراك الحالي: الغرفة ${state.location === 'A' ? 'B' : 'A'} نضيفة؛ قاعدة الشرط والفعل اختارت الحركة.` : 'الوكيل بيختار الفعل حسب الإدراك الحالي من غير ما يحتفظ بتاريخ سابق.'}
            </ArabicText>
            <p className="mt-2 text-sm text-stone-600 dark:text-zinc-400">Scoring: +1 for each clean room after every action. The agent uses only the current room percept.</p>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">التقييم: نقطة لكل غرفة نضيفة بعد كل فعل. الوكيل بيستخدم إدراك الغرفة الحالية بس.</ArabicText>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-beige-300 p-3 dark:border-stone-800"><p className="font-semibold text-stone-900 dark:text-stone-100">Condition–action rule</p><p className="mt-1 text-sm text-stone-700 dark:text-zinc-300">IF current room is dirty → SUCK; otherwise → move to the other room.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">لو الغرفة الحالية متّسخة ← اشفط؛ غير كده ← اتحرك للغرفة التانية.</ArabicText></div>
            <div className="rounded-2xl border border-beige-300 p-3 dark:border-stone-800"><p className="font-semibold text-stone-900 dark:text-stone-100">What this model shows</p><p className="mt-1 text-sm text-stone-700 dark:text-zinc-300">The reflex agent reacts to a percept; it has no explicit model of unseen room dirt.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">وكيل رد الفعل بيستجيب للإدراك، ومبيحتفظش بنموذج صريح عن تراب الغرفة اللي مش شايفها.</ArabicText></div>
          </div>
        </>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {examples.map((example) => (
            <article key={example.title} className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
              <h4 className="mb-1 font-bold text-stone-900 dark:text-stone-100">{example.title}</h4>
              <ArabicText className="mb-3 text-sm font-semibold text-stone-600 dark:text-zinc-400">{example.titleAr}</ArabicText>
              <div className="space-y-3">
                {example.peas.map((description, index) => (
                  <div key={peasHeadings[index][0]}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-700 dark:text-zinc-300">{peasHeadings[index][0]}</p>
                    <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">{peasHeadings[index][1]}</ArabicText>
                    <p className="mt-1 text-sm text-stone-800 dark:text-zinc-200">{description}</p>
                    <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{example.peasAr[index]}</ArabicText>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default VacuumWorldAgentLab;

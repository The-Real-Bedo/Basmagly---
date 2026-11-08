import { useState } from 'react';
import { ArrowRight, Check, Clock3, MousePointer2, RotateCcw, Save, StepForward, Wifi } from 'lucide-react';
import ArabicText from '../ArabicText';

type Mode = 'sequential' | 'events';
type EventKind = 'button' | 'timer' | 'network';

interface AppEvent {
  id: number;
  kind: EventKind;
  label: string;
  response: string;
  responseAr: string;
}

const sequence = [
  { label: 'Read input', labelAr: 'اقرأ المدخلات' },
  { label: 'Validate data', labelAr: 'راجع البيانات' },
  { label: 'Save result', labelAr: 'احفظ النتيجة' },
  { label: 'Finish task', labelAr: 'أنهِ المهمة' },
];

const eventChoices: Array<{
  kind: EventKind;
  label: string;
  labelAr: string;
  response: string;
  responseAr: string;
  Icon: typeof MousePointer2;
}> = [
  { kind: 'button', label: 'Button click', labelAr: 'ضغط زرار (Button click)', response: 'The click handler updates the screen.', responseAr: 'الـ click handler بيحدّث الشاشة.', Icon: MousePointer2 },
  { kind: 'timer', label: 'Timer expires', labelAr: 'المؤقّت يخلص (Timer)', response: 'The timer handler refreshes the status.', responseAr: 'الـ timer handler بيحدّث الحالة.', Icon: Clock3 },
  { kind: 'network', label: 'Network reply', labelAr: 'رد الشبكة يوصل (Network)', response: 'The network handler displays the reply.', responseAr: 'الـ network handler بيعرض الرد.', Icon: Wifi },
];

export function EventDrivenLab() {
  const [mode, setMode] = useState<Mode>('events');
  const [sequenceStep, setSequenceStep] = useState(0);
  const [queue, setQueue] = useState<AppEvent[]>([]);
  const [current, setCurrent] = useState<AppEvent | null>(null);
  const [status, setStatus] = useState('No event is pending. The application is waiting.');
  const [handledCount, setHandledCount] = useState(0);
  const [lastResponse, setLastResponse] = useState('Waiting for an event handler.');

  const [eventId, setEventId] = useState(0);
  const postEvent = (kind: EventKind) => {
    const choice = eventChoices.find((item) => item.kind === kind);
    if (!choice) return;
    const event: AppEvent = {
      id: eventId + 1,
      kind,
      label: choice.label,
      response: choice.response,
      responseAr: choice.responseAr,
    };
    setEventId((id) => id + 1);
    setQueue((items) => [...items, event]);
    setStatus(`${choice.label} raised an event and added it to the queue.`);
  };

  const step = () => {
    if (mode === 'sequential') {
      if (sequenceStep >= sequence.length) return;
      const task = sequence[sequenceStep];
      setSequenceStep((index) => index + 1);
      setStatus(`The program advanced to “${task.label}” in its predefined sequence.`);
      return;
    }
    if (!current) {
      if (queue.length === 0) return;
      const [event, ...remaining] = queue;
      setQueue(remaining);
      setCurrent(event);
      setStatus(`The event loop selected ${event.label}; its handler has not run yet.`);
      return;
    }
    setHandledCount((count) => count + 1);
    setLastResponse(current.response);
    setStatus(`${current.label} was dispatched to its event handler.`);
    setCurrent(null);
  };

  const reset = () => {
    setSequenceStep(0);
    setQueue([]);
    setCurrent(null);
    setHandledCount(0);
    setLastResponse('Waiting for an event handler.');
    setEventId(0);
    setStatus(mode === 'events' ? 'No event is pending. The application is waiting.' : 'The fixed sequence is ready to start.');
  };

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode);
    setSequenceStep(0);
    setQueue([]);
    setCurrent(null);
    setHandledCount(0);
    setLastResponse('Waiting for an event handler.');
    setEventId(0);
    setStatus(nextMode === 'events' ? 'No event is pending. The application is waiting.' : 'The fixed sequence is ready to start.');
  };

  const canStep = mode === 'sequential' ? sequenceStep < sequence.length : Boolean(current) || queue.length > 0;
  const nextLabel = mode === 'sequential' ? 'Run next task' : current ? 'Run handler' : 'Get next event';

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <StepForward size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Sequential vs. Event-Driven</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">قارن بين مسار ثابت وأحداث المستخدم بيختار ترتيبها</ArabicText>
          <p className="mt-1 text-sm text-stone-600 dark:text-zinc-400">Choose a model, then advance tasks or enqueue events and run their handlers.</p>
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose program flow model">
          <button
            type="button"
            onClick={() => changeMode('sequential')}
            aria-pressed={mode === 'sequential'}
            className={`min-h-10 rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === 'sequential' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-600 hover:bg-white dark:text-zinc-400 dark:hover:bg-stone-900'}`}
          >
            Sequential
          </button>
          <button
            type="button"
            onClick={() => changeMode('events')}
            aria-pressed={mode === 'events'}
            className={`min-h-10 rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === 'events' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-600 hover:bg-white dark:text-zinc-400 dark:hover:bg-stone-900'}`}
          >
            Event-driven
          </button>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
        >
          <RotateCcw size={15} aria-hidden="true" /> Reset
        </button>
      </div>

      {mode === 'sequential' ? (
        <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Program-controlled workflow</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">البرنامج محدد الترتيب من البداية</ArabicText>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={!canStep}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              <StepForward size={16} aria-hidden="true" /> {nextLabel}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {sequence.map((task, index) => {
              const completed = index < sequenceStep;
              const active = index === sequenceStep;
              return (
                <div key={task.label} className={`min-w-0 rounded-xl border p-3 ${completed ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30' : active ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30' : 'border-beige-300 bg-white dark:border-stone-700 dark:bg-stone-900'}`}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="font-mono text-[13px] text-stone-500 dark:text-stone-400">0{index + 1}</span>
                    {completed && <Check size={16} className="text-emerald-700 dark:text-emerald-300" aria-hidden="true" />}
                    {active && <ArrowRight size={16} className="text-amber-800 dark:text-amber-300" aria-hidden="true" />}
                  </div>
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{task.label}</p>
                  <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">{task.labelAr}</ArabicText>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-stone-600 dark:text-zinc-400">{sequenceStep === sequence.length ? 'The defined task is complete.' : 'The program chooses the next step in the fixed order.'}</p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <div className="mb-3">
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Raise events in any order</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">اختار أي حدث وفي أي وقت</ArabicText>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {eventChoices.map(({ kind, label, labelAr, Icon }) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => postEvent(kind)}
                  className="flex min-h-20 flex-col items-start gap-2 rounded-xl border border-beige-300 bg-white p-3 text-left transition hover:border-amber-400 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-amber-700 dark:hover:bg-amber-950/30"
                >
                  <Icon size={17} className="text-stone-600 dark:text-stone-300" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">{label}</span>
                    <ArabicText className="block text-[13px] text-stone-600 dark:text-zinc-400">{labelAr}</ArabicText>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-3 min-h-24 space-y-2 rounded-xl border border-dashed border-stone-300 bg-white p-3 dark:border-stone-700 dark:bg-stone-900" aria-label="Pending event queue">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">Event queue</p>
                <span className="text-[13px] text-stone-500 dark:text-stone-400">FIFO · {queue.length} waiting</span>
              </div>
              {queue.length === 0 ? (
                <p className="pt-1 text-sm text-stone-500 dark:text-stone-400">Empty — the loop waits instead of busy-spinning.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {queue.map((event, index) => (
                    <span key={event.id} className="rounded-lg border border-sky-300 bg-sky-50 px-2.5 py-1.5 text-[13px] font-medium text-sky-950 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200">{index + 1}. {event.label}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex min-w-0 flex-col rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <div className="mb-3">
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Application event loop</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">استقبل الحدث وبعدها شغّل الـ handler</ArabicText>
            </div>
            <div className="flex flex-1 flex-col justify-center rounded-xl border border-beige-300 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
              <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-stone-600 dark:text-stone-300">
                <span className="rounded-lg border border-beige-300 bg-[#FAF7F2] px-2.5 py-1.5 dark:border-stone-700 dark:bg-stone-950">Event source</span>
                <ArrowRight size={14} aria-hidden="true" />
                <span className="rounded-lg border border-beige-300 bg-[#FAF7F2] px-2.5 py-1.5 dark:border-stone-700 dark:bg-stone-950">Queue</span>
                <ArrowRight size={14} aria-hidden="true" />
                <span className="rounded-lg border border-beige-300 bg-[#FAF7F2] px-2.5 py-1.5 dark:border-stone-700 dark:bg-stone-950">Handler</span>
              </div>
              <div className="my-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900/70 dark:bg-amber-950/20">
                <p className="text-[13px] font-semibold uppercase tracking-wide text-amber-900 dark:text-amber-300">Selected event</p>
                <p className="mt-1 text-base font-bold text-stone-900 dark:text-stone-100">{current?.label ?? 'Waiting for an event'}</p>
                <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">{current ? 'الحدث اتسحب من الطابور ومستني تشغيل الـ handler.' : 'الـ loop مستني حدث جديد.'}</ArabicText>
              </div>
              <button
                type="button"
                onClick={step}
                disabled={!canStep}
                className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl bg-stone-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                <StepForward size={16} aria-hidden="true" /> {nextLabel}
              </button>
              <div className="mt-3 rounded-xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-700 dark:bg-stone-950">
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Handler response · {handledCount} handled</p>
                <p className="mt-1 text-sm text-stone-600 dark:text-zinc-400">{lastResponse}</p>
                <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">{handledCount === 0 ? 'لسه مفيش handler اشتغل.' : eventChoices.find((item) => item.response === lastResponse)?.responseAr ?? ''}</ArabicText>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/70 dark:bg-amber-950/20" aria-live="polite">
        <p className="text-sm font-semibold text-amber-950 dark:text-amber-200">{status}</p>
        <ArabicText className="mt-1 text-sm text-amber-900 dark:text-amber-300">{mode === 'events' ? 'الحدث هو اللي بيحدد الاستجابة؛ ولو مفيش حدث، التطبيق بيستنى بدل ما يفضل يلف من غير شغل.' : 'في المسار المتتابع، الكود هو اللي محدد الخطوة الجاية.'}</ArabicText>
      </div>
      <p className="mt-3 text-[13px] text-stone-500 dark:text-stone-400">Classroom model: handlers and effects are simplified to make control flow visible. Source: Foundation I, PDF slides 5–22.</p>
    </section>
  );
}

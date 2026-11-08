import { useRef, useState } from 'react';
import { ArrowRight, Keyboard, Monitor, MousePointer2, RotateCcw, StepForward } from 'lucide-react';
import ArabicText from '../ArabicText';

type MessageType = 'WM_LBUTTONDOWN' | 'WM_SIZE' | 'WM_KEYDOWN' | 'WM_CHAR' | 'WM_CLOSE';

interface LabMessage {
  id: number;
  type: MessageType;
  description: string;
  key?: string;
}

interface RetrievedMessage {
  message: LabMessage;
  translated: boolean;
}

const EVENT_CHOICES: Array<{
  type: Exclude<MessageType, 'WM_CHAR'>;
  label: string;
  labelAr: string;
  Icon: typeof MousePointer2;
}> = [
  { type: 'WM_LBUTTONDOWN', label: 'Button click', labelAr: 'اضغط الزرار (Button click)', Icon: MousePointer2 },
  { type: 'WM_SIZE', label: 'Resize window', labelAr: 'غيّر حجم النافذة (Resize)', Icon: Monitor },
  { type: 'WM_KEYDOWN', label: 'Press A', labelAr: 'اضغط A (Key press)', Icon: Keyboard },
  { type: 'WM_CLOSE', label: 'Close window', labelAr: 'اقفل النافذة (Close)', Icon: Monitor },
];

const messageColor: Record<MessageType, string> = {
  WM_LBUTTONDOWN: 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200',
  WM_SIZE: 'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200',
  WM_KEYDOWN: 'border-stone-300 bg-stone-100 text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200',
  WM_CHAR: 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200',
  WM_CLOSE: 'border-stone-300 bg-stone-100 text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200',
};

export function WindowsMessageLab() {
  const [queue, setQueue] = useState<LabMessage[]>([]);
  const [current, setCurrent] = useState<RetrievedMessage | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [status, setStatus] = useState('The message queue is empty. GetMessage waits until a message arrives.');
  const nextId = useRef(1);

  const enqueue = (type: Exclude<MessageType, 'WM_CHAR'>) => {
    if (isClosed) return;
    const descriptions: Record<Exclude<MessageType, 'WM_CHAR'>, string> = {
      WM_LBUTTONDOWN: 'Button pressed',
      WM_SIZE: 'Window resize requested',
      WM_KEYDOWN: 'A key pressed',
      WM_CLOSE: 'Window close requested',
    };
    const message: LabMessage = {
      id: nextId.current++,
      type,
      description: descriptions[type],
      ...(type === 'WM_KEYDOWN' ? { key: 'A' } : {}),
    };
    setQueue((items) => [...items, message]);
    setStatus(`${message.type} posted to the thread queue; it has not reached WndProc yet.`);
  };

  const dispatch = (message: LabMessage) => {
    switch (message.type) {
      case 'WM_LBUTTONDOWN':
        setClickCount((count) => count + 1);
        setStatus('WndProc handled WM_LBUTTONDOWN and updated the window content.');
        break;
      case 'WM_SIZE':
        setIsCompact((compact) => !compact);
        setStatus('WndProc handled WM_SIZE and changed the mock window size.');
        break;
      case 'WM_CHAR':
        setTypedText((value) => `${value}${message.key ?? ''}`);
        setStatus(`WndProc handled WM_CHAR and added “${message.key ?? ''}” to the mock input.`);
        break;
      case 'WM_KEYDOWN':
        setStatus('WndProc received WM_KEYDOWN; the translated WM_CHAR remains in the queue.');
        break;
      case 'WM_CLOSE':
        setIsClosed(true);
        setStatus('WndProc handled WM_CLOSE. The mock window is now closed.');
        break;
    }
  };

  const step = () => {
    if (!current) {
      if (queue.length === 0) return;
      const [message, ...remaining] = queue;
      setQueue(remaining);
      setCurrent({ message, translated: false });
      setStatus(`GetMessage retrieved ${message.type}. The message is no longer waiting in the queue.`);
      return;
    }

    if (current.message.type === 'WM_KEYDOWN' && !current.translated) {
      const translated: LabMessage = {
        id: nextId.current++,
        type: 'WM_CHAR',
        description: 'Translated character',
        key: current.message.key,
      };
      setQueue((items) => [...items, translated]);
      setCurrent({ ...current, translated: true });
      setStatus('TranslateMessage generated WM_CHAR and posted it at the back of the queue.');
      return;
    }

    dispatch(current.message);
    setCurrent(null);
  };

  const reset = () => {
    setQueue([]);
    setCurrent(null);
    setClickCount(0);
    setIsCompact(false);
    setIsClosed(false);
    setTypedText('');
    nextId.current = 1;
    setStatus('The message queue is empty. GetMessage waits until a message arrives.');
  };

  const nextLabel = !current
    ? 'GetMessage'
    : current.message.type === 'WM_KEYDOWN' && !current.translated
      ? 'TranslateMessage'
      : 'DispatchMessage → WndProc';
  const canStep = Boolean(current) || queue.length > 0;

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <Monitor size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Windows Message Loop</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">جرّب إزاي الرسالة بتتنقل من الـ queue لحد الـ WndProc</ArabicText>
          <p className="mt-1 text-sm text-stone-600 dark:text-zinc-400">Post events, inspect the FIFO queue, and advance the loop one API step at a time.</p>
        </div>
      </header>

      <div className="mb-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Create a message</p>
            <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">اختار حدث عشان يتحط في آخر الطابور</ArabicText>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={step}
              disabled={!canStep}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              <StepForward size={16} aria-hidden="true" />
              {nextLabel}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              <RotateCcw size={15} aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {EVENT_CHOICES.map(({ type, label, labelAr, Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => enqueue(type)}
              disabled={isClosed}
              className="flex min-h-12 items-center gap-3 rounded-xl border border-beige-300 bg-white px-3 py-2 text-left transition hover:border-amber-400 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-amber-700 dark:hover:bg-amber-950/30"
            >
              <Icon size={17} className="shrink-0 text-stone-600 dark:text-stone-300" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-stone-800 dark:text-stone-200">{label}</span>
                <ArabicText className="block text-[13px] text-stone-600 dark:text-zinc-400">{labelAr}</ArabicText>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Application window</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">واجهة تجريبية، مش نافذة Windows حقيقية</ArabicText>
            </div>
            <span className="rounded-full border border-beige-300 bg-white px-2.5 py-1 font-mono text-[13px] text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">HWND 0x1001</span>
          </div>

          <div className={`mx-auto overflow-hidden rounded-xl border border-stone-300 bg-white shadow-sm transition-all dark:border-stone-700 dark:bg-stone-900 ${isCompact ? 'max-w-[250px]' : 'max-w-full'}`}>
            <div className="flex items-center justify-between gap-2 border-b border-stone-200 bg-stone-100 px-3 py-2 dark:border-stone-700 dark:bg-stone-800">
              <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-200">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
                <span className="truncate">{isClosed ? 'Window closed' : 'Message Demo'}</span>
              </div>
              <span className="shrink-0 text-[13px] text-stone-500 dark:text-stone-400">{isClosed ? 'WM_CLOSE' : 'Running'}</span>
            </div>
            <div className="min-h-[180px] p-4 sm:p-5">
              {isClosed ? (
                <div className="flex min-h-[140px] flex-col items-center justify-center text-center">
                  <p className="text-base font-semibold text-stone-800 dark:text-stone-200">The mock window has closed.</p>
                  <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">اعمل Reset عشان تبدأ تجربة جديدة</ArabicText>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-center gap-3">
                  <div className="rounded-xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-700 dark:bg-stone-950">
                    <p className="text-sm text-stone-600 dark:text-zinc-400">WndProc response</p>
                    <p className="mt-1 text-base font-semibold text-stone-900 dark:text-stone-100">
                      {clickCount === 0 ? 'Waiting for a button event' : `Button handled ${clickCount} time${clickCount === 1 ? '' : 's'}`}
                    </p>
                    <p className="mt-1 text-sm text-stone-600 dark:text-zinc-400">{typedText ? `Input: ${typedText}` : 'No translated character yet'}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => enqueue('WM_LBUTTONDOWN')}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-amber-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 dark:bg-amber-300 dark:text-stone-950 dark:hover:bg-amber-200"
                    >
                      <MousePointer2 size={16} aria-hidden="true" />
                      Click this button
                    </button>
                    <span className="text-[13px] text-stone-500 dark:text-stone-400">{isCompact ? 'Compact window' : 'Full window'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950 sm:p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Thread message queue</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">الأقدم بيتعالج الأول (FIFO)</ArabicText>
            </div>
            <span className="rounded-full border border-beige-300 bg-white px-2.5 py-1 text-[13px] font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">{queue.length} pending</span>
          </div>

          <div className="mb-3 min-h-[112px] space-y-2 rounded-xl border border-dashed border-stone-300 bg-white p-3 dark:border-stone-700 dark:bg-stone-900" aria-label="Pending messages in FIFO order">
            {queue.length === 0 ? (
              <div className="flex min-h-[82px] flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-stone-600 dark:text-stone-300">Queue empty</p>
                <p className="text-[13px] text-stone-500 dark:text-stone-400">GetMessage waits; it does not busy-spin.</p>
              </div>
            ) : queue.map((message, index) => (
              <div key={message.id} className={`flex min-w-0 items-center justify-between gap-2 rounded-lg border px-2.5 py-2 ${messageColor[message.type]}`}>
                <span className="min-w-0 truncate text-sm font-semibold">{message.type}</span>
                <span className="shrink-0 text-[13px]">#{index + 1} · {message.description}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-beige-300 bg-white p-3 dark:border-stone-700 dark:bg-stone-900">
            <div className="mb-2 flex items-center gap-2 text-stone-600 dark:text-stone-300">
              <ArrowRight size={15} aria-hidden="true" />
              <span className="text-[13px] font-semibold uppercase tracking-wide">Current loop step</span>
            </div>
            {current ? (
              <div className={`rounded-lg border px-3 py-2 ${messageColor[current.message.type]}`}>
                <p className="font-mono text-sm font-bold">{current.message.type}</p>
                <p className="mt-1 text-[13px]">{current.translated ? 'Translated; ready for dispatch.' : 'Retrieved from the queue; ready for the next step.'}</p>
              </div>
            ) : (
              <p className="text-sm text-stone-600 dark:text-zinc-400">No message is currently being processed.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/70 dark:bg-amber-950/20" aria-live="polite">
        <p className="text-sm font-semibold text-amber-950 dark:text-amber-200">{status}</p>
        <ArabicText className="mt-1 text-sm text-amber-900 dark:text-amber-300">{status.includes('queue is empty') ? 'لما الطابور يبقى فاضي، GetMessage بيستنى لحد ما رسالة توصل.' : 'كمّل خطوة خطوة عشان تشوف الفرق بين الرسالة الموجودة في الطابور ومعالجتها جوّه WndProc.'}</ArabicText>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950">
          <p className="font-mono text-[13px] font-semibold text-stone-700 dark:text-stone-200">GetMessage</p>
          <p className="mt-1 text-sm text-stone-600 dark:text-zinc-400">Retrieves from the queue and waits while it is empty.</p>
          <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">بيسترجع من الطابور وبيستنى لو فاضي.</ArabicText>
        </div>
        <div className="rounded-xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950">
          <p className="font-mono text-[13px] font-semibold text-stone-700 dark:text-stone-200">TranslateMessage</p>
          <p className="mt-1 text-sm text-stone-600 dark:text-zinc-400">Translates this demo’s key press into a queued WM_CHAR.</p>
          <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">بيحوّل ضغطة الكيبورد التجريبية لـ WM_CHAR في الطابور.</ArabicText>
        </div>
        <div className="rounded-xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950">
          <p className="font-mono text-[13px] font-semibold text-stone-700 dark:text-stone-200">DispatchMessage → WndProc</p>
          <p className="mt-1 text-sm text-stone-600 dark:text-zinc-400">Sends the current message to the mock window procedure.</p>
          <ArabicText className="mt-1 text-[13px] text-stone-600 dark:text-zinc-400">بيبعت الرسالة الحالية لـ window procedure التجريبية.</ArabicText>
        </div>
      </div>
      <p className="mt-3 text-[13px] text-stone-500 dark:text-stone-400">Classroom model only: this browser simulation illustrates message flow; it does not call the native Windows API. المصدر: Foundation II، الشرائح 12–18، وإضافة الفصل الأول من الكتاب.</p>
    </section>
  );
}

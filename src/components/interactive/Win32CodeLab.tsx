import { useState } from 'react';
import { ArrowRight, Code2, Keyboard, MousePointer2, Play, RotateCcw, StepForward } from 'lucide-react';
import ArabicText from '../ArabicText';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

type Scenario = 'mouse' | 'keyboard' | 'resize' | 'shutdown';
interface TraceStep {
  title: string; titleAr: string; detail: string; detailAr: string;
  queue: string[]; current: string | null; lines: number[];
  windowText?: string; clickCount?: number; size?: string; closed?: boolean; exited?: boolean;
}

const codeLines = [
  'LRESULT CALLBACK WndProc(HWND hwnd, UINT message,',
  '                         WPARAM wParam, LPARAM lParam) {',
  '    switch (message) {',
  '    case WM_LBUTTONDOWN:',
  '        clickCount++;',
  '        return 0;',
  '    case WM_CHAR:',
  '        typedText += static_cast<wchar_t>(wParam);',
  '        return 0;',
  '    case WM_SIZE:',
  '        resizeLayout(lParam);',
  '        return 0;',
  '    case WM_DESTROY:',
  '        PostQuitMessage(0);',
  '        return 0;',
  '    default:',
  '        return DefWindowProcW(hwnd, message, wParam, lParam);',
  '    }',
  '}',
  '',
  'while ((result = GetMessageW(&msg, nullptr, 0, 0)) > 0) {',
  '    TranslateMessage(&msg);',
  '    DispatchMessageW(&msg);',
  '}',
];
// Resolve highlighted lines from the sketch so inserted lines cannot shift API highlights.
const codeAt = (text: string) => codeLines.findIndex(line => line.trim().startsWith(text));
const loopLine = codeAt('while');
const translateLine = codeAt('TranslateMessage');
const dispatchLine = codeAt('DispatchMessage');

const buildTrace = (scenario: Scenario): TraceStep[] => {
  if (scenario === 'shutdown') return [
    { title: '1. A close request is posted', titleAr: '1. طلب إغلاق بيتحط في الـ Queue', detail: 'This example posts WM_CLOSE to the single window. Windows can also deliver sent close requests.', detailAr: 'المثال ده بيحط WM_CLOSE في الـ Queue للنافذة الواحدة. Windows ممكن كمان توصل طلبات الإغلاق كرسائل Sent.', queue: ['WM_CLOSE'], current: null, lines: [loopLine] },
    { title: '2. GetMessage retrieves the request', titleAr: '2. GetMessage بتسحب الطلب', detail: 'GetMessage returns a positive value for the retrieved WM_CLOSE. The loop can dispatch it.', detailAr: 'GetMessage بترجع قيمة موجبة لرسالة WM_CLOSE المسحوبة. الـ Loop تقدر توجّهها.', queue: [], current: 'WM_CLOSE', lines: [loopLine] },
    { title: '3. The window is destroyed and quit is posted', titleAr: '3. النافذة بتتقفل وطلب الخروج بيتحط', detail: 'DispatchMessage reaches the default case. DefWindowProc handles WM_CLOSE by destroying the window; WM_DESTROY invokes PostQuitMessage, which posts WM_QUIT to the thread.', detailAr: 'DispatchMessage بتوصل لحالة الـ Default. DefWindowProc بتعالج WM_CLOSE بتدمير النافذة؛ وWM_DESTROY بتنادي PostQuitMessage اللي بتحط WM_QUIT للـ Thread.', queue: ['WM_QUIT'], current: 'WM_DESTROY (sent)', lines: [dispatchLine, codeAt('default:'), codeAt('return DefWindowProc'), codeAt('case WM_DESTROY:'), codeAt('PostQuitMessage')], closed: true },
    { title: '4. WM_QUIT ends the message loop', titleAr: '4. WM_QUIT بتنهي الـ Message Loop', detail: 'GetMessage removes WM_QUIT and returns 0. The loop exits; WM_QUIT is a thread message and is never dispatched to WndProc. A return of −1 would be an error, not normal shutdown.', detailAr: 'GetMessage بتسحب WM_QUIT وبترجع 0. الـ Loop بتخرج؛ WM_QUIT رسالة Thread ومش بتتوجّه لـ WndProc. رجوع سالب 1 يبقى خطأ، مش إغلاق عادي.', queue: [], current: 'WM_QUIT · GetMessage = 0', lines: [loopLine], closed: true, exited: true },
  ];
  if (scenario === 'mouse') return [
    { title: '1. Input becomes a queued message', titleAr: '1. الإدخال يتحول لرسالة في الـ Queue', detail: 'The OS recognizes the click and queues WM_LBUTTONDOWN for the target thread.', detailAr: 'النظام بيرصد الضغطة وبيحط WM_LBUTTONDOWN في Queue الخاصة بالـ thread المقصود.', queue: ['WM_LBUTTONDOWN'], current: null, lines: [loopLine], clickCount: 0 },
    { title: '2. GetMessage retrieves it', titleAr: '2. GetMessage تسحبها', detail: 'GetMessage removes the next queued message. The loop is now holding WM_LBUTTONDOWN.', detailAr: 'GetMessage بتسحب الرسالة الجاية من الـ Queue. دلوقتي الـ loop معاها WM_LBUTTONDOWN.', queue: [], current: 'WM_LBUTTONDOWN', lines: [loopLine], clickCount: 0 },
    { title: '3. TranslateMessage checks applicability', titleAr: '3. TranslateMessage بتفحص إذا كانت الترجمة مطلوبة', detail: 'This is a mouse message, so no keyboard-to-character translation is needed; the current message stays unchanged.', detailAr: 'دي رسالة ماوس، فمش محتاجة تحويل من رسالة كيبورد لحرف؛ الرسالة الحالية بتفضل زي ما هي.', queue: [], current: 'WM_LBUTTONDOWN', lines: [translateLine], clickCount: 0 },
    { title: '4. DispatchMessage calls WndProc', titleAr: '4. DispatchMessage بتنادي WndProc', detail: 'DispatchMessage routes the retrieved message to the window procedure assigned to its HWND.', detailAr: 'DispatchMessage بتوجّه الرسالة المسحوبة للـ Window Procedure المرتبطة بالـ HWND بتاعها.', queue: [], current: 'WM_LBUTTONDOWN', lines: [dispatchLine], clickCount: 0 },
    { title: '5. The matching case responds', titleAr: '5. الحالة المطابقة بتستجيب', detail: 'WndProc matches WM_LBUTTONDOWN, updates the click count, returns zero for the handled message, then the loop waits again.', detailAr: 'WndProc بتطابق WM_LBUTTONDOWN، وتحدّث عدد الضغطات، وترجع صفر للرسالة اللي اتعالجت؛ وبعدها الـ loop تستنى تاني.', queue: [], current: 'WM_LBUTTONDOWN', lines: [codeAt('case WM_LBUTTONDOWN:'), codeAt('clickCount++'), codeAt('clickCount++') + 1], clickCount: 1 },
  ];

  if (scenario === 'keyboard') return [
    { title: '1. The key press is queued', titleAr: '1. ضغطة المفتاح تدخل الـ Queue', detail: 'The OS queues WM_KEYDOWN for the focused window thread. The typed character is not yet in the queue.', detailAr: 'النظام بيحط WM_KEYDOWN في Queue الخاصة بنافذة التركيز. الحرف لسه ما دخلش الـ Queue.', queue: ['WM_KEYDOWN'], current: null, lines: [loopLine], windowText: '' },
    { title: '2. GetMessage retrieves WM_KEYDOWN', titleAr: '2. GetMessage تسحب WM_KEYDOWN', detail: 'The loop removes WM_KEYDOWN from the queue; that message becomes current.', detailAr: 'الـ loop بتسحب WM_KEYDOWN من الـ Queue؛ والرسالة دي تبقى الحالية.', queue: [], current: 'WM_KEYDOWN', lines: [loopLine], windowText: '' },
    { title: '3. TranslateMessage posts WM_CHAR', titleAr: '3. TranslateMessage بتحط WM_CHAR في الـ Queue', detail: 'For this key, translation posts WM_CHAR behind the current message. It does not replace or dispatch WM_KEYDOWN.', detailAr: 'للمفتاح ده، الترجمة بتحط WM_CHAR بعد الرسالة الحالية في الـ Queue. مش بتستبدل WM_KEYDOWN ولا بتوجّهها.', queue: ['WM_CHAR'], current: 'WM_KEYDOWN', lines: [translateLine], windowText: '' },
    { title: '4. DispatchMessage routes WM_KEYDOWN', titleAr: '4. DispatchMessage بتوجّه WM_KEYDOWN', detail: 'The original WM_KEYDOWN goes to WndProc. This teaching sketch falls through to DefWindowProc for that message.', detailAr: 'رسالة WM_KEYDOWN الأصلية بتروح لـ WndProc. المثال التعليمي ده بيمرّرها لـ DefWindowProc.', queue: ['WM_CHAR'], current: 'WM_KEYDOWN', lines: [dispatchLine, codeAt('default:'), codeAt('return DefWindowProc')], windowText: '' },
    { title: '5. The loop retrieves WM_CHAR next', titleAr: '5. الـ Loop تسحب WM_CHAR بعدها', detail: 'The character message is a separate item, retrieved on the next loop turn.', detailAr: 'رسالة الحرف عنصر منفصل، وبتتسحب في دورة الـ loop اللي بعدها.', queue: [], current: 'WM_CHAR', lines: [loopLine], windowText: '' },
    { title: '6. WM_CHAR is dispatched and handled', titleAr: '6. WM_CHAR بتتوجّه وبتتعالج', detail: 'DispatchMessage calls WndProc again. Its WM_CHAR case appends the character to the mock window.', detailAr: 'DispatchMessage بتنادي WndProc مرة تانية. حالة WM_CHAR بتضيف الحرف للنافذة التجريبية.', queue: [], current: 'WM_CHAR', lines: [dispatchLine, codeAt('case WM_CHAR:'), codeAt('typedText +='), codeAt('typedText +=') + 1], windowText: 'A' },
  ];

  return [{
    title: '1. Windows sends WM_SIZE', titleAr: '1. Windows بتبعت WM_SIZE',
    detail: 'A resize notification is sent to the window procedure as part of window management; not every notification is retrieved from the queue.',
    detailAr: 'إشعار تغيير الحجم بيتبعت للـ Window Procedure ضمن إدارة النافذة؛ مش كل الإشعارات بتتسحب من الـ Queue.',
    queue: [], current: 'WM_SIZE (sent)', lines: [codeAt('case WM_SIZE:'), codeAt('resizeLayout'), codeAt('resizeLayout') + 1], size: '480 × 320',
  }];
};

const scenarios: { id: Scenario; title: string; titleAr: string; icon: typeof MousePointer2 }[] = [
  { id: 'mouse', title: 'Mouse click', titleAr: 'ضغطة ماوس', icon: MousePointer2 },
  { id: 'keyboard', title: 'Press A', titleAr: 'اضغط A', icon: Keyboard },
  { id: 'resize', title: 'Resize window', titleAr: 'غيّر حجم النافذة', icon: Code2 },
  { id: 'shutdown', title: 'Close and quit', titleAr: 'اقفل واخرج', icon: Code2 },
];

export function Win32CodeLab() {
  const [scenario, setScenario] = useState<Scenario>('mouse');
  const [trace, setTrace] = useState<TraceStep[] | null>(null);
  const [stepIndex, setStepIndex] = useState(-1);
  const currentStep = trace && stepIndex >= 0 ? trace[stepIndex] : undefined;
  const isRunning = Boolean(trace && stepIndex < trace.length - 1);
  const reset = () => { setTrace(null); setStepIndex(-1); };
  const start = () => { const next = buildTrace(scenario); setTrace(next); setStepIndex(0); };
  const runAll = () => { const next = buildTrace(scenario); setTrace(next); setStepIndex(next.length - 1); };
  const missions: ChallengeMission[] = [
    { id: 'keyboard-character', title: 'Deliver a translated character', titleAr: 'وصّل الحرف بعد الترجمة', goal: 'Select Press A. Run the trace and Step until the separate WM_CHAR reaches its matching case and the mock window displays A.', goalAr: 'اختار Press A. شغّل التتبّع واتقدّم بالـ Step لحد ما رسالة WM_CHAR المنفصلة توصل لحالتها المطابقة والنافذة التجريبية تعرض A.', hint: 'TranslateMessage posts WM_CHAR; it does not replace WM_KEYDOWN or call WndProc.', hintAr: 'TranslateMessage بتحط WM_CHAR في الـ Queue؛ مش بتستبدل WM_KEYDOWN ولا بتنادي WndProc.', start: () => { reset(); setScenario('mouse'); }, evaluate: () => scenario !== 'keyboard' ? feedback('retry', 'Select Press A for this character mission.', 'اختار Press A لمهمة الحرف دي.') : currentStep?.windowText === 'A' ? feedback('success', 'WM_CHAR was retrieved and dispatched separately; its case appended A.', 'WM_CHAR اتسحبت واتوجّهت لوحدها؛ وحالتها ضافت A.') : feedback('pending', 'Run and advance until the WM_CHAR case handles the character.', 'شغّل واتقدّم لحد ما حالة WM_CHAR تعالج الحرف.') },
    { id: 'quit-thread', title: 'Exit without dispatching WM_QUIT', titleAr: 'اخرج من غير توجيه WM_QUIT', goal: 'Select Close and quit. Follow window destruction, the posted quit message, and GetMessage returning zero.', goalAr: 'اختار Close and quit. تابع تدمير النافذة، ورسالة الخروج اللي اتحطت، ورجوع GetMessage بصفر.', hint: 'PostQuitMessage targets the thread. GetMessage returns 0 for WM_QUIT, so DispatchMessage is skipped.', hintAr: 'PostQuitMessage بتستهدف الـ Thread. GetMessage بترجع 0 مع WM_QUIT، فـ DispatchMessage ما بتتنفّذش.', start: () => { reset(); setScenario('mouse'); }, evaluate: () => scenario !== 'shutdown' ? feedback('retry', 'Select Close and quit.', 'اختار Close and quit.') : currentStep?.exited ? feedback('success', 'The window was destroyed and GetMessage returned 0. WM_QUIT never entered WndProc.', 'النافذة اتدمّرت وGetMessage رجعت 0. WM_QUIT ما دخلتش WndProc.') : feedback('pending', 'Trace past WM_DESTROY to the next GetMessage call.', 'كمّل التتبّع بعد WM_DESTROY لنداء GetMessage اللي بعده.') },
  ];

  return (
    <section id="win32-code-lab" className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Code2 size={20} /></span>
        <div><h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Win32 Message Trace</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">تتبّع رسائل Win32 خطوة بخطوة</ArabicText></div>
      </header>

      <LabChallenge missions={missions} busy={isRunning} />
      <div className="mb-5 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Choose an event</p>
        <ArabicText className="mb-3 text-sm text-stone-600 dark:text-zinc-400">اختار حدث</ArabicText>
        <div className="flex flex-wrap gap-2">
          {scenarios.map(({ id, title, titleAr, icon: Icon }) => (
            <button key={id} type="button" aria-pressed={scenario === id} disabled={isRunning}
              onClick={() => { setScenario(id); reset(); }}
              className={'inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ' + (scenario === id ? 'border-amber-400 bg-amber-100 text-amber-950 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800')}>
              <Icon size={16} /><span>{title}</span><ArabicText as="span" className="text-xs text-current">{titleAr}</ArabicText>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)]">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-stone-800 bg-stone-950">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-700 px-4 py-3 dark:border-stone-700">
            <span className="font-mono text-xs text-zinc-300 dark:text-zinc-300">WndProc + message loop</span><span className="text-xs text-zinc-400 dark:text-zinc-400">Teaching sketch</span>
          </div>
          <div className="overflow-x-auto p-3" dir="ltr">
            <pre className="min-w-max font-mono text-xs leading-6 text-stone-200">
              {codeLines.map((line, index) => (
                <div key={index} data-code-line={index} data-highlighted={currentStep?.lines.includes(index) ?? false} className={'flex gap-3 rounded px-2 ' + (currentStep?.lines.includes(index) ? 'bg-amber-400/20 text-amber-200' : '')}>
                  <span className="w-7 shrink-0 select-none text-right text-zinc-500">{index + 1}</span><code>{line || ' '}</code>
                </div>
              ))}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <div className="mb-3 flex items-center justify-between"><h4 className="font-semibold text-stone-900 dark:text-stone-100">Message queue</h4><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">طابور الرسائل</ArabicText></div>
            <div className="min-h-14 rounded-xl border border-dashed border-beige-400 bg-white p-3 dark:border-stone-700 dark:bg-stone-900" aria-label="Queued messages">
              {currentStep?.queue.length ? currentStep.queue.map((message, index) => <span key={message + '-' + index} className="mr-2 inline-flex rounded-lg bg-sky-100 px-2 py-1 font-mono text-xs text-sky-900 dark:bg-sky-950/50 dark:text-sky-200">{message}</span>) : <><p className="text-sm text-stone-500 dark:text-zinc-400">Queue empty</p><ArabicText className="text-xs text-stone-500 dark:text-zinc-400">الـ Queue فاضية</ArabicText></>}
            </div>
            <div className="my-3 flex items-center gap-2 text-xs text-stone-500 dark:text-zinc-400"><span className="h-px flex-1 bg-beige-300 dark:bg-stone-700" /><ArrowRight size={16} /><span className="h-px flex-1 bg-beige-300 dark:bg-stone-700" /></div>
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
              <p className="text-xs font-medium uppercase text-amber-900 dark:text-amber-300">Current message</p>
              <p className="mt-1 font-mono text-sm text-stone-900 dark:text-stone-100">{currentStep?.current ?? 'Waiting for input'}</p>
              <ArabicText className="mt-1 text-xs text-stone-600 dark:text-zinc-400">{currentStep?.current ? 'الرسالة الحالية' : 'مستني إدخال'}</ArabicText>
            </div>
          </div>
          <div className="rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-2 flex items-center justify-between"><h4 className="font-semibold text-stone-900 dark:text-stone-100">Mock window</h4><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">نافذة تجريبية</ArabicText></div>
            <div className="min-h-20 rounded-xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-700 dark:bg-stone-950">
              <p className="font-mono text-xs text-stone-500 dark:text-zinc-400">HWND · SampleWindow</p>
              <p className="mt-2 text-sm text-stone-900 dark:text-stone-100">
                {currentStep?.closed ? currentStep.exited ? 'Window destroyed · message loop exited' : 'Window destroyed · quit pending' : currentStep?.windowText !== undefined ? 'Typed text: ' + (currentStep.windowText || '—') : currentStep?.clickCount !== undefined ? 'Click count: ' + currentStep.clickCount : currentStep?.size ? 'Client size: ' + currentStep.size : 'Ready for a message'}
              </p>
              <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">
                {currentStep?.closed ? currentStep.exited ? 'النافذة اتدمّرت · حلقة الرسائل خرجت' : 'النافذة اتدمّرت · الخروج مستني' : currentStep?.windowText !== undefined ? 'النص المكتوب: ' + (currentStep.windowText || '—') : currentStep?.clickCount !== undefined ? 'عدد الضغطات: ' + currentStep.clickCount : currentStep?.size ? 'حجم مساحة النافذة: ' + currentStep.size : 'جاهزة لاستقبال رسالة'}
              </ArabicText>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900" aria-live="polite">
        <p className="font-semibold text-stone-900 dark:text-stone-100">{currentStep?.title ?? 'Ready: choose an event and run the trace'}</p>
        <ArabicText className="text-sm font-semibold text-stone-800 dark:text-stone-200">{currentStep?.titleAr ?? 'جاهز: اختار حدث وشغّل التتبّع'}</ArabicText>
        <p className="mt-2 text-sm leading-6 text-stone-700 dark:text-stone-300">{currentStep?.detail ?? 'Follow the highlighted code, the queue, and the window state.'}</p>
        <ArabicText className="mt-1 text-sm leading-6 text-stone-600 dark:text-zinc-400">{currentStep?.detailAr ?? 'تابع سطر الكود المميز والـ Queue وحالة النافذة.'}</ArabicText>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={start} disabled={isRunning} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"><Play size={16} /><ArabicText as="span" className="text-inherit">شغّل (Run trace)</ArabicText></button>
        <button type="button" onClick={() => setStepIndex((index) => index + 1)} disabled={!trace || !isRunning} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-beige-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"><StepForward size={16} /><ArabicText as="span" className="text-inherit">الخطوة التالية (Step)</ArabicText></button>
        <button type="button" onClick={runAll} disabled={isRunning} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-beige-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"><ArrowRight size={16} /><ArabicText as="span" className="text-inherit">التتبّع كاملًا (Run all)</ArabicText></button>
        <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"><RotateCcw size={16} /><ArabicText as="span" className="text-inherit">إعادة الضبط (Reset)</ArabicText></button>
      </div>
      <p className="mt-3 text-xs leading-5 text-stone-500 dark:text-zinc-400">Teaching sketch: window creation, helper definitions, and GetMessage error recovery are omitted; this browser does not execute native Win32 code. The resize path demonstrates a sent message; Windows can invoke WndProc without queue dispatch.</p>
      <ArabicText className="mt-1 text-xs text-stone-500 dark:text-zinc-400">مثال تعليمي: إنشاء النافذة وتعريفات الدوال المساعدة والتعافي من خطأ GetMessage مش معروضين؛ المتصفح ده مش بيشغّل كود Win32 أصلي. مسار تغيير الحجم بيوضح رسالة Sent؛ وWindows تقدر تنادي WndProc من غير توجيه رسالة من الـ Queue.</ArabicText>
    </section>
  );
}

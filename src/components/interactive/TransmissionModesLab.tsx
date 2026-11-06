import React, { useEffect, useRef, useState } from 'react';
import { Radio, Send, CheckCircle2 } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type TransmissionType = 'unicast' | 'broadcast' | 'multicast';

interface LogMessage {
  en: string;
  ar: string;
}

const MODES: { id: TransmissionType; label: string }[] = [
  { id: 'unicast', label: 'Unicast' },
  { id: 'broadcast', label: 'Broadcast' },
  { id: 'multicast', label: 'Multicast' },
];

const DESTINATIONS = [2, 3, 4, 5];

const READY_LOG: LogMessage = {
  en: 'Ready to test transmission modes. Pick a mode above and hit Transmit.',
  ar: 'جاهز للاختبار. اختار نوع الإرسال واضغط إرسال وشوف مين هيستلم الفريم.',
};

const CARDS = [
  {
    title: 'واحد لواحد (Unicast)',
    body: 'زي رسالة خاصة بينك وبين صاحبك: الفريم رايح لـ MAC Address واحد محدد، والسويتش بيبعته على بورت الجهاز ده بس، وباقي الشبكة ملهاش دعوة.',
  },
  {
    title: 'واحد للكل (Broadcast)',
    body: 'زي الميكروفون في الإذاعة المدرسية: بيتبعت للعنوان FF:FF:FF:FF:FF:FF، فالسويتش بيوزعه على كل البورتات ما عدا اللي جه منها، والراوتر مش بيعديه لشبكة تانية.',
  },
  {
    title: 'واحد لمجموعة (Multicast)',
    body: 'زي البث المباشر لماتش كورة: الأجهزة اللي فتحت القناة (اشتركت في الجروب) بس هي اللي بتستلم الداتا، وده بيوفر Bandwidth على الشبكة.',
  },
];

export const TransmissionModesLab: React.FC = () => {
  const [mode, setMode] = useState<TransmissionType>('unicast');
  const [unicastTarget, setUnicastTarget] = useState<number>(3);
  const [multicastGroup, setMulticastGroup] = useState<number[]>([2, 4]);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [receivedNodes, setReceivedNodes] = useState<number[] | null>(null);
  const [logMessage, setLogMessage] = useState<LogMessage>(READY_LOG);
  const timer = useRef<number | null>(null);

  const clearTimer = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const resetResult = () => {
    clearTimer();
    setIsTransmitting(false);
    setReceivedNodes(null);
    setLogMessage(READY_LOG);
  };

  const handleTransmit = () => {
    if (isTransmitting) return;
    clearTimer();
    setIsTransmitting(true);
    setReceivedNodes(null);

    let targets: number[];
    if (mode === 'unicast') {
      targets = [unicastTarget];
      setLogMessage({
        en: `Unicast frame to PC-${unicastTarget} only: the switch looks up its MAC and forwards out that single port. Other hosts stay silent.`,
        ar: `إرسال أحادي (Unicast): الفريم رايح لـ PC-${unicastTarget} بس، والسويتش بعته على البورت بتاعه وحده.`,
      });
    } else if (mode === 'broadcast') {
      targets = DESTINATIONS;
      setLogMessage({
        en: 'Broadcast frame (FF:FF:FF:FF:FF:FF): the switch floods it out of every port except the one it arrived on, so all hosts receive it.',
        ar: 'بث عام (Broadcast): الفريم متبعت للعنوان FF:FF:FF:FF:FF:FF، فالسويتش وزعه على كل البورتات ما عدا اللي جه منها، وكل الأجهزة استلمته.',
      });
    } else {
      targets = multicastGroup;
      const members = multicastGroup.map(n => `PC-${n}`).join(', ');
      setLogMessage(
        multicastGroup.length === 0
          ? {
              en: 'Multicast group is empty: no host has subscribed, so the switch forwards the frame to nobody.',
              ar: 'الجروب فاضي ومفيش جهاز مشترك فيه، فالسويتش مش هيوصّل الفريم لأي حد.',
            }
          : {
              en: `Multicast frame (group 239.1.1.1 → MAC 01:00:5E:01:01:01) is forwarded only to subscribed hosts (IGMP Snooping): ${members}.`,
              ar: `بث مجموعات (Multicast): الفريم راح لأعضاء الجروب بس (${members}) بفرض إن الـ IGMP Snooping شغال، وباقي الأجهزة ملهاش دعوة.`,
            },
      );
    }

    timer.current = window.setTimeout(() => {
      timer.current = null;
      setReceivedNodes(targets);
      setIsTransmitting(false);
    }, 900);
  };

  const handleMode = (next: TransmissionType) => {
    setMode(next);
    resetResult();
  };

  const handleUnicastTarget = (id: number) => {
    setUnicastTarget(id);
    resetResult();
  };

  const toggleMulticastNode = (id: number) => {
    setMulticastGroup(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    resetResult();
  };

  const isMulticast = mode === 'multicast';

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Radio className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Transmission Modes Interactive Lab
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                محاكي طرق إرسال البيانات في الشبكة: (Unicast vs Broadcast vs Multicast)
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl flex flex-wrap items-center gap-1 text-xs font-bold border border-beige-300 dark:border-stone-700">
          {MODES.map(m => (
            <button
              key={m.id}
              onClick={() => handleMode(m.id)}
              aria-pressed={mode === m.id}
              className={`flex-1 px-3 py-1.5 rounded-xl text-center font-mono transition-all ${
                mode === m.id
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control Strip */}
      <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          {mode === 'unicast' && (
            <div className="flex flex-wrap items-center gap-2.5">
              <ArabicText as="span" className="text-sm font-bold text-stone-800 dark:text-zinc-200">
                اختار الجهاز المستقبل
              </ArabicText>
              <div className="flex flex-wrap gap-2">
                {DESTINATIONS.map(id => (
                  <button
                    key={id}
                    onClick={() => handleUnicastTarget(id)}
                    aria-pressed={unicastTarget === id}
                    className={`px-3 py-1.5 rounded-xl font-mono font-bold text-xs transition-all ${
                      unicastTarget === id
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                        : 'bg-beige-100 dark:bg-stone-800 text-stone-600 dark:text-zinc-400 border border-beige-300 dark:border-stone-700 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    PC-{id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'broadcast' && (
            <ArabicText as="span" className="text-sm text-stone-700 dark:text-zinc-300">
              الفريم هيتبعت لكل الأجهزة في الشبكة، فمفيش حاجة تختارها.
            </ArabicText>
          )}

          {isMulticast && (
            <ArabicText as="span" className="text-sm text-stone-700 dark:text-zinc-300">
              اضغط على أي جهاز تحت عشان تدخله أو تطلّعه من جروب الـ Multicast.
            </ArabicText>
          )}

          <button
            onClick={handleTransmit}
            disabled={isTransmitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm transition-all active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span dir="rtl" className="font-arabic">{isTransmitting ? 'جاري الإرسال...' : 'إرسال الفريم الآن'}</span>
          </button>
        </div>

        {/* Network Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Sender Node */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-500 text-center space-y-1.5">
            <span dir="rtl" className="font-arabic text-xs font-bold text-amber-800 dark:text-amber-300 block">
              الراسل (Sender)
            </span>
            <div className="text-3xl">💻</div>
            <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">PC-1</h5>
            <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 block">192.168.1.10</span>
          </div>

          {/* Central Switch */}
          <div
            className={`p-4 rounded-2xl bg-white dark:bg-stone-900 border text-center space-y-1.5 transition-all ${
              isTransmitting ? 'border-amber-500 scale-105 shadow-md' : 'border-beige-300 dark:border-stone-800'
            }`}
          >
            <span className="text-xs font-mono uppercase text-stone-600 dark:text-zinc-400 block font-semibold">Layer 2 Switch</span>
            <div className="text-2xl">🔀</div>
            <h5 className="font-bold text-sm text-stone-800 dark:text-zinc-200">LAN Switch</h5>
            <span className="text-xs text-stone-600 dark:text-zinc-400 font-mono block">
              {isTransmitting ? '⚡ Forwarding...' : 'Ready'}
            </span>
          </div>

          {/* Destination Nodes */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DESTINATIONS.map(id => {
              const isReceived = receivedNodes?.includes(id) ?? false;
              const inGroup = multicastGroup.includes(id);

              return (
                <div
                  key={id}
                  role={isMulticast ? 'button' : undefined}
                  tabIndex={isMulticast ? 0 : undefined}
                  aria-pressed={isMulticast ? inGroup : undefined}
                  onClick={() => isMulticast && toggleMulticastNode(id)}
                  onKeyDown={e => {
                    if (isMulticast && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      toggleMulticastNode(id);
                    }
                  }}
                  className={`min-w-0 p-3.5 rounded-2xl border text-center space-y-1.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ${
                    isMulticast ? 'cursor-pointer hover:border-amber-400' : ''
                  } ${
                    isReceived
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20 scale-105'
                      : isMulticast && inGroup
                      ? 'bg-white dark:bg-stone-900 border-amber-400 dark:border-amber-600'
                      : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 px-1">
                    <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">PC-{id}</span>
                    {isMulticast && (
                      <span
                        dir="rtl"
                        className={`font-arabic px-1.5 py-0.5 rounded text-xs font-bold whitespace-nowrap ${
                          inGroup
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100'
                            : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-zinc-400'
                        }`}
                      >
                        {inGroup ? 'في الجروب' : 'برّه الجروب'}
                      </span>
                    )}
                  </div>

                  <div className="text-2xl">💻</div>

                  <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 block">192.168.1.{id * 10}</span>

                  <div className="pt-1">
                    {isReceived ? (
                      <span dir="rtl" className="font-arabic text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> استلم الفريم
                      </span>
                    ) : (
                      <span dir="rtl" className="font-arabic text-xs text-stone-600 dark:text-zinc-400">
                        {receivedNodes === null ? 'مستني' : 'ما استلمش'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Output Console */}
        <div aria-live="polite" className="bg-stone-900 text-stone-100 p-4 rounded-2xl space-y-2 border border-stone-800">
          <div dir="rtl" className="flex items-start gap-2">
            <span className={`mt-2.5 w-2.5 h-2.5 shrink-0 rounded-full bg-amber-400 ${isTransmitting ? 'animate-pulse' : ''}`} />
            <p className="font-arabic text-sm leading-[1.75] text-zinc-100">{logMessage.ar}</p>
          </div>
          <p dir="ltr" className="font-mono text-xs text-zinc-400 pt-2 border-t border-stone-800">{logMessage.en}</p>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {CARDS.map(card => (
          <div
            key={card.title}
            className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5"
          >
            <h4 dir="rtl" className="font-arabic font-bold text-stone-900 dark:text-stone-100">{card.title}</h4>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">{card.body}</ArabicText>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransmissionModesLab;

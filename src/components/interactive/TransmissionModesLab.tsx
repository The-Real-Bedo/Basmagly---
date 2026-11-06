import React, { useState } from 'react';
import { Radio, Send, CheckCircle2 } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type TransmissionType = 'unicast' | 'broadcast' | 'multicast';

export const TransmissionModesLab: React.FC = () => {
  const [mode, setMode] = useState<TransmissionType>('unicast');
  const [unicastTarget, setUnicastTarget] = useState<number>(3);
  const [multicastGroup, setMulticastGroup] = useState<number[]>([2, 4]);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [receivedNodes, setReceivedNodes] = useState<number[]>([]);
  const [logMessage, setLogMessage] = useState<{ en: string; ar: string }>({
    en: 'Ready to test transmission modes. Select a mode above and hit Transmit.',
    ar: 'جاهز للاختبار. اختر نوع الإرسال واضغط إرسال وشوف مين هيستلم الحزمة.'
  });

  const handleTransmit = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    setReceivedNodes([]);

    let targets: number[] = [];
    if (mode === 'unicast') {
      targets = [unicastTarget];
      setLogMessage({
        en: `Unicast Frame targeting MAC/IP of PC-${unicastTarget} only. Other hosts remain silent.`,
        ar: `إرسال أحادي (Unicast) موجه لـ PC-${unicastTarget} فقط؛ السويتش وجه الفريم لبورت الجهاز ده بس.`
      });
    } else if (mode === 'broadcast') {
      targets = [2, 3, 4, 5];
      setLogMessage({
        en: 'Broadcast Frame (FF:FF:FF:FF:FF:FF) sent! Switch replicates frame to ALL ports in LAN.',
        ar: 'بث عام (Broadcast) لكل العناوين! السويتش وزع الحزمة على كل الأجهزة بلا استثناء.'
      });
    } else {
      targets = multicastGroup;
      setLogMessage({
        en: `Multicast (Class D 224.0.0.x) delivered selectively to subscribed hosts: [${multicastGroup.map(n => `PC-${n}`).join(', ')}].`,
        ar: `بث مجموعات (Multicast) لأعضاء الجروب المشتركين فقط: [${multicastGroup.map(n => `PC-${n}`).join(', ')}] وتوفير باندويث الشبكة.`
      });
    }

    setTimeout(() => {
      setReceivedNodes(targets);
      setIsTransmitting(false);
    }, 900);
  };

  const toggleMulticastNode = (id: number) => {
    setMulticastGroup(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            <Radio className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Transmission Modes Interactive Lab
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
              محاكي طرق إرسال البيانات (Unicast vs Broadcast vs Multicast) في الشبكات
            </ArabicText>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-beige-100 dark:bg-stone-800 p-1.5 rounded-2xl border border-beige-200 dark:border-stone-700">
          {(['unicast', 'broadcast', 'multicast'] as TransmissionType[]).map(t => (
            <button
              key={t}
              onClick={() => { setMode(t); setReceivedNodes([]); }}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-bold uppercase transition-all ${
                mode === t
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-700'
                  : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Control Strip */}
      <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          {mode === 'unicast' && (
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-stone-800 dark:text-zinc-200">اختر الجهاز المستقبل:</span>
              {[2, 3, 4, 5].map(id => (
                <button
                  key={id}
                  onClick={() => setUnicastTarget(id)}
                  className={`px-3 py-1.5 rounded-lg font-mono font-bold transition-all text-sm ${
                    unicastTarget === id
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 hover:bg-stone-300'
                  }`}
                >
                  PC-{id}
                </button>
              ))}
            </div>
          )}

          {mode === 'multicast' && (
            <div className="flex items-center gap-2 text-stone-700 dark:text-zinc-300">
              <ArabicText as="span" className="text-sm">
                اضغط على أي جهاز تحت عشان تدخله أو تطلعه من جروب الـ Multicast:
              </ArabicText>
            </div>
          )}

          <button
            onClick={handleTransmit}
            disabled={isTransmitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm transition-all active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>{isTransmitting ? 'جاري الإرسال...' : 'إرسال الحزمة الآن'}</span>
          </button>
        </div>

        {/* Network Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Sender Node 1 */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-500 text-center space-y-1.5">
            <span className="text-[13px] font-mono font-bold text-amber-800 dark:text-amber-300 block">SENDER</span>
            <div className="text-3xl">💻</div>
            <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">PC-1</h5>
            <span className="text-[13px] font-mono text-stone-600 dark:text-zinc-400 block">192.168.1.10</span>
          </div>

          {/* Central Switch */}
          <div className={`md:col-span-1 p-4 rounded-2xl bg-white dark:bg-stone-900 border text-center space-y-1.5 transition-all ${
            isTransmitting ? 'border-amber-500 scale-105 shadow-md' : 'border-beige-300 dark:border-stone-800'
          }`}>
            <span className="text-[13px] font-mono uppercase text-stone-600 dark:text-zinc-400 block font-semibold">Layer 2 Switch</span>
            <div className="text-2xl">🔀</div>
            <h5 className="font-bold text-sm text-stone-800 dark:text-zinc-200">LAN Switch</h5>
            <span className="text-[13px] text-stone-600 dark:text-zinc-400 font-mono block">
              {isTransmitting ? '⚡ Forwarding...' : 'Ready'}
            </span>
          </div>

          {/* Destination Nodes (2, 3, 4, 5) */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[2, 3, 4, 5].map(id => {
              const isReceived = receivedNodes.includes(id);
              const inGroup = multicastGroup.includes(id);

              return (
                <div
                  key={id}
                  onClick={() => mode === 'multicast' && toggleMulticastNode(id)}
                  className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition-all ${
                    mode === 'multicast' ? 'cursor-pointer hover:border-amber-400' : ''
                  } ${
                    isReceived
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20 scale-105'
                      : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[13px] px-1 font-mono">
                    <span className="font-bold">PC-{id}</span>
                    {mode === 'multicast' && (
                      <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        inGroup ? 'bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100' : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-zinc-400'
                      }`}>
                        {inGroup ? 'عضو' : 'بره'}
                      </span>
                    )}
                  </div>

                  <div className="text-2xl">💻</div>

                  <span className="text-[13px] font-mono text-stone-600 dark:text-zinc-400 block">
                    192.168.1.{10 + id}
                  </span>

                  <div className="pt-1">
                    {isReceived ? (
                      <span className="text-[13px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> استلم الحزمة
                      </span>
                    ) : (
                      <span className="text-[13px] text-stone-500 dark:text-zinc-400">في الانتظار</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Output Console */}
        <div className="bg-stone-900 text-stone-100 p-4 rounded-2xl font-mono text-sm space-y-1.5 border border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-zinc-200">{logMessage.en}</span>
          </div>
          <ArabicText className="text-zinc-300 text-sm pt-1 border-t border-stone-800">
            {logMessage.ar}
          </ArabicText>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <h5 className="font-bold text-stone-900 dark:text-stone-100">1. Unicast (واحد لواحد)</h5>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
            زي الشات الخاص بينك وبين صاحبك؛ الحزمة رايحة لعنوان ماك وآي بي محدد بالاسم، وباقي الشبكة ملهاش دعوة.
          </ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <h5 className="font-bold text-stone-900 dark:text-stone-100">2. Broadcast (من واحد للجميع)</h5>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
            زي ميكروفون الإذاعة المدرسية؛ بتتبعت للعنوان FF:FF:FF:FF:FF:FF فالسويتش بيوزعها على كل الناس في الشبكة.
          </ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <h5 className="font-bold text-stone-900 dark:text-stone-100">3. Multicast (لمجموعة محددة)</h5>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
            زي البث المباشر لماتش كورة؛ الأجهزة اللي فاتحة القناة بس هي اللي بتستلم الداتا عشان نوفر سرعة وباندويث الشبكة.
          </ArabicText>
        </div>
      </div>
    </div>
  );
};

export default TransmissionModesLab;

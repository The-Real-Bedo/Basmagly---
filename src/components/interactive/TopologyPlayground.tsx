import React, { useState } from 'react';
import { Share2, Send, RefreshCw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type Topology = 'star' | 'bus' | 'ring' | 'mesh';

export const TopologyPlayground: React.FC = () => {
  const [topology, setTopology] = useState<Topology>('star');
  const [hubFailed, setHubFailed] = useState<boolean>(false);
  const [failedNode, setFailedNode] = useState<number | null>(null);
  const [cableBroken, setCableBroken] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ en: string; ar: string } | null>(null);

  const resetAll = () => {
    setHubFailed(false);
    setFailedNode(null);
    setCableBroken(false);
    setStatusMessage(null);
  };

  const handleSend = () => {
    setIsSending(true);
    setStatusMessage({
      en: 'Routing packet from PC-1 to PC-3...',
      ar: 'جاري توجيه الحزمة من PC-1 إلى PC-3...'
    });

    setTimeout(() => {
      setIsSending(false);
      if (topology === 'star') {
        if (hubFailed) {
          setStatusMessage({
            en: '❌ Transmission Failed: Central Switch/Hub failure collapsed the entire network (Single Point of Failure).',
            ar: '❌ فشل الإرسال: تعطل السويتش/الهب المركزي أدى لانهيار الشبكة كاملة (نقطة فشل مفردة).'
          });
        } else if (failedNode === 1 || failedNode === 3) {
          setStatusMessage({
            en: '❌ Transmission Failed: One of the communicating endpoints (Sender/Receiver) is offline.',
            ar: '❌ فشل الإرسال: أحد الجهازين (المرسل أو المستقبل) معطل.'
          });
        } else {
          setStatusMessage({
            en: '✅ Delivery Successful: Central switch forwarded the frame directly to PC-3 without affecting other nodes.',
            ar: '✅ نجاح الإرسال: قام السويتش بتوجيه الإطار مباشرة إلى PC-3 دون التأثير على باقي الأجهزة.'
          });
        }
      } else if (topology === 'bus') {
        if (cableBroken) {
          setStatusMessage({
            en: '❌ Transmission Failed: Main trunk cable break caused signal reflection and complete network breakdown.',
            ar: '❌ فشل الإرسال: انقطاع الكابل الرئيسي أدى لانعكاس الإشارة وتوقف كامل الشبكة.'
          });
        } else if (failedNode === 1 || failedNode === 3) {
          setStatusMessage({
            en: '❌ Transmission Failed: Communicating node offline.',
            ar: '❌ فشل الإرسال: أحد الجهازين معطل.'
          });
        } else {
          setStatusMessage({
            en: '✅ Delivery Successful: Signal propagated across the common shared trunk and was accepted by PC-3.',
            ar: '✅ نجاح الإرسال: انتقلت الإشارة عبر الكابل المشترك واستلمها PC-3.'
          });
        }
      } else if (topology === 'ring') {
        if (cableBroken || failedNode !== null) {
          setStatusMessage({
            en: '❌ Transmission Failed: Break in the ring or a failed host stopped token circulation.',
            ar: '❌ فشل الإرسال: انقطاع الحلقة أو تعطل أحد الحواسيب أوقف دوران الـ Token بالكامل.'
          });
        } else {
          setStatusMessage({
            en: '✅ Delivery Successful: Frame traversed ring nodes sequentially until confirmed by PC-3.',
            ar: '✅ نجاح الإرسال: دارت الحزمة عبر الحلقة حتى استلمها PC-3 وأعيد تحرير التوكن.'
          });
        }
      } else if (topology === 'mesh') {
        if (failedNode === 1 || failedNode === 3) {
          setStatusMessage({
            en: '❌ Transmission Failed: Destination endpoint is physically powered off.',
            ar: '❌ فشل الإرسال: الجهاز الهدف مغلق فيزيائياً.'
          });
        } else {
          setStatusMessage({
            en: '✅ Delivery Successful: Full mesh provided alternative redundant pathways with zero service interruption.',
            ar: '✅ نجاح الإرسال: وفرت شبكة Mesh مسارات بديلة فورية دون أي انقطاع في الخدمة.'
          });
        }
      }
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            <Share2 className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Network Topologies & Fault Tolerance Simulator
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
              محاكي طوبولوجيا الشبكات وتأثير الأعطال على استمرارية الاتصال
            </ArabicText>
          </div>
        </div>

        {/* Topology Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-beige-100 dark:bg-stone-800 p-1.5 rounded-2xl border border-beige-200 dark:border-stone-700">
          {[
            { id: 'star', label: 'Star Topology' },
            { id: 'bus', label: 'Bus Topology' },
            { id: 'ring', label: 'Ring Topology' },
            { id: 'mesh', label: 'Mesh Topology' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                setTopology(t.id as Topology);
                resetAll();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${
                topology === t.id
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-700'
                  : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Board */}
      <div className="relative bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center border border-beige-300 dark:border-stone-800 select-none">
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between gap-2 mb-4">
          <span className="text-sm font-mono text-stone-600 dark:text-zinc-400">
            Interactive Test: Click devices or links to simulate faults.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSend}
              disabled={isSending}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-sm font-bold transition-all active:scale-95 disabled:opacity-50 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'جاري الإرسال...' : 'إرسال حزمة (PC-1 ➔ PC-3)'}</span>
            </button>
            <button
              onClick={resetAll}
              className="p-2.5 rounded-xl bg-beige-100 dark:bg-stone-800 text-stone-700 dark:text-zinc-300 border border-beige-300 dark:border-stone-700 hover:bg-beige-200 shadow-2xs"
              title="Reset state"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Representations */}
        <div className="w-full flex items-center justify-center py-6">
          {topology === 'star' && (
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Central Switch/Hub */}
              <button
                onClick={() => setHubFailed(!hubFailed)}
                className={`z-10 p-3.5 rounded-2xl border-2 transition-all text-center ${
                  hubFailed
                    ? 'bg-rose-100 border-rose-500 text-rose-800 animate-pulse'
                    : 'bg-white dark:bg-stone-900 border-stone-800 dark:border-stone-300 text-stone-900 dark:text-stone-100'
                }`}
              >
                <div className="text-2xl">🔀</div>
                <div className="font-bold text-sm">Central Switch</div>
                <span className="text-[13px] text-stone-600 dark:text-zinc-400 font-mono">
                  {hubFailed ? 'FAILED 💥' : 'Active'}
                </span>
              </button>

              {/* Surrounding Nodes */}
              {[
                { id: 1, pos: 'top-0 left-1/2 -translate-x-1/2' },
                { id: 2, pos: 'right-0 top-1/2 -translate-y-1/2' },
                { id: 3, pos: 'bottom-0 left-1/2 -translate-x-1/2' },
                { id: 4, pos: 'left-0 top-1/2 -translate-y-1/2' },
              ].map(node => (
                <button
                  key={node.id}
                  onClick={() => setFailedNode(failedNode === node.id ? null : node.id)}
                  className={`absolute ${node.pos} p-2.5 rounded-xl text-sm font-bold border transition-all ${
                    failedNode === node.id
                      ? 'bg-rose-50 border-rose-400 text-rose-600 line-through'
                      : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200'
                  }`}
                >
                  💻 PC-{node.id}
                </button>
              ))}
            </div>
          )}

          {topology === 'bus' && (
            <div className="w-full max-w-lg space-y-6">
              <div
                onClick={() => setCableBroken(!cableBroken)}
                className={`h-3 rounded-full cursor-pointer transition-colors relative flex items-center justify-center ${
                  cableBroken ? 'bg-rose-500 line-through' : 'bg-stone-800 dark:bg-stone-200'
                }`}
              >
                <span className="absolute -top-6 text-[13px] font-mono text-stone-600 dark:text-zinc-400">
                  {cableBroken ? '⚡ CABLE SEVERED (انقطاع الكابل)' : 'Coaxial Trunk Cable (اضغط لقطع الكابل)'}
                </span>
              </div>

              <div className="flex justify-between">
                {[1, 2, 3, 4].map(id => (
                  <button
                    key={id}
                    onClick={() => setFailedNode(failedNode === id ? null : id)}
                    className={`p-2.5 rounded-xl text-sm font-bold border ${
                      failedNode === id
                        ? 'bg-rose-50 border-rose-400 text-rose-600 line-through'
                        : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200'
                    }`}
                  >
                    💻 PC-{id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {topology === 'ring' && (
            <div className="relative w-60 h-60 flex items-center justify-center">
              <div
                onClick={() => setCableBroken(!cableBroken)}
                className={`absolute w-48 h-48 rounded-full border-2 cursor-pointer transition-colors ${
                  cableBroken ? 'border-dashed border-rose-500' : 'border-stone-800 dark:border-stone-300'
                }`}
              />
              <span className="text-[13px] font-mono font-bold bg-white dark:bg-stone-900 px-2.5 py-1 rounded-md border border-beige-300 dark:border-stone-700">
                Token Passing
              </span>

              {[
                { id: 1, pos: 'top-0' },
                { id: 2, pos: 'right-0' },
                { id: 3, pos: 'bottom-0' },
                { id: 4, pos: 'left-0' },
              ].map(node => (
                <button
                  key={node.id}
                  onClick={() => setFailedNode(failedNode === node.id ? null : node.id)}
                  className={`absolute ${node.pos} p-2.5 rounded-xl text-sm font-bold border ${
                    failedNode === node.id
                      ? 'bg-rose-50 border-rose-400 text-rose-600 line-through'
                      : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200'
                  }`}
                >
                  💻 PC-{node.id}
                </button>
              ))}
            </div>
          )}

          {topology === 'mesh' && (
            <div className="relative w-60 h-60 flex items-center justify-center">
              <div className="absolute inset-4 border border-stone-400/40 rotate-45 rounded-lg pointer-events-none" />
              <div className="absolute inset-4 border border-stone-400/40 rounded-lg pointer-events-none" />
              <span className="text-[13px] font-mono font-bold bg-white dark:bg-stone-900 px-2.5 py-1 rounded-md border border-beige-300 dark:border-stone-700">
                Full Mesh
              </span>

              {[
                { id: 1, pos: 'top-2 left-2' },
                { id: 2, pos: 'top-2 right-2' },
                { id: 3, pos: 'bottom-2 right-2' },
                { id: 4, pos: 'bottom-2 left-2' },
              ].map(node => (
                <button
                  key={node.id}
                  onClick={() => setFailedNode(failedNode === node.id ? null : node.id)}
                  className={`absolute ${node.pos} p-2.5 rounded-xl text-sm font-bold border ${
                    failedNode === node.id
                      ? 'bg-rose-50 border-rose-400 text-rose-600 line-through'
                      : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200'
                  }`}
                >
                  💻 PC-{node.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Status */}
        {statusMessage && (
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 text-sm w-full max-w-lg space-y-1.5 shadow-xs">
            <p className="font-bold text-stone-900 dark:text-stone-100">{statusMessage.en}</p>
            <ArabicText className="text-stone-600 dark:text-zinc-300 text-sm">{statusMessage.ar}</ArabicText>
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="p-4 rounded-2xl bg-beige-50 dark:bg-stone-800/40 border border-beige-200 dark:border-stone-800 space-y-1.5">
          <h5 className="font-bold text-stone-900 dark:text-stone-100">Star Topology</h5>
          <p className="text-stone-700 dark:text-zinc-300 leading-relaxed">Central hub/switch; simple node addition. Central hub failure halts all network.</p>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 pt-1.5 border-t border-beige-200 dark:border-stone-700">
            طوبولوجيا النجمة: الأكثر شيوعاً، عيبها انهيار الشبكة بتوقف السويتش المركزي.
          </ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-beige-50 dark:bg-stone-800/40 border border-beige-200 dark:border-stone-800 space-y-1.5">
          <h5 className="font-bold text-stone-900 dark:text-stone-100">Bus Topology</h5>
          <p className="text-stone-700 dark:text-zinc-300 leading-relaxed">Single shared backbone cable. Inexpensive; trunk cable severance stops all transmission.</p>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 pt-1.5 border-t border-beige-200 dark:border-stone-700">
            طوبولوجيا الناقل: كابل مفرد، أي انقطاع فيه يعطل الشبكة بالكامل.
          </ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-beige-50 dark:bg-stone-800/40 border border-beige-200 dark:border-stone-800 space-y-1.5">
          <h5 className="font-bold text-stone-900 dark:text-stone-100">Ring Topology</h5>
          <p className="text-stone-700 dark:text-zinc-300 leading-relaxed">Token passing loop prevents collisions. Any break in loop breaks token rotation.</p>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 pt-1.5 border-t border-beige-200 dark:border-stone-700">
            طوبولوجيا الحلقة: تدور التوكن بالترتيب، عيبها توقف الحلقة بتعطل أي عقدة.
          </ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-beige-50 dark:bg-stone-800/40 border border-beige-200 dark:border-stone-800 space-y-1.5">
          <h5 className="font-bold text-stone-900 dark:text-stone-100">Mesh Topology</h5>
          <p className="text-stone-700 dark:text-zinc-300 leading-relaxed">Redundant multi-links; maximum fault tolerance and zero single points of failure.</p>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 pt-1.5 border-t border-beige-200 dark:border-stone-700">
            طوبولوجيا الشبكة: مسارات بديلة متعددة تضمن عدم انقطاع الاتصال أبداً.
          </ArabicText>
        </div>
      </div>
    </div>
  );
};

export default TopologyPlayground;

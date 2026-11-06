import React, { useState } from 'react';
import { Network, Zap, ShieldAlert, CheckCircle2, Play, Flame, Cpu, ArrowRight, RefreshCw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type DeviceType = 'hub' | 'switch' | 'router';

interface ConnectedNode {
  id: string;
  name: string;
  ip: string;
  mac: string;
  port: number;
}

const NODES: ConnectedNode[] = [
  { id: 'pca', name: 'PC-A', ip: '192.168.1.10', mac: 'AA:11:11:11', port: 1 },
  { id: 'pcb', name: 'PC-B', ip: '192.168.1.20', mac: 'BB:22:22:22', port: 2 },
  { id: 'pcc', name: 'PC-C', ip: '192.168.1.30', mac: 'CC:33:33:33', port: 3 },
  { id: 'pcd', name: 'PC-D', ip: '192.168.1.40', mac: 'DD:44:44:44', port: 4 },
];

export const NetworkDevicesCollisionLab: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>('hub');
  const [senderId, setSenderId] = useState<string>('pca');
  const [targetId, setTargetId] = useState<string>('pcc');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hasCollision, setHasCollision] = useState<boolean>(false);
  const [activeWires, setActiveWires] = useState<string[]>([]);
  const [statusLog, setStatusLog] = useState<string>('اختر الجهاز والراسل واضغط إرسال وشوف النتيجة لايف.');

  const handleSend = (forceSimultaneous = false) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setHasCollision(false);

    if (activeDevice === 'hub') {
      if (forceSimultaneous) {
        // Collision in Hub!
        setActiveWires(['pca', 'pcb', 'hub']);
        setStatusLog('⚠️ كارثة! PC-A و PC-B بعتوا في نفس الفيمتوثانية على الهب! الإشارات خبطت في بعضها!');
        setTimeout(() => {
          setHasCollision(true);
          setActiveWires(['collision']);
          setStatusLog('💥 تصادم بيانات (Data Collision)! الهب مفيهوش ذكاء، الإشارات الكهربائية اتداخلت والباكيتات اتدمرت! (1 Collision Domain)');
          setTimeout(() => {
            setIsSimulating(false);
          }, 2400);
        }, 800);
      } else {
        // Hub floods everybody
        setActiveWires([senderId, 'hub', 'pca', 'pcb', 'pcc', 'pcd'].filter(id => id !== senderId));
        setStatusLog(`📡 الهب استلم الإشارة من ${senderId.toUpperCase()} وقام غبي وبعتها لكل الأجهزة بدون استثناء!`);
        setTimeout(() => {
          setIsSimulating(false);
          setStatusLog(`✅ وصلت لكل الأجهزة، بس ${targetId.toUpperCase()} بس هو اللي قبلها والباقي عمل Drop.`);
        }, 1800);
      }
    } else if (activeDevice === 'switch') {
      if (forceSimultaneous) {
        // Switch isolates collision domains!
        setActiveWires(['pca', 'pcb', 'switch']);
        setStatusLog('💡 جامد! في السويتش كل بورت معزول تماماً (Micro-segmentation)! كل جهاز بيبعت في خط منفصل بدون أي تصادم!');
        setTimeout(() => {
          setActiveWires(['switch', targetId, 'pcd']);
          setStatusLog(`🎯 السويتش بص في الـ MAC Table ووجه باكيت A لـ ${targetId.toUpperCase()} وباكيت B لـ PC-D بأمان 100%!`);
          setTimeout(() => {
            setIsSimulating(false);
          }, 1800);
        }, 900);
      } else {
        // Switch direct unicast
        setActiveWires([senderId, 'switch']);
        setStatusLog(`🔍 السويتش استلم الفريم وبص في جدول الـ MAC (CAM Table) وعرف إن ${targetId.toUpperCase()} على البورت بتاعه.`);
        setTimeout(() => {
          setActiveWires(['switch', targetId]);
          setStatusLog(`🎯 السويتش بعت الفريم بسلك مباشر لـ ${targetId.toUpperCase()} فقط! باقي الأجهزة أسلاكها ساكتة تماماً!`);
          setTimeout(() => {
            setIsSimulating(false);
          }, 1600);
        }, 800);
      }
    } else {
      // Router mode
      setActiveWires([senderId, 'router']);
      setStatusLog(`🌐 الراوتر استلم الباكيت على مستوى Layer 3، بص في الـ IP Routing Table عشان يحدد الشبكة.`);
      setTimeout(() => {
        setActiveWires(['router', targetId]);
        setStatusLog(`✨ الراوتر بيفصل مجالات البث والتصادم (Separates Broadcast & Collision Domains) ويوجه للشبكة الصح!`);
        setTimeout(() => {
          setIsSimulating(false);
        }, 1600);
      }, 900);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Network Devices & Collision Domain Simulator
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                محاكي الفرق الجوهري بين (Hub vs Switch vs Router) وتصادم الإشارات ببساطة
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl flex items-center text-xs font-bold border border-beige-300 dark:border-stone-700">
          <button
            onClick={() => { setActiveDevice('hub'); setHasCollision(false); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeDevice === 'hub'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Hub (المجمع)
          </button>
          <button
            onClick={() => { setActiveDevice('switch'); setHasCollision(false); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeDevice === 'switch'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Switch (المبدل)
          </button>
          <button
            onClick={() => { setActiveDevice('router'); setHasCollision(false); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeDevice === 'router'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Router (الموجه)
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 p-4 rounded-2xl border border-beige-300 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3">
          <div>
            <label className="font-bold text-stone-700 dark:text-zinc-300 block mb-1 text-xs">الراسل (Sender):</label>
            <select
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-xs font-bold text-stone-800 dark:text-stone-200"
            >
              {NODES.map(n => (
                <option key={n.id} value={n.id}>{n.name} ({n.ip})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-stone-700 dark:text-zinc-300 block mb-1 text-xs">المستقبل (Target):</label>
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-xs font-bold text-stone-800 dark:text-stone-200"
            >
              {NODES.filter(n => n.id !== senderId).map(n => (
                <option key={n.id} value={n.id}>{n.name} ({n.ip})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSend(false)}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold shadow-sm transition-all disabled:opacity-40 text-xs"
          >
            <Play className="w-3.5 h-3.5" />
            <span>إرسال عادي 🚀</span>
          </button>

          <button
            onClick={() => handleSend(true)}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-sm transition-all disabled:opacity-40 text-xs"
            title="تجربة إرسال جهازين في نفس اللحظة لرؤية التصادم في الهب مقابل السويتش"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>إرسال متزامن (اختبار التصادم 💥)</span>
          </button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative bg-[#FAF8F5] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 rounded-3xl p-8 min-h-[320px] flex items-center justify-center overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#dcd1bd_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Central Device Node */}
        <div className={`relative z-10 flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all ${
          hasCollision
            ? 'border-rose-500 bg-rose-100 dark:bg-rose-950 collision-flash shadow-xl'
            : activeDevice === 'switch'
            ? 'border-emerald-500 bg-white dark:bg-stone-900 shadow-md'
            : activeDevice === 'router'
            ? 'border-blue-500 bg-white dark:bg-stone-900 shadow-md'
            : 'border-amber-500 bg-white dark:bg-stone-900 shadow-md'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-2">
            {activeDevice === 'hub' && <Zap className="w-6 h-6 text-amber-600" />}
            {activeDevice === 'switch' && <Network className="w-6 h-6 text-emerald-600" />}
            {activeDevice === 'router' && <Cpu className="w-6 h-6 text-blue-600" />}
          </div>
          <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100 uppercase">
            {activeDevice.toUpperCase()}
          </span>
          <span className="text-xs text-stone-600 dark:text-zinc-400 font-mono mt-0.5">
            {activeDevice === 'hub' && 'Layer 1 • Physical'}
            {activeDevice === 'switch' && 'Layer 2 • Data Link'}
            {activeDevice === 'router' && 'Layer 3 • Network'}
          </span>

          {hasCollision && (
            <div className="absolute -top-3 px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold animate-bounce flex items-center gap-1 shadow-lg">
              <span>💥</span> COLLISION DETECTED!
            </div>
          )}
        </div>

        {/* 4 Connected PCs */}
        {/* Top-Left: PC-A */}
        <div className={`absolute top-6 left-8 p-3 rounded-2xl border transition-all text-center min-w-[120px] ${
          senderId === 'pca'
            ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 font-bold'
            : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900'
        }`}>
          <span className="text-xs font-mono font-bold block text-stone-900 dark:text-stone-100">PC-A</span>
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 block">192.168.1.10</span>
          {activeWires.includes('pca') && (
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold animate-pulse mt-0.5 block">📡 جاري الإرسال...</span>
          )}
        </div>

        {/* Bottom-Left: PC-B */}
        <div className={`absolute bottom-6 left-8 p-3 rounded-2xl border transition-all text-center min-w-[120px] ${
          senderId === 'pcb'
            ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 font-bold'
            : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900'
        }`}>
          <span className="text-xs font-mono font-bold block text-stone-900 dark:text-stone-100">PC-B</span>
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 block">192.168.1.20</span>
          {activeWires.includes('pcb') && (
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold animate-pulse mt-0.5 block">📡 جاري الإرسال...</span>
          )}
        </div>

        {/* Top-Right: PC-C */}
        <div className={`absolute top-6 right-8 p-3 rounded-2xl border transition-all text-center min-w-[120px] ${
          targetId === 'pcc'
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 font-bold'
            : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900'
        }`}>
          <span className="text-xs font-mono font-bold block text-stone-900 dark:text-stone-100">PC-C (Target)</span>
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 block">192.168.1.30</span>
          {activeWires.includes('pcc') && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold animate-bounce mt-0.5 block">🎯 استلم الحزمة!</span>
          )}
        </div>

        {/* Bottom-Right: PC-D */}
        <div className={`absolute bottom-6 right-8 p-3 rounded-2xl border transition-all text-center min-w-[120px] ${
          targetId === 'pcd'
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 font-bold'
            : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900'
        }`}>
          <span className="text-xs font-mono font-bold block text-stone-900 dark:text-stone-100">PC-D</span>
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 block">192.168.1.40</span>
          {activeWires.includes('pcd') && (
            <span className="text-xs text-stone-600 dark:text-zinc-400 font-bold mt-0.5 block">
              {activeDevice === 'hub' ? '⚠️ استلم بالغلط وعمل Drop' : '🎯 استلم'}
            </span>
          )}
        </div>
      </div>

      {/* Live Status Commentary */}
      <div className={`p-4 rounded-2xl border text-sm space-y-1.5 transition-all ${
        hasCollision
          ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-stone-800 dark:text-stone-200'
      }`}>
        <div className="flex items-center gap-1.5 font-bold">
          <span>⚡</span>
          <span>تحليل مسار الإشارة لايف:</span>
        </div>
        <ArabicText className="font-arabic leading-relaxed font-medium text-stone-800 dark:text-zinc-200">
          {statusLog}
        </ArabicText>
      </div>

      {/* Core Exam Rules Table */}
      <div className="border border-beige-300 dark:border-stone-800 rounded-2xl overflow-hidden text-sm">
        <div className="bg-beige-100 dark:bg-stone-800 p-3 font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
          <span>مقارنة الامتحان الذهبية: Hub vs Switch vs Router</span>
          <span className="text-xs font-normal text-stone-600 dark:text-zinc-400 font-arabic">سؤال بيتكرر في كل امتحانات الفاينل</span>
        </div>

        <div className="divide-y divide-beige-200 dark:divide-stone-800">
          <div className="grid grid-cols-1 md:grid-cols-4 p-3 bg-white dark:bg-stone-900 gap-2 items-center">
            <span className="font-bold text-stone-900 dark:text-stone-100 font-mono text-xs">Hub (المجمع)</span>
            <span className="text-stone-700 dark:text-zinc-300 text-xs">Layer 1 (Physical)</span>
            <span className="text-rose-600 dark:text-rose-400 font-semibold font-arabic text-xs">1 Collision Domain (تصادم مشترك)</span>
            <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">مبيفهمش عناوين، بيكرر الإشارة لكل البورتات</ArabicText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 p-3 bg-[#FAF7F2] dark:bg-stone-950 gap-2 items-center">
            <span className="font-bold text-stone-900 dark:text-stone-100 font-mono text-xs">Switch (المبدل)</span>
            <span className="text-stone-700 dark:text-zinc-300 text-xs">Layer 2 (Data Link)</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-arabic text-xs">كل بورت = Collision Domain مستقل!</span>
            <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">بيفهم MAC Address ويبعت لصاحب الشأن بس</ArabicText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 p-3 bg-white dark:bg-stone-900 gap-2 items-center">
            <span className="font-bold text-stone-900 dark:text-stone-100 font-mono text-xs">Router (الموجه)</span>
            <span className="text-stone-700 dark:text-zinc-300 text-xs">Layer 3 (Network)</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold font-arabic text-xs">بيفصل Collision AND Broadcast Domains</span>
            <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">بيفهم IP Address ويربط شبكات مختلفة ببعضها</ArabicText>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Route, Play, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

interface HopStep {
  stepIndex: number;
  currentDevice: string;
  nextDevice: string;
  sourceIp: string;
  destIp: string;
  sourceMac: string;
  destMac: string;
  explanationEn: string;
  explanationAr: string;
}

const JOURNEY_STEPS: HopStep[] = [
  {
    stepIndex: 0,
    currentDevice: 'PC-1 (Sender Host)',
    nextDevice: 'Local Switch',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    sourceMac: 'AA:11:AA:11:AA:11 (PC-1)',
    destMac: 'BB:22:BB:22:BB:22 (Router G0/0)',
    explanationEn: 'PC-1 realizes the destination IP (10.0.0.50) is in a DIFFERENT network! So it encapsulates the frame targeting the Default Gateway MAC address.',
    explanationAr: 'الـ PC اكتشف إن السيرفر في شبكة تانية خالص (10.0.0.0)، فقالك: "أنا ماليش دعوة بالسيرفر دلوقتي، أنا هبعت لمدير العمارة (الراوتر - Default Gateway) وهو يتصرف!" فحط الـ MAC بتاع الراوتر كـ Destination.'
  },
  {
    stepIndex: 1,
    currentDevice: 'Local LAN Switch',
    nextDevice: 'Router (Default Gateway)',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    sourceMac: 'AA:11:AA:11:AA:11 (PC-1)',
    destMac: 'BB:22:BB:22:BB:22 (Router G0/0)',
    explanationEn: 'The Switch simply inspects the Layer 2 Destination MAC (BB:22...), matches it in its MAC Address Table, and forwards the frame out port G0/1 towards the Router.',
    explanationAr: 'السويتش جهاز بتاع Layer 2 مالهوش دعوة بالـ IP! بص في جدول الماك بتاعه، لقى ماك الراوتر على بورت 1، فقام باعت الإطار فوراً للراوتر.'
  },
  {
    stepIndex: 2,
    currentDevice: 'Router (Gateway Hop)',
    nextDevice: 'Remote Switch & Server',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    sourceMac: 'CC:33:CC:33:CC:33 (Router G0/1)',
    destMac: 'DD:44:DD:44:DD:44 (Server)',
    explanationEn: 'CRITICAL HOP: The router strips old Layer 2 MACs! IP addresses REMAIN CONSTANT. Router writes its own egress MAC as Source and the Server MAC as Destination.',
    explanationAr: 'هنا بقى اللقطة اللي بتيجي في كل الامتحانات! 💥 الراوتر رمى قشرة الـ MAC القديمة خالص وكتب MAC جديد، بس الـ IP فضل ثابت زي ما هو! (الـ IP ثابت والـ MAC بيتغير مع كل نطة Hop).'
  },
  {
    stepIndex: 3,
    currentDevice: 'Web Server (Destination)',
    nextDevice: 'Completed!',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    sourceMac: 'CC:33:CC:33:CC:33 (Router G0/1)',
    destMac: 'DD:44:DD:44:DD:44 (Server)',
    explanationEn: 'The Server verifies Destination MAC matches its NIC, decapsulates Layer 2 and Layer 3, and passes the HTTP payload to the Web Application!',
    explanationAr: 'وصلت بالسلامة! السيرفر لقى الـ MAC بتاعه والـ IP بتاعه، فك التغليف وطلع البيانات لبرنامج الويب عشان يرد عليك بالصفحة.'
  }
];

export const PacketJourneyLab: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeHop = JOURNEY_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < JOURNEY_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const handleAutoPlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentStep(0);

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= JOURNEY_STEPS.length - 1) {
          clearInterval(timer);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            <Route className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Interactive Hop-by-Hop Packet Routing Lab
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
              معمل رحلة الحزمة: ليه الـ IP بيفضل ثابت طول السكة والـ MAC بيتغير مع كل نطة؟
            </ArabicText>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleAutoPlay}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-sm font-bold transition-all disabled:opacity-50 active:scale-95 shadow-sm"
          >
            <Play className="w-4 h-4" />
            <span>{isPlaying ? 'جاري العرض التلقائي...' : 'المحاكاة التلقائية (Auto Play)'}</span>
          </button>
          <button
            onClick={handleNext}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-beige-100 hover:bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 text-sm font-bold transition-all border border-beige-300 dark:border-stone-700 shadow-2xs"
          >
            <span>{currentStep === JOURNEY_STEPS.length - 1 ? 'ابدأ من الأول' : 'الخطوة الجاية ➔'}</span>
          </button>
          <button
            onClick={() => setCurrentStep(0)}
            className="p-2.5 rounded-xl bg-beige-100 dark:bg-stone-800 text-stone-700 dark:text-zinc-300 border border-beige-300 dark:border-stone-700 hover:bg-beige-200 shadow-2xs"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Network Path Map */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl p-6 border border-beige-300 dark:border-stone-800 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 items-center text-center">
          {/* Node 1: PC-1 */}
          <div className={`p-4 rounded-2xl border transition-all ${
            currentStep === 0
              ? 'bg-amber-100/70 dark:bg-amber-950/40 border-amber-500 shadow-md scale-105'
              : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
          }`}>
            <span className="text-[13px] font-mono text-stone-600 dark:text-zinc-400 block font-semibold">LAN 1 Host</span>
            <div className="text-2xl my-1.5">💻</div>
            <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">PC-1</h5>
            <span className="text-[13px] font-mono text-stone-700 dark:text-zinc-300 block">192.168.1.10</span>
            <span className="text-[13px] font-mono font-semibold text-stone-700 dark:text-zinc-300 block">MAC: AA:11</span>
          </div>

          {/* Node 2: Switch 1 */}
          <div className={`p-4 rounded-2xl border transition-all ${
            currentStep === 1
              ? 'bg-amber-100/70 dark:bg-amber-950/40 border-amber-500 shadow-md scale-105'
              : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
          }`}>
            <span className="text-[13px] font-mono text-stone-600 dark:text-zinc-400 block font-semibold">Layer 2 Switch</span>
            <div className="text-2xl my-1.5">🔀</div>
            <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">SW-1</h5>
            <span className="text-[13px] font-mono text-stone-700 dark:text-zinc-300 block">MAC Lookup</span>
            <span className="text-[13px] text-stone-600 dark:text-zinc-400 block">Transparent</span>
          </div>

          {/* Node 3: Router */}
          <div className={`p-4 rounded-2xl border transition-all ${
            currentStep === 2
              ? 'bg-amber-100/70 dark:bg-amber-950/40 border-amber-500 shadow-md scale-105'
              : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
          }`}>
            <span className="text-[13px] font-mono text-stone-600 dark:text-zinc-400 block font-semibold">Layer 3 Gateway</span>
            <div className="text-2xl my-1.5">🌐</div>
            <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">Gateway Router</h5>
            <span className="text-[13px] font-mono text-stone-700 dark:text-zinc-300 block">Routes Packets</span>
            <span className="text-[13px] font-mono font-bold text-amber-700 dark:text-amber-400 block">Rewrites MAC!</span>
          </div>

          {/* Node 4: Web Server */}
          <div className={`p-4 rounded-2xl border transition-all ${
            currentStep === 3
              ? 'bg-emerald-100/70 dark:bg-emerald-950/40 border-emerald-500 shadow-md scale-105'
              : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
          }`}>
            <span className="text-[13px] font-mono text-stone-600 dark:text-zinc-400 block font-semibold">Destination</span>
            <div className="text-2xl my-1.5">🖥️</div>
            <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">Server</h5>
            <span className="text-[13px] font-mono text-stone-700 dark:text-zinc-300 block">10.0.0.50</span>
            <span className="text-[13px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 block">MAC: DD:44</span>
          </div>
        </div>

        {/* Real-time Packet Inspector Table */}
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 font-mono text-sm space-y-3.5 border border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-300 border-b border-stone-800 pb-2.5 gap-2">
            <span className="text-amber-400 font-bold">
              📦 Live Packet Header on Wire (المحتوى المتنقل في الكابل حالياً):
            </span>
            <span className="text-[13px] text-zinc-400">
              المحطة: {activeHop.currentDevice} ➔ {activeHop.nextDevice}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Layer 3 IP Header (STAYS CONSTANT) */}
            <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
              <span className="text-[13px] text-emerald-400 font-bold block uppercase tracking-wider">
                Layer 3: IP Header (ثابت لا يتغير أبداً)
              </span>
              <div className="flex justify-between text-zinc-300 text-sm">
                <span>Source IP:</span>
                <span className="font-bold text-emerald-300">{activeHop.sourceIp}</span>
              </div>
              <div className="flex justify-between text-zinc-300 text-sm">
                <span>Destination IP:</span>
                <span className="font-bold text-emerald-300">{activeHop.destIp}</span>
              </div>
            </div>

            {/* Layer 2 MAC Header (CHANGES AT EVERY ROUTER HOP) */}
            <div className="p-3.5 bg-stone-950 rounded-xl border border-amber-600/40 space-y-1.5">
              <span className="text-[13px] text-amber-400 font-bold block uppercase tracking-wider">
                Layer 2: Ethernet Frame (بيتغير مع كل نطة!)
              </span>
              <div className="flex justify-between text-zinc-300 text-sm">
                <span>Source MAC:</span>
                <span className="font-bold text-amber-300">{activeHop.sourceMac}</span>
              </div>
              <div className="flex justify-between text-zinc-300 text-sm">
                <span>Destination MAC:</span>
                <span className="font-bold text-amber-300">{activeHop.destMac}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Egyptian Commentary Box */}
        <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-700/60 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
            <span>💡</span>
            <span>الفكرة ببساطة للامتحان:</span>
          </div>
          <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 leading-[1.75] font-medium">
            {activeHop.explanationAr}
          </ArabicText>
          <p className="text-[13px] text-stone-700 dark:text-zinc-300 font-sans leading-relaxed pt-2 border-t border-amber-200 dark:border-amber-900/60">
            <strong>English Concept:</strong> {activeHop.explanationEn}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PacketJourneyLab;

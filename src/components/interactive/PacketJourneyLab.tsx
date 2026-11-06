import React, { useEffect, useState } from 'react';
import { Route, Play, Pause, RotateCcw, StepForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';

interface Endpoint {
  addr: string;
  owner: string;
}

interface HopStep {
  currentDevice: string;
  nextDevice: string;
  sourceIp: string;
  destIp: string;
  sourceMac: Endpoint;
  destMac: Endpoint;
  explanationEn: string;
  explanationAr: string;
}

const PC_MAC: Endpoint = { addr: 'AA:11:AA:11:AA:11', owner: 'PC-1' };
const ROUTER_LAN_MAC: Endpoint = { addr: 'BB:22:BB:22:BB:22', owner: 'Router G0/0' };
const ROUTER_WAN_MAC: Endpoint = { addr: 'CC:33:CC:33:CC:33', owner: 'Router G0/1' };
const SERVER_MAC: Endpoint = { addr: 'DD:44:DD:44:DD:44', owner: 'Server' };

const JOURNEY_STEPS: HopStep[] = [
  {
    currentDevice: 'PC-1',
    nextDevice: 'SW-1',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    sourceMac: PC_MAC,
    destMac: ROUTER_LAN_MAC,
    explanationEn:
      'PC-1 sees that the destination IP (10.0.0.50) is on a DIFFERENT network, so it addresses the frame to the Default Gateway\'s MAC address (learned via ARP).',
    explanationAr:
      'الـ PC لقى إن السيرفر (10.0.0.50) في شبكة تانية خالص، فقال: «مليش دعوة بالسيرفر دلوقتي، هبعت للراوتر (Default Gateway) وهو يتصرف!». عشان كده حط الـ MAC بتاع الراوتر كـ Destination MAC، لكن الـ Destination IP فضل 10.0.0.50 زي ما هو.',
  },
  {
    currentDevice: 'SW-1',
    nextDevice: 'Gateway Router',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    sourceMac: PC_MAC,
    destMac: ROUTER_LAN_MAC,
    explanationEn:
      'The switch only inspects the Layer 2 destination MAC (BB:22...), finds it in its MAC Address Table, and forwards the unchanged frame out the port facing the router.',
    explanationAr:
      'السويتش جهاز Layer 2 ومالوش دعوة بالـ IP. بص في جدول الـ MAC Address Table، لقى MAC الراوتر على البورت اللي واصل بيه، فبعت الفريم للراوتر على طول من غير ما يغير فيه حاجة.',
  },
  {
    currentDevice: 'Gateway Router',
    nextDevice: 'Web Server',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    sourceMac: ROUTER_WAN_MAC,
    destMac: SERVER_MAC,
    explanationEn:
      'KEY HOP: the router strips the old Layer 2 header and builds a new one. Its egress interface MAC becomes the source and the server\'s MAC becomes the destination. The IP addresses stay CONSTANT.',
    explanationAr:
      'هنا بقى اللقطة اللي بتيجي في كل الامتحانات! 💥 الراوتر شال الـ Layer 2 Header القديم وكتب واحد جديد: Source MAC بتاعه هو، وDestination MAC بتاع السيرفر. لكن الـ IP فضل ثابت زي ما هو! (الـ IP ثابت، والـ MAC بيتغير عند كل Router).',
  },
  {
    currentDevice: 'Web Server',
    nextDevice: 'Delivered ✅',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    sourceMac: ROUTER_WAN_MAC,
    destMac: SERVER_MAC,
    explanationEn:
      'The server confirms the destination MAC matches its NIC and the destination IP is its own, decapsulates Layer 2 and Layer 3, and hands the HTTP payload to the web application.',
    explanationAr:
      'وصلت بالسلامة! السيرفر لقى الـ Destination MAC هو الـ MAC بتاعه والـ Destination IP هو الـ IP بتاعه، فك التغليف (Decapsulation) وطلّع الـ Payload لبرنامج الويب عشان يرد بالصفحة.',
  },
];

const MAP_NODES = [
  { tag: 'LAN 1 Host', icon: '💻', name: 'PC-1', lines: ['192.168.1.10', 'MAC: AA:11'], accent: '' },
  { tag: 'Layer 2 Switch', icon: '🔀', name: 'SW-1', lines: ['MAC Lookup', 'Transparent'], accent: '' },
  {
    tag: 'Layer 3 Gateway',
    icon: '🌐',
    name: 'Gateway Router',
    lines: ['Routes Packets', 'Rewrites MAC!'],
    accent: 'font-bold text-amber-700 dark:text-amber-400',
  },
  {
    tag: 'Destination',
    icon: '🖥️',
    name: 'Server',
    lines: ['10.0.0.50', 'MAC: DD:44'],
    accent: 'font-semibold text-emerald-700 dark:text-emerald-400',
  },
];

const LAST_STEP = JOURNEY_STEPS.length - 1;
const STEP_MS = 3200;

const HeaderField: React.FC<{
  label: string;
  value: string;
  valueCls: string;
  owner?: string;
  changed?: boolean;
}> = ({ label, value, valueCls, owner, changed }) => (
  <div className="space-y-0.5">
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-400">{label}</span>
      {changed && (
        <span dir="rtl" className="font-arabic text-xs font-bold px-1.5 rounded bg-amber-400/20 text-amber-300">
          اتغيّر
        </span>
      )}
    </div>
    <div className={`text-sm font-bold break-all ${valueCls}`}>
      {value}
      {owner && <span className="ml-1.5 text-xs font-normal text-zinc-400">({owner})</span>}
    </div>
  </div>
);

export const PacketJourneyLab: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeHop = JOURNEY_STEPS[currentStep];
  const prevHop = currentStep > 0 ? JOURNEY_STEPS[currentStep - 1] : null;

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= LAST_STEP) {
      setIsPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setCurrentStep(currentStep + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [isPlaying, currentStep]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep(prev => (prev < LAST_STEP ? prev + 1 : 0));
  };

  const handleAutoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (currentStep >= LAST_STEP) setCurrentStep(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const buttonBase =
    'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm';

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Route className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Interactive Hop-by-Hop Packet Routing Lab
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                معمل رحلة الحزمة: ليه الـ IP بيفضل ثابت طول الطريق والـ MAC بيتغير عند كل Router (Hop)؟
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleAutoPlay}
            className={`${buttonBase} bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 active:scale-95`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span dir="rtl" className="font-arabic">
              {isPlaying ? 'إيقاف مؤقت (Pause)' : 'تشغيل تلقائي (Auto Play)'}
            </span>
          </button>
          <button
            onClick={handleNext}
            className={`${buttonBase} bg-beige-100 hover:bg-beige-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700`}
          >
            {currentStep === LAST_STEP ? <RotateCcw className="w-4 h-4" /> : <StepForward className="w-4 h-4" />}
            <span dir="rtl" className="font-arabic">
              {currentStep === LAST_STEP ? 'ابدأ من الأول' : 'الخطوة الجاية'}
            </span>
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-beige-100 hover:bg-beige-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-zinc-300 border border-beige-300 dark:border-stone-700 shadow-sm transition-all"
            title="إعادة من الأول"
            aria-label="إعادة من الأول"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Network Path Map */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl p-4 sm:p-6 border border-beige-300 dark:border-stone-800 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 items-stretch text-center">
          {MAP_NODES.map((node, i) => {
            const isActive = currentStep === i;
            const activeCls =
              i === LAST_STEP
                ? 'bg-emerald-100/70 dark:bg-emerald-950/40 border-emerald-500 shadow-md scale-105'
                : 'bg-amber-100/70 dark:bg-amber-950/40 border-amber-500 shadow-md scale-105';
            return (
              <div
                key={node.name}
                className={`p-3 sm:p-4 rounded-2xl border transition-all ${
                  isActive ? activeCls : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
                }`}
              >
                <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 block font-semibold">{node.tag}</span>
                <div className="text-2xl my-1.5">{node.icon}</div>
                <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">{node.name}</h5>
                <span className="text-xs font-mono text-stone-700 dark:text-zinc-300 block">{node.lines[0]}</span>
                <span className={`text-xs font-mono block ${node.accent || 'font-semibold text-stone-700 dark:text-zinc-300'}`}>
                  {node.lines[1]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Real-time Packet Inspector */}
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-4 sm:p-5 space-y-3.5 border border-stone-800">
          <div className="space-y-1.5 border-b border-stone-800 pb-2.5">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className="font-mono text-sm font-bold text-amber-400">📦 Live Packet Header on Wire</span>
              <span className="font-mono text-xs text-zinc-400">
                Step {currentStep + 1} / {JOURNEY_STEPS.length}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span dir="rtl" className="font-arabic text-xs text-zinc-400">
                المحطة الحالية
              </span>
              <span className="font-mono text-xs text-zinc-200">
                {activeHop.currentDevice} ➔ {activeHop.nextDevice}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Layer 3 IP Header (stays constant) */}
            <div className="p-3.5 bg-stone-950 rounded-xl border border-emerald-500/30 space-y-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="font-mono text-xs font-bold text-emerald-400">Layer 3: IP Header</span>
                <span dir="rtl" className="font-arabic text-xs text-emerald-300">ثابت طول الطريق</span>
              </div>
              <HeaderField label="Source IP" value={activeHop.sourceIp} valueCls="font-mono text-emerald-300" />
              <HeaderField label="Destination IP" value={activeHop.destIp} valueCls="font-mono text-emerald-300" />
            </div>

            {/* Layer 2 Frame (rewritten at every router hop) */}
            <div className="p-3.5 bg-stone-950 rounded-xl border border-amber-600/40 space-y-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="font-mono text-xs font-bold text-amber-400">Layer 2: Ethernet Frame</span>
                <span dir="rtl" className="font-arabic text-xs text-amber-300">بيتغير عند كل Router</span>
              </div>
              <HeaderField
                label="Source MAC"
                value={activeHop.sourceMac.addr}
                owner={activeHop.sourceMac.owner}
                valueCls="font-mono text-amber-300"
                changed={!!prevHop && prevHop.sourceMac.addr !== activeHop.sourceMac.addr}
              />
              <HeaderField
                label="Destination MAC"
                value={activeHop.destMac.addr}
                owner={activeHop.destMac.owner}
                valueCls="font-mono text-amber-300"
                changed={!!prevHop && prevHop.destMac.addr !== activeHop.destMac.addr}
              />
            </div>
          </div>
        </div>

        {/* Commentary Box */}
        <div
          aria-live="polite"
          className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-700/60 space-y-2"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
            <span>💡</span>
            <span dir="rtl" className="font-arabic">الفكرة ببساطة للامتحان</span>
          </div>
          <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 font-medium">
            {activeHop.explanationAr}
          </ArabicText>
          <p dir="ltr" className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed pt-2 border-t border-amber-200 dark:border-amber-900/60">
            <strong>English concept:</strong> {activeHop.explanationEn}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PacketJourneyLab;

import React, { useEffect, useRef, useState } from 'react';
import { Route, Play, Pause, RotateCcw, StepForward, Laptop, Network, Router, Server } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

interface Endpoint {
  addr: string;
  owner: string;
}

interface HopStep {
  currentDevice: string;
  nextDevice: string;
  sourceIp: string;
  destIp: string;
  ttl: number;
  sourceMac: Endpoint;
  destMac: Endpoint;
  explanationEn: string;
  explanationAr: string;
}

const PC_MAC: Endpoint = { addr: '02:11:AA:11:AA:11', owner: 'PC-1' };
const ROUTER_LAN_MAC: Endpoint = { addr: '02:22:BB:22:BB:22', owner: 'Router G0/0' };
const ROUTER_WAN_MAC: Endpoint = { addr: '02:33:CC:33:CC:33', owner: 'Router G0/1' };
const SERVER_MAC: Endpoint = { addr: '02:44:DD:44:DD:44', owner: 'Server' };

const JOURNEY_STEPS: HopStep[] = [
  {
    currentDevice: 'PC-1',
    nextDevice: 'SW-1',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    ttl: 64,
    sourceMac: PC_MAC,
    destMac: ROUTER_LAN_MAC,
    explanationEn:
      'PC-1 sees that the destination IP (10.0.0.50) is on a DIFFERENT network, so it addresses the frame to the Default Gateway\'s MAC address (learned via ARP).',
    explanationAr:
      'الـ PC-1 لقى إن عنوان الوجهة (10.0.0.50) على شبكة مختلفة، فحط عنوان MAC بتاع الـ Default Gateway كوجهة للـ Frame، بعد ما اتعلّمه عن طريق ARP.',
  },
  {
    currentDevice: 'SW-1',
    nextDevice: 'Gateway Router',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    ttl: 64,
    sourceMac: PC_MAC,
    destMac: ROUTER_LAN_MAC,
    explanationEn:
      'The switch inspects the Layer 2 destination MAC (02:22:BB:22:BB:22), finds its port in the MAC table, and forwards without changing the MAC addresses, endpoint IP addresses, or TTL.',
    explanationAr:
      'الـ Switch فحص عنوان MAC بتاع الوجهة في Layer 2 (02:22:BB:22:BB:22)، ولقي البورت في جدول الـ MAC، فمرّر الـ Frame من غير ما يغيّر عناوين الـ MAC، أو عناوين الـ IP للطرفين، أو الـ TTL.',
  },
  {
    currentDevice: 'Gateway Router',
    nextDevice: 'Web Server',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    ttl: 63,
    sourceMac: ROUTER_WAN_MAC,
    destMac: SERVER_MAC,
    explanationEn:
      'KEY HOP: the router builds a new Layer 2 header with its egress MAC as source and the server MAC as destination. Endpoint IP addresses stay constant in this example without NAT; IPv4 TTL decreases from 64 to 63.',
    explanationAr:
      'في الخطوة دي، الـ Router كتب ترويسة Layer 2 جديدة: الـ Source MAC لواجهة الخروج، والـ Destination MAC للسيرفر. عناوين الـ IP للطرفين فضلت ثابتة في المثال ده من غير NAT؛ والـ IPv4 TTL قلّت من 64 لـ 63.',
  },
  {
    currentDevice: 'Web Server',
    nextDevice: 'Delivered ✅',
    sourceIp: '192.168.1.10',
    destIp: '10.0.0.50',
    ttl: 63,
    sourceMac: ROUTER_WAN_MAC,
    destMac: SERVER_MAC,
    explanationEn:
      'The server accepts its destination MAC and IP, removes the Ethernet and IPv4 headers, and passes the TCP segment to its transport stack. TCP delivers the HTTP data to the web application.',
    explanationAr:
      'السيرفر قبل عنواني MAC وIP بتوعه، وشال ترويستي Ethernet وIPv4، ومرّر الـ TCP Segment للـ Transport Stack. الـ TCP بتوصل بيانات HTTP لتطبيق الويب.',
  },
];

const MAP_NODES = [
  { tag: 'LAN 1 Host', Icon: Laptop, name: 'PC-1', lines: ['192.168.1.10', 'MAC: 02:11…'], accent: '' },
  { tag: 'Layer 2 Switch', Icon: Network, name: 'SW-1', lines: ['MAC Lookup', 'Transparent'], accent: '' },
  {
    tag: 'Layer 3 Gateway',
    Icon: Router,
    name: 'Gateway Router',
    lines: ['Routes Packets', 'Rewrites MAC!'],
    accent: 'font-bold text-amber-700 dark:text-amber-400',
  },
  {
    tag: 'Destination',
    Icon: Server,
    name: 'Server',
    lines: ['10.0.0.50', 'MAC: 02:44…'],
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
  const timer = useRef<number | null>(null);
  const pause = () => { if (timer.current !== null) window.clearTimeout(timer.current); timer.current = null; setIsPlaying(false); };

  const activeHop = JOURNEY_STEPS[currentStep];
  const prevHop = currentStep > 0 ? JOURNEY_STEPS[currentStep - 1] : null;

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= LAST_STEP) {
      setIsPlaying(false);
      return;
    }
    timer.current = window.setTimeout(() => setCurrentStep(currentStep + 1), STEP_MS);
    return () => { if (timer.current !== null) window.clearTimeout(timer.current); timer.current = null; };
  }, [isPlaying, currentStep]);

  const handleNext = () => {
    pause();
    setCurrentStep(prev => (prev < LAST_STEP ? prev + 1 : 0));
  };

  const handleAutoPlay = () => {
    if (isPlaying) {
      pause();
      return;
    }
    if (currentStep >= LAST_STEP) setCurrentStep(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    pause();
    setCurrentStep(0);
  };
  const fields = [{ id: 'sourceMac', label: 'Source MAC' }, { id: 'destMac', label: 'Destination MAC' }, { id: 'ip', label: 'Endpoint IP addresses' }, { id: 'ttl', label: 'IPv4 TTL' }];
  const missions: ChallengeMission[] = [
    { id: 'transparent-switch', title: 'Inspect transparent switch forwarding', titleAr: 'افحص تمرير الـ Switch من غير تغيير العناوين', goal: 'Step to the switch-to-router transmission. Select the fields that changed from the PC-to-switch transmission; select none if all listed fields stayed unchanged.', goalAr: 'اتقدّم لإرسال الـ Switch للـ Router. اختار الخانات اللي اتغيّرت مقارنة بإرسال الـ PC للـ Switch؛ ما تختارش أي خانة لو كل الخانات المعروضة فضلت ثابتة.', hint: 'A Layer 2 switch does not route the packet or decrement its TTL.', hintAr: 'الـ Layer 2 Switch مش بيعمل Routing للـ Packet ولا بيقلّل الـ TTL.', start: handleReset, prediction: { label: 'Fields that changed at this hop', labelAr: 'الخانات اللي اتغيّرت عند الخطوة دي', options: fields }, evaluate: prediction => currentStep !== 1 ? feedback('pending', 'Step to transmission 2: SW-1 → Gateway Router.', 'اتقدّم للإرسال 2: من SW-1 للـ Gateway Router.') : prediction.length === 0 ? feedback('success', 'Both MAC addresses, both endpoint IP addresses and TTL stayed unchanged across the switch.', 'عنوانا الـ MAC وعنوانا الـ IP للطرفين والـ TTL فضلوا ثابتين عبر الـ Switch.') : feedback('retry', 'Compare both transmissions: the listed fields do not change at the switch.', 'قارن الإرسالين: الخانات المعروضة ما بتتغيّرش عند الـ Switch.') },
    { id: 'router-header', title: 'Inspect the router header changes', titleAr: 'افحص تغييرات الترويسة عند الـ Router', goal: 'Step to the router-to-server transmission. Select exactly the listed fields that changed from the incoming frame.', goalAr: 'اتقدّم لإرسال الـ Router للسيرفر. اختار بالضبط الخانات المعروضة اللي اتغيّرت عن الـ Frame الداخلة.', hint: 'Compare ingress and egress MAC ownership and TTL; this example has no NAT.', hintAr: 'قارن أصحاب الـ MAC في الدخول والخروج والـ TTL؛ المثال ده من غير NAT.', start: handleReset, prediction: { label: 'Fields that changed at this hop', labelAr: 'الخانات اللي اتغيّرت عند الخطوة دي', options: fields }, evaluate: prediction => currentStep !== 2 ? feedback('pending', 'Step to transmission 3: Gateway Router → Web Server.', 'اتقدّم للإرسال 3: من الـ Gateway Router للـ Web Server.') : prediction.length === 3 && ['sourceMac', 'destMac', 'ttl'].every(id => prediction.includes(id)) ? feedback('success', 'Both MAC addresses changed, and TTL fell to 63. Endpoint IP addresses stayed fixed; the IPv4 header as a whole is not unchanged.', 'عنوانا الـ MAC اتغيّروا والـ TTL قلّت لـ 63. عناوين الـ IP للطرفين فضلت ثابتة؛ ترويسة الـ IPv4 كلها مش ثابتة.') : feedback('retry', 'Check MAC ownership and the TTL change. Endpoint IP addresses stay fixed here.', 'راجع أصحاب الـ MAC وتغيير الـ TTL. عناوين الـ IP للطرفين ثابتة هنا.') },
  ];

  const buttonBase =
    'flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm';

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

      <LabChallenge missions={missions} busy={isPlaying} />
      <p className="text-xs text-stone-600 dark:text-zinc-400">Teaching model: locally administered unicast MACs, known ARP/table entries, directly connected server LAN, and no NAT. Router forwarding changes TTL; IPv4 checksum and Ethernet FCS recalculation are omitted.</p>
      <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">نموذج تعليمي: عناوين MAC محلية الإدارة للـ Unicast، ومدخلات ARP والجدول معروفة، وشبكة السيرفر متصلة مباشرة، ومن غير NAT. توجيه الـ Router بيغيّر الـ TTL؛ إعادة حساب IPv4 Checksum والـ Ethernet FCS مش معروضة.</ArabicText>
      {/* Visual Network Path Map */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl p-4 sm:p-6 border border-beige-300 dark:border-stone-800 space-y-6">
        <LabWorkbench title="Packet journey · routed hop" motionKey={currentStep}
 nodes={MAP_NODES.map<WorkbenchNode>((node, i) => ({ id: String(i), label: node.name, kind: (['computer', 'switch', 'router', 'server'] as const)[i], position: [-4.5 + i * 3, 0, i % 2 ? -1 : 1], tone: currentStep === i ? i === LAST_STEP ? 'success' : 'active' : i < currentStep ? 'success' : 'neutral', detail: i === 2 ? 'The router rebuilds the Layer-2 header; endpoint IPs stay fixed in this example without NAT.' : 'Inspect the IP and MAC fields below at each hop.', detailAr: i === 2 ? 'الـ Router بيبني ترويسة Layer 2 جديدة، والـ IP بيفضل ثابت في المثال ده من غير NAT.' : 'راجع خانات الـ IP والـ MAC تحت المشهد عند كل خطوة.' }))}
 links={[0, 1, 2].map<WorkbenchLink>(i => ({ id: String(i), from: String(i), to: String(i + 1), tone: i < currentStep ? 'success' : i === currentStep ? 'active' : 'neutral', moving: isPlaying && i === currentStep }))}
>
<div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 items-stretch text-center">
          {MAP_NODES.map((node, i) => {
            const isActive = currentStep === i;
            const activeCls =
              i === LAST_STEP
                ? 'bg-emerald-100/70 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-400 shadow-md motion-safe:scale-105'
                : 'bg-amber-100/70 dark:bg-amber-950/40 border-amber-500 dark:border-amber-400 shadow-md motion-safe:scale-105';
            return (
              <div
                key={node.name}
                className={`p-3 sm:p-4 rounded-2xl border transition-all ${
                  isActive ? activeCls : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
                }`}
              >
                <span className="text-xs font-mono text-stone-600 dark:text-zinc-400 block font-semibold">{node.tag}</span>
                <node.Icon aria-hidden="true" className="mx-auto my-1.5 h-7 w-7 text-stone-700 dark:text-zinc-300" />
                <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">{node.name}</h5>
                <span className="text-xs font-mono text-stone-700 dark:text-zinc-300 block">{node.lines[0]}</span>
                <span className={`text-xs font-mono block ${node.accent || 'font-semibold text-stone-700 dark:text-zinc-300'}`}>
                  {node.lines[1]}
                </span>
              </div>
            );
          })}
        </div>
</LabWorkbench>

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
                <span dir="rtl" className="font-arabic text-xs text-emerald-300">عناوين الطرفين ثابتة</span>
              </div>
              <HeaderField label="Source IP" value={activeHop.sourceIp} valueCls="font-mono text-emerald-300" />
              <HeaderField label="Destination IP" value={activeHop.destIp} valueCls="font-mono text-emerald-300" />
              <HeaderField label="IPv4 TTL" value={String(activeHop.ttl)} valueCls="font-mono text-stone-100" changed={!!prevHop && prevHop.ttl !== activeHop.ttl} />
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
            <span>What this hop does</span>
            <ArabicText as="span" className="font-normal">شرح الخطوة ببساطة</ArabicText>
          </div>
          <p dir="ltr" className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">{activeHop.explanationEn}</p>
          <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 font-medium">
            {activeHop.explanationAr}
          </ArabicText>
        </div>
      </div>
    </div>
  );
};

export default PacketJourneyLab;

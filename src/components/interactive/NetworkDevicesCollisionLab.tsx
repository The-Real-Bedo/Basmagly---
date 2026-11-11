import React, { useEffect, useRef, useState } from 'react';
import { Network, Zap, Play, Flame, Cpu } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

type DeviceType = 'hub' | 'switch' | 'router';
type NodeState = 'tx' | 'rx' | 'drop' | 'collision';
type NodeStates = Partial<Record<string, NodeState>>;

interface ConnectedNode {
  id: string;
  name: string;
  mac: string;
  port: number;
}

interface SimStep {
  nodes: NodeStates;
  lookup: string[];
  collision: boolean;
  logEn: string;
  log: string;
  hold: number;
}

interface SimView {
  nodes: NodeStates;
  lookup: string[];
  collision: boolean;
  logEn: string;
  log: string;
}

const NODES: ConnectedNode[] = [
  { id: 'pca', name: 'PC-A', mac: '02:11:AA:11:AA:11', port: 1 },
  { id: 'pcb', name: 'PC-B', mac: '02:22:BB:22:BB:22', port: 2 },
  { id: 'pcc', name: 'PC-C', mac: '02:33:CC:33:CC:33', port: 3 },
  { id: 'pcd', name: 'PC-D', mac: '02:44:DD:44:DD:44', port: 4 },
];

// Hub/Switch share one subnet; the router puts each PC on its own network.
const ipOf = (n: ConnectedNode, d: DeviceType) =>
  d === 'router' ? `192.168.${n.port}.10` : `192.168.1.${n.port * 10}`;
const netOf = (n: ConnectedNode) => `192.168.${n.port}.0/24`;
const ifOf = (n: ConnectedNode) => `Gi0/${n.port - 1}`;

const DEVICES: {
  id: DeviceType;
  label: string;
  name: string;
  layer: string;
  Icon: LucideIcon;
  border: string;
  icon: string;
}[] = [
  { id: 'hub', label: 'الـ Hub', name: 'HUB', layer: 'Layer 1 • Physical', Icon: Zap, border: 'border-amber-500 dark:border-amber-400', icon: 'text-amber-600 dark:text-amber-400' },
  { id: 'switch', label: 'الـ Switch', name: 'SWITCH', layer: 'Layer 2 • Data Link', Icon: Network, border: 'border-emerald-500 dark:border-emerald-400', icon: 'text-emerald-600 dark:text-emerald-400' },
  { id: 'router', label: 'الـ Router', name: 'ROUTER', layer: 'Layer 3 • Network', Icon: Cpu, border: 'border-sky-500 dark:border-sky-400', icon: 'text-sky-600 dark:text-sky-400' },
];

const NODE_BADGE: Record<NodeState, { text: string; cls: string }> = {
  tx: { text: '📡 بيبعت', cls: 'text-amber-700 dark:text-amber-400 animate-pulse' },
  rx: { text: '🎯 استلم الفريم', cls: 'text-emerald-700 dark:text-emerald-400' },
  drop: { text: '🚫 استلم وعمل Drop', cls: 'text-stone-600 dark:text-zinc-400' },
  collision: { text: '💥 تصادم', cls: 'text-rose-700 dark:text-rose-400' },
};

const WIRE_CLASS: Record<NodeState, string> = {
  tx: 'stroke-amber-500 dark:stroke-amber-400',
  rx: 'stroke-emerald-500 dark:stroke-emerald-400',
  drop: 'stroke-stone-400 dark:stroke-stone-500',
  collision: 'stroke-rose-500 dark:stroke-rose-400',
};

// Approximate anchor of each PC card in the 0-100 SVG space (A, B on top; C, D below).
const WIRE_ANCHORS: [number, number][] = [[25, 14], [75, 14], [25, 86], [75, 86]];

const COMPARISON = [
  {
    name: 'الـ Hub',
    layer: 'Layer 1 (Physical)',
    domains: 'كل البورتات في Collision Domain واحد وBroadcast Domain واحد',
    tone: 'text-rose-700 dark:text-rose-400',
    behavior: 'مبيفهمش عناوين، بيكرر الإشارة على كل البورتات التانية',
  },
  {
    name: 'الـ Switch',
    layer: 'Layer 2 (Data Link)',
    domains: 'كل بورت هو Collision Domain مستقل، لكن كل البورتات في Broadcast Domain واحد',
    tone: 'text-emerald-700 dark:text-emerald-400',
    behavior: 'بيفهم MAC Address ويبعت لصاحب الشأن بس، ولو الـ MAC مجهول أو الفريم Broadcast بيعمل Flood',
  },
  {
    name: 'الـ Router',
    layer: 'Layer 3 (Network)',
    domains: 'كل Interface هو Collision Domain وBroadcast Domain مستقل',
    tone: 'text-sky-700 dark:text-sky-400',
    behavior: 'بيفهم IP Address ويربط شبكات مختلفة ببعضها',
  },
];

const IDLE_VIEW: SimView = {
  nodes: {},
  lookup: [],
  collision: false,
  logEn: 'Choose a device, sender, and destination, then send a frame to see how each network device handles it.',
  log: 'اختار الجهاز والراسل، واضغط إرسال وشوف النتيجة لايف.',
};

const allNodes = (state: NodeState): NodeStates =>
  NODES.reduce<NodeStates>((acc, n) => ({ ...acc, [n.id]: state }), {});

// s -> t is the main flow; in simultaneous mode p -> q is the second flow.
function buildSteps(
  device: DeviceType,
  simultaneous: boolean,
  s: ConnectedNode,
  t: ConnectedNode,
  p: ConnectedNode,
  q: ConnectedNode,
): SimStep[] {
  if (device === 'hub') {
    if (simultaneous) {
      return [
        {
          nodes: { [s.id]: 'tx', [p.id]: 'tx' },
          lookup: [],
          collision: false,
          hold: 900,
          logEn: `${s.name} and ${p.name} transmit at the same time on the Hub. Their signals meet on the shared medium.`,
          log: `⚠️ ${s.name} و${p.name} بعتوا في نفس اللحظة على الـ Hub، والإشارتين اتقابلوا على نفس الوسط!`,
        },
        {
          nodes: allNodes('collision'),
          lookup: [],
          collision: true,
          hold: 3000,
          logEn: 'Collision: all Hub ports share one medium, so both frames are corrupted. Devices send a jam signal, wait a random backoff period, then retry using CSMA/CD. The Hub is one collision domain.',
          log: '💥 تصادم (Collision)! كل بورتات الـ Hub على وسط واحد، فالإشارات اتداخلت والفريمين باظوا. الأجهزة بتبعت Jam Signal وكل واحد بيستنى وقت عشوائي (Backoff) ويعيد المحاولة (CSMA/CD). يعني الـ Hub كله Collision Domain واحد.',
        },
      ];
    }
    return [
      {
        nodes: { [s.id]: 'tx' },
        lookup: [],
        collision: false,
        hold: 900,
        logEn: `${s.name} sends a frame to ${t.name}; the Hub receives the signal on port ${s.port}.`,
        log: `📡 ${s.name} بعت فريم لـ ${t.name}، والـ Hub استلم الإشارة على البورت ${s.port}.`,
      },
      {
        nodes: { ...allNodes('drop'), [s.id]: 'tx', [t.id]: 'rx' },
        lookup: [],
        collision: false,
        hold: 2000,
        logEn: `The Layer 1 Hub does not read addresses; it repeats the signal out every other port. All devices see the frame, but only ${t.name} accepts it and the others drop it.`,
        log: `✅ الـ Hub بيشتغل على Layer 1 ومبيفهمش عناوين، فكرر الإشارة على كل البورتات التانية (Flooding). كل الأجهزة استلمت الفريم، بس ${t.name} لوحده اللي الـ MAC بتاعه مطابق فقبله، والباقي عمل Drop.`,
      },
    ];
  }

  if (device === 'switch') {
    if (simultaneous) {
      return [
        {
          nodes: { [s.id]: 'tx', [p.id]: 'tx' },
          lookup: [],
          collision: false,
          hold: 1100,
          logEn: `${s.name} and ${p.name} transmit at the same time on separate Switch ports, so the frames do not collide.`,
          log: `⚡ ${s.name} و${p.name} بعتوا في نفس اللحظة، بس كل واحد متوصل ببورت لوحده في الـ Switch فمفيش تصادم.`,
        },
        {
          nodes: { [t.id]: 'rx', [q.id]: 'rx' },
          lookup: [t.id, q.id],
          collision: false,
          hold: 2200,
          logEn: `The Switch uses its MAC table to send ${s.name}’s frame to ${t.name} and ${p.name}’s frame to ${q.name} simultaneously. Each port is a separate collision domain.`,
          log: `🎯 الـ Switch بص في جدول الـ MAC وبعت فريم ${s.name} لـ ${t.name} وفريم ${p.name} لـ ${q.name} في نفس الوقت من غير أي تصادم. كل بورت Collision Domain مستقل (Micro-segmentation).`,
        },
      ];
    }
    return [
      {
        nodes: { [s.id]: 'tx' },
        lookup: [t.id],
        collision: false,
        hold: 1100,
        logEn: `The Switch receives ${s.name}’s frame on port ${s.port}, learns its source MAC, then checks its MAC table for the destination ${t.mac}.`,
        log: `🔍 الـ Switch استلم الفريم من ${s.name} على البورت ${s.port}، وسجّل الـ MAC بتاعه (Source Learning)، وبص في جدول الـ MAC على الـ Destination MAC (${t.mac}).`,
      },
      {
        nodes: { [t.id]: 'rx' },
        lookup: [t.id],
        collision: false,
        hold: 1800,
        logEn: `The Switch finds the destination MAC on port ${t.port} and forwards the unicast frame only through that port; the other links stay idle.`,
        log: `🎯 لقى الـ MAC ده على البورت ${t.port}، فبعت الفريم من البورت ده بس (Unicast Forwarding)، وباقي الأجهزة أسلاكها ساكتة.`,
      },
    ];
  }

  if (simultaneous) {
    return [
      {
        nodes: { [s.id]: 'tx', [p.id]: 'tx' },
        lookup: [],
        collision: false,
        hold: 1100,
        logEn: `${s.name} and ${p.name} transmit at the same time through separate Router interfaces, so they do not collide.`,
        log: `⚡ ${s.name} و${p.name} بعتوا في نفس اللحظة، لكن كل واحد على Interface منفصل في الـ Router فمفيش تصادم.`,
      },
      {
        nodes: { [t.id]: 'rx', [q.id]: 'rx' },
        lookup: [t.id, q.id],
        collision: false,
        hold: 2200,
        logEn: `The Router forwards ${s.name}’s packet to ${t.name} and ${p.name}’s packet to ${q.name} using its routing table. Each interface has separate collision and broadcast domains.`,
        log: `🧭 الـ Router وجّه باكيت ${s.name} لـ ${t.name} وباكيت ${p.name} لـ ${q.name} حسب الـ Routing Table. كل Interface ليه Collision Domain وBroadcast Domain لوحده.`,
      },
    ];
  }
  return [
    {
      nodes: { [s.id]: 'tx' },
      lookup: [],
      collision: false,
      hold: 1100,
      logEn: `The Router receives ${s.name}’s frame on interface ${ifOf(s)}, removes the Layer 2 header, and checks the destination IP ${ipOf(t, 'router')}.`,
      log: `🌐 الـ Router استلم الفريم من ${s.name} على الـ Interface ${ifOf(s)}، فك الـ Layer 2 Header وبص على الـ Destination IP (${ipOf(t, 'router')}).`,
    },
    {
      nodes: { [t.id]: 'rx' },
      lookup: [t.id],
      collision: false,
      hold: 2200,
      logEn: `The routing table sends the packet for ${netOf(t)} through ${ifOf(t)}. The Router builds a new Layer 2 header; the IP stays the same, and broadcasts do not cross interfaces.`,
      log: `🧭 لقى الشبكة ${netOf(t)} في الـ Routing Table متوصلة بـ ${ifOf(t)}، فكتب Layer 2 Header جديد (MAC جديد) وبعت الباكيت لـ ${t.name}. الـ IP فضل زي ما هو، والـ Broadcast مبيعديش من Interface للتانية.`,
    },
  ];
}

const byId = (id: string) => NODES.find(n => n.id === id) ?? NODES[0];

export const NetworkDevicesCollisionLab: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>('hub');
  const [senderId, setSenderId] = useState<string>('pca');
  const [targetId, setTargetId] = useState<string>('pcc');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [view, setView] = useState<SimView>(IDLE_VIEW);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const reset = () => {
    clearTimers();
    setIsSimulating(false);
    setView(IDLE_VIEW);
  };

  const sender = byId(senderId);
  const target = byId(targetId);
  const [peer, peerTarget] = NODES.filter(n => n.id !== sender.id && n.id !== target.id);
  const device = DEVICES.find(d => d.id === activeDevice) ?? DEVICES[0];
  const handleSend = (simultaneous: boolean) => {
    if (isSimulating) return;
    clearTimers();
    setIsSimulating(true);

    const steps = buildSteps(activeDevice, simultaneous, sender, target, peer, peerTarget);
    let elapsed = 0;
    steps.forEach((step, i) => {
      const show = () => setView(step);
      if (i === 0) show();
      else timers.current.push(window.setTimeout(show, elapsed));
      elapsed += step.hold;
    });
    timers.current.push(window.setTimeout(() => setIsSimulating(false), elapsed));
  };

  const handleDevice = (id: DeviceType) => {
    if (isSimulating) return;
    setActiveDevice(id);
    reset();
  };

  const handleSender = (id: string) => {
    if (isSimulating) return;
    setSenderId(id);
    if (id === targetId) setTargetId((NODES.find(n => n.id !== id) ?? NODES[0]).id);
    reset();
  };

  const handleTarget = (id: string) => {
    if (isSimulating) return;
    setTargetId(id);
    reset();
  };

  const renderNode = (n: ConnectedNode) => {
    const state = view.nodes[n.id];
    const isSender = n.id === senderId;
    const isTarget = n.id === targetId;
    const surface =
      state === 'collision'
        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/50'
        : isTarget || state === 'rx'
        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
        : isSender
        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50'
        : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900';

    return (
      <div key={n.id} className={`relative z-10 min-w-0 p-3 rounded-2xl border text-center transition-all ${surface}`}>
        <span className="font-mono text-xs font-bold block text-stone-900 dark:text-stone-100">{n.name}</span>
        <span className="font-mono text-xs block text-stone-600 dark:text-zinc-400">{ipOf(n, activeDevice)}</span>
        <div className="min-h-[1.5rem]">
          {isSender && (
            <span dir="rtl" className="font-arabic text-xs font-bold text-amber-800 dark:text-amber-300">
              الراسل (Sender)
            </span>
          )}
          {isTarget && (
            <span dir="rtl" className="font-arabic text-xs font-bold text-emerald-800 dark:text-emerald-300">
              المستقبل (Target)
            </span>
          )}
        </div>
        <div className="min-h-[1.5rem]">
          {state && (
            <span dir="rtl" className={`font-arabic text-xs font-bold ${NODE_BADGE[state].cls}`}>
              {NODE_BADGE[state].text}
            </span>
          )}
        </div>
      </div>
    );
  };

  const tableCols =
    activeDevice === 'switch' ? ['Port', 'MAC Address', 'Device'] : ['Interface', 'Network', 'Device'];
  const startMission = (id: DeviceType) => {
    reset();
    setActiveDevice(id);
    setSenderId('pca');
    setTargetId('pcc');
  };
  const missions: ChallengeMission[] = [
    {
      id: 'hub-collision', title: 'Expose the shared collision domain', titleAr: 'بيّن نطاق التصادم المشترك',
      goal: 'Choose Hub and send both independent flows simultaneously. Wait for completion and inspect why neither frame arrived intact.',
      goalAr: 'اختار الـ Hub وابعت المسارين المستقلين في نفس الوقت. استنى اكتمال الإرسال وافحص ليه مفيش Frame وصلت سليمة.',
      hint: 'All Hub ports share a half-duplex medium. A switch separates the links.',
      hintAr: 'كل منافذ الـ Hub بتتشارك وسيط Half-duplex. الـ Switch بيفصل الوصلات.',
      start: () => startMission('switch'),
      evaluate: () => activeDevice !== 'hub' ? feedback('retry', 'Choose Hub for the shared-medium experiment.', 'اختار الـ Hub لتجربة الوسيط المشترك.')
        : isSimulating ? feedback('pending', 'Wait for the simultaneous transmission to finish.', 'استنى الإرسال المتزامن يخلص.')
        : view.collision ? feedback('success', 'Both frames collided in one shared domain; no NIC accepted an intact frame.', 'الـ Frames الاتنين اتصادموا في نطاق مشترك واحد؛ ومفيش كارت شبكة قبل Frame سليمة.')
        : feedback('pending', 'Send simultaneously to expose the collision.', 'ابعت في نفس الوقت عشان تبيّن التصادم.'),
    },
    {
      id: 'switch-unicast', title: 'Predict known unicast acceptance', titleAr: 'توقّع قبول الـ Unicast المعروفة',
      goal: 'Choose Switch, keep PC-A sending to PC-C, and predict which NIC accepts the ordinary unicast frame. Send once, then check.',
      goalAr: 'اختار الـ Switch، وخلّي PC-A تبعت لـ PC-C، وتوقّع أي كارت شبكة هيقبل الـ Unicast Frame العادية. ابعت مرة وبعدها افحص.',
      hint: 'The destination is already in the MAC table. The sender and unrelated ports are not receivers.',
      hintAr: 'الوجهة موجودة بالفعل في جدول الـ MAC. الراسل والمنافذ اللي ملهاش علاقة مش مستقبِلين.',
      start: () => startMission('hub'),
      prediction: { label: 'NICs that accept the frame', labelAr: 'كروت الشبكة اللي بتقبل الـ Frame', options: NODES.map(node => ({ id: node.id, label: node.name })) },
      evaluate: prediction => activeDevice !== 'switch' || senderId !== 'pca' || targetId !== 'pcc' ? feedback('retry', 'Use Switch with PC-A → PC-C.', 'استخدم الـ Switch من PC-A لـ PC-C.')
        : isSimulating || view.nodes.pcc !== 'rx' ? feedback('pending', 'Predict recipients and complete an ordinary send.', 'توقّع المستقبِلين وكمّل إرسال عادي.')
        : view.nodes.pcd === 'rx' ? feedback('retry', 'Use ordinary send for one frame, rather than the two simultaneous flows.', 'استخدم الإرسال العادي لـ Frame واحدة، بدل المسارين المتزامنين.')
        : prediction.length === 1 && prediction[0] === 'pcc' ? feedback('success', 'Only PC-C accepted. The prelearned destination selects one switch output port.', 'PC-C بس قبلت الـ Frame. الوجهة المتعلّمة مسبقًا بتختار منفذ خرج واحد في الـ Switch.')
        : feedback('retry', 'Compare your NIC selection with the receiving port.', 'قارن كروت الشبكة اللي اخترتها بمنفذ الاستقبال.'),
    },
  ];

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
                Network Devices &amp; Collision Domain Simulator
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                محاكي بيوضح الفرق بين (Hub vs Switch vs Router) وإيه اللي بيحصل لما الإشارات تتصادم
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl flex flex-wrap items-center gap-1 text-xs font-bold border border-beige-300 dark:border-stone-700">
          {DEVICES.map(d => (
            <button
              key={d.id}
              disabled={isSimulating}
              onClick={() => handleDevice(d.id)}
              className={`flex-1 min-h-11 px-3 py-1.5 rounded-xl text-center transition-all disabled:opacity-50 ${
                activeDevice === d.id
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <ArabicText as="span" className="text-inherit">{d.label}</ArabicText>
            </button>
          ))}
        </div>
      </div>

      <LabChallenge missions={missions} busy={isSimulating} />
      {/* Control Strip */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 p-4 rounded-2xl border border-beige-300 dark:border-stone-800 space-y-3 text-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1">
              <ArabicText as="span" className="text-xs font-bold">الراسل (Sender)</ArabicText>
              <select
                value={senderId}
                disabled={isSimulating}
                onChange={(e) => handleSender(e.target.value)}
                className="min-h-11 px-2.5 py-1.5 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-xs font-bold text-stone-800 dark:text-stone-200 disabled:opacity-50"
              >
                {NODES.map(n => (
                  <option key={n.id} value={n.id}>{n.name} ({ipOf(n, activeDevice)})</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <ArabicText as="span" className="text-xs font-bold">المستقبل (Target)</ArabicText>
              <select
                value={targetId}
                disabled={isSimulating}
                onChange={(e) => handleTarget(e.target.value)}
                className="min-h-11 px-2.5 py-1.5 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-xs font-bold text-stone-800 dark:text-stone-200 disabled:opacity-50"
              >
                {NODES.filter(n => n.id !== senderId).map(n => (
                  <option key={n.id} value={n.id}>{n.name} ({ipOf(n, activeDevice)})</option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSend(false)}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold shadow-sm transition-all disabled:opacity-40 text-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span dir="rtl" className="font-arabic">إرسال عادي 🚀</span>
            </button>

            <button
              onClick={() => handleSend(true)}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 text-white font-bold shadow-sm transition-all disabled:opacity-40 text-xs"
              title="جرّب جهازين يبعتوا في نفس اللحظة وشوف الفرق في التصادم"
            >
              <Flame className="w-3.5 h-3.5" />
              <span dir="rtl" className="font-arabic">إرسال متزامن 💥</span>
            </button>
          </div>
        </div>

        <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">
          {`الإرسال المتزامن بيخلي ${sender.name} و${peer.name} يبعتوا مع بعض في نفس اللحظة (${sender.name} لـ ${target.name} و${peer.name} لـ ${peerTarget.name}).`}
        </ArabicText>
      </div>

      <button type="button" onClick={reset} aria-label="Reset network simulation" className="min-h-11 rounded-xl border border-beige-300 px-4 text-sm font-semibold text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800">Reset simulation</button>
      <p className="text-xs text-stone-600 dark:text-zinc-400">Teaching model: locally administered unicast MAC addresses, one VLAN, prelearned switch destinations, and separate directly connected router networks. Full-duplex switch links have no CSMA/CD collisions.</p>
      <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">نموذج تعليمي: عناوين MAC محلية الإدارة للـ Unicast، وVLAN واحدة، ووجهات الـ Switch متعلّمة مسبقًا، وشبكات Router منفصلة ومتّصلة مباشرة. وصلات الـ Switch بنظام Full-duplex مفيهاش تصادمات CSMA/CD.</ArabicText>
      {/* Visual Canvas Area */}
      <LabWorkbench title="Network devices · live ports" motionKey={view.logEn}
 nodes={[
  ...NODES.map<WorkbenchNode>((n, i) => ({ id: n.id, label: n.name, showValue: false, kind: 'computer', position: [i % 2 ? 3 : -3, 0, i < 2 ? -2 : 2],
    tone: view.nodes[n.id] === 'collision' ? 'error' : view.nodes[n.id] === 'rx' ? 'success' : view.nodes[n.id] === 'tx' ? 'active' : 'neutral', value: ipOf(n, activeDevice), detail: `${n.mac} · Port ${n.port}. ${view.nodes[n.id] === 'drop' ? 'Frame received and discarded by this NIC.' : 'Inspect the highlighted port during transmission.'}`, detailAr: `${n.mac} · المنفذ ${n.port}. ${view.nodes[n.id] === 'drop' ? 'الـ Frame وصل وكارت الشبكة تجاهله.' : 'راجع المنفذ المظلل أثناء الإرسال.'}` })),
  { id: 'central', label: device.name, kind: activeDevice === 'hub' ? 'switch' : activeDevice, position: [0, 0, 0], tone: view.collision ? 'error' : isSimulating ? 'active' : 'info', detail: device.layer, detailAr: activeDevice === 'hub' ? 'الطبقة 1 · Physical' : activeDevice === 'switch' ? 'الطبقة 2 · Data Link' : 'الطبقة 3 · Network' },
 ]}
 links={NODES.map<WorkbenchLink>(n => ({ id: n.id, from: view.nodes[n.id] === 'tx' ? n.id : 'central', to: view.nodes[n.id] === 'tx' ? 'central' : n.id,
   tone: view.nodes[n.id] === 'collision' ? 'error' : view.nodes[n.id] === 'rx' ? 'success' : view.nodes[n.id] === 'tx' || view.nodes[n.id] === 'drop' ? 'active' : 'neutral', moving: isSimulating && !!view.nodes[n.id] }))}
>
<div className="relative bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 rounded-2xl p-4 sm:p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#dcd1bd_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative mx-auto w-full max-w-xl">
          {/* Wires (behind the cards) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {NODES.map((n, i) => {
              const state = view.nodes[n.id];
              return (
                <line
                  key={n.id}
                  x1={WIRE_ANCHORS[i][0]}
                  y1={WIRE_ANCHORS[i][1]}
                  x2={50}
                  y2={50}
                  strokeWidth={state ? 3 : 2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className={`transition-colors ${
                    state ? `${WIRE_CLASS[state]} ${state === 'tx' ? 'animate-pulse' : ''}` : 'stroke-beige-400 dark:stroke-stone-700'
                  }`}
                />
              );
            })}
          </svg>

          <div className="relative grid grid-cols-2 gap-x-3 gap-y-6">
            {NODES.slice(0, 2).map(renderNode)}

            {/* Central Device */}
            <div className="col-span-2 flex justify-center">
              <div
                className={`relative z-10 flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all ${
                  view.collision
                    ? 'border-rose-500 bg-rose-100 dark:bg-rose-950 collision-flash shadow-xl'
                    : `${device.border} bg-white dark:bg-stone-900 shadow-md`
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-2">
                  <device.Icon className={`w-6 h-6 ${device.icon}`} />
                </div>
                <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">{device.name}</span>
                <span className="font-mono text-xs text-stone-600 dark:text-zinc-400 mt-0.5">{device.layer}</span>

                {view.collision && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold font-mono whitespace-nowrap animate-bounce shadow-lg">
                      💥 COLLISION DETECTED!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {NODES.slice(2).map(renderNode)}
          </div>
        </div>
      </div>

      </LabWorkbench>

      {/* Forwarding Table */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl border border-beige-300 dark:border-stone-800 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">
            {activeDevice === 'hub' ? 'No Forwarding Table' : activeDevice === 'switch' ? 'MAC Address Table (CAM)' : 'IP Routing Table'}
          </span>
          <ArabicText as="span" className="text-xs text-stone-600 dark:text-zinc-400">
            {activeDevice === 'hub'
              ? 'الـ Hub مفيهوش جدول ومبيقراش أي عنوان، بيكرر الإشارة على كل البورتات.'
              : activeDevice === 'switch'
              ? 'الجدول متعلّم من فريمات قبل كده، والصف المظلل هو اللي السويتش بيدور عليه.'
              : 'كل Interface على شبكة مختلفة، والراوتر بيختار الـ Interface حسب الـ Destination IP.'}
          </ArabicText>
        </div>

        {activeDevice !== 'hub' && (
          <div className="overflow-x-auto">
            <div className="min-w-[290px] font-mono text-xs">
              <div className="grid grid-cols-[4.5rem_1fr_3.25rem] gap-2 px-2 pb-1 font-bold text-stone-600 dark:text-zinc-400">
                {tableCols.map(c => <span key={c}>{c}</span>)}
              </div>
              {NODES.map(n => (
                <div
                  key={n.id}
                  className={`grid grid-cols-[4.5rem_1fr_3.25rem] gap-2 px-2 py-1 rounded-lg transition-colors ${
                    view.lookup.includes(n.id)
                      ? 'bg-amber-100 dark:bg-amber-950/50 font-bold text-stone-900 dark:text-stone-100'
                      : 'text-stone-700 dark:text-zinc-300'
                  }`}
                >
                  <span>{activeDevice === 'switch' ? n.port : ifOf(n)}</span>
                  <span>{activeDevice === 'switch' ? n.mac : netOf(n)}</span>
                  <span>{n.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Live Status Commentary */}
      <div
        aria-live="polite"
        className={`p-4 rounded-2xl border text-sm space-y-1.5 transition-all ${
          view.collision
            ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-stone-800 dark:text-stone-200'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5 font-bold">
          <span>⚡</span>
          <span>Live signal-path analysis</span>
          <ArabicText as="span" className="font-normal">تحليل مسار الإشارة لايف</ArabicText>
        </div>
        <p dir="ltr" className="text-sm font-medium leading-relaxed">{view.logEn}</p>
        <ArabicText className="font-medium text-stone-800 dark:text-zinc-200">{view.log}</ArabicText>
      </div>

      {/* Core Exam Rules Table */}
      <div dir="rtl" className="border border-beige-300 dark:border-stone-800 rounded-2xl overflow-hidden text-sm">
        <div className="bg-beige-100 dark:bg-stone-800 p-3 flex flex-wrap items-center justify-between gap-2">
          <ArabicText as="span" className="font-bold text-stone-900 dark:text-stone-100">
            مقارنة الامتحان الذهبية: Hub vs Switch vs Router
          </ArabicText>
          <ArabicText as="span" className="text-xs text-stone-600 dark:text-zinc-400">
            سؤال بيتكرر في امتحانات الفاينل
          </ArabicText>
        </div>

        <div className="divide-y divide-beige-200 dark:divide-stone-800">
          {COMPARISON.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-1 md:grid-cols-4 p-3 gap-2 items-center ${
                i % 2 === 0 ? 'bg-white dark:bg-stone-900' : 'bg-[#FAF7F2] dark:bg-stone-950'
              }`}
            >
              <ArabicText as="span" className="font-bold text-xs text-stone-900 dark:text-stone-100">{row.name}</ArabicText>
              <span dir="ltr" className="text-right font-mono text-xs text-stone-700 dark:text-zinc-300">{row.layer}</span>
              <span dir="rtl" className={`font-arabic font-semibold text-xs ${row.tone}`}>{row.domains}</span>
              <ArabicText as="span" className="text-xs text-stone-600 dark:text-zinc-400">{row.behavior}</ArabicText>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Share2, Send, RotateCcw, CircleCheck, CircleX, Loader } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

type Topology = 'star' | 'bus' | 'ring' | 'mesh';
type Phase = 'sending' | 'ok' | 'fail';

interface Point { x: number; y: number }

interface LinkDef {
  id: string;
  label: string;
  from: Point;
  to: Point;
  cuttable: boolean;
  width?: number;
  directed?: boolean;
  /** Position of the cut marker along the link (0 = from, 1 = to). */
  t?: number;
}

interface Outcome { ok: boolean; path: string[]; en: string; ar: string }

interface Sim { phase: Phase; path: string[]; en: string; ar: string }

// Fixed canvas: every node has an explicit centre so nothing can overlap (PC box 88x44, hub 132x84).
const W = 340;
const H = 300;
const HUB: Point = { x: 170, y: 150 };
const HUB_ID = 0;
const SRC = 1;
const DST = 3;
const BUS_Y = 150;

const CORNERS: Record<number, Point> = {
  1: { x: 60, y: 48 },
  2: { x: 280, y: 48 },
  3: { x: 280, y: 252 },
  4: { x: 60, y: 252 },
};

// Alternating above/below the trunk keeps four PCs readable at 340px.
const BUS_PCS: Record<number, Point> = {
  1: { x: 70, y: 52 },
  2: { x: 140, y: 248 },
  3: { x: 210, y: 52 },
  4: { x: 280, y: 248 },
};

const PC_POS: Record<Topology, Record<number, Point>> = {
  star: CORNERS,
  bus: BUS_PCS,
  ring: CORNERS,
  mesh: CORNERS,
};

const busTap = (n: number): Point => ({ x: BUS_PCS[n].x, y: BUS_Y });

const RING_EDGES: Array<[number, number]> = [[1, 2], [2, 3], [3, 4], [4, 1]];
const MESH_EDGES: Array<[number, number]> = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 3], [2, 4]];
const meshId = (a: number, b: number) => `m${Math.min(a, b)}${Math.max(a, b)}`;

const LINKS: Record<Topology, LinkDef[]> = {
  star: [1, 2, 3, 4].map(n => ({
    id: `h${n}`,
    label: `Switch to PC-${n} cable`,
    from: HUB,
    to: CORNERS[n],
    cuttable: true,
    t: 0.62,
  })),
  bus: [
    { id: 'sL', label: 'Trunk end', from: { x: 24, y: BUS_Y }, to: busTap(1), cuttable: false, width: 6 },
    { id: 't12', label: 'Trunk segment PC-1 to PC-2', from: busTap(1), to: busTap(2), cuttable: true, width: 6 },
    { id: 't23', label: 'Trunk segment PC-2 to PC-3', from: busTap(2), to: busTap(3), cuttable: true, width: 6 },
    { id: 't34', label: 'Trunk segment PC-3 to PC-4', from: busTap(3), to: busTap(4), cuttable: true, width: 6 },
    { id: 'sR', label: 'Trunk end', from: busTap(4), to: { x: 316, y: BUS_Y }, cuttable: false, width: 6 },
    ...[1, 2, 3, 4].map(n => ({
      id: `d${n}`,
      label: `PC-${n} drop cable`,
      from: busTap(n),
      to: BUS_PCS[n],
      cuttable: false,
    })),
  ],
  ring: RING_EDGES.map(([a, b]) => ({
    id: `r${a}${b}`,
    label: `PC-${a} to PC-${b} link`,
    from: CORNERS[a],
    to: CORNERS[b],
    cuttable: true,
    directed: true,
  })),
  mesh: MESH_EDGES.map(([a, b]) => ({
    id: meshId(a, b),
    label: `PC-${a} to PC-${b} link`,
    from: CORNERS[a],
    to: CORNERS[b],
    cuttable: true,
    // The two diagonals cross at the centre; keep their markers apart.
    t: (a === 1 && b === 3) || (a === 2 && b === 4) ? 0.3 : 0.5,
  })),
};

const NO_NODES: ReadonlySet<number> = new Set();
const NO_LINKS: ReadonlySet<string> = new Set();

const toggled = <T,>(set: ReadonlySet<T>, value: T): Set<T> => {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
};

const meshPath = (nodes: ReadonlySet<number>, links: ReadonlySet<string>): number[] | null => {
  const prev = new Map<number, number>([[SRC, SRC]]);
  const queue = [SRC];
  while (queue.length > 0) {
    const cur = queue.shift() as number;
    if (cur === DST) break;
    for (const [a, b] of MESH_EDGES) {
      const next = a === cur ? b : b === cur ? a : null;
      if (next === null || prev.has(next) || nodes.has(next) || links.has(meshId(cur, next))) continue;
      prev.set(next, cur);
      queue.push(next);
    }
  }
  if (!prev.has(DST)) return null;
  const path = [DST];
  while (path[0] !== SRC) path.unshift(prev.get(path[0]) as number);
  return path;
};

const fail = (en: string, ar: string): Outcome => ({ ok: false, path: [], en, ar });

const evaluate = (
  topology: Topology,
  nodes: ReadonlySet<number>,
  links: ReadonlySet<string>
): Outcome => {
  const endpointDown = nodes.has(SRC) || nodes.has(DST);

  if (topology === 'star') {
    if (nodes.has(HUB_ID)) {
      return fail(
        'Transmission failed: the central switch is down, so every PC is cut off from the network (single point of failure).',
        'فشل الإرسال: السويتش المركزي واقع، فكل الأجهزة اتقطعت عن بعض (Single Point of Failure).'
      );
    }
    if (endpointDown || links.has('h1') || links.has('h3')) {
      return fail(
        'Transmission failed: PC-1 or PC-3 (or its cable) is offline. The other PCs keep working normally.',
        'فشل الإرسال: PC-1 أو PC-3 (أو الكابل بتاعه) مقطوع، لكن باقي الأجهزة شغالة عادي.'
      );
    }
    return {
      ok: true,
      path: ['h1', 'h3'],
      en: 'Delivery successful: the switch forwarded the frame straight to PC-3 over its own dedicated cable.',
      ar: 'نجح الإرسال: السويتش حوّل الإطار (Frame) مباشرة لـ PC-3 على كابل مخصوص ليه.',
    };
  }

  if (topology === 'bus') {
    if (['t12', 't23', 't34'].some(id => links.has(id))) {
      return fail(
        'Transmission failed: the trunk cable is cut. The signal reflects at the open end and the shared medium goes down for every PC.',
        'فشل الإرسال: الكابل الرئيسي (Trunk) اتقطع، فالإشارة بترجع من الطرف المفتوح (Reflection) والخط المشترك وقع على كل الأجهزة.'
      );
    }
    if (endpointDown) {
      return fail(
        'Transmission failed: PC-1 or PC-3 is offline. The other PCs are unaffected because bus taps are passive.',
        'فشل الإرسال: PC-1 أو PC-3 مطفي. باقي الأجهزة مش متأثرة لأن التوصيلة على الـ Bus بتكون سلبية (Passive).'
      );
    }
    return {
      ok: true,
      path: ['d1', 't12', 't23', 'd3'],
      en: 'Delivery successful: the signal travelled along the shared trunk. Every PC heard it, but only PC-3 accepted the frame.',
      ar: 'نجح الإرسال: الإشارة مشيت على الكابل المشترك وكل الأجهزة سمعتها، بس PC-3 هو اللي استلم الإطار.',
    };
  }

  if (topology === 'ring') {
    // Single unidirectional ring: any failed PC or cable anywhere stops the token.
    if (nodes.size > 0 || links.size > 0) {
      return fail(
        'Transmission failed: a broken link or a failed PC stops the token from circulating, so no PC can transmit (single ring).',
        'فشل الإرسال: أي وصلة مقطوعة أو جهاز واقع بيوقّف دوران الـ Token، فمفيش جهاز يقدر يبعت (Single Ring).'
      );
    }
    return {
      ok: true,
      path: ['r12', 'r23'],
      en: 'Delivery successful: the frame travelled clockwise from PC-1 through PC-2 to PC-3, then the token was released.',
      ar: 'نجح الإرسال: الإطار لفّ في اتجاه عقارب الساعة من PC-1 على PC-2 لحد ما وصل PC-3، وبعدها الـ Token اتحرر.',
    };
  }

  if (endpointDown) {
    return fail(
      'Transmission failed: PC-1 or PC-3 itself is offline, and no path can reach a dead endpoint.',
      'فشل الإرسال: PC-1 أو PC-3 نفسه مطفي، ومفيش مسار بيوصل لجهاز واقع.'
    );
  }
  const route = meshPath(nodes, links);
  if (!route) {
    return fail(
      'Transmission failed: every path between PC-1 and PC-3 is cut.',
      'فشل الإرسال: كل المسارات بين PC-1 و PC-3 مقطوعة.'
    );
  }
  const path = route.slice(1).map((n, i) => meshId(route[i], n));
  const via = route.slice(1, -1).map(n => `PC-${n}`);
  if (via.length === 0) {
    return {
      ok: true,
      path,
      en: 'Delivery successful: the direct PC-1 ↔ PC-3 link carried the frame.',
      ar: 'نجح الإرسال: الوصلة المباشرة بين PC-1 و PC-3 وصّلت الإطار.',
    };
  }
  return {
    ok: true,
    path,
    en: `Delivery successful: the direct link is down, so traffic was rerouted via ${via.join(' and ')}.`,
    ar: `نجح الإرسال: الوصلة المباشرة واقعة، فالداتا اتحوّلت لمسار بديل عن طريق ${via.join(' و ')} من غير انقطاع.`,
  };
};

const TOPOLOGIES: Array<{ id: Topology; label: string }> = [
  { id: 'star', label: 'نجمة (Star)' },
  { id: 'bus', label: 'ناقل (Bus)' },
  { id: 'ring', label: 'حلقة (Ring)' },
  { id: 'mesh', label: 'متشابكة (Mesh)' },
];

const INFO: Record<Topology, { title: string; en: string; ar: string }> = {
  star: {
    title: 'طوبولوجيا النجمة (Star Topology)',
    en: 'Every PC connects to a central switch/hub. Easy to add or isolate nodes, but the center is a single point of failure.',
    ar: 'كل جهاز موصّل بالسويتش المركزي بكابل لوحده، فسهل تضيف جهاز أو تعزله. عيبها إن لو السويتش وقع الشبكة كلها بتقع.',
  },
  bus: {
    title: 'طوبولوجيا الناقل (Bus Topology)',
    en: 'All PCs share one backbone cable. Cheap and simple, but a cut in the trunk takes the whole network down.',
    ar: 'كل الأجهزة بتتشارك كابل رئيسي واحد (Trunk)، رخيصة وبسيطة. بس أي قطع في الكابل بيوقّف الشبكة كلها.',
  },
  ring: {
    title: 'طوبولوجيا الحلقة (Ring Topology)',
    en: 'PCs form a loop and pass a token, so there are no collisions. In a single ring, any break or failed PC stops the token.',
    ar: 'الأجهزة متوصلة في حلقة وبتبعت الـ Token بالدور، فمفيش تصادم (Collisions). في الـ Single Ring أي قطع أو جهاز واقع بيوقّف الـ Token.',
  },
  mesh: {
    title: 'طوبولوجيا الشبكة المتشابكة (Mesh Topology)',
    en: 'Every PC links to every other PC. Traffic reroutes around failures, but the cabling is costly.',
    ar: 'كل جهاز موصّل بكل الأجهزة التانية (4 أجهزة = 6 وصلات)، فلو وصلة وقعت الداتا بتلف من طريق تاني. عيبها تكلفة الكابلات العالية.',
  },
};

const PC_BASE =
  'absolute z-10 -translate-x-1/2 -translate-y-1/2 w-[88px] h-11 flex items-center justify-center gap-1.5 rounded-xl border text-sm font-bold transition-all';
const PC_IDLE =
  'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200 hover:border-stone-500 dark:hover:border-stone-500';
const PC_FAILED =
  'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-500/70 text-rose-700 dark:text-rose-300 line-through';

const PHASE_TONE: Record<Phase, { box: string; text: string; icon: string }> = {
  sending: {
    box: 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/60',
    text: 'text-amber-900 dark:text-amber-200',
    icon: 'text-amber-700 dark:text-amber-300',
  },
  ok: {
    box: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60',
    text: 'text-emerald-900 dark:text-emerald-200',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  fail: {
    box: 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700/60',
    text: 'text-rose-900 dark:text-rose-200',
    icon: 'text-rose-600 dark:text-rose-400',
  },
};

export const TopologyPlayground: React.FC = () => {
  const [topology, setTopology] = useState<Topology>('star');
  const [failedNodes, setFailedNodes] = useState<ReadonlySet<number>>(NO_NODES);
  const [failedLinks, setFailedLinks] = useState<ReadonlySet<string>>(NO_LINKS);
  const [sim, setSim] = useState<Sim | null>(null);
  const timer = useRef<number | null>(null);

  const isSending = sim?.phase === 'sending';

  const cancelFlight = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => cancelFlight, []);

  const resetAll = () => {
    cancelFlight();
    setFailedNodes(NO_NODES);
    setFailedLinks(NO_LINKS);
    setSim(null);
  };

  const selectTopology = (next: Topology) => {
    if (isSending) return;
    resetAll();
    setTopology(next);
  };

  // Faults are frozen while a packet is in flight; editing them clears the stale result.
  const toggleNode = (id: number) => {
    if (isSending) return;
    setFailedNodes(prev => toggled(prev, id));
    setSim(null);
  };

  const toggleLink = (id: string) => {
    if (isSending) return;
    setFailedLinks(prev => toggled(prev, id));
    setSim(null);
  };

  const handleSend = () => {
    if (isSending) return;
    const outcome = evaluate(topology, failedNodes, failedLinks);
    const route = outcome.ok ? outcome.path : evaluate(topology, NO_NODES, NO_LINKS).path;
    setSim({
      phase: 'sending',
      path: route,
      en: 'Routing packet from PC-1 to PC-3...',
      ar: 'جاري توجيه الحزمة من PC-1 لـ PC-3...',
    });
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setSim({
        phase: outcome.ok ? 'ok' : 'fail',
        path: outcome.ok ? outcome.path : [],
        en: outcome.en,
        ar: outcome.ar,
      });
    }, 1000);
  };

  const renderLink = (link: LinkDef) => {
    const cut = failedLinks.has(link.id);
    const onRoute = sim?.path.includes(link.id) ?? false;
    const t = link.t ?? 0.5;
    const marker = {
      x: link.from.x + (link.to.x - link.from.x) * t,
      y: link.from.y + (link.to.y - link.from.y) * t,
    };
    const angle = (Math.atan2(link.to.y - link.from.y, link.to.x - link.from.x) * 180) / Math.PI;

    let stroke = 'stroke-stone-500 dark:stroke-stone-400';
    let fill = 'fill-stone-600 dark:fill-stone-300';
    if (cut) {
      stroke = 'stroke-rose-500 dark:stroke-rose-400';
    } else if (onRoute && sim?.phase === 'sending') {
      stroke = 'stroke-amber-500 dark:stroke-amber-400 animate-pulse';
      fill = 'fill-amber-500 dark:fill-amber-400';
    } else if (onRoute && sim?.phase === 'ok') {
      stroke = 'stroke-emerald-500 dark:stroke-emerald-400';
      fill = 'fill-emerald-500 dark:fill-emerald-400';
    } else if (link.cuttable) {
      stroke += ' group-hover:stroke-amber-500 dark:group-hover:stroke-amber-400';
    }

    const visible = (
      <line
        x1={link.from.x}
        y1={link.from.y}
        x2={link.to.x}
        y2={link.to.y}
        strokeWidth={onRoute ? (link.width ?? 3) + 2 : link.width ?? 3}
        strokeDasharray={cut ? '6 6' : undefined}
        className={`transition-colors ${stroke}`}
      />
    );

    if (!link.cuttable) return <g key={link.id}>{visible}</g>;

    return (
      <g
        key={link.id}
        role="button"
        tabIndex={0}
        aria-pressed={cut}
        aria-label={link.label}
        className="group cursor-pointer"
        onClick={() => toggleLink(link.id)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLink(link.id);
          }
        }}
      >
        {visible}
        <line
          x1={link.from.x}
          y1={link.from.y}
          x2={link.to.x}
          y2={link.to.y}
          stroke="transparent"
          strokeWidth={26}
          pointerEvents="stroke"
        />
        {link.directed && !cut && (
          <polygon
            points="-6,-6 6,0 -6,6"
            transform={`translate(${marker.x} ${marker.y}) rotate(${angle})`}
            className={fill}
          />
        )}
        {cut && (
          <>
            <circle
              cx={marker.x}
              cy={marker.y}
              r={11}
              strokeWidth={2}
              className="fill-rose-100 dark:fill-rose-950 stroke-rose-500 dark:stroke-rose-400"
            />
            <text
              x={marker.x}
              y={marker.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-rose-700 dark:fill-rose-300 text-xs font-bold"
            >
              ✕
            </text>
          </>
        )}
      </g>
    );
  };

  const renderPc = (id: number) => {
    const at = PC_POS[topology][id];
    const failed = failedNodes.has(id);
    let ring = '';
    if (!failed && isSending && (id === SRC || id === DST)) {
      ring = 'ring-2 ring-amber-400 dark:ring-amber-300';
    } else if (!failed && sim?.phase === 'ok' && id === DST) {
      ring = 'ring-2 ring-emerald-500 dark:ring-emerald-400';
    }
    return (
      <button
        key={id}
        type="button"
        onClick={() => toggleNode(id)}
        aria-pressed={failed}
        aria-label={`PC-${id}`}
        style={{ left: at.x, top: at.y }}
        className={`${PC_BASE} ${failed ? PC_FAILED : PC_IDLE} ${ring}`}
      >
        <span aria-hidden="true">💻</span>
        <span>PC-{id}</span>
      </button>
    );
  };

  const hubFailed = failedNodes.has(HUB_ID);
  const tone = sim ? PHASE_TONE[sim.phase] : null;
  const StatusIcon = sim?.phase === 'ok' ? CircleCheck : sim?.phase === 'fail' ? CircleX : Loader;
  const missions: ChallengeMission[] = [
    { id: 'repair-star', title: 'Repair the star connection', titleAr: 'صلّح اتصال الـ Star', goal: 'PC-1 cannot reach PC-3 in the Star network. Find and repair the failed connection, keep all devices online, then prove delivery with a packet.', goalAr: 'PC-1 مش قادر يوصل لـ PC-3 في شبكة الـ Star. دوّر على الوصلة المتعطّلة وصلّحها، وخلي كل الأجهزة شغّالة، وبعدها أثبت التوصيل بحزمة.', hint: 'Inspect the red link state. A star uses separate cables through its central switch.', hintAr: 'افحص حالة الوصلة الحمرا. الـ Star بتستخدم كابلات منفصلة من خلال الـ Switch المركزي.', start: () => { resetAll(); setTopology('star'); setFailedLinks(new Set(['h3'])); },
      evaluate: () => topology !== 'star' ? feedback('retry', 'Return to Star for this repair mission.', 'ارجع للـ Star عشان مهمة الإصلاح دي.') : sim?.phase !== 'ok' ? feedback('pending', sim?.phase === 'fail' ? 'Delivery still failed. Inspect faults, repair, and send again.' : 'Send a packet after repairing the connection.', sim?.phase === 'fail' ? 'التوصيل لسه فاشل. افحص الأعطال، وصلّح وابعت تاني.' : 'ابعت حزمة بعد ما تصلّح الوصلة.') : failedNodes.size || failedLinks.size ? feedback('retry', 'Delivery worked, but a device or cable is still disabled. Restore all of them and retest.', 'التوصيل نجح، بس لسه فيه جهاز أو كابل متعطّل. رجّعهم كلهم واختبر تاني.') : feedback('success', 'Star repaired: PC-1 reached PC-3 through the central switch with no remaining faults.', 'الـ Star اتصلّحت: PC-1 وصل لـ PC-3 من خلال الـ Switch المركزي من غير أعطال متبقّية.') },
    { id: 'mesh-detour', title: 'Keep delivery through a detour', titleAr: 'خلّي التوصيل شغّال بمسار بديل', goal: 'The direct PC-1–PC-3 Mesh link is down. Keep that link down and all devices online. Send a packet that reaches PC-3 through a different PC.', goalAr: 'وصلة الـ Mesh المباشرة بين PC-1 وPC-3 متعطّلة. خلّيها متعطّلة وكل الأجهزة شغّالة. ابعت حزمة توصل لـ PC-3 من خلال PC تاني.', hint: 'Redundant mesh links can carry the frame around a broken direct link.', hintAr: 'وصلات الـ Mesh البديلة ممكن تنقل الـ Frame حوالين الوصلة المباشرة المقطوعة.', start: () => { resetAll(); setTopology('mesh'); setFailedLinks(new Set(['m13'])); },
      evaluate: () => topology !== 'mesh' || !failedLinks.has('m13') || failedNodes.size ? feedback('retry', 'Use Mesh with the direct link disabled and every PC online.', 'استخدم الـ Mesh مع تعطيل الوصلة المباشرة وتشغيل كل PC.') : sim?.phase === 'ok' && sim.path.length >= 2 && !sim.path.includes('m13') ? feedback('success', 'Delivery survived: the frame followed an alternate path while the direct link remained down.', 'التوصيل فضل شغّال: الـ Frame مشي في مسار بديل والوصلة المباشرة فضلت متعطّلة.') : feedback('pending', 'Send and inspect the alternate path; restore any additional faults if delivery fails.', 'ابعت وافحص المسار البديل؛ وصلّح أي أعطال إضافية لو التوصيل فشل.') },
  ];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Share2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Network Topologies &amp; Fault Tolerance Simulator
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                محاكي طوبولوجيا الشبكات وتأثير الأعطال على استمرارية الاتصال
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Topology Selector */}
        <div className="bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl flex flex-wrap items-center gap-1 text-xs font-bold border border-beige-300 dark:border-stone-700">
          {TOPOLOGIES.map(t => (
            <button
              key={t.id}
              disabled={isSending}
              onClick={() => selectTopology(t.id)}
              aria-pressed={topology === t.id}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                topology === t.id
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <span dir="rtl" className="font-arabic">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Board */}
      <LabChallenge missions={missions} busy={isSending} />
      <div className="bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-4 border border-beige-300 dark:border-stone-800 select-none">
        {/* Top Control Bar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1 basis-64 space-y-0.5">
            <p className="text-sm font-medium text-stone-600 dark:text-zinc-400">
              Interactive test: click a device or a link to break it, then send a packet.
            </p>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
              جرّب بنفسك: دوس على أي جهاز أو وصلة عشان تعطّلها، وبعدين ابعت الحزمة وشوف إيه اللي بيحصل.
            </ArabicText>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSend}
              disabled={isSending}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span dir="rtl" className="font-arabic">{isSending ? 'جاري الإرسال...' : 'ابعت حزمة'}</span>
              <span dir="ltr" className="font-mono text-xs opacity-80">PC-1 → PC-3</span>
            </button>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-beige-100 dark:bg-stone-800 hover:bg-beige-200 dark:hover:bg-stone-700 text-stone-700 dark:text-zinc-300 border border-beige-300 dark:border-stone-700 text-sm font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span dir="rtl" className="font-arabic">إعادة ضبط</span>
            </button>
          </div>
        </div>

        {/* Diagram: fixed-size canvas, scrolls sideways on narrow screens */}
        <LabWorkbench title={`${topology.toUpperCase()} · fault tolerance`} motionKey={sim?.phase}
 nodes={[
  ...[1, 2, 3, 4].map<WorkbenchNode>(n => ({ id: String(n), label: `PC-${n}`, kind: 'computer', position: [(PC_POS[topology][n].x - 170) / 35, 0, (PC_POS[topology][n].y - 150) / 35], tone: failedNodes.has(n) ? 'error' : sim?.phase === 'ok' && n === DST ? 'success' : isSending && (n === SRC || n === DST) ? 'active' : 'neutral', detail: failedNodes.has(n) ? 'This endpoint is offline.' : n === SRC ? 'Source endpoint.' : n === DST ? 'Destination endpoint.' : 'Neighboring endpoint.', detailAr: failedNodes.has(n) ? 'الجهاز ده متعطل.' : n === SRC ? 'الجهاز المرسل.' : n === DST ? 'الجهاز المستقبِل.' : 'جهاز مجاور.', action: () => toggleNode(n), actionLabel: failedNodes.has(n) ? 'Restore device' : 'Disable device', disabled: isSending })),
  ...(topology === 'star' ? [{ id: '0', label: 'Central Switch', kind: 'switch' as const, position: [0, 0, 0] as [number, number, number], tone: hubFailed ? 'error' as const : 'info' as const, detail: 'Single point of failure: disabling the center disconnects the star.', detailAr: 'تعطيل الـ Switch المركزي بيفصل شبكة Star كلها.', action: () => toggleNode(0), actionLabel: hubFailed ? 'Restore switch' : 'Disable switch', disabled: isSending }] : []),
 ]}
 links={LINKS[topology].map<WorkbenchLink>(link => ({ id: link.id, label: link.label, points: [[(link.from.x - 170) / 35, .04, (link.from.y - 150) / 35], [(link.to.x - 170) / 35, .04, (link.to.y - 150) / 35]], tone: failedLinks.has(link.id) ? 'error' : sim?.path.includes(link.id) ? isSending ? 'active' : 'success' : 'neutral', moving: isSending && !!sim?.path.includes(link.id) && !failedLinks.has(link.id), action: link.cuttable ? () => toggleLink(link.id) : undefined, disabled: isSending }))}
>
<div className="w-full overflow-x-auto">
          <div className="relative mx-auto shrink-0" style={{ width: W, height: H }}>
            <svg
              width={W}
              height={H}
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0"
              role="group"
              aria-label={`${topology} topology diagram`}
            >
              {LINKS[topology].map(renderLink)}
              {topology === 'bus' && (
                <>
                  {[24, 316].map(x => (
                    <rect
                      key={x}
                      x={x - 3}
                      y={BUS_Y - 12}
                      width={6}
                      height={24}
                      rx={2}
                      className="fill-stone-700 dark:fill-stone-300"
                    />
                  ))}
                  {[1, 2, 3, 4].map(n => (
                    <circle
                      key={n}
                      cx={busTap(n).x}
                      cy={BUS_Y}
                      r={5}
                      className="fill-stone-700 dark:fill-stone-300"
                    />
                  ))}
                </>
              )}
            </svg>

            {topology === 'star' && (
              <button
                type="button"
                onClick={() => toggleNode(HUB_ID)}
                aria-pressed={hubFailed}
                aria-label="Central switch"
                style={{ left: HUB.x, top: HUB.y }}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 w-[132px] h-[84px] flex flex-col items-center justify-center rounded-2xl border-2 transition-all text-center ${
                  hubFailed
                    ? 'bg-rose-100 dark:bg-rose-950/50 border-rose-500 dark:border-rose-400 text-rose-800 dark:text-rose-200 animate-pulse'
                    : 'bg-white dark:bg-stone-900 border-stone-800 dark:border-stone-300 text-stone-900 dark:text-stone-100 hover:border-stone-500 dark:hover:border-stone-500'
                }`}
              >
                <span className="text-xl leading-none" aria-hidden="true">🔀</span>
                <span className="font-bold text-sm leading-tight pt-1">Central Switch</span>
                <span className="text-xs font-mono leading-tight text-stone-600 dark:text-zinc-400">
                  {hubFailed ? 'FAILED' : 'Active'}
                </span>
              </button>
            )}

            {topology === 'ring' && (
              <span
                className="absolute z-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 text-xs font-mono font-bold bg-white dark:bg-stone-900 text-stone-800 dark:text-zinc-200 px-2.5 py-1 rounded-md border border-beige-300 dark:border-stone-700"
                style={{ left: HUB.x, top: HUB.y }}
              >
                Token Passing
              </span>
            )}

            {[1, 2, 3, 4].map(renderPc)}
          </div>
        </div>
</LabWorkbench>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-6 rounded bg-emerald-500 dark:bg-emerald-400" />
            <ArabicText as="span" className="text-xs text-stone-600 dark:text-zinc-400">وصلت (Delivered)</ArabicText>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-6 rounded bg-amber-500 dark:bg-amber-400" />
            <ArabicText as="span" className="text-xs text-stone-600 dark:text-zinc-400">بتتبعت (Sending)</ArabicText>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-6 border-t-2 border-dashed border-rose-500 dark:border-rose-400" />
            <ArabicText as="span" className="text-xs text-stone-600 dark:text-zinc-400">عطل (Fault)</ArabicText>
          </span>
        </div>

        {/* Live Status */}
        {sim && tone && (
          <div
            role="status"
            aria-live="polite"
            className={`w-full max-w-xl p-4 rounded-xl border text-sm space-y-1.5 ${tone.box}`}
          >
            <p className={`flex items-start gap-2 font-bold ${tone.text}`}>
              <StatusIcon
                className={`w-4 h-4 mt-1 shrink-0 ${tone.icon} ${sim.phase === 'sending' ? 'animate-spin' : ''}`}
              />
              <span>{sim.en}</span>
            </p>
            <ArabicText className="text-sm">{sim.ar}</ArabicText>
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        {(Object.keys(INFO) as Topology[]).map(key => {
          const info = INFO[key];
          return (
            <div
              key={key}
              className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                topology === key
                  ? 'bg-amber-50/80 dark:bg-amber-950/25 border-amber-300 dark:border-amber-700/60'
                  : 'bg-beige-50 dark:bg-stone-800/40 border-beige-200 dark:border-stone-800'
              }`}
            >
              <h5>
                <ArabicText as="span" className="font-bold text-stone-900 dark:text-stone-100">
                  {info.title}
                </ArabicText>
              </h5>
              <p className="text-stone-700 dark:text-zinc-300 leading-relaxed">{info.en}</p>
              <ArabicText className="text-xs text-stone-600 dark:text-zinc-400 pt-1.5 border-t border-beige-200 dark:border-stone-700">
                {info.ar}
              </ArabicText>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopologyPlayground;

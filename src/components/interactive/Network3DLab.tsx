import React, { ComponentRef, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line, OrbitControls, RoundedBox } from '@react-three/drei';
import { Box, Camera, Layers3, MousePointer2, Network, Play, RotateCcw, StepForward } from 'lucide-react';
import * as THREE from 'three';
import { ArabicText } from '../ArabicText';

type Device = 'hub' | 'switch' | 'router';
type Scenario = 'unicast' | 'broadcast' | 'pair';
type Point = [number, number, number];
type NodeStatus = 'idle' | 'source' | 'accepted' | 'discarded' | 'collision';

const PCS: { id: string; position: Point }[] = [
  { id: 'A', position: [-3, 0.15, -2] },
  { id: 'B', position: [3, 0.15, -2] },
  { id: 'C', position: [-3, 0.15, 2] },
  { id: 'D', position: [3, 0.15, 2] },
];
const CENTER: Point = [0, 0.55, 0];
const PAIR_TARGETS = [2, 3];

const statusColors: Record<NodeStatus, string> = {
  idle: '#78716c', source: '#f59e0b', accepted: '#10b981', discarded: '#78716c', collision: '#f43f5e',
};

function CameraControls({ top, resetKey }: { top: boolean; resetKey: number }) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...(top ? [0, 9.5, 0.01] : [7.5, 6.5, 8.5]) as Point);
    camera.lookAt(0, 0, 0);
    controls.current?.target.set(0, 0.2, 0);
    controls.current?.update();
  }, [camera, top, resetKey]);
  return <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={6} maxDistance={17} maxPolarAngle={Math.PI / 2.05} />;
}

function PCNode({ index, device, status }: { index: number; device: Device; status: NodeStatus }) {
  const pc = PCS[index];
  const color = statusColors[status];
  const ip = device === 'router' ? `192.168.${index + 1}.10` : `192.168.1.${(index + 1) * 10}`;
  return (
    <group position={pc.position}>
      <RoundedBox args={[1.35, 0.12, 0.9]} radius={0.04} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#57534e" roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[1.08, 0.75, 0.16]} radius={0.06} position={[0, 0.87, 0]} castShadow>
        <meshStandardMaterial color="#292524" roughness={0.45} />
      </RoundedBox>
      <mesh position={[0, 0.88, 0.086]}>
        <planeGeometry args={[0.88, 0.54]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={status === 'idle' ? 0.08 : 0.5} />
      </mesh>
      <mesh position={[0, 0.47, 0]}><boxGeometry args={[0.12, 0.35, 0.12]} /><meshStandardMaterial color="#78716c" /></mesh>
      <Html center position={[0, 1.65, 0]} style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        <div className="rounded-xl border border-beige-300 dark:border-stone-700 bg-white/95 dark:bg-stone-950/95 px-3 py-1.5 text-center shadow-sm">
          <div className="font-mono text-[13px] font-bold text-stone-900 dark:text-stone-100">PC-{pc.id} · {status.toUpperCase()}</div>
          <div className="font-mono text-[13px] text-stone-600 dark:text-zinc-400">{ip}</div>
        </div>
      </Html>
    </group>
  );
}

function CentralDevice({ device, collision }: { device: Device; collision: boolean }) {
  const color = collision ? '#f43f5e' : device === 'router' ? '#0ea5e9' : '#f59e0b';
  return (
    <group position={CENTER}>
      {device === 'router' ? (
        <mesh castShadow><cylinderGeometry args={[0.85, 0.95, 0.55, 32]} /><meshStandardMaterial color={color} roughness={0.35} /></mesh>
      ) : (
        <RoundedBox args={[device === 'hub' ? 1.5 : 1.9, 0.5, 1.15]} radius={0.1} castShadow>
          <meshStandardMaterial color={color} roughness={0.35} />
        </RoundedBox>
      )}
      {PCS.map((_, index) => <mesh key={index} position={[-0.57 + index * 0.38, 0.05, 0.59]}><boxGeometry args={[0.22, 0.14, 0.08]} /><meshStandardMaterial color="#1c1917" /></mesh>)}
      {collision && <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.45, 0]}><torusGeometry args={[1.05, 0.07, 12, 48]} /><meshBasicMaterial color="#f43f5e" /></mesh>}
      <Html center position={[0, 1.25, 0]} style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        <div className="rounded-xl bg-stone-900 dark:bg-stone-100 px-3 py-1.5 font-mono text-[13px] font-bold text-white dark:text-stone-900 shadow-sm">
          {device.toUpperCase()} · {device === 'hub' ? 'L1' : device === 'switch' ? 'L2' : 'L3'}
        </div>
      </Html>
    </group>
  );
}

function Packet({ from, to, tone, motionKey }: { from: Point; to: Point; tone: number; motionKey: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const started = useRef(0);
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { started.current = performance.now(); }, [motionKey]);
  useFrame(() => {
    if (!mesh.current) return;
    const progress = reducedMotion.current ? 1 : Math.min((performance.now() - started.current) / 900, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    mesh.current.position.lerpVectors(new THREE.Vector3(...from), new THREE.Vector3(...to), eased);
    mesh.current.position.y += 0.55 + Math.sin(progress * Math.PI) * 0.45;
  });
  return (
    <mesh ref={mesh} castShadow>
      <sphereGeometry args={[0.18, 20, 20]} />
      <meshStandardMaterial color={tone === 0 ? '#fbbf24' : '#38bdf8'} emissive={tone === 0 ? '#f59e0b' : '#0ea5e9'} emissiveIntensity={0.7} />
    </mesh>
  );
}

function NetworkScene({ device, stage, paths, collision, statuses, top, resetKey }: {
  device: Device; stage: number; paths: { from: Point; to: Point; tone: number }[]; collision: boolean;
  statuses: NodeStatus[]; top: boolean; resetKey: number;
}) {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [7.5, 6.5, 8.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 9, 6]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[18, 18]} /><meshStandardMaterial color="#44403c" transparent opacity={0.22} /></mesh>
      <gridHelper args={[16, 16, '#a8a29e', '#78716c']} position={[0, 0.01, 0]} />
      {PCS.map((pc, index) => (
        <Line key={pc.id} points={[pc.position, CENTER]} color={collision ? '#f43f5e' : stage > 0 ? '#d6d3d1' : '#78716c'} lineWidth={collision ? 3 : 1.5} />
      ))}
      <CentralDevice device={device} collision={collision} />
      {PCS.map((pc, index) => <PCNode key={pc.id} index={index} device={device} status={statuses[index]} />)}
      {paths.map((path, index) => <Packet key={`${stage}-${index}-${path.to.join(',')}`} {...path} motionKey={`${stage}-${index}`} />)}
      <CameraControls top={top} resetKey={resetKey} />
    </Canvas>
  );
}

export const Network3DLab: React.FC = () => {
  const [device, setDevice] = useState<Device>('hub');
  const [scenario, setScenario] = useState<Scenario>('unicast');
  const [target, setTarget] = useState(2);
  const [knownDestination, setKnownDestination] = useState(true);
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [top, setTop] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const reset = () => { clearTimers(); setRunning(false); setStage(0); };
  useEffect(() => () => clearTimers(), []);

  const changeDevice = (value: Device) => { setDevice(value); reset(); };
  const changeScenario = (value: Scenario) => { setScenario(value); reset(); };
  const run = () => {
    reset();
    setRunning(true);
    [1, 2, 3].forEach((nextStage, index) => {
      timers.current.push(setTimeout(() => setStage(nextStage), index * 1100));
    });
    timers.current.push(setTimeout(() => setRunning(false), 3500));
  };

  const recipients = useMemo(() => {
    if (scenario === 'pair') return device === 'hub' ? [] : PAIR_TARGETS;
    if (scenario === 'broadcast') return device === 'router' ? [] : PCS.map((_, index) => index).filter(index => index !== 0);
    if (device === 'switch' && knownDestination) return [target];
    if (device === 'router') return [target];
    if (device === 'hub') return PCS.map((_, index) => index).filter(index => index !== 0);
    return PCS.map((_, index) => index).filter(index => index !== 0);
  }, [device, knownDestination, scenario, target]);

  const paths = useMemo(() => {
    if (stage === 0) return [];
    if (stage === 1) return (scenario === 'pair' ? [0, 1] : [0]).map((source, tone) => ({ from: PCS[source].position, to: CENTER, tone }));
    return recipients.map((recipient, index) => ({ from: CENTER, to: PCS[recipient].position, tone: scenario === 'pair' ? index : 0 }));
  }, [recipients, scenario, stage]);

  const statuses: NodeStatus[] = PCS.map((_, index) => {
    if (stage === 0) return 'idle';
    if (scenario === 'pair' && device === 'hub' && stage >= 2) return 'collision';
    if (stage === 1) return (scenario === 'pair' ? [0, 1] : [0]).includes(index) ? 'source' : 'idle';
    if (recipients.includes(index)) {
      const accepts = scenario === 'broadcast' || scenario === 'pair' || index === target || device === 'router';
      return accepts ? 'accepted' : 'discarded';
    }
    return scenario !== 'pair' && index === 0 ? 'source' : 'idle';
  });

  const collision = scenario === 'pair' && device === 'hub' && stage >= 2;
  const decision = (() => {
    if (stage === 0) return ['Ready: start from PC-A and inspect each hop.', 'جاهز: ابدأ من PC-A وتابع كل خطوة.'];
    if (stage === 1) return [scenario === 'pair' ? 'PC-A and PC-B transmit at the same time.' : 'PC-A sends its frame to the central device.', scenario === 'pair' ? 'PC-A وPC-B بيبعتوا في نفس الوقت.' : 'PC-A بيبعت الـFrame للجهاز اللي في النص.'];
    if (collision) return ['Collision: the hub repeats both signals on one shared medium. No frame is delivered.', 'تصادم: الـHub كرر الإشارتين على وسيط واحد مشترك، ومفيش أي Frame وصل سليم.'];
    if (scenario === 'broadcast' && device === 'router') return ['The router stops the broadcast. It does not forward it between IP networks.', 'الـRouter وقف الـBroadcast وماعدّاهوش بين الشبكات المختلفة.'];
    if (stage === 2 && device === 'hub') return ['The hub repeats bits out of every other port. Only the unicast target accepts; other NICs discard.', 'الـHub بيكرر الإشارة على كل المنافذ التانية. في الـUnicast الجهاز المطلوب بس بيقبل والباقي بيتجاهل.'];
    if (stage === 2 && device === 'switch') return [knownDestination && scenario === 'unicast' ? 'The switch finds the destination MAC and forwards only to its port.' : 'The switch floods except the ingress port: the destination is unknown or the frame is broadcast.', knownDestination && scenario === 'unicast' ? 'الـSwitch لقى الـMAC المطلوب في الجدول وبعت على المنفذ بتاعه بس.' : 'الـSwitch عمل Flood على كل المنافذ ماعدا منفذ الاستقبال، لأن الوجهة مجهولة أو الـFrame Broadcast.'];
    if (stage === 2 && device === 'router') return ['The router checks the destination IP, selects an interface and rewrites the Layer-2 header.', 'الـRouter بص على الـIP المطلوب واختار الواجهة المناسبة، وغيّر الـLayer-2 header للحop الجديدة.'];
    return [scenario === 'pair' ? 'Both paths succeeded independently: separate switch ports or router interfaces avoid a shared-medium collision.' : 'Delivery complete. Green screens accepted the frame; grey screens discarded or never received it.', scenario === 'pair' ? 'المساران نجحوا بشكل مستقل: منافذ الـSwitch أو واجهات الـRouter بتمنع التصادم اللي بيحصل على الوسيط المشترك.' : 'الإرسال خلص. الشاشات الخضرا قبلت الـFrame، والرمادي تجاهله أو ما استقبلتوش.'];
  })();

  return (
    <section className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-5 sm:p-6 shadow-sm space-y-5">
      <header className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"><Box className="h-5 w-5" /></div>
        <div><h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">3D Network Decision Lab</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">لفّ الشبكة وشوف الـPacket وهي بتتوجّه أو بتتصادم</ArabicText></div>
      </header>

      <div className="bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl border border-beige-300 dark:border-stone-800 p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="space-y-1.5"><span className="text-[13px] font-semibold text-stone-700 dark:text-zinc-300">Central device</span><select aria-label="Central device" disabled={running} value={device} onChange={event => changeDevice(event.target.value as Device)} className="w-full min-h-11 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 text-sm text-stone-800 dark:text-zinc-200"><option value="hub">Hub · Layer 1</option><option value="switch">Switch · Layer 2</option><option value="router">Router · Layer 3</option></select></label>
          <label className="space-y-1.5"><span className="text-[13px] font-semibold text-stone-700 dark:text-zinc-300">Traffic scenario</span><select aria-label="Traffic scenario" disabled={running} value={scenario} onChange={event => changeScenario(event.target.value as Scenario)} className="w-full min-h-11 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 text-sm text-stone-800 dark:text-zinc-200"><option value="unicast">Unicast · A → chosen PC</option><option value="broadcast">Broadcast · A → all</option><option value="pair">Two senders · A + B</option></select></label>
          <label className="space-y-1.5"><span className="text-[13px] font-semibold text-stone-700 dark:text-zinc-300">Destination</span><select aria-label="Destination PC" disabled={running || scenario !== 'unicast'} value={target} onChange={event => { setTarget(Number(event.target.value)); reset(); }} className="w-full min-h-11 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 text-sm text-stone-800 dark:text-zinc-200 disabled:opacity-50">{PCS.slice(1).map((pc, offset) => <option key={pc.id} value={offset + 1}>PC-{pc.id}</option>)}</select></label>
          <div className="flex items-end"><div className="flex flex-wrap gap-2 w-full"><button disabled={running || stage === 3} onClick={run} className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 px-3 text-sm font-bold disabled:opacity-50"><Play className="h-4 w-4" /><span className="font-arabic">تشغيل</span><span className="font-mono text-[13px] opacity-80">(Run)</span></button><button disabled={running || stage === 3} onClick={() => setStage(value => Math.min(value + 1, 3))} className="min-h-11 inline-flex items-center justify-center gap-1.5 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 text-sm font-semibold text-stone-800 dark:text-zinc-200 disabled:opacity-50"><StepForward className="h-4 w-4" />Step</button><button onClick={reset} className="min-h-11 inline-flex items-center justify-center rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 text-stone-800 dark:text-zinc-200" aria-label="Reset simulation"><RotateCcw className="h-4 w-4" /></button></div></div>
        </div>
        {device === 'switch' && scenario === 'unicast' && <label className="inline-flex min-h-11 items-center gap-2 text-sm text-stone-700 dark:text-zinc-300"><input type="checkbox" disabled={running} checked={knownDestination} onChange={event => { setKnownDestination(event.target.checked); reset(); }} className="h-4 w-4 accent-stone-800 dark:accent-stone-200" />Destination MAC is already in the table <span className="font-arabic">(الوجهة معروفة)</span></label>}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-beige-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-stone-950">
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          <button onClick={() => setTop(value => !value)} className="min-h-11 inline-flex items-center gap-2 rounded-xl border border-beige-300 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 px-3 text-[13px] font-semibold text-stone-800 dark:text-zinc-200 shadow-sm"><Camera className="h-4 w-4" />{top ? 'Orbit view' : 'Top view'}</button>
          <button onClick={() => setResetKey(value => value + 1)} aria-label="Reset 3D camera" className="min-h-11 rounded-xl border border-beige-300 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 px-3 text-stone-800 dark:text-zinc-200 shadow-sm"><RotateCcw className="h-4 w-4" /></button>
        </div>
        <div className="absolute right-3 top-3 z-10 hidden sm:flex items-center gap-1.5 rounded-xl bg-white/95 dark:bg-stone-900/95 border border-beige-300 dark:border-stone-700 px-3 py-2 text-[13px] text-stone-600 dark:text-zinc-400"><MousePointer2 className="h-4 w-4" />Drag to orbit · Scroll to zoom</div>
        <div className="h-[430px] sm:h-[500px]" aria-label="Interactive 3D network topology">
          <NetworkScene device={device} stage={stage} paths={paths} collision={collision} statuses={statuses} top={top} resetKey={resetKey} />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-center gap-x-4 gap-y-1 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-beige-300 dark:border-stone-700 px-3 py-2 text-[13px] font-semibold text-stone-700 dark:text-zinc-300"><span className="text-amber-700 dark:text-amber-300">● Source</span><span className="text-emerald-700 dark:text-emerald-300">● Accepted</span><span className="text-stone-500 dark:text-zinc-400">● Discarded / idle</span><span className="text-rose-700 dark:text-rose-300">● Collision</span></div>
      </div>

      <div aria-live="polite" className="rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 p-4 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300"><Layers3 className="h-4 w-4" /><span className="font-mono text-[13px] font-bold uppercase">Step {stage} / 3 · Live decision</span></div>
        <p className="text-[15px] font-semibold text-stone-800 dark:text-zinc-200">{decision[0]}</p><ArabicText className="text-sm text-stone-700 dark:text-zinc-300">{decision[1]}</ArabicText>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-4">
        <div className="overflow-x-auto rounded-2xl border border-beige-300 dark:border-stone-800">
          <div className="bg-[#FAF7F2] dark:bg-stone-950 px-4 py-3 border-b border-beige-300 dark:border-stone-800"><h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">{device === 'router' ? 'Routing view' : device === 'switch' ? 'MAC table view' : 'Hub behavior'}</h4></div>
          {device === 'hub' ? <div className="p-4 space-y-2"><p className="text-sm text-stone-700 dark:text-zinc-300">No MAC table. No forwarding decision. One shared collision domain.</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">مفيش جدول ولا قرار توجيه؛ الجهاز بيكرر Bits وكل المنافذ في نطاق تصادم واحد.</ArabicText></div> : <table className="w-full text-left font-mono text-[13px] text-stone-700 dark:text-zinc-300"><thead className="bg-[#FAF7F2] dark:bg-stone-950"><tr>{(device === 'router' ? ['Network', 'Interface'] : ['Destination MAC', 'Port']).map(label => <th key={label} className="p-3">{label}</th>)}</tr></thead><tbody>{PCS.filter((_, index) => device === 'router' || knownDestination || index !== target).map((pc, index) => <tr key={pc.id} className="border-t border-beige-200 dark:border-stone-800"><td className="p-3">{device === 'router' ? `192.168.${PCS.indexOf(pc) + 1}.0/24` : `${pc.id}${pc.id}:11:${pc.id}${pc.id}:11:${pc.id}${pc.id}`}</td><td className="p-3">{device === 'router' ? `Gi0/${PCS.indexOf(pc)}` : `Fa0/${PCS.indexOf(pc) + 1}`}</td></tr>)}</tbody></table>}
        </div>
        <div className="rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 p-4 space-y-2"><div className="flex items-center gap-2 text-stone-800 dark:text-zinc-200"><Network className="h-4 w-4" /><h4 className="text-sm font-bold">What the 3D scene proves</h4></div><p className="text-sm leading-relaxed text-stone-700 dark:text-zinc-300">{device === 'hub' ? 'A hub has no intelligence: it repeats electrical signals. A switch reads MAC addresses; a router reads IP addresses.' : device === 'switch' ? 'Known unicast uses one port. Unknown unicast and broadcast flood, but each switch port remains a separate collision domain.' : 'A router separates broadcast domains. The destination IP stays end-to-end; Layer-2 headers change at each routed hop.'}</p><ArabicText className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">{device === 'hub' ? 'الـHub بيكرر الإشارة من غير فهم. الـSwitch بيقرأ MAC، أما الـRouter فبيقرأ IP.' : device === 'switch' ? 'الـUnicast المعروف بيخرج على منفذ واحد، لكن المجهول والـBroadcast بيعملوا Flood. وكل منفذ Switch نطاق تصادم مستقل.' : 'الـRouter بيفصل نطاقات الـBroadcast. الـIP النهائي ثابت، لكن ترويسة الـLayer 2 بتتغير عند كل Hop.'}</ArabicText><p className="text-[13px] text-stone-500 dark:text-zinc-400">Teaching model: playback timing is illustrative, not measured network latency.</p></div>
      </div>
    </section>
  );
};

export default Network3DLab;

import React, { Component, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  Bot,
  Box,
  Brain,
  Eye,
  EyeOff,
  Hand,
  Layers,
  Lock,
  Orbit,
  Pause,
  Play,
  RotateCcw,
  ScanEye,
  StepForward,
  View,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { SceneLabel } from './SceneLabel';

/* ------------------------------------------------------------------ */
/* World model (pure)                                                  */
/* ------------------------------------------------------------------ */

type RoomId = 'A' | 'B' | 'C' | 'D';
type Status = 'Dirty' | 'Clean';
type ViewMode = 'learner' | 'agent';
type SpeedId = 'slow' | 'normal' | 'fast';

const ROOMS: RoomId[] = ['A', 'B', 'C', 'D'];
// Fixed patrol: A → B → D → C → A (clockwise when seen from above).
const PATROL: RoomId[] = ['A', 'B', 'D', 'C'];
const nextRoom = (room: RoomId): RoomId => PATROL[(PATROL.indexOf(room) + 1) % PATROL.length];

const SPACING = 3.4;
const ROOM_XZ: Record<RoomId, [number, number]> = {
  A: [-SPACING / 2, -SPACING / 2],
  B: [SPACING / 2, -SPACING / 2],
  C: [-SPACING / 2, SPACING / 2],
  D: [SPACING / 2, SPACING / 2],
};

const SPEED_MS: Record<SpeedId, number> = { slow: 1500, normal: 950, fast: 450 };

type Dirt = Record<RoomId, boolean>;

interface LogEntry {
  n: number;
  room: RoomId;
  seen: Status;
  action: 'Suck' | 'Move';
  to: RoomId;
  clean: number;
  score: number;
}

interface World {
  dirty: Dirt;
  at: RoomId;
  score: number;
  steps: number;
  log: LogEntry[];
}

const allDirty = (): Dirt => ({ A: true, B: true, C: true, D: true });
const countClean = (dirty: Dirt) => ROOMS.filter((r) => !dirty[r]).length;
const isFinished = (dirty: Dirt) => ROOMS.every((r) => !dirty[r]);
const makeWorld = (dirty: Dirt = allDirty()): World => ({ dirty, at: 'A', score: 0, steps: 0, log: [] });

/** Simple reflex rule: dirty here → Suck; otherwise move to the next patrol room. */
function stepWorld(w: World): World {
  if (isFinished(w.dirty)) return w;
  const seen: Status = w.dirty[w.at] ? 'Dirty' : 'Clean';
  let dirty = w.dirty;
  let at = w.at;
  let action: LogEntry['action'];
  if (seen === 'Dirty') {
    action = 'Suck';
    dirty = { ...w.dirty, [w.at]: false };
  } else {
    action = 'Move';
    at = nextRoom(w.at);
  }
  const clean = countClean(dirty);
  const steps = w.steps + 1;
  const score = w.score + clean;
  const entry: LogEntry = { n: steps, room: w.at, seen, action, to: at, clean, score };
  return { dirty, at, score, steps, log: [...w.log, entry] };
}

interface Forecast {
  steps: number;
  gained: number;
  actions: string[];
}

function forecast(w: World): Forecast {
  let cur = w;
  const actions: string[] = [];
  for (let i = 0; i < 100 && !isFinished(cur.dirty); i += 1) {
    const next = stepWorld(cur);
    const e = next.log[next.log.length - 1];
    actions.push(e.action === 'Suck' ? 'Suck' : `→${e.to}`);
    cur = next;
  }
  return { steps: cur.steps - w.steps, gained: cur.score - w.score, actions };
}

const statusAr = (s: Status) => (s === 'Dirty' ? 'وسخة' : 'نضيفة');
const actionEn = (e: Pick<LogEntry, 'action' | 'to'>) => (e.action === 'Suck' ? 'Suck' : `Move to ${e.to}`);
const actionAr = (e: Pick<LogEntry, 'action' | 'to'>) =>
  e.action === 'Suck' ? 'شفط (Suck)' : `التحرك لأوضة ${e.to}`;

interface Msg {
  en: string;
  ar: string;
}

function describe(w: World, finished: boolean, running: boolean): Msg {
  if (w.steps === 0 && finished) {
    return {
      en: 'All rooms are already clean, so there is nothing to do. Press Reset to make them dirty again.',
      ar: 'كل الأوض نضيفة أصلًا فمفيش حاجة تتعمل. دوس على Reset عشان ترجّعها وسخة.',
    };
  }
  if (w.steps === 0) {
    const n = ROOMS.filter((r) => w.dirty[r]).length;
    return {
      en: `Ready. The agent is in room A and ${n} of 4 rooms are dirty. Press Step or Run.`,
      ar: `جاهزين. الـ Agent في أوضة A وعدد الأوض الوسخة ${n} من 4. دوس على Step أو Run.`,
    };
  }
  if (finished) {
    return {
      en: `Finished after ${w.steps} actions. All 4 rooms are clean and the final score is ${w.score}. The simulator stopped the run; the agent itself cannot tell it is done.`,
      ar: `خلصنا بعد ${w.steps} فعل. الأوض الأربعة نضيفة والـ Score النهائي ${w.score}. المحاكاة هي اللي وقفت التشغيل، والـ Agent نفسه مش بيعرف إنه خلّص.`,
    };
  }
  const e = w.log[w.log.length - 1];
  return {
    en: `Step ${e.n}: in room ${e.room} the percept was ${e.seen}, so the rule chose ${actionEn(e)}. ${e.clean} of 4 rooms are clean, so the score rose by ${e.clean} to ${e.score}.${running ? '' : ' Paused.'}`,
    ar: `الخطوة ${e.n}: في أوضة ${e.room} الـ Percept كان ${statusAr(e.seen)}، فالقاعدة اختارت ${actionAr(e)}. ${e.clean} من 4 أوض نضيفة، فالـ Score زاد ${e.clean} وبقى ${e.score}.${running ? '' : ' الـ Agent واقف مؤقتًا.'}`,
  };
}

/* ------------------------------------------------------------------ */
/* Browser hooks                                                       */
/* ------------------------------------------------------------------ */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

function useIsDark(): boolean {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

/* ------------------------------------------------------------------ */
/* 3D scene                                                            */
/* ------------------------------------------------------------------ */

interface Palette {
  base: string;
  wall: string;
  unknown: string;
  clean: string;
  dirty: string;
  pile: string;
  route: string;
  next: string;
  sensor: string;
  bot: string;
  dome: string;
  nose: string;
}

const LIGHT: Palette = {
  base: '#d6d3d1',
  wall: '#a8a29e',
  unknown: '#efe8dc',
  clean: '#a7f3d0',
  dirty: '#fde68a',
  pile: '#92400e',
  route: '#0ea5e9',
  next: '#d97706',
  sensor: '#0ea5e9',
  bot: '#44403c',
  dome: '#38bdf8',
  nose: '#f59e0b',
};

const DARK: Palette = {
  base: '#292524',
  wall: '#57534e',
  unknown: '#44403c',
  clean: '#047857',
  dirty: '#78350f',
  pile: '#fbbf24',
  route: '#7dd3fc',
  next: '#fbbf24',
  sensor: '#7dd3fc',
  bot: '#e7e5e4',
  dome: '#38bdf8',
  nose: '#f59e0b',
};

interface CamCmd {
  kind: 'orbit' | 'top' | 'side' | 'reset' | 'in' | 'out';
  n: number;
}

interface CamControls {
  target: THREE.Vector3;
  update: () => void;
  addEventListener: (type: string, fn: () => void) => void;
  removeEventListener: (type: string, fn: () => void) => void;
}

const DEFAULT_AZ = Math.atan2(6.2, 7.2);
const DEFAULT_POLAR = 0.97;
const DEFAULT_DIST = 11.6;

const spherical = (az: number, polar: number, dist: number): [number, number, number] => [
  dist * Math.sin(polar) * Math.sin(az),
  dist * Math.cos(polar),
  dist * Math.sin(polar) * Math.cos(az),
];
const sphericalV = (az: number, polar: number, dist: number) => new THREE.Vector3(...spherical(az, polar, dist));

function CameraRig({ cmd, reduced }: { cmd: CamCmd; reduced: boolean }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as CamControls | null;
  const narrow = useThree((s) => s.size.width < 520);
  const goal = useRef<{ pos: THREE.Vector3; target: THREE.Vector3 } | null>(null);

  useEffect(() => {
    if (!controls) return;
    const k = narrow ? 1.2 : 1;
    const target = new THREE.Vector3(0, 0, 0);
    const rel = camera.position.clone().sub(controls.target);
    const az = Math.atan2(rel.x, rel.z);
    let pos: THREE.Vector3;
    switch (cmd.kind) {
      case 'top':
        pos = sphericalV(0, 0.02, DEFAULT_DIST * k * 1.08);
        break;
      case 'side':
        pos = sphericalV(az, 1.3, DEFAULT_DIST * k);
        break;
      case 'orbit':
        pos = sphericalV(az, DEFAULT_POLAR, DEFAULT_DIST * k);
        break;
      case 'in':
      case 'out': {
        const len = THREE.MathUtils.clamp(rel.length() * (cmd.kind === 'in' ? 0.8 : 1.25), 6, 22);
        pos = controls.target.clone().add(rel.setLength(len));
        target.copy(controls.target);
        break;
      }
      default:
        pos = sphericalV(DEFAULT_AZ, DEFAULT_POLAR, DEFAULT_DIST * k);
    }
    if (reduced || cmd.n === 0) {
      camera.position.copy(pos);
      controls.target.copy(target);
      controls.update();
      goal.current = null;
    } else {
      goal.current = { pos, target };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cmd, controls]);

  useEffect(() => {
    if (!controls) return;
    const cancel = () => {
      goal.current = null;
    };
    controls.addEventListener('start', cancel);
    return () => controls.removeEventListener('start', cancel);
  }, [controls]);

  useFrame((_, dt) => {
    const g = goal.current;
    if (!g || !controls) return;
    const a = 1 - Math.exp(-7 * dt);
    camera.position.lerp(g.pos, a);
    controls.target.lerp(g.target, a);
    controls.update();
    if (camera.position.distanceTo(g.pos) < 0.02) {
      camera.position.copy(g.pos);
      controls.target.copy(g.target);
      controls.update();
      goal.current = null;
    }
  });
  return null;
}

function TouchActionSync({ dragEnabled }: { dragEnabled: boolean }) {
  const dom = useThree((s) => s.gl.domElement);
  useEffect(() => {
    dom.style.touchAction = dragEnabled ? 'none' : 'pan-y';
  }, [dom, dragEnabled]);
  return null;
}

function DirtPiles({ show, reduced, color }: { show: boolean; reduced: boolean; color: string }) {
  const group = useRef<THREE.Group>(null);
  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;
    g.scale.setScalar(show ? 1 : 0);
    g.visible = show;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const t = show ? 1 : 0;
    const s = reduced ? t : THREE.MathUtils.damp(g.scale.x, t, 8, dt);
    g.scale.setScalar(s);
    g.visible = s > 0.02;
  });
  const piles: Array<[number, number, number]> = [
    [-0.7, -0.55, 0.26],
    [0.55, -0.75, 0.2],
    [0.85, 0.35, 0.28],
    [-0.35, 0.7, 0.22],
    [0.0, -0.05, 0.3],
    [-0.95, 0.15, 0.16],
  ];
  return (
    <group ref={group} position={[0, 0.12, 0]}>
      {piles.map(([x, z, r]) => (
        <mesh key={`${x}:${z}`} position={[x, r * 0.35, z]} scale={[1, 0.55, 1]}>
          <dodecahedronGeometry args={[r, 0]} />
          <meshStandardMaterial color={color} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

interface RoomProps {
  id: RoomId;
  dirty: boolean;
  visible: boolean;
  palette: Palette;
  reduced: boolean;
  editable: boolean;
  onToggle: (id: RoomId) => void;
}

function Room({ id, dirty, visible, palette, reduced, editable, onToggle }: RoomProps) {
  const dom = useThree((s) => s.gl.domElement);
  const [x, z] = ROOM_XZ[id];
  const floor = !visible ? palette.unknown : dirty ? palette.dirty : palette.clean;
  const en = !visible ? 'Unknown' : dirty ? 'Dirty' : 'Clean';

  return (
    <group position={[x, 0, z]}>
      <RoundedBox
        args={[3.2, 0.24, 3.2]}
        radius={0.07}
        smoothness={3}
        onClick={(e) => {
          if (!editable || e.delta > 5) return;
          e.stopPropagation();
          onToggle(id);
        }}
        onPointerOver={() => {
          if (editable) dom.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          dom.style.cursor = '';
        }}
      >
        <meshStandardMaterial color={floor} roughness={0.85} />
      </RoundedBox>
      <DirtPiles show={visible && dirty} reduced={reduced} color={palette.pile} />
      <SceneLabel position={[0, 0.55, -1.05]} title={`${id} · ${en.toUpperCase()}`} accent={visible && dirty ? '#fbbf24' : '#34d399'} width={1.5} />
    </group>
  );
}

function Walls({ color }: { color: string }) {
  const T = 0.14;
  const H = 0.36;
  const half = 3.4;
  // [x, z, width(x), depth(z)]; dividers leave door gaps at the four patrol crossings (±1.7).
  const segs: Array<[number, number, number, number]> = [
    [0, -half, half * 2 + T, T],
    [0, half, half * 2 + T, T],
    [-half, 0, T, half * 2 + T],
    [half, 0, T, half * 2 + T],
    [0, 0, T, 2.2],
    [0, 0, 2.2, T],
    [0, -2.8, T, 1.2],
    [0, 2.8, T, 1.2],
    [-2.8, 0, 1.2, T],
    [2.8, 0, 1.2, T],
  ];
  return (
    <group>
      {segs.map(([x, z, w, d]) => (
        <mesh key={`${x}:${z}:${w}:${d}`} position={[x, H / 2 - 0.1, z]}>
          <boxGeometry args={[w, H, d]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function RouteMarkers({ at, showNext, palette }: { at: RoomId; showNext: boolean; palette: Palette }) {
  const y = 0.2;
  const pts = PATROL.map((r) => [ROOM_XZ[r][0], y, ROOM_XZ[r][1]] as [number, number, number]);
  const loop = [...pts, pts[0]];
  const to = nextRoom(at);
  const nextPts: Array<[number, number, number]> = [
    [ROOM_XZ[at][0], y + 0.02, ROOM_XZ[at][1]],
    [ROOM_XZ[to][0], y + 0.02, ROOM_XZ[to][1]],
  ];
  return (
    <group>
      <Line points={loop} color={palette.route} lineWidth={2} dashed dashSize={0.26} gapSize={0.2} transparent opacity={0.85} />
      {showNext && <Line points={nextPts} color={palette.next} lineWidth={5} />}
      {PATROL.map((r, i) => {
        const [ax, az] = ROOM_XZ[r];
        const [bx, bz] = ROOM_XZ[PATROL[(i + 1) % 4]];
        const yaw = Math.atan2(bx - ax, bz - az);
        return (
          <group key={r} position={[(ax + bx) / 2, y + 0.05, (az + bz) / 2]} rotation={[0, yaw, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.2, 0.5, 16]} />
              <meshStandardMaterial color={showNext && r === at ? palette.next : palette.route} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

interface AgentProps {
  at: RoomId;
  reduced: boolean;
  palette: Palette;
  suckNonce: number;
}

function AgentBot({ at, reduced, palette, suckNonce }: AgentProps) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const pulse = useRef(1);
  const yaw = useRef(0);
  const initial = useRef(ROOM_XZ[at]).current;

  useLayoutEffect(() => {
    outer.current?.position.set(initial[0], 0, initial[1]);
  }, [initial]);

  useEffect(() => {
    if (suckNonce > 0 && !reduced) pulse.current = 0;
  }, [suckNonce, reduced]);

  useFrame((_, dt) => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const [tx, tz] = ROOM_XZ[at];
    const dx = tx - o.position.x;
    const dz = tz - o.position.z;
    const dist = Math.hypot(dx, dz);
    if (reduced) {
      o.position.x = tx;
      o.position.z = tz;
    } else {
      o.position.x = THREE.MathUtils.damp(o.position.x, tx, 4.5, dt);
      o.position.z = THREE.MathUtils.damp(o.position.z, tz, 4.5, dt);
    }
    if (dist > 0.05) {
      const desired = Math.atan2(dx, dz);
      if (reduced) {
        yaw.current = desired;
      } else {
        const diff = Math.atan2(Math.sin(desired - yaw.current), Math.cos(desired - yaw.current));
        yaw.current += diff * (1 - Math.exp(-9 * dt));
      }
      i.rotation.y = yaw.current;
    }
    const r = ring.current;
    if (r) {
      if (pulse.current < 1) {
        pulse.current = Math.min(1, pulse.current + dt / 0.75);
        r.visible = true;
        r.scale.setScalar(1 + pulse.current * 1.8);
        (r.material as THREE.MeshBasicMaterial).opacity = 0.75 * (1 - pulse.current);
      } else {
        r.visible = false;
      }
    }
  });

  return (
    <group ref={outer}>
      {/* The agent's whole perceptual field: only the room it stands in. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.14, 0]}>
        <planeGeometry args={[3.0, 3.0]} />
        <meshBasicMaterial color={palette.sensor} transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <Line
        points={[
          [-1.5, 0.16, -1.5],
          [1.5, 0.16, -1.5],
          [1.5, 0.16, 1.5],
          [-1.5, 0.16, 1.5],
          [-1.5, 0.16, -1.5],
        ]}
        color={palette.sensor}
        lineWidth={3}
      />
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.18, 0]} visible={false}>
        <ringGeometry args={[0.6, 0.78, 48]} />
        <meshBasicMaterial color={palette.sensor} transparent opacity={0.7} depthWrite={false} />
      </mesh>
      <group ref={inner}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.26, 40]} />
          <meshStandardMaterial color={palette.bot} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.41, 0]}>
          <sphereGeometry args={[0.34, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={palette.dome} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.3, 0.52]}>
          <boxGeometry args={[0.26, 0.12, 0.16]} />
          <meshStandardMaterial color={palette.nose} />
        </mesh>
      </group>
    </group>
  );
}

interface SceneProps {
  world: World;
  view: ViewMode;
  reduced: boolean;
  dark: boolean;
  cam: CamCmd;
  dragEnabled: boolean;
  editable: boolean;
  finished: boolean;
  onToggle: (id: RoomId) => void;
}

function Scene({ world, view, reduced, dark, cam, dragEnabled, editable, finished, onToggle }: SceneProps) {
  const palette = dark ? DARK : LIGHT;
  const lastSuck = world.log.length > 0 && world.log[world.log.length - 1].action === 'Suck';
  return (
    <>
      <ambientLight intensity={dark ? 0.85 : 1.05} />
      <directionalLight position={[5, 9, 4]} intensity={dark ? 1.4 : 1.6} />
      <RoundedBox args={[7.4, 0.2, 7.4]} radius={0.1} smoothness={3} position={[0, -0.12, 0]}>
        <meshStandardMaterial color={palette.base} roughness={0.95} />
      </RoundedBox>
      <Walls color={palette.wall} />
      {ROOMS.map((id) => (
        <Room
          key={id}
          id={id}
          dirty={world.dirty[id]}
          visible={view === 'learner' || id === world.at}
          palette={palette}
          reduced={reduced}
          editable={editable && view === 'learner'}
          onToggle={onToggle}
        />
      ))}
      <RouteMarkers at={world.at} showNext={!finished && !world.dirty[world.at]} palette={palette} />
      <AgentBot at={world.at} reduced={reduced} palette={palette} suckNonce={lastSuck ? world.steps : 0} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableRotate={dragEnabled}
        enableDamping={!reduced}
        dampingFactor={0.1}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={false}
      />
      <TouchActionSync dragEnabled={dragEnabled} />
      <CameraRig cmd={cam} reduced={reduced} />
    </>
  );
}

class SceneBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex h-full items-center justify-center p-6 text-center">
        <div>
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">The 3D view could not start (WebGL is unavailable).</p>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">
            مشهد الـ 3D مشتغلش (الـ WebGL مش متاح). الأزرار واللوج تحت لسه شغالين.
          </ArabicText>
        </div>
      </div>
    );
  }
}

/* ------------------------------------------------------------------ */
/* UI helpers                                                          */
/* ------------------------------------------------------------------ */

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400';
const BTN_BASE = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-left text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS}`;
const BTN_PRIMARY = `${BTN_BASE} bg-stone-900 text-white shadow-sm hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white`;
const BTN_SECONDARY = `${BTN_BASE} border border-beige-300 bg-white text-stone-800 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800`;
const PANEL = 'rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950';
const MUTED = 'text-[13px] text-stone-600 dark:text-zinc-400';

function Label({ en, ar, onDark = false }: { en: string; ar: string; onDark?: boolean }) {
  return (
    <span className="block leading-tight">
      <span className="block text-sm font-semibold">{en}</span>
      <ArabicText
        as="span"
        className={`block text-left text-[13px] font-normal leading-snug ${onDark ? 'text-white/80 dark:text-stone-700' : 'text-stone-600 dark:text-zinc-400'}`}
      >
        {ar}
      </ArabicText>
    </span>
  );
}

function Pair({
  en,
  ar,
  className = '',
  enClass = 'text-sm text-stone-800 dark:text-stone-200',
  arClass = MUTED,
}: {
  en: string;
  ar: string;
  className?: string;
  enClass?: string;
  arClass?: string;
}) {
  return (
    <div className={className}>
      <p className={enClass}>{en}</p>
      <ArabicText className={arClass}>{ar}</ArabicText>
    </div>
  );
}

interface SegOption<T extends string> {
  value: T;
  en: string;
  ar: string;
  icon?: React.ReactNode;
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: SegOption<T>[];
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1 rounded-2xl bg-stone-100 p-1 dark:bg-stone-800">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-1.5 text-left transition-colors ${FOCUS} ${
              active
                ? 'bg-stone-900 text-white shadow-sm dark:bg-stone-100 dark:text-stone-900'
                : 'text-stone-600 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-stone-100'
            }`}
          >
            {o.icon}
            <Label en={o.en} ar={o.ar} onDark={active} />
          </button>
        );
      })}
    </div>
  );
}

function SectionTitle({ en, ar }: { en: string; ar: string }) {
  return (
    <div className="mb-2">
      <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">{en}</h4>
      <ArabicText className={MUTED}>{ar}</ArabicText>
    </div>
  );
}

const PRESETS: Array<{ id: string; en: string; ar: string; dirty: RoomId[] }> = [
  { id: 'all', en: 'All dirty', ar: 'كلها وسخة', dirty: ['A', 'B', 'C', 'D'] },
  { id: 'c', en: 'Only C', ar: 'C بس', dirty: ['C'] },
  { id: 'd', en: 'Only D', ar: 'D بس', dirty: ['D'] },
  { id: 'ad', en: 'A and D', ar: 'A و D', dirty: ['A', 'D'] },
];

const LEGEND: Array<{ swatch: string; en: string; ar: string }> = [
  { swatch: 'bg-amber-600 dark:bg-amber-400', en: 'Brown piles = dirt', ar: 'الأكوام البنية = أتربة' },
  { swatch: 'bg-emerald-400 dark:bg-emerald-600', en: 'Green floor = clean', ar: 'الأرضية الخضرا = نضيفة' },
  { swatch: 'bg-sky-400 dark:bg-sky-300', en: 'Blue frame = what the agent senses', ar: 'الإطار الأزرق = اللي الـ Agent حاسس بيه' },
  { swatch: 'bg-amber-500 dark:bg-amber-400', en: 'Thick amber line = next move', ar: 'الخط العريض = الحركة الجاية' },
];

const PEAS: Array<{ k: string; en: string; ar: string; enT: string; arT: string }> = [
  {
    k: 'P',
    en: 'Performance',
    ar: 'مقياس الأداء',
    enT: '1 point for every clean room after each action (at most 4 per step here), following the Russell & Norvig scoring idea.',
    arT: 'نقطة واحدة لكل أوضة نضيفة بعد كل فعل (أقصى حاجة 4 في الخطوة هنا)، على فكرة التقييم بتاعة Russell & Norvig.',
  },
  {
    k: 'E',
    en: 'Environment',
    ar: 'البيئة',
    enT: 'Four rooms A, B, C, D, each Clean or Dirty. Discrete, static (dirt never returns), deterministic, and only partially observable by the agent.',
    arT: 'أربع أوض A، B، C، D، وكل أوضة نضيفة أو وسخة. البيئة منفصلة (Discrete) وثابتة (Static) ونتايجها محددة (Deterministic)، والـ Agent مش شايف منها غير أوضته (Partially observable).',
  },
  {
    k: 'A',
    en: 'Actuators',
    ar: 'المشغّلات',
    enT: 'Suck (clean the current room) and Move to the next room on the fixed route.',
    arT: 'شفط (Suck) للأوضة الحالية، والتحرك للأوضة اللي بعدها في المسار الثابت.',
  },
  {
    k: 'S',
    en: 'Sensors',
    ar: 'الحساسات',
    enT: 'A location sensor (which room am I in?) and a local dirt sensor (is this room dirty?).',
    arT: 'حساس مكان (أنا في أنهي أوضة؟) وحساس أتربة محلي (الأوضة دي وسخة؟).',
  },
];

const THEORY: Array<{ en: string; ar: string }> = [
  {
    en: 'Condition-action rule: the agent picks its action from the current percept only, the pair (room, status).',
    ar: 'قاعدة شرط-فعل: الـ Agent بيختار فعله من الـ Percept الحالي بس، يعني (الأوضة، حالتها).',
  },
  {
    en: 'No memory: it cannot remember that it already cleaned B, and it knows nothing about rooms it is not standing in.',
    ar: 'مفيش ذاكرة: مش فاكر إنه نضّف B قبل كده، ومش عارف حاجة عن الأوض اللي مش واقف فيها.',
  },
  {
    en: 'The fixed route is what makes this work: it visits every room, so every dirty room eventually gets cleaned.',
    ar: 'المسار الثابت هو اللي بيخلي الفكرة تنجح: بيعدّي على كل أوضة، فكل أوضة وسخة بتتنضف في الآخر.',
  },
  {
    en: 'The score judges the agent; it is not a percept. The agent never receives the score or the clean-room count.',
    ar: 'الـ Score بيقيّم الـ Agent بس، مش Percept. الـ Agent عمره ما بياخد الـ Score ولا عدد الأوض النضيفة.',
  },
  {
    en: 'Stopping is the simulator’s rule. The agent cannot tell that everything is clean, so a real one would keep patrolling and waste energy.',
    ar: 'التوقف ده قاعدة في المحاكاة. الـ Agent نفسه مش بيعرف إن كله نضف، فالـ Agent الحقيقي هيفضل يلف ويصرف طاقة على الفاضي.',
  },
];

/* ------------------------------------------------------------------ */
/* Lab                                                                 */
/* ------------------------------------------------------------------ */

export const VacuumWorld3DLab: React.FC = () => {
  const [world, setWorld] = useState<World>(() => makeWorld());
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState<SpeedId>('normal');
  const [view, setView] = useState<ViewMode>('learner');
  const [cam, setCam] = useState<CamCmd>({ kind: 'reset', n: 0 });
  const coarse = useMediaQuery('(pointer: coarse)');
  const [dragEnabled, setDragEnabled] = useState(() => !window.matchMedia('(pointer: coarse)').matches);
  const [showForecast, setShowForecast] = useState(false);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const dark = useIsDark();

  const finished = isFinished(world.dirty);
  const canEdit = world.steps === 0 && !running;
  const message = describe(world, finished, running);
  const here: Status = world.dirty[world.at] ? 'Dirty' : 'Clean';
  const ruleNo = finished ? 0 : here === 'Dirty' ? 1 : 2;
  const plan = useMemo(() => forecast(world), [world]);
  const next = nextRoom(world.at);
  const done = finished && world.steps > 0;

  // One timeout per pending auto step; cleanup on pause, reset, speed change and unmount.
  useEffect(() => {
    if (!running) return;
    if (finished) {
      setRunning(false);
      return;
    }
    const id = window.setTimeout(() => setWorld(stepWorld), SPEED_MS[speed]);
    return () => window.clearTimeout(id);
  }, [running, world, speed, finished]);

  const toggleRoom = (id: RoomId) =>
    setWorld((w) => (w.steps > 0 ? w : { ...w, dirty: { ...w.dirty, [id]: !w.dirty[id] } }));
  const applyPreset = (dirtyRooms: RoomId[]) =>
    setWorld((w) =>
      w.steps > 0
        ? w
        : {
            ...w,
            dirty: {
              A: dirtyRooms.includes('A'),
              B: dirtyRooms.includes('B'),
              C: dirtyRooms.includes('C'),
              D: dirtyRooms.includes('D'),
            },
          },
    );
  const reset = () => {
    setRunning(false);
    setWorld(makeWorld());
    setShowForecast(false);
  };
  const sendCam = (kind: CamCmd['kind']) => setCam((c) => ({ kind, n: c.n + 1 }));
  const resetCamera = () => {
    sendCam('reset');
    setDragEnabled(!coarse);
  };

  const recent = world.log.slice(-6).reverse();
  const sceneLabel = `3D vacuum world. Agent in room ${world.at}. ${ROOMS.map(
    (r) => `Room ${r} ${view === 'agent' && r !== world.at ? 'unknown' : world.dirty[r] ? 'dirty' : 'clean'}`,
  ).join(', ')}.`;

  return (
    <section className="min-w-0 max-w-full rounded-3xl border border-beige-300 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-4 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <Bot className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">4-Room Vacuum World 3D Lab</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
            شوف الـ Simple Reflex Agent وهو بيلف على 4 أوض بمسار ثابت، بمشهد ثلاثي الأبعاد
          </ArabicText>
        </div>
      </header>

      <div className="mb-4 rounded-2xl border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950/30">
        <Pair
          en="Teaching extension: a 4-room, fixed-route version of the textbook 2-room vacuum world (Russell & Norvig). The 3D animation is illustrative, not physics."
          ar="امتداد تعليمي: نسخة بـ 4 أوض ومسار ثابت من عالم المكنسة الأصلي اللي في الكتاب (أوضتين، Russell & Norvig). الحركة ثلاثية الأبعاد للتوضيح بس، مش محاكاة فيزيائية."
          enClass="text-sm text-sky-900 dark:text-sky-200"
          arClass="text-[13px] text-sky-900 dark:text-sky-200"
        />
      </div>

      <div className={`${PANEL} mb-4 grid grid-cols-1 gap-4 md:grid-cols-2`}>
        <div className="min-w-0">
          <p className="mb-2 text-[13px] font-semibold text-stone-700 dark:text-stone-300">Simulation</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={BTN_PRIMARY} disabled={finished} onClick={() => setRunning((r) => !r)}>
              {running ? <Pause className="h-4 w-4 shrink-0" /> : <Play className="h-4 w-4 shrink-0" />}
              <Label en={running ? 'Pause' : 'Run'} ar={running ? 'إيقاف مؤقت' : 'تشغيل'} onDark />
            </button>
            <button type="button" className={BTN_SECONDARY} disabled={finished || running} onClick={() => setWorld(stepWorld)}>
              <StepForward className="h-4 w-4 shrink-0" />
              <Label en="Step" ar="خطوة" />
            </button>
            <button type="button" className={BTN_SECONDARY} onClick={reset}>
              <RotateCcw className="h-4 w-4 shrink-0" />
              <Label en="Reset" ar="إعادة ضبط" />
            </button>
          </div>
          <p className="mb-1 mt-3 text-[13px] font-semibold text-stone-700 dark:text-stone-300">Auto-run speed</p>
          <Segmented<SpeedId>
            label="Auto-run speed"
            value={speed}
            onChange={setSpeed}
            options={[
              { value: 'slow', en: 'Slow', ar: 'بطيء' },
              { value: 'normal', en: 'Normal', ar: 'عادي' },
              { value: 'fast', en: 'Fast', ar: 'سريع' },
            ]}
          />
        </div>

        <div className="min-w-0">
          <p className="mb-2 text-[13px] font-semibold text-stone-700 dark:text-stone-300">Whose view?</p>
          <Segmented<ViewMode>
            label="Perspective"
            value={view}
            onChange={setView}
            options={[
              { value: 'learner', en: 'Learner view', ar: 'منظور المتعلم', icon: <Eye className="h-4 w-4 shrink-0" /> },
              { value: 'agent', en: 'Agent view', ar: 'منظور الـ Agent', icon: <EyeOff className="h-4 w-4 shrink-0" /> },
            ]}
          />
          <Pair
            className="mt-2"
            en={view === 'learner' ? 'You see every room’s dirt, like a teacher holding the full map.' : 'Only the current room is visible. Other rooms are “Unknown”, just like for the agent.'}
            ar={view === 'learner' ? 'إنت شايف الأتربة في كل الأوض، زي مدرّس معاه الخريطة كاملة.' : 'الأوضة الحالية بس هي الظاهرة. باقي الأوض “مجهولة”، زي ما هي بالنسبة للـ Agent.'}
            enClass="text-[13px] text-stone-700 dark:text-stone-300"
          />
        </div>

        <div className="min-w-0 md:col-span-2">
          <p className="mb-2 text-[13px] font-semibold text-stone-700 dark:text-stone-300">Camera</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={BTN_SECONDARY} onClick={() => sendCam('orbit')}>
              <Orbit className="h-4 w-4 shrink-0" />
              <Label en="Orbit view" ar="منظور مائل" />
            </button>
            <button type="button" className={BTN_SECONDARY} onClick={() => sendCam('top')}>
              <Layers className="h-4 w-4 shrink-0" />
              <Label en="Top view" ar="منظور علوي" />
            </button>
            <button type="button" className={BTN_SECONDARY} onClick={() => sendCam('side')}>
              <View className="h-4 w-4 shrink-0" />
              <Label en="Side view" ar="منظور جانبي" />
            </button>
            <button type="button" className={BTN_SECONDARY} onClick={resetCamera}>
              <ScanEye className="h-4 w-4 shrink-0" />
              <Label en="Reset camera" ar="رجّع الكاميرا" />
            </button>
            <button type="button" className={BTN_SECONDARY} onClick={() => sendCam('in')}>
              <ZoomIn className="h-4 w-4 shrink-0" />
              <Label en="Zoom in" ar="تقريب" />
            </button>
            <button type="button" className={BTN_SECONDARY} onClick={() => sendCam('out')}>
              <ZoomOut className="h-4 w-4 shrink-0" />
              <Label en="Zoom out" ar="تبعيد" />
            </button>
            <button type="button" className={BTN_SECONDARY} aria-pressed={dragEnabled} onClick={() => setDragEnabled((d) => !d)}>
              {dragEnabled ? <Hand className="h-4 w-4 shrink-0" /> : <Lock className="h-4 w-4 shrink-0" />}
              <Label en={dragEnabled ? 'Drag to orbit: on' : 'Drag to orbit: off'} ar={dragEnabled ? 'السحب للدوران: شغال' : 'السحب للدوران: مقفول'} />
            </button>
          </div>
          <Pair
            className="mt-2"
            en="Drag the scene to orbit. On a touch screen, turn dragging off if you want to scroll the page with your finger over the scene."
            ar="اسحب المشهد عشان تلف حواليه. على الموبايل اقفل السحب لو عايز تعمل Scroll للصفحة وإنت ماسك المشهد."
            enClass="text-[13px] text-stone-700 dark:text-stone-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-3">
          <div
            role="img"
            aria-label={sceneLabel}
            className="relative isolate h-[340px] w-full overflow-hidden rounded-2xl border border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950 sm:h-[460px]"
          >
            <SceneBoundary>
              <Canvas dpr={[1, 2]} camera={{ position: spherical(DEFAULT_AZ, DEFAULT_POLAR, DEFAULT_DIST), fov: 40, near: 0.1, far: 100 }}>
                <Scene
                  world={world}
                  view={view}
                  reduced={reduced}
                  dark={dark}
                  cam={cam}
                  dragEnabled={dragEnabled}
                  editable={canEdit}
                  finished={finished}
                  onToggle={toggleRoom}
                />
              </Canvas>
            </SceneBoundary>
          </div>

          <ul className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            {LEGEND.map((l) => (
              <li key={l.en} className="flex min-w-0 items-start gap-2">
                <span className={`mt-1 h-3 w-3 shrink-0 rounded-sm ${l.swatch}`} />
                <div className="min-w-0">
                  <p className="text-[13px] text-stone-800 dark:text-stone-200">{l.en}</p>
                  <ArabicText className={MUTED}>{l.ar}</ArabicText>
                </div>
              </li>
            ))}
          </ul>

          <div className={PANEL}>
            <SectionTitle en="Room setup" ar="تجهيز الأوض" />
            <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ROOMS.map((id) => {
                const dirty = world.dirty[id];
                return (
                  <button
                    key={id}
                    type="button"
                    disabled={!canEdit}
                    aria-pressed={dirty}
                    onClick={() => toggleRoom(id)}
                    className={`flex min-h-[44px] items-center gap-2 rounded-xl border px-3 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS} ${
                      dirty
                        ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200'
                    }`}
                  >
                    <span className="font-mono text-sm font-bold">{id}</span>
                    <span className="leading-tight">
                      <span className="block text-[13px] font-semibold">{dirty ? 'Dirty' : 'Clean'}</span>
                      <ArabicText as="span" className="block text-left text-[13px] leading-snug">{statusAr(dirty ? 'Dirty' : 'Clean')}</ArabicText>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button key={p.id} type="button" disabled={!canEdit} onClick={() => applyPreset(p.dirty)} className={`${BTN_SECONDARY} min-h-[40px] py-1`}>
                  <Label en={p.en} ar={p.ar} />
                </button>
              ))}
            </div>
            <Pair
              className="mt-2"
              en={canEdit ? 'This panel is for you; the agent cannot see it. Click a room here, or the floor in Learner view, to toggle dirt.' : 'Dirt editing is locked once the run has started. Press Reset to edit again.'}
              ar={canEdit ? 'اللوحة دي ليك إنت: الـ Agent مش شايفها. دوس على أوضة هنا، أو على الأرضية في منظور المتعلم، عشان تبدّل الأتربة.' : 'تعديل الأتربة اتقفل بعد ما التشغيل بدأ. دوس على Reset عشان تعدّل تاني.'}
              enClass="text-[13px] text-stone-700 dark:text-stone-300"
            />
          </div>
        </div>

        <div className="min-w-0 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 text-center dark:border-stone-800 dark:bg-stone-950">
              <p className="font-mono text-2xl font-bold text-amber-800 dark:text-amber-300">{world.score}</p>
              <p className="text-[13px] font-semibold text-stone-800 dark:text-stone-200">Score</p>
              <ArabicText className={`${MUTED} text-center`}>النقاط</ArabicText>
            </div>
            <div className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 text-center dark:border-stone-800 dark:bg-stone-950">
              <p className="font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">{world.steps}</p>
              <p className="text-[13px] font-semibold text-stone-800 dark:text-stone-200">Actions</p>
              <ArabicText className={`${MUTED} text-center`}>الأفعال</ArabicText>
            </div>
            <div className="min-w-0 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-3 text-center dark:border-stone-800 dark:bg-stone-950">
              <p className="font-mono text-2xl font-bold text-emerald-800 dark:text-emerald-300">{countClean(world.dirty)}/4</p>
              <p className="text-[13px] font-semibold text-stone-800 dark:text-stone-200">Clean</p>
              <ArabicText className={`${MUTED} text-center`}>نضيفة</ArabicText>
            </div>
          </div>

          <div
            aria-live="polite"
            className={`rounded-2xl border p-4 ${
              done
                ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
                : 'border-stone-800 bg-stone-950 dark:border-stone-700 dark:bg-stone-950'
            }`}
          >
            <p className={`text-sm leading-relaxed ${done ? 'text-emerald-900 dark:text-emerald-200' : 'text-stone-100 dark:text-stone-100'}`}>{message.en}</p>
            <ArabicText className={`mt-1 text-sm leading-relaxed ${done ? 'text-emerald-900 dark:text-emerald-200' : 'text-zinc-300 dark:text-zinc-300'}`}>{message.ar}</ArabicText>
          </div>

          <div className={PANEL}>
            <div className="mb-1 flex items-center gap-2">
              <Brain className="h-4 w-4 text-sky-700 dark:text-sky-300" />
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">Inside the agent</h4>
            </div>
            <ArabicText className={`mb-3 ${MUTED}`}>جوه الـ Agent: اللي بيحسه واللي هيقرره دلوقتي</ArabicText>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div className="min-w-0 rounded-xl border border-sky-200 bg-sky-50 p-2 dark:border-sky-900 dark:bg-sky-950/30">
                <dt className="text-[13px] text-sky-900 dark:text-sky-200">Location sensor</dt>
                <dd className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">Room {world.at}</dd>
                <ArabicText className="text-[13px] text-sky-900 dark:text-sky-200">حساس المكان</ArabicText>
              </div>
              <div className="min-w-0 rounded-xl border border-sky-200 bg-sky-50 p-2 dark:border-sky-900 dark:bg-sky-950/30">
                <dt className="text-[13px] text-sky-900 dark:text-sky-200">Dirt sensor (here)</dt>
                <dd className="text-base font-bold text-stone-900 dark:text-stone-100">{here}</dd>
                <ArabicText className="text-[13px] text-sky-900 dark:text-sky-200">{`حساس الأتربة: ${statusAr(here)}`}</ArabicText>
              </div>
            </dl>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[13px] text-stone-700 dark:text-stone-300">
              <span>Not sensed:</span>
              {ROOMS.filter((r) => r !== world.at).map((r) => (
                <span key={r} className="rounded-lg border border-stone-300 bg-white px-2 py-0.5 font-mono dark:border-stone-700 dark:bg-stone-900">{r} ?</span>
              ))}
              <span className="rounded-lg border border-stone-300 bg-white px-2 py-0.5 dark:border-stone-700 dark:bg-stone-900">Memory: none</span>
            </div>
            <ArabicText className={`mt-1 ${MUTED}`}>مش حاسس بالأوض التانية، ومفيش ذاكرة خالص.</ArabicText>

            <p className="mb-1 mt-4 text-[13px] font-semibold text-stone-700 dark:text-stone-300">Reflex rule (the active row is highlighted)</p>
            <div className="space-y-2">
              <div className={`rounded-xl border p-2 ${ruleNo === 1 ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30' : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-900'}`}>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">Rule 1: IF the current room is Dirty THEN Suck</p>
                <ArabicText className={MUTED}>القاعدة 1: لو الأوضة الحالية وسخة ← نفّذ Suck</ArabicText>
              </div>
              <div className={`rounded-xl border p-2 ${ruleNo === 2 ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30' : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-900'}`}>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">Rule 2: ELSE move to the next room on the route</p>
                <ArabicText className={MUTED}>القاعدة 2: غير كده ← اتحرك للأوضة اللي بعدها في المسار</ArabicText>
                <p className="mt-1 flex flex-wrap items-center gap-1 font-mono text-[13px] text-stone-700 dark:text-stone-300" dir="ltr">
                  {[...PATROL, PATROL[0]].map((r, i) => (
                    <React.Fragment key={`${r}${i}`}>
                      {i > 0 && <span aria-hidden="true">→</span>}
                      <span className={`rounded-md px-1.5 ${r === world.at && i < 4 ? 'bg-sky-100 font-bold text-sky-900 dark:bg-sky-950/60 dark:text-sky-200' : ''}`}>{r}</span>
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
            <p className="mt-2 text-[13px] text-stone-700 dark:text-stone-300">
              {finished ? 'No pending decision: the simulator has stopped.' : ruleNo === 1 ? `Next decision: Suck in room ${world.at}.` : `Next decision: move from ${world.at} to ${next}.`}
            </p>
            <ArabicText className={MUTED}>
              {finished ? 'مفيش قرار جاي: المحاكاة وقفت.' : ruleNo === 1 ? `القرار الجاي: شفط (Suck) في أوضة ${world.at}.` : `القرار الجاي: التحرك من ${world.at} لـ ${next}.`}
            </ArabicText>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={PANEL}>
          <SectionTitle en="Recent percept → rule → action → score" ar="آخر الخطوات: Percept ← قاعدة ← فعل ← Score" />
          {recent.length === 0 ? (
            <Pair en="No actions yet. Press Step or Run." ar="لسه مفيش أفعال. دوس على Step أو Run." />
          ) : (
            <ol className="space-y-2">
              {recent.map((e) => (
                <li key={e.n} className="flex min-w-0 gap-3 rounded-xl border border-beige-300 bg-white p-2 dark:border-stone-800 dark:bg-stone-900">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-900 font-mono text-sm font-bold text-white dark:bg-stone-100 dark:text-stone-900">{e.n}</span>
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-semibold text-stone-900 dark:text-stone-100">
                      In {e.room}: {e.seen} → Rule {e.seen === 'Dirty' ? 1 : 2} → {actionEn(e)}
                    </p>
                    <ArabicText className="text-[13px] text-stone-700 dark:text-stone-300">{`في ${e.room}: ${statusAr(e.seen)} ← القاعدة ${e.seen === 'Dirty' ? 1 : 2} ← ${actionAr(e)}`}</ArabicText>
                    <p className={MUTED}>{e.clean} of 4 clean, so +{e.clean}. Score is now {e.score}.</p>
                    <ArabicText className={MUTED}>{`${e.clean} من 4 نضيفة، فالـ Score زاد ${e.clean} وبقى ${e.score}.`}</ArabicText>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {world.log.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 text-[13px] font-semibold text-stone-700 dark:text-stone-300">Points gained per action</p>
              <div className="flex h-12 items-end gap-1" role="img" aria-label={`Points per action: ${world.log.map((e) => e.clean).join(', ')}`}>
                {world.log.map((e) => (
                  <div
                    key={e.n}
                    style={{ height: `${Math.max(10, e.clean * 25)}%` }}
                    className={`w-4 rounded-t ${e.clean === 4 ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-amber-500 dark:bg-amber-400'}`}
                  />
                ))}
              </div>
              <ArabicText className={MUTED}>النقاط اللي اتكسبت في كل فعل (أعلى عمود = 4 نقاط)</ArabicText>
            </div>
          )}
        </div>

        <div className={PANEL}>
          <SectionTitle en="Predict, then check" ar="توقّع الأول وبعدين اتأكد" />
          <Pair
            en="Pick a dirt pattern, guess how many actions the agent needs, then reveal the forecast. Try “Only C”: it is the last room on the route."
            ar="اختار شكل للأتربة، وخمّن الـ Agent محتاج كام فعل، وبعدين اكشف التوقع. جرّب “C بس”: هي آخر أوضة في المسار."
          />
          <button type="button" className={`${BTN_SECONDARY} mt-3`} aria-pressed={showForecast} onClick={() => setShowForecast((s) => !s)}>
            {showForecast ? <EyeOff className="h-4 w-4 shrink-0" /> : <Eye className="h-4 w-4 shrink-0" />}
            <Label en={showForecast ? 'Hide forecast' : 'Reveal forecast'} ar={showForecast ? 'اخفي التوقع' : 'اكشف التوقع'} />
          </button>
          {showForecast && (
            <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                From the current state: {plan.steps} more actions, +{plan.gained} more score (final {world.score + plan.gained}).
              </p>
              <ArabicText className="text-[13px] text-amber-900 dark:text-amber-200">
                {`من الحالة الحالية: ${plan.steps} فعل كمان، والـ Score هيزيد ${plan.gained} (النهائي ${world.score + plan.gained}).`}
              </ArabicText>
              {plan.actions.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-1 font-mono text-[13px] text-stone-800 dark:text-stone-200" dir="ltr">
                  {plan.actions.map((a, i) => (
                    <span key={i} className="rounded-md border border-amber-300 bg-white px-1.5 dark:border-amber-800 dark:bg-stone-900">{a}</span>
                  ))}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={PANEL}>
          <SectionTitle en="PEAS description" ar="وصف الـ PEAS" />
          <ul className="space-y-3">
            {PEAS.map((p) => (
              <li key={p.k} className="flex min-w-0 gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 font-mono text-sm font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">{p.k}</span>
                <div className="min-w-0">
                  <p className="text-sm text-stone-800 dark:text-stone-200"><strong>{p.en}:</strong> {p.enT}</p>
                  <ArabicText className={MUTED}>{`${p.ar}: ${p.arT}`}</ArabicText>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={PANEL}>
          <SectionTitle en="Why a simple reflex agent, and its limits" ar="ليه Simple Reflex Agent، وإيه حدوده" />
          <ol className="space-y-3">
            {THEORY.map((t, i) => (
              <li key={i} className="flex min-w-0 gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-stone-900 font-mono text-[13px] font-bold text-white dark:bg-stone-100 dark:text-stone-900">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm text-stone-800 dark:text-stone-200">{t.en}</p>
                  <ArabicText className={MUTED}>{t.ar}</ArabicText>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-3 flex items-center gap-2 text-[13px] text-stone-600 dark:text-zinc-400">
            <Box className="h-4 w-4 shrink-0" />
            Motion and timing are illustrative; they do not model real robot physics.
          </p>
          <ArabicText className={MUTED}>الحركة والتوقيت للتوضيح بس، ومش بيمثلوا فيزياء الروبوت الحقيقية.</ArabicText>
        </div>
      </div>
    </section>
  );
};

export default VacuumWorld3DLab;

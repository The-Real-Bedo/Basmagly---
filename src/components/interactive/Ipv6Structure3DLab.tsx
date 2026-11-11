import React, { ComponentRef, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { Box, Camera, Home, MapPin, MousePointer2, RotateCcw, Route } from 'lucide-react';
import * as THREE from 'three';
import { ArabicText } from '../ArabicText';
import { SceneLabel } from './SceneLabel';
import { fitSceneCamera } from './sceneFraming';
import { LabChallenge, challengeFeedback, type ChallengeMission } from './LabChallenge';

type PartId = 'prefix' | 'subnet' | 'interface';

const PARTS: { id: PartId; title: string; titleAr: string; analogy: string; analogyAr: string; bits: number; color: string; cellCount: number; detailEn: string; detailAr: string }[] = [
  {
    id: 'prefix',
    title: 'Global Routing Prefix',
    titleAr: 'بادئة التوجيه العالمية',
    analogy: 'Country',
    analogyAr: 'الدولة',
    bits: 48,
    color: '#f59e0b',
    cellCount: 3,
    detailEn: 'Hextets 1-3. The network portion assigned by the provider, typically /48. Its first three bits are 001 (the 2000::/3 range); bits 16-24 name the regional registry and the remaining 8 bits up to /32 identify the ISP.',
    detailAr: 'الـ hextets من 1 لـ 3. جزء الشبكة اللي المزود بيوزعه، وعادةً /48. أول تلات بتات فيه 001 (نطاق 2000::/3)؛ والبتات من 16 لـ 24 بتحدد السجل الإقليمي والـ 8 بتات الباقية لحد /32 بتحدد الـ ISP.',
  },
  {
    id: 'subnet',
    title: 'Subnet ID',
    titleAr: 'معرّف الـ Subnet',
    analogy: 'Street',
    analogyAr: 'الشارع',
    bits: 16,
    color: '#0ea5e9',
    cellCount: 1,
    detailEn: 'Hextet 4. Used to subnet within an organization. This 16-bit field allows 65,536 subnets, and it is not part of the host address field.',
    detailAr: 'الـ hextet الرابع. بيُستخدم للتقسيم جوه المنظومة. الحقل ده 16 بت وبيسمح بـ 65,536 subnet، وهو مش جزء من حقل عنوان الجهاز.',
  },
  {
    id: 'interface',
    title: 'Interface ID',
    titleAr: 'معرّف الواجهة',
    analogy: 'Home',
    analogyAr: 'البيت',
    bits: 64,
    color: '#10b981',
    cellCount: 4,
    detailEn: 'Hextets 5-8. Equivalent to the host portion of an IPv4 address: 64 bits, configured manually or built with EUI-64 (split MAC, insert FFFE, flip the U/L bit).',
    detailAr: 'الـ hextets من 5 لـ 8. مكافئ لجزء الأجهزة في IPv4: ‏64 بت، بتتظبط يدويًا أو تتبني بـ EUI-64 (قسّم الـ MAC وأدرج FFFE واقلب بتة الـ U/L).',
  },
];

/** One worked address from the deck: 2001:0DB8:ACAD:0001:0000:0000:0000:0010/64 */
const CELLS: { value: string; part: PartId }[] = [
  { value: '2001', part: 'prefix' },
  { value: '0DB8', part: 'prefix' },
  { value: 'ACAD', part: 'prefix' },
  { value: '0001', part: 'subnet' },
  { value: '0000', part: 'interface' },
  { value: '0000', part: 'interface' },
  { value: '0000', part: 'interface' },
  { value: '0010', part: 'interface' },
];

const CELL_W = 1.15;
const CELL_GAP = 0.2;
const TOTAL_WIDTH = CELLS.length * CELL_W + (CELLS.length - 1) * CELL_GAP;
const LAYOUT = CELLS.map((cell, index) => ({
  ...cell,
  index,
  centerX: -TOTAL_WIDTH / 2 + CELL_W / 2 + index * (CELL_W + CELL_GAP),
  startX: -TOTAL_WIDTH / 2 + index * (CELL_W + CELL_GAP),
  endX: -TOTAL_WIDTH / 2 + (index + 1) * CELL_W + index * CELL_GAP,
}));

/** /48 sits between hextet 3 and 4; /64 between hextet 4 and 5 (1-based hextets). */
const MARKERS = [
  { prefix: '/48', afterCellIndex: 2, color: '#f59e0b' },
  { prefix: '/64', afterCellIndex: 3, color: '#0ea5e9' },
];

const partBounds = (focus: PartId | 'all') => {
  if (focus === 'all') {
    return { minX: LAYOUT[0].startX - 0.45, maxX: LAYOUT[LAYOUT.length - 1].endX + 0.45 };
  }
  // Focused views keep one neighbouring cell of context on each side so the
  // camera never sits uncomfortably close to a single-cell part.
  const cells = LAYOUT.filter(cell => cell.part === focus);
  const first = cells[0].index;
  const last = cells[cells.length - 1].index;
  const from = Math.max(0, first - 1);
  const to = Math.min(LAYOUT.length - 1, last + 1);
  return { minX: LAYOUT[from].startX - 0.45, maxX: LAYOUT[to].endX + 0.45 };
};

function CameraControls({ focus, top, resetKey, touchOrbit }: { focus: PartId | 'all'; top: boolean; resetKey: number; touchOrbit: boolean }) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera, size, gl, invalidate } = useThree();
  useEffect(() => {
    // Skip the first paint before the canvas has a real size — a 0-width fit
    // divides by zero and parks the camera at an Infinity distance.
    if (!size.width || !size.height) return;
    const { minX, maxX } = partBounds(focus);
    const bounds = new THREE.Box3(new THREE.Vector3(minX, 0, -1.3), new THREE.Vector3(maxX, 1.9, 1.3));
    const target = fitSceneCamera(camera as THREE.PerspectiveCamera, bounds, top ? new THREE.Vector3(0, 1, 0.001) : new THREE.Vector3(0.3, 0.85, 1), size.width, size.height);
    controls.current?.target.copy(target);
    controls.current?.update();
    if (!Number.isFinite(camera.position.x) || !Number.isFinite(camera.position.y) || !Number.isFinite(camera.position.z)) {
      camera.position.set(5, 5.5, 10.5);
      camera.lookAt(0, 0.4, 0);
    }
    invalidate();
  }, [camera, size.width, size.height, focus, top, resetKey, invalidate]);
  useEffect(() => { gl.domElement.style.touchAction = touchOrbit ? 'none' : 'pan-y'; }, [gl, touchOrbit]);
  return <OrbitControls ref={controls} makeDefault enablePan={false} enableRotate={touchOrbit} enableZoom={touchOrbit} minDistance={3.5} maxDistance={40} maxPolarAngle={Math.PI / 2.05} />;
}

function HextetCell({ index, value, partId, color, selected, onSelect }: { index: number; value: string; partId: PartId; color: string; selected: boolean; onSelect: () => void }) {
  const cell = LAYOUT[index];
  return (
    <group position={[cell.centerX, 0, 0]}>
      <RoundedBox
        args={[CELL_W, 0.9, 1.5]}
        radius={0.08}
        position={[0, selected ? 0.62 : 0.45, 0]}
        castShadow
        onClick={event => { event.stopPropagation(); onSelect(); }}
      >
        <meshStandardMaterial color={color} roughness={0.35} emissive={color} emissiveIntensity={selected ? 0.5 : 0.08} />
      </RoundedBox>
      <SceneLabel position={[0, selected ? 1.55 : 1.3, 0]} title={value} accent={color} />
    </group>
  );
}

function BoundaryMarker({ prefix, afterCellIndex, color }: { prefix: string; afterCellIndex: number; color: string }) {
  const cell = LAYOUT[afterCellIndex];
  const x = cell.endX + CELL_GAP / 2;
  return (
    <group position={[x, 0, -1.05]}>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.09, 1.5, 0.09]} />
        <meshStandardMaterial color="#1c1917" roughness={0.5} />
      </mesh>
      <SceneLabel position={[0, 1.85, 0]} title={prefix} accent={color} />
    </group>
  );
}

function StructureScene({ focus, selected, top, resetKey, touchOrbit, onSelectPart }: { focus: PartId | 'all'; selected: PartId | null; top: boolean; resetKey: number; touchOrbit: boolean; onSelectPart: (id: PartId) => void }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [4.5, 5.5, 10.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      fallback={<div className="flex h-full items-center justify-center p-6 text-center"><div><p className="text-sm font-semibold text-stone-800 dark:text-zinc-200">The 3D view needs WebGL. The part cards below carry the same structure lesson.</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">المشهد ثلاثي الأبعاد محتاج WebGL. كروت الأجزاء تحت فيها نفس الدرس.</ArabicText></div></div>}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 10, 6]} intensity={2.1} castShadow shadow-mapSize={[1024, 1024]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[TOTAL_WIDTH + 5, 7]} />
        <meshStandardMaterial color="#44403c" transparent opacity={0.22} />
      </mesh>
      <gridHelper args={[Math.ceil(TOTAL_WIDTH) + 5, Math.ceil(TOTAL_WIDTH) + 5, '#a8a29e', '#78716c']} position={[0, 0.01, 0]} />
      {LAYOUT.map(cell => (
        <HextetCell
          key={cell.index}
          index={cell.index}
          value={cell.value}
          partId={cell.part}
          color={PARTS.find(part => part.id === cell.part)!.color}
          selected={selected === cell.part}
          onSelect={() => onSelectPart(cell.part)}
        />
      ))}
      {MARKERS.map(marker => <BoundaryMarker key={marker.prefix} prefix={marker.prefix} afterCellIndex={marker.afterCellIndex} color={marker.color} />)}
      <CameraControls focus={focus} top={top} resetKey={resetKey} touchOrbit={touchOrbit} />
    </Canvas>
  );
}

export const Ipv6Structure3DLab: React.FC = () => {
  const [focus, setFocus] = useState<PartId | 'all'>('all');
  const [visited, setVisited] = useState<PartId[]>([]);
  const [top, setTop] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [touchOrbit, setTouchOrbit] = useState(() => !window.matchMedia('(pointer: coarse)').matches);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const reset = () => {
    clearTimers();
    setFocus('all');
    setVisited([]);
    setResetKey(value => value + 1);
  };
  useEffect(() => () => clearTimers(), []);

  const selectPart = (partId: PartId) => {
    setFocus(partId);
    setVisited(current => (current[current.length - 1] === partId ? current : [...current, partId]));
    setResetKey(value => value + 1);
  };

  const selectedPart = PARTS.find(part => part.id === focus) ?? null;

  const missions: ChallengeMission[] = useMemo(() => [
    {
      id: 'm-structure-tour', title: 'Tour the three parts in order', titleAr: 'راقب الأجزاء التلاتة بالترتيب',
      goal: 'Click the cells in the lecture order: any Global Routing Prefix cell, then the Subnet ID cell, then any Interface ID cell. Use All cells to reset between attempts.',
      goalAr: 'دوس على الخلايا بترتيب المحاضرة: أي خلية من بادئة التوجيه العالمية، بعدها خلية معرّف الـ Subnet، بعدها أي خلية من معرّف الواجهة. استخدم All cells لإعادة المحاولة.',
      hint: 'The camera refocuses on each clicked part; watch the Country → Street → Home analogy appear in the status card.',
      hintAr: 'الكاميرا بتتحرك على كل جزء تدوس عليه؛ وراقب تشبيه Country → Street → Home في كارت الحالة.',
      start: () => reset(),
      evaluate: () => (JSON.stringify(visited) === JSON.stringify(['prefix', 'subnet', 'interface'])
        ? challengeFeedback('success', 'Correct tour: the 48-bit Country, then the 16-bit Street, then the 64-bit Home.', 'الجولة صح: الدولة بـ 48 بت، بعدها الشارع بـ 16 بت، بعدها البيت بـ 64 بت.')
        : challengeFeedback('retry', `Visited so far: ${visited.length ? visited.join(' → ') : 'none'}. Restart and click the parts in order.`, `اللي اتعلمته لحد دلوقتي: ${visited.length ? visited.join(' → ') : 'ولا حاجة'}. ابدأ من جديد ودوس على الأجزاء بالترتيب.`)),
    },
    {
      id: 'm-structure-predict', title: 'Which part is exactly 16 bits?', titleAr: 'أنهي جزء طوله بالظبط 16 بت؟',
      goal: 'Predict which block of the global unicast address is 16 bits wide, then click it to verify.',
      goalAr: 'توقّع أنهي جزء من العنوان العالمي عرضه 16 بت، وبعدها دوس عليه للتأكيد.',
      hint: 'The Country is typically /48 and the Home is 64 bits; the Street sits between them — one single hextet.',
      hintAr: 'الدولة عادةً /48 والبيت 64 بت؛ والشارع قاعد بينهم — hextet واحد بس.',
      prediction: {
        label: 'Predict the 16-bit part', labelAr: 'توقّع الجزء اللي 16 بت',
        options: [
          { id: 'p-prefix', label: 'Global Routing Prefix (Country)' },
          { id: 'p-subnet', label: 'Subnet ID (Street)' },
          { id: 'p-interface', label: 'Interface ID (Home)' },
        ],
      },
      start: () => reset(),
      evaluate: (prediction) => {
        if (!prediction.includes('p-subnet')) return challengeFeedback('retry', 'Not quite — the interface ID is 64 bits and the routing prefix is typically /48.', 'مش بالظبط — الـ interface ID طوله 64 بت والـ routing prefix عادةً /48.');
        if (focus !== 'subnet') return challengeFeedback('pending', 'Right guess — now click the Subnet ID cell to verify it in the scene.', 'توقعك صح — دوس دلوقتي على خلية الـ Subnet ID في المشهد للتأكيد.');
        return challengeFeedback('success', 'Verified: the 16-bit Subnet ID allows 65,536 subnets within the organization.', 'اتأكدت: الـ Subnet ID بـ 16 بت بيسمح بـ 65,536 subnet جوه المنظومة.');
      },
    },
  ], [visited, focus]);

  const addressLine = (
    <p className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">
      <span className="text-amber-700 dark:text-amber-300">2001:0DB8:ACAD</span>
      <span className="text-stone-400">:</span>
      <span className="text-sky-700 dark:text-sky-300">0001</span>
      <span className="text-stone-400">:</span>
      <span className="text-emerald-700 dark:text-emerald-300">0000:0000:0000:0010</span>
      <span className="text-stone-500 dark:text-zinc-400">/64</span>
    </p>
  );

  return (
    <section aria-labelledby="ipv6-structure-title" className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm space-y-5 dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Box className="h-5 w-5" /></div>
          <div>
            <h3 id="ipv6-structure-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">3D IPv6 Address Anatomy</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">العنوان نفسه كـ 8 خلايا ثلاثية الأبعاد: ‏Country وStreet وHome</ArabicText>
          </div>
        </div>
        <button type="button" onClick={reset} aria-label="Reset 3D structure lab" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-beige-300 bg-white text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200"><RotateCcw className="h-4 w-4" /></button>
      </header>

      <LabChallenge missions={missions} />

      <div className="space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { setFocus('all'); setResetKey(value => value + 1); }} aria-pressed={focus === 'all'} className={`min-h-11 rounded-xl border px-4 text-sm font-semibold ${focus === 'all' ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200'}`}>All cells <span className="font-arabic">(الكل)</span></button>
          {PARTS.map(part => (
            <button key={part.id} type="button" onClick={() => selectPart(part.id)} aria-pressed={focus === part.id} className={`min-h-11 rounded-xl border px-4 text-sm font-semibold ${focus === part.id ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200'}`}>
              {part.title} · /{part.id === 'prefix' ? '48' : part.bits}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950">
        <div className="relative z-10 flex flex-wrap gap-2 border-b border-beige-300 p-3 dark:border-stone-800">
          <button type="button" onClick={() => setTouchOrbit(value => !value)} aria-pressed={touchOrbit} className="min-h-11 rounded-xl border border-beige-300 bg-white px-3 text-[13px] font-semibold text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200">{touchOrbit ? 'Pause orbit' : 'Enable orbit'}</button>
          <button type="button" onClick={() => setTop(value => !value)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 bg-white/95 px-3 text-[13px] font-semibold text-stone-800 shadow-sm dark:border-stone-700 dark:bg-stone-900/95 dark:text-zinc-200"><Camera className="h-4 w-4" />{top ? 'Orbit view' : 'Top view'}</button>
          <button type="button" onClick={() => setResetKey(value => value + 1)} aria-label="Reset 3D camera" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-beige-300 bg-white/95 px-3 text-stone-800 shadow-sm dark:border-stone-700 dark:bg-stone-900/95 dark:text-zinc-200"><RotateCcw className="h-4 w-4" /></button>
          <div className="hidden items-center gap-1.5 rounded-xl border border-beige-300 bg-white/95 px-3 py-2 text-[13px] text-stone-600 dark:border-stone-700 dark:bg-stone-900/95 dark:text-zinc-400"><MousePointer2 className="h-4 w-4" />Click a cell to inspect its part</div>
        </div>
        <div className="h-[400px] sm:h-[470px]" aria-label="Interactive 3D IPv6 global unicast address structure">
          <StructureScene focus={focus} selected={focus === 'all' ? null : (focus as PartId)} top={top} resetKey={resetKey} touchOrbit={touchOrbit} onSelectPart={selectPart} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-beige-300 bg-white/90 px-3 py-2 text-[13px] font-semibold text-stone-700 dark:border-stone-800 dark:bg-stone-900/90 dark:text-zinc-300">
          <span className="text-amber-700 dark:text-amber-300">● Country · 3 hextets · 48 bits</span>
          <span className="text-sky-700 dark:text-sky-300">● Street · 1 hextet · 16 bits</span>
          <span className="text-emerald-700 dark:text-emerald-300">● Home · 4 hextets · 64 bits</span>
          <span className="font-mono text-stone-500 dark:text-zinc-400">│ /48 and /64 boundary posts</span>
        </div>
      </div>

      <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <p className="pb-2 font-mono text-[13px] font-bold uppercase text-stone-500 dark:text-zinc-400">Worked address · 2001:0DB8:ACAD:1::10/64 expanded</p>
        {addressLine}
        <div className="grid gap-3 pt-3 sm:grid-cols-3">
          {PARTS.map(part => (
            <button key={part.id} type="button" onClick={() => selectPart(part.id)} className={`rounded-xl border p-3 text-left ${focus === part.id ? 'border-amber-400 bg-amber-50/80 dark:border-amber-600 dark:bg-amber-950/30' : 'border-beige-300 bg-white dark:border-stone-700 dark:bg-stone-900'}`}>
              <div className="flex items-center gap-2">
                {part.id === 'prefix' && <Route className="h-4 w-4 text-amber-700 dark:text-amber-300" />}
                {part.id === 'subnet' && <MapPin className="h-4 w-4 text-sky-700 dark:text-sky-300" />}
                {part.id === 'interface' && <Home className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />}
                <span className="font-mono text-[13px] font-bold text-stone-900 dark:text-stone-100">{part.title}</span>
              </div>
              <p className="pt-1 font-mono text-[13px] text-stone-600 dark:text-zinc-400">{part.cellCount} hextet{part.cellCount > 1 ? 's' : ''} · {part.bits} bits · {part.analogy}</p>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{part.titleAr} · {part.analogyAr}</ArabicText>
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="space-y-2 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
        <span className="font-mono text-[13px] font-bold uppercase text-amber-900 dark:text-amber-300">{selectedPart ? `Inspecting · ${selectedPart.title}` : 'Inspecting · all eight hextets'}</span>
        <p className="text-[15px] font-semibold text-stone-800 dark:text-zinc-200">
          {selectedPart ? selectedPart.detailEn : 'Every hextet carries 16 bits. Three amber cells form the /48 provider prefix, one sky cell is the 16-bit subnet ID, and four emerald cells complete the 64-bit interface ID — the lecture\'s Country, Street and Home.'}
        </p>
        <ArabicText className="text-sm text-stone-700 dark:text-zinc-300">
          {selectedPart ? selectedPart.detailAr : 'كل hextet بيحمل 16 بت. تلات خلايا ذهبية بيكوّنوا /48 بتاعة المزود، وخلية سماوية واحدة هي الـ subnet ID بـ 16 بت، وأربع خلايا زمردية بيكمّلوا معرّف الواجهة بـ 64 بت — وتشبيه المحاضرة: الدولة والشارع والبيت.'}
        </ArabicText>
      </div>
    </section>
  );
};

export default Ipv6Structure3DLab;

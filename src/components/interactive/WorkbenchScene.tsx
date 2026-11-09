import { useEffect, useMemo, useRef, useState, type ComponentRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, OrbitControls, RoundedBox } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { ProjectedLabel } from './ProjectedLabel';

export type WorkbenchTone = 'neutral' | 'active' | 'success' | 'error' | 'info';
export type WorkbenchKind =
  | 'computer'
  | 'switch'
  | 'router'
  | 'server'
  | 'sensor'
  | 'cloud'
  | 'chip'
  | 'fan'
  | 'water'
  | 'robot'
  | 'room'
  | 'layer'
  | 'state'
  | 'car'
  | 'bar'
  | 'byte';
type Point = [number, number, number];
export interface WorkbenchNode {
  id: string;
  label: string;
  position: Point;
  kind?: WorkbenchKind;
  tone?: WorkbenchTone;
  value?: string;
  detail?: string;
  detailAr?: string;
  size?: Point;
  dirty?: boolean;
  sceneLabel?: string;
  showValue?: boolean;
  labelOnSelect?: boolean;
  hideLabel?: boolean;
  labelPosition?: Point;
  action?: () => void;
  actionLabel?: string;
  disabled?: boolean;
  decorative?: boolean;
}
export interface WorkbenchLink {
  id: string;
  from?: string;
  to?: string;
  points?: Point[];
  tone?: WorkbenchTone;
  moving?: boolean;
  reverse?: boolean;
  label?: string;
  action?: () => void;
  disabled?: boolean;
}
export interface WorkbenchSceneProps {
  title: string;
  nodes: WorkbenchNode[];
  links?: WorkbenchLink[];
  motionKey?: string | number;
  top?: boolean;
  cameraTurn?: number;
  cameraReset?: number;
  /** Relative zoom requests; positive steps move closer without changing the orbit. */
  cameraZoom?: number;
  touchOrbit?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
  onUnavailable?: () => void;
}

const colors: Record<WorkbenchTone, [string, string]> = {
  neutral: ['#78716c', '#a8a29e'],
  active: ['#d97706', '#fbbf24'],
  success: ['#059669', '#34d399'],
  error: ['#e11d48', '#fb7185'],
  info: ['#0284c7', '#38bdf8'],
};
const defaultSizes: Record<WorkbenchKind, Point> = {
  computer: [1.1, 1.05, 0.7],
  switch: [1.35, 0.32, 0.8],
  router: [1, 0.5, 0.85],
  server: [0.8, 1.55, 0.8],
  sensor: [0.65, 0.6, 0.65],
  cloud: [1.3, 0.75, 0.85],
  chip: [0.85, 0.3, 0.8],
  fan: [0.85, 0.9, 0.65],
  water: [0.65, 0.8, 0.65],
  robot: [0.8, 0.3, 0.8],
  room: [2.7, 0.12, 2.9],
  layer: [2.8, 0.22, 1.3],
  state: [0.46, 0.28, 0.46],
  car: [0.75, 0.4, 1.25],
  bar: [0.85, 1, 0.85],
  byte: [0.52, 0.3, 0.6],
};

function useScenePreferences() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  );
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark')),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
    };
  }, []);
  return { dark, reduced };
}

function Model({
  node,
  dark,
  selected,
  onSelect,
}: {
  node: WorkbenchNode;
  dark: boolean;
  selected: boolean;
  onSelect?: (id: string) => void;
}) {
  const kind = node.kind ?? 'chip';
  const size = node.size ?? defaultSizes[kind];
  const [w, h, d] = size;
  const tone = colors[node.tone ?? 'neutral'][dark ? 1 : 0];
  const shell = dark ? '#44403c' : '#e7dfd3';
  const metal = dark ? '#292524' : '#a8a29e';
  const material = (
    <meshStandardMaterial
      color={
        kind === 'layer' ||
        kind === 'state' ||
        kind === 'bar' ||
        kind === 'byte'
          ? tone
          : shell
      }
      roughness={0.65}
    />
  );
  return (
    <group
      position={node.position}
      onClick={(event) => {
        if (node.decorative) return;
        event.stopPropagation();
        onSelect?.(node.id);
      }}
    >
      {kind === 'computer' ? (
        <>
          <RoundedBox args={[w, 0.1, d]} radius={0.04} position={[0, 0.05, 0]}>
            <meshStandardMaterial color={metal} />
          </RoundedBox>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.12, 0.5, 0.12]} />
            <meshStandardMaterial color={metal} />
          </mesh>
          <RoundedBox
            args={[w, 0.7, 0.13]}
            radius={0.04}
            position={[0, 0.72, -0.08]}
          >
            <meshStandardMaterial color={metal} />
          </RoundedBox>
          <mesh position={[0, 0.72, -0.005]}>
            <planeGeometry args={[w - 0.13, 0.55]} />
            <meshStandardMaterial
              color={tone}
              emissive={tone}
              emissiveIntensity={0.2}
            />
          </mesh>
        </>
      ) : kind === 'cloud' ? (
        <group position={[0, 0.48, 0]}>
          {[
            [-0.4, 0, 0],
            [0, 0.18, 0],
            [0.42, -0.02, 0],
          ].map((p, i) => (
            <mesh key={i} position={p as Point}>
              <sphereGeometry args={[0.43, 20, 16]} />
              <meshStandardMaterial
                color={dark ? '#d6d3d1' : '#fafaf9'}
                roughness={0.8}
              />
            </mesh>
          ))}
        </group>
      ) : kind === 'robot' || kind === 'router' || kind === 'state' ? (
        <>
          <mesh position={[0, h / 2, 0]}>
            <cylinderGeometry args={[w / 2, w / 2, h, 32]} />
            {material}
          </mesh>
          <mesh position={[0, h + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[w * 0.31, 24]} />
            <meshStandardMaterial color={tone} />
          </mesh>
          {kind === 'robot' && (
            <mesh position={[0, h + 0.12, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
              <meshStandardMaterial color={metal} />
            </mesh>
          )}
        </>
      ) : kind === 'room' ? (
        <>
          <RoundedBox args={size} position={[0, h / 2, 0]} radius={0.025}>
            <meshStandardMaterial
              color={
                node.dirty
                  ? dark
                    ? '#443220'
                    : '#faebcd'
                  : dark
                    ? '#22342c'
                    : '#e0ede5'
              }
            />
          </RoundedBox>
          {[-1, -0.5, 0, 0.5, 1].map((offset, i) => (
            <group key={i}>
              <Line
                points={[
                  [-w / 2, h + 0.006, offset],
                  [w / 2, h + 0.006, offset],
                ]}
                color={metal}
                lineWidth={0.5}
              />
              <Line
                points={[
                  [offset, h + 0.006, -d / 2],
                  [offset, h + 0.006, d / 2],
                ]}
                color={metal}
                lineWidth={0.5}
              />
            </group>
          ))}
          {node.dirty &&
            [
              [-0.85, -0.7],
              [0.7, 0.8],
              [0.85, -0.85],
              [-0.7, 0.8],
            ].map(([x, z], i) => (
              <mesh key={i} position={[x, h + 0.05, z]}>
                <dodecahedronGeometry args={[0.1 + i * 0.015]} />
                <meshStandardMaterial color="#b45309" />
              </mesh>
            ))}
        </>
      ) : kind === 'fan' ? (
        <>
          <RoundedBox args={size} position={[0, h / 2, 0]} radius={0.05}>
            {material}
          </RoundedBox>
          <mesh
            position={[0, h / 2, d / 2 + 0.01]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.28, 0.04, 10, 24]} />
            <meshStandardMaterial color={tone} />
          </mesh>
          {[0, Math.PI / 3, (Math.PI * 2) / 3].map((r, i) => (
            <mesh
              key={i}
              position={[0, h / 2, d / 2 + 0.03]}
              rotation={[0, 0, r]}
            >
              <boxGeometry args={[0.45, 0.055, 0.03]} />
              <meshStandardMaterial color={tone} />
            </mesh>
          ))}
        </>
      ) : (
        <>
          <RoundedBox
            args={size}
            position={[0, h / 2, 0]}
            radius={Math.min(0.06, h / 5)}
          >
            {material}
          </RoundedBox>
          {['switch', 'chip', 'server'].includes(kind) &&
            Array.from({ length: 4 }, (_, i) => (
              <mesh
                key={i}
                position={[-w * 0.3 + i * w * 0.2, h * 0.5, d / 2 + 0.015]}
              >
                <boxGeometry
                  args={[w * 0.12, Math.min(h * 0.35, 0.12), 0.03]}
                />
                <meshStandardMaterial color={i === 0 ? tone : metal} />
              </mesh>
            ))}
          {kind === 'sensor' && (
            <mesh position={[0, h + 0.12, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.22, 12]} />
              <meshStandardMaterial color={tone} />
            </mesh>
          )}
          {kind === 'car' &&
            [-w / 2, w / 2].flatMap((x) =>
              [-d * 0.3, d * 0.3].map((z, i) => (
                <mesh
                  key={`${x}-${i}`}
                  position={[x, 0.12, z]}
                  rotation={[0, 0, Math.PI / 2]}
                >
                  <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
                  <meshStandardMaterial color="#292524" />
                </mesh>
              )),
            )}
          {kind === 'water' && (
            <mesh position={[0, h + 0.08, 0]}>
              <sphereGeometry args={[0.16, 16, 12]} />
              <meshStandardMaterial color={tone} />
            </mesh>
          )}
        </>
      )}
      {selected && !node.decorative && (
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry
            args={[Math.max(w, d) * 0.62, Math.max(w, d) * 0.62 + 0.035, 40]}
          />
          <meshBasicMaterial
            color={colors.active[dark ? 1 : 0]}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
      {!node.decorative &&
        !node.hideLabel &&
        (!node.labelOnSelect || selected) && (
          <ProjectedLabel
            position={node.labelPosition ?? [0, h + 0.38, 0]}
            title={node.sceneLabel ?? node.label}
            detail={node.showValue !== false ? node.value : undefined}
            compact={kind === 'state'}
          />
        )}
    </group>
  );
}

function Packet({
  points,
  reverse,
  reduced,
  color,
  motionKey,
}: {
  points: Point[];
  reverse?: boolean;
  reduced: boolean;
  color: string;
  motionKey: string;
}) {
  const mesh = useRef<Mesh>(null);
  const elapsed = useRef(0);
  const { invalidate } = useThree();
  const path = useMemo(
    () =>
      (reverse ? [...points].reverse() : points).map((p) => new Vector3(...p)),
    [points, reverse],
  );
  useEffect(() => {
    elapsed.current = 0;
    invalidate();
  }, [motionKey, invalidate]);
  useFrame((_, dt) => {
    if (!mesh.current || path.length < 2) return;
    elapsed.current += Math.min(dt, 0.05);
    const progress = reduced ? 1 : Math.min(1, elapsed.current / 0.6);
    const step = progress * (path.length - 1);
    const index = Math.min(path.length - 2, Math.floor(step));
    mesh.current.position.lerpVectors(
      path[index],
      path[index + 1],
      step - index,
    );
    mesh.current.position.y += 0.14;
    if (progress < 1) invalidate();
  });
  return (
    <mesh ref={mesh} position={points[0]}>
      <sphereGeometry args={[0.1, 14, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function CameraRig({
  top,
  turn,
  reset,
  zoom,
  reduced,
  touchOrbit,
  extent,
  height,
  onUnavailable,
}: {
  top?: boolean;
  turn: number;
  reset: number;
  zoom: number;
  reduced: boolean;
  touchOrbit: boolean;
  extent: number;
  height: number;
  onUnavailable?: () => void;
}) {
  const ref = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera, size, gl, invalidate } = useThree();
  const previousZoom = useRef(zoom);
  useEffect(() => {
    const fit = Math.max(1, 0.95 / (size.width / size.height));
    const distance = Math.max(8.5, extent * 2.3, height * 2.4) * fit;
    const centerY = height / 2;
    camera.position.set(
      Math.sin(turn + 0.55) * distance,
      centerY + (top ? distance * 1.5 : distance * 0.85),
      top ? 0.01 : Math.cos(turn + 0.55) * distance,
    );
    if (top) camera.position.x = 0.01;
    ref.current?.target.set(0, centerY, 0);
    ref.current?.update();
    camera.lookAt(0, centerY, 0);
    invalidate();
  }, [
    camera,
    size.width,
    size.height,
    top,
    turn,
    reset,
    extent,
    height,
    invalidate,
  ]);
  useEffect(() => {
    const steps = zoom - previousZoom.current;
    previousZoom.current = zoom;
    if (!steps || !ref.current) return;
    const target = ref.current.target;
    camera.position.sub(target).multiplyScalar(1.25 ** -steps).clampLength(4, 40).add(target);
    ref.current.update();
    invalidate();
  }, [zoom, camera, invalidate]);
  useEffect(() => {
    gl.domElement.style.touchAction = touchOrbit ? 'none' : 'pan-y';
    const lost = (event: Event) => {
      event.preventDefault();
      onUnavailable?.();
    };
    gl.domElement.addEventListener('webglcontextlost', lost);
    return () => gl.domElement.removeEventListener('webglcontextlost', lost);
  }, [gl, touchOrbit, onUnavailable]);
  useFrame(() => {
    const action = touchOrbit ? 'none' : 'pan-y';
    if (gl.domElement.style.touchAction !== action)
      gl.domElement.style.touchAction = action;
  });
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableRotate={touchOrbit}
      enableZoom={touchOrbit}
      minDistance={4}
      maxDistance={40}
      minPolarAngle={0.03}
      maxPolarAngle={Math.PI / 2.03}
      enableDamping={!reduced}
      dampingFactor={0.12}
    />
  );
}

export default function WorkbenchScene({
  nodes,
  links = [],
  top,
  cameraTurn = 0,
  cameraReset = 0,
  cameraZoom = 0,
  touchOrbit = true,
  selectedId,
  onSelect,
  onUnavailable,
  motionKey = '',
}: WorkbenchSceneProps) {
  const { dark, reduced } = useScenePreferences();
  const resolved = useMemo(
    () =>
      links
        .map((link) => {
          const from = nodes.find((node) => node.id === link.from),
            to = nodes.find((node) => node.id === link.to);
          const points =
            link.points ??
            (from && to
              ? [from.position, to.position].map(
                  (p) => [p[0], p[1] + 0.04, p[2]] as Point,
                )
              : []);
          return { ...link, points };
        })
        .filter((link) => link.points.length >= 2),
    [links, nodes],
  );
  const extent = Math.max(
    4,
    ...nodes.map(
      (node) =>
        Math.max(Math.abs(node.position[0]), Math.abs(node.position[2])) + 1,
    ),
  );
  const height = Math.max(
    1,
    ...nodes.map(
      (node) =>
        node.position[1] +
        (node.size?.[1] ?? defaultSizes[node.kind ?? 'chip'][1]) +
        0.5,
    ),
  );
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ fov: 44, near: 0.1, far: 150 }}
      gl={{ antialias: true, alpha: true }}
      fallback={
        <div className="p-4">
          <p className="text-sm text-stone-700 dark:text-zinc-300">
            WebGL is unavailable. Choose 2D above to continue.
          </p>
        </div>
      }
    >
      <ambientLight intensity={dark ? 1.1 : 1.5} />
      <directionalLight position={[4, 9, 6]} intensity={dark ? 1.5 : 2} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, 0]}>
        <planeGeometry args={[extent * 2 + 2, extent * 2 + 2]} />
        <meshStandardMaterial
          color={dark ? '#1c1917' : '#f3ede3'}
          roughness={1}
        />
      </mesh>
      <gridHelper
        args={[
          extent * 2 + 2,
          Math.ceil(extent * 2 + 2),
          dark ? '#57534e' : '#d6cbb8',
          dark ? '#292524' : '#e2d8c7',
        ]}
        position={[0, -0.02, 0]}
      />
      {resolved.map((link) => (
        <group key={link.id}>
          <Line
            points={link.points}
            color={colors[link.tone ?? 'neutral'][dark ? 1 : 0]}
            lineWidth={
              link.tone === 'active' || link.tone === 'success' ? 2.5 : 1.5
            }
            dashed={link.tone === 'error'}
            dashSize={0.15}
            gapSize={0.12}
          />
          {link.moving && link.tone !== 'error' && (
            <Packet
              key={`${link.id}-${motionKey}`}
              points={link.points}
              reverse={link.reverse}
              reduced={reduced}
              color={colors[link.tone ?? 'active'][dark ? 1 : 0]}
              motionKey={`${link.id}-${motionKey}`}
            />
          )}
        </group>
      ))}
      {nodes.map((node) => (
        <Model
          key={node.id}
          node={node}
          dark={dark}
          selected={selectedId === node.id}
          onSelect={onSelect}
        />
      ))}
      <CameraRig
        top={top}
        turn={cameraTurn}
        reset={cameraReset}
        zoom={cameraZoom}
        reduced={reduced}
        extent={extent}
        height={height}
        touchOrbit={touchOrbit}
        onUnavailable={onUnavailable}
      />
    </Canvas>
  );
}

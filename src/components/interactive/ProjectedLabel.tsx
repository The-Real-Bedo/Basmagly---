import { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

type Point = [number, number, number];
type Annotation = { group: Group | null; label: HTMLDivElement; leader: HTMLDivElement; point: Vector3; priority: number };
const annotations = new WeakMap<HTMLCanvasElement, Set<Annotation>>();
const resizeObservers = new WeakMap<HTMLCanvasElement, ResizeObserver>();

/** DOM text follows a scene anchor without creating a second React root per label. */
export function ProjectedLabel({
  position,
  title,
  detail,
  compact = false,
  priority = 0,
}: {
  position: Point;
  title: string;
  detail?: string;
  compact?: boolean;
  priority?: number;
}) {
  const group = useRef<Group>(null);
  const entry = useRef<Annotation | null>(null);
  const { gl, invalidate } = useThree();
  useLayoutEffect(() => {
    const label = document.createElement('div');
    label.className = `absolute left-0 top-0 rounded-lg border text-center text-[13px] font-semibold shadow-sm ${priority ? 'border-amber-400 bg-amber-50/95 text-stone-900 dark:border-amber-500 dark:bg-amber-950/95 dark:text-amber-100' : 'border-beige-300 bg-white/95 text-stone-800 dark:border-stone-700 dark:bg-stone-900/95 dark:text-stone-100'} ${compact ? 'px-1.5 py-0.5' : 'px-2 py-1'}`;
    label.style.pointerEvents = 'none';
    // Projection already follows the camera; CSS transitions can lag off-screen resizes.
    label.style.transition = 'none';
    label.style.maxWidth = '160px';
    label.style.width = 'max-content';
    label.style.zIndex = '10';
    label.dataset.sceneLabel = title;
    label.setAttribute('aria-hidden', 'true'); // The object inspector carries accessible details.
    const heading = document.createElement('div');
    heading.textContent = title;
    label.appendChild(heading);
    if (detail) {
      const value = document.createElement('div');
      value.className =
        'font-mono text-[13px] font-normal text-stone-600 dark:text-zinc-400';
      value.textContent = detail;
      label.appendChild(value);
    }
    const leader = document.createElement('div');
    leader.className = 'absolute left-0 top-0 h-px bg-stone-400/70 dark:bg-stone-500/80';
    leader.style.pointerEvents = 'none';
    leader.style.transition = 'none';
    leader.style.transformOrigin = '0 50%';
    leader.style.zIndex = '9';
    leader.setAttribute('aria-hidden', 'true');
    leader.dataset.sceneLeader = '';
    gl.domElement.parentElement?.appendChild(leader);
    gl.domElement.parentElement?.appendChild(label);
    const record = { group: group.current, label, leader, point: new Vector3(), priority };
    const registry = annotations.get(gl.domElement) ?? new Set<Annotation>();
    annotations.set(gl.domElement, registry);
    registry.add(record);
    if (!resizeObservers.has(gl.domElement) && gl.domElement.parentElement) {
      const observer = new ResizeObserver(() => invalidate());
      observer.observe(gl.domElement.parentElement);
      resizeObservers.set(gl.domElement, observer);
    }
    // Loaded fonts can change a label's width without changing the canvas size.
    resizeObservers.get(gl.domElement)?.observe(label);
    entry.current = record;
    invalidate();
    return () => {
      entry.current = null;
      registry.delete(record);
      resizeObservers.get(gl.domElement)?.unobserve(label);
      if (!registry.size) {
        resizeObservers.get(gl.domElement)?.disconnect();
        resizeObservers.delete(gl.domElement);
        annotations.delete(gl.domElement);
      }
      label.remove();
      leader.remove();
      invalidate();
    };
  }, [gl, title, detail, compact, priority, invalidate]);
  useFrame(({ camera, size }) => {
    const registry = annotations.get(gl.domElement);
    // One elected callback lays out all annotations together for this canvas.
    if (!entry.current || registry?.values().next().value !== entry.current) return;
    // A modal can resize an off-screen canvas before Fiber's size measurement settles.
    const width = gl.domElement.parentElement?.clientWidth || size.width;
    const height = gl.domElement.parentElement?.clientHeight || size.height;
    const visible = [...registry].filter(record => {
      if (!record.group) return false;
      record.group.updateWorldMatrix(true, false);
      record.group.getWorldPosition(record.point).project(camera);
      const show = Math.abs(record.point.x) <= 1.15 && Math.abs(record.point.y) <= 1.15 && Math.abs(record.point.z) <= 1;
      record.label.style.display = show ? 'block' : 'none';
      record.leader.style.display = 'none';
      return show;
    }).sort((a, b) => b.priority - a.priority || b.point.y - a.point.y || a.point.x - b.point.x);
    const occupied: { x: number; y: number; w: number; h: number }[] = [];
    for (const { label, leader, point } of visible) {
      const w = label.offsetWidth, h = label.offsetHeight;
      const anchorX = (point.x + 1) * width / 2;
      const anchorY = (1 - point.y) * height / 2;
      const candidates = [];
      for (const dx of [0, -(w + 6), w + 6]) for (const dy of [0, -h - 6, h + 6, -2 * (h + 6), 2 * (h + 6), -3 * (h + 6), 3 * (h + 6)]) {
        const x = Math.max(w / 2 + 6, Math.min(width - w / 2 - 6, anchorX + dx));
        const y = Math.max(h / 2 + 6, Math.min(height - h / 2 - 6, anchorY + dy));
        if (occupied.every(other => Math.abs(x - other.x) >= (w + other.w) / 2 + 4 || Math.abs(y - other.y) >= (h + other.h) / 2 + 4))
          candidates.push({ x, y, w, h, cost: Math.hypot(x - anchorX, y - anchorY) });
      }
      const placement = candidates.sort((a, b) => a.cost - b.cost)[0];
      if (!placement) { label.style.display = 'none'; continue; }
      occupied.push(placement);
      label.style.transform = `translate(${placement.x}px, ${placement.y}px) translate(-50%, -50%)`;
      const endX = Math.max(placement.x - w / 2, Math.min(placement.x + w / 2, anchorX));
      const endY = Math.max(placement.y - h / 2, Math.min(placement.y + h / 2, anchorY));
      const length = Math.hypot(endX - anchorX, endY - anchorY);
      if (length > 8) {
        leader.style.display = 'block';
        leader.style.width = `${length}px`;
        leader.style.transform = `translate(${anchorX}px, ${anchorY}px) rotate(${Math.atan2(endY - anchorY, endX - anchorX)}rad)`;
      }
    }
  }, -1);
  return <group ref={group} position={position} />;
}

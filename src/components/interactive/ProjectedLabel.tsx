import { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

type Point = [number, number, number];

/** DOM text follows a scene anchor without creating a second React root per label. */
export function ProjectedLabel({
  position,
  title,
  detail,
  compact = false,
}: {
  position: Point;
  title: string;
  detail?: string;
  compact?: boolean;
}) {
  const group = useRef<Group>(null);
  const element = useRef<HTMLDivElement | null>(null);
  const projected = useRef(new Vector3());
  const { gl } = useThree();
  useLayoutEffect(() => {
    const label = document.createElement('div');
    label.className = `absolute left-0 top-0 rounded-lg border border-beige-300 bg-white/95 text-center text-[13px] font-semibold text-stone-800 shadow-sm dark:border-stone-700 dark:bg-stone-900/95 dark:text-stone-100 ${compact ? 'px-1 py-0.5' : 'px-2 py-1'}`;
    label.style.pointerEvents = 'none';
    label.style.maxWidth = '160px';
    label.style.width = 'max-content';
    label.style.zIndex = '10';
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
    gl.domElement.parentElement?.appendChild(label);
    element.current = label;
    return () => {
      element.current = null;
      label.remove();
    };
  }, [gl, title, detail, compact]);
  useFrame(({ camera, size }) => {
    if (!group.current || !element.current) return;
    group.current.updateWorldMatrix(true, false);
    group.current.getWorldPosition(projected.current).project(camera);
    const label = element.current;
    label.style.display =
      projected.current.z < -1 || projected.current.z > 1 ? 'none' : 'block';
    const margin = Math.min(size.width / 2, label.offsetWidth / 2 + 6);
    const x = Math.max(
      margin,
      Math.min(
        size.width - margin,
        ((projected.current.x + 1) * size.width) / 2,
      ),
    );
    const y = ((1 - projected.current.y) * size.height) / 2;
    label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  });
  return <group ref={group} position={position} />;
}

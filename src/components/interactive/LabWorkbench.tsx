import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  Box,
  Camera,
  ChevronLeft,
  ChevronRight,
  MousePointer2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ArabicText } from '../ArabicText';
import type { WorkbenchSceneProps } from './WorkbenchScene';

const Scene = lazy(() => import('./WorkbenchScene'));
export type {
  WorkbenchNode,
  WorkbenchLink,
  WorkbenchTone,
  WorkbenchKind,
} from './WorkbenchScene';
const button =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400';
const neutral =
  'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800';
const active =
  'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900';

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Keeps the teaching state in the lab; changing the view never restarts an experiment. */
export function LabWorkbench({
  title,
  nodes,
  links = [],
  children,
  selectedId: controlledId,
  onSelect: onInspect,
  ...sceneProps
}: WorkbenchSceneProps & { children: ReactNode }) {
  const [view, setView] = useState<'3d' | '2d'>('3d');
  const [top, setTop] = useState(false);
  const [cameraTurn, setCameraTurn] = useState(0);
  const [cameraReset, setCameraReset] = useState(0);
  const [cameraZoom, setCameraZoom] = useState(0);
  const [explore, setExplore] = useState(false);
  const [coarse, setCoarse] = useState(
    () => window.matchMedia('(pointer: coarse)').matches,
  );
  const [selectedId, setSelectedId] = useState(
    nodes.find((n) => !n.decorative)?.id ?? '',
  );
  const [unavailable, setUnavailable] = useState(false);
  const selected =
    nodes.find((n) => n.id === (controlledId ?? selectedId) && !n.decorative) ??
    nodes.find((n) => !n.decorative);
  const inspect = (id: string) => {
    const node = nodes.find((n) => n.id === id && !n.decorative);
    if (!node || (controlledId !== undefined && node.disabled)) return;
    setSelectedId(id);
    onInspect?.(id);
  };
  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const fallback = (
    <div className="p-4 space-y-3">
      <p role="status" className="text-sm text-stone-700 dark:text-zinc-300">
        The 3D view is unavailable on this device. Open the interactive 2D view
        to continue.
      </p>
      <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
        عرض 3D مش متاح على الجهاز ده. افتح العرض التفاعلي 2D عشان تكمّل.
      </ArabicText>
      <button
        type="button"
        onClick={() => setView('2d')}
        className={`${button} ${neutral}`}
      >
        Open 2D view
      </button>
    </div>
  );
  return (
    <section
      data-testid="lab-workbench"
      aria-label={title}
      className="min-w-0 w-full overflow-hidden rounded-2xl border border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-beige-300 p-3 dark:border-stone-800">
        <span className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-stone-100">
          <Box className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          {title}
        </span>
        <div
          className="flex gap-1"
          role="group"
          aria-label="Visualization mode"
        >
          {(['3d', '2d'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={view === mode}
              onClick={() => setView(mode)}
              className={`${button} ${view === mode ? active : neutral}`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {view === '2d' ? (
        <div className="p-3">{children}</div>
      ) : (
        <div data-workbench-layout>
          <div data-workbench-stage className="min-w-0">
          <div
            className="flex flex-wrap gap-2 p-3"
            role="group"
            aria-label="3D camera controls"
          >
            <button
              type="button"
              aria-pressed={top}
              onClick={() => setTop((v) => !v)}
              className={`${button} ${neutral}`}
            >
              <Camera className="h-4 w-4" />
              {top ? 'Perspective' : 'Top view'}
            </button>
            <button
              type="button"
              aria-label="Rotate camera left"
              onClick={() => setCameraTurn((v) => v - Math.PI / 8)}
              className={`${button} ${neutral}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Rotate camera right"
              onClick={() => setCameraTurn((v) => v + Math.PI / 8)}
              className={`${button} ${neutral}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Zoom camera in"
              onClick={() => setCameraZoom((v) => v + 1)}
              className={`${button} ${neutral}`}
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Zoom camera out"
              onClick={() => setCameraZoom((v) => v - 1)}
              className={`${button} ${neutral}`}
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Reset camera"
              onClick={() => {
                setCameraTurn(0);
                setTop(false);
                setCameraReset((v) => v + 1);
              }}
              className={`${button} ${neutral}`}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            {coarse && (
              <button
                type="button"
                aria-pressed={explore}
                onClick={() => setExplore((v) => !v)}
                className={`${button} ${explore ? active : neutral}`}
              >
                <MousePointer2 className="h-4 w-4" />
                {explore ? 'Finish orbiting' : 'Enable touch orbit'}
              </button>
            )}
          </div>
          <div
            className="relative h-[340px] sm:h-[430px]"
            data-testid="workbench-viewport"
          >
            <SceneBoundary fallback={fallback}>
              <Suspense
                fallback={
                  <p
                    role="status"
                    className="p-5 text-sm text-stone-600 dark:text-zinc-400"
                  >
                    Preparing 3D view…
                  </p>
                }
              >
                {unavailable ? (
                  fallback
                ) : (
                  <Scene
                    {...sceneProps}
                    title={title}
                    nodes={nodes}
                    links={links}
                    top={top}
                    cameraTurn={cameraTurn}
                    cameraReset={cameraReset}
                    cameraZoom={cameraZoom}
                    touchOrbit={!coarse || explore}
                    selectedId={selected?.id}
                    onSelect={inspect}
                    onUnavailable={() => setUnavailable(true)}
                  />
                )}
              </Suspense>
            </SceneBoundary>
          </div>
          <p className="px-3 pt-2 text-xs text-stone-600 dark:text-zinc-400">
            {coarse && !explore
              ? 'Scroll the page normally. Enable touch orbit to explore the scene.'
              : 'Drag to orbit · Scroll to zoom · Camera buttons also work with a keyboard.'}
          </p>
          </div>
          <div data-workbench-inspector className="min-w-0 space-y-3 p-3">
            <p className="flex items-center justify-between gap-2 text-xs font-semibold text-stone-700 dark:text-zinc-300"><span>Object inspector</span><span className="font-mono font-normal text-stone-500 dark:text-zinc-400">{nodes.filter(n => !n.decorative).length} objects</span></p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Inspect scene objects"
            >
              {nodes
                .filter((n) => !n.decorative)
                .map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    aria-pressed={selected?.id === node.id}
                    onClick={() => inspect(node.id)}
                    disabled={controlledId !== undefined && node.disabled}
                    className={`${button} ${selected?.id === node.id ? active : neutral}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${node.tone === 'error' ? 'bg-rose-500 dark:bg-rose-400' : node.tone === 'success' ? 'bg-emerald-600 dark:bg-emerald-400' : node.tone === 'active' ? 'bg-amber-500 dark:bg-amber-400' : 'bg-stone-500 dark:bg-stone-400'}`}
                    />
                    {node.label}
                  </button>
                ))}
            </div>
            {selected && !selected.decorative && (
              <div className="rounded-xl border border-beige-300 bg-white p-3 dark:border-stone-800 dark:bg-stone-900">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {selected.label}
                    {selected.value ? ` · ${selected.value}` : ''}
                  </p>
                  {selected.action && (
                    <button
                      type="button"
                      onClick={selected.action}
                      disabled={selected.disabled}
                      className={`${button} ${neutral}`}
                    >
                      {selected.actionLabel ?? 'Change state'}
                    </button>
                  )}
                </div>
                {selected.detail && (
                  <p className="mt-1 text-sm text-stone-700 dark:text-zinc-300">
                    {selected.detail}
                  </p>
                )}
                {selected.detailAr && (
                  <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">
                    {selected.detailAr}
                  </ArabicText>
                )}
              </div>
            )}
            {links.some((link) => link.action) && (
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Change link state"
              >
                {links
                  .filter((link) => link.action)
                  .map((link) => (
                    <button
                      key={link.id}
                      type="button"
                      onClick={link.action}
                      disabled={link.disabled}
                      aria-pressed={link.tone === 'error'}
                      className={`${button} ${link.tone === 'error' ? 'border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300' : neutral}`}
                    >
                      {link.label ?? link.id}
                    </button>
                  ))}
              </div>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600 dark:text-zinc-400">
              <span>Amber · selected / sending</span>
              <span>Emerald · success / clean</span>
              <span>Rose · fault / collision</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

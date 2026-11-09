import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BookOpen, Box, Minimize2, SlidersHorizontal } from 'lucide-react';

const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-beige-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400';

/** Native top-layer presentation preserves the React tree and graphics context. */
export function ExpandedLab({ title, children }: { title: string; children: (expand: () => void) => ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const pagePosition = useRef({ x: 0, y: 0 });
  const expand = () => {
    const element = dialog.current;
    if (!element || expanded) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    pagePosition.current = { x: window.scrollX, y: window.scrollY };
    element.close(); element.showModal(); setExpanded(true);
  };
  const close = () => { dialog.current?.close(); dialog.current?.show(); setExpanded(false); };
  useEffect(() => {
    if (!expanded) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      if (returnFocus.current?.isConnected) returnFocus.current.focus({ preventScroll: true });
      window.scrollTo({ left: pagePosition.current.x, top: pagePosition.current.y, behavior: 'instant' });
    };
  }, [expanded]);
  const jump = (part: 'controls' | 'scene' | 'explanation') => {
    const root = body.current;
    if (!root) return;
    let target: HTMLElement | null;
    if (part === 'explanation') {
      const observation = root.querySelector<HTMLDetailsElement>('[data-lab-observation]');
      if (observation) observation.open = true;
      target = observation;
    } else if (part === 'scene') target = root.querySelector<HTMLElement>('[data-testid="lab-workbench"], [data-lab-scene], [aria-label="Interactive 3D network topology"], [data-lab-body] canvas') ?? [...root.querySelectorAll<HTMLElement>('[data-lab-body] svg[viewBox]')].find(element => element.getBoundingClientRect().width > 100) ?? root.querySelector<HTMLElement>('[data-lab-body] table');
    else target = [...root.querySelectorAll<HTMLElement>('[data-lab-body] input, [data-lab-body] select, [data-lab-body] button')].find(element => !element.closest('[data-testid="lab-challenge"], [data-testid="lab-workbench"]')) ?? null;
    // Scroll only the content pane; scrollIntoView can also hide the modal toolbar.
    root.scrollTo({ top: target ? root.scrollTop + target.getBoundingClientRect().top - root.getBoundingClientRect().top : 0, behavior: 'instant' });
    if (target?.matches('input, select, button')) target.focus({ preventScroll: true });
  };
  return <dialog ref={dialog} open role={expanded ? 'dialog' : 'region'} aria-modal={expanded || undefined} aria-label={expanded ? `${title} · expanded lab` : title} data-testid="expanded-lab" data-expanded={expanded} onCancel={event => { event.preventDefault(); close(); }} className={expanded ? 'lab-expanded fixed inset-0 m-0 flex h-[100dvh] max-h-none w-full max-w-none flex-col overflow-clip border-0 bg-[#FBF9F5] p-0 text-stone-900 backdrop:bg-stone-900/60 dark:bg-[#121214] dark:text-stone-100 dark:backdrop:bg-stone-950/70' : 'static m-0 block w-full max-w-none border-0 bg-transparent p-0 text-inherit dark:bg-transparent'}>
    <div className={expanded ? 'flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-beige-300 bg-[#FAF7F2] px-3 py-2 dark:border-stone-800 dark:bg-stone-950' : 'hidden'}><p className="min-w-0 text-sm font-bold">{title}</p><div className="flex flex-wrap gap-2" role="group" aria-label="Expanded lab navigation"><button type="button" onClick={() => jump('controls')} className={button}><SlidersHorizontal className="h-4 w-4" />Controls</button><button type="button" onClick={() => jump('scene')} className={button}><Box className="h-4 w-4" />Scene</button><button type="button" onClick={() => jump('explanation')} className={button}><BookOpen className="h-4 w-4" />Explanation</button><button ref={closeButton} type="button" data-testid="close-expanded-lab" onClick={close} className={button}><Minimize2 className="h-4 w-4" />Close expanded view</button></div></div>
    <div ref={body} data-testid="expanded-lab-body" className={expanded ? 'min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6' : 'min-w-0'}>{children(expand)}</div>
  </dialog>;
}

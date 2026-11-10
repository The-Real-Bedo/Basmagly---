import { useEffect, useId, useRef, useState } from 'react';
import { GitBranch, Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LectureSection } from '../LectureSection';
import { LabWorkbench, type WorkbenchLink, type WorkbenchNode } from './LabWorkbench';
import { expandState, initialStateSearch, SEARCH_WORLD, type WorldState } from './aiLabModels';

const control = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400';
const neutral = 'border-beige-300 bg-white text-stone-800 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200 dark:hover:bg-stone-800';
const active = 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900';
const worldPositions: Record<WorldState, [number, number, number]> = { S: [-3, 0, 0], A: [-1, 0, -1.8], B: [-1, 0, 1.8], C: [1, 0, 0], G: [3, 0, 0] };
const diagramPositions: Record<WorldState, [number, number]> = { S: [45, 140], A: [155, 55], B: [155, 225], C: [285, 140], G: [395, 140] };
type ScenePoint = [number, number, number];
/** Static polylines include arrowheads; reciprocal actions bend to opposite sides. */
const directedPoints = (from: ScenePoint, to: ScenePoint, bend = 0): ScenePoint[] => {
  const dx = to[0] - from[0], dz = to[2] - from[2], length = Math.hypot(dx, dz);
  const ux = dx / length, uz = dz / length;
  const start: ScenePoint = [from[0] + ux * .32, .12, from[2] + uz * .32];
  const end: ScenePoint = [to[0] - ux * .36, .12, to[2] - uz * .36];
  const middle: ScenePoint = [(from[0] + to[0]) / 2 - uz * bend, .12, (from[2] + to[2]) / 2 + ux * bend];
  const heading = Math.hypot(end[0] - middle[0], end[2] - middle[2]);
  const ax = (end[0] - middle[0]) / heading, az = (end[2] - middle[2]) / heading;
  return [start, middle, end, [end[0] - ax * .22 - az * .13, .12, end[2] - az * .22 + ax * .13], end, [end[0] - ax * .22 + az * .13, .12, end[2] - az * .22 - ax * .13]];
};

export function SearchStatesLab() {
  const theoryId = useId();
  const [graphSearch, setGraphSearch] = useState(false);
  const [state, setState] = useState(initialStateSearch);
  const [playing, setPlaying] = useState(false);
  const [treeView, setTreeView] = useState(false);
  const [inspected, setInspected] = useState(0);
  const markerId = useId().replace(/:/g, '');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const reset = () => { clearTimers(); setPlaying(false); setState(initialStateSearch()); setInspected(0); };
  useEffect(() => {
    if (!playing) return;
    if (state.status !== 'ready') { setPlaying(false); return; }
    timers.current.push(setTimeout(() => setState(current => expandState(current, graphSearch)), 500));
    return clearTimers;
  }, [playing, state, graphSearch]);
  useEffect(() => () => clearTimers(), []);
  const selected = state.records[inspected] ?? state.records[0];
  const solution = state.solution !== undefined ? state.records[state.solution] : undefined;
  const solutionNodes = new Set<number>();
  let cursor: number | null | undefined = state.solution;
  while (cursor != null) { solutionNodes.add(cursor); cursor = state.records[cursor].parent; }
  const solutionEdges = new Set(solution?.path.slice(1).map((value, i) => `${solution.path[i]}-${value}`));
  const lastExpanded = state.expanded.length ? state.records[state.expanded[state.expanded.length - 1]] : undefined;
  const levels = Array.from({ length: Math.max(...state.records.map(n => n.depth)) + 1 }, (_, depth) => state.records.filter(n => n.depth === depth));
  const treeWidth = Math.max(420, ...levels.map(level => level.length * 120));
  const treeHeight = levels.length * 90;
  const treePoint = (id: number): [number, number] => { const node = state.records[id], level = levels[node.depth]; return [(level.findIndex(n => n.id === id) + 1) / (level.length + 1) * treeWidth, 40 + node.depth * 90]; };
  const nodeTone = (id: number) => solutionNodes.has(id) ? 'success' as const : state.frontier.includes(id) ? 'info' as const : lastExpanded?.id === id ? 'active' as const : 'neutral' as const;
  const nodes: WorkbenchNode[] = treeView ? state.records.map(node => {
    const [x, y] = treePoint(node.id);
    return { id: `node-${node.id}`, label: `n${node.id} · ${node.state}`, sceneLabel: `n${node.id} · ${node.state}`, showValue: false, kind: 'state', position: [(x - treeWidth / 2) / 70, 0, (y - treeHeight / 2) / 55], tone: nodeTone(node.id), detail: `Path ${node.path.join(' → ')}. Parent ${node.parent === null ? 'none' : `n${node.parent}`}; depth ${node.depth}; cost ${node.cost}.`, detailAr: `المسار ${node.path.join(' ← ')}. الأب ${node.parent === null ? 'مفيش' : `n${node.parent}`}؛ العمق ${node.depth}؛ التكلفة ${node.cost}.` };
  }) : (Object.keys(SEARCH_WORLD) as WorldState[]).map(value => ({ id: value, label: `State ${value}`, sceneLabel: value, kind: 'state', position: worldPositions[value], tone: solution?.path.includes(value) ? 'success' : lastExpanded?.state === value ? 'active' : state.seen.includes(value) ? 'info' : 'neutral', value: `${state.records.filter(n => n.state === value).length} nodes`, detail: `One world state, ${state.records.filter(n => n.state === value).length} generated search records. Outgoing actions: ${SEARCH_WORLD[value].join(', ') || 'none'}.`, detailAr: `حالة عالم واحدة، و${state.records.filter(n => n.state === value).length} سجل بحث اتولّد. الأفعال المتاحة: ${SEARCH_WORLD[value].join('، ') || 'مفيش'}.` }));
  const links: WorkbenchLink[] = treeView ? state.records.filter(n => n.parent !== null).map(node => ({ id: `edge-${node.id}`, from: `node-${node.parent}`, to: `node-${node.id}`, points: directedPoints(nodes[node.parent!].position, nodes[node.id].position), tone: solutionNodes.has(node.id) ? 'success' : 'neutral' })) : (Object.keys(SEARCH_WORLD) as WorldState[]).flatMap(from => SEARCH_WORLD[from].map(to => ({ id: `${from}-${to}`, from, to, points: directedPoints(worldPositions[from], worldPositions[to], SEARCH_WORLD[to].includes(from) ? .45 : 0), tone: solutionEdges.has(`${from}-${to}`) ? 'success' as const : lastExpanded?.state === from ? 'active' as const : 'neutral' as const })));
  const description = solution
    ? [`Goal generated: ${solution.path.join(' → ')}. Depth and cost are ${solution.cost}.`, `الهدف اتولّد: ${solution.path.join(' ← ')}. العمق والتكلفة ${solution.cost}.`]
    : state.status === 'limited'
      ? ['The 12-expansion display limit was reached; this is a display bound, not a claim of search completeness.', 'وصلنا لحد العرض: 12 توسّع؛ ده حد للعرض، مش ادعاء عن اكتمال البحث.']
      : [`Next FIFO expansion: ${state.frontier.length ? `n${state.frontier[0]} · ${state.records[state.frontier[0]].state}` : 'none'}.`, `التوسّع الجاي بترتيب FIFO: ${state.frontier.length ? `n${state.frontier[0]} · ${state.records[state.frontier[0]].state}` : 'مفيش'}.`];
  const svg = treeView ? <svg width={treeWidth} height={treeHeight} className="text-stone-600 dark:text-zinc-400" role="img" aria-label="Generated search tree with distinct path nodes">
    {state.records.filter(node => node.parent !== null).map(node => { const [x, y] = treePoint(node.id), [px, py] = treePoint(node.parent!); return <line key={node.id} x1={px} y1={py + 20} x2={x} y2={y - 20} stroke="currentColor" opacity=".5" />; })}
    {state.records.map(node => { const [x, y] = treePoint(node.id); return <g key={node.id}><rect x={x - 43} y={y - 20} width="86" height="40" rx="10" className={node.id === inspected ? 'fill-amber-100 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400' : 'fill-white stroke-stone-300 dark:fill-stone-900 dark:stroke-stone-700'} /><text x={x} y={y + 6} fontSize="17" textAnchor="middle" fill="currentColor">n{node.id} · {node.state}</text></g>; })}
  </svg> : <svg width="450" height="280" className="text-stone-600 dark:text-zinc-400" role="img" aria-label="Known directed state graph with cycles and two routes to C">
    <defs><marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor" /></marker></defs>
    {(Object.keys(SEARCH_WORLD) as WorldState[]).flatMap(from => SEARCH_WORLD[from].map(to => {
      const [x, y] = diagramPositions[from], [tx, ty] = diagramPositions[to], length = Math.hypot(tx - x, ty - y), ux = (tx - x) / length, uy = (ty - y) / length;
      const bend = SEARCH_WORLD[to].includes(from) ? 22 : 0;
      return <path key={`${from}-${to}`} d={`M${x + ux * 25} ${y + uy * 25} Q${(x + tx) / 2 - uy * bend} ${(y + ty) / 2 + ux * bend} ${tx - ux * 28} ${ty - uy * 28}`} fill="none" stroke="currentColor" strokeWidth={solutionEdges.has(`${from}-${to}`) ? 3 : 1.5} markerEnd={`url(#${markerId})`} />;
    }))}
    {(Object.keys(SEARCH_WORLD) as WorldState[]).map(value => { const [x, y] = diagramPositions[value]; return <g key={value}><circle cx={x} cy={y} r="24" className={value === selected.state ? 'fill-amber-100 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400' : 'fill-white stroke-stone-300 dark:fill-stone-900 dark:stroke-stone-700'} /><text x={x} y={y + 7} fill="currentColor" textAnchor="middle" fontSize="22">{value}</text></g>; })}
  </svg>;
  return <section className="space-y-5 rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
    <header className="flex items-start gap-3"><span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><GitBranch className="h-5 w-5" /></span><div><h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">States vs Search Nodes</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">شوف نفس الحالة بتظهر في مسارات مختلفة إزاي</ArabicText></div></header>
    <div className="space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Repeated state handling">{[false, true].map(value => <button key={String(value)} type="button" disabled={playing} aria-pressed={graphSearch === value} onClick={() => { setGraphSearch(value); reset(); }} className={`${control} ${graphSearch === value ? active : neutral}`}>{value ? 'Graph search' : 'Tree search'}</button>)}</div>
      <div className="flex flex-wrap gap-2"><button type="button" disabled={state.status !== 'ready' && !playing} onClick={() => { if (playing) clearTimers(); setPlaying(!playing); }} className={`${control} ${neutral}`}>{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{playing ? 'Pause BFS' : 'Run BFS'}</button><button type="button" disabled={playing || state.status !== 'ready'} onClick={() => setState(current => expandState(current, graphSearch))} className={`${control} ${neutral}`}><StepForward className="h-4 w-4" />Step BFS</button><button type="button" onClick={reset} className={`${control} ${neutral}`}><RotateCcw className="h-4 w-4" />Reset search</button></div>
      <p className="text-sm text-stone-600 dark:text-zinc-400">FIFO BFS · Every directed edge costs 1 · Goal test on generation</p>
    </div>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Scene representation">{[false, true].map(value => <button key={String(value)} type="button" aria-pressed={treeView === value} onClick={() => setTreeView(value)} className={`${control} ${treeView === value ? active : neutral}`}>{value ? 'Search tree view' : 'State graph view'}</button>)}</div>
    <LabWorkbench title={treeView ? 'Generated nodes · distinct paths' : 'World states · directed transitions'} nodes={nodes} links={links} selectedId={treeView ? `node-${selected.id}` : undefined} onSelect={id => { const record = treeView ? Number(id.replace('node-', '')) : state.records.find(n => n.state === id)?.id; if (record !== undefined) setInspected(record); }} motionKey={state.expanded.length}>
      <div className="overflow-x-auto rounded-xl border border-beige-300 bg-[#FAF7F2] p-3 dark:border-stone-800 dark:bg-stone-950">{svg}</div>
    </LabWorkbench>
    <div data-testid="state-search-status" aria-live="polite" className="space-y-2 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950"><p className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">{state.records.length} nodes · {state.seen.length} reached states · {state.expanded.length} expansions · {state.rejected.length} duplicates skipped</p><p className="text-sm text-stone-700 dark:text-zinc-300">{description[0]}</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{description[1]}</ArabicText><p className="break-words font-mono text-sm text-stone-700 dark:text-zinc-300">Frontier: {state.frontier.map(id => `n${id}:${state.records[id].state}`).join(' → ') || 'empty'}</p></div>
    <div className="overflow-x-auto rounded-2xl border border-beige-300 dark:border-stone-800"><table data-testid="search-records" className="w-full min-w-[520px] text-left text-sm text-stone-700 dark:text-zinc-300"><thead className="bg-[#FAF7F2] dark:bg-stone-950"><tr>{['Node', 'State', 'Parent', 'Depth / Cost', 'Path'].map(label => <th key={label} className="p-3">{label}</th>)}</tr></thead><tbody>{state.records.map(node => <tr key={node.id} data-state={node.state} className="border-t border-beige-300 dark:border-stone-800"><td className="p-2"><button type="button" aria-pressed={selected.id === node.id} onClick={() => setInspected(node.id)} className={`${control} ${selected.id === node.id ? active : neutral}`}>n{node.id}</button></td><td className="p-3 font-mono">{node.state}</td><td className="p-3 font-mono">{node.parent === null ? '—' : `n${node.parent}`}</td><td className="p-3 font-mono">{node.depth} / {node.cost}</td><td className="p-3 font-mono">{node.path.join(' → ')}</td></tr>)}</tbody></table></div>
    <p data-testid="search-record-inspector" className="break-words rounded-2xl border border-beige-300 p-4 text-sm text-stone-700 dark:border-stone-800 dark:text-zinc-300">Selected n{selected.id} represents state {selected.state}, reached by {selected.path.join(' → ')}. Parent: {selected.parent === null ? 'none' : `n${selected.parent}`}; depth {selected.depth}; cost {selected.cost}.</p>
    <LectureSection anchorId={`${theoryId}-theory`} index={0} total={1} section={{ title: '1. One State Can Have Several Search Nodes', titleAr: '1. الحالة الواحدة ممكن يكون ليها عقد بحث كتير', content: 'A world state describes a configuration. A search node records one path to that state, with a parent, depth and cumulative cost. Distinct paths may therefore produce separate nodes for the same state.', contentAr: 'حالة العالم بتوصف تكوين معين. عقدة البحث بتسجّل مسار واحد للحالة دي ومعاه الأب والعمق والتكلفة المتراكمة. عشان كده مسارات مختلفة ممكن تطلع عقد منفصلة لنفس الحالة.', bulletPoints: ['Repeated state: Both S → A → C and S → B → C reach C; tree search keeps separate path records.', 'Cycles: S → A → S revisits the initial state. Tree search does not discard that path in this example.', 'Graph BFS: Record each state when first generated; later duplicate paths are skipped, including states already in the frontier.', 'Scope: AI 3 covers states, nodes and frontiers; AI 4 covers repeated states. This five-state, unit-cost directed graph is supplementary. The display allows at most 12 expansions.'], bulletPointsAr: ['الحالة المتكررة: S ← A ← C وS ← B ← C بيوصلوا لـ C؛ بحث الشجرة بيحتفظ بسجل منفصل لكل مسار.', 'الدورات: S ← A ← S بيرجع لحالة البداية. بحث الشجرة في المثال ده ما بيشيلش المسار ده.', 'الـ Graph BFS: سجّل كل حالة أول ما تتولد؛ المسارات المكررة بعد كده بتتشال، حتى لو الحالة لسه في الـ Frontier.', 'النطاق: AI 3 بتشرح الحالات والعقد والـ Frontier؛ وAI 4 بتشرح الحالات المتكررة. الرسم الموجّه ده بخمس حالات وتكلفة واحدة مثال إضافي. العرض بيسمح بحد أقصى 12 توسّع.'], keyRule: 'With equal costs, first generation in BFS gives a shortest path; that duplicate policy is not sufficient for general unequal-cost search.', keyRuleAr: 'مع التكاليف المتساوية، أول توليد في BFS بيدي أقصر مسار؛ سياسة التكرار دي مش كفاية للبحث العام بتكاليف مختلفة.' }} />
  </section>;
}

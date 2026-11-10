import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, GitFork, Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import ArabicText from '../ArabicText';
import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

type Algorithm = 'bfs' | 'dfs' | 'ucs';

type SearchNode = {
  id: string;
  depth: number;
  index: number;
  children: string[];
};

type Preset = {
  id: string;
  label: string;
  labelAr: string;
  rootId: string;
  goalId: string;
  nodes: SearchNode[];
  costs?: Record<string, number>;
};

type FrontierItem = { id: string; path: string[]; cost: number };
type SearchState = {
  frontier: FrontierItem[];
  expanded: string[];
  current: string | null;
  solution: string[] | null;
  cost: number | null;
  steps: number;
  finished: boolean;
};

const numberIds = Array.from({ length: 15 }, (_, index) => String(index + 1));
const letterEdges: Record<string, string[]> = {
  A: ['B', 'C', 'D', 'E'], B: ['F', 'G'], C: ['H'], D: ['I', 'J'], E: [], F: [],
  G: ['K', 'L'], H: [], I: ['M'], J: ['N'], K: [], L: ['O'], M: [], N: [], O: [],
};

const makeTree = (ids: string[]): SearchNode[] => ids.map((id, index) => {
  const childIndexes = [index * 2 + 1, index * 2 + 2].filter((child) => child < ids.length);
  return {
    id,
    depth: Math.floor(Math.log2(index + 1)),
    index: (index + 1) - (2 ** Math.floor(Math.log2(index + 1))),
    children: childIndexes.map((child) => ids[child]),
  };
});

const makeTreeFromEdges = (edges: Record<string, string[]>): SearchNode[] => {
  const root = Object.keys(edges)[0];
  const depthById = new Map<string, number>([[root, 0]]);
  const queue = [root];
  for (const id of queue) {
    for (const child of edges[id] ?? []) {
      if (!depthById.has(child)) {
        depthById.set(child, (depthById.get(id) ?? 0) + 1);
        queue.push(child);
      }
    }
  }
  const levels = new Map<number, string[]>();
  for (const id of queue) {
    const depth = depthById.get(id) ?? 0;
    levels.set(depth, [...(levels.get(depth) ?? []), id]);
  }
  return queue.map((id) => {
    const depth = depthById.get(id) ?? 0;
    return { id, depth, index: levels.get(depth)?.indexOf(id) ?? 0, children: edges[id] ?? [] };
  });
};

const presets: Preset[] = [
  { id: 'sheet4-tree', label: 'Lecture 4 tree · Goal O', labelAr: 'شجرة المحاضرة 4 · الهدف O', rootId: 'A', goalId: 'O', nodes: makeTreeFromEdges(letterEdges) },
  { id: 'binary-tree', label: 'Binary tree · Goal 11', labelAr: 'الشجرة الثنائية · الهدف 11', rootId: '1', goalId: '11', nodes: makeTree(numberIds) },
  { id: 'weighted-routes', label: 'Weighted routes · supplementary', labelAr: 'مسارات بتكاليف مختلفة · مثال إضافي', rootId: 'S', goalId: 'G', nodes: makeTreeFromEdges({ S: ['A', 'B'], A: ['G'], B: ['G'], G: [] }), costs: { 'S-A': 1, 'S-B': 3, 'A-G': 8, 'B-G': 1 } },
];
const edgeCost = (preset: Preset, from: string, to: string) => preset.costs?.[`${from}-${to}`] ?? 1;

const initialState = (preset: Preset): SearchState => ({
  frontier: [{ id: preset.rootId, path: [preset.rootId], cost: 0 }],
  expanded: [],
  current: null,
  solution: null,
  cost: null,
  steps: 0,
  finished: false,
});

const nextIndex = (frontier: FrontierItem[], algorithm: Algorithm) => {
  if (algorithm === 'dfs') return frontier.length - 1;
  if (algorithm === 'ucs') {
    return frontier.reduce((best, item, index, items) => item.cost < items[best].cost ? index : best, 0);
  }
  return 0;
};

const advanceSearch = (state: SearchState, preset: Preset, algorithm: Algorithm): SearchState => {
  if (state.finished || state.frontier.length === 0) return { ...state, finished: true };
  const frontier = [...state.frontier];
  const selected = frontier.splice(nextIndex(frontier, algorithm), 1)[0];
  const expanded = [...state.expanded, selected.id];
  const steps = state.steps + 1;

  if (selected.id === preset.goalId) {
    return { ...state, frontier, expanded, current: selected.id, solution: selected.path, cost: selected.cost, steps, finished: true };
  }

  const node = preset.nodes.find((item) => item.id === selected.id);
  const successors = node?.children.map((id) => ({ id, path: [...selected.path, id], cost: selected.cost + edgeCost(preset, selected.id, id) })) ?? [];
  if (algorithm === 'bfs') {
    const generatedGoal = successors.find((item) => item.id === preset.goalId);
    if (generatedGoal) {
      return { ...state, frontier, expanded, current: selected.id, solution: generatedGoal.path, cost: generatedGoal.cost, steps, finished: true };
    }
  }
  const nextFrontier = algorithm === 'dfs' ? [...frontier, ...successors.reverse()] : [...frontier, ...successors];
  return { ...state, frontier: nextFrontier, expanded, current: selected.id, steps, finished: nextFrontier.length === 0 };
};

const algorithmDetails: Record<Algorithm, { label: string; labelAr: string; rule: string; ruleAr: string }> = {
  bfs: { label: 'Breadth-first search', labelAr: 'البحث بالعرض', rule: 'FIFO · shallowest first · goal test on generation', ruleAr: 'FIFO · الأقل عمقًا أولًا · اختبار الهدف عند توليده' },
  dfs: { label: 'Depth-first search', labelAr: 'البحث بالعمق', rule: 'LIFO stack · deepest node first', ruleAr: 'مكدس LIFO · الأعمق أولًا' },
  ucs: { label: 'Uniform-cost search', labelAr: 'البحث الأقل تكلفة', rule: 'Priority queue · lowest path cost g(n)', ruleAr: 'طابور أولوية · أقل تكلفة مسار g(n)' },
};

const nodePosition = (node: SearchNode, preset: Preset) => {
  if (preset.costs) {
    return { x: node.id === 'A' ? 55 : node.id === 'B' ? 245 : 150, y: 40 + node.depth * 90 };
  }
  const levelCount = preset.nodes.filter((item) => item.depth === node.depth).length;
  return { x: ((node.index + 1) / (levelCount + 1)) * 900, y: 40 + node.depth * 84 };
};

export function SearchAlgorithmLab() {
  const [presetId, setPresetId] = useState(presets[0].id);
  const [algorithm, setAlgorithm] = useState<Algorithm>('bfs');
  const [simulation, setSimulation] = useState(() => initialState(presets[0]));
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);
  const preset = presets.find((item) => item.id === presetId) ?? presets[0];

  useEffect(() => {
    if (!playing || simulation.finished) return;
    timerRef.current = window.setInterval(() => {
      setSimulation((current) => advanceSearch(current, preset, algorithm));
    }, 850);
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [playing, simulation.finished, preset, algorithm]);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (simulation.finished) setPlaying(false);
  }, [simulation.finished]);

  const reset = () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
    setSimulation(initialState(preset));
  };

  const changePreset = (id: string) => {
    reset();
    setPresetId(id);
    const nextPreset = presets.find((item) => item.id === id) ?? presets[0];
    setSimulation(initialState(nextPreset));
  };

  const changeAlgorithm = (next: Algorithm) => {
    reset();
    setAlgorithm(next);
    setSimulation(initialState(preset));
  };

  const next = !simulation.finished && simulation.frontier.length ? simulation.frontier[nextIndex(simulation.frontier, algorithm)] : null;
  const frontierOrder = algorithm === 'dfs'
    ? [...simulation.frontier].reverse()
    : algorithm === 'ucs'
      ? [...simulation.frontier].sort((left, right) => left.cost - right.cost)
      : simulation.frontier;
  const expandedSet = new Set(simulation.expanded);
  const frontierSet = new Set(simulation.frontier.map((item) => item.id));
  const missions: ChallengeMission[] = [
    { id: 'least-cost', title: 'Find the least-cost route', titleAr: 'اعثر على أقل مسار في التكلفة', goal: 'Use the supplementary weighted routes. Select UCS, then Step or Auto play until G is removed from the frontier. Find the route with total cost 4.', goalAr: 'استخدم المسارات الإضافية بتكاليف مختلفة. اختار الـ UCS، وبعدها استخدم Step أو Auto play لحد ما G تتسحب من الـ Frontier. اعثر على المسار بتكلفة إجمالية 4.', hint: 'UCS compares cumulative cost, and tests the goal when it is removed. A generated goal with cost 9 can wait behind a cheaper route.', hintAr: 'الـ UCS بتقارن التكلفة التراكمية وبتختبر الهدف وقت سحبه. هدف اتولّد بتكلفة 9 ممكن يستنى ورا مسار أرخص.', start: () => { changePreset('weighted-routes'); setAlgorithm('bfs'); }, evaluate: () => presetId !== 'weighted-routes' || algorithm !== 'ucs' ? feedback('retry', 'Use Weighted routes and UCS.', 'استخدم المسارات بتكاليف مختلفة والـ UCS.') : simulation.finished && simulation.cost === 4 ? feedback('success', 'UCS selected S → B → G: 3 + 1 = 4, instead of the route costing 9.', 'الـ UCS اختارت S ← B ← G: التكلفة 3 + 1 = 4، بدل المسار بتكلفة 9.') : feedback('pending', 'Continue until UCS removes the least-cost goal from the frontier.', 'كمّل لحد ما الـ UCS تسحب الهدف الأقل تكلفة من الـ Frontier.') },
    { id: 'bfs-cost', title: 'Expose the BFS cost limitation', titleAr: 'بيّن حدود الـ BFS مع التكلفة', goal: 'Use Weighted routes and BFS. Reach G and compare the cost of its two-edge route with the alternative route costing 4.', goalAr: 'استخدم المسارات بتكاليف مختلفة والـ BFS. وصل لـ G وقارن تكلفة مسارها من حافتين بالمسار البديل بتكلفة 4.', hint: 'BFS compares depth, not the edge weights. It generates G from A first.', hintAr: 'الـ BFS بتقارن العمق، مش أوزان الحواف. هي بتولّد G من A الأول.', start: () => { changePreset('weighted-routes'); setAlgorithm('ucs'); }, evaluate: () => presetId !== 'weighted-routes' || algorithm !== 'bfs' ? feedback('retry', 'Select BFS on Weighted routes.', 'اختار الـ BFS على المسارات بتكاليف مختلفة.') : simulation.finished && simulation.cost === 9 ? feedback('success', 'BFS found S → A → G: two edges, cost 9. Fewest edges does not guarantee least cost with unequal weights.', 'الـ BFS لقت S ← A ← G: حافتين بتكلفة 9. أقل عدد حواف مش ضمان لأقل تكلفة لما الأوزان تختلف.') : feedback('pending', 'Expand the frontier until BFS generates G.', 'وسّع الـ Frontier لحد ما الـ BFS تولّد G.') },
  ];

  const nodeClass = (nodeId: string) => {
    if (simulation.solution?.includes(nodeId)) return 'fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400';
    if (simulation.current === nodeId) return 'fill-amber-200 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400';
    if (frontierSet.has(nodeId)) return 'fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400';
    if (expandedSet.has(nodeId)) return 'fill-stone-200 stroke-stone-500 dark:fill-stone-800 dark:stroke-stone-500';
    return 'fill-[#FAF7F2] stroke-beige-400 dark:fill-stone-950 dark:stroke-stone-700';
  };

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><GitFork size={21} aria-hidden="true" /></span>
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Search Strategy Visualizer</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">شوف الـ Frontier وهي بتتحرك مع كل استراتيجية</ArabicText>
        </div>
      </header>

      <LabChallenge missions={missions} busy={playing} />
      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <h4 className="mb-2 font-semibold text-stone-900 dark:text-stone-100">Choose a search example</h4>
          <ArabicText className="mb-3 text-sm text-stone-600 dark:text-zinc-400">اختار مثال البحث</ArabicText>
          <div className="flex flex-wrap gap-2">
            {presets.map((item) => (
              <button key={item.id} type="button" aria-pressed={presetId === item.id} onClick={() => changePreset(item.id)} disabled={playing}
                className={`min-h-11 rounded-xl border px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${presetId === item.id ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800'}`}>
                {item.label}<ArabicText as="span" className={`mt-0.5 block text-xs font-normal ${presetId === item.id ? 'text-stone-200 dark:text-stone-600' : 'text-stone-600 dark:text-zinc-400'}`}>{item.labelAr}</ArabicText>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <h4 className="mb-2 font-semibold text-stone-900 dark:text-stone-100">Select a strategy</h4>
          <ArabicText className="mb-3 text-sm text-stone-600 dark:text-zinc-400">اختار استراتيجية</ArabicText>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Search strategy">
            {(Object.keys(algorithmDetails) as Algorithm[]).map((item) => (
              <button key={item} type="button" aria-pressed={algorithm === item} onClick={() => changeAlgorithm(item)} disabled={playing}
                className={`min-h-11 rounded-xl border px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${algorithm === item ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800'}`}>
                {item.toUpperCase()}<span className="sr-only"> — {algorithmDetails[item].label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {preset.costs && <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900 dark:bg-amber-950/20"><p className="text-sm text-stone-700 dark:text-zinc-300">Supplementary directed, acyclic routes. S → A costs 1; A → G costs 8; S → B costs 3; B → G costs 1. The frontier keeps separate paths to the same state. BFS tests on generation; UCS tests on removal. This example uses positive costs and does not model cycles.</p><ArabicText className="mt-2 text-sm text-stone-600 dark:text-zinc-400">مسارات إضافية موجّهة من غير دورات. من S لـ A التكلفة 1؛ ومن A لـ G التكلفة 8؛ ومن S لـ B التكلفة 3؛ ومن B لـ G التكلفة 1. الـ Frontier بتحتفظ بمسارات منفصلة لنفس الحالة. الـ BFS بتختبر وقت التوليد؛ والـ UCS وقت السحب. المثال فيه تكاليف موجبة ومش بيمثّل دورات.</ArabicText></div>}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setPlaying((value) => !value)} disabled={simulation.finished}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white">
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{playing ? 'Pause' : 'Auto play'}
          <span className="font-arabic">{playing ? 'إيقاف مؤقت' : 'تشغيل تلقائي'}</span>
        </button>
        <button type="button" onClick={() => setSimulation((current) => advanceSearch(current, preset, algorithm))} disabled={playing || simulation.finished}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-4 text-sm font-semibold text-stone-700 hover:bg-beige-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800">
          <StepForward size={16} aria-hidden="true" /> Step <span className="font-arabic">خطوة</span>
        </button>
        <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-4 text-sm font-semibold text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800">
          <RotateCcw size={16} aria-hidden="true" /> Reset <span className="font-arabic">إعادة</span>
        </button>
        <div className="ml-auto text-sm text-stone-600 dark:text-zinc-400">{algorithmDetails[algorithm].rule}<br /><ArabicText>{algorithmDetails[algorithm].ruleAr}</ArabicText></div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-beige-300 px-4 py-3 dark:border-stone-800">
          <div><p className="font-semibold text-stone-900 dark:text-stone-100">{preset.label}</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{preset.labelAr}</ArabicText></div>
          <p className="text-sm text-stone-600 dark:text-zinc-400">Expanded: {simulation.steps} · Goal: {preset.goalId}<br /><ArabicText as="span">تم توسيع: {simulation.steps} · الهدف: {preset.goalId}</ArabicText></p>
        </div>
        <LabWorkbench title="Search · frontier and expansion" motionKey={simulation.steps}
 nodes={preset.nodes.map<WorkbenchNode>(node => ({ id: node.id, label: node.id, kind: 'state', position: [(nodePosition(node, preset).x - (preset.costs ? 150 : 450)) / (preset.costs ? 42 : 80), 0, node.depth * 1.25 - 2.5], tone: simulation.solution?.includes(node.id) ? 'success' : simulation.current === node.id ? 'active' : frontierSet.has(node.id) ? 'info' : 'neutral', detail: `Depth ${node.depth}. ${simulation.solution?.includes(node.id) ? 'On the solution path.' : expandedSet.has(node.id) ? 'Expanded.' : frontierSet.has(node.id) ? 'Waiting in the frontier.' : 'Not yet discovered.'}`, detailAr: `العمق ${node.depth}. ${simulation.solution?.includes(node.id) ? 'على مسار الحل.' : expandedSet.has(node.id) ? 'اتوسّعت.' : frontierSet.has(node.id) ? 'مستنية في الـ Frontier.' : 'لسه ما اتكتشفتش.'}` }))}
 links={preset.nodes.flatMap(node => node.children.map<WorkbenchLink>(child => ({ id: `${node.id}-${child}`, from: node.id, to: child, label: `${node.id} → ${child} · cost ${edgeCost(preset, node.id, child)}`, tone: simulation.solution?.includes(node.id) && simulation.solution?.includes(child) ? 'success' : simulation.current === node.id ? 'active' : 'neutral', moving: playing && simulation.current === node.id })))}
>
<div className="overflow-x-auto p-3" aria-label="Scrollable search tree">
          <svg viewBox={preset.costs ? '0 0 300 260' : '0 0 900 430'} role="img" aria-label={`${preset.label}, current node ${simulation.current ?? 'none'}`} className={preset.costs ? 'mx-auto w-full min-w-[260px] max-w-sm' : 'mx-auto min-w-[620px] max-w-full'}>
            {preset.nodes.flatMap((node) => node.children.map((childId) => {
              const from = nodePosition(node, preset);
              const child = preset.nodes.find((item) => item.id === childId)!;
              const to = nodePosition(child, preset);
              const activeEdge = simulation.current === node.id && frontierSet.has(childId);
              const solutionEdge = simulation.solution?.some((id, index, path) => id === node.id && path[index + 1] === childId);
              return <g key={`${node.id}-${childId}`}><line x1={from.x} y1={from.y + 23} x2={to.x} y2={to.y - 23} className={`transition-colors duration-300 motion-reduce:transition-none ${solutionEdge ? 'stroke-emerald-500 dark:stroke-emerald-400' : activeEdge ? 'stroke-amber-500 dark:stroke-amber-400' : 'stroke-stone-300 dark:stroke-stone-700'}`} strokeWidth="2" />{preset.costs && <text x={(from.x + to.x) / 2 + 12} y={(from.y + to.y) / 2} className="fill-stone-700 text-base font-mono dark:fill-stone-300">{edgeCost(preset, node.id, childId)}</text>}</g>;
            }))}
            {preset.nodes.map((node) => {
              const position = nodePosition(node, preset);
              const isNext = next?.id === node.id;
              return (
                <g key={node.id} data-search-node={node.id} className="transition-transform duration-300 motion-reduce:transition-none">
                  {isNext && <circle cx={position.x} cy={position.y} r="29" className="fill-amber-100/80 dark:fill-amber-950/70 motion-safe:animate-pulse" />}
                  <circle cx={position.x} cy={position.y} r="22" className={`${nodeClass(node.id)} transition-colors duration-300 motion-reduce:transition-none`} strokeWidth="2" />
                  <text x={position.x} y={position.y + 5} textAnchor="middle" className={`fill-stone-900 font-semibold dark:fill-stone-100 ${preset.costs ? 'text-base' : 'text-sm'}`}>{node.id}</text>
                </g>
              );
            })}
          </svg>
        </div>
</LabWorkbench>
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-beige-300 px-4 py-3 dark:border-stone-800" aria-label="Search tree legend">
          {[
            ['bg-amber-200 dark:bg-amber-950', 'Current / next', 'الحالية / التالية'],
            ['bg-sky-100 dark:bg-sky-950', 'Frontier', 'الـ Frontier'],
            ['bg-stone-200 dark:bg-stone-800', 'Expanded', 'تم توسيعها'],
            ['bg-emerald-100 dark:bg-emerald-950', 'Goal path', 'مسار الهدف'],
          ].map(([color, en, ar]) => (
            <span key={en} className="inline-flex items-center gap-2 text-sm text-stone-700 dark:text-zinc-300">
              <span aria-hidden="true" className={`h-3.5 w-3.5 rounded-full border border-stone-400 dark:border-stone-500 ${color}`} />
              {en}<ArabicText as="span" className="text-stone-600 dark:text-zinc-400">{ar}</ArabicText>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-beige-300 p-4 dark:border-stone-800">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="font-bold text-stone-900 dark:text-stone-100">Frontier · next first</h4>
            {next && <p className="text-sm text-stone-600 dark:text-zinc-400">Expand <strong className="text-stone-900 dark:text-stone-100">{next.id}</strong> · g(n) = {next.cost}</p>}
          </div>
          <ArabicText className="mb-3 text-sm text-stone-600 dark:text-zinc-400">الـ Frontier · الاختيار الجاي الأول</ArabicText>
          <div className="flex flex-wrap gap-2" aria-live="polite" data-testid="search-frontier">
            {frontierOrder.length ? frontierOrder.map((item, index) => (
              <span key={`${item.id}-${index}`} className={`rounded-xl border px-3 py-2 text-sm transition-colors ${item === next ? 'border-amber-400 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200' : 'border-beige-300 bg-[#FAF7F2] text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-300'}`}>
                {item.id} <span className="text-stone-500 dark:text-zinc-400">g={item.cost}</span>
                {preset.costs && <span className="mt-1 block text-xs text-stone-600 dark:text-zinc-400">{item.path.join(' → ')}</span>}
              </span>
            )) : <p className="text-sm text-stone-600 dark:text-zinc-400">No nodes remain. <ArabicText as="span">مفيش عقد متبقية.</ArabicText></p>}
          </div>
        </div>
        <div aria-live="polite" className={`rounded-2xl border p-4 ${simulation.solution ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30' : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950'}`}>
          <div className="mb-2 flex items-center gap-2">
            {simulation.solution ? <CheckCircle2 size={18} className="text-emerald-700 dark:text-emerald-400" aria-hidden="true" /> : <ArrowRight size={18} className="text-stone-600 dark:text-zinc-400" aria-hidden="true" />}
            <h4 className="font-bold text-stone-900 dark:text-stone-100">{simulation.solution ? 'Goal found' : simulation.current ? `Expanded ${simulation.current}` : 'Ready to search'}</h4>
          </div>
          <ArabicText className="mb-2 text-sm text-stone-600 dark:text-zinc-400">{simulation.solution ? 'تم الوصول للهدف' : simulation.current ? `تم توسيع العقدة ${simulation.current}` : 'جاهز لبدء البحث'}</ArabicText>
          {simulation.solution ? (
            <p className="break-words text-sm font-semibold text-emerald-900 dark:text-emerald-200">Path: {simulation.solution.join(' → ')} · Cost: {simulation.cost}</p>
          ) : (
            <>
              <p className="text-sm text-stone-700 dark:text-zinc-300">Expanded order: {simulation.expanded.join(' → ') || '—'}</p>
              <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">ترتيب التوسيع: {simulation.expanded.join(' ← ') || '—'}</ArabicText>
            </>
          )}
          {simulation.solution && <ArabicText className="mt-1 text-sm text-emerald-900 dark:text-emerald-200">المسار: {simulation.solution.join(' ← ')} · التكلفة: {simulation.cost}</ArabicText>}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-beige-300 p-3 dark:border-stone-800"><p className="font-semibold text-stone-900 dark:text-stone-100">BFS · equal step costs</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">تضمن أقصر مسار بعدد الخطوات لو تكلفة الخطوات متساوية.</ArabicText></div>
        <div className="rounded-2xl border border-beige-300 p-3 dark:border-stone-800"><p className="font-semibold text-stone-900 dark:text-stone-100">DFS · branch depth</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">بتتبع فرع بعمق وبتستخدم ذاكرة أقل، لكنها مش مثالية.</ArabicText></div>
        <div className="rounded-2xl border border-beige-300 p-3 dark:border-stone-800"><p className="font-semibold text-stone-900 dark:text-stone-100">UCS · path cost</p><p className="mt-1 text-sm text-stone-700 dark:text-zinc-300">Equal costs give BFS-like frontier order. Unequal costs prioritize cumulative cost.</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">التكاليف المتساوية بتدي ترتيب Frontier شبه الـ BFS. التكاليف المختلفة بتدي الأولوية للتكلفة التراكمية.</ArabicText></div>
      </div>
    </section>
  );
}

export default SearchAlgorithmLab;

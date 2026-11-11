import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownAZ, CheckCircle2, DollarSign, Milestone, Pause, Play, RotateCcw, Route, StepForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabWorkbench, type WorkbenchLink, type WorkbenchNode } from './LabWorkbench';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

interface UcsNode {
  id: string;
  label: string;
  pos: [number, number, number];
}

interface UcsEdge {
  from: string;
  to: string;
  cost: number;
}

interface PqItem {
  id: string;
  cost: number;
  path: string[];
}

interface UcsPreset {
  id: string;
  title: string;
  titleAr: string;
  rootId: string;
  goalId: string;
  nodes: UcsNode[];
  edges: UcsEdge[];
  bfsSuboptimalNote: string;
  bfsSuboptimalNoteAr: string;
}

const UCS_PRESETS: Record<string, UcsPreset> = {
  'triangle-trap': {
    id: 'triangle-trap',
    title: 'Weighted Shortcut vs Cheaper Route (Slide p. 25)',
    titleAr: 'اختصار ثقيل مقابل مسار أرخص (سلايد ص 25)',
    rootId: 'S',
    goalId: 'G',
    bfsSuboptimalNote: 'BFS chooses S ➔ G (1 edge, cost 9). UCS finds S ➔ B ➔ G (2 edges, cost 4).',
    bfsSuboptimalNoteAr: 'الـ BFS بتختار S ← G (حافة واحدة، تكلفة 9). الـ UCS بتلاقي S ← B ← G (حافتين، تكلفة 4).',
    nodes: [
      { id: 'S', label: 'Start (S)', pos: [-3, 0, 0] },
      { id: 'A', label: 'Node A', pos: [-1, 0, -2] },
      { id: 'B', label: 'Node B', pos: [-0.5, 0, 2] },
      { id: 'C', label: 'Node C', pos: [1.5, 0, -1] },
      { id: 'G', label: 'Goal (G)', pos: [3, 0, 0] },
    ],
    edges: [
      { from: 'S', to: 'A', cost: 1 },
      { from: 'S', to: 'B', cost: 3 },
      { from: 'S', to: 'G', cost: 9 }, // Shallow but expensive trap
      { from: 'A', to: 'C', cost: 5 },
      { from: 'B', to: 'G', cost: 1 }, // S -> B -> G = 3 + 1 = 4
      { from: 'C', to: 'G', cost: 2 },
    ],
  },
  'romania-snippet': {
    id: 'romania-snippet',
    title: 'Romania Route: Arad to Bucharest (Slide p. 26, 33)',
    titleAr: 'طريق رومانيا: من أراد إلى بوخارست (سلايد ص 26، 33)',
    rootId: 'Arad',
    goalId: 'Bucharest',
    bfsSuboptimalNote: 'BFS chooses Arad ➔ Sibiu ➔ Fagaras ➔ Bucharest: 450 km (3 edges). UCS finds Arad ➔ Sibiu ➔ Rimnicu ➔ Pitesti ➔ Bucharest: 418 km (4 edges).',
    bfsSuboptimalNoteAr: 'الـ BFS بتختار أراد ← سيبيو ← فاغاراس ← بوخارست: 450 كم (3 حواف). الـ UCS بتلاقي أراد ← سيبيو ← ريمنيكو ← بيتيشتي ← بوخارست: 418 كم (4 حواف).',
    nodes: [
      { id: 'Arad', label: 'Arad', pos: [-3.5, 0, 0] },
      { id: 'Zerind', label: 'Zerind', pos: [-3.5, 0, -2] },
      { id: 'Timisoara', label: 'Timisoara', pos: [-3.5, 0, 2] },
      { id: 'Sibiu', label: 'Sibiu', pos: [-1, 0, 0] },
      { id: 'Fagaras', label: 'Fagaras', pos: [1, 0, -2] },
      { id: 'Rimnicu', label: 'Rimnicu Vilcea', pos: [1, 0, 1.5] },
      { id: 'Pitesti', label: 'Pitesti', pos: [2, 0, 1] },
      { id: 'Bucharest', label: 'Bucharest', pos: [3.5, 0, 0] },
    ],
    edges: [
      { from: 'Arad', to: 'Zerind', cost: 75 },
      { from: 'Arad', to: 'Timisoara', cost: 118 },
      { from: 'Arad', to: 'Sibiu', cost: 140 },
      { from: 'Sibiu', to: 'Fagaras', cost: 99 },
      { from: 'Sibiu', to: 'Rimnicu', cost: 80 },
      { from: 'Fagaras', to: 'Bucharest', cost: 211 }, // Total 140 + 99 + 211 = 450
      { from: 'Rimnicu', to: 'Pitesti', cost: 97 },
      { from: 'Pitesti', to: 'Bucharest', cost: 101 }, // Total 140 + 80 + 97 + 101 = 418
    ],
  },
};

export const UcsPriorityLab: React.FC = () => {
  const [presetKey, setPresetKey] = useState<string>('triangle-trap');
  const [pq, setPq] = useState<PqItem[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<PqItem | null>(null);
  const [solution, setSolution] = useState<{ path: string[]; cost: number } | null>(null);
  const [statusLog, setStatusLog] = useState<string>('Priority Queue initialized.');
  const [playing, setPlaying] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const preset = UCS_PRESETS[presetKey];

  const reset = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
    const rootItem: PqItem = {
      id: preset.rootId,
      cost: 0,
      path: [preset.rootId],
    };
    setPq([rootItem]);
    setExpandedNodes([]);
    setCurrentNode(null);
    setSolution(null);
    setStatusLog(`Priority Queue initialized with root ${preset.rootId} at g(n) = 0.`);
  };

  useEffect(() => {
    reset();
  }, [presetKey]);

  const stepUcs = () => {
    if (solution || pq.length === 0) {
      setPlaying(false);
      return;
    }

    // Min-Heap / Priority Queue: Sort by cumulative cost g(n)
    const sortedPq = [...pq].sort((a, b) => a.cost - b.cost);
    const selected = sortedPq.shift()!;
    setCurrentNode(selected);

    // CRITICAL UCS RULE: Goal test ONLY when removed from priority queue!
    if (selected.id === preset.goalId) {
      setSolution({ path: selected.path, cost: selected.cost });
      setStatusLog(`Goal ${selected.id} POPPED from Priority Queue with minimum cost g(n) = ${selected.cost}! Optimal solution confirmed.`);
      setPlaying(false);
      return;
    }

    const nextExpanded = [...expandedNodes, selected.id];
    setExpandedNodes(nextExpanded);

    // Expand outgoing edges
    const outgoing = preset.edges.filter(e => e.from === selected.id);
    const newItems: PqItem[] = [];

    outgoing.forEach(edge => {
      // If already expanded with lower cost, ignore (graph search rule)
      if (nextExpanded.includes(edge.to)) return;

      const newCost = selected.cost + edge.cost;
      const existingInPq = sortedPq.find(p => p.id === edge.to);

      if (existingInPq) {
        if (newCost < existingInPq.cost) {
          // Relax edge: replace with cheaper path
          existingInPq.cost = newCost;
          existingInPq.path = [...selected.path, edge.to];
        }
      } else {
        newItems.push({
          id: edge.to,
          cost: newCost,
          path: [...selected.path, edge.to],
        });
      }
    });

    const combinedPq = [...sortedPq, ...newItems].sort((a, b) => a.cost - b.cost);
    setPq(combinedPq);
    setStatusLog(`Expanded ${selected.id} (g=${selected.cost}). Relaxed ${outgoing.length} edges. Reordered Priority Queue by g(n).`);
  };

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      stepUcs();
    }, 950);
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [playing, pq, solution, expandedNodes]);

  const missions: ChallengeMission[] = [
    {
      id: 'ucs-removal-optimality',
      title: 'Observe Goal Test on Removal',
      titleAr: 'لاحظ اختبار الهدف عند السحب',
      goal: 'Run UCS on Triangle Trap. Notice that Goal G is generated early with cost 9, but waits in the priority queue until the optimal route (cost 4) is popped.',
      goalAr: 'شغّل UCS على مصيدة المثلث. لاحظ إن الهدف G اتولد بدري بتكلفة 9، لكنه فضل مستني في طابور الأولوية لحد ما اتسحب المسار الأرخص بتكلفة 4.',
      hint: 'Stopping when Goal G is generated would give cost 9. Goal testing on removal guarantees optimal cost 4.',
      hintAr: 'التوقف عند توليد الهدف هيدي تكلفة 9. اختبار الهدف عند السحب بيضمن الحل الأمثل بتكلفة 4.',
      start: () => {
        setPresetKey('triangle-trap');
        reset();
      },
      evaluate: () => {
        if (solution && solution.cost === 4) {
          return feedback('success', 'Optimal route verified! UCS returned S ➔ B ➔ G with cost 4, ignoring the 1-edge trap of cost 9.', 'تم تأكيد المسار الأمثل! الـ UCS اختارت S ← B ← G بتكلفة 4، وتجاهلت الفخ ذا التكلفة 9.');
        }
        return feedback('pending', 'Advance UCS until Goal G is removed from the Priority Queue.', 'كمّل خطوات UCS لحد سحب الهدف G من طابور الأولوية.');
      },
    },
    {
      id: 'romania-ucs-418',
      title: 'Find Romania 418 km Optimal Route',
      titleAr: 'اعثر على مسار رومانيا الأمثل بـ 418 كم',
      goal: 'Switch to Romania Route and run UCS to reach Bucharest with optimal cost 418 km instead of BFS 450 km.',
      goalAr: 'بدّل لمسار رومانيا وشغّل UCS للوصول لبوخارست بأقل تكلفة 418 كم بدل 450 كم للـ BFS.',
      hint: 'The 418 km route has 4 hops (Arad ➔ Sibiu ➔ Rimnicu ➔ Pitesti ➔ Bucharest), while the 450 km route has only 3 hops.',
      hintAr: 'مسار 418 كم بيتكون من 4 محطات، بينما مسار 450 كم بيتكون من 3 محطات بس لكن تكلفته أعلى.',
      start: () => {
        setPresetKey('romania-snippet');
        reset();
      },
      evaluate: () => {
        if (solution && solution.cost === 418) {
          return feedback('success', 'Romania 418 km route found! 4 hops beats 3 hops in cumulative cost.', 'تم العثور على مسار 418 كم! 4 محطات بتكلفة أقل غلبت مسار الـ 3 محطات.');
        }
        return feedback('pending', 'Advance UCS until Bucharest is reached.', 'كمّل البحث لحد الوصول لبوخارست.');
      },
    },
  ];

  // 3D Workbench Nodes
  const workbenchNodes: WorkbenchNode[] = preset.nodes.map(n => {
    const isGoal = n.id === preset.goalId;
    const isStart = n.id === preset.rootId;
    const isExpanded = expandedNodes.includes(n.id);
    const inPq = pq.find(p => p.id === n.id);
    const isCurrent = currentNode?.id === n.id;
    const onSolution = solution?.path.includes(n.id);

    // Elevate 3D node vertically based on cost g(n) for spatial comparison
    const costG = inPq ? inPq.cost : isExpanded ? (currentNode?.id === n.id ? currentNode.cost : 0) : 0;
    const elevation = isStart ? 0 : Math.min(2.5, costG * (presetKey === 'triangle-trap' ? 0.3 : 0.006));

    return {
      id: n.id,
      label: `${n.label}${inPq ? ` (g=${inPq.cost})` : ''}`,
      kind: 'state',
      position: [n.pos[0], elevation, n.pos[2]],
      tone: onSolution ? 'success' : isCurrent ? 'active' : inPq ? 'info' : isExpanded ? 'neutral' : 'neutral',
      detail: `Cumulative cost g(n) = ${costG}. ${isExpanded ? 'Expanded.' : inPq ? 'In Priority Queue.' : 'Unvisited.'}`,
      detailAr: `تكلفة المسار g(n) = ${costG}. ${isExpanded ? 'تم التوسيع.' : inPq ? 'في طابور الأولوية.' : 'لم يتم الوصول.'}`,
    };
  });

  const workbenchLinks: WorkbenchLink[] = preset.edges.map(e => {
    const isSolutionEdge = solution?.path.some((nodeId, idx, arr) => nodeId === e.from && arr[idx + 1] === e.to);
    return {
      id: `${e.from}-${e.to}`,
      from: e.from,
      to: e.to,
      label: `cost ${e.cost}`,
      tone: isSolutionEdge ? 'success' : 'neutral',
      moving: playing && currentNode?.id === e.from,
    };
  });

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="ucs-priority-title">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            <Route size={22} aria-hidden="true" />
          </span>
          <div>
            <h3 id="ucs-priority-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Uniform Cost Search (UCS): Priority Queue Studio
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
              معمل البحث الأقل تكلفة في مشهد ثلاثي الأبعاد: طابور الأولوية، وتراكم تكاليف المسارات، واختبار الهدف عند السحب.
            </ArabicText>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-beige-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-[#FAF7F2] dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reset
        </button>
      </header>

      <LabChallenge missions={missions} busy={playing} />

      {/* Preset Selector */}
      <div className="mb-5 grid grid-cols-1 gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-2">
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          Weighted Graph Example
          <select
            value={presetKey}
            onChange={e => setPresetKey(e.target.value)}
            disabled={playing}
            className="mt-1 w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          >
            {Object.keys(UCS_PRESETS).map(key => (
              <option key={key} value={key}>
                {UCS_PRESETS[key].title}
              </option>
            ))}
          </select>
        </label>
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-2.5 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-200">
          <span className="font-bold">BFS vs UCS Contrast:</span>
          <p className="mt-0.5">{preset.bfsSuboptimalNote}</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setPlaying(p => !p)}
          disabled={!!solution || pq.length === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          <span>{playing ? 'Pause' : 'Auto Play'}</span>
        </button>
        <button
          type="button"
          onClick={stepUcs}
          disabled={playing || !!solution || pq.length === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-4 text-sm font-semibold text-stone-700 hover:bg-beige-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800"
        >
          <StepForward size={16} />
          <span>Step (Extract-Min & Relax)</span>
        </button>
        <div className="ml-auto text-xs font-mono text-stone-500">
          Expanded: <strong>{expandedNodes.length}</strong> | PQ Size: <strong>{pq.length}</strong>
        </div>
      </div>

      {/* 3D Workbench Scene */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950">
        <div className="border-b border-beige-300 px-4 py-2.5 text-xs font-semibold text-stone-800 dark:border-stone-800 dark:text-stone-200 flex justify-between">
          <span>3D Spatial Cost Scene (Height corresponds to cumulative cost g(n))</span>
          <span className="font-mono text-stone-500">Goal: {preset.goalId}</span>
        </div>
        <LabWorkbench
          title="Uniform Cost Search Scene"
          nodes={workbenchNodes}
          links={workbenchLinks}
          motionKey={expandedNodes.length}
        >
          <div className="p-3 text-center text-xs text-stone-500">
            Rotate and orbit the 3D graph above. Notice how high-cost nodes elevate above low-cost nodes.
          </div>
        </LabWorkbench>
      </div>

      {/* Dynamic Priority Queue (Min-Heap / Sorted Order) Component */}
      <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50/50 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
            Dynamic Priority Queue (Sorted by g(n) Ascending)
          </span>
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400">
            Left = Minimum g(n) (Pop Next)
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          {pq.length === 0 ? (
            <div className="text-xs italic text-stone-500">Priority Queue is empty.</div>
          ) : (
            pq.map((item, idx) => {
              const isMin = idx === 0;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  className={`flex flex-col items-center rounded-xl border px-3.5 py-2 transition-all shrink-0 ${
                    isMin
                      ? 'border-amber-500 bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-950/60'
                      : 'border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-stone-900 dark:text-stone-100">
                    <span>{item.id}</span>
                  </div>
                  <span className="mt-0.5 rounded bg-amber-200/80 px-1.5 py-0.5 font-mono text-xs font-bold text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                    g = {item.cost}
                  </span>
                  <span className="mt-1 font-mono text-[10px] text-stone-500">
                    {item.path.join('➔')}
                  </span>
                  {isMin && <span className="mt-1 text-[9px] font-bold text-amber-700 uppercase">Min Cost</span>}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Solution Banner */}
      <div
        className={`rounded-2xl border p-4 ${
          solution
            ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
            : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950'
        }`}
      >
        <div className="flex items-center gap-2">
          {solution ? (
            <CheckCircle2 size={18} className="text-emerald-700 dark:text-emerald-400" />
          ) : (
            <Milestone size={18} className="text-stone-600 dark:text-zinc-400" />
          )}
          <h4 className="font-bold text-stone-900 dark:text-stone-100">
            {solution ? 'Optimal Solution Found by UCS!' : 'UCS Search Status'}
          </h4>
        </div>
        <p className="mt-1 text-sm text-stone-700 dark:text-zinc-300">{statusLog}</p>
        {solution && (
          <div className="mt-2 font-mono text-sm font-bold text-emerald-800 dark:text-emerald-300">
            Least Cost Path: {solution.path.join(' ➔ ')} (Total Cost: {solution.cost})
          </div>
        )}
      </div>
    </section>
  );
};

export default UcsPriorityLab;

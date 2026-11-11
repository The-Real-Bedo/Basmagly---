import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, FastForward, Layers, ListOrdered, Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

interface TreeNode {
  id: string;
  depth: number;
  children: string[];
}

interface QueueItem {
  id: string;
  depth: number;
  parent: string | null;
  path: string[];
}

interface BfsPreset {
  id: string;
  title: string;
  titleAr: string;
  rootId: string;
  goalId: string;
  nodes: Record<string, TreeNode>;
}

const PRESETS: Record<string, BfsPreset> = {
  'binary-15': {
    id: 'binary-15',
    title: 'Binary Tree 1–15 (Slide p. 11–23)',
    titleAr: 'الشجرة الثنائية 1–15 (سلايد ص 11–23)',
    rootId: '1',
    goalId: '13',
    nodes: Array.from({ length: 15 }, (_, i) => {
      const id = String(i + 1);
      const left = i * 2 + 1 < 15 ? String(i * 2 + 2) : null;
      const right = i * 2 + 2 < 15 ? String(i * 2 + 3) : null;
      return {
        id,
        depth: Math.floor(Math.log2(i + 1)),
        children: [left, right].filter(Boolean) as string[],
      };
    }).reduce((acc, n) => ({ ...acc, [n.id]: n }), {}),
  },
  'lecture4-tree': {
    id: 'lecture4-tree',
    title: 'Lecture 4 DAG Tree (Slide p. 36)',
    titleAr: 'شجرة المحاضرة 4 (سلايد ص 36)',
    rootId: 'A',
    goalId: 'O',
    nodes: {
      A: { id: 'A', depth: 0, children: ['B', 'C', 'D', 'E'] },
      B: { id: 'B', depth: 1, children: ['F', 'G'] },
      C: { id: 'C', depth: 1, children: ['H'] },
      D: { id: 'D', depth: 1, children: ['I', 'J'] },
      E: { id: 'E', depth: 1, children: [] }, // dead end
      F: { id: 'F', depth: 2, children: [] },
      G: { id: 'G', depth: 2, children: ['K', 'L'] },
      H: { id: 'H', depth: 2, children: [] },
      I: { id: 'I', depth: 2, children: ['M'] },
      J: { id: 'J', depth: 2, children: ['N'] },
      K: { id: 'K', depth: 3, children: [] },
      L: { id: 'L', depth: 3, children: ['O'] },
      M: { id: 'M', depth: 3, children: [] },
      N: { id: 'N', depth: 3, children: [] },
      O: { id: 'O', depth: 4, children: [] },
    },
  },
};

export const BfsQueueLab: React.FC = () => {
  const [presetKey, setPresetKey] = useState<string>('binary-15');
  const [goalTestTiming, setGoalTestTiming] = useState<'generation' | 'removal'>('generation');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [dequeuedHistory, setDequeuedHistory] = useState<QueueItem[]>([]);
  const [currentNode, setCurrentNode] = useState<QueueItem | null>(null);
  const [solutionPath, setSolutionPath] = useState<string[] | null>(null);
  const [maxQueueSize, setMaxQueueSize] = useState<number>(1);
  const [stepCount, setStepCount] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [recentAction, setRecentAction] = useState<string>('Queue initialized with root');
  const timerRef = useRef<number | null>(null);

  const preset = PRESETS[presetKey];

  const reset = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
    const rootItem: QueueItem = {
      id: preset.rootId,
      depth: 0,
      parent: null,
      path: [preset.rootId],
    };
    setQueue([rootItem]);
    setDequeuedHistory([]);
    setCurrentNode(null);
    setSolutionPath(null);
    setMaxQueueSize(1);
    setStepCount(0);
    setRecentAction(`Initialized queue with root ${preset.rootId}`);
  };

  useEffect(() => {
    reset();
  }, [presetKey, goalTestTiming]);

  const stepBfs = () => {
    if (solutionPath || queue.length === 0) {
      setPlaying(false);
      return;
    }

    const nextQueue = [...queue];
    const item = nextQueue.shift()!;
    setCurrentNode(item);
    const nextHistory = [...dequeuedHistory, item];
    setDequeuedHistory(nextHistory);
    setStepCount(s => s + 1);

    // Goal test on removal check
    if (goalTestTiming === 'removal' && item.id === preset.goalId) {
      setSolutionPath(item.path);
      setRecentAction(`Goal ${item.id} DEQUEUED from front of FIFO queue! Solution found.`);
      setPlaying(false);
      return;
    }

    const nodeData = preset.nodes[item.id];
    const children = nodeData ? nodeData.children : [];
    const newItems: QueueItem[] = children.map(childId => ({
      id: childId,
      depth: item.depth + 1,
      parent: item.id,
      path: [...item.path, childId],
    }));

    // Goal test on generation check (standard BFS optimization)
    if (goalTestTiming === 'generation') {
      const goalChild = newItems.find(it => it.id === preset.goalId);
      if (goalChild) {
        setQueue([...nextQueue, ...newItems]);
        setMaxQueueSize(Math.max(maxQueueSize, nextQueue.length + newItems.length));
        setSolutionPath(goalChild.path);
        setRecentAction(`Goal ${goalChild.id} GENERATED and enqueued! Goal test on generation succeeded.`);
        setPlaying(false);
        return;
      }
    }

    const updatedQueue = [...nextQueue, ...newItems];
    setQueue(updatedQueue);
    setMaxQueueSize(Math.max(maxQueueSize, updatedQueue.length));
    setRecentAction(`Dequeued ${item.id} (depth ${item.depth}). Enqueued ${newItems.length} children [${children.join(', ')}] at tail.`);
  };

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      stepBfs();
    }, 800);
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [playing, queue, solutionPath, maxQueueSize, goalTestTiming]);

  const missions: ChallengeMission[] = [
    {
      id: 'level-order-invariance',
      title: 'Verify Level-by-Level Expansion',
      titleAr: 'تأكد من التوسيع مستوى بمستوى',
      goal: 'Step through the binary tree until all depth-1 nodes (2 and 3) are dequeued before any depth-2 node is dequeued.',
      goalAr: 'امشي بالـ Step في الشجرة الثنائية لحد ما كل عقد المستوى 1 (2 و3) تتسحب قبل أي عقدة من المستوى 2.',
      hint: 'FIFO order ensures every node at depth d leaves the queue before any node at depth d+1 can reach the front.',
      hintAr: 'ترتيب FIFO بيضمن إن كل عقدة في العمق d تخرج من الطابور قبل ما أي عقدة في العمق d+1 توصل للمقدمة.',
      start: () => {
        setPresetKey('binary-15');
        reset();
      },
      evaluate: () => {
        const dequeuedIds = dequeuedHistory.map(h => h.id);
        if (dequeuedIds.includes('2') && dequeuedIds.includes('3') && !dequeuedIds.some(id => ['4', '5', '6', '7'].includes(id))) {
          return feedback('success', 'Level 1 exhausted first! Nodes 2 and 3 dequeued before any Level 2 node.', 'تم إنهاء المستوى 1 أولاً! العقدتان 2 و3 تم سحبهما قبل أي عقدة من المستوى 2.');
        }
        return dequeuedIds.length > 3 ? feedback('success', 'FIFO property verified: strictly level-by-level.', 'تم إثبات خاصية FIFO: التوسع مستوى بمستوى بدقة.') : feedback('pending', 'Step through until nodes 2 and 3 are dequeued.', 'اضغط خطوة لحد ما يتم سحب العقدتين 2 و3.');
      },
    },
    {
      id: 'fifo-tail-expansion',
      title: 'Observe Frontier Peak (Max Space)',
      titleAr: 'راقب قمة طابور الـ Frontier (أقصى ذاكرة)',
      goal: 'Reach the goal on Binary Tree 1–15 and observe how the queue width grows exponentially: O(b^d).',
      goalAr: 'اوصل للهدف في الشجرة الثنائية 1–15 وشوف إزاي عرض الطابور بينمو أسياً: O(b^d).',
      hint: 'Notice that the queue holds the entire active tier of siblings awaiting expansion.',
      hintAr: 'لاحظ إن الطابور بيحتفظ بطبقة كاملة من الإخوة المنتظرين للتوسيع.',
      start: () => {
        setPresetKey('binary-15');
        reset();
      },
      evaluate: () => {
        if (solutionPath) {
          return feedback('success', `Goal reached! Peak queue size was ${maxQueueSize} nodes in memory.`, `تم الوصول للهدف! أقصى حجم للطابور كان ${maxQueueSize} عقد في الذاكرة.`);
        }
        return feedback('pending', 'Advance BFS until goal is found.', 'تابع خطوات البحث بالعرض لحد العثور على الهدف.');
      },
    },
  ];

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="bfs-queue-title">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            <ListOrdered size={22} aria-hidden="true" />
          </span>
          <div>
            <h3 id="bfs-queue-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">
              BFS Queue Studio: First-In, First-Out (FIFO)
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
              معمل فحص طابور FIFO: الدخول من الخلف والسحب من المقدمة والتوسيع مستوى بمستوى.
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

      {/* Preset & Configuration Bar */}
      <div className="mb-5 grid grid-cols-1 gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-2">
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          Search Graph / Tree Example
          <select
            value={presetKey}
            onChange={e => setPresetKey(e.target.value)}
            disabled={playing}
            className="mt-1 w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          >
            {Object.keys(PRESETS).map(key => (
              <option key={key} value={key}>
                {PRESETS[key].title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          Goal Test Timing Rule
          <select
            value={goalTestTiming}
            onChange={e => setGoalTestTiming(e.target.value as any)}
            disabled={playing}
            className="mt-1 w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          >
            <option value="generation">Goal test on generation (Russell & Norvig / Lecture 4 standard)</option>
            <option value="removal">Goal test on removal (Tests when dequeued from head)</option>
          </select>
        </label>
      </div>

      {/* Controls Bar */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setPlaying(p => !p)}
          disabled={!!solutionPath || queue.length === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          <span>{playing ? 'Pause' : 'Auto Play'}</span>
        </button>
        <button
          type="button"
          onClick={stepBfs}
          disabled={playing || !!solutionPath || queue.length === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-4 text-sm font-semibold text-stone-700 hover:bg-beige-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800"
        >
          <StepForward size={16} />
          <span>Step (Dequeue & Expand)</span>
        </button>
        <span className="ml-auto text-xs font-mono text-stone-500 dark:text-zinc-400">
          Steps: <strong>{stepCount}</strong> | Current Queue: <strong>{queue.length}</strong> | Max Space: <strong>{maxQueueSize}</strong>
        </span>
      </div>

      {/* Physical FIFO Queue Visualization Container */}
      <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50/50 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
            Physical FIFO Queue Buffer (Frontier)
          </span>
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400">
            Left = Head (Pop Next) | Right = Tail (Push Children)
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto py-3">
          <div className="rounded-xl border border-dashed border-amber-400 px-2 py-3 text-center text-xs font-bold text-amber-800 dark:text-amber-300 shrink-0">
            HEAD ⬅
          </div>
          {queue.length === 0 ? (
            <div className="p-3 text-sm italic text-stone-500">Queue is empty (no frontier nodes).</div>
          ) : (
            queue.map((item, idx) => {
              const isHead = idx === 0;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  className={`flex flex-col items-center justify-center rounded-xl border px-4 py-2.5 shadow-sm transition-all shrink-0 ${
                    isHead
                      ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/60 dark:border-amber-400 ring-2 ring-amber-400'
                      : 'border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-800'
                  }`}
                >
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">{item.id}</span>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-zinc-400">Depth {item.depth}</span>
                  {item.parent && <span className="text-[10px] text-stone-400 dark:text-zinc-500">From {item.parent}</span>}
                  {isHead && <span className="mt-1 rounded bg-amber-500 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase">Next</span>}
                </div>
              );
            })
          )}
          <div className="rounded-xl border border-dashed border-amber-400 px-2 py-3 text-center text-xs font-bold text-amber-800 dark:text-amber-300 shrink-0">
            ⬅ TAIL
          </div>
        </div>
        <p className="mt-2 text-xs text-stone-600 dark:text-zinc-400">
          Notice: Newly generated children enter at the <strong>TAIL (Right)</strong>, waiting until all earlier nodes in the queue are dequeued from the <strong>HEAD (Left)</strong>.
        </p>
      </div>

      {/* Level-by-Level Tier Status */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map(depth => {
          const nodesAtDepth = Object.values(preset.nodes).filter(n => n.depth === depth);
          const dequeuedAtDepth = dequeuedHistory.filter(h => h.depth === depth);
          const inQueueAtDepth = queue.filter(q => q.depth === depth);
          const isCurrentDepth = currentNode?.depth === depth;
          return (
            <div
              key={depth}
              className={`rounded-2xl border p-3 ${
                isCurrentDepth
                  ? 'border-amber-400 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-950/30'
                  : 'border-beige-200 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 dark:text-zinc-200">Level {depth}</span>
                <span className="font-mono text-[11px] text-stone-500">Total: {nodesAtDepth.length}</span>
              </div>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                  <span>Expanded:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{dequeuedAtDepth.length}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                  <span>In Queue:</span>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{inQueueAtDepth.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status & Solution Card */}
      <div
        className={`rounded-2xl border p-4 ${
          solutionPath
            ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
            : 'border-beige-300 bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-950'
        }`}
      >
        <div className="flex items-center gap-2">
          {solutionPath ? (
            <CheckCircle2 size={18} className="text-emerald-700 dark:text-emerald-400" />
          ) : (
            <Layers size={18} className="text-amber-700 dark:text-amber-400" />
          )}
          <h4 className="font-bold text-stone-900 dark:text-stone-100">
            {solutionPath ? `Goal ${preset.goalId} Found!` : 'Search In Progress'}
          </h4>
        </div>
        <p className="mt-1 text-sm text-stone-700 dark:text-zinc-300">{recentAction}</p>
        {solutionPath && (
          <div className="mt-2 font-mono text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            Optimal Path: {solutionPath.join(' ➔ ')} (Length: {solutionPath.length - 1} edges)
          </div>
        )}
      </div>
    </section>
  );
};

export default BfsQueueLab;

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, CheckCircle2, CornerDownRight, Database, Pause, Play, RotateCcw, StepForward, Undo2 } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

interface StackFrame {
  id: string;
  depth: number;
  childIndex: number;
  totalChildren: number;
  path: string[];
}

interface DfsPreset {
  id: string;
  title: string;
  titleAr: string;
  rootId: string;
  goalId: string;
  nodes: Record<string, { id: string; children: string[]; isDeadEnd?: boolean }>;
}

const DFS_PRESETS: Record<string, DfsPreset> = {
  'lecture4-deadends': {
    id: 'lecture4-deadends',
    title: 'Lecture 4 Tree with Dead Ends (Slide p. 36)',
    titleAr: 'شجرة المحاضرة 4 مع النهايات المغلقة (سلايد ص 36)',
    rootId: 'A',
    goalId: 'O',
    nodes: {
      A: { id: 'A', children: ['B', 'C', 'D', 'E'] },
      B: { id: 'B', children: ['F', 'G'] },
      C: { id: 'C', children: ['H'] },
      D: { id: 'D', children: ['I', 'J'] },
      E: { id: 'E', children: [], isDeadEnd: true }, // Immediate dead end
      F: { id: 'F', children: [], isDeadEnd: true }, // Immediate dead end
      G: { id: 'G', children: ['K', 'L'] },
      H: { id: 'H', children: [], isDeadEnd: true }, // Immediate dead end
      I: { id: 'I', children: ['M'] },
      J: { id: 'J', children: ['N'] },
      K: { id: 'K', children: [], isDeadEnd: true },
      L: { id: 'L', children: ['O'] },
      M: { id: 'M', children: [], isDeadEnd: true },
      N: { id: 'N', children: [], isDeadEnd: true },
      O: { id: 'O', children: [] },
    },
  },
  'binary-15': {
    id: 'binary-15',
    title: 'Binary Tree 1–15 (Goal 11)',
    titleAr: 'الشجرة الثنائية 1–15 (هدف 11)',
    rootId: '1',
    goalId: '11',
    nodes: Array.from({ length: 15 }, (_, i) => {
      const id = String(i + 1);
      const left = i * 2 + 1 < 15 ? String(i * 2 + 2) : null;
      const right = i * 2 + 2 < 15 ? String(i * 2 + 3) : null;
      return {
        id,
        children: [left, right].filter(Boolean) as string[],
        isDeadEnd: i >= 7,
      };
    }).reduce((acc, n) => ({ ...acc, [n.id]: n }), {}),
  },
};

export const DfsStackLab: React.FC = () => {
  const [presetKey, setPresetKey] = useState<string>('lecture4-deadends');
  const [stack, setStack] = useState<StackFrame[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [backtrackedNodes, setBacktrackedNodes] = useState<string[]>([]);
  const [currentActionState, setCurrentActionState] = useState<'idle' | 'descending' | 'backtracking' | 'found'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('Stack initialized.');
  const [solutionPath, setSolutionPath] = useState<string[] | null>(null);
  const [maxStackDepth, setMaxStackDepth] = useState<number>(1);
  const [playing, setPlaying] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const preset = DFS_PRESETS[presetKey];

  const reset = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
    const rootNode = preset.nodes[preset.rootId];
    const initialFrame: StackFrame = {
      id: preset.rootId,
      depth: 0,
      childIndex: 0,
      totalChildren: rootNode ? rootNode.children.length : 0,
      path: [preset.rootId],
    };
    setStack([initialFrame]);
    setVisitedNodes([preset.rootId]);
    setBacktrackedNodes([]);
    setCurrentActionState('idle');
    setSolutionPath(null);
    setMaxStackDepth(1);
    setStatusMessage(`Root ${preset.rootId} pushed to LIFO Call Stack.`);
  };

  useEffect(() => {
    reset();
  }, [presetKey]);

  const stepDfs = () => {
    if (solutionPath || stack.length === 0) {
      setPlaying(false);
      return;
    }

    const currentStack = [...stack];
    const top = currentStack[currentStack.length - 1];

    // Goal test on top of stack
    if (top.id === preset.goalId) {
      setSolutionPath(top.path);
      setCurrentActionState('found');
      setStatusMessage(`Goal node ${top.id} reached! Path: ${top.path.join(' ➔ ')}`);
      setPlaying(false);
      return;
    }

    const nodeData = preset.nodes[top.id];
    const children = nodeData ? nodeData.children : [];

    // If node has unexplored children, push the next child (Descend)
    if (top.childIndex < children.length) {
      const nextChildId = children[top.childIndex];
      top.childIndex += 1; // Advance child pointer on current frame

      const nextChildData = preset.nodes[nextChildId];
      const newFrame: StackFrame = {
        id: nextChildId,
        depth: top.depth + 1,
        childIndex: 0,
        totalChildren: nextChildData ? nextChildData.children.length : 0,
        path: [...top.path, nextChildId],
      };

      currentStack.push(newFrame);
      setStack(currentStack);
      setMaxStackDepth(Math.max(maxStackDepth, currentStack.length));
      setVisitedNodes(prev => (prev.includes(nextChildId) ? prev : [...prev, nextChildId]));
      setCurrentActionState('descending');
      setStatusMessage(`Pushed ${nextChildId} (child of ${top.id}) to stack. Descending deeper into branch.`);
    } else {
      // No more children -> Backtrack (Pop frame from stack)
      const popped = currentStack.pop()!;
      setStack(currentStack);
      setBacktrackedNodes(prev => [...prev, popped.id]);
      setCurrentActionState('backtracking');
      const returningTo = currentStack.length > 0 ? currentStack[currentStack.length - 1].id : 'None';
      setStatusMessage(`All children of ${popped.id} exhausted. Backtracking: Popped ${popped.id} from stack, returning to ${returningTo}.`);
    }
  };

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      stepDfs();
    }, 850);
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [playing, stack, solutionPath, maxStackDepth]);

  const missions: ChallengeMission[] = [
    {
      id: 'observe-backtracking',
      title: 'Observe Dead-End Backtracking',
      titleAr: 'راقب التراجع عند نهاية مغلقة',
      goal: 'Run DFS on Lecture 4 tree until Node F (dead end) is popped and the stack backtracks to Node B.',
      goalAr: 'شغّل DFS على شجرة المحاضرة 4 لحد ما العقدة F (نهاية مغلقة) تتشال ويرجع المكدس للعقدة B.',
      hint: 'In LIFO search, exhausting a node triggers a pop from the top of the stack without exploring siblings of ancestors yet.',
      hintAr: 'في بحث LIFO، استنفاد العقدة بيؤدي لسحبها من قمة المكدس والتراجع للأب المباشر.',
      start: () => {
        setPresetKey('lecture4-deadends');
        reset();
      },
      evaluate: () => {
        if (backtrackedNodes.includes('F')) {
          return feedback('success', 'Backtracking witnessed! Node F reached dead end and popped back to B.', 'تمت ملاحظة التراجع! العقدة F وصلت لطريق مسدود وتراجع المكدس للعقدة B.');
        }
        return feedback('pending', 'Step until Node F is popped during backtracking.', 'اضغط خطوة لحد ما يحصل تراجع من العقدة F.');
      },
    },
    {
      id: 'stack-memory-bound',
      title: 'Verify Linear Space Bound O(bm)',
      titleAr: 'تأكد من قيد الذاكرة الخطي O(bm)',
      goal: 'Reach Goal O and notice that peak stack height is only 5 frames, despite exploring multiple nodes.',
      goalAr: 'اوصل للهدف O ولاحظ إن أقصى عمق للمكدس هو 5 إطارات بس، رغم استكشاف عدة عقد.',
      hint: 'DFS stores only the active path and sibling pointers, maintaining linear memory O(bm).',
      hintAr: 'الـ DFS بتخزن بس المسار الفعال وإشارات الإخوة، فبتحافظ على ذاكرة خطية O(bm).',
      start: () => {
        setPresetKey('lecture4-deadends');
        reset();
      },
      evaluate: () => {
        if (solutionPath) {
          return feedback('success', `Verified: Reached goal with peak stack height of only ${maxStackDepth} frames!`, `تم التأكيد: وصلنا للهدف بأقصى ارتفاع للمكدس ${maxStackDepth} إطارات فقط!`);
        }
        return feedback('pending', 'Continue stepping DFS until Goal O is found.', 'كمّل خطوات DFS لحد الوصول للهدف O.');
      },
    },
  ];

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="dfs-stack-title">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            <Database size={22} aria-hidden="true" />
          </span>
          <div>
            <h3 id="dfs-stack-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">
              DFS Stack & Backtracking Studio: Last-In, First-Out (LIFO)
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
              معمل مكدس LIFO والتراجع: النزول في عمق الفرع، والتراجع عند الطرق المسدودة، وحفظ الذاكرة خطياً.
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
      <div className="mb-5 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          Search Graph / Tree Example
          <select
            value={presetKey}
            onChange={e => setPresetKey(e.target.value)}
            disabled={playing}
            className="mt-1 w-full rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          >
            {Object.keys(DFS_PRESETS).map(key => (
              <option key={key} value={key}>
                {DFS_PRESETS[key].title}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Controls Bar */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setPlaying(p => !p)}
          disabled={!!solutionPath || stack.length === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          <span>{playing ? 'Pause' : 'Auto Play'}</span>
        </button>
        <button
          type="button"
          onClick={stepDfs}
          disabled={playing || !!solutionPath || stack.length === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 px-4 text-sm font-semibold text-stone-700 hover:bg-beige-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-zinc-300 dark:hover:bg-stone-800"
        >
          <StepForward size={16} />
          <span>Step (Push / Backtrack)</span>
        </button>
        <div className="ml-auto flex items-center gap-3 text-xs font-mono">
          <span className="text-stone-600 dark:text-zinc-400">
            Current Stack Depth: <strong>{stack.length}</strong>
          </span>
          <span className="text-amber-700 dark:text-amber-400 font-bold">
            Peak Depth (Max O(bm)): <strong>{maxStackDepth}</strong>
          </span>
        </div>
      </div>

      {/* Action Banner */}
      <div
        className={`mb-5 flex items-center gap-2 rounded-2xl border p-3.5 text-xs transition-all ${
          currentActionState === 'backtracking'
            ? 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200'
            : currentActionState === 'descending'
            ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
            : currentActionState === 'found'
            ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
            : 'border-beige-300 bg-[#FAF7F2] text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-zinc-300'
        }`}
      >
        {currentActionState === 'backtracking' && <Undo2 size={16} className="text-rose-600 shrink-0" />}
        {currentActionState === 'descending' && <ArrowDown size={16} className="text-amber-600 shrink-0" />}
        {currentActionState === 'found' && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
        <span className="font-semibold">{statusMessage}</span>
      </div>

      {/* Vertical Call Stack Component */}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2 dark:border-stone-800">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              LIFO Call Stack (Memory Model)
            </span>
            <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400">
              TOP ⬆ (Push/Pop here)
            </span>
          </div>

          <div className="flex flex-col-reverse gap-2">
            {stack.length === 0 ? (
              <div className="p-4 text-center text-xs italic text-stone-500">Stack is empty.</div>
            ) : (
              stack.map((frame, index) => {
                const isTop = index === stack.length - 1;
                return (
                  <div
                    key={`${frame.id}-${index}`}
                    className={`rounded-xl border p-3 transition-all ${
                      isTop
                        ? 'border-amber-500 bg-amber-100/90 dark:border-amber-400 dark:bg-amber-950/60 ring-2 ring-amber-400'
                        : 'border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                          Frame #{index}: Node {frame.id}
                        </span>
                        {isTop && (
                          <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                            Active Top
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-stone-500 dark:text-zinc-400">Depth {frame.depth}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-stone-600 dark:text-zinc-400">
                      <span>Explored: {frame.childIndex} / {frame.totalChildren} children</span>
                      <span className="font-mono text-[11px] text-stone-400">Path: {frame.path.join('➔')}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-3 border-t border-dashed border-stone-300 pt-2 text-center text-[11px] font-mono text-stone-500">
            BOTTOM ⬇ (Root base)
          </div>
        </div>

        {/* Tree Exploration Status & Traversal History */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <h4 className="mb-2 font-bold text-stone-900 dark:text-stone-100">DFS Traversal Order (Visited)</h4>
            <div className="flex flex-wrap gap-1.5">
              {visitedNodes.map((id, idx) => (
                <span
                  key={id}
                  className="rounded-lg border border-stone-200 bg-[#FAF7F2] px-2.5 py-1 font-mono text-xs text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-zinc-200"
                >
                  <span className="opacity-50 mr-1">{idx + 1}.</span>
                  {id}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <h4 className="mb-2 font-bold text-stone-900 dark:text-stone-100">Backtracked Nodes (Dead Ends Popped)</h4>
            {backtrackedNodes.length === 0 ? (
              <p className="text-xs italic text-stone-500">No backtracking has occurred yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {backtrackedNodes.map((id, idx) => (
                  <span
                    key={`${id}-${idx}`}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-2 py-0.5 font-mono text-xs font-semibold text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
                  >
                    ↩ {id}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-200">
            <p className="font-bold">Key Academic Insight: Linear Memory O(bm)</p>
            <p className="mt-1">
              Notice that even after visiting {visitedNodes.length} nodes, the stack holds only {stack.length} active frames.
              Because DFS backtracks and frees memory from dead ends, space grows linearly with depth ($O(bm)$), unlike BFS which exhausts memory ($O(b^d)$).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DfsStackLab;

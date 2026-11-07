import React, { useState, useMemo } from 'react';
import { Play, Pause, RotateCcw, StepForward, Search, GitFork, CheckCircle2, ArrowRight, Layers, HelpCircle } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type Algorithm = 'bfs' | 'dfs' | 'ucs';

interface TreeNode {
  id: string;
  label: string;
  cost?: number; // step cost from parent
  pathCost?: number; // cumulative g(n)
  children: { id: string; cost: number }[];
  isGoal?: boolean;
}

interface Preset {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionAr: string;
  rootId: string;
  goalId: string;
  nodes: Record<string, TreeNode>;
}

const PRESETS: Preset[] = [
  {
    id: 'sheet4-tree',
    nameEn: 'Lecture 4 Sheet Tree (Goal O)',
    nameAr: 'شجرة شيت المحاضرة 4 (الهدف O)',
    descriptionAr: 'مسألة شيت المحاضرة 4 سلايد 36: تتبع ترتيب زيارة العقد في شجرة البحث بين BFS و DFS و UCS.',
    rootId: 'S',
    goalId: 'O',
    nodes: {
      S: { id: 'S', label: 'S', children: [{ id: 'A', cost: 2 }, { id: 'B', cost: 5 }, { id: 'C', cost: 4 }] },
      A: { id: 'A', label: 'A', children: [{ id: 'D', cost: 7 }, { id: 'E', cost: 3 }] },
      B: { id: 'B', label: 'B', children: [{ id: 'F', cost: 4 }, { id: 'G', cost: 6 }] },
      C: { id: 'C', label: 'C', children: [{ id: 'H', cost: 8 }] },
      D: { id: 'D', label: 'D', children: [] },
      E: { id: 'E', label: 'E', children: [{ id: 'O', cost: 5 }] }, // O reached via S->A->E->O (cost 2+3+5 = 10)
      F: { id: 'F', label: 'F', children: [] },
      G: { id: 'G', label: 'G', children: [{ id: 'O', cost: 2 }] }, // O reached via S->B->G->O (cost 5+6+2 = 13)
      H: { id: 'H', label: 'H', children: [] },
      O: { id: 'O', label: 'Goal (O)', children: [], isGoal: true },
    }
  },
  {
    id: 'binary-tree',
    nameEn: 'Binary State Space (n -> 2n, 2n+1, Goal 11)',
    nameAr: 'فضاء الأعداد الثنائي (1 إلى 15، الهدف 11)',
    descriptionAr: 'مسألة شيت المحاضرة 4 سلايد 36: دالة التوليد 2n و 2n+1؛ شوف الفرق الصاعق بين بحث العرض والعمق.',
    rootId: '1',
    goalId: '11',
    nodes: {
      '1': { id: '1', label: '1', children: [{ id: '2', cost: 1 }, { id: '3', cost: 1 }] },
      '2': { id: '2', label: '2', children: [{ id: '4', cost: 1 }, { id: '5', cost: 1 }] },
      '3': { id: '3', label: '3', children: [{ id: '6', cost: 1 }, { id: '7', cost: 1 }] },
      '4': { id: '4', label: '4', children: [{ id: '8', cost: 1 }, { id: '9', cost: 1 }] },
      '5': { id: '5', label: '5', children: [{ id: '10', cost: 1 }, { id: '11', cost: 1 }] },
      '6': { id: '6', label: '6', children: [{ id: '12', cost: 1 }, { id: '13', cost: 1 }] },
      '7': { id: '7', label: '7', children: [{ id: '14', cost: 1 }, { id: '15', cost: 1 }] },
      '8': { id: '8', label: '8', children: [] },
      '9': { id: '9', label: '9', children: [] },
      '10': { id: '10', label: '10', children: [] },
      '11': { id: '11', label: 'Goal (11)', children: [], isGoal: true },
      '12': { id: '12', label: '12', children: [] },
      '13': { id: '13', label: '13', children: [] },
      '14': { id: '14', label: '14', children: [] },
      '15': { id: '15', label: '15', children: [] },
    }
  }
];

interface FrontierItem {
  nodeId: string;
  path: string[];
  pathCost: number;
}

export const SearchAlgorithmLab: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('sheet4-tree');
  const [algorithm, setAlgorithm] = useState<Algorithm>('bfs');
  const [currentPreset, setCurrentPreset] = useState<Preset>(PRESETS[0]);

  // Simulation State
  const [frontier, setFrontier] = useState<FrontierItem[]>([
    { nodeId: PRESETS[0].rootId, path: [PRESETS[0].rootId], pathCost: 0 }
  ]);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [isGoalFound, setIsGoalFound] = useState<boolean>(false);
  const [optimalPath, setOptimalPath] = useState<string[] | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [stepCount, setStepCount] = useState<number>(0);

  // Switch preset
  const handleSelectPreset = (presetId: string) => {
    const found = PRESETS.find(p => p.id === presetId) || PRESETS[0];
    setSelectedPresetId(presetId);
    setCurrentPreset(found);
    resetSimulation(found, algorithm);
  };

  // Switch algorithm
  const handleSelectAlgorithm = (algo: Algorithm) => {
    setAlgorithm(algo);
    resetSimulation(currentPreset, algo);
  };

  const resetSimulation = (preset = currentPreset, algo = algorithm) => {
    setFrontier([{ nodeId: preset.rootId, path: [preset.rootId], pathCost: 0 }]);
    setVisitedNodes([]);
    setCurrentNode(null);
    setIsGoalFound(false);
    setOptimalPath(null);
    setTotalCost(0);
    setStepCount(0);
  };

  // Step function
  const step = () => {
    if (isGoalFound || frontier.length === 0) return;

    let nextFrontier = [...frontier];
    let popped: FrontierItem;

    if (algorithm === 'bfs') {
      // FIFO Queue: pop from front (index 0)
      popped = nextFrontier.shift()!;
    } else if (algorithm === 'dfs') {
      // LIFO Stack: pop from end
      popped = nextFrontier.pop()!;
    } else {
      // UCS: Priority Queue ordered by pathCost g(n) ascending
      nextFrontier.sort((a, b) => a.pathCost - b.pathCost);
      popped = nextFrontier.shift()!;
    }

    setCurrentNode(popped.nodeId);
    setVisitedNodes(prev => [...prev, popped.nodeId]);
    setStepCount(c => c + 1);

    // Goal test upon expansion
    if (popped.nodeId === currentPreset.goalId) {
      setIsGoalFound(true);
      setOptimalPath(popped.path);
      setTotalCost(popped.pathCost);
      setFrontier(nextFrontier);
      return;
    }

    // Expand children
    const nodeObj = currentPreset.nodes[popped.nodeId];
    if (nodeObj && nodeObj.children) {
      const childrenToAdd: FrontierItem[] = nodeObj.children.map(child => ({
        nodeId: child.id,
        path: [...popped.path, child.id],
        pathCost: popped.pathCost + child.cost
      }));

      if (algorithm === 'bfs') {
        // BFS adds children to back of FIFO queue
        nextFrontier = [...nextFrontier, ...childrenToAdd];
      } else if (algorithm === 'dfs') {
        // DFS adds children to top of LIFO stack (reverse to expand left child first)
        nextFrontier = [...nextFrontier, ...childrenToAdd.reverse()];
      } else {
        // UCS adds children and sorts by pathCost
        nextFrontier = [...nextFrontier, ...childrenToAdd].sort((a, b) => a.pathCost - b.pathCost);
      }
    }

    setFrontier(nextFrontier);
  };

  // Algorithm traits explanation
  const algoInfo = useMemo(() => {
    switch (algorithm) {
      case 'bfs':
        return {
          queueType: 'FIFO Queue (First-In, First-Out)',
          queueAr: 'طابور FIFO (اللي يدخل الأول يخرج الأول)',
          strategyAr: 'بيفرد الشجرة بالعرض دور بدور (Level by Level). آمن من الحلقات اللانهائية، بس بيستهلك رامات ضخمة O(b^d).',
          optimalityAr: 'مثالي فقط لو كل الخطوات متساوية التكلفة (Unit Step Cost).',
          badge: 'FIFO Queue • Level by Level',
          color: 'blue'
        };
      case 'dfs':
        return {
          queueType: 'LIFO Stack (Last-In, First-Out)',
          queueAr: 'مكدس LIFO (آخر واحد دخل هو أول واحد يخرج)',
          strategyAr: 'بينزل في أعمق فرع لأخره. ميزته الكبرى توفير الذاكرة الخارق O(bm)، بس عيبه إنه مش مثالي وممكن يضيع في فروع لانهائية.',
          optimalityAr: 'مش مثالي؛ ممكن يلاقي حل طويل جداً ويتجاهل حل أقصر منه.',
          badge: 'LIFO Stack • Deepest First',
          color: 'amber'
        };
      case 'ucs':
        return {
          queueType: 'Priority Queue (Ordered by cumulative path cost g)',
          queueAr: 'طابور أولويات (Priority Queue) مترتب بأقل تكلفة مسار تراكمية g(n)',
          strategyAr: 'بيختار دايماً العقدة اللي وصلها بأقل تكلفة تراكمية حتى لو في عمق مختلف. مثالي دائماً لأي تكاليف حقيقية.',
          optimalityAr: 'مثالي 100% (Optimal) لأي تكاليف موجبة؛ اختبار الهدف فيه بيتم لحظة التوسيع مش التوليد!',
          badge: 'Priority Queue • Lowest g(n)',
          color: 'emerald'
        };
    }
  }, [algorithm]);

  return (
    <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-beige-200 dark:border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Search className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Uninformed Search Strategy Simulator (BFS vs DFS vs UCS)
            </h3>
          </div>
          <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-300 pt-1">
            محاكي استراتيجيات البحث غير الموجه: تتبع جبهة البحث (Frontier)، رص العقد، وترتيب الاستكشاف خطوة بخطوة
          </ArabicText>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-300">مسألة الشيت:</span>
          <select
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="text-xs bg-beige-100 dark:bg-stone-800 border border-beige-300 dark:border-stone-700 rounded-xl px-3 py-2 font-medium text-stone-800 dark:text-stone-200 focus:outline-none"
          >
            {PRESETS.map(p => (
              <option key={p.id} value={p.id}>{p.nameAr}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Algorithm Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-beige-100 dark:bg-stone-950 rounded-2xl border border-beige-200 dark:border-stone-800">
        {[
          { id: 'bfs', labelEn: 'BFS (Breadth-First)', labelAr: 'البحث في العرض (BFS)', sub: 'FIFO Queue' },
          { id: 'dfs', labelEn: 'DFS (Depth-First)', labelAr: 'البحث في العمق (DFS)', sub: 'LIFO Stack' },
          { id: 'ucs', labelEn: 'UCS (Uniform-Cost)', labelAr: 'البحث متساوي التكلفة (UCS)', sub: 'Priority Queue (g)' },
        ].map(item => {
          const isSelected = algorithm === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectAlgorithm(item.id as Algorithm)}
              className={`p-3 rounded-xl text-start transition-all ${
                isSelected
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm border border-beige-300 dark:border-stone-700'
                  : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <div className="font-bold text-sm">{item.labelEn}</div>
              <ArabicText className="text-xs text-stone-600 dark:text-zinc-300 font-medium">{item.labelAr}</ArabicText>
              <span className="text-[10px] font-mono opacity-70 block mt-0.5">{item.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Algorithm Strategy Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300">
              {algoInfo.badge}
            </span>
            <span className="text-xs font-mono text-stone-600 dark:text-zinc-400">
              Queue Type: <strong className="text-stone-900 dark:text-stone-100">{algoInfo.queueType}</strong>
            </span>
          </div>
          <ArabicText className="text-xs text-stone-700 dark:text-zinc-200">
            {algoInfo.strategyAr} • <strong>المثالية:</strong> {algoInfo.optimalityAr}
          </ArabicText>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={step}
            disabled={isGoalFound || frontier.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 rounded-xl font-bold text-xs shadow-sm disabled:opacity-40 transition-all"
          >
            <StepForward className="w-4 h-4" />
            <span>خطوة للأمام (Step)</span>
          </button>
          <button
            onClick={() => resetSimulation()}
            className="p-2 bg-beige-200 hover:bg-beige-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl transition-all"
            title="إعادة ضبط"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree & State Representation (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-beige-300 dark:border-stone-800 rounded-2xl p-5 bg-[#FAF7F2] dark:bg-stone-950 min-h-[320px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-beige-200 dark:border-stone-800">
              <span className="text-xs font-mono text-stone-600 dark:text-zinc-400">
                Current Node: <strong className="text-stone-900 dark:text-stone-100 text-sm">{currentNode || 'None (Press Step)'}</strong>
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-zinc-400">
                Steps Taken: <strong className="text-stone-900 dark:text-stone-100">{stepCount}</strong>
              </span>
            </div>

            {/* Tree Nodes Display */}
            <div className="py-6 flex flex-wrap items-center justify-center gap-3">
              {Object.values(currentPreset.nodes).map(node => {
                const isCurrent = currentNode === node.id;
                const isVisited = visitedNodes.includes(node.id);
                const inFrontier = frontier.some(f => f.nodeId === node.id);
                const isGoalNode = node.isGoal;

                let badgeColor = 'bg-white dark:bg-stone-800 border-beige-300 dark:border-stone-700 text-stone-600 dark:text-zinc-400';
                if (isCurrent) {
                  badgeColor = 'bg-purple-600 text-white border-purple-500 ring-4 ring-purple-500/20 shadow-md';
                } else if (isGoalFound && optimalPath?.includes(node.id)) {
                  badgeColor = 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-500/20';
                } else if (isVisited) {
                  badgeColor = 'bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-zinc-200 border-stone-400';
                } else if (inFrontier) {
                  badgeColor = 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-600';
                }

                return (
                  <div
                    key={node.id}
                    className={`flex flex-col items-center justify-center min-w-[70px] p-2.5 rounded-2xl border transition-all text-center ${badgeColor}`}
                  >
                    <div className="font-mono font-bold text-sm">{node.label}</div>
                    <div className="text-[10px] opacity-75 font-mono">
                      {isGoalNode ? 'GOAL' : node.id === currentPreset.rootId ? 'ROOT' : `id: ${node.id}`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-beige-200 dark:border-stone-800 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" /> Expanding
              </span>
              <span className="flex items-center gap-1 text-amber-700 dark:text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> In Frontier
              </span>
              <span className="flex items-center gap-1 text-stone-600 dark:text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block" /> Visited/Explored
              </span>
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Goal Path
              </span>
            </div>
          </div>

          {/* Goal Found Announcement */}
          {isGoalFound && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-300 dark:border-emerald-700/50 flex items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 text-white rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                    وصلنا للهدف بنجاح! Goal Reached: {currentPreset.goalId}
                  </h4>
                  <p className="text-xs font-mono text-emerald-800 dark:text-emerald-300">
                    Optimal Path: {optimalPath?.join(' → ')} (Total Cost: {totalCost})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Frontier State (Right Column) */}
        <div className="space-y-4">
          {/* Live Frontier Card */}
          <div className="border border-beige-300 dark:border-stone-800 rounded-2xl p-4 bg-[#FAF7F2] dark:bg-stone-950 space-y-3">
            <div className="flex items-center justify-between border-b border-beige-200 dark:border-stone-800 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Frontier (Fringe): {frontier.length} Nodes
                </h4>
              </div>
              <span className="text-[10px] font-mono text-stone-600 dark:text-zinc-400">
                {algorithm === 'bfs' ? 'Front → Back' : algorithm === 'dfs' ? 'Top of Stack' : 'Lowest g(n)'}
              </span>
            </div>

            {frontier.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-600 dark:text-zinc-400 font-mono">
                Frontier is empty.
              </div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {frontier.map((item, idx) => (
                  <div
                    key={`${item.nodeId}-${idx}`}
                    className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between ${
                      idx === 0
                        ? 'bg-amber-500/15 border-amber-400 dark:border-amber-600 font-bold text-stone-900 dark:text-stone-100'
                        : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800 text-stone-700 dark:text-zinc-300'
                    }`}
                  >
                    <div>
                      <span>Node {item.nodeId}</span>
                      <span className="text-[10px] block opacity-75 font-normal">
                        Path: {item.path.join('→')}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-beige-200 dark:bg-stone-800 text-[11px] font-bold">
                      cost: {item.pathCost}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visited Sequence (Exam Answer Card) */}
          <div className="border border-beige-300 dark:border-stone-800 rounded-2xl p-4 bg-[#FAF7F2] dark:bg-stone-950 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>ترتيب الزيارة في الامتحان (Visited Order)</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                {visitedNodes.length} nodes
              </span>
            </h4>
            <div className="p-2.5 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-xl font-mono text-xs text-stone-800 dark:text-stone-200 min-h-[40px] flex items-center flex-wrap gap-1">
              {visitedNodes.length === 0 ? (
                <span className="text-stone-600 dark:text-zinc-400 text-[11px]">اضغط Step لبدء التتبع...</span>
              ) : (
                visitedNodes.map((n, i) => (
                  <span key={i} className="inline-flex items-center gap-1">
                    <span className="font-bold px-1.5 py-0.5 rounded bg-beige-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100">{n}</span>
                    {i < visitedNodes.length - 1 && <ArrowRight className="w-3 h-3 text-stone-400" />}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

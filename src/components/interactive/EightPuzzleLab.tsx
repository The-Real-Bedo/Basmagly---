import { useEffect, useId, useRef, useState } from 'react';
import { Box, Pause, Play, RotateCcw, Search, StepForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LectureSection } from '../LectureSection';
import { LabWorkbench, type WorkbenchNode } from './LabWorkbench';
import { inversions, isGoal, legalTiles, PUZZLE_GOAL, PUZZLE_PRESETS, slideTile, solvePuzzle, type Board, type PuzzleSolution } from './aiLabModels';

const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-beige-100 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400';
const presets = { near: 'Two moves away', detour: 'Four-move detour', scramble: 'Scrambled board', parity: 'Parity trap' };
type Preset = keyof typeof presets;

export function EightPuzzleLab() {
  const theoryId = useId();
  const [preset, setPreset] = useState<Preset>('near');
  const [board, setBoard] = useState<Board>(() => [...PUZZLE_PRESETS.near]);
  const [moves, setMoves] = useState(0);
  const [solution, setSolution] = useState<PuzzleSolution | null>(null);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const reset = (value: Preset = preset) => { clearTimers(); setPlaying(false); setBoard([...PUZZLE_PRESETS[value]]); setMoves(0); setSolution(null); setPosition(0); };
  const legal = legalTiles(board), parity = inversions(board), solved = isGoal(board);
  const canReplay = solution?.status === 'solved' && position < solution.path.length - 1;
  const step = () => {
    if (!canReplay || !solution) return;
    setPosition(value => value + 1); setBoard([...solution.path[position + 1]]); setMoves(value => value + 1);
  };
  useEffect(() => {
    if (!playing) return;
    if (!canReplay) { setPlaying(false); return; }
    timers.current.push(setTimeout(step, 500));
    return clearTimers;
  }, [playing, position, solution, canReplay]);
  useEffect(() => () => clearTimers(), []);
  const move = (tile: number) => {
    if (playing || !legal.includes(tile)) return;
    clearTimers(); setBoard(current => slideTile(current, tile)); setMoves(value => value + 1); setSolution(null); setPosition(0);
  };
  const plan = () => {
    if (playing) return;
    clearTimers(); setPosition(0); setSolution(solvePuzzle(board));
  };
  const nextTile = canReplay && solution ? board[solution.path[position + 1].indexOf(0)] : null;
  const status = solved
    ? ['Goal reached: every tile matches the target board.', 'وصلت للهدف: كل بلاطة مطابقة للوحة المطلوبة.']
    : parity % 2
      ? ['Unsolvable for this goal: the numbered tiles have odd inversion parity. Legal moves cannot fix it.', 'اللوحة دي ما تتحلّش للهدف ده: عدد انعكاسات البلاطات المرقّمة فردي. الحركات القانونية مش هتغيّر ده.']
      : solution?.status === 'limit'
        ? ['Search reached the 10000-expansion display limit. This does not mean the board is unsolvable.', 'البحث وصل لحد العرض: 10000 توسّع. ده مش معناه إن اللوحة ما تتحلّش.']
        : canReplay
          ? [`Next solution action: slide tile ${nextTile}.`, `الفعل الجاي في الحل: حرّك البلاطة ${nextTile}.`]
          : ['Slide a tile beside the blank, or find a shortest BFS solution from the current board.', 'حرّك بلاطة جنب الفراغ، أو دوّر على أقصر حل بالـ BFS من اللوحة الحالية.'];
  const nodes: WorkbenchNode[] = board.flatMap((tile, index) => tile ? [{
    id: String(tile), label: `Tile ${tile}`, sceneLabel: String(tile), kind: 'byte' as const,
    size: [1.15, .26, 1.15] as [number, number, number], position: [(index % 3 - 1) * 1.45, 0, (Math.floor(index / 3) - 1) * 1.45] as [number, number, number],
    tone: tile === PUZZLE_GOAL[index] ? 'success' as const : legal.includes(tile) ? 'active' as const : 'neutral' as const,
    detail: `Row ${Math.floor(index / 3) + 1}, column ${index % 3 + 1}. ${legal.includes(tile) ? 'Adjacent to the blank: this move is legal.' : 'Not adjacent to the blank.'}`,
    detailAr: `الصف ${Math.floor(index / 3) + 1}، العمود ${index % 3 + 1}. ${legal.includes(tile) ? 'جنب الفراغ: الحركة دي قانونية.' : 'مش جنب الفراغ.'}`,
    action: () => move(tile), actionLabel: `Slide tile ${tile}`, disabled: playing || !legal.includes(tile),
  }] : []);
  return <section className="space-y-5 rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
    <header className="flex items-start gap-3"><span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Box className="h-5 w-5" /></span><div><h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">8-Puzzle Search Studio</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">حرّك البلاطات وخلي الـ BFS تلاقي أقصر طريق للهدف</ArabicText></div></header>
    <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)]">
      <div className="space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <label className="block space-y-2 text-sm font-semibold text-stone-700 dark:text-zinc-300"><span>Starting board</span><select aria-label="Starting puzzle board" value={preset} disabled={playing} onChange={e => { const value = e.target.value as Preset; setPreset(value); reset(value); }} className="min-h-11 w-full rounded-xl border border-beige-300 bg-white px-3 text-sm text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200">{Object.entries(presets).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
        <div data-testid="puzzle-board" aria-label="Interactive 8-puzzle board" tabIndex={0} onKeyDown={event => {
          const blank = board.indexOf(0), offsets: Record<string, number> = { ArrowUp: -3, ArrowDown: 3, ArrowLeft: -1, ArrowRight: 1 };
          if (!(event.key in offsets)) return;
          event.preventDefault();
          const tile = board[blank + offsets[event.key]];
          if (tile !== undefined) move(tile);
        }} className="mx-auto grid w-full max-w-xs grid-cols-3 gap-2 rounded-2xl border border-beige-300 bg-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:focus-visible:ring-amber-400">
          {board.map((tile, i) => tile ? <button key={tile} type="button" data-testid={`puzzle-tile-${tile}`} data-position={i} aria-label={`Slide tile ${tile}`} disabled={playing || !legal.includes(tile)} onClick={() => move(tile)} className={`aspect-square rounded-xl border font-mono text-2xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 ${legal.includes(tile) ? 'border-amber-400 bg-amber-100 text-amber-950 hover:bg-amber-200 dark:border-amber-600 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-950' : 'border-beige-300 bg-[#FAF7F2] text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-300'}`}>{tile}</button> : <div key="blank" data-position={i} data-testid="puzzle-blank" className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-stone-300 bg-white text-xs text-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-400">Blank</div>)}
        </div>
        <p className="text-xs text-stone-600 dark:text-zinc-400">Click an amber tile. Focus the board and use arrow keys to move the blank.</p>
        <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">اضغط على بلاطة كهرمانية. اختار اللوحة بالكيبورد واستخدم الأسهم عشان تحرّك الفراغ.</ArabicText>
        <div className="flex flex-wrap gap-2"><button type="button" onClick={plan} disabled={playing} className={button}><Search className="h-4 w-4" />Find shortest path</button><button type="button" onClick={() => reset()} className={button}><RotateCcw className="h-4 w-4" />Reset board</button></div>
        <div className="flex flex-wrap gap-2"><button type="button" onClick={() => { if (playing) clearTimers(); setPlaying(!playing); }} disabled={!canReplay && !playing} className={button}>{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{playing ? 'Pause solution' : 'Run solution'}</button><button type="button" onClick={step} disabled={playing || !canReplay} className={button}><StepForward className="h-4 w-4" />Step solution</button></div>
        <p className="font-mono text-sm text-stone-700 dark:text-zinc-300">Moves made: {moves} · Inversions: {parity}</p>
      </div>
      <LabWorkbench title="8-puzzle · numbered tiles" nodes={nodes}>
        <div className="space-y-3"><p className="text-sm text-stone-700 dark:text-zinc-300">Use the interactive board to the left (above on mobile). Target board:</p><div className="grid max-w-xs grid-cols-3 gap-2">{PUZZLE_GOAL.map(tile => <div key={tile} className="flex aspect-square items-center justify-center rounded-xl border border-beige-300 bg-white font-mono text-xl text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100">{tile || '—'}</div>)}</div></div>
      </LabWorkbench>
    </div>
    <div data-testid="puzzle-status" aria-live="polite" className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950"><p className="text-sm font-semibold text-stone-800 dark:text-zinc-200">{status[0]}</p><ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">{status[1]}</ArabicText>{solution?.status === 'solved' && <p className="mt-3 font-mono text-sm text-stone-700 dark:text-zinc-300">BFS path from the planned board: {solution.path.length - 1} moves · Expanded: {solution.expanded} · Replay: {position} / {solution.path.length - 1}</p>}</div>
    <LectureSection anchorId={`${theoryId}-theory`} index={0} total={1} section={{ title: '1. Turn a Board into a Search Problem', titleAr: '1. حوّل اللوحة لمشكلة بحث', content: 'The state is the arrangement of numbered tiles and the blank. Each legal action slides one orthogonally adjacent tile into the blank; the transition model produces the next arrangement.', contentAr: 'الـ State هي ترتيب البلاطات المرقّمة والفراغ. كل فعل قانوني بيزحلق بلاطة مجاورة أفقيًا أو رأسيًا للفراغ؛ ونموذج الانتقال بيطلع الترتيب الجديد.', bulletPoints: ['Initial state and goal: The selected preset is the start; the target is 1–8 in row order with the blank last.', 'Path cost: Every slide costs 1. FIFO graph BFS tests goals on generation and finds a shortest sequence.', 'Solvability: On this odd-width board, legal moves preserve inversion parity. The selected goal has even parity.', 'Scope: AI 3 uses the 8-puzzle to illustrate problem formulation (pp. 1–37). These presets, canonical goal, parity check and bounded BFS are supplementary examples. A search limit is not a proof of impossibility.'], bulletPointsAr: ['البداية والهدف: الإعداد المختار هو البداية؛ والمطلوب ترتيب 1–8 بالصفوف والفراغ في الآخر.', 'تكلفة المسار: كل حركة تكلفتها 1. الـ Graph BFS بترتيب FIFO بتختبر الهدف عند توليده وبتلاقي أقصر تسلسل.', 'قابلية الحل: في اللوحة دي بعرض فردي، الحركات القانونية بتحافظ على زوجية أو فردية الانعكاسات. الهدف المختار انعكاساته زوجية.', 'النطاق: AI 3 بتستخدم الـ 8-puzzle لتوضيح صياغة المشكلة (ص 1–37). الإعدادات والهدف المعتاد واختبار الزوجية والـ BFS المحدودة أمثلة إضافية. حد البحث مش دليل إن الحل مستحيل.'], keyRule: 'A legal action changes the state; a solution is a sequence of legal actions that passes the goal test.', keyRuleAr: 'الفعل القانوني بيغيّر الحالة؛ والحل تسلسل أفعال قانونية بيحقق اختبار الهدف.' }} />
  </section>;
}

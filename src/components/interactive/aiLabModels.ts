export type Gate = 'AND' | 'OR' | 'XOR';
export type Weights = [number, number, number];
export const BINARY_INPUTS = [[0, 0], [0, 1], [1, 0], [1, 1]] as const;
export const TRAINING_LIMIT = 80;
export const targetFor = (gate: Gate, x: readonly number[]) => gate === 'AND' ? Number(x[0] === 1 && x[1] === 1) : gate === 'OR' ? Number(x[0] === 1 || x[1] === 1) : Number(x[0] !== x[1]);
export const activation = (weights: Weights, x: readonly number[]) => weights[0] * x[0] + weights[1] * x[1] + weights[2];
export const predict = (weights: Weights, x: readonly number[]) => Number(activation(weights, x) >= 0);
export const errorCount = (weights: Weights, gate: Gate) => BINARY_INPUTS.filter(x => predict(weights, x) !== targetFor(gate, x)).length;
export interface TrainingState {
  weights: Weights;
  steps: number;
  last?: { sample: number; before: Weights; predicted: number; target: number; error: number };
}
export const initialTraining = (): TrainingState => ({ weights: [0, 0, 0], steps: 0 });
export function trainSample(state: TrainingState, gate: Gate): TrainingState {
  if (state.steps >= TRAINING_LIMIT || errorCount(state.weights, gate) === 0) return state;
  const sample = state.steps % BINARY_INPUTS.length, x = BINARY_INPUTS[sample];
  const predicted = predict(state.weights, x), target = targetFor(gate, x), error = target - predicted;
  return {
    weights: [state.weights[0] + error * x[0], state.weights[1] + error * x[1], state.weights[2] + error],
    steps: state.steps + 1, last: { sample, before: state.weights, predicted, target, error },
  };
}
export function trainEpoch(state: TrainingState, gate: Gate) {
  for (let i = 0; i < BINARY_INPUTS.length; i++) state = trainSample(state, gate);
  return state;
}
/** Clip a square to the prediction-1 half-plane, including constant classifiers. */
export function decisionRegion(weights: Weights): [number, number][] {
  const square: [number, number][] = [[-.35, -.35], [1.35, -.35], [1.35, 1.35], [-.35, 1.35]];
  const result: [number, number][] = [];
  square.forEach((current, i) => {
    const previous = square[(i + square.length - 1) % square.length];
    const a = activation(weights, previous), b = activation(weights, current);
    if ((a >= 0) !== (b >= 0)) {
      const t = a / (a - b);
      result.push([previous[0] + t * (current[0] - previous[0]), previous[1] + t * (current[1] - previous[1])]);
    }
    if (b >= 0) result.push(current);
  });
  return result;
}

export type Board = number[];
export const PUZZLE_GOAL: Board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
export const PUZZLE_PRESETS = {
  near: [1, 2, 3, 4, 5, 6, 0, 7, 8],
  detour: [1, 2, 3, 5, 0, 6, 4, 7, 8],
  scramble: [1, 3, 6, 5, 0, 2, 4, 7, 8],
  parity: [1, 2, 3, 4, 5, 6, 8, 7, 0],
} satisfies Record<string, Board>;
export const boardKey = (board: Board) => board.join('');
export const isGoal = (board: Board) => boardKey(board) === boardKey(PUZZLE_GOAL);
export function validBoard(board: Board) { return board.length === 9 && new Set(board).size === 9 && board.every(value => Number.isInteger(value) && value >= 0 && value <= 8); }
export function inversions(board: Board) {
  let count = 0;
  board.forEach((value, i) => board.slice(i + 1).forEach(other => { if (value && other && value > other) count++; }));
  return count;
}
export function legalTiles(board: Board) {
  const blank = board.indexOf(0);
  return board.filter((value, i) => value !== 0 && Math.abs(Math.floor(i / 3) - Math.floor(blank / 3)) + Math.abs(i % 3 - blank % 3) === 1);
}
export function slideTile(board: Board, tile: number): Board {
  if (!validBoard(board) || !legalTiles(board).includes(tile)) return board;
  const next = [...board], blank = next.indexOf(0), index = next.indexOf(tile);
  [next[blank], next[index]] = [next[index], next[blank]];
  return next;
}
export interface PuzzleSolution { status: 'solved' | 'unsolvable' | 'limit'; path: Board[]; expanded: number; }
export function solvePuzzle(start: Board, limit = 10000): PuzzleSolution {
  if (!validBoard(start)) throw new Error('An 8-puzzle board must contain each tile 0–8 once.');
  if (inversions(start) % 2) return { status: 'unsolvable', path: [], expanded: 0 };
  if (isGoal(start)) return { status: 'solved', path: [[...start]], expanded: 0 };
  const queue: Board[] = [[...start]], parents = new Map<string, string | null>([[boardKey(start), null]]);
  let head = 0;
  while (head < queue.length && head < limit) {
    const current = queue[head++];
    for (const tile of legalTiles(current)) {
      const next = slideTile(current, tile), key = boardKey(next);
      if (parents.has(key)) continue;
      parents.set(key, boardKey(current));
      if (isGoal(next)) {
        const path: Board[] = [];
        let cursor: string | null = key;
        while (cursor !== null) { path.unshift(cursor.split('').map(Number)); cursor = parents.get(cursor)!; }
        return { status: 'solved', path, expanded: head };
      }
      queue.push(next);
    }
  }
  return { status: 'limit', path: [], expanded: head };
}

export type WorldState = 'S' | 'A' | 'B' | 'C' | 'G';
export const SEARCH_WORLD: Record<WorldState, WorldState[]> = { S: ['A', 'B'], A: ['S', 'C'], B: ['C'], C: ['A', 'G'], G: [] };
export interface SearchRecord { id: number; state: WorldState; parent: number | null; path: WorldState[]; depth: number; cost: number; }
export interface StateSearch {
  records: SearchRecord[]; frontier: number[]; expanded: number[];
  rejected: WorldState[][]; seen: WorldState[]; solution?: number;
  status: 'ready' | 'found' | 'limited' | 'exhausted';
}
export const initialStateSearch = (): StateSearch => ({
  records: [{ id: 0, state: 'S', parent: null, path: ['S'], depth: 0, cost: 0 }],
  frontier: [0], expanded: [], rejected: [], seen: ['S'], status: 'ready',
});
export function expandState(state: StateSearch, graphSearch: boolean): StateSearch {
  if (state.status !== 'ready') return state;
  if (!state.frontier.length) return { ...state, status: 'exhausted' };
  if (state.expanded.length >= 12) return { ...state, status: 'limited' };
  const frontier = state.frontier.slice(1), current = state.records[state.frontier[0]];
  const records = [...state.records], expanded = [...state.expanded, current.id], rejected = [...state.rejected], seen = new Set(state.seen);
  let solution: number | undefined;
  for (const next of SEARCH_WORLD[current.state]) {
    const path = [...current.path, next];
    if (graphSearch && seen.has(next)) { rejected.push(path); continue; }
    seen.add(next);
    const record = { id: records.length, state: next, parent: current.id, path, depth: current.depth + 1, cost: current.cost + 1 };
    records.push(record);
    if (next === 'G') { solution = record.id; break; } // BFS goal test on generation with unit costs.
    frontier.push(record.id);
  }
  return { records, frontier, expanded, rejected, seen: [...seen], solution, status: solution !== undefined ? 'found' : frontier.length ? 'ready' : 'exhausted' };
}

# AI lectures 2–4: source coverage

Implementation source: the attached `Sem1-data.zip` → `AI/AI-2.pdf`, `AI/AI-3.pdf`, and `AI/AI-4.pdf` (checked against the extracted review text for those PDFs).

| Lecture | Source coverage used | Summary and simulator coverage |
| --- | --- | --- |
| AI 2 — Intelligent Agents | PDF pp. 1–27 | Agent/percept/sensors/actuators; agent function vs. program; rationality and its four inputs; reflex and goal-based agents; PEAS; environment dimensions and examples, including semidynamic chess. Summaries are four paired English-first sections; `vacuum-world` demonstrates a simple reflex agent and `agent-architecture` visualizes the perception–model–decision–action loop and PEAS. |
| AI 3 — Problem-Solving & Search | PDF pp. 1–37 | Goal/problem formulation; initial state, actions, transition model, goal test and path cost; Romania, 8-puzzle, and vacuum examples; state-space graph vs. search tree; node/state distinction; frontier, explored states, and DFS. The number tree starts at 1, uses successors `2n` and `2n+1`, and keeps goal 11 as a separate preset. |
| AI 4 — Uninformed Search | PDF pp. 1–36 | BFS/FIFO, DFS/LIFO, UCS by cumulative cost; completeness, time, space, optimality; goal-test timing and repeated-state handling; Romania route comparison. Page 36’s unweighted tree is preserved as A→{B,C,D,E}, B→{F,G}, C→H, D→{I,J}, G→{K,L}, I→M, J→N, L→O, with O as goal. |

The page-36 AI 4 diagram was checked against the original PDF image, not inferred from the older simulator. Its edges have unit cost in the visualizer, so UCS and BFS have the same ordering there; this is stated in the UI rather than presenting invented weighted routes. Existing lecture questions and section quick checks are reused unchanged.

## Additional AI labs — 2026-11-10

The user requested more AI labs. These extend concepts in the reviewed lecture content; the examples and algorithms below are explicitly supplementary. Original PDF files were unavailable at their historical review paths during this pass, so this does not claim a fresh page-by-page PDF review or reproduce unseen slide boards.

| Lab | Lecture connection | Supplementary implementation and limits |
| --- | --- | --- |
| `ai-perceptron` — Perceptron & XOR Studio | AI 1's perceptron history and XOR limitation, referenced at pp. 6–9 in the existing reviewed content | Four binary AND/OR/XOR examples; adjustable weights/bias; weighted-sum inspector; half-plane plot and prediction errors; sample/epoch training with learning rate 1 and an 80-sample display cap. XOR's shared-midpoint argument explains non-separability; reaching the cap is not presented as a proof. |
| `ai-eight-puzzle` — 8-Puzzle Search Studio | AI 3's problem formulation and 8-puzzle example within pp. 1–37 | Four authored presets, canonical row-order target, legal click/keyboard/3D tile actions, inversion-parity check and shortest unit-cost graph BFS. Planning tests the goal on generation, caps work at 10000 expansions, and distinguishes the cap from impossibility. The 2-, 4- and 8-move examples were independently checked. |
| `ai-search-states` — States vs Search Nodes | AI 3's states/nodes/frontiers and AI 4's repeated-state handling | Authored five-state directed cyclic graph; FIFO tree/graph BFS; node parents, paths, depths and unit costs; frontier and duplicate counts; 2D/3D graph/tree views with separate directed return paths. Graph BFS marks states on generation, including frontier states. The display cap is 12 expansions; this duplicate policy is not claimed sufficient for arbitrary unequal costs. |

The new labs are registered in the catalogue, lazy renderer and their lecture tool lists, and are embedded beside the corresponding explanation sections. Existing lecture/question/sheet IDs and answer keys remain unchanged; there are no new official worksheet questions. Model fixtures and browser interactions live in `scripts/test_ai_labs.cjs`; shared all-lab scripts cover registration, expansion and scene behavior.

# AI lectures 2–4: source coverage

Implementation source: the attached `Sem1-data.zip` → `AI/AI-2.pdf`, `AI/AI-3.pdf`, and `AI/AI-4.pdf` (checked against the extracted review text for those PDFs).

| Lecture | Source coverage used | Summary and simulator coverage |
| --- | --- | --- |
| AI 2 — Intelligent Agents | PDF pp. 1–27 | Agent/percept/sensors/actuators; agent function vs. program; rationality and its four inputs; reflex and goal-based agents; PEAS; environment dimensions and examples, including semidynamic chess. Summaries are four paired English-first sections; `vacuum-world` demonstrates a simple reflex agent and `agent-architecture` visualizes the perception–model–decision–action loop and PEAS. |
| AI 3 — Problem-Solving & Search | PDF pp. 1–37 | Goal/problem formulation; initial state, actions, transition model, goal test and path cost; Romania, 8-puzzle, and vacuum examples; state-space graph vs. search tree; node/state distinction; frontier, explored states, and DFS. The number tree starts at 1, uses successors `2n` and `2n+1`, and keeps goal 11 as a separate preset. |
| AI 4 — Uninformed Search | PDF pp. 1–36 | BFS/FIFO, DFS/LIFO, UCS by cumulative cost; completeness, time, space, optimality; goal-test timing and repeated-state handling; Romania route comparison. Page 36’s unweighted tree is preserved as A→{B,C,D,E}, B→{F,G}, C→H, D→{I,J}, G→{K,L}, I→M, J→N, L→O, with O as goal. |

The page-36 AI 4 diagram was checked against the original PDF image, not inferred from the older simulator. Its edges have unit cost in the visualizer, so UCS and BFS have the same ordering there; this is stated in the UI rather than presenting invented weighted routes. Existing lecture questions and section quick checks are reused unchanged.

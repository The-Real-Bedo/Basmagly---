# Source coverage and teaching-model boundaries

English is primary throughout the reading and experiment interface. Egyptian Arabic supports the same concepts. Page numbers refer to physical PDF pages, not an assumed printed-page offset. The original PDFs and raw OCR remain private inputs, not committed assets.

| Subject | Uploaded lecture scope | Platform coverage |
| --- | --- | --- |
| AI | AI-1 (33 pages), AI-2 (27), AI-3 (37), AI-4 (36) | Four lectures: introduction/history/foundations; agents/PEAS/environments; problem formulation/state spaces/DFS; BFS/DFS/UCS/guarantees. AI1 has its dedicated source-linked module. The remaining lectures preserve the existing practice question IDs, answer keys and concept checks. |
| Networks | CCNA-1 (27), CCNA-2 (31), CCNA-3 (32) | Three lectures: components/media/topologies/transmission; layered models/encapsulation/IPv4; a dedicated subnetting guide with worked /27, /26 and /23 examples and special /31-/32 handling in the workbench. |
| IoT | Lecture 1 (14), Lecture 2 (18); official sheets (1 and 3 pages) | Two lectures, preserving the 8- and 20-question sheets. The three-stage source pipeline is distinguished from the supplementary sensor-to-actuator feedback example. The theoretical five layers are distinguished from the practical six-block implementation view. Forecasts and statistics are dated source claims, not verified present-day measurements. |
| Windows Programming | Win001_CH1-Foundation I (34), II (26) | Two foundation lectures: events, OS/API roles, sequential versus event-driven flow, GUI resources, Windows messages and language families. The Chapter 1 reference supplies labelled context; later SDK/MFC/Qt/C++/CLI chapters are not claimed as taught. No official sheets were invented. |
| Signal Processing | Sig001_Foundation I (23), II (21) | Two foundation lectures: DSP, ADC/sampling/quantization/DAC; impulse/step/exponential sequences, transformations, even/odd and periodicity, systems and response concepts. The Chapter 1 reference supplies background. Later transforms/filter-design/multirate chapters are not claimed as summarized. No official sheets were invented. |

## Important corrected source alignment

AI-4 PDF page 36 contains an **unweighted A-root tree**, not the former weighted S-root substitute. Both the official exercise and simulator now use the original adjacency: A→B,C,D,E; B→F,G; C→H; D→I,J; G→K,L; I→M; J→N; L→O. The goal is O. UCS is not uniquely determined without edge costs; the simulator and worked comparison explicitly assume unit costs and FIFO tie-breaking. The displayed sequences count nodes removed from the frontier. Under that convention BFS/UCS visit A,B,C,D,E,F,G,H,I,J,K,L,M,N,O, while left-first DFS visits A,B,F,G,K,L,O. Goal-path depth/cost is 4 under the stated assumption.

## Simulator limits

- Turing conversations are scripted illustrations, not a live model or a verified test pass.
- AI fuel controls are a qualitative bottleneck illustration, not an accuracy forecast or training benchmark.
- Rational-route probabilities and times are illustrative. A good expected decision can still have an unlucky outcome.
- Windows controls model queued/retrieved/dispatched messages in the browser; they do not execute the native Win32 API.
- Signal plots compute an ideal sine, uniform endpoint quantization, or a finite window of discrete samples. No real audio, noise or reconstruction filter is simulated. Nyquist context assumes a band-limited input; equality can be phase-ambiguous.
- Network and IoT playback time is animation time, not a measured real network latency. The packet journey assumes the stated simple route without NAT.

## Reading limitations

All supplied lecture decks were reviewed as extracted/OCR text, with selected original diagrams checked visually. This is not a claim that every figure was independently transcribed pixel-by-pixel or that all three reference books were read/summarized in full. OCR-noisy mathematical or diagram details should always be checked against the original PDF before future expansion.

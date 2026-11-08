# Current study-platform handoff

## Latest requested scope (2026-11-08)
Strengthen all supplied subjects with English-primary explanations and accurate Egyptian Arabic support. Treat **Windows Programming book Chapters 1 and 2** as real chapters (Foundations and SDK), not Foundation I/II slide parts. Include useful code, original end-of-chapter exercises, and worked plus concise book-grounded answers. **Signal Processing is book Chapter 1 only.** Keep experiments direct, visual, calm, and close to the corresponding explanation.

## Current implementation
- **6 course cards, 12 study units, 100 practice questions, 30 registered experiments.** The lower unit count is intentional: two Signal foundation parts were consolidated into a single complete Chapter 1. Existing practice questions from both parts are retained under `signal-lec-1`.
- Windows: 8 sections per chapter; 3 code blocks in each, including a complete Unicode Win32 window. Two chapter sheets have **35 original numbered exercises each** (15 short-answer, 10 MCQ, 10 true/false).
- Signal: 7 sections covering conversion/hardware, elementary signals, support/transformations, periodicity/even/odd, system properties, convolution and difference equations. Its chapter sheet has **23 source exercises**. Q23 is above the Chapter 2 heading on PDF page 25, not absent. Missing option formula glyphs are explicitly marked; Q2(b)'s unexplained printed −z..z bounds receive conditional finite/all-integer interpretations.
- All **93 new source exercises** have a worked explanation, concise answer, translation, and source reference. They are authored study answers grounded in the book, **not an official author's answer key**.
- Code panels preserve LTR whitespace, offer Copy and Recall/Reveal, explain context and memory routes. End-of-chapter links open the matching sheet; full and concise solutions stay hidden until requested.
- New labs: Win32 code trace, Win32 types/handles, network media/throughput, agent task environments, signal support, periodicity, system properties, and convolution. Existing labs remain registered; section-level `experimentIds` put an experiment next to its concept without repeated copies in the same summary.
- AI/CCNA/IoT notes gained targeted worked examples and mappings; original IDs and study-question answer keys remain stable. Legacy IoT true/false sheet keys were normalized from strings to booleans so reveal/scoring works consistently.

## Earlier approved local UI work, carried forward
Mobile Programming (Coming soon) replaces Database Systems/Software Engineering placeholders. Networks is **CCNA**, instructor **د. سامية**. The other course is **Windows Programming**, without Visual. Navbar/footer tagline is under the wordmark, aligned to **شكرًا**: “بصمجة؟ آه. عمياني؟ لأ.” The hero notice is Egyptian Arabic only, says **“موعدكش.”**, has a compact ~240px minimum height, and omits the global Lectures count. Chapter labels apply only to Windows and Signal. Do not undo these preferences while improving study content.

## Architecture and private inputs
- Public assembly: `src/data/coursesData.ts`; subject modules provide actual notes. `courseSeeds.ts` is internal preserved metadata/questions/sheets; never render its empty note seeds directly or introduce an import cycle back to public assembly.
- `src/data/labCatalog.ts` and `ExperimentStudio.tsx` map catalogue IDs to lazy components. New code schema and sheet-answer fields are in `src/types/index.ts`; `CodeStudyBlock.tsx`, `LectureSection.tsx` and `CourseDetail.tsx` render them.
- Uploads and OCR remain private in `.hoplite/attachments/` and `.hoplite/materials-review/`. Scoped text is in `.hoplite/materials-review/chapter-work/`; original PDFs are also extracted under `/tmp/sem1-review/`. Do not commit raw PDFs/OCR or compiler executables.
- Read `docs/windows-chapters-source-map.md`, `docs/remaining-content-refinements.md`, and the current source data for provenance. Earlier `docs/SOURCE_COVERAGE.md` describes the previous deck-level milestone and is superseded where this report explicitly expands Windows/Signal to book chapters.

## Confirmed checks at this checkpoint
- `npx tsc --noEmit -p .` and `node scripts/test_curriculum.cjs` pass, including source worksheet inventories, numbering, bilingual fields/options, concise answers, parent IDs, embedded lab references and code fields.
- `npm run build` passes. Experiments remain lazy-loaded; the initial bundle still gives Vite's >500kB warning (about 927kB raw /269kB gzip); it is not suppressed.
- Complete Unicode Win32 sample cross-compiled on Linux using MinGW x64 with `-std=c++17 -Wall -Wextra -Werror -DUNICODE -D_UNICODE -municode` and `-luser32 -lgdi32`. Macro guards and the MSVC `/link /SUBSYSTEM:WINDOWS` command were corrected. This is compile proof, not native Windows runtime proof.
- Fresh browser matrix: **84 checks** (12 summaries +30 experiments ×light/dark at375px) pass without document horizontal overflow, including rendered code block counts. All three chapter sheets with **all 93 answers revealed** were checked in both themes at375px (6 checks), each rendering the exact expected count of concise answers without overflow.
- Browser flows exercised: code recall/reveal, chapter→matching sheet link, short/worked answer reveal, Win32 mouse dispatch/WM_CHAR/reset, pointer-width x86/x64, convolution stepping/reset, nonlinear and time-varying counterexamples, support mappings, fundamental period2/step anomaly, throughput constraints and agent-world views. No current application errors returned by the browser.
- Pure math checks confirmed full moving-average example `[3,0,6]*[1/3,1/3,1/3]=[1,1,3,2,2]` and all five support intervals. The input vector is explicitly a teaching example; coefficients follow the book's equation.
- Desktop code/convolution screenshots inspected; private artifacts live under `.hoplite/artifacts/` and are not committed. Independent review is being finalized; record its findings/corrections below before declaring final completion.

## Publication and quota
The user previously asked to batch local changes without pushing, then requested an emergency push at 98% daily/overall usage. **No tool exposes either quota percentage**, so that trigger cannot be detected or guaranteed. Preserve verified local commits and this handoff; do not claim a threshold was observed. No main-branch merge is authorized.

PR #8 was found merged. Current work uses derived branch **`hoplite/ioulis-f08d7e22--chapter-studios`** based on `origin/main` and carries the six pending local UI commits on top. No force-push was used. The previous original-branch commits remain recoverable. Publication status for this chapter upgrade: **not pushed yet**; do not confuse the managed private Preview with the live GitHub Pages site.

## Remaining acceptance / limitations
1. Finish independent source/solution review and resolve concrete findings; append acceptance evidence below.
2. No native Windows execution, live network measurements, real audio processing, full reference-book coverage beyond requested chapters, or proof that finite plots establish analytic properties is claimed.
3. Further UI/performance/accessibility polishing or additional book chapters require a separate scoped request; do not indefinitely add simulators after the requested acceptance gates pass.

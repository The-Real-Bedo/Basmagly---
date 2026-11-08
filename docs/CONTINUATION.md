# Curriculum / visual learning handoff

## Outcome and scope
The requested uploaded lecture decks are implemented: **13 lectures, 100 practice questions, 22 registered experiments**, across five available subjects. The catalogue now has one unavailable Mobile Programming placeholder in place of Database Systems and Software Engineering. English is primary for notes, examples, quizzes, worked solutions, lab observations, review and glossary; Egyptian Arabic supports it.

- AI: four lectures, including the earlier AI1 work; remaining agents/PEAS, formulation and search material is source-linked.
- Networks: three lectures, with dedicated subnetting instead of squeezing the entire third deck into the IPv4 introduction.
- IoT: two revised lectures, distinguishing the three-stage source flow from a supplementary feedback loop and the theoretical five-layer from practical six-block view.
- Windows Programming: two foundation lectures; mock message queue/dispatch/window updates and sequential/event-driven comparison.
- Signal Processing: two foundation lectures; computed sampling/quantization and discrete-time stem plots with transformations.

See `docs/SOURCE_COVERAGE.md` and `docs/ai-source-map.md` for source scope and modelling limitations. The original AI4 exercise and simulator now use the source's unweighted A-root tree; UCS assumptions and visit conventions are explicit.

## Architecture for the next model
- `src/data/coursesData.ts` is the public curriculum assembly point.
- `src/data/courseSeeds.ts` preserves existing metadata, questions, concept checks and sheets. Its intentionally empty note bodies are internal seeds, never rendered directly. Do not import the public assembly from a subject module: that would create a runtime import cycle.
- Subject notes live in `aiLectureOne.ts`, `aiRemainingLectures.ts`, `networkLectures.ts`, `iotLectures.ts`, `windowsProgrammingCourse.ts`, and `signalProcessingCourse.ts`.
- `src/data/labCatalog.ts` owns catalogue metadata. `ExperimentStudio.tsx` lazily registers the matching components and supplies one-at-a-time labs plus optional experiments alongside every lecture's notes. The old AI1-only workbench was replaced by this shared studio.
- Keep IDs stable. All 69 pre-existing practice-question IDs and answer keys were compared and preserved; 31 new source-backed practice questions were added.
- Arabic text inherits its container colour, avoiding inverted-button contrast bugs. Text/controls were made calmer and English-first, and the old exam-pledge copy was replaced by “Turn the page. See the idea.” / “من صفحة لفكرة… ومن فكرة لتجربة”. Motion honours reduced-motion preferences.

## Inputs and privacy
`Sem1-data.zip` contains 18 PDFs / 747 pages. Three are reference books; this work does **not** claim full-book summarization. Only uploaded lecture decks and supplied sheets define the implemented scope, with labelled reference background. Original attachments and OCR under `.hoplite/attachments/` and `.hoplite/materials-review/` stay private and uncommitted. A fresh independent checkout needs those uploads again for a page-by-page expansion; the current thread workspace retains them.

## Confirmed verification
- `npx tsc --noEmit -p .` passed.
- `node scripts/test_curriculum.cjs` passed: unique IDs, bilingual fields/options, answer indices and booleans, parent IDs, sheets and catalogue/render destinations. The script exports the assembled data for bounded checks.
- `npm run build` passed. Experiments build as on-demand chunks; the initial bundle still produces Vite's >500 kB warning (about 808 kB uncompressed / 233 kB gzip). This warning is not suppressed.
- Managed Preview / agent-browser: 70 light/dark mobile checks (all 13 summaries and all 22 lab panels at 375px) passed with no document horizontal overflow. A long Windows API name in the brief initially overflowed; wrapping was fixed and the entire matrix rerun successfully.
- All 8 existing expanded sheets checked in both themes at 375px: 16 checks passed. Show/hide model solutions verified.
- Quick Check incorrect/correct/reset verified; quiz submission produced 1/10 and reset returned 0/10.
- Behavior checked: hub collision, central-switch topology failure/reset, broadcast and mode reset, per-hop MAC rewrite, live OSI trace, /31 (2 hosts) and /32 (1 host), offline cloud failure and mode reset, IoT flow and theoretical/practical/TCP/UDP modes, vacuum step/autoplay/reset, agent scenario/steps, search step/autoplay locking/preset reset, Windows queue→retrieve→dispatch and event-handler flow, sampling alias/quantization/input invalidation/reset, and discrete shift/even-part/reset.
- Pure search checks confirmed both presets under BFS/DFS/UCS, including the exact A-root DFS sequence and cost 4.
- Fresh desktop Windows/signal screenshots and mobile dark homepage were inspected. No app errors were returned by browser error output. Screenshots and detailed local proof are private under `.hoplite/artifacts/` and are not committed.
- The legacy `scripts/test_ai_course.cjs` hard-codes a macOS Edge executable and old copy expectations. It was not used as proof for this work; current verification is the checks above, not a claim that the legacy script passed.

## Remaining / optional follow-up
No supplied lecture deck remains unimplemented in this task. Further work should be a separately scoped request:
1. Split or defer course text to reduce the remaining initial-bundle warning, if performance becomes a priority.
2. Expand reference-book chapters only when requested; later Windows SDK/MFC/Qt/C++/CLI and signal transforms/filters chapters are not inferred to be taught lectures.
3. Add Mobile Programming content when its actual source materials are supplied; its current card is marked Coming soon.
4. More exhaustive scenario combinations, accessibility auditing, native Windows execution or real network/audio measurements were not claimed; the existing labs are explicitly teaching models.

## Quota and publication
No tool exposes daily/overall quota percentage, so a 98% trigger cannot be detected or guaranteed. A safe checkpoint (`253dbea`, including prior AI1 work) was pushed early; the completed implementation and this report are committed and pushed to the existing `hoplite/ioulis-f08d7e22` branch. No force-push, merge, or main-branch deployment is performed. Read current Git status and this report before continuing with another model; never equate the private Preview with a production deploy.

## Local-only follow-up — 2026-11-08
The user requested replacing the two unavailable Database Systems / Software Engineering cards with one Mobile Programming card marked Coming soon / قريبًا. The change is committed locally only. **Do not push this follow-up or subsequent edits until the user explicitly asks to publish the batch.** Earlier publication notes above apply to the previous curriculum checkpoint, not this follow-up.

The next local-only follow-up renames Computer Networks to CCNA, sets its instructor to د. سامية, and renames Visual & Windows Programming to Windows Programming (برمجة Windows). Course/lecture IDs and all teaching content remain unchanged. This correction is also held locally for the same unpublished batch.

Another local-only follow-up replaces the navbar/footer tagline with “بصمجة؟ آه. عمياني؟ لأ.” and turns the homepage hero into a lighthearted Egyptian Arabic study notice: cramming may have worked before, but no grades are promised. An English counterpart remains, and instructional content stays English-first. This is still part of the unpublished batch; do not push until asked.

Latest local-only refinement: keep the tagline inline beside the Arabic wordmark in both navbar and footer (never below the logo), remove the hero notice’s English translation at the user’s request, and use the exact colloquial spelling “موعدكش.”. Instructional English-first content is unchanged; publication remains on hold.

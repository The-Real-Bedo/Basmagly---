# AGENTS.md — Working rules for بصمجّلي شكرًا (Basmagly)

Read this file fully before editing anything. It captures the design system, the
bilingual (Egyptian Arabic + English) writing rules, the simulator conventions and
the verification workflow that every change must follow. When in doubt, copy an
existing pattern from the files named below instead of inventing a new one.

## 1. Project map

- Stack: React 19 + TypeScript + Vite 6 + Tailwind 3.4. No router, no backend, no tests framework.
- `src/App.tsx` — home dashboard, term switch, lab directory (`ALL_LABS`), navigation state.
- `src/components/` — `Navbar`, `Footer`, `CourseCard`, `CourseDetail`, `LectureSummary` (tabs: summary / labs / quiz / cheat sheet / glossary), `QuizSystem`.
- `src/components/ArabicText.tsx` — **the** bilingual text primitive. Read it before touching any Arabic string.
- `src/components/interactive/*.tsx` — the 10 simulators ("labs"). Reference implementation for structure: `EdgeVsCloudLab.tsx`.
- `src/data/coursesData.ts` — all course/lecture/quiz content. `src/types/index.ts` — its schema.
- `src/index.css` — theme tokens, RTL rules, lab animations. `tailwind.config.js` — palette (`beige`, `stone`), font families, 13px minimum font scale.
- `.github/workflows/deploy-pages.yml` + `vite.config.ts` `base` — GitHub Pages deploy under `/Basmagly---/`. Do not change `BASE_PATH` handling.

## 2. Design system (do not drift)

- Page background `bg-[#FBF9F5] dark:bg-[#121214]`. Card: `bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm`. Inner surface: `bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl border border-beige-300 dark:border-stone-800`.
- Toggle pills: active `bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm`, inactive `text-stone-600 dark:text-zinc-400`. Primary CTA: `bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900`.
- Semantic colours only: **emerald** = success, **rose** = error/failure/collision, **amber** = highlight/active/warning/high-yield, **sky** = info. Neutral everything else (beige/stone/zinc). No blue/purple/indigo.
- **Every** colour class needs a `dark:` twin (bg, text, border, hover). Check both themes.
- Minimum text size is 13px (`text-xs`). Never `text-[10px]`, `text-[11px]`, `text-[12px]`.
- Tailwind 3.4 has **no** `shadow-xs` / `shadow-2xs`. Use `shadow-sm`.
- Icons: `lucide-react` only. Lab header icon badge: `p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300`.
- Never use `!important` (`!text-*`) to win a style fight; fix the class order/structure instead.
- No hard-coded counts in UI (`6 courses`, `10 labs`); derive them from data.

## 3. Bilingual text rules (the most important section)

### 3.1 Rendering Arabic
- Arabic that may contain punctuation (`: ، ! ? ( ) …`) or an English term **must** be inside an element with `dir="rtl"`. Prefer `<ArabicText>` (renders `<p>`; use `as="span"` inline, `as="h3"` for headings). Otherwise punctuation flips (`:تحليل` instead of `تحليل:`).
- `<ArabicText>` automatically isolates English terms in `<bdi dir="ltr">`, so you can write `ليه الـ Hub بيعمل Collision (تصادم)` as one string.
- Pass colour/size/alignment via `className` — `text-*`, `text-center`, `text-left` all override its defaults. Do not wrap it in extra spans to force colour.
- Short pure-Arabic words in buttons may use `className="font-arabic"` without `dir`.
- Arabic must **never** sit inside `font-mono`, `uppercase`, or `tracking-*` (letters get spaced out and the font is wrong). English codes/IPs/MACs/numbers → `font-mono` is correct.
- Dynamic strings that may be Arabic *or* English (e.g. instructor name): `dir="auto"` + `hasArabic(value) ? 'font-arabic' : 'font-mono'` (helper exported from `ArabicText.tsx`).
- `<textarea>`/`<input>` that accept free text: `dir="auto"`, `placeholder:font-arabic`.

### 3.2 Label pattern
- Bilingual labels are **Arabic first, English in parentheses**: `الراسل (Sender)`, `عنوان الشبكة (Network ID)`, `ابدأ المذاكرة (Open Lecture)`. Keep this pattern consistent inside a file; don't mix with `English (عربي)`.
- When the two halves need different fonts (e.g. a button), split them: `<span className="font-arabic">ابدأ المذاكرة</span><span className="font-mono text-[13px] opacity-80">(Open Lecture)</span>`.
- Lab header (copy exactly from `EdgeVsCloudLab.tsx`): icon badge + `<h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">English title</h3>` + `<ArabicText className="text-sm text-stone-600 dark:text-zinc-400">Arabic subtitle</ArabicText>`.

### 3.3 Writing style
- Tone for explanations is **Egyptian colloquial** ("شوف", "جرب", "خد بالك", "يا هندسة"). Each sentence must be *fully* colloquial or *fully* MSA — never `وماذا يحدث` inside a colloquial sentence (→ `وإيه اللي بيحصل`).
- Technical terms stay in **English**, prefixed with `الـ ` (with the tatweel/kashida): `الـ Hub`, `الـ MAC`, `الـ Switch`. Not `الهب`, `السويتش`, `ال MAC`, `الMAC`.
- Spelling: correct hamza (`أ/إ/آ/ء`), taa marbuta vs haa (`ة/ه`), alef maqsura (`ى/ي`), no space before punctuation, no doubled punctuation. Use `←` for sequence arrows in Arabic text (`➔`/`→` point the wrong way in RTL) and `→` in English.
- Keep numbers Latin (`toLocaleString('en-US')`), units in words inside Arabic (`درجة مئوية`), and don't put `°C`/`%` directly next to Arabic words.
- English: consistent capitalisation of OSI, TCP/IP, IPv4, MAC, Wi-Fi, IoT; `&` in titles, `and` in prose.
- Every Arabic field must be a faithful translation of its English sibling (same meaning, same level of detail) — not a paraphrase with extra/missing claims.

## 4. Simulators (`src/components/interactive/`)

- Structure: outer card → header (3.2) → controls (inner surface) → visual canvas → narrative/status box (`aria-live="polite"`) → theory/comparison cards.
- Timers: keep every `setTimeout`/`setInterval` id in a `useRef` array, clear them on reset, on mode/topology change and in a `useEffect` cleanup on unmount. Never `setState` after unmount. Prefer a pure `buildSteps()` that returns timed steps, then schedule them.
- Lock inputs while a run is in progress; clear stale results when the user changes inputs.
- Responsive: **no horizontal overflow at 375px**. Use `flex-wrap`, stack grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), and `overflow-x-auto` around fixed-size diagrams/tables. Absolutely-positioned nodes must have explicit, non-overlapping coordinates on a fixed-size canvas.
- Correctness beats prettiness. The simulation must match the textbook: hub = one collision domain, floods all ports; switch = per-port collision domains, forwards by MAC table, floods unknown unicast/broadcast; router = separates broadcast domains, rewrites MAC per hop, IP constant; subnet math exact for /0–/32 (incl. /31 and /32); vacuum world = simple reflex agent with Russell & Norvig scoring; Turing test = interrogator/human/machine + 6 disciplines.
- Lab ids are referenced in three places and must stay in sync: `ALL_LABS` in `App.tsx`, the `includes('…')` switch in `LectureSummary.tsx`, and `interactiveTools` in `coursesData.ts`. Allowed ids: `network-devices, packet-journey, osi-visualizer, subnet-calculator, transmission-lab, topology-simulator, vacuum-world, turing-test, edge-vs-cloud, iot-simulator`.

## 5. Content data (`src/data/coursesData.ts`)

- Never change ids, structure, or remove items unless explicitly asked.
- Invariants: `options.length === optionsAr.length`; MCQ `correctAnswer` is a valid index of the truly correct option; true/false `correctAnswer` is a boolean; `bulletPoints.length === bulletPointsAr.length`; every non-essay question has `explanationAr`; essays have `modelAnswer` + `modelAnswerAr`; question `courseId`/`lectureId` match the parent.
- Facts must be right (OSI layer numbers/PDU names, device layers, IPv4 classes with 127 = loopback, port numbers at Transport layer, throughput ≤ bandwidth, etc.). If you fix a fact that changes a question's answer, update `correctAnswer`, `explanation` and `explanationAr` together.

## 6. Workflow for every change

1. Read the file(s) you will touch in full, plus `ArabicText.tsx` and one reference lab, before the first edit.
2. Make the smallest change that fits the existing pattern. Don't refactor unrelated code or rename things.
3. Run `npx tsc --noEmit -p .` and `npm run build` — both must pass with zero errors.
4. Open the app (`npm run dev`, port 3000) and check the changed screen in **light and dark** mode and at **375px** width (no horizontal scroll: `document.documentElement.scrollWidth === clientWidth`). For simulators, actually click through the interaction (run, reset, change mode mid-run) and watch the console for errors.
5. Commit with a message that says *what* and *why*; keep PRs scoped to one topic.

## 7. Don'ts (things that have already been fixed once — don't reintroduce)

- Arabic inside `font-mono`/`uppercase`/`tracking-wider`.
- `display: inline-block` on `bdi` (breaks line wrapping of long English phrases).
- Hard-coded colours on `bdi` (invisible on dark surfaces) — it must inherit colour.
- `shadow-xs`, `shadow-2xs`, `!text-*`, `text-[10px]`-`text-[12px]`.
- Mixed label order (`English (عربي)` next to `عربي (English)`).
- Transliterated tech terms (`الهب`, `السابنتينج`, `الكلاود`).
- Missing `dark:` variants on any coloured element.
- Timers that survive unmount/reset.
- Changing `vite.config.ts` `base`, the Pages workflow, or lab ids.

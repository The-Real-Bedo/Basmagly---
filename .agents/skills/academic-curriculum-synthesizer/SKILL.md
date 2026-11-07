---
name: academic-curriculum-synthesizer
description: >-
  Expert pedagogical curriculum synthesizer for university-level computer science and engineering courses.
  Enforces in-depth lecture analysis ("دماغ دكتور"), slide-by-slide and chapter-by-chapter extraction,
  diagram analysis, dedicated interactive simulator creation, strict separation of official section sheets
  from practice quiz banks, and bilingual Egyptian colloquial & MSA explanations adhering to AGENTS.md.
---

# Academic Curriculum Synthesizer Skill ("دماغ دكتور")

This skill guides the synthesis and enrichment of university courseware into the Basmagly study platform.

## 1. Core Principles ("دماغ دكتور")
- **Zero Superficiality**: Every definition, diagram, architecture, protocol mechanism, and edge case must be covered thoroughly.
- **Tone & Voice**: Academic clarity in English paired with engaging, respectful Egyptian colloquial explanations ("شوف", "خد بالك في الامتحان", "الفكرة ببساطة").
- **Exact Bilingual Mirroring**: Every Arabic bullet or explanation must match the meaning and depth of its English counterpart.

## 2. Reading Layout Compliance (`LectureSection.tsx`)
All lecture summary sections must strictly conform to the approved `LectureSection.tsx` component schema:
- `title`: English title (e.g. `1. Title`).
- `titleAr`: Arabic title.
- `content`: Academic English definition (rendered in Definition card).
- `contentAr`: Egyptian colloquial intuitive explanation (rendered in الفكرة ببساطة card).
- `bulletPoints`: Array of `Term: Detailed explanation` in English.
- `bulletPointsAr`: Array of `المصطلح: الشرح المفصل` in Arabic.
- `keyRule`: High-Yield Rule in English.
- `keyRuleAr`: خد بالك في الامتحان in Arabic.

## 3. Dedicated Simulators (No Cross-Course Borrowing)
- Never assign network simulators to IoT or AI courses.
- When a lecture features a key visual diagram (e.g., 5-layer IoT stack, 3-way handshake, state search tree), implement a dedicated interactive simulator for that course and register it cleanly across `App.tsx`, `LectureSummary.tsx`, and `coursesData.ts`.

## 4. Separation of Sheets vs Quiz Bank
- **Official Section Sheets (`course.sheets`)**: Exact reproduction of official faculty section problem sets with complete step-by-step academic solutions and slide citations.
- **Practice Quiz Bank (`lecture.questions`)**: Independent, comprehensive bank of MCQs, True/False, and essay problems with scoring keys and explanations.

## 5. Verification Protocol
1. Type check and build: `npm run build`.
2. Browser automation inspection using Puppeteer on desktop and mobile (375px) viewports.
3. Verify zero horizontal overflow and zero console errors.
4. Keep changes committed locally; do NOT push to remote repositories unless explicitly instructed.

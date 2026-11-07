import React from 'react';
import { BookOpen, Lightbulb, Star } from 'lucide-react';
import { SummarySection } from '../types';
import { ArabicText, formatArabicWithEnglish } from './ArabicText';

/** Splits "Term: explanation" into a bold lead + rest when the colon comes early. */
const splitLead = (text: string): [string | null, string] => {
  const idx = text.indexOf(':');
  if (idx > 0 && idx <= 40) return [text.slice(0, idx).trim(), text.slice(idx + 1).trim()];
  return [null, text];
};

/** Content titles are stored as "1. Title"; the numbered rail already shows the index. */
export const stripLeadingNumber = (title: string) => title.replace(/^\s*\d+[.)]\s*/, '');

export const sectionAnchorId = (index: number) => `lecture-section-${index + 1}`;

interface LectureSectionProps {
  section: SummarySection;
  index: number;
  total: number;
}

/**
 * Approved explanation-section layout (see AGENTS.md §4):
 * dark numbered side rail → title → Definition | الفكرة ببساطة cards → English | Arabic columns.
 */
export const LectureSection: React.FC<LectureSectionProps> = ({ section, index, total }) => {
  const number = String(index + 1).padStart(2, '0');
  const points = section.bulletPoints ?? [];

  return (
    <section
      id={sectionAnchorId(index)}
      className="scroll-mt-28 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-[88px,1fr]"
    >
      {/* Side rail (horizontal strip below lg) */}
      <div className="bg-stone-900 dark:bg-stone-950 text-stone-100 flex lg:flex-col items-center gap-3 px-5 py-4 lg:px-0 lg:py-6 border-b lg:border-b-0 lg:border-r border-stone-800">
        <span className="font-display text-4xl font-extrabold text-amber-400 leading-none">{number}</span>
        <span className="text-[13px] font-mono text-zinc-400">/ {String(total).padStart(2, '0')}</span>
        <span className="hidden lg:block flex-1 w-px bg-stone-700/60 my-2" />
        <span className="hidden lg:flex w-8 h-8 rounded-lg bg-stone-800 items-center justify-center text-amber-400">
          <BookOpen className="w-4 h-4" />
        </span>
      </div>

      <div className="min-w-0">
        <header className="px-7 pt-6 pb-5 border-b border-beige-200 dark:border-stone-800 space-y-1">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
            {stripLeadingNumber(section.title)}
          </h3>
          <ArabicText className="text-lg font-semibold text-stone-600 dark:text-zinc-300">
            {stripLeadingNumber(section.titleAr)}
          </ArabicText>
        </header>

        {/* Intro cards: Definition | الفكرة ببساطة */}
        <div className="p-7 pb-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 p-5">
            <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400 flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4" /> Definition
            </span>
            <p className="text-[15px] text-stone-800 dark:text-stone-200 leading-relaxed">{section.content}</p>
          </div>
          <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 p-5">
            <ArabicText as="span" className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 shrink-0" /> الفكرة ببساطة
            </ArabicText>
            <ArabicText className="text-[15px] font-medium text-stone-800 dark:text-zinc-200">{section.contentAr}</ArabicText>
          </div>
        </div>

        {/* Highlights + rule: English column | Arabic column */}
        {(points.length > 0 || section.keyRule) && (
          <div className="mt-6 border-t border-beige-200 dark:border-stone-800 grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-beige-200 dark:divide-stone-800">
            <div className="p-7 space-y-5">
              {points.length > 0 && (
                <>
                  <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400 block">
                    Core Highlights · English
                  </span>
                  <ul className="space-y-3">
                    {points.map((point, i) => {
                      const [lead, rest] = splitLead(point);
                      return (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed">
                          <span className="w-6 h-6 rounded-md bg-beige-100 dark:bg-stone-800 border border-beige-300 dark:border-stone-700 text-[13px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-stone-800 dark:text-zinc-200">
                            {i + 1}
                          </span>
                          <p className="text-stone-800 dark:text-stone-200">
                            {lead && <strong className="text-stone-900 dark:text-white">{lead}: </strong>}
                            {rest}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              {section.keyRule && (
                <div className="rounded-xl border-2 border-amber-300 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-950/30 p-4">
                  <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-1.5">
                    <Star className="w-4 h-4 fill-current" /> High-Yield Rule
                  </span>
                  <p className="text-[15px] font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">{section.keyRule}</p>
                </div>
              )}
            </div>

            <div className="p-7 space-y-5 bg-[#FAF7F2]/70 dark:bg-stone-950/50 border-t lg:border-t-0 border-beige-200 dark:border-stone-800">
              {points.length > 0 && (
                <>
                  <ArabicText as="span" className="text-sm font-bold text-stone-500 dark:text-zinc-400 block">
                    النقط الأساسية · بالعربي
                  </ArabicText>
                  <ul className="space-y-3">
                    {points.map((_, i) => {
                      const pointAr = section.bulletPointsAr?.[i];
                      if (!pointAr) return null;
                      const [lead, rest] = splitLead(pointAr);
                      return (
                        <li key={i} dir="rtl" className="flex gap-3 text-sm leading-relaxed">
                          <span className="w-6 h-6 rounded-md bg-white dark:bg-stone-800 border border-beige-300 dark:border-stone-700 text-[13px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-stone-800 dark:text-zinc-200">
                            {i + 1}
                          </span>
                          <ArabicText className="text-stone-800 dark:text-zinc-200">
                            {lead && <strong className="text-stone-900 dark:text-white">{formatArabicWithEnglish(`${lead}:`)}</strong>}
                            {lead ? ` ${rest}` : rest}
                          </ArabicText>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              {section.keyRuleAr && (
                <div className="rounded-xl border-2 border-amber-300 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-950/30 p-4">
                  <ArabicText as="span" className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-1.5">
                    <Star className="w-4 h-4 fill-current" /> خد بالك في الامتحان
                  </ArabicText>
                  <ArabicText className="text-[15px] font-semibold text-stone-900 dark:text-stone-100">{section.keyRuleAr}</ArabicText>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LectureSection;

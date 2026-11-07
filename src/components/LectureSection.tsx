import React from 'react';
import { BookOpen, Lightbulb, ListChecks, Star } from 'lucide-react';
import { SummarySection } from '../types';
import { ArabicText, formatArabicWithEnglish } from './ArabicText';

/** Splits "Term: explanation" into a bold lead + rest when the colon comes early. */
const splitLead = (text: string): [string | null, string] => {
  const idx = text.indexOf(':');
  if (idx > 0 && idx <= 40) return [text.slice(0, idx).trim(), text.slice(idx + 1).trim()];
  return [null, text];
};

/** Content titles are stored as "1. Title"; the numbered badge already shows the index. */
export const stripLeadingNumber = (title: string) => title.replace(/^\s*\d+[.)]\s*/, '');

interface LectureSectionProps {
  section: SummarySection;
  index: number;
  total: number;
}

export const sectionAnchorId = (index: number) => `lecture-section-${index + 1}`;

export const LectureSection: React.FC<LectureSectionProps> = ({ section, index, total }) => {
  const number = String(index + 1).padStart(2, '0');

  return (
    <section
      id={sectionAnchorId(index)}
      className="scroll-mt-28 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl shadow-sm overflow-hidden"
    >
      {/* Header strip */}
      <div className="flex items-start gap-4 p-6 sm:p-7 pb-5 border-b border-beige-200 dark:border-stone-800 bg-[#FAF7F2]/70 dark:bg-stone-950/50">
        <span className="w-12 h-12 rounded-2xl bg-stone-900 dark:bg-stone-100 text-amber-400 dark:text-amber-600 font-mono font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
          {number}
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <span className="text-[13px] font-mono font-semibold text-stone-500 dark:text-zinc-400 block">
            Section {index + 1} of {total}
          </span>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {stripLeadingNumber(section.title)}
          </h3>
          <ArabicText className="text-base font-semibold text-stone-700 dark:text-zinc-300">
            {stripLeadingNumber(section.titleAr)}
          </ArabicText>
        </div>
      </div>

      <div className="p-6 sm:p-7 space-y-6">
        {/* Bilingual intro: definition (EN) | simplified idea (AR) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-beige-200 dark:border-stone-800 space-y-2.5">
            <span className="flex items-center gap-2 text-[13px] font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400">
              <BookOpen className="w-4 h-4 shrink-0" />
              Academic Definition
            </span>
            <p className="text-[15px] text-stone-800 dark:text-stone-200 leading-relaxed">
              {section.content}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-2.5">
            <ArabicText as="span" className="flex items-center gap-2 text-sm font-bold text-stone-800 dark:text-zinc-200">
              <Lightbulb className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              الفكرة ببساطة
            </ArabicText>
            <ArabicText className="text-[15px] font-medium text-stone-700 dark:text-zinc-300">
              {section.contentAr}
            </ArabicText>
          </div>
        </div>

        {/* Highlights: numbered rows, EN | AR columns on desktop */}
        {section.bulletPoints && section.bulletPoints.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[13px] font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400">
                <ListChecks className="w-4 h-4 shrink-0" />
                Core Highlights
              </span>
              <ArabicText as="span" className="text-[13px] font-semibold text-stone-500 dark:text-zinc-400">
                النقط الأساسية اللي لازم تثبت في دماغك
              </ArabicText>
            </div>

            <ol className="rounded-2xl border border-beige-200 dark:border-stone-800 divide-y divide-beige-200 dark:divide-stone-800 overflow-hidden">
              {section.bulletPoints.map((point, i) => {
                const [leadEn, restEn] = splitLead(point);
                const pointAr = section.bulletPointsAr?.[i];
                const [leadAr, restAr] = pointAr ? splitLead(pointAr) : [null, ''];

                return (
                  <li
                    key={i}
                    className="grid grid-cols-[auto,1fr] lg:grid-cols-[auto,1fr,1fr] gap-x-4 gap-y-2 p-4 odd:bg-white even:bg-[#FAF7F2]/70 dark:odd:bg-stone-900 dark:even:bg-stone-950/60"
                  >
                    <span className="w-7 h-7 rounded-lg bg-beige-100 dark:bg-stone-800 border border-beige-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200 text-[13px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>

                    <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                      {leadEn && <strong className="text-stone-900 dark:text-white">{leadEn}: </strong>}
                      {restEn}
                    </p>

                    {pointAr && (
                      <ArabicText className="text-sm text-stone-700 dark:text-zinc-300 col-start-2 lg:col-start-3 lg:border-l lg:border-beige-200 dark:lg:border-stone-800 lg:pl-4">
                        {leadAr && (
                          <strong className="text-stone-900 dark:text-white">{formatArabicWithEnglish(`${leadAr}:`)}</strong>
                        )}
                        {leadAr ? ` ${restAr}` : restAr}
                      </ArabicText>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {/* High-yield exam rule */}
        {section.keyRule && (
          <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-950/30 overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-2.5 bg-amber-100/80 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800/60">
              <span className="flex items-center gap-2 text-[13px] font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                <Star className="w-4 h-4 shrink-0 fill-current" />
                High-Yield Rule
              </span>
              <ArabicText as="span" className="text-[13px] font-bold text-amber-900 dark:text-amber-300">
                خد بالك في الامتحان
              </ArabicText>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <p className="text-[15px] font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">
                {section.keyRule}
              </p>
              {section.keyRuleAr && (
                <ArabicText className="text-[15px] font-medium text-stone-800 dark:text-zinc-200 lg:border-l lg:border-amber-200 dark:lg:border-amber-800/60 lg:pl-4">
                  {section.keyRuleAr}
                </ArabicText>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LectureSection;

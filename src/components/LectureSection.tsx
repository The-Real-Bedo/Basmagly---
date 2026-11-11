import React from 'react';
import { BookOpen, Lightbulb, Star, Sparkles, RotateCcw, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { SummarySection, QuickCheck } from '../types';
import { ArabicText, formatArabicWithEnglish } from './ArabicText';
import { CodeStudyBlock } from './CodeStudyBlock';
import { InlineExperiment } from './interactive/ExperimentStudio';

/** Splits "Term: explanation" into a bold lead + rest when the colon comes early. */
const splitLead = (text: string): [string | null, string] => {
  const idx = text.indexOf(':');
  if (idx > 0 && idx <= 40) return [text.slice(0, idx).trim(), text.slice(idx + 1).trim()];
  return [null, text];
};

/** Content titles are stored as "1. Title"; the numbered rail already shows the index. */
export const stripLeadingNumber = (title: string) => title.replace(/^\s*\d+[.)]\s*/, '');

export const sectionAnchorId = (index: number) => `lecture-section-${index + 1}`;

interface QuickConceptCheckProps {
  check: QuickCheck;
  sectionIndex: number;
}

export const QuickConceptCheck: React.FC<QuickConceptCheckProps> = ({ check }) => {
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  const isCorrect = selectedOption !== null && selectedOption === check.correctIndex;

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    setHasInteracted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasInteracted(false);
  };

  return (
    <div className="mt-6 border-t border-beige-200 dark:border-stone-800 p-4 sm:p-6 bg-[#FAF7F2]/50 dark:bg-stone-950/40">
      <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </span>
            <div>
              <span className="block text-[13px] font-mono font-bold uppercase tracking-wider text-stone-600 dark:text-zinc-400">
                Quick Check
              </span>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">اختبر فهمك بسرعة</ArabicText>
            </div>
          </div>
          {hasInteracted && (
            <button
              onClick={handleReset}
              className="text-[13px] font-medium text-stone-600 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
              <ArabicText as="span" className="text-[13px] text-stone-600 dark:text-zinc-400">(إعادة التجربة)</ArabicText>
            </button>
          )}
        </div>

        {/* Question Prompt */}
        <div className="space-y-1">
          <p className="text-base font-bold text-stone-900 dark:text-stone-100">
            {check.question}
          </p>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{check.questionAr}</ArabicText>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {check.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            
            let btnStyle = 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-zinc-200 hover:border-amber-400 dark:hover:border-amber-600';
            
            if (hasInteracted) {
              if (isSelected) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400/30';
                } else {
                  btnStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400/30';
                }
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all active:scale-[0.98] ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-md bg-stone-200 dark:bg-stone-700 text-[13px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <span className="text-sm font-semibold block leading-relaxed">{option}</span>
                  {check.optionsAr[idx] && <ArabicText className="text-sm text-stone-600 dark:text-zinc-400 block">{check.optionsAr[idx]}</ArabicText>}
                </div>
                {hasInteracted && isSelected && (
                  <span className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {hasInteracted && (
          <div
            className={`p-4 rounded-xl border transition-all ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <HelpCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-sm" aria-live="polite">
                <p className={`font-bold ${isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
                  {isCorrect ? 'Correct — well done.' : 'Not quite. Review the concept and try again.'}
                </p>
                <ArabicText className={`text-sm ${isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
                  {isCorrect ? 'إجابة صحيحة، أحسنت.' : 'الإجابة غير صحيحة. راجع الفكرة وجرب مرة أخرى.'}
                </ArabicText>
                <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed pt-2 border-t border-beige-200 dark:border-stone-800">{check.explanation}</p>
                <ArabicText className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">{check.explanationAr}</ArabicText>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface LectureSectionProps {
  section: SummarySection;
  index: number;
  total: number;
  anchorId?: string;
}

/**
 * Approved explanation-section layout (see AGENTS.md §4):
 * dark numbered side rail → title → Definition | الفكرة ببساطة cards → English | Arabic columns.
 */
export const LectureSection: React.FC<LectureSectionProps> = ({ section, index, total, anchorId }) => {
  const number = String(index + 1).padStart(2, '0');
  const points = section.bulletPoints ?? [];

  return (
    <section
      id={anchorId ?? sectionAnchorId(index)}
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
        <header className="px-5 sm:px-7 pt-6 pb-5 border-b border-beige-200 dark:border-stone-800 space-y-1">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
            {stripLeadingNumber(section.title)}
          </h3>
          <ArabicText className="text-lg font-semibold text-stone-600 dark:text-zinc-300">
            {stripLeadingNumber(section.titleAr)}
          </ArabicText>
        </header>

        {/* Intro cards: Definition | الفكرة ببساطة */}
        <div className="p-5 sm:p-7 pb-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 p-5">
            <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-stone-600 dark:text-zinc-400 flex items-center gap-2 mb-2">
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
            <div className="p-5 sm:p-7 space-y-5">
              {points.length > 0 && (
                <>
                  <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-stone-600 dark:text-zinc-400 block">
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
                <div className="rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-950/30 p-4">
                  <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-1.5">
                    <Star className="w-4 h-4 fill-current" /> High-Yield Rule
                  </span>
                  <p className="text-[15px] font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">{section.keyRule}</p>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-7 space-y-5 bg-[#FAF7F2]/70 dark:bg-stone-950/50 border-t lg:border-t-0 border-beige-200 dark:border-stone-800">
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
                          <ArabicText className="text-stone-600 dark:text-zinc-400">
                            {lead && <strong className="text-stone-700 dark:text-zinc-300">{formatArabicWithEnglish(`${lead}:`)}</strong>}
                            {lead ? ` ${rest}` : rest}
                          </ArabicText>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              {section.keyRuleAr && (
                <div className="rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-950/30 p-4">
                  <ArabicText as="span" className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-1.5">
                    <Star className="w-4 h-4 fill-current" /> خد بالك في الامتحان
                  </ArabicText>
                  <ArabicText className="text-[15px] font-semibold text-stone-900 dark:text-stone-100">{section.keyRuleAr}</ArabicText>
                </div>
              )}
            </div>
          </div>
        )}

        {section.codeExamples && section.codeExamples.length > 0 && <div className="border-t border-beige-300 dark:border-stone-800 p-4 sm:p-7 space-y-4">{section.codeExamples.map((example, index) => <CodeStudyBlock key={index} example={example} />)}</div>}
        {section.experimentIds && section.experimentIds.length > 0 && <div className="border-t border-beige-300 dark:border-stone-800 p-4 sm:p-7 space-y-4">{section.experimentIds.map(id => <InlineExperiment key={id} id={id} />)}</div>}

        {/* Micro-interactive Quick Concept Check */}
        {section.quickCheck && (
          <QuickConceptCheck check={section.quickCheck} sectionIndex={index} />
        )}
      </div>
    </section>
  );
};

export default LectureSection;

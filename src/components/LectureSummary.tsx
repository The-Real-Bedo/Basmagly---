import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles, BookA, FlaskConical, HelpCircle, ChevronLeft, Clock, ArrowUpRight } from 'lucide-react';
import { Lecture } from '../types';
import { getCourseUnitLabels } from '../utils/courseUnits';
import { ArabicText } from './ArabicText';
import { LectureSection, sectionAnchorId, stripLeadingNumber } from './LectureSection';
import { ExperimentStudio, InlineExperiment } from './interactive/ExperimentStudio';
import { QuizSystem } from './QuizSystem';

type StudyTab = 'summary' | 'cheatSheet' | 'terms' | 'interactive' | 'quiz';
interface LectureSummaryProps {
  lecture: Lecture;
  initialTab?: StudyTab;
  initialExperiment?: string;
  onTabChange?: (tab: StudyTab) => void;
  onOpenExercises?: () => void;
  exerciseCount?: number;
  onBackToCourse: () => void;
}

export const LectureSummary: React.FC<LectureSummaryProps> = ({ lecture, initialTab = 'summary', initialExperiment, onTabChange, onOpenExercises, exerciseCount, onBackToCourse }) => {
  const units = getCourseUnitLabels(lecture.courseId);
  const embeddedIds = new Set(lecture.sections.flatMap(section => section.experimentIds ?? []));
  const remainingExperimentIds = lecture.interactiveTools.filter(id => !embeddedIds.has(id));
  const [activeTab, setActiveTab] = useState<StudyTab>(initialTab);
  useEffect(() => { setActiveTab(initialTab); }, [initialTab, lecture.id]);
  const changeTab = (tab: StudyTab) => { setActiveTab(tab); onTabChange?.(tab); };
  const tabs = [
    { id: 'summary' as const, en: 'Read & understand', ar: 'الشرح', icon: BookOpen, count: lecture.sections.length },
    { id: 'interactive' as const, en: 'Experiment', ar: 'المعمل', icon: FlaskConical, count: lecture.interactiveTools.length },
    { id: 'quiz' as const, en: 'Practice', ar: 'التدريب', icon: HelpCircle, count: lecture.questions.length },
    { id: 'cheatSheet' as const, en: 'Quick review', ar: 'المراجعة', icon: Sparkles, count: lecture.cheatSheet.length },
    { id: 'terms' as const, en: 'Glossary', ar: 'المصطلحات', icon: BookA, count: lecture.terms.length },
  ];

  return <div className="min-w-0 space-y-6 [overflow-wrap:anywhere]">
    <header className="rounded-3xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 shadow-sm space-y-5">
      <button onClick={onBackToCourse} className="inline-flex flex-wrap gap-1.5 items-center text-sm font-semibold text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"><ChevronLeft className="w-4 h-4" />Course outline<ArabicText as="span" className="text-inherit text-[13px]">{`الرجوع لـ${units.pluralAr}`}</ArabicText></button>
      <div className="max-w-4xl space-y-3">
        <div className="flex flex-wrap gap-3 items-center font-mono text-[13px] text-stone-500 dark:text-zinc-400"><span className="text-amber-800 dark:text-amber-300">{units.singular.toUpperCase()} {String(lecture.lectureNumber).padStart(2, '0')}</span><span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{lecture.durationMinutes} min study guide</span></div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-stone-900 dark:text-stone-100">{lecture.title}</h1>
        <ArabicText className="text-base text-stone-600 dark:text-zinc-400">{lecture.titleAr}</ArabicText>
        <p className="text-[15px] leading-relaxed text-stone-700 dark:text-zinc-300">{lecture.brief}</p>
        <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{lecture.briefAr}</ArabicText>
      </div>
      <nav aria-label="Study mode" className="flex flex-wrap gap-2 border-t border-beige-200 dark:border-stone-800 pt-5">
        {tabs.map(tab => <button type="button" key={tab.id} data-testid={`tab-${tab.id}`} aria-pressed={activeTab === tab.id} onClick={() => changeTab(tab.id)} className={`flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${activeTab === tab.id ? 'bg-stone-900 dark:bg-stone-100 border-stone-900 dark:border-stone-100 text-white dark:text-stone-900' : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-700 text-stone-600 dark:text-zinc-300 hover:bg-beige-100 dark:hover:bg-stone-800'}`}><tab.icon className="h-4 w-4" /><span className="font-semibold">{tab.en}</span><span className="font-mono text-[13px] opacity-70">{tab.count}</span></button>)}
      </nav>
    </header>

    {activeTab === 'summary' && <div className="min-w-0 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-beige-300 dark:border-stone-800 p-5 bg-[#FAF7F2] dark:bg-stone-950">
        <div><h2 className="font-semibold text-stone-900 dark:text-stone-100">Read the idea. Test it. Make it yours.</h2><p className="mt-1 text-sm text-stone-600 dark:text-zinc-400">English notes first; Arabic support alongside. Source references stay with the concepts.</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400 mt-1">الشرح الأساسي بالإنجليزي، والعربي بيساعدك تثبّت المعنى. مراجع الصفحات موجودة مع الأفكار.</ArabicText></div>
        {lecture.interactiveTools.length > 0 && <button onClick={() => changeTab('interactive')} className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-zinc-200 shrink-0">Open experiments<ArrowUpRight className="h-4 w-4" /></button>}
      </div>
      {lecture.sections.length > 1 && <nav aria-label="Sections" className="min-w-0 flex gap-2 overflow-x-auto pb-2">
        {lecture.sections.map((section, index) => <button key={index} onClick={() => document.getElementById(sectionAnchorId(index))?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="flex shrink-0 items-center gap-2 rounded-xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-700 dark:text-zinc-300 hover:border-stone-400 dark:hover:border-stone-600"><span className="font-mono text-[13px] text-amber-800 dark:text-amber-300">{String(index + 1).padStart(2, '0')}</span>{stripLeadingNumber(section.title)}</button>)}
      </nav>}
      {lecture.sections.map((section, index) => <LectureSection key={`${lecture.id}-${index}`} section={{ ...section, experimentIds: section.experimentIds?.filter(id => lecture.sections.findIndex(item => item.experimentIds?.includes(id)) === index) }} index={index} total={lecture.sections.length} lectureId={lecture.id} />)}
      {onOpenExercises && <section className="rounded-3xl border border-beige-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-stone-950 p-5 sm:p-7 space-y-3" data-testid="chapter-exercises-link"><h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Finish the chapter with its original exercises</h2><p className="text-sm text-stone-600 dark:text-zinc-400">{exerciseCount} source questions, with worked explanations and short book-grounded model answers. Answers are study guidance, not an official author answer key.</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">خلّص الفصل بأسئلته الأصلية، ومعاها حل مفصّل وإجابة مختصرة مبنيين على الكتاب، مش مفتاح إجابة رسمي من المؤلف.</ArabicText><button type="button" onClick={onOpenExercises} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white">Open chapter exercises<ArrowUpRight className="h-4 w-4" /></button></section>}
      {remainingExperimentIds.length > 0 && <section className="space-y-4" aria-label="Experiments alongside the notes"><div><h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Put the ideas in motion</h2><p className="text-sm text-stone-600 dark:text-zinc-400 mt-1">Open an experiment here, without leaving your notes.</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400 mt-1">افتح التجربة هنا من غير ما تسيب الشرح.</ArabicText></div>{remainingExperimentIds.map(id => <InlineExperiment key={`${lecture.id}-${id}`} id={id} />)}</section>}
    </div>}

    {activeTab === 'interactive' && <ExperimentStudio key={lecture.id} ids={lecture.interactiveTools} initialExperiment={initialExperiment} />}
    {activeTab === 'quiz' && <QuizSystem key={lecture.id} questions={lecture.questions} lectureTitle={lecture.title} />}
    {activeTab === 'cheatSheet' && <section className="rounded-3xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7 space-y-5"><header><h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">The essentials, at a glance</h2><p className="text-sm text-stone-600 dark:text-zinc-400 mt-1">A review companion, not a replacement for the worked explanations.</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400 mt-1">مراجعة سريعة جنب الشرح، مش بديل عن فهم الخطوات.</ArabicText></header><div className="grid md:grid-cols-2 gap-4">{lecture.cheatSheet.map((item, index) => <article key={index} className="min-w-0 rounded-2xl border border-beige-300 dark:border-stone-800 p-5 bg-[#FAF7F2] dark:bg-stone-950 space-y-3"><span className="font-mono text-[13px] text-amber-800 dark:text-amber-300">{String(index + 1).padStart(2, '0')}</span><p className="text-[15px] leading-relaxed text-stone-800 dark:text-zinc-200">{item.en}</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{item.ar}</ArabicText></article>)}</div></section>}
    {activeTab === 'terms' && <section className="rounded-3xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7 space-y-5"><h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">A vocabulary for the ideas</h2><div className="grid md:grid-cols-2 gap-4">{lecture.terms.map((term, index) => <article key={index} className="min-w-0 rounded-2xl border border-beige-300 dark:border-stone-800 p-5 bg-[#FAF7F2] dark:bg-stone-950 space-y-2"><h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 break-words">{term.term}</h3><p className="text-sm leading-relaxed text-stone-700 dark:text-zinc-300">{term.definition}</p><ArabicText className="text-sm font-semibold text-stone-700 dark:text-zinc-300">{term.termAr}</ArabicText><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{term.definitionAr}</ArabicText></article>)}</div></section>}
  </div>;
};
export default LectureSummary;

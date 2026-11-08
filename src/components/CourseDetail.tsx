import React, { useState, useEffect } from 'react';
import { Course, Lecture, SheetProblem } from '../types';
import {
  BookOpen,
  User,
  ChevronLeft,
  ArrowRight,
  Clock,
  Wrench,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { ArabicText, hasArabic } from './ArabicText';

interface CourseDetailProps {
  course: Course;
  initialSheetId?: string | null;
  onSheetChange?: (sheetId: string | null) => void;
  onSelectLecture: (lecture: Lecture) => void;
  onBack: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  course,
  initialSheetId,
  onSheetChange,
  onSelectLecture,
  onBack
}) => {
  const [expandedSheetId, setExpandedSheetId] = useState<string | null>(initialSheetId || null);
  const [userSelections, setUserSelections] = useState<Record<string, string | number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialSheetId !== undefined) {
      setExpandedSheetId(initialSheetId);
    }
  }, [initialSheetId]);

  const toggleSheet = (sheetId: string) => {
    const next = expandedSheetId === sheetId ? null : sheetId;
    setExpandedSheetId(next);
    onSheetChange?.(next);
  };

  const toggleSolution = (problemId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [problemId]: !prev[problemId],
    }));
  };

  const handleSelectAnswer = (problemId: string, answer: string | number) => {
    setUserSelections((prev) => ({
      ...prev,
      [problemId]: answer,
    }));
  };

  const totalQuestions = course.lectures.reduce((acc, l) => acc + l.questions.length, 0);
  const totalTools = course.lectures.reduce((acc, l) => acc + l.interactiveTools.length, 0);
  const totalSheets = course.sheets?.length || 0;

  return (
    <div className="min-w-0 space-y-8">
      {/* Course Banner */}
      <div className="min-w-0 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-5 sm:p-8 shadow-sm space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-700 hover:text-stone-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-arabic">الرجوع لكل المواد</span>
          <span className="font-mono font-medium text-[13px] opacity-80">(Back to All Courses)</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
          <div className="min-w-0 space-y-2 max-w-3xl">
            {course.instructor && (
              <span className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-zinc-400">
                <User className="w-4 h-4 shrink-0" />
                <span dir="auto" className={hasArabic(course.instructor) ? 'font-arabic' : 'font-mono'}>
                  {course.instructor}
                </span>
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              {course.title}
            </h1>

            <ArabicText className="text-base font-semibold text-stone-700 dark:text-zinc-200">
              {course.titleAr}
            </ArabicText>

            <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed pt-1">
              {course.description}
            </p>

            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
              {course.descriptionAr}
            </ArabicText>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            <div className="bg-[#FAF7F2] dark:bg-stone-950 p-3.5 rounded-2xl text-center min-w-[80px] border border-beige-300 dark:border-stone-800">
              <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-mono">Lectures</span>
              <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {course.lectures.length}
              </span>
            </div>
            <div className="bg-[#FAF7F2] dark:bg-stone-950 p-3.5 rounded-2xl text-center min-w-[80px] border border-beige-300 dark:border-stone-800">
              <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-mono">Sheets</span>
              <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {totalSheets}
              </span>
            </div>
            <div className="bg-[#FAF7F2] dark:bg-stone-950 p-3.5 rounded-2xl text-center min-w-[80px] border border-beige-300 dark:border-stone-800">
              <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-mono">Labs</span>
              <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {totalTools}
              </span>
            </div>
            <div className="bg-[#FAF7F2] dark:bg-stone-950 p-3.5 rounded-2xl text-center min-w-[80px] border border-beige-300 dark:border-stone-800">
              <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-mono">Questions</span>
              <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lectures List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-stone-700 dark:text-zinc-300" />
            <span>Lectures & Study Units ({course.lectures.length})</span>
          </div>
          <ArabicText as="span" className="text-sm font-normal text-stone-600 dark:text-zinc-400">
            المحاضرات ووحدات المذاكرة
          </ArabicText>
        </h2>

        {course.lectures.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {course.lectures.map((lec) => (
              <div
                key={lec.id}
                className="min-w-0 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-stone-400 dark:hover:border-stone-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                <div className="min-w-0 space-y-2.5 max-w-3xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-md text-[13px] font-bold font-mono bg-beige-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-beige-200 dark:border-stone-700">
                      Lecture {lec.lectureNumber}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-zinc-400 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {lec.durationMinutes} min read
                    </span>
                    {lec.interactiveTools.length > 0 && (
                      <span className="px-2.5 py-1 rounded-md text-[13px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-stone-200 dark:border-stone-700 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5" />
                        {lec.interactiveTools.length} {lec.interactiveTools.length === 1 ? 'Interactive Lab' : 'Interactive Labs'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                    {lec.title}
                  </h3>

                  <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-300">
                    {lec.titleAr}
                  </ArabicText>

                  <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">
                    {lec.brief}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-600 dark:text-zinc-400 font-medium pt-1">
                    <span>{lec.sections.length} Core Sections</span>
                    <span>•</span>
                    <span>{lec.questions.length} Practice Questions</span>
                    <span>•</span>
                    <span>{lec.terms.length} Key Terms</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectLecture(lec)}
                  className="max-w-full px-4 sm:px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm shadow-sm transition-all flex flex-wrap items-center justify-center gap-2 shrink-0 active:scale-95"
                >
                  <span className="font-arabic">ابدأ المذاكرة</span>
                  <span className="font-mono font-medium text-[13px] opacity-80">(Open Lecture)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#FAF7F2] dark:bg-stone-950 border border-dashed border-beige-300 dark:border-stone-800 rounded-3xl p-10 text-center space-y-3">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 text-center">No lectures available yet</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-stone-300 max-w-lg mx-auto leading-relaxed text-center">لا توجد محاضرات متاحة للمادة حاليًا.</ArabicText>
          </div>
        )}
      </div>

      {/* Course Sheets Section (شيتات المادة والتمارين) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-stone-700 dark:text-zinc-300" />
            <span>Practice Sheets ({totalSheets})</span>
          </div>
          <ArabicText as="span" className="text-sm font-normal text-stone-600 dark:text-zinc-400">
            شيتات وتمارين المادة
          </ArabicText>
        </h2>

        {course.sheets && course.sheets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {course.sheets.map((sheet) => {
              const isExpanded = expandedSheetId === sheet.id;

              // Group problems by partTitle
              const parts = (() => {
                const grouped: { title?: string; titleAr?: string; problems: SheetProblem[] }[] = [];
                sheet.problems?.forEach((p) => {
                  let part = grouped.find((pt) => pt.title === p.partTitle);
                  if (!part) {
                    part = { title: p.partTitle, titleAr: p.partTitleAr, problems: [] };
                    grouped.push(part);
                  }
                  part.problems.push(p);
                });
                return grouped;
              })();

              return (
                <div
                  key={sheet.id}
                  className="min-w-0 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-4 sm:p-6 shadow-sm transition-all space-y-6"
                >
                  {/* Clean Sheet Card Header ("خليه شيت المحاضرة الاولى، بس كده") */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="min-w-0 space-y-1.5 max-w-3xl">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-3 py-1 rounded-md text-[13px] font-bold font-mono bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60">
                          Sheet {sheet.sheetNumber}
                        </span>
                        <ArabicText as="span" className="text-[13px] font-bold text-amber-900 dark:text-amber-200">(شيت {sheet.sheetNumber})</ArabicText>

                        <span className="px-2.5 py-1 rounded-md text-[13px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-stone-200 dark:border-stone-700">
                          {sheet.problemsCount} questions
                        </span>
                        <ArabicText as="span" className="text-[13px] text-stone-700 dark:text-zinc-300">({sheet.problemsCount} مسألة)</ArabicText>

                        {sheet.hasSolution && (
                          <span className="px-2.5 py-1 rounded-md text-[13px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Solutions available</span>
                            <ArabicText as="span" className="text-[13px] text-current">(الحلول متاحة)</ArabicText>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 pt-0.5">{sheet.title}</h3>
                      <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{sheet.titleAr}</ArabicText>
                    </div>

                    <button
                      onClick={() => toggleSheet(sheet.id)}
                      className="w-full md:w-auto max-w-full px-4 sm:px-5 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm shadow-sm transition-all flex flex-wrap items-center justify-center gap-2 active:scale-95"
                    >
                      <span>{isExpanded ? 'Close sheet' : 'Open practice sheet'}</span>
                      <ArabicText as="span" className="text-[13px] text-white dark:text-stone-800">
                        {isExpanded ? '(إغلاق الشيت)' : '(فتح الشيت والتدريب)'}
                      </ArabicText>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Authentic Paper Document Rendering */}
                  {isExpanded && (
                    <div className="min-w-0 pt-6 border-t border-beige-200 dark:border-stone-800 space-y-6">
                      {/* Paper Document Container */}
                      <div className="min-w-0 bg-[#FAF8F5] dark:bg-[#151518] border border-stone-300 dark:border-stone-700 rounded-3xl p-4 sm:p-8 space-y-6 shadow-sm">
                        {/* Heading Bar with Master Reveal Toggle */}
                        <div className="border-b-2 border-stone-300 dark:border-stone-700 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="min-w-0 space-y-1">
                            <h4 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">{sheet.title}</h4>
                            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{sheet.titleAr}</ArabicText>
                            <span className="text-sm font-mono text-stone-500 dark:text-zinc-400 block">
                              {sheet.title} · {sheet.problemsCount} Questions
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              onClick={() => {
                                const problems = sheet.problems || [];
                                const allRevealed = problems.length > 0 && problems.every((p) => revealedSolutions[p.id]);
                                const nextState: Record<string, boolean> = { ...revealedSolutions };
                                problems.forEach((p) => {
                                  nextState[p.id] = !allRevealed;
                                });
                                setRevealedSolutions(nextState);
                              }}
                              className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-[13px] font-bold text-stone-800 dark:text-zinc-200 hover:bg-beige-100 dark:hover:bg-stone-700 transition-colors flex flex-wrap items-center justify-center gap-2 shadow-sm"
                            >
                              {(sheet.problems || []).length > 0 && (sheet.problems || []).every((p) => revealedSolutions[p.id]) ? (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 text-stone-600 dark:text-zinc-400" />
                                  <span>Hide all solutions</span>
                                  <ArabicText as="span" className="text-[13px] text-stone-600 dark:text-zinc-400">(إخفاء الكل)</ArabicText>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  <span>Show all solutions</span>
                                  <ArabicText as="span" className="text-[13px] text-stone-600 dark:text-zinc-400">(إظهار الكل)</ArabicText>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Parts & Questions */}
                        {parts.map((part, partIdx) => (
                          <div key={partIdx} className="space-y-5">
                            {/* Part Header */}
                            {part.title && (
                              <div className="min-w-0 bg-[#F0ECE1] dark:bg-stone-800/90 border border-stone-300 dark:border-stone-700 rounded-2xl px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                                  <span className="min-w-0 text-sm font-bold text-stone-900 dark:text-white">
                                    {part.title}
                                  </span>
                                </div>
                                {part.titleAr && (
                                  <ArabicText className="text-sm font-bold text-stone-700 dark:text-zinc-300">
                                    {part.titleAr}
                                  </ArabicText>
                                )}
                              </div>
                            )}

                            {/* Questions in this part */}
                            <div className="space-y-5">
                              {part.problems.map((problem) => {
                                // Default: hidden! Student clicks to reveal solution
                                const isSolutionRevealed = Boolean(revealedSolutions[problem.id]);
                                const userChoice = userSelections[problem.id];

                                return (
                                  <div
                                    key={problem.id}
                                    className="min-w-0 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm"
                                  >
                                    {/* Question Header & Prompt */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                      <div className="min-w-0 space-y-2 flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className="px-2.5 py-0.5 rounded-md text-[13px] font-black font-mono bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-stone-300 dark:border-stone-700">
                                            Question {problem.problemNumber}
                                          </span>
                                          <span className="text-[13px] font-mono uppercase tracking-wider text-stone-600 dark:text-zinc-400">
                                            {problem.type === 'true_false' ? 'True / False' : 'Multiple Choice'}
                                          </span>
                                        </div>

                                        <p className="text-[15px] font-bold text-stone-900 dark:text-stone-100 leading-relaxed font-sans">
                                          {problem.question}
                                        </p>

                                        <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed font-medium">
                                          {problem.questionAr}
                                        </ArabicText>
                                      </div>

                                      {/* Show/Hide Solution Button */}
                                      <button
                                        onClick={() => toggleSolution(problem.id)}
                                        className={`inline-flex max-w-full flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-bold transition-all shadow-sm self-start active:scale-95 ${
                                          isSolutionRevealed
                                            ? 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-zinc-300 border border-stone-300 dark:border-stone-700'
                                            : 'bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 border border-stone-900 dark:border-stone-100'
                                        }`}
                                        title="Toggle solution visibility"
                                      >
                                        {isSolutionRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        <span>
                                          {isSolutionRevealed ? 'Hide solution' : 'Show model solution'}
                                        </span>
                                        <ArabicText as="span" className="text-[13px] text-current">
                                          {isSolutionRevealed ? '(إخفاء الحل)' : '(عرض الحل النموذجي)'}
                                        </ArabicText>
                                      </button>
                                    </div>

                                    {/* Interactive Options as printed in the sheet */}
                                    {problem.type === 'true_false' ? (
                                      <div className="flex items-center gap-3 pt-1 flex-wrap">
                                        {['True', 'False'].map((val) => {
                                          const isSelected = userChoice === val;
                                          const isTargetCorrect = problem.correctAnswer === val;

                                          let choiceStyle =
                                            'bg-[#FAF7F2] dark:bg-stone-950 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200 hover:border-amber-400 dark:hover:border-amber-600';

                                          if (isSelected) {
                                            choiceStyle = isTargetCorrect
                                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400/40'
                                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400/40';
                                          }

                                          return (
                                            <button
                                              key={val}
                                              onClick={() => handleSelectAnswer(problem.id, val)}
                                              className={`px-4 py-2 rounded-xl border font-bold text-sm flex items-center gap-2.5 transition-all active:scale-95 ${choiceStyle}`}
                                            >
                                              <span
                                                className={`w-4 h-4 rounded border flex items-center justify-center ${
                                                  isSelected
                                                    ? isTargetCorrect
                                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                                      : 'bg-rose-500 border-rose-500 text-white'
                                                    : 'border-stone-400 dark:border-stone-600'
                                                }`}
                                              >
                                                {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                                              </span>
                                              <span className="font-sans">{val}</span>
                                              <ArabicText as="span" className="text-sm text-current">({val === 'True' ? 'صح' : 'خطأ'})</ArabicText>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    ) : problem.options && problem.options.length > 0 ? (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                                        {problem.options.map((opt, optIdx) => {
                                          const isSelected = userChoice === optIdx;
                                          const isTargetCorrect = problem.correctAnswer === optIdx;
                                          const letter = String.fromCharCode(65 + optIdx);

                                          let optStyle =
                                            'bg-[#FAF7F2] dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-zinc-200 hover:border-amber-400 dark:hover:border-amber-600';

                                          if (isSelected) {
                                            optStyle = isTargetCorrect
                                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400/40'
                                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400/40';
                                          }

                                          return (
                                            <button
                                              key={optIdx}
                                              onClick={() => handleSelectAnswer(problem.id, optIdx)}
                                              className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all active:scale-[0.98] ${optStyle}`}
                                            >
                                              <span className="w-6 h-6 rounded-md bg-stone-200 dark:bg-stone-800 text-[13px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                {letter}
                                              </span>
                                              <div className="space-y-0.5 min-w-0 flex-1">
                                                <span className="text-sm font-semibold block leading-tight font-sans">
                                                  {opt}
                                                </span>
                                                {problem.optionsAr?.[optIdx] && (
                                                  <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400 block pt-0.5">
                                                    {problem.optionsAr[optIdx]}
                                                  </ArabicText>
                                                )}
                                              </div>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    ) : null}

                                    {/* Model Solution Box (Hidden by default, shown when user clicks "عرض الحل النموذجي") */}
                                    {isSolutionRevealed && problem.solution && (
                                      <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-700 space-y-2.5">
                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                          <div className="flex flex-wrap items-center gap-2 text-stone-900 dark:text-stone-100 text-sm font-bold">
                                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                            <span>Model solution</span>
                                            <ArabicText as="span" className="text-[13px] text-stone-600 dark:text-zinc-400">(الحل النموذجي)</ArabicText>
                                          </div>
                                          {problem.correctAnswer !== undefined && (
                                            <span className="px-3 py-1 rounded-full text-[13px] font-bold bg-emerald-700 text-white dark:bg-emerald-400 dark:text-stone-950 shadow-sm">
                                              {problem.type === 'true_false'
                                                ? `Answer: ${problem.correctAnswer}`
                                                : `Option ${String.fromCharCode(65 + Number(problem.correctAnswer))}`}
                                            </span>
                                          )}
                                        </div>

                                        <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">{problem.solution}</p>
                                        {problem.solutionAr && (
                                          <ArabicText className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed pt-2 border-t border-beige-200 dark:border-stone-800">
                                            {problem.solutionAr}
                                          </ArabicText>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#FAF7F2] dark:bg-stone-950 border border-dashed border-beige-300 dark:border-stone-800 rounded-3xl p-8 text-center space-y-2">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 text-center">Practice sheets are not available yet</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed text-center">لا تتوفر تمارين للمادة حاليًا.</ArabicText>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;

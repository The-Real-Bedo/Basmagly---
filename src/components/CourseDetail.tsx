import React, { useState } from 'react';
import { Course, Lecture } from '../types';
import { BookOpen, User, ChevronLeft, ArrowRight, Clock, Wrench, FileText, CheckCircle2, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { ArabicText, hasArabic } from './ArabicText';

interface CourseDetailProps {
  course: Course;
  onSelectLecture: (lecture: Lecture) => void;
  onBack: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onSelectLecture, onBack }) => {
  const [expandedSheetId, setExpandedSheetId] = useState<string | null>(null);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (problemId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [problemId]: !prev[problemId],
    }));
  };

  const toggleSheet = (sheetId: string) => {
    setExpandedSheetId((prev) => (prev === sheetId ? null : sheetId));
  };

  const totalQuestions = course.lectures.reduce((acc, l) => acc + l.questions.length, 0);
  const totalTools = course.lectures.reduce((acc, l) => acc + l.interactiveTools.length, 0);
  const totalSheets = course.sheets?.length || 0;

  return (
    <div className="space-y-8">
      {/* Course Banner */}
      <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-700 hover:text-stone-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-arabic">الرجوع لكل المواد</span>
          <span className="font-mono font-medium text-[13px] opacity-80">(Back to All Courses)</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-3xl">
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

            {/* Requirement 2 & 3: Arabic typography, RTL, high contrast */}
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
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
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
                className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-2xl p-6 shadow-sm hover:border-stone-400 dark:hover:border-stone-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                <div className="space-y-2.5 max-w-3xl">
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

                  {/* Requirement 8: Calm titles on hover */}
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                    {lec.title}
                  </h3>

                  <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-300">
                    {lec.titleAr}
                  </ArabicText>

                  <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">
                    {lec.brief}
                  </p>

                  <div className="flex items-center gap-3 text-sm text-stone-600 dark:text-zinc-400 font-medium pt-1">
                    <span>{lec.sections.length} Core Sections</span>
                    <span>•</span>
                    <span>{lec.questions.length} Practice Questions</span>
                    <span>•</span>
                    <span>{lec.terms.length} Key Terms</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectLecture(lec)}
                  className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
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
            <ArabicText as="h3" className="text-base font-bold text-stone-800 dark:text-stone-200 text-center">
              مكان المادة جاهز في السيستم — مستنيين السلايدات
            </ArabicText>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 max-w-lg mx-auto leading-relaxed text-center">
              المادة دي مكانها متظبط بالتمام، وأول ما ملفات محاضراتها توصلنا هينزل تلخيصها وبنك أسئلتها ومعاملها على طول يا هندسة!
            </ArabicText>
          </div>
        )}
      </div>

      {/* Course Sheets Section (شيتات المادة والتمارين) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-stone-700 dark:text-zinc-300" />
            <span>Practice Sheets & Problem Sets ({totalSheets})</span>
          </div>
          <ArabicText as="span" className="text-sm font-normal text-stone-600 dark:text-zinc-400">
            شيتات وتمارين المادة
          </ArabicText>
        </h2>

        {course.sheets && course.sheets.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {course.sheets.map((sheet) => {
              const isExpanded = expandedSheetId === sheet.id;

              return (
                <div
                  key={sheet.id}
                  className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-2xl p-6 shadow-sm transition-all space-y-5"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-3 py-1 rounded-md text-[13px] font-bold font-mono bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60">
                          شيت {sheet.sheetNumber} (Sheet {sheet.sheetNumber})
                        </span>

                        <span className="px-2.5 py-1 rounded-md text-[13px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-stone-200 dark:border-stone-700 font-mono">
                          {sheet.problemsCount} {sheet.problemsCount === 1 ? 'Exercise' : 'Exercises'}
                        </span>

                        {sheet.hasSolution && (
                          <span className="px-2.5 py-1 rounded-md text-[13px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="font-arabic">الحلول متوفرة</span>
                            <span className="font-mono text-[11px] opacity-80">(Solutions Ready)</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                        {sheet.title}
                      </h3>

                      <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-300">
                        {sheet.titleAr}
                      </ArabicText>

                      <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">
                        {sheet.brief}
                      </p>

                      <ArabicText className="text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                        {sheet.briefAr}
                      </ArabicText>
                    </div>

                    <button
                      onClick={() => toggleSheet(sheet.id)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-beige-100 dark:hover:bg-stone-800 text-stone-800 dark:text-zinc-200 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
                    >
                      <span className="font-arabic">
                        {isExpanded ? 'إخفاء التمارين' : 'عرض التمارين والحلول'}
                      </span>
                      <span className="font-mono font-medium text-[13px] opacity-80">
                        {isExpanded ? '(Hide)' : '(View)'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expanded Problems List */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-beige-200 dark:border-stone-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold font-mono uppercase tracking-wider text-stone-600 dark:text-zinc-400">
                          Problem Set & Solutions
                        </span>
                        <ArabicText as="span" className="text-sm text-stone-600 dark:text-zinc-400">
                          مسائل الشيت والحلول النموذجية
                        </ArabicText>
                      </div>

                      {sheet.problems && sheet.problems.length > 0 ? (
                        <div className="space-y-4">
                          {sheet.problems.map((problem) => {
                            const isSolutionRevealed = !!revealedSolutions[problem.id];

                            return (
                              <div
                                key={problem.id}
                                className="bg-[#FAF7F2] dark:bg-stone-950 border border-beige-200 dark:border-stone-800 rounded-xl p-5 space-y-3.5"
                              >
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <span className="px-2.5 py-0.5 rounded-md text-[13px] font-bold font-mono bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-zinc-200">
                                    Problem #{problem.problemNumber}
                                  </span>

                                  {problem.solution && (
                                    <button
                                      onClick={() => toggleSolution(problem.id)}
                                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                                    >
                                      <span className="font-arabic">
                                        {isSolutionRevealed ? 'إخفاء الحل' : 'عرض الحل النموذجي'}
                                      </span>
                                      <span className="font-mono font-medium text-[12px] opacity-80">
                                        {isSolutionRevealed ? '(Hide Solution)' : '(Show Solution)'}
                                      </span>
                                      {isSolutionRevealed ? (
                                        <ChevronUp className="w-3.5 h-3.5" />
                                      ) : (
                                        <ChevronDown className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  )}
                                </div>

                                <div className="space-y-1.5">
                                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">
                                    {problem.question}
                                  </p>
                                  <ArabicText className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">
                                    {problem.questionAr}
                                  </ArabicText>
                                </div>

                                {isSolutionRevealed && problem.solution && (
                                  <div className="mt-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-[13px] font-bold">
                                      <Check className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                      <span className="font-arabic">الحل والشرح النموذجي:</span>
                                      <span className="font-mono text-[12px] opacity-80">(Model Solution)</span>
                                    </div>

                                    {problem.solutionAr && (
                                      <ArabicText className="text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
                                        {problem.solutionAr}
                                      </ArabicText>
                                    )}

                                    <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed pt-1 border-t border-emerald-200/50 dark:border-emerald-800/40">
                                      {problem.solution}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-stone-600 dark:text-zinc-400">
                          <ArabicText>سيتم إرفاق تفاصيل المسائل قريباً.</ArabicText>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#FAF7F2] dark:bg-stone-950 border border-dashed border-beige-300 dark:border-stone-800 rounded-3xl p-8 text-center space-y-2">
            <ArabicText as="h3" className="text-base font-bold text-stone-800 dark:text-stone-200 text-center">
              شيتات وتمارين المادة — قيد التجهيز
            </ArabicText>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed text-center">
              أول ما مهندس السكشن ينزل الشيتات أو التمارين هنضيفها هنا بالحلول النموذجية خطوة بخطوة عشان تبصمجها وتفهمها في ثانية.
            </ArabicText>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;

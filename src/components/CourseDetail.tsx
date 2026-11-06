import React from 'react';
import { Course, Lecture } from '../types';
import { BookOpen, User, ChevronLeft, ArrowRight, Clock, Wrench } from 'lucide-react';
import { ArabicText, hasArabic } from './ArabicText';

interface CourseDetailProps {
  course: Course;
  onSelectLecture: (lecture: Lecture) => void;
  onBack: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onSelectLecture, onBack }) => {
  const totalQuestions = course.lectures.reduce((acc, l) => acc + l.questions.length, 0);
  const totalTools = course.lectures.reduce((acc, l) => acc + l.interactiveTools.length, 0);

  return (
    <div className="space-y-6">
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
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-[13px] font-mono font-bold bg-beige-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700">
                {course.code}
              </span>
              {course.instructor && (
                <span className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-zinc-400">
                  <User className="w-4 h-4 shrink-0" />
                  <span dir="auto" className={hasArabic(course.instructor) ? 'font-arabic' : 'font-mono'}>
                    {course.instructor}
                  </span>
                </span>
              )}
            </div>

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
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#FAF7F2] dark:bg-stone-950 p-3.5 rounded-2xl text-center min-w-[85px] border border-beige-300 dark:border-stone-800">
              <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-mono">Lectures</span>
              <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {course.lectures.length}
              </span>
            </div>
            <div className="bg-[#FAF7F2] dark:bg-stone-950 p-3.5 rounded-2xl text-center min-w-[85px] border border-beige-300 dark:border-stone-800">
              <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-mono">Labs</span>
              <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {totalTools}
              </span>
            </div>
            <div className="bg-[#FAF7F2] dark:bg-stone-950 p-3.5 rounded-2xl text-center min-w-[85px] border border-beige-300 dark:border-stone-800">
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
          <span>Lectures & Study Units ({course.lectures.length})</span>
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
    </div>
  );
};

export default CourseDetail;

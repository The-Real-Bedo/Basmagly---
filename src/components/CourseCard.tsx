import React from 'react';
import { Course } from '../types';
import { BookOpen, HelpCircle, ArrowRight, User, Network, Bot, Cpu, Layout, Database, FolderKanban, Wrench } from 'lucide-react';
import { ArabicText, hasArabic } from './ArabicText';

const ICON_MAP: { [key: string]: any } = {
  Network,
  Bot,
  Cpu,
  Layout,
  Database,
  FolderKanban,
};

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  const IconComp = ICON_MAP[course.icon] || BookOpen;
  const totalQuestions = course.lectures.reduce((acc, l) => acc + l.questions.length, 0);
  const totalTools = course.lectures.reduce((acc, l) => acc + l.interactiveTools.length, 0);

  return (
    <div
      onClick={() => onSelect(course)}
      className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-stone-400 dark:hover:border-stone-700 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
    >
      <div className="space-y-4">
        {/* Top: Icon & Status Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-2xl bg-beige-100 dark:bg-stone-800 border border-beige-300 dark:border-stone-700 flex items-center justify-center text-stone-800 dark:text-stone-200 group-hover:scale-105 transition-transform shadow-sm">
            <IconComp className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[13px] font-bold px-2.5 py-1 rounded-lg bg-beige-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-beige-200 dark:border-stone-700">
              {course.code}
            </span>
            {course.isAvailable ? (
              <span className="text-[13px] font-bold px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                جاهزة للمذاكرة
              </span>
            ) : (
              /* Requirement 5: High-contrast readable awaiting badge */
              <span
                dir="rtl"
                className="text-[13px] font-semibold px-2.5 py-1 rounded-full bg-stone-200/90 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-stone-300 dark:border-stone-600 shadow-sm"
              >
                مستنيين السلايدات
              </span>
            )}
          </div>
        </div>

        {/* Title & Arabic Subtitle */}
        <div className="space-y-1">
          {/* Requirement 8: Clean calm title without gold hover overload */}
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
            {course.title}
          </h3>

          {/* Requirement 2 & 3: Arabic typography + RTL + bidi isolation */}
          <ArabicText className="text-sm font-medium text-stone-700 dark:text-zinc-300">
            {course.titleAr}
          </ArabicText>

          {course.instructor && (
            <p className="text-[13px] text-stone-600 dark:text-zinc-400 flex items-center gap-1.5 pt-1">
              <User className="w-3.5 h-3.5 shrink-0" />
              <span dir="auto" className={hasArabic(course.instructor) ? 'font-arabic' : 'font-mono'}>
                {course.instructor}
              </span>
            </p>
          )}
        </div>

        {/* Requirement 1: Secondary text contrast (>= 4.5:1, min 14px) */}
        <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed line-clamp-2">
          {course.description}
        </p>
      </div>

      {/* Requirement 7: Increased icon size (18px) and text size (14px) */}
      <div className="pt-4 border-t border-beige-200 dark:border-stone-800 mt-5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-stone-700 dark:text-zinc-300 font-medium">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-[18px] h-[18px] text-stone-500 dark:text-zinc-400 shrink-0" />
            <span>{course.lectures.length} Lectures</span>
          </span>
          {totalTools > 0 && (
            <span className="flex items-center gap-1.5">
              <Wrench className="w-[18px] h-[18px] text-stone-500 dark:text-zinc-400 shrink-0" />
              <span>{totalTools} Labs</span>
            </span>
          )}
          {totalQuestions > 0 && (
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-[18px] h-[18px] text-stone-500 dark:text-zinc-400 shrink-0" />
              <span>{totalQuestions} Qs</span>
            </span>
          )}
        </div>

        <span className="w-8 h-8 rounded-xl bg-beige-100 dark:bg-stone-800 text-stone-700 dark:text-zinc-300 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-stone-900 transition-all shadow-sm">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};

export default CourseCard;

import React from 'react';
import { GraduationCap, Sun, Moon } from 'lucide-react';
import { ArabicText } from './ArabicText';

interface NavbarProps {
  currentTerm: 1 | 2;
  onSelectTerm: (term: 1 | 2) => void;
  isDark: boolean;
  onToggleDark: () => void;
  onHomeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTerm,
  onSelectTerm,
  isDark,
  onToggleDark,
  onHomeClick,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/90 dark:bg-[#121214]/90 backdrop-blur-md border-b border-beige-300 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {/* Brand / Logo */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-3.5 text-left group transition-transform active:scale-95 min-w-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 shadow-sm transition-all shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg text-stone-900 dark:text-stone-100 tracking-tight font-arabic">
                بصمجّلي شكرًا
              </span>
              <span className="hidden sm:inline text-xs font-mono font-medium text-stone-600 dark:text-zinc-400">
                (Basmagly)
              </span>
              <span className="hidden sm:inline px-2 py-0.5 rounded-md text-[13px] font-mono font-bold bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700">
                2026/2027
              </span>
            </div>
            {/* Tagline: hidden on small screens so the brand and controls fit on one row */}
            <ArabicText as="p" className="hidden lg:block text-sm font-medium text-stone-600 dark:text-zinc-300 pt-0.5 text-left">
              زتونة المنهج للامتحان • ملخصات مركزة، معامل تفاعلية، وبنك أسئلة تضمن بيه الـ GPA
            </ArabicText>
          </div>
        </button>

        {/* Right Actions: Semester Selector & Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Requirement 5: High-contrast legible Term toggle */}
          <div className="bg-beige-100 dark:bg-stone-800/90 p-1 rounded-2xl flex items-center text-sm font-semibold border border-beige-300 dark:border-stone-700 shadow-sm">
            <button
              onClick={() => onSelectTerm(1)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTerm === 1
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-bold border border-beige-200 dark:border-stone-700'
                  : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Term 1 <span className="font-arabic hidden md:inline">(الترم الأول)</span>
            </button>
            <button
              onClick={() => onSelectTerm(2)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTerm === 2
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-bold border border-beige-200 dark:border-stone-700'
                  : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Term 2 <span className="font-arabic hidden md:inline">(قريبًا)</span>
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDark}
            className="w-10 h-10 rounded-xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-center text-stone-800 dark:text-zinc-200 hover:bg-beige-50 dark:hover:bg-stone-800 transition-colors shadow-sm"
            title="Toggle Soft Beige / Dark Mode"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

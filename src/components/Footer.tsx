import React from 'react';
import { GraduationCap } from 'lucide-react';
import { ArabicText } from './ArabicText';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF7F2] dark:bg-stone-950 border-t border-beige-300 dark:border-stone-800 py-8 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-700 dark:text-zinc-300">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-5 h-5 text-stone-800 dark:text-zinc-200" />
          <span className="font-bold text-stone-900 dark:text-stone-100 font-arabic">
            بصمجّلي شكرًا (Basmagly)
          </span>
          <span className="text-stone-400">•</span>
          <ArabicText as="span" className="text-sm font-medium text-stone-700 dark:text-zinc-300">
            طريقك الأسرع لفهم المنهج وتقفيل الامتحانات
          </ArabicText>
        </div>

        <p className="text-[13px] font-mono text-stone-600 dark:text-zinc-400">
          Semester 1 & 2 Modular Framework
        </p>
      </div>
    </footer>
  );
};

export default Footer;

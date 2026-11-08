import React from 'react';
import { ArabicText } from './ArabicText';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF7F2] dark:bg-stone-950 border-t border-beige-300 dark:border-stone-800 py-8 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-700 dark:text-zinc-300">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <BrandLogo />
          <span className="text-stone-400 hidden sm:inline">•</span>
          <ArabicText as="span" className="text-sm font-medium text-stone-700 dark:text-zinc-300">
            من صفحة لفكرة… ومن فكرة لتجربة
          </ArabicText>
        </div>

        <p className="text-[13px] font-mono text-stone-600 dark:text-zinc-400">
          Academic Year 2026/2027 • Term 1 & 2
        </p>
      </div>
    </footer>
  );
};

export default Footer;

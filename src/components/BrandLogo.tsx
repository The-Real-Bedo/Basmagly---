import React from 'react';
import { Fingerprint } from 'lucide-react';

interface BrandLogoProps {
  /** `nav` = compact navbar lockup; `hero` = large home banner wordmark. */
  size?: 'nav' | 'hero';
  showLatin?: boolean;
  className?: string;
}

/**
 * Brand lockup: fingerprint mark (بصمة) + two-tone Changa wordmark.
 * Keep in sync with public/favicon.svg.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'nav', showLatin = true, className = '' }) => {
  const isHero = size === 'hero';

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`${isHero ? 'w-14 h-14 rounded-[20px]' : 'w-11 h-11 rounded-2xl'} shrink-0 flex items-center justify-center bg-stone-900 dark:bg-stone-100 text-amber-400 dark:text-amber-600 ring-1 ring-inset ring-white/10 dark:ring-stone-900/10 shadow-md`}
      >
        <Fingerprint className={isHero ? 'w-8 h-8' : 'w-6 h-6'} strokeWidth={2.25} />
      </span>
      <span className="flex items-baseline gap-2 flex-wrap min-w-0">
        <span
          dir="rtl"
          className={`font-display font-extrabold leading-none tracking-tight text-stone-900 dark:text-stone-100 ${
            isHero ? 'text-3xl sm:text-4xl' : 'text-2xl'
          }`}
        >
          بصمجّلي <span className="text-amber-600 dark:text-amber-400">شكرًا</span>
        </span>
        {showLatin && (
          <span className={`font-mono font-medium text-stone-500 dark:text-zinc-400 ${isHero ? 'text-base' : 'text-xs'}`}>
            Basmagly
          </span>
        )}
      </span>
    </span>
  );
};

export default BrandLogo;

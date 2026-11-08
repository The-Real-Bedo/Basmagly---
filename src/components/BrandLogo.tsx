import React from 'react';
import { Fingerprint } from 'lucide-react';
import { ArabicText } from './ArabicText';

interface BrandLogoProps {
  /** `nav` = compact navbar lockup; `hero` = large home banner wordmark. */
  size?: 'nav' | 'hero';
  showLatin?: boolean;
  tagline?: string;
  className?: string;
}

/**
 * Brand lockup: fingerprint mark (بصمة) + two-tone Changa wordmark.
 * Keep in sync with public/favicon.svg.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'nav', showLatin = true, tagline, className = '' }) => {
  const isHero = size === 'hero';

  return (
    <span className={`inline-flex items-center ${tagline ? 'gap-2 sm:gap-3' : 'gap-3'} ${className}`}>
      <span
        className={`${isHero ? 'w-14 h-14 rounded-[20px]' : tagline ? 'w-9 h-9 sm:w-11 sm:h-11 rounded-2xl' : 'w-11 h-11 rounded-2xl'} shrink-0 flex items-center justify-center bg-stone-900 dark:bg-stone-100 text-amber-400 dark:text-amber-600 ring-1 ring-inset ring-white/10 dark:ring-stone-900/10 shadow-md`}
      >
        <Fingerprint className={isHero ? 'w-8 h-8' : 'w-6 h-6'} strokeWidth={2.25} />
      </span>
      <span className={`flex items-baseline gap-2 min-w-0 ${tagline ? 'flex-nowrap' : 'flex-wrap'}`}>
        <span
          dir="rtl"
          className={`font-display font-extrabold leading-none whitespace-nowrap text-stone-900 dark:text-stone-100 ${
            isHero ? 'text-3xl sm:text-4xl' : tagline ? 'text-lg sm:text-2xl' : 'text-2xl'
          }`}
        >
          بصمجّلي <span className="text-amber-600 dark:text-amber-400">شكرًا</span>
        </span>
        {tagline && <ArabicText as="span" className="whitespace-nowrap text-[13px] sm:text-sm font-medium text-stone-600 dark:text-zinc-300">{tagline}</ArabicText>}
        {showLatin && !tagline && (
          <span className={`font-mono font-medium text-stone-500 dark:text-zinc-400 ${isHero ? 'text-base' : 'text-xs'}`}>
            Basmagly
          </span>
        )}
      </span>
    </span>
  );
};

export default BrandLogo;

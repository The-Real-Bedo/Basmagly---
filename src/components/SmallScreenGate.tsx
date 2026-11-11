import React from 'react';
import { MonitorSmartphone, TriangleAlert } from 'lucide-react';
import { ArabicText } from './ArabicText';
import { BrandLogo } from './BrandLogo';

interface SmallScreenGateProps {
  /** Called when the visitor chooses to open the workspace on this screen anyway. */
  onContinue: () => void;
}

/**
 * Full-screen gate shown below the `md` breakpoint (768px): the study layout,
 * especially the interactive 3D labs, is designed for larger screens. Visitors
 * can still continue on their own responsibility with "Continue anyway".
 */
export const SmallScreenGate: React.FC<SmallScreenGateProps> = ({ onContinue }) => (
  <div className="min-h-[100dvh] bg-[#FBF9F5] dark:bg-[#121214] flex items-center justify-center px-4 py-8 font-sans transition-colors duration-200">
    <div
      className="bg-white dark:bg-stone-900 border-2 border-rose-300 dark:border-rose-900/70 rounded-3xl p-8 sm:p-12 text-center max-w-md w-full space-y-5 shadow-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Warning: this workspace is not built for small screens"
    >
      <BrandLogo size="nav" className="justify-center" />

      <div className="flex items-center justify-center gap-1.5 text-rose-700 dark:text-rose-400">
        <span className="text-[13px] font-mono font-bold uppercase tracking-wider">Warning</span>
        <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
      </div>

      <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center mx-auto">
        <MonitorSmartphone className="w-6 h-6" aria-hidden="true" />
      </div>

      <h2 className="text-xl font-bold text-rose-800 dark:text-rose-300">
        Not built for small screens
      </h2>

      <div className="space-y-2 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 p-4 text-left">
        <p className="text-sm text-rose-900 dark:text-rose-200 leading-relaxed">
          The study layout — especially the interactive 3D labs — breaks on phone screens. Open this workspace on a laptop or desktop instead.
        </p>
        <ArabicText className="text-[13px] text-rose-800 dark:text-rose-300/90 text-center">
          المنصة دي معمولة للابتوب والكمبيوتر — على الموبايل العرض بيتكسر والمحتوى مش هيتشاف صح.
        </ArabicText>
      </div>

      <button
        onClick={onContinue}
        className="px-3.5 py-1.5 rounded-lg border border-rose-300 dark:border-rose-900/70 bg-white dark:bg-stone-900 text-[13px] font-bold text-rose-800 dark:text-rose-300 transition-all active:scale-95 hover:bg-rose-50 dark:hover:bg-rose-950/40"
      >
        Continue anyway
      </button>
    </div>
  </div>
);

export default SmallScreenGate;

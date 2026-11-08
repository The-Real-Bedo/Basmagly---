import React, { useState } from 'react';
import { Check, Code2, Copy, Eye, EyeOff } from 'lucide-react';
import { CodeExample } from '../types';
import { ArabicText } from './ArabicText';

export const CodeStudyBlock: React.FC<{ example: CodeExample }> = ({ example }) => {
  const [hidden, setHidden] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };
  return <article data-testid="code-study-block" className="min-w-0 rounded-2xl border border-beige-300 dark:border-stone-800 overflow-hidden">
    <header className="p-4 sm:p-5 flex flex-wrap items-start justify-between gap-3 bg-[#FAF7F2] dark:bg-stone-950">
      <div className="min-w-0 space-y-1"><h4 className="flex gap-2 items-center font-bold text-stone-900 dark:text-stone-100"><Code2 className="w-4 h-4 shrink-0" />{example.title}</h4><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{example.titleAr}</ArabicText></div>
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={hidden} onClick={() => setHidden(!hidden)} className="inline-flex items-center gap-2 rounded-xl border border-beige-300 dark:border-stone-700 px-3 py-2 text-sm text-stone-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-stone-800">{hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}{hidden ? 'Reveal code' : 'Recall first'}</button>
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-beige-300 dark:border-stone-700 px-3 py-2 text-sm text-stone-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-stone-800">{copyState === 'copied' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copyState === 'copied' ? 'Copied' : 'Copy code'}</button>
      </div>
    </header>
    {hidden ? <div className="p-5 space-y-2 border-t border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900"><p className="text-sm text-stone-700 dark:text-zinc-300">{example.memoryCue || 'Recall the inputs, order of operations and exit path, then reveal the code to compare.'}</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{example.memoryCueAr || 'افتكر المدخلات وترتيب الخطوات ومسار الخروج، وبعدها افتح الكود وقارن.'}</ArabicText></div>
      : <div className="bg-stone-950 dark:bg-stone-950 border-y border-stone-800"><p className="px-4 pt-3 font-mono text-[13px] text-zinc-400">{example.language}</p><pre dir="ltr" className="max-w-full overflow-x-auto p-4 sm:p-5 text-[13px] leading-7 text-stone-100 dark:text-stone-100 [overflow-wrap:normal] [word-break:normal]"><code>{example.code}</code></pre></div>}
    <div className="p-4 sm:p-5 bg-white dark:bg-stone-900 space-y-3"><p className="text-sm leading-relaxed text-stone-700 dark:text-zinc-300">{example.explanation}</p><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{example.explanationAr}</ArabicText>
      {example.memoryCue && !hidden && <div className="border-t border-beige-300 dark:border-stone-800 pt-3"><p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Memory route · {example.memoryCue}</p>{example.memoryCueAr && <ArabicText className="text-sm text-stone-600 dark:text-zinc-400 mt-1">{example.memoryCueAr}</ArabicText>}</div>}
      {example.sourceReference && <p className="text-[13px] text-stone-500 dark:text-zinc-400">{example.sourceReference}</p>}
      <p aria-live="polite" className="text-[13px] text-stone-600 dark:text-zinc-400">{copyState === 'failed' ? 'Copy is unavailable in this browser. Select the code to copy it manually.' : copyState === 'copied' ? 'Code copied to clipboard.' : ''}</p>
    </div>
  </article>;
};

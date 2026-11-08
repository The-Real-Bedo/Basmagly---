import React, { useState } from 'react';
import { ArrowRightLeft, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type TransformKey = 'delay' | 'advance' | 'reverse' | 'reverseRight' | 'reverseLeft';
const INPUT_SUPPORT: [number, number] = [-2, 4];
const TRANSFORMS: Record<TransformKey, { label: string; formula: string; map: (n: number) => number; interval: [number, number]; intervalText: string; ar: string }> = {
  delay: { label: 'Shift right by 3', formula: 'x[n − 3]', map: (n) => n - 3, interval: [1, 7], intervalText: '[1, 7]', ar: 'الإشارة بتتحرك 3 عينات لليمين؛ المجال الممكن يبقى من 1 لـ 7.' },
  advance: { label: 'Shift left by 4', formula: 'x[n + 4]', map: (n) => n + 4, interval: [-6, 0], intervalText: '[−6, 0]', ar: 'الإشارة بتتحرك 4 عينات لليسار؛ المجال الممكن يبقى من −6 لـ 0.' },
  reverse: { label: 'Reverse in time', formula: 'x[−n]', map: (n) => -n, interval: [-4, 2], intervalText: '[−4, 2]', ar: 'عكس الزمن بيبدّل طرفي المجال؛ المجال الممكن يبقى من −4 لـ 2.' },
  reverseRight: { label: 'Reverse, then shift right 2', formula: 'x[−n + 2]', map: (n) => -n + 2, interval: [-2, 4], intervalText: '[−2, 4]', ar: 'اعكس الزمن وبعدها حرّك لليمين عينتين؛ المجال الممكن يبقى من −2 لـ 4.' },
  reverseLeft: { label: 'Reverse, then shift left 2', formula: 'x[−n − 2]', map: (n) => -n - 2, interval: [-6, 0], intervalText: '[−6, 0]', ar: 'اعكس الزمن وبعدها حرّك لليسار عينتين؛ المجال الممكن يبقى من −6 لـ 0.' },
};
const DISPLAY_MIN = -12;
const DISPLAY_MAX = 12;
const LEFT = 12;
const RIGHT = 288;
const position = (value: number) => LEFT + (value - DISPLAY_MIN) / (DISPLAY_MAX - DISPLAY_MIN) * (RIGHT - LEFT);

export const SignalSupportLab: React.FC = () => {
  const [transform, setTransform] = useState<TransformKey>('delay');
  const [selectedN, setSelectedN] = useState(0);
  const selected = TRANSFORMS[transform];
  const inputArgument = selected.map(selectedN);
  const withinOutput = selectedN >= selected.interval[0] && selectedN <= selected.interval[1];
  const withinInput = inputArgument >= INPUT_SUPPORT[0] && inputArgument <= INPUT_SUPPORT[1];
  const reset = () => { setTransform('delay'); setSelectedN(0); };

  return (
    <section className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6" aria-labelledby="signal-support-title">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><ArrowRightLeft size={20} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1"><h3 id="signal-support-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">Signal Support: Map the Index</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">اختار تحويلة وشوف كل عينة خرج بترجع لأي مكان في الإشارة الأصلية.</ArabicText></div>
        <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-beige-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-[#FAF7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Reset signal support lab"><RotateCcw size={15} aria-hidden="true" /><span className="hidden sm:inline">Reset</span></button>
      </header>

      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Choose an index transformation">
        {(Object.keys(TRANSFORMS) as TransformKey[]).map((key) => {
          const option = TRANSFORMS[key];
          const active = key === transform;
          return <button key={key} type="button" onClick={() => setTransform(key)} aria-pressed={active} className={`rounded-2xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 ${active ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30' : 'border-beige-300 bg-white hover:bg-[#FAF7F2] dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800'}`}>
            <span className="block text-sm font-semibold text-stone-900 dark:text-stone-100">{option.label}</span><code dir="ltr" className="font-mono text-sm text-stone-700 dark:text-stone-300">{option.formula}</code><ArabicText className="mt-1 text-xs text-stone-600 dark:text-zinc-400">{option.ar}</ArabicText>
          </button>;
        })}
      </div>

      <div className="mb-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div><label htmlFor="support-index" className="font-semibold text-stone-900 dark:text-stone-100">Inspect output index n = {selectedN}</label><p className="text-xs text-stone-600 dark:text-zinc-400">Input argument k = {selected.formula.slice(2, -1).replace(/n/g, `${selectedN}`)} = {inputArgument}</p></div>
          <input id="support-index" type="range" min={-8} max={8} step={1} value={selectedN} onChange={(event) => setSelectedN(Number(event.target.value))} className="w-full accent-amber-600 dark:accent-amber-400 sm:w-48" />
        </div>
        <svg viewBox="0 0 300 164" className="h-auto w-full text-stone-500 dark:text-zinc-400" role="img" aria-label={`For output n=${selectedN}, the input argument is ${inputArgument}; input support is from -2 to 4 and output possible support is ${selected.intervalText}.`}>
          <defs><marker id="support-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" className="fill-amber-700 dark:fill-amber-300" /></marker></defs>
          <text x="12" y="16" className="fill-stone-700 text-[13px] font-semibold dark:fill-stone-300">Output index n</text>
          <line x1={LEFT} y1="38" x2={RIGHT} y2="38" className="stroke-stone-400 dark:stroke-stone-600" strokeWidth="2" />
          <line x1={position(selected.interval[0])} y1="38" x2={position(selected.interval[1])} y2="38" className="stroke-amber-500 dark:stroke-amber-400" strokeWidth="8" strokeLinecap="round" />
          {[-12, -6, 0, 6, 12].map((tick) => <g key={`n-${tick}`}><line x1={position(tick)} y1="32" x2={position(tick)} y2="44" className="stroke-stone-500 dark:stroke-stone-400" /><text x={position(tick)} y="65" textAnchor="middle" className="fill-stone-600 text-[13px] font-mono dark:fill-stone-400">{tick}</text></g>)}
          <circle cx={position(selectedN)} cy="38" r="7" className={withinOutput ? 'fill-emerald-600 dark:fill-emerald-400' : 'fill-stone-600 dark:fill-stone-300'} />
          <text x="12" y="92" className="fill-stone-700 text-[13px] font-semibold dark:fill-stone-300">Input argument k</text>
          <line x1={LEFT} y1="116" x2={RIGHT} y2="116" className="stroke-stone-400 dark:stroke-stone-600" strokeWidth="2" />
          <line x1={position(INPUT_SUPPORT[0])} y1="116" x2={position(INPUT_SUPPORT[1])} y2="116" className="stroke-amber-500 dark:stroke-amber-400" strokeWidth="8" strokeLinecap="round" />
          {[-12, -6, 0, 6, 12].map((tick) => <g key={`k-${tick}`}><line x1={position(tick)} y1="110" x2={position(tick)} y2="122" className="stroke-stone-500 dark:stroke-stone-400" /><text x={position(tick)} y="143" textAnchor="middle" className="fill-stone-600 text-[13px] font-mono dark:fill-stone-400">{tick}</text></g>)}
          <circle cx={position(inputArgument)} cy="116" r="7" className={withinInput ? 'fill-amber-600 dark:fill-amber-300' : 'fill-stone-600 dark:fill-stone-300'} />
          <line x1={position(selectedN)} y1="47" x2={position(inputArgument)} y2="103" className="stroke-amber-700 dark:stroke-amber-300" strokeWidth="2" markerEnd="url(#support-arrow)" />
        </svg>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-700 dark:text-stone-300"><span>Possible output interval: <strong className="font-mono">{selected.intervalText}</strong></span><span>Given input interval: <strong className="font-mono">[−2, 4]</strong></span></div>
        <div className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          <p className="rounded-xl border border-beige-300 bg-white px-3 py-2 text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">n = {selectedN} {withinOutput ? 'is inside' : 'is outside'} the possible output interval.</p>
          <p className="rounded-xl border border-beige-300 bg-white px-3 py-2 text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">The arrow maps to x[{inputArgument}] {withinInput ? '(inside the given input interval).' : '(outside it, so this sample is guaranteed zero).'}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
        <p className="font-semibold">Given: x[k] is guaranteed zero outside [−2, 4].</p>
        <p className="mt-1">The highlighted interval marks where the transformed signal could be nonzero; values inside it are not guaranteed to be nonzero.</p>
        <ArabicText className="mt-2 text-sm text-sky-800 dark:text-sky-300">المجال المظلل بيوضح فين الخرج ممكن يبقى غير صفر؛ مش معناه إن كل عينة جواه لازم تكون غير صفر.</ArabicText>
      </div>
    </section>
  );
};

export default SignalSupportLab;

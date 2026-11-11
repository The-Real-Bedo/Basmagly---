import React, { useEffect, useMemo, useState } from 'react';
import { RotateCcw, Scissors } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabChallenge, challengeFeedback, type ChallengeMission } from './LabChallenge';

type Mode = 'compress' | 'expand';

/** Deck examples (CCNA-4.pdf pp. 5, 8): compress or expand each one. */
const PRESETS: { id: string; mode: Mode; label: string; input: string }[] = [
  { id: 'p-2041', mode: 'compress', label: '2041:0000:140F:…:875B:131B', input: '2041:0000:140F:0000:0000:0000:875B:131B' },
  { id: 'p-fd00-2600', mode: 'compress', label: 'fd00:2600:0000:0002:…:0000', input: 'fd00:2600:0000:0002:0000:0000:0000:0000' },
  { id: 'p-fd80', mode: 'compress', label: 'fd80:0000:0020:…:0000:0002', input: 'fd80:0000:0020:0000:0000:2700:0000:0002' },
  { id: 'p-2001-1111', mode: 'compress', label: '2001:0DB8:0000:1111:…:0200', input: '2001:0DB8:0000:1111:0000:0000:0000:0200' },
  { id: 'p-expand-4100', mode: 'expand', label: 'fd00:0:0:4100::', input: 'fd00:0:0:4100::' },
  { id: 'p-expand-8203', mode: 'expand', label: 'fd00:8203:0:ac00::4000:0', input: 'fd00:8203:0:ac00::4000:0' },
];

const expandHextets = (input: string): string[] | null => {
  const addr = input.trim().toLowerCase();
  if (!/^[0-9a-f:]+$/.test(addr) || addr.includes(':::')) return null;
  if (!addr.includes('::')) {
    const parts = addr.split(':');
    if (parts.length !== 8 || parts.some(p => p.length === 0 || p.length > 4)) return null;
    return parts.map(p => p.padStart(4, '0'));
  }
  const [left, right] = addr.split('::');
  const leftParts = left ? left.split(':') : [];
  const rightParts = right ? right.split(':') : [];
  const missing = 8 - leftParts.length - rightParts.length;
  if (missing <= 0 || [...leftParts, ...rightParts].some(p => p.length === 0 || p.length > 4)) return null;
  return [...leftParts, ...Array(missing).fill('0'), ...rightParts].map(p => p.padStart(4, '0'));
};

const stripLeadingZeros = (hextet: string) => hextet.replace(/^0+(?=.)/, '');

const compressAddress = (hextets: string[], rule1: boolean, rule2: boolean): string => {
  const afterRule1 = rule1 ? hextets.map(stripLeadingZeros) : hextets;
  if (!rule2) return afterRule1.join(':');
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;
  afterRule1.forEach((hextet, index) => {
    if (hextet === '0') {
      if (curStart === -1) curStart = index;
      curLen += 1;
      if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; }
    } else {
      curStart = -1;
      curLen = 0;
    }
  });
  if (bestLen < 1) return afterRule1.join(':');
  const left = afterRule1.slice(0, bestStart).join(':');
  const right = afterRule1.slice(bestStart + bestLen).join(':');
  return `${left}::${right}`;
};

/** Longest contiguous all-0 run (Rule 2 target), or -1. */
const zeroRun = (hextets: string[]): { start: number; length: number } => {
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;
  hextets.forEach((hextet, index) => {
    if (hextet === '0000') {
      if (curStart === -1) curStart = index;
      curLen += 1;
      if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; }
    } else {
      curStart = -1;
      curLen = 0;
    }
  });
  return { start: bestStart, length: bestLen };
};

export const Ipv6CompressionLab: React.FC = () => {
  const [mode, setMode] = useState<Mode>('compress');
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [rule1, setRule1] = useState(false);
  const [rule2, setRule2] = useState(false);

  const preset = PRESETS.find(item => item.id === presetId) ?? PRESETS[0];
  const hextets = useMemo(() => expandHextets(preset.input), [preset.input]);
  const run = useMemo(() => (hextets ? zeroRun(hextets) : { start: -1, length: 0 }), [hextets]);
  const afterRule1 = useMemo(() => (hextets ? hextets.map(stripLeadingZeros) : []), [hextets]);
  const result = useMemo(() => {
    if (!hextets) return null;
    return mode === 'compress' ? compressAddress(hextets, rule1, rule2) : hextets.join(':');
  }, [hextets, mode, rule1, rule2]);

  const reset = () => { setRule1(false); setRule2(false); };
  useEffect(() => { setRule1(false); setRule2(false); }, [presetId, mode]);

  const changeMode = (value: Mode) => {
    const target = PRESETS.find(item => item.mode === value);
    setMode(value);
    if (target) setPresetId(target.id);
  };

  const missions: ChallengeMission[] = [
    {
      id: 'm-compress-2041', title: 'Compress the lecture example', titleAr: 'اضغط مثال المحاضرة',
      goal: 'Load 2041:0000:140F:0000:0000:0000:875B:131B, apply Rule 1 and Rule 2, and produce the shortest form.',
      goalAr: 'حمّل العنوان 2041:0000:140F:0000:0000:0000:875B:131B، وفعّل القاعدتين معًا، وطلّع أقصر صيغة.',
      hint: 'Rule 1 turns every 0000 hextet into 0. Rule 2 then replaces the single contiguous run of zero hextets with one double colon.',
      hintAr: 'القاعدة الأولى بتحوّل كل hextet أصفار لـ 0. وبعدها القاعدة التانية بتستبدل مجموعة الأصفار المتتالية الواحدة بنقطتين ::.',
      start: () => { setMode('compress'); setPresetId('p-2041'); setRule1(false); setRule2(false); },
      evaluate: () => result === '2041:0:140f::875b:131b'
        ? challengeFeedback('success', 'Correct: 2041:0:140F::875B:131B matches the deck example exactly.', 'صح: ‏2041:0:140F::875B:131B مطابق لمثال الديك بالظبط.')
        : challengeFeedback('retry', 'Not yet — enable both Rule 1 and Rule 2 and compare with the deck output.', 'لسه — فعّل القاعدتين معًا وقارن بناتج الديك.'),
    },
    {
      id: 'm-expand-4100', title: 'Expand back to preferred', titleAr: 'وسّع تاني للصيغة المفضلة',
      goal: 'Switch to Expand with fd00:0:0:4100:: and write every hextet as four hexadecimal digits.',
      goalAr: 'بدّل لوضع Expand مع العنوان fd00:0:0:4100:: واكتب كل hextet بأربع خانات ست عشرية.',
      hint: 'The double colon stands for four missing zero hextets; expansion writes all eight groups.',
      hintAr: 'النقطتين بتقف مكان أربع hextets أصفار ناقصة؛ والتوسيع بيكتب المجموعات الثمانية كلها.',
      start: () => { setMode('expand'); setPresetId('p-expand-4100'); setRule1(false); setRule2(false); },
      evaluate: () => result === 'fd00:0000:0000:4100:0000:0000:0000:0000'
        ? challengeFeedback('success', 'Correct: fd00:0000:0000:4100:0000:0000:0000:0000 is the preferred format.', 'صح: ‏fd00:0000:0000:4100:0000:0000:0000:0000 هي الصيغة المفضلة.')
        : challengeFeedback('retry', 'Not yet — every one of the eight hextets needs four digits.', 'لسه — كل hextet من التمنية محتاج أربع خانات.'),
    },
    {
      id: 'm-run-choice', title: 'Which zero run earns the ::?', titleAr: 'أنهي مجموعة أصفار بتاخد الـ ::؟',
      goal: 'Compress 2001:0DB8:0000:1111:0000:0000:0000:0200 with both rules. Only one double colon is allowed — which run wins?',
      goalAr: 'اضغط العنوان 2001:0DB8:0000:1111:0000:0000:0000:0200 بالقاعدتين. النقطتين مسموحة مرة واحدة — أنهي مجموعة هتكسب؟',
      hint: 'Rule 2 targets the longest contiguous all-0 run, not every zero hextet.',
      hintAr: 'القاعدة التانية بتستهدف أطول مجموعة أصفار متتالية، مش كل hextet فيه صفر.',
      prediction: {
        label: 'Predict the compressed form', labelAr: 'توقّع الصيغة المضغوطة',
        options: [
          { id: 'run-long', label: '2001:db8:0:1111::200' },
          { id: 'run-both', label: '2001:db8::1111::200 (two colons)' },
          { id: 'run-first', label: '2001:db8::1111:0:0:0:200' },
        ],
      },
      start: () => { setMode('compress'); setPresetId('p-2001-1111'); setRule1(false); setRule2(false); },
      evaluate: (prediction) => {
        const compressed = result === '2001:db8:0:1111::200';
        if (!rule1 || !rule2) return challengeFeedback('pending', 'Apply both rules first, then check again.', 'طبّق القاعدتين الأول وبعدها افحص تاني.');
        if (!compressed) return challengeFeedback('retry', 'The compression does not match the deck result yet.', 'الضغط لسه مش مطابق لناتج الديك.');
        if (!prediction.includes('run-long')) return challengeFeedback('retry', 'The address is right — revisit which run the single :: replaced.', 'العنوان صح — راجع تاني أنهي مجموعة اللي النقطتين استبدلوها.');
        return challengeFeedback('success', 'Correct: the longest run (three hextets) receives the single ::, giving 2001:db8:0:1111::200.', 'صح: أطول مجموعة (تلات hextets) هي اللي خدت النقطتين الواحدة، فطلع ‏2001:db8:0:1111::200.');
      },
    },
  ];

  const statusEn = (() => {
    if (!hextets) return 'This example could not be parsed as an IPv6 address.';
    if (mode === 'expand') return `Expansion writes all eight hextets: ${result}. The double colon had covered ${8 - preset.input.split(':').filter(Boolean).length} missing zero hextets.`;
    if (!rule1 && !rule2) return 'Preferred format shown. Enable Rule 1 to drop leading zeros, then Rule 2 for the double colon.';
    if (rule1 && !rule2) return 'Rule 1 applied: leading zeros are gone, but the zero hextets are still written individually.';
    if (!rule1 && rule2) return 'Rule 2 applied on the raw form: the longest 0000 run is replaced by :: — combine it with Rule 1 for the shortest form.';
    return 'Both rules applied: leading zeros dropped and the longest zero run collapsed into a single double colon.';
  })();
  const statusAr = (() => {
    if (!hextets) return 'المثال ده مش اتقدر يتفسر كعنوان IPv6.';
    if (mode === 'expand') return `التوسيع كتب المجموعات الثمانية كلها: ${result}. والنقطتين كانت بتقف مكان hextets الأصفار الناقصة.`;
    if (!rule1 && !rule2) return 'ده شكل الصيغة المفضلة. فعّل القاعدة الأولى لحذف الأصفار البادئة، وبعدها القاعدة التانية للنقطتين.';
    if (rule1 && !rule2) return 'القاعدة الأولى اتطبقت: الأصفار البادئة اتشالت، لكن hextets الأصفار لسه مكتوبة واحدة واحدة.';
    if (!rule1 && rule2) return 'القاعدة التانية اتطبقت على الشكل الخام: أطول مجموعة 0000 اتبدلت بنقطتين — ادمجها مع القاعدة الأولى لأقصر صيغة.';
    return 'القاعدتين اتطبقوا: الأصفار البادئة اتشالت وأطول مجموعة أصفار انضغطت لنقطتين واحدة.';
  })();

  return (
    <section aria-labelledby="ipv6-compress-title" className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm space-y-5 dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Scissors className="h-5 w-5" /></div>
          <div>
            <h3 id="ipv6-compress-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">IPv6 Compression Studio</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">طبّق قاعدتي الضغط خطوة خطوة وقارن بأمثلة الديك</ArabicText>
          </div>
        </div>
        <button type="button" onClick={reset} aria-label="Reset compression rules" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-beige-300 bg-white text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200"><RotateCcw className="h-4 w-4" /></button>
      </header>

      <LabChallenge missions={missions} />

      <div className="space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-[13px] font-semibold text-stone-700 dark:text-zinc-300">Mode</span>
            <select aria-label="Compression mode" value={mode} onChange={event => changeMode(event.target.value as Mode)} className="min-h-11 w-full rounded-xl border border-beige-300 bg-white px-3 text-sm text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200">
              <option value="compress">Compress · طبّق القواعد</option>
              <option value="expand">Expand · رجّع للصيغة المفضلة</option>
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-[13px] font-semibold text-stone-700 dark:text-zinc-300">Deck example</span>
            <select aria-label="Deck example address" value={presetId} onChange={event => setPresetId(event.target.value)} className="min-h-11 w-full rounded-xl border border-beige-300 bg-white px-3 font-mono text-[13px] text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-200">
              {PRESETS.filter(item => item.mode === mode).map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
        </div>
        {mode === 'compress' && (
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex min-h-11 items-center gap-2 text-sm text-stone-700 dark:text-zinc-300">
              <input type="checkbox" checked={rule1} onChange={event => setRule1(event.target.checked)} className="h-4 w-4 accent-stone-800 dark:accent-stone-200" />
              Rule 1 · omit leading 0s <span className="font-arabic">(حذف الأصفار البادئة)</span>
            </label>
            <label className="inline-flex min-h-11 items-center gap-2 text-sm text-stone-700 dark:text-zinc-300">
              <input type="checkbox" checked={rule2} onChange={event => setRule2(event.target.checked)} className="h-4 w-4 accent-stone-800 dark:accent-stone-200" />
              Rule 2 · one double colon <span className="font-arabic">(نقطتين لمجموعة أصفار واحدة)</span>
            </label>
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <p className="pb-2 font-mono text-[13px] font-bold uppercase text-stone-500 dark:text-zinc-400">{mode === 'compress' ? 'Preferred input' : 'Compressed input'}</p>
        <p className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">{preset.input}</p>
        {mode === 'compress' && hextets && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {hextets.map((hextet, index) => {
              const inRun = run.start !== -1 && index >= run.start && index < run.start + run.length;
              const isRunStart = run.start !== -1 && index === run.start;
              const shown = rule1 ? stripLeadingZeros(hextet) : hextet;
              if (rule2 && isRunStart) {
                return (
                  <span key={index} className="inline-flex min-w-14 items-center justify-center rounded-lg border-2 border-dashed border-violet-400 bg-violet-50 px-3 py-2 font-mono text-sm font-bold text-violet-800 dark:border-violet-500 dark:bg-violet-950/40 dark:text-violet-200">::</span>
                );
              }
              if (rule2 && inRun) return null;
              const colonSuppressed = rule2 && run.start !== -1 && index === run.start - 1;
              return (
                <React.Fragment key={index}>
                  <span className={`inline-flex min-w-14 flex-col items-center rounded-lg border px-3 py-1.5 font-mono text-sm font-bold ${inRun && !rule2 ? 'border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-200' : 'border-beige-300 bg-[#FAF7F2] text-stone-800 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-200'}`}>
                    {hextet.toLowerCase()}
                    {rule1 && shown !== hextet.toLowerCase() && <span className="text-[13px] font-semibold text-amber-700 dark:text-amber-400">↓ {shown}</span>}
                  </span>
                  {index < 7 && !colonSuppressed && <span className="font-mono text-sm text-stone-400">:</span>}
                </React.Fragment>
              );
            })}
          </div>
        )}
        {mode === 'expand' && hextets && (() => {
          const [leftRaw, rightRaw] = preset.input.split('::');
          const leftCount = leftRaw ? leftRaw.split(':').filter(Boolean).length : 0;
          const rightCount = rightRaw ? rightRaw.split(':').filter(Boolean).length : 0;
          const filledFrom = leftCount;
          const filledTo = 8 - rightCount - 1;
          return (
            <div className="flex flex-wrap items-center gap-2 pt-4">
              {hextets.map((hextet, index) => {
                const filled = index >= filledFrom && index <= filledTo;
                return (
                  <React.Fragment key={index}>
                    <span className={`inline-flex min-w-14 flex-col items-center rounded-lg border px-3 py-2 font-mono text-sm font-bold ${filled ? 'border-dashed border-violet-400 bg-violet-50 text-violet-800 dark:border-violet-500 dark:bg-violet-950/40 dark:text-violet-200' : 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200'}`}>
                      {hextet}
                      {filled && <span className="text-[13px] font-semibold text-violet-700 dark:text-violet-300">from ::</span>}
                    </span>
                    {index < 7 && <span className="font-mono text-sm text-stone-400">:</span>}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })()}
      </div>

      <div aria-live="polite" className="space-y-2 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[13px] font-bold uppercase text-amber-900 dark:text-amber-300">Result</span>
          {result && <span className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">{result}</span>}
        </div>
        <p className="text-[15px] font-semibold text-stone-800 dark:text-zinc-200">{statusEn}</p>
        <ArabicText className="text-sm text-stone-700 dark:text-zinc-300">{statusAr}</ArabicText>
      </div>

      <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">What to observe</h4>
        <p className="pt-1 text-sm leading-relaxed text-stone-700 dark:text-zinc-300">Rule 1 never removes a hextet; it only shortens each one. Rule 2 removes whole zero hextets, but only one contiguous run and only once — that is why 2001:db8::1111::200 is illegal.</p>
        <ArabicText className="pt-1 text-sm leading-relaxed text-stone-600 dark:text-zinc-400">القاعدة الأولى ما بتشيلش hextet؛ بتقصره بس. القاعدة التانية بتشيل hextets أصفار كاملة، لكن مجموعة متتالية واحدة ومرة واحدة بس — عشان كده 2001:db8::1111::200 شكل ممنوع.</ArabicText>
      </div>
    </section>
  );
};

export default Ipv6CompressionLab;

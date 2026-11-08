import React, { useState } from 'react';
import { ArrowRight, Compass, RotateCcw, Route } from 'lucide-react';
import { ArabicText } from '../ArabicText';

const button = 'rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-4 py-2.5 text-sm font-semibold text-stone-800 dark:text-zinc-200 hover:bg-beige-100 dark:hover:bg-stone-800';

type RouteChoice = 'safe' | 'shortcut';

export const AiRationalityLab: React.FC = () => {
  const [risk, setRisk] = useState(50);
  const [choice, setChoice] = useState<RouteChoice | null>(null);
  const [outcome, setOutcome] = useState<'clear' | 'blocked' | null>(null);
  const shortcutExpected = 2 * (1 - risk / 100) + 20 * risk / 100;
  const tied = Math.abs(shortcutExpected - 8) < 0.01;
  const recommended: RouteChoice = shortcutExpected < 8 ? 'shortcut' : 'safe';
  const rational = choice !== null && (tied || choice === recommended);
  const actual = choice === 'safe' ? 8 : outcome === 'clear' ? 2 : 20;
  const reset = () => { setRisk(50); setChoice(null); setOutcome(null); };
  const updateRisk = (value: number) => { setRisk(value); setChoice(null); setOutcome(null); };

  return (
    <section data-testid="ai-rationality" className="min-w-0 rounded-3xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-sm space-y-5">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-100 dark:bg-amber-950/60 p-2 text-amber-800 dark:text-amber-300"><Compass className="h-5 w-5" /></div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Rational Decisions, Not Perfect Predictions</h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">اختار بالمعلومات المتاحة، وبعدين افصل جودة القرار عن الحظ.</ArabicText>
          </div>
        </div>
        <button className={button} onClick={reset} aria-label="إعادة ضبط القرار (Reset decision)"><RotateCcw className="inline h-4 w-4" /> <ArabicText as="span" className="text-inherit">إعادة ضبط (Reset)</ArabicText></button>
      </header>

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 p-4 space-y-2">
        <p className="text-sm text-stone-700 dark:text-zinc-300">Teaching example for slides 23–24: minimize expected travel time. The times and probabilities below are illustrative, not measurements from the lecture.</p>
        <ArabicText className="text-sm text-stone-700 dark:text-zinc-300">مثال توضيحي لسلايدز 23–24: هدفك تقلّل وقت الرحلة المتوقع. الأوقات والاحتمالات هنا افتراضية للتعليم، مش قياسات من المحاضرة.</ArabicText>
      </div>

      <div className="rounded-2xl border border-beige-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-stone-950 p-4 space-y-3">
        <label htmlFor="ai-road-risk" className="block"><ArabicText as="span" className="text-sm font-semibold text-stone-900 dark:text-stone-100">احتمال زحمة الطريق المختصر (Blockage probability)</ArabicText></label>
        <div className="flex items-center gap-4">
          <input id="ai-road-risk" aria-label="Blockage probability" type="range" min="0" max="100" step="5" value={risk} onChange={e => updateRisk(Number(e.target.value))} className="min-w-0 w-full accent-amber-600" />
          <output htmlFor="ai-road-risk" className="font-mono text-lg font-bold text-amber-800 dark:text-amber-300">{risk}%</output>
        </div>
        <div className="flex flex-wrap gap-2">
          {[10, 50, 90].map(value => <button key={value} className={button} onClick={() => updateRisk(value)}>{value}%</button>)}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(['safe', 'shortcut'] as const).map(route => (
          <button key={route} onClick={() => { setChoice(route); setOutcome(null); }} aria-pressed={choice === route}
            data-testid={`choose-${route}`}
            className={`min-w-0 rounded-2xl border p-5 text-left space-y-3 transition-colors ${choice === route ? 'border-amber-500 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30' : 'border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-beige-100 dark:hover:bg-stone-800'}`}>
            <Route className="h-6 w-6 text-amber-700 dark:text-amber-400" />
            <ArabicText className="font-bold text-stone-900 dark:text-stone-100">{route === 'safe' ? 'الطريق الآمن (Safe route)' : 'الطريق المختصر (Shortcut)'}</ArabicText>
            <p className="text-sm text-stone-700 dark:text-zinc-300">{route === 'safe' ? '8 minutes, in either road condition.' : '2 minutes if clear; 20 minutes if blocked.'}</p>
            <ArabicText className="text-sm text-stone-700 dark:text-zinc-300">{route === 'safe' ? '8 دقايق، سواء الطريق التاني فاضي أو زحمة.' : 'دقيقتين لو فاضي؛ 20 دقيقة لو زحمة.'}</ArabicText>
            <p className="font-mono text-sm font-bold text-amber-800 dark:text-amber-300">E[time] = {route === 'safe' ? '8.0' : shortcutExpected.toFixed(1)} min</p>
          </button>
        ))}
      </div>

      <div aria-live="polite" data-testid="rationality-feedback" className="rounded-2xl border border-beige-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-stone-950 p-4 space-y-3">
        <p className="font-mono text-sm text-stone-800 dark:text-zinc-200 break-words">E[shortcut] = (1 − {risk / 100}) × 2 + {risk / 100} × 20 = {shortcutExpected.toFixed(1)} min</p>
        <ArabicText className="text-sm text-stone-700 dark:text-zinc-300">التوقع متوسط موزون على رحلات كتير، مش وعد بمدة الرحلة الجاية. بنقارن على أساس الوقت فقط؛ لو الهدف أو التكلفة اتغيّروا، القرار ممكن يتغيّر.</ArabicText>
        <p className="text-sm text-stone-700 dark:text-zinc-300">An expectation is a probability-weighted average over many trips, not a promise about the next trip. This model values time only; changing goals or costs may change the decision.</p>
        {choice && <>
          <ArabicText className={`font-bold text-sm ${rational ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
            {rational ? 'قرار عقلاني حسب النموذج: اخترت أقل وقت متوقع بالمعلومات المتاحة.' : 'راجع القرار: الطريق التاني وقته المتوقع أقل بالمعلومات المتاحة.'}
          </ArabicText>
          <p className="text-sm text-stone-700 dark:text-zinc-300">{rational ? 'Rational under this model: you minimized expected time using available information.' : 'Reconsider: the other route has a lower expected time using available information.'}</p>
          <div className="flex flex-wrap gap-2">
            {risk < 100 && <button className={button} onClick={() => setOutcome('clear')}> <ArabicText as="span" className="text-inherit">اكشف يوم الطريق فيه فاضي (Clear day)</ArabicText></button>}
            {risk > 0 && <button className={button} onClick={() => setOutcome('blocked')}> <ArabicText as="span" className="text-inherit">اكشف يوم الطريق فيه زحمة (Blocked day)</ArabicText></button>}
          </div>
        </>}
        {choice && outcome && <div className="border-t border-beige-300 dark:border-stone-700 pt-3 space-y-2" data-testid="rationality-outcome">
          <div className="flex flex-wrap items-center gap-2 text-stone-900 dark:text-stone-100"><ArrowRight className="h-4 w-4" /><span className="font-mono font-bold">Actual time: {actual} min</span></div>
          <ArabicText className="text-sm text-stone-700 dark:text-zinc-300">{`الوقت الفعلي: ${actual} دقيقة. ${rational ? 'حتى لو النتيجة ماعجبتكش، القرار كان عقلاني وقت الاختيار؛ العقلانية مش معرفة الغيب.' : 'حتى لو وصلت أسرع بالمصادفة، الحظ مش دليل إن القرار كان الأفضل قبل ما تعرف النتيجة.'}`}</ArabicText>
          <p className="text-sm text-stone-700 dark:text-zinc-300">{rational ? 'Even an unlucky outcome does not make the original decision irrational. Rationality is not omniscience.' : 'A lucky outcome does not prove that the decision was best before the outcome was known.'}</p>
        </div>}
      </div>
    </section>
  );
};

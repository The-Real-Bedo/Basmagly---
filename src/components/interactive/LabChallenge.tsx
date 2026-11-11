import { useId, useState, type ReactNode } from 'react';
import { CheckCircle2, RotateCcw, Target } from 'lucide-react';
import { ArabicText } from '../ArabicText';

export interface ChallengeFeedback { status: 'pending' | 'success' | 'retry'; en: string; ar: string }
export interface ChallengeMission {
  id: string; title: string; titleAr: string; goal: string; goalAr: string; hint: string; hintAr: string;
  start: () => void;
  evaluate: (prediction: string[]) => ChallengeFeedback;
  prediction?: { label: string; labelAr: string; options: { id: string; label: string }[] };
}
const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400';
const neutral = 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800';

// Keep vectors and worked arithmetic in their mathematical order inside Arabic copy.
const mathRuns = /\[(?:-?\d+(?:\.\d+)?)(?:,\s*-?\d+(?:\.\d+)?)*\]|\b(?:y\[\d+\]|n)\s*=\s*\d+(?:\.\d+)?(?:\s*(?:\+|=)\s*\d+(?:\.\d+)?)*|\b\d+(?:\s*\+\s*\d+)+\s*=\s*\d+/g;
function arabicCopy(value: string): ReactNode {
  const parts: ReactNode[] = [];
  let end = 0;
  for (const match of value.matchAll(mathRuns)) {
    parts.push(value.slice(end, match.index));
    parts.push(<bdi key={match.index} dir="ltr" className="font-mono">{match[0]}</bdi>);
    end = match.index! + match[0].length;
  }
  parts.push(value.slice(end));
  return parts;
}

/** Evaluate current simulator state, so edited inputs cannot retain a stale pass. */
export function LabChallenge({ missions, busy = false }: { missions: ChallengeMission[]; busy?: boolean }) {
  const [selectedId, setSelectedId] = useState(missions[0].id);
  const [started, setStarted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [prediction, setPrediction] = useState<string[]>([]);
  const [hint, setHint] = useState(false);
  const selectId = useId();
  const mission = missions.find(item => item.id === selectedId) ?? missions[0];
  const feedback = started && checked ? mission.evaluate(prediction) : null;
  const start = () => { mission.start(); setStarted(true); setChecked(false); setPrediction([]); setHint(false); };
  return <section data-testid="lab-challenge" className="my-5 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-2"><Target className="mt-1 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" /><div><h4 className="text-base font-bold text-stone-900 dark:text-stone-100">Practical challenge</h4><p className="text-xs text-stone-600 dark:text-zinc-400">Supplementary practice · use the lab controls</p><ArabicText className="text-xs text-stone-600 dark:text-zinc-400">تدريب إضافي · استخدم أدوات المعمل</ArabicText></div></div>
      <div className="min-w-0 flex-1 basis-60 sm:max-w-sm"><label htmlFor={selectId} className="mb-1 block text-xs font-semibold text-stone-700 dark:text-zinc-300">Choose a mission</label><select data-challenge-select id={selectId} value={mission.id} disabled={busy} onChange={event => { setSelectedId(event.target.value); setStarted(false); setChecked(false); setPrediction([]); setHint(false); }} className="min-h-11 w-full rounded-xl border border-beige-300 bg-white px-3 text-sm text-stone-900 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100">{missions.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
    </div>
    <div className="mt-4 grid gap-3 lg:grid-cols-2"><div><p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{mission.title}</p><p className="mt-1 text-[15px] text-stone-700 dark:text-zinc-300">{mission.goal}</p></div><div><ArabicText className="text-sm font-semibold text-stone-900 dark:text-stone-100">{mission.titleAr}</ArabicText><ArabicText className="mt-1 text-[15px] text-stone-700 dark:text-zinc-300">{arabicCopy(mission.goalAr)}</ArabicText></div></div>
    {started && mission.prediction && <fieldset className="mt-4 rounded-xl border border-beige-300 p-3 dark:border-stone-700"><legend className="px-1 text-sm font-semibold text-stone-900 dark:text-stone-100">{mission.prediction.label}</legend><ArabicText className="mb-2 text-xs text-stone-600 dark:text-zinc-400">{mission.prediction.labelAr}</ArabicText><div className="flex flex-wrap gap-2">{mission.prediction.options.map(option => <label key={option.id} className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 text-sm ${prediction.includes(option.id) ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-200' : neutral}`}><input type="checkbox" value={option.id} checked={prediction.includes(option.id)} onChange={() => setPrediction(values => values.includes(option.id) ? values.filter(id => id !== option.id) : [...values, option.id])} className="accent-stone-800 dark:accent-stone-200" />{option.label}</label>)}</div></fieldset>}
    <div className="mt-4 flex flex-wrap gap-2"><button type="button" data-testid="start-challenge" onClick={start} className={`${button} border-stone-900 bg-stone-900 text-white hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white`}>{started ? <RotateCcw className="h-4 w-4" /> : <Target className="h-4 w-4" />}{started ? 'Restart mission' : 'Start challenge'}</button>{started && <><button type="button" data-testid="check-challenge" onClick={() => setChecked(true)} className={`${button} ${neutral}`}><CheckCircle2 className="h-4 w-4" />Check result</button><button type="button" onClick={() => { setStarted(false); setChecked(false); }} className={`${button} ${neutral}`}>Back to exploration</button></>}<button type="button" aria-expanded={hint} onClick={() => setHint(value => !value)} className={`${button} ${neutral}`}>{hint ? 'Hide hint' : 'Show hint'}</button></div>
    {!started && <div className="mt-2"><p className="text-xs text-stone-600 dark:text-zinc-400">Start challenge loads its starting conditions. Then use the simulator and check your result.</p><ArabicText className="text-xs text-stone-600 dark:text-zinc-400">Start challenge بيحمّل حالة البداية. بعدها استخدم المحاكي وافحص نتيجتك.</ArabicText></div>}
    {hint && <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900 dark:bg-amber-950/20"><p className="text-sm text-stone-700 dark:text-zinc-300">{mission.hint}</p><ArabicText className="mt-1 text-sm text-stone-700 dark:text-zinc-300">{arabicCopy(mission.hintAr)}</ArabicText></div>}
    {feedback && <div data-testid="challenge-feedback" data-status={feedback.status} role="status" aria-live="polite" className={`mt-3 rounded-xl border p-3 ${feedback.status === 'success' ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30' : feedback.status === 'retry' ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30' : 'border-beige-300 bg-white dark:border-stone-700 dark:bg-stone-900'}`}><p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{feedback.en}</p><ArabicText className="mt-1 text-sm text-stone-700 dark:text-zinc-300">{arabicCopy(feedback.ar)}</ArabicText></div>}
  </section>;
}
export const challengeFeedback = (status: ChallengeFeedback['status'], en: string, ar: string): ChallengeFeedback => ({ status, en, ar });

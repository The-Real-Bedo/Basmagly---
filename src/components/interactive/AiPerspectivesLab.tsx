import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';
import { useState, type ReactNode } from 'react';
import { BrainCircuit, Check, Compass, RotateCcw } from 'lucide-react';
import ArabicText from '../ArabicText';

type Pair = { en: string; ar: string };
type ApproachId = 'thinkHumanly' | 'thinkRationally' | 'actHumanly' | 'actRationally';

type Approach = Pair & {
  id: ApproachId;
  short: Pair;
  idea: Pair;
  criterion: Pair;
};

const approaches: Approach[] = [
  {
    id: 'thinkHumanly',
    en: 'Thinking Humanly',
    ar: 'التفكير بطريقة بشرية',
    short: { en: 'Model human thought', ar: 'نمذجة تفكير البشر' },
    idea: {
      en: 'Model the mental processes people actually use, then compare the model with evidence about human thought.',
      ar: 'نمذج العمليات الذهنية اللي الناس بتستخدمها فعلًا، وبعدها قارن النموذج بأدلة عن تفكير البشر.',
    },
    criterion: {
      en: 'How closely the model matches human cognitive processes.',
      ar: 'مدى تشابه النموذج مع العمليات المعرفية عند البشر.',
    },
  },
  {
    id: 'thinkRationally',
    en: 'Thinking Rationally',
    ar: 'التفكير بمنطق سليم',
    short: { en: 'Reason by logic', ar: 'الاستدلال بالمنطق' },
    idea: {
      en: 'Use formal rules of logic to derive valid conclusions from stated premises.',
      ar: 'استخدم قواعد المنطق الصورية عشان توصل لاستنتاجات صحيحة من مقدمات محددة.',
    },
    criterion: {
      en: 'Whether the conclusion follows validly from the premises.',
      ar: 'هل الاستنتاج ناتج بشكل صحيح عن المقدمات؟',
    },
  },
  {
    id: 'actHumanly',
    en: 'Acting Humanly',
    ar: 'التصرف بطريقة بشرية',
    short: { en: 'Imitate human behavior', ar: 'تقليد السلوك البشري' },
    idea: {
      en: 'Produce behavior that resembles human behavior; the Turing Test is one operational way to examine it.',
      ar: 'قدّم سلوك شبه سلوك البشر؛ واختبار تورنج طريقة عملية واحدة لفحص ده.',
    },
    criterion: {
      en: 'Whether a human judge can distinguish the system’s responses from a person’s.',
      ar: 'هل المحكّم البشري يقدر يميّز ردود النظام عن ردود شخص؟',
    },
  },
  {
    id: 'actRationally',
    en: 'Acting Rationally',
    ar: 'اختيار الفعل الأنسب',
    short: { en: 'Choose a goal-directed action', ar: 'اختيار فعل يحقق الهدف' },
    idea: {
      en: 'Choose the action expected to achieve the goal best with the information available; under uncertainty, compare expected outcomes.',
      ar: 'اختار الفعل المتوقع إنه يحقق الهدف بأفضل شكل بالمعلومات المتاحة؛ ومع عدم اليقين قارن النتايج المتوقعة.',
    },
    criterion: {
      en: 'The expected progress toward the goal—not whether the action looks human.',
      ar: 'التقدم المتوقع ناحية الهدف، مش إن الفعل يبان بشري.',
    },
  },
];

type Scenario = Pair & {
  prompt: Pair;
  answer: ApproachId;
  process: Pair;
  criterion: Pair;
};

const scenarios: Scenario[] = [
  {
    en: 'A learner’s reasoning',
    ar: 'طريقة تفكير طالب',
    prompt: {
      en: 'A research team records how learners solve a puzzle, builds a model that follows the same mental steps, and compares both process and timing.',
      ar: 'فريق بحثي بيسجل إزاي الطلبة بيحلّوا لغز، ويبني نموذج بيتبع نفس الخطوات الذهنية، وبعدها يقارن طريقة الحل وتوقيته.',
    },
    answer: 'thinkHumanly',
    process: {
      en: 'The system is judged by how well its internal steps model the steps people use—not only by getting the puzzle right.',
      ar: 'النظام بيتقيّم على مدى تمثيل خطواته الداخلية لطريقة الناس، مش على إنه يطلع إجابة اللغز صح وبس.',
    },
    criterion: {
      en: 'Similarity to observed human thought is the stated goal.',
      ar: 'الهدف المعلن هو التشابه مع التفكير البشري اللي اتلاحظ.',
    },
  },
  {
    en: 'A clinician’s decision path',
    ar: 'مسار تفكير طبيب',
    prompt: {
      en: 'An AI model is designed to reproduce the sequence of hypotheses clinicians consider, then tested against their recorded reasoning.',
      ar: 'نموذج ذكاء اصطناعي معمول عشان يعيد ترتيب الفرضيات اللي الأطباء بيفكروا فيها، وبعدها بيتقارن بتسجيلات لطريقة استدلالهم.',
    },
    answer: 'thinkHumanly',
    process: {
      en: 'The project models human cognition and checks it against evidence of how clinicians reason.',
      ar: 'المشروع بينمذج الإدراك البشري وبيختبره بمقارنته بأدلة عن طريقة استدلال الأطباء.',
    },
    criterion: {
      en: 'Matching the human reasoning process is the target, independent of whether imitation is always optimal.',
      ar: 'الهدف هو مطابقة مسار التفكير البشري، حتى لو التقليد مش دايمًا أحسن قرار.',
    },
  },
  {
    en: 'A formal proof',
    ar: 'برهان صوري',
    prompt: {
      en: 'Given explicit premises and inference rules, a program derives a conclusion and checks that every step is logically valid.',
      ar: 'بناءً على مقدمات وقواعد استدلال واضحة، برنامج بيستنتج نتيجة ويفحص إن كل خطوة منطقية وصحيحة.',
    },
    answer: 'thinkRationally',
    process: {
      en: 'The central method is applying formal rules of thought to derive a valid conclusion from premises.',
      ar: 'الطريقة الأساسية هي تطبيق قواعد التفكير الصوري للوصول لاستنتاج صحيح من المقدمات.',
    },
    criterion: {
      en: 'Logical validity—not similarity to a person’s thought process or conversational style.',
      ar: 'صحة الاستدلال المنطقي، مش تشابه طريقة التفكير مع شخص أو أسلوب كلامه.',
    },
  },
  {
    en: 'Checking a proof step',
    ar: 'مراجعة خطوة في برهان',
    prompt: {
      en: 'A mathematics assistant accepts a claim only when it follows from earlier statements by a permitted inference rule.',
      ar: 'مساعد رياضيات ما بيقبلش ادعاء غير لما يكون ناتج عن عبارات سابقة بقاعدة استدلال مسموح بيها.',
    },
    answer: 'thinkRationally',
    process: {
      en: 'It represents reasoning as premises and rule-governed inferences, then checks each deduction.',
      ar: 'بيمثل الاستدلال كمقدمات وخطوات ماشية على قواعد، وبعدها بيراجع كل استنتاج.',
    },
    criterion: {
      en: 'A conclusion must follow from the stated premises under the rules.',
      ar: 'لازم النتيجة تتبع المقدمات المحددة حسب القواعد.',
    },
  },
  {
    en: 'A human-like chat test',
    ar: 'اختبار محادثة شبه بشرية',
    prompt: {
      en: 'In a written conversation, an interrogator exchanges messages with a person and a computer. The computer is judged by whether it can be distinguished.',
      ar: 'في محادثة مكتوبة، محقّق بيتبادل رسائل مع شخص وكمبيوتر. تقييم الكمبيوتر بيعتمد على إمكانية التمييز بينه وبين الشخص.',
    },
    answer: 'actHumanly',
    process: {
      en: 'This is the Turing Test’s behavioral framing: examine the computer’s observable responses in conversation.',
      ar: 'ده المنظور السلوكي لاختبار تورنج: فحص ردود الكمبيوتر الظاهرة أثناء المحادثة.',
    },
    criterion: {
      en: 'The interrogator cannot reliably tell the computer’s written replies from the human’s.',
      ar: 'المحقّق ما يقدرش يميّز بشكل موثوق ردود الكمبيوتر المكتوبة عن ردود الشخص.',
    },
  },
  {
    en: 'A convincing help-desk agent',
    ar: 'موظف دعم مقنع',
    prompt: {
      en: 'A support bot is evaluated by whether users believe they are chatting with a human, even when its advice is not the fastest possible solution.',
      ar: 'بوت دعم بيتقيّم على أساس إن المستخدم يفتكره بيتكلم مع إنسان، حتى لو نصيحته مش أسرع حل ممكن.',
    },
    answer: 'actHumanly',
    process: {
      en: 'The design target is human-like outward behavior, rather than a particular internal reasoning process.',
      ar: 'الهدف في التصميم هو سلوك خارجي شبه البشر، مش طريقة استدلال داخلية بعينها.',
    },
    criterion: {
      en: 'How human the interaction appears to the user.',
      ar: 'مدى ظهور التفاعل للمستخدم كأنه صادر من إنسان.',
    },
  },
  {
    en: 'A navigation agent',
    ar: 'وكيل ملاحة',
    prompt: {
      en: 'A route planner uses current reports and uncertain traffic estimates to choose the route most likely to get a passenger to the destination on time.',
      ar: 'مخطط طرق بيستخدم تقارير حالية وتقديرات مرور غير مؤكدة عشان يختار الطريق الأرجح إنه يوصل الراكب في معاده.',
    },
    answer: 'actRationally',
    process: {
      en: 'The agent compares actions by their expected contribution to its goal using the information it has.',
      ar: 'الوكيل بيقارن الأفعال حسب مساهمتها المتوقعة في تحقيق الهدف بالمعلومات اللي معاه.',
    },
    criterion: {
      en: 'Best expected goal achievement under uncertainty—not imitation of a human driver.',
      ar: 'أفضل تحقيق متوقع للهدف مع عدم اليقين، مش تقليد سواق بشري.',
    },
  },
  {
    en: 'A warehouse robot',
    ar: 'روبوت مخزن',
    prompt: {
      en: 'A robot chooses whether to wait, turn, or take another aisle by weighing expected delivery delay and collision risk from its sensors.',
      ar: 'روبوت بيختار يستنى أو يلف أو ياخد ممر تاني بموازنة التأخير المتوقع وخطر التصادم حسب بيانات الحساسات.',
    },
    answer: 'actRationally',
    process: {
      en: 'It selects an action for its delivery goal while accounting for evidence and possible outcomes.',
      ar: 'بيختار فعل يخدم هدف التوصيل مع مراعاة الأدلة والنتايج المحتملة.',
    },
    criterion: {
      en: 'The choice is judged by expected goal progress and trade-offs, not by looking human.',
      ar: 'الاختيار بيتقيّم بالتقدم المتوقع ناحية الهدف والموازنة بين العواقب، مش بمدى شبهه بالبشر.',
    },
  },
];

function Copy({ en, ar, className = '' }: Pair & { className?: string }) {
  return (
    <div className={className}>
      <p>{en}</p>
      <ArabicText className="mt-1">{ar}</ArabicText>
    </div>
  );
}

function LabHeader({ icon, title, titleId, subtitle }: { icon: ReactNode; title: string; titleId: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
        {icon}
      </div>
      <div className="min-w-0">
        <h2 id={titleId} className="text-lg font-bold text-stone-900 dark:text-stone-100">{title}</h2>
        <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{subtitle}</ArabicText>
      </div>
    </div>
  );
}

const baseCard = 'rounded-3xl border border-beige-300 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6';
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-amber-400 dark:focus-visible:ring-offset-stone-900';
const controlClass = 'rounded-xl border border-beige-400 bg-white px-3 py-2.5 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100';

export function AiApproachesLab() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [prediction, setPrediction] = useState<ApproachId | null>(null);
  const [revealed, setRevealed] = useState(false);
  const scenario = scenarios[scenarioIndex];
  const correct = prediction === scenario.answer;
  const answer = approaches.find((item) => item.id === scenario.answer)!;
  const selected = approaches.find((item) => item.id === prediction);

  const chooseScenario = (index: number) => {
    setScenarioIndex(index);
    setPrediction(null);
    setRevealed(false);
  };

  const reset = () => chooseScenario(0);
  const next = () => chooseScenario((scenarioIndex + 1) % scenarios.length);

  return (
    <section data-testid="ai-approaches" className={baseCard} aria-labelledby="ai-approaches-title">
      <LabHeader
        icon={<BrainCircuit aria-hidden="true" className="h-5 w-5" />}
        title="Four Approaches to Artificial Intelligence"
        titleId="ai-approaches-title"
        subtitle="شوف الذكاء الاصطناعي من أربع زوايا: طريقة التفكير أو الفعل، ومعيار بشري أو عقلاني."
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <label htmlFor="ai-approach-scenario" className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200">
            <ArabicText as="span" className="text-inherit">اختار الموقف (Select a scenario)</ArabicText>
          </label>
          <select
            id="ai-approach-scenario"
            className={`${controlClass} w-full ${focusRing}`}
            value={scenarioIndex}
            onChange={(event) => chooseScenario(Number(event.target.value))}
          >
            {scenarios.map((item, index) => (
              <option key={item.en} value={index}>{item.en} — {item.ar}</option>
            ))}
          </select>
          <div className="mt-4 rounded-xl border border-beige-300 bg-white p-4 text-sm leading-relaxed text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
            <p className="font-semibold text-stone-900 dark:text-stone-100">{scenario.en}</p>
            <ArabicText className="mt-1">{scenario.prompt.ar}</ArabicText>
            <p className="mt-3">{scenario.prompt.en}</p>
          </div>
          <p className="mt-3 text-xs text-stone-600 dark:text-zinc-400">
            Choose the lens that best matches the stated goal; different AI approaches answer different questions.
          </p>
          <ArabicText className="mt-1 text-xs text-stone-600 dark:text-zinc-400">
            اختار الزاوية الأقرب للهدف المذكور؛ كل مقاربة للذكاء الاصطناعي بتجاوب عن سؤال مختلف.
          </ArabicText>
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase text-stone-500 dark:text-zinc-400">Prediction matrix</p>
              <ArabicText className="text-sm font-semibold text-stone-800 dark:text-stone-200">اختار خلية وتوقّع المقاربة</ArabicText>
            </div>
            <div className="text-right text-xs text-stone-500 dark:text-zinc-400">
              <p>Columns: standard · Rows: focus</p>
              <ArabicText className="mt-1">الأعمدة: المعيار · الصفوف: محور التركيز</ArabicText>
            </div>
          </div>
          <div className="grid grid-cols-[4.25rem_minmax(0,1fr)_minmax(0,1fr)] gap-2">
            <div aria-hidden="true" />
            <div className="rounded-lg px-1 py-2 text-center text-xs font-semibold text-stone-700 dark:text-stone-300">
              <ArabicText>بشري (Human)</ArabicText>
            </div>
            <div className="rounded-lg px-1 py-2 text-center text-xs font-semibold text-stone-700 dark:text-stone-300">
              <ArabicText>عقلاني (Rational)</ArabicText>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-stone-100 px-1 text-center text-xs font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              <ArabicText>تفكير (Think)</ArabicText>
            </div>
            {[approaches[0], approaches[1]].map((item) => (
              <ApproachChoice key={item.id} item={item} selected={prediction === item.id} onSelect={() => { setPrediction(item.id); setRevealed(false); }} />
            ))}
            <div className="flex items-center justify-center rounded-xl bg-stone-100 px-1 text-center text-xs font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              <ArabicText>فعل (Act)</ArabicText>
            </div>
            {[approaches[2], approaches[3]].map((item) => (
              <ApproachChoice key={item.id} item={item} selected={prediction === item.id} onSelect={() => { setPrediction(item.id); setRevealed(false); }} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white ${focusRing}`}
              disabled={!prediction}
              onClick={() => setRevealed(true)}
            >
              <Check aria-hidden="true" className="h-4 w-4" />
              <ArabicText as="span" className="text-inherit">راجع توقّعي (Check prediction)</ArabicText>
            </button>
            <button
              type="button"
              className={`inline-flex items-center justify-center gap-2 rounded-xl border border-beige-400 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-[#FAF7F2] dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 ${focusRing}`}
              onClick={next}
            >
              <Compass aria-hidden="true" className="h-4 w-4" />
              <ArabicText as="span" className="text-inherit">الموقف التالي (Next scenario)</ArabicText>
            </button>
            <button
              type="button"
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100 dark:text-zinc-300 dark:hover:bg-stone-800 ${focusRing}`}
              onClick={reset}
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              <ArabicText as="span" className="text-inherit">إعادة (Reset)</ArabicText>
            </button>
          </div>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`mt-4 rounded-2xl border p-4 text-sm leading-relaxed ${revealed ? (correct ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200' : 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-200') : 'border-beige-300 bg-[#FAF7F2] text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300'}`}
      >
        {!revealed ? (
          <Copy
            en={prediction ? 'Prediction selected. Check it to see the reasoning and decision criterion.' : 'Choose a quadrant, then check your prediction to reveal the explanation.'}
            ar={prediction ? 'اختيارك اتحدد. راجعه عشان تشوف طريقة التفكير ومعيار القرار.' : 'اختار خلية في المصفوفة، وبعدها راجع توقّعك عشان تظهرلك الإجابة والتفسير.'}
          />
        ) : (
          <>
            <div className="flex items-center gap-2 font-bold">
              {correct ? <Check aria-hidden="true" className="h-4 w-4" /> : <BrainCircuit aria-hidden="true" className="h-4 w-4" />}
              <span>{correct ? 'That is the best fit.' : 'Compare the stated goal with the defining criterion.'}</span>
            </div>
            <ArabicText className="mt-1 font-semibold">
              {correct ? 'اختيارك هو الأقرب لهدف الموقف.' : 'قارن الهدف المذكور بالمعيار الأساسي لكل مقاربة.'}
            </ArabicText>
            <p className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
              {selected ? `Your prediction: ${selected.en}.` : ''} Best fit: {answer.en}.
            </p>
            <ArabicText className="mt-1 text-stone-800 dark:text-stone-200">
              {selected ? `توقّعك: ${selected.ar}.` : ''} الأنسب: {answer.ar}.
            </ArabicText>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-beige-300 bg-white/70 p-3 dark:border-stone-700 dark:bg-stone-900/70">
                <p className="text-xs font-semibold uppercase text-stone-500 dark:text-zinc-400">How the approach applies</p>
                <p className="mt-1">{scenario.process.en}</p>
                <ArabicText className="mt-1">{scenario.process.ar}</ArabicText>
              </div>
              <div className="rounded-xl border border-beige-300 bg-white/70 p-3 dark:border-stone-700 dark:bg-stone-900/70">
                <p className="text-xs font-semibold uppercase text-stone-500 dark:text-zinc-400">Decision criterion</p>
                <p className="mt-1">{scenario.criterion.en}</p>
                <ArabicText className="mt-1">{scenario.criterion.ar}</ArabicText>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {approaches.map((item) => (
          <article key={item.id} className="rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100">{item.en}</h3>
            <ArabicText className="font-semibold text-stone-800 dark:text-stone-200">{item.ar}</ArabicText>
            <Copy en={item.idea.en} ar={item.idea.ar} className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300" />
            <div className="mt-3 border-t border-beige-300 pt-3 dark:border-stone-800">
              <p className="text-xs font-semibold uppercase text-amber-800 dark:text-amber-300">What counts as success?</p>
              <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">{item.criterion.en}</p>
              <ArabicText className="mt-1 text-sm text-stone-700 dark:text-stone-300">{item.criterion.ar}</ArabicText>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ApproachChoice({ item, selected, onSelect }: { item: Approach; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${item.en} — ${item.ar}`}
      onClick={onSelect}
      className={`min-h-24 min-w-0 rounded-xl border p-2 text-left transition-colors ${focusRing} ${selected ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-400 dark:border-amber-700 dark:bg-amber-950/40 dark:ring-amber-700' : 'border-beige-300 bg-white hover:border-amber-400 hover:bg-[#FAF7F2] dark:border-stone-700 dark:bg-stone-900 dark:hover:border-amber-700 dark:hover:bg-stone-800'}`}
    >
      <span className="block text-sm font-bold leading-snug text-stone-900 dark:text-stone-100">{item.en}</span>
      <ArabicText className="mt-1 text-xs text-stone-600 dark:text-zinc-400">{item.ar}</ArabicText>
    </button>
  );
}

type TaskId = 'navigation' | 'medical' | 'dialogue';
type FoundationId = 'philosophy' | 'mathematics' | 'neuroscience' | 'psychology' | 'economics' | 'engineering' | 'control' | 'linguistics';
type Stage = Pair & { disciplines: FoundationId[] };
type Challenge = Pair & {
  id: TaskId;
  description: Pair;
  recommended: FoundationId[];
  stages: Stage[];
};
type Foundation = Pair & {
  id: FoundationId;
  field: Pair;
  contributions: Record<TaskId, Pair>;
};

const challenges: Challenge[] = [
  {
    id: 'navigation',
    en: 'Voice navigation assistant',
    ar: 'مساعد ملاحة صوتي',
    description: {
      en: 'Turn a spoken destination into a route, then adapt when the trip changes.',
      ar: 'حوّل وجهة منطوقة لطريق، وبعدها اتأقلم لو ظروف الرحلة اتغيرت.',
    },
    recommended: ['linguistics', 'neuroscience', 'engineering', 'mathematics', 'control'],
    stages: [
      { en: 'Hear the request', ar: 'استقبل الطلب الصوتي', disciplines: ['engineering', 'neuroscience', 'linguistics'] },
      { en: 'Interpret destination and constraints', ar: 'افهم الوجهة والقيود', disciplines: ['linguistics', 'psychology', 'philosophy'] },
      { en: 'Compare route time and trade-offs', ar: 'قارن زمن الطرق والموازنة بينها', disciplines: ['mathematics', 'economics'] },
      { en: 'Select a route for the goal', ar: 'اختار طريق يحقق الهدف', disciplines: ['mathematics', 'economics', 'philosophy'] },
      { en: 'Monitor progress and reroute', ar: 'تابع التقدم وغيّر الطريق عند الحاجة', disciplines: ['control', 'engineering', 'psychology'] },
    ],
  },
  {
    id: 'medical',
    en: 'Medical intake assistant',
    ar: 'مساعد استقبال طبي',
    description: {
      en: 'Organize a patient’s stated symptoms and measurements to support a clinician’s next step.',
      ar: 'رتّب الأعراض والقياسات اللي المريض ذكرها عشان تدعم الخطوة الجاية للطبيب.',
    },
    recommended: ['engineering', 'linguistics', 'mathematics', 'psychology', 'philosophy'],
    stages: [
      { en: 'Collect symptoms and measurements', ar: 'اجمع الأعراض والقياسات', disciplines: ['engineering', 'linguistics'] },
      { en: 'Interpret evidence with uncertainty', ar: 'فسّر الأدلة مع مراعاة عدم اليقين', disciplines: ['mathematics', 'neuroscience', 'psychology', 'linguistics'] },
      { en: 'Prioritize a safe next step', ar: 'رتّب الخطوة الجاية بشكل آمن', disciplines: ['mathematics', 'economics', 'philosophy'] },
      { en: 'Explain the recommendation clearly', ar: 'اشرح التوصية بوضوح', disciplines: ['linguistics', 'psychology', 'philosophy'] },
      { en: 'Review follow-up observations', ar: 'راجع ملاحظات المتابعة', disciplines: ['control', 'engineering'] },
    ],
  },
  {
    id: 'dialogue',
    en: 'Bilingual help assistant',
    ar: 'مساعد دعم بلغتين',
    description: {
      en: 'Understand a bilingual question, keep the conversation context, and adapt to feedback.',
      ar: 'افهم سؤال بلغتين، واحتفظ بسياق المحادثة، واتأقلم حسب الملاحظات.',
    },
    recommended: ['linguistics', 'psychology', 'mathematics', 'engineering', 'control'],
    stages: [
      { en: 'Receive speech or text', ar: 'استقبل كلام أو نص', disciplines: ['linguistics', 'engineering', 'neuroscience'] },
      { en: 'Keep track of conversation context', ar: 'تابع سياق المحادثة', disciplines: ['psychology', 'linguistics'] },
      { en: 'Rank candidate answers and trade-offs', ar: 'رتّب الإجابات المحتملة والموازنة بينها', disciplines: ['mathematics', 'economics', 'philosophy'] },
      { en: 'Compose a clear, responsible reply', ar: 'كوّن رد واضح ومسؤول', disciplines: ['linguistics', 'psychology', 'philosophy'] },
      { en: 'Use feedback to adjust the next turn', ar: 'استخدم الملاحظات لتحسين الرد اللي بعده', disciplines: ['control', 'engineering', 'mathematics'] },
    ],
  },
];

const foundations: Foundation[] = [
  {
    id: 'philosophy', en: 'Philosophy', ar: 'الفلسفة',
    field: { en: 'Knowledge, valid reasoning, goals, and what should count as an acceptable decision.', ar: 'المعرفة والاستدلال السليم والأهداف وإيه القرار اللي ينفع نقبله.' },
    contributions: {
      navigation: { en: 'Clarifies which goals and constraints matter, such as respecting a stated restriction.', ar: 'بتوضح الأهداف والقيود المهمة، زي الالتزام بمنع حدده المستخدم.' },
      medical: { en: 'Frames what evidence supports a recommendation and why a cautious decision is justified.', ar: 'بتحدد إيه الأدلة اللي تسند التوصية وليه القرار الحذر له مبرر.' },
      dialogue: { en: 'Helps distinguish a supported answer from an unsupported claim and define responsible goals.', ar: 'بتساعد تفرّق بين إجابة مسنودة وادعاء من غير دليل، وتحدد أهداف مسؤولة.' },
    },
  },
  {
    id: 'mathematics', en: 'Mathematics', ar: 'الرياضيات',
    field: { en: 'Logic, probability, statistics, and optimization provide tools for inference and choice.', ar: 'المنطق والاحتمالات والإحصاء والتحسين بيوفروا أدوات للاستدلال والاختيار.' },
    contributions: {
      navigation: { en: 'Compares route estimates and optimizes a choice against travel-time or distance goals.', ar: 'بتقارن تقديرات الطرق وبتحسّن الاختيار حسب هدف زمن الرحلة أو المسافة.' },
      medical: { en: 'Represents uncertainty in observations and helps compare evidence without treating estimates as certainty.', ar: 'بتمثل عدم اليقين في الملاحظات وبتساعد تقارن الأدلة من غير ما تعتبر التقدير حقيقة مؤكدة.' },
      dialogue: { en: 'Ranks candidate responses using explicit likelihoods or an optimization objective.', ar: 'بترتّب الردود المحتملة باستخدام احتمالات واضحة أو هدف للتحسين.' },
    },
  },
  {
    id: 'neuroscience', en: 'Neuroscience', ar: 'علم الأعصاب',
    field: { en: 'Studies nervous systems and inspires computational models of perception and learning.', ar: 'بيدرس الجهاز العصبي وبيُلهم نماذج حسابية للإدراك والتعلّم.' },
    contributions: {
      navigation: { en: 'Informs models for recognizing spoken sound as an input signal.', ar: 'بيلهم نماذج تتعرف على الكلام المنطوق كإشارة داخلة.' },
      medical: { en: 'Offers models of biological signals and perception; it does not replace clinical evidence.', ar: 'بيقدم نماذج للإشارات الحيوية والإدراك، لكنه ما بيستبدلش الدليل الطبي.' },
      dialogue: { en: 'Provides inspiration for computational pattern recognition in speech and other signals.', ar: 'بيلهم التعرّف الحسابي على الأنماط في الكلام وإشارات تانية.' },
    },
  },
  {
    id: 'psychology', en: 'Psychology', ar: 'علم النفس',
    field: { en: 'Human cognition, memory, learning, and problem solving inform models and interaction design.', ar: 'الإدراك والذاكرة والتعلّم وحل المشكلات عند البشر بيفيدوا النماذج وتصميم التفاعل.' },
    contributions: {
      navigation: { en: 'Shapes short, timely prompts that account for a driver’s attention and memory limits.', ar: 'بتساعد تصمم تنبيهات قصيرة وفي وقتها تراعي انتباه السائق وحدود ذاكرته.' },
      medical: { en: 'Supports clear questions and explanations that account for stress and how people process information.', ar: 'بتدعم أسئلة وشروحات واضحة تراعي التوتر وطريقة استيعاب الناس للمعلومات.' },
      dialogue: { en: 'Helps maintain conversational context and present information in a user-friendly way.', ar: 'بتساعد في متابعة سياق الكلام وتقديم المعلومة بشكل مناسب للمستخدم.' },
    },
  },
  {
    id: 'economics', en: 'Economics', ar: 'الاقتصاد',
    field: { en: 'Utility, preferences, costs, and trade-offs help model decisions under limited resources.', ar: 'المنفعة والتفضيلات والتكلفة والموازنة بينها بتساعد في نمذجة القرار مع موارد محدودة.' },
    contributions: {
      navigation: { en: 'Makes trade-offs explicit—for example, a faster route may cost more or use toll roads.', ar: 'بتوضح الموازنة بين الاختيارات؛ الطريق الأسرع ممكن يكلف أكتر أو يعدّي على رسوم.' },
      medical: { en: 'Can model prioritization when time and resources are limited, alongside safety constraints.', ar: 'ممكن تنمذج ترتيب الأولويات لما الوقت والموارد يبقوا محدودين، مع مراعاة الأمان.' },
      dialogue: { en: 'Helps weigh response usefulness against costs such as time, effort, or limited resources.', ar: 'بتساعد توازن فايدة الرد مقابل تكلفة زي الوقت أو المجهود أو الموارد المحدودة.' },
    },
  },
  {
    id: 'engineering', en: 'Computer Engineering', ar: 'هندسة الحاسوب',
    field: { en: 'Processors, memory, sensors, and software make computation and interaction possible.', ar: 'المعالجات والذاكرة والحساسات والبرمجيات بتخلّي الحساب والتفاعل ممكنين.' },
    contributions: {
      navigation: { en: 'Connects the microphone, location data, route service, and user interface into a working system.', ar: 'بتوصل الميكروفون وبيانات الموقع وخدمة الطرق وواجهة المستخدم في نظام شغال.' },
      medical: { en: 'Brings measurements and patient-entered information into the assistant reliably.', ar: 'بتدخل القياسات والمعلومات اللي المريض كتبها للمساعد بشكل موثوق.' },
      dialogue: { en: 'Runs the speech, text, memory, and display components that deliver the conversation.', ar: 'بتشغّل مكونات الصوت والنص والذاكرة والعرض اللي بتقدم المحادثة.' },
    },
  },
  {
    id: 'control', en: 'Control Theory & Cybernetics', ar: 'نظرية التحكم والسيبرانية',
    field: { en: 'Feedback links observations and actions so a system can respond as its environment changes.', ar: 'التغذية الراجعة بتربط الملاحظات بالأفعال عشان النظام يستجيب لتغيّر البيئة.' },
    contributions: {
      navigation: { en: 'Compares actual progress with the route plan and triggers a reroute when conditions change.', ar: 'بتقارن التقدم الفعلي بخطة الطريق وبتبدأ تغيير المسار لما الظروف تتغير.' },
      medical: { en: 'Organizes follow-up measurements and alerts when the observed state calls for review.', ar: 'بتنظم قياسات المتابعة وبتنبه لما الحالة المرصودة تحتاج مراجعة.' },
      dialogue: { en: 'Uses a user’s correction or rating as feedback for the next interaction.', ar: 'بتستخدم تصحيح المستخدم أو تقييمه كتغذية راجعة للتفاعل اللي بعده.' },
    },
  },
  {
    id: 'linguistics', en: 'Linguistics', ar: 'علم اللغة',
    field: { en: 'Language structure and meaning support understanding and generating speech or text.', ar: 'تركيب اللغة ومعناها بيساعدوا على فهم الكلام أو النص وتوليده.' },
    contributions: {
      navigation: { en: 'Maps spoken phrases to destinations, directions, and constraints.', ar: 'بتربط العبارات المنطوقة بالوجهات والاتجاهات والقيود.' },
      medical: { en: 'Helps interpret a patient’s words and phrase a clear explanation in familiar language.', ar: 'بتساعد في فهم كلام المريض وصياغة شرح واضح بلغة مألوفة.' },
      dialogue: { en: 'Handles meaning across two languages and shapes a coherent response.', ar: 'بتتعامل مع المعنى بين لغتين وبتكوّن رد مترابط.' },
    },
  },
];

export function AiFoundationsLab() {
  const [taskId, setTaskId] = useState<TaskId>(challenges[0].id);
  const task = challenges.find((item) => item.id === taskId)!;
  const [selectedIds, setSelectedIds] = useState<FoundationId[]>(challenges[0].recommended);
  const selectedFoundations = foundations.filter((item) => selectedIds.includes(item.id));

  const chooseTask = (id: TaskId) => {
    const nextTask = challenges.find((item) => item.id === id)!;
    setTaskId(id);
    setSelectedIds(nextTask.recommended);
  };

  const toggleFoundation = (id: FoundationId) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const reset = () => chooseTask(challenges[0].id);
  const selectedNames = selectedFoundations.map((item) => item.en).join(', ');
  const selectedNamesAr = selectedFoundations.map((item) => item.ar).join('، ');

  return (
    <section data-testid="ai-foundations" className={baseCard} aria-labelledby="ai-foundations-title">
      <LabHeader
        icon={<Compass aria-hidden="true" className="h-5 w-5" />}
        title="The Foundations Behind AI"
        titleId="ai-foundations-title"
        subtitle="اختار مهمة وتخصصات مساندة، وشوف كل مجال بيساهم فين في خط سير المساعد."
      />

      <LabWorkbench title="AI · contributing disciplines" motionKey={selectedIds.join('-')}
 nodes={[
 ...foundations.map<WorkbenchNode>((foundation,index)=>({id:foundation.id,label:foundation.en,sceneLabel:['Phi','Math','Neuro','Psych','Econ','Eng','Ctrl','Lang'][index],labelOnSelect:true,kind:'chip',position:[(index%4-1.5)*2,0,index<4?-2:2],tone:selectedIds.includes(foundation.id)?'active':'neutral',detail:foundation.contributions[taskId].en,detailAr:foundation.contributions[taskId].ar,action:()=>toggleFoundation(foundation.id),actionLabel:selectedIds.includes(foundation.id)?'Remove module':'Add module'})),
 {id:'assistant',label:'AI assistant',kind:'server',position:[0,0,0],tone:'info',detail:task.description.en,detailAr:task.description.ar}
 ]}
 links={foundations.map<WorkbenchLink>(foundation=>({id:foundation.id,from:foundation.id,to:'assistant',tone:selectedIds.includes(foundation.id)?'active':'neutral',moving:selectedIds.includes(foundation.id)}))}>
<figure className="mt-5 rounded-2xl border border-beige-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-stone-950 p-4">
        <svg viewBox="0 0 600 260" className="w-full text-stone-600 dark:text-zinc-400" role="img" aria-label="Eight contributing disciplines connect to an AI system; selected disciplines light up their connections">
          {foundations.map((foundation, index) => {
            const x = 75 + (index % 4) * 150;
            const y = index < 4 ? 42 : 218;
            const active = selectedIds.includes(foundation.id);
            return <g key={foundation.id}>
              <path d={`M${x} ${y} L300 130`} stroke={active ? '#b45309' : 'currentColor'} opacity={active ? 0.65 : 0.1} strokeWidth={active ? 3 : 1} className="transition-all duration-300" />
              <circle cx={x} cy={y} r="25" fill={active ? '#b45309' : 'currentColor'} opacity={active ? 0.85 : 0.12} />
              <text x={x} y={y + 8} textAnchor="middle" fill={active ? 'white' : 'currentColor'} fontSize="24">{['Phi', 'Math', 'Neuro', 'Psych', 'Econ', 'Eng', 'Ctrl', 'Lang'][index]}</text>
            </g>;
          })}
          <rect x="235" y="98" width="130" height="64" rx="20" fill="currentColor" />
          <text x="300" y="140" textAnchor="middle" fill="white" fontSize="32" className="dark:fill-stone-950">AI</text>
        </svg>
        <figcaption className="text-[13px] text-stone-600 dark:text-zinc-400">Toggle a discipline below to trace its contribution. This is a conceptual map, not a dependency checklist.</figcaption>
        <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400 mt-1">فعّل تخصص تحت وشوف مساهمته. دي خريطة مفاهيم، مش قائمة لازم كل نظام يحقّقها.</ArabicText>
      </figure>
</LabWorkbench>
      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <label htmlFor="ai-foundation-task" className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200">
            <ArabicText as="span" className="text-inherit">اختار تحدّي المساعد (Choose an assistant challenge)</ArabicText>
          </label>
          <select
            id="ai-foundation-task"
            className={`${controlClass} w-full ${focusRing}`}
            value={taskId}
            onChange={(event) => chooseTask(event.target.value as TaskId)}
          >
            {challenges.map((item) => <option key={item.id} value={item.id}>{item.en} — {item.ar}</option>)}
          </select>
          <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{task.description.en}</p>
          <ArabicText className="mt-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{task.description.ar}</ArabicText>
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="font-semibold">Starting modules are suggestions, not a score.</p>
            <ArabicText className="mt-1">التخصصات المختارة بدايةً اقتراحات للتعلم، مش درجات أداء.</ArabicText>
            <p className="mt-2 text-xs">Changing the challenge loads its suggested modules; you can toggle any discipline below.</p>
            <ArabicText className="mt-1 text-xs">تغيير التحدّي بيحمّل تخصصاته المقترحة؛ وتقدر تغيّر أي اختيار من البطاقات.</ArabicText>
          </div>
        </div>

        <div className="rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100">Choose foundation modules</h3>
              <ArabicText className="text-sm font-semibold text-stone-700 dark:text-stone-300">اختار التخصصات المؤسسة</ArabicText>
            </div>
            <button
              type="button"
              onClick={reset}
              className={`inline-flex items-center gap-2 rounded-xl border border-beige-400 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-[#FAF7F2] dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 ${focusRing}`}
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              <ArabicText as="span" className="text-inherit">إعادة (Reset)</ArabicText>
            </button>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {foundations.map((foundation) => {
              const active = selectedIds.includes(foundation.id);
              return (
                <button
                  key={foundation.id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${active ? 'Remove' : 'Add'} ${foundation.en} module`}
                  onClick={() => toggleFoundation(foundation.id)}
                  className={`min-w-0 rounded-xl border p-3 text-left transition-colors ${focusRing} ${active ? 'border-amber-400 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30' : 'border-beige-300 bg-white hover:border-amber-400 hover:bg-[#FAF7F2] dark:border-stone-700 dark:bg-stone-900 dark:hover:border-amber-800 dark:hover:bg-stone-800'}`}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-stone-900 dark:text-stone-100">{foundation.en}</span>
                      <ArabicText className="text-sm text-stone-700 dark:text-stone-300">{foundation.ar}</ArabicText>
                    </span>
                    {active && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-800 dark:text-amber-300" />}
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-stone-600 dark:text-zinc-400">{foundation.contributions[taskId].en}</span>
                  <ArabicText className="mt-1 text-xs leading-relaxed text-stone-600 dark:text-zinc-400">{foundation.contributions[taskId].ar}</ArabicText>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-4 rounded-xl border border-beige-300 bg-[#FAF7F2] px-4 py-3 text-sm text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
      >
        {selectedFoundations.length > 0 ? (
          <>
            <p><span className="font-semibold">Selected modules:</span> {selectedNames}</p>
            <ArabicText className="mt-1"><span className="font-semibold">التخصصات المختارة:</span> {selectedNamesAr}</ArabicText>
          </>
        ) : (
          <Copy en="No modules are selected; choose a foundation to highlight its contributions in the pipeline." ar="مفيش تخصصات مختارة؛ اختار مجال عشان تبرز مساهمته في خط سير المهمة." />
        )}
      </div>

      <div className="mt-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100">Assistant pipeline</h3>
            <ArabicText className="text-sm text-stone-700 dark:text-stone-300">مراحل تنفيذ المهمة</ArabicText>
          </div>
          <p className="text-xs text-stone-500 dark:text-zinc-400">Highlighted stages match selected disciplines</p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {task.stages.map((stage, index) => {
            const matches = foundations.filter((foundation) => selectedIds.includes(foundation.id) && stage.disciplines.includes(foundation.id));
            const highlighted = matches.length > 0;
            return (
              <li
                key={stage.en}
                className={`rounded-2xl border p-4 ${highlighted ? 'border-amber-300 bg-amber-50/70 dark:border-amber-800 dark:bg-amber-950/20' : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-950'}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${highlighted ? 'bg-amber-200 text-amber-950 dark:bg-amber-900 dark:text-amber-200' : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'}`}>
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-stone-900 dark:text-stone-100">{stage.en}</h4>
                    <ArabicText className="text-sm text-stone-700 dark:text-stone-300">{stage.ar}</ArabicText>
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold text-stone-600 dark:text-zinc-400">Contributing selected disciplines</p>
                <ArabicText className="text-xs font-semibold text-stone-600 dark:text-zinc-400">التخصصات المختارة المساهمة</ArabicText>
                {matches.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {matches.map((foundation) => (
                      <span key={foundation.id} className="rounded-full border border-amber-300 bg-white px-2 py-1 text-xs text-amber-950 dark:border-amber-800 dark:bg-stone-900 dark:text-amber-200">
                        {foundation.en}
                      </span>
                    ))}
                  </div>
                ) : (
                  <Copy
                    en="No selected module is mapped to this stage."
                    ar="مفيش تخصص مختار مرتبط بالمرحلة دي."
                    className="mt-2 text-xs text-stone-500 dark:text-zinc-400"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 rounded-xl border border-beige-300 bg-white px-4 py-3 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-950 dark:text-zinc-400">
        Teaching illustration, not a live AI system or measured performance.
        <ArabicText className="mt-1">ده توضيح تعليمي، مش نظام ذكاء اصطناعي شغال ولا قياس للأداء.</ArabicText>
      </div>
    </section>
  );
}

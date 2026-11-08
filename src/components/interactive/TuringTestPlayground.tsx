import React, { useState } from 'react';
import { Bot, User, Brain, MessageSquare, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type Terminal = 'A' | 'B';
type CapabilityId = 'nlp' | 'kr' | 'reasoning' | 'ml' | 'vision' | 'robotics';

interface Capability {
  id: CapabilityId;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
}

// The first four cover the (text-only) Turing Test; vision and robotics are added by the Total Turing Test.
const CAPABILITIES: Capability[] = [
  {
    id: 'nlp',
    descEn: 'Interpret and produce human language to communicate.',
    ar: 'معالجة اللغات الطبيعية',
    en: 'Natural Language Processing',
    descAr: 'الـ NLP بتخلي الآلة تفهم لغة البشر وتتواصل بيها وتصيغ ردود واضحة.',
  },
  {
    id: 'kr',
    descEn: 'Store and organize what the system knows or hears.',
    ar: 'تمثيل المعرفة',
    en: 'Knowledge Representation',
    descAr: 'بتخزّن بيها الآلة اللي تعرفه أو تسمعه بشكل منظم ومترابط.',
  },
  {
    id: 'reasoning',
    descEn: 'Use stored knowledge to answer questions and infer new conclusions.',
    ar: 'الاستدلال الآلي',
    en: 'Automated Reasoning',
    descAr: 'بتستخدم المعلومات المخزنة عشان تجاوب على الأسئلة وتستنتج نتايج جديدة.',
  },
  {
    id: 'ml',
    descEn: 'Learn patterns from experience and adapt to new situations.',
    ar: 'التعلم الآلي',
    en: 'Machine Learning',
    descAr: 'الـ ML بتخلي الآلة تتكيف مع المواقف الجديدة وتكتشف الأنماط وتتعلم من التجربة.',
  },
  {
    id: 'vision',
    descEn: 'Perceive objects and images in the physical world. Slide 17 also includes speech recognition as a perception capability.',
    ar: 'الرؤية الحاسوبية',
    en: 'Computer Vision',
    descAr: 'بتخلي الآلة تدرك الأجسام والصور في العالم الحقيقي. سلايد 17 بيضيف كمان الـ Speech Recognition كقدرة على الإدراك.',
  },
  {
    id: 'robotics',
    descEn: 'Manipulate objects and move through the physical world.',
    ar: 'الروبوتات',
    en: 'Robotics',
    descAr: 'بتخلي الآلة تحرك الأجسام وتتعامل معاها وتتنقل في العالم المادي.',
  },
];

interface Scenario {
  id: string;
  prompt: string;
  promptAr: string;
  humanAnswer: string;
  aiAnswer: string;
  disciplines: CapabilityId[];
  explanation: string;
  explanationAr: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    prompt: 'Do you prefer a cup of black coffee or sweet tea early in the morning? Why?',
    promptAr: 'تفضّل القهوة السادة ولا الشاي بالسكر الصبح بدري؟ وليه؟',
    humanAnswer:
      'Definitely black coffee! I love the strong, bitter roast. Tea without sugar makes no sense to me, but sugar that early in the morning gives me an energy crash.',
    aiAnswer:
      'Black coffee contains more caffeine (approx. 95 mg per cup) and chlorogenic acids, which promote alertness without the glycemic spikes caused by refined sugar.',
    disciplines: ['nlp', 'kr'],
    explanation:
      'The human speaks from sensory experience, habit and emotion. The AI recites biochemical facts and analysis, with no personal taste.',
    explanationAr:
      'الإنسان بيتكلم من تجربته الحسية وعاداته ومشاعره، أما الـ AI فبيسرد حقائق كيميائية وتحليلات من غير ذوق شخصي.',
  },
  {
    id: 's2',
    prompt:
      'If all humans are mortal and Socrates is human, what can we deduce? What is your personal opinion of Socrates?',
    promptAr: 'لو كل البشر فانيين وسقراط إنسان، نستنتج إيه؟ وإيه رأيك الشخصي في سقراط؟',
    humanAnswer:
      'Socrates is mortal, obviously. Personally, I admire his courage in questioning authority, even though it literally cost him his life. Truly inspiring.',
    aiAnswer:
      'Deduction: Socrates is mortal (classic Aristotelian syllogism: all A are B, C is A, therefore C is B). Historically, Socrates (470–399 BC) is credited with founding the Socratic method of dialogue.',
    disciplines: ['reasoning', 'kr'],
    explanation:
      'The AI formalizes the deduction as a classic syllogism ("Laws of Thought") and recalls stored historical facts, but sidesteps the personal opinion the question asked for. The human answers the logic in one clause, then gives a heartfelt opinion.',
    explanationAr:
      'الـ AI صاغ الاستنتاج في شكل قياس منطقي (Syllogism) كلاسيكي واستدعى معلومات تاريخية متخزنة، لكنه تجاهل الرأي الشخصي المطلوب. الإنسان جاوب على المنطق في جملة واحدة وبعدها قال رأيه بإحساس.',
  },
  {
    id: 's3',
    prompt: 'If you accidentally touch a red-hot iron plate, what happens next?',
    promptAr: 'لو لمست بالغلط سطح حديد ساخن لدرجة الاحمرار، إيه اللي هيحصل بعدها؟',
    humanAnswer:
      'My hand snaps back before my brain even realizes what happened! Then comes the screaming and running to the cold water tap.',
    aiAnswer:
      'A spinal reflex arc bypasses conscious deliberation, triggering an immediate flexor muscle contraction that withdraws the hand within milliseconds and limits tissue damage.',
    disciplines: ['nlp', 'kr'],
    explanation:
      'The human describes the experience in first person, with emotion and a small story; the AI gives a textbook account of the reflex arc. It also shows why AI studies "acting rationally", not just logical reasoning: a reflex protects the hand faster than slow deliberation could.',
    explanationAr:
      'الإنسان بيوصف التجربة بصيغة المتكلم وبإحساس وفيها حكاية صغيرة، أما الـ AI فبيشرح الـ Reflex Arc زي الكتاب. والمثال كمان بيوضح ليه الـ AI بيركز على التصرف العقلاني (Acting Rationally) مش الاستدلال المنطقي بس: رد الفعل السريع بيحمي اليد قبل ما التفكير البطيء يلحق.',
  },
];

const pillClass = (active: boolean) =>
  `px-3 py-1.5 rounded-xl text-sm font-arabic transition-all ${
    active
      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
      : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
  }`;

export const TuringTestPlayground: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [userGuess, setUserGuess] = useState<Terminal | null>(null);
  const [testMode, setTestMode] = useState<'text' | 'total'>('text');
  const [isSwapped, setIsSwapped] = useState<boolean>(() => Math.random() > 0.5);

  const handleSelectScenario = (sc: Scenario) => {
    setSelectedScenario(sc);
    setUserGuess(null);
    setIsSwapped(Math.random() > 0.5);
  };

  const answers: Record<Terminal, string> = {
    A: isSwapped ? selectedScenario.aiAnswer : selectedScenario.humanAnswer,
    B: isSwapped ? selectedScenario.humanAnswer : selectedScenario.aiAnswer,
  };
  const humanTerminal: Terminal = isSwapped ? 'B' : 'A';
  const revealed = userGuess !== null;
  const isCorrect = userGuess === humanTerminal;

  return (
    <div data-testid="turing-test" className="min-w-0 bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Brain className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Turing Test Simulator (Imitation Game)
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                أنت دلوقتي المحقق (Interrogator)! اقرأ السؤال وردود الطرفين، وخمّن مين الإنسان (Human) ومين الآلة (Machine)
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Question Selector */}
        <div className="self-start sm:self-auto bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl flex flex-wrap items-center gap-1 font-bold border border-beige-300 dark:border-stone-700">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              dir="rtl"
              aria-pressed={selectedScenario.id === sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={pillClass(selectedScenario.id === sc.id)}
            >
              {`السؤال ${idx + 1}`}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 p-4 space-y-2">
        <ArabicText className="text-sm text-stone-700 dark:text-zinc-300">دي ردود مكتوبة مسبقًا للتوضيح، مش محادثة مع إنسان أو نموذج حي. الأسلوب العاطفي أو الرسمي لوحده مش دليل على الهوية، وجولة واحدة مش إثبات لاجتياز اختبار تورنج.</ArabicText>
        <p className="text-sm text-stone-700 dark:text-zinc-300">These are scripted teaching examples, not a live human–AI conversation. Emotional or formal wording alone cannot identify a speaker, and one guess cannot establish a Turing Test pass.</p>
      </div>
      {/* Interrogation Terminal */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl p-4 sm:p-6 border border-beige-300 dark:border-stone-800 space-y-5">
        {/* Interrogator Prompt */}
        <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-beige-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
            <MessageSquare className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <ArabicText as="span" className="text-sm font-bold text-stone-800 dark:text-stone-200">
              سؤال المحقق (Interrogator Question)
            </ArabicText>
          </div>
          <p dir="ltr" className="text-sm font-medium text-stone-900 dark:text-stone-100 font-sans">
            “{selectedScenario.prompt}”
          </p>
          <ArabicText className="text-sm text-stone-700 dark:text-zinc-400 pt-2 border-t border-beige-200 dark:border-stone-800">
            {selectedScenario.promptAr}
          </ArabicText>
        </div>

        {/* Two Terminals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['A', 'B'] as const).map((t) => {
            const isHuman = t === humanTerminal;
            const guessed = userGuess === t;
            return (
              <div
                key={t}
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 transition-all ${
                  guessed
                    ? isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-700 ring-2 ring-emerald-200 dark:ring-emerald-900/60'
                      : 'bg-rose-50 dark:bg-rose-950/20 border-rose-400 dark:border-rose-700 ring-2 ring-rose-200 dark:ring-rose-900/60'
                    : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <ArabicText as="span" className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    {`الطرف ${t} (Terminal ${t})`}
                  </ArabicText>
                  {revealed ? (
                    <ArabicText
                      as="span"
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        isHuman
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                          : 'bg-beige-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200'
                      }`}
                    >
                      {isHuman ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      {isHuman ? 'إنسان (Human)' : 'آلة (Machine)'}
                    </ArabicText>
                  ) : (
                    <button
                      dir="rtl"
                      onClick={() => setUserGuess(t)}
                      className="px-3.5 py-1.5 rounded-lg text-sm font-arabic font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-all shadow-sm"
                    >
                      ده الإنسان 👤
                    </button>
                  )}
                </div>
                <p
                  dir="ltr"
                  className="p-3.5 bg-[#FAF7F2] dark:bg-stone-950 border border-beige-200 dark:border-stone-800 rounded-xl text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans"
                >
                  “{answers[t]}”
                </p>
                {guessed && (
                  <ArabicText
                    as="div"
                    className={`text-xs font-bold ${
                      isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {isCorrect ? '✓ ده كان تخمينك، وطلع صح' : '✗ ده كان تخمينك، وطلع غلط'}
                  </ArabicText>
                )}
              </div>
            );
          })}
        </div>

        {/* Result Explanation */}
        {revealed && (
          <div
            role="status"
            className={`p-4 sm:p-5 rounded-2xl border space-y-3 text-sm ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/25 dark:border-emerald-800/60'
                : 'bg-rose-50 border-rose-300 dark:bg-rose-950/25 dark:border-rose-800/60'
            }`}
          >
            <div
              className={`flex flex-wrap items-center justify-between gap-2 pb-2 border-b ${
                isCorrect
                  ? 'border-emerald-200 dark:border-emerald-900/60'
                  : 'border-rose-200 dark:border-rose-900/60'
              }`}
            >
              <ArabicText
                as="span"
                className={`font-bold ${
                  isCorrect ? 'text-emerald-900 dark:text-emerald-200' : 'text-rose-900 dark:text-rose-200'
                }`}
              >
                {isCorrect
                  ? '🎯 تخمينك صح! عرفت مين الإنسان'
                  : 'الرد المكتوب لخبطك؛ ده مش إثبات إن آلة اجتازت الاختبار.'}
              </ArabicText>
              <button
                dir="rtl"
                onClick={() => handleSelectScenario(selectedScenario)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-arabic font-bold bg-white dark:bg-stone-900 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700 hover:bg-beige-100 dark:hover:bg-stone-800 shadow-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                جرّب تاني
              </button>
            </div>
            <p dir="ltr" className="text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
              {selectedScenario.explanation}
            </p>
            <div className="pt-2 border-t border-beige-200 dark:border-stone-800">
              <ArabicText className="text-stone-800 dark:text-stone-200">{selectedScenario.explanationAr}</ArabicText>
            </div>
          </div>
        )}
      </div>

      {/* The 6 Capabilities */}
      <div className="space-y-3 pt-2">
        <div className="space-y-1">
          <ArabicText as="h4" className="text-sm font-bold text-stone-900 dark:text-stone-100">
            {`${CAPABILITIES.length} قدرات في نموذج الاختبار (Test capabilities)`}
          </ArabicText>
          <ArabicText className="text-sm text-stone-700 dark:text-zinc-400">
            أول 4 مهارات للـ Turing Test العادي (محادثة مكتوبة)، وآخر اتنين (Computer Vision وRobotics) بيضيفهم الـ Total Turing Test.
          </ArabicText>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Turing test mode">
          {(['text', 'total'] as const).map(mode => (
            <button key={mode} aria-pressed={testMode === mode} onClick={() => setTestMode(mode)} className={pillClass(testMode === mode)}>
              <ArabicText as="span" className="text-inherit">{mode === 'text' ? 'محادثة مكتوبة (Text test)' : 'تفاعل مع العالم (Total test)'}</ArabicText>
            </button>
          ))}
        </div>
        <div aria-live="polite" className="space-y-1">
          <ArabicText className="text-sm font-semibold text-stone-900 dark:text-stone-100">{testMode === 'text' ? 'راقب أول 4 قدرات: اختبار محادثة مكتوبة ما بيختبرش حركة الروبوت أو الرؤية مباشرة.' : 'بنضيف الرؤية والروبوتات: وصف مسك الكوباية بالكلام مش زي إدراكها ومسكها فعلًا.'}</ArabicText>
          <p className="text-sm text-stone-700 dark:text-zinc-300">{testMode === 'text' ? 'The text test uses the first four capabilities; it does not directly test vision or physical action.' : 'The Total test adds vision and robotics: describing a cup is different from perceiving and grasping it.'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-sm">
          {CAPABILITIES.map((cap, idx) => {
            const highlighted = (testMode === 'total' || idx < 4);
            const usedInExample = revealed && selectedScenario.disciplines.includes(cap.id);
            return (
              <div
                key={cap.id}
                className={`p-4 rounded-xl border space-y-1.5 transition-colors ${
                  highlighted
                    ? 'bg-amber-50 dark:bg-amber-950/25 border-amber-300 dark:border-amber-700/60'
                    : 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 shrink-0 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <ArabicText as="div" className="font-bold text-stone-900 dark:text-stone-100">
                    {`${cap.ar} (${cap.en})`}
                  </ArabicText>
                </div>
                <ArabicText className="text-sm text-stone-700 dark:text-zinc-400">{cap.descAr}</ArabicText>
                <p className="text-sm text-stone-700 dark:text-zinc-400">{cap.descEn}</p>
                {usedInExample && (
                  <ArabicText as="div" className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    ⭐ ظاهرة في السؤال ده
                  </ArabicText>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TuringTestPlayground;

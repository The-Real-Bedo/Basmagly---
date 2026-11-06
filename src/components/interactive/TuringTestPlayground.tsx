import React, { useState } from 'react';
import { Bot, User, Brain, MessageSquare } from 'lucide-react';
import { ArabicText } from '../ArabicText';

interface Scenario {
  id: string;
  prompt: string;
  promptAr: string;
  humanAnswer: string;
  aiAnswer: string;
  disciplines: string[];
  explanation: string;
  explanationAr: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    prompt: 'Do you prefer having a cup of black coffee or sweet tea in the early morning? Why?',
    promptAr: 'هل تفضل شرب القهوة السادة أم الشاي المحلى في الصباح الباكر؟ ولماذا؟',
    humanAnswer: 'Definitely black coffee! I love the strong bitter roast, and honestly tea without sugar makes no sense to me, but sugar that early gives me an energy crash.',
    aiAnswer: 'Black coffee contains higher caffeine concentrations (approx. 95mg per cup) and chlorogenic acids, promoting alertness without glycemic index spikes caused by refined sugars.',
    disciplines: ['Natural Language Processing (NLP)', 'Knowledge Representation'],
    explanation: 'The human responder expresses sensory preferences, habit, and emotion. The AI responds with biochemical composition and analytical facts.',
    explanationAr: 'الإنسان يتحدث من واقع تجربة حسية ومشاعر يومية، بينما الذكاء الاصطناعي يستدعي حقائق علمية وتفسيرات تحليلية ما لم يُطلب منه محاكاة المشاعر.'
  },
  {
    id: 's2',
    prompt: 'If all humans are mortal, and Socrates is human, what can we deduce? What is your personal opinion on Socrates?',
    promptAr: 'إذا كان كل البشر فانون، وسقراط إنسان، فما هي النتيجة؟ وما هو رأيك الشخصي في سقراط؟',
    humanAnswer: 'Socrates is mortal, obviously. Personally, I admire his courage to question authority even when it literally cost him his life. Truly inspiring.',
    aiAnswer: 'Deduction: Socrates is mortal (Classic Aristotelian syllogism: All A are B, C is A, therefore C is B). Historically, Socrates (470-399 BC) established the Socratic dialogue method.',
    disciplines: ['Automated Reasoning', 'Knowledge Representation'],
    explanation: 'Classic deductive inference demonstrating the "Laws of Thought" approach coupled with historical database recall.',
    explanationAr: 'تطبيق مباشر للاستدلال المنطقي الصارم (Laws of Thought) واستدعاء المعرفة التاريخية المخزنة.'
  },
  {
    id: 's3',
    prompt: 'If you accidentally touch a red-hot iron plate, what happens next?',
    promptAr: 'لو لمست موقد حديدي ملتهب بالخطأ، ماذا سيحدث فوراً؟',
    humanAnswer: 'My hand snaps back before my brain even realizes what happened! Then comes the screaming and running to the cold water tap.',
    aiAnswer: 'A spinal reflex arc bypasses conscious brain deliberation, causing immediate biceps contraction to withdraw the hand within milliseconds, preventing deeper tissue burn.',
    disciplines: ['Robotics (Reflexive Actuation)', 'Machine Learning (Reinforcement from feedback)'],
    explanation: 'Illustrates why modern AI focuses on "Rational Agents" rather than pure logical thinking: immediate reflexes preserve life without waiting for slow reasoning.',
    explanationAr: 'يوضح لماذا نركز على "الوكيل العقلاني"؛ فالانعكاس السريع يحمي اليد في جزء من الثانية دون إضاعة الوقت في التفكير البطيء.'
  }
];

export const TuringTestPlayground: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [userGuess, setUserGuess] = useState<'A' | 'B' | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);

  const handleSelectScenario = (sc: Scenario) => {
    setSelectedScenario(sc);
    setUserGuess(null);
    setShowResult(false);
    setIsSwapped(Math.random() > 0.5);
  };

  const terminalA = isSwapped ? selectedScenario.aiAnswer : selectedScenario.humanAnswer;
  const terminalB = isSwapped ? selectedScenario.humanAnswer : selectedScenario.aiAnswer;
  const correctHuman = isSwapped ? 'B' : 'A';

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            <Brain className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Alan Turing Imitation Game (Turing Test Simulator)
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
              أنت الآن المحقق البشري! اقرأ السؤال وإجابات الطرفين وخمن مين الإنسان ومين برنامج الذكاء الاصطناعي
            </ArabicText>
          </div>
        </div>

        {/* Question Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-beige-100 dark:bg-stone-800 p-1.5 rounded-2xl border border-beige-200 dark:border-stone-700">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${
                selectedScenario.id === sc.id
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-700'
                  : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Test Case #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Interrogation Terminal */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 rounded-2xl p-6 border border-beige-300 dark:border-stone-800 space-y-5">
        {/* Interrogator Prompt */}
        <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-beige-300 dark:border-stone-800 space-y-1.5">
          <div className="flex items-center gap-2 text-stone-800 dark:text-zinc-200 text-sm font-bold">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span>Interrogator Question (سؤال المحقق):</span>
          </div>
          <p className="text-sm font-medium text-stone-900 dark:text-stone-100 font-sans">
            "{selectedScenario.prompt}"
          </p>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 pt-1 border-t border-beige-200 dark:border-stone-800">
            {selectedScenario.promptAr}
          </ArabicText>
        </div>

        {/* Two Terminals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Terminal A */}
          <div className={`p-5 rounded-2xl border space-y-3.5 transition-all ${
            userGuess === 'A'
              ? 'bg-beige-100 dark:bg-stone-800 border-stone-800 dark:border-stone-600 ring-2 ring-stone-400'
              : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono font-bold text-stone-700 dark:text-zinc-300">Terminal A Response:</span>
              <button
                onClick={() => {
                  setUserGuess('A');
                  setShowResult(true);
                }}
                disabled={showResult}
                className="px-3.5 py-1.5 rounded-lg text-sm font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 disabled:opacity-40 transition-all shadow-2xs"
              >
                Guess Human 👤
              </button>
            </div>
            <div className="p-3.5 bg-[#FAF8F5] dark:bg-stone-950 rounded-xl text-sm text-stone-800 dark:text-zinc-200 leading-relaxed font-medium">
              "{terminalA}"
            </div>
            {showResult && (
              <div className="text-sm font-bold pt-1">
                {correctHuman === 'A' ? (
                  <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Verified Human Responder
                  </span>
                ) : (
                  <span className="text-stone-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Bot className="w-4 h-4" /> AI Program Responder
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Terminal B */}
          <div className={`p-5 rounded-2xl border space-y-3.5 transition-all ${
            userGuess === 'B'
              ? 'bg-beige-100 dark:bg-stone-800 border-stone-800 dark:border-stone-600 ring-2 ring-stone-400'
              : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono font-bold text-stone-700 dark:text-zinc-300">Terminal B Response:</span>
              <button
                onClick={() => {
                  setUserGuess('B');
                  setShowResult(true);
                }}
                disabled={showResult}
                className="px-3.5 py-1.5 rounded-lg text-sm font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 disabled:opacity-40 transition-all shadow-2xs"
              >
                Guess Human 👤
              </button>
            </div>
            <div className="p-3.5 bg-[#FAF8F5] dark:bg-stone-950 rounded-xl text-sm text-stone-800 dark:text-zinc-200 leading-relaxed font-medium">
              "{terminalB}"
            </div>
            {showResult && (
              <div className="text-sm font-bold pt-1">
                {correctHuman === 'B' ? (
                  <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Verified Human Responder
                  </span>
                ) : (
                  <span className="text-stone-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Bot className="w-4 h-4" /> AI Program Responder
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Result Explanation */}
        {showResult && (
          <div className="p-5 rounded-2xl bg-stone-900 text-stone-100 space-y-2.5 text-sm border border-stone-800">
            <div className="flex justify-between items-center text-amber-400 font-bold border-b border-stone-800 pb-2">
              <span className="font-mono">Scientific Evaluation:</span>
              <span>{userGuess === correctHuman ? 'Correctly Identified!' : 'AI Successfully Deceived Interrogator'}</span>
            </div>
            <p className="text-zinc-200 leading-relaxed">{selectedScenario.explanation}</p>
            <div className="pt-2 border-t border-stone-800">
              <ArabicText className="text-zinc-300 leading-[1.75]">
                <strong>الشرح: </strong> {selectedScenario.explanationAr}
              </ArabicText>
            </div>
          </div>
        )}
      </div>

      {/* The 6 Disciplines Table */}
      <div className="space-y-3 pt-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-stone-700 dark:text-zinc-300 font-mono">
          The 6 Capabilities Required to Pass the Total Turing Test:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-sm">
          {[
            { en: '1. Natural Language Processing (NLP)', ar: 'معالجة اللغات الطبيعية للتواصل وفهم النصوص وصياغة إجابات واضحة.' },
            { en: '2. Knowledge Representation', ar: 'تمثيل المعرفة لتخزين المعلومات والحقائق بطريقة مترابطة ومنظمة.' },
            { en: '3. Automated Reasoning', ar: 'الاستدلال الآلي لاستنتاج نتائج جديدة والإجابة عن الأسئلة المنطقية.' },
            { en: '4. Machine Learning (ML)', ar: 'التعلم الآلي للتكيف مع التغييرات واكتشاف الأنماط والتصحيح الذاتي.' },
            { en: '5. Computer Vision (CV)', ar: 'الرؤية الحاسوبية لإدراك الكائنات والصور في العالم الفيزيائي.' },
            { en: '6. Robotics', ar: 'الروبوتات لتحريك ومناولة الأجسام المادية في العالم الحقيقي.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-200 dark:border-stone-800 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{item.en}</span>
              <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300 leading-relaxed">{item.ar}</ArabicText>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TuringTestPlayground;

import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, RotateCcw, Eye, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ArabicText } from './ArabicText';

interface QuizSystemProps {
  questions: Question[];
  lectureTitle: string;
}

export const QuizSystem: React.FC<QuizSystemProps> = ({ questions, lectureTitle }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: any }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [qId: string]: boolean }>({});
  const [revealedEssay, setRevealedEssay] = useState<{ [qId: string]: boolean }>({});
  const [filterType, setFilterType] = useState<'all' | 'mcq' | 'true_false' | 'essay'>('all');

  const filteredQuestions = questions.filter(q => filterType === 'all' || q.type === filterType);
  const objectiveQuestions = questions.filter(q => q.type !== 'essay');

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (submittedAnswers[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSelectBoolean = (qId: string, val: boolean) => {
    if (submittedAnswers[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleTextChange = (qId: string, text: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: text }));
  };

  const handleSubmitAnswer = (qId: string) => {
    setSubmittedAnswers(prev => ({ ...prev, [qId]: true }));

    // Essays are not scored; celebrate only a fully correct objective attempt.
    const answeredCount = Object.keys(submittedAnswers).length + 1;
    const allCorrect = objectiveQuestions.every(question =>
      question.id === qId
        ? selectedAnswers[question.id] === question.correctAnswer
        : submittedAnswers[question.id] && selectedAnswers[question.id] === question.correctAnswer
    );
    if (objectiveQuestions.length > 0 && answeredCount >= objectiveQuestions.length && allCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setRevealedEssay({});
  };

  const correctCount = objectiveQuestions.reduce((acc, q) => {
    if (!submittedAnswers[q.id]) return acc;
    if (selectedAnswers[q.id] === q.correctAnswer) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="min-w-0 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-4 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-stone-600 dark:text-zinc-400 block">
            Practice Assessment System
          </span>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Practice: {lectureTitle}</h3>
          <ArabicText className="text-sm font-semibold text-stone-700 dark:text-zinc-300">اختبر نفسك في: {lectureTitle}</ArabicText>
          <p className="text-sm text-stone-600 dark:text-zinc-400">Multiple-choice, true/false, and essay questions for practice.</p>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">أسئلة اختيار من متعدد وصح أو خطأ ومقالية للتدريب.</ArabicText>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#FAF7F2] dark:bg-stone-950 px-4 py-2.5 rounded-2xl border border-beige-300 dark:border-stone-800 text-center">
            <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-medium text-center">Current score</span>
            <ArabicText as="span" className="text-[13px] text-stone-600 dark:text-zinc-400 block font-medium text-center">النتيجة الحالية</ArabicText>
            <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
              {correctCount} / {objectiveQuestions.length}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-beige-100 dark:bg-stone-800 hover:bg-beige-200 dark:hover:bg-stone-700 text-stone-800 dark:text-zinc-200 text-sm font-bold transition-all border border-beige-300 dark:border-stone-700 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset quiz</span>
            <ArabicText as="span" className="text-[13px] text-current">(إعادة الاختبار)</ArabicText>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-stone-600 dark:text-zinc-400 font-semibold px-1">Filter:</span>
        {[
          { id: 'all', label: `All questions (${questions.length})`, labelAr: 'كل الأسئلة' },
          { id: 'mcq', label: `Multiple choice (${questions.filter(q => q.type === 'mcq').length})`, labelAr: 'اختيار من متعدد' },
          { id: 'true_false', label: `True / False (${questions.filter(q => q.type === 'true_false').length})`, labelAr: 'صح أو خطأ' },
          { id: 'essay', label: `Essay (${questions.filter(q => q.type === 'essay').length})`, labelAr: 'مقالي' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex flex-wrap items-center gap-1.5 ${
              filterType === tab.id
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-zinc-300 hover:bg-beige-50 dark:hover:bg-stone-800 border border-beige-300 dark:border-stone-800'
            }`}
          >
            <span>{tab.label}</span>
            <ArabicText as="span" className={`text-[13px] ${filterType === tab.id ? 'text-current' : 'text-stone-600 dark:text-zinc-400'}`}>
              ({tab.labelAr})
            </ArabicText>
          </button>
        ))}
      </div>

      {/* Questions Stack */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isSubmitted = submittedAnswers[q.id];
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;
          const isRevealed = revealedEssay[q.id];

          return (
            <div
              key={q.id}
              className={`min-w-0 p-4 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border transition-all space-y-4 ${
                isSubmitted && q.type !== 'essay'
                  ? isCorrect
                    ? 'border-emerald-500/70 bg-emerald-50/15 dark:bg-emerald-950/20'
                    : 'border-rose-400/70 bg-rose-50/15 dark:bg-rose-950/20'
                  : 'border-beige-300 dark:border-stone-800 shadow-sm'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-beige-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 flex items-center justify-center font-bold text-[13px] font-mono shadow-sm">
                    {idx + 1}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[13px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-stone-700 flex flex-wrap gap-1.5">
                    <span>{q.type === 'mcq' ? 'Multiple choice' : q.type === 'true_false' ? 'True / False' : 'Essay'}</span>
                    <ArabicText as="span" className="text-[13px] text-current">
                      ({q.type === 'mcq' ? 'اختيار من متعدد' : q.type === 'true_false' ? 'صح أو خطأ' : 'مقالي'})
                    </ArabicText>
                  </span>
                </div>

                {isSubmitted && q.type !== 'essay' && (
                  <div className={`text-sm font-bold flex flex-wrap items-center gap-x-1.5 ${
                    isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                  }`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Correct</span>
                        <ArabicText as="span" className="text-[13px] text-current">(إجابة صحيحة)</ArabicText>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 shrink-0" />
                        <span>Incorrect</span>
                        <ArabicText as="span" className="text-[13px] text-current">(إجابة غير صحيحة)</ArabicText>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Question Text */}
              <div className="space-y-1.5">
                <p className="text-base font-bold text-stone-900 dark:text-stone-100 leading-relaxed font-sans">
                  {q.question}
                </p>
                <span className="text-[13px] font-semibold text-stone-600 dark:text-zinc-400">Arabic translation</span>
                <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-300">{q.questionAr}</ArabicText>
              </div>

              {/* MCQ Options */}
              {q.type === 'mcq' && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrectOpt = q.correctAnswer === optIdx;
                    let style = 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-300 dark:border-stone-800 hover:bg-beige-100 dark:hover:bg-stone-800';

                    if (isSubmitted) {
                      if (isCorrectOpt) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                      } else if (isSelected && !isCorrectOpt) {
                        style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800 dark:text-rose-200 line-through';
                      }
                    } else if (isSelected) {
                      style = 'bg-beige-200 dark:bg-stone-800 border-stone-800 dark:border-stone-600 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={`p-3.5 rounded-xl border text-left text-sm transition-all flex flex-col justify-between gap-1.5 ${style}`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-sans font-medium">{opt}</span>
                          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </div>
                        {q.optionsAr?.[optIdx] && (
                          <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 text-right w-full">
                            {q.optionsAr[optIdx]}
                          </ArabicText>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* True/False Options */}
              {q.type === 'true_false' && (
                <div className="flex gap-3 pt-1">
                  {[
                    { label: 'True', labelAr: 'صح ✔️', val: true },
                    { label: 'False', labelAr: 'غلط ✖️', val: false },
                  ].map(opt => {
                    const isSelected = userAnswer === opt.val;
                    const isCorrectOpt = q.correctAnswer === opt.val;
                    let style = 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-300 dark:border-stone-800 hover:bg-beige-100 dark:hover:bg-stone-800';

                    if (isSubmitted) {
                      if (isCorrectOpt) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                      } else if (isSelected && !isCorrectOpt) {
                        style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800 dark:text-rose-200 line-through';
                      }
                    } else if (isSelected) {
                      style = 'bg-beige-200 dark:bg-stone-800 border-stone-800 dark:border-stone-600 font-bold';
                    }

                    return (
                      <button
                        key={String(opt.val)}
                        onClick={() => handleSelectBoolean(q.id, opt.val)}
                        disabled={isSubmitted}
                        className={`flex-1 py-3 px-4 rounded-xl border text-center text-sm font-bold transition-all flex items-center justify-center gap-2 ${style}`}
                      >
                        <span className="font-sans">{opt.label}</span>
                        <span className="font-arabic text-stone-600 dark:text-zinc-400">({opt.labelAr})</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Essay Questions */}
              {q.type === 'essay' && (
                <div className="space-y-3.5 pt-1">
                  <textarea
                    rows={3}
                    value={userAnswer || ''}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    placeholder="Write your answer here as you would in an exam..."
                    dir="auto"
                    className="w-full p-3.5 rounded-xl border border-beige-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-stone-950 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600 font-sans"
                  />
                  <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">اكتب إجابتك هنا كما لو كنت في الامتحان.</ArabicText>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <button
                      onClick={() => setRevealedEssay(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="flex flex-wrap items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-sm font-bold text-stone-800 dark:text-zinc-200 border border-stone-300 dark:border-stone-700 shadow-sm"
                    >
                      <Eye className="w-4 h-4 shrink-0" />
                      <span>{isRevealed ? 'Hide model answer' : 'Show model answer'}</span>
                      <ArabicText as="span" className="text-[13px] text-current">({isRevealed ? 'إخفاء الإجابة' : 'عرض الإجابة'})</ArabicText>
                    </button>
                    <span className="text-[13px] text-stone-600 dark:text-zinc-400">Self-assessment</span>
                  </div>

                  {isRevealed && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 border border-beige-300 dark:border-stone-700 space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold">
                        <Award className="w-4 h-4 shrink-0" />
                        <span>Model answer</span>
                        <ArabicText as="span" className="text-[13px] text-current">(الإجابة النموذجية)</ArabicText>
                      </div>
                      <p className="text-stone-800 dark:text-stone-200 whitespace-pre-line leading-relaxed font-sans">
                        {q.modelAnswer}
                      </p>
                      {q.modelAnswerAr && (
                        <div className="pt-3 border-t border-beige-300 dark:border-stone-700 space-y-1">
                          <span className="text-[13px] text-stone-600 dark:text-zinc-400">Arabic explanation</span>
                          <ArabicText className="text-stone-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed">{q.modelAnswerAr}</ArabicText>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button & Explanation */}
              {q.type !== 'essay' && (
                <div className="pt-2 border-t border-beige-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {!isSubmitted ? (
                    <button
                      onClick={() => handleSubmitAnswer(q.id)}
                      disabled={userAnswer === undefined}
                      className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-sm font-bold transition-all disabled:opacity-40 shadow-sm"
                    >
                      <span>Submit answer</span>
                      <ArabicText as="span" className="text-[13px] text-current">(تأكيد الإجابة)</ArabicText>
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-200 dark:border-stone-800 text-sm text-stone-800 dark:text-zinc-200 w-full space-y-2">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">Explanation</span>
                      {q.explanation && (
                        <p className="text-sm text-stone-700 dark:text-zinc-300 font-sans leading-relaxed">{q.explanation}</p>
                      )}
                      <span className="text-[13px] text-stone-600 dark:text-zinc-400 block pt-2 border-t border-beige-200 dark:border-stone-800">Arabic explanation</span>
                      <ArabicText className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">{q.explanationAr}</ArabicText>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizSystem;

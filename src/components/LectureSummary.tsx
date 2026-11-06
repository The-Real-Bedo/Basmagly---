import React, { useState } from 'react';
import { Lecture } from '../types';
import { BookOpen, Sparkles, BookA, Wrench, HelpCircle, ChevronLeft, Clock } from 'lucide-react';
import { ArabicText } from './ArabicText';
import { OsiTcpVisualizer } from './interactive/OsiTcpVisualizer';
import { SubnetCalculatorVisualizer } from './interactive/SubnetCalculatorVisualizer';
import { PacketJourneyLab } from './interactive/PacketJourneyLab';
import { TuringTestPlayground } from './interactive/TuringTestPlayground';
import { TopologyPlayground } from './interactive/TopologyPlayground';
import { TransmissionModesLab } from './interactive/TransmissionModesLab';
import { IotPipelineSimulator } from './interactive/IotPipelineSimulator';
import { NetworkDevicesCollisionLab } from './interactive/NetworkDevicesCollisionLab';
import { VacuumWorldAgentLab } from './interactive/VacuumWorldAgentLab';
import { EdgeVsCloudLab } from './interactive/EdgeVsCloudLab';
import { QuizSystem } from './QuizSystem';

interface LectureSummaryProps {
  lecture: Lecture;
  initialTab?: 'summary' | 'cheatSheet' | 'terms' | 'interactive' | 'quiz';
  onBackToCourse: () => void;
}

export const LectureSummary: React.FC<LectureSummaryProps> = ({ lecture, initialTab = 'summary', onBackToCourse }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'cheatSheet' | 'terms' | 'interactive' | 'quiz'>(initialTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <button
          onClick={onBackToCourse}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-700 hover:text-stone-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-arabic">الرجوع لقائمة المحاضرات</span>
          <span className="font-mono font-medium text-[13px] opacity-80">(Back to Course Outline)</span>
        </button>

        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-md text-[13px] font-mono font-bold bg-beige-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-beige-200 dark:border-stone-700">
              Lecture {lecture.lectureNumber}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-zinc-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {lecture.durationMinutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            {lecture.title}
          </h1>

          {/* Requirement 2 & 3: Arabic typography, RTL, secondary text contrast */}
          <ArabicText className="text-base font-semibold text-stone-700 dark:text-zinc-300">
            {lecture.titleAr}
          </ArabicText>

          <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {lecture.brief}
          </p>

          <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {lecture.briefAr}
          </ArabicText>
        </div>

        {/* Requirement 4: Lecture tabs wrap onto two rows cleanly with high-contrast active indicator */}
        <div className="flex flex-wrap items-center gap-2.5 border-t border-beige-200 dark:border-stone-800 pt-4">
          {[
            { id: 'summary', label: 'الشرح والملخص', labelEn: 'Summary', icon: BookOpen, count: lecture.sections.length },
            { id: 'interactive', label: 'المعامل والشغل العملي 🧪', labelEn: 'Labs', icon: Wrench, count: lecture.interactiveTools.length },
            { id: 'quiz', label: 'بنك الأسئلة والتدريب 📝', labelEn: 'Quiz', icon: HelpCircle, count: lecture.questions.length },
            { id: 'cheatSheet', label: 'زتونة الامتحان ⚡', labelEn: 'Cheat Sheet', icon: Sparkles, count: lecture.cheatSheet.length },
            { id: 'terms', label: 'المصطلحات ببساطة 📚', labelEn: 'Glossary', icon: BookA, count: lecture.terms.length },
          ].map(tab => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-stone-950 shadow-md ring-2 ring-amber-400/50 scale-[1.02]'
                    : 'bg-stone-100 dark:bg-stone-800/90 text-stone-800 dark:text-zinc-200 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700'
                }`}
              >
                <IconComp className="w-4 h-4 shrink-0" />
                <span className="font-arabic">{tab.label}</span>
                <span className="text-[13px] opacity-80 font-mono font-normal">({tab.labelEn})</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-md text-[13px] font-mono font-bold ${
                    isActive
                      ? 'bg-white/25 text-white dark:bg-stone-900/30 dark:text-stone-950'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-zinc-200'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-5">
          {lecture.sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4"
            >
              <div className="border-b border-beige-200 dark:border-stone-800 pb-3">
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {section.title}
                </h3>
                <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-300 pt-1">
                  {section.titleAr}
                </ArabicText>
              </div>

              {/* English Academic Content */}
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                {section.content}
              </p>

              {/* Simplified Explanation Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-2">
                <ArabicText as="span" className="text-sm font-bold text-stone-800 dark:text-zinc-200 block">
                  💡 الفكرة ببساطة:
                </ArabicText>
                <ArabicText className="text-sm font-medium text-stone-700 dark:text-zinc-300 leading-[1.75]">
                  {section.contentAr}
                </ArabicText>
              </div>

              {/* Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <div className="space-y-3 pt-1">
                  <span className="text-[13px] font-bold text-stone-600 dark:text-zinc-400 uppercase tracking-wider block font-mono">
                    Core Academic Highlights:
                  </span>
                  {section.bulletPoints.map((point, pIdx) => (
                    <div key={pIdx} className="space-y-1 text-sm bg-white dark:bg-stone-900/50 p-2 rounded-xl">
                      <div className="flex items-start gap-2.5 text-stone-800 dark:text-stone-200 font-medium font-sans">
                        <span className="w-2 h-2 rounded-full bg-stone-700 dark:bg-stone-300 shrink-0 mt-2" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                      {section.bulletPointsAr?.[pIdx] && (
                        <div className="pr-5">
                          <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 leading-[1.75]">
                            {section.bulletPointsAr[pIdx]}
                          </ArabicText>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Requirement 8: Key Exam Rule Callout (Gold Accent Preserved) */}
              {section.keyRule && (
                <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/60 text-sm space-y-2 shadow-sm">
                  <div className="flex items-start gap-2 text-amber-900 dark:text-amber-300 font-bold">
                    <span className="shrink-0">⭐</span>
                    <span className="font-mono shrink-0">High-Yield Rule:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 font-sans">{section.keyRule}</span>
                  </div>
                  {section.keyRuleAr && (
                    <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 font-medium pr-5">
                      <strong>خد بالك في الامتحان: </strong>
                      {section.keyRuleAr}
                    </ArabicText>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Interactive Labs */}
      {activeTab === 'interactive' && (
        <div className="space-y-6">
          {lecture.interactiveTools.includes('network-devices') && <NetworkDevicesCollisionLab />}
          {lecture.interactiveTools.includes('packet-journey') && <PacketJourneyLab />}
          {lecture.interactiveTools.includes('osi-visualizer') && <OsiTcpVisualizer />}
          {lecture.interactiveTools.includes('subnet-calculator') && <SubnetCalculatorVisualizer />}
          {lecture.interactiveTools.includes('transmission-lab') && <TransmissionModesLab />}
          {lecture.interactiveTools.includes('topology-simulator') && <TopologyPlayground />}
          {lecture.interactiveTools.includes('vacuum-world') && <VacuumWorldAgentLab />}
          {lecture.interactiveTools.includes('turing-test') && <TuringTestPlayground />}
          {lecture.interactiveTools.includes('edge-vs-cloud') && <EdgeVsCloudLab />}
          {lecture.interactiveTools.includes('iot-simulator') && <IotPipelineSimulator />}
        </div>
      )}

      {/* Tab 3: Practice Quiz */}
      {activeTab === 'quiz' && (
        <QuizSystem questions={lecture.questions} lectureTitle={lecture.title} />
      )}

      {/* Tab 4: Golden Cheat Sheet in Egyptian */}
      {activeTab === 'cheatSheet' && (
        <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-beige-200 dark:border-stone-800 pb-3">
            <ArabicText as="h3" className="text-lg font-bold text-stone-900 dark:text-stone-100">
              زتونة الامتحان وروشتة المراجعة المركزة
            </ArabicText>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 pt-1">
              أهم النقط اللي الدكاترة بيحطوها في الامتحانات النصفية والنهائية
            </ArabicText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lecture.cheatSheet.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-200 dark:border-stone-800 space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center text-[13px] font-bold font-mono shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-relaxed font-sans">
                    {item.en}
                  </p>
                </div>
                <div className="pr-8">
                  <ArabicText className="text-sm text-stone-700 dark:text-zinc-300 leading-[1.75] font-medium">
                    {item.ar}
                  </ArabicText>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Terminology */}
      {activeTab === 'terms' && (
        <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-beige-200 dark:border-stone-800 pb-3">
            <ArabicText as="h3" className="text-lg font-bold text-stone-900 dark:text-stone-100">
              المصطلحات الأساسية ببساطة
            </ArabicText>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 pt-1">
              المصطلح الأكاديمي المطلوب في الامتحان مع توضيح مباشر ومختصر يثبت في دماغك
            </ArabicText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lecture.terms.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-200 dark:border-stone-800 space-y-2"
              >
                <div className="flex items-center justify-between gap-2 border-b border-beige-200 dark:border-stone-800 pb-1.5">
                  <span className="text-sm font-bold text-stone-900 dark:text-stone-100 font-mono">
                    {t.term}
                  </span>
                  <ArabicText as="span" className="text-sm font-semibold text-stone-800 dark:text-zinc-200">
                    {t.termAr}
                  </ArabicText>
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans font-medium">
                  {t.definition}
                </p>
                <div className="pt-1.5 border-t border-beige-200 dark:border-stone-800/80">
                  <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
                    <strong>توضيح الفكرة: </strong>
                    {t.definitionAr}
                  </ArabicText>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureSummary;

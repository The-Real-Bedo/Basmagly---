import React, { useState } from 'react';
import { Brain, CalendarDays, Compass, FlaskConical, Layers, MessageSquare, Sliders } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { AiFuelLab, AiHistoryLab } from './AiProgressLab';
import { AiApproachesLab, AiFoundationsLab } from './AiPerspectivesLab';
import { AiRationalityLab } from './AiRationalityLab';
import { TuringTestPlayground } from './TuringTestPlayground';

export const AI_ONE_LABS = [
  { id: 'ai-fuel', title: 'Data, Algorithms & Compute', titleAr: 'محرّكات تقدّم الذكاء الاصطناعي', descriptionAr: 'غيّر البيانات والخوارزمية والقدرة الحسابية واكتشف عنق الزجاجة.', icon: Sliders, badge: 'AI Progress' },
  { id: 'ai-history', title: 'AI History Explorer', titleAr: 'رحلة الاكتشاف والانتكاس', descriptionAr: 'تنقّل بين المحطات التاريخية وافهم ليه الحماس لوحده مش كفاية.', icon: CalendarDays, badge: 'History & Winters' },
  { id: 'ai-foundations', title: 'The Sciences Behind AI', titleAr: 'ركّب منظومة من العلوم', descriptionAr: 'شوف إسهام الفلسفة والرياضيات وباقي العلوم في بناء نظام ذكي.', icon: Layers, badge: 'Foundations' },
  { id: 'ai-approaches', title: 'Four Approaches Studio', titleAr: 'أربع عدسات لنفس المشكلة', descriptionAr: 'جرّب السيناريوهات وحدّد هل المعيار تفكير ولا سلوك، بشري ولا عقلاني.', icon: Brain, badge: 'Think • Act' },
  { id: 'turing-test', title: 'Turing Test & Its Limits', titleAr: 'المحقق واختبار التقليد', descriptionAr: 'خمّن الطرف البشري في مثال مكتوب وقارن الاختبار النصي بالاختبار الشامل.', icon: MessageSquare, badge: 'Imitation Game' },
  { id: 'ai-rationality', title: 'Rationality Under Uncertainty', titleAr: 'قرار عقلاني ولا حظ؟', descriptionAr: 'قارن الوقت المتوقع بالنتيجة الفعلية وافهم ليه العقلانية مش معرفة الغيب.', icon: Compass, badge: 'Expected Outcomes' },
] as const;

export type AiOneLabId = typeof AI_ONE_LABS[number]['id'];

export const AiOneExperiment: React.FC<{ id: AiOneLabId }> = ({ id }) => {
  switch (id) {
    case 'ai-fuel': return <AiFuelLab />;
    case 'ai-history': return <AiHistoryLab />;
    case 'ai-foundations': return <AiFoundationsLab />;
    case 'ai-approaches': return <AiApproachesLab />;
    case 'turing-test': return <TuringTestPlayground />;
    case 'ai-rationality': return <AiRationalityLab />;
  }
};

export const AiLectureOneLabs: React.FC<{ initialExperiment?: string }> = ({ initialExperiment }) => {
  const [activeId, setActiveId] = useState<AiOneLabId>(() => AI_ONE_LABS.find(lab => lab.id === initialExperiment)?.id ?? 'ai-fuel');
  const activeIndex = AI_ONE_LABS.findIndex(lab => lab.id === activeId);

  return (
    <div data-testid="ai1-workbench" className="min-w-0 space-y-5">
      <div className="rounded-3xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7 space-y-5">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-amber-100 dark:bg-amber-950/60 p-2 text-amber-800 dark:text-amber-300"><FlaskConical className="h-5 w-5" /></span>
          <div className="space-y-1">
            <p className="font-mono text-[13px] uppercase tracking-wider text-amber-800 dark:text-amber-300">Lecture 01 / Experiment studio</p>
            <ArabicText as="h2" className="text-2xl font-bold text-stone-900 dark:text-stone-100">من الفكرة للتجربة</ArabicText>
            <p className="text-sm text-stone-600 dark:text-zinc-400">Choose an experiment. Change its inputs, observe the result, and explain why.</p>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">اختار تجربة، غيّر مدخلاتها، وشوف النتيجة وافهم سببها. تغيير التجربة بيبدأها من جديد.</ArabicText>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="group" aria-label="Lecture one experiments">
          {AI_ONE_LABS.map((lab, index) => {
            const selected = lab.id === activeId;
            const Icon = lab.icon;
            return <button key={lab.id} data-testid={`open-${lab.id}`} onClick={() => { setActiveId(lab.id); document.getElementById('ai1-active-experiment')?.scrollIntoView({ behavior: 'instant', block: 'start' }); }} aria-pressed={selected}
              className={`min-w-0 rounded-2xl border p-4 text-left transition-colors ${selected ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700 text-stone-900 dark:text-stone-100' : 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-300 dark:border-stone-800 text-stone-700 dark:text-zinc-300 hover:border-stone-400 dark:hover:border-stone-600'}`}>
              <div className="flex justify-between items-center gap-2 mb-3"><Icon className="h-5 w-5 text-amber-800 dark:text-amber-300" /><span className="font-mono text-[13px] text-stone-600 dark:text-zinc-400">{String(index + 1).padStart(2, '0')}</span></div>
              <ArabicText className="font-semibold text-sm text-stone-900 dark:text-stone-100">{lab.titleAr}</ArabicText>
              <span className="block text-[13px] mt-1">{lab.title}</span>
            </button>;
          })}
        </div>
      </div>
      <div id="ai1-active-experiment" className="scroll-mt-28 space-y-3">
        <p className="font-mono text-[13px] text-stone-600 dark:text-zinc-400">EXPERIMENT {String(activeIndex + 1).padStart(2, '0')} / {String(AI_ONE_LABS.length).padStart(2, '0')}</p>
        <AiOneExperiment key={activeId} id={activeId} />
      </div>
    </div>
  );
};

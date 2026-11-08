import React, { lazy, Suspense, useState } from 'react';
import { FlaskConical, ArrowDownRight } from 'lucide-react';
import { LAB_CATALOG, LabId } from '../../data/labCatalog';
import { ArabicText } from '../ArabicText';

const experiments = {
  'ai-fuel': lazy(() => import('./AiProgressLab').then(m => ({ default: m.AiFuelLab }))),
  'ai-history': lazy(() => import('./AiProgressLab').then(m => ({ default: m.AiHistoryLab }))),
  'ai-foundations': lazy(() => import('./AiPerspectivesLab').then(m => ({ default: m.AiFoundationsLab }))),
  'ai-approaches': lazy(() => import('./AiPerspectivesLab').then(m => ({ default: m.AiApproachesLab }))),
  'turing-test': lazy(() => import('./TuringTestPlayground').then(m => ({ default: m.TuringTestPlayground }))),
  'ai-rationality': lazy(() => import('./AiRationalityLab').then(m => ({ default: m.AiRationalityLab }))),
  'vacuum-world': lazy(() => import('./VacuumWorldAgentLab').then(m => ({ default: m.VacuumWorldAgentLab }))),
  'agent-architecture': lazy(() => import('./AgentArchitectureLab').then(m => ({ default: m.AgentArchitectureLab }))),
  'search-visualizer': lazy(() => import('./SearchAlgorithmLab').then(m => ({ default: m.SearchAlgorithmLab }))),
  'network-devices': lazy(() => import('./NetworkDevicesCollisionLab').then(m => ({ default: m.NetworkDevicesCollisionLab }))),
  'packet-journey': lazy(() => import('./PacketJourneyLab').then(m => ({ default: m.PacketJourneyLab }))),
  'osi-visualizer': lazy(() => import('./OsiTcpVisualizer').then(m => ({ default: m.OsiTcpVisualizer }))),
  'subnet-calculator': lazy(() => import('./SubnetCalculatorVisualizer').then(m => ({ default: m.SubnetCalculatorVisualizer }))),
  'transmission-lab': lazy(() => import('./TransmissionModesLab').then(m => ({ default: m.TransmissionModesLab }))),
  'topology-simulator': lazy(() => import('./TopologyPlayground').then(m => ({ default: m.TopologyPlayground }))),
  'edge-vs-cloud': lazy(() => import('./EdgeVsCloudLab').then(m => ({ default: m.EdgeVsCloudLab }))),
  'iot-simulator': lazy(() => import('./IotPipelineSimulator').then(m => ({ default: m.IotPipelineSimulator }))),
  'iot-stack-lab': lazy(() => import('./IotStackArchitectureLab').then(m => ({ default: m.IotStackArchitectureLab }))),
  'windows-message-loop': lazy(() => import('./WindowsMessageLab').then(m => ({ default: m.WindowsMessageLab }))),
  'event-driven-lab': lazy(() => import('./EventDrivenLab').then(m => ({ default: m.EventDrivenLab }))),
  'signal-sampling': lazy(() => import('./SignalSamplingLab').then(m => ({ default: m.SignalSamplingLab }))),
  'discrete-signals': lazy(() => import('./DiscreteSignalsLab').then(m => ({ default: m.DiscreteSignalsLab }))),
} satisfies Record<LabId, React.LazyExoticComponent<React.ComponentType>>;

export const Experiment: React.FC<{ id: string }> = ({ id }) => {
  const Component = experiments[id as LabId];
  if (!Component) return <p className="text-sm text-stone-600 dark:text-zinc-400">This experiment is not registered.</p>;
  return <div data-testid={`experiment-${id}`} className="min-w-0"><Suspense fallback={<p role="status" className="rounded-2xl border border-beige-300 dark:border-stone-800 p-5 text-sm text-stone-600 dark:text-zinc-400">Preparing the experiment…</p>}><Component /></Suspense></div>;
};

export const InlineExperiment: React.FC<{ id: string }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const lab = LAB_CATALOG.find(item => item.id === id);
  if (!lab) return null;
  return <details data-testid={`inline-${id}`} onToggle={e => setOpen(e.currentTarget.open)} className="min-w-0 rounded-3xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5">
    <summary className="cursor-pointer text-sm font-semibold text-stone-900 dark:text-stone-100">
      <span>Try it · {lab.title}</span><ArabicText as="span" className="block pt-1 font-normal text-stone-600 dark:text-zinc-400">{lab.subtitleAr}</ArabicText>
    </summary>
    {open && <div className="pt-5"><Experiment id={id} /></div>}
  </details>;
};

export const ExperimentStudio: React.FC<{ ids: string[]; initialExperiment?: string }> = ({ ids, initialExperiment }) => {
  const labs = LAB_CATALOG.filter(lab => ids.includes(lab.id));
  const [activeId, setActiveId] = useState(() => labs.find(lab => lab.id === initialExperiment)?.id ?? labs[0]?.id);
  if (!activeId) return null;
  return <div className="min-w-0 space-y-5" data-testid="experiment-studio">
    <section className="rounded-3xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7 space-y-5">
      <header className="flex gap-3 items-start">
        <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"><FlaskConical className="h-5 w-5" /></span>
        <div><p className="font-mono text-[13px] uppercase tracking-wider text-stone-500 dark:text-zinc-400">Observe / Change / Explain</p><h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">Your experiment bench</h2><ArabicText className="text-sm text-stone-600 dark:text-zinc-400 mt-1">اختار تجربة وغيّر مدخلاتها. كل تجربة بتبدأ من جديد لما تنتقل لتجربة تانية.</ArabicText></div>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-label="Choose an experiment">
        {labs.map((lab, index) => {
          const Icon = lab.icon;
          return <button key={lab.id} type="button" data-testid={`open-${lab.id}`} aria-pressed={activeId === lab.id}
            onClick={() => { setActiveId(lab.id); document.getElementById('active-experiment')?.scrollIntoView({ block: 'start', behavior: 'instant' }); }}
            className={`min-w-0 rounded-2xl border p-4 text-left transition-colors ${activeId === lab.id ? 'bg-stone-900 dark:bg-stone-100 border-stone-900 dark:border-stone-100 text-white dark:text-stone-900' : 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-300 dark:border-stone-800 text-stone-800 dark:text-zinc-200 hover:border-stone-400 dark:hover:border-stone-600'}`}>
            <span className="flex justify-between mb-3"><Icon className="w-5 h-5" /><span className="font-mono text-[13px] opacity-70">{String(index + 1).padStart(2, '0')}</span></span>
            <span className="block text-sm font-semibold">{lab.title}</span>
            <ArabicText className="text-inherit text-[13px] mt-1 opacity-80">{lab.subtitleAr}</ArabicText>
          </button>;
        })}
      </div>
      <p className="flex gap-2 items-center text-[13px] text-stone-600 dark:text-zinc-400"><ArrowDownRight className="w-4 h-4" />One experiment at a time. Reset, replay, and compare.</p>
    </section>
    <div id="active-experiment" className="scroll-mt-28"><Experiment key={activeId} id={activeId} /></div>
  </div>;
};

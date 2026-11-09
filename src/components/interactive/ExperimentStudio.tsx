import React, { Component, lazy, Suspense, useEffect, useState } from 'react';
import { FlaskConical, ArrowDownRight, RotateCcw } from 'lucide-react';
import { LAB_CATALOG, LabId } from '../../data/labCatalog';
import { LAB_GUIDES } from '../../data/labGuides';
import { ArabicText } from '../ArabicText';

const experiments = {
  'ai-fuel': lazy(() => import('./AiProgressLab').then(m => ({ default: m.AiFuelLab }))),
  'ai-history': lazy(() => import('./AiProgressLab').then(m => ({ default: m.AiHistoryLab }))),
  'ai-foundations': lazy(() => import('./AiPerspectivesLab').then(m => ({ default: m.AiFoundationsLab }))),
  'ai-approaches': lazy(() => import('./AiPerspectivesLab').then(m => ({ default: m.AiApproachesLab }))),
  'turing-test': lazy(() => import('./TuringTestPlayground').then(m => ({ default: m.TuringTestPlayground }))),
  'ai-rationality': lazy(() => import('./AiRationalityLab').then(m => ({ default: m.AiRationalityLab }))),
  'vacuum-world': lazy(() => import('./VacuumWorldAgentLab').then(m => ({ default: m.VacuumWorldAgentLab }))),
  'vacuum-world-3d': lazy(() => import('./VacuumWorld3DLab')),
  'agent-architecture': lazy(() => import('./AgentArchitectureLab').then(m => ({ default: m.AgentArchitectureLab }))),
  'search-visualizer': lazy(() => import('./SearchAlgorithmLab').then(m => ({ default: m.SearchAlgorithmLab }))),
  'network-devices': lazy(() => import('./NetworkDevicesCollisionLab').then(m => ({ default: m.NetworkDevicesCollisionLab }))),
  'network-3d': lazy(() => import('./Network3DLab')),
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
  'win32-code-lab': lazy(() => import('./Win32CodeLab').then(m => ({ default: m.Win32CodeLab }))),
  'win32-types-lab': lazy(() => import('./Win32TypesLab').then(m => ({ default: m.Win32TypesLab }))),
  'network-media': lazy(() => import('./NetworkMediaLab').then(m => ({ default: m.NetworkMediaLab }))),
  'ai-environments': lazy(() => import('./AiEnvironmentLab').then(m => ({ default: m.AiEnvironmentLab }))),
  'signal-support': lazy(() => import('./SignalSupportLab').then(m => ({ default: m.SignalSupportLab }))),
  'signal-periodicity': lazy(() => import('./SignalPeriodicityLab').then(m => ({ default: m.SignalPeriodicityLab }))),
  'signal-systems': lazy(() => import('./SignalSystemsLab').then(m => ({ default: m.SignalSystemsLab }))),
  'signal-convolution': lazy(() => import('./SignalConvolutionLab').then(m => ({ default: m.SignalConvolutionLab }))),
} satisfies Record<LabId, React.LazyExoticComponent<React.ComponentType>>;

class ExperimentBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900 dark:bg-rose-950/30">
      <p className="text-sm text-stone-800 dark:text-zinc-200">The experiment could not open. Use Start again to retry.</p>
      <ArabicText className="mt-1 text-sm text-stone-700 dark:text-zinc-300">التجربة ما فتحتش. استخدم Start again عشان تحاول تاني.</ArabicText>
    </div> : this.props.children;
  }
}

export const Experiment: React.FC<{ id: string }> = ({ id }) => {
  const [revision, setRevision] = useState(0);
  const Lab = experiments[id as LabId];
  const guide = LAB_GUIDES[id as LabId];
  if (!Lab) return <p className="text-sm text-stone-600 dark:text-zinc-400">This experiment is not registered.</p>;
  return <div data-testid={`experiment-${id}`} className="min-w-0 space-y-4">
    <section aria-label="Guided comparison" className="overflow-hidden rounded-2xl border border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-beige-300 px-4 py-3 dark:border-stone-800">
        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">Try this comparison</h4>
        <button type="button" data-testid="restart-experiment" onClick={() => setRevision(value => value + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 bg-[#FAF7F2] px-3 text-[13px] font-semibold text-stone-800 hover:bg-beige-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-200 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400"><RotateCcw className="h-4 w-4" />Start again</button>
      </div>
      <div className="grid lg:grid-cols-2">
        <p className="p-4 text-[15px] text-stone-700 dark:text-zinc-300">{guide.tryEn}</p>
        <ArabicText className="border-t border-beige-300 bg-[#FAF7F2]/70 p-4 text-[15px] text-stone-700 dark:border-stone-800 dark:bg-stone-950/50 dark:text-zinc-300 lg:border-l lg:border-t-0">{guide.tryAr}</ArabicText>
      </div>
    </section>
    {/* Remounting clears local inputs and lets each lab dispose its timers and scene. */}
    <ExperimentBoundary key={`${id}-${revision}`}><Suspense fallback={<p role="status" className="rounded-2xl border border-beige-300 dark:border-stone-800 p-5 text-sm text-stone-600 dark:text-zinc-400">Preparing the experiment…</p>}><Lab /></Suspense></ExperimentBoundary>
    <details key={`${id}-${revision}-observation`} className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
      <summary className="min-h-6 cursor-pointer text-sm font-semibold text-amber-900 dark:text-amber-300">Compare your observation</summary>
      <div className="mt-3 grid gap-4 lg:grid-cols-2"><p className="text-[15px] text-stone-700 dark:text-zinc-300">{guide.observeEn}</p><ArabicText className="text-[15px] text-stone-700 dark:text-zinc-300">{guide.observeAr}</ArabicText></div>
    </details>
  </div>;
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
  const [activeId, setActiveId] = useState<LabId | undefined>(() => labs.find(lab => lab.id === initialExperiment)?.id ?? labs[0]?.id);
  const availableIds = labs.map(lab => lab.id).join(',');
  useEffect(() => {
    const available = availableIds.split(',').filter(Boolean);
    setActiveId((initialExperiment && available.includes(initialExperiment) ? initialExperiment : available[0]) as LabId | undefined);
  }, [availableIds, initialExperiment]);
  const selectedId = labs.find(lab => lab.id === activeId)?.id ?? labs[0]?.id;
  if (!selectedId) return null;
  return <div className="min-w-0 space-y-5" data-testid="experiment-studio">
    <section className="rounded-3xl border border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7 space-y-5">
      <header className="flex gap-3 items-start">
        <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"><FlaskConical className="h-5 w-5" /></span>
        <div><p className="font-mono text-[13px] uppercase tracking-wider text-stone-500 dark:text-zinc-400">Observe / Change / Explain</p><h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">Your experiment bench</h2><ArabicText className="text-sm text-stone-600 dark:text-zinc-400 mt-1">اختار تجربة وغيّر مدخلاتها. كل تجربة بتبدأ من جديد لما تنتقل لتجربة تانية.</ArabicText></div>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-label="Choose an experiment">
        {labs.map((lab, index) => {
          const Icon = lab.icon;
          return <button key={lab.id} type="button" data-testid={`open-${lab.id}`} aria-pressed={selectedId === lab.id}
            onClick={() => { setActiveId(lab.id); document.getElementById('active-experiment')?.scrollIntoView({ block: 'start', behavior: 'instant' }); }}
            className={`min-w-0 rounded-2xl border p-4 text-left transition-colors ${selectedId === lab.id ? 'bg-stone-900 dark:bg-stone-100 border-stone-900 dark:border-stone-100 text-white dark:text-stone-900' : 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-300 dark:border-stone-800 text-stone-800 dark:text-zinc-200 hover:border-stone-400 dark:hover:border-stone-600'}`}>
            <span className="flex justify-between mb-3"><Icon className="w-5 h-5" /><span className="font-mono text-[13px] opacity-70">{String(index + 1).padStart(2, '0')}</span></span>
            <span className="block text-sm font-semibold">{lab.title}</span>
            <ArabicText className="text-inherit text-[13px] mt-1 opacity-80">{lab.subtitleAr}</ArabicText>
          </button>;
        })}
      </div>
      <p className="flex gap-2 items-center text-[13px] text-stone-600 dark:text-zinc-400"><ArrowDownRight className="w-4 h-4" />One experiment at a time. Reset, replay, and compare.</p>
    </section>
    <div id="active-experiment" className="scroll-mt-28"><Experiment key={selectedId} id={selectedId} /></div>
  </div>;
};

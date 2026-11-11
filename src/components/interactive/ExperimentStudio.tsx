import React, { Component, lazy, Suspense, useEffect, useState } from 'react';
import { FlaskConical, ArrowDownRight, ArrowUpRight, RotateCcw, Maximize2 } from 'lucide-react';
import { LAB_CATALOG, LabId } from '../../data/labCatalog';
import { LAB_GUIDES } from '../../data/labGuides';
import { ArabicText } from '../ArabicText';
import { ExpandedLab } from './ExpandedLab';

const experiments = {
  'ai-fuel': lazy(() => import('./AiProgressLab').then(m => ({ default: m.AiFuelLab }))),
  'ai-history': lazy(() => import('./AiProgressLab').then(m => ({ default: m.AiHistoryLab }))),
  'ai-foundations': lazy(() => import('./AiPerspectivesLab').then(m => ({ default: m.AiFoundationsLab }))),
  'ai-approaches': lazy(() => import('./AiPerspectivesLab').then(m => ({ default: m.AiApproachesLab }))),
  'turing-test': lazy(() => import('./TuringTestPlayground').then(m => ({ default: m.TuringTestPlayground }))),
  'ai-rationality': lazy(() => import('./AiRationalityLab').then(m => ({ default: m.AiRationalityLab }))),
  'ai-perceptron': lazy(() => import('./PerceptronLab').then(m => ({ default: m.PerceptronLab }))),
  'ai-eight-puzzle': lazy(() => import('./EightPuzzleLab').then(m => ({ default: m.EightPuzzleLab }))),
  'ai-search-states': lazy(() => import('./SearchStatesLab').then(m => ({ default: m.SearchStatesLab }))),
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
  'bfs-queue-lab': lazy(() => import('./BfsQueueLab').then(m => ({ default: m.BfsQueueLab }))),
  'dfs-stack-lab': lazy(() => import('./DfsStackLab').then(m => ({ default: m.DfsStackLab }))),
  'ucs-priority-lab': lazy(() => import('./UcsPriorityLab').then(m => ({ default: m.UcsPriorityLab }))),
  'ipv6-compress': lazy(() => import('./Ipv6CompressionLab').then(m => ({ default: m.Ipv6CompressionLab }))),
  'eui-64-lab': lazy(() => import('./Eui64Lab').then(m => ({ default: m.Eui64Lab }))),
  'ipv6-structure-3d': lazy(() => import('./Ipv6Structure3DLab').then(m => ({ default: m.Ipv6Structure3DLab }))),
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
  return <ExpandedLab title={LAB_CATALOG.find(lab => lab.id === id)?.title ?? 'Experiment'}>{expand => <div data-testid={`experiment-${id}`} className="min-w-0 space-y-4">
    <section aria-label="Guided comparison" className="overflow-hidden rounded-2xl border border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-beige-300 px-4 py-3 dark:border-stone-800">
        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">Try this comparison</h4>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
        <button type="button" data-testid="expand-experiment" onClick={expand} className="group inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-2xl border border-amber-400 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 px-4 py-2.5 text-stone-950 shadow-md shadow-amber-900/10 transition-colors hover:border-amber-600 hover:from-amber-200 hover:to-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 dark:border-amber-500 dark:from-amber-200 dark:via-amber-300 dark:to-amber-500 dark:text-stone-950 dark:shadow-amber-500/10 dark:hover:border-amber-300 dark:hover:from-amber-100 dark:hover:to-amber-400 dark:focus-visible:ring-amber-300 dark:focus-visible:ring-offset-stone-900 sm:w-auto">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-700/20 bg-white/45 shadow-sm dark:border-amber-900/20 dark:bg-white/35"><Maximize2 className="h-5 w-5" /></span>
          <span className="text-left"><span className="block text-[15px] font-extrabold">Expand lab</span><span className="block text-[13px] font-medium text-amber-950 dark:text-amber-950">Full-screen workspace</span></span>
          <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" />
        </button>
        <button type="button" data-testid="restart-experiment" onClick={() => setRevision(value => value + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-beige-300 bg-[#FAF7F2] px-3 text-[13px] font-semibold text-stone-800 hover:bg-beige-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-950 dark:text-zinc-200 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400"><RotateCcw className="h-4 w-4" />Start again</button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2">
        <p className="p-4 text-[15px] text-stone-700 dark:text-zinc-300">{guide.tryEn}</p>
        <ArabicText className="border-t border-beige-300 bg-[#FAF7F2]/70 p-4 text-[15px] text-stone-700 dark:border-stone-800 dark:bg-stone-950/50 dark:text-zinc-300 lg:border-l lg:border-t-0">{guide.tryAr}</ArabicText>
      </div>
    </section>
    {/* Remounting clears local inputs and lets each lab dispose its timers and scene. */}
    <div data-lab-body><ExperimentBoundary key={`${id}-${revision}`}><Suspense fallback={<p role="status" className="rounded-2xl border border-beige-300 dark:border-stone-800 p-5 text-sm text-stone-600 dark:text-zinc-400">Preparing the experiment…</p>}><Lab /></Suspense></ExperimentBoundary></div>
    <details data-lab-observation key={`${id}-${revision}-observation`} className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
      <summary className="min-h-6 cursor-pointer text-sm font-semibold text-amber-900 dark:text-amber-300">Compare your observation</summary>
      <div className="mt-3 grid gap-4 lg:grid-cols-2"><p className="text-[15px] text-stone-700 dark:text-zinc-300">{guide.observeEn}</p><ArabicText className="text-[15px] text-stone-700 dark:text-zinc-300">{guide.observeAr}</ArabicText></div>
    </details>
  </div>}</ExpandedLab>;
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
            <span className="flex justify-between items-center mb-3">
              <Icon className="w-5 h-5" />
              <div className="flex items-center gap-1.5">
                {lab.isImportant && (
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 dark:bg-amber-900/60 dark:text-amber-200">
                    ★ Important
                  </span>
                )}
                <span className="font-mono text-[13px] opacity-70">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </span>
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

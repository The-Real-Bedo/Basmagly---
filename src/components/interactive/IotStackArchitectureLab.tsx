import React, { useEffect, useRef, useState } from 'react';
import { Activity, ArrowRight, ArrowUp, Box, Check, Cloud, Code2, Cpu, Database, Layers, LayoutDashboard, Play, Radio, RotateCcw, Smartphone, Wifi } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type LabTab = 'theory' | 'practical' | 'transport';
type TransportMode = 'tcp' | 'udp';

interface Layer {
  id: string;
  number: string;
  name: string;
  nameAr: string;
  icon: LucideIcon;
  role: string;
  roleAr: string;
  technologies: string;
  technologiesAr: string;
  takeaway: string;
  takeawayAr: string;
}

interface TransportEvent {
  from: 'IoT node' | 'Server';
  to: 'IoT node' | 'Server';
  packet: string;
  note: string;
  noteAr: string;
}

const THEORY_LAYERS: Layer[] = [
  { id: 'perception', number: '01', name: 'Perception / Hardware', nameAr: 'الإدراك / العتاد', icon: Activity, role: 'Interfaces with the physical world through sensors and actuators.', roleAr: 'بتتصل بالعالم المادي عن طريق الحساسات والمشغّلات.', technologies: 'Sensors · actuators · cameras', technologiesAr: 'حساسات · مشغّلات · كاميرات', takeaway: 'Sensors are inputs; actuators produce physical outputs.', takeawayAr: 'الحساسات مدخلات؛ والمشغّلات بتنتج مخرجات فيزيائية.' },
  { id: 'network', number: '02', name: 'Network / Communication', nameAr: 'الشبكة / الاتصال', icon: Radio, role: 'Carries device data toward a gateway, edge node, or platform.', roleAr: 'بتنقل بيانات الجهاز لبوابة أو عقدة Edge أو منصة.', technologies: 'Wi-Fi · Bluetooth · Zigbee · LoRa · NB-IoT', technologiesAr: 'Wi-Fi · Bluetooth · Zigbee · LoRa · NB-IoT', takeaway: 'Choose a link that fits range, power, and data needs.', takeawayAr: 'اختار وصلة تناسب المدى والطاقة واحتياج البيانات.' },
  { id: 'edge', number: '03', name: 'Edge / Processing', nameAr: 'المعالجة الطرفية (Edge)', icon: Cpu, role: 'Processes or filters data near devices before forwarding it.', roleAr: 'بتعالج البيانات أو بتنقّيها قرب الأجهزة قبل إرسالها.', technologies: 'Gateway · Raspberry Pi · ESP32 · PLC', technologiesAr: 'بوابة · Raspberry Pi · ESP32 · PLC', takeaway: 'Local processing can reduce unnecessary traffic and support local rules.', takeawayAr: 'المعالجة المحلية ممكن تقلل حركة البيانات وتدعم القواعد المحلية.' },
  { id: 'middleware', number: '04', name: 'Middleware / Platform', nameAr: 'الوسيط / المنصة', icon: Database, role: 'Connects devices and applications; brokers messages and ingests telemetry.', roleAr: 'بتربط الأجهزة بالتطبيقات، وبتدير الرسائل وبتستقبل بيانات القياس.', technologies: 'MQTT broker · cloud IoT platform', technologiesAr: 'وسيط MQTT · منصة IoT سحابية', takeaway: 'A message broker helps producers and consumers exchange data.', takeawayAr: 'وسيط الرسائل بيساعد مصادر البيانات ومستهلكيها يتبادلوا المعلومات.' },
  { id: 'application', number: '05', name: 'Application', nameAr: 'التطبيق', icon: Smartphone, role: 'Presents readings, alerts, dashboards, and controls to users.', roleAr: 'بتعرض القراءات والتنبيهات ولوحات المعلومات وأدوات التحكم للمستخدم.', technologies: 'Mobile app · dashboard · SCADA alert', technologiesAr: 'تطبيق موبايل · لوحة معلومات · تنبيه SCADA', takeaway: 'The user-facing layer is not the device-driver layer.', takeawayAr: 'طبقة المستخدم مش هي طبقة مشغّلات الجهاز.' },
];

const PRACTICAL_LAYERS: Layer[] = [
  { id: 'things', number: '01', name: 'Things', nameAr: 'الأشياء المادية', icon: Box, role: 'Physical objects in homes, workplaces, and the environment.', roleAr: 'الأجسام الموجودة في المنازل وأماكن العمل والبيئة.', technologies: 'Meter · vehicle · appliance · machine', technologiesAr: 'عداد · مركبة · جهاز منزلي · آلة', takeaway: '“Things” names the physical objects being connected.', takeawayAr: 'مصطلح Things بيسمّي الأجسام المادية اللي بيتم توصيلها.' },
  { id: 'hardware', number: '02', name: 'Device Hardware', nameAr: 'عتاد الجهاز', icon: Cpu, role: 'Embedded components that sense, compute, or interface with the object.', roleAr: 'مكوّنات مدمجة بتستشعر أو تعالج أو تتصل بالجسم.', technologies: 'ESP32 · ARM Cortex · SoC · gateway · PLC', technologiesAr: 'ESP32 · ARM Cortex · SoC · بوابة · PLC', takeaway: 'Hardware provides the physical compute and interfaces.', takeawayAr: 'العتاد بيوفر المعالجة والواجهات الفيزيائية.' },
  { id: 'software', number: '03', name: 'Device Software', nameAr: 'برمجيات الجهاز', icon: Code2, role: 'Runs on the device processor and controls its functions.', roleAr: 'بتشتغل على معالج الجهاز وبتتحكم في وظائفه.', technologies: 'Linux · C · Rust · Python · C#', technologiesAr: 'Linux · C · Rust · Python · C#', takeaway: 'Device software is distinct from cloud applications.', takeawayAr: 'برمجيات الجهاز مختلفة عن تطبيقات السحابة.' },
  { id: 'communications', number: '04', name: 'Communications', nameAr: 'الاتصالات', icon: Wifi, role: 'Connects devices and transports data over wired or wireless links.', roleAr: 'بتوصل الأجهزة وبتنقل البيانات عبر وصلات سلكية أو لاسلكية.', technologies: 'Ethernet · Wi-Fi · Zigbee · Thread · LTE-M · LoRaWAN', technologiesAr: 'Ethernet · Wi-Fi · Zigbee · Thread · LTE-M · LoRaWAN', takeaway: 'The practical diagram groups multiple link technologies here.', takeawayAr: 'الرسم العملي بيجمع تقنيات اتصال متعددة في المرحلة دي.' },
  { id: 'cloud-platform', number: '05', name: 'Cloud Platform', nameAr: 'منصة السحابة', icon: Cloud, role: 'Receives, processes, and stores data from connected IoT devices.', roleAr: 'بتستقبل بيانات أجهزة IoT المتصلة وتعالجها وتخزنها.', technologies: 'AWS · Azure · Google Cloud', technologiesAr: 'AWS · Azure · Google Cloud', takeaway: 'Platform services handle data and device-management functions.', takeawayAr: 'خدمات المنصة بتدير البيانات ووظائف إدارة الأجهزة.' },
  { id: 'cloud-apps', number: '06', name: 'Cloud Applications', nameAr: 'تطبيقات السحابة', icon: LayoutDashboard, role: 'Provide user-facing dashboards, settings, alerts, and device controls.', roleAr: 'بتوفر لوحات معلومات وإعدادات وتنبيهات وتحكمًا للمستخدم.', technologies: 'Dashboard · notification · control panel', technologiesAr: 'لوحة معلومات · إشعار · لوحة تحكم', takeaway: 'This is the customer-facing end of the practical stack.', takeawayAr: 'دي نهاية المكدس العملي المواجهة للمستخدم.' },
];

const TCP_EVENTS: TransportEvent[] = [
  { from: 'IoT node', to: 'Server', packet: 'SYN · SEQ=100', note: 'The client requests a TCP connection.', noteAr: 'العميل بيطلب بدء اتصال TCP.' },
  { from: 'Server', to: 'IoT node', packet: 'SYN-ACK · SEQ=500 · ACK=101', note: 'The server acknowledges the SYN and sends its own SYN.', noteAr: 'الخادم بيقرّ باستلام SYN ويبعت SYN خاص به.' },
  { from: 'IoT node', to: 'Server', packet: 'ACK · ACK=501', note: 'The client acknowledges the server SYN; the handshake is complete.', noteAr: 'العميل بيقرّ باستلام SYN من الخادم؛ والمصافحة اكتملت.' },
  { from: 'IoT node', to: 'Server', packet: 'DATA · SEQ=101 · 80 bytes', note: 'The client sends sample application data.', noteAr: 'العميل بيبعت عينة بيانات من التطبيق.' },
  { from: 'Server', to: 'IoT node', packet: 'ACK · ACK=181', note: 'The acknowledgement covers the next expected byte in this example.', noteAr: 'الإقرار بيوضح رقم البايت التالي المتوقع في المثال.' },
];

const UDP_EVENTS: TransportEvent[] = [
  { from: 'IoT node', to: 'Server', packet: 'DATAGRAM 1 · 38.4°C', note: 'The application sends a datagram without a transport handshake.', noteAr: 'التطبيق بيبعت مخطط بيانات من غير مصافحة نقل.' },
  { from: 'IoT node', to: 'Server', packet: 'DATAGRAM 2 · 38.6°C', note: 'A second datagram is sent independently; UDP adds no delivery acknowledgement.', noteAr: 'مخطط تاني بيتبعت بشكل مستقل؛ UDP ما بيضيفش إقرار تسليم.' },
  { from: 'IoT node', to: 'Server', packet: 'DATAGRAM 3 · 38.7°C', note: 'The application can add its own retry or acknowledgement behavior if needed.', noteAr: 'التطبيق ممكن يضيف إعادة إرسال أو إقرار بنفسه لو احتاج.' },
];

export const IotStackArchitectureLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('theory');
  const [selectedLayerId, setSelectedLayerId] = useState('perception');
  const [layerStep, setLayerStep] = useState(0);
  const [isTracing, setIsTracing] = useState(false);
  const [transportMode, setTransportMode] = useState<TransportMode>('tcp');
  const [transportStep, setTransportStep] = useState(0);
  const [transportLog, setTransportLog] = useState<TransportEvent[]>([]);
  const [isTransportRunning, setIsTransportRunning] = useState(false);
  const [transportMessage, setTransportMessage] = useState({ en: 'Step through a connection setup or send the remaining packets.', ar: 'اتقدّم خطوة بخطوة في إعداد الاتصال أو ابعت باقي الحزم.' });
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isPractical = activeTab === 'practical';
  const layers = isPractical ? PRACTICAL_LAYERS : THEORY_LAYERS;
  const orderedLayers = [...layers].reverse();
  const selectedLayer = layers.find((layer) => layer.id === selectedLayerId) || layers[0];
  const events = transportMode === 'tcp' ? TCP_EVENTS : UDP_EVENTS;

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const resetLayerTrace = () => {
    clearTimers();
    setIsTracing(false);
    setLayerStep(0);
    setSelectedLayerId(layers[0].id);
  };

  const advanceLayer = () => {
    if (isTracing || layerStep >= layers.length) return;
    const nextStep = layerStep + 1;
    setLayerStep(nextStep);
    setSelectedLayerId(layers[nextStep - 1].id);
  };

  const runLayerTrace = () => {
    if (isTracing || layerStep >= layers.length) return;
    clearTimers();
    setIsTracing(true);
    const remaining = layers.slice(layerStep);
    remaining.forEach((layer, index) => {
      timersRef.current.push(setTimeout(() => {
        const nextStep = layerStep + index + 1;
        setLayerStep(nextStep);
        setSelectedLayerId(layer.id);
        if (nextStep === layers.length) setIsTracing(false);
      }, (index + 1) * 650));
    });
  };

  const changeTab = (tab: LabTab) => {
    clearTimers();
    setActiveTab(tab);
    setIsTracing(false);
    setLayerStep(0);
    setSelectedLayerId(tab === 'practical' ? PRACTICAL_LAYERS[0].id : THEORY_LAYERS[0].id);
    setIsTransportRunning(false);
    setTransportStep(0);
    setTransportLog([]);
    setTransportMessage({ en: 'Choose a protocol and step through its packet flow.', ar: 'اختار بروتوكول واتابع حركة الحزم خطوة بخطوة.' });
  };

  const resetTransport = () => {
    clearTimers();
    setIsTransportRunning(false);
    setTransportStep(0);
    setTransportLog([]);
    setTransportMessage({ en: 'Trace cleared. Start with the first packet.', ar: 'التتبع اتمسح. ابدأ بأول حزمة.' });
  };

  const changeTransportMode = (mode: TransportMode) => {
    if (isTransportRunning) return;
    clearTimers();
    setTransportMode(mode);
    setTransportStep(0);
    setTransportLog([]);
    setTransportMessage({ en: mode === 'tcp' ? 'TCP begins with a three-way handshake.' : 'UDP sends datagrams without a transport handshake.', ar: mode === 'tcp' ? 'TCP بيبدأ بمصافحة من ثلاث رسائل.' : 'UDP بيبعت مخططات بيانات من غير مصافحة نقل.' });
  };

  const sendNextPacket = () => {
    if (isTransportRunning || transportStep >= events.length) return;
    const event = events[transportStep];
    setTransportLog((previous) => [...previous, event]);
    setTransportStep(transportStep + 1);
    setTransportMessage({ en: event.note, ar: event.noteAr });
  };

  const runRemainingPackets = () => {
    if (isTransportRunning || transportStep >= events.length) return;
    clearTimers();
    setIsTransportRunning(true);
    const remaining = events.slice(transportStep);
    remaining.forEach((event, index) => {
      timersRef.current.push(setTimeout(() => {
        const nextStep = transportStep + index + 1;
        setTransportLog((previous) => [...previous, event]);
        setTransportStep(nextStep);
        setTransportMessage({ en: event.note, ar: event.noteAr });
        if (nextStep === events.length) setIsTransportRunning(false);
      }, (index + 1) * 650));
    });
  };

  const currentLayerStep = Math.min(layerStep, layers.length);
  const packetLayerId = currentLayerStep > 0 ? layers[currentLayerStep - 1].id : '';
  const TabButton = ({ tab, title }: { tab: LabTab; title: string }) => (
    <button type="button" onClick={() => changeTab(tab)} aria-pressed={activeTab === tab}
      className={'rounded-xl px-3 py-2 text-sm font-semibold transition-colors ' + (activeTab === tab ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-600 hover:bg-white dark:text-zinc-300 dark:hover:bg-stone-900')}>
      {title}
    </button>
  );

  return (
    <section className="space-y-6 rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="flex items-start gap-3 border-b border-beige-200 pb-5 dark:border-stone-800">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Layers className="h-5 w-5" /></span>
        <div><h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">IoT Stack & Transport Lab</h3><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">استكشف طبقات إنترنت الأشياء واتبع رسائل TCP وUDP</ArabicText></div>
      </header>

      <nav className="flex flex-wrap gap-1 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-1 dark:border-stone-800 dark:bg-stone-950" aria-label="Choose a lab view">
        <TabButton tab="theory" title="Theoretical 5-layer model" />
        <TabButton tab="practical" title="Practical 6-block stack" />
        <TabButton tab="transport" title="TCP vs. UDP" />
      </nav>

      {activeTab !== 'transport' ? (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <div><p className="text-sm font-semibold text-stone-900 dark:text-stone-100">Trace telemetry upward from the physical object</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">اتابع البيانات وهي طالعة من الجسم المادي للطبقات الأعلى</ArabicText></div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={advanceLayer} disabled={isTracing || layerStep >= layers.length} className="inline-flex items-center gap-2 rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"><ArrowUp className="h-4 w-4" />Next layer</button>
              <button type="button" onClick={runLayerTrace} disabled={isTracing || layerStep >= layers.length} className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"><Play className="h-4 w-4" />Auto trace</button>
              <button type="button" onClick={resetLayerTrace} title="Reset layer trace" aria-label="Reset layer trace" className="rounded-xl border border-beige-300 p-2 text-stone-700 dark:border-stone-700 dark:text-zinc-300"><RotateCcw className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-2" aria-label={isPractical ? 'Practical stack diagram' : 'Theoretical stack diagram'}>
              {orderedLayers.map((layer) => {
                const Icon = layer.icon;
                const packetHere = packetLayerId === layer.id;
                const selected = selectedLayerId === layer.id;
                return <React.Fragment key={layer.id}>
                  <button type="button" onClick={() => { if (!isTracing) setSelectedLayerId(layer.id); }} disabled={isTracing} aria-pressed={selected}
                    className={'flex w-full min-w-0 items-center gap-3 rounded-2xl border p-3 text-left transition-colors disabled:cursor-default ' + (packetHere ? 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30' : selected ? 'border-stone-700 bg-[#FAF7F2] dark:border-stone-300 dark:bg-stone-950' : 'border-beige-300 bg-white hover:bg-[#FAF7F2] dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-950')}>
                    <span className={'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ' + (packetHere ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200 motion-safe:animate-pulse motion-reduce:animate-none' : 'bg-beige-100 text-stone-700 dark:bg-stone-800 dark:text-zinc-300')}><Icon className="h-5 w-5" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-stone-900 dark:text-stone-100">{layer.number} · {layer.name}</span><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{layer.nameAr}</ArabicText></span>
                    {packetHere && <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-200 px-2 py-1 text-[13px] font-semibold text-amber-950 dark:bg-amber-900 dark:text-amber-100"><Check className="h-3.5 w-3.5" />Packet</span>}
                  </button>
                  {layer.number !== '01' && <div className="flex justify-center py-0.5 text-stone-400 dark:text-zinc-500" aria-hidden="true"><ArrowUp className="h-4 w-4" /></div>}
                </React.Fragment>;
              })}
            </div>

            <aside className="space-y-4 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950 sm:p-5">
              <div className="flex items-start justify-between gap-3 border-b border-beige-200 pb-3 dark:border-stone-800"><div><p className="text-[13px] font-semibold uppercase tracking-wide text-stone-500 dark:text-zinc-400">Layer {selectedLayer.number} details</p><h4 className="mt-1 text-lg font-bold text-stone-900 dark:text-stone-100">{selectedLayer.name}</h4><ArabicText className="text-sm text-stone-600 dark:text-zinc-400">{selectedLayer.nameAr}</ArabicText></div><span className="rounded-xl bg-white p-2 text-stone-700 dark:bg-stone-900 dark:text-zinc-300">{React.createElement(selectedLayer.icon, { className: 'h-5 w-5' })}</span></div>
              <div><p className="text-[13px] font-semibold uppercase tracking-wide text-stone-500 dark:text-zinc-400">Role</p><p className="mt-1 text-sm leading-relaxed text-stone-800 dark:text-stone-200">{selectedLayer.role}</p><ArabicText className="text-[13px] leading-relaxed text-stone-600 dark:text-zinc-400">{selectedLayer.roleAr}</ArabicText></div>
              <div className="border-t border-beige-200 pt-3 dark:border-stone-800"><p className="text-[13px] font-semibold uppercase tracking-wide text-stone-500 dark:text-zinc-400">Examples</p><p className="mt-1 text-sm text-stone-800 dark:text-stone-200">{selectedLayer.technologies}</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{selectedLayer.technologiesAr}</ArabicText></div>
              <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-3 dark:border-amber-800 dark:bg-amber-950/30"><p className="text-[13px] font-semibold text-amber-900 dark:text-amber-300">Key idea</p><p className="mt-1 text-sm text-stone-800 dark:text-stone-200">{selectedLayer.takeaway}</p><ArabicText className="text-[13px] text-stone-700 dark:text-zinc-300">{selectedLayer.takeawayAr}</ArabicText></div>
            </aside>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-950 p-4 text-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100" aria-live="polite">
            <p className="text-sm">{isPractical ? 'Practical implementation view: six blocks, from physical Things to Cloud Applications.' : 'Theoretical model: five layers, from Perception to Application.'}</p>
            <ArabicText className="text-sm text-zinc-300 dark:text-zinc-300">{isPractical ? 'منظور التنفيذ العملي: ست كتل من الأشياء المادية لتطبيقات السحابة.' : 'النموذج النظري: خمس طبقات من الإدراك للتطبيق.'}</ArabicText>
            <p className="mt-2 border-t border-stone-800 pt-2 text-[13px] text-zinc-400">The two diagrams organize responsibilities differently; their correspondence is approximate, not one-to-one.</p><ArabicText className="mt-1 text-[13px] text-zinc-400">الرسمان بيرتبوا المسؤوليات بشكل مختلف؛ والتقابل بينهم تقريبي مش واحد لواحد.</ArabicText>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <div><p className="text-sm font-semibold text-stone-900 dark:text-stone-100">Choose a transport protocol</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">اختار بروتوكول النقل اللي هتتابع رسائله</ArabicText></div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Transport protocol">
              {(['tcp', 'udp'] as const).map((mode) => <button key={mode} type="button" onClick={() => changeTransportMode(mode)} disabled={isTransportRunning} aria-pressed={transportMode === mode}
                className={'rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-50 ' + (transportMode === mode ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'border-beige-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300')}>{mode.toUpperCase()}</button>)}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950"><p className="text-sm font-bold text-stone-900 dark:text-stone-100">IoT node</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">العقدة المرسلة</ArabicText></div>
            <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950"><p className="text-sm font-bold text-stone-900 dark:text-stone-100">Server</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">الخادم المستقبِل</ArabicText></div>
          </div>

          <ol className="space-y-2" aria-label={transportMode === 'tcp' ? 'TCP message sequence' : 'UDP datagram sequence'}>
            {events.map((event, index) => {
              const sent = index < transportStep;
              const active = index === transportStep - 1 && (isTransportRunning || sent);
              return <li key={event.packet} className={'grid min-w-0 gap-2 rounded-2xl border p-3 sm:grid-cols-[minmax(0,0.7fr)_auto_minmax(0,1.3fr)] sm:items-center ' + (active ? 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30' : sent ? 'border-emerald-300 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20' : 'border-beige-300 bg-white dark:border-stone-800 dark:bg-stone-950')}>
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{event.from}</p><ArrowRight className="hidden h-4 w-4 text-stone-500 dark:text-zinc-400 sm:block" />
                <div className="min-w-0"><p className="break-words font-mono text-sm font-bold text-stone-900 dark:text-stone-100">{event.packet}</p><p className="mt-1 text-sm text-stone-700 dark:text-zinc-300">{event.note}</p><ArabicText className="text-[13px] text-stone-600 dark:text-zinc-400">{event.noteAr}</ArabicText><p className="mt-1 text-[13px] text-stone-500 dark:text-zinc-400">To: {event.to}</p></div>
              </li>;
            })}
          </ol>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button type="button" onClick={sendNextPacket} disabled={isTransportRunning || transportStep >= events.length} className="rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200">Next packet</button>
              <button type="button" onClick={runRemainingPackets} disabled={isTransportRunning || transportStep >= events.length} className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"><Play className="h-4 w-4" />Run remaining</button>
              <button type="button" onClick={resetTransport} title="Reset transport trace" aria-label="Reset transport trace" className="rounded-xl border border-beige-300 p-2 text-stone-700 dark:border-stone-700 dark:text-zinc-300"><RotateCcw className="h-4 w-4" /></button>
            </div>
            <p className="text-sm text-stone-600 dark:text-zinc-400">{transportStep} / {events.length} packets</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-950 p-4 text-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100" aria-live="polite">
            <p className="text-sm">{transportMessage.en}</p><ArabicText className="text-sm text-zinc-300 dark:text-zinc-300">{transportMessage.ar}</ArabicText>
            <div className="mt-3 grid gap-3 border-t border-stone-800 pt-3 sm:grid-cols-2"><div><p className="text-sm text-zinc-300 dark:text-zinc-300"><span className="font-semibold text-stone-100">TCP:</span> connection setup, ordered stream, and transport acknowledgements/retransmission support.</p><ArabicText className="text-[13px] text-zinc-400">إعداد اتصال وتدفق مرتب ودعم للإقرارات وإعادة الإرسال.</ArabicText></div><div><p className="text-sm text-zinc-300 dark:text-zinc-300"><span className="font-semibold text-stone-100">UDP:</span> datagrams without built-in delivery acknowledgement or retransmission.</p><ArabicText className="text-[13px] text-zinc-400">مخططات بيانات من غير إقرار تسليم أو إعادة إرسال مدمجين.</ArabicText></div></div>
            <p className="mt-2 text-[13px] text-zinc-400 dark:text-zinc-400">UDP checksums can detect corruption. Neither TCP nor UDP encrypts traffic by itself; application protocols can add security or reliability.</p><ArabicText className="mt-1 text-[13px] text-zinc-400">Checksum في UDP ممكن يكتشف التلف. ولا TCP ولا UDP بيشفّروا الاتصال لوحدهم؛ والتطبيق ممكن يضيف الأمان أو الاعتمادية.</ArabicText>
          </div>
        </div>
      )}
    </section>
  );
};

export default IotStackArchitectureLab;

import React, { useEffect, useRef, useState } from 'react';
import { Layers, Send, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabWorkbench, type WorkbenchNode, type WorkbenchLink } from './LabWorkbench';

interface LayerInfo {
  number: number;
  name: string;
  nameAr: string;
  tcpLayer: string;
  pdu: string;
  pduShort: string;
  protocols: string[];
  keyFunction: string;
  explanationAr: string;
  devices: string[];
  sampleHeader: string;
}

const OSI_LAYERS: LayerInfo[] = [
  {
    number: 7,
    name: 'Application Layer',
    nameAr: 'طبقة التطبيقات',
    tcpLayer: 'Application Layer',
    pdu: 'Data',
    pduShort: 'Data',
    protocols: ['HTTP', 'HTTPS', 'DNS', 'SMTP', 'FTP', 'SSH'],
    keyFunction: 'Provides network services directly to end-user software applications and user interfaces.',
    explanationAr: 'بتوفّر خدمات الشبكة مباشرةً لبرامج المستخدم وواجهاتها.',
    devices: ['متصفحات الويب (Web Browsers)', 'برامج البريد (Email Clients)'],
    sampleHeader: 'HTTP GET /index.html HTTP/1.1',
  },
  {
    number: 6,
    name: 'Presentation Layer',
    nameAr: 'طبقة التقديم',
    tcpLayer: 'Application Layer',
    pdu: 'Data',
    pduShort: 'Data',
    protocols: ['SSL/TLS', 'JPEG', 'MPEG', 'ASCII', 'GIF'],
    keyFunction: 'Handles data encryption, compression, syntax translation, and standard formatting.',
    explanationAr: 'بتتعامل مع تشفير البيانات وضغطها، وتحويل صيغتها وتنسيقها بشكل موحّد.',
    devices: ['مكتبات التشفير في نظام التشغيل (OS Crypto Libraries)'],
    sampleHeader: 'TLS 1.3 Handshake / Encrypted Payload',
  },
  {
    number: 5,
    name: 'Session Layer',
    nameAr: 'طبقة الجلسة',
    tcpLayer: 'Application Layer',
    pdu: 'Data',
    pduShort: 'Data',
    protocols: ['NetBIOS', 'RPC', 'PPTP', 'Sockets'],
    keyFunction: 'Establishes, manages, synchronizes, and terminates communication dialogues between applications.',
    explanationAr: 'بتفتح جلسات التواصل بين التطبيقات، وبتديرها وتنسّقها وتقفلها.',
    devices: ['نظام إدارة الجلسات (OS Session Subsystem)'],
    sampleHeader: 'Session ID: #849204A - Sync Point 1',
  },
  {
    number: 4,
    name: 'Transport Layer',
    nameAr: 'طبقة النقل',
    tcpLayer: 'Transport Layer',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    pduShort: 'Segment / Datagram',
    protocols: ['TCP', 'UDP'],
    keyFunction: 'Handles end-to-end communication, port addressing, segmentation, flow control, and error recovery.',
    explanationAr: 'بتتعامل مع التواصل من طرف لطرف، وعناوين الـ Port، وتقسيم البيانات، والتحكّم في التدفق والتعافي من الأخطاء.',
    devices: ['جدران الحماية (L4 Firewalls)', 'حزمة بروتوكولات النظام (OS Protocol Stack)'],
    sampleHeader: 'Src Port: 54321 | Dst Port: 443 | Seq: 101',
  },
  {
    number: 3,
    name: 'Network Layer',
    nameAr: 'طبقة الشبكة',
    tcpLayer: 'Internet Layer',
    pdu: 'Packet',
    pduShort: 'Packet',
    protocols: ['IPv4', 'IPv6', 'ICMP', 'OSPF', 'BGP'],
    keyFunction: 'Performs logical addressing (IP addresses) and routes packets across different networks along the optimal path.',
    explanationAr: 'بتستخدم عناوين منطقية زي الـ IP، وبتوجّه الـ Packets بين شبكات مختلفة حسب أفضل مسار.',
    devices: ['الـ Router', 'الـ Layer 3 Switch'],
    sampleHeader: 'Src IP: 192.168.1.50 | Dst IP: 93.184.216.34 | TTL: 64',
  },
  {
    number: 2,
    name: 'Data Link Layer',
    nameAr: 'طبقة ربط البيانات',
    tcpLayer: 'Network Access Layer',
    pdu: 'Frame',
    pduShort: 'Frame',
    protocols: ['Ethernet (802.3)', 'Wi-Fi (802.11)', 'ARP', 'PPP'],
    keyFunction: 'Provides node-to-node delivery with physical (MAC) addressing, media access control (LLC and MAC sublayers), and frame error detection (FCS).',
    explanationAr: 'بتوصّل البيانات من عقدة لعقدة بعناوين الـ MAC، وبتنظّم الوصول لوسط النقل من خلال الـ LLC والـ MAC، وبتكشف أخطاء الـ Frame باستخدام الـ FCS.',
    devices: ['الـ Switch', 'الـ Bridge', 'كارت الشبكة (NIC)'],
    sampleHeader: 'Src MAC: AA:BB:CC:11:22:33 | Dst MAC: DE:EE:FF:44:55:66 | FCS',
  },
  {
    number: 1,
    name: 'Physical Layer',
    nameAr: 'الطبقة الفيزيائية',
    tcpLayer: 'Network Access Layer',
    pdu: 'Bits',
    pduShort: 'Bits',
    protocols: ['1000BASE-T', 'Fiber Optic', 'Radio Frequencies', 'DSL'],
    keyFunction: 'Transmits raw unstructured bit streams over physical transmission media (cables or radio waves).',
    explanationAr: 'بتنقل تدفّق الـ Bits الخام من غير بنية محددة على وسائط النقل الفعلية، زي الكابلات أو موجات الراديو.',
    devices: ['الـ Hub', 'الـ Repeater', 'الكابلات والهوائيات (Cables and Antennas)'],
    sampleHeader: '01001000 01100101 01101100 01101100 01101111',
  },
];

// First letters map to layers 7 → 1.
const MNEMONIC = ['All', 'People', 'Seem', 'To', 'Need', 'Data', 'Processing'];

const STEP_MS = 750;
const TRACE_STEPS = [
  ...[7, 6, 5, 4, 3, 2, 1].map(layer => ({ layer, direction: 'down' as const })),
  ...[1, 2, 3, 4, 5, 6, 7].map(layer => ({ layer, direction: 'up' as const })),
];
const control = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-beige-300 bg-white px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-[#FAF7F2] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-zinc-300 dark:hover:bg-stone-800 dark:focus-visible:ring-amber-400';

export const OsiTcpVisualizer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(7);
  const [isSimulating, setIsSimulating] = useState(false);
  const [traceIndex, setTraceIndex] = useState(-1);
  const trace = TRACE_STEPS[traceIndex];
  const simStage = trace?.layer ?? null;
  const direction = trace?.direction ?? 'down';
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const currentLayer = OSI_LAYERS.find(l => l.number === selectedLayer) || OSI_LAYERS[0];
  const tracedLayer = OSI_LAYERS.find(l => l.number === simStage);
  const complete = traceIndex === TRACE_STEPS.length - 1;

  const applyStep = (index: number) => {
    setTraceIndex(index);
    setSelectedLayer(TRACE_STEPS[index].layer);
  };
  const pauseTrace = () => {
    clearTimers();
    setIsSimulating(false);
  };
  const resetTrace = () => {
    pauseTrace();
    setTraceIndex(-1);
    setSelectedLayer(7);
  };
  const stepTrace = () => {
    if (isSimulating || complete) return;
    applyStep(traceIndex + 1);
  };

  const runSimulation = () => {
    if (isSimulating) return;
    clearTimers();
    const start = complete ? 0 : traceIndex + 1;
    applyStep(start);
    if (start === TRACE_STEPS.length - 1) return;
    setIsSimulating(true);
    let delay = 0;
    TRACE_STEPS.slice(start + 1).forEach((_, offset) => {
      const index = start + offset + 1;
      delay += STEP_MS + (index === 7 ? 500 : 0);
      timers.current.push(window.setTimeout(() => {
        applyStep(index);
        if (index === TRACE_STEPS.length - 1) {
          clearTimers();
          setIsSimulating(false);
        }
      }, delay));
    });
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                OSI &amp; TCP/IP Reference Model Explorer
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                شوف طبقات الـ OSI وإزاي البيانات بتتغلّف (Encapsulation) خطوة بخطوة
              </ArabicText>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Packet trace controls">
          <button type="button" onClick={isSimulating ? pauseTrace : runSimulation}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white dark:focus-visible:ring-amber-400">
            {isSimulating ? <Pause className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {isSimulating ? 'Pause trace' : complete ? 'Replay trace' : traceIndex >= 0 ? 'Resume trace' : 'Live Packet Trace'}
          </button>
          <button type="button" onClick={stepTrace} disabled={isSimulating || complete} className={control}>
            <SkipForward className="h-4 w-4" />Step trace
          </button>
          <button type="button" onClick={resetTrace} className={control} aria-label="Reset packet trace">
            <RotateCcw className="h-4 w-4" />Reset
          </button>
        </div>
      </div>

      <div aria-live="polite" data-testid="osi-trace-status" className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          {tracedLayer ? `Step ${traceIndex + 1} of ${TRACE_STEPS.length} · ${direction === 'down' ? 'Sender · Encapsulation' : 'Receiver · Decapsulation'} · Layer ${simStage} · ${tracedLayer.pduShort}${complete ? ' · Complete' : isSimulating ? ' · Playing' : ' · Paused'}` : 'Trace ready. Step through sender layers 7 → 1, then receiver layers 1 → 7, or play automatically.'}
        </p>
        <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">
          {tracedLayer ? `الخطوة ${traceIndex + 1} من ${TRACE_STEPS.length} · ${direction === 'down' ? 'الراسل · التغليف' : 'المستقبل · فك التغليف'} · الطبقة ${simStage} · ${tracedLayer.pduShort}${complete ? ' · اكتمل' : isSimulating ? ' · شغّال' : ' · متوقّف مؤقتًا'}` : 'التتبّع جاهز. امشي في طبقات الراسل من 7 لـ 1، وبعدها طبقات المستقبل من 1 لـ 7، أو شغّل العرض تلقائيًا.'}
        </ArabicText>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Layer Stack */}
        <div className="lg:col-span-5 min-w-0">
<LabWorkbench title="OSI · exploded stack" motionKey={`${direction}-${simStage}`}
 selectedId={String(selectedLayer)} onSelect={(id) => setSelectedLayer(Number(id))}
 nodes={OSI_LAYERS.map<WorkbenchNode>((layer, i) => ({ id: String(layer.number), label: `L${layer.number} · ${layer.name.replace(' Layer', '')}`, sceneLabel: `Layer ${layer.number}`, showValue: false, labelOnSelect: true, kind: 'layer', position: [(i - 3) * .16, (6 - i) * .65, (i - 3) * .22], value: layer.pduShort, tone: selectedLayer === layer.number ? 'active' : 'neutral', detail: layer.keyFunction, detailAr: layer.explanationAr, disabled: isSimulating }))}
 links={isSimulating && simStage !== null && (direction === 'down' ? simStage > 1 : simStage < 7) ? [{ id: 'pdu', from: String(simStage), to: String(direction === 'down' ? simStage - 1 : simStage + 1), tone: 'active', moving: true }] : []}
>
<div className="lg:col-span-5 space-y-2.5">
          <div className="flex flex-wrap justify-between gap-x-3 text-sm text-stone-600 dark:text-zinc-400 font-semibold px-1 mb-1">
            <ArabicText as="span" className="text-sm font-semibold">الطبقة (Layer)</ArabicText>
            <ArabicText as="span" className="text-sm font-semibold">وحدة البيانات (PDU)</ArabicText>
          </div>

          {OSI_LAYERS.map(layer => {
            const isSelected = selectedLayer === layer.number;
            const isSimulatingThis = simStage === layer.number;

            return (
              <button
                key={layer.number}
                onClick={() => setSelectedLayer(layer.number)}
                disabled={isSimulating}
                aria-pressed={isSelected}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-x-3 gap-y-2 relative overflow-hidden ${
                  isSelected
                    ? 'bg-beige-100 dark:bg-stone-800 border-amber-500/80 dark:border-amber-400 shadow-sm'
                    : 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-200 dark:border-stone-800/80 hover:bg-beige-50 dark:hover:bg-stone-850'
                }`}
              >
                {isSimulatingThis && (
                  <span className="absolute left-0 top-0 bottom-0 w-2.5 bg-amber-500 dark:bg-amber-400 motion-safe:animate-pulse" />
                )}

                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    isSelected
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-zinc-200'
                  }`}>
                    {layer.number}
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {layer.name}
                    </div>
                    <ArabicText as="span" className="text-xs font-semibold text-stone-600 dark:text-zinc-400">
                      {layer.nameAr}
                    </ArabicText>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded text-xs font-mono font-medium whitespace-nowrap bg-white dark:bg-stone-900 text-stone-800 dark:text-zinc-200 border border-beige-200 dark:border-stone-700">
                  {layer.pduShort}
                </span>
              </button>
            );
          })}
        </div>
</LabWorkbench>
</div>

        {/* Layer Details Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-beige-200 dark:border-stone-800 pb-3">
              <div className="min-w-0">
                <div>
                  <p className="text-xs font-bold text-stone-700 dark:text-zinc-300">Layer {currentLayer.number} · TCP/IP: {currentLayer.tcpLayer}</p>
                </div>
                <h4 data-testid="osi-selected-layer" className="pt-0.5 text-lg font-bold text-stone-900 dark:text-stone-100">{currentLayer.name}</h4>
                <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-400">{`${currentLayer.nameAr} · في الـ TCP/IP: ${currentLayer.tcpLayer}`}</ArabicText>
              </div>
              <span className="inline-flex flex-wrap items-center gap-x-2 px-3 py-1.5 rounded-xl text-sm bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 text-stone-900 dark:text-stone-100">
                <ArabicText as="span" className="text-xs font-bold">وحدة البيانات (PDU):</ArabicText>
                <span className="font-mono font-bold">{currentLayer.pdu}</span>
              </span>
            </div>

            <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-beige-200 dark:border-stone-800 space-y-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-xs font-bold text-stone-600 dark:text-zinc-400">Layer function</span>
                <ArabicText as="span" className="text-xs font-bold text-stone-600 dark:text-zinc-400">وظيفة الطبقة</ArabicText>
              </div>
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                {currentLayer.keyFunction}
              </p>
              <div className="border-t border-beige-200 dark:border-stone-800 pt-2">
                <ArabicText className="text-sm text-stone-700 dark:text-zinc-300 font-medium">
                  {currentLayer.explanationAr}
                </ArabicText>
              </div>
            </div>

            {/* Protocols & Hardware Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-beige-200 dark:border-stone-800 space-y-2">
                <div>
                  <ArabicText as="span" className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                    بروتوكولات الطبقة (Protocols)
                  </ArabicText>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentLayer.protocols.map(p => (
                    <span key={p} className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-beige-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-beige-200 dark:border-stone-800 space-y-2">
                <div>
                  <ArabicText as="span" className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                    الأجهزة والعناصر العاملة هنا (Devices)
                  </ArabicText>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentLayer.devices.map(d => (
                    <ArabicText
                      as="span"
                      key={d}
                      className="px-2.5 py-0.5 rounded text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 font-medium"
                    >
                      {d}
                    </ArabicText>
                  ))}
                </div>
              </div>
            </div>

            {/* Header Trace */}
            <div className="bg-stone-900 dark:bg-stone-950 text-stone-100 dark:text-stone-100 p-4 rounded-xl text-sm space-y-1.5 border border-stone-800 dark:border-stone-700">
              <div className="flex flex-wrap justify-between gap-x-3 text-xs text-zinc-400 dark:text-zinc-400">
                <span>Illustrative layer example</span>
                <span className="text-amber-400 dark:text-amber-400 font-bold font-mono">PDU: {currentLayer.pduShort}</span>
              </div>
              <ArabicText className="text-xs text-zinc-400 dark:text-zinc-400">مثال توضيحي للطبقة</ArabicText>
              <code dir="ltr" className="font-mono text-amber-300 dark:text-amber-300 block text-sm pt-1 whitespace-pre-wrap break-words">
                {currentLayer.sampleHeader}
              </code>
            </div>
          </div>

          {/* Quick Memory Aid in Egyptian */}
          <div className="p-4 rounded-2xl bg-beige-100 dark:bg-stone-800/80 border border-beige-300 dark:border-stone-700 text-sm text-stone-800 dark:text-zinc-200 flex items-start gap-3">
            <span className="text-xl" aria-hidden="true">💡</span>
            <div className="min-w-0 space-y-2">
              <p className="text-sm">Memory cue: All People Seem To Need Data Processing. Each word's first letter names an OSI layer, in order from 7 to 1.</p>
              <ArabicText className="text-sm text-stone-800 dark:text-zinc-200">
                زتونة الحفظ: احفظ جملة All People Seem To Need Data Processing. أول حرف من كل كلمة بيمثّل طبقة من الـ OSI بالترتيب من 7 لـ 1.
              </ArabicText>
              <div dir="ltr" className="flex flex-wrap gap-1.5 font-mono text-xs">
                {MNEMONIC.map((word, i) => {
                  const layerNo = 7 - i;
                  const active = layerNo === selectedLayer;
                  return (
                    <span
                      key={word}
                      className={`px-2 py-1 rounded-lg border ${
                        active
                          ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200'
                          : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-700 text-stone-700 dark:text-zinc-300'
                      }`}
                    >
                      <b>{word[0]}</b>{word.slice(1)} · L{layerNo}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
        <p className="text-sm text-stone-700 dark:text-zinc-300">Teaching model: one stack represents the sender and then the receiver. The layer examples are separate illustrations, not a captured packet or seven literal headers. In TCP/IP, several upper-layer functions live within applications.</p>
        <ArabicText className="mt-1 text-sm text-stone-600 dark:text-zinc-400">نموذج تعليمي: نفس الطبقات بتمثّل الراسل وبعده المستقبل. أمثلة الطبقات توضيحات منفصلة، مش حزمة متسجّلة أو سبع ترويسات فعلية. في الـ TCP/IP، وظائف كتير من الطبقات العليا بتشتغل جوّه التطبيقات.</ArabicText>
      </div>
    </div>
  );
};

export default OsiTcpVisualizer;

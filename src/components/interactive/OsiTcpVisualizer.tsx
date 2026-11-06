import React, { useEffect, useRef, useState } from 'react';
import { Layers, Send, RefreshCw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

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
    explanationAr: 'دي الطبقة اللي إنت بتتعامل معاها بإيدك: المتصفح أو تطبيق الشات. بتكتب الرسالة أو بتفتح الصفحة وتدوس إرسال، والطبقة دي هي اللي بتطلب الخدمة من الشبكة.',
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
    explanationAr: 'المترجم والمشفّر بتاع الشبكة؛ بياخد بياناتك ويشفّرها بـ TLS ويضغطها عشان حجمها يصغر، ويتأكد إن محدش يتجسس عليها في السكة.',
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
    explanationAr: 'مسؤول الاتصال؛ بيفتح جلسة (Session) بين جهازك والسيرفر، ويفضل يراقب الاتصال لو لسه شغال، ويقفله لما تخلّص.',
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
    explanationAr: 'شركة الشحن؛ بتقطّع الملف الكبير لحتت صغيرة (Segments)، وتحط رقم الباب (Port) على كل حتة. مع TCP بتتأكد إن مفيش حتة تاهت، ومع UDP بتبعت من غير ضمان.',
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
    explanationAr: 'البوسطجي والـ GPS في نفس الوقت (الراوتر)؛ بيحط عنوان الـ IP بتاع المرسل والمستقبل على الحزمة (Packet)، ويختار أحسن سكة توصّل بيها.',
    devices: ['الراوتر (Router)', 'سويتش الطبقة 3 (Layer 3 Switch)'],
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
    explanationAr: 'كارت الشبكة والسويتش المحلي؛ بيغلّف الحزمة في ظرف اسمه إطار (Frame)، ويحط عليه عنوان الـ MAC للمرسل والمستقبل وكود فحص الأخطاء (FCS).',
    devices: ['السويتش (Switch)', 'الجسر (Bridge)', 'كارت الشبكة (NIC)'],
    sampleHeader: 'Src MAC: AA:BB:CC:11:22:33 | Dst MAC: DD:EE:FF:44:55:66 | FCS',
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
    explanationAr: 'السلك نفسه أو موجات الواي فاي؛ بياخد الإطار ويحوّله لنبضات كهرباء أو إشارات ضوء في الفايبر (أصفار وواحدات 0101) بتجري في السلك.',
    devices: ['الهب (Hub)', 'الريبيتر (Repeater)', 'الكابلات والهوائيات (Cables and Antennas)'],
    sampleHeader: '01001000 01100101 01101100 01101100 01101111',
  },
];

// First letters map to layers 7 → 1.
const MNEMONIC = ['All', 'People', 'Seem', 'To', 'Need', 'Data', 'Processing'];

const STEP_MS = 750;

export const OsiTcpVisualizer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(7);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStage, setSimStage] = useState<number | null>(null);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const currentLayer = OSI_LAYERS.find(l => l.number === selectedLayer) || OSI_LAYERS[0];

  const runSimulation = () => {
    if (isSimulating) return;
    clearTimers();
    setIsSimulating(true);

    const schedule = (fn: () => void, delay: number) => {
      timers.current.push(window.setTimeout(fn, delay));
    };
    const downSteps = [7, 6, 5, 4, 3, 2, 1];
    const upSteps = [1, 2, 3, 4, 5, 6, 7];
    const upStart = downSteps.length * STEP_MS + 500;

    downSteps.forEach((num, idx) => {
      schedule(() => {
        setDirection('down');
        setSimStage(num);
        setSelectedLayer(num);
      }, idx * STEP_MS);
    });
    upSteps.forEach((num, idx) => {
      schedule(() => {
        setDirection('up');
        setSimStage(num);
        setSelectedLayer(num);
      }, upStart + idx * STEP_MS);
    });
    schedule(() => {
      setIsSimulating(false);
      setSimStage(null);
    }, upStart + (upSteps.length - 1) * STEP_MS + 800);
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

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-sm font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
              <span dir="rtl" className="font-arabic">
                {direction === 'down' ? 'جاري التغليف (Encapsulation) ⬇️' : 'جاري فك التغليف (Decapsulation) ⬆️'}
              </span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span dir="rtl" className="font-arabic">ابعت حزمة وتتبّعها (Live Packet Trace)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Layer Stack */}
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
                aria-pressed={isSelected}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-x-3 gap-y-2 relative overflow-hidden ${
                  isSelected
                    ? 'bg-beige-100 dark:bg-stone-800 border-amber-500/80 dark:border-amber-400 shadow-sm'
                    : 'bg-[#FAF7F2] dark:bg-stone-950 border-beige-200 dark:border-stone-800/80 hover:bg-beige-50 dark:hover:bg-stone-850'
                }`}
              >
                {isSimulatingThis && (
                  <span className="absolute left-0 top-0 bottom-0 w-2.5 bg-amber-500 dark:bg-amber-400 animate-pulse" />
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

        {/* Layer Details Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-beige-200 dark:border-stone-800 pb-3">
              <div className="min-w-0">
                <div>
                  <ArabicText as="span" className="text-xs font-bold text-stone-700 dark:text-zinc-300">
                    {`الطبقة ${currentLayer.number} • في نموذج TCP/IP: ${currentLayer.tcpLayer}`}
                  </ArabicText>
                </div>
                <h4 className="pt-0.5">
                  <ArabicText as="span" className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    {`${currentLayer.nameAr} (${currentLayer.name})`}
                  </ArabicText>
                </h4>
              </div>
              <span className="inline-flex flex-wrap items-center gap-x-2 px-3 py-1.5 rounded-xl text-sm bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 text-stone-900 dark:text-stone-100">
                <ArabicText as="span" className="text-xs font-bold">وحدة البيانات (PDU):</ArabicText>
                <span className="font-mono font-bold">{currentLayer.pdu}</span>
              </span>
            </div>

            {/* Simplified Explanation Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-700/60 space-y-1.5">
              <span dir="rtl" className="font-arabic text-xs font-bold text-amber-900 dark:text-amber-300 block">
                💡 الفكرة ببساطة:
              </span>
              <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 font-medium">
                {currentLayer.explanationAr}
              </ArabicText>
            </div>

            {/* Formal Academic Function */}
            <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-beige-200 dark:border-stone-800 space-y-1">
              <div>
                <ArabicText as="span" className="text-xs font-bold text-stone-600 dark:text-zinc-400">
                  التعريف الأكاديمي (Academic Definition)
                </ArabicText>
              </div>
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                {currentLayer.keyFunction}
              </p>
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
            <div className="bg-stone-900 text-stone-100 p-4 rounded-xl text-sm space-y-1.5 border border-stone-800">
              <div className="flex flex-wrap justify-between gap-x-3 text-xs text-zinc-400">
                <span dir="rtl" className="font-arabic">شكل الترويسة المضافة (Header Stacking):</span>
                <span className="text-amber-400 font-bold font-mono">PDU: {currentLayer.pduShort}</span>
              </div>
              <code className="font-mono text-amber-300 block text-sm pt-1 whitespace-pre-wrap break-words">
                {currentLayer.sampleHeader}
              </code>
            </div>
          </div>

          {/* Quick Memory Aid in Egyptian */}
          <div className="p-4 rounded-2xl bg-beige-100 dark:bg-stone-800/80 border border-beige-300 dark:border-stone-700 text-sm text-stone-800 dark:text-zinc-200 flex items-start gap-3">
            <span className="text-xl" aria-hidden="true">💡</span>
            <div className="min-w-0 space-y-2">
              <ArabicText className="text-sm text-stone-800 dark:text-zinc-200">
                <strong>زتونة الحفظ للامتحان:</strong> احفظ جملة All People Seem To Need Data Processing، أول حرف من كل كلمة بيمثّل طبقة بالترتيب من 7 لـ 1!
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
    </div>
  );
};

export default OsiTcpVisualizer;

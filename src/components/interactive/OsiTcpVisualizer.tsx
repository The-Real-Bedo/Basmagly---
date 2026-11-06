import React, { useState } from 'react';
import { Layers, Send, RefreshCw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

interface LayerInfo {
  number: number;
  name: string;
  nameAr: string;
  tcpLayer: string;
  pdu: string;
  protocols: string[];
  keyFunction: string;
  egyptianSlang: string;
  devices: string[];
  sampleHeader: string;
}

const OSI_LAYERS: LayerInfo[] = [
  {
    number: 7,
    name: 'Application Layer',
    nameAr: 'طبقة التطبيقات',
    tcpLayer: 'Application Layer',
    pdu: 'Data (Data Stream)',
    protocols: ['HTTP', 'HTTPS', 'DNS', 'SMTP', 'FTP', 'SSH'],
    keyFunction: 'Provides network services directly to end-user software applications and user interfaces.',
    egyptianSlang: 'دي الواجهة اللي انت بتتعامل معاها مباشرة في المتصفح أو تطبيق الشات، بتكتب البوست أو الرسالة وتضغط إرسال.',
    devices: ['Web Browsers', 'Email Clients'],
    sampleHeader: 'HTTP GET /index.html HTTP/1.1'
  },
  {
    number: 6,
    name: 'Presentation Layer',
    nameAr: 'طبقة التقديم',
    tcpLayer: 'Application Layer',
    pdu: 'Data',
    protocols: ['SSL/TLS', 'JPEG', 'MPEG', 'ASCII', 'GIF'],
    keyFunction: 'Handles data encryption, compression, syntax translation, and standard formatting.',
    egyptianSlang: 'المترجم والمشفر بتاع الشبكة؛ بياخد كلامك يشفره بـ TLS ويضغطه عشان الحجم يصغر ويضمن محدش يتجسس عليه في السكة.',
    devices: ['OS Cryptographic Libraries'],
    sampleHeader: 'TLS 1.3 Handshake / Encrypted Payload'
  },
  {
    number: 5,
    name: 'Session Layer',
    nameAr: 'طبقة الجلسة',
    tcpLayer: 'Application Layer',
    pdu: 'Data',
    protocols: ['NetBIOS', 'RPC', 'PPTP', 'Sockets'],
    keyFunction: 'Establishes, manages, synchronizes, and terminates communication dialogues between applications.',
    egyptianSlang: 'مسؤول الاتصال؛ بيفتح الخط (Session) بين جهازك والسيرفر، ويفضل متابع الاتصال شغال ولا فصل، ويقفله لما تخلص تحميل.',
    devices: ['OS Session Subsystem'],
    sampleHeader: 'Session ID: #849204A - Sync Point 1'
  },
  {
    number: 4,
    name: 'Transport Layer',
    nameAr: 'طبقة النقل',
    tcpLayer: 'Transport Layer',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    protocols: ['TCP', 'UDP'],
    keyFunction: 'Handles end-to-end communication, port addressing, segmentation, flow control, and error recovery.',
    egyptianSlang: 'شركة الشحن والتوصيل؛ بتقطع الملف الكبير لحتت صغيرة (Segments) وتحط رقم الباب (Port) وتتأكد إن مفيش حتة تاهت أو وقعت.',
    devices: ['Transport Layer Firewalls', 'OS Protocol Stack'],
    sampleHeader: 'Src Port: 54321 | Dst Port: 443 | Seq: 101'
  },
  {
    number: 3,
    name: 'Network Layer',
    nameAr: 'طبقة الشبكة',
    tcpLayer: 'Internet Layer',
    pdu: 'Packet (حزمة)',
    protocols: ['IPv4', 'IPv6', 'ICMP', 'OSPF', 'BGP'],
    keyFunction: 'Performs logical addressing (IP addresses) and routes packets across different networks along the optimal path.',
    egyptianSlang: 'البوسطجي والـ GPS الذكي (الراوتر)؛ بيلزق عنوان الـ IP بتاع الراسل والمستقبل، ويختار أسرع وأقصر سكة توصل الحزمة.',
    devices: ['Routers (الموجهات)', 'Layer 3 Switches'],
    sampleHeader: 'Src IP: 192.168.1.50 | Dst IP: 93.184.216.34 | TTL: 64'
  },
  {
    number: 2,
    name: 'Data Link Layer',
    nameAr: 'طبقة ربط البيانات',
    tcpLayer: 'Network Access Layer',
    pdu: 'Frame (إطار)',
    protocols: ['Ethernet (802.3)', 'Wi-Fi (802.11)', 'ARP', 'PPP'],
    keyFunction: 'Provides physical addressing (MAC), media access control (LLC & MAC), and frame error checking (FCS).',
    egyptianSlang: 'كارت اللان والسويتش المحلي؛ بيغلف الحزمة في ظرف اسمه إطار (Frame) ويحط عنوان الماك الفيزيائي (MAC) وكود فحص الأخطاء.',
    devices: ['Switches (المبدلات)', 'Bridges', 'NIC Network Cards'],
    sampleHeader: 'Src MAC: AA:BB:CC:11:22:33 | Dst MAC: DD:EE:FF:44:55:66 | FCS'
  },
  {
    number: 1,
    name: 'Physical Layer',
    nameAr: 'الطبقة الفيزيائية',
    tcpLayer: 'Network Access Layer',
    pdu: 'Bits (0s & 1s)',
    protocols: ['1000BASE-T', 'Fiber Optic', 'Radio Frequencies', 'DSL'],
    keyFunction: 'Transmits raw unstructured bit streams over physical transmission media (cables or radio waves).',
    egyptianSlang: 'السلك نفسه أو موجات الواي فاي؛ بتاخد الظرف وتحوله لنبضات كهرباء أو فلاشات ضوء في الفايبر (وحايد وأصفار 0101) تجري في السلك.',
    devices: ['Hubs (المجمعات)', 'Repeaters', 'Cables & Antennas'],
    sampleHeader: '01001000 01100101 01101100 01101100 01101111'
  }
];

export const OsiTcpVisualizer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(7);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStage, setSimStage] = useState<number | null>(null);
  const [direction, setDirection] = useState<'down' | 'up'>('down');

  const currentLayer = OSI_LAYERS.find(l => l.number === selectedLayer) || OSI_LAYERS[0];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setDirection('down');

    const downSteps = [7, 6, 5, 4, 3, 2, 1];
    downSteps.forEach((num, idx) => {
      setTimeout(() => {
        setSimStage(num);
        setSelectedLayer(num);
      }, idx * 750);
    });

    setTimeout(() => {
      setDirection('up');
      const upSteps = [1, 2, 3, 4, 5, 6, 7];
      upSteps.forEach((num, idx) => {
        setTimeout(() => {
          setSimStage(num);
          setSelectedLayer(num);
          if (idx === upSteps.length - 1) {
            setTimeout(() => {
              setIsSimulating(false);
              setSimStage(null);
            }, 800);
          }
        }, idx * 750);
      });
    }, downSteps.length * 750 + 500);
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              OSI & TCP/IP Reference Model Explorer
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
              محاكي طبقات الـ OSI وتغليف البيانات (Encapsulation) خطوة بخطوة
            </ArabicText>
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-sm font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
              <span>{direction === 'down' ? 'جاري التغليف ⬇️ (Encapsulation)' : 'جاري فك التغليف ⬆️ (Decapsulation)'}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>إرسال حزمة بيانات (Live Packet Trace)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Layer Stack */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex justify-between text-sm text-stone-600 dark:text-zinc-400 font-semibold px-1 mb-1">
            <span>الطبقة في نموذج OSI</span>
            <span>وحدة البيانات (PDU)</span>
          </div>

          {OSI_LAYERS.map(layer => {
            const isSelected = selectedLayer === layer.number;
            const isSimulatingThis = simStage === layer.number;

            return (
              <button
                key={layer.number}
                onClick={() => setSelectedLayer(layer.number)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 relative overflow-hidden ${
                  isSelected
                    ? 'bg-beige-100 dark:bg-stone-800 border-amber-500/80 dark:border-amber-400 shadow-sm scale-[1.01]'
                    : 'bg-[#FAF8F5] dark:bg-stone-950 border-beige-200 dark:border-stone-800/80 hover:bg-beige-50 dark:hover:bg-stone-850'
                }`}
              >
                {isSimulatingThis && (
                  <span className="absolute left-0 top-0 bottom-0 w-2.5 bg-amber-500 animate-pulse" />
                )}

                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isSelected
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-zinc-200'
                  }`}>
                    {layer.number}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {layer.name}
                    </div>
                    <ArabicText as="span" className="text-xs font-semibold text-stone-600 dark:text-zinc-300">
                      {layer.nameAr}
                    </ArabicText>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded text-[13px] font-mono font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-zinc-200 border border-beige-200 dark:border-stone-700">
                    {layer.pdu.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Layer Details Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-beige-200 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[13px] font-mono font-bold text-stone-700 dark:text-zinc-300">
                  Layer {currentLayer.number} • TCP/IP: {currentLayer.tcpLayer}
                </span>
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-0.5">
                  {currentLayer.name} <span className="text-stone-600 dark:text-zinc-400 font-arabic text-sm font-normal">({currentLayer.nameAr})</span>
                </h4>
              </div>
              <span className="px-3 py-1.5 rounded-xl text-sm font-mono font-bold bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 text-stone-900 dark:text-stone-100">
                PDU: {currentLayer.pdu}
              </span>
            </div>

            {/* Simplified Explanation Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-700/60 space-y-1.5">
              <span className="text-[13px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider block font-mono">
                💡 الفكرة ببساطة:
              </span>
              <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 font-medium leading-[1.75]">
                {currentLayer.egyptianSlang}
              </ArabicText>
            </div>

            {/* Formal Academic Function */}
            <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-beige-200 dark:border-stone-800 space-y-1">
              <span className="text-[13px] font-bold text-stone-600 dark:text-zinc-400 uppercase tracking-wider block font-mono">
                Academic Definition:
              </span>
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                {currentLayer.keyFunction}
              </p>
            </div>

            {/* Protocols & Hardware Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-beige-200 dark:border-stone-800 space-y-2">
                <span className="font-bold text-stone-800 dark:text-stone-200 block text-sm">بروتوكولات الطبقة (Protocols)</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentLayer.protocols.map(p => (
                    <span key={p} className="px-2.5 py-1 rounded text-[13px] font-mono font-bold bg-beige-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-beige-200 dark:border-stone-800 space-y-2">
                <span className="font-bold text-stone-800 dark:text-stone-200 block text-sm">الأجهزة العاملة هنا (Devices)</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentLayer.devices.map(d => (
                    <span key={d} className="px-2.5 py-1 rounded text-[13px] bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Header Trace */}
            <div className="bg-stone-900 text-stone-100 p-4 rounded-xl font-mono text-sm space-y-1.5 border border-stone-800">
              <div className="flex justify-between text-[13px] text-zinc-400">
                <span>شكل الترويسة المضافة (Header Stacking):</span>
                <span className="text-amber-400 font-bold">PDU Unit</span>
              </div>
              <code className="text-amber-300 block text-sm pt-1">{currentLayer.sampleHeader}</code>
            </div>
          </div>

          {/* Quick Memory Aid in Egyptian */}
          <div className="p-4 rounded-2xl bg-beige-100 dark:bg-stone-800/80 border border-beige-300 dark:border-stone-700 text-sm text-stone-800 dark:text-zinc-200 flex items-center gap-3">
            <span className="text-xl">💡</span>
            <div className="leading-relaxed">
              <strong>زتونة الحفظ للامتحان: </strong>
              احفظ جملة <em>"All People Seem To Need Data Processing"</em> الحروف الأولى بترتيب الطبقات من 7 إلى 1!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OsiTcpVisualizer;

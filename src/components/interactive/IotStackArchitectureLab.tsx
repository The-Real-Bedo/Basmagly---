import React, { useEffect, useRef, useState } from 'react';
import { Layers, Play, RotateCcw, ArrowUp, CheckCircle2, ShieldCheck, Zap, Activity, Radio, Cpu, Database, Smartphone } from 'lucide-react';
import { ArabicText } from '../ArabicText';

type TabMode = 'layers' | 'transport';

interface LayerInfo {
  num: number;
  id: string;
  name: string;
  nameAr: string;
  icon: any;
  techs: string;
  techsAr: string;
  role: string;
  roleAr: string;
  examTrap: string;
  examTrapAr: string;
}

const IOT_LAYERS: LayerInfo[] = [
  {
    num: 5,
    id: 'app',
    name: 'Application Layer',
    nameAr: 'طبقة التطبيقات وواجهات المستخدم',
    icon: Smartphone,
    techs: 'Mobile Apps (iOS/Android), Web Dashboards, SCADA Alerts',
    techsAr: 'تطبيقات الموبايل، لوحات التحكم التفاعلية، شاشات الإنذار الصناعية',
    role: 'What users actually see and interact with. Presents real-time charts, notifications, and manual control overrides.',
    roleAr: 'الطبقة التي يراها المستخدم النهائي؛ تعرض الرسوم البيانية اللحظية وتدير الإشعارات وأزرار التحكم اليدوي.',
    examTrap: 'Always the top layer; does not handle device drivers or electrical interfaces directly.',
    examTrapAr: 'أعلى طبقة في المعمارية؛ لا تتعامل مع درايفرات الأجهزة أو الإشارات الكهربية مباشرة.'
  },
  {
    num: 4,
    id: 'middleware',
    name: 'Middleware / Platform Layer',
    nameAr: 'طبقة المنصة والوسيط (Middleware)',
    icon: Database,
    techs: 'MQTT Brokers (Mosquitto), AWS IoT Core, Azure IoT Hub, Google Cloud IoT',
    techsAr: 'وسطاء رسائل MQTT، منصات السحابة (AWS IoT, Azure IoT)',
    role: 'Connects heterogeneous devices to cloud backends. Handles message brokerage (publish/subscribe), device authentication, and telemetry ingestion.',
    roleAr: 'حلقة الوصل بين الأجهزة والسحابة؛ تدير وسيط الرسائل (MQTT) وترجمة البروتوكولات وتأمين تسجيل الأجهزة.',
    examTrap: 'Acts as the essential universal translator between embedded edge devices and cloud software applications.',
    examTrapAr: 'المترجم العالمي والوسيط الحيوي بين الأجهزة المدمجة وتطبيقات المستخدم السحابية.'
  },
  {
    num: 3,
    id: 'edge',
    name: 'Edge / Processing Layer',
    nameAr: 'طبقة معالجة الحافة (Edge Layer)',
    icon: Cpu,
    techs: 'Edge Gateways, Raspberry Pi 5, ESP32 Hub, Industrial PLCs',
    techsAr: 'البوابات الذكية (Gateways)، رازبيري باي، شرائح ESP32، وحواسب PLC',
    role: 'Intermediate hardware performing localized preprocessing, noise filtering, data aggregation, and millisecond safety emergency cutoffs.',
    roleAr: 'أجهزة وسيطة تقوم بتصفية القراءات وضغط البيانات وتنفيذ قرارات الأمان اللحظية في أجزاء من الثانية.',
    examTrap: 'Crucial for solving cloud latency and internet disconnection failures in mission-critical plants.',
    examTrapAr: 'الحل المعماري لمشكلة التأخير الزمني (Latency) واستمرارية العمل لو انقطع إنترنت السحابة.'
  },
  {
    num: 2,
    id: 'network',
    name: 'Network Layer (Communication)',
    nameAr: 'طبقة الاتصال والشبكة (Communication Layer)',
    icon: Radio,
    techs: 'Wi-Fi 6, BLE (Bluetooth Low Energy), Zigbee, LoRaWAN, NB-IoT, 5G',
    techsAr: 'واي فاي، بلوتوث موفر للطاقة (BLE)، زيجبي، لوراوان (LoRaWAN)، شبكات خلوية 5G',
    role: 'Transports serialized packets from edge nodes to cloud or local gateways. Emphasizes low-power wireless transmission over long ranges.',
    roleAr: 'نقل حزم البيانات من الشرائح الطرفية للبوابات؛ تركز على كفاءة استهلاك بطاريات الأجهزة والتغطية البعيدة.',
    examTrap: 'IoT network protocols must be lightweight; heavy desktop protocols drain battery-operated sensors in hours.',
    examTrapAr: 'بروتوكولات شبكات الـ IoT يجب أن تكون خفيفة جداً لأن البروتوكولات الثقيلة تفرغ بطارية الحساس في ساعات.'
  },
  {
    num: 1,
    id: 'perception',
    name: 'Perception Layer (Hardware)',
    nameAr: 'طبقة الإدراك الحسي (Perception / Hardware)',
    icon: Activity,
    techs: 'Temperature Sensors (DHT22), Gas Probes, Cameras, Vibration Accelerometers, Actuators',
    techsAr: 'حساسات الحرارة والرطوبة، حساسات الغاز، الكاميرات، حساسات الاهتزاز، والمشغلات (Actuators)',
    role: 'The physical foundation interfacing with the analog real world. Transducers detect ambient phenomena and convert them into digital telemetry.',
    roleAr: 'الطبقة الفيزيائية الدنيا التي تلمس الواقع الطبيعي؛ تلتقط المتغيرات الفيزيائية وتحولها لإشارات كهربية ورقمية.',
    examTrap: 'Contains BOTH input sensors AND output actuators; physical execution occurs at this hardware tier.',
    examTrapAr: 'تضم الحساسات (مدخلات) والمشغلات (مخرجات) معاً، والتنفيذ الحركي الفيزيائي يحدث في هذه الطبقة.'
  }
];

export const IotStackArchitectureLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabMode>('layers');
  
  // Mode 1: Layer Stepper
  const [activeLayerStep, setActiveLayerStep] = useState<number>(0);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(4); // Bottom layer (Perception) default
  
  // Mode 2: TCP vs UDP Handshake Simulator
  const [transportMode, setTransportMode] = useState<'tcp' | 'udp'>('tcp');
  const [transportStep, setTransportStep] = useState<number>(0);
  const [isTransportRunning, setIsTransportRunning] = useState<boolean>(false);
  const [transportLog, setTransportLog] = useState<string[]>([]);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Trace telemetry through 5 layers
  const runLayerTrace = () => {
    if (isTracing) return;
    clearAllTimers();
    setIsTracing(true);
    setActiveLayerStep(1); // Start at Perception (Layer 1)
    setSelectedLayerIndex(4); // Layer 1 in array is index 4

    const steps = [
      { step: 1, idx: 4, delay: 900 },
      { step: 2, idx: 3, delay: 1800 },
      { step: 3, idx: 2, delay: 2700 },
      { step: 4, idx: 1, delay: 3600 },
      { step: 5, idx: 0, delay: 4500 },
    ];

    steps.forEach(({ step, idx, delay }) => {
      const t = setTimeout(() => {
        setActiveLayerStep(step);
        setSelectedLayerIndex(idx);
        if (step === 5) {
          setIsTracing(false);
        }
      }, delay);
      timersRef.current.push(t);
    });
  };

  const resetLayerTrace = () => {
    clearAllTimers();
    setIsTracing(false);
    setActiveLayerStep(0);
    setSelectedLayerIndex(4);
  };

  // Run TCP vs UDP Transport Simulation
  const runTransportSim = () => {
    if (isTransportRunning) return;
    clearAllTimers();
    setIsTransportRunning(true);
    setTransportStep(1);
    setTransportLog([]);

    if (transportMode === 'tcp') {
      const logs = [
        'Client → Server: [SYN, seq=100] (طلب بدء مزامنة الاتصال)',
        'Server → Client: [SYN-ACK, seq=500, ack=101] (موافقة ومزامنة من الخادم)',
        'Client → Server: [ACK, ack=501] (تأكيد العميل واكتمال المصافحة الثلاثية 3-Way Handshake)',
        'Client → Server: [DATA, payload=1460 bytes] (إرسال قراءة الحساس المؤكدة)',
        'Server → Client: [ACK, ack=1561] (تأكيد استلام السيرفر للبيانات بنجاح بدون فقدان)'
      ];

      logs.forEach((logText, i) => {
        const t = setTimeout(() => {
          setTransportStep(i + 1);
          setTransportLog(prev => [...prev, logText]);
          if (i === logs.length - 1) {
            setIsTransportRunning(false);
          }
        }, (i + 1) * 750);
        timersRef.current.push(t);
      });
    } else {
      // UDP Mode
      const logs = [
        'Client → Server: [DATAGRAM 1, raw=38.4°C] (إرسال فوري بدون أي مصافحة مسبقة)',
        'Client → Server: [DATAGRAM 2, raw=38.6°C] (إرسال الحزمة الثانية فوراً لتوفير الطاقة)',
        'Client → Server: [DATAGRAM 3, raw=38.7°C] (لا يوجد انتظار لتأكيدات ACK ولا إعادة إرسال)'
      ];

      logs.forEach((logText, i) => {
        const t = setTimeout(() => {
          setTransportStep(i + 1);
          setTransportLog(prev => [...prev, logText]);
          if (i === logs.length - 1) {
            setIsTransportRunning(false);
          }
        }, (i + 1) * 600);
        timersRef.current.push(t);
      });
    }
  };

  const resetTransportSim = () => {
    clearAllTimers();
    setIsTransportRunning(false);
    setTransportStep(0);
    setTransportLog([]);
  };

  const selectedLayer = IOT_LAYERS[selectedLayerIndex];

  return (
    <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-200 dark:border-stone-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800/60 flex items-center justify-center text-amber-800 dark:text-amber-300 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              IoT 5-Layer Stack & Transport Flow Lab
            </h3>
            <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-400">
              معمل معمارية طبقات إنترنت الأشياء الخمس ومحاكاة بروتوكولات النقل
            </ArabicText>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-[#FAF7F2] dark:bg-stone-950 p-1.5 rounded-2xl border border-beige-300 dark:border-stone-800 shrink-0">
          <button
            onClick={() => { setActiveTab('layers'); clearAllTimers(); }}
            className={`px-3.5 py-1.5 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === 'layers'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900'
            }`}
          >
            طبقات الـ IoT الخمس (5 Layers)
          </button>
          <button
            onClick={() => { setActiveTab('transport'); clearAllTimers(); }}
            className={`px-3.5 py-1.5 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === 'transport'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900'
            }`}
          >
            صراع TCP مقابل UDP
          </button>
        </div>
      </div>

      {activeTab === 'layers' ? (
        /* Tab 1: 5-Layer Stack Architecture */
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7F2] dark:bg-stone-950 p-4 rounded-2xl border border-beige-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold text-stone-800 dark:text-zinc-200">
                محاكاة تتبع الحزمة من الحساس الفيزيائي إلى تطبيق الموبايل
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runLayerTrace}
                disabled={isTracing}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                <span>إطلاق رحلة الحزمة</span>
                <span className="font-mono text-[12px] opacity-80">(Trace Packet)</span>
              </button>
              <button
                onClick={resetLayerTrace}
                className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-zinc-300 transition-colors"
                title="إعادة ضبط"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Stack Layout: 2 Columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* The 5 Stack Blocks (Vertical Stack) */}
            <div className="lg:col-span-7 space-y-3">
              {IOT_LAYERS.map((layer, idx) => {
                const isSelected = selectedLayerIndex === idx;
                const isCurrentPacketHere = activeLayerStep === layer.num;
                const LayerIcon = layer.icon;

                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isCurrentPacketHere
                        ? 'bg-amber-100/90 dark:bg-amber-950/60 border-amber-500 shadow-md ring-2 ring-amber-400/40 scale-[1.01]'
                        : isSelected
                        ? 'bg-white dark:bg-stone-900 border-stone-800 dark:border-stone-200 shadow-sm'
                        : 'bg-white dark:bg-stone-900 border-beige-300 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm ${
                        isCurrentPacketHere
                          ? 'bg-amber-600 text-white animate-bounce'
                          : 'bg-beige-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700'
                      }`}>
                        0{layer.num}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <LayerIcon className="w-4 h-4 text-stone-600 dark:text-zinc-400" />
                          <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                            {layer.name}
                          </h4>
                        </div>
                        <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-400">
                          {layer.nameAr}
                        </ArabicText>
                      </div>
                    </div>

                    {isCurrentPacketHere && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[12px] font-bold font-mono flex items-center gap-1 shadow-sm shrink-0">
                        <ArrowUp className="w-3.5 h-3.5 animate-pulse" />
                        <span>PACKET HERE</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Layer Detail Inspector (Right Column) */}
            <div className="lg:col-span-5 bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-beige-200 dark:border-stone-800 pb-3">
                <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Layer 0{selectedLayer.num} Inspector
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[12px] font-mono font-bold bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-zinc-200">
                  {selectedLayer.id.toUpperCase()}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {selectedLayer.name}
                </h4>
                <ArabicText className="text-sm font-semibold text-stone-600 dark:text-zinc-300">
                  {selectedLayer.nameAr}
                </ArabicText>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-beige-200 dark:border-stone-800 space-y-1">
                  <span className="text-[12px] font-mono font-bold uppercase text-stone-500 dark:text-zinc-400 block">
                    Core Function · الوظيفة الأساسية
                  </span>
                  <p className="text-stone-800 dark:text-stone-200 leading-relaxed">{selectedLayer.role}</p>
                  <ArabicText className="text-stone-700 dark:text-zinc-300 text-[13px] pt-1 block">{selectedLayer.roleAr}</ArabicText>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-beige-200 dark:border-stone-800 space-y-1">
                  <span className="text-[12px] font-mono font-bold uppercase text-stone-500 dark:text-zinc-400 block">
                    Technologies & Protocols · التقنيات
                  </span>
                  <p className="font-mono text-[13px] font-semibold text-stone-900 dark:text-stone-100">{selectedLayer.techs}</p>
                  <ArabicText className="text-stone-700 dark:text-zinc-300 text-[13px] pt-1 block">{selectedLayer.techsAr}</ArabicText>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/50 space-y-1">
                  <span className="text-[12px] font-mono font-bold uppercase text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Exam High-Yield Trap · خد بالك في الامتحان
                  </span>
                  <p className="text-stone-900 dark:text-stone-100 text-[13px] font-medium leading-relaxed">{selectedLayer.examTrap}</p>
                  <ArabicText className="text-stone-800 dark:text-zinc-200 text-[13px] font-medium pt-1 block">{selectedLayer.examTrapAr}</ArabicText>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: TCP vs UDP Transport Simulator */
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FAF7F2] dark:bg-stone-950 p-4 rounded-2xl border border-beige-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-stone-700 dark:text-zinc-300">اختر البروتوكول:</span>
              <div className="inline-flex rounded-xl p-1 bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700">
                <button
                  onClick={() => { setTransportMode('tcp'); resetTransportSim(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                    transportMode === 'tcp'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900'
                  }`}
                >
                  TCP (Reliable 3-Way Handshake)
                </button>
                <button
                  onClick={() => { setTransportMode('udp'); resetTransportSim(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                    transportMode === 'udp'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900'
                  }`}
                >
                  UDP (Fast Connectionless)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runTransportSim}
                disabled={isTransportRunning}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                <span>محاكاة الإرسال</span>
                <span className="font-mono text-[12px] opacity-80">({transportMode.toUpperCase()})</span>
              </button>
              <button
                onClick={resetTransportSim}
                className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-zinc-300 transition-colors"
                title="إعادة ضبط"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Sequence Box */}
          <div className="p-6 rounded-3xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-beige-200 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {transportMode === 'tcp' ? 'مخطط تدفق مصافحة TCP (SYN / SYN-ACK / ACK)' : 'مخطط تدفق داتاجرام UDP بدون مصافحة'}
                </span>
              </div>
              <span className="text-[12px] font-mono text-stone-500 dark:text-zinc-400">
                Step {transportStep} / {transportMode === 'tcp' ? '5' : '3'}
              </span>
            </div>

            {/* Sequence Diagram Visualizer */}
            <div className="relative py-4 flex items-center justify-between px-8 sm:px-16 border border-dashed border-beige-300 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 min-h-[140px]">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 flex items-center justify-center font-bold text-stone-800 dark:text-zinc-200 mx-auto">
                  Client
                </div>
                <span className="text-[11px] font-mono text-stone-500 dark:text-zinc-400 block">IoT Node / Gateway</span>
              </div>

              <div className="flex-1 px-4 text-center space-y-2">
                {transportLog.length > 0 ? (
                  <div className="space-y-1.5 animate-fadeIn">
                    {transportLog.map((log, i) => (
                      <div
                        key={i}
                        className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg inline-block border ${
                          log.includes('SYN-ACK')
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                            : log.includes('ACK')
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-zinc-200 border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-stone-500 dark:text-zinc-400 italic">
                    اضغط على "محاكاة الإرسال" لبدء مراقبة تبادل الحزم عبر الشبكة
                  </span>
                )}
              </div>

              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 flex items-center justify-center font-bold text-stone-800 dark:text-zinc-200 mx-auto">
                  Server
                </div>
                <span className="text-[11px] font-mono text-stone-500 dark:text-zinc-400 block">Cloud Ingest Host</span>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border ${
                transportMode === 'tcp'
                  ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
                  : 'border-beige-200 dark:border-stone-800 bg-white dark:bg-stone-900'
              }`}>
                <h5 className="text-sm font-bold font-mono text-stone-900 dark:text-stone-100 mb-1">
                  TCP (Transmission Control Protocol)
                </h5>
                <ul className="text-[13px] space-y-1 text-stone-700 dark:text-zinc-300">
                  <li>• <strong>Connection-Oriented:</strong> 3-way handshake before 1 byte is sent.</li>
                  <li>• <strong>Reliable:</strong> Retransmits lost segments; sequence numbered.</li>
                  <li>• <strong>IoT Tradeoff:</strong> Heavy handshake drains sensor battery; ideal for firmware updates and critical commands.</li>
                </ul>
              </div>

              <div className={`p-4 rounded-2xl border ${
                transportMode === 'udp'
                  ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-beige-200 dark:border-stone-800 bg-white dark:bg-stone-900'
              }`}>
                <h5 className="text-sm font-bold font-mono text-stone-900 dark:text-stone-100 mb-1">
                  UDP (User Datagram Protocol)
                </h5>
                <ul className="text-[13px] space-y-1 text-stone-700 dark:text-zinc-300">
                  <li>• <strong>Connectionless:</strong> Blasts packets instantly without handshaking.</li>
                  <li>• <strong>Best-Effort:</strong> No ACKs, no retransmissions, zero delay.</li>
                  <li>• <strong>IoT Tradeoff:</strong> Conserves MCU power and bandwidth; ideal for high-frequency telemetry (temperature every 10ms).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IotStackArchitectureLab;

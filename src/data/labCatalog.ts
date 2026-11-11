import { Activity, Bot, Box, Boxes, Brain, CalendarDays, Compass, Cpu, Layers, MessageSquare, Monitor, Network, Radio, Route, Scissors, Search, Sliders, Waves, Wrench } from 'lucide-react';

export type LabCategory = 'networks' | 'ai' | 'iot' | 'windows' | 'signals';
const categoryNames: Record<LabCategory, [string, string]> = {
  networks: ['Networks', 'شبكات الحاسب'], ai: ['Artificial Intelligence', 'ذكاء اصطناعي'],
  iot: ['Internet of Things', 'إنترنت الأشياء'], windows: ['Windows Programming', 'برمجة النوافذ'],
  signals: ['Signal Processing', 'معالجة الإشارات'],
};

const entries = [
  ['ai-fuel', 'ai', 'ai-lec-1', 'ai', 'Data, Algorithms & Compute', 'محرّكات تقدّم الذكاء الاصطناعي', 'Change three resources and inspect the bottleneck.', Sliders],
  ['ai-history', 'ai', 'ai-lec-1', 'ai', 'AI History Explorer', 'رحلة الاكتشاف والانتكاس', 'Explore the milestones and the constraints behind them.', CalendarDays],
  ['ai-foundations', 'ai', 'ai-lec-1', 'ai', 'The Sciences Behind AI', 'ركّب منظومة من العلوم', 'Connect contributing disciplines to a working pipeline.', Layers],
  ['ai-approaches', 'ai', 'ai-lec-1', 'ai', 'Four Approaches Studio', 'أربع عدسات لنفس المشكلة', 'Compare thinking and acting against human and rational criteria.', Brain],
  ['turing-test', 'ai', 'ai-lec-1', 'ai', 'Turing Test & Its Limits', 'اختبار التقليد وحدوده', 'Compare scripted responses, then separate text from physical capabilities.', MessageSquare],
  ['ai-rationality', 'ai', 'ai-lec-1', 'ai', 'Rationality Under Uncertainty', 'قرار عقلاني ولا حظ؟', 'Choose a route before you know the outcome.', Compass],
  ['ai-perceptron', 'ai', 'ai-lec-1', 'ai', 'Perceptron & XOR Studio', 'شوف حدود الـ Perceptron', 'Move a decision boundary and train a single neuron on AND, OR and XOR.', Sliders],
  ['ai-eight-puzzle', 'ai', 'ai-lec-3', 'ai', '8-Puzzle Search Studio', 'حرّك البلاطات وشوف البحث', 'Make legal moves, check solvability and replay a shortest BFS solution.', Box],
  ['ai-search-states', 'ai', 'ai-lec-3', 'ai', 'States vs Search Nodes', 'نفس الحالة ومسارات مختلفة', 'Compare tree and graph search on cycles and repeated states.', Search],
  ['vacuum-world', 'ai', 'ai-lec-2', 'ai', 'Vacuum World & PEAS', 'المكنسة وإطار PEAS', 'Observe perception, action and performance in a small world.', Bot],
  ['vacuum-world-3d', 'ai', 'ai-lec-2', 'ai', '3D Vacuum World', 'عالم المكنسة ثلاثي الأبعاد', 'Step through a four-room reflex-agent world and see only what the agent perceives.', Box],
  ['agent-architecture', 'ai', 'ai-lec-2', 'ai', 'Agent Architecture', 'من الإدراك للفعل', 'Step through the agent loop and compare architectures.', Brain],
  ['search-visualizer', 'ai', 'ai-lec-4', 'ai', 'BFS, DFS & Uniform-Cost Search', 'خطوات البحث وجبهة الانتظار', 'Expand nodes and compare frontier order and path cost.', Search],
  ['bfs-queue-lab', 'ai', 'ai-lec-4', 'ai', 'BFS Queue & Level Explorer', 'طابور BFS والتنقل بالمستويات', 'Explore FIFO queue mechanics, level-by-level frontiers, and early goal testing.', Layers],
  ['dfs-stack-lab', 'ai', 'ai-lec-4', 'ai', 'DFS Stack & Backtracking Studio', 'مكدس DFS والتراجع للخلف', 'Trace LIFO call stack frames, dead-end backtracking, and linear memory consumption.', Route],
  ['ucs-priority-lab', 'ai', 'ai-lec-4', 'ai', 'Uniform-Cost 3D Cost Workbench', 'مختبر تكلفة المسار التراكمي ثلاثي الأبعاد', 'Inspect 3D path elevations, min-heap priority queue ordering, and edge relaxation.', Box],
  ['network-devices', 'networks', 'net-lec-1', 'networks', 'Network Devices & Collision Domains', 'الأجهزة ونطاقات التصادم', 'Send frames through a hub, switch or router.', Network],
  ['network-3d', 'networks', 'net-lec-1', 'networks', '3D Network Decision Lab', 'قرارات الشبكة في مشهد ثلاثي الأبعاد', 'Orbit a live network and trace forwarding, flooding, routing and collisions.', Box],
  ['topology-simulator', 'networks', 'net-lec-1', 'networks', 'Topology & Link Failure', 'الشبكات وقطع الوصلات', 'Break a link and watch the delivery path change.', Network],
  ['transmission-lab', 'networks', 'net-lec-1', 'networks', 'Unicast, Broadcast & Multicast', 'لواحد ولا للكل ولا لمجموعة؟', 'Choose recipients and trace a frame across the LAN.', Radio],
  ['packet-journey', 'networks', 'net-lec-2', 'networks', 'Hop-by-Hop Packet Journey', 'رحلة الحزمة وتغيير الـ MAC', 'Follow the frame across a routed network.', Route],
  ['osi-visualizer', 'networks', 'net-lec-2', 'networks', 'OSI & TCP/IP Encapsulation', 'الطبقات وتغليف البيانات', 'Build the PDU one layer at a time.', Layers],
  ['subnet-calculator', 'networks', 'net-lec-3', 'networks', 'IPv4 Subnet Workbench', 'حساب الشبكات خطوة بخطوة', 'Move the prefix and inspect the network and host bits.', Sliders],
  ['ipv6-compress', 'networks', 'net-lec-4', 'networks', 'IPv6 Compression Studio', 'قواعد ضغط العنوان خطوة بخطوة', 'Apply Rule 1 and Rule 2 and compare with the deck examples.', Scissors],
  ['eui-64-lab', 'networks', 'net-lec-4', 'networks', 'EUI-64 Interface ID Builder', 'من الـ MAC لـ Interface ID بخطوات', 'Split the MAC, insert FFFE and flip the U/L bit.', Cpu],
  ['ipv6-structure-3d', 'networks', 'net-lec-4', 'networks', '3D IPv6 Address Anatomy', 'تشريح العنوان العالمي ثلاثي الأبعاد', 'Inspect the /48, /16 and /64 parts of a global unicast address in 3D.', Boxes],
  ['edge-vs-cloud', 'iot', 'iot-lec-1', 'iot', 'Edge vs Cloud', 'قرار محلي ولا على الـ Cloud؟', 'Compare a local response with a remote decision.', Cpu],
  ['iot-simulator', 'iot', 'iot-lec-1', 'iot', 'IoT Sensor-to-Action Pipeline', 'من الحساس للتنفيذ', 'Change a sensor and trace data to an actuator.', Sliders],
  ['iot-stack-lab', 'iot', 'iot-lec-2', 'iot', 'IoT Stack & Transport', 'طبقات المنظومة والنقل', 'Follow telemetry through the layers and compare TCP with UDP.', Layers],
  ['windows-message-loop', 'windows-programming', 'win-lec-2', 'windows', 'Windows Message Loop', 'طابور الرسائل وتحديث النافذة', 'Post events, dispatch messages and update a mock window.', Monitor],
  ['event-driven-lab', 'windows-programming', 'win-lec-1', 'windows', 'Sequential vs Event-Driven', 'تنفيذ متسلسل ولا استجابة للأحداث؟', 'Compare how two programs respond to the same events.', Wrench],
  ['signal-sampling', 'signal-processing', 'signal-lec-1', 'signals', 'Sampling & Quantization', 'من موجة مستمرة لعينات', 'Control sample rate and bit depth on a real computed waveform.', Waves],
  ['discrete-signals', 'signal-processing', 'signal-lec-1', 'signals', 'Discrete-Time Signal Explorer', 'الإشارات المتقطعة وتحويلاتها', 'Shift and inspect impulse, step and exponential sequences.', Activity],
  ['win32-code-lab', 'windows-programming', 'win-lec-2', 'windows', 'Win32 Code Trace', 'تتبّع كود النافذة', 'Follow the API call, message and callback as the window changes.', Monitor],
  ['win32-types-lab', 'windows-programming', 'win-lec-2', 'windows', 'Win32 Types & Handles', 'أنواع البيانات والمقابض', 'Choose types and inspect pointer width and Unicode boundaries.', Layers],
  ['network-media', 'networks', 'net-lec-1', 'networks', 'Media & Throughput Workbench', 'وسيط النقل وسعة القناة', 'Compare media choices and actual throughput under explicit assumptions.', Radio],
  ['ai-environments', 'ai', 'ai-lec-2', 'ai', 'Task Environment Explorer', 'استكشف بيئة الوكيل', 'Change what the agent can see and how the world evolves.', Brain],
  ['signal-support', 'signal-processing', 'signal-lec-1', 'signals', 'Sequence Support Mapper', 'حدود الإشارة بعد التحويل', 'Map input indices through shifts and reversal to find guaranteed zeros.', Route],
  ['signal-periodicity', 'signal-processing', 'signal-lec-1', 'signals', 'Discrete Periodicity Explorer', 'الدورة الصحيحة في الزمن المتقطع', 'Overlay a shifted sequence and connect it with the integer-period rule.', Waves],
  ['signal-systems', 'signal-processing', 'signal-lec-1', 'signals', 'System Property Bench', 'اختبر خواص النظام', 'Compare the two paths in linearity and time-invariance tests.', Sliders],
  ['signal-convolution', 'signal-processing', 'signal-lec-1', 'signals', 'Convolution & MAC Studio', 'اضرب واجمع خطوة بخطوة', 'Slide the impulse response, multiply overlapping samples and accumulate.', Activity],
] as const;

export const LAB_CATALOG = entries.map(([id, courseId, lectureId, category, title, subtitleAr, description, icon]) => ({
  id, courseId, lectureId, category, title, subtitleAr, description, icon,
  categoryLabel: categoryNames[category][0], categoryLabelAr: categoryNames[category][1],
  badge: categoryNames[category][0], descriptionAr: subtitleAr,
  isImportant: category === 'signals',
}));
export type LabId = typeof entries[number][0];

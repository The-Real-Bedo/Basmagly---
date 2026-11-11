import { COURSES_DATA as COURSE_SEEDS } from './courseSeeds';
import type { Lecture, Question, SummarySection } from '../types';

const networkCourse = COURSE_SEEDS.find((course) => course.id === 'networks');
const existingLectures = networkCourse?.lectures;

if (!existingLectures || existingLectures.length < 2) {
  throw new Error('The Networks course must provide its first two lectures.');
}

const copyQuestions = (lecture: Lecture): Question[] => lecture.questions.map((question) => ({
  ...question,
  options: question.options ? [...question.options] : undefined,
  optionsAr: question.optionsAr ? [...question.optionsAr] : undefined,
  keyPoints: question.keyPoints ? [...question.keyPoints] : undefined,
}));

const section = (
  title: string,
  titleAr: string,
  content: string,
  contentAr: string,
  bulletPoints: string[],
  bulletPointsAr: string[],
  keyRule: string,
  keyRuleAr: string,
  experimentIds?: string[],
): SummarySection => ({
  title,
  titleAr,
  content,
  contentAr,
  bulletPoints,
  bulletPointsAr,
  keyRule,
  keyRuleAr,
  experimentIds,
});

const lecture1Questions: Question[] = [
  {
    id: 'q-net1-1', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Which intermediary device routes packets between distinct local networks based on logical IP addresses?',
    questionAr: 'أنهي جهاز وسيط بيوجّه الحزم (Packets) بين شبكات محلية مختلفة على أساس عناوين الـ IP؟',
    options: ['Hub', 'Switch', 'Router', 'Repeater'],
    optionsAr: ['هب (Hub)', 'سويتش (Switch)', 'راوتر (Router)', 'مكرر إشارة (Repeater)'],
    correctAnswer: 2,
    explanation: 'Routers operate at Layer 3 (Network Layer) and read destination IP addresses to forward packets across different subnets.',
    explanationAr: 'الـ Router شغال في الطبقة التالتة (Layer 3) ومسؤوليته يبص على عنوان الـ IP بتاع الوجهة عشان يوجّه الحزمة للشبكة التانية.'
  },
  {
    id: 'q-net1-2', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'What is the bit length and format of a hardware MAC address?',
    questionAr: 'عنوان الـ MAC الفيزيائي حجمه كام بت وبيتكتب إزاي؟',
    options: ['32 bits in dotted decimal', '48 bits (6 octets) in hexadecimal', '64 bits binary', '128 bits hexadecimal'],
    optionsAr: ['32 بت عشري بالنقط (Dotted Decimal)', '48 بت (6 بايت) بالنظام الست عشري', '64 بت ثنائي', '128 بت ست عشري'],
    correctAnswer: 1,
    explanation: 'MAC addresses are 48 bits (6 bytes) long, represented in hexadecimal notation like AA:BB:CC:DD:EE:FF.',
    explanationAr: 'الـ MAC عبارة عن 48 بت (يعني 6 بايت) وبيتكتب بالنظام الست عشري (Hexadecimal) مقسوم على 6 خانات، زي AA:BB:CC:DD:EE:FF.'
  },
  {
    id: 'q-net1-3', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'Network throughput is always equal to or higher than theoretical bandwidth.',
    questionAr: 'معدل النقل الفعلي (Throughput) دايماً بيساوي أو أعلى من سعة الـ Bandwidth النظرية.',
    correctAnswer: false,
    explanation: 'False: Throughput is the actual measured transfer rate; it can never exceed bandwidth and is usually lower due to media attenuation and congestion.',
    explanationAr: 'غلط! الـ Bandwidth هو أقصى رقم نظري، لكن الـ Throughput هو السرعة الفعلية اللي واصلالك، ومستحيل تعدّي الـ Bandwidth وغالباً بتكون أقل بسبب الزحمة والتشويش.'
  },
  {
    id: 'q-net1-4', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'Compare Star Topology and Full Mesh Topology regarding cost, redundancy, and single point of failure.',
    questionAr: 'قارن بين طوبولوجيا النجمة (Star) والطوبولوجيا المتشابكة الكاملة (Full Mesh) من حيث التكلفة، والاحتياطية (Redundancy)، ونقطة الفشل الوحيدة (Single Point of Failure).',
    correctAnswer: 'star vs mesh redundancy and cost',
    modelAnswer: '1. Star Topology: Cost: Moderate, with simple installation. Single point of failure: The central switch; if it fails, the whole network goes down, but failure of an individual end device does not affect others. Redundancy: Low; dependent on central switch. 2. Full Mesh Topology: Cost: Very high, requiring n(n-1)/2 cables and n-1 ports on every node. Single point of failure: None; if a link fails, traffic reroutes through alternate links. Redundancy: Maximum fault tolerance.',
    modelAnswerAr: '1. طوبولوجيا النجمة (Star): التكلفة: معقولة والتركيب سهل. نقطة الفشل: الـ Switch المركزي؛ لو تعطل فالشبكة كلها تتوقف، لكن تعطل جهاز طرفي لا يؤثر على الباقين. الاحتياطية: منخفضة. 2. الطوبولوجيا المتشابكة الكاملة (Full Mesh): التكلفة: باهظة جداً وتتطلب n(n-1)/2 كابل و n-1 منفذ لكل جهاز. نقطة الفشل: لا توجد نقطة فشل وحيدة؛ انقطاع أي كابل يحول البيانات لمسار بديل. الاحتياطية: أعلى درجات التحمل للأعطال.',
    keyPoints: ['Single point of failure in Star (central device)', 'Mesh alternate paths', 'Mesh cabling formula n(n-1)/2']
  },
  {
    id: 'q-net1-5', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Calculate the total number of physical duplex links required to build a Fully-Connected Mesh topology containing N = 8 host nodes.',
    questionAr: 'احسب عدد الكابلات (Physical Links) المطلوبة لعمل شبكة كاملة التوصيل (Full Mesh Topology) بين 8 أجهزة.',
    options: ['16 links', '24 links', '28 links', '56 links'],
    optionsAr: ['16 كابل', '24 كابل', '28 كابل', '56 كابل'],
    correctAnswer: 2,
    explanation: 'Formula: Links = N * (N - 1) / 2. For N = 8: Links = 8 * 7 / 2 = 28 full-duplex cables.',
    explanationAr: 'القانون: Links = N * (N - 1) / 2. تعويض مباشر لـ 8 أجهزة: 8 × 7 ÷ 2 = 28 كابل اتصال مباشر.'
  },
  {
    id: 'q-net1-6', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'Compare Star topology with Bus topology regarding single-point of failure and ease of troubleshooting.',
    questionAr: 'قارن بين طوبولوجيا النجمة (Star) والخط الناقل (Bus) من حيث نقطة الانهيار الفردية (Single Point of Failure) وسهولة تحديد الأعطال.',
    correctAnswer: 'Star vs Bus failure point and troubleshooting.',
    modelAnswer: 'In Star topology, the central switch/hub is a single point of failure; an individual cable break affects only that node. In Bus topology, a break in the main backbone cable halts the entire network; Star is much easier to isolate and troubleshoot because ports can be tested independently.',
    modelAnswerAr: 'في شبكة Star: نقطة العطل الوحيدة هي السويتش المركزي (لو وقع فالشبكة تتوقف، لكن انقطاع سلك جهاز يعزل ذلك الجهاز فقط). في شبكة Bus: لو الكابل الرئيسي انقطع من أي موضع فالشبكة بأكملها تتعطل؛ وبالتالي شبكة Star أسهل بكثير في تتبع الأعطال وعزلها.',
    keyPoints: ['Star central switch failure vs single cable break', 'Bus backbone cut downs entire network', 'Star allows easy port-level isolation']
  },
  {
    id: 'q-net1-7', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'A computer transmits a 20 Megabyte (MB) file over a network link with a bandwidth of 16 Megabits per second (Mbps). Assuming ideal conditions, what is the download time T = S / BW?',
    questionAr: 'جهاز كمبيوتر يرسل ملفاً بحجم 20 ميجابايت (MB) عبر وصلة شبكة سعتها 16 ميجابت في الثانية (Mbps). بافتراض الظروف المثالية، ما هو زمن النقل T = S / BW؟',
    options: ['1.25 seconds', '5 seconds', '10 seconds', '160 seconds'],
    optionsAr: ['1.25 ثانية', '5 ثواني', '10 ثواني', '160 ثانية'],
    correctAnswer: 2,
    explanation: 'Convert bytes to bits: S = 20 MB * 8 = 160 Megabits. Transmission time T = 160 Mb / 16 Mbps = 10 seconds.',
    explanationAr: 'نحول البايت لبت: 20 ميجابايت × 8 = 160 ميجابت. زمن النقل T = 160 ÷ 16 = 10 ثوانٍ.'
  },
  {
    id: 'q-net1-8', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Which transmission mode allows communication in both directions, but only in one direction at a time (like walkie-talkies)?',
    questionAr: 'أي نمط إرسال يسمح بنقل البيانات في الاتجاهين ولكن في اتجاه واحد فقط في المرة الواحدة (مثل أجهزة اللاسلكي Walkie-Talkie)؟',
    options: ['Simplex', 'Half-Duplex', 'Full-Duplex', 'Multiplex'],
    optionsAr: ['سيمبلكس (Simplex)', 'نصف مزدوج (Half-Duplex)', 'مزدوج كامل (Full-Duplex)', 'مالتيبلكس (Multiplex)'],
    correctAnswer: 1,
    explanation: 'Half-duplex enables bidirectional communication, but nodes must take turns transmitting and receiving.',
    explanationAr: 'نمط Half-Duplex يتيح الإرسال في الاتجاهين، ولكن ليس في نفس الوقت بل بالتناوب.'
  },
  {
    id: 'q-net1-9', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'A Layer 1 network Hub breaks a network into multiple independent collision domains.',
    questionAr: 'يقوم موزع الشبكة (Hub) في الطبقة الأولى بتقسيم الشبكة إلى نطاقات تصادم (Collision Domains) متعددة ومستقلة.',
    correctAnswer: false,
    explanation: 'False: A Hub is a multiport repeater sharing a single collision domain across all ports; a Switch breaks collision domains on every port.',
    explanationAr: 'غلط! الـ Hub مكرر إشارة يشترك كل منافذه في نطاق تصادم واحد؛ بينما الـ Switch هو الذي يجعل كل منفذ نطاق تصادم منفصل.'
  },
  {
    id: 'q-net1-10', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'What is the correct ordering of network classifications from smallest to largest geographic scope?',
    questionAr: 'ما هو الترتيب الصحيح لتصنيفات الشبكات من الأصغر إلى الأكبر حسب النطاق الجغرافي؟',
    options: ['LAN < PAN < WAN < MAN', 'PAN < LAN < MAN < WAN', 'WAN < MAN < LAN < PAN', 'MAN < LAN < PAN < WAN'],
    optionsAr: ['LAN < PAN < WAN < MAN', 'PAN < LAN < MAN < WAN', 'WAN < MAN < LAN < PAN', 'MAN < LAN < PAN < WAN'],
    correctAnswer: 1,
    explanation: 'PAN (Personal: few meters) < LAN (Local: building/campus) < MAN (Metropolitan: city) < WAN (Wide: country/global).',
    explanationAr: 'الترتيب: شبكة شخصية PAN ثم شبكة محلية LAN ثم شبكة مدن MAN ثم شبكة واسعة WAN.'
  },
  {
    id: 'q-net1-11', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'In Unicast transmission, a frame is delivered to all devices currently connected to the local area network.',
    questionAr: 'في نمط إرسال Unicast، يتم تسليم الإطار لكافة الأجهزة المتصلة حالياً بالشبكة المحلية.',
    correctAnswer: false,
    explanation: 'False: Broadcast delivers to all devices on the LAN; Unicast addresses exactly one specific destination device.',
    explanationAr: 'غلط! البث الشامل Broadcast هو الذي يرسل للجميع؛ أما Unicast يوجه الرسالة لجهاز واحد محدد فقط.'
  },
  {
    id: 'q-net1-12', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'Detail the functional differences between End Devices and Intermediary Devices, explaining the distinct forwarding roles of a Hub (Layer 1), Switch (Layer 2), and Router (Layer 3).',
    questionAr: 'فصل الفروق الوظيفية بين الأجهزة الطرفية والأجهزة الوسيطة، موضحاً أدوار التوجيه المختلفة لكل من Hub (الطبقة 1) و Switch (الطبقة 2) و Router (الطبقة 3).',
    correctAnswer: 'End vs Intermediary devices and Hub vs Switch vs Router forwarding.',
    modelAnswer: '1. End Devices (Endpoints): Devices such as PCs, servers, IP phones, and printers that originate or ultimately receive data packets; they run applications and generate network traffic. 2. Intermediary Devices: Devices that interconnect end devices and route traffic across the network infrastructure. 3. Hub (Layer 1 Physical): An active multiport repeater that blindly regenerates electrical signals out all ports except the receiving port; all ports share one collision domain and one broadcast domain. 4. Switch (Layer 2 Data Link): A multiport bridge that inspects destination MAC addresses, builds a CAM table by inspecting source MACs, and forwards frames selectively only to the destination port; every port is a separate collision domain, but all ports share one broadcast domain. 5. Router (Layer 3 Network): An internetworking device that inspects destination IP addresses, consults its routing table, and forwards packets across distinct subnets; routers break both collision domains and broadcast domains.',
    modelAnswerAr: '1. الأجهزة الطرفية (End Devices): الحواسب والسيرفرات والهواتف الذكية والطابعات التي تمثل مصدر الرسائل أو وجهتها النهائية وتعمل عليها التطبيقات. 2. الأجهزة الوسيطة (Intermediary Devices): الأجهزة التي تربط النقاط الطرفية وتوجه حركة البيانات عبر البنية التحتية. 3. موزع Hub (الطبقة 1): يكرر الإشارة الكهربية بشكل أعمى لجميع المنافذ؛ وتشترك كل منافذه في نطاق تصادم واحد ونطاق بث واحد. 4. محول Switch (الطبقة 2): يفحص عنوان MAC للوجهة ويتعلم عناوين MAC للمرسل في جدول CAM، ويوجه الإطار للمنفذ المطلوب فقط؛ كل منفذ يمثل نطاق تصادم مستقل، وتشترك المنافذ في نطاق بث واحد. 5. موجه Router (الطبقة 3): يفحص عنوان IP المنطقي ويوجه الحزم بين شبكات فرعية مختلفة؛ والراوتر يكسر نطاقات التصادم ونطاقات البث معاً.',
    keyPoints: ['End devices originate/receive traffic vs Intermediary connecting nodes', 'Hub repeats Layer 1 signals (single collision domain)', 'Switch filters Layer 2 frames by MAC address (isolates collision domains)', 'Router routes Layer 3 packets by IP address (isolates broadcast domains)']
  },
  {
    id: 'q-net1-13', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'According to the lecture, what is the purpose of a network?',
    questionAr: 'حسب شرح المحاضرة، إيه الهدف من وجود الشبكة؟',
    options: [
      'To share resources such as files, folders, printers, and disk drives',
      'To increase the processing speed of every standalone computer',
      'To replace the operating system on each computer',
      'To provide backup electricity to connected devices'
    ],
    optionsAr: [
      'مشاركة الموارد زي الملفات والمجلدات والطابعات وأقراص التخزين',
      'زيادة سرعة المعالجة لكل كمبيوتر منفصل',
      'استبدال نظام التشغيل على كل كمبيوتر',
      'توفير كهرباء احتياطية للأجهزة المتصلة'
    ],
    correctAnswer: 0,
    explanation: 'The lecture defines a network as two or more computers connected so they can share resources; the listed resources are a file, a folder, a printer, and a disk drive.',
    explanationAr: 'المحاضرة بتعرف الشبكة إنها جهازين أو أكتر متوصلين عشان يشاركوا الموارد؛ والموارد المذكورة هي ملف ومجلد وطابعة وقرص تخزين.'
  },
  {
    id: 'q-net1-14', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Which of the following is classified as an END device rather than an intermediary device?',
    questionAr: 'أنهي من دول متصنف كجهاز طرفي (End device) مش جهاز وسيط؟',
    options: ['Printer', 'Switch', 'Router', 'Wireless access point'],
    optionsAr: ['طابعة (Printer)', 'سويتش (Switch)', 'راوتر (Router)', 'نقطة وصول لاسلكية (Access Point)'],
    correctAnswer: 0,
    explanation: 'End devices are where messages originate or are received (PCs, phones, servers, printers). Switches, wireless access points, routers, and firewalls are intermediary devices.',
    explanationAr: 'الأجهزة الطرفية هي مصدر الرسائل أو وجهتها (أجهزة، موبايلات، سيرفرات، طابعات). أما السويتش ونقطة الوصول اللاسلكية والراوتر والجدار الناري فهي أجهزة وسيطة.'
  },
  {
    id: 'q-net1-15', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'A repeater differs from a bridge or router because a repeater:',
    questionAr: 'الـ Repeater بيختلف عن الـ Bridge والـ Router لأنه:',
    options: [
      'Regenerates the signal without performing intelligent routing',
      'Filters frames using MAC address tables',
      'Connects LANs separated by great distances',
      'Assigns IP addresses to end devices'
    ],
    optionsAr: [
      'يجدّد الإشارة بدون تنفيذ توجيه ذكي',
      'يفلتر الإطارات باستخدام جداول عناوين MAC',
      'يوصّل شبكات محلية بعيدة عن بعضها',
      'يوزع عناوين IP على الأجهزة الطرفية'
    ],
    correctAnswer: 0,
    explanation: 'The lecture states a repeater regenerates analog or digital signals distorted by attenuation and does not perform intelligent routing like a bridge or router.',
    explanationAr: 'المحاضرة بتقول إن الـ Repeater بيجدّد الإشارات التناظرية أو الرقمية المشوّشة نتيجة التوهين، ومالوش قدرة التوجيه الذكي زي الـ Bridge والـ Router.'
  },
  {
    id: 'q-net1-16', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'When a host transmits through a HUB, what does the hub do with the incoming data?',
    questionAr: 'لما جهاز يبعث بيانات عن طريق الـ HUB، الـ Hub بيعمل إيه بالبيانات اللي بتوصله؟',
    options: [
      'Broadcasts the data to all connected devices except the sender',
      'Forwards the data only to the intended destination port',
      'Drops the data unless it carries a valid token',
      'Converts the data to optical signals'
    ],
    optionsAr: [
      'يبثّ البيانات لكل الأجهزة المتصلة ما عدا المرسل',
      'يوجّه البيانات لمنفذ الوجهة المطلوبة فقط',
      'يهمل البيانات لو مالش رقم token صحيح',
      'يحوّل البيانات لإشارات ضوئية'
    ],
    correctAnswer: 0,
    explanation: 'The lecture states the hub broadcasts the data to all connected devices except the sender; selective delivery to the intended destination is the switch behavior.',
    explanationAr: 'المحاضرة بتقول إن الـ Hub بيبثّ البيانات لكل الأجهزة المتصلة ما عدا المرسل؛ أما التسليم الانتقائي للوجهة المحددة فهو سلوك الـ Switch.'
  },
  {
    id: 'q-net1-17', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'A switch is best described as:',
    questionAr: 'الـ Switch أحسن وصف ليه هو:',
    options: [
      'A repeater with multiple ports',
      'A bridge that has multiple ports',
      'A router with a single port',
      'A wireless access point with extra antennas'
    ],
    optionsAr: [
      'مكرر إشارة متعدد المنافذ',
      'جسر (Bridge) متعدد المنافذ',
      'راوتر بمنفذ واحد',
      'نقطة وصول لاسلكية بهوائيات إضافية'
    ],
    correctAnswer: 1,
    explanation: 'The lecture defines the switch as a bridge that has multiple ports, performing error checking before forwarding and transferring data using MAC addresses.',
    explanationAr: 'المحاضرة بتعرّف الـ Switch إنه Bridge متعدد المنافذ، بيفحص الأخطاء قبل التوجيه وينقل البيانات باستخدام عناوين MAC.'
  },
  {
    id: 'q-net1-18', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Match each medium to its signal type as given in the lecture: copper carries __, optical fiber carries __, and wireless carries __.',
    questionAr: 'طابق كل وسيط مع نوع الإشارة زي ما المحاضرة قالت: النحاس بينقل __، والألياف الضوئية بينقل __، واللاسلكي بينقل __.',
    options: [
      'Electrical signals / light signals / microwaves',
      'Light signals / electrical signals / radio broadcast only',
      'Sound waves / electrical signals / infrared',
      'Electrical signals / microwaves / light signals'
    ],
    optionsAr: [
      'إشارات كهربية / إشارات ضوئية / موجات ميكروويف',
      'إشارات ضوئية / إشارات كهربية / بث لاسلكي فقط',
      'موجات صوتية / إشارات كهربية / أشعة تحت حمراء',
      'إشارات كهربية / ميكروويف / إشارات ضوئية'
    ],
    correctAnswer: 0,
    explanation: 'In wired connections copper carries electrical signals and optical fiber carries light signals; in wireless connections the medium is the atmosphere or space and the signals are microwaves.',
    explanationAr: 'في الوصلات السلكية النحاس بينقل إشارات كهربية والألياف الضوئية بينقل إشارات ضوئية؛ وفي الوصلات اللاسلكية الوسيط هو الغلاف الجوي أو الفضاء والإشارات ميكروويف.'
  },
  {
    id: 'q-net1-19', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Which of the following is NOT one of the lecture\'s criteria for choosing network media?',
    questionAr: 'أنهي عنصر من دول مش من معايير اختيار وسيط النقل اللي ذكرتها المحاضرة؟',
    options: [
      'The distance the media can successfully carry a signal',
      'The environment in which the media is to be installed',
      'The color of the cables',
      'The cost of the media and installation'
    ],
    optionsAr: [
      'المسافة اللي الوسيط يقدر ينقل فيها الإشارة بنجاح',
      'البيئة اللي هيتسطب فيها الوسيط',
      'لون الكابلات',
      'تكلفة الوسيط والتركيب'
    ],
    correctAnswer: 2,
    explanation: 'The lecture lists distance, environment, the amount of data and the speed at which it must be transmitted, and cost as the media-choice criteria; cable color is not a criterion.',
    explanationAr: 'المحاضرة ذكرت المعايير: المسافة، البيئة، كمية البيانات وسرعة نقلها، والتكلفة؛ ولون الكابلات مش من المعايير.'
  },
  {
    id: 'q-net1-20', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Which factor is NOT listed in the lecture as one that determines throughput?',
    questionAr: 'أنهي عامل مش مذكور في المحاضرة ضمن العوامل اللي بتحدد الـ Throughput؟',
    options: [
      'Internetworking devices',
      'The type of data being transferred',
      'The brand of the end devices',
      'The number of users on the network'
    ],
    optionsAr: [
      'أجهزة الربط البينية',
      'نوع البيانات المنقولة',
      'الماركة التجارية للأجهزة الطرفية',
      'عدد المستخدمين على الشبكة'
    ],
    correctAnswer: 2,
    explanation: 'The throughput factors named in the lecture are: internetworking devices, type of data being transferred, network topology, number of users, and network media.',
    explanationAr: 'العوامل المذكورة في المحاضرة: أجهزة الربط البينية، نوع البيانات المنقولة، طوبولوجيا الشبكة، عدد المستخدمين، ووسيط النقل.'
  },
  {
    id: 'q-net1-21', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Which set matches the lecture\'s four criteria that computer networks vary by?',
    questionAr: 'أنهي مجموعة تمثل المعايير الأربعة اللي الشبكات بتختلف بيها زي ما ذكرت المحاضرة؟',
    options: [
      'Transmission media, network scale, management method, and topology',
      'Operating system, desktop theme, cable color, and price',
      'Number of printers, office size, staffing, and vendor',
      'Protocol speed only, user age, room lighting, and budget'
    ],
    optionsAr: [
      'وسط النقل، حجم الشبكة، طريقة الإدارة، والطوبولوجيا',
      'نظام التشغيل، شكل سطح المكتب، لون الكابلات، والسعر',
      'عدد الطابعات، حجم المكتب، عدد الموظفين، والمورّد',
      'سرعة البروتوكول فقط، سن المستخدمين، إضاءة الغرفة، والميزانية'
    ],
    correctAnswer: 0,
    explanation: 'The lecture says networks vary by transmission media (wired vs wireless), network scale (LAN/MAN/WAN), management method (peer-to-peer vs client/server), and topology (bus, star, ring).',
    explanationAr: 'المحاضرة بتقول إن الشبكات بتختلف حسب وسط النقل (سلكي/لاسلكي)، حجم الشبكة (LAN/MAN/WAN)، طريقة الإدارة (Peer-to-peer أو Client/Server)، والطوبولوجيا (Bus وStar وRing).'
  },
  {
    id: 'q-net1-22', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'In which LAN physical topology does every device have exactly two neighbors?',
    questionAr: 'في أنهي طوبولوجيا فيزيائية للشبكات المحلية كل جهاز معاه بالظبط جارين اتنين؟',
    options: ['Bus', 'Star', 'Ring', 'Full mesh'],
    optionsAr: ['الخط الناقل (Bus)', 'النجمة (Star)', 'الحلقة (Ring)', 'التشابك الكامل (Full Mesh)'],
    correctAnswer: 2,
    explanation: 'The lecture defines the ring topology as nodes arranged in a circle with data traveling one or both directions, each device having exactly two neighbors.',
    explanationAr: 'المحاضرة بتعرف طوبولوجيا الحلقة إن الأجهزة مترتبة في دائرة والبيانات بتلف في اتجاه واحد أو الاتنين، وكل جهاز معاه جارين بالظبط.'
  },
  {
    id: 'q-net1-23', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'In a token ring network, which host is allowed to send data?',
    questionAr: 'في شبكة الـ Token Ring، أنهي جهاز مسموح له يبعث بيانات؟',
    options: [
      'Any host at any time',
      'Only the host that currently holds the token',
      'Only the host nearest the MSAU',
      'Two hosts simultaneously using different frequencies'
    ],
    optionsAr: [
      'أي جهاز في أي وقت',
      'الجهاز اللي ماسك الـ Token حاليًا فقط',
      'الجهاز الأقرب للـ MSAU فقط',
      'جهازين في نفس الوقت بترددات مختلفة'
    ],
    correctAnswer: 1,
    explanation: 'The lecture states only a host that holds the token can send data, and tokens are released when receipt of the data is confirmed.',
    explanationAr: 'المحاضرة بتقول إن الجهاز اللي ماسك الـ Token بس هو اللي يقدر يبعث، والـ Token بيتحرر لما يأكد استلام البيانات.'
  },
  {
    id: 'q-net1-24', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'What happens in a star topology if the central hub fails?',
    questionAr: 'بيحصل إيه في طوبولوجيا النجمة لو الـ Hub المركزي وقع؟',
    options: [
      'The rest of the network cannot function',
      'Only wireless clients lose connectivity',
      'The network automatically becomes a ring',
      'Nothing changes because of the alternate paths'
    ],
    optionsAr: [
      'باقي الشبكة متقدرش تشتغل',
      'الأجهزة اللاسلكية فقط بتفقد الاتصال',
      'الشبكة بتتحول تلقائيًا لحلقة',
      'مفيش تغيير بسبب المسارات البديلة'
    ],
    correctAnswer: 0,
    explanation: 'The lecture names the central hub going down as the star topology disadvantage: the rest of the network cannot function.',
    explanationAr: 'المحاضرة بتذكر تعطل الـ Hub المركزي كعيب أساسي للنجمة: باقي الشبكة متقدرش تشتغل.'
  },
  {
    id: 'q-net1-25', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'In the hub-and-spoke WAN topology, which statement is correct?',
    questionAr: 'في طوبولوجيا الـ Hub-and-Spoke للشبكات الواسعة، أنهي جملة صحيحة؟',
    options: [
      'Every spoke connects directly to every other spoke',
      'The spokes are only connected to the hub, with no direct spoke-to-spoke connection',
      'There is no central device at any site',
      'Each site leases a separate service provider contract per link'
    ],
    optionsAr: [
      'كل فرع متوصل مباشرة بكل الفرع التاني',
      'الفروع (Spokes) متوصلة بالـ Hub فقط، بدون اتصال مباشر بين الفرعين',
      'مفيش جهاز مركزي في أي موقع',
      'كل موقع بيستأجر عقد مزود خدمة منفصل لكل وصلة'
    ],
    correctAnswer: 1,
    explanation: 'The lecture defines hub-and-spoke as a hub site connected to all spoke sites, where the spokes have no direct connection between each other.',
    explanationAr: 'المحاضرة بتعرف الـ Hub-and-Spoke إنه موقع مركزي متوصل بكل المواقع الفرعية، والفروع مالهاش اتصال مباشر ببعضها.'
  },
  {
    id: 'q-net1-26', courseId: 'networks', lectureId: 'net-lec-1', type: 'mcq',
    question: 'Ethernet connected through a hub is physically a star, but logically it is a:',
    questionAr: 'الإيثرنت اللي متوصل من خلال Hub فيزيائيًا نجمة، لكن منطقيًا بيتصرف كـ:',
    options: ['Bus', 'Ring', 'Full mesh', 'Tree'],
    optionsAr: ['خط ناقل (Bus)', 'حلقة (Ring)', 'تشابك كامل (Full Mesh)', 'شجرة (Tree)'],
    correctAnswer: 0,
    explanation: 'The lecture states that although the topology is physically a star, it is logically a bus because the hub broadcasts data to the entire network and other nodes listen and check whether the data is intended for them.',
    explanationAr: 'المحاضرة بتقول إن الطوبولوجيا فيزيائيًا نجمة لكن منطقيًا خط ناقل، لأن الـ Hub بيبث البيانات لكل الشبكة وباقي الأجهزة بتسمع وبتفحص هل البيانات موجهة لها.'
  },
  {
    id: 'q-net1-27', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'In a bus topology, only one computer can send messages at a time.',
    questionAr: 'في طوبولوجيا الخط الناقل (Bus)، جهاز واحد فقط يقدر يبعث رسائل في نفس اللحظة.',
    correctAnswer: true,
    explanation: 'True: the single shared trunk (backbone) carries data in one direction from end to end, so only one computer can send messages at a time.',
    explanationAr: 'صح! الكابل الرئيسي المشترك الواحد بينقل البيانات باتجاه واحد من طرف لطرف، فجهاز واحد بس يقدر يبعث في نفس اللحظة.'
  },
  {
    id: 'q-net1-28', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'The bus topology is described as passive, meaning computers only listen for data and do not regenerate it.',
    questionAr: 'طوبولوجيا الـ Bus متوصفة إنها passive، يعني الأجهزة بتسمع البيانات بس ومش بتجدّدها.',
    correctAnswer: true,
    explanation: 'True: the lecture calls the bus a passive topology where computers only listen for, not regenerate, data.',
    explanationAr: 'صح! المحاضرة بتوصف الـ Bus بطوبولوجيا passive الأجهزة بتسمع البيانات فقط بدون تجديدها.'
  },
  {
    id: 'q-net1-29', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'A peer-to-peer network is appropriate for about 10 or fewer users that need no specialized services.',
    questionAr: 'شبكة الـ Peer-to-peer مناسبة لحوالي 10 مستخدمين أو أقل ومالهمش خدمات مخصصة خاصة.',
    correctAnswer: true,
    explanation: 'True: the lecture lists 10 or fewer users, no specialized services required, security not an issue, and only limited growth as the conditions where peer-to-peer is appropriate.',
    explanationAr: 'صح! المحاضرة ذكرت شروط ملاءمة الـ Peer-to-peer: 10 مستخدمين أو أقل، مفيش خدمات مخصصة مطلوبة، الأمان مش مشكلة، والنمو محدود.'
  },
  {
    id: 'q-net1-30', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'In a client/server network, the server can never act as a single point of failure for the system.',
    questionAr: 'في شبكة الـ Client/Server، السيرفر مستحيل يكون نقطة فشل وحيدة للنظام.',
    correctAnswer: false,
    explanation: 'False: the lecture lists introducing a single point of failure to the system among the disadvantages of client/server networks (along with high server cost and the need for an expert).',
    explanationAr: 'غلط! المحاضرة بتعدّ وجود نقطة فشل وحيدة للنظام من عيوب شبكات الـ Client/Server (مع تكلفة السيرفرات العالية والحاجة لخبير في الإعداد).'
  },
  {
    id: 'q-net1-31', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'Although the Internet has multiple paths to any one location, it does not adopt the full mesh topology.',
    questionAr: 'رغم إن الإنترنت عنده مسارات متعددة لأي مكان، لكنه مش بيتبنى بطوبولوجيا التشابك الكامل (Full Mesh).',
    correctAnswer: true,
    explanation: 'True: the lecture states the Internet has multiple paths to any one location yet does not adopt the full mesh topology.',
    explanationAr: 'صح! المحاضرة بتقول إن الإنترنت عنده مسارات متعددة لأي مكان لكنه مش بياخد بطوبولوجيا التشابك الكامل.'
  },
  {
    id: 'q-net1-32', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'The router is the intermediate device that connects LANs to form a WAN.',
    questionAr: 'الـ Router هو الجهاز الوسيط اللي بيوصل شبكات محلية ببعضها ليكون شبكة واسعة (WAN).',
    correctAnswer: true,
    explanation: 'True: the lecture states the router is the intermediate device that connects LANs to form a WAN, and routers can connect to a WAN allowing LANs separated by great distances to communicate.',
    explanationAr: 'صح! المحاضرة بتقول إن الـ Router هو الجهاز الوسيط اللي بيوصل الـ LANs لتكوين WAN، وبيقدر يتصل بـ WAN فيسمح لشبكات محلية بعيدة التواصل.'
  },
  {
    id: 'q-net1-33', courseId: 'networks', lectureId: 'net-lec-1', type: 'true_false',
    question: 'In a ring topology, every computer serves as a repeater to boost signals.',
    questionAr: 'في طوبولوجيا الحلقة (Ring)، كل كمبيوتر بيشتغل كمكرر إشارة (Repeater) لتقوية الإشارة.',
    correctAnswer: true,
    explanation: 'True: the lecture states every computer in the ring serves as a repeater to boost signals as data travels through the ring.',
    explanationAr: 'صح! المحاضرة بتقول إن كل كمبيوتر في الحلقة بيشتغل كمكرر إشارة لتقويتها وإحنا البيانات بتلف جوه الحلقة.'
  },
  {
    id: 'q-net1-34', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'List the six management roles the lecture assigns to intermediary devices as data flows through a network.',
    questionAr: 'عدّد الأدوار الستة في إدارة تدفق البيانات اللي المحاضرة أسندتها للأجهزة الوسيطة.',
    correctAnswer: 'Six roles of intermediary devices.',
    modelAnswer: '1. Regenerate and retransmit data signals. 2. Maintain information about what pathways exist through the network and internetwork. 3. Notify other devices of errors and communication failures. 4. Direct data along alternate pathways when there is a link failure. 5. Classify and direct messages according to priorities. 6. Permit or deny the flow of data based on security settings.',
    modelAnswerAr: '1. تجديد وإعادة إرسال إشارات البيانات. 2. الحفاظ على معلومات المسارات الموجودة عبر الشبكة والشبكات المترابطة. 3. إبلاغ الأجهزة الأخرى بالأخطاء وفشل الاتصالات. 4. توجيه البيانات على مسارات بديلة عند انقطاع الوصلة. 5. تصنيف الرسائل وتوجيهها حسب الأولويات. 6. السماح أو منع تدفق البيانات بناءً على إعدادات الأمان.',
    keyPoints: ['Regenerate and retransmit signals', 'Maintain pathway information', 'Notify errors and failures', 'Alternate pathways on link failure', 'Classify by priorities', 'Permit or deny by security settings']
  },
  {
    id: 'q-net1-35', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'In a star topology, compare how a central HUB passes data with how a central SWITCH passes data.',
    questionAr: 'في طوبولوجيا النجمة، قارن بين طريقة الـ Hub المركزي في تمرير البيانات وطريقة الـ Switch المركزي.',
    correctAnswer: 'Hub broadcasts vs switch selective delivery.',
    modelAnswer: 'The hub passes the data to all other devices in the topology: every connected node receives the transmission and must check whether it is the intended recipient. The switch passes the data from the sender to the intended destination only: it forwards frames selectively to the correct device instead of flooding everyone. This selective forwarding is why the switch became the common LAN Ethernet intermediary device. The lecture also notes that depending on the intelligence of the hub, two or more computers may send a message at the same time and cause collisions.',
    modelAnswerAr: 'الـ Hub بيمرر البيانات لكل الأجهزة التانية في الطوبولوجيا: كل جهاز متصل بيستقبل الإرسال وبرضه لازم يفحص هل هو المستهدف. أما الـ Switch فيمرر البيانات من المرسل للوجهة المقصودة فقط: بيوجّه الإطارات انتقائيًا للجهاز الصحيح بدل الإغراق للجميع. وده سبب بقاء الـ Switch كجهاز وسيط الإيثرنت الشائع للشبكات المحلية. وكمان المحاضرة بتلاحظ إنه حسب ذكاء الـ Hub، جهازين أو أكتر ممكن يبعثوا في نفس اللحظة ويحصل تصادم.',
    keyPoints: ['Hub floods all connected devices', 'Switch delivers to intended destination only', 'Selective forwarding made the switch the common Ethernet intermediary', 'Hub intelligence can allow simultaneous transmissions']
  },
  {
    id: 'q-net1-36', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'Compare Local Area Networks (LAN) with Wide Area Networks (WAN) regarding geographic scope, connecting media, cost, and the role of the router.',
    questionAr: 'قارن بين الشبكة المحلية (LAN) والشبكة الواسعة (WAN) من حيث النطاق الجغرافي ووسائط التوصيل والتكلفة ودور الـ Router.',
    correctAnswer: 'LAN vs WAN scope, media, cost, router role.',
    modelAnswer: 'LAN: a group of computers connected within a small area such as a building or office, using a communication medium such as twisted pair or coaxial cable. It is less costly because it is built with inexpensive hardware such as hubs or switches, network adapters, and Ethernet cables, and data transfers at an extremely fast rate. WAN: a network extending over a large geographical area such as states or countries, spanning many locations through telephone lines, fiber-optic cables, or satellite links. It is a bigger network than the LAN and is widely used in business, government, and education; the Internet is one of the biggest WANs. Router role: the router is the intermediate device that connects LANs to form a WAN.',
    modelAnswerAr: 'الـ LAN: مجموعة أجهزة متوصلة في مساحة صغيرة زي مبنى أو مكتب، عبر وسيط نقل زي الزوج الملتوي أو الكابل المحوري. تكلفتها أقل لأنها مبنية على عتاد رخيص زي الـ Hubs أو الـ Switches وكروت الشبكة وكابلات الإيثرنت، وسرعة نقل البيانات فيها عالية جدًا. الـ WAN: شبكة بتمتد على مساحة جغرافية كبيرة زي المحافظات أو الدول، وبتعبر مواقع متعددة عبر خطوط هاتف أو ألياف ضوئية أو أقمار صناعية. أكبر من الـ LAN وبتستخدم على نطاق واسع في الأعمال والحكومة والتعليم؛ والإنترنت من أكبر الـ WANs في العالم. دور الـ Router: الـ Router هو الجهاز الوسيط اللي بيوصل الـ LANs لتكوين WAN.',
    keyPoints: ['LAN small area, twisted pair/coax, inexpensive, fast', 'WAN large area, telephone/fiber/satellite links', 'Internet is one of the biggest WANs', 'Router connects LANs into a WAN']
  },
  {
    id: 'q-net1-37', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'Compare the Bus and Ring LAN physical topologies regarding the shared medium, the repeater role, sending permission, and failure behavior.',
    questionAr: 'قارن بين طوبولوجيا الـ Bus وطوبولوجيا الـ Ring للشبكات المحلية من حيث الوسيط المشترك ودور المكرر وإذن الإرسال وسلوك الأعطال.',
    correctAnswer: 'Bus vs ring medium, repeater, permission, failure.',
    modelAnswer: 'Bus: all devices sit along a single cable (the trunk/backbone/segment) running in one direction; only one computer can send messages at a time; the topology is passive, so computers only listen for data and do not regenerate it. Ring: nodes are arranged in a circle and data travels in one or both directions, with each device having exactly two neighbors; every computer serves as a repeater to boost signals; in the token-ring variant a device must obtain the token to send, and only the token holder transmits until receipt is confirmed. Failure behavior: in the ring, if one computer fails, the whole network fails, and adding computers is difficult and more expensive.',
    modelAnswerAr: 'الـ Bus: كل الأجهزة على كابل واحد (trunk/backbone/segment) بيمتد باتجاه واحد؛ وجهاز واحد فقط يقدر يبعث في نفس اللحظة؛ والطوبولوجيا passive يعني الأجهزة بتسمع البيانات بدون تجديدها. الـ Ring: الأجهزة مترتبة في دائرة والبيانات بتلف باتجاه واحد أو الاتنين، وكل جهاز معاه جارين بالظبط؛ وكل كمبيوتر بيشتغل مكرر إشارة لتقويتها؛ وفي نسخة الـ Token Ring الجهاز لازم ياخد الـ token عشان يبعث، ومالك الـ token فقط هو اللي بيرسل لحين تأكيد الاستلام. سلوك الأعطال: في الحلقة لو جهاز واحد وقع فالشبكة كلها بتقع، وإضافة أجهزة صعبة وأغلى.',
    keyPoints: ['Bus single shared trunk, one sender, passive', 'Ring circle with two neighbors per device', 'Ring computers act as repeaters', 'Token required in token ring', 'Ring single failure downs whole network']
  },
  {
    id: 'q-net1-38', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'Explain the difference between physical and logical topology, using the Ethernet-with-hub network (physical star / logical bus) and the token-ring network (logical ring, MSAU) as examples.',
    questionAr: 'اشرح الفرق بين الطوبولوجيا الفيزيائية والمنطقية، مستخدمًا مثالي شبكة الإيثرنت مع الـ Hub (نجمة فيزيائيًا / خط ناقل منطقيًا) وشبكة الـ Token Ring (حلقة منطقية عبر الـ MSAU).',
    correctAnswer: 'Physical layout vs logical data flow with star/bus and ring examples.',
    modelAnswer: 'Physical topology consists of the layout of cables, network devices, and wiring — how nodes are physically interconnected. Logical topology defines how the data should transfer, independent of the physical layout. Ethernet with a hub: the cabling is a physical star (every device connects to the central hub), yet logically it is a bus because the hub broadcasts the data to the entire network and all other nodes listen and check whether the data is intended for them. Token ring: a multi-station access unit (MSAU) connects the group of computers, and token passing controls network access by passing an electronic token sequentially to each host; a host with the token may send, and a host with no data passes the token on, giving the network a logical ring behavior that avoids collisions.',
    modelAnswerAr: 'الطوبولوجيا الفيزيائية بتمثل تخطيط الكابلات وأجهزة الشبكة والتمديدات — إزاي الأجهزة متوصلة فعليًا. أما الطوبولوجيا المنطقية فبتحدد إزاي البيانات المفروض تتنقل، بشكل مستقل عن التخطيط الفيزيائي. الإيثرنت مع الـ Hub: التمديدات نجمة فيزيائية (كل جهاز متوصل بالـ Hub المركزي)، لكنها منطقيًا خط ناقل لأن الـ Hub بيبث البيانات لكل الشبكة وباقي الأجهزة بتسمع وبتفحص هل البيانات موجهة لها. الـ Token Ring: وحدة الوصول متعددة المحطات (MSAU) بتوصل مجموعة الأجهزة، وتمرير الـ token بيتحكم في الوصول للشبكة بتمرير إشارة إلكترونية بالتتابع لكل جهاز؛ الجهاز اللي معاه token يقدر يبعث، واللي مالوش بيانات بيحول الـ token لللي بعده — وده سلوك حلقة منطقية بيمنع التصادمات.',
    keyPoints: ['Physical = device/wiring layout', 'Logical = how data transfers', 'Hub Ethernet: physical star, logical bus', 'Token ring via MSAU is a logical ring']
  },
  {
    id: 'q-net1-39', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'Using the lecture\'s diagram discussion, explain what happens to a network\'s addressing scheme when a router is introduced, and what each end device must then determine.',
    questionAr: 'بالاعتماد على مناقشة الرسم في المحاضرة، اشرح إيه اللي بيحصل لخطة عنونة الشبكة عند إدخال الـ Router، وإيه المطلوب من كل جهاز طرفي بعد كده.',
    correctAnswer: 'Router segmentation into subnetworks and local/remote delivery.',
    modelAnswer: 'According to the lecture\'s figure, the addressing scheme of the network changes in the presence of the router: the slide\'s caption states the router segmented the network into three different subnetworks with different network addresses, and its figure shows router R1 connecting the separate networks (192.168.10.0 with the servers, 192.168.11.0, and the 192.168.100.0 / 192.168.101.0 / 192.168.102.0 group) toward the Internet. Because delivery is no longer one flat network, each end user device should determine how to send data locally and remotely — deciding whether the destination is inside its own subnetwork or must be reached through the router toward another network.',
    modelAnswerAr: 'حسب رسم المحاضرة، خطة العنونة بتتغير بوجود الـ Router: نص السلايد بيقول إن الـ Router قسّم الشبكة لثلاث شبكات فرعية مختلفة بعناوين شبكات مختلفة، والرسم بيعرض الـ Router R1 موصلًا الشبكات المنفصلة (192.168.10.0 مع السيرفرات، و192.168.11.0، ومجموعة 192.168.100.0 و192.168.101.0 و192.168.102.0) ناحية الإنترنت. ولأن التسليم مبقاش شبكة واحدة مسطحة، كل جهاز طرفي لازم يحدد إزاي يبعث البيانات محليًا وعن بُعد — يعني يقرر هل الوجهة جوه نفس الشبكة الفرعية ولا لازم تمر عبر الـ Router لشبكة تانية.',
    keyPoints: ['Router segments into three subnetworks', 'Different network address per subnetwork', 'Devices decide local vs remote delivery']
  },
  {
    id: 'q-net1-40', courseId: 'networks', lectureId: 'net-lec-1', type: 'essay',
    question: 'Compare unicast, broadcast, and multicast network transmission regarding the number of receivers, where each is supported, and the lecture\'s noted uses.',
    questionAr: 'قارن بين الإرسال Unicast وBroadcast وMulticast من حيث عدد المستقبلين وأين كل نمط مدعوم والاستخدامات اللي ذكرتها المحاضرة.',
    correctAnswer: 'Unicast vs broadcast vs multicast receivers and uses.',
    modelAnswer: 'Unicast: a packet is sent from a single source to one specified destination; it is the predominant form of transmission on LANs and within the Internet. Broadcast: there is just one sender, but the information is sent to all connected receivers; it is supported on most LANs (e.g. Ethernet) and used to send the same message to all computers on the LAN — some protocols use broadcast to obtain missing information from the network. Multicast: the same packet is delivered simultaneously to a group of clients; IP multicast provides dynamic many-to-many connectivity between a set of senders (at least one) and a group of receivers.',
    modelAnswerAr: 'الـ Unicast: حزمة بتتبعت من مصدر واحد لوجهة واحدة محددة؛ وهو الشكل الغالب للإرسال على الشبكات المحلية وداخل الإنترنت. الـ Broadcast: مرسل واحد لكن المعلومة بتتبعت لكل المستقبلين المتصلين؛ ومدعوم في معظم الشبكات المحلية (زي الإيثرنت) وبيُستخدم لإرسال نفس الرسالة لكل أجهزة الشبكة المحلية — وبعض البروتوكولات بتستخدمه للحصول على معلومات ناقصة من الشبكة. الـ Multicast: نفس الحزمة بتتسلم لمجموعة عملاء في نفس اللحظة؛ والـ IP multicast بيوفّر اتصال many-to-many ديناميكي بين مجموعة مرسلين (جهاز على الأقل) ومجموعة مستقبلين.',
    keyPoints: ['Unicast one specified destination, predominant', 'Broadcast to all LAN receivers, e.g. Ethernet', 'Broadcast used to obtain missing information', 'Multicast group delivery, many-to-many IP multicast']
  }
];

const lecture2Questions: Question[] = [
  {
    id: 'q-net2-1', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which layer of the OSI model establishes, maintains, and synchronizes the dialog between applications?',
    questionAr: 'أنهي طبقة في نموذج OSI مسؤولة عن فتح وإدارة وإنهاء جلسات الاتصال (Sessions) ومزامنة الحوار بين التطبيقات؟',
    options: ['Transport Layer', 'Session Layer', 'Presentation Layer', 'Network Layer'],
    optionsAr: ['طبقة النقل (Transport)', 'طبقة الجلسة (Session)', 'طبقة التقديم (Presentation)', 'طبقة الشبكة (Network)'],
    correctAnswer: 1,
    explanation: 'The Session Layer (Layer 5) manages dialog control, checkpointing, and token-based synchronization between endpoints.',
    explanationAr: 'طبقة الجلسة (Session Layer - Layer 5) مسؤولة عن إدارة الجلسة وتنظيم الدور والمزامنة بين التطبيقين.'
  },
  {
    id: 'q-net2-2', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'What is the default subnet mask in dotted-decimal for a standard Class B IPv4 network?',
    questionAr: 'قناع الشبكة الافتراضي لشبكات Class B في نظام IPv4 بيتكتب إزاي؟',
    options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.240'],
    optionsAr: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.240'],
    correctAnswer: 1,
    explanation: 'Class B uses 16 network bits and 16 host bits, yielding default mask 255.255.0.0 (/16).',
    explanationAr: 'الـ Class B بيحجز 16 بت للشبكة و 16 بت للأجهزة، فالقناع الافتراضي هو 255.255.0.0 (أو /16).'
  },
  {
    id: 'q-net2-3', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'The IPv4 loopback address 127.0.0.1 sends packets over the physical network interface card to the switch.',
    questionAr: 'عنوان الـ Loopback (127.0.0.1) بيبعت الحزم عبر كارت الشبكة الفعلي برة الجهاز للسويتش ويرجعها.',
    correctAnswer: false,
    explanation: 'False: Loopback traffic is routed internally by the operating system TCP/IP stack to test protocol software; it never leaves the host.',
    explanationAr: 'غلط! حزم الـ Loopback (127.0.0.1) بتلف جوه الـ Stack بتاع نظام التشغيل عشان تتأكد إن تعريف الـ TCP/IP سليم، ومبتطلعش برة كارت الشبكة أبداً.'
  },
  {
    id: 'q-net2-4', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which OSI layer adds both a header and a trailer to encapsulate incoming data packets?',
    questionAr: 'أي طبقة في نموذج OSI تضيف كلاً من الترويسة (Header) والخاتمة (Trailer) لتغليف البيانات القادمة إليها؟',
    options: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Physical Layer'],
    optionsAr: ['طبقة الشبكة (Network)', 'طبقة النقل (Transport)', 'طبقة ربط البيانات (Data Link)', 'طبقة الفيزيائية (Physical)'],
    correctAnswer: 2,
    explanation: 'The Data Link Layer (Layer 2) adds a frame header (source/dest MAC) and a frame trailer (FCS / CRC checksum) for error detection.',
    explanationAr: 'طبقة ربط البيانات (Data Link Layer - Layer 2) هي الطبقة الوحيدة التي تضيف ترويسة وخاتمة تحتوي على فحص الأخطاء CRC/FCS.'
  },
  {
    id: 'q-net2-5', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'For IP address 172.16.45.10 / 20: What is the Network Address and the Directed Broadcast Address?',
    questionAr: 'للعنوان 172.16.45.10 / 20: ما هو عنوان الشبكة (Network Address) وعنوان البث (Broadcast Address)؟',
    options: [
      'Network: 172.16.0.0, Broadcast: 172.16.255.255',
      'Network: 172.16.32.0, Broadcast: 172.16.47.255',
      'Network: 172.16.40.0, Broadcast: 172.16.47.255',
      'Network: 172.16.45.0, Broadcast: 172.16.45.255'
    ],
    optionsAr: [
      'الشبكة: 172.16.0.0، البث: 172.16.255.255',
      'الشبكة: 172.16.32.0، البث: 172.16.47.255',
      'الشبكة: 172.16.40.0، البث: 172.16.47.255',
      'الشبكة: 172.16.45.0، البث: 172.16.45.255'
    ],
    correctAnswer: 1,
    explanation: 'Mask /20 = 255.255.240.0. Block size = 256 - 240 = 16 in 3rd octet. Subnet intervals: 0, 16, 32, 48. 45 falls in 32..47. Network = 172.16.32.0; Broadcast = 172.16.47.255.',
    explanationAr: 'القناع /20 = 255.255.240.0. حجم القفزة 16 في الخانة الثالثة (0، 16، 32، 48). القيمة 45 تقع في نطاق 32، فعنوان الشبكة 172.16.32.0 وعنوان البث 172.16.47.255.'
  },
  {
    id: 'q-net2-6', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'What is the correct sequence of Protocol Data Unit (PDU) names as data descends from Transport to Physical layer?',
    questionAr: 'ما هو الترتيب الصحيح لأسماء وحدات بيانات البروتوكول (PDU) أثناء نزول البيانات من طبقة النقل إلى الطبقة الفيزيائية؟',
    options: [
      'Packet -> Segment -> Frame -> Bits',
      'Segment -> Packet -> Frame -> Bits',
      'Frame -> Packet -> Segment -> Bits',
      'Segment -> Frame -> Packet -> Bits'
    ],
    optionsAr: [
      'Packet -> Segment -> Frame -> Bits',
      'Segment -> Packet -> Frame -> Bits',
      'Frame -> Packet -> Segment -> Bits',
      'Segment -> Frame -> Packet -> Bits'
    ],
    correctAnswer: 1,
    explanation: 'Transport layer produces Segments, Network layer encapsulates into Packets, Data Link layer produces Frames, and Physical layer transmits Bits.',
    explanationAr: 'طبقة النقل تنتج Segment، ثم طبقة الشبكة Packet، ثم طبقة ربط البيانات Frame، ثم الطبقة الفيزيائية Bits.'
  },
  {
    id: 'q-net2-7', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'The TCP/IP 4-layer model consolidates the OSI Application, Presentation, and Session layers into a single Application layer.',
    questionAr: 'يدمج نموذج TCP/IP المكون من 4 طبقات كلاً من طبقات التطبيقات والتقديم والجلسة في نموذج OSI داخل طبقة تطبيقات واحدة.',
    correctAnswer: true,
    explanation: 'True: The TCP/IP Application layer handles application logic, data formatting/encryption, and session controls together.',
    explanationAr: 'صح! نموذج TCP/IP يدمج الطبقات العليا الثلاث لـ OSI (التطبيقات والتقديم والجلسة) في طبقة واحدة هي Application.'
  },
  {
    id: 'q-net2-8', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'What is the first octet range for standard Class A IPv4 unicast addresses?',
    questionAr: 'ما هو نطاق الخانة الأولى (First Octet) لعناوين Class A القياسية في IPv4؟',
    options: ['1 to 126', '128 to 191', '192 to 223', '224 to 239'],
    optionsAr: ['1 إلى 126', '128 إلى 191', '192 إلى 223', '224 إلى 239'],
    correctAnswer: 0,
    explanation: 'Class A addresses span 1.0.0.0 to 126.255.255.255 (with leading bit 0; 127 is reserved for loopback).',
    explanationAr: 'النطاق لـ Class A هو من 1 إلى 126 (127 محجوز لاختبار الـ Loopback).'
  },
  {
    id: 'q-net2-9', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'Performing a bitwise logical AND operation between an IPv4 host address and its subnet mask extracts the Network Address.',
    questionAr: 'إجراء عملية الضرب المنطقي (Bitwise AND) بين عنوان جهاز IPv4 وقناع الشبكة يستخرج عنوان الشبكة (Network Address).',
    correctAnswer: true,
    explanation: 'True: 1 AND 1 = 1; ANDing with 1s retains network bits, while ANDing with 0s zeroes out host bits to produce the network ID.',
    explanationAr: 'صح! عملية AND مع 1 تحتفظ ببتات الشبكة ومع 0 تصفر بتات الأجهزة فينتج عنوان الشبكة.'
  },
  {
    id: 'q-net2-10', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'When a host sends a packet to a remote destination outside its local network, what destination MAC address is placed in the Layer 2 frame?',
    questionAr: 'عندما يرسل جهاز حزمة لوجهة بعيدة خارج شبكته المحلية، ما هو عنوان MAC للوجهة الذي يتم وضعه في إطار الطبقة الثانية؟',
    options: [
      'The remote destination host MAC address',
      'The default gateway router local interface MAC address',
      'The broadcast MAC address FF:FF:FF:FF:FF:FF',
      'The host own MAC address'
    ],
    optionsAr: [
      'عنوان MAC للجهاز البعيد النهائي',
      'عنوان MAC لمنفذ الراوتر (Default Gateway) المحلي',
      'عنوان البث الشامل FF:FF:FF:FF:FF:FF',
      'عنوان MAC للجهاز المرسل نفسه'
    ],
    correctAnswer: 1,
    explanation: 'Frames cannot cross routers; the host addresses the Layer 2 frame to the local default gateway MAC so the router can forward it.',
    explanationAr: 'الإطارات لا تعبر الراوتر؛ لذا يضع الجهاز عنوان MAC الخاص بمنفذ الراوتر المحلي (Default Gateway) ليسلمه الحزمة.'
  },
  {
    id: 'q-net2-11', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'An organization needs 5 subnets from a Class C /24 network, each supporting at least 25 usable hosts. Which CIDR mask is required?',
    questionAr: 'مؤسسة تحتاج تقسيم شبكة Class C (/24) لـ 5 شبكات فرعية على الأقل، وكل شبكة تستوعب 25 جهازاً على الأقل. ما هو قناع CIDR المناسب؟',
    options: ['/26 (255.255.255.192)', '/27 (255.255.255.224)', '/28 (255.255.255.240)', '/29 (255.255.255.248)'],
    optionsAr: ['/26 (255.255.255.192)', '/27 (255.255.255.224)', '/28 (255.255.255.240)', '/29 (255.255.255.248)'],
    correctAnswer: 1,
    explanation: 'Borrow 3 bits: 2³ = 8 >= 5 subnets. Remaining host bits = 5: 2⁵ - 2 = 30 >= 25 hosts. Mask = /24 + 3 = /27 (255.255.255.224).',
    explanationAr: 'نستلف 3 بتات: 2³ = 8 شبكات. يتبقى 5 بتات أجهزة: 2⁵ - 2 = 30 جهازاً. القناع هو /24 + 3 = /27 (255.255.255.224).'
  },
  {
    id: 'q-net2-12', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Describe the complete step-by-step encapsulation and decapsulation process as a web browser HTTP request travels from the client application down to the physical media and back up the stack on the web server.',
    questionAr: 'اشرح عملية التغليف (Encapsulation) وفك التغليف (Decapsulation) خطوة بخطوة أثناء انتقال طلب HTTP من المتصفح عبر الطبقات للوسيط الفيزيائي وحتى وصوله لخادم الويب.',
    correctAnswer: 'HTTP request encapsulation and decapsulation lifecycle.',
    modelAnswer: '1. Encapsulation (Client): The user browser creates an HTTP GET request in the Application layer. It passes to the Transport layer, which adds a TCP header with source/dest ports and sequence numbers to form a Segment. The Network layer adds an IP header with source and destination IP addresses to create an IP Packet. The Data Link layer prepends a MAC header with source and gateway MACs and appends a CRC/FCS trailer to create an Ethernet Frame. The Physical layer modulates the frame bits into electrical/optical signals onto the physical wire. 2. Decapsulation (Server): The server network interface receives bits from the wire, rebuilds the frame, and verifies the CRC trailer. Stripping the Layer 2 header/trailer, the packet is passed to the Network layer, which verifies destination IP. Stripping the IP header, the segment passes to the Transport layer, which reassembles TCP byte streams. Stripping the TCP header, the raw HTTP GET request reaches the web server application.',
    modelAnswerAr: '1. التغليف (العميل): ينشئ المتصفح طلب HTTP GET في طبقة التطبيقات. يمر لطبقة النقل فتضيف ترويسة TCP بأرقام المنافذ والتسلسل ليتكون Segment. تمر لطبقة الشبكة فتضيف ترويسة IP بالعناوين المنطقية ليتكون Packet. تمر لطبقة ربط البيانات فتضيف ترويسة MAC وخاتمة فحص أخطاء CRC ليتكون Frame. تحول الطبقة الفيزيائية الإطار إلى بتات وإشارات كهربية/ضوئية تسير في السلك. 2. فك التغليف (الخادم): يستقبل كارت الشبكة الإشارات ويجمع الإطار ويتأكد من خلوه من الأخطاء عبر CRC. يزيل ترويسة وخاتمة Layer 2 ويمرر الحزمة لطبقة الشبكة لتفحص IP الوجهة. تزيل ترويسة IP وتمرر القطاع لطبقة النقل لمطابقة المنفذ وتجميع التسلسل. تزيل ترويسة TCP ويمرر طلب HTTP النقي لتطبيق الويب ليجيب العميل.',
    keyPoints: ['Application HTTP data to Transport Segment', 'Transport Segment to Network Packet with IP headers', 'Network Packet to Data Link Frame with MAC and CRC trailer', 'Decapsulation reverse stripping process at server']
  },
  {
    id: 'q-net2-13', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'The OSI model itself is best described as:',
    questionAr: 'نموذج OSI نفسه أحسن وصف ليه هو:',
    options: [
      'A layered framework for the design of network systems, not a protocol',
      'A routing protocol used between ISPs',
      'A physical cable standard',
      'A proprietary Cisco protocol suite'
    ],
    optionsAr: [
      'إطار عمل بطبقات لتصميم أنظمة الشبكات، مش بروتوكول',
      'بروتوكول توجيه بيُستخدم بين مزودي الخدمة',
      'معيار كابلات فيزيائي',
      'مجموعة بروتوكولات مملوكة لشركة Cisco'
    ],
    correctAnswer: 0,
    explanation: 'The lecture states the OSI model is not a protocol; it is a layered framework for the design of network systems that allows communication between all types of computer systems.',
    explanationAr: 'المحاضرة بتقول إن نموذج OSI مش بروتوكول؛ ده إطار عمل بطبقات لتصميم أنظمة الشبكات وبيسمح بالاتصال بين كل أنواع أنظمة الحاسوب.'
  },
  {
    id: 'q-net2-14', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which OSI layer is responsible for transmitting the raw data (a series of 0s and 1s) while taking care of bit rate control?',
    questionAr: 'أنهي طبقة في OSI مسؤولة عن نقل البيانات الخام (سلسلة من 0 و1) مع مراعاة التحكم في معدل الـ bits؟',
    options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Session Layer'],
    optionsAr: ['الطبقة الفيزيائية (Physical)', 'طبقة ربط البيانات (Data Link)', 'طبقة الشبكة (Network)', 'طبقة الجلسة (Session)'],
    correctAnswer: 0,
    explanation: 'The lecture assigns raw bit transmission and bit rate control to the Physical layer, which defines the connector and the electrical cable or wireless technology.',
    explanationAr: 'المحاضرة بتسند نقل الـ bits الخام والتحكم في معدلها للطبقة الفيزيائية، اللي بتحدد الـ connector والكابل الكهربي أو تقنية اللاسلك.'
  },
  {
    id: 'q-net2-15', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'The Data Link layer is composed of which two parts?',
    questionAr: 'طبقة ربط البيانات (Data Link) متكوّنة من أنهي جزئين؟',
    options: ['LLC and MAC', 'TCP and UDP', 'DNS and DHCP', 'PDU and MTU'],
    optionsAr: ['‏LLC وMAC', '‏TCP وUDP', '‏DNS وDHCP', '‏PDU وMTU'],
    correctAnswer: 0,
    explanation: 'The lecture states the Data Link layer is composed of Logical Link Control (LLC) and Media Access Control (MAC).',
    explanationAr: 'المحاضرة بتقول إن طبقة ربط البيانات متكوّنة من الـ LLC (التحكم المنطقي بالوصلة) والـ MAC (التحكم بالوصول للوسيط).'
  },
  {
    id: 'q-net2-16', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which Data Link sublayer identifies network protocols, performs error checking, and synchronizes frames?',
    questionAr: 'أنهي طبقة فرعية في الـ Data Link بتعرّف بروتوكولات الشبكة وبتفحص الأخطاء وبتزامن الـ Frames؟',
    options: ['MAC', 'LLC', 'ARP', 'NIC'],
    optionsAr: ['‏MAC', '‏LLC', '‏ARP', '‏NIC'],
    correctAnswer: 1,
    explanation: 'LLC identifies network protocols, performs error checking, and synchronizes frames; MAC uses MAC addresses to connect devices and defines transmit/receive permissions.',
    explanationAr: 'الـ LLC بتعرّف بروتوكولات الشبكة وبتفحص الأخطاء وبتزامن الـ frames؛ أما الـ MAC فبتستخدم عناوين MAC لتوصيل الأجهزة وبتحدد صلاحيات الإرسال والاستقبال.'
  },
  {
    id: 'q-net2-17', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which OSI layer has the main function to route packets by discovering the best path across a physical network?',
    questionAr: 'أنهي طبقة في OSI وظيفتها الرئيسية توجيه الحزم عن طريق اكتشاف أفضل مسار عبر الشبكة الفيزيائية؟',
    options: ['Network Layer', 'Transport Layer', 'Session Layer', 'Presentation Layer'],
    optionsAr: ['طبقة الشبكة (Network)', 'طبقة النقل (Transport)', 'طبقة الجلسة (Session)', 'طبقة التقديم (Presentation)'],
    correctAnswer: 0,
    explanation: 'The Network layer routes packets by discovering the best path, using network addresses (typically IP addresses) to reach the destination node.',
    explanationAr: 'طبقة الشبكة بتوجّه الحزم عن طريق اكتشاف أفضل مسار، وبتستخدم عناوين الشبكة (عادة عناوين IP) للوصول لجهاز الوجهة.'
  },
  {
    id: 'q-net2-18', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'According to the lecture, which two control functions belong to the Transport layer?',
    questionAr: 'حسب المحاضرة، أنهي وظيفتي تحكم من دول بتخص طبقة النقل (Transport)؟',
    options: [
      'Flow control and error control',
      'Encryption and compression',
      'Session opening and closing',
      'Frame synchronization and MAC learning'
    ],
    optionsAr: [
      'التحكم في التدفق والتحكم في الأخطاء',
      'التشفير والضغط',
      'فتح وإغلاق الجلسات',
      'تزامن الإطارات وتعلم عناوين MAC'
    ],
    correctAnswer: 0,
    explanation: 'The Transport layer carries out flow control (sending data at a rate matching the receiving device connection speed) and error control (re-requesting incorrectly received data).',
    explanationAr: 'طبقة النقل بتقوم بالتحكم في التدفق (إرسال البيانات بمعدل يناسب سرعة اتصال جهاز الاستقبال) والتحكم في الأخطاء (إعادة طلب البيانات اللي وصلت غلط).'
  },
  {
    id: 'q-net2-19', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which functions belong to the Presentation layer as described in the lecture?',
    questionAr: 'أنهي وظائف بتخص طبقة التقديم (Presentation) زي ما المحاضرة وصفتها؟',
    options: [
      'Encoding, encrypting, and compressing data',
      'Opening, maintaining, and closing sessions',
      'Discovering the best routing path',
      'Generating electrical signals on the cable'
    ],
    optionsAr: [
      'ترميز البيانات وتشفيرها وضغطها',
      'فتح الجلسات والحفاظ عليها وإغلاقها',
      'اكتشاف أفضل مسار توجيه',
      'توليد الإشارات الكهربية على الكابل'
    ],
    correctAnswer: 0,
    explanation: 'The Presentation layer prepares data for the application layer, defining how two devices should encode, encrypt, and compress data so it is received correctly.',
    explanationAr: 'طبقة التقديم بتجهز البيانات لطبقة التطبيقات، وبتحدد إزاي الجهازين المفروض يرمزوا ويشفروا ويضغطوا البيانات عشان توصل صح.'
  },
  {
    id: 'q-net2-20', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which set lists only application-layer protocols named in the lecture?',
    questionAr: 'أنهي مجموعة فيها بروتوكولات طبقة التطبيقات بس زي ما المحاضرة ذكرت؟',
    options: [
      'HTTP, FTP, POP, SMTP, and DNS',
      'TCP, UDP, and ICMP',
      'LLC, MAC, and ARP',
      'Ethernet, Token Ring, and Wi-Fi'
    ],
    optionsAr: [
      '‏HTTP وFTP وPOP وSMTP وDNS',
      '‏TCP وUDP وICMP',
      '‏LLC وMAC وARP',
      '‏Ethernet وToken Ring وWi-Fi'
    ],
    correctAnswer: 0,
    explanation: 'The lecture names HTTP, FTP, POP, SMTP, and DNS as application-layer protocol examples used by end-user software such as web browsers and email clients.',
    explanationAr: 'المحاضرة ذكرت الـ HTTP والـ FTP والـ POP والـ SMTP والـ DNS كأمثلة لبروتوكولات طبقة التطبيقات اللي بتستخدمها برامج زي المتصفحات وعملاء البريد.'
  },
  {
    id: 'q-net2-21', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which two OSI layers are missing from the TCP/IP protocol suite?',
    questionAr: 'أنهي طبقتين في OSI مش موجودين في مجموعة بروتوكولات TCP/IP؟',
    options: [
      'Session and Presentation',
      'Transport and Network',
      'Physical and Data Link',
      'Application and Transport'
    ],
    optionsAr: [
      'الجلسة (Session) والتقديم (Presentation)',
      'النقل (Transport) والشبكة (Network)',
      'الفيزيائية (Physical) وربط البيانات (Data Link)',
      'التطبيقات (Application) والنقل (Transport)'
    ],
    correctAnswer: 0,
    explanation: 'Comparing the two models, the session and presentation layers were not added to the TCP/IP suite; the suite application layer combines three OSI layers.',
    explanationAr: 'عند مقارنة النموذجين، طبقتا الجلسة والتقديم متضافوش لمجموعة TCP/IP؛ وطبقة التطبيقات في المجموعة بتجمع ثلاث طبقات من OSI.'
  },
  {
    id: 'q-net2-22', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which three IPv4-related items must be configured on a host?',
    questionAr: 'أنهي ثلاث عناصر متعلقة بـ IPv4 لازم تتظبط على الجهاز؟',
    options: [
      'A unique IPv4 address, the subnet mask, and the default gateway',
      'The MAC address, the port number, and the DNS suffix',
      'The network address, the broadcast address, and the loopback address',
      'The public key, the private key, and the certificate'
    ],
    optionsAr: [
      'عنوان IPv4 فريد، وقناع الشبكة، والـ Default Gateway',
      'عنوان MAC، ورقم الـ Port، ولاحقة الـ DNS',
      'عنوان الشبكة، وعنوان الـ Broadcast، وعنوان الـ Loopback',
      'المفتاح العام، والمفتاح الخاص، والشهادة'
    ],
    correctAnswer: 0,
    explanation: 'The lecture states three addresses must be configured on a host: the unique IPv4 address, the subnet mask that identifies the network/host portions, and the default gateway (the local router interface IP).',
    explanationAr: 'المحاضرة بتقول إن ثلاث عناوين لازم تتظبط على الجهاز: عنوان IPv4 الفريد، وقناع الشبكة اللي بيحدد أجزاء الشبكة/الجهاز، والـ Default Gateway (عنوان واجهة الراوتر المحلي).'
  },
  {
    id: 'q-net2-23', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'Which statement about the prefix length is correct?',
    questionAr: 'أنهي جملة صحيحة بخصوص طول الـ Prefix (Prefix Length)؟',
    options: [
      'It equals the number of bits in the subnet mask set to 1, written in slash notation',
      'It equals the number of host bits remaining in the address',
      'It counts the total octets in the dotted address',
      'It measures the maximum throughput of the link'
    ],
    optionsAr: [
      'بيساوي عدد البتات اللي قيمتها 1 في قناع الشبكة، وبيتكتب بعلامة /',
      'بيساوي عدد بتات الأجهزة المتبقية في العنوان',
      'بيعدّ إجمالي الـ octets في العنوان المنقوط',
      'بيقيس أقصى throughput للوصلة'
    ],
    correctAnswer: 0,
    explanation: 'The prefix length is the shorthand method of expressing the subnet mask: it equals the number of bits set to 1 and is written after a slash, e.g. /24.',
    explanationAr: 'طول الـ prefix هو الطريقة المختصرة لكتابة قناع الشبكة: بيساوي عدد البتات المساوية لـ1 وبيتكتب بعد علامة /، زي /24.'
  },
  {
    id: 'q-net2-24', courseId: 'networks', lectureId: 'net-lec-2', type: 'mcq',
    question: 'In a traditional IPv4 subnet, which address is represented by a host portion of all 1s?',
    questionAr: 'في الشبكة الفرعية التقليدية، أنهي عنوان بيمثّله جزء أجهزة كل بتاته = 1؟',
    options: [
      'The directed broadcast address',
      'The first host address',
      'The network address',
      'The default gateway address'
    ],
    optionsAr: [
      'عنوان الـ Broadcast الموجّه',
      'عنوان أول جهاز',
      'عنوان الشبكة',
      'عنوان الـ Default Gateway'
    ],
    correctAnswer: 0,
    explanation: 'The lecture defines the broadcast address as the address whose host portion is all 1s (e.g. 10.1.1.255); the network address has all 0s, and the first/last hosts end in 1/0 respectively.',
    explanationAr: 'المحاضرة بتعرّف عنوان الـ broadcast إنه العنوان اللي جزء الأجهزة فيه كله 1 (زي 10.1.1.255)؛ وعنوان الشبكة كله 0، وأول وآخر جهاز بينتهيوا بـ1 و0 على الترتيب.'
  },
  {
    id: 'q-net2-25', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'The OSI model is itself a protocol that networked devices exchange with each other.',
    questionAr: 'نموذج OSI نفسه بروتوكول بتبادله أجهزة الشبكة مع بعضها.',
    correctAnswer: false,
    explanation: 'False: OSI is not a protocol — it is a layered framework for designing network systems that allows communication between all types of computer systems.',
    explanationAr: 'غلط! الـ OSI مش بروتوكول — ده إطار عمل بطبقات لتصميم أنظمة الشبكات وبيسمح بالاتصال بين كل أنواع أنظمة الحاسوب.'
  },
  {
    id: 'q-net2-26', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'The MAC sublayer uses MAC addresses to connect devices and defines permissions to transmit and receive data.',
    questionAr: 'الطبقة الفرعية MAC بتستخدم عناوين MAC لتوصيل الأجهزة وبتحدد صلاحيات الإرسال والاستقبال.',
    correctAnswer: true,
    explanation: 'True: the lecture assigns exactly this role to the MAC sublayer, while LLC identifies protocols, performs error checking, and synchronizes frames.',
    explanationAr: 'صح! المحاضرة بتسند الدور ده للطبقة الفرعية MAC، بينما الـ LLC بتعرّف البروتوكولات وبتفحص الأخطاء وبتزامن الـ frames.'
  },
  {
    id: 'q-net2-27', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'The Session layer creates communication channels called sessions between devices, ensuring they remain open and functional while data is being transferred.',
    questionAr: 'طبقة الجلسة (Session) بتنشئ قنوات اتصال اسمها sessions بين الأجهزة، وبتتأكد إنها فضلت مفتوحة وفعالة أثناء نقل البيانات.',
    correctAnswer: true,
    explanation: 'True: the Session layer opens sessions, ensures they remain open and functional during transfer, and closes them when communication ends.',
    explanationAr: 'صح! طبقة الجلسة بتفتح الجلسات وبتضمن استمرارها وفعاليتها أثناء النقل وبتقفلها لما الاتصال يخلص.'
  },
  {
    id: 'q-net2-28', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'The OSI model appeared before the TCP/IP protocol suite.',
    questionAr: 'نموذج OSI ظهوره كان قبل مجموعة بروتوكولات TCP/IP.',
    correctAnswer: false,
    explanation: 'False: the OSI model appeared after the TCP/IP protocol suite was already in place; that existing investment is one of the reasons OSI did not replace it.',
    explanationAr: 'غلط! نموذج OSI ظهر بعد ما مجموعة TCP/IP كانت موجودة وثابتة؛ والاستثمار الموجود ده أحد أسباب إن OSI ما استبدلهاش.'
  },
  {
    id: 'q-net2-29', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'All devices on the same network must have the identical network portion in their IPv4 addresses.',
    questionAr: 'كل الأجهزة الموجودة على نفس الشبكة لازم يكون عندها نفس جزء الشبكة في عناوين IPv4 بتاعتها.',
    correctAnswer: true,
    explanation: 'True: the IPv4 address is hierarchical — network portion plus host portion — and all devices on the same network must have the identical network portion (e.g. 192.168.10.x).',
    explanationAr: 'صح! عنوان الـ IPv4 تراتبي — جزء شبكة وجزء أجهزة — وكل الأجهزة على نفس الشبكة لازم يكون عندها نفس جزء الشبكة (زي 192.168.10.x).'
  },
  {
    id: 'q-net2-30', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'The default gateway is the IP address of the local router interface used to reach destinations outside the local network.',
    questionAr: 'الـ Default Gateway هو عنوان IP لواجهة الراوتر المحلية اللي بتُستخدم للوصول لوجهات خارج الشبكة المحلية.',
    correctAnswer: true,
    explanation: 'True: the lecture defines the default gateway as the IP address of the local router interface, one of the three addresses configured on a host.',
    explanationAr: 'صح! المحاضرة بتعرّف الـ Default Gateway إنه عنوان IP لواجهة الراوتر المحلية، وهو واحد من الثلاث عناوين اللي بتتظبط على الجهاز.'
  },
  {
    id: 'q-net2-31', courseId: 'networks', lectureId: 'net-lec-2', type: 'true_false',
    question: 'In a traditional subnet, the first host address has a host portion of all 0s except the final bit, which is 1.',
    questionAr: 'في الشبكة الفرعية التقليدية، عنوان أول جهاز جزء الأجهزة فيه كلها 0 ما عدا آخر bit وده 1.',
    correctAnswer: true,
    explanation: 'True: the lecture defines the first host address as host bits all 0s ending with a 1 (.00000001), and the last host as all 1s ending with a 0 (.11111110).',
    explanationAr: 'صح! المحاضرة بتعرّف عنوان أول جهاز إن بتات الأجهزة كلها 0 وبيتنهى بـ1 (.00000001)، وآخر جهاز كلها 1 وبيتنهى بـ0 (.11111110).'
  },
  {
    id: 'q-net2-32', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Describe all seven OSI layers in order, with the main function the lecture assigns to each layer.',
    questionAr: 'صف طبقات OSI السبعة بالترتيب، مع الوظيفة الرئيسية اللي المحاضرة أسندتها لكل طبقة.',
    correctAnswer: 'Seven OSI layers with functions.',
    modelAnswer: '1. Physical: responsible for the physical cable or wireless connection between nodes; defines the connector and the electrical cable or wireless technology, and transmits raw bits (0s and 1s) with bit rate control. 2. Data Link: establishes and terminates the connection between two physically connected nodes; composed of LLC (identifies protocols, error checking, synchronizes frames) and MAC (uses MAC addresses, defines transmit/receive permissions). 3. Network: routes packets by discovering the best path across the physical network, using network addresses (typically IP). 4. Transport: carries out flow control (matching the receiving device connection speed) and error control (re-requesting data received incorrectly). 5. Session: creates sessions between devices, keeps them open and functional during transfer, and closes them when communication ends. 6. Presentation: prepares data for the application layer by defining how devices encode, encrypt, and compress data. 7. Application: used by end-user software such as web browsers and email clients, providing protocols like HTTP, FTP, POP, SMTP, and DNS.',
    modelAnswerAr: '1. الفيزيائية: مسؤولة عن الكابل الفيزيائي أو الاتصال اللاسلكي بين العقد؛ بتحدد الـ connector والكابل الكهربي أو تقنية اللاسلك، وبتنقل الـ bits الخام (0 و1) مع التحكم في المعدل. 2. ربط البيانات: بتنشئ وتنهي الاتصال بين عقدتين متصلتين فيزيائيًا؛ ومتكوّنة من LLC (تعريف البروتوكولات وفحص الأخطاء وتزامن الـ frames) وMAC (استخدام عناوين MAC وتحديد صلاحيات الإرسال والاستقبال). 3. الشبكة: بتوجّه الحزم باكتشاف أفضل مسار عبر الشبكة الفيزيائية باستخدام عناوين الشبكة (عادة IP). 4. النقل: بتنفذ التحكم في التدفق (مطابقة سرعة اتصال المستقبل) والتحكم في الأخطاء (إعادة طلب البيانات اللي وصلت غلط). 5. الجلسة: بتنشئ الجلسات بين الأجهزة وبتحافظ عليها مفتوحة وفعالة أثناء النقل وبتقفلها عند الانتهاء. 6. التقديم: بتجهز البيانات لطبقة التطبيقات بتحديد إزاي الأجهزة ترمز وتشفّر وضغط البيانات. 7. التطبيقات: بتستخدمها برامج المستخدم زي المتصفحات وعملاء البريد، وبتوفّر بروتوكولات زي HTTP وFTP وPOP وSMTP وDNS.',
    keyPoints: ['Physical raw bits and bit rate control', 'Data Link LLC + MAC', 'Network best path routing', 'Transport flow and error control', 'Session open/keep/close', 'Presentation encode/encrypt/compress', 'Application protocols HTTP FTP POP SMTP DNS']
  },
  {
    id: 'q-net2-33', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Compare the two Data Link sublayers (LLC and MAC) regarding their responsibilities as described in the lecture.',
    questionAr: 'قارن بين طبقتي الـ Data Link الفرعيتين (LLC وMAC) من حيث المسؤوليات زي ما المحاضرة وصفتها.',
    correctAnswer: 'LLC vs MAC responsibilities.',
    modelAnswer: 'LLC (Logical Link Control): identifies network protocols, performs error checking, and synchronizes frames — it is the interface toward the network layer protocols above. MAC (Media Access Control): uses MAC addresses to connect devices and defines permissions to transmit and receive data — it is the interface toward the physical medium below. Together the two sublayers let the Data Link layer establish and terminate connections between two physically connected nodes on the network.',
    modelAnswerAr: 'الـ LLC (التحكم المنطقي بالوصلة): بتعرّف بروتوكولات الشبكة وبتفحص الأخطاء وبتزامن الـ frames — وهي الواجهة ناحية بروتوكولات طبقة الشبكة اللي فوقها. الـ MAC (التحكم بالوصول للوسيط): بتستخدم عناوين MAC لتوصيل الأجهزة وبتحدد صلاحيات الإرسال والاستقبال — وهي الواجهة ناحية الوسيط الفيزيائي اللي تحتها. الاتنين مع بعض بيخلوطبقة ربط البيانات تنشئ وتنهي الاتصال بين عقدتين متصلتين فيزيائيًا على الشبكة.',
    keyPoints: ['LLC: protocol identification, error checking, frame sync', 'MAC: MAC addressing, transmit/receive permissions', 'Two sublayers split Layer 2 duties']
  },
  {
    id: 'q-net2-34', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Explain the three reasons, agreed upon by experts in the lecture, why the OSI model did not replace the TCP/IP protocol suite.',
    questionAr: 'اشرح الأسباب الثلاثة اللي اتفق عليها الخبراء في المحاضرة لعدم استبدال الـ OSI لمجموعة بروتوكولات TCP/IP.',
    correctAnswer: 'Three reasons OSI did not replace TCP/IP.',
    modelAnswer: '1. OSI was completed when TCP/IP was fully in place and a lot of time and money had been spent on the suite; changing it would cost a lot. 2. Some layers in the OSI model were never fully defined (the session and presentation layers). 3. OSI implementation issues. The lecture notes most experts were initially excited and expected TCP/IP to be fully replaced by OSI, but these three reasons prevented that.',
    modelAnswerAr: '1. الـ OSI خلص تطويره والـ TCP/IP كان مستقر بالكامل وسُرف وقت وفلوس كتير على المجموعة؛ وتغييرها كان هياكل تكلفة ضخمة. 2. بعض طبقات الـ OSI عمرها ما اتعرّفت بالكامل (طبقتا الجلسة والتقديم). 3. مشاكل تنفيذ الـ OSI. والمحاضرة بتوضح إن معظم الخبراء كانوا متحمسين في البداية وتوقعوا استبدال TCP/IP بالكامل بـ OSI، بس الأسباب التلاتة دول منعوا كده.',
    keyPoints: ['TCP/IP already installed, expensive to change', 'Session and presentation never fully defined', 'OSI implementation issues']
  },
  {
    id: 'q-net2-35', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Trace the seven steps of the "Putting It All Together" journey from the lecture, from typing a message to its delivery at the destination.',
    questionAr: 'تتبّع الخطوات السبع لرحلة "Putting It All Together" اللي ذكرتها المحاضرة، من كتابة الرسالة لحد تسليمها عند الوجهة.',
    correctAnswer: 'Seven-step end-to-end message journey.',
    modelAnswer: '1. The message is converted to binary. 2. The NIC generates signals. 3. The signals are passed among LAN devices. 4. The bits exit the local area through the router. 5. Bits are transmitted to the devices that interconnect the networks (represented by the cloud). 6. The data is passed among local devices at the destination. 7. The destination device converts the bits into human-readable form.',
    modelAnswerAr: '1. الرسالة بتتحول لـ binary. 2. الـ NIC بيولّد الإشارات. 3. الإشارات بتعدّي على أجهزة الـ LAN. 4. الـ bits بتخرج من المنطقة المحلية عبر الـ router. 5. الـ bits بتتنقل لأجهزة الربط بين الشبكات (الممثلة بالـ cloud). 6. البيانات بتعدّي على الأجهزة المحلية عند الوجهة. 7. جهاز الوجهة بيحوّل الـ bits لصيغة مقروءة للإنسان.',
    keyPoints: ['Convert to binary then NIC signals', 'LAN devices then router exit', 'Interconnecting devices (cloud)', 'Destination LAN devices then readable form']
  },
  {
    id: 'q-net2-36', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Explain how an IPv4 octet is converted from binary to decimal using positional values, and state why an IPv4 address is written as four octets.',
    questionAr: 'اشرح إزاي octet واحد في IPv4 بيتحول من ثنائي لعشري باستخدام القيم المكانية، ووضح ليه عنوان IPv4 بيتكتب كأربع octets.',
    correctAnswer: 'Binary to decimal conversion with positional values.',
    modelAnswer: 'Binary uses only 0s and 1s (bits). An IPv4 address is 32 binary bits divided into four 8-bit octets, which is why it is written as four decimal numbers separated by dots (dotted decimal notation). To convert one octet, write its 8 bits under the positional value row (128, 64, 32, 16, 8, 4, 2, 1) and calculate the sum of the positions whose value is 1. For example, 11000000 = 128 + 64 = 192, which is how the first octet of 192.168.10.0 is produced.',
    modelAnswerAr: 'النظام الثنائي بيتكون من 0 و1 بس (bits). وعنوان IPv4 طوله 32 bit مقسوم لأربع octets كل واحدة 8 bits — وده سبب كتابته كأربع أرقام عشرية بينها نقط (الترميز العشري المنقوط). للتحويل، اكتب الـ 8 بتات بتاعة الـ octet تحت صف القيم المكانية (128 و64 و32 و16 و8 و4 و2 و1) واجمع القيم اللي فوقها 1. مثال: 11000000 = 128 + 64 = 192، وده إزاي أول octet في 192.168.10.0 بيتكوّن.',
    keyPoints: ['Binary = 0s and 1s (bits)', 'IPv4 = 32 bits in four 8-bit octets', 'Positional values 128..1 per octet', 'Sum positions holding 1s']
  },
  {
    id: 'q-net2-37', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Explain the network portion and host portion of an IPv4 address, and how the subnet mask identifies them bit by bit, using the 192.168.10.x example from the lecture.',
    questionAr: 'اشرح جزء الشبكة وجزء الأجهزة في عنوان IPv4، وإزاي قناع الشبكة بيحددهم بتة بتة، مستخدمًا مثال 192.168.10.x من المحاضرة.',
    correctAnswer: 'Network vs host portion and mask identification.',
    modelAnswer: 'The IPv4 address is hierarchical, composed of a network portion and a host portion. All devices on the same network must have the identical network portion: in the lecture example, 192.168.10.1 through 192.168.10.5 belong to network 192.168.10.0. The subnet mask helps devices separate the two portions: the IPv4 address is compared to the subnet mask bit by bit, from left to right, and a 1 in the subnet mask marks the corresponding address bit as a network bit. Devices on the same network share the same mask result.',
    modelAnswerAr: 'عنوان الـ IPv4 تراتبي ومتكوّن من جزء شبكة وجزء أجهزة. وكل الأجهزة على نفس الشبكة لازم يكون عندها نفس جزء الشبكة: في مثال المحاضرة، الأجهزة من 192.168.10.1 لـ 192.168.10.5 تابعة للشبكة 192.168.10.0. وقناع الشبكة بيساعد الأجهزة تفرز الجزئين: العنوان بيتقارن مع قناع الشبكة بتة بتة من الشمال لليمين، وأي 1 في القناع بيحدد إن الـ bit المقابل في العنوان بت شبكة. والأجهزة على نفس الشبكة بتطلع بنفس نتيجة القناع.',
    keyPoints: ['Hierarchical: network + host portions', 'Same network = identical network portion', 'Mask compared bit by bit left to right', 'Mask 1 marks network bits', '192.168.10.1-.5 share 192.168.10.0']
  },
  {
    id: 'q-net2-38', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Describe the four special address types in a traditional IPv4 subnet (network, first host, last host, broadcast) and give an example for each using a /24 subnet.',
    questionAr: 'صف أنواع العناوين الأربعة الخاصة في الشبكة الفرعية التقليدية لـ IPv4 (الشبكة، أول جهاز، آخر جهاز، البث) واعطِ مثال لكل منها في شبكة /24.',
    correctAnswer: 'Network, first host, last host, broadcast types.',
    modelAnswer: '1. Network address: the host portion is all 0s (.00000000) — e.g. 192.168.1.0. 2. First host address: the host portion is all 0s and ends with a 1 (.00000001) — e.g. 192.168.1.1. 3. Last host address: the host portion is all 1s and ends with a 0 (.11111110) — e.g. 192.168.1.254. 4. Broadcast address: the host portion is all 1s (.11111111) — e.g. 192.168.1.255. The lecture shows the same pattern with 10.1.1.255 as a broadcast address.',
    modelAnswerAr: '1. عنوان الشبكة: جزء الأجهزة كله أصفار (.00000000) — مثال 192.168.1.0. 2. عنوان أول جهاز: جزء الأجهزة كله أصفار وبيتنهى بـ1 (.00000001) — مثال 192.168.1.1. 3. عنوان آخر جهاز: جزء الأجهزة كله واحدات وبيتنهى بـ0 (.11111110) — مثال 192.168.1.254. 4. عنوان البث: جزء الأجهزة كله واحدات (.11111111) — مثال 192.168.1.255. والمحاضرة بتعرض نفس النمط بمثال 10.1.1.255 كعنوان بث.',
    keyPoints: ['Network: host bits all 0s', 'First host: ends in 1', 'Last host: ends in 0', 'Broadcast: host bits all 1s']
  },
  {
    id: 'q-net2-39', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Compare the OSI seven-layer model with the TCP/IP model: which OSI layers are missing from TCP/IP, how does the TCP/IP application layer combine them, and how do the lower layers map?',
    questionAr: 'قارن بين نموذج OSI السبعي ونموذج TCP/IP: أنهي طبقات OSI ناقصة في TCP/IP، وإزاي طبقة التطبيقات بتجمعهم، وإزاي الطبقات السفلية بتتقابل؟',
    correctAnswer: 'OSI vs TCP/IP layer mapping.',
    modelAnswer: 'When the two models are compared, the session and presentation layers are missing from the TCP/IP suite; they were never added after the publication of the OSI model. The TCP/IP application layer is usually considered the combination of the three OSI layers (session, presentation, application), as shown in Figure 2.12. Below that, the TCP/IP transport layer corresponds to the OSI transport layer, and the TCP/IP internet (network) layer corresponds to the OSI network layer; the lower link/physical functions map to OSI data link and physical layers. The lecture teaching figure uses a five-layer TCP/IP model (application, transport, network, data link, physical), while the four-layer convention combines data link and physical into the network access layer.',
    modelAnswerAr: 'عند مقارنة النموذجين، طبقتا الجلسة والتقديم مش موجودين في مجموعة TCP/IP؛ وعمروا ما اتضافوا بعد صدور نموذج OSI. وطبقة التطبيقات في TCP/IP بتعتبر عادةً دمجًا لثلاث طبقات OSI (الجلسة والتقديم والتطبيقات) زي ما رسم 2.12 بيوضح. تحتها، طبقة النقل في TCP/IP بتقابل طبقة النقل في OSI، وطبقة الإنترنت (الشبكة) في TCP/IP بتقابل طبقة الشبكة في OSI؛ ووظائف الربط والفيزيائية السفلية بتقابل طبقتي ربط البيانات والفيزيائية في OSI. ورسم المحاضرة التعليمي بيستخدم نموذج TCP/IP بخمس طبقات (تطبيقات ونقل وشبكة وربط بيانات وفيزيائية)، بينما الاتفاق رباعي الطبقات بيجمع ربط البيانات والفيزيائية في طبقة الوصول للشبكة.',
    keyPoints: ['Session and presentation missing from TCP/IP', 'TCP/IP application = OSI layers 5-7', 'Transport and network map directly', 'Five-layer teaching vs four-layer convention']
  },
  {
    id: 'q-net2-40', courseId: 'networks', lectureId: 'net-lec-2', type: 'essay',
    question: 'Discuss static IPv4 address assignment as described in the lecture: which devices require it, why, and what may be configured statically in small networks.',
    questionAr: 'ناقش العنونة الثابتة (Static) لـ IPv4 زي ما المحاضرة وصفتها: أنهي أجهزة محتاجاها، وليه، وإيه اللي ممكن يتظبط ثابت في الشبكات الصغيرة.',
    correctAnswer: 'Static IPv4 assignment discussion.',
    modelAnswer: 'Some devices like printers, servers, and network devices require a fixed (static) IP address: their services must be reachable at the same address, so a changing address would break access for clients and administration. Hosts in a small network can also be configured with static addresses instead of receiving them dynamically. The lecture places this discussion beside IPv4 unicast, broadcast, and multicast communication, noting that whatever assignment method is used, the host still needs its unique address, subnet mask, and default gateway configured.',
    modelAnswerAr: 'بعض الأجهزة زي الطابعات والسيرفرات وأجهزة الشبكة محتاجة عنوان IP ثابت (static): لأن خدماتهم لازم تكون متاحة على نفس العنوان دايمًا، وأي تغيير في العنوان هيكسر الوصول للعملاء وللإدارة. وأجهزة الشبكات الصغيرة كمان ممكن تتظبط بعناوين ثابتة بدل استلامها ديناميكيًا. والمحاضرة حاطة النقاش ده جنب أنماط الاتصال Unicast وBroadcast وMulticast، مع ملاحظة إن أي طريقة عنونة كانت، الجهاز برضه محتاج عنوانه الفريد وقناع الشبكة والـ Default Gateway متظبطين.',
    keyPoints: ['Printers, servers, network devices need fixed addresses', 'Changing addresses break service reachability', 'Small networks may also use static hosts', 'Address, mask, gateway still required']
  }
];

const lecture3Questions: Question[] = [
  {
    id: 'q-net3-1', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'How many host bits must be borrowed to create at least 6 equal-size subnets from a /24?',
    questionAr: 'محتاجين نستلف كام bit من جزء الـhost عشان نعمل 6 subnets متساوية أو أكتر من /24؟',
    options: ['2 bits', '3 bits', '4 bits', '6 bits'],
    optionsAr: ['2 bits', '3 bits', '4 bits', '6 bits'], correctAnswer: 1,
    explanation: 'Three borrowed bits create 2³ = 8 subnets, the smallest power of two that is at least 6.',
    explanationAr: 'استلاف 3 bits بيعمل 2³ = 8 subnets، وده أصغر عدد من قوى 2 يوصل لـ6 أو يعدّيها.',
    difficulty: 'easy',
  },
  {
    id: 'q-net3-2', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'Which prefix divides 192.168.1.0/24 into four equal-size subnets?',
    questionAr: 'أنهي prefix بيقسّم 192.168.1.0/24 لأربع subnets متساوية؟',
    options: ['/25', '/26', '/27', '/28'],
    optionsAr: ['/25', '/26', '/27', '/28'], correctAnswer: 1,
    explanation: 'Borrowing 2 bits creates 2² = 4 subnets, so the prefix becomes /24 + 2 = /26.',
    explanationAr: 'استلاف 2 bits بيعمل 2² = 4 subnets، فـprefix الجديد يبقى /24 + 2 = /26.',
    difficulty: 'easy',
  },
  {
    id: 'q-net3-3', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'What is the traditional usable-host count in each /23 subnet?',
    questionAr: 'كام عنوان host قابل للاستخدام بالطريقة التقليدية في كل subnet من نوع /23؟',
    options: ['128', '256', '510', '512'],
    optionsAr: ['128', '256', '510', '512'], correctAnswer: 2,
    explanation: 'A /23 leaves 9 host bits: 2⁹ − 2 = 510 traditional usable host addresses.',
    explanationAr: 'الـ/23 بيسيب 9 host bits: ‏2⁹ − 2 = 510 عنوان host قابل للاستخدام بالطريقة التقليدية.',
    difficulty: 'medium',
  },
  {
    id: 'q-net3-4', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'Borrowing more host bits creates more subnets but fewer host bits in each subnet.',
    questionAr: 'استلاف عدد أكبر من host bits بيعمل subnets أكتر، بس بيسيب host bits أقل في كل subnet.',
    correctAnswer: true,
    explanation: 'Each borrowed bit doubles the subnet count and removes one bit from the host portion.',
    explanationAr: 'كل bit بنستلفها بتضاعف عدد الـsubnets وبتشيل bit من الجزء المخصص للـhosts.',
    difficulty: 'easy',
  },
  {
    id: 'q-net3-5', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'For a /26 mask, what is the block size in the changing fourth octet?',
    questionAr: 'لو الـmask هي /26، كام حجم الـblock في الـoctet الرابع اللي بيتغيّر؟',
    options: ['16', '32', '64', '128'],
    optionsAr: ['16', '32', '64', '128'], correctAnswer: 2,
    explanation: 'A /26 mask is 255.255.255.192; the block size is 256 − 192 = 64.',
    explanationAr: 'الـmask بتاعة /26 هي 255.255.255.192؛ حجم الـblock يساوي 256 − 192 = 64.',
    difficulty: 'medium',
  },
  {
    id: 'q-net3-6', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'In network throughput modeling, how does the download time equation T = S / BW compare with T = S / P when measuring actual payload transfer rate P?',
    questionAr: 'في نمذجة نقل البيانات، كيف تقارن معادلة زمن التحميل T = S / BW مع T = S / P عند قياس سرعة نقل الحمولة الفعلية P؟',
    options: [
      'T = S / BW always gives a longer time than T = S / P',
      'T = S / BW is theoretical channel time, whereas T = S / P reflects measured throughput including protocol overhead and delays',
      'Both formulas give identical times under all network conditions',
      'P is always greater than bandwidth BW'
    ],
    optionsAr: [
      'T = S / BW تعطي دائماً زمناً أطول من T = S / P',
      'T = S / BW هو الزمن النظري لسعة القناة، بينما T = S / P يعكس السرعة الفعلية شاملة تأخير البروتوكولات والازدحام',
      'المعادلتان تعطيان نفس النتيجة تحت كافة ظروف الشبكة',
      'الحمولة P دائماً أكبر من سعة القناة BW'
    ],
    correctAnswer: 1,
    explanation: 'T = S / BW calculates theoretical minimum transmission time based on channel capacity, whereas T = S / P calculates real-world time based on actual measured throughput P (where P <= BW).',
    explanationAr: 'المعادلة T = S / BW تحسب الزمن النظري لسعة السلك، بينما T = S / P تعكس الواقع الفعلي المقاس شاملة التأخير والهيدرز.'
  },
  {
    id: 'q-net3-7', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'Subnetting a 10.0.0.0/8 network on an octet boundary by choosing a /16 prefix yields exactly 256 subnets with 65,534 usable hosts each.',
    questionAr: 'تقسيم شبكة 10.0.0.0/8 عند حدود الـ Octet باختيار بادئة /16 ينتج بالضبط 256 شبكة فرعية بكل منها 65,534 جهازاً صالحاً.',
    correctAnswer: true,
    explanation: 'True: Borrowing 8 bits (from /8 to /16) yields 2⁸ = 256 subnets; the remaining 16 host bits yield 2¹⁶ - 2 = 65,534 usable hosts.',
    explanationAr: 'صح! استلاف 8 بتات (من /8 إلى /16) ينتج 2⁸ = 256 شبكة، والـ 16 بت المتبقية تعطي 2¹⁶ - 2 = 65,534 جهازاً.'
  },
  {
    id: 'q-net3-8', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'For the subnet 192.168.1.64/26, what is the directed broadcast address?',
    questionAr: 'للشبكة الفرعية 192.168.1.64/26، ما هو عنوان البث الشامل (Broadcast Address) المخصص لها؟',
    options: ['192.168.1.95', '192.168.1.127', '192.168.1.128', '192.168.1.255'],
    optionsAr: ['192.168.1.95', '192.168.1.127', '192.168.1.128', '192.168.1.255'],
    correctAnswer: 1,
    explanation: 'Block size for /26 is 64. Next network is 192.168.1.128. Broadcast is the preceding address: 192.168.1.127.',
    explanationAr: 'حجم البلوك لـ /26 هو 64، والشبكة التالية تبدأ عند 128، فيكون عنوان البث هو السابق لها مباشرة 192.168.1.127.'
  },
  {
    id: 'q-net3-9', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'How many total IP addresses and usable host addresses exist in a /30 point-to-point router interconnection subnet?',
    questionAr: 'كم عدد العناوين الإجمالية والعناوين الصالحة للأجهزة في شبكة /30 المخصصة لربط موجهين (Point-to-Point)؟',
    options: ['2 total, 1 usable', '4 total, 2 usable', '8 total, 6 usable', '16 total, 14 usable'],
    optionsAr: ['2 إجمالي، 1 صالح', '4 إجمالي، 2 صالح', '8 إجمالي، 6 صالح', '16 إجمالي، 14 صالح'],
    correctAnswer: 1,
    explanation: 'A /30 leaves 2 host bits: 2² = 4 total addresses. Subtracting network and broadcast yields 4 - 2 = 2 usable host addresses.',
    explanationAr: 'البادئة /30 تترك بتين للأجهزة: 2² = 4 عناوين إجمالية، وبطرح عنواني الشبكة والبث يتبقى 2 عنوان صالح للراوترين.'
  },
  {
    id: 'q-net3-10', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'When an Ethernet switch receives a frame whose destination MAC address is not present in its CAM table, it drops the frame immediately.',
    questionAr: 'عندما يستقبل سويتش إيثرنت إطاراً لا يوجد عنوان MAC الخاص بوجهته داخل جدول CAM، فإنه يقوم بإسقاط الإطار (Drop) فوراً.',
    correctAnswer: false,
    explanation: 'False: The switch floods the frame (unknown unicast flooding) out all ports in the same VLAN except the ingress port.',
    explanationAr: 'غلط! السويتش يقوم بعملية إغراق (Flooding) فيرسل الإطار لكافة المنافذ في نفس الـ VLAN ما عدا المنفذ الذي دخل منه.'
  },
  {
    id: 'q-net3-11', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'To create at least 100 subnets from 172.16.0.0/16, how many bits must be borrowed, and what is the block size in the third octet?',
    questionAr: 'لإنشاء 100 شبكة فرعية على الأقل من الشبكة 172.16.0.0/16، كم بت يجب استلافها وما هو حجم البلوك في الخانة الثالثة؟',
    options: [
      'Borrow 6 bits -> /22, block size 4',
      'Borrow 7 bits -> /23, block size 2',
      'Borrow 8 bits -> /24, block size 1',
      'Borrow 5 bits -> /21, block size 8'
    ],
    optionsAr: [
      'استلاف 6 بتات -> /22، حجم البلوك 4',
      'استلاف 7 بتات -> /23، حجم البلوك 2',
      'استلاف 8 بتات -> /24، حجم البلوك 1',
      'استلاف 5 بتات -> /21، حجم البلوك 8'
    ],
    correctAnswer: 1,
    explanation: 'Borrowing 7 bits gives 2⁷ = 128 subnets (>= 100). New prefix is /16 + 7 = /23. Mask is 255.255.254.0. Block size in 3rd octet = 256 - 254 = 2.',
    explanationAr: 'استلاف 7 بتات يعطي 2⁷ = 128 شبكة (تكفي الـ 100). البادئة تصبح /23، والقناع 255.255.254.0، وحجم القفزة في الخانة الثالثة 256 - 254 = 2.'
  },
  {
    id: 'q-net3-12', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'Walk through the complete subnetting procedure to divide 192.168.10.0/24 into 8 equal-size subnets. State borrowed bits, new CIDR prefix, subnet mask, block size, and list the Network ID, usable host range, and Broadcast address for the first three subnets.',
    questionAr: 'وضح الخطوات الحسابية الكاملة لتقسيم شبكة 192.168.10.0/24 إلى 8 شبكات فرعية متساوية. اذكر البتات المستعارة، البادئة الجديدة، قناع الشبكة، حجم البلوك، واكتب عنوان الشبكة ونطاق الأجهزة الصالحة وعنوان البث لأول 3 شبكات.',
    correctAnswer: 'Complete /24 into 8 subnets calculation and first 3 subnets table.',
    modelAnswer: '1. Borrowed Bits: 2^n >= 8 -> borrow n = 3 bits (2^3 = 8 subnets). 2. New CIDR Prefix: /24 + 3 = /27. 3. Subnet Mask: In 4th octet, 3 bits = 128 + 64 + 32 = 224 -> Mask is 255.255.255.224. 4. Block Size: 256 - 224 = 32 in the fourth octet. Remaining host bits = 8 - 3 = 5, yielding 2^5 - 2 = 30 usable hosts per subnet. 5. First 3 Subnets: Subnet 1: Network ID = 192.168.10.0, Usable Hosts = 192.168.10.1 to 192.168.10.30, Broadcast = 192.168.10.31. Subnet 2: Network ID = 192.168.10.32, Usable Hosts = 192.168.10.33 to 192.168.10.62, Broadcast = 192.168.10.63. Subnet 3: Network ID = 192.168.10.64, Usable Hosts = 192.168.10.65 to 192.168.10.94, Broadcast = 192.168.10.95.',
    modelAnswerAr: '1. البتات المستعارة: 2^n >= 8 -> نستلف n = 3 بتات (تعطي 8 شبكات بالضبط). 2. البادئة الجديدة: /24 + 3 = /27. 3. قناع الشبكة: الخانة الرابعة فيها 3 بتات (128 + 64 + 32 = 224) -> القناع هو 255.255.255.224. 4. حجم البلوك: 256 - 224 = 32 في الخانة الرابعة. البتات المتبقية للأجهزة = 5، فتعطي 2^5 - 2 = 30 جهازاً صالحاً في كل شبكة. 5. أول 3 شبكات: الشبكة الأولى: عنوان الشبكة 192.168.10.0، الأجهزة الصالحة 192.168.10.1 إلى 192.168.10.30، البث 192.168.10.31. الشبكة الثانية: عنوان الشبكة 192.168.10.32، الأجهزة الصالحة 192.168.10.33 إلى 192.168.10.62، البث 192.168.10.63. الشبكة الثالثة: عنوان الشبكة 192.168.10.64، الأجهزة الصالحة 192.168.10.65 إلى 192.168.10.94، البث 192.168.10.95.',
    keyPoints: ['Borrow 3 bits for 8 subnets resulting in /27 mask 255.255.255.224', 'Block size is 32 with 30 usable hosts per subnet', 'Subnet 1: .0 net, .1-.30 hosts, .31 bcast', 'Subnet 2: .32 net, .33-.62 hosts, .63 bcast', 'Subnet 3: .64 net, .65-.94 hosts, .95 bcast']
  },
  {
    id: 'q-net3-13', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'What is subnetting, according to the lecture definition?',
    questionAr: 'إيه تعريف الـ Subnetting حسب المحاضرة؟',
    options: [
      'The process of dividing one larger IP network into multiple smaller logical networks called subnets',
      'The process of merging several small networks into one broadcast domain',
      'The assignment of MAC addresses to network interfaces',
      'The conversion of IPv4 addresses into IPv6 addresses'
    ],
    optionsAr: [
      'عملية تقسيم شبكة IP كبيرة واحدة لعدة شبكات منطقية أصغر اسمها subnets',
      'عملية دمج عدة شبكات صغيرة في نطاق بث واحد',
      'عملية توزيع عناوين MAC على واجهات الشبكة',
      'عملية تحويل عناوين IPv4 إلى IPv6'
    ],
    correctAnswer: 0,
    explanation: 'The lecture defines subnetting as dividing one larger IP network into multiple smaller logical networks, where each subnet has its own network address and broadcast address.',
    explanationAr: 'المحاضرة بتعرّف الـ Subnetting إنه تقسيم شبكة IP كبيرة واحدة لعدة شبكات منطقية أصغر، وكل subnet ليها عنوان شبكة وعنوان broadcast خاصين بيها.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-14', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'According to the lecture glossary, what are borrowed bits?',
    questionAr: 'حسب قاموس المصطلحات في المحاضرة، إيه معنى الـ Borrowed bits؟',
    options: [
      'Bits moved from the host portion to the network portion to create more subnets',
      'Bits moved from the network portion to the host portion to add hosts',
      'The total number of octets in the subnet mask',
      'Bits reserved for the broadcast address'
    ],
    optionsAr: [
      'بتات بتنتقل من جزء الأجهزة لجزء الشبكة عشان تتعمل subnets أكتر',
      'بتات بتنتقل من جزء الشبكة لجزء الأجهزة عشان تزيد الأجهزة',
      'إجمالي عدد الـ octets في قناع الشبكة',
      'بتات محجوزة لعنوان الـ broadcast'
    ],
    correctAnswer: 0,
    explanation: 'The glossary defines borrowed bits as bits moved from the host portion to the network portion to create more subnets.',
    explanationAr: 'قاموس المصطلحات بيعرّف الـ borrowed bits إنها بتات منتقلة من جزء الأجهزة لجزء الشبكة عشان يتعمل subnets أكتر.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-15', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'What is the block size, according to the lecture glossary?',
    questionAr: 'إيه تعريف حجم الـ Block (Block size) حسب قاموس المحاضرة؟',
    options: [
      'The increment between consecutive subnet network addresses in the changing octet',
      'The total number of subnets in the network',
      'The number of usable hosts minus the broadcast address',
      'The length of the subnet mask in decimal digits'
    ],
    optionsAr: [
      'الفاصل الزائد بين عناوين شبكات الـ subnets المتتالية في الـ octet المتغيّر',
      'إجمالي عدد الـ subnets في الشبكة',
      'عدد الـ hosts القابلة للاستخدام مطروح منه عنوان البث',
      'طول قناع الشبكة بالأرقام العشرية'
    ],
    correctAnswer: 0,
    explanation: 'The glossary defines the block size as the increment between consecutive subnet network addresses in the changing octet (e.g. 32 in the fourth octet for /27).',
    explanationAr: 'قاموس المصطلحات بيعرّف حجم الـ block إنه مقدار الزيادة بين عناوين شبكات الـ subnets المتتالية في الـ octet المتغيّر (زي 32 في الـ octet الرابع للـ /27).',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-16', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'Following the lecture worked example, dividing 192.168.1.0/24 into at least 6 subnets gives which new prefix and subnet mask?',
    questionAr: 'بناءً على المثال المحلول في المحاضرة، تقسيم 192.168.1.0/24 لـ 6 subnets على الأقل بيطلع أنهي prefix وقناع جديد؟',
    options: [
      '/27 and 255.255.255.224',
      '/26 and 255.255.255.192',
      '/28 and 255.255.255.240',
      '/25 and 255.255.255.128'
    ],
    optionsAr: [
      '‏/27 والقناع 255.255.255.224',
      '‏/26 والقناع 255.255.255.192',
      '‏/28 والقناع 255.255.255.240',
      '‏/25 والقناع 255.255.255.128'
    ],
    correctAnswer: 0,
    explanation: 'The deck example: 2³ = 8 subnets is the smallest power of two covering 6, so borrow 3 bits: new prefix 24 + 3 = /27, and the last mask octet 11100000 = 224 gives 255.255.255.224.',
    explanationAr: 'مثال الديك: ‏2³ = 8 subnets هي أقل قوة للعدد 2 تغطي الـ 6، فبنستلف 3 بتات: الـ prefix الجديد 24 + 3 = /27، وآخر octet في القناع 11100000 = 224 يعطي 255.255.255.224.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-17', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'What is the block size for the subnet mask 255.255.255.224?',
    questionAr: 'كام حجم الـ Block (Block size) لقناع الشبكة 255.255.255.224؟',
    options: ['16', '32', '64', '128'],
    optionsAr: ['16', '32', '64', '128'],
    correctAnswer: 1,
    explanation: 'From the deck practice questions: the block size is 256 − 224 = 32, so network addresses increase by 32 in the fourth octet.',
    explanationAr: 'من أسئلة التدريب في الديك: حجم الـ block يساوي 256 − 224 = 32، فعناوين الشبكات بتزيد 32 في الـ octet الرابع.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-18', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'How many usable hosts are in a /26 subnet?',
    questionAr: 'كام جهاز قابل للاستخدام (Usable hosts) في subnet من نوع /26؟',
    options: ['30', '62', '64', '126'],
    optionsAr: ['30', '62', '64', '126'],
    correctAnswer: 1,
    explanation: 'From the deck practice questions: a /26 leaves 6 host bits, giving 2⁶ = 64 total addresses and 64 − 2 = 62 usable hosts.',
    explanationAr: 'من أسئلة التدريب في الديك: الـ /26 بتسيب 6 host bits، يعني 2⁶ = 64 عنوان إجمالي و64 − 2 = 62 جهاز قابل للاستخدام.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-19', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'What are the four /26 network addresses inside 192.168.1.0/24?',
    questionAr: 'إيه عناوين الشبكات الأربعة من نوع /26 اللي جوه 192.168.1.0/24؟',
    options: [
      '192.168.1.0, 192.168.1.64, 192.168.1.128, and 192.168.1.192',
      '192.168.1.0, 192.168.1.32, 192.168.1.64, and 192.168.1.96',
      '192.168.1.0, 192.168.1.128, 192.168.1.192, and 192.168.1.224',
      '192.168.1.0, 192.168.1.16, 192.168.1.32, and 192.168.1.48'
    ],
    optionsAr: [
      '‏192.168.1.0 و192.168.1.64 و192.168.1.128 و192.168.1.192',
      '‏192.168.1.0 و192.168.1.32 و192.168.1.64 و192.168.1.96',
      '‏192.168.1.0 و192.168.1.128 و192.168.1.192 و192.168.1.224',
      '‏192.168.1.0 و192.168.1.16 و192.168.1.32 و192.168.1.48'
    ],
    correctAnswer: 0,
    explanation: 'From the deck practice questions: with block size 64, the /26 network addresses advance by 64 in the fourth octet: .0, .64, .128, and .192.',
    explanationAr: 'من أسئلة التدريب في الديك: بحجم block يساوي 64، عناوين الشبكات /26 بتزيد 64 في الـ octet الرابع: ‏.0 و.64 و.128 و.192.',
    difficulty: 'medium'
  },
  {
    id: 'q-net3-20', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'Splitting 192.168.1.0/24 into two equal subnets gives which subnet mask and block size?',
    questionAr: 'تقسيم 192.168.1.0/24 لشبكتين متساويتين بيطلع أنهي قناع وحجم block؟',
    options: [
      '255.255.255.128 with block size 128',
      '255.255.255.192 with block size 64',
      '255.255.255.224 with block size 32',
      '255.255.255.240 with block size 16'
    ],
    optionsAr: [
      '‏255.255.255.128 وحجم block رقمه 128',
      '‏255.255.255.192 وحجم block رقمه 64',
      '‏255.255.255.224 وحجم block رقمه 32',
      '‏255.255.255.240 وحجم block رقمه 16'
    ],
    correctAnswer: 0,
    explanation: 'The deck /25 worked example: borrow 1 bit for 2 equal subnets; new prefix /25, mask 255.255.255.128, block size 256 − 128 = 128, with 7 host bits and 126 usable hosts.',
    explanationAr: 'المثال المحلول /25 في الديك: استلاف 1 bit لعمل شبكتين متساويتين؛ الـ prefix الجديد /25، القناع 255.255.255.128، حجم الـ block = 256 − 128 = 128، مع 7 host bits و126 جهاز قابل للاستخدام.',
    difficulty: 'medium'
  },
  {
    id: 'q-net3-21', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'Which benefit of subnetting does the lecture state first?',
    questionAr: 'أنهي فائدة من فوايد الـ Subnetting ذكرتها المحاضرة الأول؟',
    options: [
      'It reduces overall network traffic by limiting the scope of broadcast traffic',
      'It increases the bandwidth of every link',
      'It removes the need for routers entirely',
      'It doubles the available IPv4 address space'
    ],
    optionsAr: [
      'بتقلل حركة الشبكة الإجمالية بتحديد نطاق حركة البث',
      'بتزوّد الـ bandwidth لكل وصلة',
      'بتلغي الحاجة للـ routers نهائيًا',
      'بتضاعف مساحة عناوين IPv4 المتاحة'
    ],
    correctAnswer: 0,
    explanation: 'The lecture lists reducing overall network traffic as the first reason: a broadcast inside one subnet is not normally forwarded by a router to other subnets, so smaller broadcast domains reduce unnecessary traffic.',
    explanationAr: 'المحاضرة بتذكر تقليل حركة الشبكة الإجمالية كسبب أول: البث جوه subnet واحدة ما بيتمررش عاديًا من الـ router لباقي الـ subnets، فالنطاقات الأصغر بتقلل الحركة غير الضرورية.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-22', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'Which grouping is an example of "subnetting by device type" from the lecture?',
    questionAr: 'أنهي تجميع يمثل "التقسيم حسب نوع الجهاز" زي ما المحاضرة ذكرت؟',
    options: [
      'User computers, printers, servers, and IoT devices',
      'Main campus, branch campus, and separate buildings',
      'Class A, Class B, and Class C ranges',
      'Ethernet, token ring, and Wi-Fi segments'
    ],
    optionsAr: [
      'أجهزة المستخدمين، الطابعات، السيرفرات، وأجهزة IoT',
      'الحرم الرئيسي، الحرم الفرعي، والمباني المنفصلة',
      'نطاقات Class A وClass B وClass C',
      'قطاعات Ethernet وToken Ring وWi-Fi'
    ],
    correctAnswer: 0,
    explanation: 'The lecture contrasts segmentation by location (main campus, branch campus, separate buildings) with segmentation by device type (user computers, printers, servers, IoT devices).',
    explanationAr: 'المحاضرة بتقارن التقسيم حسب الموقع (الحرم الرئيسي والفرعي والمباني المنفصلة) بالتقسيم حسب نوع الجهاز (أجهزة المستخدمين والطابعات والسيرفرات وأجهزة IoT).',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-23', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'Subnetting 10.0.0.0/8 down to /24 subnets produces how many subnets with how many usable hosts each?',
    questionAr: 'تقسيم 10.0.0.0/8 لحد /24 subnets بيطلع كام subnet وكل واحدة فيها كام جهاز قابل للاستخدام؟',
    options: [
      '65,536 subnets with 254 usable hosts each',
      '256 subnets with 65,534 usable hosts each',
      '254 subnets with 65,536 usable hosts each',
      '128 subnets with 510 usable hosts each'
    ],
    optionsAr: [
      '‏65,536 subnet وكل واحدة 254 جهاز قابل للاستخدام',
      '‏256 subnet وكل واحدة 65,534 جهاز',
      '‏254 subnet وكل واحدة 65,536 جهاز',
      '‏128 subnet وكل واحدة 510 أجهزة'
    ],
    correctAnswer: 0,
    explanation: 'From /8 to /24 borrows 16 bits: 2¹⁶ = 65,536 subnets; 8 remaining host bits give 2⁸ − 2 = 254 usable hosts per subnet — the boundary the lecture calls common for small and medium LANs.',
    explanationAr: 'من /8 لـ /24 بنستلف 16 بت: ‏2¹⁶ = 65,536 subnet؛ و8 host bits متبقية تعطي 2⁸ − 2 = 254 جهازًا في كل subnet — وده الحد اللي المحاضرة بتسميه الشائع للشبكات المحلية الصغيرة والمتوسطة.',
    difficulty: 'medium'
  },
  {
    id: 'q-net3-24', courseId: 'networks', lectureId: 'net-lec-3', type: 'mcq',
    question: 'Which common mistake does the lecture warn against when calculating the number of subnets?',
    questionAr: 'أنهي خطأ شائع حذرت منه المحاضرة عند حساب عدد الـ subnets؟',
    options: [
      'Using 2ⁿ − 2 to calculate the number of subnets',
      'Forgetting to count the broadcast address as a subnet',
      'Adding the borrowed bits to the host bits',
      'Using the prefix length instead of the mask value'
    ],
    optionsAr: [
      'استخدام 2ⁿ − 2 لحساب عدد الـ subnets',
      'نسيان عدّ عنوان الـ broadcast كـ subnet',
      'إضافة الـ bits المستعارة لبتات الأجهزة',
      'استخدام طول الـ prefix بدل قيمة القناع'
    ],
    correctAnswer: 0,
    explanation: 'The lecture common-mistakes slide lists using 2ⁿ − 2 to calculate the number of subnets as wrong: the subnet formula is 2ⁿ. (The −2 applies to usable hosts, not subnets.)',
    explanationAr: 'سلايد الأخطاء الشائعة في المحاضرة بتعدّ استخدام 2ⁿ − 2 لحساب عدد الـ subnets خطأ: معادلة الـ subnets هي 2ⁿ. (الطرح −2 بيخص الـ hosts القابلة للاستخدام مش الـ subnets.)',
    difficulty: 'medium'
  },
  {
    id: 'q-net3-25', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'A broadcast sent inside one subnet is not normally forwarded by a router to other subnets.',
    questionAr: 'البث (Broadcast) المبعوت جوه subnet واحدة ما بيتمررش عاديًا من الـ router لباقي الـ subnets.',
    correctAnswer: true,
    explanation: 'True: the lecture states a broadcast sent inside one subnet is not normally forwarded by a router to other subnets, which is how subnetting limits broadcast scope.',
    explanationAr: 'صح! المحاضرة بتوضح إن البث جوه subnet واحدة ما بيتمررش عاديًا من الـ router لباقي الـ subnets، وده اللي بيحد نطاق البث بالتقسيم.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-26', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'Networks are most easily subnetted at the octet boundaries of /8, /16, and /24.',
    questionAr: 'تقسيم الشبكات بيكون أسهل ما يكون عند حدود الـ octets: ‏/8 و/16 و/24.',
    correctAnswer: true,
    explanation: 'True: the lecture states networks are most easily subnetted at the octet boundary of /8, /16, and /24.',
    explanationAr: 'صح! المحاضرة بتوضح إن تقسيم الشبكات بيكون أسهل عند حدود الـ octets /8 و/16 و/24.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-27', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'The formula for the number of subnets is 2ⁿ, where n is the number of borrowed bits.',
    questionAr: 'معادلة عدد الـ subnets هي 2ⁿ، حيث n هو عدد الـ bits المستعارة.',
    correctAnswer: true,
    explanation: 'True: the lecture formula summary states subnets = 2ⁿ where n is borrowed bits — the − 2 subtraction belongs to usable hosts, not subnets.',
    explanationAr: 'صح! ملخص المعادلات في المحاضرة بيقول subnets = 2ⁿ حيث n عدد الـ bits المستعارة — وطرح الـ −2 بيخص الـ hosts القابلة للاستخدام مش الـ subnets.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-28', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'The broadcast address of a subnet can safely be assigned to a host.',
    questionAr: 'عنوان الـ broadcast بتاعة subnet ممكن يتوزع لجهاز بأمان.',
    correctAnswer: false,
    explanation: 'False: the lecture lists treating the broadcast address as a usable host address among its common mistakes; broadcast and network addresses are excluded from usable hosts.',
    explanationAr: 'غلط! المحاضرة بتعدّ اعتبار عنوان الـ broadcast صالحًا كعنوان جهاز من الأخطاء الشائعة؛ وعنواني الشبكة والبث مستبعدين من الـ hosts القابلة للاستخدام.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-29', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'The block size equals 256 minus the mask value in the changing octet.',
    questionAr: 'حجم الـ block بيساوي 256 مطروح منه قيمة الـ mask في الـ octet المتغيّر.',
    correctAnswer: true,
    explanation: 'True: the lecture formula summary defines block size = 256 − mask value in the changing octet (e.g. 256 − 192 = 64 for /26).',
    explanationAr: 'صح! ملخص المعادلات بيعرّف حجم الـ block = 256 − قيمة الـ mask في الـ octet المتغيّر (زي 256 − 192 = 64 للـ /26).',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-30', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'A request for 6 equal-size subnets must produce exactly 6 subnets.',
    questionAr: 'طلب 6 subnets متساوية لازم ينتج بالظبط 6 subnets.',
    correctAnswer: false,
    explanation: 'False: the lecture states equal-size binary subnetting may produce 8 when 6 are requested, because subnets come in powers of two (2³ = 8 covers 6).',
    explanationAr: 'غلط! المحاضرة بتوضح إن التقسيم الثنائي المتساوي ممكن ينتج 8 subnets لما المطلوب 6، لأن العدد بييجي قوى 2 (‏2³ = 8 وبتغطي الـ 6).',
    difficulty: 'medium'
  },
  {
    id: 'q-net3-31', courseId: 'networks', lectureId: 'net-lec-3', type: 'true_false',
    question: 'In traditional classful addressing, the default boundaries are Class A /8, Class B /16, and Class C /24.',
    questionAr: 'في العنونة التقليدية بالفئات، الحدود الافتراضية هي Class A بـ /8 وClass B بـ /16 وClass C بـ /24.',
    correctAnswer: true,
    explanation: 'True: the lecture classless-subnetting slide states traditional classful addressing used default network boundaries such as Class A /8, Class B /16, and Class C /24.',
    explanationAr: 'صح! سلايد التقسيم اللاصنفي (Classless) في المحاضرة بتوضح إن العنونة التقليدية بالفئات استخدمت حدود شبكة افتراضية زي Class A بـ /8 وClass B بـ /16 وClass C بـ /24.',
    difficulty: 'easy'
  },
  {
    id: 'q-net3-32', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'Walk through the deck\'s six-step subnetting method to divide 192.168.1.0/24 into at least 6 subnets, stating each step\'s result including the full network-address table increments.',
    questionAr: 'امشِ على منهج الديك ذو الخطوات الستة لتقسيم 192.168.1.0/24 إلى 6 subnets على الأقل، مع ذكر نتيجة كل خطوة بما فيها increments جدول عناوين الشبكات.',
    correctAnswer: 'Six-step subnetting of 192.168.1.0/24 into 8 /27 subnets.',
    modelAnswer: 'Step 1: convert the network address to binary: 192.168.1.0 = 11000000.10101000.00000001.00000000. Step 2: find the borrowed bits — the requirement is 6 subnets; 2² = 4 is insufficient, 2³ = 8 is sufficient, so borrow 3 bits. Step 3: find the new prefix: 24 + 3 = /27. Step 4: find the subnet mask: the last mask octet is 11100000 = 224, so 255.255.255.224. Step 5: find the host bits: 32 − 27 = 5; total addresses = 2⁵ = 32 and usable hosts = 32 − 2 = 30. Step 6: find the block size: 256 − 224 = 32, so network addresses increase by 32 in the fourth octet: .0, .32, .64, .96, .128, .160, .192, .224 — eight /27 subnets (the first: network .0, hosts .1–.30, broadcast .31).',
    modelAnswerAr: 'الخطوة 1: حوّل عنوان الشبكة لثنائي: 192.168.1.0 = 11000000.10101000.00000001.00000000. الخطوة 2: ابحث عن الـ bits المستعارة — المطلوب 6 subnets؛ ‏2² = 4 مش كفاية، و2³ = 8 كفاية، فنستلف 3 بتات. الخطوة 3: حدد الـ prefix الجديد: 24 + 3 = /27. الخطوة 4: حدد قناع الشبكة: آخر octet في القناع 11100000 = 224، يعني 255.255.255.224. الخطوة 5: حدد بتات الأجهزة: 32 − 27 = 5؛ وإجمالي العناوين = 2⁵ = 32 والقابل للاستخدام = 32 − 2 = 30. الخطوة 6: حدد حجم الـ block: 256 − 224 = 32، فعناوين الشبكات بتزيد 32 في الـ octet الرابع: ‏.0 و.32 و.64 و.96 و.128 و.160 و.192 و.224 — ثمن /27 subnets (الأولى: شبكة .0 وhosts من .1 لـ .30 والبث .31).',
    keyPoints: ['Step 1 binary conversion', 'Step 2 borrow 3 bits (2³ = 8 covers 6)', 'Step 3 new prefix /27', 'Step 4 mask 255.255.255.224', 'Step 5 five host bits: 32 total, 30 usable', 'Step 6 block size 32, networks .0-.224']
  },
  {
    id: 'q-net3-33', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'Work through the deck\'s /25 example: divide 192.168.1.0/24 into 2 equal subnets, giving borrowed bits, new prefix, mask, usable hosts, block size, and the complete two-subnet table.',
    questionAr: 'حل مثال الـ /25 اللي في الديك: قسّم 192.168.1.0/24 لشبكتين متساويتين مع ذكر الـ bits المستعارة والـ prefix الجديد والقناع والـ hosts القابلة للاستخدام وحجم الـ block وجدول الشبكتين كامل.',
    correctAnswer: '/25 two-subnet calculation and table.',
    modelAnswer: 'Given 192.168.1.0/24 and a requirement of 2 equal subnets: borrowed bits satisfy 2¹ = 2, so borrow 1 bit. New prefix: 24 + 1 = /25. Subnet mask: 255.255.255.128. Host bits: 32 − 25 = 7, so usable hosts = 2⁷ − 2 = 126. Block size: 256 − 128 = 128. Table: Subnet 0 = 192.168.1.0/25 with first host 192.168.1.1, last host 192.168.1.126, broadcast 192.168.1.127; Subnet 1 = 192.168.1.128/25 with first host 192.168.1.129, last host 192.168.1.254, broadcast 192.168.1.255.',
    modelAnswerAr: 'معطيات 192.168.1.0/24 ومطلوب شبكتين متساويتين: الـ bits المستعارة تحقق 2¹ = 2، فنستلف 1 bit. الـ prefix الجديد: 24 + 1 = /25. قناع الشبكة: 255.255.255.128. بتات الأجهزة: 32 − 25 = 7، فالقابل للاستخدام = 2⁷ − 2 = 126. حجم الـ block: 256 − 128 = 128. الجدول: الشبكة 0 = ‏192.168.1.0/25 وأول جهاز 192.168.1.1 وآخر جهاز 192.168.1.126 والبث 192.168.1.127؛ والشبكة 1 = ‏192.168.1.128/25 وأول جهاز 192.168.1.129 وآخر جهاز 192.168.1.254 والبث 192.168.1.255.',
    keyPoints: ['Borrow 1 bit for 2 subnets', 'New prefix /25 mask 255.255.255.128', '7 host bits, 126 usable', 'Block size 128', 'Subnets .0/25 and .128/25 with broadcast .127/.255']
  },
  {
    id: 'q-net3-34', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'State the lecture\'s formula summary (subnets, total addresses, usable hosts, host bits, new prefix, block size) and apply every formula to the /24 divided into /26 example.',
    questionAr: 'اذكر ملخص معادلات المحاضرة (عدد الـ subnets، إجمالي العناوين، الـ hosts القابلة للاستخدام، بتات الأجهزة، الـ prefix الجديد، حجم الـ block) وطبّق كل معادلة على مثال تقسيم /24 إلى /26.',
    correctAnswer: 'Formula summary applied to /24 to /26.',
    modelAnswer: 'Formulas: number of subnets = 2ⁿ where n = borrowed bits; total addresses per subnet = 2ʰ where h = remaining host bits; usable hosts (traditional) = 2ʰ − 2, excluding network and broadcast; host bits = 32 − prefix length; new prefix = original prefix + borrowed bits; block size = 256 − mask value in the changing octet. Applied to /24 divided into /26: borrowed bits = 26 − 24 = 2, so subnets = 2² = 4; host bits = 32 − 26 = 6, so usable hosts = 2⁶ − 2 = 62; mask last octet = 192, so block size = 256 − 192 = 64.',
    modelAnswerAr: 'المعادلات: عدد الـ subnets = 2ⁿ حيث n عدد الـ bits المستعارة؛ إجمالي العناوين في كل subnet = 2ʰ حيث h عدد بتات الأجهزة المتبقية؛ الـ hosts القابلة للاستخدام (تقليديًا) = 2ʰ − 2 باستثناء عنواني الشبكة والبث؛ بتات الأجهزة = 32 − طول الـ prefix؛ الـ prefix الجديد = الـ prefix الأصلي + الـ bits المستعارة؛ حجم الـ block = 256 − قيمة الـ mask في الـ octet المتغيّر. تطبيقًا على تقسيم /24 إلى /26: الـ bits المستعارة = 26 − 24 = 2، فالـ subnets = 2² = 4؛ بتات الأجهزة = 32 − 26 = 6، فالقابل للاستخدام = 2⁶ − 2 = 62؛ آخر octet في القناع = 192، فحجم الـ block = 256 − 192 = 64.',
    keyPoints: ['Subnets = 2^n', 'Addresses = 2^h, usable = 2^h - 2', 'Host bits = 32 - prefix', 'New prefix = original + borrowed', 'Block size = 256 - mask octet', 'Applied: 4 subnets, 62 hosts, block 64']
  },
  {
    id: 'q-net3-35', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'List all six common subnetting mistakes from the lecture and explain how to avoid each one.',
    questionAr: 'عدّد الأخطاء الشائعة الستة في الـ Subnetting اللي ذكرتها المحاضرة واشرح إزاي تتجنب كل واحد.',
    correctAnswer: 'Six common subnetting mistakes and avoidance.',
    modelAnswer: '1. Confusing borrowed bits with remaining host bits — track two separate numbers: n = new prefix − original prefix, and h = 32 − new prefix. 2. Using 2ⁿ − 2 to calculate the number of subnets — the subnet formula is 2ⁿ; the −2 applies only to usable hosts. 3. Forgetting to subtract 2 when calculating usable hosts in a traditional subnet — always exclude the network and broadcast addresses. 4. Adding the block size to the wrong octet — the block size applies to the changing octet (the one containing borrowed bits). 5. Treating the broadcast address as a usable host address — the broadcast (all host bits 1) and network (all 0s) are never assignable. 6. Assuming a request for 6 subnets must produce exactly 6 — equal-size binary subnetting may produce 8, the next power of two.',
    modelAnswerAr: '1. الخلط بين الـ bits المستعارة وبتات الأجهزة المتبقية — افصل بين رقمين: n = الـ prefix الجديد − الأصلي، وh = 32 − الـ prefix الجديد. 2. استخدام 2ⁿ − 2 لحساب عدد الـ subnets — معادلة الـ subnets هي 2ⁿ؛ والطرح −2 بيخص الـ hosts فقط. 3. نسيان طرح 2 عند حساب الـ hosts في الشبكة التقليدية — استبعد دايمًا عنواني الشبكة والبث. 4. إضافة حجم الـ block للـ octet الغلط — حجم الـ block بيتطبق على الـ octet المتغيّر (اللي فيه الـ bits المستعارة). 5. اعتبار عنوان الـ broadcast صالحًا كجهاز — البث (كل بتات الأجهزة = 1) والشبكة (كلها 0) عمرهم ما يتوزعوا. 6. توقّع إنتاج 6 subnets بالظبط عند طلب 6 — التقسيم الثنائي المتساوي ممكن ينتج 8، وهي أقرب قوة للعدد 2.',
    keyPoints: ['Separate borrowed vs host bits', 'Subnets = 2^n (no -2)', 'Usable hosts = 2^h - 2', 'Block size in changing octet', 'Broadcast never assignable', '6 requested may yield 8']
  },
  {
    id: 'q-net3-36', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'Explain the two reasons for subnetting given in the lecture, using the broadcast-scope statement and the student/administration servers security example.',
    questionAr: 'اشرح سببي الـ Subnetting اللي ذكرتهم المحاضرة، مستخدمًا عبارة نطاق البث ومثال أمان أجهزة الطلاب وسيرفرات الإدارة.',
    correctAnswer: 'Traffic reduction and security policy reasons.',
    modelAnswer: '1. Reduces overall network traffic: subnetting limits the scope of broadcast traffic — a broadcast sent inside one subnet is not normally forwarded by a router to other subnets, so smaller broadcast domains reduce unnecessary traffic and improve network performance. 2. Enables security policies: administrators can apply rules to control communication between subnets; for example, student devices may be allowed to access the Internet but blocked from directly accessing administrative servers.',
    modelAnswerAr: '1. تقليل حركة الشبكة الإجمالية: الـ subnetting بيحدد نطاق حركة البث — البث المبعوت جوه subnet واحدة ما بيتمررش عاديًا من الـ router لباقي الـ subnets، فنطاقات البث الأصغر بتقلل الحركة غير الضرورية وبتحسّن أداء الشبكة. 2. تمكين سياسات الأمان: المسؤولين يقدروا يطبقوا قواعد للتحكم في الاتصال بين الـ subnets؛ مثلًا أجهزة الطلاب ممكن يُسمح لها بالوصول للإنترنت وتتمنع من الوصول المباشر لسيرفرات الإدارة.',
    keyPoints: ['Broadcast scope limited to one subnet', 'Smaller broadcast domains improve performance', 'Rules control inter-subnet communication', 'Students: internet allowed, admin servers blocked']
  },
  {
    id: 'q-net3-37', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'Explain what subnetting is using the lecture definition, the university example (faculties and administration), the segmentation methods table, and the layer-3 requirement for communication between networks.',
    questionAr: 'اشرح إيه هو الـ Subnetting مستخدمًا تعريف المحاضرة ومثال الجامعة (الكليات والإدارة) وجدول طرق التقسيم وشرط الطبقة الثالثة للاتصال بين الشبكات.',
    correctAnswer: 'Subnetting definition, university example, segmentation, layer-3 need.',
    modelAnswer: 'Subnetting is the process of dividing one larger IP network into multiple smaller logical networks called subnets, each with its own network address and broadcast address; an IPv4 address identifies a device and contains 32 bits in four 8-bit octets (e.g. 192.168.1.10 = 192 | 168 | 1 | 10). The lecture illustrates usage with a university that uses separate subnets for the Engineering Faculty, the Computers Faculty, Administration, and servers instead of one large network. Segmentation methods: by location (main campus, branch campus, separate buildings) or by device type (user computers, printers, servers, IoT devices). Communicating between these different networks requires different Layer 3 devices such as switches and routers.',
    modelAnswerAr: 'الـ Subnetting هو عملية تقسيم شبكة IP كبيرة واحدة لعدة شبكات منطقية أصغر اسمها subnets، وكل واحدة ليها عنوان شبكة وعنوان بث خاصين؛ وعنوان الـ IPv4 بيتعرّف جهاز ويحتوي 32 bit في أربع octets كل واحدة 8 بت (زي 192.168.1.10 = ‏192 | 168 | 1 | 10). والمحاضرة بتوضح الاستخدام بمثال جامعة بتستخدم subnets منفصلة لكلية الهندسة وكلية الحاسبات والإدارة والسيرفرات بدل شبكة واحدة كبيرة. طرق التقسيم: حسب الموقع (الحرم الرئيسي والفرعي والمباني المنفصلة) أو حسب نوع الجهاز (أجهزة المستخدمين والطابعات والسيرفرات وأجهزة IoT). والاتصال بين الشبكات المختلفة دي محتاج أجهزة Layer 3 زي الـ switches والـ routers.',
    keyPoints: ['Divide one large network into subnets', 'Each subnet: own network + broadcast address', 'University: faculties, administration, servers', 'Segment by location or device type', 'Inter-network traffic needs Layer 3 devices']
  },
  {
    id: 'q-net3-38', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'Explain both octet-boundary cases from 10.0.0.0/8 given in the lecture: the /16 case (about 250 subnets needed) and the /24 case (about 60,000 subnets needed), with the borrowed bits, subnet counts, and host capacity of each.',
    questionAr: 'اشرح حالتي التقسيم عند حدود الـ octets من 10.0.0.0/8 اللي ذكرتهم المحاضرة: حالة /16 (المطلوب حوالي 250 subnet) وحالة /24 (المطلوب حوالي 60,000 subnet)، مع الـ bits المستعارة وعدد الـ subnets وسعة الـ hosts في كل حالة.',
    correctAnswer: 'Octet boundary /16 and /24 cases from /8.',
    modelAnswer: '/16 case: needed subnets about 250; 2⁸ = 256 is sufficient, so borrow 8 bits. New prefix /16, giving subnets of the form 10.x.0.0/16 where the second octet (0–255) identifies the subnet. Number of subnets = 2⁸ = 256; host bits = 32 − 16 = 16; total addresses per subnet = 2¹⁶ = 65,536 with 65,534 usable hosts in a traditional subnet. /24 case: needed subnets about 60,000; 2¹⁶ = 65,536 is sufficient, so borrow 16 bits (24 − 8 = 16). New prefix /24: the first three octets identify each subnet and the fourth octet holds hosts; number of subnets = 2¹⁶ = 65,536, host bits = 8, usable hosts = 2⁸ − 2 = 254 per subnet — the /24 boundary is common because 254 usable hosts suits many small and medium LANs.',
    modelAnswerAr: 'حالة /16: المطلوب حوالي 250 subnet؛ ‏2⁸ = 256 كفاية، فنستلف 8 بتات. الـ prefix الجديد /16، وبيطلع subnets بالشكل 10.x.0.0/16 حيث الـ octet التاني (0–255) هو المعرّف للـ subnet. عدد الـ subnets = 2⁸ = 256؛ بتات الأجهزة = 32 − 16 = 16؛ إجمالي العناوين في كل subnet = 2¹⁶ = 65,536 مع 65,534 جهازًا قابلًا للاستخدام تقليديًا. حالة /24: المطلوب حوالي 60,000 subnet؛ ‏2¹⁶ = 65,536 كفاية، فنستلف 16 بت (24 − 8 = 16). الـ prefix الجديد /24: أول ثلاث octets بتحدد كل subnet والـ octet الرابع للـ hosts؛ عدد الـ subnets = 2¹⁶ = 65,536، وبتات الأجهزة = 8، والقابل للاستخدام = 2⁸ − 2 = 254 في كل subnet — وحد الـ /24 شائع لأن 254 جهازًا يناسبوا شبكات LAN صغيرة ومتوسطة كتير.',
    keyPoints: ['/16 case: borrow 8, 256 subnets, 65,534 hosts each', 'Second octet identifies 10.x.0.0/16 subnets', '/24 case: borrow 16, 65,536 subnets, 254 hosts each', 'First three octets identify 10.x.x.0/24 subnets']
  },
  {
    id: 'q-net3-39', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'Perform the full walkthrough for creating at least 100 subnets from 172.16.0.0/16 as in the lecture: borrowed bits, new prefix, subnet mask, subnet count, usable hosts, block size, and the network/broadcast addresses of the first three subnets plus the last (128th) subnet.',
    questionAr: 'نفّذ الحل الكامل لإنشاء 100 subnet على الأقل من 172.16.0.0/16 زي المحاضرة: الـ bits المستعارة والـ prefix الجديد والقناع وعدد الـ subnets والـ hosts القابلة للاستخدام وحجم الـ block وعناوين الشبكة/البث لأول تلات subnets وآخر واحدة (رقم 128).',
    correctAnswer: 'Full /16 to /23 walkthrough with table endpoints.',
    modelAnswer: 'Required: at least 100 subnets from 172.16.0.0/16. Borrowed bits: 2⁶ = 64 is not enough; 2⁷ = 128 is enough, so borrow 7 bits. New prefix: 16 + 7 = /23. Subnet mask: 255.255.254.0. Number of available subnets: 2⁷ = 128. Host bits: 32 − 23 = 9, so usable hosts = 2⁹ − 2 = 510. Block size in the third octet: 256 − 254 = 2, so each subnet advances by 2 in the third octet. First three subnets: 172.16.0.0/23 (broadcast 172.16.1.255), 172.16.2.0/23 (broadcast 172.16.3.255), 172.16.4.0/23 (broadcast 172.16.5.255). The last (128th) subnet is 172.16.254.0/23 with broadcast 172.16.255.255.',
    modelAnswerAr: 'المطلوب: 100 subnet على الأقل من 172.16.0.0/16. الـ bits المستعارة: ‏2⁶ = 64 مش كفاية؛ و2⁷ = 128 كفاية، فنستلف 7 بتات. الـ prefix الجديد: 16 + 7 = /23. قناع الشبكة: 255.255.254.0. عدد الـ subnets المتاحة: 2⁷ = 128. بتات الأجهزة: 32 − 23 = 9، فالقابل للاستخدام = 2⁹ − 2 = 510. حجم الـ block في الـ octet الثالث: 256 − 254 = 2، فكل subnet بتزيد 2 في الـ octet الثالث. أول تلات subnets: ‏172.16.0.0/23 (البث 172.16.1.255) و172.16.2.0/23 (البث 172.16.3.255) و172.16.4.0/23 (البث 172.16.5.255). وآخر subnet (رقم 128) هي 172.16.254.0/23 والبث بتاعها 172.16.255.255.',
    keyPoints: ['Borrow 7 bits: 2^7 = 128 covers 100', 'New prefix /23 mask 255.255.254.0', '9 host bits: 510 usable hosts', 'Block size 2 in third octet', 'First subnets .0/.2/.4 with broadcasts x.255 next odd', '128th subnet 172.16.254.0/23 broadcast 172.16.255.255']
  },
  {
    id: 'q-net3-40', courseId: 'networks', lectureId: 'net-lec-3', type: 'essay',
    question: 'Define the following glossary terms from the lecture: prefix length, subnet mask, broadcast address, usable host, borrowed bits, and block size.',
    questionAr: 'عرّف مصطلحات القاموس التالية من المحاضرة: طول الـ Prefix، قناع الشبكة، عنوان البث، الجهاز القابل للاستخدام، الـ Bits المستعارة، وحجم الـ Block.',
    correctAnswer: 'Six glossary definitions.',
    modelAnswer: 'Prefix length: the number of leading network bits, written after a slash, e.g. /24. Subnet mask: a 32-bit value that marks network bits as 1 and host bits as 0. Broadcast address: the final address in a traditional IPv4 subnet, used to reach all hosts in that subnet. Usable host: an address available for assignment to a host, excluding the network and broadcast addresses in traditional subnets. Borrowed bits: bits moved from the host portion to the network portion to create more subnets. Block size: the increment between consecutive subnet network addresses in the changing octet.',
    modelAnswerAr: 'طول الـ Prefix: عدد بتات الشبكة البادئة، وبيتكتب بعد علامة /، زي /24. قناع الشبكة: قيمة من 32 bit بتعلّم بتات الشبكة بـ1 وبتات الأجهزة بـ0. عنوان البث: العنوان الأخير في الشبكة الفرعية التقليدية، وبيُستخدم للوصول لكل الأجهزة في تلك الشبكة. الجهاز القابل للاستخدام: عنوان متاح للتوزيع على جهاز، مستثنى منه عنوانا الشبكة والبث في الشبكات التقليدية. الـ Bits المستعارة: بتات منتقلة من جزء الأجهزة لجزء الشبكة لإنشاء subnets أكتر. حجم الـ Block: مقدار الزيادة بين عناوين شبكات الـ subnets المتتالية في الـ octet المتغيّر.',
    keyPoints: ['Prefix length = leading network bits after slash', 'Subnet mask marks 1s network / 0s host', 'Broadcast reaches all hosts in subnet', 'Usable host excludes network and broadcast', 'Borrowed bits host to network', 'Block size increment in changing octet']
  }
];

const lecture4Questions: Question[] = [
  {
    id: 'q-net4-1', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'What is the address length of IPv6 compared with IPv4?',
    questionAr: 'حجم عنوان IPv6 قد إيه مقارنة بـ IPv4؟',
    options: ['64 bits', '96 bits', '128 bits', '256 bits'],
    optionsAr: ['64 بت', '96 بت', '128 بت', '256 بت'],
    correctAnswer: 2,
    explanation: 'IPv6 versus IPv4: IPv6 has a larger 128-bit address space.',
    explanationAr: 'مقارنة IPv6 بـ IPv4: الـ IPv6 عنده مساحة عناوين أكبر طولها 128 بت.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-2', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'How many addresses does the IPv6 address space provide, according to the lecture?',
    questionAr: 'مساحة عناوين IPv6 بتوفر كام عنوان حسب المحاضرة؟',
    options: ['About 4.3 billion addresses', '340 undecillion (10^36) addresses', '18 quintillion addresses', '65,536 addresses'],
    optionsAr: ['حوالي 4.3 مليار عنوان', '‏340 undecillion (10^36) عنوان', '‏18 كوينتيليون عنوان', '‏65,536 عنوان'],
    correctAnswer: 1,
    explanation: 'The lecture states the 128-bit space provides 340 undecillion (10^36) addresses, solving the limitations of IPv4.',
    explanationAr: 'المحاضرة بتقول إن مساحة الـ 128 بت بتوفر 340 undecillion (10^36) عنوان، وده بيحل مشاكل الـ IPv4.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-3', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'Which IPv4-to-IPv6 migration technique allows IPv6-enabled devices to communicate with IPv4 devices through translation?',
    questionAr: 'أنهي تقنية من تقنيات الانتقال من IPv4 لـ IPv6 اللي بتسمح لأجهزة IPv6 تتواصل مع أجهزة IPv4 عن طريق الترجمة (Translation)؟',
    options: ['Dual stack', 'Tunneling', 'NAT64', 'SLAAC'],
    optionsAr: ['‏Dual Stack', 'الأنفاق (Tunneling)', '‏NAT64', '‏SLAAC'],
    correctAnswer: 2,
    explanation: 'Translation — Network Address Translation 64 (NAT64) — allows IPv6-enabled devices to communicate with IPv4 devices.',
    explanationAr: 'الترجمة — Network Address Translation 64 (NAT64) — بتسمح لأجهزة IPv6 تتواصل مع أجهزة IPv4.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-4', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'Which migration technique encapsulates an IPv6 packet inside an IPv4 packet?',
    questionAr: 'أنهي تقنية انتقال بتغلف حزمة IPv6 جوه حزمة IPv4؟',
    options: ['Tunneling', 'NAT64', 'Dual stack', 'EUI-64'],
    optionsAr: ['الأنفاق (Tunneling)', '‏NAT64', '‏Dual Stack', '‏EUI-64'],
    correctAnswer: 0,
    explanation: 'Tunneling encapsulates the IPv6 packet inside an IPv4 packet so it can cross IPv4-only parts of the network.',
    explanationAr: 'الأنفاق (Tunneling) بتغلف حزمة IPv6 جوه حزمة IPv4 عشان تعدّي الأجزاء اللي بتفهم IPv4 بس في الشبكة.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-5', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'What does the dual stack migration technique do?',
    questionAr: 'تقنية الـ Dual Stack في الانتقال لـ IPv6 بتعمل إيه؟',
    options: [
      'Devices run both IPv4 and IPv6 protocol stacks simultaneously',
      'Devices translate IPv6 addresses into MAC addresses',
      'Devices tunnel IPv6 through DHCP servers',
      'Devices choose either IPv4 or IPv6 permanently at boot'
    ],
    optionsAr: [
      'الأجهزة بتشغل مكدسي البروتوكولات IPv4 وIPv6 في نفس الوقت',
      'الأجهزة بتحوّل عناوين IPv6 لعناوين MAC',
      'الأجهزة بتنقل IPv6 عبر سيرفرات DHCP',
      'الأجهزة بتختار IPv4 أو IPv6 نهائيًا عند الإقلاع'
    ],
    correctAnswer: 0,
    explanation: 'Dual stack means devices run both IPv4 and IPv6 protocol stacks simultaneously.',
    explanationAr: 'الـ Dual Stack معناها إن الجهاز بيشغل مكدسي IPv4 وIPv6 في نفس الوقت.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-6', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'What is a hextet in IPv6 addressing?',
    questionAr: 'إيه هو الـ Hextet في عنونة IPv6؟',
    options: [
      'A segment of 16 bits, or four hexadecimal values',
      'A single hexadecimal digit representing 4 bits',
      'A group of 8 bits, like an IPv4 octet',
      'The full 128-bit address written in binary'
    ],
    optionsAr: [
      'جزء من 16 بت، أو أربع قيم ست عشرية',
      'رقم ست عشري واحد بيمثل 4 بت',
      'مجموعة من 8 بت زي الـ octet في IPv4',
      'العنوان الكامل 128 بت مكتوب بالنظام الثنائي'
    ],
    correctAnswer: 0,
    explanation: 'The lecture defines a hextet as the unofficial term for a segment of 16 bits or four hexadecimal values.',
    explanationAr: 'المحاضرة بتعرف الـ hextet كمصطلح غير رسمي لجزء من 16 بت أو أربع قيم ست عشرية.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-7', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'Applying Rule 1 (omit leading 0s only), how is 2001:0DB8:0000:1111:0000:0000:0000:0200 written?',
    questionAr: 'بتطبيق القاعدة الأولى (حذف الأصفار البادئة فقط)، العنوان 2001:0DB8:0000:1111:0000:0000:0000:0200 بيتكتب إزاي؟',
    options: [
      '2001:DB8:0:1111:0:0:0:200',
      '2001:DB8::1111::200',
      '2001:0DB8:0:1111::200',
      '2001:DB8:0000:1111::0200'
    ],
    optionsAr: [
      '‏2001:DB8:0:1111:0:0:0:200',
      '‏2001:DB8::1111::200',
      '‏2001:0DB8:0:1111::200',
      '‏2001:DB8:0000:1111::0200'
    ],
    correctAnswer: 0,
    explanation: 'Rule 1 only omits leading 0s inside each hextet: 0DB8 becomes DB8 and every 0000 hextet becomes 0 — the double colon is Rule 2 and is not applied here.',
    explanationAr: 'القاعدة الأولى بتحذف الأصفار البادئة جوه كل hextet فقط: ‏0DB8 بتقوى DB8 وكل hextet من أصفار بتقوى 0 — والنقطتين :: دي القاعدة التانية ومش متطبقة هنا.',
    difficulty: 'medium'
  },
  {
    id: 'q-net4-8', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'According to Rule 2, a double colon (::) can replace:',
    questionAr: 'حسب القاعدة التانية، النقطتين (::) بيقدروا يستبدلوا:',
    options: [
      'Any single, contiguous string of one or more all-0 hextets',
      'Any two separated groups of zero hextets',
      'Every hextet that contains a 0 digit',
      'The last four hextets of any address'
    ],
    optionsAr: [
      'أي مجموعة واحدة متتالية من hextet واحد أو أكتر كلها أصفار',
      'أي مجموعتين منفصلتين من hextets أصفار',
      'كل hextet فيه رقم 0',
      'آخر أربع hextets من أي عنوان'
    ],
    correctAnswer: 0,
    explanation: 'Rule 2 states a double colon can replace any single, contiguous string of one or more 16-bit segments (hextets) consisting of all 0s.',
    explanationAr: 'القاعدة التانية بتقول إن :: بتقدر تستبدل أي مجموعة واحدة متتالية من قطعة أو أكتر (16 بت لكل قطعة) كلها أصفار.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-9', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'What is the fully compressed form of 2041:0000:140F:0000:0000:0000:875B:131B from the lecture examples?',
    questionAr: 'إيه الصيغة المضغوطة بالكامل للعنوان 2041:0000:140F:0000:0000:0000:875B:131B من أمثلة المحاضرة؟',
    options: [
      '2041:0:140F::875B:131B',
      '2041::140F::875B:131B',
      '2041:0:140F:0:0:0:875B:131B',
      '2041:140F::875B:131B'
    ],
    optionsAr: [
      '‏2041:0:140F::875B:131B',
      '‏2041::140F::875B:131B',
      '‏2041:0:140F:0:0:0:875B:131B',
      '‏2041:140F::875B:131B'
    ],
    correctAnswer: 0,
    explanation: 'Leading 0s are omitted (0000 → 0) and the single contiguous run of all-0 hextets is replaced by one double colon: 2041:0:140F::875B:131B.',
    explanationAr: 'بنحذف الأصفار البادئة (0000 تقوى 0) وبتاع الـ hextets الأصفار المتتالية بيستبدل بنقطتين واحدة: ‏2041:0:140F::875B:131B.',
    difficulty: 'medium'
  },
  {
    id: 'q-net4-10', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'Which is the expanded (preferred) form of fd00:8203:0:ac00::4000:0?',
    questionAr: 'إيه الصيغة الموسعة (المفضلة) للعنوان fd00:8203:0:ac00::4000:0؟',
    options: [
      'fd00:8203:0000:ac00:0000:0000:4000:0000',
      'fd00:8203:0000:ac00::4000:0000',
      'fd00:8203:0:ac00:0:0:4000:0',
      'fd00:0820:3000:ac00:0000:0000:4000:0000'
    ],
    optionsAr: [
      '‏fd00:8203:0000:ac00:0000:0000:4000:0000',
      '‏fd00:8203:0000:ac00::4000:0000',
      '‏fd00:8203:0:ac00:0:0:4000:0',
      '‏fd00:0820:3000:ac00:0000:0000:4000:0000'
    ],
    correctAnswer: 0,
    explanation: 'Expansion writes every hextet as four hexadecimal digits: fd00:8203:0000:ac00:0000:0000:4000:0000, exactly as in the lecture example.',
    explanationAr: 'التوسيع بيكتب كل hextet بأربع خانات ست عشرية: ‏fd00:8203:0000:ac00:0000:0000:4000:0000 — بالظبط زي مثال المحاضرة.',
    difficulty: 'medium'
  },
  {
    id: 'q-net4-11', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'What are the three types of IPv6 addresses named in the lecture?',
    questionAr: 'إيه الأنواع التلاتة لعناوين IPv6 اللي ذكرتهم المحاضرة؟',
    options: [
      'Unicast, multicast, and anycast',
      'Unicast, broadcast, and multicast',
      'Public, private, and loopback',
      'Global, local, and embedded'
    ],
    optionsAr: [
      '‏Unicast وMulticast وAnycast',
      '‏Unicast وBroadcast وMulticast',
      'عام وخاص وLoopback',
      '‏Global وLocal وEmbedded'
    ],
    correctAnswer: 0,
    explanation: 'The lecture lists three IPv6 address types: unicast (single source address), multicast (one packet to multiple destinations), and anycast (a unicast address assigned to multiple nearest devices).',
    explanationAr: 'المحاضرة بتذكر تلات أنواع لعناوين IPv6: ‏unicast (مصدر واحد)، ‏multicast (حزمة واحدة لوجهات متعددة)، ‏anycast (عنوان unicast متوزع على أقرب أجهزة متعددة).',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-12', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'How does the lecture summarize the key idea of anycast?',
    questionAr: 'المحاضرة بتلخص الفكرة الأساسية للـ Anycast إزاي؟',
    options: [
      'Anycast = One to the Nearest (One of Many)',
      'Anycast = One to All',
      'Anycast = All to One',
      'Anycast = Many to Many groups'
    ],
    optionsAr: [
      '‏Anycast = واحد لأقرب جهاز (من مجموعة كتير)',
      '‏Anycast = واحد للكل',
      '‏Anycast = الكل لواحد',
      '‏Anycast = مجموعات كتير لبعضها'
    ],
    correctAnswer: 0,
    explanation: 'The lecture\'s key sentence: Anycast = One to the Nearest (One of Many) — data goes to one device from a group sharing the address, usually the closest according to routing.',
    explanationAr: 'جملة المحاضرة المفتاحية: ‏Anycast = واحد لأقرب جهاز (من مجموعة كتير) — البيانات بتروح لجهاز واحد من مجموعة شاركة نفس العنوان، وغالبًا الأقرب حسب التوجيه.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-13', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'What is the typical IPv6 prefix length for most LANs, and how is the address split?',
    questionAr: 'إيه طول الـ Prefix المعتاد لمعظم شبكات الـ LAN في IPv6، والعنوان بيتقسم إزاي؟',
    options: [
      '/64 — first 64 bits for the network, the other 64 for the interface ID',
      '/48 — 48 bits network and 80 bits interface',
      '/32 — half network and half interface',
      '/128 — the whole address is network'
    ],
    optionsAr: [
      '‏/64 — أول 64 بت للشبكة والـ 64 الباقية للـ interface ID',
      '‏/48 — ‏48 بت شبكة و80 بت واجهة',
      '‏/32 — نص شبكة ونص واجهة',
      '‏/128 — العنوان كله شبكة'
    ],
    correctAnswer: 0,
    explanation: 'The prefix length ranges from 0 to 128; the typical LAN prefix is /64, with the first 64 bits for the network and the other 64 for the interface ID.',
    explanationAr: 'طول الـ prefix بيتراوح من 0 لـ 128؛ والمعتاد للـ LAN هو /64: أول 64 بت للشبكة والـ 64 الباقية للـ interface ID.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-14', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'In a global unicast address, what is the global routing prefix, and who assigns it?',
    questionAr: 'في عنوان الـ Global Unicast، إيه هو الـ Global Routing Prefix ومين اللي بيوزعه؟',
    options: [
      'The network portion assigned by the provider, typically /48',
      'The 64-bit host portion assigned by the device',
      'A 16-bit subnet field chosen by the customer',
      'A random 24-bit value generated by the NIC'
    ],
    optionsAr: [
      'جزء الشبكة اللي المزود (Provider) بيوزعه، وعادةً /48',
      'جزء الأجهزة 64 بت اللي الجهاز بيولده',
      'حقل subnet من 16 بت بيختاره العميل',
      'قيمة عشوائية 24 بت كارت الشبكة بيولدها'
    ],
    correctAnswer: 0,
    explanation: 'The global routing prefix is the network portion of the address assigned by the provider, typically /48 (the lecture calls it the Country).',
    explanationAr: 'الـ global routing prefix هو جزء الشبكة من العنوان وبيتوزع من المزود، وعادةً /48 (والمحاضرة بتسميه Country).',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-15', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'Which range is used by IPv6 unique local addresses?',
    questionAr: 'أنهي نطاق بتستخدمه عناوين الـ Unique Local في IPv6؟',
    options: ['FC00::/7 to FDFF::/7', 'FE80::/10', '2000::/3 to 3FFF::/3', 'FF02::/16'],
    optionsAr: ['‏FC00::/7 لـ FDFF::/7', '‏FE80::/10', '‏2000::/3 لـ 3FFF::/3', '‏FF02::/16'],
    correctAnswer: 0,
    explanation: 'Unique local addresses are similar to IPv4 private addresses and sit in the range FC00::/7 to FDFF::/7, used within a site or a limited number of sites.',
    explanationAr: 'عناوين الـ unique local شبه العناوين الخاصة في IPv4 ونطاقها FC00::/7 لـ FDFF::/7، وبتُستخدم جوه موقع أو عدد محدود من المواقع.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-16', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'Which statement about IPv6 link-local addresses is correct?',
    questionAr: 'أنهي جملة صحيحة عن عناوين الـ Link-Local في IPv6؟',
    options: [
      'They are in the FE80::/10 range and are created even if the device has no global unicast address',
      'They are in the FC00::/7 range and require a DHCPv6 server',
      'They are globally routable like global unicast addresses',
      'They are only configured manually on routers'
    ],
    optionsAr: [
      'بتكون في نطاق FE80::/10 وبتتعمل حتى لو الجهاز مالوش عنوان global unicast',
      'بتكون في نطاق FC00::/7 ومحتاجة سيرفر DHCPv6',
      'بتكون قابلة للتوجيه عالميًا زي عناوين الـ global unicast',
      'بتتظبط يدويًا على الراوترات بس'
    ],
    correctAnswer: 0,
    explanation: 'Link-local addresses enable communication on the same link only, are in the FE80::/10 range, and are created even without an assigned global unicast address; the router link-local is typically the default gateway.',
    explanationAr: 'عناوين الـ link-local بتسمح بالاتصال على نفس الوصلة بس، ونطاقها FE80::/10، وبتتعمل حتى بدون عنوان global unicast؛ وعادةً عنوان الـ link-local بتاع الراوتر هو الـ default gateway.',
    difficulty: 'medium'
  },
  {
    id: 'q-net4-17', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'What is the IPv6 loopback address and its purpose?',
    questionAr: 'إيه عنوان الـ Loopback في IPv6 وإيه فايدته؟',
    options: [
      '::1/128 — used by a host to send a packet to itself to test the local TCP/IP configuration',
      '::/128 — used to reach the nearest router',
      'FE80::1/128 — used to test the physical NIC',
      'FF02::1 — used to test multicast connectivity'
    ],
    optionsAr: [
      '‏::1/128 — بيستخدمه الجهاز يبعث حزمة لنفسه لاختبار إعدادات TCP/IP المحلية',
      '‏::/128 — بيُستخدم للوصول لأقرب راوتر',
      '‏FE80::1/128 — بيُستخدم لاختبار كارت الشبكة الفيزيائي',
      '‏FF02::1 — بيُستخدم لاختبار الاتصال الـ multicast'
    ],
    correctAnswer: 0,
    explanation: 'The loopback address is all 0s except the last bit, written ::1/128; pinging it tests the TCP/IP configuration on the local host, and it cannot be assigned to a physical interface.',
    explanationAr: 'عنوان الـ loopback كل بتاته أصفار ما عدا الأخيرة، وبيتكتب ::1/128؛ وعمل ping ليه بيختبر إعدادات TCP/IP على الجهاز المحلي، ومش بيتوزع لواجهة فيزيائية.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-18', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'When is the unspecified address (::/128) used?',
    questionAr: 'العنوان غير المحدد (::/128) بيُستخدم إمتى؟',
    options: [
      'Only as a source address, when the device has no permanent IPv6 address yet or the source is irrelevant',
      'As a destination address to reach all routers',
      'As the default gateway address on routers',
      'As the interface ID of dynamically configured hosts'
    ],
    optionsAr: [
      'كعنوان مصدر فقط، لما الجهاز مالوش عنوان IPv6 دائم بعد أو المصدر مش مهم للوجهة',
      'كعنوان وجهة للوصول لكل الراوترات',
      'كعنوان default gateway على الراوترات',
      'كـ interface ID للأجهزة المضبوطة ديناميكيًا'
    ],
    correctAnswer: 0,
    explanation: 'The unspecified address is the all-0s address ::/128; it cannot be assigned to an interface and is only used as a source address when the device does not yet have a permanent IPv6 address or the source is irrelevant.',
    explanationAr: 'العنوان غير المحدد هو عنوان الأصفار الكاملة ::/128؛ مش بيتوزع لواجهة وبيُستخدم كمصدر فقط لما الجهاز مالوش عنوان دائم بعد أو المصدر مش مهم.',
    difficulty: 'medium'
  },
  {
    id: 'q-net4-19', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'In the EUI-64 process, what is inserted into the middle of the 48-bit MAC address to make it 64 bits?',
    questionAr: 'في عملية الـ EUI-64، إيه اللي بيتدرج في نص عنوان الـ MAC (48 بت) عشان يبقى 64 بت؟',
    options: ['The 16-bit value FFFE', 'The 16-bit value FF02', 'The 24-bit OUI duplicated', 'The 7-bit U/L flag only'],
    optionsAr: ['القيمة FFFE (16 بت)', 'القيمة FF02 (16 بت)', 'الـ OUI (24 بت) متكررة', 'علامة الـ U/L (7 بت) فقط'],
    correctAnswer: 0,
    explanation: 'The EUI-64 process adds the 16-bit value FFFE (in hexadecimal) in the middle of the 48-bit MAC address, converting it into a 64-bit Interface ID.',
    explanationAr: 'عملية الـ EUI-64 بتضيف القيمة FFFE (16 بت بالنظام الست عشري) في نص عنوان الـ MAC بتاع 48 بت، فبتحوله لـ Interface ID بطول 64 بت.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-20', courseId: 'networks', lectureId: 'net-lec-4', type: 'mcq',
    question: 'How is a solicited-node multicast address created?',
    questionAr: 'عنوان الـ Solicited-Node Multicast بيتكون إزاي؟',
    options: [
      'By combining the special FF02::1:FF/104 prefix with the right-most 24 bits of the unicast address',
      'By combining FE80::/10 with the full 48-bit MAC address',
      'By duplicating the global unicast address with an FF02 prefix',
      'By taking the left-most 24 bits of the interface ID'
    ],
    optionsAr: [
      'بدمج البادئة الخاصة FF02::1:FF/104 مع أقصى 24 بت على اليمين من عنوان الـ unicast',
      'بدمج FE80::/10 مع عنوان الـ MAC الكامل 48 بت',
      'بتكرار عنوان الـ global unicast مع بادئة FF02',
      'بأخذ أول 24 بت على الشمال من الـ interface ID'
    ],
    correctAnswer: 0,
    explanation: 'The solicited-node multicast address combines the special FF02::1:FF/104 prefix with the right-most 24 bits of the device\'s unicast address, and is created automatically when a global unicast or link-local address is assigned.',
    explanationAr: 'عنوان الـ solicited-node multicast بيتكون بدمج البادئة الخاصة FF02::1:FF/104 مع أقصى 24 بت يمينًا من عنوان الـ unicast بتاع الجهاز، وبيتعمل تلقائيًا عند توزيع عنوان global unicast أو link-local.',
    difficulty: 'medium'
  },
  {
    id: 'q-net4-21', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'Besides the larger address space, IPv6 adds enhancements such as address auto-configuration.',
    questionAr: 'غير مساحة العناوين الأكبر، الـ IPv6 بيضيف تحسينات زي العنونة الذاتية (Address Auto-Configuration).',
    correctAnswer: true,
    explanation: 'True: the lecture lists the 128-bit space, 340 undecillion addresses, and enhancements like address auto-configuration.',
    explanationAr: 'صح! المحاضرة بتذكر مساحة الـ 128 بت و340 undecillion عنوان وتحسينات زي العنونة الذاتية.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-22', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'In the preferred format, every 4 bits of an IPv6 address are represented by a single hexadecimal digit.',
    questionAr: 'في الصيغة المفضلة، كل 4 بت من عنوان IPv6 بيمثلها رقم ست عشري واحد.',
    correctAnswer: true,
    explanation: 'True: IPv6 addresses are 128 bits and every 4 bits is represented by a single hexadecimal digit.',
    explanationAr: 'صح! عناوين IPv6 طولها 128 بت وكل 4 بت بيمثلها رقم ست عشري واحد.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-23', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'A double colon (::) may be used more than once within the same IPv6 address.',
    questionAr: 'ينفع استخدام النقطتين (::) أكتر من مرة في نفس عنوان IPv6.',
    correctAnswer: false,
    explanation: 'False: the double colon can replace any single, contiguous string of all-0 hextets — only one such string can be compressed, so :: appears at most once.',
    explanationAr: 'غلط! النقطتين بتستبدل مجموعة واحدة متتالية من hextets أصفار — مجموعة واحدة بس هي اللي بتتضغط، فـ :: بتظهر مرة واحدة على الأكثر.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-24', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'An interface may contain more than one IPv6 address.',
    questionAr: 'الواجهة الواحدة ممكن تحتوي على أكثر من عنوان IPv6.',
    correctAnswer: true,
    explanation: 'True: the lecture states an interface may contain more than one IPv6 address (for example a global unicast plus a link-local).',
    explanationAr: 'صح! المحاضرة بتوضح إن الواجهة ممكن تحتوي أكثر من عنوان IPv6 (مثلًا global unicast مع link-local).',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-25', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'IPv6 keeps the IPv4-style broadcast address and adds multicast on top of it.',
    questionAr: 'الـ IPv6 سايب عنوان البث (Broadcast) بتاع IPv4 زي ما هو وضاف الـ multicast فوقيه.',
    correctAnswer: false,
    explanation: 'False: there are no broadcast addresses in IPv6 — multicast is used instead (e.g. the FF02::1 all-nodes group plays the all-hosts role).',
    explanationAr: 'غلط! مفيش عناوين broadcast في IPv6 — الـ multicast بيُستخدم بدلها (زي مجموعة FF02::1 لكل الأجهزة اللي بتلعب نفس دور البث).',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-26', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'Typically, it is the link-local address of the router that is used as the default gateway for other devices on the link.',
    questionAr: 'عادةً عنوان الـ Link-Local بتاع الراوتر هو اللي بيُستخدم كـ default gateway لباقي الأجهزة على الوصلة.',
    correctAnswer: true,
    explanation: 'True: the lecture notes it is typically the router\'s link-local address that serves as the default gateway for devices on the link.',
    explanationAr: 'صح! المحاضرة بتنوه إن عنوان الـ link-local بتاع الراوتر هو المستخدم عادةً كـ default gateway لأجهزة الوصلة.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-27', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'Windows clients generate their Interface ID using a randomly generated 64-bit number instead of EUI-64.',
    questionAr: 'أجهزة Windows بتولّد الـ Interface ID الخاص بيها برقم عشوائي 64 بت بدل الـ EUI-64.',
    correctAnswer: true,
    explanation: 'True: the lecture states Windows uses a randomly generated Interface ID, while the EUI-64 process is the other creation method.',
    explanationAr: 'صح! المحاضرة بتوضح إن Windows بيستخدم Interface ID مولود عشوائيًا، وعملية EUI-64 هي الطريقة التانية للتوليد.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-28', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'ICMPv6 Router Advertisement (RA) messages are sent every 200 seconds to all IPv6-enabled devices on the network.',
    questionAr: 'رسائل ICMPv6 Router Advertisement (RA) بتبعت كل 200 ثانية لكل الأجهزة المفعّل عليها IPv6 في الشبكة.',
    correctAnswer: true,
    explanation: 'True: SLAAC uses the local router\'s ICMPv6 Router Advertisement messages, which the lecture says are sent every 200 seconds.',
    explanationAr: 'صح! الـ SLAAC بيعتمد على رسائل ICMPv6 Router Advertisement من الراوتر المحلي، والمحاضرة بتقول إنها بتبعت كل 200 ثانية.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-29', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'With RA option 3 (stateful DHCPv6), the default gateway is provided by the DHCPv6 server.',
    questionAr: 'في الخيار التالت للـ RA (‏Stateful DHCPv6)، الـ default gateway بيتوفر من سيرفر الـ DHCPv6.',
    correctAnswer: false,
    explanation: 'False: with stateful DHCPv6 the gateway comes from the router\'s link-local address, while DHCPv6 supplies all other information.',
    explanationAr: 'غلط! في الـ stateful DHCPv6 الـ gateway بيجي من عنوان الـ link-local بتاع الراوتر، أما الـ DHCPv6 فيوفر باقي المعلومات.',
    difficulty: 'medium'
  },
  {
    id: 'q-net4-30', courseId: 'networks', lectureId: 'net-lec-4', type: 'true_false',
    question: 'FF02::1 is the all-routers multicast group that IPv6 routers join.',
    questionAr: 'الـ FF02::1 هو مجموعة الـ multicast الخاصة بكل الراوترات (All-Routers).',
    correctAnswer: false,
    explanation: 'False: FF02::1 is the all-nodes multicast group that all IPv6-enabled devices join; FF02::2 is the all-routers group.',
    explanationAr: 'غلط! الـ FF02::1 هو مجموعة كل الأجهزة (All-Nodes) وكل جهاز IPv6 بينضم ليها؛ أما مجموعة كل الراوترات فهي FF02::2.',
    difficulty: 'easy'
  },
  {
    id: 'q-net4-31', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Explain why IPv6 is needed according to the lecture, and state the two headline improvements IPv6 brings over IPv4.',
    questionAr: 'اشرح ليه محتاجين IPv6 حسب المحاضرة، واذكر أهم تحسينين بيجيبهم IPv6 مقارنة بـ IPv4.',
    correctAnswer: 'Reasons for IPv6 and its improvements.',
    modelAnswer: 'Reasons IPv6 is needed: the rapidly increasing Internet population, the depletion of IPv4 addresses, issues with NAT, and the Internet of Things. The improvements: IPv6 has a larger 128-bit address space providing 340 undecillion (10^36) addresses, which solves the limitations of IPv4, and it adds enhancements such as address auto-configuration.',
    modelAnswerAr: 'أسباب الحاجة لـ IPv6: الزيادة السريعة في عدد مستخدمي الإنترنت، ونضوب عناوين IPv4، ومشاكل الـ NAT، وإنترنت الأشياء. التحسينات: الـ IPv6 عنده مساحة عناوين أكبر طولها 128 بت بتوفر 340 undecillion (10^36) عنوان وده بيحل محدوديات الـ IPv4، وبيضيف تحسينات زي العنونة الذاتية (Address Auto-Configuration).',
    keyPoints: ['Internet population growth', 'IPv4 depletion', 'NAT issues', 'Internet of Things', '128-bit space, 340 undecillion addresses', 'Address auto-configuration']
  },
  {
    id: 'q-net4-32', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Describe the three IPv4-to-IPv6 coexistence/migration techniques from the lecture and how each one works.',
    questionAr: 'صف تقنيات التعايش/الانتقال الثلاثة من IPv4 لـ IPv6 اللي ذكرتهم المحاضرة وإزاي كل واحدة بتشتغل.',
    correctAnswer: 'Translation, tunneling, and dual stack techniques.',
    modelAnswer: '1. Translation: Network Address Translation 64 (NAT64) allows IPv6-enabled devices to communicate with IPv4 devices by translating between the two. 2. Tunneling: the IPv6 packet is encapsulated inside an IPv4 packet so it can traverse IPv4-only network segments. 3. Dual stack: devices run both the IPv4 and IPv6 protocol stacks simultaneously, so they can speak to either kind of neighbor directly.',
    modelAnswerAr: '1. الترجمة: الـ NAT64 (ترجمة عناوين الشبكة 64) بتسمح لأجهزة IPv6 تتواصل مع أجهزة IPv4 عن طريق الترجمة بين الاتنين. 2. الأنفاق: حزمة IPv6 بتتغلف جوه حزمة IPv4 عشان تعدي عبر أجزاء الشبكة اللي بتفهم IPv4 فقط. 3. الـ Dual Stack: الأجهزة بتشغل مكدسي IPv4 وIPv6 في نفس الوقت، فتقدر تكلم أي نوع جار مباشرة.',
    keyPoints: ['NAT64 translation for cross-version talk', 'Tunneling wraps IPv6 in IPv4 packets', 'Dual stack runs both stacks simultaneously']
  },
  {
    id: 'q-net4-33', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'State the two IPv6 compression rules and apply them: compress 2041:0000:140F:0000:0000:0000:875B:131B, and expand fd00:0:0:4100:: back to the preferred format.',
    questionAr: 'اذكر قاعدتي ضغط IPv6 وطبّقهم: اضغط 2041:0000:140F:0000:0000:0000:875B:131B، ووسّع fd00:0:0:4100:: للصيغة المفضلة.',
    correctAnswer: 'Two compression rules with applied examples.',
    modelAnswer: 'Rule 1: omit leading 0s in any hextet (0DB8 becomes DB8; a 0000 hextet becomes 0). Rule 2: a double colon (::) can replace any single, contiguous string of one or more all-0 hextets — used only once per address. Compression: 2041:0000:140F:0000:0000:0000:875B:131B → 2041:0:140F::875B:131B (leading 0s dropped, then the three contiguous 0000 hextets replaced by ::). Expansion: fd00:0:0:4100:: → fd00:0000:0000:4100:0000:0000:0000:0000, writing every hextet as four hexadecimal digits.',
    modelAnswerAr: 'القاعدة 1: حذف الأصفار البادئة في أي hextet (‏0DB8 بتقوى DB8، والـ hextet اللي كله أصفار بيقوى 0). القاعدة 2: النقطتين (::) بتقدر تستبدل أي مجموعة واحدة متتالية من hextet أو أكتر كلها أصفار — وتُستخدم مرة واحدة فقط في العنوان. الضغط: ‏2041:0000:140F:0000:0000:0000:875B:131B تقوى ‏2041:0:140F::875B:131B (حذفنا الأصفار البادئة، وبعدها استبدلنا تلات hextets أصفار متتالية بـ ::). التوسيع: ‏fd00:0:0:4100:: تقوى ‏fd00:0000:0000:4100:0000:0000:0000:0000 بكتابة كل hextet بأربع خانات ست عشرية.',
    keyPoints: ['Rule 1: omit leading 0s per hextet', 'Rule 2: :: replaces one contiguous all-0 run, once', '2041:0:140F::875B:131B compressed form', 'fd00:0000:0000:4100:0000:0000:0000:0000 expanded']
  },
  {
    id: 'q-net4-34', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Using the lecture\'s diagram, compare unicast, multicast, and anycast delivery, and state the anycast key idea.',
    questionAr: 'بالاعتماد على رسم المحاضرة، قارن بين التسليم في Unicast وMulticast وAnycast، واذكر الفكرة المفتاحية للـ Anycast.',
    correctAnswer: 'Unicast vs multicast vs anycast delivery comparison.',
    modelAnswer: 'Unicast: single source IPv6 address — the diagram shows host A sending separate copies, one to each of D, C, and B. Multicast: one IPv6 packet is sent to multiple destinations — the diagram shows one message reaching only the members of the multicast group (C and D) while B, outside the group, receives nothing. Anycast: any IPv6 unicast address that can be assigned to multiple devices sharing the same IP; the network delivers the data automatically to the closest destination according to routing. Anycast combines ideas from unicast and multicast, helps distribute traffic among routers, keeps the service available if one router fails, and is useful when the same service is provided by multiple servers. Key idea: Anycast = One to the Nearest (One of Many).',
    modelAnswerAr: 'الـ Unicast: عنوان IPv6 لمصدر واحد — الرسم بيعرض الجهاز A بيبعت نسخ منفصلة لكل واحد من D وC وB. الـ Multicast: حزمة IPv6 واحدة بتتبعت لوجهات متعددة — الرسم بيعرض رسالة واحدة بتوصل لأعضاء مجموعة الـ multicast فقط (C وD) بينما B اللي بره المجموعة ما بيوصلهوش حاجة. الـ Anycast: أي عنوان IPv6 unicast ممكن يتوزع على أجهزة متعددة شاركة نفس الـ IP؛ والشبكة بتسلم البيانات تلقائيًا لأقرب وجهة حسب التوجيه. والـ Anycast بيجمع أفكار الـ unicast والـ multicast، وبيوزع الحمل على الراوترات، وبيحافظ على توفر الخدمة لو راوتر وقع، وبيفيد لما نفس الخدمة متوفرة على سيرفرات متعددة. الفكرة المفتاحية: ‏Anycast = واحد لأقرب جهاز (من مجموعة كتير).',
    keyPoints: ['Unicast: separate copy per destination', 'Multicast: only group members receive', 'Anycast: same IP on many devices', 'Delivered to closest destination', 'Anycast = One to the Nearest (One of Many)']
  },
  {
    id: 'q-net4-35', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Describe the three parts of an IPv6 global unicast address with the lecture\'s country/street/home analogy, and state which addresses are currently being assigned.',
    questionAr: 'صف الأجزاء التلاتة لعنوان الـ Global Unicast في IPv6 بتشبيه المحاضرة (Country/Street/Home)، واذكر أنيهي عناوين بتتوزع حاليًا.',
    correctAnswer: 'Global unicast three-part structure.',
    modelAnswer: 'A global unicast address has three parts: 1. Global routing prefix — the network portion assigned by the provider, typically /48 (Country). 2. Subnet ID — used to subnet within an organization, 16 bits (Street). 3. Interface ID — equivalent to the host portion of an IPv4 address, 64 bits (Home). Currently, only global unicast addresses with the first three bits of 001 — i.e. the 2000::/3 range, whose first hextet runs from 2000 (0010 0000 0000 0000) to 3FFF (0011 1111 1111 1111) — are being assigned. For example, in 2001:0DB8:ACAD:0001::/64 the global routing prefix is 2001:0DB8:ACAD, the subnet ID is 0001, and the interface ID is 0000:0000:0000:0010.',
    modelAnswerAr: 'عنوان الـ global unicast ليه تلات أجزاء: 1. الـ Global Routing Prefix — جزء الشبكة اللي المزود بيوزعه، عادةً /48 (‏Country). 2. الـ Subnet ID — بيُستخدم للتقسيم جوه المنظمة، وعرضه 16 بت (‏Street). 3. الـ Interface ID — مكافئ لجزء الأجهزة في IPv4، وبياخد 64 بت (‏Home). حاليًا العناوين اللي بتتوزع هي الـ global unicast اللي أول تلات بتات فيها 001 — يعني نطاق 2000::/3 اللي أول hextet فيه بيمتد من 2000 (0010 0000 0000 0000) لـ 3FFF (0011 1111 1111 1111). ومثال: في ‏2001:0DB8:ACAD:0001::/64 الـ prefix هو 2001:0DB8:ACAD، والـ subnet ID هو 0001، والـ interface ID هو 0000:0000:0000:0010.',
    keyPoints: ['Global routing prefix /48 (Country)', 'Subnet ID 16 bits (Street)', 'Interface ID 64 bits (Home)', 'First three bits 001 or 2000::/3', 'First hextet range 2000-3FFF', 'Example 2001:0DB8:ACAD:0001::/64 breakdown']
  },
  {
    id: 'q-net4-36', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Using the address 2001:0DB8:0001:5270:0127:00AB:CAFE:0E1F/64 from the lecture, explain which bits identify IANA, the regional registry, the ISP, the site, and the subnet; then name the five regional registries and the lecture\'s /23 registry examples.',
    questionAr: 'باستخدام العنوان 2001:0DB8:0001:5270:0127:00AB:CAFE:0E1F/64 من المحاضرة، اشرح أنهي بتات بتحدد IANA والسجل الإقليمي والمزود (ISP) والموقع (Site) والـ Subnet؛ وبعدها اذكر السجلات الإقليمية الخمسة وأمثلة الـ /23 من المحاضرة.',
    correctAnswer: 'Registry structure of the example address.',
    modelAnswer: 'In 2001:0DB8:0001:5270:0127:00AB:CAFE:0E1F/64: the first 3 bits (2001:0DB8 leading bits, 001) are the IANA global routing number; bits 16-24 identify the regional registry; the remaining 8 bits up to /32 identify the ISP; the 3rd hextet (0001) is the Site/Customer identifier; and the 4th hextet (5270) is the Site Topology/Subnet ID, which allows 65,536 subnets with 18,446,744,073,709,551,616 (18 quintillion) addresses each and is not part of the host address field. The five regional registries are AfriNIC, APNIC, LACNIC, RIPE NCC, and ARIN. The lecture\'s /23 examples: 2001:0000::/23 IANA, 2001:0200::/23 APNIC (Asia/Pacific), 2001:0400::/23 ARIN (North America), and 2001:0600::/23 RIPE (Europe, Middle East and Central Asia).',
    modelAnswerAr: 'في العنوان 2001:0DB8:0001:5270:0127:00AB:CAFE:0E1F/64: أول 3 بتات (بتات بداية 2001:0DB8 وهي 001) هي رقم التوجيه العالمي بتاع IANA؛ والبتات من 16 لـ 24 بتحدد السجل الإقليمي؛ والـ 8 بتات الباقية لحد /32 بتحدد الـ ISP؛ والـ hextet التالت (0001) هو معرّف الموقع/العميل؛ والـ hextet الرابع (5270) هو الـ Site Topology/Subnet ID اللي بيسمح بـ 65,536 subnet وكل واحدة فيها 18,446,744,073,709,551,616 (18 كوينتيليون) عنوان، وهو مش جزء من حقل عنوان الجهاز. السجلات الإقليمية الخمسة: AfriNIC وAPNIC وLACNIC وRIPE NCC وARIN. وأمثلة الـ /23 في المحاضرة: ‏2001:0000::/23 لـ IANA، و2001:0200::/23 لـ APNIC (آسيا/المحيط الهادي)، و2001:0400::/23 لـ ARIN (أمريكا الشمالية)، و2001:0600::/23 لـ RIPE (أوروبا والشرق الأوسط وآسيا الوسطى).',
    keyPoints: ['First 3 bits = IANA', 'Bits 16-24 = regional registry', 'Up to /32 = ISP', '3rd hextet = site/customer', '4th hextet = subnet (65,536 subnets, 18 quintillion each)', 'AfriNIC APNIC LACNIC RIPE NCC ARIN', '/23 examples IANA/APNIC/ARIN/RIPE']
  },
  {
    id: 'q-net4-37', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Walk through the EUI-64 process for the MAC address FC-99-47-75-CE-E0 exactly as the lecture diagram shows, and mention the random-generation alternative.',
    questionAr: 'امشِ على عملية الـ EUI-64 لعنوان الـ MAC ‏FC-99-47-75-CE-E0 بالظبط زي رسم المحاضرة، واذكر البديل المولّد عشوائيًا.',
    correctAnswer: 'EUI-64 walkthrough FC-99-47-75-CE-E0.',
    modelAnswer: 'Step 1: split the MAC address into the 24-bit OUI (FC-99-47) and the 24-bit device identifier (75-CE-E0). Step 2: insert the 16-bit value FFFE in the middle, giving FC-99-47-FF-FE-75-CE-E0. Step 3: flip the 7th bit of the OUI — the Universally/Locally (U/L) bit: FC (1111 1100) becomes FE (1111 1110). The modified EUI-64 Interface ID in hexadecimal is FE99:47FF:FE75:CEE0. The lecture also notes that under SLAAC the client can instead use a randomly generated 64-bit Interface ID — Windows uses this random method.',
    modelAnswerAr: 'الخطوة 1: قسّم عنوان الـ MAC إلى الـ OUI (24 بت: FC-99-47) ومعرّف الجهاز (24 بت: 75-CE-E0). الخطوة 2: أدرج القيمة FFFE (16 بت) في النص، فيقوى FC-99-47-FF-FE-75-CE-E0. الخطوة 3: اقلب البتة السابعة في الـ OUI — وهي بتة الـ Universally/Locally (U/L): ‏FC (1111 1100) بتقوى FE (1111 1110). وبكده الـ Interface ID الناتج بالنظام الست عشري هو FE99:47FF:FE75:CEE0. والمحاضرة كمان بتوضح إن العميل تحت الـ SLAAC يقدر بدل كده يستخدم Interface ID مولود عشوائيًا بطول 64 بت — وWindows بيستخدم الطريقة العشوائية دي.',
    keyPoints: ['Split MAC into OUI + device identifier', 'Insert FFFE in the middle', 'Flip the U/L bit (7th bit): FC becomes FE', 'Result FE99:47FF:FE75:CEE0', 'Windows uses random 64-bit ID instead']
  },
  {
    id: 'q-net4-38', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Compare the three Router Advertisement (RA) options for dynamic IPv6 address assignment, including what SLAAC provides, the role of DHCPv6 in each option, and the RA timing.',
    questionAr: 'قارن بين الخيارات التلاتة لرسائل الـ Router Advertisement (RA) في العنونة الديناميكية لـ IPv6، بما يشمل ما يوفره الـ SLAAC ودور الـ DHCPv6 في كل خيار وتوقيت رسائل الـ RA.',
    correctAnswer: 'Three RA options: SLAAC, SLAAC + stateless DHCPv6, stateful DHCPv6.',
    modelAnswer: 'SLAAC (Stateless Address Auto-Configuration) lets a device obtain its prefix, prefix length, default gateway address, and other information from an IPv6 router using ICMPv6 Router Advertisement messages, which are sent every 200 seconds to all IPv6-enabled devices. RA Option 1 (SLAAC only, the default): "I\'m everything you need (Prefix, Prefix-length, Default Gateway)" — no DHCPv6 needed. RA Option 2 (SLAAC and stateless DHCPv6): SLAAC supplies the IPv6 global unicast address and default gateway, while a stateless DHCPv6 server provides other information such as DNS addresses ("Here is my information but you need to get other information such as DNS addresses from a DHCPv6 server"). RA Option 3 (stateful DHCPv6): the default gateway comes from the router\'s link-local address, and DHCPv6 supplies all other information ("I can\'t help you. Ask a DHCPv6 server for all your information").',
    modelAnswerAr: 'الـ SLAAC (العنونة الذاتية عديمة الحالة) بتخلي الجهاز ياخد الـ prefix وطول الـ prefix والـ default gateway ومعلومات تانية من راوتر IPv6 عبر رسائل ICMPv6 Router Advertisement اللي بتبعت كل 200 ثانية لكل الأجهزة المفعّل عليها IPv6. الخيار 1 (SLAAC فقط، وهو الافتراضي): «أنا كل اللي محتاجه (Prefix وطول الـ Prefix والـ Default Gateway)» — من غير DHCPv6. الخيار 2 (SLAAC مع DHCPv6 عديم الحالة): الـ SLAAC بيدي عنوان الـ global unicast والـ gateway، وسيرفر DHCPv6 عديم الحالة بيدي باقي المعلومات زي عناوين DNS («دي معلوماتي بس خد باقي المعلومات زي الـ DNS من سيرفر DHCPv6»). الخيار 3 (Stateful DHCPv6): الـ default gateway بيجي من عنوان الـ link-local بتاع الراوتر، والـ DHCPv6 بيدي كل المعلومات التانية («مش هقدر أساعدك. اسأل سيرفر DHCPv6 عن كل معلوماتك»).',
    keyPoints: ['SLAAC gives prefix, prefix-length, gateway via ICMPv6 RA', 'RA every 200 seconds', 'Option 1: SLAAC only (default)', 'Option 2: SLAAC + stateless DHCPv6 for DNS etc.', 'Option 3: stateful DHCPv6; gateway from router link-local']
  },
  {
    id: 'q-net4-39', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Explain the two categories of IPv6 multicast addresses, the two common assigned groups and their meanings, and how the solicited-node multicast address is built and used.',
    questionAr: 'اشرح فئتي عناوين الـ Multicast في IPv6، والمجموعتين المعروفتين المعينتين ومعانيهم، وإزاي عنوان الـ Solicited-Node Multicast بيتكوّن وبيُستخدم.',
    correctAnswer: 'Assigned vs solicited-node IPv6 multicast.',
    modelAnswer: 'There are two types of IPv6 multicast addresses: assigned multicast — reserved addresses for predefined groups of devices — and solicited-node multicast. Two common assigned groups: FF02::1 is the all-nodes multicast group that all IPv6-enabled devices join (similar to a broadcast in IPv4), and FF02::2 is the all-routers multicast group that all IPv6 routers join. Solicited-node multicast: mapped to a special Ethernet multicast address so the Ethernet NIC can filter frames on the destination MAC; used in the Neighbor Discovery Protocol to obtain the layer-2 link-layer addresses of other nodes; automatically created when a global unicast or link-local unicast address is assigned; built by combining the special FF02::1:FF/104 prefix with the right-most 24 bits of the unicast address (e.g. FF02:0:0:0:0:1:FF00:0 format).',
    modelAnswerAr: 'عناوين الـ multicast في IPv6 ليها فئتين: الـ assigned multicast — عناوين محجوزة لمجموعات أجهزة معرفة مسبقًا — والـ solicited-node multicast. المجموعتان المعينتان الشائعتان: ‏FF02::1 هي مجموعة كل الأجهزة (All-Nodes) وكل جهاز IPv6 بينضم ليها (وشبيهة بالـ broadcast في IPv4)، وFF02::2 هي مجموعة كل الراوترات (All-Routers) وكل راوترات IPv6 بتنضم ليها. الـ solicited-node multicast: مربوط بعنوان Ethernet multicast خاص عشان كارت الشبكة يقدر يفلتر الإطارات على حسب الـ MAC للوجهة؛ وبيُستخدم في بروتوكول اكتشاف الجيران (NDP) للحصول على عناوين الطبقة الثانية للأجهزة الأخرى؛ وبيتعمل تلقائيًا عند توزيع عنوان global unicast أو link-local؛ وبيتكوّن بدمج البادئة الخاصة FF02::1:FF/104 مع أقصى 24 بت يمينًا من عنوان الـ unicast (بصيغة زي FF02:0:0:0:0:1:FF00:0).',
    keyPoints: ['Assigned multicast: predefined groups', 'FF02::1 all-nodes (like IPv4 broadcast)', 'FF02::2 all-routers', 'Solicited node = FF02::1:FF/104 + last 24 bits', 'Used by NDP, NIC MAC filtering', 'Auto-created with unicast assignment']
  },
  {
    id: 'q-net4-40', courseId: 'networks', lectureId: 'net-lec-4', type: 'essay',
    question: 'Describe how IPv6 addresses are configured and verified: the router static command, host manual configuration and gateway choices, dynamic link-local vs static link-local on Cisco IOS, and the verification commands.',
    questionAr: 'صف إزاي عناوين IPv6 بتتظبط وبتتأكد: أمر الضبط الثابت على الراوتر، وضبط الجهاز يدويًا واختيارات الـ gateway، والـ link-local الديناميكي مقابل الثابت على Cisco IOS، وأوامر التحقق.',
    correctAnswer: 'IPv6 configuration and verification commands.',
    modelAnswer: 'Router static configuration is similar to IPv4 with IPv6 replacing IPv4: the command to configure an IPv6 global unicast address on an interface is ipv6 address ipv6-address/prefix-length. Host configuration is manual and similar to configuring an IPv4 address; the default gateway can be configured to match either the link-local (FE80) or the global unicast address (e.g. 2001:db8:acad:1::1) of the Gigabit Ethernet interface. Dynamic assignment is done by SLAAC or stateful DHCPv6. Link-local addresses can be established dynamically or configured manually: Cisco IOS routers use EUI-64 to generate the Interface ID for all link-local addresses on IPv6 interfaces, but the drawback of the dynamically assigned link-local address is its long interface ID, so they are often configured statically to create simple, easy-to-remember addresses. Verification: the commands are similar to IPv4 — show ipv6 interface brief and show ipv6 route — and the ping command is identical except that an IPv6 address is used.',
    modelAnswerAr: 'الضبط الثابت على الراوتر شبيه بالـ IPv4 مع استبدال IPv6 مكانه: الأمر بتاع ضبط عنوان global unicast على الواجهة هو ipv6 address متبوعًا بالعنوان/طول الـ prefix. وضبط الجهاز بيتعمل يدويًا وشبيه بضبط عنوان IPv4؛ والـ default gateway ممكن يتظبط يطابق إما عنوان الـ link-local (‏FE80) أو عنوان الـ global unicast (زي 2001:db8:acad:1::1) الخاص بواجهة الـ Gigabit Ethernet. والعنونة الديناميكية بتتم بالـ SLAAC أو الـ stateful DHCPv6. وعناوين الـ link-local ممكن تتأسس ديناميكيًا أو تتظبط يدويًا: راوترات Cisco IOS بتستخدم EUI-64 لتوليد الـ Interface ID لكل عناوين الـ link-local على واجهات IPv6، لكن عيب الـ link-local الديناميكي هو طول الـ interface ID، فلذلك غالبًا بتتظبط ثابت لعمل عناوين بسيطة سهلة الحفظ. التحقق: الأوامر شبيهة بالـ IPv4 — ‏show ipv6 interface brief وshow ipv6 route — وأمر ping متطابق تمامًا إلا إنه بيُستخدم مع عنوان IPv6.',
    keyPoints: ['ipv6 address ipv6-address/prefix-length on routers', 'Host gateway: FE80 link-local or global unicast', 'Dynamic: SLAAC or stateful DHCPv6', 'IOS link-local via EUI-64; long ID drawback; often static', 'show ipv6 interface brief / show ipv6 route / ping']
  }
];

const lecture1Sections: SummarySection[] = [
  section(
    '1. Network Components and Endpoints', '1. مكوّنات الشبكة والأجهزة الطرفية',
    'A network connects two or more computers so they can share resources. End devices originate or receive messages; intermediary devices connect them and move traffic across the network. (Source: CCNA-1.pdf, pp. 3–11.)',
    'الشبكة بتوصل جهازين كمبيوتر أو أكتر عشان يشاركوا الموارد. الـEnd devices بتبدأ الرسائل أو تستقبلها، والـIntermediary devices بتوصل الأجهزة ببعض وبتنقل الـtraffic جوه الشبكة. (المصدر: CCNA-1.pdf، ص 3–11.)',
    [
      'Component tree (p. 5): Hardware branches into Devices and Media; Software branches into Networking Operating System and Protocol. The branches describe complementary parts of a working network.',
      'Network software (p. 14): A network operating system manages network resources and services; protocols define message syntax, ordering, formatting, addressing, and routing rules. TCP/IP is a protocol suite, not one protocol.',
      'End device: A PC, phone, server, or printer is a message source or destination and uses addresses to identify communication endpoints.',
      'Intermediary device: Switches, routers, and access points connect endpoints and forward or manage traffic; their functions differ by device and layer.',
      'Identifiers: MAC addresses identify network interfaces on a local link, IP addresses identify network-layer endpoints, and port numbers identify application processes.',
      'Repeater and Hub (p. 9): A Layer 1 repeater regenerates a weakened signal without inspecting destination addresses. An active Ethernet hub is a multiport repeater: it repeats incoming signals to the other ports and shares one collision domain.',
      'Bridge and Switch (p. 10): A Layer 2 bridge learns source MAC addresses and filters or forwards frames between LAN segments; a switch is a multiport bridge. Known unicast goes to the learned port; unknown unicast and broadcast flood other ports in the same VLAN. Store-and-forward switches can check the complete frame before forwarding.',
      'Router and Cloud (p. 11): A router uses IP routes to forward packets between networks and separates broadcast domains. The cloud symbol abbreviates an Internet/internetwork region; it is not another forwarding-device type.',
      'Intermediary roles (p. 8): regenerate and retransmit data signals, maintain information about network pathways, notify other devices of errors and communication failures, direct data along alternate pathways on link failure, classify and prioritize messages, and permit or deny flow based on security settings.',
      'End-device addresses (p. 7): the MAC address is a 6-octet hexadecimal machine address (e.g. 2A:3E:14:23:1C:87); the IP address is a 4-octet dotted-decimal label (e.g. 121.13.0.0); the application port address is a decimal number from Well Known, Registered, or Dynamic/Private ranges.',
      'Networking definition (p. 3): networking describes designing, implementing, upgrading, and managing networks and network technologies — the network itself exists to share resources such as files, folders, printers, and disk drives.',
    ],
    [
      'شجرة المكوّنات في صفحة 5: الـ Hardware بيتفرّع لـ Devices وMedia؛ والـ Software بيتفرّع لـ Networking Operating System وProtocol. الفروع دي أجزاء بتكمّل بعض عشان الشبكة تشتغل.',
      'برمجيات الشبكة في صفحة 14: نظام تشغيل الشبكة بيدير الموارد والخدمات؛ والـ Protocols بتحدد قواعد صياغة الرسائل وترتيبها وتنسيقها وعنونتها وتوجيهها. الـ TCP/IP مجموعة بروتوكولات، مش بروتوكول واحد.',
      'الـEnd device: زي الكمبيوتر أو الموبايل أو السيرفر أو الطابعة؛ بيكون مصدر الرسالة أو وجهتها، وبيستخدم عناوين لتحديد طرفَي الاتصال.',
      'الـIntermediary device: زي الـSwitch والـRouter والـAccess Point؛ بيوصل الأجهزة الطرفية وبيوجّه أو بينظّم الـtraffic، ووظيفة كل جهاز وطبقته مختلفة.',
      'المعرّفات: عنوان الـMAC بيعرّف واجهة الشبكة على الوصلة المحلية، وعنوان الـIP بيعرّف الطرف على طبقة الشبكة، ورقم الـport بيعرّف التطبيق أو العملية.',
      'الـ Repeater والـ Hub في صفحة 9: الـ Repeater في Layer 1 بيجدّد الإشارة الضعيفة من غير فحص عنوان الوجهة. الـ Ethernet Hub النشط Repeater متعدد المنافذ؛ بيكرر الإشارة لباقي المنافذ وبيشارك Collision domain واحدة.',
      'الـ Bridge والـ Switch في صفحة 10: الـ Bridge في Layer 2 بيتعلّم عناوين Source MAC وبيفلتر أو بيوجّه الـ Frames بين أجزاء الـ LAN؛ والـ Switch هو Bridge متعدد المنافذ. الـ Known unicast بيروح للمنفذ المتعلّم؛ والـ Unknown unicast والـ Broadcast بيتوزّعوا على باقي منافذ نفس الـ VLAN. الـ Store-and-forward Switch يقدر يفحص الـ Frame كاملة قبل التوجيه.',
      'الـ Router والـ Cloud في صفحة 11: الـ Router بيستخدم مسارات IP لتوجيه الـ Packets بين الشبكات وبيفصل الـ Broadcast domains. رمز الـ Cloud بيختصر جزء من الإنترنت أو الشبكات المترابطة؛ مش نوع جهاز توجيه إضافي.',
      'أدوار الأجهزة الوسيطة في صفحة 8: تجديد وإعادة إرسال الإشارات، تخزين معلومات المسارات، إبلاغ الأجهزة الأخرى بالأخطاء وفشل الاتصال، توجيه البيانات لمسارات بديلة عند انقطاع الوصلة، تصنيف الرسائل حسب الأولوية، والسماح أو المنع بناءً على إعدادات الأمان.',
      'عناوين الأجهزة الطرفية في صفحة 7: عنوان الـ MAC عنوان جهاز من 6 octets بالنظام الست عشري (زي 2A:3E:14:23:1C:87)؛ وعنوان الـ IP وسم من 4 octets بالنظام العشري المنقوط (زي 121.13.0.0)؛ وعنوان الـ port رقم عشري من نطاقات Well Known أو Registered أو Dynamic/Private.',
      'تعريف الـ Networking في صفحة 3: الـ networking بيشمل تصميم وتنفيذ وترقية وإدارة الشبكات وتقنياتها — والشبكة نفسها قائمة على مشاركة الموارد زي الملفات والمجلدات والطابعات وأقراص التخزين.',
    ],
    'A message travels from an end device, through any required intermediary devices and media, to another end device.',
    'الرسالة بتتحرك من End device، وبتعدّي على أجهزة وسيطة ووسائط حسب المسار، لحد End device تاني.',
    ['network-devices'],
  ),
  section(
    '2. Media, Bandwidth and Throughput', '2. وسائط النقل والـBandwidth والـThroughput',
    'Network media carry signals between devices. Bandwidth describes the maximum transfer rate; throughput is the actual measured rate at a particular time. (Source: CCNA-1.pdf, pp. 12–14.)',
    'وسائط الشبكة بتنقل الإشارات بين الأجهزة. الـBandwidth هو أقصى معدل نقل، والـThroughput هو المعدل الفعلي اللي اتقاس في وقت معيّن. (المصدر: CCNA-1.pdf، ص 12–14.)',
    [
      'Copper: Carries electrical signals and is commonly used for wired links.',
      'Fiber: Carries light and is suitable for links that need high data rates or longer distances.',
      'Wireless: Carries radio signals; the environment and distance affect the link.',
      'Media selection: Consider distance, environment, required data rate, and cost when choosing a medium.',
      'Measured performance: Throughput is affected by users, devices, media, and network conditions, so it does not exceed the link bandwidth.',
      'Quick example (illustrative numbers): if a 100 Mbps link measures 65 Mbps, 100 Mbps is its bandwidth and 65 Mbps is its throughput.',
      'Download-time formula (p. 13): Best time T = S/BW; typical time T = S/P. S is file size in bits, BW is the theoretical bandwidth of the slowest link, P is actual throughput in bits per second, and T is seconds. These estimates assume a constant rate and omit setup delay; P must be positive for a finite estimate.',
      'Worked example (supplementary): A 10 MB decimal file contains 80,000,000 bits. At BW = 100 Mbps the ideal time is 0.8 seconds; at P = 40 Mbps the estimate is 2 seconds. Convert bytes to bits before dividing.',
      'Throughput factors (p. 13): internetworking devices, the type of data being transferred, network topology, the number of users on the network, and the network media itself.',
    ],
    [
      'الـCopper: بينقل إشارات كهربائية وبيُستخدم كتير في الوصلات السلكية.',
      'الـFiber: بينقل الضوء وبيناسب الوصلات اللي محتاجة معدل بيانات عالي أو مسافة أطول.',
      'الـWireless: بينقل إشارات لاسلكية؛ والبيئة والمسافة بيأثروا على الوصلة.',
      'اختيار الوسيط: راعي المسافة والبيئة ومعدل البيانات المطلوب والتكلفة وإنت بتختار وسيط النقل.',
      'الأداء المقاس: الـThroughput بيتأثر بالمستخدمين والأجهزة والوسيط وظروف الشبكة، فعشان كده ما بيعدّيش الـBandwidth.',
      'مثال سريع (أرقام توضيحية): لو وصلة 100 Mbps حققت قياسًا قدره 65 Mbps، فالـ100 Mbps هي الـBandwidth والـ65 Mbps هي الـThroughput.',
      'معادلة وقت التحميل في صفحة 13: أفضل وقت T = S/BW؛ والوقت المعتاد T = S/P. الـ S حجم الملف بالـ Bits، والـ BW السعة النظرية لأبطأ وصلة، والـ P معدل النقل الفعلي بالـ Bits في الثانية، والـ T الوقت بالثواني. التقدير بيفترض معدل ثابت وبيتجاهل وقت بدء الاتصال؛ والـ P لازم تكون موجبة عشان الوقت يبقى محدود.',
      'مثال محلول إضافي: ملف حجمه 10 MB بالنظام العشري فيه 80,000,000 bit. عند BW = 100 Mbps الوقت المثالي 0.8 ثانية؛ وعند P = 40 Mbps التقدير ثانيتين. حوّل الـ Bytes لـ Bits قبل القسمة.',
      'عوامل الـThroughput في صفحة 13: أجهزة الربط البينية (Internetworking devices)، نوع البيانات المنقولة، طوبولوجيا الشبكة، عدد المستخدمين، والوسيط نفسه.',
    ],
    'Bandwidth is the capacity limit; throughput is the rate actually achieved.',
    'الـBandwidth هو حدّ السعة، والـThroughput هو المعدل اللي اتحقق فعليًا.',
    ['network-media'],
  ),
  section(
    '3. Network Scope and Management', '3. نطاق الشبكة وطريقة إدارتها',
    'Networks can be classified by their geographic scale or by how services and administration are organized. (Source: CCNA-1.pdf, pp. 15–20.)',
    'الشبكات ممكن تتصنّف حسب المساحة الجغرافية اللي بتغطيها أو حسب تنظيم الخدمات والإدارة. (المصدر: CCNA-1.pdf، ص 15–20.)',
    [
      'PAN and LAN: A Personal Area Network serves a person nearby; a Local Area Network connects devices in a limited local area.',
      'MAN and WAN: A Metropolitan Area Network spans a city-scale area; a Wide Area Network spans larger geographic areas and links networks.',
      'Peer-to-peer: Devices share resources directly, which fits smaller networks with decentralized management.',
      'Client/server: Dedicated servers provide centralized services, administration, and access control to clients.',
      'Peer-to-peer fit (p. 19): appropriate for about 10 or fewer users, no specialized services, limited security needs, and limited future growth; peers are equal and there is no central administrator. Costs are low, but resources may duplicate and security policy is hard to uphold.',
      'Client/server trade-offs (p. 20): servers running a network operating system manage data, users, groups, security, and applications; central administration, backup, and fault tolerance are advantages, while server cost, configuration expertise, and a server single point of failure are disadvantages.',
      'Media classification (p. 16): networks are also classified by transmission media — wired (UTP, coaxial, fiber-optic cables) versus wireless.',
    ],
    [
      'الـPAN والـLAN: شبكة الـPAN بتخدم شخص وأجهزته القريبة؛ والـLAN بتوصل أجهزة في نطاق محلي محدود.',
      'الـMAN والـWAN: شبكة الـMAN بتغطي نطاق مدينة؛ والـWAN بتغطي مساحة جغرافية أكبر وبتوصل شبكات ببعض.',
      'الـPeer-to-peer: الأجهزة بتشارك الموارد مباشرة، وده مناسب للشبكات الأصغر اللي إدارتها موزّعة.',
      'الـClient/server: سيرفرات مخصصة بتقدّم خدمات وإدارة وتحكّم مركزي في الوصول للـclients.',
      'مناسبة الـPeer-to-peer في صفحة 19: مناسبة لحوالي 10 مستخدمين أو أقل، بدون خدمات مخصصة، باحتياجات أمان محدودة، ونمو مستقبلي محدود؛ الـpeers متساوية ومفيش مسؤول مركزي. التكلفة قليلة، بس الموارد ممكن تتكرر وتطبيق سياسة الأمان صعب.',
      'مقايضات الـClient/server في صفحة 20: السيرفرات اللي شغالة network operating system بتدير البيانات والمستخدمين والمجموعات والأمان والتطبيقات؛ الإدارة المركزية والنسخ الاحتياطي وتحمّل الأعطال ميزات، أما تكلفة السيرفرات والحاجة لخبير ووجود نقطة فشل وحيدة في السيرفر فهي عيوب.',
      'التصنيف حسب الوسيط في صفحة 16: الشبكات كمان بتتصنف حسب وسط النقل — سلكية (UTP وكابل محوري وألياف ضوئية) أو لاسلكية.',
    ],
    'Use PAN/LAN/MAN/WAN for scale; use peer-to-peer or client/server for management structure.',
    'استخدم PAN/LAN/MAN/WAN لوصف النطاق؛ واستخدم Peer-to-peer أو Client/server لوصف طريقة الإدارة.',
  ),
  section(
    '4. Physical and Logical Topologies', '4. الـPhysical والـLogical Topology',
    'A physical topology describes how devices and links are arranged; a logical topology describes how data moves. The topology affects cost, performance, troubleshooting, and fault handling. (Source: CCNA-1.pdf, pp. 21–26.)',
    'الـPhysical topology بتوصف ترتيب الأجهزة والوصلات، والـLogical topology بتوصف حركة البيانات. والـtopology بتأثر على التكلفة والأداء واستكشاف الأعطال والتعامل معاها. (المصدر: CCNA-1.pdf، ص 21–26.)',
    [
      'Star: Each endpoint connects to a central device; a central-device or link failure can isolate the affected connections.',
      'Bus and ring: A bus shares a main cable; a ring connects nodes in a loop. Their shared-path or ring dependencies affect fault handling.',
      'Mesh: Nodes have multiple interconnections, providing alternate paths at the cost of more links.',
      'Other arrangements: Tree/hierarchical and point-to-point or hub-and-spoke layouts serve different LAN and WAN needs.',
      'Logical topology examples (p. 25): Ethernet with a hub is a physical star but a logical bus, because the hub broadcasts to every node and each node checks whether the data is intended for it; token ring is a logical ring where a token passes sequentially through an MSAU and only the token holder transmits, avoiding collisions.',
      'WAN physical topologies (p. 24): point-to-point (leased lines priced by bandwidth and distance, not shared), hub-and-spoke (spokes connect only to the hub site with no direct spoke-to-spoke links), and full mesh WAN (every location linked to every other, needing more resources).',
      'Router segmentation (p. 26): a router divides a network into subnetworks with different network addresses; each end device must determine how to deliver data locally and remotely.',
    ],
    [
      'الـStar: كل جهاز طرفي بيتصل بجهاز مركزي؛ وتعطّل الجهاز المركزي أو الوصلة ممكن يعزل الاتصالات المتأثرة.',
      'الـBus والـRing: الـBus بتشارك كابل رئيسي؛ والـRing بتوصل الأجهزة في حلقة. اعتمادهم على مسار مشترك أو الحلقة بيأثر على التعامل مع الأعطال.',
      'الـMesh: الأجهزة بينها وصلات متعددة، فبتوفّر مسارات بديلة مقابل عدد وصلات وتكلفة أكبر.',
      'ترتيبات تانية: الـTree أو الـHierarchical والـPoint-to-point أو الـHub-and-spoke بتناسب احتياجات LAN وWAN مختلفة.',
      'أمثلة الـLogical topology في صفحة 25: الإيثرنت مع الـ Hub فيزيائيًا نجمة لكن منطقيًا Bus، لأن الـ Hub بيبعت للجميع وكل جهاز بيفحص هل البيانات موجهة له؛ وToken Ring منطقيًا حلقة بيمر فيها token بالتتابع عبر الـ MSAU، ومالك الـ token بس هو اللي بيبعت — وده بيمنع الـcollisions.',
      'طوبولوجيات الـ WAN الفيزيائية في صفحة 24: نقطة لنقطة (خطوط مستأجرة بتتسعّر حسب الـbandwidth والمسافة ومش مشتركة)، الـ Hub-and-spoke (الـspokes متوصلة بالـ hub بس بدون اتصال مباشر بينهم)، والـ Full Mesh WAN (كل موقع متوصل بكل موقع وبيحتاج موارد أكتر).',
      'تقسيم الـ Router في صفحة 26: الـ Router بيقسّم الشبكة لـsubnetworks مختلفة بعناوين شبكات مختلفة؛ وكل جهاز طرفي لازم يحدد إزاي يسلّم البيانات محليًا أو عن بُعد.',
    ],
    'Physical arrangement and logical data flow are different views; name which one you are describing.',
    'ترتيب الأجهزة الفعلي وحركة البيانات المنطقية منظورين مختلفين؛ حدّد أنهي واحد بتوصفه.',
  ),
  section(
    '5. Unicast, Broadcast and Multicast', '5. الـUnicast والـBroadcast والـMulticast',
    'Transmission can target one specified destination, all devices on a local network, or a selected group. (Source: CCNA-1.pdf, p. 27.)',
    'الإرسال ممكن يتوجّه لوجهة محددة واحدة، أو لكل الأجهزة على الشبكة المحلية، أو لمجموعة مختارة. (المصدر: CCNA-1.pdf، ص 27.)',
    [
      'Unicast: One source sends a packet to one specified destination.',
      'Broadcast: One source sends a message to all devices on the LAN.',
      'Multicast: One source sends traffic to a group of interested clients.',
      'Transmission details (p. 27): unicast remains the predominant form on LANs and the Internet; broadcast is supported on most LANs (e.g. Ethernet) and some protocols use it to obtain missing information from the network; IP multicast provides dynamic many-to-many connectivity between a set of senders and a group of receivers.',
    ],
    [
      'الـUnicast: مصدر واحد بيبعت packet لوجهة واحدة محددة.',
      'الـBroadcast: مصدر واحد بيبعت رسالة لكل الأجهزة على الـLAN.',
      'الـMulticast: مصدر واحد بيبعت traffic لمجموعة من الـclients المهتمين.',
      'تفاصيل الإرسال في صفحة 27: الـ Unicast لسه الشكل الغالب على الشبكات المحلية والإنترنت؛ والـ Broadcast مدعوم في معظم الشبكات المحلية (زي الإيثرنت) وبعض البروتوكولات بتستخدمه للحصول على معلومات ناقصة من الشبكة؛ والـ IP multicast بيوفّر اتصال many-to-many ديناميكي بين مجموعة مرسلين ومجموعة مستقبلين.',
    ],
    'Count intended recipients: one is unicast, all local devices is broadcast, and a selected group is multicast.',
    'حدّد عدد المستقبِلين: وجهة واحدة Unicast، وكل أجهزة الشبكة المحلية Broadcast، ومجموعة مختارة Multicast.',
  ),
];

const lecture2Sections: SummarySection[] = [
  section(
    '1. The Seven-Layer OSI Model', '1. نموذج OSI المكوّن من سبع طبقات',
    'OSI is a seven-layer reference model for describing network communication. From lowest to highest, its layers are Physical, Data Link, Network, Transport, Session, Presentation, and Application. (Source: CCNA-2.pdf, pp. 2–9.)',
    'نموذج OSI مرجع من سبع طبقات لوصف الاتصال الشبكي. من الأقل للأعلى، طبقاته Physical وData Link وNetwork وTransport وSession وPresentation وApplication. (المصدر: CCNA-2.pdf، ص 2–9.)',
    [
      'Layers 1–2: Physical transmits bits; Data Link frames data for a local link and uses MAC addressing.',
      'Layer 3: Network uses logical addresses and routes packets between networks.',
      'Layer 4: Transport provides process-to-process delivery and uses port numbers; TCP and UDP are transport protocols.',
      'Layers 5–7: Session manages communication sessions, Presentation handles data representation, and Application provides network services to software.',
      'Data Link sublayers (p. 4): LLC identifies network protocols, performs error checking, and synchronizes frames; MAC uses MAC addresses to connect devices and defines permissions to transmit and receive data.',
      'Layer detail (p. 3): the Physical layer defines the connector, the electrical cable or wireless technology, and transmits the raw bits (a series of 0s and 1s) with bit rate control.',
      'Application protocols (p. 9): HTTP, FTP, POP, SMTP, and DNS are the lecture\'s application-layer protocol examples used by end-user software such as web browsers and email clients.',
      'Layer descriptions (p. 11): Transport segments, transfers, and reassembles data for individual communications; Network exchanges individual pieces of data over the network; Data Link describes methods for exchanging frames over common media; Physical activates, maintains, and de-activates physical connections.',
    ],
    [
      'الطبقتان 1–2: الـPhysical بتنقل bits؛ والـData Link بتجهّز frames للوصلة المحلية وبتستخدم عناوين MAC.',
      'الطبقة 3: الـNetwork بتستخدم عناوين منطقية وبتوجّه packets بين الشبكات.',
      'الطبقة 4: الـTransport بتوصل البيانات بين العمليات وبتستخدم أرقام ports؛ والـTCP والـUDP بروتوكولات نقل.',
      'الطبقات 5–7: الـSession بتدير الجلسات، والـPresentation بتتعامل مع تمثيل البيانات، والـApplication بتوفّر خدمات الشبكة للبرامج.',
      'طبقتا الـ Data Link في صفحة 4: الـ LLC بتعرّف بروتوكولات الشبكة وبتفحص الأخطاء وبتزامن الـ frames؛ والـ MAC بتستخدم عناوين MAC لتوصيل الأجهزة وبتحدد صلاحيات الإرسال والاستقبال.',
      'تفاصيل الطبقة الفيزيائية في صفحة 3: بتحدد الـconnector والكابل الكهربي أو تقنية اللاسلك، وبتنقل الـbits الخام (سلسلة من 0 و1) مع التحكم في معدل الـbit.',
      'بروتوكولات الـApplication في صفحة 9: الـ HTTP والـ FTP والـ POP والـ SMTP والـ DNS هي أمثلة بروتوكولات طبقة التطبيقات في المحاضرة، وبتستخدمها برامج زي المتصفحات وعملاء البريد.',
      'وصف الطبقات في صفحة 11: الـ Transport بتقسّم وتبعت وتعيد تجميع البيانات لكل اتصال؛ والـ Network بتبادل أجزاء البيانات عبر الشبكة؛ والـ Data Link بتوصف طرق تبادل الـ frames على الوسيط المشترك؛ والـ Physical بتفعّل وتحافظ وتفصل الوصلات الفيزيائية.',
    ],
    'Remember the layer order and match each function to the layer that performs it.',
    'احفظ ترتيب الطبقات واربط كل وظيفة بالطبقة اللي بتنفذها.',
  ),
  section(
    '2. OSI and TCP/IP Mapping', '2. الربط بين OSI وTCP/IP',
    'CCNA-2 Figure 2.12 uses a five-layer TCP/IP teaching model: Application, Transport, Network, Data Link, Physical. The common four-layer convention combines Data Link and Physical into Link/Network Access and calls Network the Internet layer. Both group OSI layers 5–7 into Application; the difference is how the lower functions are grouped and named. (Source: CCNA-2.pdf, p. 10.)',
    'الرسم 2.12 في CCNA-2 بيستخدم نموذج TCP/IP التعليمي بخمس طبقات: Application وTransport وNetwork وData Link وPhysical. النموذج الشائع بأربع طبقات بيجمع Data Link وPhysical في Link أو Network Access، وبيسمّي Network طبقة Internet. الاتنين بيجمعوا طبقات OSI من 5 لـ7 في Application؛ الفرق في تجميع الوظائف السفلية وتسميتها. (المصدر: CCNA-2.pdf، ص 10.)',
    [
      'Application: Combines OSI Application, Presentation, and Session functions.',
      'Transport: Corresponds to OSI Transport and supports end-to-end process communication.',
      'Internet: Corresponds to OSI Network and handles IP addressing and packet routing.',
      'Network Access: Covers local-link framing and physical transmission.',
      'Five-layer source mapping: Keep Data Link and Physical separate, matching OSI layers 2 and 1 respectively. The four-layer Network Access group covers both; neither convention removes their functions.',
      'Historical context (p. 16): The lecture attributes limited adoption of the OSI protocol suite to installed TCP/IP investment, layer-design issues, and implementation difficulties. Distinguish adoption of that suite from the continued use of OSI as a reference model.',
    ],
    [
      'الـApplication: بتجمع وظائف Application وPresentation وSession في OSI.',
      'الـTransport: بتقابل Transport في OSI وبتدعم الاتصال بين العمليات من طرف لطرف.',
      'الـInternet: بتقابل Network في OSI وبتتعامل مع عنونة IP وتوجيه packets.',
      'الـNetwork Access: بتغطي framing للوصلة المحلية والإرسال الفعلي.',
      'تقابل نموذج المصدر بخمس طبقات: خلّي Data Link وPhysical منفصلتين، مقابل طبقتَي OSI رقم 2 و1 بالترتيب. مجموعة Network Access في نموذج الأربع طبقات بتغطي الاتنين؛ ولا نموذج فيهم بيلغي وظائفهم.',
      'السياق التاريخي في صفحة 16: المحاضرة بتربط انتشار مجموعة بروتوكولات OSI المحدود بالاستثمار الموجود في TCP/IP، ومشاكل تصميم الطبقات والتنفيذ. فرّق بين انتشار مجموعة البروتوكولات واستمرار استخدام OSI كنموذج مرجعي.',
    ],
    'Use the slide’s five-layer names for its diagram; explain the four-layer convention by combining its bottom two layers. Application combines OSI layers 5–7 in both.',
    'استخدم أسماء الخمس طبقات مع رسم الشريحة؛ واشرح نموذج الأربع طبقات بضم الطبقتين السفليتين. الـ Application بتجمع طبقات OSI من 5 لـ7 في الاتنين.',
  ),
  section(
    '3. Encapsulation and Protocol Data Units', '3. الـEncapsulation ووحدات البيانات',
    'As data moves down a protocol stack, each layer adds the control information it needs. The receiving device processes the headers in reverse as it decapsulates the message. (Source: CCNA-2.pdf, pp. 12–15.)',
    'لما البيانات بتنزل في الـprotocol stack، كل طبقة بتضيف معلومات التحكم اللي محتاجاها. جهاز الاستقبال بيعالج الـheaders بالعكس وهو بيفك الـencapsulation. (المصدر: CCNA-2.pdf، ص 12–15.)',
    [
      'Transport: Application data becomes a TCP segment or UDP datagram.',
      'Network: The transport PDU is carried in an IP packet.',
      'Data Link and Physical: The packet is framed for the local link, then transmitted as bits.',
      'Receive path: The destination removes and interprets layer information in reverse order to recover the application data.',
      'End-to-end journey (pp. 13–15): the slides trace a message through seven steps — converted to binary, sent as signals by the NIC, passed among LAN devices, exits the local area through a router, transmitted to the interconnecting devices, passed among local devices at the destination, and converted back into human-readable form.',
    ],
    [
      'الـTransport: بيانات التطبيق بتبقى TCP segment أو UDP datagram.',
      'الـNetwork: الـPDU بتاعة النقل بتتحمل جوه IP packet.',
      'الـData Link والـPhysical: الـpacket بتتحط في frame مناسبة للوصلة المحلية، وبعدها بتتبعت كـbits.',
      'مسار الاستقبال: الجهاز المستقبل بيشيل ويفهم معلومات الطبقات بالترتيب العكسي عشان يوصل لبيانات التطبيق.',
      'الرحلة من طرف لطرف في صفحات 13–15: السلايدات بتتبع الرسالة على 7 خطوات — بيتحول لـbinary، وبيتبعت كإشارات من الـ NIC، وبيعدّي على أجهزة الـ LAN، وبيخرج من المنطقة المحلية عبر الـ router، وبيتنقل لأجهزة الربط بين الشبكات، وبيعدّي على الأجهزة المحلية عند الوجهة، وبيتحول تاني لصيغة مقروءة للإنسان.',
    ],
    'Encapsulation adds layer information on the way down; decapsulation removes it on the way up.',
    'الـEncapsulation بيضيف معلومات الطبقات وإحنا نازلين؛ والـDecapsulation بيشيلها وإحنا طالعين.',
  ),
  section(
    '4. IPv4 Addresses and Classes', '4. عناوين IPv4 وفئاتها',
    'IPv4 is a 32-bit address written as four 8-bit octets. Classful addressing groups addresses into Classes A–E; 127.0.0.0/8 is reserved for loopback. (Source: CCNA-2.pdf, pp. 17–25.)',
    'عنوان IPv4 طوله 32 bit وبيتكتب كأربع octets، كل واحدة 8 bits. الـClassful addressing بيقسّم العناوين لفئات من A لـE؛ والنطاق 127.0.0.0/8 محجوز للـloopback. (المصدر: CCNA-2.pdf، ص 17–25.)',
    [
      'Representation: Each octet is written in decimal and separated by dots, such as 192.168.10.15.',
      'Classful ranges: Class A begins at 0–127, B at 128–191, C at 192–223, D at 224–239, and E at 240–255 by first octet.',
      'Loopback: Addresses in 127.0.0.0/8 refer back to the local host rather than a remote network destination.',
      'Address scope: IPv4 addresses can be public or private; the address and mask together determine the local network portion.',
      'Classful defaults: A uses /8, B /16, and C /24; the class is not a substitute for reading the configured prefix.',
      'Binary conversion (pp. 23–24): binary uses 0s and 1s (bits); an IPv4 address is 32 bits divided into four 8-bit octets. To convert an octet, write its 8 bits under the positional values (128 down to 1) and sum the positions holding 1s.',
      'Address hierarchy (p. 25): the IPv4 address is composed of a network portion and a host portion; all devices on the same network must have the identical network portion (e.g. the 192.168.10.x devices share network 192.168.10.0).',
      'The Internet Protocol (p. 19): IP is the corner-stone of the TCP/IP architecture — all computers in the Internet understand it; its main tasks are the addressing of computers and the fragmentation of packets. The lecture names two IP versions: IPv4 (currently used) and IPv6 (the upcoming replacement with major improvements and new features).',
      'IPv4 address definition (p. 20): an IPv4 address is a 32-bit address that uniquely and universally defines the connection of a device (for example, a computer or a router) to the Internet; IP is connectionless, fragments packets where necessary, and makes a best effort to forward packets without guaranteeing delivery.',
      'Public vs private (p. 21): a public address is any valid address assigned to a user and registered for Internet use by organizations called Internet Service Providers (ISPs), and it must be unique; a private address is assigned to a device on a private TCP/IP LAN and is accessible only within that Local Area Network.',
    ],
    [
      'التمثيل: كل octet بتتكتب بالنظام العشري وبيفصل بينها نقط، زي 192.168.10.15.',
      'فئات العناوين: الفئة A أول octet فيها من 0 لـ127، وB من 128 لـ191، وC من 192 لـ223، وD من 224 لـ239، وE من 240 لـ255.',
      'الـLoopback: العناوين في 127.0.0.0/8 بترجع للجهاز المحلي بدل ما تمثل وجهة على شبكة بعيدة.',
      'نطاق العنوان: عناوين IPv4 ممكن تكون public أو private؛ والعنوان مع الـmask بيحددوا جزء الشبكة المحلية.',
      'الـDefault classful: الفئة A بتستخدم /8، وB بتستخدم /16، وC بتستخدم /24؛ بس الفئة مش بديل عن قراءة الـprefix المضبوط.',
      'التحويل الثنائي في صفحات 23–24: النظام الثنائي بيتكون من 0 و1 (bits)؛ وعنوان IPv4 طوله 32 bit مقسوم لأربع octets كل واحدة 8 bits. للتحويل، اكتب الـ 8 بتات بتاعة كل octet تحت القيم المكانية (من 128 لـ1) واجمع القيم اللي فوقها 1.',
      'التراتبية في صفحة 25: عنوان IPv4 متكوّن من جزء شبكة وجزء أجهزة؛ وكل الأجهزة على نفس الشبكة لازم يكون عندها نفس جزء الشبكة (زي أجهزة 192.168.10.x اللي بتشترك في الشبكة 192.168.10.0).',
      'بروتوكول الإنترنت في صفحة 19: الـ IP هو حجر الزاوية في معمارية TCP/IP — كل أجهزة الإنترنت بتفهمه؛ ومهامته الرئيسية عنونة الأجهزة وتجزئة الـ packets. والمحاضرة بتذكر نسختين: IPv4 (المستخدم حاليًا) وIPv6 (البديل القادم بتحسينات وميزات جديدة).',
      'تعريف عنوان IPv4 في صفحة 20: عنوان من 32 بت بيعرّف اتصال جهاز (كمبيوتر أو router) بالإنترنت بشكل فريد وعالمي؛ والـ IP بروتوكول connectionless بيجزئ الـ packets عند الضرورة وبيبذل best effort في التوجيه بدون ضمان التسليم.',
      'العام مقابل الخاص في صفحة 21: العنوان العام أي عنوان صالح متوزع لمستخدم وبيتسجل للاستخدام على الإنترنت عن طريق منظمات اسمها Internet Service Providers (ISPs)، ولازم يكون فريدًا؛ والعنوان الخاص بيتوزع لجهاز على شبكة محلية TCP/IP خاصة وبيكون متاح جوه الـ LAN دي فقط.',
    ],
    'IPv4 has 32 bits; recognize the first-octet class and do not treat 127/8 as ordinary Class A unicast.',
    'عنوان IPv4 طوله 32 bit؛ حدّد الفئة من أول octet وما تعتبرش 127/8 عنوان unicast عادي من Class A.',
  ),
  section(
    '5. Masks, Gateways and Basic Subnet Logic', '5. الـMasks والـGateway وأساسيات تقسيم الشبكة',
    'A subnet mask marks network bits with 1s and host bits with 0s. A host uses its IP address and mask to identify its network; traffic for another network is sent to the default gateway. IPv4 also supports packet fragmentation. (Source: CCNA-2.pdf, pp. 17–18, 25–31.)',
    'الـSubnet mask بتعلّم bits الشبكة بـ1 وbits الأجهزة بـ0. الجهاز بيستخدم عنوانه والـmask عشان يعرف الشبكة بتاعته؛ والـtraffic المتجه لشبكة تانية بيتبعت للـdefault gateway. وIPv4 بيدعم كمان تجزئة الـpackets. (المصدر: CCNA-2.pdf، ص 17–18 و25–31.)',
    [
      'Prefix and mask: A prefix counts network bits; `/24` is `255.255.255.0`.',
      'Network address: Bitwise AND of the IPv4 address and subnet mask gives the network address; all host bits are 0.',
      'Broadcast address: In a traditional subnet, setting all host bits to 1 gives the directed broadcast address.',
      'Default gateway: The router address a host uses to forward traffic beyond its local network; IPv4 delivery itself is best-effort.',
      'First and last hosts (p. 30): the first host address has all-0 host bits ending in a 1, and the last host address has all-1 host bits ending in a 0; the broadcast address sets all host bits to 1 (e.g. 10.1.1.255).',
      'Static assignment (p. 31): devices such as printers, servers, and network devices require a fixed (static) IPv4 address; hosts in a small network can also be configured with static addresses.',
    ],
    [
      'الـPrefix والـmask: الـPrefix بيعدّ bits الشبكة؛ والـ/24 بتساوي 255.255.255.0.',
      'عنوان الشبكة: عملية Bitwise AND بين عنوان IPv4 والـsubnet mask بتطلع عنوان الشبكة؛ وكل host bits فيه بتكون 0.',
      'عنوان الـBroadcast: في الـsubnet التقليدية، تحويل كل host bits لـ1 بيطلع عنوان الـdirected broadcast.',
      'الـDefault gateway: عنوان الـrouter اللي الجهاز بيستخدمه عشان يبعث traffic خارج شبكته المحلية؛ وتسليم IPv4 نفسه best-effort.',
      'أول وآخر host في صفحة 30: عنوان أول host بتات الـhost فيه كلها 0 ما عدا آخر bit (بيقوى 1)، وعنوان آخر host بتات الـhost كلها 1 ما عدا آخر bit (بيقوى 0)؛ وعنوان الـbroadcast بيتحول فيه كل host bits لـ1 (زي 10.1.1.255).',
      'العنونة الثابتة في صفحة 31: أجهزة زي الطابعات والسيرفرات وأجهزة الشبكة محتاجة عنوان IPv4 ثابت (static)؛ وأجهزة الشبكات الصغيرة كمان ممكن تتظبط بعناوين ثابتة.',
    ],
    'Compare the destination with the local network; use the default gateway for a destination outside it.',
    'قارن الوجهة بالشبكة المحلية؛ واستخدم الـdefault gateway لو الوجهة براها.',
  ),
];

const lecture3Sections: SummarySection[] = [
  section(
    '1. Why Subnet a Network?', '1. ليه بنقسّم الشبكة لـSubnets؟',
    'Subnetting divides one larger IP network into smaller logical networks. It can reduce overall network traffic and support different security policies or organizational boundaries. (Source: CCNA-3.pdf, pp. 2–6.)',
    'الـSubnetting بيقسّم شبكة IP كبيرة لشبكات منطقية أصغر. ده ممكن يقلل حركة الشبكة العامة ويدعم سياسات أمان أو حدود تنظيمية مختلفة. (المصدر: CCNA-3.pdf، ص 2–6.)',
    [
      'Smaller broadcast domains: Dividing a network can reduce the number of devices that receive local broadcasts.',
      'Organization: Subnets can represent locations, buildings, or device groups.',
      'Layer 3 communication: A Layer 3 device is needed to forward traffic between separate IP networks.',
      'University example (p. 3): a university may use separate subnets for the Engineering Faculty, the Computers Faculty, Administration, and servers instead of placing every device in one large network.',
      'Segmentation methods (p. 6): subnet by location (main campus, branch campus, separate buildings) or by device type (user computers, printers, servers, IoT devices).',
      'Security policy (p. 4): administrators can apply rules to control communication between subnets — student devices may be allowed to access the Internet but blocked from directly accessing administrative servers.',
      'Sizing scenario (p. 5): the deck\'s topology figure shows one router feeding four switched subnets whose host requirements are 28, 52, 15, and 5 hosts — sizing each subnet starts from such per-subnet host counts.',
    ],
    [
      'نطاقات Broadcast أصغر: تقسيم الشبكة ممكن يقلل عدد الأجهزة اللي بتستقبل الـbroadcast المحلي.',
      'التنظيم: الـsubnets ممكن تمثل مواقع أو مباني أو مجموعات أجهزة.',
      'اتصال Layer 3: جهاز من الطبقة الثالثة لازم يوجّه الـtraffic بين شبكات IP المنفصلة.',
      'مثال الجامعة في صفحة 3: الجامعة ممكن تستخدم subnets منفصلة لكلية الهندسة وكلية الحاسبات والإدارة والسيرفرات بدل ما تحط كل جهاز في شبكة واحدة كبيرة.',
      'طرق التقسيم في صفحة 6: تقسيم حسب الموقع (الحرم الرئيسي، حرم فرعي، مباني منفصلة) أو حسب نوع الجهاز (أجهزة المستخدمين، الطابعات، السيرفرات، أجهزة IoT).',
      'سياسة الأمان في صفحة 4: المسؤولين يقدروا يطبقوا قواعد للتحكم في الاتصال بين الـsubnets — أجهزة الطلاب ممكن يسمح لها بالوصول للإنترنت وتتمنع من الوصول المباشر لسيرفرات الإدارة.',
      'سيناريو تحديد الأحجام في صفحة 5: رسم الطوبولوجيا في الديك بيعرض راوتر واحد بيغذي أربع شبكات فرعية متوصلة بـswitches ومتطلبات الأجهزة فيها 28 و52 و15 و5 أجهزة — تحديد حجم كل subnet بيبدأ من أعداد الأجهزة دي.',
    ],
    'A subnet is a logical IP network; communication between different subnets needs Layer 3 forwarding.',
    'الـSubnet شبكة IP منطقية؛ والاتصال بين subnets مختلفة محتاج توجيه من Layer 3.',
  ),
  section(
    '2. Prefixes, Masks and Borrowed Bits', '2. الـPrefixes والـMasks والـBits المستعارة',
    'An IPv4 prefix identifies how many of the 32 address bits belong to the network. Subnetting borrows bits from the host portion, extending the prefix and leaving fewer host bits in each subnet. (Source: CCNA-3.pdf, pp. 7–8, 15–19.)',
    'الـIPv4 prefix بيحدد كام bit من أصل 32 تابعين للشبكة. الـSubnetting بيستلف bits من جزء الـhost، فبيطوّل الـprefix وبيسيب host bits أقل في كل subnet. (المصدر: CCNA-3.pdf، ص 7–8 و15–19.)',
    [
      'Subnet mask: Network bits are 1 and host bits are 0; the prefix is the count of leading 1s.',
      'Borrowed bits: Each bit moved from host to network increases the subnet count while reducing addresses per subnet.',
      'Equal-size subnets: Choose a prefix that provides at least the requested number of subnetworks.',
    ],
    [
      'الـSubnet mask: bits الشبكة قيمتها 1 وbits الـhost قيمتها 0؛ والـprefix هو عدد الـ1s المتتالية في البداية.',
      'الـBits المستعارة: كل bit بننقلها من الـhost للشبكة بتزوّد عدد الـsubnets وبتقلل العناوين في كل subnet.',
      'الـSubnets المتساوية: اختار prefix يوفّر عدد شبكات يساوي المطلوب أو أكتر.',
    ],
    'New prefix = original prefix + borrowed bits; remaining host bits = 32 − new prefix.',
    'الـPrefix الجديد = الـPrefix الأصلي + الـBits المستعارة؛ والـHost bits المتبقية = 32 − الـPrefix الجديد.',
  ),
  section(
    '3. Subnetting Formulas and a Repeatable Method', '3. معادلات الـSubnetting وخطوات ثابتة للحل',
    'Use the borrowed-bit count to find the number of equal-size subnets, then use the remaining host bits to calculate addresses per subnet. The changing mask octet determines the block size. (Source: CCNA-3.pdf, pp. 20–21.)',
    'استخدم عدد الـbits المستعارة عشان تحسب عدد الـsubnets المتساوية، وبعدها استخدم host bits المتبقية لحساب العناوين في كل subnet. والـoctet المتغيّر في الـmask بيحدد حجم الـblock. (المصدر: CCNA-3.pdf، ص 20–21.)',
    [
      'Subnets: `2ⁿ`, where `n` is the number of borrowed bits.',
      'Addresses per subnet: `2ʰ`, where `h = 32 − new prefix`; traditional usable hosts are `2ʰ − 2`.',
      'New prefix: Add borrowed bits to the original prefix; convert the resulting prefix to its dotted-decimal mask.',
      'Block size: In the changing octet, calculate `256 − mask value`; network addresses advance by that amount.',
    ],
    [
      'عدد الـSubnets: ‏`2ⁿ`، و`n` هو عدد الـbits المستعارة.',
      'العناوين في كل subnet: ‏`2ʰ`، حيث `h = 32 − الـprefix الجديد`؛ والـhosts القابلة للاستخدام بالطريقة التقليدية `2ʰ − 2`.',
    'الـPrefix الجديد: زوّد عدد الـbits المستعارة على الـprefix الأصلي، وبعدها حوّل الـprefix للـmask العشري.',
      'حجم الـBlock: في الـoctet المتغيّر احسب `256 − قيمة الـmask`؛ وعناوين الشبكة بتزيد بالمقدار ده.',
    ],
    'Keep borrowed bits and remaining host bits separate; the traditional usable-host formula excludes network and broadcast addresses.',
    'فرّق بين الـbits المستعارة والـhost bits المتبقية؛ ومعادلة الـhosts التقليدية بتستبعد عنواني الشبكة والـbroadcast.',
  ),
  section(
    '4. Octet-Boundary Subnetting', '4. تقسيم الشبكات عند حدود الـOctets',
    'The slides show subnetting a `10.0.0.0/8` network on octet boundaries: `/16` supports 256 subnets, while `/24` supports 65,536. The remaining host bits determine each subnet’s capacity. (Source: CCNA-3.pdf, pp. 11–14.)',
    'الشرائح بتعرض تقسيم شبكة `10.0.0.0/8` عند حدود الـoctets: الـ`/16` بتوفّر 256 subnet، والـ`/24` بتوفّر 65,536. والـhost bits المتبقية بتحدد سعة كل subnet. (المصدر: CCNA-3.pdf، ص 11–14.)',
    [
      'At least 250 subnets from `/8`: Borrow 8 bits to create `/16` networks of the form `10.x.0.0/16`; `2⁸ = 256` subnets.',
      'Each `/16` leaves 16 host bits: `2¹⁶ = 65,536` total addresses and 65,534 traditional usable hosts.',
      'At least 60,000 subnets from `/8`: Borrow 16 bits to create `/24`; `2¹⁶ = 65,536` subnets with 8 host bits.',
      'Each `/24` has `2⁸ − 2 = 254` traditional usable hosts; the first three octets identify the subnet.',
    ],
    [
      '250 subnet أو أكتر من `/8`: استلف 8 bits عشان تعمل شبكات `/16` بالشكل `10.x.0.0/16`؛ ‏`2⁸ = 256` subnet.',
      'كل `/16` بتسيب 16 host bits: ‏`2¹⁶ = 65,536` عنوان إجمالي و65,534 host قابل للاستخدام بالطريقة التقليدية.',
      '60,000 subnet أو أكتر من `/8`: استلف 16 bit عشان توصل لـ`/24`؛ ‏`2¹⁶ = 65,536` subnet مع 8 host bits.',
      'كل `/24` فيها `2⁸ − 2 = 254` host قابل للاستخدام بالطريقة التقليدية؛ وأول 3 octets بتحدد الـsubnet.',
    ],
    'Choose the smallest number of borrowed bits that meets the subnet requirement, then verify remaining host capacity.',
    'اختار أقل عدد bits مستعارة يحقق عدد الـsubnets المطلوب، وبعدها راجع سعة الـhosts المتبقية.',
  ),
  section(
    '5. Worked Example: Six Subnets from a /24', '5. مثال محلول: ست Subnets من /24',
    'To create at least six equal-size subnets from `192.168.1.0/24`, borrow three bits. The result is `/27`, with a mask of `255.255.255.224` and blocks of 32 addresses. (Source: CCNA-3.pdf, pp. 9–10.)',
    'عشان تعمل 6 subnets متساوية أو أكتر من `192.168.1.0/24`، استلف 3 bits. النتيجة `/27`، والـmask هي `255.255.255.224` والـblock حجمه 32 عنوان. (المصدر: CCNA-3.pdf، ص 9–10.)',
    [
      'Subnets: `2³ = 8`, which meets the requirement of at least 6.',
      'Hosts per subnet: 5 host bits remain, so `2⁵ − 2 = 30` traditional usable hosts.',
      'Network IDs advance by 32 in the fourth octet: `.0`, `.32`, `.64`, `.96`, `.128`, `.160`, `.192`, `.224`.',
      'For the first subnet, network is `.0`, usable hosts are `.1–.30`, and broadcast is `.31`.',
      '/25 example (p. 18): two equal subnets from `192.168.1.0/24` borrow 1 bit — mask `255.255.255.128`, 7 host bits, 126 traditional usable hosts, block size 128; the subnets are `192.168.1.0/25` (hosts `.1–.126`, broadcast `.127`) and `192.168.1.128/25` (hosts `.129–.254`, broadcast `.255`).',
      'Prefix table (p. 15): /25 (255.255.255.128) splits a /24 into 2 equal subnets, /26 into 4, /27 into 8, and /28 into 16.',
    ],
    [
      'عدد الـSubnets: ‏`2³ = 8`، وده بيحقق المطلوب اللي هو 6 أو أكتر.',
      'الـHosts في كل subnet: فاضل 5 host bits، يعني `2⁵ − 2 = 30` host قابل للاستخدام بالطريقة التقليدية.',
      'عناوين الشبكة بتزيد 32 في الـoctet الرابع: `.0` و`.32` و`.64` و`.96` و`.128` و`.160` و`.192` و`.224`.',
      'في أول subnet، عنوان الشبكة `.0`، والـhosts من `.1` لـ`.30`، والـbroadcast هو `.31`.',
      'مثال /25 في صفحة 18: تقسيم `192.168.1.0/24` لشبكتين متساويتين بيستلف 1 bit — القناع `255.255.255.128`، و7 host bits، و126 host قابل للاستخدام بالطريقة التقليدية، وحجم block رقمه 128؛ والـsubnets هي `192.168.1.0/25` (الـhosts من `.1` لـ`.126` والـbroadcast `.127`) و`192.168.1.128/25` (الـhosts من `.129` لـ`.254` والـbroadcast `.255`).',
      'جدول الـprefixes في صفحة 15: الـ/25 (255.255.255.128) بتقسّم الـ/24 لشبكتين متساويتين، والـ/26 لأربع، والـ/27 لثمن، والـ/28 لـ16.',
    ],
    'For /27, the block size is 32; the first network is .0 and its broadcast is .31.',
    'في /27 حجم الـblock هو 32؛ أول عنوان شبكة هو .0 والـbroadcast بتاعها .31.',
  ),
  section(
    '6. Worked Examples and Common Checks', '6. أمثلة محلولة ومراجعات مهمة',
    'The slides also show four subnets from a /24 and at least 100 subnets from a /16. Check the prefix, mask, block interval, and host count together. (Source: CCNA-3.pdf, pp. 22–29, 31.)',
    'الشرائح بتعرض كمان تقسيم /24 لأربع subnets، وعمل 100 subnet أو أكتر من /16. راجع الـprefix والـmask وفاصل الـblock وعدد الـhosts مع بعض. (المصدر: CCNA-3.pdf، ص 22–29 و31.)',
    [
      'Four subnets from `192.168.1.0/24`: borrow 2 bits for `/26`; each block is 64 addresses with 62 traditional usable hosts, starting at `.0`, `.64`, `.128`, and `.192`.',
      'At least 100 subnets from `172.16.0.0/16`: borrow 7 bits for `/23`; this creates 128 subnets with 510 traditional usable hosts each.',
      'A `/23` advances by 2 in the third octet: `172.16.0.0/23`, `172.16.2.0/23`, and so on.',
      'The `/23` mask is `255.255.254.0`. First subnet: network `172.16.0.0`, hosts `172.16.0.1–172.16.1.254`, broadcast `172.16.1.255`; the last subnet is `172.16.254.0/23`, with broadcast `172.16.255.255` (pp. 27–29).',
      'Check common errors: subtracting 2 from the subnet count, applying block size to the wrong octet, or counting network/broadcast as hosts.',
      'Complete mistake list (p. 31): confusing borrowed bits with remaining host bits, using 2ⁿ − 2 to calculate subnet counts, forgetting − 2 for usable hosts, adding the block size to the wrong octet, treating the broadcast address as usable, and expecting exactly 6 subnets when equal-size binary subnetting produces 8.',
      'Official practice (p. 32): the deck closes with seven worked practice questions covering borrowed bits, new prefixes, usable-host counts, block sizes, and the /26 network addresses inside a /24.',
    ],
    [
      'أربع subnets من `192.168.1.0/24`: استلف 2 bits عشان توصل لـ`/26`؛ كل block فيه 64 عنوان و62 host قابل للاستخدام بالطريقة التقليدية، وعناوين الشبكة تبدأ بـ`.0` و`.64` و`.128` و`.192`.',
      '100 subnet أو أكتر من `172.16.0.0/16`: استلف 7 bits عشان توصل لـ`/23`؛ وده بيعمل 128 subnet، في كل واحدة 510 hosts قابلة للاستخدام بالطريقة التقليدية.',
      'الـ`/23` بتزيد 2 في الـoctet الثالث: `172.16.0.0/23` وبعدها `172.16.2.0/23` وهكذا.',
      'الـ Mask بتاعة `/23` هي `255.255.254.0`. أول Subnet: الشبكة `172.16.0.0`، والـ Hosts من `172.16.0.1` لـ`172.16.1.254`، والـ Broadcast هو `172.16.1.255`؛ وآخر Subnet هي `172.16.254.0/23` والـ Broadcast بتاعها `172.16.255.255` (ص 27–29).',
      'راجع الأخطاء الشائعة: طرح 2 من عدد الـsubnets، أو تطبيق حجم الـblock على octet غلط، أو عدّ عنوان الشبكة والـbroadcast ضمن الـhosts.',
      'قائمة الأخطاء الكاملة في صفحة 31: الخلط بين الـbits المستعارة والـhost bits المتبقية، استخدام 2ⁿ − 2 لحساب عدد الـsubnets، نسيان طرح 2 من الـhosts، إضافة حجم الـblock للـoctet الغلط، اعتبار عنوان الـbroadcast صالحًا للاستخدام، وتوقع إنتاج 6 subnets بالظبط لما التقسيم الثنائي المتساوي بيطلع 8.',
      'التدريب الرسمي في صفحة 32: الديك بيقفل بسبع أسئلة تدريب محلولة بتغطي الـbits المستعارة والـprefixes الجديدة وعدد الـhosts وأحجام الـblock وعناوين /26 جوه /24.',
    ],
    'Meet or exceed the requested equal-size subnet count, then verify each network boundary and host range.',
    'حقّق عدد الـsubnets المتساوية المطلوب أو زوّده، وبعدها راجع حدود كل شبكة ومدى الـhosts.',
  ),
];

const lecture4Sections: SummarySection[] = [
  section(
    '1. Why IPv6? IPv4 Issues and Coexistence', '1. ليه IPv6؟ مشاكل IPv4 والتعايش',
    'IPv6 was created to solve the limitations of IPv4: it has a larger 128-bit address space with 340 undecillion (10^36) addresses and adds enhancements such as address auto-configuration. Both versions coexist through translation, tunneling, and dual stack. (Source: CCNA-4.pdf, pp. 3–4.)',
    'الـ IPv6 اتعمل عشان يحل محدوديات الـ IPv4: عنده مساحة عناوين أكبر طولها 128 بت بتوفر 340 undecillion (10^36) عنوان، وبيضيف تحسينات زي العنونة الذاتية. والنسختين بيتعايشوا مع بعض عن طريق الترجمة والأنفاق والـ Dual Stack. (المصدر: CCNA-4.pdf، ص 3–4.)',
    [
      'Why IPv6 is needed (p. 3): the rapidly increasing Internet population, the depletion of IPv4, issues with NAT, and the Internet of Things.',
      'Translation (p. 4): Network Address Translation 64 (NAT64) allows IPv6-enabled devices to communicate with IPv4 devices.',
      'Tunneling (p. 4): the IPv6 packet is encapsulated inside an IPv4 packet.',
      'Dual stack (p. 4): devices run both IPv4 and IPv6 protocol stacks simultaneously.',
    ],
    [
      'ليه محتاجين IPv6 في صفحة 3: الزيادة السريعة في مستخدمي الإنترنت، ونضوب عناوين IPv4، ومشاكل الـ NAT، وإنترنت الأشياء.',
      'الترجمة في صفحة 4: الـ NAT64 (ترجمة عناوين الشبكة 64) بتسمح لأجهزة IPv6 تتواصل مع أجهزة IPv4.',
      'الأنفاق في صفحة 4: حزمة IPv6 بتتغلف جوه حزمة IPv4.',
      'الـ Dual Stack في صفحة 4: الأجهزة بتشغل مكدسي IPv4 وIPv6 في نفس الوقت.',
    ],
    'IPv6 solves IPv4 exhaustion with a 128-bit space; during migration, NAT64, tunneling, and dual stack keep the two versions interoperating.',
    'الـ IPv6 بيحل نضوب الـ IPv4 بمساحة 128 بت؛ وأثناء الانتقال، الـ NAT64 والأنفاق والـ Dual Stack بيخليوا النسختين يشتغلوا مع بعض.',
  ),
  section(
    '2. IPv6 Representation and Compression Rules', '2. تمثيل IPv6 وقواعد الضغط',
    'IPv6 addresses are 128 bits long, written as eight 16-bit hextets in hexadecimal. Two rules compress the preferred format without changing the address. (Source: CCNA-4.pdf, pp. 5–8.)',
    'عناوين IPv6 طولها 128 بت وبتتكتب كـ 8 hextets (كل واحد 16 بت) بالنظام الست عشري. وقاعدتين بيضغطوا الصيغة المفضلة من غير ما يغيروا العنوان. (المصدر: CCNA-4.pdf، ص 5–8.)',
    [
      'Representation (p. 5): every 4 bits is represented by a single hexadecimal digit; a hextet is the unofficial term for a segment of 16 bits or four hexadecimal values. Preferred examples include 2001:0DB8:0000:1111:0000:0000:0000:0200 and FE80:0000:0000:0000:0123:4567:89AB:CDEF.',
      'Rule 1 — omit leading 0s (p. 6): leading zeros inside any hextet are dropped, so 0DB8 becomes DB8 and 0000 becomes 0.',
      'Rule 2 — omit all-0 segments (p. 7): a double colon (::) can replace any single, contiguous string of one or more all-0 hextets, and it is used only once per address.',
      'Worked examples (p. 8): 2041:0000:140F:0000:0000:0000:875B:131B compresses to 2041:0:140F::875B:131B; fd00:2600:0000:0002:0000:0000:0000:0000 to fd00:2600:0:2::; and fd00:8203:0:ac00::4000:0 expands to fd00:8203:0000:ac00:0000:0000:4000:0000.',
    ],
    [
      'التمثيل في صفحة 5: كل 4 بت بيمثلها رقم ست عشري واحد؛ والـ hextet مصطلح غير رسمي لجزء من 16 بت أو أربع قيم ست عشرية. من أمثلة الصيغة المفضلة: ‏2001:0DB8:0000:1111:0000:0000:0000:0200 وFE80:0000:0000:0000:0123:4567:89AB:CDEF.',
      'القاعدة 1 — حذف الأصفار البادئة في صفحة 6: الأصفار البادئة جوه أي hextet بتتحذف، فـ 0DB8 بتقوى DB8 والـ 0000 بيقوى 0.',
      'القاعدة 2 — حذف مقاطع الأصفار في صفحة 7: النقطتين (::) بتقدر تستبدل أي مجموعة واحدة متتالية من hextet أو أكتر كلها أصفار، وبتُستخدم مرة واحدة فقط في العنوان.',
      'أمثلة محلولة في صفحة 8: ‏2041:0000:140F:0000:0000:0000:875B:131B بتتضغط لـ ‏2041:0:140F::875B:131B؛ وfd00:2600:0000:0002:0000:0000:0000:0000 لـ ‏fd00:2600:0:2::؛ وfd00:8203:0:ac00::4000:0 بتتوسع لـ ‏fd00:8203:0000:ac00:0000:0000:4000:0000.',
    ],
    'Compress leading 0s first, then replace one contiguous all-0 run with ::; expansion writes every hextet as four hex digits.',
    'اضغط الأصفار البادئة الأول، وبعدها استبدل مجموعة أصفار متتالية واحدة بـ ::؛ والتوسيع بيكتب كل hextet بأربع خانات ست عشرية.',
    ['ipv6-compress'],
  ),
  section(
    '3. IPv6 Address Types: Unicast, Multicast, Anycast', '3. أنواع عناوين IPv6: ‏Unicast وMulticast وAnycast',
    'IPv6 defines three address types. The lecture\'s diagram contrasts one-copy-per-destination unicast, group-only multicast delivery, and same-address anycast resolved to the closest destination. (Source: CCNA-4.pdf, pp. 9–12.)',
    'الـ IPv6 بيعرّف تلات أنواع للعناوين. ورسم المحاضرة بيقارن الـ unicast (نسخة لكل وجهة) بالـ multicast (تسليم لأعضاء المجموعة فقط) بالـ anycast (نفس العنوان على أجهزة كتير والتسليم لأقرب وجهة). (المصدر: CCNA-4.pdf، ص 9–12.)',
    [
      'Unicast (p. 9): a single source IPv6 address sending to one specified destination.',
      'Multicast (p. 9): one IPv6 packet sent to multiple destinations — the diagram shows only multicast-group members (C and D) receiving while B, outside the group, receives nothing.',
      'Anycast (p. 11): any IPv6 unicast address assigned to multiple devices sharing the same IP; the network selects the closest device according to routing, distributes traffic among routers, and keeps the service available if one router fails.',
      'Anycast key idea (p. 11): Anycast = One to the Nearest (One of Many); data is automatically delivered to the easiest device to reach.',
      'Prefix length (p. 12): ranges from 0 to 128; the typical LAN prefix is /64 — first 64 bits network, the other 64 the interface ID (example: 2001:DB8:A::/64 splits into prefix 2001:0DB8:000A:0000 and interface ID 0000:0000:0000:0000).',
    ],
    [
      'الـ Unicast في صفحة 9: عنوان IPv6 لمصدر واحد بيبعت لوجهة واحدة محددة.',
      'الـ Multicast في صفحة 9: حزمة IPv6 واحدة بتتبعت لوجهات متعددة — الرسم بيعرض أعضاء المجموعة بس (C وD) بيستلموا، بينما B اللي بره المجموعة ما بيستلمش.',
      'الـ Anycast في صفحة 11: أي عنوان IPv6 unicast ممكن يتوزع على أجهزة متعددة شاركة نفس الـ IP؛ والشبكة بتختار أقرب جهاز حسب التوجيه، وبتوزع الحمل على الراوترات، وبتحافظ على توفر الخدمة لو راوتر وقع.',
      'الفكرة المفتاحية للـ Anycast في صفحة 11: ‏Anycast = واحد لأقرب جهاز (من مجموعة كتير)؛ والبيانات بتتسلم تلقائيًا لأسهل جهاز للوصول.',
      'طول الـ Prefix في صفحة 12: بيمتد من 0 لـ 128؛ والمعتاد للـ LAN هو /64 — أول 64 بت للشبكة والـ 64 الباقية للـ interface ID (مثال: ‏2001:DB8:A::/64 بتتقسم لـ prefix هو 2001:0DB8:000A:0000 وinterface ID هو 0000:0000:0000:0000).',
    ],
    'Count receivers: one destination = unicast, group members = multicast, nearest of many same-address devices = anycast.',
    'عدّ المستقبلين: وجهة واحدة = unicast، أعضاء مجموعة = multicast، وأقرب جهاز من مجموعة بنفس العنوان = anycast.',
  ),
  section(
    '4. The IPv6 Unicast Family and Special Addresses', '4. عائلة عناوين Unicast والعناوين الخاصة',
    'IPv6 unicast addresses include several families with special-purpose members such as loopback and the unspecified address. (Source: CCNA-4.pdf, pp. 13–17.)',
    'عناوين الـ unicast في IPv6 بتشمل عدة عائلات ومنها أعضاء لأغراض خاصة زي الـ loopback والعنوان غير المحدد. (المصدر: CCNA-4.pdf، ص 13–17.)',
    [
      'Global unicast (p. 14): globally unique, Internet-routable addresses.',
      'Link-local (pp. 14, 17): used to communicate with other devices on the same local link only, confined to a single link; in the FE80::/10 range; created even if the device has not been assigned a global unicast address; typically the router\'s link-local address is the default gateway.',
      'Loopback (p. 15): all 0s except the last bit, written ::1/128 — used by a host to send a packet to itself (ping it to test local TCP/IP configuration) and cannot be assigned to a physical interface.',
      'Unspecified (p. 15): the all-0s address ::/128 — cannot be assigned to an interface and is only used as a source address when the device has no permanent IPv6 address yet or the source is irrelevant.',
      'Unique local (p. 16): similar to IPv4 private addresses, used within a site or a limited number of sites, in the range FC00::/7 to FDFF::/7.',
      'IPv4 embedded (p. 16): the IPv4-compatible address ::w.x.y.z, used to help transition from IPv4 to IPv6.',
    ],
    [
      'الـ Global unicast في صفحة 14: عناوين فريدة عالميًا وقابلة للتوجيه على الإنترنت.',
      'الـ Link-local في صفحتي 14 و17: بيُستخدم للتواصل مع الأجهزة الأخرى على نفس الوصلة المحلية فقط، ومحصور في وصلة واحدة؛ ونطاقه FE80::/10؛ وبيتعمل حتى لو الجهاز مالوش عنوان global unicast؛ وعادةً عنوان الـ link-local بتاع الراوتر هو الـ default gateway.',
      'الـ Loopback في صفحة 15: كل بتاته أصفار ما عدا الأخيرة، وبيتكتب ::1/128 — بيستخدمه الجهاز يبعث حزمة لنفسها (اعمل له ping لاختبار إعدادات TCP/IP المحلية) ومش بيتوزع لواجهة فيزيائية.',
      'غير المحدد في صفحة 15: عنوان الأصفار الكاملة ::/128 — مش بيتوزع لواجهة وبيُستخدم كمصدر فقط لما الجهاز مالوش عنوان IPv6 دائم بعد أو المصدر مش مهم.',
      'الـ Unique local في صفحة 16: شبه العناوين الخاصة في IPv4، وبيُستخدم جوه موقع أو عدد محدود من المواقع، ونطاقه FC00::/7 لـ FDFF::/7.',
      'الـ IPv4 المدمج في صفحة 16: العنوان المتوافق مع IPv4 بصيغة ::w.x.y.z، وبيُستخدم للمساعدة في الانتقال من IPv4 لـ IPv6.',
    ],
    'Know each unicast family and its range: global (routable), link-local FE80::/10, unique local FC00::/7-FDFF::/7, plus ::1 and :: specials.',
    'اعرف كل عائلة unicast ونطاقها: global (قابلة للتوجيه)، وlink-local ‏FE80::/10، وunique local ‏FC00::/7 لـ FDFF::/7، بالإضافة للحالتين الخاصتين ::1 و::.',
  ),
  section(
    '5. Global Unicast Structure, Registries and EUI-64', '5. تركيبة الـ Global Unicast والسجلات والـ EUI-64',
    'A global unicast address splits into a provider-assigned routing prefix, an organizational subnet ID, and a 64-bit interface ID that can be built with EUI-64. (Source: CCNA-4.pdf, pp. 18–21, 26–27.)',
    'عنوان الـ global unicast بيتقسم لـ prefix توجيه متوزع من المزود، وsubnet ID للمنظمة، وinterface ID بطول 64 بت ممكن يتبني بـ EUI-64. (المصدر: CCNA-4.pdf، ص 18–21 و26–27.)',
    [
      'Three parts (p. 18): global routing prefix — assigned by the provider, typically /48 (Country); subnet ID — 16 bits used to subnet within an organization (Street); interface ID — 64 bits, equivalent to the IPv4 host portion (Home). Only addresses with the first three bits 001 (2000::/3, first hextet 2000-3FFF) are currently assigned; example 2001:0DB8:ACAD:1::10/64 expands to 2001:0DB8:ACAD:0001 + interface ID 0000:0000:0000:0010.',
      'Registry structure (pp. 19-20): the first 3 bits are the IANA global routing number; bits 16-24 identify the regional registry (AfriNIC, APNIC, LACNIC, RIPE NCC, ARIN); the remaining 8 bits up to /32 identify the ISP; the 3rd hextet is the site/customer identifier and the 4th hextet is the subnet ID — allowing 65,536 subnets with 18 quintillion addresses each. Registry examples: 2001:0000::/23 IANA, 2001:0200::/23 APNIC, 2001:0400::/23 ARIN, 2001:0600::/23 RIPE.',
      'Interface ID (p. 21): the remaining 64 bits, configured manually or dynamically via EUI-64; an interface may hold more than one IPv6 address; there are no broadcast addresses — multicast is used instead.',
      'EUI-64 process (p. 26): split the 48-bit MAC into the 24-bit OUI and 24-bit device identifier, insert the 16-bit value FFFE in the middle, then flip the 7th bit (the U/L bit). Worked example: FC-99-47-75-CE-E0 → FC-99-47-FF-FE-75-CE-E0 → FE-99-47-FF-FE-75-CE-E0, i.e. interface ID FE99:47FF:FE75:CEE0.',
      'Random generation (p. 27): under SLAAC the client may instead generate a random 64-bit Interface ID — Windows uses this method.',
    ],
    [
      'الأجزاء التلاتة في صفحة 18: الـ global routing prefix — متوزع من المزود، عادةً /48 (‏Country)؛ والـ subnet ID — ‏16 بت للتقسيم جوه المنظمة (‏Street)؛ والـ interface ID — ‏64 بت مكافئ لجزء الأجهزة في IPv4 (‏Home). حاليًا العناوين الموزعة هي اللي أول تلات بتات فيها 001 (نطاق 2000::/3 وأول hextet من 2000 لـ 3FFF)؛ ومثال ‏2001:0DB8:ACAD:1::10/64 بتتوسع لـ 2001:0DB8:ACAD:0001 مع interface ID هو 0000:0000:0000:0010.',
      'تركيبة السجلات في صفحتي 19 و20: أول 3 بتات هي رقم التوجيه العالمي بتاع IANA؛ والبتات من 16 لـ 24 بتحدد السجل الإقليمي (AfriNIC وAPNIC وLACNIC وRIPE NCC وARIN)؛ والـ 8 بتات الباقية لحد /32 بتحدد الـ ISP؛ والـ hextet التالت هو معرّف الموقع/العميل والرابع هو الـ subnet ID — بيسمح بـ 65,536 subnet وكل واحدة 18 كوينتيليون عنوان. أمثلة السجلات: ‏2001:0000::/23 لـ IANA، و2001:0200::/23 لـ APNIC، و2001:0400::/23 لـ ARIN، و2001:0600::/23 لـ RIPE.',
      'الـ Interface ID في صفحة 21: الـ 64 بت الباقية، بتتظبط يدويًا أو ديناميكيًا بـ EUI-64؛ والواجهة ممكن تحمل أكثر من عنوان IPv6؛ ومفيش عناوين broadcast — الـ multicast بيُستخدم بدلها.',
      'عملية EUI-64 في صفحة 26: قسّم الـ MAC بتاع 48 بت إلى OUI (24 بت) ومعرّف جهاز (24 بت)، وأدرج القيمة FFFE (16 بت) في النص، وبعدها اقلب البتة السابعة (بتة الـ U/L). مثال محلول: ‏FC-99-47-75-CE-E0 تقوى ‏FC-99-47-FF-FE-75-CE-E0 وبعدها ‏FE-99-47-FF-FE-75-CE-E0، يعني interface ID هو ‏FE99:47FF:FE75:CEE0.',
      'التوليد العشوائي في صفحة 27: تحت الـ SLAAC العميل ممكن بدل كده يولّد Interface ID عشوائي بطول 64 بت — وWindows بيستخدم الطريقة دي.',
    ],
    'Remember the /48 + /16 + /64 split and the EUI-64 recipe: split, insert FFFE, flip the U/L bit.',
    'افتكر التقسيم ‏/48 + /16 + /64 ووصفة الـ EUI-64: قسّم، أدرج FFFE، اقلب بتة الـ U/L.',
    ['eui-64-lab', 'ipv6-structure-3d'],
  ),
  section(
    '6. Address Configuration and Verification', '6. ضبط العناوين والتحقق منها',
    'IPv6 addresses are configured statically or dynamically (SLAAC or DHCPv6), and verified with the same commands as IPv4 using IPv6 addresses. (Source: CCNA-4.pdf, pp. 22–30.)',
    'عناوين IPv6 بتتظبط ثابتًا أو ديناميكيًا (‏SLAAC أو DHCPv6)، وبتتأكد بنفس أوامر الـ IPv4 لكن بعناوين IPv6. (المصدر: CCNA-4.pdf، ص 22–30.)',
    [
      'Router static configuration (p. 22): similar commands to IPv4 — the interface command is `ipv6 address ipv6-address/prefix-length`.',
      'Host configuration (p. 23): manual setup is similar to IPv4; the default gateway can match the link-local (FE80) or the global unicast address (e.g. 2001:db8:acad:1::1) of the Gigabit Ethernet interface.',
      'Dynamic assignment (pp. 23-25): SLAAC obtains the prefix, prefix length, default gateway, and other information from an IPv6 router via ICMPv6 Router Advertisement messages, sent every 200 seconds. RA option 1 (default): SLAAC only. Option 2: SLAAC plus stateless DHCPv6 for other information such as DNS. Option 3: stateful DHCPv6 — the gateway comes from the router link-local address and DHCPv6 supplies all other information.',
      'Link-local addresses (pp. 28-29): established dynamically (Cisco IOS uses EUI-64 for all IPv6 interfaces) or manually; the drawback of the dynamic link-local is its long interface ID, so they are often configured statically for simple, easy-to-remember addresses.',
      'Verification (p. 30): `show ipv6 interface brief` and `show ipv6 route`; the ping command is identical to IPv4 except an IPv6 address is used.',
    ],
    [
      'الضبط الثابت على الراوتر في صفحة 22: أوامر شبيهة بالـ IPv4 — أمر الواجهة هو `ipv6 address ipv6-address/prefix-length`.',
      'ضبط الجهاز في صفحة 23: الإعداد اليدوي شبيه بالـ IPv4؛ والـ default gateway ممكن يطابق عنوان الـ link-local (‏FE80) أو عنوان الـ global unicast (زي 2001:db8:acad:1::1) لواجهة الـ Gigabit Ethernet.',
      'العنونة الديناميكية في صفحات 23-25: الـ SLAAC بيخلي الجهاز ياخد الـ prefix وطوله والـ default gateway ومعلومات تانية من راوتر IPv6 عبر رسائل ICMPv6 Router Advertisement اللي بتبعت كل 200 ثانية. الخيار 1 (الافتراضي): SLAAC فقط. الخيار 2: SLAAC مع DHCPv6 عديم الحالة لمعلومات تانية زي الـ DNS. الخيار 3: stateful DHCPv6 — الـ gateway بيجي من عنوان الـ link-local بتاع الراوتر والـ DHCPv6 بيدي كل المعلومات التانية.',
      'عناوين الـ link-local في صفحتي 28 و29: بتتأسس ديناميكيًا (راوترات Cisco IOS بتستخدم EUI-64 لكل واجهات IPv6) أو يدويًا؛ وعيب الـ link-local الديناميكي هو طول الـ interface ID، فلذلك غالبًا بتتظبط ثابت لعناوين بسيطة سهلة الحفظ.',
      'التحقق في صفحة 30: الأمرين `show ipv6 interface brief` و`show ipv6 route`؛ وأمر ping متطابق مع الـ IPv4 إلا إنه بيُستخدم بعنوان IPv6.',
    ],
    'Configure statically with ipv6 address, or let RA (SLAAC/DHCPv6) do it; verify with show ipv6 interface brief.',
    'ظبّط ثابت بأمر ipv6 address، أو سيب الـ RA (‏SLAAC/DHCPv6) يشتغل؛ وتأكد بأمر show ipv6 interface brief.',
  ),
  section(
    '7. IPv6 Multicast: Assigned and Solicited-Node', '7. الـ Multicast في IPv6: المعيّن والـ Solicited-Node',
    'IPv6 replaces broadcast with multicast. Two families exist: assigned multicast groups and the solicited-node multicast used by Neighbor Discovery. (Source: CCNA-4.pdf, pp. 31–34.)',
    'الـ IPv6 بيستبدل الـ broadcast بالـ multicast. وفيه فئتين: مجموعات multicast المعيّنة، والـ solicited-node multicast اللي بيستخدمه بروتوكول اكتشاف الجيران. (المصدر: CCNA-4.pdf، ص 31–34.)',
    [
      'Two categories (p. 32): assigned multicast — reserved addresses for predefined groups of devices — and solicited-node multicast.',
      'Assigned groups (p. 32): FF02::1 is the all-nodes group that all IPv6-enabled devices join (similar to a broadcast in IPv4); FF02::2 is the all-routers group that all IPv6 routers join.',
      'Solicited-node purpose (p. 33): mapped to a special Ethernet multicast address so the NIC can filter frames on the destination MAC; used in the Neighbor Discovery Protocol to obtain the layer-2 link-layer addresses of other nodes.',
      'Solicited-node construction (p. 33): created automatically when a global unicast or link-local unicast address is assigned, by combining the special FF02::1:FF/104 prefix with the right-most 24 bits of that unicast address (format FF02:0:0:0:0:1:FFxx:xxxx).',
    ],
    [
      'الفئتان في صفحة 32: الـ assigned multicast — عناوين محجوزة لمجموعات أجهزة معرفة مسبقًا — والـ solicited-node multicast.',
      'المجموعات المعينة في صفحة 32: ‏FF02::1 هي مجموعة كل الأجهزة وكل جهاز IPv6 بينضم ليها (شبيهة بالـ broadcast في IPv4)؛ وFF02::2 هي مجموعة كل الراوترات وكل راوترات IPv6 بتنضم ليها.',
      'غرض الـ solicited-node في صفحة 33: مربوط بعنوان Ethernet multicast خاص عشان كارت الشبكة يفلتر الإطارات على حسب الـ MAC للوجهة؛ وبيُستخدم في بروتوكول اكتشاف الجيران (NDP) للحصول على عناوين الطبقة الثانية للأجهزة الأخرى.',
      'تكوين الـ solicited-node في صفحة 33: بيتعمل تلقائيًا عند توزيع عنوان global unicast أو link-local، بدمج البادئة الخاصة FF02::1:FF/104 مع أقصى 24 بت يمينًا من ذلك العنوان (بالصيغة FF02:0:0:0:0:1:FFxx:xxxx).',
    ],
    'No broadcast in IPv6: FF02::1 reaches all nodes, FF02::2 reaches all routers, and solicited-node targets exactly one neighbor.',
    'مفيش broadcast في IPv6: الـ FF02::1 بيوصل لكل الأجهزة، والـ FF02::2 لكل الراوترات، والـ solicited-node بيستهدف جار واحد بالظبط.',
  ),
];

const lecture1: Lecture = {
  ...existingLectures[0],
  title: 'Network Components, Media & Topologies',
  titleAr: 'مكوّنات الشبكة ووسائطها والـTopologies',
  brief: 'Understand network endpoints and intermediary devices, transmission media, network classifications, topologies, and unicast/broadcast/multicast delivery.',
  briefAr: 'افهم الأجهزة الطرفية والوسيطة ووسائط النقل وتصنيفات الشبكات والـtopologies وأنواع الإرسال Unicast وBroadcast وMulticast.',
  durationMinutes: 35,
  sections: lecture1Sections,
  terms: [
    { term: 'End device', termAr: 'جهاز طرفي', definition: 'A device that originates or receives network messages.', definitionAr: 'جهاز بيبدأ رسائل الشبكة أو بيستقبلها.' },
    { term: 'Intermediary device', termAr: 'جهاز وسيط', definition: 'A device that connects endpoints and forwards or manages network traffic.', definitionAr: 'جهاز بيوصل الأجهزة الطرفية وبيوجّه أو بينظّم حركة الشبكة.' },
    { term: 'Bandwidth', termAr: 'سعة النقل', definition: 'The maximum data-transfer rate a network connection can support.', definitionAr: 'أقصى معدل نقل بيانات اتصال الشبكة يقدر يدعمه.' },
    { term: 'Throughput', termAr: 'معدل النقل الفعلي', definition: 'The actual measured data-transfer rate at a particular time.', definitionAr: 'معدل نقل البيانات الفعلي اللي بيتقاس في وقت معيّن.' },
    { term: 'Physical topology', termAr: 'الـPhysical topology', definition: 'The physical arrangement of network devices and links.', definitionAr: 'الترتيب الفعلي لأجهزة الشبكة ووصلاتها.' },
    { term: 'Logical topology', termAr: 'الـLogical topology', definition: 'The way data moves through a network.', definitionAr: 'الطريقة اللي البيانات بتتحرك بيها جوه الشبكة.' },
  ],
  cheatSheet: [
    { en: 'Bandwidth = maximum capacity; throughput = measured rate.', ar: 'الـBandwidth = أقصى سعة؛ والـThroughput = المعدل المقاس.' },
    { en: 'PAN < LAN < MAN < WAN by geographic scope.', ar: 'النطاق الجغرافي بيكبر بالترتيب: PAN ثم LAN ثم MAN ثم WAN.' },
    { en: 'Physical topology = arrangement; logical topology = data flow.', ar: 'الـPhysical topology = ترتيب الأجهزة؛ والـLogical topology = حركة البيانات.' },
    { en: 'Unicast: one destination; broadcast: all LAN devices; multicast: selected group.', ar: 'Unicast: وجهة واحدة؛ Broadcast: كل أجهزة الـLAN؛ Multicast: مجموعة مختارة.' },
  ],
  interactiveTools: ['network-devices', 'network-3d', 'topology-simulator', 'transmission-lab', 'network-media'],
  questions: lecture1Questions,
};

const lecture2: Lecture = {
  ...existingLectures[1],
  title: 'OSI & TCP/IP Models and IPv4 Foundations',
  titleAr: 'نماذج OSI وTCP/IP وأساسيات IPv4',
  brief: 'Trace how network models organize communication, follow encapsulation, and identify IPv4 address, mask, network, broadcast, and gateway fundamentals.',
  briefAr: 'تابع إزاي نماذج الشبكات بتنظّم الاتصال، وافهم الـencapsulation وأساسيات عنوان IPv4 والـmask والشبكة والـbroadcast والـgateway.',
  durationMinutes: 40,
  sections: lecture2Sections,
  terms: [
    { term: 'Encapsulation', termAr: 'الـEncapsulation', definition: 'Adding protocol information as data moves down the network stack.', definitionAr: 'إضافة معلومات البروتوكولات وإحنا نازلين في طبقات الشبكة.' },
    { term: 'Protocol data unit', termAr: 'وحدة بيانات البروتوكول', definition: 'The name for data as handled at a particular protocol layer.', definitionAr: 'اسم البيانات وهي بتتعامل معاها طبقة بروتوكول معيّنة.' },
    { term: 'IPv4 address', termAr: 'عنوان IPv4', definition: 'A 32-bit logical address represented as four decimal octets.', definitionAr: 'عنوان منطقي طوله 32 bit وبيتمثّل في أربع octets عشرية.' },
    { term: 'Subnet mask', termAr: 'الـSubnet mask', definition: 'A bit mask that separates the network portion from the host portion.', definitionAr: 'قناع bits بيفصل جزء الشبكة عن جزء الجهاز.' },
    { term: 'Default gateway', termAr: 'الـDefault gateway', definition: 'The router address a host uses to reach destinations outside its local network.', definitionAr: 'عنوان الـrouter اللي الجهاز بيستخدمه للوصول لوجهات خارج شبكته المحلية.' },
  ],
  cheatSheet: [
    { en: 'OSI PDUs: Transport = segment/datagram; Network = packet; Data Link = frame; Physical = bits.', ar: 'وحدات OSI: Transport = segment/datagram؛ Network = packet؛ Data Link = frame؛ Physical = bits.' },
    { en: 'IPv4 = 32 bits in four octets; `/24` = `255.255.255.0`.', ar: 'IPv4 = 32 bit في أربع octets؛ والـ`/24` = `255.255.255.0`.' },
    { en: 'IP address AND subnet mask = network address.', ar: 'عنوان IP AND الـsubnet mask = عنوان الشبكة.' },
    { en: '127.0.0.0/8 is loopback; a default gateway forwards off-network traffic.', ar: 'النطاق 127.0.0.0/8 للـloopback؛ والـdefault gateway بيوجّه traffic خارج الشبكة.' },
  ],
  interactiveTools: ['packet-journey', 'osi-visualizer'],
  questions: lecture2Questions,
};

const lecture3: Lecture = {
  id: 'net-lec-3',
  courseId: 'networks',
  lectureNumber: 3,
  title: 'IPv4 Subnetting: Prefixes, Calculations & Worked Examples',
  titleAr: 'تقسيم IPv4 إلى Subnets: Prefixes وحسابات وأمثلة محلولة',
  brief: 'Learn why networks are subnetted, borrow host bits correctly, calculate subnet and host counts, and solve the CCNA /27, /26, and /23 examples.',
  briefAr: 'افهم ليه بنقسّم الشبكات، واستلف host bits صح، واحسب أعداد الـsubnets والـhosts، وحل أمثلة CCNA للـ/27 والـ/26 والـ/23.',
  durationMinutes: 35,
  sections: lecture3Sections,
  terms: [
    { term: 'Prefix length', termAr: 'طول الـPrefix', definition: 'The number of leading network bits in an IPv4 address.', definitionAr: 'عدد bits الشبكة المتتالية في بداية عنوان IPv4.' },
    { term: 'Borrowed bits', termAr: 'الـBits المستعارة', definition: 'Host bits reassigned to the network portion to create subnets.', definitionAr: 'Bits من جزء الـhost بننقلها لجزء الشبكة عشان نكوّن subnets.' },
    { term: 'Block size', termAr: 'حجم الـBlock', definition: 'The interval between consecutive subnet network addresses in the changing octet.', definitionAr: 'الفاصل بين عناوين الشبكة المتتالية في الـoctet اللي بيتغيّر.' },
    { term: 'Broadcast address', termAr: 'عنوان الـBroadcast', definition: 'The address with all host bits set to 1 in a traditional subnet.', definitionAr: 'العنوان اللي كل host bits فيه قيمتها 1 في الـsubnet التقليدية.' },
  ],
  cheatSheet: [
    { en: 'Subnets = 2^(borrowed bits); addresses/subnet = 2^(remaining host bits).', ar: 'عدد الـsubnets = 2^(الـbits المستعارة)؛ والعناوين في كل subnet = 2^(الـhost bits المتبقية).' },
    { en: 'Traditional usable hosts = 2^(host bits) − 2.', ar: 'عدد الـhosts القابلة للاستخدام بالطريقة التقليدية = 2^(host bits) − 2.' },
    { en: 'Block size = 256 − mask value in the changing octet.', ar: 'حجم الـblock = 256 − قيمة الـmask في الـoctet المتغيّر.' },
    { en: '/24 split into 6+: borrow 3 → /27, 8 subnets, 30 hosts each.', ar: 'تقسيم /24 لـ6 أو أكتر: استلف 3 → /27، وعدد 8 subnets و30 host في كل واحدة.' },
    { en: '/16 split into 100+: borrow 7 → /23, 128 subnets, 510 hosts each.', ar: 'تقسيم /16 لـ100 أو أكتر: استلف 7 → /23، وعدد 128 subnet و510 hosts في كل واحدة.' },
    { en: '/8 to /16 = 256 subnets; /8 to /24 = 65,536 subnets.', ar: 'من /8 لـ/16 = 256 subnet؛ ومن /8 لـ/24 = 65,536 subnet.' },
  ],
  interactiveTools: ['subnet-calculator'],
  questions: lecture3Questions,
};

const lecture4: Lecture = {
  id: 'net-lec-4',
  courseId: 'networks',
  lectureNumber: 4,
  title: 'IPv6 Addressing: Representation, Types & Configuration',
  titleAr: 'عنونة IPv6: التمثيل والأنواع والضبط',
  brief: 'Understand why IPv6 replaced scarce IPv4 space, master the compression rules, distinguish unicast/multicast/anycast, and configure global, link-local, EUI-64, SLAAC, and multicast addresses.',
  briefAr: 'افهم ليه IPv6 جاي يحل ندرة عناوين IPv4، واتقن قواعد الضغط، وفرّق بين Unicast وMulticast وAnycast، واضبط عناوين Global وLink-Local وEUI-64 وSLAAC والـ Multicast.',
  durationMinutes: 40,
  sections: lecture4Sections,
  terms: [
    { term: 'Hextet', termAr: 'الـ Hextet', definition: 'The unofficial term for a 16-bit segment of an IPv6 address, written as four hexadecimal values.', definitionAr: 'مصطلح غير رسمي لجزء من 16 بت في عنوان IPv6، وبيتكتب بأربع قيم ست عشرية.' },
    { term: 'Global unicast address', termAr: 'عنوان Global Unicast', definition: 'A globally unique, Internet-routable IPv6 address with a provider prefix, subnet ID, and interface ID.', definitionAr: 'عنوان IPv6 فريد عالميًا وقابل للتوجيه على الإنترنت، مكوّن من prefix المزود وsubnet ID وinterface ID.' },
    { term: 'Link-local address', termAr: 'عنوان Link-Local', definition: 'An FE80::/10 address used for communication on the same local link only.', definitionAr: 'عنوان من نطاق FE80::/10 بيُستخدم للاتصال على نفس الوصلة المحلية فقط.' },
    { term: 'Anycast', termAr: 'الـ Anycast', definition: 'An IPv6 unicast address assigned to multiple devices, where delivery goes to the nearest one according to routing.', definitionAr: 'عنوان IPv6 unicast بيتوزع على أجهزة متعددة، والتسليم بيروح لأقربها حسب التوجيه.' },
    { term: 'SLAAC', termAr: 'الـ SLAAC', definition: 'Stateless Address Auto-Configuration: devices obtain prefix, prefix length, and gateway from router ICMPv6 RA messages.', definitionAr: 'العنونة الذاتية عديمة الحالة: الجهاز بياخد الـ prefix وطوله والـ gateway من رسائل ICMPv6 RA بتاعة الراوتر.' },
    { term: 'Solicited-node multicast', termAr: 'الـ Solicited-Node Multicast', definition: 'An FF02::1:FF/104-based multicast address built from the last 24 bits of a unicast address, used by Neighbor Discovery.', definitionAr: 'عنوان multicast مبني على FF02::1:FF/104 من آخر 24 بت في عنوان الـ unicast، وبيستخدمه بروتوكول اكتشاف الجيران.' },
  ],
  cheatSheet: [
    { en: 'IPv6 = 128 bits, eight 16-bit hextets; /64 splits network and interface ID.', ar: 'الـ IPv6 = 128 بت في 8 hextets كل واحد 16 بت؛ والـ /64 بيقسم الشبكة من الـ interface ID.' },
    { en: 'Rule 1: drop leading 0s. Rule 2: one :: replaces a single contiguous all-0 run.', ar: 'القاعدة 1: احذف الأصفار البادئة. القاعدة 2: نقطتين :: واحدة تستبدل مجموعة أصفار متتالية واحدة.' },
    { en: 'Global unicast = /48 provider prefix + 16-bit subnet ID + 64-bit interface ID.', ar: 'الـ Global unicast = ‏/48 من المزود + ‏16 بت subnet ID + ‏64 بت interface ID.' },
    { en: 'EUI-64: split MAC, insert FFFE, flip the U/L bit (FC... becomes FE...).', ar: 'الـ EUI-64: قسّم الـ MAC، أدرج FFFE، اقلب بتة الـ U/L (‏FC بتقوى FE).' },
    { en: 'Link-local FE80::/10; unique local FC00::/7-FDFF::/7; loopback ::1; unspecified ::.', ar: 'الـ Link-local ‏FE80::/10؛ والـ unique local ‏FC00::/7 لـ FDFF::/7؛ والـ loopback ::1؛ وغير المحدد ::.' },
    { en: 'FF02::1 = all nodes (like IPv4 broadcast); FF02::2 = all routers; SLAAC RA every 200 seconds.', ar: '‏FF02::1 = كل الأجهزة (زي broadcast في IPv4)؛ وFF02::2 = كل الراوترات؛ ورسائل SLAAC RA كل 200 ثانية.' },
  ],
  interactiveTools: ['ipv6-compress', 'eui-64-lab', 'ipv6-structure-3d'],
  questions: lecture4Questions,
};

export const NETWORK_LECTURES: Lecture[] = [lecture1, lecture2, lecture3, lecture4];

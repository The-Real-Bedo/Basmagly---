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
): SummarySection => ({
  title,
  titleAr,
  content,
  contentAr,
  bulletPoints,
  bulletPointsAr,
  keyRule,
  keyRuleAr,
});

const subnetQuestions: Question[] = [
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
];

const lecture1Sections: SummarySection[] = [
  section(
    '1. Network Components and Endpoints', '1. مكوّنات الشبكة والأجهزة الطرفية',
    'A network connects two or more computers so they can share resources. End devices originate or receive messages; intermediary devices connect them and move traffic across the network. (Source: CCNA-1.pdf, pp. 3–11.)',
    'الشبكة بتوصل جهازين كمبيوتر أو أكتر عشان يشاركوا الموارد. الـEnd devices بتبدأ الرسائل أو تستقبلها، والـIntermediary devices بتوصل الأجهزة ببعض وبتنقل الـtraffic جوه الشبكة. (المصدر: CCNA-1.pdf، ص 3–11.)',
    [
      'End device: A PC, phone, server, or printer is a message source or destination and uses addresses to identify communication endpoints.',
      'Intermediary device: Switches, routers, and access points connect endpoints and forward or manage traffic; their functions differ by device and layer.',
      'Identifiers: MAC addresses identify network interfaces on a local link, IP addresses identify network-layer endpoints, and port numbers identify application processes.',
    ],
    [
      'الـEnd device: زي الكمبيوتر أو الموبايل أو السيرفر أو الطابعة؛ بيكون مصدر الرسالة أو وجهتها، وبيستخدم عناوين لتحديد طرفَي الاتصال.',
      'الـIntermediary device: زي الـSwitch والـRouter والـAccess Point؛ بيوصل الأجهزة الطرفية وبيوجّه أو بينظّم الـtraffic، ووظيفة كل جهاز وطبقته مختلفة.',
      'المعرّفات: عنوان الـMAC بيعرّف واجهة الشبكة على الوصلة المحلية، وعنوان الـIP بيعرّف الطرف على طبقة الشبكة، ورقم الـport بيعرّف التطبيق أو العملية.',
    ],
    'A message travels from an end device, through any required intermediary devices and media, to another end device.',
    'الرسالة بتتحرك من End device، وبتعدّي على أجهزة وسيطة ووسائط حسب المسار، لحد End device تاني.',
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
    ],
    [
      'الـCopper: بينقل إشارات كهربائية وبيُستخدم كتير في الوصلات السلكية.',
      'الـFiber: بينقل الضوء وبيناسب الوصلات اللي محتاجة معدل بيانات عالي أو مسافة أطول.',
      'الـWireless: بينقل إشارات لاسلكية؛ والبيئة والمسافة بيأثروا على الوصلة.',
      'اختيار الوسيط: راعي المسافة والبيئة ومعدل البيانات المطلوب والتكلفة وإنت بتختار وسيط النقل.',
      'الأداء المقاس: الـThroughput بيتأثر بالمستخدمين والأجهزة والوسيط وظروف الشبكة، فعشان كده ما بيعدّيش الـBandwidth.',
    ],
    'Bandwidth is the capacity limit; throughput is the rate actually achieved.',
    'الـBandwidth هو حدّ السعة، والـThroughput هو المعدل اللي اتحقق فعليًا.',
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
    ],
    [
      'الـPAN والـLAN: شبكة الـPAN بتخدم شخص وأجهزته القريبة؛ والـLAN بتوصل أجهزة في نطاق محلي محدود.',
      'الـMAN والـWAN: شبكة الـMAN بتغطي نطاق مدينة؛ والـWAN بتغطي مساحة جغرافية أكبر وبتوصل شبكات ببعض.',
      'الـPeer-to-peer: الأجهزة بتشارك الموارد مباشرة، وده مناسب للشبكات الأصغر اللي إدارتها موزّعة.',
      'الـClient/server: سيرفرات مخصصة بتقدّم خدمات وإدارة وتحكّم مركزي في الوصول للـclients.',
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
    ],
    [
      'الـStar: كل جهاز طرفي بيتصل بجهاز مركزي؛ وتعطّل الجهاز المركزي أو الوصلة ممكن يعزل الاتصالات المتأثرة.',
      'الـBus والـRing: الـBus بتشارك كابل رئيسي؛ والـRing بتوصل الأجهزة في حلقة. اعتمادهم على مسار مشترك أو الحلقة بيأثر على التعامل مع الأعطال.',
      'الـMesh: الأجهزة بينها وصلات متعددة، فبتوفّر مسارات بديلة مقابل عدد وصلات وتكلفة أكبر.',
      'ترتيبات تانية: الـTree أو الـHierarchical والـPoint-to-point أو الـHub-and-spoke بتناسب احتياجات LAN وWAN مختلفة.',
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
    ],
    [
      'الـUnicast: مصدر واحد بيبعت packet لوجهة واحدة محددة.',
      'الـBroadcast: مصدر واحد بيبعت رسالة لكل الأجهزة على الـLAN.',
      'الـMulticast: مصدر واحد بيبعت traffic لمجموعة من الـclients المهتمين.',
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
    ],
    [
      'الطبقتان 1–2: الـPhysical بتنقل bits؛ والـData Link بتجهّز frames للوصلة المحلية وبتستخدم عناوين MAC.',
      'الطبقة 3: الـNetwork بتستخدم عناوين منطقية وبتوجّه packets بين الشبكات.',
      'الطبقة 4: الـTransport بتوصل البيانات بين العمليات وبتستخدم أرقام ports؛ والـTCP والـUDP بروتوكولات نقل.',
      'الطبقات 5–7: الـSession بتدير الجلسات، والـPresentation بتتعامل مع تمثيل البيانات، والـApplication بتوفّر خدمات الشبكة للبرامج.',
    ],
    'Remember the layer order and match each function to the layer that performs it.',
    'احفظ ترتيب الطبقات واربط كل وظيفة بالطبقة اللي بتنفذها.',
  ),
  section(
    '2. OSI and TCP/IP Mapping', '2. الربط بين OSI وTCP/IP',
    'The TCP/IP model groups networking functions into fewer layers. Its Application layer covers OSI layers 5–7, Transport maps to layer 4, Internet to layer 3, and Network Access to layers 1–2. (Source: CCNA-2.pdf, pp. 10–11, 16.)',
    'نموذج TCP/IP بيجمع وظائف الشبكات في طبقات أقل. طبقة Application بتغطي طبقات OSI من 5 لـ7، وTransport بتقابل الطبقة 4، وInternet الطبقة 3، وNetwork Access الطبقتين 1 و2. (المصدر: CCNA-2.pdf، ص 10–11 و16.)',
    [
      'Application: Combines OSI Application, Presentation, and Session functions.',
      'Transport: Corresponds to OSI Transport and supports end-to-end process communication.',
      'Internet: Corresponds to OSI Network and handles IP addressing and packet routing.',
      'Network Access: Covers local-link framing and physical transmission.',
    ],
    [
      'الـApplication: بتجمع وظائف Application وPresentation وSession في OSI.',
      'الـTransport: بتقابل Transport في OSI وبتدعم الاتصال بين العمليات من طرف لطرف.',
      'الـInternet: بتقابل Network في OSI وبتتعامل مع عنونة IP وتوجيه packets.',
      'الـNetwork Access: بتغطي framing للوصلة المحلية والإرسال الفعلي.',
    ],
    'Map functions, not just layer names: TCP/IP Application combines three OSI layers.',
    'اربط الوظائف مش أسماء الطبقات بس: Application في TCP/IP بتجمع 3 طبقات من OSI.',
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
    ],
    [
      'الـTransport: بيانات التطبيق بتبقى TCP segment أو UDP datagram.',
      'الـNetwork: الـPDU بتاعة النقل بتتحمل جوه IP packet.',
      'الـData Link والـPhysical: الـpacket بتتحط في frame مناسبة للوصلة المحلية، وبعدها بتتبعت كـbits.',
      'مسار الاستقبال: الجهاز المستقبل بيشيل ويفهم معلومات الطبقات بالترتيب العكسي عشان يوصل لبيانات التطبيق.',
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
    ],
    [
      'التمثيل: كل octet بتتكتب بالنظام العشري وبيفصل بينها نقط، زي 192.168.10.15.',
      'فئات العناوين: الفئة A أول octet فيها من 0 لـ127، وB من 128 لـ191، وC من 192 لـ223، وD من 224 لـ239، وE من 240 لـ255.',
      'الـLoopback: العناوين في 127.0.0.0/8 بترجع للجهاز المحلي بدل ما تمثل وجهة على شبكة بعيدة.',
      'نطاق العنوان: عناوين IPv4 ممكن تكون public أو private؛ والعنوان مع الـmask بيحددوا جزء الشبكة المحلية.',
      'الـDefault classful: الفئة A بتستخدم /8، وB بتستخدم /16، وC بتستخدم /24؛ بس الفئة مش بديل عن قراءة الـprefix المضبوط.',
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
    ],
    [
      'الـPrefix والـmask: الـPrefix بيعدّ bits الشبكة؛ والـ/24 بتساوي 255.255.255.0.',
      'عنوان الشبكة: عملية Bitwise AND بين عنوان IPv4 والـsubnet mask بتطلع عنوان الشبكة؛ وكل host bits فيه بتكون 0.',
      'عنوان الـBroadcast: في الـsubnet التقليدية، تحويل كل host bits لـ1 بيطلع عنوان الـdirected broadcast.',
      'الـDefault gateway: عنوان الـrouter اللي الجهاز بيستخدمه عشان يبعث traffic خارج شبكته المحلية؛ وتسليم IPv4 نفسه best-effort.',
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
    ],
    [
      'نطاقات Broadcast أصغر: تقسيم الشبكة ممكن يقلل عدد الأجهزة اللي بتستقبل الـbroadcast المحلي.',
      'التنظيم: الـsubnets ممكن تمثل مواقع أو مباني أو مجموعات أجهزة.',
      'اتصال Layer 3: جهاز من الطبقة الثالثة لازم يوجّه الـtraffic بين شبكات IP المنفصلة.',
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
    ],
    [
      'عدد الـSubnets: ‏`2³ = 8`، وده بيحقق المطلوب اللي هو 6 أو أكتر.',
      'الـHosts في كل subnet: فاضل 5 host bits، يعني `2⁵ − 2 = 30` host قابل للاستخدام بالطريقة التقليدية.',
      'عناوين الشبكة بتزيد 32 في الـoctet الرابع: `.0` و`.32` و`.64` و`.96` و`.128` و`.160` و`.192` و`.224`.',
      'في أول subnet، عنوان الشبكة `.0`، والـhosts من `.1` لـ`.30`، والـbroadcast هو `.31`.',
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
      'Check common errors: subtracting 2 from the subnet count, applying block size to the wrong octet, or counting network/broadcast as hosts.',
    ],
    [
      'أربع subnets من `192.168.1.0/24`: استلف 2 bits عشان توصل لـ`/26`؛ كل block فيه 64 عنوان و62 host قابل للاستخدام بالطريقة التقليدية، وعناوين الشبكة تبدأ بـ`.0` و`.64` و`.128` و`.192`.',
      '100 subnet أو أكتر من `172.16.0.0/16`: استلف 7 bits عشان توصل لـ`/23`؛ وده بيعمل 128 subnet، في كل واحدة 510 hosts قابلة للاستخدام بالطريقة التقليدية.',
      'الـ`/23` بتزيد 2 في الـoctet الثالث: `172.16.0.0/23` وبعدها `172.16.2.0/23` وهكذا.',
      'راجع الأخطاء الشائعة: طرح 2 من عدد الـsubnets، أو تطبيق حجم الـblock على octet غلط، أو عدّ عنوان الشبكة والـbroadcast ضمن الـhosts.',
    ],
    'Meet or exceed the requested equal-size subnet count, then verify each network boundary and host range.',
    'حقّق عدد الـsubnets المتساوية المطلوب أو زوّده، وبعدها راجع حدود كل شبكة ومدى الـhosts.',
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
  interactiveTools: ['network-devices', 'topology-simulator', 'transmission-lab'],
  questions: copyQuestions(existingLectures[0]),
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
  questions: copyQuestions(existingLectures[1]),
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
  questions: subnetQuestions,
};

export const NETWORK_LECTURES: Lecture[] = [lecture1, lecture2, lecture3];

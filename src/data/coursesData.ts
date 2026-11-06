import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'networks',
    code: 'CS311',
    title: 'Computer Networks',
    titleAr: 'شبكات الحاسب المتقدمة',
    instructor: 'Cisco Networking Curriculum',
    description: 'Comprehensive coverage of network architecture, OSI 7-layer & TCP/IP reference models, hardware components, topologies, transmission modes, and IPv4 addressing & subnetting.',
    descriptionAr: 'تغطية شاملة لكل أساسيات الشبكات، طبقات OSI السبع ومقارنتها بـ TCP/IP، أنواع الأجهزة والكابلات، وحسابات الـ Subnetting وعناوين الـ IPv4.',
    term: 1,
    icon: 'Network',
    isAvailable: true,
    lectures: [
      {
        id: 'net-lec-1',
        courseId: 'networks',
        lectureNumber: 1,
        title: 'Network Components, Classifications & Topologies',
        titleAr: 'مكونات الشبكات وتصنيفاتها وطوبولوجيا التوصيل',
        brief: 'Analysis of hardware & software components, end vs intermediary devices, network scales (PAN to WAN), P2P vs Client/Server, physical topologies, and transmission modes.',
        briefAr: 'المكونات المادية والبرمجية، الفرق بين أجهزة المستخدم والأجهزة الوسيطة، أنواع الشبكات جغرافياً وإدارياً، وطرق التوصيل والإرسال.',
        durationMinutes: 35,
        interactiveTools: ['network-devices', 'topology-simulator', 'transmission-lab'],
        cheatSheet: [
          {
            en: 'Network definition: Two or more connected computers sharing data, hardware, and services.',
            ar: 'الشبكة ببساطة: جهازين كمبيوتر أو أكتر متوصلين ببعض عشان يشاركوا ملفات أو برنتر أو نت.'
          },
          {
            en: 'End Devices possess 3 addressing layers: Physical MAC (48-bit hex), Logical IP (32-bit dotted decimal), and Port number (Application layer decimal).',
            ar: 'أي جهاز طرفي ليه 3 عناوين: الماك الفيزيائي (48 بت ست عشري)، الآي بي المنطقي (32 بت عشري)، ورقم المنفذ Port بتاع البرنامج.'
          },
          {
            en: 'Intermediary Devices: Hub broadcasts at Layer 1; Switch selectively forwards by MAC table at Layer 2; Router interconnects subnets via IP routing at Layer 3.',
            ar: 'الأجهزة الوسيطة: الهب أعمى بيبعت للكل (Layer 1)، السويتش ذكي بيبعت بالماك (Layer 2)، والراوتر بيربط شبكات مختلفة بالـ IP (Layer 3).'
          },
          {
            en: 'Bandwidth is maximum theoretical capacity; Throughput is actual measured bandwidth at a specific timeframe under real network load.',
            ar: 'الباندويث: أقصى سرعة السلك يقدر يشيلها نظرياً؛ إنما الـ Throughput: السرعة الفعلية اللي واصلالك دلوقتي في اللحظة دي.'
          },
          {
            en: 'Geographic Scale: PAN (~10m) < LAN (single facility/office) < MAN (metropolitan city) < WAN (cross-country/global Internet).',
            ar: 'المساحة الجغرافية: شبكة شخصية PAN (حوالي 10 متر) ➔ شبكة محلية LAN (مبنى/شركة) ➔ شبكة مدينة MAN ➔ شبكة عالمية WAN زي النت.'
          },
          {
            en: 'Topologies: Star is predominant (central hub/switch failure is single point of failure); Mesh provides maximum fault tolerance with redundant links.',
            ar: 'طرق التوصيل: الـ Star هي الأشهر في العالم (عيبها لو السويتش وقع الكل يقع)؛ والـ Mesh أعلى أمان عشان فيها كابلات بديلة كتير.'
          },
          {
            en: 'Transmission Types: Unicast (1-to-1), Broadcast (1-to-All in LAN), Multicast (1-to-Group subscribed hosts).',
            ar: 'طرق الإرسال: Unicast (رسالة لواحد بس)، Broadcast (نداء للكل في اللان)، Multicast (رسالة لأعضاء جروب محدد).'
          }
        ],
        terms: [
          {
            term: 'End-User Device',
            termAr: 'الجهاز الطرفي (جهازك انت)',
            definition: 'Originating source or final destination of data messages across the network (e.g., PC, laptop, server, IP phone).',
            definitionAr: 'الجهاز اللي انت قاعد عليه وبيبدأ يبعت أو يستقبل الرسائل زي اللاب توب والموبايل والسيرفر.'
          },
          {
            term: 'Intermediary Device',
            termAr: 'الجهاز الوسيط (اللي في السكة)',
            definition: 'Equipment connecting end devices, regenerating signals, and enforcing routing/switching policies (e.g., Switch, Router, Firewall).',
            definitionAr: 'الأجهزة اللي في النص وظيفتها توصل الأجهزة ببعض وتزق الإشارة وتوجه الداتا زي السويتش والراوتر.'
          },
          {
            term: 'MAC Address',
            termAr: 'عنوان الماك الفيزيائي (كارت اللان)',
            definition: 'Permanent 48-bit (6-octet) hexadecimal physical address burned into the Network Interface Card (NIC).',
            definitionAr: 'رقم بطاقة كارت الشبكة؛ 48 بت بالنظام الست عشري بيتصنع مع الكارت ومبيتغيرش.'
          },
          {
            term: 'Bandwidth vs Throughput',
            termAr: 'الباندويث مقابل السرعة الفعلية',
            definition: 'Bandwidth is theoretical channel limit; Throughput is actual successfully transferred bits per second.',
            definitionAr: 'الباندويث هو اليافطة اللي على الباقة، والـ Throughput هو اللي بيوصلك فعلاً على جهازك.'
          }
        ],
        sections: [
          {
            title: '1. Network Fundamentals & Device Classifications',
            titleAr: '1. أساسيات الشبكات وتصنيف الأجهزة الطرفية والوسيطة',
            content: 'A computer network consists of two or more interconnected computing systems exchanging resources. The architecture divides hardware into End Devices (sources and destinations) and Intermediary Devices (traffic directors).',
            contentAr: 'الشبكة ببساطة جهازين أو أكتر متوصلين عشان يشاركوا داتا أو طابعة أو نت. بنقسم الأجهزة لنوعين رئيسيين: أجهزة طرفية (End Devices) دي اللي بيقعد عليها اليوزر، وأجهزة وسيطة (Intermediary Devices) دي اللي بتدير الحركة في السكة.',
            bulletPoints: [
              'End Devices: PCs, Laptops, Servers, and Printers. Every host uses MAC (Layer 2), IP (Layer 3), and Port (Layer 4).',
              'Hub: Layer 1 multiport repeater that blindly broadcasts incoming signals to all ports except the sender.',
              'Switch: Layer 2 intelligent bridge maintaining a MAC Address Table for selective unicast forwarding.',
              'Router: Layer 3 gateway directing IP packets across disparate LAN and WAN environments.'
            ],
            bulletPointsAr: [
              'الأجهزة الطرفية: الكمبيوتر والموبايل والسيرفر؛ كل جهاز لازم يكون ليه MAC و IP ورقم Port.',
              'الـ Hub: جهاز غبي في الطبقة الأولى؛ أي إشارة توصله يكررها ويبعتها لكل الفتحات عمياني عدا اللي باعت.',
              'الـ Switch: جهاز ذكي في الطبقة التانية؛ بيحفظ عناوين الماك ويبعت الحزمة للجهاز المطلوب بس.',
              'الـ Router: موجه الطبقة التالتة؛ بيبص على الـ IP ويربط شبكات مختلفة ببعضها ويختار أسرع طريق.'
            ],
            keyRule: 'Switches filter traffic using Layer 2 MAC addresses, whereas Routers forward packets using Layer 3 IP addresses.',
            keyRuleAr: 'السويتش شغال بماك (MAC) في الطبقة التانية، والراوتر شغال بآي بي (IP) في الطبقة التالتة.'
          },
          {
            title: '2. Geographical Scale & Management Models',
            titleAr: '2. تصنيف الشبكات بالمساحة الجغرافية ونظام الإدارة',
            content: 'Networks are categorized by geographical footprint (PAN, LAN, MAN, WAN) and organizational management (Peer-to-Peer vs Client/Server).',
            contentAr: 'بنقسم الشبكات حسب المساحة اللي بتغطيها وحسب نظام الإدارة هل في سيرفر مركزي ولا الكل متساوي.',
            bulletPoints: [
              'PAN: Personal Area Network within personal perimeter (~10 meters / Bluetooth).',
              'LAN: Local Area Network serving an office, lab, or campus building with high throughput.',
              'MAN: Metropolitan Area Network interconnecting multiple LANs across a municipality.',
              'WAN: Wide Area Network spanning states or continents; the public Internet is the ultimate WAN.',
              'Peer-to-Peer (P2P): Decentralized, low cost, suitable for <=10 users; lacks centralized security.',
              'Client/Server: Centralized server administrates access, files, and authentication; single point of server failure.'
            ],
            bulletPointsAr: [
              'PAN: شبكة شخصية في حدود 10 أمتار زي توصيل الموبايل بسماعة البلوتوث.',
              'LAN: شبكة محلية جوة شركة أو معمل في الكلية وسريعة جداً.',
              'MAN: شبكة مدينة بتربط فروع شركة متفرقة في القاهرة مثلاً.',
              'WAN: شبكة واسعة بتربط دول وقارات والإنترنت هو أكبر مثال ليها.',
              'P2P (الند للند): مفيش سيرفر والكل متساوي؛ رخيصة وتنفع لـ 10 أجهزة أو أقل بس أمانها ضعيف.',
              'Client/Server (خادم وعميل): سيرفر مركزي هو اللي ماسك الصلاحيات والأمان؛ بس لو السيرفر وقع الكل يقف.'
            ]
          },
          {
            title: '3. Physical Topologies & Transmission Modes',
            titleAr: '3. طرق التوصيل الفيزيائي (Topologies) وأنماط البث',
            content: 'Physical topology defines cable and node layouts. Logical topology dictates signal propagation. Transmission modes define target addressing.',
            contentAr: 'الطوبولوجيا الفيزيائية شكل الأسلاك ع الحقيقة، والمنطقية مسار الإشارة جوة السلك. وأنماط الإرسال بتحدد انت باعت لمين.',
            bulletPoints: [
              'Star Topology: All endpoints link to a central switch/hub. Simple troubleshooting, but hub failure halts the network.',
              'Bus Topology: Shared single backbone cable with terminators. Inexpensive, but any cable cut collapses transmission.',
              'Ring Topology: Sequential token circulation prevents collisions. Host failure breaks token flow.',
              'Mesh Topology: Full or partial interconnections provide maximum redundancy and alternate routing.',
              'Unicast (1-to-1) vs Broadcast (1-to-All) vs Multicast (1-to-Group).'
            ],
            bulletPointsAr: [
              'Star (النجمة): كل جهاز طالع منه كابل لسويتش مركزي في النص؛ سهلة التوصيل بس لو السويتش باظ الشبكة تقع.',
              'Bus (الخطي): كابل رئيسي واحد والكل متعلق فيه؛ رخيصة بس لو السلك اتقطع في أي حتة الشبكة كلها بتفصل.',
              'Ring (الحلقة): الأجهزة متوصلة دايرة وفي توكن بتلف بينهم؛ لو جهاز عطل الدورة بتقف.',
              'Mesh (الشبكة الكاملة): كل جهاز متوصل بكابل لكل الأجهزة التانية؛ أمان عالي جداً بس مكلفة أسلاك كتير.',
              'أنماط الإرسال: فردي (Unicast) أو نداء للكل (Broadcast) أو لمجموعة مشتركة (Multicast).'
            ]
          }
        ],
        questions: [
          {
            id: 'q-net1-1',
            courseId: 'networks',
            lectureId: 'net-lec-1',
            type: 'mcq',
            question: 'Which intermediary device routes packets between distinct local networks based on logical IP addresses?',
            questionAr: 'أنهي جهاز وسيط بيوجه حزم البيانات بين شبكات محلية مختلفة بالاعتماد على عناوين الـ IP؟',
            options: ['Hub', 'Switch', 'Router', 'Repeater'],
            optionsAr: ['هب (Hub)', 'سويتش (Switch)', 'راوتر (Router)', 'مكرر إشارة (Repeater)'],
            correctAnswer: 2,
            explanation: 'Routers operate at Layer 3 (Network Layer) and read destination IP addresses to forward packets across different subnets.',
            explanationAr: 'الراوتر ده شغال في الطبقة التالتة (Layer 3) ومسؤوليته يبص على عنوان الـ IP عشان يوجه الحزمة للشبكة التانية.'
          },
          {
            id: 'q-net1-2',
            courseId: 'networks',
            lectureId: 'net-lec-1',
            type: 'mcq',
            question: 'What is the bit length and format of a hardware MAC address?',
            questionAr: 'عنوان الماك الفيزيائي (MAC Address) حجمه كام بت وبيتكتب إزاي؟',
            options: ['32 bits in dotted decimal', '48 bits (6 octets) in hexadecimal', '64 bits binary', '128 bits hexadecimal'],
            optionsAr: ['32 بت عشري منقط', '48 بت (6 بايت) بالنظام الست عشري', '64 بت ثنائي', '128 بت ست عشري'],
            correctAnswer: 1,
            explanation: 'MAC addresses are 48 bits (6 bytes) long, represented in hexadecimal notation like AA:BB:CC:DD:EE:FF.',
            explanationAr: 'الماك 48 بت (يعني 6 بايت) وبيتكتب بالنظام الست عشري Hexadecimal مقسوم على 6 خانات.'
          },
          {
            id: 'q-net1-3',
            courseId: 'networks',
            lectureId: 'net-lec-1',
            type: 'true_false',
            question: 'Network throughput is always equal to or higher than theoretical bandwidth.',
            questionAr: 'معدل النقل الحقيقي (Throughput) دايماً بيساوي أو أعلى من سعة الباندويث النظرية.',
            correctAnswer: false,
            explanation: 'False: Throughput is actual measured transfer speed, which is almost always lower than bandwidth due to media attenuation and congestion.',
            explanationAr: 'غلط طبعاً! الباندويث ده أقصى رقم نظري في الكتالوج، إنما الـ Throughput ده السرعة الحقيقية اللي واصلالك ودائماً بتكون أقل عشان الزحمة والتشويش.'
          },
          {
            id: 'q-net1-4',
            courseId: 'networks',
            lectureId: 'net-lec-1',
            type: 'essay',
            question: 'Compare Star Topology and Full Mesh Topology regarding cost, redundancy, and single point of failure.',
            questionAr: 'قارن بين طوبولوجيا النجمة (Star) والشبكة الكاملة (Mesh) من حيث التكلفة، ونقطة الفشل، والاعتمادية.',
            correctAnswer: 'star vs mesh redundancy and cost',
            modelAnswer: '1. Star Topology: Moderate cost, simple installation. Vulnerable to central switch failure (Single Point of Failure), though individual node drops do not interrupt others.\n2. Full Mesh Topology: Extremely expensive due to (n*(n-1)/2) cables and ports. Zero single point of failure; provides multiple alternate paths for maximum fault tolerance.',
            modelAnswerAr: '1. طوبولوجيا النجمة (Star):\n- التكلفة: معقولة وسهلة التركيب.\n- نقطة الفشل: السويتش المركزي لو باظ الشبكة كلها تقع، لكن لو جهاز عادي اتفصل باقي الأجهزة شغالة عادي.\n- الاعتمادية: كويسة طالما السويتش سليم.\n\n2. الشبكة الكاملة (Full Mesh):\n- التكلفة: غالية ومكلفة جداً بسبب كمية الأسلاك والمنافذ.\n- نقطة الفشل: مفيش نقطة فشل مفردة أبداً؛ لو كابل اتقطع في عشرين كابل بديل يوصل الداتا فثواني!\n- الاعتمادية: أعلى درجة أمان ممكنة في الشبكات.',
            keyPoints: ['Single Point of Failure in Star hub', 'Mesh alternate pathways', 'Mesh cable cost']
          }
        ]
      },
      {
        id: 'net-lec-2',
        courseId: 'networks',
        lectureNumber: 2,
        title: 'Reference Models & IPv4 Addressing & Subnetting',
        titleAr: 'النماذج المرجعية OSI & TCP/IP وعنونة IPv4 والتقسيم',
        brief: 'In-depth study of the 7-layer OSI model vs 4-layer TCP/IP suite, protocol encapsulation (PDU transitions), IPv4 address classes (A to E), subnet masks, and bitwise AND network calculation.',
        briefAr: 'شرح طبقات OSI السبع ومقارنتها بـ TCP/IP، مراحل تغليف وفك الحزم، فئات الآي بي، قناع الشبكة والعملية المنطقية AND وحساب الأجهزة المتاحة.',
        durationMinutes: 40,
        interactiveTools: ['packet-journey', 'osi-visualizer', 'subnet-calculator'],
        cheatSheet: [
          {
            en: '7 OSI Layers (Top to Bottom): Application (7) -> Presentation (6) -> Session (5) -> Transport (4) -> Network (3) -> Data Link (2) -> Physical (1).',
            ar: 'طبقات OSI السبع من فوق لتحت: تطبيق (7) ➔ تقديم (6) ➔ جلسة (5) ➔ نقل (4) ➔ شبكة (3) ➔ ربط بيانات (2) ➔ فيزيائية (1).'
          },
          {
            en: 'TCP/IP combines OSI Layers 7, 6, and 5 into a single Application Layer.',
            ar: 'نموذج TCP/IP دمج الطبقات 5 و 6 و 7 في طبقة واحدة سماها Application.'
          },
          {
            en: 'Protocol Data Units (PDUs): Layer 4 = Segment/Datagram; Layer 3 = Packet; Layer 2 = Frame; Layer 1 = Bits.',
            ar: 'أسماء الحزمة في كل طبقة (PDU): في النقل اسمها Segment، في الشبكة Packet، في الداتا لينك Frame، وفي السلك بتات Bits.'
          },
          {
            en: 'IPv4 Structure: 32 bits divided into four 8-bit octets (values 0-255). Hierarchical: Network Portion + Host Portion.',
            ar: 'الـ IPv4 عبارة عن 32 بت مقسومة 4 خانات، كل خانة 8 بت (من 0 لـ 255) ومقسومة لحتة شبكة وحتة أجهزة.'
          },
          {
            en: 'Classes: Class A (0-127, /8), Class B (128-191, /16), Class C (192-223, /24), Class D (224-239 Multicast), Class E (240-255 Experimental).',
            ar: 'الفئات: فئة A (0-127)، فئة B (128-191)، فئة C (192-223)، فئة D للملتي كاست، وفئة E للأبحاث والتجارب.'
          },
          {
            en: 'Bitwise AND: IP AND Subnet Mask = Network Address (all host bits set to 0). Broadcast Address = all host bits set to 1.',
            ar: 'العملية المنطقية AND: الـ IP مع القناع بيصفر بتات الأجهزة ويديك عنوان الشبكة. وعنوان البث اقلب بتات الأجهزة كلها وحايد.'
          },
          {
            en: 'Usable Hosts Formula: 2^(Host Bits) - 2 (subtracting Network and Broadcast addresses).',
            ar: 'قانون الأجهزة المتاحة: (2 أس بتات الأجهزة) - 2 (بنطرح اتنين عشان عنوان الشبكة وعنوان البث).'
          }
        ],
        terms: [
          {
            term: 'Encapsulation',
            termAr: 'تغليف البيانات (لبس الحزمة)',
            definition: 'Process of adding layer-specific control headers and trailers to data as it moves down the protocol stack.',
            definitionAr: 'كل طبقة وهي نازلة بتضيف ترويسة (Header) فيها معلوماتها عشان الحزمة توصل صح.'
          },
          {
            term: 'Subnet Mask',
            termAr: 'قناع الشبكة (المسطرة اللي بتفصل)',
            definition: 'A 32-bit sequence of binary 1s (network portion) followed by 0s (host portion) used to distinguish subnets.',
            definitionAr: 'رقم 32 بت؛ الوحايد اللي فيه بتقولك ده جزء الشبكة، والأصفار بتقولك ده جزء الأجهزة.'
          },
          {
            term: 'Prefix Length (/n)',
            termAr: 'طول البادئة (السلاش /)',
            definition: 'Shorthand notation representing the count of continuous binary 1s in a subnet mask (e.g., /24 = 255.255.255.0).',
            definitionAr: 'اختصار يوضح عدد الوحايد في قناع الشبكة زي /24 يعني 24 واحد و 8 أصفار.'
          }
        ],
        sections: [
          {
            title: '1. OSI 7-Layer Model vs TCP/IP Architecture',
            titleAr: '1. نموذج OSI السبعة ومقارنته بنموذج الإنترنت TCP/IP',
            content: 'The OSI model is a 7-layer theoretical blueprint. TCP/IP is the practical 4-layer protocol suite powering the global Internet.',
            contentAr: 'نموذج OSI ده إطار نظري من 7 طبقات اتعمل عشان نفهم الشبكات بتشتغل إزاي، لكن العملي اللي شغال في العالم كله هو TCP/IP المكون من 4 طبقات.',
            bulletPoints: [
              'Layer 7 (Application): HTTP, DNS, SMTP, FTP user-facing protocols.',
              'Layer 6 (Presentation): Data formatting, encryption/decryption (TLS), and compression.',
              'Layer 5 (Session): Authentication, session tokens, and connection state management.',
              'Layer 4 (Transport): Port addressing, TCP reliable ordered delivery, and UDP low-latency datagrams.',
              'Layer 3 (Network): Logical IP routing and path determination across subnets.',
              'Layer 2 (Data Link): Media Access Control (MAC), frame assembly, and error detection (CRC/FCS).',
              'Layer 1 (Physical): Bit-level signaling (voltage pulses, light frequencies, RF waves).'
            ],
            bulletPointsAr: [
              'الطبقة 7 (التطبيقات): بروتوكولات التصفح والإيميل زي HTTP و DNS و SMTP.',
              'الطبقة 6 (التقديم): التشفير بـ TLS وضغط وترجمة البيانات.',
              'الطبقة 5 (الجلسة): إدارة وفتح ومزامنة الاتصال بين التطبيقات.',
              'الطبقة 4 (النقل): أرقام المنافذ والتحكم في التدفق والنقل الموثوق (TCP) أو السريع (UDP).',
              'الطبقة 3 (الشبكة): التوجيه المنطقي وعناوين الـ IP واختيار المسار.',
              'الطبقة 2 (ربط البيانات): عنونة الماك (MAC) وتجميع الإطارات وفحص الأخطاء.',
              'الطبقة 1 (الفيزيائية): إشارات الكهرباء أو الضوء اللي بتشيل الوحايد والأصفار في السلك.'
            ]
          },
          {
            title: '2. Data Encapsulation & Protocol Data Units (PDUs)',
            titleAr: '2. مراحل تغليف البيانات (PDU)',
            content: 'As user data travels down the sender stack, each protocol layer prefixes its specific header. At destination, the reverse Decapsulation occurs.',
            contentAr: 'البيانات وهي نازلة من جهازك بتتكيس وتتغلف في كل طبقة، وتتفكك عند المستقبل بنفس الترتيب.',
            bulletPoints: [
              'Data Stream (Application) -> Segment with Port header (Transport) -> Packet with IP header (Network) -> Frame with MAC header and trailer (Data Link) -> Bits (Physical).'
            ],
            bulletPointsAr: [
              'البيانات في التطبيق (Data Stream) ➔ تنزل للنقل وتاخد منفذ ويبقى اسمها Segment ➔ تنزل للشبكة وتاخد IP ويبقى اسمها Packet ➔ تنزل للداتا لينك وتاخد MAC وتسمى Frame ➔ تتحول لبتات Bits في السلك.'
            ]
          },
          {
            title: '3. IPv4 Structure, Classes & Bitwise AND',
            titleAr: '3. بنية الـ IPv4 وفئاته وحسابات الـ AND',
            content: 'An IPv4 address has 32 binary bits. Subnetting segments the address into Network and Host fields. Bitwise AND extracts the exact Network ID.',
            contentAr: 'عنوان IPv4 حجمه 32 بت مقسومة على 4 خانات. وبنعمل عملية AND المنطقية مع القناع عشان نطلع عنوان الشبكة.',
            bulletPoints: [
              'Class A: 1.0.0.0 to 126.255.255.255 (Default /8 mask: 255.0.0.0).',
              'Class B: 128.0.0.0 to 191.255.255.255 (Default /16 mask: 255.255.0.0).',
              'Class C: 192.0.0.0 to 223.255.255.255 (Default /24 mask: 255.255.255.0).',
              'Bitwise AND Rule: Only 1 AND 1 produces 1. Comparing IP with Subnet Mask turns all host bits into 0s to identify the Network Address.'
            ],
            bulletPointsAr: [
              'فئة A: أول بايت من 1 لـ 126 وقناعها الافتراضي 255.0.0.0 (/8).',
              'فئة B: أول بايت من 128 لـ 191 وقناعها الافتراضي 255.255.0.0 (/16).',
              'فئة C: أول بايت من 192 لـ 223 وقناعها الافتراضي 255.255.255.0 (/24).',
              'قاعدة الـ AND: ناتج العملية المنطقية مع القناع بيصفر بتات الأجهزة ويطلعلك عنوان الشبكة (Network Address).'
            ]
          }
        ],
        questions: [
          {
            id: 'q-net2-1',
            courseId: 'networks',
            lectureId: 'net-lec-2',
            type: 'mcq',
            question: 'What is the PDU designation at the Transport Layer of the OSI model?',
            questionAr: 'وحدة البيانات (PDU) في طبقة النقل (Transport Layer) بيكون اسمها إيه؟',
            options: ['Packet', 'Segment', 'Frame', 'Bits'],
            optionsAr: ['باكيت (Packet)', 'سيجمنت (Segment)', 'فريم (Frame)', 'بتات (Bits)'],
            correctAnswer: 1,
            explanation: 'The Transport Layer unit of transmission is called a Segment (TCP) or Datagram (UDP).',
            explanationAr: 'في طبقة النقل بنسميها Segment لو شغالين TCP أو Datagram لو شغالين UDP.'
          },
          {
            id: 'q-net2-2',
            courseId: 'networks',
            lectureId: 'net-lec-2',
            type: 'mcq',
            question: 'Given IP 192.168.10.15 with subnet mask 255.255.255.0 (/24), what is the broadcast address?',
            questionAr: 'لو عندك جهاز 192.168.10.15 والقناع /24، عنوان البث (Broadcast) للشبكة دي كام؟',
            options: ['192.168.10.0', '192.168.10.1', '192.168.10.254', '192.168.10.255'],
            optionsAr: ['192.168.10.0', '192.168.10.1', '192.168.10.254', '192.168.10.255'],
            correctAnswer: 3,
            explanation: 'In a /24 network, the last octet is the host field. Setting all host bits to 1 yields .255, which is the directed broadcast address.',
            explanationAr: 'في قناع /24 الخانة الرابعة هي خانة الأجهزة؛ عشان تجيب عنوان البث اقلب بتات الأجهزة كلها وحايد (يعني 255)، فيبقى العنوان 192.168.10.255.'
          },
          {
            id: 'q-net2-3',
            courseId: 'networks',
            lectureId: 'net-lec-2',
            type: 'true_false',
            question: 'The Network Address (all host bits 0) can be assigned to an active host workstation.',
            questionAr: 'ينفع تدي عنوان الشبكة (اللي خانات أجهزته كلها أصفار) كـ IP لجهاز كمبيوتر في المعمل.',
            correctAnswer: false,
            explanation: 'False: Network Address defines the subnet as an entity and cannot be assigned to any individual host.',
            explanationAr: 'مستحيل طبعاً! عنوان الشبكة وعنوان البث محجوزين للشبكة ككل ومينفعش أي جهاز ياخدهم.'
          }
        ]
      }
    ]
  },
  {
    id: 'ai',
    code: 'CS321',
    title: 'Artificial Intelligence',
    titleAr: 'مقدمة في الذكاء الاصطناعي',
    instructor: 'د. نسمة محمود',
    description: 'Foundations of intelligent systems, historical timeline and AI winters, the Turing test and 6 disciplines, 4 major approaches to AI, and Rational Agents.',
    descriptionAr: 'أسس النظم الذكية، التطور التاريخي وموجات الشتاء، اختبار تورينج ومناهج الذكاء الأربعة ومفهوم الوكيل العقلاني.',
    term: 1,
    icon: 'Bot',
    isAvailable: true,
    lectures: [
      {
        id: 'ai-lec-1',
        courseId: 'ai',
        lectureNumber: 1,
        title: 'Introduction to AI, History & Rational Agents',
        titleAr: 'مدخل إلى الذكاء الاصطناعي وتاريخه والوكلاء الأذكياء',
        brief: 'Defining intelligence, milestones from 1943 to present, the Turing test & 6 core disciplines, 4 AI approaches matrix, and rational agent optimality.',
        briefAr: 'تعريف الذكاء، تاريخ الذكاء الاصطناعي من سنة 1943 لحد شات جي بي تي، اختبار تورينج والتخصصات الستة، والفرق بين الوكيل الذكي والوكيل العقلاني.',
        durationMinutes: 35,
        interactiveTools: ['vacuum-world', 'turing-test'],
        cheatSheet: [
          {
            en: 'AI Definition (Oxford): Capacity of computers or machines to exhibit intelligent behavior, solve complex problems, and act autonomously.',
            ar: 'تعريف الذكاء الاصطناعي: قدرة الكمبيوتر أو الآلة على إظهار سلوك ذكي وحل المشاكل المعقدة واتخاذ قرارات شبه البشر.'
          },
          {
            en: 'Human Intelligence Facets: Perception, Action, Reasoning, Learning, Communication, and Planning.',
            ar: 'مظاهر الذكاء الإنساني: الإدراك، الفعل والحركة، الاستنتاج المنطقي، التعلم، الكلام والتواصل، والتخطيط للمستقبل.'
          },
          {
            en: 'Key Milestones: 1943 (McCulloch-Pitts neural model), 1950 (Turing paper), 1956 (Dartmouth conference coined "AI"), 1997 (Deep Blue defeated Kasparov), 2012 (AlexNet deep learning boom), 2022 (ChatGPT).',
            ar: 'محطات فارقة: 1943 (أول نموذج عصبي منطقي)، 1950 (اختبار تورينج)، 1956 (مؤتمر دارتموث واختراع مصطلح AI)، 1997 (ديب بلو هزم كاسباروف في الشطرنج)، 2012 (طفرة الديب ليرننج مع AlexNet)، 2022 (طفرة ChatGPT).'
          },
          {
            en: 'AI Winter: Cycles of overpromising followed by disillusionment and funding cuts when unrealistic claims failed to materialize.',
            ar: 'شتاء الذكاء الاصطناعي (AI Winter): فترات ركود وانقطاع التمويل عشان العلماء بالغوا في الوعود وما عرفوش ينفذوها بالعتاد القديم.'
          },
          {
            en: 'Recent Breakthrough Drivers: 1) Advanced Algorithms (Transformers), 2) Big Data availability, 3) Specialized Compute (GPUs, TPUs).',
            ar: 'سر الانفجار الأخير في الذكاء الاصطناعي: 1) خوارزميات الـ Transformers، 2) مليارات البيانات على النت، 3) كروت الشاشة الجبارة (GPUs و TPUs).'
          },
          {
            en: '4 AI Approaches: Thinking Humanly (Cognitive Modeling), Acting Humanly (Turing Test), Thinking Rationally (Laws of Thought logic), Acting Rationally (Rational Agents).',
            ar: 'مناهج الذكاء الأربعة: تفكير كالبشر، تصرف كالبشر (تورينج)، تفكير عقلاني منطقي، وتصرف عقلاني (الوكيل العقلاني وده تركيز المنهج).'
          },
          {
            en: 'Core Principle: "All rational agents are intelligent, but not all intelligent agents are rational." Rationality focuses on achieving optimal outcomes.',
            ar: 'قاعدة ذهبية للامتحان: "كل وكيل عقلاني هو ذكي، بس مش كل وكيل ذكي عقلاني!" لأن العقلانية هدفها تحقق النتيجة الصح والمثالية مش تقلد أخطاء البشر.'
          }
        ],
        terms: [
          {
            term: 'Rational Agent',
            termAr: 'الوكيل العقلاني (اللي بياخد أصح قرار)',
            definition: 'An autonomous entity that acts to achieve the best outcome or, under uncertainty, the best expected outcome based on available knowledge.',
            definitionAr: 'برنامج أو روبوت مستقل بيختار دايماً التصرف اللي يحققله أعلى مكسب متوقع حتى لو معندوش معلومات كافية.'
          },
          {
            term: 'Turing Test',
            termAr: 'اختبار تورينج (لعبة المحاكاة)',
            definition: 'Operational test of machine intelligence proposed by Alan Turing (1950) where an interrogator attempts to distinguish a human from a machine via text.',
            definitionAr: 'اختبار تورينج الشهير سنة 1950؛ محقق بشري بيشات مع طرفين (إنسان وآلة)، لو معرفش مين الآلة ومين الإنسان تبقى الآلة عدت الاختبار!'
          },
          {
            term: 'TPU (Tensor Processing Unit)',
            termAr: 'وحدة معالجة الموترات (شريحة جوجل)',
            definition: 'Custom ASIC chip designed by Google specifically to accelerate matrix multiplications in neural networks.',
            definitionAr: 'رقاقة إلكترونية مخصوصة طورتها جوجل عشان تحسب ضرب المصفوفات في الشبكات العصبية بسرعة الصاروخ.'
          }
        ],
        sections: [
          {
            title: '1. What is AI and What Drives the Modern Boom?',
            titleAr: '1. ما هو الذكاء الاصطناعي وسر الطفرة الحالية؟',
            content: 'Artificial Intelligence explores designing computational agents capable of perception, reasoning, and autonomous decision-making. The recent explosion stems from a synergy of three components:',
            contentAr: 'الذكاء الاصطناعي مش فكرة جديدة وموجود من أكتر من 50 سنة، بس ليه انفجر دلوقتي فجأة وبقى في كل مكان؟ السر في اندماج 3 حاجات سوا:',
            bulletPoints: [
              'Advanced Algorithms: Deep neural networks, attention mechanisms, and reinforcement learning.',
              'Big Data: Petabytes of textual, auditory, and visual data generated daily across the web.',
              'Accelerated Hardware: Shifting from sequential CPUs to massively parallel GPUs (NVIDIA) and custom ASICs like Google TPUs.'
            ],
            bulletPointsAr: [
              'الخوارزميات الذكية: معمارية الـ Transformers ونماذج التعلم العميق والتعلم المعزز.',
              'البيانات الضخمة: مليارات الصور والنصوص والفيديوهات المتاحة يومياً على النت.',
              'العتاد فائق السرعة: الانتقال من المعالجات العادية (CPU بتطبع حرف حرف) لكروت الشاشة (GPU بتطبع سطر سطر) ورقاقات الـ TPU (بتطبع صفحة كاملة في دورة واحدة).'
            ]
          },
          {
            title: '2. The Turing Test & The 6 Disciplines',
            titleAr: '2. اختبار تورينج والتخصصات الستة المطلوبة',
            content: 'Alan Turing proposed an operational definition of intelligence in 1950. A comprehensive "Total Turing Test" requires six core AI disciplines:',
            contentAr: 'آلان تورينج سأل سنة 1950: هل الآلة تقدر تفكر؟ وحط الاختبار التشغيلي. وعشان الآلة تجتاز الاختبار الشامل محتاجة 6 قدرات أساسية:',
            bulletPoints: [
              'Natural Language Processing (NLP): For successful human communication.',
              'Knowledge Representation: To store what it perceives and knows.',
              'Automated Reasoning: To use stored facts to answer questions and draw logical deductions.',
              'Machine Learning: To adapt to new conditions and extrapolate patterns.',
              'Computer Vision: To perceive physical items and environments (Total Turing Test).',
              'Robotics: To manipulate objects and navigate physical space (Total Turing Test).'
            ],
            bulletPointsAr: [
              'معالجة اللغات الطبيعية (NLP): عشان تتكلم وتفهم لغة البشر العادية.',
              'تمثيل المعرفة (Knowledge Rep): عشان تخزن وتفهرس الحقائق اللي بتتعلمها.',
              'الاستدلال الآلي (Automated Reasoning): عشان تستنتج حلول وأجوبة من الحقائق المخزنة.',
              'التعلم الآلي (Machine Learning): عشان تتعلم من أخطائها وتتكيف مع أي موقف جديد.',
              'الرؤية الحاسوبية (Computer Vision): عشان تشوف وتتعرف على الأشخاص والأشياء في الواقع.',
              'الروبوتات (Robotics): عشان تقدر تحرك إيدين ومفاصل وتمسك وتتحرك في البيئة الحقيقية.'
            ]
          },
          {
            title: '3. The 4 Approaches to AI & Rational Agents',
            titleAr: '3. مناهج الذكاء الأربعة والوكيل العقلاني',
            content: 'The academic foundation of AI spans two axes: Thought vs Behavior, and Human vs Rational.',
            contentAr: 'علماء الذكاء الاصطناعي بيقسموا المناهج على محورين: (تفكير ولا سلوك خارجي) و (تقليد البشر ولا التصرف بمنطقية وعقلانية).',
            bulletPoints: [
              'Thinking Humanly: Cognitive science and neuroscience modeling mental faculties.',
              'Acting Humanly: The Turing test approach to mimic human performance.',
              'Thinking Rationally: Laws of Thought syllogisms and deductive logic frameworks.',
              'Acting Rationally: The Rational Agent approach — focus of this course. Operates autonomously to achieve optimal goals under uncertainty.'
            ],
            bulletPointsAr: [
              'التفكير كالبشر: محاكاة العقل البشري بالدراسات العصبية والنفسية.',
              'التصرف كالبشر: اختبار تورينج؛ يهمنا النتيجة تبان كأنها صادرة من إنسان.',
              'التفكير بعقلانية: قوانين المنطق الصارم لأرسطو (كل البشر فانون، وسقراط إنسان، إذاً سقراط فانٍ). عيبها: صعبة تمثل الواقع العملي وفيه لايقين.',
              'التصرف بعقلانية: منهج الوكيل العقلاني (Rational Agent) وده محور المنهج الدراسي بالكامل! هدفه يعمل الشيء الصح اللي يوصل للهدف بأعلى نسبة نجاح.'
            ]
          }
        ],
        questions: [
          {
            id: 'q-ai1-1',
            courseId: 'ai',
            lectureId: 'ai-lec-1',
            type: 'mcq',
            question: 'In which milestone year was the Dartmouth Conference held, where the term "Artificial Intelligence" was formally coined?',
            questionAr: 'مؤتمر دارتموث اللي اتولد فيه مصطلح "الذكاء الاصطناعي" رسمياً اتعمل سنة كام؟',
            options: ['1943', '1950', '1956', '1969'],
            optionsAr: ['1943', '1950', '1956', '1969'],
            correctAnswer: 2,
            explanation: 'In 1956, John McCarthy and pioneer computer scientists organized the Dartmouth conference, adopting the name Artificial Intelligence.',
            explanationAr: 'سنة 1956 اجتمع علماء الكمبيوتر في مؤتمر دارتموث واعتمدوا مصطلح الذكاء الاصطناعي (AI) رسمياً لأول مرة في التاريخ.'
          },
          {
            id: 'q-ai1-2',
            courseId: 'ai',
            lectureId: 'ai-lec-1',
            type: 'true_false',
            question: 'All rational agents are intelligent, but not all intelligent agents are rational.',
            questionAr: 'كل وكيل عقلاني (Rational Agent) يعتبر ذكي، بس مش كل وكيل ذكي يعتبر عقلاني.',
            correctAnswer: true,
            explanation: 'True: Rationality specifically targets optimal goal achievement, whereas general intelligence can mimic human irrationality or sub-optimal decisions.',
            explanationAr: 'صح الصح! العقلانية هدفها دايماً القرار الأمثل اللي يحقق الهدف، إنما الذكاء العام ممكن يقلد غباء أو انفعالات البشر غير المحسوبة.'
          }
        ]
      }
    ]
  },
  {
    id: 'iot',
    code: 'CS331',
    title: 'Internet of Things (IoT)',
    titleAr: 'إنترنت الأشياء والأنظمة الذكية',
    instructor: 'د. سارة شهاب',
    description: 'Foundations of connected cyber-physical systems, device vs sensor vs network, 3-tier IoT architecture (Collect -> Transmit -> Analyze), smart applications, and scalability challenges.',
    descriptionAr: 'المفاهيم التأسيسية لإنترنت الأشياء، الفرق بين الجهاز والحساس والشبكة، الدورة الثلاثية، والتطبيقات والتحديات.',
    term: 1,
    icon: 'Cpu',
    isAvailable: true,
    lectures: [
      {
        id: 'iot-lec-1',
        courseId: 'iot',
        lectureNumber: 1,
        title: 'IoT Fundamentals, Architecture & Ecosystem',
        titleAr: 'مدخل إلى إنترنت الأشياء: المنظومة والتدفق والتطبيقات',
        brief: 'Defining devices, sensors, and networks, the 3-step data flow pipeline, real-world case studies (Smart Agriculture, Healthcare, Smart Homes), and adoption challenges.',
        briefAr: 'يعني إيه جهاز وحساس وشبكة، السلسلة الثلاثية لتدفق الداتا، تطبيقات الزراعة الذكية والمنازل والمدن، وتحديات الأمان والتوافقية.',
        durationMinutes: 30,
        interactiveTools: ['edge-vs-cloud', 'iot-simulator'],
        cheatSheet: [
          {
            en: 'Device: Physical equipment or hardware designed for specific computing or electrical tasks.',
            ar: 'الجهاز (Device): أي قطعة عتاد فيزيائية مخصصة لتشغيل مهام وبرامج معينة.'
          },
          {
            en: 'Sensor: Transducer detecting physical phenomena (heat, moisture, light, motion) and converting them into measurable electrical/digital signals.',
            ar: 'المستشعر أو الحساس (Sensor): جهاز بياخد الظاهرة الفيزيائية في الجو (حرارة، رطوبة، دخان) ويحولها لقراءة رقمية مفهومة.'
          },
          {
            en: 'The 3-Step Pipeline: 1) Sensors Collect -> 2) Connectivity Transmits -> 3) Cloud / Edge Analyzes.',
            ar: 'السلسلة الثلاثية السحرية: 1) الحساس بيجمع ➔ 2) الشبكة بتنقل ➔ 3) السحابة بتحلل وتدي أمر للمشغل.'
          },
          {
            en: 'Actuator: Hardware element converting digital control commands into real-world physical motion/action (e.g., valves, relays, alarms).',
            ar: 'المشغل (Actuator): عكس الحساس؛ بياخد الأمر البرمجي وينفذ حركة حقيقية زي فتح محبس المية أو تشغيل السارينة.'
          },
          {
            en: 'Core Adoption Challenges: Data Security & Privacy, Interoperability between diverse vendors, and Scalability across billions of nodes.',
            ar: 'أكبر التحديات: الأمان وخصوصية البيانات، التوافقية بين شركات الأجهزة المختلفة (Interoperability)، وإدارة مليارات الأجهزة مع بعض.'
          }
        ],
        terms: [
          {
            term: 'Sensor (Transducer)',
            termAr: 'المستشعر / الحساس',
            definition: 'Device that senses physical input from the environment and converts it into readable digital telemetry.',
            definitionAr: 'عين وأذن النظام؛ بيقيس الحرارة أو الرطوبة أو الحركة ويحولها لأرقام في الكمبيوتر.'
          },
          {
            term: 'Actuator',
            termAr: 'المشغل / المنفذ الحركي',
            definition: 'Mechanism responsible for moving or controlling a physical system in response to digital signals.',
            definitionAr: 'إيد ورجل النظام؛ بينفذ الفعل المادي في الحقيقة زي تشغيل التكييف أو فتح البوابة.'
          },
          {
            term: 'Interoperability',
            termAr: 'التوافقية والتشغيل البيني',
            definition: 'Ability of diverse software and hardware systems from multiple manufacturers to exchange data seamlessly.',
            definitionAr: 'إن أجهزة من شركات مختلفة (سامسونج، أبل، سيسكو) تقدر تتفاهم وتشتغل سوا بدون مشاكل.'
          }
        ],
        sections: [
          {
            title: '1. IoT Core Definition & Triad Components',
            titleAr: '1. ما هو إنترنت الأشياء والمكونات الثلاثة الأساسية؟',
            content: 'The Internet of Things describes a global ecosystem of physical items embedded with sensing and networking technology. It is fundamentally built on three pillars:',
            contentAr: 'إنترنت الأشياء هو ربط الجماد والأشياء اللي حوالينا في العالم الحقيقي بشبكة النت عشان تتبادل البيانات وتشتغل لوحدها من غير ما تفضل تضغط زراير كل شوية!',
            bulletPoints: [
              'Sensors: Collect environmental telemetry without human friction.',
              'Devices: Edge hardware executing embedded software.',
              'Networks: Communication infrastructure transporting packets to central or edge brokers.'
            ],
            bulletPointsAr: [
              'الحساسات (Sensors): بترصد البيئة المحيطة بدقة تلقائياً.',
              'الأجهزة (Devices): العتاد والشرائح اللي بتشغل البرامج المدمجة.',
              'الشبكات (Networks): وسائط الاتصال اللي بتنقل الحزم للسيرفر أو السحابة.'
            ]
          },
          {
            title: '2. The 3-Stage Telemetry Pipeline',
            titleAr: '2. دورة حياة البيانات في إنترنت الأشياء',
            content: 'Every functioning IoT application executes a deterministic three-stage continuous loop:',
            contentAr: 'أي سيستم إنترنت أشياء في العالم بيشتغل في دايرة من 3 خطوات متكررة:',
            bulletPoints: [
              '1. Sensors Collect: Analog signals are sampled into digital metrics.',
              '2. Connectivity Transmits: Cellular, Wi-Fi, LoRaWAN, or BLE forward messages.',
              '3. Cloud Analyzes: Rule engines evaluate safety thresholds and dispatch instructions to actuators.'
            ],
            bulletPointsAr: [
              '1. الحساسات تجمع: التقاط القراءة وتحويلها لأرقام.',
              '2. الشبكة تنقل: بالواي فاي أو شريحة 5G أو شبكات LoRaWAN.',
              '3. السحابة تحلل: الخوارزمية تقارن النتيجة بالحد الآمن وتصدر أمر تشغيل للمشغل فوراً.'
            ]
          }
        ],
        questions: [
          {
            id: 'q-iot1-1',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'mcq',
            question: 'Which component is explicitly responsible for converting digital control decisions into physical actions in the real environment?',
            questionAr: 'أنهي مكون في منظومة الـ IoT مسؤوليته يحول الأمر الرقمي لفعل مادي حقيقي في الواقع؟',
            options: ['Sensor', 'Gateway Router', 'Actuator', 'Cloud Database'],
            optionsAr: ['المستشعر (Sensor)', 'راوتر البوابة (Gateway)', 'المشغل المادي (Actuator)', 'قاعدة البيانات السحابية'],
            correctAnswer: 2,
            explanation: 'Actuators receive commands from computing nodes and execute physical work (e.g., closing valves, sounding alarms, activating motors).',
            explanationAr: 'المشغل (Actuator) هو اللي بينفذ الفعل الحركي زي فتح صمام المية، إطلاق صفارة الإنذار، أو تشغيل الموتور.'
          }
        ]
      }
    ]
  },
  {
    id: 'windows-programming',
    code: 'CS341',
    title: 'Visual & Windows Programming',
    titleAr: 'برمجة التطبيقات المرئية (C# .NET)',
    instructor: 'هيئة التدريس',
    description: 'Desktop GUI application development using C# and Microsoft .NET framework, Windows Forms, event-driven programming, and database connectivity.',
    descriptionAr: 'تطوير تطبيقات سطح المكتب التفاعلية باستخدام لغة C# وإطار عمل .NET وبرمجة الأحداث وربط قواعد البيانات.',
    term: 1,
    icon: 'Layout',
    isAvailable: false,
    lectures: []
  },
  {
    id: 'database-systems',
    code: 'CS351',
    title: 'Database Systems & Design',
    titleAr: 'نظم إدارة قواعد البيانات وتصميمها',
    instructor: 'هيئة التدريس',
    description: 'Relational data modeling, Entity-Relationship Diagrams (ERD), normalization rules, advanced SQL querying, transactions, and concurrency.',
    descriptionAr: 'مخططات الكيانات والعلاقات (ERD)، المعيارية (Normalization)، استعلامات SQL المتقدمة، وإدارة المعاملات والأمان.',
    term: 1,
    icon: 'Database',
    isAvailable: false,
    lectures: []
  },
  {
    id: 'software-engineering',
    code: 'CS361',
    title: 'Software Engineering & Lifecycle',
    titleAr: 'هندسة البرمجيات وإدارة المشروعات',
    instructor: 'هيئة التدريس',
    description: 'Software development life cycles (Agile, Scrum, Waterfall), requirements engineering, UML modeling, testing methodologies, and project management.',
    descriptionAr: 'منهجيات تطوير البرمجيات، هندسة المتطلبات، مخططات UML، واختبار البرمجيات وضمان الجودة وإدارة المشروعات.',
    term: 1,
    icon: 'FolderKanban',
    isAvailable: false,
    lectures: []
  }
];

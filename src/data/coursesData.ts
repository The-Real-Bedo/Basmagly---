import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'networks',
    code: 'CS311',
    title: 'Computer Networks',
    titleAr: 'شبكات الحاسب',
    instructor: 'Cisco Networking Curriculum',
    description: 'Comprehensive coverage of network fundamentals, the OSI 7-layer and TCP/IP reference models, devices, topologies, transmission modes, and IPv4 addressing and subnetting.',
    descriptionAr: 'تغطية شاملة لأساسيات الشبكات، والنماذج المرجعية OSI (7 طبقات) و TCP/IP، والأجهزة، والطوبولوجيا، وأنماط الإرسال، وعنونة IPv4 وتقسيم الشبكات (Subnetting).',
    term: 1,
    icon: 'Network',
    isAvailable: true,
    lectures: [
      {
        id: 'net-lec-1',
        courseId: 'networks',
        lectureNumber: 1,
        title: 'Network Components, Classifications & Topologies',
        titleAr: 'مكونات الشبكات وتصنيفاتها والطوبولوجيا',
        brief: 'Overview of hardware and software components, end vs intermediary devices, network scales (PAN to WAN), P2P vs Client/Server, physical topologies, and transmission modes.',
        briefAr: 'المكونات المادية والبرمجية، الفرق بين الأجهزة الطرفية والأجهزة الوسيطة، تصنيف الشبكات بالمساحة (من PAN لـ WAN) وبنظام الإدارة (P2P مقابل Client/Server)، والطوبولوجيا الفيزيائية وأنماط الإرسال.',
        durationMinutes: 35,
        interactiveTools: ['network-devices', 'topology-simulator', 'transmission-lab'],
        cheatSheet: [
          {
            en: 'Network definition: Two or more connected computers sharing data, hardware, and services.',
            ar: 'الشبكة ببساطة: جهازين كمبيوتر أو أكتر متوصلين ببعض عشان يتشاركوا الملفات والأجهزة (زي الطابعة) والخدمات (زي الإنترنت).'
          },
          {
            en: 'End Devices use 3 types of addresses: Physical MAC (48-bit hex), Logical IP (32-bit dotted decimal), and Port number (16-bit, identifies the application or service at the Transport layer).',
            ar: 'أي جهاز طرفي ليه 3 عناوين: الـ MAC الفيزيائي (48 بت ست عشري)، والـ IP المنطقي (32 بت عشري)، ورقم الـ Port (16 بت) اللي بيحدد البرنامج أو الخدمة في طبقة النقل.'
          },
          {
            en: 'Intermediary Devices: Hub broadcasts at Layer 1; Switch selectively forwards by MAC table at Layer 2; Router interconnects subnets via IP routing at Layer 3.',
            ar: 'الأجهزة الوسيطة: الـ Hub أعمى بيبعت للكل (Layer 1)، والـ Switch ذكي بيبعت بالـ MAC (Layer 2)، والـ Router بيربط شبكات مختلفة بالـ IP (Layer 3).'
          },
          {
            en: 'Bandwidth is the maximum theoretical capacity; Throughput is the actual measured transfer rate at a given moment under real network load.',
            ar: 'الـ Bandwidth: أقصى سرعة نظرية الوصلة تقدر تشيلها، والـ Throughput: السرعة الفعلية اللي بتوصلك في لحظة معينة مع زحمة الشبكة.'
          },
          {
            en: 'Geographic Scale: PAN (~10 m) < LAN (single building/office) < MAN (city-wide) < WAN (cross-country/global, e.g., the Internet).',
            ar: 'المساحة الجغرافية: شبكة شخصية (PAN) حوالي 10 أمتار ← شبكة محلية (LAN) في مبنى أو شركة ← شبكة مدينة (MAN) ← شبكة واسعة (WAN) زي الإنترنت.'
          },
          {
            en: 'Topologies: Star is the most common (failure of the central device is a single point of failure); Mesh provides maximum fault tolerance with redundant links.',
            ar: 'الـ Topologies: الـ Star هي الأشهر (عيبها لو الـ Switch المركزي وقع الشبكة كلها تقع)، والـ Mesh أعلى تحمل للأعطال عشان فيها وصلات بديلة كتير.'
          },
          {
            en: 'Transmission Modes: Unicast (1-to-1), Broadcast (1-to-all within a LAN), Multicast (1-to-a-group of subscribed hosts).',
            ar: 'أنماط الإرسال: Unicast (رسالة لجهاز واحد بس)، Broadcast (نداء لكل الأجهزة في الـ LAN)، Multicast (رسالة لمجموعة أجهزة مشتركة).'
          }
        ],
        terms: [
          {
            term: 'End Device',
            termAr: 'الجهاز الطرفي (جهازك إنت)',
            definition: 'Originating source or final destination of data messages across the network (e.g., PC, laptop, server, IP phone).',
            definitionAr: 'أي جهاز بيبدأ يبعت الرسائل أو بيستقبلها في الآخر، زي اللاب توب والموبايل والـ Server.'
          },
          {
            term: 'Intermediary Device',
            termAr: 'الجهاز الوسيط (اللي في السكة)',
            definition: 'Equipment that connects end devices, regenerates signals, and directs traffic (e.g., Switch, Router, Firewall).',
            definitionAr: 'الأجهزة اللي في النص، وظيفتها توصل الأجهزة الطرفية ببعض وتقوّي الإشارة وتوجّه البيانات، زي الـ Switch والـ Router والـ Firewall.'
          },
          {
            term: 'MAC Address',
            termAr: 'عنوان الـ MAC الفيزيائي (كارت الشبكة)',
            definition: 'Permanent 48-bit (6-octet) hexadecimal physical address burned into the Network Interface Card (NIC).',
            definitionAr: 'رقم هوية كارت الشبكة (NIC)؛ طوله 48 بت بالنظام الست عشري، بيتكتب عليه وقت التصنيع ومبيتغيرش.'
          },
          {
            term: 'Bandwidth vs Throughput',
            termAr: 'السعة النظرية مقابل السرعة الفعلية',
            definition: 'Bandwidth is the theoretical channel capacity; Throughput is the actual rate of successfully transferred bits per second.',
            definitionAr: 'الـ Bandwidth هو الرقم المكتوب على الباقة، والـ Throughput هو السرعة اللي بتوصلك فعلاً على جهازك.'
          }
        ],
        sections: [
          {
            title: '1. Network Fundamentals & Device Classifications',
            titleAr: '1. أساسيات الشبكات وتصنيف الأجهزة الطرفية والوسيطة',
            content: 'A computer network consists of two or more interconnected computing systems exchanging resources. Network hardware is divided into End Devices (sources and destinations) and Intermediary Devices (traffic directors).',
            contentAr: 'الشبكة ببساطة جهازين أو أكتر متوصلين ببعض عشان يتشاركوا الموارد زي الملفات والطابعة والإنترنت. وبنقسم الأجهزة لنوعين رئيسيين: أجهزة طرفية (End Devices) هي اللي بيستخدمها المستخدم وبتبعت منها البيانات وتستقبلها، وأجهزة وسيطة (Intermediary Devices) هي اللي بتوجّه الحركة في السكة.',
            bulletPoints: [
              'End Devices: PCs, laptops, servers, and printers. Every host uses MAC (Layer 2), IP (Layer 3), and Port (Layer 4).',
              'Hub: Layer 1 multiport repeater that blindly broadcasts incoming signals to all ports except the one they arrived on.',
              'Switch: Layer 2 intelligent bridge maintaining a MAC Address Table for selective unicast forwarding.',
              'Router: Layer 3 gateway directing IP packets across disparate LAN and WAN environments.'
            ],
            bulletPointsAr: [
              'الأجهزة الطرفية: الكمبيوتر واللاب توب والـ Server والطابعة؛ كل جهاز بيستخدم عنوان MAC (Layer 2) وعنوان IP (Layer 3) ورقم Port (Layer 4).',
              'الـ Hub: جهاز غبي في الطبقة الأولى؛ أي إشارة توصله بيكررها ويبعتها لكل المنافذ من غير ما يفرّق، ما عدا المنفذ اللي جات منه.',
              'الـ Switch: جهاز ذكي في الطبقة التانية؛ بيحفظ عناوين الـ MAC ويبعت الـ Frame للجهاز المطلوب بس.',
              'الـ Router: جهاز في الطبقة التالتة؛ بيبص على الـ IP ويربط شبكات مختلفة ببعضها ويختار أفضل مسار.'
            ],
            keyRule: 'Switches filter traffic using Layer 2 MAC addresses, whereas Routers forward packets using Layer 3 IP addresses.',
            keyRuleAr: 'الـ Switch شغال بعناوين الـ MAC في الطبقة التانية، والـ Router شغال بعناوين الـ IP في الطبقة التالتة.'
          },
          {
            title: '2. Geographical Scale & Management Models',
            titleAr: '2. تصنيف الشبكات بالمساحة الجغرافية ونظام الإدارة',
            content: 'Networks are categorized by geographical footprint (PAN, LAN, MAN, WAN) and organizational management (Peer-to-Peer vs Client/Server).',
            contentAr: 'بنقسم الشبكات حسب المساحة اللي بتغطيها (PAN و LAN و MAN و WAN)، وحسب نظام الإدارة: فيه Server مركزي (Client/Server) ولا الكل متساوي (Peer-to-Peer)؟',
            bulletPoints: [
              'PAN: Personal Area Network within a personal perimeter (~10 meters, e.g., Bluetooth).',
              'LAN: Local Area Network serving an office, lab, or campus building with high throughput.',
              'MAN: Metropolitan Area Network interconnecting multiple LANs across a city.',
              'WAN: Wide Area Network spanning countries or continents; the Internet is the largest WAN.',
              'Peer-to-Peer (P2P): Decentralized, low cost, suitable for up to about 10 devices; lacks centralized security.',
              'Client/Server: A centralized server administers access, files, and authentication; the server is a single point of failure.'
            ],
            bulletPointsAr: [
              'PAN: شبكة شخصية في حدود 10 أمتار زي توصيل الموبايل بسماعة البلوتوث.',
              'LAN: شبكة محلية جوه مكتب أو معمل أو مبنى في الكلية، وسرعتها عالية.',
              'MAN: شبكة مدينة بتربط كذا LAN متفرقة جوه نفس المدينة، زي فروع شركة في القاهرة مثلاً.',
              'WAN: شبكة واسعة بتربط دول وقارات، والإنترنت أكبر مثال ليها.',
              'P2P (الند للند): مفيش Server والكل متساوي؛ رخيصة وتنفع لـ 10 أجهزة تقريباً أو أقل، بس أمانها ضعيف.',
              'Client/Server (عميل وخادم): Server مركزي هو اللي ماسك الصلاحيات والملفات والأمان؛ بس لو الـ Server وقع الخدمات كلها تقف.'
            ]
          },
          {
            title: '3. Physical Topologies & Transmission Modes',
            titleAr: '3. الطوبولوجيا الفيزيائية (Physical Topologies) وأنماط الإرسال',
            content: 'Physical topology defines the physical layout of cables and nodes, while logical topology defines how signals flow. Transmission modes define who the receivers are.',
            contentAr: 'الطوبولوجيا الفيزيائية هي الشكل الفعلي للكابلات والأجهزة، والمنطقية هي مسار الإشارة جوه الشبكة. وأنماط الإرسال بتحدد إنت بتبعت لمين.',
            bulletPoints: [
              'Star Topology: All endpoints link to a central switch/hub. Simple troubleshooting, but failure of the central device halts the network.',
              'Bus Topology: Shared single backbone cable with terminators. Inexpensive, but a break anywhere in the cable collapses transmission.',
              'Ring Topology: Devices form a closed loop and a token circulates sequentially, preventing collisions. A single node failure breaks the token flow.',
              'Mesh Topology: Full or partial interconnections provide maximum redundancy and alternate routing.',
              'Transmission modes: Unicast (1-to-1), Broadcast (1-to-all), and Multicast (1-to-group).'
            ],
            bulletPointsAr: [
              'Star (النجمة): كل جهاز طالع منه كابل لـ Switch مركزي في النص؛ سهلة الصيانة واكتشاف الأعطال، بس لو الجهاز المركزي باظ الشبكة تقع.',
              'Bus (الخطي): كابل رئيسي واحد والكل متعلق فيه؛ رخيصة بس لو الكابل اتقطع في أي حتة الشبكة كلها بتقع.',
              'Ring (الحلقة): الأجهزة متوصلة في دايرة وفيه Token بيلف بينهم ويمنع التصادم؛ لو جهاز واحد عطل الدورة بتقف.',
              'Mesh (الشبكة المتشابكة): كل جهاز متوصل بكل الأجهزة التانية (Full) أو ببعضها (Partial)؛ تحمل أعطال عالي جداً بس مكلفة عشان محتاجة كابلات كتير.',
              'أنماط الإرسال: فردي (Unicast) أو نداء للكل (Broadcast) أو لمجموعة محددة (Multicast).'
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
            questionAr: 'أنهي جهاز وسيط بيوجّه الحزم (Packets) بين شبكات محلية مختلفة على أساس عناوين الـ IP؟',
            options: ['Hub', 'Switch', 'Router', 'Repeater'],
            optionsAr: ['هب (Hub)', 'سويتش (Switch)', 'راوتر (Router)', 'مكرر إشارة (Repeater)'],
            correctAnswer: 2,
            explanation: 'Routers operate at Layer 3 (Network Layer) and read destination IP addresses to forward packets across different subnets.',
            explanationAr: 'الـ Router شغال في الطبقة التالتة (Layer 3) ومسؤوليته يبص على عنوان الـ IP بتاع الوجهة عشان يوجّه الحزمة للشبكة التانية.'
          },
          {
            id: 'q-net1-2',
            courseId: 'networks',
            lectureId: 'net-lec-1',
            type: 'mcq',
            question: 'What is the bit length and format of a hardware MAC address?',
            questionAr: 'عنوان الـ MAC الفيزيائي حجمه كام بت وبيتكتب إزاي؟',
            options: ['32 bits in dotted decimal', '48 bits (6 octets) in hexadecimal', '64 bits binary', '128 bits hexadecimal'],
            optionsAr: ['32 بت عشري بالنقط (Dotted Decimal)', '48 بت (6 بايت) بالنظام الست عشري', '64 بت ثنائي', '128 بت ست عشري'],
            correctAnswer: 1,
            explanation: 'MAC addresses are 48 bits (6 bytes) long, represented in hexadecimal notation like AA:BB:CC:DD:EE:FF.',
            explanationAr: 'الـ MAC عبارة عن 48 بت (يعني 6 بايت) وبيتكتب بالنظام الست عشري (Hexadecimal) مقسوم على 6 خانات، زي AA:BB:CC:DD:EE:FF.'
          },
          {
            id: 'q-net1-3',
            courseId: 'networks',
            lectureId: 'net-lec-1',
            type: 'true_false',
            question: 'Network throughput is always equal to or higher than theoretical bandwidth.',
            questionAr: 'معدل النقل الفعلي (Throughput) دايماً بيساوي أو أعلى من سعة الـ Bandwidth النظرية.',
            correctAnswer: false,
            explanation: 'False: Throughput is the actual measured transfer rate; it can never exceed bandwidth and is usually lower due to media attenuation and congestion.',
            explanationAr: 'غلط! الـ Bandwidth هو أقصى رقم نظري، لكن الـ Throughput هو السرعة الفعلية اللي واصلالك، ومستحيل تعدّي الـ Bandwidth وغالباً بتكون أقل بسبب الزحمة والتشويش.'
          },
          {
            id: 'q-net1-4',
            courseId: 'networks',
            lectureId: 'net-lec-1',
            type: 'essay',
            question: 'Compare Star Topology and Full Mesh Topology regarding cost, redundancy, and single point of failure.',
            questionAr: 'قارن بين طوبولوجيا النجمة (Star) والطوبولوجيا المتشابكة الكاملة (Full Mesh) من حيث التكلفة، والاحتياطية (Redundancy)، ونقطة الفشل الوحيدة (Single Point of Failure).',
            correctAnswer: 'star vs mesh redundancy and cost',
            modelAnswer: '1. Star Topology:\n- Cost: Moderate, with simple installation.\n- Single point of failure: The central switch; if it fails, the whole network goes down, but the failure of an individual end device does not affect the others.\n- Redundancy: Low; the network is reliable only as long as the central device works.\n\n2. Full Mesh Topology:\n- Cost: Very high, since it needs n(n-1)/2 cables and n-1 ports on every node.\n- Single point of failure: None; if a link fails, traffic is rerouted through alternate paths.\n- Redundancy: The highest possible fault tolerance.',
            modelAnswerAr: '1. طوبولوجيا النجمة (Star):\n- التكلفة: معقولة والتركيب سهل.\n- نقطة الفشل: الـ Switch المركزي؛ لو باظ الشبكة كلها تقع، لكن لو جهاز عادي اتفصل باقي الأجهزة بتشتغل عادي.\n- الاحتياطية (Redundancy): قليلة؛ الشبكة مضمونة طالما الجهاز المركزي سليم.\n\n2. الطوبولوجيا المتشابكة الكاملة (Full Mesh):\n- التكلفة: عالية جداً، لأنها محتاجة n(n-1)/2 كابل و n-1 منفذ في كل جهاز.\n- نقطة الفشل: مفيش نقطة فشل وحيدة؛ لو كابل اتقطع البيانات بتتحول فوراً لمسار بديل.\n- الاحتياطية (Redundancy): أعلى درجة تحمل للأعطال ممكنة في الشبكات.',
            keyPoints: ['Single point of failure in Star (central device)', 'Mesh alternate paths', 'Mesh cabling cost']
          }
        ]
      },
      {
        id: 'net-lec-2',
        courseId: 'networks',
        lectureNumber: 2,
        title: 'Reference Models (OSI & TCP/IP), IPv4 Addressing & Subnetting',
        titleAr: 'النماذج المرجعية (OSI و TCP/IP) وعنونة IPv4 وتقسيم الشبكات (Subnetting)',
        brief: 'In-depth study of the 7-layer OSI model vs the 4-layer TCP/IP suite, protocol encapsulation (PDU transitions), IPv4 address classes (A to E), subnet masks, bitwise AND network calculation, and usable-host counting.',
        briefAr: 'شرح طبقات OSI السبع ومقارنتها بنموذج TCP/IP (4 طبقات)، وتغليف البيانات وفكها (PDU)، وفئات عناوين IPv4 (من A لـ E)، وقناع الشبكة (Subnet Mask)، وحساب عنوان الشبكة بعملية AND، وحساب عدد الأجهزة المتاحة.',
        durationMinutes: 40,
        interactiveTools: ['packet-journey', 'osi-visualizer', 'subnet-calculator'],
        cheatSheet: [
          {
            en: '7 OSI Layers (Top to Bottom): Application (7) → Presentation (6) → Session (5) → Transport (4) → Network (3) → Data Link (2) → Physical (1).',
            ar: 'طبقات OSI السبع من فوق لتحت: التطبيقات (7) ← التقديم (6) ← الجلسة (5) ← النقل (4) ← الشبكة (3) ← ربط البيانات (2) ← الفيزيائية (1).'
          },
          {
            en: 'TCP/IP (4 layers) merges OSI Layers 7, 6, and 5 into a single Application layer, and Layers 2 and 1 into Network Access.',
            ar: 'نموذج TCP/IP (4 طبقات) دمج طبقات OSI رقم 7 و 6 و 5 في طبقة واحدة اسمها Application، ودمج الطبقتين 2 و 1 في طبقة Network Access.'
          },
          {
            en: 'Protocol Data Units (PDUs): Layer 4 = Segment/Datagram; Layer 3 = Packet; Layer 2 = Frame; Layer 1 = Bits.',
            ar: 'اسم وحدة البيانات (PDU) في كل طبقة: في النقل Segment (أو Datagram مع UDP)، في الشبكة Packet، في الـ Data Link Frame، وفي الـ Physical Bits.'
          },
          {
            en: 'IPv4 Structure: 32 bits divided into four 8-bit octets (values 0-255). Hierarchical: Network Portion + Host Portion.',
            ar: 'الـ IPv4 عبارة عن 32 بت مقسومة على 4 خانات (Octets)، كل خانة 8 بت (من 0 لـ 255)، والعنوان كله مقسوم لجزء شبكة (Network) وجزء أجهزة (Host).'
          },
          {
            en: 'Classes: Class A (1-126, /8; 127 is reserved for loopback), Class B (128-191, /16), Class C (192-223, /24), Class D (224-239, Multicast), Class E (240-255, Experimental).',
            ar: 'الفئات: فئة A (1-126، /8؛ والـ 127 محجوز للـ Loopback)، فئة B (128-191، /16)، فئة C (192-223، /24)، فئة D (224-239) للـ Multicast، وفئة E (240-255) للأبحاث والتجارب.'
          },
          {
            en: 'Bitwise AND: IP AND Subnet Mask = Network Address (all host bits set to 0). Broadcast Address = all host bits set to 1.',
            ar: 'العملية المنطقية AND: الـ IP AND القناع بيصفّر بتات الأجهزة ويديك عنوان الشبكة (Network Address)، وعنوان الـ Broadcast هو إن كل بتات الأجهزة تبقى 1.'
          },
          {
            en: 'Usable Hosts Formula: 2^h - 2, where h is the number of host bits (subtracting the Network and Broadcast addresses).',
            ar: 'قانون عدد الأجهزة المتاحة: 2 أس h - 2، حيث h هو عدد بتات الأجهزة (بنطرح اتنين عشان عنوان الشبكة وعنوان الـ Broadcast).'
          }
        ],
        terms: [
          {
            term: 'Encapsulation',
            termAr: 'تغليف البيانات (لبس الحزمة)',
            definition: 'Process of adding layer-specific control headers and trailers to data as it moves down the protocol stack.',
            definitionAr: 'عملية إن كل طبقة بتضيف Header (وفي الـ Data Link كمان Trailer) فيه معلومات التحكم الخاصة بيها على البيانات وهي نازلة من الطبقة العليا للسفلى، عشان توصل صح.'
          },
          {
            term: 'Subnet Mask',
            termAr: 'قناع الشبكة (المسطرة اللي بتفصل)',
            definition: 'A 32-bit value of contiguous binary 1s (network portion) followed by 0s (host portion), used to separate the network and host parts of an IPv4 address.',
            definitionAr: 'رقم 32 بت؛ الواحدات (1) فيه بتحدد جزء الشبكة، والأصفار بتحدد جزء الأجهزة.'
          },
          {
            term: 'Prefix Length (/n)',
            termAr: 'طول البادئة (السلاش /)',
            definition: 'Shorthand notation representing the count of contiguous binary 1s in a subnet mask (e.g., /24 = 255.255.255.0).',
            definitionAr: 'اختصار بيوضح عدد الواحدات المتتالية في قناع الشبكة؛ مثلاً /24 يعني 24 واحد و 8 أصفار (255.255.255.0).'
          }
        ],
        sections: [
          {
            title: '1. OSI 7-Layer Model vs TCP/IP Architecture',
            titleAr: '1. نموذج OSI السباعي ومقارنته بنموذج TCP/IP',
            content: 'The OSI model is a 7-layer theoretical blueprint. TCP/IP is the practical 4-layer protocol suite powering the global Internet.',
            contentAr: 'نموذج OSI ده إطار نظري من 7 طبقات اتعمل عشان نفهم الشبكات بتشتغل إزاي، لكن النموذج العملي اللي شغال في العالم كله هو TCP/IP، وهو مكوّن من 4 طبقات.',
            bulletPoints: [
              'Layer 7 (Application): HTTP, DNS, SMTP, and FTP, the user-facing protocols.',
              'Layer 6 (Presentation): Data formatting, encryption/decryption (TLS), and compression.',
              'Layer 5 (Session): Establishing, maintaining, synchronizing, and terminating sessions between applications.',
              'Layer 4 (Transport): Port addressing, flow control, TCP reliable ordered delivery, and UDP low-latency datagrams.',
              'Layer 3 (Network): Logical IP routing and path determination across subnets.',
              'Layer 2 (Data Link): Media Access Control (MAC), frame assembly, and error detection (CRC/FCS).',
              'Layer 1 (Physical): Bit-level signaling (voltage pulses, light frequencies, RF waves).'
            ],
            bulletPointsAr: [
              'الطبقة 7 (التطبيقات): بروتوكولات التصفح والإيميل ونقل الملفات زي HTTP و DNS و SMTP و FTP.',
              'الطبقة 6 (التقديم): تنسيق وترجمة البيانات وتشفيرها (زي TLS) وضغطها.',
              'الطبقة 5 (الجلسة): فتح وإدارة ومزامنة وإنهاء الجلسات بين التطبيقات.',
              'الطبقة 4 (النقل): أرقام المنافذ والتحكم في التدفق والنقل الموثوق (TCP) أو السريع (UDP).',
              'الطبقة 3 (الشبكة): التوجيه المنطقي وعناوين الـ IP واختيار المسار.',
              'الطبقة 2 (ربط البيانات): عنونة الـ MAC وتجميع الـ Frames واكتشاف الأخطاء (CRC/FCS).',
              'الطبقة 1 (الفيزيائية): إشارات كهربية أو ضوئية أو لاسلكية بتنقل البتات (الواحدات والأصفار) على الوسط الناقل.'
            ]
          },
          {
            title: '2. Data Encapsulation & Protocol Data Units (PDUs)',
            titleAr: '2. تغليف البيانات ووحدات البيانات (PDUs)',
            content: 'As user data travels down the sender stack, each protocol layer adds its own header (and, at Layer 2, a trailer). At the destination, the reverse process, Decapsulation, occurs.',
            contentAr: 'البيانات وهي نازلة من جهازك بتتغلف في كل طبقة بـ Header بتاع الطبقة دي، وعند المستقبل بتتفك (Decapsulation) بالترتيب العكسي.',
            bulletPoints: [
              'Data Stream (Application) → Segment with Port header (Transport) → Packet with IP header (Network) → Frame with MAC header and trailer (Data Link) → Bits (Physical).'
            ],
            bulletPointsAr: [
              'البيانات في طبقة التطبيقات (Data Stream) ← تنزل للنقل وتاخد Header فيه أرقام الـ Port فتبقى Segment ← تنزل للشبكة وتاخد Header فيه الـ IP فتبقى Packet ← تنزل للـ Data Link وتاخد Header فيه الـ MAC (وفي آخرها Trailer) فتبقى Frame ← تتحول لـ Bits على الوسط الناقل.'
            ]
          },
          {
            title: '3. IPv4 Structure, Classes & Bitwise AND',
            titleAr: '3. بنية عنوان IPv4 وفئاته وعملية AND المنطقية',
            content: 'An IPv4 address has 32 binary bits. The subnet mask divides the address into Network and Host portions, and a bitwise AND of the address with the mask extracts the exact Network ID.',
            contentAr: 'عنوان IPv4 حجمه 32 بت مقسومة على 4 خانات، والقناع (Subnet Mask) هو اللي بيقسمه لجزء شبكة وجزء أجهزة. وبنعمل عملية AND المنطقية بين العنوان والقناع عشان نطلع عنوان الشبكة (Network ID).',
            bulletPoints: [
              'Class A: 1.0.0.0 to 126.255.255.255 (Default /8 mask: 255.0.0.0); 127.x.x.x is reserved for loopback.',
              'Class B: 128.0.0.0 to 191.255.255.255 (Default /16 mask: 255.255.0.0).',
              'Class C: 192.0.0.0 to 223.255.255.255 (Default /24 mask: 255.255.255.0).',
              'Bitwise AND Rule: Only 1 AND 1 produces 1. Applying AND between the IP and the Subnet Mask turns all host bits into 0s to identify the Network Address.'
            ],
            bulletPointsAr: [
              'فئة A: أول خانة من 1 لـ 126 وقناعها الافتراضي 255.0.0.0 (/8)، والـ 127.x.x.x محجوزة للـ Loopback.',
              'فئة B: أول خانة من 128 لـ 191 وقناعها الافتراضي 255.255.0.0 (/16).',
              'فئة C: أول خانة من 192 لـ 223 وقناعها الافتراضي 255.255.255.0 (/24).',
              'قاعدة الـ AND: الناتج بيبقى 1 بس لو الطرفين 1؛ ولما تعملها بين الـ IP والقناع بتصفّر بتات الأجهزة ويطلعلك عنوان الشبكة (Network Address).'
            ]
          }
        ],
        questions: [
          {
            id: 'q-net2-1',
            courseId: 'networks',
            lectureId: 'net-lec-2',
            type: 'mcq',
            question: 'What is the PDU name at the Transport Layer of the OSI model?',
            questionAr: 'وحدة البيانات (PDU) في طبقة النقل (Transport Layer) اسمها إيه؟',
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
            questionAr: 'لو عندك جهاز IP بتاعه 192.168.10.15 والقناع 255.255.255.0 (/24)، عنوان الـ Broadcast للشبكة دي كام؟',
            options: ['192.168.10.0', '192.168.10.1', '192.168.10.254', '192.168.10.255'],
            optionsAr: ['192.168.10.0', '192.168.10.1', '192.168.10.254', '192.168.10.255'],
            correctAnswer: 3,
            explanation: 'In a /24 network, the last octet is the host field. Setting all host bits to 1 yields .255, which is the directed broadcast address.',
            explanationAr: 'في قناع /24 الخانة الرابعة هي خانة الأجهزة؛ عشان تجيب عنوان الـ Broadcast خلّي بتات الأجهزة كلها 1 (يعني 255)، فيبقى العنوان 192.168.10.255.'
          },
          {
            id: 'q-net2-3',
            courseId: 'networks',
            lectureId: 'net-lec-2',
            type: 'true_false',
            question: 'The Network Address (all host bits 0) can be assigned to an active host workstation.',
            questionAr: 'ينفع تدي عنوان الشبكة (اللي بتات الأجهزة فيه كلها أصفار) كـ IP لجهاز كمبيوتر فعلي في الشبكة.',
            correctAnswer: false,
            explanation: 'False: The Network Address identifies the subnet itself, and the Broadcast Address is likewise reserved; neither can be assigned to an individual host.',
            explanationAr: 'غلط! عنوان الشبكة وعنوان الـ Broadcast محجوزين للشبكة ككل، ومينفعش أي جهاز ياخدهم.'
          }
        ]
      }
    ]
  },
  {
    id: 'ai',
    code: 'CS321',
    title: 'Artificial Intelligence',
    titleAr: 'الذكاء الاصطناعي',
    instructor: 'د. نسمة محمود',
    description: 'Foundations of intelligent systems, the historical timeline and AI Winters, the Turing Test and its 6 disciplines, the 4 major approaches to AI, and Rational Agents.',
    descriptionAr: 'أسس النظم الذكية، التسلسل التاريخي وفترات "شتاء الذكاء الاصطناعي" (AI Winters)، اختبار تورينج وتخصصاته الستة، المناهج الأربعة الرئيسية للذكاء الاصطناعي، والوكلاء العقلانيين.',
    term: 1,
    icon: 'Bot',
    isAvailable: true,
    lectures: [
      {
        id: 'ai-lec-1',
        courseId: 'ai',
        lectureNumber: 1,
        title: 'Introduction to AI, History & Rational Agents',
        titleAr: 'مدخل إلى الذكاء الاصطناعي وتاريخه والوكلاء العقلانيين',
        brief: 'Defining intelligence, milestones from 1943 to the present, the Turing Test and its 6 core disciplines, the 4 approaches to AI, and the difference between intelligent and rational agents.',
        briefAr: 'تعريف الذكاء، أهم محطات الذكاء الاصطناعي من 1943 لحد دلوقتي (ChatGPT)، اختبار تورينج وتخصصاته الستة، المناهج الأربعة للذكاء الاصطناعي، والفرق بين الوكيل الذكي والوكيل العقلاني.',
        durationMinutes: 35,
        interactiveTools: ['vacuum-world', 'turing-test'],
        cheatSheet: [
          {
            en: 'AI Definition (Oxford): Capacity of computers or machines to exhibit intelligent behavior, solve complex problems, and act autonomously.',
            ar: 'تعريف الذكاء الاصطناعي (حسب Oxford): قدرة الكمبيوتر أو الآلة على إظهار سلوك ذكي وحل المشاكل المعقدة والتصرف باستقلالية.'
          },
          {
            en: 'Human Intelligence Facets: Perception, Action, Reasoning, Learning, Communication, and Planning.',
            ar: 'مظاهر الذكاء الإنساني: الإدراك (Perception)، الفعل (Action)، الاستدلال (Reasoning)، التعلم (Learning)، التواصل (Communication)، والتخطيط (Planning).'
          },
          {
            en: 'Key Milestones: 1943 (McCulloch-Pitts neural model), 1950 (Turing paper), 1956 (Dartmouth conference coined "AI"), 1997 (Deep Blue defeated Kasparov), 2012 (AlexNet deep learning boom), 2022 (ChatGPT).',
            ar: 'محطات فارقة: 1943 (نموذج McCulloch-Pitts للخلية العصبية)، 1950 (ورقة تورينج واختبار تورينج)، 1956 (مؤتمر دارتموث وظهور مصطلح "AI")، 1997 (Deep Blue هزم كاسباروف في الشطرنج)، 2012 (طفرة الـ Deep Learning مع AlexNet)، 2022 (إطلاق ChatGPT).'
          },
          {
            en: 'AI Winter: Cycles of overpromising followed by disillusionment and funding cuts when unrealistic claims failed to materialize.',
            ar: 'شتاء الذكاء الاصطناعي (AI Winter): فترات ركود وتقليل تمويل جت بعد ما اتقالت وعود مبالغ فيها ومتحققتش على أرض الواقع.'
          },
          {
            en: 'Recent Breakthrough Drivers: 1) Advanced Algorithms (Transformers), 2) Big Data availability, 3) Specialized Compute (GPUs, TPUs).',
            ar: 'سر الطفرة الأخيرة في الذكاء الاصطناعي: 1) خوارزميات متطورة (Transformers)، 2) توفر كميات ضخمة من البيانات (Big Data)، 3) عتاد حسابي متخصص (GPUs و TPUs).'
          },
          {
            en: '4 AI Approaches: Thinking Humanly (Cognitive Modeling), Acting Humanly (Turing Test), Thinking Rationally (Laws of Thought logic), Acting Rationally (Rational Agents).',
            ar: 'مناهج الذكاء الاصطناعي الأربعة: التفكير كالبشر (Cognitive Modeling)، التصرف كالبشر (اختبار تورينج)، التفكير بعقلانية (قوانين التفكير / Laws of Thought)، والتصرف بعقلانية (الوكيل العقلاني، وده تركيز المقرر).'
          },
          {
            en: 'Core Principle: "All rational agents are intelligent, but not all intelligent agents are rational." Rationality focuses on achieving optimal outcomes.',
            ar: 'قاعدة ذهبية للامتحان: "كل وكيل عقلاني هو وكيل ذكي، بس مش كل وكيل ذكي يبقى عقلاني!" لأن العقلانية هدفها تحقيق أفضل نتيجة ممكنة، مش تقليد البشر وأخطاءهم.'
          }
        ],
        terms: [
          {
            term: 'Rational Agent',
            termAr: 'الوكيل العقلاني (اللي بياخد أصح قرار)',
            definition: 'An autonomous entity that acts to achieve the best outcome or, under uncertainty, the best expected outcome based on available knowledge.',
            definitionAr: 'برنامج أو روبوت مستقل بيختار التصرف اللي يحقق له أحسن نتيجة، أو أحسن نتيجة متوقعة لو فيه عدم يقين، بناءً على المعلومات المتاحة عنده.'
          },
          {
            term: 'Turing Test',
            termAr: 'اختبار تورينج (لعبة المحاكاة)',
            definition: 'Operational test of machine intelligence proposed by Alan Turing (1950) where an interrogator attempts to distinguish a human from a machine via text.',
            definitionAr: 'اختبار اقترحه آلان تورينج سنة 1950؛ محقق بشري بيتحاور كتابةً مع طرفين (إنسان وآلة)، ولو معرفش يفرّق بينهم تبقى الآلة عدّت الاختبار!'
          },
          {
            term: 'TPU (Tensor Processing Unit)',
            termAr: 'وحدة معالجة الموترات (شريحة جوجل)',
            definition: 'Custom ASIC chip designed by Google specifically to accelerate matrix multiplications in neural networks.',
            definitionAr: 'رقاقة مخصوصة (ASIC) صممتها جوجل عشان تسرّع عمليات ضرب المصفوفات في الشبكات العصبية بسرعة الصاروخ.'
          }
        ],
        sections: [
          {
            title: '1. What Is AI & What Drives the Modern Boom?',
            titleAr: '1. ما هو الذكاء الاصطناعي وسر الطفرة الحالية؟',
            content: 'Artificial Intelligence explores designing computational agents capable of perception, reasoning, and autonomous decision-making. The recent explosion stems from a synergy of three components:',
            contentAr: 'الذكاء الاصطناعي مش فكرة جديدة، وموجود من عشرات السنين، بس ليه انفجر دلوقتي فجأة وبقى في كل مكان؟ السر في اندماج 3 حاجات سوا:',
            bulletPoints: [
              'Advanced Algorithms: Deep neural networks, attention mechanisms, and reinforcement learning.',
              'Big Data: Petabytes of textual, auditory, and visual data generated daily across the web.',
              'Accelerated Hardware: Shifting from sequential CPUs to massively parallel GPUs (NVIDIA) and custom ASICs like Google TPUs.'
            ],
            bulletPointsAr: [
              'الخوارزميات المتطورة: الشبكات العصبية العميقة، وآليات الانتباه (Attention) في الـ Transformers، والتعلم المعزز.',
              'البيانات الضخمة: كميات هائلة (Petabytes) من النصوص والصور والصوتيات والفيديوهات اللي بتتولد يومياً على الإنترنت.',
              'العتاد فائق السرعة: الانتقال من المعالجات التسلسلية (CPU) لكروت الشاشة المتوازية (GPU) ورقاقات الـ TPU المتخصصة، وكل جيل بيعالج حجم عمليات أكبر في نفس الوقت.'
            ]
          },
          {
            title: '2. The Turing Test & the 6 Disciplines',
            titleAr: '2. اختبار تورينج والتخصصات الستة المطلوبة',
            content: 'Alan Turing proposed an operational definition of intelligence in 1950. A comprehensive "Total Turing Test" requires six core AI disciplines:',
            contentAr: 'آلان تورينج سأل سنة 1950: هل الآلة تقدر تفكر؟ وحط تعريف عملي للذكاء على شكل اختبار. وعشان الآلة تعدّي "اختبار تورينج الشامل" (Total Turing Test) لازم يبقى عندها 6 تخصصات أساسية:',
            bulletPoints: [
              'Natural Language Processing (NLP): For successful human communication.',
              'Knowledge Representation: To store what it perceives and knows.',
              'Automated Reasoning: To use stored facts to answer questions and draw logical deductions.',
              'Machine Learning: To adapt to new conditions and extrapolate patterns.',
              'Computer Vision: To perceive physical items and environments (Total Turing Test).',
              'Robotics: To manipulate objects and navigate physical space (Total Turing Test).'
            ],
            bulletPointsAr: [
              'معالجة اللغات الطبيعية (NLP): عشان تتواصل مع البشر بلغتهم الطبيعية.',
              'تمثيل المعرفة (Knowledge Representation): عشان تخزن اللي بتعرفه واللي بتستقبله.',
              'الاستدلال الآلي (Automated Reasoning): عشان تستنتج حلول وأجوبة من الحقائق المخزنة.',
              'التعلم الآلي (Machine Learning): عشان تتكيف مع الظروف الجديدة وتكتشف الأنماط وتعممها.',
              'الرؤية الحاسوبية (Computer Vision): عشان تشوف وتتعرف على الأشخاص والأشياء في الواقع (Total Turing Test).',
              'الروبوتات (Robotics): عشان تقدر تمسك الأشياء وتتحرك في البيئة الحقيقية (Total Turing Test).'
            ]
          },
          {
            title: '3. The 4 Approaches to AI & Rational Agents',
            titleAr: '3. المناهج الأربعة للذكاء الاصطناعي والوكلاء العقلانيين',
            content: 'The academic foundation of AI spans two axes: Thought vs Behavior, and Human vs Rational.',
            contentAr: 'علماء الذكاء الاصطناعي بيقسموا المناهج على محورين: (التفكير ولا السلوك الخارجي) و (تقليد البشر ولا العقلانية).',
            bulletPoints: [
              'Thinking Humanly: Cognitive science and neuroscience modeling mental faculties.',
              'Acting Humanly: The Turing Test approach to mimic human performance.',
              'Thinking Rationally: Laws of Thought syllogisms and deductive logic frameworks (e.g., all men are mortal, Socrates is a man, therefore Socrates is mortal). Hard to apply under real-world uncertainty.',
              'Acting Rationally: The Rational Agent approach, which is the focus of this course. Operates autonomously to achieve optimal goals under uncertainty.'
            ],
            bulletPointsAr: [
              'التفكير كالبشر: محاكاة العقل البشري بالدراسات العصبية والنفسية.',
              'التصرف كالبشر: اختبار تورينج؛ المهم إن السلوك يبان كأنه صادر من إنسان.',
              'التفكير بعقلانية: قوانين التفكير والمنطق الصارم لأرسطو (كل البشر فانون، وسقراط إنسان، إذاً سقراط فانٍ). عيبه: صعب يتطبق في الواقع العملي لأنه مليان عدم يقين.',
              'التصرف بعقلانية: منهج الوكيل العقلاني (Rational Agent) وهو محور المقرر ده؛ بيشتغل باستقلالية وهدفه يعمل الشيء الصح اللي يحقق الهدف بأحسن نتيجة ممكنة حتى مع عدم اليقين.'
            ]
          }
        ],
        questions: [
          {
            id: 'q-ai1-1',
            courseId: 'ai',
            lectureId: 'ai-lec-1',
            type: 'mcq',
            question: 'In which year was the Dartmouth Conference held, where the term "Artificial Intelligence" was formally adopted?',
            questionAr: 'مؤتمر دارتموث اللي اتولد فيه مصطلح "الذكاء الاصطناعي" رسمياً اتعمل سنة كام؟',
            options: ['1943', '1950', '1956', '1969'],
            optionsAr: ['1943', '1950', '1956', '1969'],
            correctAnswer: 2,
            explanation: 'In 1956, John McCarthy and fellow pioneers (Minsky, Rochester, Shannon) organized the Dartmouth conference, which adopted the name Artificial Intelligence.',
            explanationAr: 'في سنة 1956 جون ماكارثي وزمايله من رواد علم الكمبيوتر نظموا مؤتمر دارتموث واعتمدوا مصطلح "الذكاء الاصطناعي" (AI) رسمياً لأول مرة.'
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
            explanationAr: 'صح! العقلانية هدفها دايماً القرار الأمثل اللي يحقق الهدف، لكن الذكاء بشكل عام ممكن يقلد تصرفات البشر غير العقلانية أو قراراتهم اللي مش مثالية.'
          }
        ]
      }
    ]
  },
  {
    id: 'iot',
    code: 'CS331',
    title: 'Internet of Things (IoT)',
    titleAr: 'إنترنت الأشياء (IoT)',
    instructor: 'د. سارة شهاب',
    description: 'Foundations of connected cyber-physical systems, device vs sensor vs network, the 3-stage IoT data pipeline (Collect → Transmit → Analyze), smart applications, and scalability challenges.',
    descriptionAr: 'أساسيات إنترنت الأشياء والأنظمة المادية المتصلة (Cyber-Physical Systems)، الفرق بين الجهاز والحساس والشبكة، مراحل تدفق البيانات الثلاث (جمع ← نقل ← تحليل)، والتطبيقات الذكية وتحديات التوسع.',
    term: 1,
    icon: 'Cpu',
    isAvailable: true,
    lectures: [
      {
        id: 'iot-lec-1',
        courseId: 'iot',
        lectureNumber: 1,
        title: 'IoT Fundamentals, Architecture & Ecosystem',
        titleAr: 'أساسيات إنترنت الأشياء ومعماريته ومنظومته',
        brief: 'Defining devices, sensors, and networks, the 3-stage data flow pipeline, real-world case studies (Smart Agriculture, Healthcare, Smart Homes), and adoption challenges (security, interoperability, scalability).',
        briefAr: 'تعريف الجهاز والحساس والشبكة، مراحل تدفق البيانات الثلاث، دراسات حالة واقعية (الزراعة الذكية والرعاية الصحية والمنازل الذكية)، وتحديات التبني (الأمان والتوافقية وقابلية التوسع).',
        durationMinutes: 30,
        interactiveTools: ['edge-vs-cloud', 'iot-simulator'],
        cheatSheet: [
          {
            en: 'Device: Physical equipment or hardware designed for specific computing or electrical tasks.',
            ar: 'الجهاز (Device): أي قطعة عتاد فيزيائية متصممة لتنفيذ مهام حسابية أو كهربية معينة.'
          },
          {
            en: 'Sensor: Transducer detecting physical phenomena (heat, moisture, light, motion) and converting them into measurable electrical/digital signals.',
            ar: 'الحساس (Sensor): جهاز بيلتقط الظواهر الفيزيائية (حرارة، رطوبة، ضوء، حركة) ويحولها لإشارة كهربية أو قراءة رقمية قابلة للقياس.'
          },
          {
            en: 'The 3-Stage Pipeline: 1) Sensors Collect → 2) Connectivity Transmits → 3) Cloud/Edge Analyzes.',
            ar: 'المراحل الثلاث: 1) الحساس بيجمع ← 2) الشبكة بتنقل ← 3) الـ Cloud أو الـ Edge بتحلل وتبعت أمر للمشغل (Actuator).'
          },
          {
            en: 'Actuator: Hardware element converting digital control commands into real-world physical motion/action (e.g., valves, relays, alarms).',
            ar: 'المشغل (Actuator): عكس الحساس؛ بياخد الأمر الرقمي وينفذه كحركة أو فعل حقيقي، زي فتح محبس المية أو تشغيل صفارة الإنذار.'
          },
          {
            en: 'Core Adoption Challenges: Data Security & Privacy, Interoperability between diverse vendors, and Scalability across billions of nodes.',
            ar: 'أكبر التحديات: الأمان وخصوصية البيانات، التوافقية بين شركات الأجهزة المختلفة (Interoperability)، وقابلية التوسع (Scalability) لمليارات الأجهزة.'
          }
        ],
        terms: [
          {
            term: 'Sensor (Transducer)',
            termAr: 'الحساس (المستشعر)',
            definition: 'Device that senses physical input from the environment and converts it into readable digital telemetry.',
            definitionAr: 'عين وأذن النظام؛ بيقيس الحرارة أو الرطوبة أو الحركة ويحولها لأرقام في الكمبيوتر.'
          },
          {
            term: 'Actuator',
            termAr: 'المشغل (المنفذ الحركي)',
            definition: 'Mechanism responsible for moving or controlling a physical system in response to digital signals.',
            definitionAr: 'إيد ورجل النظام؛ بينفذ الفعل المادي في الواقع زي تشغيل التكييف أو فتح البوابة.'
          },
          {
            term: 'Interoperability',
            termAr: 'التوافقية والتشغيل البيني',
            definition: 'Ability of diverse software and hardware systems from multiple manufacturers to exchange data seamlessly.',
            definitionAr: 'قدرة أجهزة وأنظمة من شركات مختلفة (زي سامسونج وأبل وسيسكو) إنها تتفاهم وتتبادل البيانات مع بعض من غير مشاكل.'
          }
        ],
        sections: [
          {
            title: '1. IoT Definition & the Three Core Components',
            titleAr: '1. تعريف إنترنت الأشياء ومكوناته الثلاثة الأساسية',
            content: 'The Internet of Things describes a global ecosystem of physical items embedded with sensing and networking technology. It is fundamentally built on three pillars:',
            contentAr: 'إنترنت الأشياء هو ربط الأشياء اللي حوالينا في العالم الحقيقي بالإنترنت عشان تتبادل البيانات وتشتغل لوحدها من غير ما تفضل تضغط على زراير كل شوية! وهو متبني على 3 أعمدة أساسية:',
            bulletPoints: [
              'Sensors: Collect environmental telemetry without human intervention.',
              'Devices: Edge hardware executing embedded software.',
              'Networks: Communication infrastructure transporting packets to central or edge brokers.'
            ],
            bulletPointsAr: [
              'الحساسات (Sensors): بتجمع قراءات البيئة المحيطة تلقائياً من غير تدخل بشري.',
              'الأجهزة (Devices): العتاد والشرائح اللي بتشغل البرامج المدمجة.',
              'الشبكات (Networks): بنية الاتصال اللي بتنقل الحزم لوسيط (Broker) مركزي أو قريب من الجهاز (Edge).'
            ]
          },
          {
            title: '2. The 3-Stage Telemetry Pipeline',
            titleAr: '2. مراحل تدفق بيانات الحساسات الثلاث',
            content: 'Every IoT application runs a continuous three-stage loop:',
            contentAr: 'أي نظام إنترنت أشياء بيشتغل في دايرة متكررة من 3 مراحل:',
            bulletPoints: [
              '1. Sensors Collect: Analog signals are sampled into digital metrics.',
              '2. Connectivity Transmits: Cellular, Wi-Fi, LoRaWAN, or BLE forward messages.',
              '3. Cloud Analyzes: Rule engines evaluate safety thresholds and dispatch instructions to actuators.'
            ],
            bulletPointsAr: [
              '1. الحساسات تجمع: التقاط القراءة وتحويلها لأرقام.',
              '2. الشبكة تنقل: بالشبكات الخلوية (Cellular/5G) أو Wi-Fi أو LoRaWAN أو BLE.',
              '3. السحابة تحلل: محرك القواعد (Rule Engine) بيقارن القراءة بالحدود الآمنة ويبعت أوامر التشغيل للمشغل (Actuator).'
            ]
          }
        ],
        questions: [
          {
            id: 'q-iot1-1',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'mcq',
            question: 'Which component is responsible for converting digital control decisions into physical actions in the real environment?',
            questionAr: 'أنهي مكون في منظومة الـ IoT مسؤول عن تحويل قرار التحكم الرقمي لفعل مادي حقيقي في البيئة؟',
            options: ['Sensor', 'Gateway Router', 'Actuator', 'Cloud Database'],
            optionsAr: ['الحساس (Sensor)', 'راوتر البوابة (Gateway Router)', 'المشغل (Actuator)', 'قاعدة بيانات سحابية (Cloud Database)'],
            correctAnswer: 2,
            explanation: 'Actuators receive commands from computing nodes and execute physical work (e.g., closing valves, sounding alarms, activating motors).',
            explanationAr: 'المشغل (Actuator) هو اللي بينفذ الفعل الحركي، زي قفل محبس المية أو تشغيل صفارة الإنذار أو تشغيل الموتور.'
          }
        ]
      }
    ]
  },
  {
    id: 'windows-programming',
    code: 'CS341',
    title: 'Visual & Windows Programming',
    titleAr: 'البرمجة المرئية وبرمجة تطبيقات Windows',
    instructor: 'هيئة التدريس',
    description: 'Desktop GUI application development using C# and the Microsoft .NET Framework, Windows Forms, event-driven programming, and database connectivity.',
    descriptionAr: 'تطوير تطبيقات سطح المكتب ذات الواجهات الرسومية (GUI) باستخدام لغة C# وإطار عمل Microsoft .NET وتقنية Windows Forms، وبرمجة الأحداث (Event-Driven)، والاتصال بقواعد البيانات.',
    term: 1,
    icon: 'Layout',
    isAvailable: false,
    lectures: []
  },
  {
    id: 'database-systems',
    code: 'CS351',
    title: 'Database Systems & Design',
    titleAr: 'نظم قواعد البيانات وتصميمها',
    instructor: 'هيئة التدريس',
    description: 'Relational data modeling, Entity-Relationship Diagrams (ERD), normalization rules, advanced SQL querying, transactions, and concurrency.',
    descriptionAr: 'النمذجة العلائقية للبيانات، مخططات الكيانات والعلاقات (ERD)، قواعد الـ Normalization، استعلامات SQL المتقدمة، والمعاملات (Transactions) والتزامن (Concurrency).',
    term: 1,
    icon: 'Database',
    isAvailable: false,
    lectures: []
  },
  {
    id: 'software-engineering',
    code: 'CS361',
    title: 'Software Engineering & Lifecycle',
    titleAr: 'هندسة البرمجيات ودورة حياة التطوير',
    instructor: 'هيئة التدريس',
    description: 'Software development life cycle models and methodologies (Waterfall, Agile, Scrum), requirements engineering, UML modeling, testing methodologies, and project management.',
    descriptionAr: 'نماذج ومنهجيات دورة حياة تطوير البرمجيات (Waterfall و Agile و Scrum)، هندسة المتطلبات، النمذجة بـ UML، منهجيات الاختبار، وإدارة المشروعات.',
    term: 1,
    icon: 'FolderKanban',
    isAvailable: false,
    lectures: []
  }
];

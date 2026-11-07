import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'networks',
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
    ],
    sheets: [
      {
        id: 'net-sheet-1',
        courseId: 'networks',
        sheetNumber: 1,
        title: 'Sheet 1: Network Fundamentals & Topologies',
        titleAr: 'شيت 1: أساسيات الشبكات والتخطيط الطوبولوجي (Topologies)',
        brief: 'Fundamental questions on LAN vs WAN, star/mesh topologies, and OSI model layers.',
        briefAr: 'تمارين عملية ومسائل مقارنة على شبكات LAN و WAN، طوبولوجيا النجمة والشبكة الكاملة (Star vs Mesh)، وطبقات نموذج OSI.',
        problemsCount: 3,
        hasSolution: true,
        problems: [
          {
            id: 'p-net1-1',
            problemNumber: 1,
            question: 'Calculate the total number of physical duplex links required to build a Fully-Connected Mesh topology containing N = 8 host nodes.',
            questionAr: 'احسب عدد الكابلات (Physical Links) المطلوبة لعمل شبكة كاملة التوصيل (Full Mesh Topology) بين 8 أجهزة.',
            solution: 'Formula: Links = N * (N - 1) / 2. For N = 8: Links = 8 * 7 / 2 = 28 full-duplex cables.',
            solutionAr: 'القانون: Links = N * (N - 1) / 2. تعويض مباشر لـ 8 أجهزة: 8 × 7 ÷ 2 = 28 كابل اتصال مباشر.'
          },
          {
            id: 'p-net1-2',
            problemNumber: 2,
            question: 'Compare Star topology with Bus topology regarding single-point of failure and ease of troubleshooting.',
            questionAr: 'قارن بين طوبولوجيا النجمة (Star) والخط الناقل (Bus) من حيث نقطة الانهيار الفردية (Single Point of Failure) وسهولة تحديد الأعطال.',
            solution: 'In Star topology, central switch/hub is a single point of failure; cable failure only affects one node. In Bus topology, cable break halts the whole network; Star is much easier to isolate and troubleshoot.',
            solutionAr: 'في شبكة Star: نقطة العطل الوحيدة هي السويتش المركزي (لو وقع الشبكة كلها تفصل، بس لو سلك جهاز اتقطع الباقي شغال). في شبكة Bus: لو الكابل الرئيسي اتقطع من أي مكان الشبكة كلها بتقع فوراً. بالتالي Star أسهل بكتير في تتبع الأعطال وعزلها.'
          },
          {
            id: 'p-net1-3',
            problemNumber: 3,
            question: 'Which OSI layers add headers and which layer adds both a header and a trailer to data packets?',
            questionAr: 'أنهي طبقات في نموذج OSI بتضيف Header (ترويسة)، وأنهي طبقة بالذات بتضيف Header و Trailer معاً؟',
            solution: 'Layers 6 down to 3 add specific headers (Presentation, Session, Transport, Network). The Data Link Layer (Layer 2) adds both a Frame Header and a Frame Trailer (FCS / CRC checksum).',
            solutionAr: 'الطبقات من 6 لحد 3 بتضيف Headers خاصة بيها. الطبقة الوحيدة اللي بتضيف ترويسة وخاتمة (Header & Trailer) هي طبقة ربط البيانات (Data Link Layer - Layer 2)، والـ Trailer بيكون فيه كود فحص الأخطاء (CRC/FCS).'
          }
        ]
      },
      {
        id: 'net-sheet-2',
        courseId: 'networks',
        sheetNumber: 2,
        title: 'Sheet 2: IPv4 Subnetting & CIDR Calculation',
        titleAr: 'شيت 2: تقسيم الشبكات وحسابات الـ Subnetting و CIDR',
        brief: 'Practical problems calculating network ID, broadcast address, valid host range, and VLSM designs.',
        briefAr: 'مسائل حسابية على استخراج عنوان الشبكة، عنوان البث (Broadcast)، نطاق العناوين الصالحة للأجهزة، وقناع الشبكة بالبادئة /CIDR.',
        problemsCount: 2,
        hasSolution: true,
        problems: [
          {
            id: 'p-net2-1',
            problemNumber: 1,
            question: 'For IP 172.16.45.10 / 20: Determine (a) Subnet Mask in dotted decimal, (b) Network Address, and (c) Directed Broadcast Address.',
            questionAr: 'للعنوان 172.16.45.10 / 20: اوجد (أ) قناع الشبكة (Subnet Mask)، (ب) عنوان الشبكة (Network Address)، (ج) عنوان البث (Broadcast Address).',
            solution: '(a) Mask: /20 = 255.255.240.0. (b) Block size = 256 - 240 = 16. In 3rd octet: 45 / 16 gives interval 32..47. Network Address = 172.16.32.0. (c) Broadcast Address = 172.16.47.255.',
            solutionAr: '(أ) القناع: /20 يعني 255.255.240.0. (ب) حجم القفزة (Block size) = 256 - 240 = 16 في الخانة التالتة. مضاعفات الـ 16 الأقرب لـ 45 هي 32، يبقى عنوان الشبكة 172.16.32.0. (ج) عنوان الـ Broadcast هو آخر عنوان في النطاق = 172.16.47.255.'
          },
          {
            id: 'p-net2-2',
            problemNumber: 2,
            question: 'An organization needs 5 subnets, each requiring at least 25 usable host IP addresses. Which CIDR mask should be chosen starting from a Class C /24 network?',
            questionAr: 'مؤسسة محتاجة تقسم شبكة Class C (/24) لـ 5 شبكات فرعية على الأقل، وكل شبكة تستوعب 25 جهاز على الأقل. ما هو قناع الـ CIDR المناسب؟',
            solution: 'Need 5 subnets -> borrow 3 subnet bits (2^3 = 8 >= 5). Remaining host bits = 8 - 3 = 5. Usable hosts = 2^5 - 2 = 30 >= 25. Thus, new mask is /24 + 3 = /27 (255.255.255.224).',
            solutionAr: 'محتاجين 5 شبكات -> نستلف 3 بتات للشبكات (2³ = 8 شبكات، تكفي وزيادة). يتبقى للأجهزة 5 بتات (2⁵ - 2 = 30 جهاز صالح لكل شبكة). إذن القناع هو /24 + 3 = /27 (255.255.255.224).'
          }
        ]
      }
    ]
  },
  {
    id: 'ai',
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
    ],
    sheets: [
      {
        id: 'ai-sheet-1',
        courseId: 'ai',
        sheetNumber: 1,
        title: 'Sheet 1: Intelligent Agents & PEAS Formalization',
        titleAr: 'شيت 1: الوكلاء الأذكياء وتوصيف بيئة PEAS',
        brief: 'Exercises covering the 4 approaches to AI, Turing Test criteria, and complete PEAS design for automated systems.',
        briefAr: 'تمارين على المناهج الأربعة للذكاء الاصطناعي، شروط اختبار تورينج، وتوصيف منظومة PEAS لأنظمة القيادة الذاتية والمساعد الطبي.',
        problemsCount: 2,
        hasSolution: true,
        problems: [
          {
            id: 'p-ai1-1',
            problemNumber: 1,
            question: 'Formalize the PEAS environment (Performance, Environment, Actuators, Sensors) for an Autonomous Taxi Agent.',
            questionAr: 'اكتب التوصيف الكامل لبيئة PEAS (الأداء، البيئة، المشغلات، الحساسات) لتاكسي ذاتي القيادة (Autonomous Taxi).',
            solution: 'Performance: Safety, speed, legal compliance, passenger comfort, fuel efficiency. Environment: City streets, pedestrians, traffic, weather, customers. Actuators: Steering, accelerator, brakes, horn, display/voice. Sensors: Cameras, LIDAR, radar, speedometer, GPS, sonar.',
            solutionAr: 'الأداء (Performance): الأمان، الوصول في وقت معقول، الالتزام بقواعد المرور، راحة الراكب، وتوفير استهلاك الوقود. البيئة (Environment): شوارع المدينة، المشاة، العربيات المجاورة، إشارات المرور، وتقلبات الطقس. المشغلات (Actuators): عجلة القيادة، دواسة البنزين، الفرامل، الكلاكس، وشاشة التوجيه. الحساسات (Sensors): الكاميرات، حساسات LIDAR، الرادار، عداد السرعة، والـ GPS.'
          },
          {
            id: 'p-ai1-2',
            problemNumber: 2,
            question: 'Classify the Autonomous Taxi environment across the 6 environment dimensions: Observable, Deterministic, Episodic, Static, Discrete, and Single/Multi-agent.',
            questionAr: 'صنف بيئة التاكسي ذاتي القيادة عبر الأبعاد الستة للبيئات: هل هي (Partially Observable, Stochastic, Sequential, Dynamic, Continuous, Multi-agent)؟ مع ذكر السبب.',
            solution: 'Partially Observable (cannot see around corners), Stochastic (traffic/pedestrian actions have random factors), Sequential (current driving decisions affect future road state), Dynamic (world moves while deciding), Continuous (speed and distance are real numbers), Multi-agent (other vehicles/pedestrians act independently).',
            solutionAr: 'Partially Observable: مش شايف اللي ورا الملفات أو المباني. Stochastic: حركة المرور والمشاة فيها تصرفات غير متوقعة. Sequential: كل خطوة قيادة بتاثر على اللي بعدها. Dynamic: الشارع بيتغير وانت بتفكر وبتتحرك. Continuous: السرعة والمسافات أرقام مستمرة مش درجات منفصلة. Multi-agent: بتتعامل مع سواقين ومشاة تانيين حواليك.'
          }
        ]
      }
    ]
  },
  {
    id: 'iot',
    title: 'Internet of Things (IoT)',
    titleAr: 'إنترنت الأشياء (IoT)',
    instructor: 'د. سارة شهاب',
    description: 'Foundations of connected cyber-physical systems, device vs sensor vs network, the 3-stage IoT data pipeline (Collect → Transmit → Analyze), OSI & TCP/IP stack models, TCP vs UDP protocols, and the 5-layer IoT architecture designed for constrained edge nodes.',
    descriptionAr: 'أسس النظم المادية السيبرانية (Cyber-Physical Systems)، الفروق الجوهرية بين الأجهزة والحساسات والشبكات، مراحل تدفق البيانات الثلاث، نماذج الطبقات OSI و TCP/IP، صراع بروتوكولات النقل TCP و UDP، والمعمارية الخماسية لطبقات إنترنت الأشياء المصممة للأجهزة المحدودة الموارد.',
    term: 1,
    icon: 'Cpu',
    isAvailable: true,
    lectures: [
      {
        id: 'iot-lec-1',
        courseId: 'iot',
        lectureNumber: 1,
        title: 'IoT Fundamentals, Architecture & Ecosystem',
        titleAr: 'أساسيات إنترنت الأشياء، المعمارية والمنظومة الشاملة',
        brief: 'Core definitions of Devices, Sensors, and Networks, the 3-stage data flow loop (Collect → Transmit → Analyze), 4 major industry case studies (Smart Agriculture, Healthcare, Smart Homes, Industry 4.0), and the 3 grand adoption challenges.',
        briefAr: 'المفاهيم التأسيسية الثلاثة (الجهاز، الحساس، والشبكة)، دورة تدفق البيانات الثلاثية (جمع ← نقل ← تحليل)، دراسات الحالة في الزراعة والصناعة والصحة والمنازل، وتحديات التبني الكبرى الثلاث وحلولها الهندسية.',
        durationMinutes: 35,
        interactiveTools: ['edge-vs-cloud', 'iot-simulator'],
        cheatSheet: [
          {
            en: 'Device vs Sensor vs Network: Device is hardware executing computing tasks; Sensor converts physical phenomena into measurable signals; Network is the interconnected communication mesh.',
            ar: 'الثلاثي التأسيسي: الجهاز (Device) عتاد بيشغل برامج، والحساس (Sensor) محول طاقة بيحول الظاهرة الفيزيائية لإشارة رقمية، والشبكة (Network) هي حلقة الوصل لنقل البيانات.'
          },
          {
            en: 'The 3 Essential Pillars: Every IoT system is fundamentally built upon exactly three components: Devices, Sensors, and Networks (Databases and Cloud are backend destinations).',
            ar: 'الأركان الثلاثة: منظومة الـ IoT مبنية علمياً على 3 أركان حتمية فقط: أجهزة (Devices)، حساسات (Sensors)، وشبكات (Networks).'
          },
          {
            en: 'Autonomy: IoT devices connect and exchange data across the internet primarily WITHOUT human intervention (M2M automation).',
            ar: 'العمل المستقل: أجهزة الـ IoT بتتبادل البيانات عبر الإنترنت بشكل ذاتي تماماً دون اشتراط أي تدخل بشري مستمر (M2M).'
          },
          {
            en: 'The 3-Stage Pipeline: 1. Sensors Collect (physical sampling) → 2. Connectivity Transmits (cellular, Wi-Fi, LoRaWAN) → 3. Cloud/Edge Analyzes (rule engine and ML).',
            ar: 'دورة البيانات الثلاثية: 1. الحساسات تجمع (Sensors Collect) ← 2. الشبكة تنقل (Connectivity Transmits) ← 3. السحابة تحلل (Cloud Analyzes).'
          },
          {
            en: 'Actuator vs Sensor: Sensor detects environment (input); Actuator executes physical actions like opening valves, sounding sirens, or driving motors (output).',
            ar: 'الحساس مقابل المشغل: الحساس عين وأذن المنظومة (مدخلات)، والمشغل (Actuator) إيد ورجل المنظومة اللي بتنفذ الفعل الحركي زي فتح المحابس أو تشغيل المحركات (مخرجات).'
          },
          {
            en: 'Adoption Solutions: Interoperability solved by standardized open protocols; Security solved by end-to-end encryption and PKI; Scalability/Latency solved by Edge Computing.',
            ar: 'حلول عقبات التبني: التوافقية (Interoperability) حلها بروتوكولات معيارية مفتوحة، الأمان حله التشفير الشامل، وضغط البيانات وزمن الاستجابة حله معالجة الحافة (Edge Computing).'
          }
        ],
        terms: [
          {
            term: 'Device',
            termAr: 'الجهاز (Hardware Device)',
            definition: 'Any piece of physical equipment or hardware designed to perform specific functions or run embedded software (e.g., microcontrollers, SBCs, appliances).',
            definitionAr: 'أي قطعة عتاد فيزيائية مصممة لتأدية وظيفة معينة وتشغيل كود مدمج زي المتحكمات الدقيقة والغسالات الذكية والأجهزة الذكية.'
          },
          {
            term: 'Sensor (Transducer)',
            termAr: 'الحساس / المستشعر',
            definition: 'A hardware transducer that detects physical input from the real environment (heat, light, moisture, vibration) and converts it into measurable electrical signals.',
            definitionAr: 'محول طاقة فيزيائي بيلتقط ظواهر الواقع المحيط (حرارة، رطوبة، ضوء، ضغط) ويحولها لإشارة كهربية ورقمية قابلة للقياس.'
          },
          {
            term: 'Actuator',
            termAr: 'المشغل / المنفذ الحركي',
            definition: 'A mechanical or electrical device that converts digital control decisions into real physical action (e.g., closing a valve, turning a motor, triggering a relay).',
            definitionAr: 'عنصر التنفيذ الحركي اللي بيستقبل أوامر التحكم الرقمية ويحولها لفعل مادي حقيقي في البيئة، زي قفل محبس المياه أو تشغيل محرك.'
          },
          {
            term: 'Network',
            termAr: 'الشبكة',
            definition: 'A collection of interconnected computing nodes and links that communicate and share resources, packets, and telemetry using common protocol standards.',
            definitionAr: 'مجموعة من الأجهزة المتصلة ببعضها بكابلات أو لاسلكياً، قادرة على تبادل حزم البيانات والرسائل ومشاركة الموارد وفق معايير موحدة.'
          },
          {
            term: 'Interoperability',
            termAr: 'التوافقية والتشغيل البيني',
            definition: 'The capability of diverse hardware devices and software platforms from competing manufacturers to seamlessly communicate without custom translation gateways.',
            definitionAr: 'قدرة أجهزة وأنظمة مصنعة من شركات مختلفة ومتنافسة (HP, Cisco, Samsung) إنها تتكلم وتفهم بعض بسلاسة باستخدام معايير موحدة.'
          },
          {
            term: 'Edge Computing',
            termAr: 'معالجة الحافة',
            definition: 'Processing and filtering telemetry locally on edge gateways or microcontrollers situated near the physical data source, minimizing latency and cloud bandwidth.',
            definitionAr: 'معالجة وتصفية قراءات الحساسات محلياً بالقرب من مكان توليدها (زي الراوتر أو رازبيري باي) لتقليل زمن التأخير وتوفير باندويث الإنترنت.'
          }
        ],
        sections: [
          {
            title: '1. The Foundational Triple: Device, Sensor, and Network',
            titleAr: '1. الثلاثي التأسيسي لإنترنت الأشياء: الجهاز، الحساس، والشبكة',
            content: 'The Internet of Things (IoT) is not a single technology; it is an integrated paradigm uniting three distinct pillars: Devices, Sensors, and Networks.',
            contentAr: 'إنترنت الأشياء (IoT) مش مجرد تطبيق عادي، ده منظومة متكاملة مبنية علمياً على 3 أركان حتمية لازم يشتغلوا في تناغم تام: الأجهزة (Devices)، الحساسات (Sensors)، والشبكات (Networks).',
            bulletPoints: [
              'Device: Physical hardware engineered to run embedded tasks and local control software.',
              'Sensor: Physical transducer that samples real-world phenomena (temperature, smoke, motion) and converts them into measurable digital values.',
              'Network: Communication fabric enabling seamless packet exchange between endpoints without manual human bridging.',
              'Crucial Boundary: Memory storage or cloud databases are backend destinations, NOT one of the 3 primary architectural pillars of the IoT ecosystem.'
            ],
            bulletPointsAr: [
              'الجهاز (Device): قطعة العتاد المادي المسؤولة عن تشغيل البرامج ومعالجة التعليمات محلياً.',
              'الحساس (Sensor): محول طاقة متخصص بيلتقط المتغيرات الفيزيائية (حرارة، دخان، حركة) ويحولها لقيم رقمية نقدر نقيسها ونحللها.',
              'الشبكة (Network): وسيط الاتصال السلكي أو اللاسلكي اللي بيوصل الحزم بين الأجهزة السحابية والطرفية من غير ما يحتاج إنسان يوصل الأسلاك بنفسه.',
              'خد بالك في الامتحان: قواعد البيانات (Databases) والسحابة (Cloud) مخازن خلفية، ومش من ضمن الأركان الثلاثة التأسيسية لمنظومة إنترنت الأشياء.'
            ],
            keyRule: 'Every IoT ecosystem is fundamentally constructed upon exactly three pillars: Devices, Sensors, and Networks.',
            keyRuleAr: 'قاعدة امتحانية: منظومة إنترنت الأشياء قائمة علمياً على 3 أركان أساسية لا غير: (Devices, Sensors, Networks).',
            quickCheck: {
              question: 'According to Lecture 1 Slide 5, which triad forms the indispensable foundational components of any IoT ecosystem?',
              questionAr: 'وفقاً للسلايد 5 من المحاضرة، أي ثلاثي يمثل الأركان التأسيسية التي لا غنى عنها لأي منظومة إنترنت أشياء؟',
              options: ['Devices, Sensors, Networks', 'Sensors, Cloud Storage, SQL Databases', 'Microcontrollers, Web Servers, Fiber Optics', 'Operating Systems, Edge Gateways, Mobile Apps'],
              optionsAr: ['الأجهزة، الحساسات، والشبكات (Devices, Sensors, Networks)', 'الحساسات، التخزين السحابي، وقواعد بيانات SQL', 'المتحكمات الدقيقة، خوادم الويب، وكابلات الفايبر', 'أنظمة التشغيل، بوابات الحافة، وتطبيقات الموبايل'],
              correctIndex: 0,
              explanation: 'Slide 5 explicitly establishes Devices, Sensors, and Networks as the core triad. Databases and cloud servers are destinations in the telemetry pipeline, not one of the 3 foundational pillars.',
              explanationAr: 'السلايد رقم 5 حددت نصاً إن الثلاثي الأساسي لمنظومة الـ IoT هو: الحساسات (Sensors)، الأجهزة (Devices)، والشبكات (Networks)؛ بينما السحابة وقواعد البيانات دي وسائط تخزين وتحليل.'
            }
          },
          {
            title: '2. The 3-Stage Telemetry Pipeline: Collect → Transmit → Analyze',
            titleAr: '2. دورة تدفق البيانات الثلاثية: جمع ← نقل ← تحليل',
            content: 'All IoT deployments execute a continuous, closed-loop telemetry flow that transforms raw real-world physics into automated actuation decisions.',
            contentAr: 'أي مشروع إنترنت أشياء في العالم بيشتغل داخل دورة مغلقة ومستمرة مكونة من 3 مراحل مرتبة بالتسلسل، بتحول المتغير الفيزيائي لقرار تحكم آلي:',
            bulletPoints: [
              'Stage 1 (Sensors Collect): Transducers convert continuous ambient physical changes into calibrated digital telemetry without needing manual human triggering.',
              'Stage 2 (Connectivity Transmits): Network protocols (Cellular 4G/5G, Wi-Fi, LoRaWAN, BLE) route serialized payloads toward local brokers or cloud ingest endpoints.',
              'Stage 3 (Cloud Analyzes): Streaming analytics, AI inference, and threshold rule engines evaluate conditions and send feedback commands to physical Actuators.',
              'Feedback Loop: Actuators execute mechanical operations (valves, motors, sirens), modifying the physical environment and completing the cyber-physical cycle.'
            ],
            bulletPointsAr: [
              'المرحلة الأولى (Sensors Collect): الحساسات بتجمع القراءات الفيزيائية تلقائياً من البيئة وتحولها لأرقام من غير ما تنتظر إنسان يدوس على زرار.',
              'المرحلة الثانية (Connectivity Transmits): الشبكة بتنقل الحزم الرقمية عبر بروتوكولات الاتصال (Wi-Fi, 5G, LoRaWAN) للملقمات السحابية أو الطرفية.',
              'المرحلة الثالثة (Cloud Analyzes): السحابة بتحلل القراءات وتقارنها بالحدود الآمنة، وتبعت أمر التشغيل للمشغلات (Actuators) عشان تنفذ الفعل المطلوب.',
              'اكتمال الدورة: المشغلات بتتحرك في الواقع (قفل محبس، تشغيل تبريد)، فتتغير قراءة الحساسات، وتتكرر الدورة المغلقة تلقائياً.'
            ],
            keyRule: 'Exact operational pipeline: Sensors Collect → Connectivity Transmits → Cloud Analyzes (never reverse or mix stages).',
            keyRuleAr: 'ترتيب دورة الـ IoT في الامتحان ثابت لا يتغير: الحساسات تجمع ← الشبكة تنقل ← السحابة تحلل.',
            quickCheck: {
              question: 'What is the correct sequential order of the IoT telemetry data pipeline described in Slide 7 & 8?',
              questionAr: 'ما هو الترتيب الزمني الصحيح لدورة حياة بيانات إنترنت الأشياء الموضحة في السلايد 7 و 8؟',
              options: ['Collect → Transmit → Analyze', 'Transmit → Analyze → Collect', 'Analyze → Collect → Transmit', 'Collect → Analyze → Transmit'],
              optionsAr: ['التجميع (Collect) ← النقل (Transmit) ← التحليل (Analyze)', 'النقل (Transmit) ← التحليل (Analyze) ← التجميع (Collect)', 'التحليل (Analyze) ← التجميع (Collect) ← النقل (Transmit)', 'التجميع (Collect) ← التحليل (Analyze) ← النقل (Transmit)'],
              correctIndex: 0,
              explanation: 'The fundamental pipeline follows a strict physical-to-digital chronological sequence: 1. Collect (via Sensors) → 2. Transmit (via Gateways/Protocols) → 3. Analyze (in the Cloud/Edge).',
              explanationAr: 'الدورة بتمشي بترتيب زمني صارم: أولاً الحساسات بتجمع الداتا الفيزيائية (Collect)، ثانياً الشبكة بتنقلها (Transmit)، ثالثاً المنصة السحابية بتحللها وتتخذ القرار (Analyze).'
            }
          },
          {
            title: '3. Real-World Applications: Smart Agriculture, Smart Homes & Industry 4.0',
            titleAr: '3. دراسات الحالة الواقعية: الزراعة الذكية، المنازل الذكية، والثورة الصناعية 4.0',
            content: 'IoT adoption is transforming global infrastructure with over 14 billion connected devices operating by 2025 across critical sectors.',
            contentAr: 'تطبيقات الـ IoT تعدت الـ 14 مليار جهاز متصل في 2025 وبتغطي 4 قطاعات صناعية واقتصادية رئيسية:',
            bulletPoints: [
              'Smart Agriculture: Soil moisture sensors, weather stations, and autonomous drones optimize irrigation and fertilizer, demonstrably increasing crop yield by over 20%.',
              'Smart Healthcare: Wearable vital monitors, remote patient telemetry, and automated insulin pumps improve clinical outcomes and enable continuous telemedicine.',
              'Smart Homes: Interconnected ambient lighting, smart thermostats, and automated security systems reduce energy consumption and elevate occupant comfort.',
              'Industry 4.0 (Industrial IoT): Vibration and temperature sensors on heavy factory machinery detect micro-wear, enabling Predictive Maintenance before catastrophic failures occur.'
            ],
            bulletPointsAr: [
              'الزراعة الذكية (Smart Agriculture): حساسات رطوبة التربة والدرونز بتوفر مياه الري والتسميد بدقة، ورفعت إنتاجية المحاصيل بأكتر من 20 في المية (زي تجارب John Deere).',
              'الرعاية الصحية (Smart Healthcare): متابعة المؤشرات الحيوية للمرضى عن بعد ومضخات الأنسولين الذكية اللي بتنقذ حياة المرضى وبتفعل التطبيب عن بعد.',
              'المنازل الذكية (Smart Homes): التحكم الآلي في الإضاءة والتكييفات وحساسات الأبواب لتوفير استهلاك الكهرباء وتأمين المنازل.',
              'الثورة الصناعية الرابعة (Industry 4.0): حساسات الاهتزاز والحرارة في الماكينات بتعمل صيانة تنبؤية (Predictive Maintenance) قبل ما الماكينة تتعطل فجأة وتوقف المصنع.'
            ],
            keyRule: 'Precision Agriculture deploys soil sensors and drones to directly increase crop yield sustainably by over 20%.',
            keyRuleAr: 'الزراعة الذكية بتستخدم حساسات رطوبة التربة والدرونز لرفع إنتاجية المحاصيل بنسبة تتجاوز 20% مع توفير الموارد.',
            quickCheck: {
              question: 'In smart agriculture and precision farming, why are soil moisture sensors coupled with automated water valves?',
              questionAr: 'في تطبيقات الزراعة الذكية، لماذا يتم ربط حساسات رطوبة التربة بمحابس الري التلقائية؟',
              options: ['To replace human intervention and optimize water consumption based on real-time soil telemetry', 'To increase water wastage intentionally', 'Because sensors cannot function without water pipes', 'To format sensor data into CSV files only'],
              optionsAr: ['لتحقيق أتمتة كاملة وترشيد استهلاك المياه بدقة اعتماداً على القياسات اللحظية للتربة', 'لزيادة استهلاك المياه عمداً', 'لأن الحساسات لا تعمل إلا داخل مواسير المياه', 'لتحويل قراءات الحساس إلى ملفات إكسيل فقط'],
              correctIndex: 0,
              explanation: 'Smart agriculture leverages closed-loop IoT control (Sense → Transmit → Analyze → Actuate) to conserve vital resources and maximize crop yields autonomously.',
              explanationAr: 'الفكرة من دمج الحساس مع المحبس هي تحويل النظام لحلقة مغلقة ذاتية التحكم (Closed-Loop) تسقي الزرع في التوقيت والكمية المظبوطة بالمللي وتوفر المية بدون تدخل بشري.'
            }
          },
          {
            title: '4. The 3 Grand Adoption Bottlenecks & Architectural Solutions',
            titleAr: '4. تحديات التبني الكبرى وحلولها الهندسية المعتمدة',
            content: 'Scaling IoT across billions of unattended endpoints introduces 3 major engineering hurdles, each answered by a specific architectural solution.',
            contentAr: 'نشر مليارات الأجهزة المستقلة بيصطدم بـ 3 عقبات هندسية خطيرة، ولكل عقبة حل معماري محدد تركز عليه الامتحانات:',
            bulletPoints: [
              'Challenge 1: Data Security & Privacy — Unattended nodes on public networks risk interception and firmware takeover. Solution: Robust cryptographic encryption, secure boot, and strict Role-Based Access Control (RBAC).',
              'Challenge 2: Interoperability — Hardware from different vendors (Cisco, HP, Apple) cannot communicate due to proprietary silos. Solution: Standardized communication protocols (MQTT, CoAP, Zigbee) and open-source ecosystems.',
              'Challenge 3: Scalability & Performance — Billions of sensors transmitting high-frequency telemetry clog cellular/cloud bandwidth and introduce unacceptable latency. Solution: Edge Computing for localized processing combined with scalable cloud backbones.'
            ],
            bulletPointsAr: [
              'تحدي 1: أمان البيانات والخصوصية (Security & Privacy) — أجهزة متروكة في الشارع عرضة للاختراق والتنصت. الحل: التشفير المتين (Encryption)، وبروتوكولات المصادقة الصارمة، وإدارة الصلاحيات.',
              'تحدي 2: التوافقية (Interoperability) — أجهزة من شركات مختلفة مش فاهمة لغة بعضها. الحل: اعتماد بروتوكولات معيارية موحدة (Standardized Protocols) ومنظومات برمجية مفتوحة المصدر.',
              'تحدي 3: التوسع والأداء (Scalability & Performance) — نقل مليارات القراءات الخام للسحابة بيعمل اختناق للباندويث وتأخير زمني. الحل: معالجة الحافة (Edge Computing) لتصفية البيانات محلياً مع سحابة مرنة.'
            ],
            keyRule: 'Interoperability is resolved through standardized protocols; Scalability & latency bottlenecks are resolved through Edge Computing.',
            keyRuleAr: 'حل مشكلة التوافقية هو البروتوكولات المعيارية (Standardized Protocols)، وحل مشكلة التوسع وزمن الاستجابة هو معالجة الحافة (Edge Computing).',
            quickCheck: {
              question: 'How does Edge Computing resolve the Scalability & Latency bottleneck in mission-critical IoT systems?',
              questionAr: 'كيف تنجح معالجة الحافة (Edge Computing) في حل عنق زجاجة بطء الاستجابة وقابلية التوسع في أنظمة الطوارئ؟',
              options: ['By processing critical data locally right at the source, slashing response times from ~240ms to ~3ms', 'By moving all servers to a different country', 'By shutting down all sensors when traffic is high', 'By forcing all packets to traverse overseas cloud centers'],
              optionsAr: ['بمعالجة البيانات الحرجة محلياً عند المصدر، مما يقلل زمن الاستجابة من ~240ms إلى ~3ms وينقذ الموقف', 'بنقل الخوادم المركزية إلى دولة أخرى', 'بإيقاف تشغيل الحساسات تلقائياً عند زيادة الضغط', 'بإجبار جميع الحزم على السفر إلى خوادم السحابة في الخارج'],
              correctIndex: 0,
              explanation: 'Lecture 1 Slide 12 directly presents Edge Computing for localized processing to eliminate WAN latency and preserve network bandwidth during emergencies.',
              explanationAr: 'السلايد 12 وضحت إن معالجة البيانات محلياً على أجهزة الـ Edge بتنقذ الموقف في 3ms بس من غير ما تستنى النت يلف حولين العالم للـ Cloud، وبكده بنحل أزمة التأخير والباندويث.'
            }
          }
        ],
        questions: [
          {
            id: 'q-iot1-1',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'mcq',
            question: 'Which of the following is NOT one of the three foundational components of an IoT system?',
            questionAr: 'أياً من الآتي لا يعتبر من المكونات التأسيسية الثلاثة لمنظومة إنترنت الأشياء؟',
            options: ['Sensors', 'Devices', 'Networks', 'Central Databases'],
            optionsAr: ['الحساسات (Sensors)', 'الأجهزة (Devices)', 'الشبكات (Networks)', 'قواعد البيانات المركزية (Central Databases)'],
            correctAnswer: 3,
            explanation: 'The three essential pillars defined in lecture slides are Devices, Sensors, and Networks. Databases and cloud servers are backend infrastructure, not the foundational trio.',
            explanationAr: 'المحاضرة حددت نصاً إن المنظومة مبنية على 3 أركان حتمية: الأجهزة والحساسات والشبكات. قواعد البيانات والسحابة مستقر خلفي لتخزين البيانات وليست من الأركان الثلاثة.'
          },
          {
            id: 'q-iot1-2',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'mcq',
            question: 'What is the approved engineering solution for the "Interoperability" challenge in IoT adoption?',
            questionAr: 'ما هو الحل الهندسي المعتمد لعقبة "التوافقية" (Interoperability) بين أنظمة الـ IoT المختلفة؟',
            options: [
              'Deploying local Edge Computing nodes',
              'Standardized communication protocols and open-source ecosystems',
              'Using heavier proprietary encryption ciphers',
              'Eliminating physical gateways altogether'
            ],
            optionsAr: [
              'استخدام عقد معالجة الحافة (Edge Computing)',
              'البروتوكولات المعيارية الموحدة والمنظومات مفتوحة المصدر',
              'استخدام شفرات تشفير احتكارية أثقل',
              'إلغاء البوابات الفيزيائية تماماً'
            ],
            correctAnswer: 1,
            explanation: 'Interoperability problems occur when devices from competing manufacturers cannot understand each other. Standardized open communication protocols bridge these silos.',
            explanationAr: 'التوافقية بتعني تفاهم أجهزة من شركات مختلفة؛ الحل العلمي هو اعتماد بروتوكولات اتصال معيارية ومفتوحة يفهمها الجميع زي MQTT و CoAP.'
          },
          {
            id: 'q-iot1-3',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'mcq',
            question: 'What is the correct sequential order of the 3-stage IoT data flow loop?',
            questionAr: 'ما هو الترتيب الصحيح والتسلسلي لمراحل دورة تدفق بيانات الـ IoT الثلاث؟',
            options: [
              'Cloud analyzes → Sensors collect → Connectivity transmits',
              'Connectivity transmits → Cloud analyzes → Sensors collect',
              'Sensors collect → Connectivity transmits → Cloud analyzes',
              'Sensors collect → Cloud analyzes → Connectivity transmits'
            ],
            optionsAr: [
              'السحابة تحلل ← الحساسات تجمع ← الشبكة تنقل',
              'الشبكة تنقل ← السحابة تحلل ← الحساسات تجمع',
              'الحساسات تجمع ← الشبكة تنقل ← السحابة تحلل',
              'الحساسات تجمع ← السحابة تحلل ← الشبكة تنقل'
            ],
            correctAnswer: 2,
            explanation: 'The pipeline begins with physical phenomena sampled by sensors (Collect), forwarded across networks (Transmit), and processed by analytical rule engines (Analyze).',
            explanationAr: 'الدورة بتبدأ بالتقاط الإشارة الفيزيائية وتحويلها لرقم (Collect)، نقلها عبر الشبكة (Transmit)، ثم معالجتها واستخراج القرار في السحابة (Analyze).'
          },
          {
            id: 'q-iot1-4',
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
          },
          {
            id: 'q-iot1-5',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'true_false',
            question: 'A sensor detects physical environmental phenomena and converts them into measurable electrical or digital signals.',
            questionAr: 'الحساس هو جهاز يكتشف الظواهر الفيزيائية المحيطة ويحولها لإشارات كهربائية أو رقمية قابلة للقياس.',
            correctAnswer: true,
            explanation: 'True: By definition, sensors are input transducers converting thermal, optical, acoustic, or chemical input into electrical telemetry.',
            explanationAr: 'صح! الحساس هو محول طاقة للمدخلات، بياخد الظاهرة الفيزيائية زي الحرارة أو الضوء ويحولها لإشارة نقدر نقيسها ونتعامل معاها برمجياً.'
          },
          {
            id: 'q-iot1-6',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'true_false',
            question: 'Every IoT communication cycle strictly requires real-time manual human intervention to transmit telemetry across nodes.',
            questionAr: 'كل دورة اتصال في منظومة إنترنت الأشياء تشترط حتماً تدخلاً بشرياً يدوياً لنقل القراءات بين الأجهزة.',
            correctAnswer: false,
            explanation: 'False: A hallmark of IoT is Machine-to-Machine (M2M) autonomous communication occurring seamlessly without routine human intervention.',
            explanationAr: 'غلط! الميزة الأساسية لإنترنت الأشياء هي الاتصال الآلي بين الآلات (M2M) وتبادل البيانات والقرارات ذاتياً من غير ما يحتاج إنسان يتدخل في كل خطوة.'
          },
          {
            id: 'q-iot1-7',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'true_false',
            question: 'Edge computing is designated as the primary engineering solution for the scalability and latency challenge in large IoT deployments.',
            questionAr: 'تعتبر معالجة الحافة (Edge Computing) الحل الهندسي الأول لمعالجة تحديات قابلية التوسع وبطء الاستجابة في أنظمة الـ IoT الضخمة.',
            correctAnswer: true,
            explanation: 'True: Offloading raw sensor filtering and initial processing to edge gateways reduces cloud bandwidth usage and eliminates round-trip latency bottlenecks.',
            explanationAr: 'صح! معالجة القراءات عند الحافة (Edge) بتفلتر البيانات وتتخذ القرارات الحرجة محلياً، فتوفر استهلاك الإنترنت وتلغي بطء الاستجابة.'
          },
          {
            id: 'q-iot1-8',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'true_false',
            question: 'According to course case studies, deploying IoT in precision agriculture has been shown to increase crop yields by over 20%.',
            questionAr: 'وفقاً لدراسات الحالة المعتمدة بالمقرر، أثبت تطبيق الـ IoT في الزراعة الدقيقة قدرته على زيادة إنتاجية المحاصيل بنسبة تتجاوز 20%.',
            correctAnswer: true,
            explanation: 'True: Deploying automated soil moisture probes and drone surveillance provides optimal water/nutrient delivery, sustainably lifting yields by >20%.',
            explanationAr: 'صح! حساسات رطوبة التربة وطائرات الدرونز بتظبط مواعيد وكميات الري والتسميد بدقة بالغة، مما رفع إنتاجية المحصول بنسبة 20% وأكتر.'
          },
          {
            id: 'q-iot1-9',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'essay',
            question: 'Explain the fundamental operational differences between an IoT Sensor and an IoT Actuator, providing two real-world examples for each.',
            questionAr: 'اشرح الفروق الجوهرية في التشغيل بين الحساس (Sensor) والمشغل (Actuator) في منظومة الـ IoT، مع ذكر مثالين واقعيين لكل منهما.',
            correctAnswer: 'Sensor is an input transducer; Actuator is an output transducer.',
            modelAnswer: 'A Sensor acts as the input organ of an IoT system: it detects physical phenomena (temperature, smoke, vibration) and translates them into readable electrical/digital telemetry. Examples: 1) Soil moisture probe, 2) Infrared motion sensor. In contrast, an Actuator serves as the output/execution organ: it accepts digital commands from computing nodes and performs physical mechanical action. Examples: 1) Solenoid water irrigation valve, 2) High-torque cooling fan motor.',
            modelAnswerAr: 'الحساس (Sensor) يمثل عضو الإحساس والمدخلات في المنظومة: يلتقط الظواهر الطبيعية الفيزيائية (كالرطوبة أو الحرارة أو الدخان) ويحولها إلى إشارة كهربية/رقمية تقرأها الحواسب. أمثلة: 1) مسبار قياس رطوبة التربة، 2) حساس الأشعة تحت الحمراء لكشف الحركة. أما المشغل (Actuator) فهو عضو الحركة والمخرجات: يستقبل الأمر الرقمي الصادر من خوارزمية التحكم ويحوله إلى فعل مادي حركي ملموس في الواقع. أمثلة: 1) محبس كهرومغناطيسي لفتح مياه الري، 2) محرك تشغيل مروحة التبريد.',
            keyPoints: [
              'Sensor = input transducer detecting ambient physical phenomena',
              'Actuator = output transducer translating digital commands into mechanical actions',
              'Valid real-world examples for sensors and actuators provided'
            ]
          },
          {
            id: 'q-iot1-10',
            courseId: 'iot',
            lectureId: 'iot-lec-1',
            type: 'essay',
            question: 'Detail the three grand challenges in IoT adoption (Security, Interoperability, Scalability) and their respective architectural solutions.',
            questionAr: 'فصل تحديات التبني الثلاثة الكبرى في إنترنت الأشياء (الأمان، التوافقية، التوسع) مع ذكر الحل المعماري الهندسي لكل تحدٍ منها.',
            correctAnswer: 'Security, Interoperability, Scalability with their solutions.',
            modelAnswer: '1) Security & Privacy: Unattended IoT devices are prone to spoofing, eavesdropping, and physical tampering. Architectural Solution: End-to-end cryptographic encryption (AES/TLS), hardware root of trust, and strict role-based access control (RBAC). 2) Interoperability: Competing manufacturers use isolated proprietary protocols preventing cross-device collaboration. Architectural Solution: Standardized communication protocols (MQTT, CoAP, Zigbee) and open ecosystem standards. 3) Scalability & Performance: Transmitting telemetry from billions of high-frequency sensors creates severe bandwidth congestion and cloud latency. Architectural Solution: Edge computing for local preprocessing and anomaly filtering combined with scalable cloud infrastructure.',
            modelAnswerAr: '1) أمان البيانات والخصوصية (Security & Privacy): انتشار مليارات الأجهزة المستقلة يجعلها عرضة للاختراق والتنصت والتلاعب بالسوفت وير. الحل المعماري: التشفير القوي لنقل البيانات وتخزينها، المصادقة الآمنة، والتحكم الصارم في الصلاحيات. 2) التوافقية (Interoperability): اختلاف الشركات المصنعة ينتج عنه عتاد يتحدث لغات بروتوكولية مغلقة تمنع الاتصال المشترك. الحل المعماري: اعتماد بروتوكولات معيارية مفتوحة عالمياً (مثل MQTT و CoAP). 3) التوسع والأداء (Scalability & Performance): إرسال آلاف القراءات كل ثانية من مليارات الحساسات يسد خطوط الاتصال ويسبب تأخيراً زمنياً غير مقبول. الحل المعماري: حوسبة الحافة (Edge Computing) لمعالجة وفلترة البيانات محلياً قبل إرسال الملخصات فقط للسحابة.',
            keyPoints: [
              'Security solved via encryption and access controls',
              'Interoperability solved via standardized protocols and open standards',
              'Scalability/performance solved via Edge Computing and localized filtering'
            ]
          }
        ]
      },
      {
        id: 'iot-lec-2',
        courseId: 'iot',
        lectureNumber: 2,
        title: 'Networking Models, Protocols & The IoT Stack',
        titleAr: 'نماذج الشبكات، بروتوكولات الاتصال ومعمارية طبقات الـ IoT',
        brief: 'The network communication dilemma, why layered architectures prevent proprietary vendor chaos, OSI 7-layer reference vs TCP/IP 4-layer reality, TCP 3-way handshake vs UDP datagrams, and the complete 5-layer IoT stack designed for constrained hardware.',
        briefAr: 'معضلة الاتصال الشبكي، كيف تمنع النماذج الطبقية فوضى احتكار الشركات، مقارنة نموذج OSI المرجعي السباعي مع نموذج TCP/IP الواقعي، صراع بروتوكولات النقل TCP و UDP، والمعمارية الخماسية لطبقات إنترنت الأشياء المصممة للأجهزة محدودة الموارد.',
        durationMinutes: 45,
        interactiveTools: ['iot-stack-lab'],
        cheatSheet: [
          {
            en: 'Without Standards = Chaos: Proprietary protocols from HP, Cisco, IBM, Microsoft cannot communicate with each other, destroying interoperability.',
            ar: 'بدون معايير تسود الفوضى: لو كل شركة عملت بروتوكولاتها الخاصة (Cisco, HP, IBM)، الأجهزة مش هتفهم بعضها والاتصال هيكون مستحيل.'
          },
          {
            en: 'Layered Modular Benefits: Specialization, simplification, universal standards, and evolution without breaking (e.g. IPv4 replaced by IPv6 while other layers remain unaffected).',
            ar: 'مزايا نموذج الطبقات: التخصص، تبسيط المشاكل، التوافق العالمي، والتطوير المستقل بدون كسر باقي النظام (زي استبدال IPv4 بـ IPv6 دون التأثير على التطبيقات أو الطبقة الفيزيائية).'
          },
          {
            en: 'OSI vs TCP/IP: OSI is a 7-layer conceptual/theoretical model; TCP/IP is the practical 4-layer architecture powering the live internet.',
            ar: 'نموذج OSI مقابل TCP/IP: نموذج OSI إطار نظري مرجعي من 7 طبقات؛ بينما TCP/IP هو المعمارية العملية الواقعية للإنترنت المكونة من 4 طبقات.'
          },
          {
            en: 'TCP vs UDP: TCP is connection-oriented, reliable (3-way handshake SYN/SYN-ACK/ACK), guarantees delivery; UDP is connectionless, fast, lightweight, with no delivery guarantee.',
            ar: 'مقارنة بروتوكولات النقل: TCP موثوق ويعتمد على الاتصال (المصافحة الثلاثية 3-Way Handshake) ويضمن وصول البيانات؛ UDP سريع وخفيف وبدون مصافحة ولا يضمن الوصول.'
          },
          {
            en: 'Theoretical 5-Layer IoT Stack: 1. Perception Layer → 2. Network Layer → 3. Edge/Processing Layer → 4. Middleware/Platform Layer → 5. Application Layer.',
            ar: 'المعمارية الخماسية للـ IoT: 1. طبقة الإدراك الحسي (Perception) ← 2. طبقة الشبكة (Network) ← 3. طبقة الحافة (Edge) ← 4. طبقة المنصة والوسيط (Middleware) ← 5. طبقة التطبيقات (Application).'
          },
          {
            en: 'IoT Stack vs OSI/TCP-IP: OSI/TCP-IP moves packets between computers; IoT Stack expands the scope from silicon sensors to user alerts, optimized for battery-powered, resource-constrained microcontrollers.',
            ar: 'الفرق الجوهري: شبكات الكمبيوتر التقليدية بتنقل حزم بين أجهزة قوية؛ بينما معمارية الـ IoT بتغطي المسار الكامل من الحساس للموبايل ومصممة لشرائح ضعيفة ومحدودة الطاقة.'
          }
        ],
        terms: [
          {
            term: 'Layered Stack Model',
            termAr: 'نموذج الطبقات المكدسة',
            definition: 'Architectural methodology that separates complex networking tasks into specialized hierarchical layers, each communicating strictly through standard interfaces with adjacent layers.',
            definitionAr: 'منهجية هندسية لتقسيم مهام الاتصال المعقدة إلى طبقات متخصصة، كل طبقة لها وظيفة محددة وتتعاون مع الطبقة اللي فوقها واللي تحتها من غير ما تتدخل في تفاصيلها الداخلية.'
          },
          {
            term: 'OSI Reference Model',
            termAr: 'نموذج OSI المرجعي',
            definition: 'A 7-layer conceptual framework developed by ISO to standardize global telecommunication functions: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
            definitionAr: 'نموذج مرجعي نظري من 7 طبقات طورته منظمة ISO لتوحيد وظائف الاتصال الشبكي بين الأنظمة المختلفة عالمياً.'
          },
          {
            term: 'TCP/IP Model',
            termAr: 'نموذج بروتوكول الإنترنت TCP/IP',
            definition: 'The pragmatic 4-layer suite that forms the operational foundation of the global internet: Network Access, Internet (IP), Transport (TCP/UDP), and Application.',
            definitionAr: 'النموذج العملي الواقعي للإنترنت المكون من 4 طبقات: النفاذ للشبكة، الإنترنت (IP)، النقل (TCP/UDP)، والتطبيقات.'
          },
          {
            term: 'TCP 3-Way Handshake',
            termAr: 'المصافحة الثلاثية لـ TCP',
            definition: 'The connection establishment procedure wherein client and server synchronize sequence numbers via SYN, SYN-ACK, and ACK packets before data exchange commences.',
            definitionAr: 'خطوات إنشاء الاتصال الموثوق في TCP: العميل بيبعت SYN، الخادم يرد بـ SYN-ACK، والعميل يؤكد بـ ACK قبل ما يبدأ إرسال البيانات الفعلية.'
          },
          {
            term: 'Perception Layer',
            termAr: 'طبقة الإدراك الحسي (Perception Layer)',
            definition: 'The physical hardware bottom layer of the IoT stack containing sensors, actuators, and transducers that interface directly with the analogue physical environment.',
            definitionAr: 'الطبقة الدنيا في معمارية إنترنت الأشياء؛ بتضم الحساسات والمشغلات والكاميرات اللي بتلمس الواقع الفيزيائي وتتعامل معاه مباشرة.'
          },
          {
            term: 'Middleware / Platform Layer',
            termAr: 'طبقة الوسيط والمنصات (Middleware)',
            definition: 'The IoT integration tier hosting message brokers (e.g., MQTT brokers), cloud ingestion services (AWS IoT, Azure IoT), and protocol translation engines.',
            definitionAr: 'طبقة الربط والوساطة؛ بتستقبل الرسائل من البوابات عبر وسطاء زي MQTT، وبتترجم البيانات لمنصات السحابة وتوزعها على التطبيقات.'
          }
        ],
        sections: [
          {
            title: '1. The Network Communication Dilemma & The Modular Stack Solution',
            titleAr: '1. معضلة الاتصال الشبكي والحل الهندسي بنموذج الطبقات',
            content: 'Sending a message as simple as "Hello" from Cairo to California across electrical voltages and optical fibers presents staggering engineering challenges.',
            contentAr: 'إرسال رسالة بسيطة زي كلمة "Hello" من القاهرة لكاليفورنيا كإشارات كهربية وضوئية بيواجه تحديات تقنية معقدة جداً:',
            bulletPoints: [
              'Packetization: Breaking large arbitrary data messages into small, manageable, error-checked packets.',
              'Global Routing: Directing packets efficiently across intercontinental submarine cables and autonomous ISP routers.',
              'Data Integrity: Detecting bit flips and correcting transmission noise without corrupting the original payload.',
              'Proprietary Chaos: Without standardized rules, competing manufacturers (HP, Cisco, IBM, Microsoft) build incompatible protocols, making cross-vendor communication impossible.',
              'The Layered Solution: Decomposing networking into a stack of modular layers where each layer has a distinct responsibility and communicates only with adjacent layers.',
              'Evolution Without Breaking: Changing protocols inside one layer does NOT break the other layers (e.g., transitioning from IPv4 to IPv6 altered the Network layer while Applications, TCP, and Ethernet kept operating seamlessly).'
            ],
            bulletPointsAr: [
              'تقسيم البيانات (Packetization): تقطيع الرسائل الكبيرة لحزم صغيرة سهلة النقل والفحص.',
              'التوجيه العالمي (Global Routing): توجيه الحزم بدقة عبر كابلات البحار وراوترات الإنترنت العالمية.',
              'سلامة البيانات (Data Integrity): اكتشاف تشوه البتات الكهربائية وتصحيحها قبل ما الرسالة تبوظ.',
              'فوضى غياب المعايير (Without Standards = Chaos): لو كل شركة عملت بروتوكول لوحدها، أجهزة سيسكو مش هتفهم أجهزة إتش بي ولا مايكروسوفت.',
              'الحل المعماري بالطبقات (Stack Model): تقسيم مهمة الاتصال لمستويات متخصصة، كل مستوى له وظيفته المستقلة اللي بيسلمها للمستوى اللي بعده.',
              'التطوير المستقل بدون كسر النظام: تقدر تطور طبقة كاملة من غير ما تهدم الباقي (زي الانتقال من IPv4 لـ IPv6؛ تم تعديل طبقة الشبكة فقط بدون المساس بـ TCP أو البرامج أو الكابلات).'
            ],
            keyRule: 'Layering enables independent protocol evolution: transitioning from IPv4 to IPv6 only altered the Network layer, leaving all other layers intact.',
            keyRuleAr: 'ميزة نموذج الطبقات الجوهرية: التطوير بدون انهيار النظام؛ الانتقال من IPv4 إلى IPv6 غيّر طبقة الشبكة فقط وظلت باقي الطبقات والتطبيقات تعمل بكفاءة.',
            quickCheck: {
              question: 'Why are open, standardized network protocols (like IP, TCP, and MQTT) universally required instead of proprietary protocols?',
              questionAr: 'لماذا تُعد البروتوكولات القياسية المفتوحة متطلباً عالمياً إلزامياً بدلاً من البروتوكولات المغلقة الخاصة بكل شركة؟',
              options: ['To prevent multi-vendor communication chaos and guarantee seamless device interoperability', 'To force everyone to buy from one single manufacturer', 'Because open protocols eliminate the need for routers', 'To make network cables unnecessary'],
              optionsAr: ['لمنع فوضى الاتصال وضمان تفاهم وتوافق الأجهزة المصنعة من شركات مختلفة (Interoperability)', 'لإجبار الجميع على الشراء من مصنّع واحد فقط', 'لأن البروتوكولات المفتوحة تلغي الحاجة لأجهزة الراوتر', 'لجعل كابلات الشبكة غير ضرورية'],
              correctIndex: 0,
              explanation: 'Lecture 2 Slide 3 notes that without standardized protocol rules, devices from different companies speak mutually unintelligible languages, creating complete communication breakdown.',
              explanationAr: 'السلايد رقم 3 أكدت إن بدون المعايير القياسية الموحدة، كل جهاز هيكون ليه لغته الخاصة ومحدش هيفهم التاني، وبالتالي شبكة الإنترنت العالمية كانت هتفشل تماماً.'
            }
          },
          {
            title: '2. The OSI 7-Layer Reference Model vs The TCP/IP 4-Layer Reality',
            titleAr: '2. نموذج OSI المرجعي السباعي مقابل نموذج TCP/IP الواقعي',
            content: 'Network engineering is taught through the ISO 7-layer OSI conceptual framework, while the real world internet operates exclusively on the 4-layer TCP/IP suite.',
            contentAr: 'بندرس الشبكات نظرياً عبر نموذج OSI المكون من 7 طبقات من منظمة ISO، لكن الإنترنت الفعلي شغال بمعمارية TCP/IP المكونة من 4 طبقات عملية:',
            bulletPoints: [
              'Layer 7 (Application): End-user interfaces and network services (HTTP, FTP, SMTP, DNS).',
              'Layer 6 (Presentation): Syntax translation, data formatting, encryption (TLS/SSL), and compression.',
              'Layer 5 (Session): Establishment, maintenance, and synchronization of dialog sessions between applications.',
              'Layer 4 (Transport): End-to-end process-to-process delivery, segmentation, flow control, and reliability (TCP, UDP).',
              'Layer 3 (Network): Logical IP addressing, packet formatting, and best-path routing across networks (IP, ICMP).',
              'Layer 2 (Data Link): Physical MAC addressing, frame encapsulation, and hardware error detection (Ethernet, Wi-Fi).',
              'Layer 1 (Physical): Raw binary bit streaming over physical copper, fiber optics, or radio frequencies.',
              'TCP/IP 4-Layer Mapping: TCP/IP merges OSI layers 5, 6, and 7 into a single Application layer, and merges layers 1 and 2 into Network Access.'
            ],
            bulletPointsAr: [
              'الطبقة 7 (التطبيقات - Application): واجهة المستخدم والبروتوكولات التفاعلية (HTTP, FTP, SMTP, DNS).',
              'الطبقة 6 (العرض - Presentation): تجهيز وتنسيق البيانات، والتشفير وفك التشفير، وضغط الملفات.',
              'الطبقة 5 (الجلسة - Session): فتح وإدارة وإنهاء جلسات الاتصال بين التطبيقات.',
              'الطبقة 4 (النقل - Transport): نقل البيانات من طرف لطرف بدقة، والتحكم في التدفق والتقطيع (TCP, UDP).',
              'الطبقة 3 (الشبكة - Network): العنونة المنطقية بـ IP وتوجيه الحزم واختيار أفضل مسار (Routing).',
              'الطبقة 2 (ربط البيانات - Data Link): العنونة الفيزيائية بـ MAC، وتجميع الإطارات (Frames) واكتشاف الأخطاء.',
              'الطبقة 1 (الفيزيائية - Physical): إرسال البتات الخام كإشارات كهربية أو ضوئية أو موجات راديو.',
              'دمج TCP/IP: نموذج TCP/IP دمج الطبقات (7 و 6 و 5) في طبقة Application واحدة، ودمج (1 و 2) في طبقة Network Access واحدة.'
            ],
            keyRule: 'OSI is a 7-layer theoretical conceptual model; TCP/IP is a 4-layer practical operational protocol suite.',
            keyRuleAr: 'نموذج OSI إطار نظري من 7 طبقات طورته ISO؛ ونموذج TCP/IP معمارية تطبيقية واقعية من 4 طبقات تقوم عليها شبكة الإنترنت.',
            quickCheck: {
              question: 'Which TCP/IP layer handles packet routing and logical IP addressing across interconnected networks?',
              questionAr: 'أي طبقة في نموذج TCP/IP الرباعي تختص بتوجيه حزم البيانات والعنونة المنطقية (IP) عبر الشبكات المختلفة؟',
              options: ['Internet Layer', 'Transport Layer', 'Network Access Layer', 'Application Layer'],
              optionsAr: ['طبقة الإنترنت (Internet Layer)', 'طبقة النقل (Transport Layer)', 'طبقة الوصول للشبكة (Network Access Layer)', 'طبقة التطبيقات (Application Layer)'],
              correctIndex: 0,
              explanation: 'In the TCP/IP model (Slide 9 & 10), the Internet layer (corresponding to OSI Network Layer 3) is solely responsible for logical IP addressing and packet routing.',
              explanationAr: 'السلايد 9 و 10 توضح صراحة أن طبقة الإنترنت (Internet Layer) هي المسؤولة عن الـ Routing وعناوين الـ IP المنطقية لتوصيل الحزم بين الشبكات.'
            }
          },
          {
            title: '3. Transport Protocols Head-to-Head: TCP 3-Way Handshake vs UDP Datagrams',
            titleAr: '3. مقارنة بروتوكولات النقل: مصافحة TCP الموثوقة مقابل سرعة UDP',
            content: 'At the Transport layer, applications must choose between two distinct transport protocols based on whether they prioritize absolute data accuracy or ultra-low transmission latency.',
            contentAr: 'في طبقة النقل (Transport Layer)، التطبيقات بتختار بين بروتوكولين بناءً على الأولوية: هل الأهم وصول البيانات 100% بدون أي نقص، ولا الأهم السرعة واللحظية؟',
            bulletPoints: [
              'TCP (Transmission Control Protocol): Connection-oriented protocol that establishes a session via a 3-Way Handshake (SYN → SYN-ACK → ACK).',
              'TCP Reliability: Guarantees delivery via packet sequence numbering, positive acknowledgments, and automatic retransmission of lost segments.',
              'TCP Use Cases: Web browsing (HTTP/HTTPS), email (SMTP/IMAP), and secure file transfer (FTP/SFTP) where even 1 corrupted byte ruins the payload.',
              'UDP (User Datagram Protocol): Connectionless, lightweight protocol that transmits standalone datagrams with zero connection setup overhead.',
              'UDP Best-Effort: Does NOT guarantee delivery, does NOT retransmit lost packets, and does NOT maintain sequence order.',
              'UDP Use Cases: Real-time video streaming, multiplayer gaming, DNS queries, and voice calls (VoIP) where waiting for retransmissions causes stuttering.'
            ],
            bulletPointsAr: [
              'بروتوكول TCP: بروتوكول موثوق يعتمد على الاتصال المسبق؛ بيبدأ بمصافحة ثلاثية مشهورة (SYN ← SYN-ACK ← ACK).',
              'موثوقية TCP: بيضمن وصول كل بايت سليم بترقيم الحزم وطلب إعادة إرسال أي حزمة تضيع في الطريق.',
              'استخدامات TCP: تصفح المواقع، الإيميلات، ونقل الملفات؛ الأماكن اللي لو بايت واحد سقط الملف يبوظ.',
              'بروتوكول UDP: بروتوكول سريع وخفيف، مبيعملش مصافحة مسبقة ولا بيضيع وقت في الاتصال.',
              'طبيعة UDP: لا يضمن وصول الحزم (Best-effort)، ومبيعدش إرسال الحزم الضايعة.',
              'استخدامات UDP: البث المباشر (Streaming)، ألعاب الأونلاين، مكالمات الفيديو، واستعلامات الـ DNS؛ لأن التأخير أسوأ من سقوط لقطة سريعة.'
            ],
            keyRule: 'TCP guarantees delivery via connection-oriented 3-way handshake; UDP is connectionless, prioritizing speed without delivery guarantee.',
            keyRuleAr: 'بروتوكول TCP يعتمد على الاتصال ويضمن وصول الحزم بالمصافحة الثلاثية؛ بروتوكول UDP غير متصل وموجه للسرعة بدون ضمان للوصول.',
            quickCheck: {
              question: 'What is the decisive trade-off when selecting UDP over TCP for an IoT sensor deployment?',
              questionAr: 'ما هي المقايضة الأساسية (Trade-off) عند اختيار بروتوكول UDP بدلاً من TCP لنظام حساسات إنترنت الأشياء؟',
              options: ['Sacrificing guaranteed delivery in exchange for ultra-low latency and zero connection-handshake overhead', 'Gaining 100% reliable retransmission with higher packet size', 'Encrypting data automatically with military-grade keys', 'Preventing packets from being routed across the internet'],
              optionsAr: ['التضحية بضمان وصول الحزم مقابل سرعة استجابة فائقة وانعدام عبء المصافحة والـ Overhead', 'الحصول على ضمان وصول بنسبة 100% مع زيادة حجم الباكت', 'تشفير البيانات تلقائياً بمفاتيح عسكرية', 'منع الحزم من المرور عبر شبكة الإنترنت'],
              correctIndex: 0,
              explanation: 'Lecture 2 Slide 12 contrasts TCP (reliable, connection-oriented with 3-way handshake) vs UDP (connectionless, lightweight, fast, no delivery guarantee).',
              explanationAr: 'السلايد 12 بتشرح المقايضة الشهيرة: الـ TCP بيضمن وصول كل باكت عبر المصافحة الثلاثية لكنه أثقل، بينما الـ UDP بيضحي بضمان الوصول عشان يبعت الداتا اللحظية بسرعة البرق وبأقل استهلاك طاقة.'
            }
          },
          {
            title: '4. The 5-Layer IoT Theoretical Stack: From Perception to Cloud Applications',
            titleAr: '4. المعمارية الخماسية لطبقات إنترنت الأشياء: من الإدراك للتطبيقات',
            content: 'Because traditional desktop networking suites are too resource-heavy for battery-powered microcontrollers, computer scientists formulated the specialized 5-layer IoT architectural stack.',
            contentAr: 'بما إن بروتوكولات الكمبيوتر التقليدية تقيلة جداً على المتحكمات الصغيرة والبطاريات، تم تصميم المعمارية الخماسية المتخصصة لإنترنت الأشياء:',
            bulletPoints: [
              'Layer 1 (Perception Layer / Hardware): The physical foundation containing sensors, actuators, and transducers directly interfacing with the physical world.',
              'Layer 2 (Network Layer / Communication): Wireless and wired transmission protocols tailored for low power (Wi-Fi, Bluetooth BLE, Zigbee, LoRaWAN, NB-IoT).',
              'Layer 3 (Edge / Processing Layer): Intermediate hardware (Gateways, ESP32, Raspberry Pi) performing local sensor filtering, data compression, and low-latency safety actuation.',
              'Layer 4 (Middleware / Platform Layer): Integration brokers (MQTT brokers), cloud platforms (AWS IoT, Azure IoT, Firebase) providing protocol translation and device fleet management.',
              'Layer 5 (Application Layer): The user-facing software interface presenting interactive dashboards, telemetry charts, and mobile alerting systems.'
            ],
            bulletPointsAr: [
              'الطبقة 1 (الإدراك الحسي - Perception): عتاد الإحساس والتنفيذ الفيزيائي؛ الحساسات والمشغلات والكاميرات اللي بتتعامل مع الطبيعة مباشرة.',
              'الطبقة 2 (الاتصال والشبكة - Network): بروتوكولات النقل اللاسلكية الموفرة للطاقة (BLE, Zigbee, LoRaWAN, NB-IoT, Wi-Fi).',
              'الطبقة 3 (معالجة الحافة - Edge/Processing): البوابات الوسيطة (Gateways) ورازبيري باي اللي بتفلتر البيانات محلياً وتتخذ قرارات الأمان السريعة.',
              'الطبقة 4 (المنصة والوسيط - Middleware/Platform): وسيط الرسائل (زي سيرفرات MQTT) ومنصات السحابة (AWS IoT, Azure) اللي بتنظم البيانات.',
              'الطبقة 5 (التطبيقات - Application): شاشات الموبايل ولوحات التحكم والداشبورد اللي بتعرض للمستخدم القراءات وتسمح له بالتحكم.'
            ],
            keyRule: 'The theoretical 5-layer IoT stack: 1. Perception → 2. Network → 3. Edge/Processing → 4. Middleware/Platform → 5. Application.',
            keyRuleAr: 'المعمارية الخماسية لطبقات الـ IoT بالترتيب: الإدراك الحسي ← الشبكة ← معالجة الحافة ← المنصة والوسيط ← التطبيقات.',
            quickCheck: {
              question: 'At which layer of the IoT Stack do physical transducers (temperature sensors, gas detectors, and servo motors) reside?',
              questionAr: 'في أي طبقة من معمارية طبقات إنترنت الأشياء الخماسية تتواجد المحولات الفيزيائية (حساسات الحرارة، كواشف الغاز، ومحركات السيرفو)؟',
              options: ['Perception / Device Layer', 'Network Layer', 'Middleware / Processing Layer', 'Application Layer'],
              optionsAr: ['طبقة الإدراك والاستشعار (Perception / Device Layer)', 'طبقة الشبكة (Network Layer)', 'طبقة البرمجيات الوسيطة والمعالجة (Middleware Layer)', 'طبقة التطبيقات وواجهة المستخدم (Application Layer)'],
              correctIndex: 0,
              explanation: 'The Perception layer (Layer 1 of the IoT stack, Slide 14 & 15) represents the physical edge interface containing sensors, actuators, and hardware interfaces.',
              explanationAr: 'السلايد 14 و 15 تؤكدان أن طبقة الإدراك والاستشعار (Perception Layer) هي القاعدة التأسيسية التي تضم الحساسات والمحركات التي تتفاعل مع العالم الفيزيائي المحيط.'
            }
          },
          {
            title: '5. IoT Stack vs Traditional TCP/IP: The Constrained-Device Paradigm Shift',
            titleAr: '5. معمارية الـ IoT في مواجهة TCP/IP التقليدي: نقلة الأجهزة محدودة الموارد',
            content: 'Comparing the IoT architectural stack with classic TCP/IP reveals a fundamental paradigm shift driven by resource constraints and complete end-to-end system scope.',
            contentAr: 'مقارنة معمارية الـ IoT بشبكات TCP/IP التقليدية بتوضح فلسفة مختلفة تماماً أملتها قيود الطاقة وضعف إمكانيات شرائح الحساسات:',
            bulletPoints: [
              'Target Nodes: Traditional TCP/IP was engineered for mains-powered desktop workstations and servers with ample RAM and powerful CPUs. IoT stack targets battery-operated MCUs with kilobytes of memory.',
              'End-to-End Scope: TCP/IP stops at moving packets correctly between two computer ports; IoT stack encompasses the entire cyber-physical lifecycle from physical sensor transduction to smartphone push notifications.',
              'Protocol Weight: TCP/IP relies on heavy handshakes and bulky packet headers; IoT stack prioritizes ultra-lightweight protocols (MQTT, CoAP) and sleep-mode power efficiency.',
              'Infrastructure Breadth: Unlike TCP/IP, the IoT stack explicitly includes device hardware management, edge computing gateways, and cloud analytics platforms within its architecture.'
            ],
            bulletPointsAr: [
              'طبيعة الأجهزة: شبكات TCP/IP اتصممت لأجهزة كمبيوتر وسيرفرات متصلة بالكهرباء وعندها معالجات قوية ورامات ضخمة؛ بينما الـ IoT بيتعامل مع شرائح بميكروكنترولر ورامات بالكيلوبايت وتغذية بطاريات.',
              'نطاق المنظومة: TCP/IP وظيفته تنتهي بمجرد وصول الحزم من بورت لبورت بين جهازين؛ بينما معمارية الـ IoT بتشمل الرحلة كاملة من لحظة قراءة الحساس لحد إشعار الموبايل.',
              'وزن البروتوكولات: الـ TCP/IP بيستخدم ترويسات ومصافحات تقيلة؛ بينما الـ IoT بيعتمد على بروتوكولات خفيفة جداً (زي MQTT و CoAP) بتوفر استهلاك البطارية.',
              'الشمولية: معمارية الـ IoT بتدمج العتاد الفيزيائي وإدارة الأجهزة وبوابات الحافة والسحابة كجزء أصيل من النموذج وليس مجرد برامج خارجية.'
            ],
            keyRule: 'The IoT stack extends beyond network communication: it covers the complete cycle from physical hardware to cloud platforms and mobile apps for constrained devices.',
            keyRuleAr: 'الـ IoT Stack مش مجرد بروتوكول شبكة؛ ده إطار شامل بيغطي رحلة البيانات من الحساس الفيزيائي للمنصة السحابية وتطبيقات المستخدم ومصمم خصيصاً لشرائح محدودة الطاقة.',
            quickCheck: {
              question: 'Why do resource-constrained IoT nodes frequently adopt lightweight protocols like CoAP and MQTT instead of heavy HTTP/HTTPS?',
              questionAr: 'لماذا تعتمد أجهزة الـ IoT محدودة الموارد على بروتوكولات خفيفة مثل CoAP و MQTT بدلاً من بروتوكول HTTP التقليدي؟',
              options: ['Because microcontrollers have strictly limited RAM, processing power, and battery life that cannot afford heavy HTTP headers', 'Because HTTP was permanently banned for wireless devices', 'Because CoAP only works with satellite communication', 'Because MQTT cannot send numbers'],
              optionsAr: ['لأن المتحكمات الدقيقة لها ذاكرة وبطارية وقدرات معالجة محدودة جداً لا تتحمل حجم ترويسة (Headers) بروتوكول HTTP الضخمة', 'لأن بروتوكول HTTP تم حظره نهائياً على الأجهزة اللاسلكية', 'لأن بروتوكول CoAP يعمل حصرياً عبر الأقمار الصناعية', 'لأن بروتوكول MQTT غير قادر على نقل الأرقام'],
              correctIndex: 0,
              explanation: 'Lecture 2 Slide 17 emphasizes that IoT edge devices are resource-constrained in battery and memory, requiring lightweight protocols with minimal header overhead.',
              explanationAr: 'السلايد 17 توضح أن عتاد الـ IoT في الغالب شغال ببطارية متناهية الصغر وذاكرة RAM بالكيلوبايت، فترويسة HTTP الكبيرة تفرغ البطارية في ساعات؛ لذلك صُممت بروتوكولات خفيفة زي MQTT لتعيش البطارية سنين.'
            }
          }
        ],
        questions: [
          {
            id: 'q-iot2-1',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'mcq',
            question: 'What fundamental communication problem would arise if vendors like Cisco, HP, and Microsoft created proprietary protocols without common standards?',
            questionAr: 'ما هي المشكلة الجوهرية التي تحدث إذا قامت شركات مثل Cisco و HP و Microsoft بتصميم بروتوكولات احتكارية دون معايير موحدة؟',
            options: [
              'Data transmission would become too fast for modern cables',
              'Devices from different vendors could not understand each other, destroying interoperability',
              'The physical layer would no longer require cabling',
              'All devices would automatically become backwards-compatible'
            ],
            optionsAr: [
              'سرعة الاتصال ستصبح أسرع من قدرة الكابلات الحديثة',
              'أجهزة الشركات المختلفة لن تستطيع التفاهم مع بعضها وتنعدم التوافقية تماماً',
              'الطبقة الفيزيائية لن تحتاج لأي كابلات توصيل',
              'جميع الأجهزة ستصبح متوافقة تلقائياً'
            ],
            correctAnswer: 1,
            explanation: 'Without common industry standards, proprietary protocols create isolated vendor islands, resulting in chaos and total loss of cross-vendor interoperability.',
            explanationAr: 'غياب المعايير الموحدة بيخلي كل شركة تعمل لغة خاصة بيها، فتعجز أجهزة الشركات المختلفة عن فهم بعضها وتنعدم التوافقية (Interoperability).'
          },
          {
            id: 'q-iot2-2',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'mcq',
            question: 'How does the modular layered stack architecture support network evolution without breaking existing systems?',
            questionAr: 'كيف يدعم نموذج الطبقات المكدسة (Layered Stack) تطوير وتحديث الشبكات دون انهيار الأنظمة القائمة؟',
            options: [
              'Every layer must duplicate the exact algorithmic work of all other layers',
              'A protocol in one layer can be upgraded or replaced without altering or breaking adjacent layers',
              'It forces every device on earth to run the exact same operating system',
              'It eliminates the need for addressing and routing'
            ],
            optionsAr: [
              'كل طبقة تكرر نفس العمل الخوارزمي لباقي الطبقات',
              'يمكن ترقية أو استبدال بروتوكول في طبقة معينة دون الحاجة لتغيير أو كسر الطبقات المجاورة',
              'إلزام جميع أجهزة العالم بتشغيل نفس نظام التشغيل',
              'إلغاء الحاجة للعنونة والتوجيه'
            ],
            correctAnswer: 1,
            explanation: 'Layering isolates responsibilities: e.g., the transition from IPv4 to IPv6 only modified the Network layer; Transport and Application layers remained completely unaffected.',
            explanationAr: 'نموذج الطبقات بيفصل المسؤوليات؛ تقدر تطور بروتوكول في طبقة معينة (زي الانتقال من IPv4 لـ IPv6 في طبقة الشبكة) وتفضل باقي الطبقات والتطبيقات شغالة طبيعي.'
          },
          {
            id: 'q-iot2-3',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'mcq',
            question: 'How many distinct layers are defined in the conceptual OSI reference model vs the practical TCP/IP suite?',
            questionAr: 'كم عدد الطبقات المعتمدة في نموذج OSI المرجعي النظري مقارنة بنموذج TCP/IP العملي؟',
            options: [
              'OSI has 7 layers, while TCP/IP has 4 layers',
              'OSI has 4 layers, while TCP/IP has 7 layers',
              'Both models define exactly 5 layers',
              'OSI has 6 layers, while TCP/IP has 3 layers'
            ],
            optionsAr: [
              'نموذج OSI يتكون من 7 طبقات، بينما TCP/IP يتكون من 4 طبقات',
              'نموذج OSI يتكون من 4 طبقات، بينما TCP/IP يتكون من 7 طبقات',
              'كلا النموذجين يتكون من 5 طبقات بالتمام',
              'نموذج OSI يتكون من 6 طبقات، بينما TCP/IP يتكون من 3 طبقات'
            ],
            correctAnswer: 0,
            explanation: 'The ISO OSI model is a 7-layer reference framework, whereas the practical operational TCP/IP internet model consists of 4 layers.',
            explanationAr: 'نموذج OSI السباعي (7 طبقات) إطار نظري، بينما معمارية TCP/IP للإنترنت العملي تتكون من 4 طبقات.'
          },
          {
            id: 'q-iot2-4',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'mcq',
            question: 'Which statement accurately contrasts TCP with UDP at the Transport layer?',
            questionAr: 'أياً من العبارات الآتية تقارن بدقة بين بروتوكول TCP وبروتوكول UDP في طبقة النقل؟',
            options: [
              'TCP is connectionless and fast; UDP establishes a 3-way handshake',
              'TCP is connection-oriented, guarantees delivery, and retransmits lost packets; UDP is connectionless and prioritizes speed without delivery guarantee',
              'Both TCP and UDP guarantee delivery, but UDP is encrypted by default',
              'TCP operates at the Network layer, while UDP operates at the Transport layer'
            ],
            optionsAr: [
              'بروتوكول TCP غير متصل وسريع، بينما UDP ينشئ مصافحة ثلاثية',
              'بروتوكول TCP متصل وموثوق ويعيد إرسال المفقود، بينما UDP غير متصل وموجه للسرعة دون ضمان للوصول',
              'كلا البروتوكولين يضمن وصول الحزم، لكن UDP مشفر تلقائياً',
              'بروتوكول TCP يعمل في طبقة الشبكة، بينما UDP يعمل في طبقة النقل'
            ],
            correctAnswer: 1,
            explanation: 'TCP guarantees reliability via connection-oriented 3-way handshaking and acknowledgments; UDP is connectionless, dropping error recovery for minimal latency.',
            explanationAr: 'بروتوكول TCP بيعمل اتصال مسبق (Handshake) ويضمن وصول كل بايت، بينما UDP بيبعت الحزم فوراً بدون انتظار مصافحة ولا يضمن الوصول للحصول على أعلى سرعة.'
          },
          {
            id: 'q-iot2-5',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'mcq',
            question: 'Which layer in the 5-layer IoT architecture contains physical transducers, sensors, and actuators that interface with the ambient world?',
            questionAr: 'ما هي الطبقة في معمارية الـ IoT الخماسية التي تضم الحساسات والمشغلات الفيزيائية المتصلة بالعالم الواقعي؟',
            options: ['Application Layer', 'Middleware Layer', 'Perception Layer', 'Edge/Processing Layer'],
            optionsAr: ['طبقة التطبيقات (Application)', 'طبقة الوسيط (Middleware)', 'طبقة الإدراك الحسي (Perception)', 'طبقة الحافة (Edge)'],
            correctAnswer: 2,
            explanation: 'The Perception layer (Layer 1) is the physical transducer foundation where sensors, cameras, and actuators observe and manipulate real-world conditions.',
            explanationAr: 'طبقة الإدراك الحسي (Perception Layer) هي الطبقة الأولى في معمارية إنترنت الأشياء وفيها الحساسات والمشغلات اللي بتتعامل مع الواقع المادي.'
          },
          {
            id: 'q-iot2-6',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'true_false',
            question: 'Network standards ensure that devices from competing manufacturers can seamlessly interconnect and exchange data.',
            questionAr: 'تضمن المعايير الشبكية الموحدة قدرة الأجهزة المصنوعة من شركات متنافسة على الاتصال وتبادل البيانات بسلاسة.',
            correctAnswer: true,
            explanation: 'True: Industry standards eliminate proprietary lock-in, enabling multi-vendor interoperability.',
            explanationAr: 'صح! المعايير القياسية الموحدة هي اللي بتسمح لأجهزة من مصنعين مختلفين إنها تتصل وتفهم بعض بدون أي مشاكل.'
          },
          {
            id: 'q-iot2-7',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'true_false',
            question: 'In a modular layered stack model, every layer must manage and expose all its internal code algorithms to all other layers.',
            questionAr: 'في نموذج الطبقات المكدسة، يجب على كل طبقة إدارة وكشف كافة تفاصيل خوارزمياتها الداخلية لجميع الطبقات الأخرى.',
            correctAnswer: false,
            explanation: 'False: A fundamental principle of layering is encapsulation/information hiding; layers interact strictly across standard APIs without knowing internal implementations.',
            explanationAr: 'غلط! مبدأ الطبقات قائم على إخفاء التفاصيل الداخلية (Encapsulation)؛ كل طبقة بتقدم خدمة للطبقة اللي فوقها عبر واجهة واضحة من غير ما تكشف تفاصيل كودها الداخلي.'
          },
          {
            id: 'q-iot2-8',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'true_false',
            question: 'UDP is a connectionless transport protocol that guarantees every transmitted data packet will be successfully delivered.',
            questionAr: 'يعتبر UDP بروتوكول نقل غير متصل يضمن وصول كافة حزم البيانات المرسلة بنجاح ودون فقدان.',
            correctAnswer: false,
            explanation: 'False: UDP is a best-effort datagram protocol that does NOT provide delivery guarantees or packet retransmissions.',
            explanationAr: 'غلط! بروتوكول UDP لا يقدم أي ضمان لوصول الحزم (No delivery guarantee)، ولا يعيد إرسال الحزم التالفة أو المفقودة.'
          },
          {
            id: 'q-iot2-9',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'true_false',
            question: 'When the internet transitioned from IPv4 to IPv6, the Network layer changed while the Application and Transport layers continued to function normally.',
            questionAr: 'عندما انتقل الإنترنت من بروتوكول IPv4 إلى IPv6، تغيرت طبقة الشبكة فقط بينما ظلت طبقات التطبيقات والنقل تعمل بشكل طبيعي.',
            correctAnswer: true,
            explanation: 'True: This is the prime real-world demonstration of modular layering: Network layer packet formats changed without rewriting applications or web browsers.',
            explanationAr: 'صح! دي أشهر تجربة واقعية لميزة الطبقات؛ تم تعديل بروتوكول وعنونة طبقة الشبكة بدون ما نضطر نعدل متصفحات الويب أو بروتوكولات النقل.'
          },
          {
            id: 'q-iot2-10',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'true_false',
            question: 'The IoT architectural stack is concerned strictly with packet transmission protocols and excludes physical device hardware and cloud applications.',
            questionAr: 'تقتصر معمارية طبقات إنترنت الأشياء على بروتوكولات نقل الحزم فقط وتستبعد العتاد الفيزيائي للأجهزة وتطبيقات السحابة.',
            correctAnswer: false,
            explanation: 'False: Unlike traditional network stacks, the IoT stack encompasses the entire cyber-physical lifecycle, explicitly including device hardware, firmware, middleware platforms, and user applications.',
            explanationAr: 'غلط! معمارية الـ IoT بتشمل المنظومة كاملة من عتاد الأجهزة والحساسات إلى طبقات الحافة ومنصات السحابة وتطبيقات المستخدم.'
          },
          {
            id: 'q-iot2-11',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'essay',
            question: 'Explain the three steps of the TCP 3-Way Handshake, and contrast TCP reliability with UDP best-effort transmission.',
            questionAr: 'اشرح الخطوات الثلاث لعملية المصافحة الثلاثية (3-Way Handshake) في بروتوكول TCP، وقارن موثوقية TCP مع أسلوب الإرسال الأفضل الممكن (Best-effort) في UDP.',
            correctAnswer: 'SYN, SYN-ACK, ACK steps explained and compared to UDP.',
            modelAnswer: 'The TCP 3-Way Handshake establishes a synchronized, reliable connection before data transfer begins: 1) Step 1 (SYN): The initiating client sends a SYN (Synchronize) packet containing its initial sequence number (ISN). 2) Step 2 (SYN-ACK): The server receives the SYN and responds with a SYN-ACK packet, acknowledging client ISN (ACK = ISN + 1) and providing its own sequence number. 3) Step 3 (ACK): The client sends an ACK packet confirming the server sequence number. Once complete, full-duplex communication starts. In contrast, UDP sends raw datagrams with zero connection setup (no handshake), no sequence numbering, and no retransmissions, making UDP much faster for real-time video/gaming, but vulnerable to packet loss, whereas TCP guarantees byte-exact delivery for web and file transfers.',
            modelAnswerAr: 'تتم المصافحة الثلاثية في TCP عبر 3 خطوات متتابعة لتأسيس الاتصال ومزامنة أرقام الترتيب: 1) الخطوة الأولى (SYN): يرسل العميل حزمة مزامنة (SYN) تتضمن رقم التسلسل الابتدائي الخاص به (ISN). 2) الخطوة الثانية (SYN-ACK): يستقبل الخادم الطلب ويرد بحزمة تأكيد ومزامنة معاً، يؤكد فيها رقم العميل (ACK = ISN + 1) ويرسل رقم تسلسله هو. 3) الخطوة الثالثة (ACK): يرسل العميل حزمة تأكيد نهائية (ACK). بعدها يبدأ نقل البيانات الفعلي في الاتجاهين. بالمقابل، يرسل بروتوكول UDP حزم البيانات فوراً بدون أي مصافحة أو حجز جلسة، وبدون ترقيم للحزم أو إعادة إرسال لما يفقد منها؛ مما يجعل UDP فائق السرعة ومناسباً للألعاب والبث المباشر، بينما يضمن TCP سلامة كل بايت للتصفح والملفات والإيميلات.',
            keyPoints: [
              'Step 1 SYN, Step 2 SYN-ACK, Step 3 ACK described correctly',
              'TCP provides sequence numbers, acknowledgments, and retransmissions',
              'UDP provides connectionless best-effort delivery without handshaking'
            ]
          },
          {
            id: 'q-iot2-12',
            courseId: 'iot',
            lectureId: 'iot-lec-2',
            type: 'essay',
            question: 'Describe the 5 layers of the theoretical IoT architecture, detailing the function and typical technology examples for each layer.',
            questionAr: 'صف الطبقات الخمس لمعمارية إنترنت الأشياء النظرية، موضحاً وظيفة كل طبقة وأمثلة للتقنيات المستخدمة فيها.',
            correctAnswer: 'Perception, Network, Edge, Middleware, Application layers described.',
            modelAnswer: '1) Perception Layer (Hardware): Senses and interacts with the physical environment via sensors, cameras, and actuators (e.g., DHT22 temperature sensor, solenoid valves, ESP32 GPIO). 2) Network Layer (Communication): Transports digitized telemetry over energy-efficient protocols tailored for constrained hardware (e.g., LoRaWAN, Zigbee, BLE, NB-IoT, Wi-Fi). 3) Edge / Processing Layer: Local intermediate nodes (Gateways, Raspberry Pi) that filter noise, compress streams, and execute instant safety shutdowns with zero cloud latency. 4) Middleware / Platform Layer: Cloud brokers and platforms that translate diverse device protocols and manage data ingestion (e.g., MQTT broker like Mosquitto, AWS IoT Core, Azure IoT Hub). 5) Application Layer: End-user monitoring and control software (e.g., mobile apps, web dashboards, operational SCADA alerts).',
            modelAnswerAr: '1) طبقة الإدراك الحسي (Perception Layer): الطبقة الفيزيائية التي تضم الحساسات والمشغلات لقياس الطبيعة والتأثير فيها (مثل حساسات الحرارة DHT22 ومحابس المياه والري). 2) طبقة الشبكة (Network Layer): بروتوكولات الاتصال اللاسلكية الموفرة للطاقة لنقل الحزم (مثل LoRaWAN و Zigbee و BLE و Wi-Fi). 3) طبقة الحافة (Edge / Processing Layer): بوابات وسيطة (Gateways و Raspberry Pi) تقوم بفلترة القراءات محلياً وتشغيل أوامر الطوارئ اللحظية دون انتظار السحابة. 4) طبقة الوسيط والمنصة (Middleware / Platform Layer): خوادم إدارة الأجهزة والوساطة التي تستقبل البيانات وتترجم البروتوكولات (مثل وسيط MQTT ومنصات AWS IoT و Azure). 5) طبقة التطبيقات (Application Layer): واجهات الاستخدام النهائية التي يتعامل معها المستخدم (مثل تطبيقات الهواتف الذكية ولوحات التحكم والداشبورد).',
            keyPoints: [
              'All 5 layers identified in correct order from bottom to top',
              'Functions of Perception, Network, Edge, Middleware, and Application explained',
              'Concrete technology examples provided for each layer'
            ]
          }
        ]
      }
    ],
    sheets: [
      {
        id: 'iot-sheet-1',
        courseId: 'iot',
        sheetNumber: 1,
        title: 'Lecture 1 Sheet',
        titleAr: 'شيت المحاضرة الأولى',
        brief: 'Lecture 1 practice exercises and problem sets.',
        briefAr: 'تمارين ومسائل المحاضرة الأولى.',
        problemsCount: 8,
        hasSolution: true,
        problems: [
          {
            id: 'p-iot1-1',
            problemNumber: 1,
            partTitle: 'Part 1: True / False',
            partTitleAr: 'الجزء الأول: صح أو خطأ',
            type: 'true_false',
            question: 'A sensor is a device that detects physical input from the environment and converts physical phenomena into measurable signals.',
            questionAr: 'الحساس هو جهاز يكتشف المدخلات الفيزيائية من البيئة المحيطة ويحول الظواهر الفيزيائية إلى إشارات قابلة للقياس.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Lecture 1, Slide 3 defines a sensor verbatim as: "A sensor is a device that detects and responds to physical input from the environment, converting physical phenomena into measurable signals." Examples include thermometers, smoke detectors, and camera sensors.',
            solutionAr: 'الإجابة: صح (TRUE). السلايد رقم 3 من المحاضرة الأولى تعرّف الحساس نصاً بأنه: جهاز يكتشف ويستجيب للمدخلات الفيزيائية من البيئة المحيطة ويحول الظواهر الطبيعية لإشارات قابلة للقياس (زي قياس الحرارة والدخان والحركة).'
          },
          {
            id: 'p-iot1-2',
            problemNumber: 2,
            partTitle: 'Part 1: True / False',
            partTitleAr: 'الجزء الأول: صح أو خطأ',
            type: 'true_false',
            question: 'According to the lecture, every IoT system is built upon four essential components.',
            questionAr: 'وفقاً للمحاضرة، كل نظام إنترنت أشياء مبني على أربعة مكونات أساسية.',
            correctAnswer: 'False',
            solution: 'Answer: FALSE. Lecture 1, Slide 5 explicitly states: "Every Internet of Things (IoT) system is fundamentally built upon THREE essential components: Devices, Sensors, and Networks." Databases/Cloud platforms are backend storage/analytics destinations, not one of the foundational three.',
            solutionAr: 'الإجابة: غلط (FALSE). السلايد رقم 5 توضح نصاً أن أي نظام إنترنت أشياء مبني أساساً على ثلاثة مكونات أساسية فقط (Devices, Sensors, Networks) مش أربعة؛ وقواعد البيانات والسحابة ليست من هذا الثلاثي التأسيسي.'
          },
          {
            id: 'p-iot1-3',
            problemNumber: 3,
            partTitle: 'Part 1: True / False',
            partTitleAr: 'الجزء الأول: صح أو خطأ',
            type: 'true_false',
            question: 'IoT devices connect and exchange data over the internet, and this always requires human intervention.',
            questionAr: 'تتصل أجهزة إنترنت الأشياء وتتبادل البيانات عبر الإنترنت، وهذا يتطلب دائماً تدخلاً بشرياً.',
            correctAnswer: 'False',
            solution: 'Answer: FALSE. Lecture 1, Slide 6 states that IoT devices "connect and exchange data over the internet, often WITHOUT human intervention." Machine-to-Machine (M2M) autonomous operation is the core defining characteristic of IoT.',
            solutionAr: 'الإجابة: غلط (FALSE). السلايد رقم 6 تؤكد أن أجهزة الـ IoT تتصل وتتبادل البيانات عبر الإنترنت دون اشتراط تدخل بشري (often without human intervention)؛ والتشغيل الآلي الذاتي (M2M) هو جوهر إنترنت الأشياء.'
          },
          {
            id: 'p-iot1-4',
            problemNumber: 4,
            partTitle: 'Part 1: True / False',
            partTitleAr: 'الجزء الأول: صح أو خطأ',
            type: 'true_false',
            question: 'Edge computing is presented as a solution to the scalability and performance challenge in IoT adoption.',
            questionAr: 'تم تقديم معالجة الحافة (Edge Computing) كحل لتحدي قابلية التوسع والأداء في تبني إنترنت الأشياء.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Lecture 1, Slide 12 addresses the "Scalability & Performance" challenge and directly presents the architectural solution: "Solution: Edge computing for localized processing and cloud-based scalable architectures."',
            solutionAr: 'الإجابة: صح (TRUE). السلايد رقم 12 توضح نصاً تحت بند تحدي التوسع والأداء (Scalability & Performance) أن الحل الهندسي المعتمد هو: معالجة الحافة للمعالجة المحلية (Edge computing for localized processing) مع بنية سحابية مرنة.'
          },
          {
            id: 'p-iot1-5',
            problemNumber: 5,
            partTitle: 'Part 2: Multiple Choice',
            partTitleAr: 'الجزء الثاني: اختيار من متعدد',
            type: 'mcq',
            question: 'Which of the following is NOT one of the three main components of an IoT system?',
            questionAr: 'أي مما يلي لا يعتبر واحداً من المكونات الثلاثة الرئيسية لنظام إنترنت الأشياء؟',
            options: ['Sensors', 'Devices', 'Networks', 'Databases'],
            optionsAr: ['الحساسات (Sensors)', 'الأجهزة (Devices)', 'الشبكات (Networks)', 'قواعد البيانات (Databases)'],
            correctAnswer: 3,
            solution: 'Answer: D) Databases. Slide 5 defines the primary triad as Devices, Sensors, and Networks. Databases store data at the cloud tier, but are not one of the 3 primary architectural pillars.',
            solutionAr: 'الإجابة النموذجية: د) قواعد البيانات (Databases). السلايد رقم 5 حددت نصاً الثلاثي الأساسي لمنظومة الـ IoT: (Sensors, Devices, Networks)؛ بينما قواعد البيانات مخازن في السحابة وليست من الأركان التأسيسية الثلاثة.'
          },
          {
            id: 'p-iot1-6',
            problemNumber: 6,
            partTitle: 'Part 2: Multiple Choice',
            partTitleAr: 'الجزء الثاني: اختيار من متعدد',
            type: 'mcq',
            question: 'What is the proposed solution to the "Interoperability" challenge?',
            questionAr: 'ما هو الحل المقترح لتحدي "التوافقية والتشغيل البيني" (Interoperability)؟',
            options: [
              'Edge computing for localized processing',
              'Standardized communication protocols and open-source ecosystems',
              'Robust encryption and strict access controls',
              'Cloud-based scalable architectures'
            ],
            optionsAr: [
              'الحوسبة الطرفية للمعالجة المحلية',
              'بروتوكولات اتصال قياسية موحدة ومنظومات مفتوحة المصدر',
              'تشفير قوي وضوابط وصول صارمة',
              'بنى تحتية سحابية قابلة للتوسع'
            ],
            correctAnswer: 1,
            solution: 'Answer: B) Standardized communication protocols and open-source ecosystems. Slide 12 explicitly links Interoperability (communication between diverse vendor platforms) to standardized protocols and open standards.',
            solutionAr: 'الإجابة النموذجية: ب) بروتوكولات الاتصال المعيارية والمنظومات مفتوحة المصدر (Standardized communication protocols). السلايد رقم 12 تؤكد أن تفاهم أجهزة من مصنعين مختلفين يتطلب معايير اتصال موحدة ومفتوحة.'
          },
          {
            id: 'p-iot1-7',
            problemNumber: 7,
            partTitle: 'Part 2: Multiple Choice',
            partTitleAr: 'الجزء الثاني: اختيار من متعدد',
            type: 'mcq',
            question: 'What is the correct sequence of how IoT works?',
            questionAr: 'ما هو التسلسل الصحيح لآلية عمل إنترنت الأشياء؟',
            options: [
              'Cloud analyzes → Sensors collect → Connectivity transmits',
              'Connectivity transmits → Cloud analyzes → Sensors collect',
              'Sensors collect → Connectivity transmits → Cloud analyzes',
              'Cloud analyzes → Connectivity transmits → Sensors collect'
            ],
            optionsAr: [
              'السحابة تحلل ← الحساسات تجمع ← الاتصال ينقل',
              'الاتصال ينقل ← السحابة تحلل ← الحساسات تجمع',
              'الحساسات تجمع ← الاتصال ينقل ← السحابة تحلل',
              'السحابة تحلل ← الاتصال ينقل ← الحساسات تجمع'
            ],
            correctAnswer: 2,
            solution: 'Answer: C) Sensors collect → Connectivity transmits → Cloud analyzes. Slide 8 diagrams this exact chronological horizontal flow pipeline.',
            solutionAr: 'الإجابة النموذجية: ج) الحساسات تجمع ← الاتصال ينقل ← السحابة تحلل (Sensors collect → Connectivity transmits → Cloud analyzes). السلايد رقم 8 تشرح هذا التدفق الثلاثي المتسلسل بالتفصيل.'
          },
          {
            id: 'p-iot1-8',
            problemNumber: 8,
            partTitle: 'Part 2: Multiple Choice',
            partTitleAr: 'الجزء الثاني: اختيار من متعدد',
            type: 'mcq',
            question: 'Which of the following best defines a "network"?',
            questionAr: 'أي مما يلي يمثل أفضل تعريف لـ "الشبكة" (Network)؟',
            options: [
              'Any piece of hardware designed to perform a specific task',
              'A device that converts physical phenomena into measurable signals',
              'A collection of interconnected devices that can communicate and share resources',
              'A cloud platform that analyzes IoT data'
            ],
            optionsAr: [
              'أي قطعة عتاد مصممة لأداء مهمة محددة',
              'جهاز يحول الظواهر الفيزيائية إلى إشارات قابلة للقياس',
              'مجموعة من الأجهزة المترابطة التي يمكنها التواصل ومشاركة الموارد',
              'منصة سحابية لتحليل بيانات إنترنت الأشياء'
            ],
            correctAnswer: 2,
            solution: 'Answer: C) A collection of interconnected devices that can communicate and share resources. Slide 4 defines a network as: "A collection of interconnected devices that can communicate and share resources with each other."',
            solutionAr: 'الإجابة النموذجية: ج) مجموعة من الأجهزة المترابطة القادرة على الاتصال ومشاركة الموارد مع بعضها. السلايد رقم 4 تعرف الشبكة نصاً بهذا التعريف الدقيق.'
          }
        ]
      },
      {
        id: 'iot-sheet-2',
        courseId: 'iot',
        sheetNumber: 2,
        title: 'Lecture 2 Sheet',
        titleAr: 'شيت المحاضرة الثانية',
        brief: 'Lecture 2 practice exercises and problem sets.',
        briefAr: 'تمارين ومسائل المحاضرة الثانية.',
        problemsCount: 20,
        hasSolution: true,
        problems: [
          {
            id: 'p-iot2-1',
            problemNumber: 1,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'What is one major challenge when sending data across a network?',
            questionAr: 'ما هو أحد التحديات الرئيسية عند إرسال البيانات عبر الشبكة؟',
            options: [
              'Making every device use the same screen size',
              'Breaking messages into manageable packets',
              'Removing all communication protocols',
              'Preventing devices from using addresses'
            ],
            optionsAr: [
              'جعل كل جهاز يستخدم نفس حجم الشاشة',
              'تقطيع الرسائل الكبيرة إلى حزم صغيرة يمكن إدارتها وتوجيهها (Packetization)',
              'إلغاء جميع بروتوكولات الاتصال',
              'منع الأجهزة من استخدام العناوين'
            ],
            correctAnswer: 1,
            solution: 'Answer: B. Breaking messages into manageable packets. Lecture 2, Slide 2 lists the core communication challenges: packetization (breaking messages into small packets), routing packets across continents, data integrity, and translating electrical signals back to text.',
            solutionAr: 'الإجابة النموذجية: ب. تقطيع الرسائل إلى حزم صغيرة يمكن إدارتها (Breaking messages into manageable packets). السلايد 2 توضح تحديات الاتصال ومن أبرزها تقطيع البيانات لحزم ونقلها عبر القارات والتأكد من سلامتها.'
          },
          {
            id: 'p-iot2-2',
            problemNumber: 2,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'What can happen when companies create network protocols independently without common standards?',
            questionAr: 'ماذا يمكن أن يحدث عندما تنشئ الشركات بروتوكولات شبكات خاصة بها بشكل مستقل دون معايير مشتركة؟',
            options: [
              'All devices automatically become compatible',
              'Communication always becomes faster',
              'Devices may not understand one another',
              'The network no longer needs layers'
            ],
            optionsAr: [
              'تصبح جميع الأجهزة متوافقة تلقائياً',
              'يصبح الاتصال أسرع دائماً',
              'قد تعجز الأجهزة عن فهم بعضها البعض (انعدام التوافقية)',
              'لا تعود الشبكة بحاجة إلى طبقات'
            ],
            correctAnswer: 2,
            solution: 'Answer: C. Devices may not understand one another. Lecture 2, Slide 3 ("Without Standards = Chaos") highlights that proprietary protocols lead to devices being unable to understand each other, making communication impossible.',
            solutionAr: 'الإجابة النموذجية: ج. قد لا تفهم الأجهزة بعضها البعض (Devices may not understand one another). السلايد 3 تؤكد أن غياب المعايير الموحدة ينتج عنه فوضى وعجز أجهزة الشركات المختلفة عن التفاهم.'
          },
          {
            id: 'p-iot2-3',
            problemNumber: 3,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'What is the main idea behind a layered stack model?',
            questionAr: 'ما هي الفكرة الأساسية وراء نموذج الطبقات المكدسة (Stack Model)؟',
            options: [
              'One layer performs every communication task',
              'Each layer has a clear function and cooperates with other layers',
              'Layers must all use the same protocol',
              'It removes the need for standards'
            ],
            optionsAr: [
              'طبقة واحدة تقوم بجميع مهام الاتصال',
              'كل طبقة لها وظيفة محددة وتتعاون مع باقي الطبقات عبر واجهات واضحة',
              'يجب أن تستخدم جميع الطبقات نفس البروتوكول',
              'يلغي الحاجة إلى المعايير القياسية'
            ],
            correctAnswer: 1,
            solution: 'Answer: B. Each layer has a clear function and cooperates with other layers. Slide 4 explains that the stack model creates a unified system where each layer specializes in its area and passes work to adjacent layers without interference.',
            solutionAr: 'الإجابة النموذجية: ب. كل طبقة لها وظيفة واضحة وتتعاون مع باقي الطبقات. السلايد 4 توضح أن نموذج الطبقات يقسم المهام لفريق متخصص كل طبقة تقوم بدورها وتسلمه للطبقة التالية بسلاسة.'
          },
          {
            id: 'p-iot2-4',
            problemNumber: 4,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'What is one benefit of using layers?',
            questionAr: 'ما هي إحدى فوائد استخدام الطبقات؟',
            options: [
              'Changes in one layer can be made without necessarily changing the whole system',
              'Devices become unable to communicate across vendors',
              'Every layer must duplicate the work of the others',
              'Scalability is reduced'
            ],
            optionsAr: [
              'إمكانية إجراء التعديلات في طبقة معينة دون الحاجة لتغيير النظام بأكمله (Flexibility)',
              'عجز الأجهزة عن الاتصال بين المصنعين',
              'وجوب قيام كل طبقة بتكرار عمل باقي الطبقات',
              'انخفاض قابلية التوسع'
            ],
            correctAnswer: 0,
            solution: 'Answer: A. Changes in one layer can be made without necessarily changing the whole system. Slide 5 ("Why Layers Are Important - Flexibility") and Slide 6 explain that modularity allows one layer to evolve (e.g. IPv4 to IPv6) without breaking applications.',
            solutionAr: 'الإجابة النموذجية: أ. إمكانية إجراء التعديلات في طبقة معينة دون الحاجة لتغيير النظام بأكمله (Flexibility). السلايد 5 و 6 توضح أن ميزة المرونة تسمح بتطوير بروتوكول طبقة دون كسر باقي طبقات الشبكة.'
          },
          {
            id: 'p-iot2-5',
            problemNumber: 5,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'How many layers are in the OSI model?',
            questionAr: 'كم عدد الطبقات في نموذج الـ OSI المرجعي؟',
            options: ['4', '5', '6', '7'],
            optionsAr: ['4 طبقات', '5 طبقات', '6 طبقات', '7 طبقات'],
            correctAnswer: 3,
            solution: 'Answer: D. 7. Slide 7 explicitly lists the 7 OSI layers: 1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application.',
            solutionAr: 'الإجابة النموذجية: د. 7 طبقات. السلايد 7 توضح نموذج الـ OSI المكون من 7 طبقات محددة بالترتيب من الفيزيائية إلى التطبيقات.'
          },
          {
            id: 'p-iot2-6',
            problemNumber: 6,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'Which OSI layer is associated with routing and addressing (IP)?',
            questionAr: 'أي طبقة في نموذج الـ OSI ترتبط بالتوجيه والعنونة المنطقية (IP)؟',
            options: ['Physical', 'Network', 'Session', 'Presentation'],
            optionsAr: ['الطبقة الفيزيائية (Physical)', 'طبقة الشبكة (Network)', 'طبقة الجلسة (Session)', 'طبقة العرض والتقديم (Presentation)'],
            correctAnswer: 1,
            solution: 'Answer: B. Network. Slide 8 ("OSI Model - Quick Overview") lists for Network: "Packet routing, addressing (IP)".',
            solutionAr: 'الإجابة النموذجية: ب. طبقة الشبكة (Network). السلايد 8 تحدد صراحة أن وظيفة طبقة الشبكة هي توجيه الحزم (Routing) وإدارة العناوين (IP).'
          },
          {
            id: 'p-iot2-7',
            problemNumber: 7,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'Which OSI layer is associated with framing and error detection?',
            questionAr: 'أي طبقة في نموذج الـ OSI ترتبط بتقسيم الإطارات (Framing) واكتشاف الأخطاء؟',
            options: ['Data Link', 'Application', 'Transport', 'Session'],
            optionsAr: ['طبقة ربط البيانات (Data Link)', 'طبقة التطبيقات (Application)', 'طبقة النقل (Transport)', 'طبقة الجلسة (Session)'],
            correctAnswer: 0,
            solution: 'Answer: A. Data Link. Slide 8 lists for Data Link: "Framing, physical addressing (MAC), error detection."',
            solutionAr: 'الإجابة النموذجية: أ. طبقة ربط البيانات (Data Link). السلايد 8 توضح أن Data Link هي المسؤولة عن تحويل البتات إلى إطارات (Framing) وعناوين الماك واكتشاف أخطاء النقل.'
          },
          {
            id: 'p-iot2-8',
            problemNumber: 8,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'Which pair contains transport-layer protocols mentioned in the lecture?',
            questionAr: 'أي زوج مما يلي يحتوي على بروتوكولات طبقة النقل المذكورة في المحاضرة؟',
            options: ['HTTP and FTP', 'IP and ICMP', 'TCP and UDP', 'Ethernet and Wi-Fi'],
            optionsAr: ['HTTP و FTP', 'IP و ICMP', 'TCP و UDP', 'Ethernet و Wi-Fi'],
            correctAnswer: 2,
            solution: 'Answer: C. TCP and UDP. Slide 10 and Slide 12 detail TCP and UDP under the Transport Layer.',
            solutionAr: 'الإجابة النموذجية: ج. TCP و UDP. السلايد 10 و 12 تفردان شرحاً مقارناً كاملاً لبروتوكولي النقل الأساسيين TCP و UDP.'
          },
          {
            id: 'p-iot2-9',
            problemNumber: 9,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'Which statement best describes UDP?',
            questionAr: 'أي عبارة تصف بروتوكول UDP بأفضل شكل؟',
            options: [
              'It guarantees delivery and performs extensive error correction',
              'It is connectionless and offers no delivery guarantee',
              'It is used only for physical cabling',
              'It is always slower than TCP'
            ],
            optionsAr: [
              'يضمن وصول البيانات ويقوم بتصحيح شامل للأخطاء',
              'غير متصل (Connectionless) ولا يقدم أي ضمانات لوصول البيانات',
              'يستخدم فقط في كابلات التوصيل الفيزيائية',
              'أبطأ دائماً من بروتوكول TCP'
            ],
            correctAnswer: 1,
            solution: 'Answer: B. It is connectionless and offers no delivery guarantee. Slide 12 explicitly defines UDP as: "Connectionless, Fast, lightweight, No delivery guarantee, No error correction."',
            solutionAr: 'الإجابة النموذجية: ب. غير متصل (Connectionless) ولا يضمن وصول البيانات. السلايد 12 تعرف UDP صراحة بأنه سريع وخفيف وبدون ضمان لوصول الحزم أو تصحيح الأخطاء.'
          },
          {
            id: 'p-iot2-10',
            problemNumber: 10,
            partTitle: 'PART A / MULTIPLE CHOICE',
            partTitleAr: 'الجزء أ: اختيار من متعدد',
            type: 'mcq',
            question: 'What is a key focus of the IoT stack compared with OSI/TCP-IP models?',
            questionAr: 'ما هو التركيز الأساسي لنموذج طبقات إنترنت الأشياء مقارنة بنماذج OSI و TCP/IP التقليدية؟',
            options: [
              'It focuses only on desktop computers',
              'It excludes sensors and hardware',
              'It includes device hardware, communication, platforms, and applications',
              'It eliminates the need for cloud services'
            ],
            optionsAr: [
              'يركز فقط على أجهزة الكمبيوتر المكتبية',
              'يستبعد الحساسات والعتاد المادي',
              'يشمل عتاد الأجهزة، الاتصالات، المنصات البرمجية، والتطبيقات من النهاية للنهاية',
              'يلغي الحاجة إلى الخدمات السحابية'
            ],
            correctAnswer: 2,
            solution: 'Answer: C. It includes device hardware, communication, platforms, and applications. Slide 14, 15, and 17 emphasize that the IoT stack explicitly spans device hardware (Sensors/Actuators) through cloud platforms and business applications.',
            solutionAr: 'الإجابة النموذجية: ج. يشمل عتاد الأجهزة والاتصالات والمنصات السحابية والتطبيقات. السلايدات 14 و 15 و 17 تؤكد أن معمارية الـ IoT لا تقتصر على نقل البيانات الشبكية بل تبدأ من العتاد والحساسات وتنتهي بتطبيقات المستخدم.'
          },
          {
            id: 'p-iot2-11',
            problemNumber: 11,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'Network standards help devices from different manufacturers communicate with one another.',
            questionAr: 'تساعد معايير الشبكات الأجهزة المصنعة من شركات مختلفة على التواصل والتفاهم مع بعضها البعض.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Slide 3 states: "Standards solve this problem... Allow different companies to create devices that work together."',
            solutionAr: 'الإجابة: صح (TRUE). السلايد 3 تؤكد نصاً أن المعايير القياسية تحل مشكلة اختلاف الشركات وتسمح للأجهزة بالعمل سوياً بتوافق تام.'
          },
          {
            id: 'p-iot2-12',
            problemNumber: 12,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'In a layered model, every layer must know and manage all the internal details of every other layer.',
            questionAr: 'في نموذج الطبقات، يجب على كل طبقة معرفة وإدارة جميع التفاصيل الداخلية لجميع الطبقات الأخرى.',
            correctAnswer: 'False',
            solution: 'Answer: FALSE. Slide 4 states: "Pass work to the next layer without interfering." Modularity and encapsulation ensure layers do NOT manage the internal details of other layers.',
            solutionAr: 'الإجابة: غلط (FALSE). السلايد 4 تؤكد أن كل طبقة متخصصة وتسلم البيانات للطبقة المجاورة دون التدخل في تفاصيل عملها الداخلية (تجريد وفصل المهام).'
          },
          {
            id: 'p-iot2-13',
            problemNumber: 13,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'The OSI model contains Application, Presentation, Session, Transport, Network, Data Link, and Physical layers.',
            questionAr: 'يتكون نموذج OSI من طبقات التطبيقات، العرض، الجلسة، النقل، الشبكة، ربط البيانات، والفيزيائية.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Slide 7 explicitly lists all 7 of these exact layers in order.',
            solutionAr: 'الإجابة: صح (TRUE). السلايد 7 تسرد نصاً هذه الطبقات السبع الدقيقة لنموذج OSI بالترتيب.'
          },
          {
            id: 'p-iot2-14',
            problemNumber: 14,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'The TCP/IP model is presented in the lecture as a four-layer model.',
            questionAr: 'تم تقديم نموذج TCP/IP في المحاضرة كنموذج مكون من أربع طبقات.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Slide 9 presents TCP/IP with exactly four distinct layers: 01 Application, 02 Transport, 03 Internet, 04 Network Access.',
            solutionAr: 'الإجابة: صح (TRUE). السلايد 9 تعرف نموذج TCP/IP صراحة بنموذج من أربع طبقات (Application, Transport, Internet, Network Access).'
          },
          {
            id: 'p-iot2-15',
            problemNumber: 15,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'The TCP/IP Internet layer is associated with packet routing across networks and protocols such as IP and ICMP.',
            questionAr: 'ترتبط طبقة الإنترنت في نموذج TCP/IP بتوجيه الحزم عبر الشبكات وبروتوكولات مثل IP و ICMP.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Slide 10 and Slide 11 state explicitly: "03 Internet Layer: Packet routing across networks (IP, ICMP)".',
            solutionAr: 'الإجابة: صح (TRUE). السلايدات 10 و 11 تحدد صراحة وظيفة طبقة الإنترنت في توجيه الحزم ببروتوكولات IP و ICMP.'
          },
          {
            id: 'p-iot2-16',
            problemNumber: 16,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'TCP is described as reliable and connection-oriented.',
            questionAr: 'يوصف بروتوكول TCP بأنه بروتوكول موثوق ويعتمد على الاتصال المسبق.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Slide 12 explicitly defines TCP as: "Reliable, connection-oriented, Guarantees data delivery, Error checking and correction".',
            solutionAr: 'الإجابة: صح (TRUE). السلايد 12 تصف TCP نصاً بأنه: موثوق ويعتمد على الاتصال ويضمن تسليم البيانات وتصحيح الأخطاء.'
          },
          {
            id: 'p-iot2-17',
            problemNumber: 17,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'UDP guarantees that every transmitted data packet will be delivered successfully.',
            questionAr: 'يضمن بروتوكول UDP وصول كل حزمة بيانات مرسلة بنجاح.',
            correctAnswer: 'False',
            solution: 'Answer: FALSE. Slide 12 highlights under UDP: "No delivery guarantee... Faster but less reliable". Lost datagrams are never retransmitted.',
            solutionAr: 'الإجابة: غلط (FALSE). السلايد 12 توضح نصاً أن UDP لا يضمن وصول البيانات (No delivery guarantee)؛ ولا يعيد إرسال الحزم المفقودة.'
          },
          {
            id: 'p-iot2-18',
            problemNumber: 18,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'In the IPv4-to-IPv6 example, the lecture states that the network layer changed while the other layers remained the same.',
            questionAr: 'في مثال التحول من IPv4 إلى IPv6، أوضحت المحاضرة أن طبقة الشبكة هي التي تغيرت بينما ظلت الطبقات الأخرى دون تغيير.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Slide 6 ("Real-World Example: Evolution Without Breaking") states: "Only the Network layer changed; All other layers remained the same; Applications still work normally; Transport, Physical layers unaffected."',
            solutionAr: 'الإجابة: صح (TRUE). السلايد 6 توضح نصاً أن التحول لـ IPv6 اقتصر على طبقة الشبكة فقط وظلت باقي الطبقات والتطبيقات تعمل دون أي تغيير.'
          },
          {
            id: 'p-iot2-19',
            problemNumber: 19,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'IoT systems may use lightweight protocols and emphasize power efficiency for resource-constrained devices.',
            questionAr: 'قد تستخدم أنظمة إنترنت الأشياء بروتوكولات خفيفة الوزن وتركز على كفاءة استهلاك الطاقة للأجهزة محدودة الموارد.',
            correctAnswer: 'True',
            solution: 'Answer: TRUE. Slide 14 and Slide 17 highlight that IoT devices have limited memory and battery, requiring lightweight protocols and power efficiency.',
            solutionAr: 'الإجابة: صح (TRUE). السلايد 14 و 17 تؤكدان أن طبيعة أجهزة الـ IoT محدودة المعالجات والبطارية تفرض استخدام بروتوكولات خفيفة موفرة للطاقة.'
          },
          {
            id: 'p-iot2-20',
            problemNumber: 20,
            partTitle: 'PART B / TRUE OR FALSE',
            partTitleAr: 'الجزء ب: صح أو خطأ',
            type: 'true_false',
            question: 'The IoT stack is concerned only with network communication protocols and does not include device hardware or applications.',
            questionAr: 'تهتم معمارية طبقات إنترنت الأشياء ببروتوكولات الاتصال الشبكي فقط ولا تشمل عتاد الأجهزة أو التطبيقات.',
            correctAnswer: 'False',
            solution: 'Answer: FALSE. Slide 17 explicitly highlights that unlike OSI/TCP-IP, the IoT stack "Starts from hardware itself (Sensors) to end user application... Includes device management, cloud platforms, and user interfaces."',
            solutionAr: 'الإجابة: غلط (FALSE). السلايد 17 توضح نصاً أن معمارية الـ IoT تبدأ من العتاد الفيزيائي نفسه وتصل لتطبيقات المستخدم وإدارة المنصات السحابية.'
          }
        ]
      }
    ]
  },
  {
    id: 'windows-programming',
    title: 'Visual & Windows Programming',
    titleAr: 'البرمجة المرئية وبرمجة تطبيقات Windows',
    instructor: 'هيئة التدريس',
    description: 'Desktop GUI application development using C# and the Microsoft .NET Framework, Windows Forms, event-driven programming, and database connectivity.',
    descriptionAr: 'تطوير تطبيقات سطح المكتب ذات الواجهات الرسومية (GUI) باستخدام لغة C# وإطار عمل Microsoft .NET وتقنية Windows Forms، وبرمجة الأحداث (Event-Driven)، والاتصال بقواعد البيانات.',
    term: 1,
    icon: 'Layout',
    isAvailable: false,
    lectures: [],
    sheets: []
  },
  {
    id: 'database-systems',
    title: 'Database Systems & Design',
    titleAr: 'نظم قواعد البيانات وتصميمها',
    instructor: 'هيئة التدريس',
    description: 'Relational data modeling, Entity-Relationship Diagrams (ERD), normalization rules, advanced SQL querying, transactions, and concurrency.',
    descriptionAr: 'النمذجة العلائقية للبيانات، مخططات الكيانات والعلاقات (ERD)، قواعد الـ Normalization، استعلامات SQL المتقدمة، والمعاملات (Transactions) والتزامن (Concurrency).',
    term: 1,
    icon: 'Database',
    isAvailable: false,
    lectures: [],
    sheets: []
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering & Lifecycle',
    titleAr: 'هندسة البرمجيات ودورة حياة التطوير',
    instructor: 'هيئة التدريس',
    description: 'Software development life cycle models and methodologies (Waterfall, Agile, Scrum), requirements engineering, UML modeling, testing methodologies, and project management.',
    descriptionAr: 'نماذج ومنهجيات دورة حياة تطوير البرمجيات (Waterfall و Agile و Scrum)، هندسة المتطلبات، النمذجة بـ UML، منهجيات الاختبار، وإدارة المشروعات.',
    term: 1,
    icon: 'FolderKanban',
    isAvailable: false,
    lectures: [],
    sheets: []
  }
];

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
    "id": "ai",
    "title": "Artificial Intelligence",
    "titleAr": "الذكاء الاصطناعي",
    "instructor": "د. نسمة محمود",
    "description": "Comprehensive academic study of Artificial Intelligence: Foundations, historical timeline and AI Winters, the 4 approaches matrix, Turing Test & 6 disciplines, Rational Agents, PEAS task environments, environmental dimensions, formal search problem formulation, and uninformed search strategies (BFS, DFS, UCS).",
    "descriptionAr": "الدراسة الأكاديمية الشاملة للذكاء الاصطناعي: الأسس الفلسفية والرياضية، الخط الزمني وظاهرة شتاء الذكاء الاصطناعي (AI Winters)، مصفوفة المناهج الأربعة، اختبار تورينج والتخصصات الستة، نظرية الوكلاء العقلانيين (Rational Agents)، توصيف بيئات PEAS، الأبعاد البيئية السبعة، صياغة مسائل البحث، وخوارزميات البحث غير الموجه (BFS, DFS, UCS).",
    "term": 1,
    "icon": "Bot",
    "isAvailable": true,
    "lectures": [
      {
        "id": "ai-lec-1",
        "courseId": "ai",
        "lectureNumber": 1,
        "title": "Introduction to AI, Historical Milestones & The 4 Approaches",
        "titleAr": "مدخل إلى الذكاء الاصطناعي، المحطات التاريخية والمناهج الأربعة",
        "brief": "Foundational concepts: Oxford definition of intelligence, 6 characteristics of intelligence, 3 fuel pillars of the modern boom, historical timeline from 1943 to ChatGPT, AI Winters, the 4 approaches matrix, Turing Test & 6 disciplines, Cognitive Modeling, Laws of Thought logic drawbacks, and Rational Agents.",
        "briefAr": "المفاهيم التأسيسية: تعريف أكسفورد للذكاء الاصطناعي، الخصائص الست للذكاء، الأركان الثلاثة لانفجار الذكاء الاصطناعي، الخط الزمني التاريخي من 1943 حتى ChatGPT ونموذج فترات شتاء الذكاء الاصطناعي (AI Winters)، مصفوفة المناهج الأربعة، اختبار تورينج وتخصصاته الستة، والوكيل العقلاني (Rational Agent).",
        "durationMinutes": 40,
        "interactiveTools": [
          "turing-test"
        ],
        "cheatSheet": [
          {
            "en": "Oxford Definition of AI: The capacity of computers or other machines to exhibit/show intelligent behavior, solve complex problems, and make decisions.",
            "ar": "تعريف أكسفورد للذكاء الاصطناعي: قدرة أجهزة الكمبيوتر أو الآلات على إظهار سلوك ذكي، حل المشاكل المعقدة، واتخاذ القرارات وتنفيذ مهام إبداعية."
          },
          {
            "en": "6 General Characteristics of Intelligence: Perception (sensors), Action (actuators), Reasoning (logical/deductive), Learning (adapting & pattern finding), Communication (language/signals), and Planning (goal agendas).",
            "ar": "الخصائص الست للذكاء البشري: الإدراك (Perception)، الفعل (Action)، الاستدلال (Reasoning)، التعلم (Learning)، التواصل (Communication)، والتخطيط (Planning)."
          },
          {
            "en": "The 3 Pillars of AI Explosion: Advanced Algorithms + Massive Big Data (\"Fuel\") + Specialized Computing Power (GPUs & TPUs). Data is the fuel that drives AI!",
            "ar": "أركان انفجار الذكاء الاصطناعي الثلاثة: خوارزميات متطورة + بيانات ضخمة (الوقود الحقيقي) + قدرات حوسبة خارقة (كروت شاشة GPUs ورقاقات TPUs)."
          },
          {
            "en": "Pattern of AI Winters: Repeated historical cycles where overpromising/overclaiming was followed by public disillusionment and severe funding cuts (1969-1979 and 1988-1993).",
            "ar": "شتاء الذكاء الاصطناعي (AI Winter): دورات تاريخية متكررة من الوعود المبالغ فيها والتهويل، يليها إحباط وفقدان أمل وقطع ميزانيات الأبحاث."
          },
          {
            "en": "Turing Test vs Total Turing Test: Standard test needs 4 disciplines (NLP, Knowledge Representation, Automated Reasoning, ML). The Total Turing Test requires physical interaction, adding Computer Vision and Robotics.",
            "ar": "اختبار تورينج مقابل الشامل: العادي يحتاج 4 تخصصات (NLP، تمثيل المعرفة، الاستدلال، والتعلم الآلي). أما الاختبار الشامل (Total Turing Test) فيتطلب تفاعلاً مع العالم الفيزيائي ويضيف الرؤية الحاسوبية (Computer Vision) والروبوتات (Robotics)."
          },
          {
            "en": "Golden Exam Rule: \"All rational agents are intelligent, but not all intelligent agents are rational.\" Rationality focuses on achieving optimal outcomes, not mimicking human mistakes or biases.",
            "ar": "قاعدة امتحانية ذهبية: \"كل وكيل عقلاني هو وكيل ذكي، لكن ليس كل وكيل ذكي عقلانياً!\" لأن العقلانية هدفها دايماً تحقيق أفضل نتيجة، مش تقليد أخطاء البشر وضعفهم."
          },
          {
            "en": "Core Course Focus: Acting Rationally (The Rational Agent Approach). An agent operates autonomously by perceiving its environment and executing actions to achieve the best expected outcome.",
            "ar": "محور تركيز المنهج: التصرف بعقلانية (منهج الوكيل العقلاني). الكيان يعمل باستقلالية تامة، يستشعر بيئته، ويتخذ القرار الذي يعظم النتيجة المتوقعة تحت عدم اليقين."
          }
        ],
        "terms": [
          {
            "term": "Rational Agent",
            "termAr": "الوكيل العقلاني (Rational Agent)",
            "definition": "An entity that perceives its environment through sensors and acts upon it via actuators to achieve the best outcome or, when uncertainty exists, the best expected outcome based on available information.",
            "definitionAr": "كيان مستقل يدرك بيئته عبر الحساسات ويتصرف فيها عبر المشغلات لتحقيق أفضل نتيجة ممكنة، أو أفضل نتيجة متوقعة في حالة عدم اليقين، بناءً على المعلومات المتاحة."
          },
          {
            "term": "Turing Test (1950)",
            "termAr": "اختبار تورينج (The Imitation Game)",
            "definition": "An operational definition of intelligence proposed by Alan Turing: a human interrogator poses written questions to a human and a machine; the machine passes if the interrogator cannot tell which responder is human.",
            "definitionAr": "تعريف إجرائي للذكاء اقترحه آلان تورينج: محقق بشري يطرح أسئلة كتابية على إنسان وآلة؛ وتنجح الآلة إذا عجز المحقق عن التمييز بين ردود الإنسان وردود الآلة."
          },
          {
            "term": "AI Winter",
            "termAr": "شتاء الذكاء الاصطناعي (AI Winter)",
            "definition": "Historical periods of widespread disillusionment and drastic research funding cuts caused by unrealistic overpromising that failed to materialize (e.g., after Minsky & Papert 1969 and after Expert Systems 1988).",
            "definitionAr": "فترات ركود تاريخية انخفض فيها تمويل الأبحاث والاهتمام الأكاديمي نتيجة وعود مبالغ فيها لم تتحقق على أرض الواقع (مثل أزمة 1969 وأزمة انهيار النظم الخبيرة 1988)."
          },
          {
            "term": "Cognitive Science",
            "termAr": "العلوم المعرفية (Cognitive Science)",
            "definition": "An interdisciplinary field combining AI computational models and experimental psychology techniques to construct precise theories of the human mind (Thinking Humanly approach).",
            "definitionAr": "علم متعدد التخصصات يدمج النماذج الحسابية للذكاء الاصطناعي مع تقنيات علم النفس التجريبي وأشعة الدماغ (fMRI) لفهم آلية التفكير البشري."
          },
          {
            "term": "Laws of Thought",
            "termAr": "قوانين التفكير المنطقية (Laws of Thought)",
            "definition": "The Aristotelian logic tradition aiming to formalize correct thinking using syllogisms and deductive logic. Its limitation in AI is computational explosion and inability to handle uncertain real-world facts.",
            "definitionAr": "منهج التفكير العقلاني القائم على منطق أرسطو والقياس الصوري؛ يعيبه في التطبيق العملي عجز المنطق الصارم عن تمثيل عدم اليقين والانفجار الحسابي."
          },
          {
            "term": "Total Turing Test",
            "termAr": "اختبار تورينج الشامل (Total Turing Test)",
            "definition": "An extended test requiring the machine to perceive real-world objects and physically manipulate the environment, necessitating Computer Vision and Robotics alongside NLP, KR, Automated Reasoning, and ML.",
            "definitionAr": "نسخة موسعة من اختبار تورينج تتطلب تفاعلاً فيزيائياً مع العالم الحقيقي وتمرير أشياء مادية، مما يفرض امتلاك قدرات الرؤية الحاسوبية (Computer Vision) والروبوتات (Robotics)."
          },
          {
            "term": "Big Data as Fuel",
            "termAr": "البيانات كوقود للذكاء الاصطناعي",
            "definition": "The massive volume, velocity, and variety of digital data (text, images, sensor telemetry) that modern deep learning and LLMs consume during training to discover latent patterns.",
            "definitionAr": "الكميات الضخمة والمتنوعة من النصوص والصور وقراءات الحساسات التي تتغذى عليها نماذج التعلم العميق واللغات الضخمة لتعلم الأنماط والتعميم."
          }
        ],
        "sections": [
          {
            "title": "1. What Is AI, Characteristics of Intelligence & The 3 Fuel Pillars",
            "titleAr": "1. ما هو الذكاء الاصطناعي، خصائص الذكاء، والأركان الثلاثة للطفرة",
            "content": "Artificial Intelligence explores designing computational systems capable of perception, reasoning, and autonomous decision-making. The Oxford English Dictionary defines AI as \"the capacity of computers, or other machines, to exhibit intelligent behavior.\" While AI theories date back over 50 years, the modern explosion into everyday life is driven by three synergistic components:",
            "contentAr": "الذكاء الاصطناعي ليس مجرد برامج حسابية تقليدية؛ يعرفه معجم أكسفورد بأنه \"قدرة أجهزة الكمبيوتر والآلات على إظهار سلوك ذكي يحل المشاكل المعقدة ويتخذ القرارات\". ورغم أن نظريات الذكاء الاصطناعي موجودة منذ الخمسينيات، إلا أن انفجاره المفاجئ في حياتنا اليومية يعود لاندماج 3 أركان حاسمة:",
            "bulletPoints": [
              "6 Characteristics of Intelligence: Perception (interpreting sensor data), Action (effectors/actuators), Reasoning (logical/inductive inference), Learning (adapting to change), Communication (signals and language), and Planning (goal agendas).",
              "Advanced Algorithms: The invention of Deep Neural Networks, Attention Mechanisms (Transformers in 2017), and Deep Reinforcement Learning.",
              "Big Data (\"The Fuel\"): Exabytes of textual, auditory, and visual data generated daily across the global web providing the training signal.",
              "Accelerated Hardware: Shifting from sequential single-thread CPUs to massively parallel GPUs (NVIDIA) and custom ASICs like Google TPUs (Tensor Processing Units)."
            ],
            "bulletPointsAr": [
              "الخصائص الست للذكاء: الإدراك (تفسير قراءات الحساسات)، الفعل (تشغيل المحركات)، الاستدلال (الاستنتاج المنطقي والاستقرائي)، التعلم (التكيف مع البيئة)، التواصل (اللغة والإشارات)، والتخطيط (صياغة خطط لتحقيق الأهداف).",
              "الخوارزميات المتقدمة: ابتكار الشبكات العصبية العميقة، نماذج المحولات (Transformers عام 2017)، وخوارزميات التعلم المعزز.",
              "البيانات الضخمة (الوقود الحقيقي): تدفق مليارات النصوص والصور وقراءات الحساسات يومياً، مما أتاح للنماذج التعلم بدقة فائقة.",
              "العتاد فائق السرعة: الانتقال من المعالجات المركزية التسلسلية (CPU) إلى المعالجة المتوازية الضخمة عبر كروت الشاشة (GPUs) والشرائح المخصصة لمصفوفات الذكاء الاصطناعي (Google TPUs)."
            ],
            "keyRule": "Synergy Rule: Algorithms are the engine, computing power is the accelerator, and Big Data is the indispensable fuel that drives modern AI breakthroughs.",
            "keyRuleAr": "قاعدة الامتحان: الخوارزميات هي المحرك، والعتاد الحسابي (GPUs) هو المسرع، والبيانات الضخمة (Big Data) هي الوقود الأساسي الذي يقود طفرة الذكاء الاصطناعي.",
            "quickCheck": {
              "question": "According to Lecture 1 Slide 9, which component is explicitly identified as the \"fuel that drives AI\"?",
              "questionAr": "وفقاً للسلايد 9 من المحاضرة، أي من مكونات الذكاء الاصطناعي يُشار إليه صراحة بأنه \"الوقود الذي يقود الذكاء الاصطناعي\"؟",
              "options": [
                "Big Data",
                "Sequential CPUs",
                "Logic Theorist Program",
                "Analog Sensors"
              ],
              "optionsAr": [
                "البيانات الضخمة (Data)",
                "المعالجات المركزية التسلسلية (CPUs)",
                "برامج المنطق الصوري",
                "الحساسات التناظرية"
              ],
              "correctIndex": 0,
              "explanation": "Slide 9 and Sheet 1 Question 3 establish that Data is the fuel that drives AI, while algorithms and computing hardware process that data.",
              "explanationAr": "السلايد 9 وسؤال الشيت الأول يوضحان أن البيانات (Data) هي الوقود الأساسي لمنظومة الذكاء الاصطناعي، والعتاد والخوارزميات هما أدوات المعالجة."
            }
          },
          {
            "title": "2. The Historical Timeline & The Phenomenon of AI Winters",
            "titleAr": "2. الخط الزمني التاريخي وظاهرة فترات \"شتاء الذكاء الاصطناعي\"",
            "content": "The history of AI is not a smooth progression, but a cyclic pattern of overpromising (unrealistic claims) followed by disillusionment and research funding freezes known as \"AI Winters\":",
            "contentAr": "تاريخ الذكاء الاصطناعي لم يكن خطاً مستقيماً، بل تميز بنمط دوري: موجات تفاؤل ووعود مبالغ فيها (Overclaiming)، تعقبها خيبة أمل عامة وقطع حاد في ميزانيات الأبحاث عُرف بـ \"شتاء الذكاء الاصطناعي\" (AI Winters):",
            "bulletPoints": [
              "1943: McCulloch & Pitts propose the first boolean circuit model of the artificial neuron (Perceptron). In 1958, Frank Rosenblatt devises a learning algorithm for perceptrons.",
              "1950: Alan Turing publishes \"Computing Machinery and Intelligence\", introducing the Turing Test.",
              "1956: The Dartmouth Workshop organized by McCarthy, Minsky, Rochester, and Shannon formally adopts the term \"Artificial Intelligence\".",
              "1969: Minsky & Papert publish their book proving single-layer perceptrons cannot learn the XOR function, triggering the First AI Winter.",
              "1980—1988: Commercial boom of Expert Systems and the rediscovery of the Backpropagation algorithm; followed by the Second AI Winter (1988—1993) when expert systems proved brittle and expensive to maintain.",
              "1997: IBM Deep Blue defeats Garry Kasparov in chess; 2002 sees embodied AI with the Roomba vacuum.",
              "2012—Present: AlexNet wins ImageNet, Transformers invented (2017), AlphaGo defeats Lee Sedol (2016), ChatGPT released (2022), and 2024 Nobel Prizes awarded for AI advances."
            ],
            "bulletPointsAr": [
              "1943: ماكولوتش وبيتس (McCulloch & Pitts) يبتكران أول نموذج عصبي حوسبي بدائرة منطقية، وفي 1958 وضع روزنبلات خوارزمية تدريب البيرسبترون.",
              "1950: آلان تورينج ينشر ورقته التاريخية ويطرح اختبار تورينج للذكاء الإجرائي.",
              "1956: مؤتمر دارتموث التأسيسي بقيادة جون ماكارثي ومارفن مينسكي يعتمد مصطلح \"الذكاء الاصطناعي\" (AI) رسمياً.",
              "1969: كتاب مينسكي وبابيرت يثبت رياضياً عجز البيرسبترون أحادي الطبقة عن تعلم دالة XOR، مما أدى لاندلاع أول شتاء للذكاء الاصطناعي.",
              "1980—1988: طفرة النظم الخبيرة (Expert Systems) وعودة خوارزمية Backpropagation؛ تلاها شتاء الذكاء الاصطناعي الثاني (1988—1993) بعد فشل صيانة النظم الخبيرة تجارياً.",
              "1997: نظام Deep Blue يهزم بطل العالم في الشطرنج غاري كاسباروف؛ و 2002 تشهد أول روبوت منزلي Roomba.",
              "2012—الآن: فوز AlexNet بمسابقة ImageNet، إطلاق معمارية المحولات (Transformers 2017)، فوز AlphaGo على لي سيدول (2016)، إطلاق ChatGPT (2022)، وجوائز نوبل 2024 لأبحاث الذكاء الاصطناعي."
            ],
            "keyRule": "AI Winter Cause: Every AI winter was directly triggered by exaggerated marketing promises exceeding the actual algorithmic capability and hardware power of that era.",
            "keyRuleAr": "سبب شتاء الذكاء الاصطناعي: كل شتاء كان نتيجة حتمية للتهويل وإطلاق وعود وردية مبالغ فيها تعجز الخوارزميات والعتاد المتوفر آنذاك عن تحقيقها.",
            "quickCheck": {
              "question": "In which year did the Dartmouth Conference take place where the term \"Artificial Intelligence\" was formally adopted?",
              "questionAr": "في أي عام أقيم مؤتمر دارتموث التأسيسي الذي اعتمد مصطلح \"الذكاء الاصطناعي\" رسمياً لأول مرة؟",
              "options": [
                "1956",
                "1943",
                "1950",
                "1969"
              ],
              "optionsAr": [
                "1956",
                "1943",
                "1950",
                "1969"
              ],
              "correctIndex": 0,
              "explanation": "In 1956, John McCarthy and pioneers at Dartmouth College formally adopted the name \"Artificial Intelligence\".",
              "explanationAr": "في عام 1956، عقد جون ماكارثي وزملاؤه مؤتمر دارتموث واعتمدوا رسمياً مصطلح الذكاء الاصطناعي."
            }
          },
          {
            "title": "3. The 4 Approaches to AI & The Turing Test Disciplines",
            "titleAr": "3. المناهج الأربعة للذكاء الاصطناعي والتخصصات الست لاختبار تورينج",
            "content": "The academic definition of AI spans a 2x2 conceptual matrix along two dimensions: Human-like vs Rational, and Thought processes vs Observable behavior:",
            "contentAr": "يقسم علماء الذكاء الاصطناعي تعريفاته ومناهجه عبر مصفوفة 2x2 على محورين: (محاكاة البشر مقابل العقلانية والمثالية) و (التفكير الداخلي مقابل السلوك الخارجي الملاحظ):",
            "bulletPoints": [
              "Thinking Humanly (Cognitive Science): Understanding the human mind through computational models, introspection, psychological testing, and fMRI brain imaging.",
              "Acting Humanly (Turing Test): An operational benchmark proposed by Alan Turing (1950). A computer passes if an interrogator cannot distinguish written responses from a human vs machine.",
              "The 6 AI Disciplines of the Turing Test: 1) Natural Language Processing (NLP) for communication, 2) Knowledge Representation to store facts, 3) Automated Reasoning to draw conclusions, 4) Machine Learning to detect patterns and adapt.",
              "The Total Turing Test: Adds physical real-world interaction, requiring: 5) Computer Vision to perceive objects, and 6) Robotics to manipulate physical objects and navigate.",
              "The Loebner Prize: Annual competition since 1990 awarding $100,000 for the first agent passing an unrestricted Turing test (modern LLMs like GPT-4 reach ~73% human deception rates)."
            ],
            "bulletPointsAr": [
              "التفكير كالبشر (Cognitive Science): محاكاة العقل البشري بالدراسات العصبية والنفسية، وفهم آلية التفكير عبر الرنين المغناطيسي fMRI والاستبطان.",
              "التصرف كالبشر (اختبار تورينج): تعريف إجرائي عملي؛ إذا تحاور محقق بشري كتابياً مع طرفين ولم يكتشف الآلة، تعتبر الآلة اجتازت اختبار الذكاء.",
              "التخصصات الأربعة لاختبار تورينج النصي: 1) معالجة اللغات الطبيعية (NLP) للتواصل، 2) تمثيل المعرفة لتخزين الحقائق، 3) الاستدلال الآلي لاستنتاج الإجابات، 4) التعلم الآلي للتكيف مع التغيير.",
              "اختبار تورينج الشامل (Total Turing Test): يتطلب تفاعلاً مع العالم الفيزيائي، ويضيف تخصصين إضافيين: 5) الرؤية الحاسوبية (Computer Vision) لإدراك الأشياء، و 6) الروبوتات (Robotics) لتحريك الأجسام والتنقل.",
              "جائزة لوبنر (Loebner Prize): مسابقة سنوية بدأت عام 1990 تمنح 100 ألف دولار لأول برنامج يجتاز الاختبار غير المقيد."
            ],
            "keyRule": "Turing vs Total: Standard Turing Test evaluates purely text-based communication (4 disciplines); Total Turing Test requires physical embodiment and vision (6 disciplines).",
            "keyRuleAr": "قاعدة الامتحان: اختبار تورينج القياسي يقتصر على التواصل النصي (4 تخصصات)؛ بينما الاختبار الشامل يفرض التفاعل الفيزيائي والرؤية الحاسوبية (6 تخصصات).",
            "quickCheck": {
              "question": "Which two capabilities must be added to the standard Turing Test to satisfy the \"Total Turing Test\"?",
              "questionAr": "ما القدرتان اللتان يجب إضافتهما لاختبار تورينج النصي القياسي لتحقيق متطلبات \"اختبار تورينج الشامل\" (Total Turing Test)؟",
              "options": [
                "Computer Vision and Robotics",
                "Natural Language Processing and Machine Learning",
                "Knowledge Representation and Automated Reasoning",
                "Speech Synthesis and Web Scraping"
              ],
              "optionsAr": [
                "الرؤية الحاسوبية والروبوتات (Computer Vision & Robotics)",
                "معالجة اللغات الطبيعية والتعلم الآلي",
                "تمثيل المعرفة والاستدلال الآلي",
                "توليد الكلام وسحب بيانات الويب"
              ],
              "correctIndex": 0,
              "explanation": "Slide 17 highlights that the Total Turing Test requires physical interaction with the real world, necessitating Computer Vision (perception) and Robotics (manipulation).",
              "explanationAr": "السلايد 17 توضح أن اختبار تورينج الشامل يتطلب تفاعلاً فيزيائياً مع العالم، مما يفرض وجود الرؤية الحاسوبية للرؤية والروبوتات للتحريك."
            }
          },
          {
            "title": "4. Thinking Rationally vs Acting Rationally (The Rational Agent Focus)",
            "titleAr": "4. التفكير بعقلانية مقابل التصرف بعقلانية (منهج الوكيل العقلاني)",
            "content": "The syllabus explicitly distinguishes between logical deduction (\"Thinking Rationally\") and autonomous goal maximization (\"Acting Rationally\"):",
            "contentAr": "يركز المقرر الدراسي على المقارنة الجوهرية بين التفكير المنطقي الصوري والتصرف العقلاني العملي في العالم الحقيقي:",
            "bulletPoints": [
              "Thinking Rationally (\"Laws of Thought\"): Uses formal syllogisms (e.g., \"All humans are mortal; Socrates is a human; therefore Socrates is mortal\").",
              "Drawbacks of Pure Logic: 1) Translating messy real-world facts into formal logic is extremely difficult; 2) Inability to handle incomplete or uncertain data; 3) Combinatorial computational explosion as facts multiply; 4) Reflex actions (e.g., pulling hand from hot stove) require immediate action without logical deduction.",
              "Acting Rationally (The Rational Agent Approach): An agent that operates autonomously, perceiving its environment and choosing the action that maximizes goal achievement or expected outcome under uncertainty.",
              "Axiom: Rationality is NOT omniscience (knowing everything in advance); rationality is doing the best possible action given the available percept sequence history.",
              "The Ultimate Exam Statement: \"All rational agents are intelligent, but not all intelligent agents are rational.\" General intelligence can include human irrationality or emotions, but rationality strictly focuses on optimality."
            ],
            "bulletPointsAr": [
              "التفكير بعقلانية (قوانين التفكير): يعتمد على المنطق الصوري لأرسطو والقياس (سقراط إنسان، كل البشر فانون، إذاً سقراط فانٍ).",
              "عيوب المنطق الصارم في الواقع: 1) صعوبة صياغة العالم الحقيقي غير المنظم بلغة منطقية بحتة؛ 2) العجز عن التعامل مع عدم اليقين والاحتمالات؛ 3) الانفجار الحسابي الهائل مع زيادة الحقائق؛ 4) ردود الأفعال الانعكاسية (كسحب اليد من الفرن الساخن) تتطلب تدخلاً فورياً دون إضاعة وقت في الاستدلال المنطقي.",
              "التصرف بعقلانية (منهج الوكيل العقلاني - محور المقرر): الوكيل يدرك البيئة ويختار التصرف الذي يعظم النتيجة المتوقعة لتحقيق الهدف حتى في ظل عدم اليقين.",
              "العقلانية ليست معرفة الغيب (Omniscience): العقلاني يتخذ أصح قرار متاح بناءً على المعلومات وقراءات الحساسات المتوفرة لديه، وليس التنبؤ بالمستقبل المطلق.",
              "القاعدة الحاسمة للامتحان: \"كل وكيل عقلاني هو ذكي، ولكن ليس كل وكيل ذكي عقلانياً!\" لأن الذكاء قد يحاكي أخطاء البشر، أما العقلانية فتبحث عن التصرف الأمثل لتحقيق الهدف."
            ],
            "keyRule": "Rationality Principle: Rational behavior means doing the right thing to maximize expected goal achievement based on available information, not mimicking human emotional flaws.",
            "keyRuleAr": "مبدأ العقلانية: السلوك العقلاني يعني اتخاذ القرار الصحيح الذي يعظم احتمالية تحقيق الهدف بأفضل نتيجة ممكنة، وليس محاكاة أخطاء البشر وانفعالاتهم.",
            "quickCheck": {
              "question": "Which of the following statements represents the fundamental exam axiom regarding rationality and intelligence?",
              "questionAr": "أي من العبارات التالية تمثل القاعدة الامتحانية الأساسية حول العلاقة بين العقلانية والذكاء؟",
              "options": [
                "All rational agents are intelligent, but not all intelligent agents are rational",
                "All intelligent agents are rational, but rational agents cannot be intelligent",
                "Rationality requires absolute omniscience and predicting the future with 100% certainty",
                "Thinking humanly is mathematically identical to acting rationally"
              ],
              "optionsAr": [
                "كل وكيل عقلاني هو وكيل ذكي، ولكن ليس كل وكيل ذكي يعتبر عقلانياً",
                "كل وكيل ذكي هو عقلاني، لكن الوكلاء العقلانيين لا يمكن أن يكونوا أذكياء",
                "العقلانية تقتضي معرفة الغيب المطلقة والتنبؤ بالمستقبل بنسبة 100%",
                "التفكير كالبشر متطابق رياضياً مع التصرف بعقلانية"
              ],
              "correctIndex": 0,
              "explanation": "Slide 24 and Sheet 1 Question 4 explicitly formulate that all rational agents are intelligent because they achieve optimal goals, but not all intelligent systems are rational.",
              "explanationAr": "السلايد 24 وسؤال الشيت الأول يؤكدان أن كل وكيل عقلاني هو ذكي لأنه يتصرف بالشكل الأمثل، ولكن ليس كل نظام ذكي عقلانياً لأنه قد يقلد أخطاء البشر."
            }
          }
        ],
        "questions": [
          {
            "id": "q-ai1-1",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "mcq",
            "question": "What three key components explain why AI has recently exploded into everyday lives?",
            "questionAr": "ما المكونات الثلاثة التي تفسر الطفرة والانفجار الأخير للذكاء الاصطناعي في حياتنا اليومية؟",
            "options": [
              "Advanced Algorithms, Big Data, and Massive Computing Power (GPUs/TPUs)",
              "Relational Databases, Analog Sensors, and Desktop CPUs",
              "Expert Systems, Lisp Machines, and Dial-up Internet",
              "Robotics, Optical Discs, and Symbolic Logic"
            ],
            "optionsAr": [
              "الخوارزميات المتقدمة، البيانات الضخمة، والقدرات الحوسبية الفائقة (GPUs/TPUs)",
              "قواعد البيانات العلائقية، الحساسات التناظرية، والمعالجات المكتبية",
              "النظم الخبيرة، أجهزة ليسب، والإنترنت الهاتفي القديم",
              "الروبوتات، الأقراص الضوئية، والمنطق الرمزي"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 9 states: \"It is these three components of advanced algorithms, data and computing power, that explain how machines can exhibit intelligent behavior and why AI has suddenly exploded into our everyday lives.\"",
            "explanationAr": "السلايد رقم 9 تؤكد نصاً أن اندماج الخوارزميات المتقدمة، وتوافر كميات هائلة من البيانات، والعتاد الحسابي المتوازي هو سر انفجار الذكاء الاصطناعي الحديث."
          },
          {
            "id": "q-ai1-2",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "mcq",
            "question": "In the Turing Test (1950), when does a machine pass the test?",
            "questionAr": "في اختبار تورينج للذكاء (1950)، متى تنجح الآلة في اجتياز الاختبار؟",
            "options": [
              "When the human interrogator cannot tell whether the written responses came from the human or the computer",
              "When the machine physically moves faster than a human",
              "When the machine solves a mathematical theorem in zero seconds",
              "When the machine displays simulated emotions on a screen"
            ],
            "optionsAr": [
              "إذا عجز المحقق البشري عن التمييز بين ما إذا كانت الردود المكتوبة صادرة من الإنسان أم من الكمبيوتر",
              "إذا تحركت الآلة فيزيائياً بسرعة أكبر من سرعة الإنسان",
              "إذا قامت الآلة بحل نظرية رياضية معقدة في صفر ثانية",
              "إذا قامت الآلة بعرض مشاعر إلكترونية مصطنعة على الشاشة"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 16 defines the Turing Test: The computer passes if the interrogator cannot tell whether the written responses come from the human responder or the computer.",
            "explanationAr": "السلايد رقم 16 توضح أن الآلة تنجح إذا تحاورت كتابةً مع محقق بشري ولم يستطع تحديد من منهما الإنسان ومن منهما الآلة."
          },
          {
            "id": "q-ai1-3",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "true_false",
            "question": "All rational agents are intelligent, but not all intelligent agents are rational.",
            "questionAr": "كل وكيل عقلاني (Rational Agent) هو وكيل ذكي، لكن ليس كل وكيل ذكي يعتبر عقلانياً.",
            "correctAnswer": true,
            "explanation": "True. Rationality is focused on optimal performance and expected goal achievement, whereas general intelligence can mimic human irrationality.",
            "explanationAr": "صحيح. العقلانية تركز على تعظيم النتيجة واتخاذ القرار الأمثل، بينما الذكاء العام قد يتضمن محاكاة تصرفات بشرية غير رشيدة."
          },
          {
            "id": "q-ai1-4",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "mcq",
            "question": "Which of the following was a major cause of the First AI Winter in 1969?",
            "questionAr": "أي من الأحداث التالية كان سبباً مباشراً في اندلاع شتاء الذكاء الاصطناعي الأول عام 1969؟",
            "options": [
              "Minsky and Papert mathematically proved that single-layer perceptrons could not learn the XOR function",
              "The release of ChatGPT caused massive safety concerns",
              "IBM Deep Blue was dismantled",
              "Google stopped TPU production"
            ],
            "optionsAr": [
              "إثبات مينسكي وبابيرت رياضياً عجز البيرسبترون أحادي الطبقة عن تعلم دالة XOR",
              "إطلاق ChatGPT أثار مخاوف أمنية أوقفت الأبحاث",
              "تفكيك حاسوب ديب بلو للشطرنج",
              "توقف جوجل عن تصنيع شرائح TPU"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 8 explicitly cites: \"1969: Minsky & Papert: perceptrons can’t learn XOR/parity!\", which led to a collapse in neural network funding.",
            "explanationAr": "السلايد 8 توضح أن كتاب مينسكي وبابيرت عام 1969 أثبت عجز البيرسبترون عن تعلم دالة XOR، مما أدى لانهيار الدعم المالي لأبحاث الشبكات العصبية."
          },
          {
            "id": "q-ai1-5",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "mcq",
            "question": "Which AI approach is the primary focus of this course?",
            "questionAr": "أي من مناهج الذكاء الاصطناعي الأربعة يمثل محور التركيز الأساسي لهذا المقرر؟",
            "options": [
              "Acting Rationally (Rational Agents)",
              "Thinking Humanly (Cognitive Science)",
              "Thinking Rationally (Laws of Thought)",
              "Acting Humanly (Turing Test)"
            ],
            "optionsAr": [
              "التصرف بعقلانية (منهج الوكلاء العقلانيين)",
              "التفكير كالبشر (العلوم المعرفية)",
              "التفكير بعقلانية (قوانين التفكير الصورية)",
              "التصرف كالبشر (اختبار تورينج)"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 24 and the syllabus explicitly state: \"This course focuses on intelligent and rational agents (Acting Rationally).\"",
            "explanationAr": "السلايد رقم 24 والمقرر الدراسي يؤكدان أن التركيز الأكاديمي الأساسي للمنهج منصب على منهج الوكيل العقلاني (Acting Rationally)."
          },
          {
            "id": "q-ai1-6",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "true_false",
            "question": "Rationality is identical to omniscience (possessing complete knowledge of all future outcomes).",
            "questionAr": "العقلانية مطابقة لمفهوم المعرفة الكلية (Omniscience) والقدرة على التنبؤ بنتائج المستقبل بنسبة 100%.",
            "correctAnswer": false,
            "explanation": "False. Omniscience knows the actual future outcome (impossible). Rationality maximizes expected performance given the percept sequence history.",
            "explanationAr": "خطأ. المعرفة الكلية تعني معرفة الغيب مسبقاً وهو مستحيل في العالم الحقيقي؛ أما العقلانية فتعني اختيار أفضل تصرف متوقع بناءً على ما وصل للحساسات."
          },
          {
            "id": "q-ai1-7",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "mcq",
            "question": "Which of the following is NOT one of the 4 disciplines required for the standard text-based Turing Test?",
            "questionAr": "أي من المجالات التالية ليس من التخصصات الأربعة المطلوبة لاجتياز اختبار تورينج النصي القياسي؟",
            "options": [
              "Robotics",
              "Natural Language Processing",
              "Knowledge Representation",
              "Machine Learning"
            ],
            "optionsAr": [
              "الروبوتات (Robotics)",
              "معالجة اللغات الطبيعية (NLP)",
              "تمثيل المعرفة (Knowledge Representation)",
              "التعلم الآلي (Machine Learning)"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 17 clarifies that Robotics and Computer Vision are required for the Total Turing Test, while the standard text test requires NLP, KR, Automated Reasoning, and ML.",
            "explanationAr": "السلايد 17 توضح أن الروبوتات والرؤية الحاسوبية مطلوبتان للاختبار الشامل (Total Turing Test)، أما الاختبار النصي فيكتفي بـ NLP وتمثيل المعرفة والاستدلال والتعلم."
          },
          {
            "id": "q-ai1-8",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "true_false",
            "question": "Pulling your hand away instantly when touching a hot stove is an example of rational action that does not rely on logical deduction.",
            "questionAr": "سحب اليد فوراً عند لمس فرن ساخن هو مثال على تصرف عقلاني سليم لا يعتمد على الاستدلال المنطقي الصوري.",
            "correctAnswer": true,
            "explanation": "True. Slide 21 and 23 note that reflex actions are rational because they maximize survival, even though they bypass slow logical reasoning.",
            "explanationAr": "صحيح. السلايد 21 و 23 توضحان أن الأفعال المنعكسة تحمي الكائن وتحقق هدفه بكفاءة بالغة دون الحاجة لخطوات منطقية بطيئة."
          },
          {
            "id": "q-ai1-9",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "mcq",
            "question": "What is the purpose of Google TPUs (Tensor Processing Units)?",
            "questionAr": "ما الغرض الأساسي من ابتكار جوجل لرقاقات TPU (Tensor Processing Units)؟",
            "options": [
              "Custom ASIC hardware specifically designed to accelerate matrix multiplications in neural networks",
              "To replace relational database storage on local hard drives",
              "To provide analog power supplies for vacuum cleaners",
              "To execute sequential BIOS boot instructions"
            ],
            "optionsAr": [
              "شرائح مخصصة (ASIC) لتسريع عمليات ضرب المصفوفات الضخمة في الشبكات العصبية بسرعة فائقة",
              "استبدال وسائط تخزين قواعد البيانات على الأقراص الصلبة",
              "توفير طاقة تناظرية للمكانس الكهربائية",
              "تنفيذ تعليمات إقلاع البيوس التسلسلية"
            ],
            "correctAnswer": 0,
            "explanation": "TPUs are application-specific integrated circuits engineered by Google specifically to accelerate tensor operations and deep learning training.",
            "explanationAr": "رقاقات TPU هي دوائر متكاملة مخصصة صممتها جوجل لتسريع عمليات المصفوفات والموترات في الشبكات العصبية."
          },
          {
            "id": "q-ai1-10",
            "courseId": "ai",
            "lectureId": "ai-lec-1",
            "type": "true_false",
            "question": "In 1997, IBM Deep Blue became the first computer chess-playing system to defeat a reigning world chess champion.",
            "questionAr": "في عام 1997، أصبح حاسوب ديب بلو (Deep Blue) أول نظام ذكاء اصطناعي يهزم بطل العالم في الشطرنج غاري كاسباروف.",
            "correctAnswer": true,
            "explanation": "True. Slide 8 records: \"1997: Deep Blue defeats Gary Kasparov at chess.\"",
            "explanationAr": "صحيح. السلايد 8 تسجل هزيمة ديب بلو للبطل العالمي غاري كاسباروف عام 1997 كمحطة فارقة."
          }
        ]
      },
      {
        "id": "ai-lec-2",
        "courseId": "ai",
        "lectureNumber": 2,
        "title": "Intelligent Agents, Architecture & Task Environments (PEAS)",
        "titleAr": "الوكلاء الأذكياء، المعمارية وبيئات المهام وإطار PEAS",
        "brief": "Deep architectural foundations: AI Chatbots vs AI Agents, Percepts and Actuators, the fundamental formula Agent = Architecture + Program, Agent Function f: P* -> A, Rationality vs Omniscience, Reflex vs Planning Agents, the complete PEAS framework (Taxi, Vacuum, Spam Filter, ActiNav), and the 7 environment dimensions with the complete 10-environment classification matrix.",
        "briefAr": "تشريح معماري عميق: شات بوت الذكاء الاصطناعي مقابل الوكيل المستقل، الحساسات والمشغلات، المعادلة الجوهرية (Agent = Architecture + Program)، دالة الوكيل الرياضية ومفهوم العقلانية مقابل المعرفة الكلية، مقارنة الوكيل الانعكاسي بوكيل التخطيط، إطار PEAS الكامل، والأبعاد البيئية السبعة مع مصفوفة تصنيف البيئات العشر المعتمدة في الامتحان.",
        "durationMinutes": 45,
        "interactiveTools": [
          "vacuum-world"
        ],
        "cheatSheet": [
          {
            "en": "Agent Architecture Formula: Agent = Architecture + Agent Program. The architecture provides physical sensors and actuators; the program runs the logic.",
            "ar": "معادلة معمارية الوكيل: (الوكيل = المعمارية + برنامج الوكيل). المعمارية توفر العتاد المادي والحساسات والمشغلات؛ والبرنامج ينفذ الخوارزمية."
          },
          {
            "en": "Agent Function vs Agent Program: The Agent Function (f: P* -> A) is an abstract mathematical mapping from entire percept histories to actions. The Agent Program is the concrete code running on the architecture.",
            "ar": "دالة الوكيل مقابل برنامجه: دالة الوكيل (f: P* -> A) توصيف رياضي مجرد يربط تاريخ المدركات بالأفعال؛ أما برنامج الوكيل فهو الكود البرمجي الفعلي الذي ينفذ تلك الدالة."
          },
          {
            "en": "Why Not Lookup Tables? An explicit table of all percept sequences (P*) would be infinite and intractable! AI aims to write compact programs generating rational actions.",
            "ar": "ليه مينفعش جداول Lookup Table؟ لأن جدول كل سلاسل المدركات الممكنة سيكون حجمه لا نهائياً! هدف الذكاء الاصطناعي كتابة برامج مدمجة تختار التصرف العقلاني دون حفظ مسبق."
          },
          {
            "en": "Reflex vs Planning (Goal-Based) Agents: Reflex agents use condition-action rules (\"if X then Y\", reactive, no lookahead). Planning agents maintain world models and explicitly search future outcomes to achieve goals.",
            "ar": "الانعكاسي مقابل وكيل التخطيط: الانعكاسي يعمل بقواعد شرطية مباشرة (إذا حدث كذا افعل كذا، بلا نظرة للمستقبل). وكيل التخطيط يمتلك نموذجاً للعالم ويبحث مسبقاً في سيناريوهات المستقبل لتحقيق الهدف."
          },
          {
            "en": "PEAS Framework: Performance measure (evaluation criteria), Environment (external surroundings), Actuators (mechanisms to execute actions), Sensors (input channels).",
            "ar": "إطار PEAS لتوصيف المسائل: مقياس الأداء (P)، البيئة الخارجية (E)، المشغلات المادية (A)، والحساسات المستقبلة للمدخلات (S)."
          },
          {
            "en": "Semidynamic Environment: The environment itself does not change while the agent deliberates, but the agent's performance score decreases over time (e.g., Chess with a clock).",
            "ar": "البيئة شبه الديناميكية (Semidynamic): البيئة الفيزيائية لا تتغير أثناء تفكير الوكيل، لكن نقاط أدائه أو وقته المتاح يتناقص مع مرور الوقت (مثل الشطرنج مع ساعة توقيت)."
          },
          {
            "en": "The Hardest Environment Type: Partially Observable, Stochastic, Sequential, Dynamic, Continuous, Multi-agent (e.g., Taxi driving in real cities).",
            "ar": "أصعب أنواع البيئات على الوكيل: أن تكون ملاحظة جزئياً، احتمالية، تتابعية، ديناميكية متغيرة باستمرار، متصلة، ومتعددة الوكلاء (مثل قيادة التاكسي في شوارع المدينة)."
          }
        ],
        "terms": [
          {
            "term": "Agent Architecture Formula",
            "termAr": "معادلة معمارية الوكيل (Agent = Architecture + Program)",
            "definition": "The fundamental principle stating that an agent consists of physical or virtual hardware (Architecture) that provides sensors and actuators, and software (Agent Program) that processes inputs and computes actions.",
            "definitionAr": "المبدأ الأساسي الذي يوضح أن أي وكيل يتكون من عتاد مادي أو افتراضي (Architecture) يوفر الحساسات والمشغلات، وبرنامج حوسبي (Agent Program) يعالج المدخلات ويصدر القرارات."
          },
          {
            "term": "Percept Sequence (P*)",
            "termAr": "سلسلة المدركات الحركية (Percept Sequence)",
            "definition": "The complete historical sequence of all sensory inputs the agent has ever perceived since its initialization.",
            "definitionAr": "التاريخ التراكمي الكامل لكل المدخلات وقراءات الحساسات التي استقبلها الوكيل منذ لحظة تشغيله الأولى."
          },
          {
            "term": "Agent Function (f)",
            "termAr": "دالة الوكيل الرياضية (Agent Function)",
            "definition": "An abstract mathematical function f: P* -> A that maps any given percept sequence history to a specific action.",
            "definitionAr": "توصيف رياضي مجرد يربط بين أي سلسلة مدركات تاريخية ممكنة (P*) والفعل المناسب الذي يجب تنفيذه (Action)."
          },
          {
            "term": "PEAS Description",
            "termAr": "توصيف بيئة PEAS",
            "definition": "A formal framework for defining task environments: Performance Measure, Environment, Actuators, and Sensors.",
            "definitionAr": "إطار منهجي رسمي لتوصيف أي مسألة ذكاء اصطناعي: مقياس الأداء، البيئة، المشغلات، والحساسات."
          },
          {
            "term": "Episodic vs Sequential",
            "termAr": "البيئة المجزأة مقابل التتابعية",
            "definition": "In an episodic environment, the agent's experience is divided into independent atomic episodes where past actions do not affect the next episode. In a sequential environment, current decisions have long-term consequences on all future states.",
            "definitionAr": "في البيئة المجزأة، تنقسم تجربة الوكيل لمقاطع مستقلة لا يؤثر فيها تصرف الماضي على الحاضر؛ بينما في التتابعية، تؤثر قرارات اليوم على جميع حالات وقرارات المستقبل."
          },
          {
            "term": "Semidynamic Environment",
            "termAr": "البيئة شبه الديناميكية (Semidynamic)",
            "definition": "An environment that does not physically change while the agent is deliberating, but the performance score or available time drops over time (e.g., timed chess).",
            "definitionAr": "بيئة تظل ثابتة فيزيائياً أثناء تفكير الوكيل، لكن نقاط التقييم أو الوقت المسموح به يتناقص كلما تأخر في اتخاذ القرار."
          },
          {
            "term": "Omniscience",
            "termAr": "المعرفة الكلية (Omniscience)",
            "definition": "Knowing the actual outcome of actions in advance. Omniscience is impossible in reality; rational agents maximize expected outcomes rather than actual outcomes.",
            "definitionAr": "معرفة النتيجة الحتمية للأفعال مسبقاً وبشكل قاطع، وهو مستحيل في الواقع؛ لذلك تكتفي العقلانية بتعظيم النتيجة المتوقعة."
          }
        ],
        "sections": [
          {
            "title": "1. AI Chatbots vs AI Agents & The Fundamental Architecture Formula",
            "titleAr": "1. شات بوت الذكاء الاصطناعي مقابل الوكيل والمعادلة المعمارية التأسيسية",
            "content": "While an AI chatbot (like standard ChatGPT) passively generates text responses upon request, an AI Agent operates an autonomous closed-loop cycle of perception, reasoning, and real-world execution. The fundamental equation that defines any agent is:",
            "contentAr": "بينما يكتفي شات بوت الذكاء الاصطناعي (مثل ChatGPT التقليدي) بتوليد ردود نصية عند سؤاله، يعمل \"الوكيل المستقل\" (AI Agent) في حلقة مغلقة ومستمرة من الإدراك والاستدلال والتنفيذ التلقائي على البيئة. وتتحدد بنية أي وكيل بالمعادلة التأسيسية:",
            "bulletPoints": [
              "The Fundamental Formula: Agent = Architecture + Agent Program.",
              "Architecture: The physical computing device, PC, mobile, or robot that supplies physical sensors and actuators.",
              "Agent Program: The concrete algorithm or code implementation running on the architecture to process sensory inputs and select actions.",
              "Percept: The agent's perceptual input at any single instant; Percept Sequence (P*) is the complete history of everything perceived.",
              "Mathematical Agent Function: f: P* -> A maps any percept sequence to an action.",
              "The Lookup Table Limitation: Writing an explicit lookup table for f is impossible because P* grows exponentially or infinitely; AI seeks compact programs that calculate rational actions dynamically.",
              "Physical Agents (Robots with cameras and motors) vs Software Agents (Spam filters with network sockets and mail folders)."
            ],
            "bulletPointsAr": [
              "المعادلة الجوهرية: الوكيل = المعمارية (Architecture) + برنامج الوكيل (Agent Program).",
              "المعمارية (Architecture): العتاد المادي أو الحاسوب الذي يوفر الحساسات والمشغلات الفعلية.",
              "برنامج الوكيل (Agent Program): الكود أو الخوارزمية التي تعمل داخل المعمارية لمعالجة قراءات الحساسات واختيار الأفعال.",
              "المُدرَك (Percept): المدخل الحسي للوكيل في لحظة معينة؛ وسلسلة المدركات (P*) هي التاريخ الكامل لكل ما استشعره منذ البداية.",
              "دالة الوكيل الرياضية: دالة مجردة f: P* -> A تربط بين تاريخ المدركات بالكامل والفعل المختار.",
              "استحالة جداول الحفظ المسبق (Lookup Tables): لا يمكن تخزين دالة الوكيل في جدول مسبق لأن سلسلة المدركات تنمو بشكل لانهائي؛ هدف الذكاء الاصطناعي كتابة برامج مدمجة وذكية تستنتج الفعل.",
              "الوكلاء الماديون (روبوتات ذات حساسات وعجلات) مقابل الوكلاء البرمجيين (فلتر البريد المزعج الذي يستشعر عبر السوكت ويحرك الرسائل للمجلدات)."
            ],
            "keyRule": "Architecture Formula: Agent = Architecture + Agent Program. The Architecture supplies physical sensors and actuators; the Program implements the agent function.",
            "keyRuleAr": "قاعدة الامتحان: الوكيل = المعمارية + برنامج الوكيل. المعمارية توفر الحساسات والمشغلات، والبرنامج ينفذ الخوارزمية.",
            "quickCheck": {
              "question": "According to Lecture 2 Slide 11, which component of an agent provides physical sensors and actuators?",
              "questionAr": "وفقاً للسلايد 11 من المحاضرة، أي مكون من مكونات الوكيل هو المسؤول عن توفير الحساسات والمشغلات الفيزيائية؟",
              "options": [
                "Architecture",
                "Agent Program",
                "Lookup Table",
                "Utility Function"
              ],
              "optionsAr": [
                "المعمارية (Architecture)",
                "برنامج الوكيل (Agent Program)",
                "جدول البحث المسبق",
                "دالة المنفعة"
              ],
              "correctIndex": 0,
              "explanation": "Slide 11 explicitly dictates: \"The architecture provides physical sensors and actuators, while the agent program processes sensory inputs and selects actions.\"",
              "explanationAr": "السلايد 11 وسؤال الشيت الثاني يؤكدان أن المعمارية (Architecture) هي التي توفر الحساسات والمشغلات المادية، بينما البرنامج يعالج المدخلات."
            }
          },
          {
            "title": "2. Rationality vs Omniscience & Reflex vs Planning Agents",
            "titleAr": "2. العقلانية مقابل المعرفة الكلية والفرق بين الوكيل الانعكاسي ووكيل التخطيط",
            "content": "A rational agent does not need to know the future with absolute certainty. Rationality is about making the best decision given what is currently known and perceived:",
            "contentAr": "الوكيل العقلاني لا يشترط فيه معرفة المستقبل المطلق؛ بل العقلانية هي اتخاذ أفضل قرار ممكن يخدم الهدف بناءً على المعلومات وقراءات الحساسات المتاحة:",
            "bulletPoints": [
              "Rationality vs Omniscience: Omniscience implies knowing the actual outcome of actions beforehand (impossible in reality). Rationality maximizes EXPECTED performance based on percept history and built-in knowledge.",
              "Information Gathering & Exploration: A rational agent must engage in exploration to learn about initially unknown environments and maintain autonomy.",
              "Simple Reflex Agents: Base decisions strictly on current percepts using Condition-Action Rules (\"if situation X, then do action Y\"). Reactive, no memory of past states, no explicit lookahead.",
              "Planning (Goal-Based) Agents: Combine a world model with explicit goals to search for multi-step action sequences. Proactive (\"What will happen if I do action A? Will it achieve my goal?\").",
              "Flexibility Trade-off: If the destination or goal changes, a reflex agent requires rewriting many condition-action rules manually, whereas a planning agent automatically adapts by changing the goal in its search algorithm."
            ],
            "bulletPointsAr": [
              "العقلانية مقابل المعرفة الكلية: المعرفة الكلية (Omniscience) تعني معرفة ما سيحدث مستقبلاً بيقين مطلق (مستحيل واقعياً). أما العقلانية فتعظم النتيجة المتوقعة (Expected) بناءً على ما ورد من مدركات.",
              "جمع المعلومات والاستكشاف: يجب على الوكيل العقلاني استكشاف البيئة ليتعلم ما يجهله ولا يظل أعمى عن التغيرات.",
              "الوكلاء الانعكاسيون (Simple Reflex Agents): يتصرفون بقواعد شرطية مباشرة (إذا كان كذا افعل كذا)، استجابة لحظية بلا نظرة للمستقبل ولا تفكير في العواقب بعيدة المدى.",
              "وكلاء التخطيط القائمون على الأهداف (Planning / Goal-Based Agents): يمتلكون نموذجاً للعالم ويبحثون مسبقاً في سيناريوهات الأفعال لتقييم ما إذا كانت ستحقق الهدف.",
              "المرونة والتكيف: إذا تغير الهدف، يحتاج الوكيل الانعكاسي لإعادة كتابة قواعده يدوياً؛ بينما يتكيف وكيل التخطيط تلقائياً بمجرد إعطائه الهدف الجديد في خوارزمية البحث."
            ],
            "keyRule": "Reflex vs Planning: Reflex agents ask \"What should I do now?\" using rules; Planning agents ask \"What will happen if I do this, and will it achieve my goal?\" using search.",
            "keyRuleAr": "قاعدة الامتحان: الوكيل الانعكاسي يسأل \"ماذا أفعل الآن فوراً؟\" بقواعد شرطية؛ أما وكيل التخطيط فيسأل \"ماذا سيحدث لو فعلت كذا وهل سيحقق هدفي؟\" باستخدام البحث.",
            "quickCheck": {
              "question": "Which agent architecture evaluates future multi-step consequences and automatically adapts when a destination goal changes without rewriting rules?",
              "questionAr": "أي نوع من معمارية الوكلاء يقوم بتقييم العواقب المستقبلية متعددة الخطوات ويتكيف تلقائياً عند تغيير الهدف دون الحاجة لإعادة كتابة القواعد يدوياً؟",
              "options": [
                "Planning (Goal-Based) Agent",
                "Simple Reflex Agent",
                "Lookup Table Agent",
                "Hard-coded Circuit"
              ],
              "optionsAr": [
                "وكيل التخطيط القائم على الأهداف (Goal-Based Agent)",
                "الوكيل الانعكاسي البسيط (Simple Reflex Agent)",
                "وكيل جداول الحفظ",
                "الدوائر المنطقية المبرمجة مسبقاً"
              ],
              "correctIndex": 0,
              "explanation": "Slide 13 highlights that Goal-Based (Planning) agents explicitly use search algorithms to evaluate multi-step future outcomes and possess high flexibility.",
              "explanationAr": "السلايد 13 توضح أن وكيل التخطيط يبحث في عواقب الأفعال المستقبلية ويتمتع بمرونة فائقة تسمح له بالتكيف بمجرد تغيير الهدف."
            }
          },
          {
            "title": "3. The PEAS Framework & Real-World Agent Formalization",
            "titleAr": "3. إطار PEAS لتوصيف بيئات المهام ونماذج التطبيقات الواقعية",
            "content": "Before writing an agent program, the AI engineer must formally specify its task environment using the PEAS framework (Performance, Environment, Actuators, Sensors):",
            "contentAr": "قبل البدء في كتابة أي سطر برمجي، يلتزم مهندس الذكاء الاصطناعي بتوصيف بيئة المسألة بشكل أكاديمي عبر إطار PEAS المكون من أربعة عناصر رئيسية:",
            "bulletPoints": [
              "P — Performance Measure: The objective criterion used to evaluate how successful the agent's behavior and resulting world states are (e.g., safety, fuel, cleanliness).",
              "E — Environment: The external world, setting, or surroundings in which the agent operates.",
              "A — Actuators: The physical or digital mechanisms the agent uses to execute actions and affect the environment.",
              "S — Sensors: The devices or input channels the agent uses to receive state data and percepts.",
              "Case 1: Automated Taxi Driver: P = Safe, fast, legal, comfortable trip, max profits; E = City streets, pedestrians, traffic, weather, customers; A = Steering, accelerator, brakes, horn, display; S = Cameras, LiDAR, radar, GPS, speedometer.",
              "Case 2: Vacuum Cleaner Agent: P = Cleanliness points (1 point per clean square), energy conservation; E = Room squares A and B, dirt distribution; A = Left, Right, Suck; S = Location sensor, dirt sensor.",
              "Case 3: Email Spam Filter: P = Minimize false positives and false negatives; E = User email account, mail server; A = Mark as spam, move to folder, delete; S = Incoming messages, headers, sender, body text, links.",
              "Case 4: Part-Picking Robot (ActiNav): P = Percentage of parts placed in correct bins; E = Conveyor belt with parts, bins; A = Jointed robotic arm and gripper; S = Depth cameras, joint angle encoders."
            ],
            "bulletPointsAr": [
              "مقياس الأداء (P - Performance Measure): المعيار الموضوعي لقياس مدى نجاح الوكيل وحالة البيئة الناتجة (مثل الأمان، توفير الطاقة، النظافة).",
              "البيئة (E - Environment): الوسط أو المحيط الخارجي الذي يتواجد فيه الوكيل.",
              "المشغلات (A - Actuators): الآليات المادية أو الرقمية التي ينفذ بها الوكيل أفعاله ليؤثر على البيئة.",
              "الحساسات (S - Sensors): أدوات الإدخال التي يستشعر بها الوكيل بيانات البيئة ومدركاتها.",
              "مثال 1 - التاكسي ذاتي القيادة: P = الأمان، سرعة الوصول، احترام المرور، راحة الراكب؛ E = شوارع المدينة، المشاة، المرور، الطقس؛ A = عجلة القيادة، البنزين، الفرامل، الإشارات؛ S = الكاميرات، حساسات LiDAR، الرادار، الـ GPS.",
              "مثال 2 - مكنسة الفاكيوم (Vacuum World): P = نقاط النظافة (نقطة لكل مربع نظيف)، توفير الشحن؛ E = المربعات A و B، وجود التراب؛ A = التحرك يميناً، يساراً، والشفط؛ S = حساس الموقع، وحساس التراب.",
              "مثال 3 - فلتر البريد المزعج (Spam Filter): P = تقليل الإيجابيات الكاذبة والسلبيات الكاذبة؛ E = بريد المستخدم، سيرفر الإيميل؛ A = وضع علامة سبام، النقل لمجلد، الحذف؛ S = نصوص الرسائل، الترويسات، الراسل، الروابط.",
              "مثال 4 - روبوت التقاط القطع الصناعية: P = نسبة القطع المفرزة بشكل سليم والسرعة؛ E = سير النقل، الصناديق؛ A = ذراع الروبوت الميكانيكي والمقبض؛ S = كاميرات العمق وحساسات زوايا المفاصل."
            ],
            "keyRule": "Objective Performance: The performance measure must be designed on the actual desired states of the external environment, not on the agent's internal states.",
            "keyRuleAr": "قاعدة الأداء: مقياس الأداء (P) يجب أن يُقاس بناءً على النتيجة الفعلية في البيئة الخارجية (كدرجة نظافة الأرضية)، وليس على شعور الوكيل الداخلي.",
            "quickCheck": {
              "question": "In the PEAS formalization of an Automated Taxi, which component do Cameras, LiDAR, and Speedometer belong to?",
              "questionAr": "في توصيف PEAS للتاكسي ذاتي القيادة، إلى أي عنصر تنتمي الكاميرات، وحساسات LiDAR، وعداد السرعة؟",
              "options": [
                "Sensors (S)",
                "Actuators (A)",
                "Environment (E)",
                "Performance Measure (P)"
              ],
              "optionsAr": [
                "الحساسات (Sensors - S)",
                "المشغلات (Actuators - A)",
                "البيئة (Environment - E)",
                "مقياس الأداء (Performance - P)"
              ],
              "correctIndex": 0,
              "explanation": "Cameras, LiDAR, radar, and speedometers are input devices that capture state data, representing the Sensors (S) of the taxi.",
              "explanationAr": "الكاميرات والرادار والـ LiDAR وعداد السرعة هي قنوات إدخال تستقبل بيانات الشارع، وتمثل الحساسات (Sensors)."
            }
          },
          {
            "title": "4. The 7 Environmental Dimensions & The Master Classification Matrix",
            "titleAr": "4. الأبعاد البيئية السبعة ومصفوفة تصنيف البيئات العشر المعتمدة",
            "content": "Task environments are categorized across 7 fundamental dimensions that dictate the agent program architecture required:",
            "contentAr": "تصنف بيئات المهام عبر 7 أبعاد أساسية تحدد بشكل مباشر الهيكل البرمجي المطلوب للوكيل:",
            "bulletPoints": [
              "1. Fully Observable vs Partially Observable: Sensors give complete access to world state vs noisy, inaccurate, or missing state data.",
              "2. Single-Agent vs Multiagent: Agent operates alone vs with other agents; Multiagent can be Competitive (chess) or Cooperative (taxis coordinating).",
              "3. Deterministic vs Stochastic: The next state is completely determined by current state and action vs outcomes involve uncertainty/probabilities.",
              "4. Episodic vs Sequential: Experience is divided into independent atomic episodes vs current decisions have long-term consequences on future states.",
              "5. Static vs Dynamic vs Semidynamic: Environment doesn't change during deliberation (static) vs continuously changes (dynamic) vs environment doesn't change but score/time decreases (semidynamic, e.g., chess with clock).",
              "6. Discrete vs Continuous: Distinct, finite states, time steps, or actions (chess) vs continuous sweeping numerical values (taxi steering, speed).",
              "7. Known vs Unknown: Agent knows the rules of the world (\"laws of physics\") vs must learn through trial and experience.",
              "The 10-Environment Master Exam Matrix (Slide 23): Crossword Puzzle (Fully, Single, Deterministic, Sequential, Static, Discrete); Chess with Clock (Fully, Multiagent competitive, Deterministic, Sequential, Semidynamic, Discrete); Poker (Partially, Multiagent competitive, Stochastic, Sequential, Static, Discrete); Taxi Driving (Partially, Multiagent cooperative/competitive, Stochastic, Sequential, Dynamic, Continuous); Medical Diagnosis (Partially, Single, Stochastic, Sequential, Dynamic, Continuous)."
            ],
            "bulletPointsAr": [
              "1. ملاحظة بالكامل مقابل جزئياً (Fully vs Partially): الحساسات تكشف كل تفاصيل الحالة ذات الصلة بالقرار مقابل حساسات مشوشة أو محجوبة الرؤية.",
              "2. وكيل منفرد مقابل متعدد (Single vs Multiagent): يعمل بمفرده مقابل وجود وكلاء آخرين؛ والبيئة المتعددة قد تكون تنافسية (شطرنج) أو تعاونية (تاكسي يتعاون مع آخرين).",
              "3. حتمية مقابل احتمالية (Deterministic vs Stochastic): الحالة التالية محددة تماماً بالحالة الحالية والفعل مقابل وجود احتمالات وعشوائية وعدم يقين.",
              "4. مجزأة مقابل تتابعية (Episodic vs Sequential): التجربة مقسمة لحلقات مستقلة لا يؤثر فيها الماضي على المستقبل مقابل تتابعية يؤثر فيها كل قرار على ما بعده.",
              "5. ساكنة مقابل ديناميكية مقابل شبه ديناميكية (Static vs Dynamic vs Semidynamic): البيئة لا تتغير أثناء التفكير (ساكنة)، تتغير باستمرار (ديناميكية)، أو لا تتغير لكن الوقت ونقاط الأداء تنخفض أثناء التفكير (شبه ديناميكية مثل الشطرنج بساعة).",
              "6. منفصلة مقابل متصلة (Discrete vs Continuous): حالات وخطوات محددة ومعدودة (شطرنج) مقابل قيم وحركات متصلة كزوايا التوجيه والسرعة (تاكسي).",
              "7. معلومة مقابل مجهولة (Known vs Unknown): الوكيل يعرف قوانين وقواعد البيئة مسبقاً مقابل بيئة مجهولة يتعلمها بالتجربة والخطأ.",
              "مصفوفة السلايد 23 المعتمدة للامتحان: الكلمات المتقاطعة (ملاحظة كلياً، منفرد، حتمية، تتابعية، ساكنة، منفصلة)؛ الشطرنج بساعة (ملاحظة كلياً، متعدد تنافسي، حتمية، تتابعية، شبه ديناميكية، منفصلة)؛ البوكر (ملاحظة جزئياً، متعدد تنافسي، احتمالية، تتابعية، ساكنة، منفصلة)؛ قيادة التاكسي (ملاحظة جزئياً، متعدد، احتمالية، تتابعية، ديناميكية، متصلة)."
            ],
            "keyRule": "Semidynamic Definition: An environment is Semidynamic if the world itself does not change with the passage of time, but the agent's performance score does (e.g., Chess with a clock).",
            "keyRuleAr": "تعريف شبه الديناميكية: تكون البيئة Semidynamic إذا كانت البيئة الفيزيائية لا تتغير أثناء تفكير الوكيل، ولكن نقاط تقييمه أو وقته المتاح ينقص بمرور الوقت (مثل الشطرنج بساعة).",
            "quickCheck": {
              "question": "According to Lecture 2 Slide 23, why is Chess with a Clock classified as \"Semidynamic\"?",
              "questionAr": "وفقاً لمصفوفة السلايد 23 من المحاضرة، لماذا تُصنف لعبة الشطرنج مع ساعة توقيت بأنها \"شبه ديناميكية\" (Semidynamic)؟",
              "options": [
                "Because the physical board does not change while the agent thinks, but its score/available time drops",
                "Because the pieces move randomly on their own",
                "Because the board size changes during the match",
                "Because it is played on a continuous field"
              ],
              "optionsAr": [
                "لأن رقعة الشطرنج لا تتغير فيزيائياً أثناء تفكير الوكيل، لكن نقاطه أو وقته المتاح يتناقص مع مرور الثواني",
                "لأن قطع الشطرنج تتحرك عشوائياً من تلقاء نفسها",
                "لأن أبعاد الرقعة تتغير أثناء المباراة",
                "لأن اللعبة تُلعب على مساحة متصلة غير منفصلة"
              ],
              "correctIndex": 0,
              "explanation": "Slide 22 and 23 define semidynamic: the environment itself does not change during deliberation, but the clock ticks down, affecting performance.",
              "explanationAr": "السلايد 22 و 23 توضحان أن البيئة شبه ديناميكية عندما لا تتغير الرقعة نفسها أثناء التفكير، لكن مرور الوقت يقلل فرص الفوز ويسحب من رصيد اللاعب."
            }
          }
        ],
        "questions": [
          {
            "id": "q-ai2-1",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "mcq",
            "question": "What is the fundamental formula that defines an intelligent agent?",
            "questionAr": "ما المعادلة المعمارية التأسيسية التي تُعرّف الوكيل الذكي؟",
            "options": [
              "Agent = Architecture + Agent Program",
              "Agent = Sensors + Actuators",
              "Agent = Data + Algorithms + Hardware",
              "Agent = Percepts + Actions"
            ],
            "optionsAr": [
              "الوكيل = المعمارية + برنامج الوكيل",
              "الوكيل = الحساسات + المشغلات",
              "الوكيل = البيانات + الخوارزميات + العتاد",
              "الوكيل = المدركات + الأفعال"
            ],
            "correctAnswer": 0,
            "explanation": "Lecture 2 Slide 11 and Sheet 2 Question 2 formulate: Agent = Architecture + Agent Program.",
            "explanationAr": "السلايد 11 وسؤال الشيت الثاني يؤكدان أن الوكيل = المعمارية (العتاد المادي والحساسات) + برنامج الوكيل (الخوارزمية البرمجية)."
          },
          {
            "id": "q-ai2-2",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "mcq",
            "question": "Why does AI avoid implementing the Agent Function as an explicit lookup table?",
            "questionAr": "لماذا يتجنب علم الذكاء الاصطناعي تطبيق دالة الوكيل كجدول بحث مسبق (Lookup Table)؟",
            "options": [
              "Because the table of all possible percept sequences would be infinite or exponentially massive",
              "Because lookup tables cannot store text",
              "Because lookup tables are forbidden by compiler standards",
              "Because sensors cannot read arrays"
            ],
            "optionsAr": [
              "لأن جدول جميع سلاسل المدركات الممكنة سيكون حجمه لا نهائياً ويتطلب مساحات تخزين مستحيلة",
              "لأن جداول البحث لا يمكنها تخزين النصوص",
              "لأن المعايير البرمجية تمنع استخدام الجداول",
              "لأن الحساسات غير قادرة على قراءة المصفوفات"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 11 notes: \"The goal of AI is not to build vast lookup tables that define every entry of an agent function, but to write compact agent programs.\"",
            "explanationAr": "السلايد 11 توضح أن كتابة جدول لكل سلاسل المدركات مستحيل عملياً بسبب الانفجار الأسي للحالات، والهدف هو كتابة برامج مدمجة تستنتج الفعل."
          },
          {
            "id": "q-ai2-3",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "true_false",
            "question": "In a fully observable environment, an agent does not need to maintain internal memory of past states to know what the world is like right now.",
            "questionAr": "في البيئة الملاحظة بالكامل (Fully Observable)، لا يحتاج الوكيل للاحتفاظ بذاكرة داخلية عن الحالات السابقة ليعرف الوضع الحالي للبيئة.",
            "correctAnswer": true,
            "explanation": "True. In a fully observable environment, sensors provide complete state information at each instant, eliminating the need for historical memory.",
            "explanationAr": "صحيح. عندما تكون البيئة ملاحظة بالكامل، تكشف الحساسات الوضع الحالي كاملاً في كل لحظة، فلا يحتاج الوكيل لذاكرة تاريخية ليعرف الوضع الحالي."
          },
          {
            "id": "q-ai2-4",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "mcq",
            "question": "What are the four components of the PEAS task environment description?",
            "questionAr": "ما العناصر الأربعة المكونة لإطار توصيف بيئات المهام PEAS؟",
            "options": [
              "Performance Measure, Environment, Actuators, Sensors",
              "Perception, Evaluation, Action, State",
              "Programs, Execution, Architecture, Software",
              "Planning, Exploration, Autonomy, Search"
            ],
            "optionsAr": [
              "مقياس الأداء، البيئة، المشغلات، الحساسات (Performance, Environment, Actuators, Sensors)",
              "الإدراك، التقييم، الفعل، الحالة",
              "البرامج، التنفيذ، المعمارية، البرمجيات",
              "التخطيط، الاستكشاف، الاستقلالية، البحث"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 15 defines PEAS: Performance measure, Environment, Actuators, Sensors.",
            "explanationAr": "السلايد 15 تعرّف إطار PEAS: مقياس الأداء (Performance)، البيئة (Environment)، المشغلات (Actuators)، والحساسات (Sensors)."
          },
          {
            "id": "q-ai2-5",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "mcq",
            "question": "How is the environment of an Autonomous Taxi classified across the environment dimensions?",
            "questionAr": "كيف تُصنف بيئة التاكسي ذاتي القيادة عبر أبعاد تصنيف البيئات؟",
            "options": [
              "Partially observable, Multiagent, Stochastic, Sequential, Dynamic, Continuous",
              "Fully observable, Single-agent, Deterministic, Episodic, Static, Discrete",
              "Fully observable, Multiagent, Deterministic, Sequential, Semidynamic, Discrete",
              "Partially observable, Single-agent, Deterministic, Episodic, Static, Continuous"
            ],
            "optionsAr": [
              "ملاحظة جزئياً، متعددة الوكلاء، احتمالية، تتابعية، ديناميكية، متصلة",
              "ملاحظة كلياً، وكيل منفرد، حتمية، مجزأة، ساكنة، منفصلة",
              "ملاحظة كلياً، متعددة الوكلاء، حتمية، تتابعية، شبه ديناميكية، منفصلة",
              "ملاحظة جزئياً، وكيل منفرد، حتمية، مجزأة، ساكنة، متصلة"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 23 classifies Taxi driving as: Partially observable, Multiagent, Stochastic, Sequential, Dynamic, Continuous.",
            "explanationAr": "السلايد 23 ومسألة الشيت تصنف قيادة التاكسي بأنها الأصعب: ملاحظة جزئياً، متعددة الوكلاء، احتمالية، تتابعية، ديناميكية، ومتصلة."
          },
          {
            "id": "q-ai2-6",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "true_false",
            "question": "A simple reflex agent considers multi-step future outcomes before executing an action.",
            "questionAr": "يقوم الوكيل الانعكاسي البسيط (Simple Reflex Agent) بدراسة العواقب المستقبلية متعددة الخطوات قبل تنفيذ أي فعل.",
            "correctAnswer": false,
            "explanation": "False. Simple reflex agents act reactively based on current percepts and condition-action rules without lookahead. Planning agents consider the future.",
            "explanationAr": "خطأ. الوكيل الانعكاسي يتصرف برد فعل لحظي بناءً على قراءات الحساسات وقواعد شرطية، ولا ينظر إطلاقاً للعواقب المستقبلية."
          },
          {
            "id": "q-ai2-7",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "mcq",
            "question": "What is an environment called if the next state of the world is completely fixed by the current state and the agent's action?",
            "questionAr": "ماذا تسمى البيئة إذا كانت الحالة التالية للعالم محددة تماماً بالحالة الحالية وفعل الوكيل فقط؟",
            "options": [
              "Deterministic environment",
              "Stochastic environment",
              "Dynamic environment",
              "Partially observable environment"
            ],
            "optionsAr": [
              "بيئة حتمية (Deterministic)",
              "بيئة احتمالية (Stochastic)",
              "بيئة ديناميكية (Dynamic)",
              "بيئة ملاحظة جزئياً (Partially observable)"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 22 states: \"Deterministic: The next state is entirely fixed by the current state and action.\"",
            "explanationAr": "السلايد 22 توضح أن البيئة تكون حتمية (Deterministic) عندما تحدد الحالة الحالية وفعل الوكيل الحالة التالية دون أي عشوائية."
          },
          {
            "id": "q-ai2-8",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "true_false",
            "question": "Image analysis is classified in Lecture 2 as Episodic because analyzing one image does not affect the next independent image.",
            "questionAr": "يُصنف تحليل الصور (Image Analysis) في المحاضرة كبيئة مجزأة (Episodic) لأن فحص صورة معينة لا يؤثر على فحص الصورة التالية المستقلة.",
            "correctAnswer": true,
            "explanation": "True. Slide 23 marks Image analysis as Episodic; each image classification is an independent episode.",
            "explanationAr": "صحيح. السلايد 23 تصنف فحص الصور كبيئة Episodic لأن تصنيف كل صورة يمثل حلقة مستقلة بذاتها."
          },
          {
            "id": "q-ai2-9",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "mcq",
            "question": "What is the role of Actuators in the agent architecture?",
            "questionAr": "ما الدور الوظيفي للمشغلات (Actuators) في معمارية الوكيل الذكي؟",
            "options": [
              "The mechanisms used by the agent to execute actions and affect the environment",
              "The devices used to capture incoming light rays and sounds",
              "The RAM cache storing the percept sequence",
              "The mathematical formula mapping inputs to outputs"
            ],
            "optionsAr": [
              "الآليات التي يستخدمها الوكيل لتنفيذ الأفعال والتأثير في البيئة الخارجية",
              "الأجهزة المسؤولة عن التقاط الأشعة الضوئية والأصوات من البيئة",
              "ذاكرة التخزين المؤقت التي تحتفظ بسلسلة المدركات",
              "المعادلة الرياضية التي تربط المدخلات بالمخرجات"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 15 defines Actuators: The physical or digital mechanisms the agent uses to execute actions and affect the environment.",
            "explanationAr": "السلايد 15 توضح أن المشغلات هي الوسائل التنفيذية (كالعجلات والمحركات أو دوال إرسال الحزم) التي تؤثر في البيئة."
          },
          {
            "id": "q-ai2-10",
            "courseId": "ai",
            "lectureId": "ai-lec-2",
            "type": "true_false",
            "question": "An email spam filter is a software agent where incoming messages serve as percepts and moving to spam serves as an action.",
            "questionAr": "فلتر البريد المزعج هو وكيل برمجيات (Software Agent) تمثل فيه الرسائل الواردة مُدركات الحساسات ويمثل نقله لمجلد السبام فعلاً تنفيذياً.",
            "correctAnswer": true,
            "explanation": "True. Slide 10 and 17 illustrate an email spam filter as a software agent operating in a digital environment.",
            "explanationAr": "صحيح. السلايد 10 و 17 تؤكدان أن فلتر البريد المزعج وكيل برمجيات حساساته تستقبل الرسائل ومشغلاته تنقلها لمجلد المهملات."
          }
        ]
      },
      {
        "id": "ai-lec-3",
        "courseId": "ai",
        "lectureNumber": 3,
        "title": "Search Problem Formulation, State Space Graphs & Depth-First Search",
        "titleAr": "صياغة مسائل البحث، فضاء الحالات وخوارزمية البحث في العمق (DFS)",
        "brief": "Problem-solving agents and offline search, abstraction, the 5 formal components of a search problem (Initial State, Actions, Transition Model, Goal Test, Path Cost), classic benchmark problems (Romania Map, 8-Puzzle, Vacuum World), State Space Graphs vs Search Trees, Node vs State distinction, Frontier (Fringe) mechanics, and Depth-First Search (DFS) step-by-step tracing.",
        "briefAr": "وكلاء حل المشكلات والبحث الذهني (Offline Search)، التجريد (Abstraction)، المكونات الخمسة الرسمية لمسألة البحث (الحالة الابتدائية، الأفعال، نموذج الانتقال، اختبار الهدف، وتكلفة المسار)، المسائل القياسية الكلاسيكية (خريطة رومانيا، لغز الـ 8، وعالم المكنسة)، الفارق الجوهري بين رسم فضاء الحالات وشجرة البحث، بنية العقدة مقابل الحالة، وإدارة جبهة البحث (Frontier) وتتبع خوارزمية البحث في العمق (DFS) خطوة بخطوة.",
        "durationMinutes": 45,
        "interactiveTools": [
          "search-visualizer"
        ],
        "cheatSheet": [
          {
            "en": "Offline Search: Problem-solving agents deliberate in their mental model to find a complete sequence of actions before executing the first physical action.",
            "ar": "البحث الذهني المسبق (Offline Search): وكيل حل المشكلات يحسب مسار الأفعال كاملاً في شجرة البحث الذهنية قبل أن ينفذ أول خطوة حركية في الواقع."
          },
          {
            "en": "Abstraction: The deliberate removal of irrelevant real-world details (scenery, radio, weather), leaving only states, actions, and costs essential to solving the problem.",
            "ar": "التجريد (Abstraction): إزالة التفاصيل غير المهمة في العالم الحقيقي (كالطقس ولون السيارة ومحطة الراديو) والاحتفاظ فقط بالحالات والأفعال والتكاليف المؤثرة في المسألة."
          },
          {
            "en": "5 Formal Components of a Search Problem: 1) Initial State (s0), 2) Actions (ACTIONS(s)), 3) Transition Model (RESULT(s, a)), 4) Goal Test, 5) Path Cost (c(s, a, s')).",
            "ar": "المكونات الخمسة الرسمية لمسألة البحث: 1) الحالة الابتدائية (s0)، 2) الأفعال المتاحة (ACTIONS)، 3) نموذج الانتقال (RESULT)، 4) اختبار الهدف (Goal Test)، 5) تكلفة المسار (Path Cost)."
          },
          {
            "en": "Transition Model Formula: RESULT(s, a) explicitly specifies the resulting state when action a is executed in state s.",
            "ar": "نموذج الانتقال: الدالة RESULT(s, a) تحدد الحالة الناتجة عن تنفيذ الفعل a في الحالة s، وهي التي تولد العقد الأبناء."
          },
          {
            "en": "State Space Graph vs Search Tree: In a State Space Graph, every distinct physical world state appears exactly once. In a Search Tree, different nodes can contain the same physical state reached via different paths.",
            "ar": "فضاء الحالات مقابل شجرة البحث: في رسم فضاء الحالات، تظهر كل حالة فيزيائية حقيقية مرة واحدة فقط. أما في شجرة البحث، فقد تتكرر نفس الحالة الفيزيائية في عُقد متعددة وصلت إليها مسارات مختلفة."
          },
          {
            "en": "Node vs State: A state is a configuration of the physical world. A node is a bookkeeping data structure in the tree containing: {state, parent, action, path_cost (g), depth}.",
            "ar": "الفرق بين العقدة والحالة: الحالة (State) هي وضع فيزيائي في العالم الحقيقي؛ أما العقدة (Node) فهي كائن برمجي في شجرة البحث يحتوي على: (الحالة، العقدة الأب، الفعل، تكلفة المسار g، والعمق)."
          },
          {
            "en": "Frontier (Fringe) & DFS: The Frontier is the set of generated leaf nodes awaiting expansion. Depth-First Search (DFS) implements the frontier as a LIFO Queue (Stack), always expanding the deepest node first.",
            "ar": "جبهة البحث والـ DFS: جبهة البحث (Frontier) هي مجمع العقد الورقية في شجرة البحث التي تم توليدها وتنتظر دورها في التوسيع. وخوارزمية البحث في العمق (DFS) تدير هذه الجبهة بمكدس LIFO، وتوسع أعمق عقدة أولاً."
          }
        ],
        "terms": [
          {
            "term": "Abstraction",
            "termAr": "التجريد (Abstraction)",
            "definition": "The process of stripping away irrelevant real-world details to formulate a tractable mathematical model containing only states, legal actions, and step costs essential to achieving the goal.",
            "definitionAr": "عملية تنقية المسألة من التفاصيل الواقعية الزائدة لإنشاء نموذج رياضي قابل للحل يتضمن فقط الحالات والأفعال والتكاليف الضرورية."
          },
          {
            "term": "Transition Model (RESULT(s, a))",
            "termAr": "نموذج الانتقال (Transition Model)",
            "definition": "A formal specification that takes a state s and an action a, and returns the successor state resulting from executing that action.",
            "definitionAr": "دالة رسمية تأخذ الحالة الحالية والفعل المختار، وترجع الحالة التالية الناتجة عن تنفيذ هذا الفعل في العالم."
          },
          {
            "term": "State Space",
            "termAr": "فضاء الحالات (State Space)",
            "definition": "The set of all possible states reachable from the initial state by any sequence of legal actions, forming a directed graph where each state appears once.",
            "definitionAr": "مجموعة كل الحالات الممكن الوصول إليها من الحالة الابتدائية عبر أي تسلسل من الأفعال القانونية."
          },
          {
            "term": "Search Tree",
            "termAr": "شجرة البحث (Search Tree)",
            "definition": "A tree structure representing simulated exploratory paths through the state space. The root is the initial state; branches represent actions; and nodes represent paths.",
            "definitionAr": "شجرة تمثل مسارات الاستكشاف الافتراضية؛ جذرها الحالة الابتدائية وفروعها تمثل الأفعال وعقدها تمثل مسارات عبر فضاء الحالات."
          },
          {
            "term": "Search Node",
            "termAr": "عقدة شجرة البحث (Search Node)",
            "definition": "A bookkeeping data structure containing: state, parent node pointer, action taken, path cost g(n), and depth.",
            "definitionAr": "هيكل بيانات تنظيمي في الشجرة يحفظ: اسم الحالة، مؤشر العقدة الأب، الفعل المنفذ، تكلفة المسار التراكمية g، وعمق العقدة."
          },
          {
            "term": "Frontier (Fringe)",
            "termAr": "جبهة البحث (Frontier / Fringe)",
            "definition": "The collection of all leaf nodes in the search tree that have been generated but not yet expanded.",
            "definitionAr": "مجموعة كل العقد الورقية في شجرة البحث التي تم توليدها ولكن لم تُفحص عقدها الفرعية بعد."
          },
          {
            "term": "Depth-First Search (DFS)",
            "termAr": "البحث في العمق (Depth-First Search)",
            "definition": "An uninformed search strategy that always expands the deepest unexpanded node in the current frontier, managed via a LIFO (Last-In, First-Out) stack.",
            "definitionAr": "استراتيجية بحث غير موجه تبدأ بتوسيع أعمق عقدة في جبهة البحث، وتدار عبر طابور LIFO (مكدس - Stack)."
          }
        ],
        "sections": [
          {
            "title": "1. Problem-Solving Agents & The Power of Abstraction",
            "titleAr": "1. وكلاء حل المشكلات والبحث الذهني وقوة التجريد (Abstraction)",
            "content": "Problem-solving agents are goal-based agents that decide what to do by finding sequences of actions that lead to desirable states. Search is conducted as an offline mental process before physical execution:",
            "contentAr": "وكلاء حل المشكلات هم وكلاء قائمون على الأهداف يحددون قراراتهم بإيجاد تسلسل من الأفعال يقود للحالة المرغوبة. وتتم عملية البحث ذهنياً (Offline) قبل تنفيذ أي حركة على أرض الواقع:",
            "bulletPoints": [
              "The 4-Phase Problem-Solving Cycle: 1) Goal Formulation (defining desired objectives), 2) Problem Formulation (defining states and actions), 3) Search (offline mental deliberation), 4) Execution (carrying out physical actions).",
              "Offline Deliberation: The agent simulates action sequences in its internal mental model without affecting the external world until the complete path is proven to achieve the goal.",
              "The Necessity of Abstraction: Real-world problems are infinitely detailed (weather, car brand, road cracks, passengers). Abstraction removes irrelevant details, leaving a tractable model with only essential states, actions, and costs.",
              "Good Abstraction: Retains all details necessary to guarantee validity of the solution while discarding everything that wastes compute resources."
            ],
            "bulletPointsAr": [
              "دورة حل المسائل الرباعية: 1) صياغة الهدف (تحديد الغاية)، 2) صياغة المسألة (تحديد الحالات والأفعال)، 3) البحث (المحاكاة الذهنية المسبقة)، 4) التنفيذ (تطبيق الأفعال في الواقع).",
              "التفكير الذهني المسبق (Offline): الوكيل يجرب مسارات الأفعال داخل نموذجه المعرفي دون تغيير العالم الخارجي حتى يكتمل المسار الأمثل.",
              "ضرورة التجريد (Abstraction): العالم الحقيقي مليء بالتفاصيل اللانهائية (كحالة الطقس، ولون المقاعد، ونظافة الزجاج). عملية التجريد تحذف كل ما هو غير مؤثر وتبقي فقط على الحالات والأفعال والتكاليف.",
              "التجريد السليم: يحتفظ فقط بما يضمن صحة الحل ويحذف الحشو الذي يستهلك ذاكرة الحاسوب بلا فائدة."
            ],
            "keyRule": "Offline Rule: Search is strictly an offline mental deliberation process; the agent never modifies the real world until an action sequence plan is fully generated.",
            "keyRuleAr": "قاعدة البحث: خوارزمية البحث تعمل ذهنياً بشكل مسبق (Offline)؛ الوكيل لا يغير العالم الخارجي إلا بعد استقرار الخطة بالكامل.",
            "quickCheck": {
              "question": "According to Lecture 3 Slide 9 & Sheet 3, what is abstraction in the context of problem-solving agents?",
              "questionAr": "وفقاً للسلايد 9 وسؤال الشيت الثالث، ما هو التجريد (Abstraction) في سياق وكلاء حل المسائل؟",
              "options": [
                "The intentional removal of irrelevant real-world details, retaining only states, actions, and costs required to solve the problem",
                "Translating computer code into binary assembly instructions",
                "Connecting sensors directly to electric motors without software",
                "Converting continuous road miles into analog radio waves"
              ],
              "optionsAr": [
                "الحذف المتعمد للتفاصيل الواقعية غير المؤثرة، والاحتفاظ فقط بالحالات والأفعال والتكاليف اللازمة لحل المسألة",
                "ترجمة كود الحاسوب إلى تعليمات لغة التجميع الثنائية",
                "توصيل الحساسات بالمحركات مباشرة دون برمجيات",
                "تحويل مسافات الطرق المتصلة إلى موجات راديو تناظرية"
              ],
              "correctIndex": 0,
              "explanation": "Slide 9 and Sheet 3 Question 1 state that abstraction is the process of removing irrelevant real-world details to formulate a valid, solvable problem.",
              "explanationAr": "السلايد 9 وسؤال الشيت الثالث يوضحان أن التجريد هو تنقية المسألة من التفاصيل غير المؤثرة للاحتفاظ بنموذج رياضي قابل للحل."
            }
          },
          {
            "title": "2. The 5 Core Components of a Search Problem & Benchmark Domains",
            "titleAr": "2. المكونات الخمسة الرسمية لمسألة البحث والمسائل القياسية الكلاسيكية",
            "content": "A search problem in AI is formally defined by exactly five mathematical components:",
            "contentAr": "تُصاغ أي مسألة بحث في الذكاء الاصطناعي بشكل رياضي دقيق عبر خمسة مكونات أساسية لا غنى عنها:",
            "bulletPoints": [
              "1. Initial State (s0): The starting state the agent begins in (e.g., In(Arad)).",
              "2. Actions (ACTIONS(s)): The set of legal actions executable in state s (e.g., Go(Sibiu), Go(Timisoara), Go(Zerind)).",
              "3. Transition Model (RESULT(s, a)): A formal function specifying the outcome state that results from carrying out action a in state s (e.g., RESULT(In(Arad), Go(Zerind)) = In(Zerind)).",
              "4. Goal Test: A condition or explicit set determining whether a state satisfies the agent's objective (e.g., {In(Bucharest)}).",
              "5. Path Cost (c(s, a, s')): A numeric cost assigned to step transitions; the total path cost is the sum of step costs along the path.",
              "Benchmark 1: Traveling in Romania (Find the shortest driving route from Arad to Bucharest with road distance costs).",
              "Benchmark 2: 8-Puzzle (3x3 grid with 8 numbered tiles and 1 blank space; actions = sliding blank Left/Right/Up/Down; state space = 9! / 2 = 181,440 reachable states).",
              "Benchmark 3: Vacuum World (2 room squares, clean/dirty states; total world states = 2 x 2^2 = 8 distinct configurations)."
            ],
            "bulletPointsAr": [
              "1. الحالة الابتدائية (s0): نقطة البداية التي ينطلق منها الوكيل (مثل: التواجد في مدينة أراد In(Arad)).",
              "2. الأفعال المتاحة (ACTIONS(s)): قائمة الحركات القانونية المسموح بها في الحالة s (مثل: الذهاب إلى سيبيو أو تيميشوارا).",
              "3. نموذج الانتقال (RESULT(s, a)): الدالة التي تحدد بدقة الحالة الناتجة عن تنفيذ الفعل a في الحالة s (مثل: الذهاب إلى زيريند يجعل الحالة In(Zerind)).",
              "4. اختبار الهدف (Goal Test): دالة منطقية تفحص ما إذا كانت الحالة الحالية تحقق غاية الوكيل (مثل: هل وصلنا بوخارست؟).",
              "5. تكلفة المسار (Path Cost): الدالة الرقمية c(s, a, s') التي تحسب تكلفة الانتقال؛ وتكلفة المسار الكلية هي مجموع تكاليف خطواته.",
              "مسألة 1 - خريطة رومانيا: إيجاد أقصر مسار قيادة من أراد (Arad) إلى بوخارست (Bucharest) بمسافات الطرق بالكيلومتر.",
              "مسألة 2 - لغز الـ 8 (8-Puzzle): شبكة 3x3 تحتوي 8 أرقام ومربع فارغ؛ الأفعال تحريك الفراغ (يمين، يسار، أعلى، أسفل)؛ وعدد الحالات الممكنة 181,440 حالة (9! مقسومة على 2).",
              "مسألة 3 - عالم المكنسة (Vacuum World): غرفتان A و B وحالة التراب فيهما؛ إجمالي عدد الحالات الممكنة 8 حالات فقط (2 موقع x 2^2 تراب)."
            ],
            "keyRule": "Transition Model Definition: RESULT(s, a) returns the exact successor state resulting from action a executed in state s.",
            "keyRuleAr": "قاعدة الامتحان: نموذج الانتقال RESULT(s, a) هو الدالة التي تحدد الحالة الناتجة عن تنفيذ الفعل a في الحالة s.",
            "quickCheck": {
              "question": "Which of the following best describes the role of the Transition Model (RESULT(s, a)) according to Sheet 3?",
              "questionAr": "أي من الخيارات التالية يصف بدقة دور نموذج الانتقال (RESULT(s, a)) وفقاً لشيت المحاضرة الثالثة؟",
              "options": [
                "It specifies the outcome state resulting from carrying out action a in state s",
                "It determines whether a given state satisfies the goal condition",
                "It assigns a numeric cost to a path of actions",
                "It lists the set of legal actions available to an agent in a given state"
              ],
              "optionsAr": [
                "يحدد الحالة الناتجة عن تنفيذ الفعل a في الحالة s",
                "يحدد ما إذا كانت الحالة تحقق شروط الهدف النهائي",
                "يعين تكلفة عددية لمسار الأفعال",
                "يسرد مجموعة الأفعال القانونية المتاحة في حالة معينة"
              ],
              "correctIndex": 0,
              "explanation": "Slide 11 and Sheet 3 Question 4 define RESULT(s, a) as the function returning the state reached by taking action a in state s.",
              "explanationAr": "السلايد 11 وسؤال الشيت الثالث يؤكدان أن RESULT(s, a) تحدد الحالة الناتجة عن تنفيذ الفعل."
            }
          },
          {
            "title": "3. State Space Graphs vs Search Trees & Node vs State",
            "titleAr": "3. رسم فضاء الحالات مقابل شجرة البحث والفرق الجوهري بين العقدة والحالة",
            "content": "A fundamental distinction tested in every AI examination is the difference between physical states, state space graphs, search trees, and search nodes:",
            "contentAr": "من أهم المفاهيم المحورية في امتحانات الذكاء الاصطناعي التمييز بين الحالة الفيزيائية، ورسم فضاء الحالات، وشجرة البحث، وبنية العقدة:",
            "bulletPoints": [
              "State Space Graph: A directed graph of all physical states in the world. Each distinct world state appears EXACTLY ONCE. Can contain cycles and multiple paths between states.",
              "Search Tree: An acyclic tree generated by the search algorithm. Root = initial state; edges = action instances; leaves = unexpanded paths.",
              "State vs Node (CRITICAL DISTINCTION): A State represents a physical configuration of the world (e.g., In(Sibiu)). A Node is a bookkeeping data structure in memory.",
              "Structure of a Search Node: {State: world state, Parent: pointer to parent node, Action: action that produced this node, Path-Cost (g): total cost from root, Depth: tree level}.",
              "Why Nodes != States: Two completely different nodes in a search tree can contain the EXACT SAME physical state reached via different paths (e.g., Arad->Sibiu vs Arad->Zerind->Oradea->Sibiu)."
            ],
            "bulletPointsAr": [
              "رسم فضاء الحالات (State Space Graph): رسم بياني لكل الحالات المادية؛ وتظهر فيه كل حالة فيزيائية حقيقية مرة واحدة فقط، وقد يحتوي على حلقات مغلقة (Cycles).",
              "شجرة البحث (Search Tree): شجرة تتولد ديناميكياً أثناء البحث؛ جذرها الحالة الابتدائية، وتفرعاتها تمثل استكشاف المسارات.",
              "الفرق بين الحالة والعقدة (سؤال امتحان مؤكد): الحالة (State) وضع فيزيائي في الواقع (مثل التواجد في مدينة سيبيو)؛ أما العقدة (Node) فهي هيكل بيانات تنظيمي محجوز في الذاكرة.",
              "مكونات كائن العقدة في الذاكرة: (اسم الحالة State، مؤشر العقدة الأب Parent، الفعل Action، تكلفة المسار التراكمية g، وعمق العقدة Depth).",
              "لماذا العقدة ليست هي الحالة؟ لأن عقدتين مختلفتين في شجرة البحث يمكن أن تحملا نفس الحالة الفيزيائية بالضبط إذا تم الوصول إليها بمسارين مختلفين."
            ],
            "keyRule": "Node vs State: A state is a configuration of the world; a node is a data structure in a search tree. Multiple nodes can contain the same state.",
            "keyRuleAr": "قاعدة الامتحان: الحالة وضع في العالم الفيزيائي؛ والعقدة هيكل بيانات في شجرة البحث. ويمكن لعقد متعددة أن تحتوي على نفس الحالة الفيزيائية.",
            "quickCheck": {
              "question": "Why can two distinct nodes in a search tree contain the same physical world state?",
              "questionAr": "لماذا يمكن لعقدتين مختلفتين تماماً في شجرة البحث أن تحملا نفس الحالة الفيزيائية للعالم الحقيقي؟",
              "options": [
                "Because the same physical state can be reached via different paths and sequences of actions",
                "Because search trees cannot store unique identifiers",
                "Because nodes are deleted every time an action is taken",
                "Because physical states are duplicated by actuators"
              ],
              "optionsAr": [
                "لأنه يمكن الوصول لنفس الحالة الفيزيائية عبر مسارات وتسلسلات مختلفة من الأفعال",
                "لأن أشجار البحث غير قادرة على تخزين معرفات فريدة",
                "لأن العقد تُمسح في كل مرة يُنفذ فيها فعل",
                "لأن الحالات الفيزيائية تتضاعف تلقائياً بواسطة المشغلات"
              ],
              "correctIndex": 0,
              "explanation": "Slide 18 & 19 explain that search tree nodes represent distinct paths through the state space; different paths leading to the same city create different nodes.",
              "explanationAr": "السلايد 18 و 19 توضحان أن عقد الشجرة تمثل مسارات؛ وإذا أمكن الوصول لنفس المدينة بطريقين مختلفين يتولد لها عقدتان مختلفتان."
            }
          },
          {
            "title": "4. Frontier Mechanics & Depth-First Search (DFS) Tracing",
            "titleAr": "4. ميكانيكا جبهة البحث (Frontier) وتتبع خوارزمية البحث في العمق (DFS)",
            "content": "The core engine of any tree search algorithm is the Frontier (also called Fringe), which manages unexpanded nodes:",
            "contentAr": "المحرك الأساسي لأي خوارزمية بحث في الأشجار هو \"جبهة البحث\" (Frontier / Fringe) التي تدير العقد المولدة التي لم تُفحص بعد:",
            "bulletPoints": [
              "Frontier (Fringe): The collection of all leaf nodes that have been generated by expansion but are currently awaiting evaluation and expansion.",
              "Expansion: Applying legal ACTIONS to a node's state and generating new child nodes using the Transition Model RESULT(s, a).",
              "Search Strategy: A search strategy is defined entirely by: WHICH node in the frontier is selected for expansion next.",
              "Depth-First Search (DFS) Mechanics: Always selects the DEEPEST unexpanded node in the current frontier.",
              "Frontier Data Structure for DFS: Managed as a LIFO Queue (Last-In, First-Out), which is a Stack.",
              "Step-by-Step Traversal: DFS dives down a single branch until it hits a leaf with no successors (or maximum depth), then backtracks to expand the next deepest alternative branch."
            ],
            "bulletPointsAr": [
              "جبهة البحث (Frontier / Fringe): مجمع العقد الورقية في الشجرة التي تم توليدها وتنتظر دورها في التوسيع والاختبار.",
              "التوسيع (Expansion): تطبيق الأفعال المتاحة على حالة العقدة لتوليد العقد الأبناء باستخدام نموذج الانتقال RESULT.",
              "استراتيجية البحث: تتحدد أي استراتيجية بحث بشيء واحد فقط: أي عقدة من عقد جبهة البحث سيتم اختيارها للتوسيع أولاً.",
              "ميكانيكا البحث في العمق (DFS): تختار دائماً أعمق عقدة غير موسعة في جبهة البحث.",
              "هيكل بيانات جبهة البحث في DFS: يُدار عبر طابور LIFO (Last-In, First-Out)، أي مكدس (Stack).",
              "التتبع خطوة بخطوة: يغوص DFS في فرع واحد حتى نهايته، فإذا وصل لطريق مسدود يعود للخلف (Backtracking) لتوسيع الفرع الأعمق التالي."
            ],
            "keyRule": "DFS Frontier Rule: Depth-First Search manages its frontier using a LIFO Queue (Stack), always choosing the deepest node for expansion.",
            "keyRuleAr": "قاعدة الامتحان: خوارزمية البحث في العمق (DFS) تدير جبهة البحث عبر مكدس LIFO (Stack)، وتختار دائماً أعمق عقدة لتوسيعها أولاً.",
            "quickCheck": {
              "question": "According to Sheet 4 Question 2, which search strategy implements its frontier (FRINGE) using a LIFO (Last-In, First-Out) queue?",
              "questionAr": "وفقاً لسؤال الشيت الرابع رقم 2، أي استراتيجية بحث تدير جبهة البحث (FRINGE) الخاصة بها باستخدام طابور LIFO (مكدس)؟",
              "options": [
                "Depth-First Search (DFS)",
                "Breadth-First Search (BFS)",
                "Uniform-Cost Search (UCS)",
                "Iterative Deepening Search"
              ],
              "optionsAr": [
                "البحث في العمق (Depth-First Search - DFS)",
                "البحث في العرض (Breadth-First Search - BFS)",
                "البحث متساوي التكلفة (Uniform-Cost Search - UCS)",
                "البحث متكرر التعميق"
              ],
              "correctIndex": 0,
              "explanation": "Slide 8 and Sheet 4 Question 2 specify that DFS implements its frontier using a LIFO queue (Stack).",
              "explanationAr": "السلايد 8 وسؤال الشيت الرابع يؤكدان أن DFS يستخدم طابور LIFO (Stack) لإدارة جبهة البحث."
            }
          }
        ],
        "questions": [
          {
            "id": "q-ai3-1",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "mcq",
            "question": "What are the five core components that formally define a search problem in AI?",
            "questionAr": "ما المكونات الخمسة الرسمية التي تُعرّف مسألة البحث في الذكاء الاصطناعي؟",
            "options": [
              "Initial State, Actions, Transition Model, Goal Test, Path Cost",
              "Sensors, Actuators, Architecture, Program, Percepts",
              "Branching Factor, Depth, Time Complexity, Space Complexity, Big-O",
              "Training Data, Test Data, Loss Function, Epochs, Weights"
            ],
            "optionsAr": [
              "الحالة الابتدائية، الأفعال، نموذج الانتقال، اختبار الهدف، وتكلفة المسار",
              "الحساسات، المشغلات، المعمارية، البرنامج، والمدركات",
              "معامل التفرع، العمق، التعقيد الزمني، التعقيد المكاني، و Big-O",
              "بيانات التدريب، بيانات الاختبار، دالة الخسارة، الحقب، والأوزان"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 11 and Sheet 3 Question 2 define the 5 formal components: s0, ACTIONS(s), RESULT(s, a), Goal Test, and Path Cost c(s, a, s').",
            "explanationAr": "السلايد 11 وسؤال الشيت الثالث يؤكدان أن مكونات مسألة البحث الخمسة هي: الحالة الابتدائية، الأفعال، نموذج الانتقال، اختبار الهدف، وتكلفة المسار."
          },
          {
            "id": "q-ai3-2",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "mcq",
            "question": "What does the frontier (or fringe) represent in a search tree algorithm?",
            "questionAr": "ماذا تمثل جبهة البحث (Frontier / Fringe) في خوارزميات شجرة البحث؟",
            "options": [
              "The collection of all leaf nodes that have been generated but are currently awaiting expansion",
              "The set of states that have already been fully explored and permanently discarded",
              "The final optimal sequence of actions leading to the goal state",
              "The complete static physical graph of all world cities"
            ],
            "optionsAr": [
              "مجموعة كل العقد الورقية التي تم توليدها ولكنها تنتظر دورها في التوسيع",
              "مجموعة الحالات التي تم استكشافها بالكامل واستبعادها نهائياً",
              "المسار النهائي الأمثل من الأفعال المؤدية إلى الهدف",
              "الرسم البياني الفيزيائي الثابت لجميع مدن العالم"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 20, 22 and Sheet 3 Question 5 define the Frontier as leaf nodes generated and awaiting expansion.",
            "explanationAr": "السلايد 20 و 22 وسؤال الشيت الثالث تعرّف جبهة البحث بأنها العقد المولدة التي تنتظر التوسيع."
          },
          {
            "id": "q-ai3-3",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "true_false",
            "question": "In an agent that searches, the search process actively modifies and moves objects in the physical world during deliberation.",
            "questionAr": "في الوكيل الذي يبحث، تقوم عملية البحث بتحريك وتعديل الأشياء في العالم الفيزيائي الحقيقي أثناء التفكير في الحل.",
            "correctAnswer": false,
            "explanation": "False. Search is an offline mental process where the agent builds simulated trees without changing the physical world.",
            "explanationAr": "خطأ. البحث عملية ذهنية مسبقة (Offline)؛ الوكيل يجرب المسارات داخل عقله ولا يحرك أي شيء في الواقع حتى يعثر على الخطة كاملة."
          },
          {
            "id": "q-ai3-4",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "mcq",
            "question": "How many reachable distinct states exist in the classic 8-puzzle game?",
            "questionAr": "كم عدد الحالات الممكن الوصول إليها في لغز الـ 8 الكلاسيكي (8-puzzle)؟",
            "options": [
              "181,440 states (9! / 2)",
              "362,880 states (9!)",
              "8 states",
              "64 states"
            ],
            "optionsAr": [
              "181,440 حالة (9! مقسومة على 2)",
              "362,880 حالة (9!)",
              "8 حالات فقط",
              "64 حالة"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 14 calculates the state space of the 8-puzzle: 9! / 2 = 181,440 reachable configurations due to parity constraints.",
            "explanationAr": "السلايد 14 توضح أن عدد الحالات الممكنة للغز الـ 8 هو 9! / 2 = 181,440 حالة قابلة للوصول."
          },
          {
            "id": "q-ai3-5",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "true_false",
            "question": "A search tree node contains fields for state, parent pointer, action, path cost g, and depth.",
            "questionAr": "تحتوي عقدة شجرة البحث على حقول للحالة، ومؤشر العقدة الأب، والفعل المنفذ، وتكلفة المسار g، وعمق العقدة.",
            "correctAnswer": true,
            "explanation": "True. Slide 18 details the 5 essential fields of a search node data structure.",
            "explanationAr": "صحيح. السلايد 18 تفصل بنية العقدة وتؤكد احتوائها على الحالة، والأب، والفعل، وتكلفة المسار g، والعمق."
          },
          {
            "id": "q-ai3-6",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "mcq",
            "question": "What is the role of the Transition Model (RESULT(s, a)) in a search problem?",
            "questionAr": "ما الدور الذي يقوم به نموذج الانتقال (RESULT(s, a)) في مسألة البحث؟",
            "options": [
              "It specifies the successor state resulting from executing action a in state s",
              "It verifies whether the destination city has a hotel",
              "It measures the fuel level of the vehicle",
              "It calculates the heuristic distance to the goal"
            ],
            "optionsAr": [
              "يحدد الحالة الناتجة عن تنفيذ الفعل a في الحالة s",
              "يفحص ما إذا كانت المدينة الهدف تحتوي على فنادق",
              "يقيس مستوى الوقود في خزان المركبة",
              "يحسب المسافة الاستكشافية التقريبية نحو الهدف"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 11 and Sheet 3 Question 4 specify that RESULT(s, a) produces the outcome state from action a in state s.",
            "explanationAr": "السلايد 11 وسؤال الشيت الثالث يؤكدان أن RESULT(s, a) تحدد الحالة التالية الناتجة عن الفعل."
          },
          {
            "id": "q-ai3-7",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "true_false",
            "question": "In a State Space Graph, every distinct world state appears exactly once.",
            "questionAr": "في رسم فضاء الحالات (State Space Graph)، تظهر كل حالة فيزيائية في العالم مرة واحدة فقط.",
            "correctAnswer": true,
            "explanation": "True. Slide 16 and 19 contrast the state space graph (where each state appears once) with the search tree (where states can appear multiple times).",
            "explanationAr": "صحيح. السلايد 16 و 19 تؤكدان أن فضاء الحالات يحتوي كل حالة مرة واحدة، بينما شجرة البحث قد تكرر الحالة في مسارات متعددة."
          },
          {
            "id": "q-ai3-8",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "mcq",
            "question": "Which data structure does Depth-First Search (DFS) use to manage its frontier?",
            "questionAr": "ما هيكل البيانات الذي تستخدمه خوارزمية البحث في العمق (DFS) لإدارة جبهة البحث؟",
            "options": [
              "LIFO Queue (Stack)",
              "FIFO Queue",
              "Priority Queue",
              "Hash Table"
            ],
            "optionsAr": [
              "طابور LIFO (مكدس - Stack)",
              "طابور FIFO",
              "طابور أولويات (Priority Queue)",
              "جدول تجزئة (Hash Table)"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 24 and Sheet 4 Question 2 state that DFS implements its frontier using a LIFO queue (Stack).",
            "explanationAr": "السلايد 24 وسؤال الشيت الرابع يوضحان أن DFS تدير جبهة البحث عبر مكدس LIFO (Stack)."
          },
          {
            "id": "q-ai3-9",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "true_false",
            "question": "The Vacuum World with 2 locations and dirt status has a total of 8 distinct physical world states.",
            "questionAr": "يمتلك عالم المكنسة (Vacuum World) ذو الغرفتين وحالة النظافة إجمالي 8 حالات فيزيائية مميزة.",
            "correctAnswer": true,
            "explanation": "True. Slide 15 calculates 2 locations * 2^2 dirt configurations = 8 distinct states.",
            "explanationAr": "صحيح. السلايد 15 تحسب حالات عالم المكنسة: موقعان x 4 حالات تراب = 8 حالات."
          },
          {
            "id": "q-ai3-10",
            "courseId": "ai",
            "lectureId": "ai-lec-3",
            "type": "mcq",
            "question": "What defines a search strategy in AI tree search?",
            "questionAr": "ما الذي يحدد استراتيجية البحث في خوارزميات أشجار البحث؟",
            "options": [
              "The specific rule used to choose which node in the frontier is expanded next",
              "The physical speed of the CPU processor",
              "The number of RAM gigabytes available on the host machine",
              "The programming language used to code the algorithm"
            ],
            "optionsAr": [
              "القاعدة المحددة المستخدمة لاختيار أي عقدة من جبهة البحث سيتم توسيعها أولاً",
              "السرعة الفيزيائية لمعالج الكمبيوتر",
              "حجم ذاكرة الرام المتاحة على الجهاز",
              "لغة البرمجة المستخدمة في كتابة الكود"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 23 states: \"Search strategies are defined by picking the order of node expansion from the frontier.\"",
            "explanationAr": "السلايد 23 تؤكد أن استراتيجية البحث تتحدد بترتيب اختيار العقد من جبهة البحث."
          }
        ]
      },
      {
        "id": "ai-lec-4",
        "courseId": "ai",
        "lectureNumber": 4,
        "title": "Uninformed Search Strategies (BFS, DFS, UCS) & Evaluation Criteria",
        "titleAr": "استراتيجيات البحث غير الموجه (BFS, DFS, UCS) ومعايير التقييم",
        "brief": "Rigorous comparative analysis of uninformed search strategies: Breadth-First Search (BFS, FIFO Queue), Uniform-Cost Search (UCS, Priority Queue by path cost g), Depth-First Search (DFS, LIFO Stack), the 4 evaluation criteria (Completeness, Time Complexity, Space Complexity, Optimality), Big-O asymptotic bounds, early vs late goal testing, and Graph Search vs Tree Search to avoid repeated states and infinite cycles.",
        "briefAr": "مقارنة رياضية وإجرائية دقيقة بين استراتيجيات البحث غير الموجه: البحث في العرض (BFS بصف FIFO)، البحث متساوي التكلفة (UCS بصف أولويات حسب التكلفة g)، البحث في العمق (DFS بـ LIFO)، معايير التقييم الأربعة (الشمولية، التعقيد الزمني، التعقيد المكاني، والمثالية)، صيغ Big-O الحسابية، اختبار الهدف المبكر مقابل المتأخر، والبحث في الرسوم البيانية لتفادي الحالات المكررة والحلقات اللانهائية.",
        "durationMinutes": 45,
        "interactiveTools": [
          "search-visualizer"
        ],
        "cheatSheet": [
          {
            "en": "4 Search Evaluation Criteria: Completeness (always finds solution if one exists?), Time Complexity (nodes generated), Space Complexity (max nodes in memory), Optimality (finds lowest-cost path?).",
            "ar": "معايير تقييم خوارزميات البحث الأربعة: الشمولية (هل تجد حلاً دائماً إن وُجد؟)، التعقيد الزمني (عدد العقد المولدة)، التعقيد المكاني (أقصى عقد مخزنة في الذاكرة)، والمثالية (هل المسار هو الأقل تكلفة؟)."
          },
          {
            "en": "BFS Characteristics: FIFO Queue. Expands shallowest node. Early Goal Test on generation. Complete (if b is finite). Optimal if step costs are equal. Fatal bottleneck is exponential memory: Space = O(b^d).",
            "ar": "خصائص BFS: طابور FIFO؛ يوسع العقد بالدور دوراً بدور؛ يفحص الهدف مبكراً عند التوليد؛ شامل إذا كان التفرع محدوداً؛ مثالي لو التكاليف متساوية؛ وعيبه القاتل استهلاك الذاكرة الأسي O(b^d)."
          },
          {
            "en": "DFS Superpower: Space Complexity is linear: O(b * m). Only stores the current path from root and unexpanded siblings! But not complete in infinite trees and not optimal.",
            "ar": "قوة خوارزمية DFS الخارقة: توفير الذاكرة؛ التعقيد المكاني خطي O(bm) فقط لأنه يحفظ المسار الحالي وإخوته! لكن عيبه أنه غير شامل في الأشجار اللانهائية وغير مثالي."
          },
          {
            "en": "UCS Mechanics: Priority Queue ordered by path cost g(n). Expands lowest-cost node. Goal test MUST occur upon node EXPANSION (not generation!). Always optimal for positive step costs (c >= eps > 0).",
            "ar": "ميكانيكا UCS: طابور أولويات مترتب بأقل تكلفة مسار تراكمية g(n)؛ فحص الهدف فيه إلزامي لحظة التوسيع (Expansion) وليس التوليد؛ ومثالي دائماً لأي تكاليف خطوة موجبة."
          },
          {
            "en": "Tree Search vs Graph Search: Tree search can get trapped in infinite loops on graphs with cycles. Graph Search eliminates cycles and repeated states by maintaining an Explored Set (Closed List).",
            "ar": "شجرة البحث مقابل رسم الحالات: شجرة البحث تضيع في حلقات مفرغة لانهائية؛ بينما بحث الرسوم البيانية (Graph Search) يتفادى التكرار بالاحتفاظ بقائمة مغلقة (Explored Set)."
          },
          {
            "en": "Memory vs Time Bottleneck: In AI uninformed search, memory space is almost always exhausted before computation time runs out (especially for BFS and UCS).",
            "ar": "عقبة الذاكرة قبل الوقت: في خوارزميات البحث غير الموجه، تنفد ذاكرة الحاسوب (RAM) دائماً قبل أن ينفد وقت المعالجة، خاصة في BFS و UCS."
          },
          {
            "en": "Big-O Summary: BFS Time=O(b^d), Space=O(b^d); DFS Time=O(b^m), Space=O(bm); UCS Time & Space = O(b^(1 + floor(C*/eps))).",
            "ar": "ملخص Big-O للامتحان: للـ BFS الزمن O(b^d) والمكان O(b^d)؛ للـ DFS الزمن O(b^m) والمكان الخطي O(bm)؛ للـ UCS الزمن والمكان O(b^(1 + floor(C*/eps)))."
          }
        ],
        "terms": [
          {
            "term": "Breadth-First Search (BFS)",
            "termAr": "البحث في العرض (Breadth-First Search)",
            "definition": "An uninformed search strategy where the shallowest unexpanded node is chosen for expansion, implemented via a FIFO (First-In, First-Out) queue.",
            "definitionAr": "استراتيجية بحث غير موجه تبدأ بتوسيع العقد الأقل عمقاً في الشجرة مستوى بمستوى، وتُدار عبر طابور FIFO."
          },
          {
            "term": "Uniform-Cost Search (UCS)",
            "termAr": "البحث متساوي التكلفة (Uniform-Cost Search)",
            "definition": "An uninformed search algorithm that expands the node n with the lowest cumulative path cost g(n), implemented via a Priority Queue. It is equivalent to Dijkstra's algorithm on trees.",
            "definitionAr": "خوارزمية بحث غير موجه توسع العقدة ذات أقل تكلفة مسار تراكمية g(n)، وتُدار بطابور أولويات، وهي تطبيق لخوارزمية ديكسترا على الأشجار."
          },
          {
            "term": "Early Goal Test vs Late Goal Test",
            "termAr": "اختبار الهدف المبكر مقابل المتأخر",
            "definition": "In BFS, the goal test is applied when a node is generated (early test, saving an entire level). In UCS, the goal test MUST be applied when a node is selected for expansion (late test) to ensure cost optimality.",
            "definitionAr": "في BFS يُفحص الهدف لحظة توليد العقدة لتوفير مستوى كامل؛ أما في UCS فيجب تأجيل الفحص للحظة التوسيع لضمان عدم وجود مسار أرخص لنفس العقدة في جبهة البحث."
          },
          {
            "term": "Completeness",
            "termAr": "الشمولية (Completeness)",
            "definition": "The guarantee that a search algorithm will always find a solution if at least one valid path to a goal state exists.",
            "definitionAr": "الضمان الأكاديمي بأن الخوارزمية ستعثر حتماً على حل للمسألة إذا كان هناك مسار صحيح مؤدٍ للهدف."
          },
          {
            "term": "Optimality",
            "termAr": "المثالية (Optimality)",
            "definition": "The guarantee that the search algorithm will find the solution with the lowest cumulative path cost among all possible solutions.",
            "definitionAr": "الضمان بأن الحل الذي تعثر عليه الخوارزمية هو صاحب أقل تكلفة مسار كلية ممكنة بين جميع الحلول."
          },
          {
            "term": "Explored Set (Closed List)",
            "termAr": "مجموعة الحالات المستكشفة (Closed List)",
            "definition": "A data structure used in Graph Search to remember every state that has already been expanded, preventing infinite loops and redundant state expansion.",
            "definitionAr": "هيكل بيانات يحفظ كل حالة تم توسيعها مسبقاً، لمنع تكرار فحصها ومنع الدخول في حلقات مفرغة لانهائية في الرسوم البيانية."
          },
          {
            "term": "Linear Space O(bm)",
            "termAr": "التعقيد المكاني الخطي O(bm)",
            "definition": "The space complexity of DFS, where memory requirements grow only linearly with branching factor b multiplied by maximum tree depth m, storing only the active path and sibling nodes.",
            "definitionAr": "الميزة الكبرى لخوارزمية DFS حيث ينمو استهلاك الذاكرة خطياً بحاصل ضرب معامل التفرع b في أقصى عمق m، محتفظاً بالمسار النشط فقط."
          }
        ],
        "sections": [
          {
            "title": "1. Breadth-First Search (BFS) & The Early Goal Test Optimization",
            "titleAr": "1. خوارزمية البحث في العرض (BFS) وتحسين الفحص المبكر للهدف",
            "content": "Breadth-First Search (BFS) is a simple strategy in which the root node is expanded first, then all the successors of the root node are expanded next, then their successors, and so on level by level:",
            "contentAr": "خوارزمية البحث في العرض (BFS) تبدأ بتوسيع العقدة الجذر أولاً، ثم جميع أبنائها، ثم أبناء الأبناء، مستوى بمستوى في الشجرة:",
            "bulletPoints": [
              "Frontier Data Structure: Managed strictly as a FIFO Queue (First-In, First-Out), meaning nodes that enter the queue first are popped for expansion first.",
              "Expansion Order: Explores all nodes at depth d before expanding any node at depth d + 1.",
              "Early Goal Test Optimization: In BFS, the goal test can be applied when a node is GENERATED (rather than when selected for expansion). This saves generating and storing an entire extra level of nodes (b^d nodes!).",
              "Completeness: Complete if the branching factor b is finite.",
              "Optimality: Optimal ONLY if all step costs are equal (or unit cost of 1); NOT optimal if step costs differ.",
              "Asymptotic Complexity: Time Complexity = O(b^d); Space Complexity = O(b^d).",
              "The Fatal Bottleneck: Memory space runs out before CPU time. For b = 10 and depth d = 10, BFS requires exabytes of memory, making pure BFS impractical for deep trees."
            ],
            "bulletPointsAr": [
              "هيكل بيانات جبهة البحث: يُدار بطابور FIFO (First-In, First-Out)؛ العقدة التي تدخل أولاً تخرج وتُوسع أولاً.",
              "ترتيب الاستكشاف: يفحص كل العقد في المستوى d بالكامل قبل الانتقال لتوسيع أي عقدة في المستوى d + 1.",
              "تحسين الفحص المبكر للهدف (Early Goal Test): في BFS يمكن فحص الهدف لحظة توليد العقدة بدلاً من الانتظار لتوسيعها، مما يوفر توليد وتخزين مستوى كامل من العقد (b^d عقدة!).",
              "الشمولية: شاملة وتجد الحل دائماً إذا كان معامل التفرع b محدوداً.",
              "المثالية: مثالية فقط إذا كانت كل خطوات الحركة متساوية التكلفة (Unit Cost)؛ وغير مثالية إذا تفاوتت تكاليف الطرق.",
              "التعقيد الحسابي: التعقيد الزمني O(b^d)؛ والتعقيد المكاني O(b^d).",
              "العقبة القاتلة: استهلاك الذاكرة الأسي يملأ الرامات في دقائق؛ فعند تفرع 10 وعمق 10 تتطلب BFS إكسابايت من الرامات!"
            ],
            "keyRule": "BFS Memory Bottleneck: BFS is optimal only for uniform step costs, and its fatal flaw is exponential space complexity O(b^d) which exhausts physical RAM.",
            "keyRuleAr": "قاعدة الامتحان: BFS مثالية فقط لو تكاليف الخطوات متساوية، وعيبها القاتل استهلاك الذاكرة الأسي O(b^d) الذي يملأ الرامات بسرعة البرق.",
            "quickCheck": {
              "question": "When can the Goal Test be safely applied in Breadth-First Search (BFS) to save an entire level of node expansions?",
              "questionAr": "متى يمكن تطبيق اختبار الهدف بأمان في خوارزمية البحث في العرض (BFS) لتوفير توسيع مستوى كامل من العقد؟",
              "options": [
                "When the node is GENERATED (upon inserting into the FIFO queue)",
                "Only when the node is selected for EXPANSION (popped from queue)",
                "Only after the queue becomes completely empty",
                "Only when backtracking from a leaf node"
              ],
              "optionsAr": [
                "لحظة توليد العقدة (GENERATED) وقبل وضعها في طابور الـ FIFO",
                "فقط لحظة سحب العقدة وتوسيعها (EXPANSION)",
                "فقط بعد أن تفرغ جبهة البحث بالكامل",
                "فقط عند العودة للخلف (Backtracking) من ورقة الشجرة"
              ],
              "correctIndex": 0,
              "explanation": "Slide 10 highlights that for BFS, the goal test can be applied when nodes are generated, saving an entire level of expansion.",
              "explanationAr": "السلايد 10 توضح أنه في BFS يمكن فحص الهدف عند التوليد مباشرة، مما يوفر توليد مستوى كامل من الأبناء."
            }
          },
          {
            "title": "2. Uniform-Cost Search (UCS / Dijkstra's Algorithm on Trees)",
            "titleAr": "2. البحث متساوي التكلفة (UCS) وخوارزمية ديكسترا على الأشجار",
            "content": "When step costs are unequal (e.g., varying road distances on the Romania map), BFS cannot guarantee finding the cheapest path. Uniform-Cost Search (UCS) resolves this:",
            "contentAr": "عندما تختلف تكاليف الطرق (كما في خريطة رومانيا بمسافات متفاوتة بين المدن)، يعجز BFS عن ضمان الحل الأرخص، وهنا يأتي دور البحث متساوي التكلفة (UCS):",
            "bulletPoints": [
              "Frontier Data Structure: Managed as a Priority Queue ordered by cumulative path cost g(n) in ascending order.",
              "Expansion Strategy: Always selects and pops the node with the lowest path cost g(n) currently in the frontier.",
              "CRITICAL GOAL TEST RULE: The goal test MUST be applied when a node is selected for EXPANSION, NEVER when generated! Why? Because a cheaper path to that same goal node might be discovered later via an alternative branch.",
              "Optimality: Guaranteed to be optimal for any non-negative step costs (c(s, a, s') >= eps > 0).",
              "Completeness: Complete provided that every step cost is strictly greater than a small positive constant epsilon (to avoid infinite zero-cost loops).",
              "Complexity: Time and Space Complexity are O(b^(1 + floor(C* / eps))), where C* is the optimal cost and eps is the minimum step cost.",
              "Relationship to BFS: If all step costs are identical (e.g., c = 1), UCS expands nodes in exact identical order to BFS."
            ],
            "bulletPointsAr": [
              "هيكل بيانات جبهة البحث: طابور أولويات (Priority Queue) مرتب تصاعدياً بأقل تكلفة مسار تراكمية g(n).",
              "استراتيجية التوسيع: يختار دائماً ويسحب العقدة صاحبة أقل تكلفة تراكمية مسجلة في جبهة البحث.",
              "القاعدة الحاسمة لفحص الهدف: يجب تأجيل اختبار الهدف للحظة توسيع العقدة (EXPANSION) وسحبها من الطابور، وممنوع نهائياً فحصها عند التوليد! لأن هناك احتمال وجود مسار أرخص لنفس الهدف لم يُفحص بعد.",
              "المثالية: مثالية ومضمونة بنسبة 100% لأي تكاليف حقيقية موجبة.",
              "الشمولية: شاملة بشرط أن تكون كل خطوة أكبر من قيمة موجبة دنيا (eps > 0) لتفادي الحلقات الصفرية اللانهائية.",
              "التعقيد الحسابي: التعقيد الزمني والمكاني هو O(b^(1 + floor(C* / eps))) حيث C* هي تكلفة الحل الأمثل و eps أقل تكلفة خطوة.",
              "العلاقة مع BFS: إذا تساوت جميع تكاليف الخطوات (كل خطوة = 1)، تتطابق خطوات UCS تماماً مع BFS."
            ],
            "keyRule": "UCS Goal Test Timing: In Uniform-Cost Search, the goal test MUST be applied when the node is selected for EXPANSION, never upon generation.",
            "keyRuleAr": "قاعدة الامتحان: في خوارزمية UCS، يجب تطبيق اختبار الهدف لحظة سحب العقدة للتوسيع (Expansion)، وليس لحظة توليدها.",
            "quickCheck": {
              "question": "Why MUST the goal test in Uniform-Cost Search (UCS) be applied upon node expansion rather than node generation?",
              "questionAr": "لماذا يجب في خوارزمية UCS تأجيل اختبار الهدف للحظة سحب العقدة للتوسيع بدلاً من فحصها لحظة التوليد؟",
              "options": [
                "Because a cheaper, lower-cost path to the same goal state might still exist in the frontier",
                "Because priority queues cannot store goal labels",
                "Because UCS runs faster without goal checks",
                "Because the initial state would be deleted"
              ],
              "optionsAr": [
                "لأنه قد يوجد مسار آخر بديل أقل تكلفة لنفس الهدف ما زال ينتظر في جبهة البحث",
                "لأن طوابير الأولويات غير قادرة على تخزين اسم الهدف",
                "لأن UCS تعمل بسرعة أكبر إذا ألغينا فحص الهدف",
                "لأن الحالة الابتدائية ستُمسح من الذاكرة"
              ],
              "correctIndex": 0,
              "explanation": "Slide 24 & 25 explain that UCS must wait until expansion because an unexpanded path with lower cost could reach the goal for less total cost.",
              "explanationAr": "السلايد 24 و 25 تؤكدان أن أول مسار يصل للهدف قد لا يكون الأرخص؛ وتأجيل الفحص للتوسيع يضمن أن كل المسارات الأرخص فُحصت مسبقاً."
            }
          },
          {
            "title": "3. The 4 Evaluation Criteria & The Master Complexity Matrix",
            "titleAr": "3. معايير التقييم الأربعة والمصفوفة المقارنة الشاملة لـ Big-O",
            "content": "In AI, search algorithms are rigorously evaluated across four fundamental criteria (Completeness, Time Complexity, Space Complexity, and Optimality):",
            "contentAr": "تُقيم خوارزميات البحث في الذكاء الاصطناعي بدقة رياضية عبر أربعة معايير أكاديمية معتمدة:",
            "bulletPoints": [
              "Completeness: Does the algorithm guarantee finding a solution when one exists?",
              "Time Complexity: How long does it take (measured in the number of nodes generated)?",
              "Space Complexity: How much memory does it need (measured in the maximum number of nodes stored)?",
              "Optimality: Does the strategy find the lowest path cost among all solutions?",
              "Key Parameters: b (branching factor), d (depth of shallowest goal), m (maximum depth of search space), C* (cost of optimal solution), eps (minimum step cost).",
              "BFS Summary: Complete (Yes); Time = O(b^d); Space = O(b^d); Optimal (Yes, if uniform step costs).",
              "DFS Summary: Complete (No for infinite paths/loops; Yes for finite spaces); Time = O(b^m); Space = O(b * m) [LINEAR!]; Optimal (No).",
              "UCS Summary: Complete (Yes, if cost >= eps > 0); Time = O(b^(1 + floor(C*/eps))); Space = O(b^(1 + floor(C*/eps))); Optimal (Yes, always).",
              "Exam Question: Why does DFS have vastly superior space complexity? DFS requires only O(b*m) linear space because it only stores the single path from the root down to the current node plus unexpanded sibling nodes, discarding completed subtrees."
            ],
            "bulletPointsAr": [
              "الشمولية (Completeness): هل تضمن الخوارزمية إيجاد حل إذا كان هناك مسار صحيح؟",
              "التعقيد الزمني (Time Complexity): كم يستغرق البحث (يُقاس بعدد العقد المولدة)؟",
              "التعقيد المكاني (Space Complexity): كم تستهلك من الرامات (يُقاس بأقصى عدد عقد مخزنة في وقت واحد)؟",
              "المثالية (Optimality): هل تجد الخوارزمية المسار الأقل تكلفة من بين كل الحلول؟",
              "المتغيرات الرياضية: b (معامل التفرع)، d (عمق أول هدف)، m (أقصى عمق للشجرة)، C* (تكلفة الحل الأمثل)، eps (أقل تكلفة خطوة).",
              "مصفوفة BFS: شاملة (نعم)؛ زمنياً O(b^d)؛ مكانياً O(b^d)؛ مثالية (نعم إذا تساوت تكاليف الخطوات).",
              "مصفوفة DFS: شاملة (لا في الأشجار اللانهائية؛ نعم في المحدودة)؛ زمنياً O(b^m)؛ مكانياً O(bm) خطي خارق؛ مثالية (لا).",
              "مصفوفة UCS: شاملة (نعم لو الخطوات موجبة)؛ زمنياً ومكانياً O(b^(1 + floor(C*/eps)))؛ مثالية (نعم دائماً).",
              "سؤال الامتحان الحاسم: لماذا يتفوق DFS في الذاكرة؟ لأن DFS يحتاج فقط لمساحة خطية O(bm) لأنه يحفظ فقط المسار الواحد الممتد من الجذر للعقدة الحالية مع إخوتها المباشرين، ويمسح الفروع المكتملة."
            ],
            "keyRule": "Linear Space Advantage: DFS uses linear memory O(b*m) because it stores only the active path and sibling nodes, making it far superior to BFS in memory consumption.",
            "keyRuleAr": "قاعدة الامتحان: يتفوق DFS باستهلاك ذاكرة خطي O(bm) فقط لأنه يحفظ المسار الحالي وإخوته، بينما ينهار BFS باستهلاك أسي O(b^d).",
            "quickCheck": {
              "question": "According to Sheet 4 Question 3, why does DFS have a much better space complexity compared to BFS for deep trees?",
              "questionAr": "وفقاً لسؤال الشيت الرابع رقم 3، لماذا يمتلك DFS تعقيداً مكانياً أفضل بكثير من BFS في الأشجار العميقة؟",
              "options": [
                "DFS requires only linear space O(b*m) by storing only the active path and sibling nodes, whereas BFS requires exponential space O(b^d)",
                "DFS compresses tree nodes using zip compression algorithms",
                "DFS does not store any nodes in memory at all",
                "BFS creates duplicate state space graphs for every city"
              ],
              "optionsAr": [
                "لأن DFS يحتاج فقط لذاكرة خطية O(bm) بتخزين المسار النشط وإخوته فقط، بينما يتطلب BFS ذاكرة أسية O(b^d)",
                "لأن DFS يضغط العقد بخوارزميات ضغط الملفات",
                "لأن DFS لا يحفظ أي عقد في الذاكرة على الإطلاق",
                "لأن BFS يكرر رسم فضاء الحالات لكل مدينة"
              ],
              "correctIndex": 0,
              "explanation": "Slide 29 and Sheet 4 Question 3 establish that DFS stores only O(bm) nodes along the active branch, saving vast memory over BFS.",
              "explanationAr": "السلايد 29 وسؤال الشيت الرابع يؤكدان أن DFS يقتصر على تخزين المسار النشط فقط O(bm)، مما يجعله خارقاً في توفير الرامات."
            }
          },
          {
            "title": "4. Avoiding Repeated States & Graph Search Mechanics",
            "titleAr": "4. تجنب تكرار الحالات وميكانيكا بحث الرسوم البيانية (Graph Search)",
            "content": "In problems with reversible actions or cycles (such as road networks or the 8-puzzle), naive Tree Search can re-expand identical states infinitely. Graph Search solves this:",
            "contentAr": "في المسائل التي تتضمن أفعالاً عكسية أو حلقات مغلقة (كشبكات الطرق أو لغز الـ 8)، تقع شجرة البحث في فخ الحلقات اللانهائية. ويأتي بحث الرسوم البيانية (Graph Search) لحل المعضلة:",
            "bulletPoints": [
              "Loopy Paths & Redundant Paths: A cycle occurs when an agent takes actions leading back to an already visited state (e.g., Arad -> Sibiu -> Arad).",
              "Tree Search Vulnerability: Tree Search algorithms do not remember past explored states and will re-traverse cycles endlessly, failing completeness.",
              "Graph Search Solution: Augments the search algorithm with an Explored Set (also called the Closed List).",
              "The Explored Set Rule: Whenever a node is expanded, its state is added to the Explored Set. If a newly generated child node contains a state already present in the Frontier or the Explored Set, it is discarded immediately.",
              "Preserving Optimality in UCS Graph Search: When an existing state in the frontier is reached via a cheaper alternative path, its path cost g and parent pointer are updated (decreased) rather than discarded."
            ],
            "bulletPointsAr": [
              "المسارات الدائرية والتكرار: تحدث الحلقة المفرغة عندما يعود الوكيل لنفس الحالة السابقة (مثل: من أراد إلى سيبيو ثم العودة لأراد).",
              "نقطة ضعف شجرة البحث: خوارزميات Tree Search لا تحتفظ بذاكرة للحالات السابقة، فتكرر فحص نفس العقد إلى ما لا نهاية وتفشل في الشمولية.",
              "حل بحث الرسوم البيانية (Graph Search): يزود الخوارزمية بمجموعة الحالات المستكشفة (Explored Set / Closed List).",
              "قاعدة القائمة المغلقة: بمجرد توسيع عقدة، يُسجل اسمها في الـ Explored Set؛ وأي عقدة مولدة جديدة موجودة مسبقاً في الجبهة أو القائمة المغلقة تُستبعد فوراً.",
              "الحفاظ على المثالية في UCS: إذا وُجد مسار بديل لنفس الحالة المسجلة في الجبهة بتكلفة g أقل، يتم تحديث تكلفتها ومؤشر الأب للأرخص."
            ],
            "keyRule": "Graph Search Rule: Graph Search guarantees safety from infinite loops and combinatorial explosion by discarding states already in the Frontier or Explored Set.",
            "keyRuleAr": "قاعدة الامتحان: يمنع Graph Search الحلقات اللانهائية والانفجار الحسابي عن طريق استبعاد أي حالة ظهرت مسبقاً في جبهة البحث أو القائمة المغلقة.",
            "quickCheck": {
              "question": "What core data structure does Graph Search introduce to prevent infinite loops caused by repeated states in cyclic graphs?",
              "questionAr": "ما هيكل البيانات الأساسي الذي يضيفه Graph Search لمنع الحلقات اللانهائية الناتجة عن تكرار الحالات؟",
              "options": [
                "Explored Set (Closed List)",
                "Priority Matrix",
                "Recursion Stack",
                "Neural Weight Array"
              ],
              "optionsAr": [
                "مجموعة الحالات المستكشفة (Explored Set / Closed List)",
                "مصفوفة الأولويات",
                "مكدس الاستدعاء الذاتي",
                "مصفوفة أوزان الشبكة العصبية"
              ],
              "correctIndex": 0,
              "explanation": "Slide 34 explains that Graph Search maintains an Explored Set (closed list) containing all expanded states to avoid cycles.",
              "explanationAr": "السلايد 34 توضح أن Graph Search يحتفظ بقائمة مغلقة (Explored Set) بكل الحالات المفحوصة لتفادي الحلقات المفرغة."
            }
          }
        ],
        "questions": [
          {
            "id": "q-ai4-1",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "mcq",
            "question": "What is the primary role of a search algorithm in an agent that searches?",
            "questionAr": "ما الدور الأساسي لخوارزمية البحث في الوكيل الذي يبحث؟",
            "options": [
              "To construct sequences of actions in a tree structure to achieve a goal without changing the real world",
              "To actively modify and move objects in the physical world during deliberation",
              "To collect live streaming telemetry from video sensors",
              "To compile binary code directly into GPU circuits"
            ],
            "optionsAr": [
              "بناء تسلسلات من الأفعال في شجرة بحث لتحقيق الهدف ذهنياً دون تغيير العالم الواقعي أثناء البحث",
              "تحريك وتعديل الأشياء في العالم الفيزيائي الحقيقي أثناء التفكير في الحل",
              "جمع قراءات البث المباشر من حساسات الفيديو",
              "ترجمة الكود الثنائي مباشرة إلى دوائر كروت الشاشة"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 5-6 and Sheet 4 Question 1 confirm that search constructs action sequences in an internal model without changing the real world.",
            "explanationAr": "السلايد 5 و 6 وسؤال الشيت الرابع يؤكدان أن البحث عملية ذهنية تبني مسارات أفعال دون المساس بالعالم الواقعي حتى ينتهي البحث."
          },
          {
            "id": "q-ai4-2",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "mcq",
            "question": "Which search strategy implements its frontier using a FIFO (First-In, First-Out) queue?",
            "questionAr": "أي استراتيجية بحث تدير جبهة البحث (Frontier) الخاصة بها باستخدام طابور FIFO؟",
            "options": [
              "Breadth-First Search (BFS)",
              "Depth-First Search (DFS)",
              "Uniform-Cost Search (UCS)",
              "Depth-Limited Search"
            ],
            "optionsAr": [
              "البحث في العرض (Breadth-First Search - BFS)",
              "البحث في العمق (Depth-First Search - DFS)",
              "البحث متساوي التكلفة (Uniform-Cost Search - UCS)",
              "البحث محدود العمق"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 10 details that Breadth-First Search manages its frontier as a FIFO queue, expanding shallowest nodes first.",
            "explanationAr": "السلايد 10 توضح أن خوارزمية البحث في العرض BFS تدير جبهة البحث بطابور FIFO."
          },
          {
            "id": "q-ai4-3",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "true_false",
            "question": "Uniform-Cost Search (UCS) is guaranteed to find the optimal path for any arbitrary non-negative step costs.",
            "questionAr": "تضمن خوارزمية البحث متساوي التكلفة (UCS) العثور على المسار الأمثل صاحب أقل تكلفة لأي تكاليف خطوات موجبة.",
            "correctAnswer": true,
            "explanation": "True. Slide 24 & 30 state that UCS is optimal for general step costs where step costs >= eps > 0.",
            "explanationAr": "صحيح. السلايد 24 و 30 تؤكدان أن UCS مثالية دائماً لأي تكاليف خطوات حقيقية موجبة."
          },
          {
            "id": "q-ai4-4",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "mcq",
            "question": "What is the space complexity of Depth-First Search (DFS) for a tree with branching factor b and maximum depth m?",
            "questionAr": "ما التعقيد المكاني (Space Complexity) لخوارزمية البحث في العمق (DFS) لشجرة ذات معامل تفرع b وعمق أقصى m؟",
            "options": [
              "O(b * m) [Linear space]",
              "O(b^d) [Exponential space]",
              "O(b^m) [Exponential space]",
              "O(1) [Constant space]"
            ],
            "optionsAr": [
              "O(b * m) [تعقيد مكاني خطي]",
              "O(b^d) [تعقيد مكاني أسي]",
              "O(b^m) [تعقيد مكاني أسي]",
              "O(1) [تعقيد مكاني ثابت]"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 29 and Sheet 4 Question 3 establish that DFS requires only linear space O(bm).",
            "explanationAr": "السلايد 29 وسؤال الشيت الرابع يؤكدان أن التعقيد المكاني لـ DFS خطي O(bm)."
          },
          {
            "id": "q-ai4-5",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "true_false",
            "question": "In Breadth-First Search (BFS), memory space complexity is the primary practical bottleneck rather than execution time.",
            "questionAr": "في خوارزمية البحث في العرض (BFS)، استهلاك الذاكرة (التعقيد المكاني) هو العقبة العملية الكبرى وليس وقت المعالجة.",
            "correctAnswer": true,
            "explanation": "True. Slide 30 notes that BFS space complexity O(b^d) runs out of physical memory long before CPU time expires.",
            "explanationAr": "صحيح. السلايد 30 توضح أن الرامات تنفد في BFS بسرعة رهيبة قبل أن ينتهي وقت المعالج."
          },
          {
            "id": "q-ai4-6",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "mcq",
            "question": "If all step costs in a state space are identical (e.g., all costs = 1), which search algorithm does UCS become equivalent to?",
            "questionAr": "إذا كانت جميع تكاليف الخطوات في فضاء الحالات متطابقة (كل خطوة = 1)، فما الخوارزمية التي تتطابق معها خطوات UCS تماماً؟",
            "options": [
              "Breadth-First Search (BFS)",
              "Depth-First Search (DFS)",
              "A* Search",
              "Iterative Deepening Search"
            ],
            "optionsAr": [
              "البحث في العرض (Breadth-First Search - BFS)",
              "البحث في العمق (Depth-First Search - DFS)",
              "بحث A* الاستكشافي",
              "البحث متكرر التعميق"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 33 states: \"If all step costs are equal, UCS expands nodes in identical order to BFS.\"",
            "explanationAr": "السلايد 33 ومقارنة الخوارزميات تؤكدان أنه مع تساوي تكاليف الخطوات، تتطابق خطوات UCS تماماً مع BFS."
          },
          {
            "id": "q-ai4-7",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "true_false",
            "question": "In Uniform-Cost Search, applying the goal test when a node is generated preserves optimality.",
            "questionAr": "في خوارزمية UCS، فحص الهدف لحظة توليد العقدة يحافظ على خاصية المثالية (Optimality).",
            "correctAnswer": false,
            "explanation": "False. Applying the goal test upon generation in UCS destroys optimality because a cheaper path to the goal might still exist in the frontier.",
            "explanationAr": "خطأ. فحص الهدف لحظة التوليد في UCS يدمر المثالية تماماً؛ لأن هناك مساراً أرخص للهدف قد يظل محبوساً في جبهة البحث."
          },
          {
            "id": "q-ai4-8",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "mcq",
            "question": "What is the purpose of maintaining an Explored Set in Graph Search?",
            "questionAr": "ما الغرض من الاحتفاظ بقائمة الحالات المستكشفة (Explored Set) في خوارزميات Graph Search؟",
            "options": [
              "To remember all previously expanded states and prevent infinite loops in cyclic graphs",
              "To speed up CPU clock frequency",
              "To store the final video recording of the agent",
              "To calculate GPU matrix multiplications"
            ],
            "optionsAr": [
              "حفظ جميع الحالات التي تم توسيعها مسبقاً لمنع الوقوع في حلقات مفرغة لانهائية وتفادي تكرار الحالات",
              "زيادة تردد وسرعة معالج الكمبيوتر",
              "تخزين التسجيل المرئي لحركة الروبوت",
              "حساب ضرب مصفوفات كروت الشاشة"
            ],
            "correctAnswer": 0,
            "explanation": "Slide 34 explains that the Explored Set prevents cycles and redundant paths in state graphs.",
            "explanationAr": "السلايد 34 توضح أن القائمة المغلقة تمنع دوران الوكيل في حلقات مفرغة وتمنع تكرار فحص الحالات."
          },
          {
            "id": "q-ai4-9",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "true_false",
            "question": "Depth-First Search (DFS) can get trapped in an infinite loop on graphs with cycles when run as a Tree Search.",
            "questionAr": "يمكن لخوارزمية البحث في العمق (DFS) أن تقع في حلقة لانهائية مفرغة على الرسوم البيانية ذات الحلقات إذا طُبقت بنظام شجرة البحث.",
            "correctAnswer": true,
            "explanation": "True. Tree search does not track visited states; DFS will repeatedly follow cycles and never terminate.",
            "explanationAr": "صحيح. لأن شجرة البحث لا تحفظ الحالات السابقة، فسيستمر DFS في تكرار الحلقة المفرغة إلى ما لا نهاية."
          },
          {
            "id": "q-ai4-10",
            "courseId": "ai",
            "lectureId": "ai-lec-4",
            "type": "mcq",
            "question": "Given a complete binary tree generated by n -> 2n, 2n+1 with start 1 and goal 11, which algorithm reaches the goal in fewer expansions?",
            "questionAr": "في الشجرة الثنائية المتولدة بالدالة 2n و 2n+1 من 1 حتى 15 وكان الهدف 11، أي الخوارزميتين تصل للهدف بعدد توسيعات أقل؟",
            "options": [
              "DFS reaches 11 in 8 node expansions, whereas BFS requires 11 node expansions",
              "BFS reaches 11 in 3 expansions, whereas DFS requires 50 expansions",
              "Both algorithms expand exactly 15 nodes",
              "UCS fails to terminate"
            ],
            "optionsAr": [
              "خوارزمية DFS تصل للهدف 11 في 8 خطوات فقط بينما يحتاج BFS إلى 11 خطوة",
              "خوارزمية BFS تصل للهدف 11 في 3 خطوات بينما يحتاج DFS إلى 50 خطوة",
              "الخوارزميتان تتوسعان في 15 عقدة بالضبط",
              "خوارزمية UCS تفشل في التوقف"
            ],
            "correctAnswer": 0,
            "explanation": "Sheet 4 Question 5 proves DFS traces: 1->2->4->8->9->5->10->11 (8 nodes, skipping the right half 3,6,7,12,13,14,15), while BFS visits level by level 1 through 11 (11 nodes).",
            "explanationAr": "مسألة الشيت الرابع سلايد 36 تثبت أن DFS يغوص في الفرع الأيسر فيصل للهدف 11 في 8 خطوات فقط متجاوزاً النصف الأيمن بالكامل، بينما يزور BFS كل العقد دوراً بدور فيحتاج 11 خطوة."
          }
        ]
      }
    ],
    "sheets": [
      {
        "id": "ai-sheet-1",
        "courseId": "ai",
        "sheetNumber": 1,
        "title": "Lecture 1 Sheet",
        "titleAr": "شيت المحاضرة الأولى",
        "brief": "Official faculty section quiz for Lecture 1 (Dr. Nesma Mahmoud) covering the 3 AI fuel pillars, Turing Test operational intelligence, and Rational Agent formal definitions with comprehensive model solutions and slide citations.",
        "briefAr": "شيت المحاضرة الأولى الرسمي لدكتورة نسمة محمود؛ يشمل أسئلة الأركان الثلاثة للذكاء الاصطناعي، اختبار تورينج، والوكيل العقلاني مع الحل النموذجي والتعليل الأكاديمي المستند إلى السلايدات.",
        "problemsCount": 4,
        "hasSolution": true,
        "problems": [
          {
            "id": "p-ai1-1",
            "problemNumber": 1,
            "question": "What three key components explain how machines can exhibit intelligent behavior and why AI has recently exploded into everyday lives?",
            "questionAr": "ما المكونات الثلاثة الأساسية التي تفسر قدرة الآلات على إظهار سلوك ذكي وتفسر سبب انفجار الذكاء الاصطناعي في حياتنا اليومية مؤخراً؟",
            "solution": "The modern AI explosion is driven by the synergistic convergence of three foundational pillars (Lecture 1 Slide 9):\n1. Advanced Algorithms: Breakthroughs in deep neural network architectures, attention mechanisms (Transformers invented in 2017), and deep reinforcement learning.\n2. Big Data: The generation and availability of petabytes and exabytes of textual, auditory, and visual data across the global web, which serves as the \"fuel\" that trains and refines modern models.\n3. Accelerated Computing Power: The transition from sequential CPUs to massively parallel graphics processing units (NVIDIA GPUs) and specialized hardware accelerators like Google Tensor Processing Units (TPUs).",
            "solutionAr": "طفرة وانفجار الذكاء الاصطناعي في حياتنا اليومية ترجع إلى اندماج ثلاثة أركان تأسيسية متكاملة (سلايد 9 من المحاضرة الأولى):\n1. الخوارزميات المتقدمة (Advanced Algorithms): ابتكار الشبكات العصبية العميقة، ونماذج المحولات والانتباه (Transformers عام 2017)، والتعلم المعزز.\n2. البيانات الضخمة (Big Data): توفر كميات هائلة من النصوص والصور ومقاطع الفيديو وقراءات الحساسات على الإنترنت، والتي تمثل \"الوقود\" الأساسي لتدريب النماذج.\n3. العتاد الحسابي فائق السرعة (Computing Power): الانتقال من المعالجات المركزية التسلسلية (CPUs) إلى المعالجات المتوازية الضخمة (GPUs) ورقاقات الموترات المتخصصة (Google TPUs)."
          },
          {
            "id": "p-ai1-2",
            "problemNumber": 2,
            "question": "What is the operational definition of intelligence proposed by Alan Turing?",
            "questionAr": "ما هو التعريف الإجرائي للذكاء الذي اقترحه العالم آلان تورينج (Alan Turing) عام 1950؟",
            "solution": "In 1950, Alan Turing proposed an operational benchmark called the \"Turing Test\" (or the Imitation Game - Lecture 1 Slide 16):\n- A human interrogator is placed in a separate room and engages in written (text-only) conversation with two hidden entities: a human responder and a machine (computer).\n- The computer passes the test and is deemed intelligent if the human interrogator cannot reliably distinguish whether the written answers are coming from the human or the computer.\n- Passing the text-based Turing test requires four core AI disciplines: Natural Language Processing (NLP), Knowledge Representation, Automated Reasoning, and Machine Learning.",
            "solutionAr": "في عام 1950، اقترح آلان تورينج تعريفاً عملياً وإجرائياً للذكاء عُرف باختبار تورينج (Turing Test أو لعبة المحاكاة - سلايد 16):\n- يجلس محقق بشري في غرفة منفصلة ويطرح أسئلة كتابية (Text-only) على طرفين مجهولين: إنسان حقيقي وجهاز كمبيوتر (آلة).\n- تجتاز الآلة الاختبار وتعتبر \"ذكية\" إذا عجز المحقق البشري عن التمييز ومعرفة ما إذا كانت الإجابات المكتوبة صادرة من الإنسان أم من جهاز الكمبيوتر.\n- يتطلب اجتياز هذا الاختبار امتلاك 4 تخصصات ذكاء اصطناعي: معالجة اللغات الطبيعية (NLP)، تمثيل المعرفة (KR)، الاستدلال الآلي (Automated Reasoning)، والتعلم الآلي (ML)."
          },
          {
            "id": "p-ai1-3",
            "problemNumber": 3,
            "question": "Which component of AI is referred to as the \"fuel that drives AI\"?\n○ A) Algorithms   B) Computing Power   C) Data",
            "questionAr": "أي مكون من مكونات الذكاء الاصطناعي يُشار إليه بأنه \"الوقود الذي يقود الذكاء الاصطناعي\"؟\n○ A) الخوارزميات   B) القدرة الحوسبية   C) البيانات",
            "options": [
              "Algorithms",
              "Computing Power",
              "Data"
            ],
            "optionsAr": [
              "الخوارزميات (Algorithms)",
              "القدرة الحوسبية (Computing Power)",
              "البيانات (Data)"
            ],
            "solution": "Correct Answer: C) Data.\nAcademic Justification: Slide 9 explicitly establishes that data is the fuel that drives AI. While algorithms represent the engine and computing hardware acts as the accelerator, data provides the essential training signal and empirical knowledge required for artificial intelligence to learn and generalize.",
            "solutionAr": "الإجابة النموذجية: C) البيانات (Data).\nالتعليل الأكاديمي: السلايد 9 من المحاضرة الأولى وسؤال الشيت الأول يوضحان أن البيانات هي الوقود (Fuel) الحقيقي للذكاء الاصطناعي؛ فالخوارزميات هي المحرك، والعتاد هو المسرع، والبيانات هي الوقود الذي تتغذى عليه النماذج لاكتشاف الأنماط والتعميم."
          },
          {
            "id": "p-ai1-4",
            "problemNumber": 4,
            "question": "Which of the following best defines a \"Rational Agent\"?\n○ A) An agent that strictly mimics human thought processes and emotional responses\n○ B) An agent that always acts to achieve the best outcome, or the best expected outcome under uncertainty\n○ C) An agent that relies exclusively on unconditioned reflexes like pulling a hand from a hot stove\n○ D) An agent that exclusively uses hard-coded traditional programming steps",
            "questionAr": "أي من الخيارات التالية يُعرّف \"الوكيل العقلاني\" (Rational Agent) بأدق صورة؟\n○ A) وكيل يحاكي بدقة عمليات التفكير البشري والانفعالات العاطفية\n○ B) وكيل يتصرف دائماً لتحقيق أفضل نتيجة ممكنة، أو أفضل نتيجة متوقعة في ظل عدم اليقين\n○ C) وكيل يعتمد حصرياً على ردود الأفعال المنعكسة فقط كسحب اليد من الفرن الساخن\n○ D) وكيل يعتمد حصرياً على خطوات برمجية تقليدية مكتوبة مسبقاً",
            "options": [
              "An agent that strictly mimics human thought processes and emotional responses",
              "An agent that always acts to achieve the best outcome, or the best expected outcome under uncertainty",
              "An agent that relies exclusively on unconditioned reflexes like pulling a hand from a hot stove",
              "An agent that exclusively uses hard-coded traditional programming steps"
            ],
            "optionsAr": [
              "وكيل يحاكي بدقة عمليات التفكير البشري والانفعالات العاطفية",
              "وكيل يتصرف دائماً لتحقيق أفضل نتيجة ممكنة، أو أفضل نتيجة متوقعة في ظل عدم اليقين",
              "وكيل يعتمد حصرياً على ردود الأفعال المنعكسة فقط كسحب اليد من الفرن الساخن",
              "وكيل يعتمد حصرياً على خطوات برمجية تقليدية مكتوبة مسبقاً"
            ],
            "solution": "Correct Answer: B) An agent that always acts to achieve the best outcome, or the best expected outcome under uncertainty.\nAcademic Justification: Lecture 1 Slide 23-24 and Lecture 2 Slide 4 define a rational agent as an entity that selects actions to maximize its goal achievement based on available knowledge. Rationality is about optimal performance, not mimicking human flaws, emotions, or relying solely on hardcoded reflexes.",
            "solutionAr": "الإجابة النموذجية: B) وكيل يتصرف دائماً لتحقيق أفضل نتيجة ممكنة، أو أفضل نتيجة متوقعة في ظل عدم اليقين.\nالتعليل الأكاديمي: السلايد 23 و 24 من المحاضرة الأولى وسؤال الشيت الأول تؤكد أن العقلانية تركز على المثالية (Optimality) وتحقيق الهدف بأفضل تصرف ممكن وفقاً لما هو متاح من معلومات، وليس تقليد أخطاء وانفعالات البشر."
          }
        ]
      },
      {
        "id": "ai-sheet-2",
        "courseId": "ai",
        "sheetNumber": 2,
        "title": "Lecture 2 Sheet",
        "titleAr": "شيت المحاضرة الثانية",
        "brief": "Official faculty section quiz for Lecture 2 (Dr. Nesma Mahmoud) covering Intelligent Agent capacities, the Agent architecture formula, automated taxi PEAS formalization, and environment observability classifications.",
        "briefAr": "شيت المحاضرة الثانية الرسمي لدكتورة نسمة محمود؛ يشمل قدرات الوكيل الذكي، معادلة المعمارية، التوصيف الكامل لبيئة PEAS للتاكسي ذاتي القيادة، وأبعاد البيئات مع الحل النموذجي ومراجع السلايدات.",
        "problemsCount": 6,
        "hasSolution": true,
        "problems": [
          {
            "id": "p-ai2-1",
            "problemNumber": 1,
            "question": "What are the basic capacities of an Intelligent Agent? Illustrate using a diagram.",
            "questionAr": "ما هي القدرات الأساسية للوكيل الذكي (Intelligent Agent)؟ وضح إجابتك بالرسم التخطيطي.",
            "solution": "The four basic capacities of an Intelligent Agent are (Lecture 2 Slide 9):\n1. Perception: Receiving sensory inputs (percepts) from the surrounding environment using sensors.\n2. Reasoning / Cognition: Processing sensory data, maintaining internal state, evaluating future outcomes, and selecting rational actions.\n3. Learning: Adapting internal models to cope with changing environments and discovering new patterns from experience.\n4. Action: Executing decisions to affect and modify the external environment using actuators.\n\nDiagram representation:\n[Environment] ──(Percepts)──> [Sensors] ──> [Reasoning, Learning & Agent Program] ──> [Actuators] ──(Actions)──> [Environment]",
            "solutionAr": "القدرات الأربع الأساسية للوكيل الذكي هي (سلايد 9 من المحاضرة الثانية):\n1. الإدراك (Perception): استقبال المدخلات الحسية والمدركات من البيئة المحيطة عبر الحساسات (Sensors).\n2. الاستدلال والمعالجة المعرفية (Reasoning / Cognition): معالجة بيانات الحساسات، تحديث الحالة الداخلية، تقييم السيناريوهات، واختيار أصح قرار.\n3. التعلم (Learning): تعديل وتطوير النماذج الداخلية للتكيف مع البيئة المتغيرة واكتساب الخبرة.\n4. الفعل والتأثير (Action): تنفيذ القرارات المعتمدة للتأثير في البيئة الخارجية عبر المشغلات (Actuators).\n\nالرسم التخطيطي:\n[البيئة المحيطة] ──(مدركات حسية)──> [الحساسات] ──> [برنامج الوكيل: معالجة وتعلم واستدلال] ──> [المشغلات] ──(أفعال وتأثير)──> [البيئة المحيطة]"
          },
          {
            "id": "p-ai2-2",
            "problemNumber": 2,
            "question": "What is the fundamental architecture formula that defines an agent?",
            "questionAr": "ما هي المعادلة المعمارية التأسيسية التي تُعرّف الوكيل الذكي؟",
            "solution": "The fundamental architecture formula is (Lecture 2 Slide 11):\nAgent = Architecture + Agent Program\nWhere:\n- Architecture: The physical computing device or hardware platform that supplies physical sensors and actuators (e.g., PC, camera interfaces, robot chassis, wheels, motors).\n- Agent Program: The concrete algorithm or code implementation running on that architecture that maps incoming percepts to actions.",
            "solutionAr": "المعادلة المعمارية التأسيسية هي (سلايد 11 من المحاضرة الثانية):\nالوكيل = المعمارية (Architecture) + برنامج الوكيل (Agent Program)\nحيث:\n- المعمارية (Architecture): المنصة الحاسوبية والعتاد المادي الذي يوفر الحساسات والمشغلات الفعلية (مثل الكاميرات، المحركات، وعجلات الحركة).\n- برنامج الوكيل (Agent Program): الكود أو الخوارزمية البرمجية التي تعمل داخل المعمارية وتستقبل قراءات الحساسات وتصدر أوامر الأفعال للمشغلات."
          },
          {
            "id": "p-ai2-3",
            "problemNumber": 3,
            "question": "Construct the PEAS description of an automated taxi.",
            "questionAr": "اكتب التوصيف الأكاديمي الكامل لإطار PEAS لتاكسي ذاتي القيادة (Automated Taxi).",
            "solution": "Complete PEAS formalization for an Automated Taxi Driver (Lecture 2 Slide 17):\n- P (Performance Measure): Safe trip, speed / time efficiency, compliance with traffic laws, passenger comfort, maximizing financial profits.\n- E (Environment): City streets, highways, traffic congestion, pedestrians, bicycles, weather conditions, customers/passengers.\n- A (Actuators): Steering wheel, accelerator pedal, brakes, turn signals, horn, dashboard display / audio interface.\n- S (Sensors): Video cameras, LiDAR, radar, ultrasonic sonar, GPS, speedometer, odometer, engine sensors.",
            "solutionAr": "التوصيف الأكاديمي الكامل لإطار PEAS للتاكسي ذاتي القيادة (سلايد 17 من المحاضرة الثانية):\n- مقياس الأداء (P - Performance Measure): أمان الرحلة، الوصول في وقت قياسي، الالتزام التام بقوانين وإشارات المرور، راحة الراكب، وتوفير استهلاك الوقود وتعظيم الأرباح.\n- البيئة الخارجية (E - Environment): شوارع المدينة، الطرق السريعة، إشارات المرور، السيارات المجاورة، المشاة، راكبو الدراجات، تقلبات الطقس، والركاب.\n- المشغلات (A - Actuators): عجلة القيادة، دواسة البنزين، الفرامل، إشارات الانعطاف، الكلاكس، وشاشة العرض والتوجيه الصوتي.\n- الحساسات (S - Sensors): الكاميرات الرقمية، حساسات الليزر (LiDAR)، الرادار، السونار فوق الصوتي، نظام تحديد المواقع (GPS)، عداد السرعة، وحساسات المحرك."
          },
          {
            "id": "p-ai2-4",
            "problemNumber": 4,
            "question": "Differentiate fully observable and partially observable environments.",
            "questionAr": "قارن بين البيئة الملاحظة بالكامل (Fully Observable) والبيئة الملاحظة جزئياً (Partially Observable).",
            "solution": "Comparison (Lecture 2 Slide 20 & 22):\n1. Fully Observable Environment:\n- The agent's sensors give it complete, accurate access to the entire state of the environment relevant to choosing an action at each point in time.\n- The agent does not need to maintain internal memory of past states to know what the world is like right now.\n- Examples: Crossword puzzles, Chess with a clock, Image analysis.\n\n2. Partially Observable Environment:\n- The agent's sensors are noisy, inaccurate, or missing critical state information due to physical limits (e.g., cannot see around corners, occlusions, hidden cards).\n- The agent must maintain an internal world model and memory of past percepts to infer current state.\n- Examples: Automated taxi driving, Poker, Medical diagnosis.",
            "solutionAr": "المقارنة الأكاديمية (سلايد 20 و 22 من المحاضرة الثانية):\n1. البيئة الملاحظة بالكامل (Fully Observable):\n- تتيح حساسات الوكيل وصولاً كاملاً ودقيقاً لكل تفاصيل حالة البيئة المؤثرة في اتخاذ القرار في كل لحظة.\n- لا يحتاج الوكيل للاحتفاظ بذاكرة تاريخية عن الحالات السابقة ليعرف وضع البيئة الحالي.\n- أمثلة: الكلمات المتقاطعة، الشطرنج بساعة، فحص الصور الطبية.\n\n2. البيئة الملاحظة جزئياً (Partially Observable):\n- تكون الحساسات مشوشة أو غير دقيقة أو محجوبة الرؤية عن أجزاء من البيئة (كالرؤية خلف المباني أو أوراق الخصم المخفية).\n- يلتزم الوكيل بالاحتفاظ بذاكرة داخلية ونموذج للعالم لتقدير واستنتاج الحالة الحقيقية للبيئة.\n- أمثلة: قيادة التاكسي في المدينة، لعبة البوكر، والتشخيص الطبي."
          },
          {
            "id": "p-ai2-5",
            "problemNumber": 5,
            "question": "Which component of an agent provides physical sensors and actuators?\n○ A) Agent Program   B) Architecture   C) Utility Function   D) Lookup Table",
            "questionAr": "أي مكون من مكونات الوكيل هو المسؤول عن توفير الحساسات والمشغلات الفيزيائية؟\n○ A) برنامج الوكيل   B) المعمارية   C) دالة المنفعة   D) جدول البحث",
            "options": [
              "Agent Program",
              "Architecture",
              "Utility Function",
              "Lookup Table"
            ],
            "optionsAr": [
              "برنامج الوكيل (Agent Program)",
              "المعمارية (Architecture)",
              "دالة المنفعة (Utility Function)",
              "جدول البحث (Lookup Table)"
            ],
            "solution": "Correct Answer: B) Architecture.\nAcademic Justification: In the fundamental equation Agent = Architecture + Agent Program (Lecture 2 Slide 11), the Architecture provides the physical devices, sensors, and actuators, while the Agent Program implements the decision-making logic.",
            "solutionAr": "الإجابة النموذجية: B) المعمارية (Architecture).\nالتعليل الأكاديمي: في معادلة الوكيل التأسيسية (الوكيل = المعمارية + برنامج الوكيل - سلايد 11)، توفر المعمارية العتاد والحساسات والمشغلات، بينما ينفذ البرنامج المنطق والخوارزمية."
          },
          {
            "id": "p-ai2-6",
            "problemNumber": 6,
            "question": "What is an environment called if the agent's sensors give it complete access to the complete state of the world relevant to choosing an action?\n○ A) Stochastic environment   B) Partially observable environment   C) Fully observable environment   D) Dynamic environment",
            "questionAr": "ماذا تسمى البيئة إذا كانت حساسات الوكيل تمنحه وصولاً كاملاً للحالة الكلية للعالم ذات الصلة باختيار الفعل؟\n○ A) بيئة احتمالية   B) بيئة ملاحظة جزئياً   C) بيئة ملاحظة بالكامل   D) بيئة ديناميكية",
            "options": [
              "Stochastic environment",
              "Partially observable environment",
              "Fully observable environment",
              "Dynamic environment"
            ],
            "optionsAr": [
              "بيئة احتمالية (Stochastic)",
              "بيئة ملاحظة جزئياً (Partially observable)",
              "بيئة ملاحظة بالكامل (Fully observable)",
              "بيئة ديناميكية (Dynamic)"
            ],
            "solution": "Correct Answer: C) Fully observable environment.\nAcademic Justification: Slide 20 & 22 define a Fully Observable environment as one where the agent's sensors detect all aspects relevant to choosing an action at each point in time.",
            "solutionAr": "الإجابة النموذجية: C) بيئة ملاحظة بالكامل (Fully observable environment).\nالتعليل الأكاديمي: السلايد 20 و 22 تعرف البيئة الملاحظة بالكامل بأنها البيئة التي تكشف فيها الحساسات كل الجوانب المؤثرة في اتخاذ القرار في كل لحظة."
          }
        ]
      },
      {
        "id": "ai-sheet-3",
        "courseId": "ai",
        "sheetNumber": 3,
        "title": "Lecture 3 Sheet",
        "titleAr": "شيت المحاضرة الثالثة",
        "brief": "Official faculty section quiz for Lecture 3 (Dr. Nesma Mahmoud) covering abstraction in problem-solving agents, the 5 formal components of a search problem, State vs Node definitions, Transition Models, and the Frontier.",
        "briefAr": "شيت المحاضرة الثالثة الرسمي لدكتورة نسمة محمود؛ يشمل مفهوم التجريد (Abstraction)، المكونات الخمسة الرسمية لمسألة البحث، الفرق بين الحالة والعقدة، دور دالة الانتقال، وجبهة البحث مع الحل النموذجي ومراجع السلايدات.",
        "problemsCount": 5,
        "hasSolution": true,
        "problems": [
          {
            "id": "p-ai3-1",
            "problemNumber": 1,
            "question": "What is abstraction in the context of problem-solving agents and search problems?",
            "questionAr": "ما هو مفهوم التجريد (Abstraction) في سياق وكلاء حل المشكلات ومسائل البحث؟",
            "solution": "Abstraction in AI search is the intentional process of removing irrelevant real-world details (such as the car's color, passenger conversations, weather scenery, or radio stations) and retaining only the essential states, legal actions, and step costs required to solve the computational problem rationally (Lecture 3 Slide 9).\nWithout valid abstraction, real-world state spaces would be infinite, chaotic, and mathematically intractable. A good abstraction preserves all details necessary to ensure solution validity while discarding everything that wastes memory and processing time.",
            "solutionAr": "التجريد (Abstraction) في مسائل البحث والذكاء الاصطناعي هو الحذف والتنقية المتعمدة لجميع تفاصيل العالم الحقيقي غير المؤثرة (مثل لون السيارة، الأغنية في الراديو، السحب في السماء) والاحتفاظ فقط بالحالات والأفعال القانونية وتكاليف الخطوات الضرورية لحل المسألة عقلانياً (سلايد 9 من المحاضرة 3).\nوبدون التجريد، تصبح فضاءات الحالات لانهائية ومستحيلة المعالجة حاسوبياً؛ والتجريد السليم يضمن صحة الحل مع توفير موارد الحاسوب."
          },
          {
            "id": "p-ai3-2",
            "problemNumber": 2,
            "question": "What are the five core components that formally define a search problem in AI?",
            "questionAr": "ما المكونات الخمسة الأساسية التي تُعرّف مسألة البحث في الذكاء الاصطناعي صياغةً رياضية ورسمية؟",
            "solution": "A search problem is formally defined by five mathematical components (Lecture 3 Slide 11):\n1. Initial State (s0): The starting configuration where the agent begins (e.g., In(Arad)).\n2. Actions (ACTIONS(s)): The set of legal actions available to the agent when in state s.\n3. Transition Model (RESULT(s, a)): A formal function specifying the successor state that results from executing action a in state s.\n4. Goal Test: A predicate or explicit set of states determining whether a given state satisfies the agent's objective (e.g., s == In(Bucharest)).\n5. Path Cost (c(s, a, s')): A numeric step cost function; the total path cost is the sum of step costs along the action sequence.",
            "solutionAr": "تُعرّف أي مسألة بحث في الذكاء الاصطناعي بخمسة مكونات رسمية (سلايد 11 من المحاضرة 3):\n1. الحالة الابتدائية (Initial State - s0): نقطة البداية التي ينطلق منها الوكيل (مثل: التواجد في مدينة أراد In(Arad)).\n2. الأفعال المتاحة (Actions - ACTIONS(s)): قائمة الحركات القانونية المسموح بها في الحالة s.\n3. نموذج الانتقال (Transition Model - RESULT(s, a)): الدالة التي تحدد الحالة الناتجة عن تنفيذ الفعل a في الحالة s.\n4. اختبار الهدف (Goal Test): دالة منطقية تفحص ما إذا كانت الحالة الحالية تحقق غاية الوكيل (مثل: الوصول لبوخارست).\n5. تكلفة المسار (Path Cost): الدالة الرقمية c(s, a, s') التي تحسب تكلفة الخطوات، وتكلفة المسار هي مجموع تكاليف خطواته."
          },
          {
            "id": "p-ai3-3",
            "problemNumber": 3,
            "question": "Define the following items: State, State Space, Search Tree.",
            "questionAr": "عرّف كلاً من المصطلحات التالية: الحالة (State)، فضاء الحالات (State Space)، وشجرة البحث (Search Tree).",
            "solution": "Definitions (Lecture 3 Slide 16-19):\n1. State: A formal representation of a physical configuration of the world at a specific point in time (e.g., being located in the city of Arad, or a specific arrangement of tiles in the 8-puzzle).\n2. State Space: The set of all possible states reachable from the initial state by any sequence of legal actions. It is represented as a directed graph where each distinct physical state appears exactly once.\n3. Search Tree: A mental search data structure constructed by the search algorithm during deliberation. Its root is the initial state; branches represent actions; and nodes represent paths through the state space. (Note: different nodes in the tree may contain the exact same physical world state reached via distinct paths).",
            "solutionAr": "التعريفات الأكاديمية (سلايد 16 إلى 19 من المحاضرة 3):\n1. الحالة (State): تمثيل رسمي لوضع فيزيائي حقيقي في العالم عند لحظة معينة (مثل التواجد في مدينة أراد، أو ترتيب معين لأرقام لغز الـ 8).\n2. فضاء الحالات (State Space): مجموعة كل الحالات الممكن الوصول إليها من الحالة الابتدائية عبر أي تسلسل من الأفعال القانونية؛ ويُمثل برسم بياني تظهر فيه كل حالة فيزيائية مرة واحدة فقط.\n3. شجرة البحث (Search Tree): هيكل شجري افتراضي تبنيه خوارزمية البحث ذهنياً أثناء التفكير؛ جذره الحالة الابتدائية وفروعه الأفعال وعقده تمثل مسارات (ويمكن أن تتكرر نفس الحالة الفيزيائية في عقد متعددة بالوصول إليها بطرق مختلفة)."
          },
          {
            "id": "p-ai3-4",
            "problemNumber": 4,
            "question": "Which of the following best describes the role of the Transition Model (RESULT(s, a))?\n○ A) It determines whether a given state satisfies the goal condition\n○ B) It specifies the outcome state resulting from carrying out action a in state s\n○ C) It assigns a numeric cost to a path of actions\n○ D) It lists the set of legal actions available to an agent in a given state",
            "questionAr": "أي من الخيارات التالية يصف بدقة دور نموذج الانتقال (RESULT(s, a))؟\n○ A) يحدد ما إذا كانت الحالة تحقق شروط الهدف النهائي\n○ B) يحدد الحالة الناتجة عن تنفيذ الفعل a في الحالة s\n○ C) يعين تكلفة عددية لمسار الأفعال\n○ D) يسرد مجموعة الأفعال القانونية المتاحة في حالة معينة",
            "options": [
              "It determines whether a given state satisfies the goal condition",
              "It specifies the outcome state resulting from carrying out action a in state s",
              "It assigns a numeric cost to a path of actions",
              "It lists the set of legal actions available to an agent in a given state"
            ],
            "optionsAr": [
              "يحدد ما إذا كانت الحالة تحقق شروط الهدف النهائي",
              "يحدد الحالة الناتجة عن تنفيذ الفعل a في الحالة s",
              "يعين تكلفة عددية لمسار الأفعال",
              "يسرد مجموعة الأفعال القانونية المتاحة في حالة معينة"
            ],
            "solution": "Correct Answer: B) It specifies the outcome state resulting from carrying out action a in state s.\nAcademic Justification: Lecture 3 Slide 11 defines the Transition Model: RESULT(s, a) returns the state that results from doing action a in state s.",
            "solutionAr": "الإجابة النموذجية: B) يحدد الحالة الناتجة عن تنفيذ الفعل a في الحالة s.\nالتعليل الأكاديمي: السلايد 11 من المحاضرة الثالثة تعرف نموذج الانتقال بأنه الدالة RESULT(s, a) التي تعيد الحالة الناتجة عن تطبيق الفعل a على الحالة s."
          },
          {
            "id": "p-ai3-5",
            "problemNumber": 5,
            "question": "What does the frontier (or fringe) represent in a search tree algorithm?\n○ A) The set of states that have already been fully explored and discarded\n○ B) The collection of all leaf nodes that have been generated but are currently awaiting expansion\n○ C) The final optimal sequence of actions leading to the goal\n○ D) The complete state space graph structure",
            "questionAr": "ماذا تمثل جبهة البحث (Frontier / Fringe) في خوارزميات شجرة البحث؟\n○ A) مجموعة الحالات التي تم استكشافها بالكامل واستبعادها نهائياً\n○ B) مجموعة كل العقد الورقية التي تم توليدها ولكنها تنتظر دورها في التوسيع\n○ C) المسار النهائي الأمثل من الأفعال المؤدية إلى الهدف\n○ D) هيكل رسم فضاء الحالات الكلي الثابت",
            "options": [
              "The set of states that have already been fully explored and discarded",
              "The collection of all leaf nodes that have been generated but are currently awaiting expansion",
              "The final optimal sequence of actions leading to the goal",
              "The complete state space graph structure"
            ],
            "optionsAr": [
              "مجموعة الحالات التي تم استكشافها بالكامل واستبعادها نهائياً",
              "مجموعة كل العقد الورقية التي تم توليدها ولكنها تنتظر دورها في التوسيع",
              "المسار النهائي الأمثل من الأفعال المؤدية إلى الهدف",
              "هيكل رسم فضاء الحالات الكلي الثابت"
            ],
            "solution": "Correct Answer: B) The collection of all leaf nodes that have been generated but are currently awaiting expansion.\nAcademic Justification: Lecture 3 Slide 20 & 22 define the Frontier (or Fringe) as the set of all search tree leaf nodes available for expansion at any given point.",
            "solutionAr": "الإجابة النموذجية: B) مجموعة كل العقد الورقية التي تم توليدها ولكنها تنتظر دورها في التوسيع.\nالتعليل الأكاديمي: السلايد 20 و 22 من المحاضرة الثالثة تعرف جبهة البحث (Frontier) بأنها مجمع العقد الورقية المولدة التي تنتظر التوسيع والاختبار."
          }
        ]
      },
      {
        "id": "ai-sheet-4",
        "courseId": "ai",
        "sheetNumber": 4,
        "title": "Lecture 4 Sheet",
        "titleAr": "شيت المحاضرة الرابعة",
        "brief": "Official faculty section quiz for Lecture 4 (Dr. Nesma Mahmoud) covering uninformed search roles, DFS LIFO queues, linear space complexity proofs, tree traversal orders (BFS, DFS, UCS), and binary state space traces.",
        "briefAr": "شيت المحاضرة الرابعة الرسمي لدكتورة نسمة محمود؛ يشمل دور خوارزميات البحث، مكدس DFS، إثبات التعقيد المكاني الخطي، مسائل تتبع ترتيب زيارة العقد في الأشجار لـ BFS و DFS و UCS، وشجرة فضاء الحالات الثنائية مع الحل النموذجي والخطوات.",
        "problemsCount": 5,
        "hasSolution": true,
        "problems": [
          {
            "id": "p-ai4-1",
            "problemNumber": 1,
            "question": "In an agent that searches, what is the primary role of the search algorithm?\n○ A) To actively modify and change the physical environment\n○ B) To construct sequences of actions in a tree structure to achieve a goal without changing the world\n○ C) To collect live sensor data from actuators\n○ D) To optimize hardware resources for the agent's body",
            "questionAr": "في الوكيل الذي يبحث، ما الدور الأساسي لخوارزمية البحث؟\n○ A) التعديل والتغيير النشط في البيئة الفيزيائية الحقيقية\n○ B) بناء تسلسلات من الأفعال في هيكل شجري لتحقيق الهدف دون تغيير العالم الواقعي أثناء البحث\n○ C) جمع قراءات الحساسات الحية من المشغلات\n○ D) تحسين موارد العتاد المادي لجسد الوكيل",
            "options": [
              "To actively modify and change the physical environment",
              "To construct sequences of actions in a tree structure to achieve a goal without changing the world",
              "To collect live sensor data from actuators",
              "To optimize hardware resources for the agent's body"
            ],
            "optionsAr": [
              "التعديل والتغيير النشط في البيئة الفيزيائية الحقيقية",
              "بناء تسلسلات من الأفعال في هيكل شجري لتحقيق الهدف دون تغيير العالم الواقعي أثناء البحث",
              "جمع قراءات الحساسات الحية من المشغلات",
              "تحسين موارد العتاد المادي لجسد الوكيل"
            ],
            "solution": "Correct Answer: B) To construct sequences of actions in a tree structure to achieve a goal without changing the world.\nAcademic Justification: Lecture 4 Slide 5-6 establishes that search is an offline mental deliberation process; the agent explores possible futures in its internal model without taking physical actions until the optimal plan is found.",
            "solutionAr": "الإجابة النموذجية: B) بناء تسلسلات من الأفعال في هيكل شجري لتحقيق الهدف دون تغيير العالم الواقعي أثناء البحث.\nالتعليل الأكاديمي: السلايد 5 و 6 وسؤال الشيت الرابع يؤكدان أن البحث عملية ذهنية مسبقة تجري داخل نموذج الوكيل دون تغيير الواقع حتى تنتهي الخطة."
          },
          {
            "id": "p-ai4-2",
            "problemNumber": 2,
            "question": "Which search strategy implements its frontier (FRINGE) using a LIFO (Last-In, First-Out) queue?\n○ A) Breadth-First Search (BFS)\n○ B) Depth-First Search (DFS)\n○ C) Uniform-Cost Search (UCS)\n○ D) Best-First Search",
            "questionAr": "أي استراتيجية بحث تدير جبهة البحث (FRINGE) الخاصة بها باستخدام طابور LIFO (Last-In, First-Out)؟\n○ A) البحث في العرض (BFS)\n○ B) البحث في العمق (DFS)\n○ C) البحث متساوي التكلفة (UCS)\n○ D) البحث الأفضل أولاً",
            "options": [
              "Breadth-First Search (BFS)",
              "Depth-First Search (DFS)",
              "Uniform-Cost Search (UCS)",
              "Best-First Search"
            ],
            "optionsAr": [
              "البحث في العرض (Breadth-First Search - BFS)",
              "البحث في العمق (Depth-First Search - DFS)",
              "البحث متساوي التكلفة (Uniform-Cost Search - UCS)",
              "البحث الأفضل أولاً"
            ],
            "solution": "Correct Answer: B) Depth-First Search (DFS).\nAcademic Justification: Lecture 4 Slide 8 & 29 dictate that DFS expands the deepest unexpanded node first, which corresponds directly to a LIFO queue (Stack).",
            "solutionAr": "الإجابة النموذجية: B) البحث في العمق (Depth-First Search - DFS).\nالتعليل الأكاديمي: السلايد 8 و 29 وسؤال الشيت الرابع توضح أن DFS تدير جبهة البحث بمكدس LIFO لتوسيع أعمق عقدة أولاً."
          },
          {
            "id": "p-ai4-3",
            "problemNumber": 3,
            "question": "Why does Depth-First Search (DFS) have a much better space complexity compared to Breadth-First Search for deep trees?",
            "questionAr": "لماذا تمتلك خوارزمية البحث في العمق (DFS) تعقيداً مكانياً (Space Complexity) أفضل بكثير مقارنة بالبحث في العرض (BFS) في الأشجار العميقة؟",
            "solution": "Academic Proof & Justification (Lecture 4 Slide 29 & 32):\n1. Linear Space in DFS: DFS requires only linear space O(b * m), where b is the branching factor and m is the maximum tree depth. This is because DFS only needs to store the single active path from the root down to the current node being expanded, along with any remaining unexpanded sibling nodes along that path. Once a subtree is fully explored, it is completely removed from memory.\n2. Exponential Space in BFS: In contrast, BFS must store the entire frontier of the search tree at depth d, resulting in exponential space complexity O(b^d). For realistic branching factors, this rapidly exhausts all physical RAM memory before computation completes.",
            "solutionAr": "البرهان والتعليل الأكاديمي (سلايد 29 و 32 من المحاضرة الرابعة):\n1. التعقيد المكاني الخطي لـ DFS: تستهلك DFS ذاكرة خطية O(b * m) فقط (حيث b معامل التفرع و m أقصى عمق). والسبب أن DFS تحتاج فقط لتخزين مسار نشط واحد ممتد من الجذر للعقدة الحالية مع إخوتها المباشرين غير الموسعين على طول المسار؛ وبمجرد انتهاء فحص الفرع يتم حذفه بالكامل من الذاكرة.\n2. التعقيد المكاني الأسي لـ BFS: على النقيض، تضطر BFS لتخزين جبهة البحث كاملة عند المستوى d، مما يسبب استهلاكاً أسياً O(b^d) يملأ رامات الحاسوب بالكامل في دقائق."
          },
          {
            "id": "p-ai4-4",
            "problemNumber": 4,
            "question": "Given the following state space (tree search), give the sequence of visited nodes when using BFS, DFS, and UCS (assume that node O is the goal state):\n- Root S (cost 0), children A (cost 2), B (cost 5), C (cost 4)\n- A has children D (step 7, path 9), E (step 3, path 5)\n- B has children F (step 4, path 9), G (step 6, path 11)\n- C has child H (step 8, path 12)\n- E has child O (step 5, path 10) [Goal]\n- G has child O (step 2, path 13) [Goal]",
            "questionAr": "في شجرة فضاء الحالات المعطاة في سلايد 36 بشيت المحاضرة 4، اكتب بالترتيب تسلسل العقد المزورة باستخدام BFS و DFS و UCS بافتراض أن العقدة O هي الهدف:\n- الجذر S وتفرعاته: A (تكلفة 2)، B (تكلفة 5)، C (تكلفة 4)\n- العقدة A تفرعاتها: D (خطوة 7، مسار 9)، E (خطوة 3، مسار 5)\n- العقدة B تفرعاتها: F (خطوة 4، مسار 9)، G (خطوة 6، مسار 11)\n- العقدة C تفرعها: H (خطوة 8، مسار 12)\n- العقدة E تفرعها: O (خطوة 5، مسار تراكمي 10) [الهدف]\n- العقدة G تفرعها: O (خطوة 2، مسار تراكمي 13) [الهدف]",
            "solution": "Detailed Step-by-Step Sequences (Lecture 4 Slide 26, 32-33 & Slide 36):\n\n1. BFS (Breadth-First Search - Level by Level from left to right):\n- Level 0: S\n- Level 1: A, B, C\n- Level 2: D, E, F, G, H\n- Level 3: O (reached from E, early goal test fires upon generation)\nVisited Order: S → A → B → C → D → E → F → G → H → O\n\n2. DFS (Depth-First Search - Deepest leftmost branch first):\n- Dives down leftmost branch: S → A → D\n- Backtracks to E, then visits child O:\nVisited Order: S → A → D → E → O\n(Finds goal O via S-A-E-O immediately in only 5 steps!).\n\n3. UCS (Uniform-Cost Search - Order of lowest cumulative path cost g(n)):\n- Initial Frontier: {S: 0}\n- Pop S (g=0) -> Expand: {A: 2, C: 4, B: 5}\n- Pop A (g=2) -> Expand: {C: 4, B: 5, E: 5, D: 9}\n- Pop C (g=4) -> Expand: {B: 5, E: 5, D: 9, H: 12}\n- Pop B (g=5) -> Expand: {E: 5, F: 9, D: 9, G: 11, H: 12}\n- Pop E (g=5) -> Expand: {F: 9, D: 9, O: 10, G: 11, H: 12}\n- Pop F (g=9) [or D: 9]\n- Pop D (g=9)\n- Pop O (g=10) -> Goal Test fires upon expansion! Goal Reached.\nVisited Order: S → A → C → B → E → F → D → O\nOptimal Path: S → A → E → O (Total Cost = 10).",
            "solutionAr": "خطوات الحل بالتفصيل الأكاديمي لشيت المحاضرة 4 (سلايد 36):\n\n1. خوارزمية BFS (البحث في العرض - مستوى بمستوى من اليسار لليمين):\n- المستوى 0: العقدة S\n- المستوى 1: العقد A ثم B ثم C\n- المستوى 2: العقد D ثم E ثم F ثم G ثم H\n- المستوى 3: العقدة الهدف O (من خلال العقدة E)\nترتيب الزيارة: S ← A ← B ← C ← D ← E ← F ← G ← H ← O\n\n2. خوارزمية DFS (البحث في العمق - أعمق فرع أيسر أولاً):\n- ينزل في الفرع الأيسر الأعمق: S ← A ← D\n- يعود للخلف للعقدة E، ثم يزور ابنها الهدف O مباشرة:\nترتيب الزيارة: S ← A ← D ← E ← O (وصل للهدف في 5 خطوات فقط!).\n\n3. خوارزمية UCS (البحث متساوي التكلفة - ترتيب تصاعدي بأقل تكلفة مسار g):\n- جبهة البداية: {S: 0}\n- سحب S (تكلفة 0) ← إضافة الأبناء: {A: 2, C: 4, B: 5}\n- سحب A (تكلفة 2) ← إضافة الأبناء: {C: 4, B: 5, E: 5, D: 9}\n- سحب C (تكلفة 4) ← إضافة الأبناء: {B: 5, E: 5, D: 9, H: 12}\n- سحب B (تكلفة 5) ← إضافة الأبناء: {E: 5, F: 9, D: 9, G: 11, H: 12}\n- سحب E (تكلفة 5) ← إضافة الأبناء: {F: 9, D: 9, O: 10, G: 11, H: 12}\n- سحب F (تكلفة 9) أو D (تكلفة 9)\n- سحب D (تكلفة 9)\n- سحب O (تكلفة 10) ← ينجح اختبار الهدف لحظة التوسيع!\nترتيب الزيارة: S ← A ← C ← B ← E ← F ← D ← O\nالمسار الأمثل: S ← A ← E ← O (التكلفة الكلية المثالية = 10)."
          },
          {
            "id": "p-ai4-5",
            "problemNumber": 5,
            "question": "Consider a state space where the start state is number 1 and the successor function for state n returns two states: 2n and 2n + 1.\n1. Draw the portion of the state space from 1 to 15.\n2. Suppose the goal state is 11. List the order in which nodes will be visited for BFS, DFS, and UCS.",
            "questionAr": "اعتبر فضاء حالات تبدأ فيه الحالة من الرقم 1، ودالة التوليد للحالة n تعيد حالتين هما: 2n و 2n + 1:\n1. ارسم جزء فضاء الحالات من 1 إلى 15.\n2. بافتراض أن الحالة الهدف هي 11، اكتب بالترتيب تسلسل العقد المزورة لكل من: BFS و DFS و UCS.",
            "solution": "Complete Solution (Lecture 4 Slide 36):\n1. Complete Binary Tree Structure (1 to 15):\n- Level 0: 1\n- Level 1: 2, 3 (from 1: 2*1=2, 2*1+1=3)\n- Level 2: 4, 5 (from 2) and 6, 7 (from 3)\n- Level 3: 8, 9 (from 4), 10, 11 (from 5), 12, 13 (from 6), 14, 15 (from 7)\n\n2. Traversal Orders to reach Goal 11:\n- BFS Order (Level by level from left to right):\n1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11\n(Total nodes expanded = 11 nodes).\n\n- DFS Order (Leftmost branch deepest first):\n1 → 2 → 4 → 8 (leaf, backtrack to 4) → 9 (leaf, backtrack to 2) → 5 → 10 (leaf, backtrack to 5) → 11 (Goal Reached!)\nVisited Order: 1 → 2 → 4 → 8 → 9 → 5 → 10 → 11\n(Total nodes expanded = 8 nodes; DFS reaches the goal faster by completely skipping the right subtree: 3, 6, 7, 12, 13, 14, 15!).\n\n- UCS Order:\nSince every transition has an identical step cost of 1, cumulative path costs equal node depth. Thus, UCS expands nodes in EXACTLY the same order as BFS:\n1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11.",
            "solutionAr": "الحل النموذجي الكامل لمسألة الشيت 4 (سلايد 36):\n1. رسم شجرة فضاء الحالات الثنائية (من 1 إلى 15):\n- المستوى 0: العقدة 1\n- المستوى 1: 2 (2x1) و 3 (2x1+1)\n- المستوى 2: 4 و 5 (أبناء 2)، 6 و 7 (أبناء 3)\n- المستوى 3: 8 و 9 (أبناء 4)، 10 و 11 (أبناء 5)، 12 و 13 (أبناء 6)، 14 و 15 (أبناء 7)\n\n2. ترتيب زيارة العقد للوصول للهدف 11:\n- ترتيب BFS (مستوى بمستوى من اليسار لليمين):\n1 ← 2 ← 3 ← 4 ← 5 ← 6 ← 7 ← 8 ← 9 ← 10 ← 11\n(تم فحص وتوسيع 11 عقدة).\n\n- ترتيب DFS (الغوص في الفرع الأيسر الأعمق أولاً):\n1 ← 2 ← 4 ← 8 (ورقة، يعود لـ 4) ← 9 (ورقة، يعود لـ 2) ← 5 ← 10 (ورقة، يعود لـ 5) ← 11 (تم الوصول للهدف!)\nترتيب الزيارة: 1 ← 2 ← 4 ← 8 ← 9 ← 5 ← 10 ← 11\n(تم فحص 8 عقد فقط؛ تفوقت DFS وتجاوزت الفرع الأيمن بالكامل: 3 و 6 و 7 و 12 و 13 و 14 و 15!).\n\n- ترتيب UCS (البحث متساوي التكلفة):\nبما أن تكلفة جميع الخطوات متساوية (تكلفة كل انتقال = 1)، فإن تكلفة المسار التراكمية تتطابق مع العمق؛ ولذلك يزور UCS العقد بنفس ترتيب BFS تماماً:\n1 ← 2 ← 3 ← 4 ← 5 ← 6 ← 7 ← 8 ← 9 ← 10 ← 11."
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

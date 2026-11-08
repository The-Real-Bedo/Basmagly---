import type { Course } from '../types';

// Preserved metadata, practice questions, concept checks and official sheets; full notes live in source-specific modules.
export const COURSES_DATA: Course[] = [
  {
    "id": "networks",
    "title": "CCNA",
    "titleAr": "شبكات الحاسب (CCNA)",
    "instructor": "د. سامية",
    "description": "Comprehensive coverage of network fundamentals, the OSI 7-layer and TCP/IP reference models, devices, topologies, transmission modes, and IPv4 addressing and subnetting.",
    "descriptionAr": "تغطية شاملة لأساسيات الشبكات، والنماذج المرجعية OSI (7 طبقات) و TCP/IP، والأجهزة، والطوبولوجيا، وأنماط الإرسال، وعنونة IPv4 وتقسيم الشبكات (Subnetting).",
    "term": 1,
    "icon": "Network",
    "isAvailable": true,
    "lectures": [
      {
        "id": "net-lec-1",
        "courseId": "networks",
        "lectureNumber": 1,
        "title": "Network Components, Classifications & Topologies",
        "titleAr": "مكونات الشبكات وتصنيفاتها والطوبولوجيا",
        "brief": "Overview of hardware and software components, end vs intermediary devices, network scales (PAN to WAN), P2P vs Client/Server, physical topologies, and transmission modes.",
        "briefAr": "المكونات المادية والبرمجية، الفرق بين الأجهزة الطرفية والأجهزة الوسيطة، تصنيف الشبكات بالمساحة (من PAN لـ WAN) وبنظام الإدارة (P2P مقابل Client/Server)، والطوبولوجيا الفيزيائية وأنماط الإرسال.",
        "durationMinutes": 35,
        "interactiveTools": [
          "network-devices",
          "topology-simulator",
          "transmission-lab"
        ],
        "cheatSheet": [],
        "terms": [],
        "sections": [],
        "questions": [
          {
            "id": "q-net1-1",
            "courseId": "networks",
            "lectureId": "net-lec-1",
            "type": "mcq",
            "question": "Which intermediary device routes packets between distinct local networks based on logical IP addresses?",
            "questionAr": "أنهي جهاز وسيط بيوجّه الحزم (Packets) بين شبكات محلية مختلفة على أساس عناوين الـ IP؟",
            "options": [
              "Hub",
              "Switch",
              "Router",
              "Repeater"
            ],
            "optionsAr": [
              "هب (Hub)",
              "سويتش (Switch)",
              "راوتر (Router)",
              "مكرر إشارة (Repeater)"
            ],
            "correctAnswer": 2,
            "explanation": "Routers operate at Layer 3 (Network Layer) and read destination IP addresses to forward packets across different subnets.",
            "explanationAr": "الـ Router شغال في الطبقة التالتة (Layer 3) ومسؤوليته يبص على عنوان الـ IP بتاع الوجهة عشان يوجّه الحزمة للشبكة التانية."
          },
          {
            "id": "q-net1-2",
            "courseId": "networks",
            "lectureId": "net-lec-1",
            "type": "mcq",
            "question": "What is the bit length and format of a hardware MAC address?",
            "questionAr": "عنوان الـ MAC الفيزيائي حجمه كام بت وبيتكتب إزاي؟",
            "options": [
              "32 bits in dotted decimal",
              "48 bits (6 octets) in hexadecimal",
              "64 bits binary",
              "128 bits hexadecimal"
            ],
            "optionsAr": [
              "32 بت عشري بالنقط (Dotted Decimal)",
              "48 بت (6 بايت) بالنظام الست عشري",
              "64 بت ثنائي",
              "128 بت ست عشري"
            ],
            "correctAnswer": 1,
            "explanation": "MAC addresses are 48 bits (6 bytes) long, represented in hexadecimal notation like AA:BB:CC:DD:EE:FF.",
            "explanationAr": "الـ MAC عبارة عن 48 بت (يعني 6 بايت) وبيتكتب بالنظام الست عشري (Hexadecimal) مقسوم على 6 خانات، زي AA:BB:CC:DD:EE:FF."
          },
          {
            "id": "q-net1-3",
            "courseId": "networks",
            "lectureId": "net-lec-1",
            "type": "true_false",
            "question": "Network throughput is always equal to or higher than theoretical bandwidth.",
            "questionAr": "معدل النقل الفعلي (Throughput) دايماً بيساوي أو أعلى من سعة الـ Bandwidth النظرية.",
            "correctAnswer": false,
            "explanation": "False: Throughput is the actual measured transfer rate; it can never exceed bandwidth and is usually lower due to media attenuation and congestion.",
            "explanationAr": "غلط! الـ Bandwidth هو أقصى رقم نظري، لكن الـ Throughput هو السرعة الفعلية اللي واصلالك، ومستحيل تعدّي الـ Bandwidth وغالباً بتكون أقل بسبب الزحمة والتشويش."
          },
          {
            "id": "q-net1-4",
            "courseId": "networks",
            "lectureId": "net-lec-1",
            "type": "essay",
            "question": "Compare Star Topology and Full Mesh Topology regarding cost, redundancy, and single point of failure.",
            "questionAr": "قارن بين طوبولوجيا النجمة (Star) والطوبولوجيا المتشابكة الكاملة (Full Mesh) من حيث التكلفة، والاحتياطية (Redundancy)، ونقطة الفشل الوحيدة (Single Point of Failure).",
            "correctAnswer": "star vs mesh redundancy and cost",
            "modelAnswer": "1. Star Topology:\n- Cost: Moderate, with simple installation.\n- Single point of failure: The central switch; if it fails, the whole network goes down, but the failure of an individual end device does not affect the others.\n- Redundancy: Low; the network is reliable only as long as the central device works.\n\n2. Full Mesh Topology:\n- Cost: Very high, since it needs n(n-1)/2 cables and n-1 ports on every node.\n- Single point of failure: None; if a link fails, traffic is rerouted through alternate paths.\n- Redundancy: The highest possible fault tolerance.",
            "modelAnswerAr": "1. طوبولوجيا النجمة (Star):\n- التكلفة: معقولة والتركيب سهل.\n- نقطة الفشل: الـ Switch المركزي؛ لو باظ الشبكة كلها تقع، لكن لو جهاز عادي اتفصل باقي الأجهزة بتشتغل عادي.\n- الاحتياطية (Redundancy): قليلة؛ الشبكة مضمونة طالما الجهاز المركزي سليم.\n\n2. الطوبولوجيا المتشابكة الكاملة (Full Mesh):\n- التكلفة: عالية جداً، لأنها محتاجة n(n-1)/2 كابل و n-1 منفذ في كل جهاز.\n- نقطة الفشل: مفيش نقطة فشل وحيدة؛ لو كابل اتقطع البيانات بتتحول فوراً لمسار بديل.\n- الاحتياطية (Redundancy): أعلى درجة تحمل للأعطال ممكنة في الشبكات.",
            "keyPoints": [
              "Single point of failure in Star (central device)",
              "Mesh alternate paths",
              "Mesh cabling cost"
            ]
          }
        ]
      },
      {
        "id": "net-lec-2",
        "courseId": "networks",
        "lectureNumber": 2,
        "title": "Reference Models (OSI & TCP/IP), IPv4 Addressing & Subnetting",
        "titleAr": "النماذج المرجعية (OSI و TCP/IP) وعنونة IPv4 وتقسيم الشبكات (Subnetting)",
        "brief": "In-depth study of the 7-layer OSI model vs the 4-layer TCP/IP suite, protocol encapsulation (PDU transitions), IPv4 address classes (A to E), subnet masks, bitwise AND network calculation, and usable-host counting.",
        "briefAr": "شرح طبقات OSI السبع ومقارنتها بنموذج TCP/IP (4 طبقات)، وتغليف البيانات وفكها (PDU)، وفئات عناوين IPv4 (من A لـ E)، وقناع الشبكة (Subnet Mask)، وحساب عنوان الشبكة بعملية AND، وحساب عدد الأجهزة المتاحة.",
        "durationMinutes": 40,
        "interactiveTools": [
          "packet-journey",
          "osi-visualizer",
          "subnet-calculator"
        ],
        "cheatSheet": [],
        "terms": [],
        "sections": [],
        "questions": [
          {
            "id": "q-net2-1",
            "courseId": "networks",
            "lectureId": "net-lec-2",
            "type": "mcq",
            "question": "What is the PDU name at the Transport Layer of the OSI model?",
            "questionAr": "وحدة البيانات (PDU) في طبقة النقل (Transport Layer) اسمها إيه؟",
            "options": [
              "Packet",
              "Segment",
              "Frame",
              "Bits"
            ],
            "optionsAr": [
              "باكيت (Packet)",
              "سيجمنت (Segment)",
              "فريم (Frame)",
              "بتات (Bits)"
            ],
            "correctAnswer": 1,
            "explanation": "The Transport Layer unit of transmission is called a Segment (TCP) or Datagram (UDP).",
            "explanationAr": "في طبقة النقل بنسميها Segment لو شغالين TCP أو Datagram لو شغالين UDP."
          },
          {
            "id": "q-net2-2",
            "courseId": "networks",
            "lectureId": "net-lec-2",
            "type": "mcq",
            "question": "Given IP 192.168.10.15 with subnet mask 255.255.255.0 (/24), what is the broadcast address?",
            "questionAr": "لو عندك جهاز IP بتاعه 192.168.10.15 والقناع 255.255.255.0 (/24)، عنوان الـ Broadcast للشبكة دي كام؟",
            "options": [
              "192.168.10.0",
              "192.168.10.1",
              "192.168.10.254",
              "192.168.10.255"
            ],
            "optionsAr": [
              "192.168.10.0",
              "192.168.10.1",
              "192.168.10.254",
              "192.168.10.255"
            ],
            "correctAnswer": 3,
            "explanation": "In a /24 network, the last octet is the host field. Setting all host bits to 1 yields .255, which is the directed broadcast address.",
            "explanationAr": "في قناع /24 الخانة الرابعة هي خانة الأجهزة؛ عشان تجيب عنوان الـ Broadcast خلّي بتات الأجهزة كلها 1 (يعني 255)، فيبقى العنوان 192.168.10.255."
          },
          {
            "id": "q-net2-3",
            "courseId": "networks",
            "lectureId": "net-lec-2",
            "type": "true_false",
            "question": "The Network Address (all host bits 0) can be assigned to an active host workstation.",
            "questionAr": "ينفع تدي عنوان الشبكة (اللي بتات الأجهزة فيه كلها أصفار) كـ IP لجهاز كمبيوتر فعلي في الشبكة.",
            "correctAnswer": false,
            "explanation": "False: The Network Address identifies the subnet itself, and the Broadcast Address is likewise reserved; neither can be assigned to an individual host.",
            "explanationAr": "غلط! عنوان الشبكة وعنوان الـ Broadcast محجوزين للشبكة ككل، ومينفعش أي جهاز ياخدهم."
          }
        ]
      }
    ],
    "sheets": [
      {
        "id": "net-sheet-1",
        "courseId": "networks",
        "sheetNumber": 1,
        "title": "Sheet 1: Network Fundamentals & Topologies",
        "titleAr": "شيت 1: أساسيات الشبكات والتخطيط الطوبولوجي (Topologies)",
        "brief": "Fundamental questions on LAN vs WAN, star/mesh topologies, and OSI model layers.",
        "briefAr": "تمارين عملية ومسائل مقارنة على شبكات LAN و WAN، طوبولوجيا النجمة والشبكة الكاملة (Star vs Mesh)، وطبقات نموذج OSI.",
        "problemsCount": 3,
        "hasSolution": true,
        "problems": [
          {
            "id": "p-net1-1",
            "problemNumber": 1,
            "question": "Calculate the total number of physical duplex links required to build a Fully-Connected Mesh topology containing N = 8 host nodes.",
            "questionAr": "احسب عدد الكابلات (Physical Links) المطلوبة لعمل شبكة كاملة التوصيل (Full Mesh Topology) بين 8 أجهزة.",
            "solution": "Formula: Links = N * (N - 1) / 2. For N = 8: Links = 8 * 7 / 2 = 28 full-duplex cables.",
            "solutionAr": "القانون: Links = N * (N - 1) / 2. تعويض مباشر لـ 8 أجهزة: 8 × 7 ÷ 2 = 28 كابل اتصال مباشر."
          },
          {
            "id": "p-net1-2",
            "problemNumber": 2,
            "question": "Compare Star topology with Bus topology regarding single-point of failure and ease of troubleshooting.",
            "questionAr": "قارن بين طوبولوجيا النجمة (Star) والخط الناقل (Bus) من حيث نقطة الانهيار الفردية (Single Point of Failure) وسهولة تحديد الأعطال.",
            "solution": "In Star topology, central switch/hub is a single point of failure; cable failure only affects one node. In Bus topology, cable break halts the whole network; Star is much easier to isolate and troubleshoot.",
            "solutionAr": "في شبكة Star: نقطة العطل الوحيدة هي السويتش المركزي (لو وقع الشبكة كلها تفصل، بس لو سلك جهاز اتقطع الباقي شغال). في شبكة Bus: لو الكابل الرئيسي اتقطع من أي مكان الشبكة كلها بتقع فوراً. بالتالي Star أسهل بكتير في تتبع الأعطال وعزلها."
          },
          {
            "id": "p-net1-3",
            "problemNumber": 3,
            "question": "Which OSI layers add headers and which layer adds both a header and a trailer to data packets?",
            "questionAr": "أنهي طبقات في نموذج OSI بتضيف Header (ترويسة)، وأنهي طبقة بالذات بتضيف Header و Trailer معاً؟",
            "solution": "Layers 6 down to 3 add specific headers (Presentation, Session, Transport, Network). The Data Link Layer (Layer 2) adds both a Frame Header and a Frame Trailer (FCS / CRC checksum).",
            "solutionAr": "الطبقات من 6 لحد 3 بتضيف Headers خاصة بيها. الطبقة الوحيدة اللي بتضيف ترويسة وخاتمة (Header & Trailer) هي طبقة ربط البيانات (Data Link Layer - Layer 2)، والـ Trailer بيكون فيه كود فحص الأخطاء (CRC/FCS)."
          }
        ]
      },
      {
        "id": "net-sheet-2",
        "courseId": "networks",
        "sheetNumber": 2,
        "title": "Sheet 2: IPv4 Subnetting & CIDR Calculation",
        "titleAr": "شيت 2: تقسيم الشبكات وحسابات الـ Subnetting و CIDR",
        "brief": "Practical problems calculating network ID, broadcast address, valid host range, and VLSM designs.",
        "briefAr": "مسائل حسابية على استخراج عنوان الشبكة، عنوان البث (Broadcast)، نطاق العناوين الصالحة للأجهزة، وقناع الشبكة بالبادئة /CIDR.",
        "problemsCount": 2,
        "hasSolution": true,
        "problems": [
          {
            "id": "p-net2-1",
            "problemNumber": 1,
            "question": "For IP 172.16.45.10 / 20: Determine (a) Subnet Mask in dotted decimal, (b) Network Address, and (c) Directed Broadcast Address.",
            "questionAr": "للعنوان 172.16.45.10 / 20: اوجد (أ) قناع الشبكة (Subnet Mask)، (ب) عنوان الشبكة (Network Address)، (ج) عنوان البث (Broadcast Address).",
            "solution": "(a) Mask: /20 = 255.255.240.0. (b) Block size = 256 - 240 = 16. In 3rd octet: 45 / 16 gives interval 32..47. Network Address = 172.16.32.0. (c) Broadcast Address = 172.16.47.255.",
            "solutionAr": "(أ) القناع: /20 يعني 255.255.240.0. (ب) حجم القفزة (Block size) = 256 - 240 = 16 في الخانة التالتة. مضاعفات الـ 16 الأقرب لـ 45 هي 32، يبقى عنوان الشبكة 172.16.32.0. (ج) عنوان الـ Broadcast هو آخر عنوان في النطاق = 172.16.47.255."
          },
          {
            "id": "p-net2-2",
            "problemNumber": 2,
            "question": "An organization needs 5 subnets, each requiring at least 25 usable host IP addresses. Which CIDR mask should be chosen starting from a Class C /24 network?",
            "questionAr": "مؤسسة محتاجة تقسم شبكة Class C (/24) لـ 5 شبكات فرعية على الأقل، وكل شبكة تستوعب 25 جهاز على الأقل. ما هو قناع الـ CIDR المناسب؟",
            "solution": "Need 5 subnets -> borrow 3 subnet bits (2^3 = 8 >= 5). Remaining host bits = 8 - 3 = 5. Usable hosts = 2^5 - 2 = 30 >= 25. Thus, new mask is /24 + 3 = /27 (255.255.255.224).",
            "solutionAr": "محتاجين 5 شبكات -> نستلف 3 بتات للشبكات (2³ = 8 شبكات، تكفي وزيادة). يتبقى للأجهزة 5 بتات (2⁵ - 2 = 30 جهاز صالح لكل شبكة). إذن القناع هو /24 + 3 = /27 (255.255.255.224)."
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
        "cheatSheet": [],
        "terms": [],
        "sections": [
          {
            "title": "1. AI Chatbots vs AI Agents & The Fundamental Architecture Formula",
            "titleAr": "1. شات بوت الذكاء الاصطناعي مقابل الوكيل والمعادلة المعمارية التأسيسية",
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
        "cheatSheet": [],
        "terms": [],
        "sections": [
          {
            "title": "1. Problem-Solving Agents & The Power of Abstraction",
            "titleAr": "1. وكلاء حل المشكلات والبحث الذهني وقوة التجريد (Abstraction)",
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
        "cheatSheet": [],
        "terms": [],
        "sections": [
          {
            "title": "1. Breadth-First Search (BFS) & The Early Goal Test Optimization",
            "titleAr": "1. خوارزمية البحث في العرض (BFS) وتحسين الفحص المبكر للهدف",
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
            "content": "",
            "contentAr": "",
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
            "question": "For the unweighted tree on AI-4 PDF page 36, list visited nodes for BFS and DFS from A, with O as the goal. Discuss UCS if all edges are assumed to have unit cost. Children are ordered left to right: A: B,C,D,E; B: F,G; C: H; D: I,J; G: K,L; I: M; J: N; L: O.",
            "questionAr": "للشجرة غير الموزونة في صفحة 36 من ملف AI-4، اكتب ترتيب زيارة العقد باستخدام BFS وDFS من A، والهدف O. ناقش UCS لو افترضنا إن تكلفة كل وصلة وحدة واحدة. ترتيب الأبناء من الشمال لليمين: A: B,C,D,E؛ B: F,G؛ C: H؛ D: I,J؛ G: K,L؛ I: M؛ J: N؛ L: O.",
            "solution": "Source: AI-4.pdf, page 36. The original root is A; the drawing has no edge costs.\nBFS (FIFO, test on removal): A → B → C → D → E → F → G → H → I → J → K → L → M → N → O.\nDFS (leftmost first, test on removal): A → B → F → G → K → L → O.\nGoal path: A → B → G → L → O, depth 4.\nUCS cannot be uniquely specified without costs. Under the explicitly stated unit-cost assumption, and FIFO tie-breaking, it visits nodes in the same order as BFS; goal-path cost = 4. Do not invent weighted edges or substitute the older S-root example. Different goal-test timing changes which nodes are counted as visited; these sequences count nodes removed from the frontier.",
            "solutionAr": "المصدر: AI-4.pdf، صفحة 36. جذر الرسم الأصلي A، والرسم مش كاتب تكاليف للوصولات.\nالـ BFS باستخدام FIFO واختبار الهدف عند السحب: A ← B ← C ← D ← E ← F ← G ← H ← I ← J ← K ← L ← M ← N ← O.\nالـ DFS مع اختيار أقصى الشمال أولًا واختبار الهدف عند السحب: A ← B ← F ← G ← K ← L ← O.\nمسار الهدف: A ← B ← G ← L ← O، وعمقه 4.\nما نقدرش نحدد UCS بشكل وحيد من غير تكاليف. لو افترضنا صراحةً إن كل وصلة تكلفتها وحدة واحدة، وكسرنا التعادل بترتيب FIFO، هيزور بنفس ترتيب BFS وتكلفة مسار الهدف 4. ما نخترعش أوزان أو نستبدل الرسم بمثال الجذر S القديم. توقيت اختبار الهدف بيغيّر عدّ العقد المزارة؛ الترتيب هنا بيحسب العقد عند سحبها من جبهة البحث."
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
    "id": "iot",
    "title": "Internet of Things (IoT)",
    "titleAr": "إنترنت الأشياء (IoT)",
    "instructor": "د. سارة شهاب",
    "description": "Foundations of connected cyber-physical systems, device vs sensor vs network, the 3-stage IoT data pipeline (Collect → Transmit → Analyze), OSI & TCP/IP stack models, TCP vs UDP protocols, and the 5-layer IoT architecture designed for constrained edge nodes.",
    "descriptionAr": "أسس النظم المادية السيبرانية (Cyber-Physical Systems)، الفروق الجوهرية بين الأجهزة والحساسات والشبكات، مراحل تدفق البيانات الثلاث، نماذج الطبقات OSI و TCP/IP، صراع بروتوكولات النقل TCP و UDP، والمعمارية الخماسية لطبقات إنترنت الأشياء المصممة للأجهزة المحدودة الموارد.",
    "term": 1,
    "icon": "Cpu",
    "isAvailable": true,
    "lectures": [
      {
        "id": "iot-lec-1",
        "courseId": "iot",
        "lectureNumber": 1,
        "title": "IoT Fundamentals, Architecture & Ecosystem",
        "titleAr": "أساسيات إنترنت الأشياء، المعمارية والمنظومة الشاملة",
        "brief": "Core definitions of Devices, Sensors, and Networks, the 3-stage data flow loop (Collect → Transmit → Analyze), 4 major industry case studies (Smart Agriculture, Healthcare, Smart Homes, Industry 4.0), and the 3 grand adoption challenges.",
        "briefAr": "المفاهيم التأسيسية الثلاثة (الجهاز، الحساس، والشبكة)، دورة تدفق البيانات الثلاثية (جمع ← نقل ← تحليل)، دراسات الحالة في الزراعة والصناعة والصحة والمنازل، وتحديات التبني الكبرى الثلاث وحلولها الهندسية.",
        "durationMinutes": 35,
        "interactiveTools": [
          "edge-vs-cloud",
          "iot-simulator"
        ],
        "cheatSheet": [],
        "terms": [],
        "sections": [
          {
            "title": "1. The Foundational Triple: Device, Sensor, and Network",
            "titleAr": "1. الثلاثي التأسيسي لإنترنت الأشياء: الجهاز، الحساس، والشبكة",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "According to Lecture 1 Slide 5, which triad forms the indispensable foundational components of any IoT ecosystem?",
              "questionAr": "وفقاً للسلايد 5 من المحاضرة، أي ثلاثي يمثل الأركان التأسيسية التي لا غنى عنها لأي منظومة إنترنت أشياء؟",
              "options": [
                "Devices, Sensors, Networks",
                "Sensors, Cloud Storage, SQL Databases",
                "Microcontrollers, Web Servers, Fiber Optics",
                "Operating Systems, Edge Gateways, Mobile Apps"
              ],
              "optionsAr": [
                "الأجهزة، الحساسات، والشبكات (Devices, Sensors, Networks)",
                "الحساسات، التخزين السحابي، وقواعد بيانات SQL",
                "المتحكمات الدقيقة، خوادم الويب، وكابلات الفايبر",
                "أنظمة التشغيل، بوابات الحافة، وتطبيقات الموبايل"
              ],
              "correctIndex": 0,
              "explanation": "Slide 5 explicitly establishes Devices, Sensors, and Networks as the core triad. Databases and cloud servers are destinations in the telemetry pipeline, not one of the 3 foundational pillars.",
              "explanationAr": "السلايد رقم 5 حددت نصاً إن الثلاثي الأساسي لمنظومة الـ IoT هو: الحساسات (Sensors)، الأجهزة (Devices)، والشبكات (Networks)؛ بينما السحابة وقواعد البيانات دي وسائط تخزين وتحليل."
            }
          },
          {
            "title": "2. The 3-Stage Telemetry Pipeline: Collect → Transmit → Analyze",
            "titleAr": "2. دورة تدفق البيانات الثلاثية: جمع ← نقل ← تحليل",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "What is the correct sequential order of the IoT telemetry data pipeline described in Slide 7 & 8?",
              "questionAr": "ما هو الترتيب الزمني الصحيح لدورة حياة بيانات إنترنت الأشياء الموضحة في السلايد 7 و 8؟",
              "options": [
                "Collect → Transmit → Analyze",
                "Transmit → Analyze → Collect",
                "Analyze → Collect → Transmit",
                "Collect → Analyze → Transmit"
              ],
              "optionsAr": [
                "التجميع (Collect) ← النقل (Transmit) ← التحليل (Analyze)",
                "النقل (Transmit) ← التحليل (Analyze) ← التجميع (Collect)",
                "التحليل (Analyze) ← التجميع (Collect) ← النقل (Transmit)",
                "التجميع (Collect) ← التحليل (Analyze) ← النقل (Transmit)"
              ],
              "correctIndex": 0,
              "explanation": "The fundamental pipeline follows a strict physical-to-digital chronological sequence: 1. Collect (via Sensors) → 2. Transmit (via Gateways/Protocols) → 3. Analyze (in the Cloud/Edge).",
              "explanationAr": "الدورة بتمشي بترتيب زمني صارم: أولاً الحساسات بتجمع الداتا الفيزيائية (Collect)، ثانياً الشبكة بتنقلها (Transmit)، ثالثاً المنصة السحابية بتحللها وتتخذ القرار (Analyze)."
            }
          },
          {
            "title": "3. Real-World Applications: Smart Agriculture, Smart Homes & Industry 4.0",
            "titleAr": "3. دراسات الحالة الواقعية: الزراعة الذكية، المنازل الذكية، والثورة الصناعية 4.0",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "In smart agriculture and precision farming, why are soil moisture sensors coupled with automated water valves?",
              "questionAr": "في تطبيقات الزراعة الذكية، لماذا يتم ربط حساسات رطوبة التربة بمحابس الري التلقائية؟",
              "options": [
                "To replace human intervention and optimize water consumption based on real-time soil telemetry",
                "To increase water wastage intentionally",
                "Because sensors cannot function without water pipes",
                "To format sensor data into CSV files only"
              ],
              "optionsAr": [
                "لتحقيق أتمتة كاملة وترشيد استهلاك المياه بدقة اعتماداً على القياسات اللحظية للتربة",
                "لزيادة استهلاك المياه عمداً",
                "لأن الحساسات لا تعمل إلا داخل مواسير المياه",
                "لتحويل قراءات الحساس إلى ملفات إكسيل فقط"
              ],
              "correctIndex": 0,
              "explanation": "Smart agriculture leverages closed-loop IoT control (Sense → Transmit → Analyze → Actuate) to conserve vital resources and maximize crop yields autonomously.",
              "explanationAr": "الفكرة من دمج الحساس مع المحبس هي تحويل النظام لحلقة مغلقة ذاتية التحكم (Closed-Loop) تسقي الزرع في التوقيت والكمية المظبوطة بالمللي وتوفر المية بدون تدخل بشري."
            }
          },
          {
            "title": "4. The 3 Grand Adoption Bottlenecks & Architectural Solutions",
            "titleAr": "4. تحديات التبني الكبرى وحلولها الهندسية المعتمدة",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "How does Edge Computing resolve the Scalability & Latency bottleneck in mission-critical IoT systems?",
              "questionAr": "كيف تنجح معالجة الحافة (Edge Computing) في حل عنق زجاجة بطء الاستجابة وقابلية التوسع في أنظمة الطوارئ؟",
              "options": [
                "By processing critical data locally right at the source, slashing response times from ~240ms to ~3ms",
                "By moving all servers to a different country",
                "By shutting down all sensors when traffic is high",
                "By forcing all packets to traverse overseas cloud centers"
              ],
              "optionsAr": [
                "بمعالجة البيانات الحرجة محلياً عند المصدر، مما يقلل زمن الاستجابة من ~240ms إلى ~3ms وينقذ الموقف",
                "بنقل الخوادم المركزية إلى دولة أخرى",
                "بإيقاف تشغيل الحساسات تلقائياً عند زيادة الضغط",
                "بإجبار جميع الحزم على السفر إلى خوادم السحابة في الخارج"
              ],
              "correctIndex": 0,
              "explanation": "Lecture 1 Slide 12 directly presents Edge Computing for localized processing to eliminate WAN latency and preserve network bandwidth during emergencies.",
              "explanationAr": "السلايد 12 وضحت إن معالجة البيانات محلياً على أجهزة الـ Edge بتنقذ الموقف في 3ms بس من غير ما تستنى النت يلف حولين العالم للـ Cloud، وبكده بنحل أزمة التأخير والباندويث."
            }
          }
        ],
        "questions": [
          {
            "id": "q-iot1-1",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "mcq",
            "question": "Which of the following is NOT one of the three foundational components of an IoT system?",
            "questionAr": "أياً من الآتي لا يعتبر من المكونات التأسيسية الثلاثة لمنظومة إنترنت الأشياء؟",
            "options": [
              "Sensors",
              "Devices",
              "Networks",
              "Central Databases"
            ],
            "optionsAr": [
              "الحساسات (Sensors)",
              "الأجهزة (Devices)",
              "الشبكات (Networks)",
              "قواعد البيانات المركزية (Central Databases)"
            ],
            "correctAnswer": 3,
            "explanation": "The three essential pillars defined in lecture slides are Devices, Sensors, and Networks. Databases and cloud servers are backend infrastructure, not the foundational trio.",
            "explanationAr": "المحاضرة حددت نصاً إن المنظومة مبنية على 3 أركان حتمية: الأجهزة والحساسات والشبكات. قواعد البيانات والسحابة مستقر خلفي لتخزين البيانات وليست من الأركان الثلاثة."
          },
          {
            "id": "q-iot1-2",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "mcq",
            "question": "What is the approved engineering solution for the \"Interoperability\" challenge in IoT adoption?",
            "questionAr": "ما هو الحل الهندسي المعتمد لعقبة \"التوافقية\" (Interoperability) بين أنظمة الـ IoT المختلفة؟",
            "options": [
              "Deploying local Edge Computing nodes",
              "Standardized communication protocols and open-source ecosystems",
              "Using heavier proprietary encryption ciphers",
              "Eliminating physical gateways altogether"
            ],
            "optionsAr": [
              "استخدام عقد معالجة الحافة (Edge Computing)",
              "البروتوكولات المعيارية الموحدة والمنظومات مفتوحة المصدر",
              "استخدام شفرات تشفير احتكارية أثقل",
              "إلغاء البوابات الفيزيائية تماماً"
            ],
            "correctAnswer": 1,
            "explanation": "Interoperability problems occur when devices from competing manufacturers cannot understand each other. Standardized open communication protocols bridge these silos.",
            "explanationAr": "التوافقية بتعني تفاهم أجهزة من شركات مختلفة؛ الحل العلمي هو اعتماد بروتوكولات اتصال معيارية ومفتوحة يفهمها الجميع زي MQTT و CoAP."
          },
          {
            "id": "q-iot1-3",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "mcq",
            "question": "What is the correct sequential order of the 3-stage IoT data flow loop?",
            "questionAr": "ما هو الترتيب الصحيح والتسلسلي لمراحل دورة تدفق بيانات الـ IoT الثلاث؟",
            "options": [
              "Cloud analyzes → Sensors collect → Connectivity transmits",
              "Connectivity transmits → Cloud analyzes → Sensors collect",
              "Sensors collect → Connectivity transmits → Cloud analyzes",
              "Sensors collect → Cloud analyzes → Connectivity transmits"
            ],
            "optionsAr": [
              "السحابة تحلل ← الحساسات تجمع ← الشبكة تنقل",
              "الشبكة تنقل ← السحابة تحلل ← الحساسات تجمع",
              "الحساسات تجمع ← الشبكة تنقل ← السحابة تحلل",
              "الحساسات تجمع ← السحابة تحلل ← الشبكة تنقل"
            ],
            "correctAnswer": 2,
            "explanation": "The pipeline begins with physical phenomena sampled by sensors (Collect), forwarded across networks (Transmit), and processed by analytical rule engines (Analyze).",
            "explanationAr": "الدورة بتبدأ بالتقاط الإشارة الفيزيائية وتحويلها لرقم (Collect)، نقلها عبر الشبكة (Transmit)، ثم معالجتها واستخراج القرار في السحابة (Analyze)."
          },
          {
            "id": "q-iot1-4",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "mcq",
            "question": "Which component is responsible for converting digital control decisions into physical actions in the real environment?",
            "questionAr": "أنهي مكون في منظومة الـ IoT مسؤول عن تحويل قرار التحكم الرقمي لفعل مادي حقيقي في البيئة؟",
            "options": [
              "Sensor",
              "Gateway Router",
              "Actuator",
              "Cloud Database"
            ],
            "optionsAr": [
              "الحساس (Sensor)",
              "راوتر البوابة (Gateway Router)",
              "المشغل (Actuator)",
              "قاعدة بيانات سحابية (Cloud Database)"
            ],
            "correctAnswer": 2,
            "explanation": "Actuators receive commands from computing nodes and execute physical work (e.g., closing valves, sounding alarms, activating motors).",
            "explanationAr": "المشغل (Actuator) هو اللي بينفذ الفعل الحركي، زي قفل محبس المية أو تشغيل صفارة الإنذار أو تشغيل الموتور."
          },
          {
            "id": "q-iot1-5",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "true_false",
            "question": "A sensor detects physical environmental phenomena and converts them into measurable electrical or digital signals.",
            "questionAr": "الحساس هو جهاز يكتشف الظواهر الفيزيائية المحيطة ويحولها لإشارات كهربائية أو رقمية قابلة للقياس.",
            "correctAnswer": true,
            "explanation": "True: By definition, sensors are input transducers converting thermal, optical, acoustic, or chemical input into electrical telemetry.",
            "explanationAr": "صح! الحساس هو محول طاقة للمدخلات، بياخد الظاهرة الفيزيائية زي الحرارة أو الضوء ويحولها لإشارة نقدر نقيسها ونتعامل معاها برمجياً."
          },
          {
            "id": "q-iot1-6",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "true_false",
            "question": "Every IoT communication cycle strictly requires real-time manual human intervention to transmit telemetry across nodes.",
            "questionAr": "كل دورة اتصال في منظومة إنترنت الأشياء تشترط حتماً تدخلاً بشرياً يدوياً لنقل القراءات بين الأجهزة.",
            "correctAnswer": false,
            "explanation": "False: A hallmark of IoT is Machine-to-Machine (M2M) autonomous communication occurring seamlessly without routine human intervention.",
            "explanationAr": "غلط! الميزة الأساسية لإنترنت الأشياء هي الاتصال الآلي بين الآلات (M2M) وتبادل البيانات والقرارات ذاتياً من غير ما يحتاج إنسان يتدخل في كل خطوة."
          },
          {
            "id": "q-iot1-7",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "true_false",
            "question": "Edge computing is designated as the primary engineering solution for the scalability and latency challenge in large IoT deployments.",
            "questionAr": "تعتبر معالجة الحافة (Edge Computing) الحل الهندسي الأول لمعالجة تحديات قابلية التوسع وبطء الاستجابة في أنظمة الـ IoT الضخمة.",
            "correctAnswer": true,
            "explanation": "True: Offloading raw sensor filtering and initial processing to edge gateways reduces cloud bandwidth usage and eliminates round-trip latency bottlenecks.",
            "explanationAr": "صح! معالجة القراءات عند الحافة (Edge) بتفلتر البيانات وتتخذ القرارات الحرجة محلياً، فتوفر استهلاك الإنترنت وتلغي بطء الاستجابة."
          },
          {
            "id": "q-iot1-8",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "true_false",
            "question": "According to course case studies, deploying IoT in precision agriculture has been shown to increase crop yields by over 20%.",
            "questionAr": "وفقاً لدراسات الحالة المعتمدة بالمقرر، أثبت تطبيق الـ IoT في الزراعة الدقيقة قدرته على زيادة إنتاجية المحاصيل بنسبة تتجاوز 20%.",
            "correctAnswer": true,
            "explanation": "True: Deploying automated soil moisture probes and drone surveillance provides optimal water/nutrient delivery, sustainably lifting yields by >20%.",
            "explanationAr": "صح! حساسات رطوبة التربة وطائرات الدرونز بتظبط مواعيد وكميات الري والتسميد بدقة بالغة، مما رفع إنتاجية المحصول بنسبة 20% وأكتر."
          },
          {
            "id": "q-iot1-9",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "essay",
            "question": "Explain the fundamental operational differences between an IoT Sensor and an IoT Actuator, providing two real-world examples for each.",
            "questionAr": "اشرح الفروق الجوهرية في التشغيل بين الحساس (Sensor) والمشغل (Actuator) في منظومة الـ IoT، مع ذكر مثالين واقعيين لكل منهما.",
            "correctAnswer": "Sensor is an input transducer; Actuator is an output transducer.",
            "modelAnswer": "A Sensor acts as the input organ of an IoT system: it detects physical phenomena (temperature, smoke, vibration) and translates them into readable electrical/digital telemetry. Examples: 1) Soil moisture probe, 2) Infrared motion sensor. In contrast, an Actuator serves as the output/execution organ: it accepts digital commands from computing nodes and performs physical mechanical action. Examples: 1) Solenoid water irrigation valve, 2) High-torque cooling fan motor.",
            "modelAnswerAr": "الحساس (Sensor) يمثل عضو الإحساس والمدخلات في المنظومة: يلتقط الظواهر الطبيعية الفيزيائية (كالرطوبة أو الحرارة أو الدخان) ويحولها إلى إشارة كهربية/رقمية تقرأها الحواسب. أمثلة: 1) مسبار قياس رطوبة التربة، 2) حساس الأشعة تحت الحمراء لكشف الحركة. أما المشغل (Actuator) فهو عضو الحركة والمخرجات: يستقبل الأمر الرقمي الصادر من خوارزمية التحكم ويحوله إلى فعل مادي حركي ملموس في الواقع. أمثلة: 1) محبس كهرومغناطيسي لفتح مياه الري، 2) محرك تشغيل مروحة التبريد.",
            "keyPoints": [
              "Sensor = input transducer detecting ambient physical phenomena",
              "Actuator = output transducer translating digital commands into mechanical actions",
              "Valid real-world examples for sensors and actuators provided"
            ]
          },
          {
            "id": "q-iot1-10",
            "courseId": "iot",
            "lectureId": "iot-lec-1",
            "type": "essay",
            "question": "Detail the three grand challenges in IoT adoption (Security, Interoperability, Scalability) and their respective architectural solutions.",
            "questionAr": "فصل تحديات التبني الثلاثة الكبرى في إنترنت الأشياء (الأمان، التوافقية، التوسع) مع ذكر الحل المعماري الهندسي لكل تحدٍ منها.",
            "correctAnswer": "Security, Interoperability, Scalability with their solutions.",
            "modelAnswer": "1) Security & Privacy: Unattended IoT devices are prone to spoofing, eavesdropping, and physical tampering. Architectural Solution: End-to-end cryptographic encryption (AES/TLS), hardware root of trust, and strict role-based access control (RBAC). 2) Interoperability: Competing manufacturers use isolated proprietary protocols preventing cross-device collaboration. Architectural Solution: Standardized communication protocols (MQTT, CoAP, Zigbee) and open ecosystem standards. 3) Scalability & Performance: Transmitting telemetry from billions of high-frequency sensors creates severe bandwidth congestion and cloud latency. Architectural Solution: Edge computing for local preprocessing and anomaly filtering combined with scalable cloud infrastructure.",
            "modelAnswerAr": "1) أمان البيانات والخصوصية (Security & Privacy): انتشار مليارات الأجهزة المستقلة يجعلها عرضة للاختراق والتنصت والتلاعب بالسوفت وير. الحل المعماري: التشفير القوي لنقل البيانات وتخزينها، المصادقة الآمنة، والتحكم الصارم في الصلاحيات. 2) التوافقية (Interoperability): اختلاف الشركات المصنعة ينتج عنه عتاد يتحدث لغات بروتوكولية مغلقة تمنع الاتصال المشترك. الحل المعماري: اعتماد بروتوكولات معيارية مفتوحة عالمياً (مثل MQTT و CoAP). 3) التوسع والأداء (Scalability & Performance): إرسال آلاف القراءات كل ثانية من مليارات الحساسات يسد خطوط الاتصال ويسبب تأخيراً زمنياً غير مقبول. الحل المعماري: حوسبة الحافة (Edge Computing) لمعالجة وفلترة البيانات محلياً قبل إرسال الملخصات فقط للسحابة.",
            "keyPoints": [
              "Security solved via encryption and access controls",
              "Interoperability solved via standardized protocols and open standards",
              "Scalability/performance solved via Edge Computing and localized filtering"
            ]
          }
        ]
      },
      {
        "id": "iot-lec-2",
        "courseId": "iot",
        "lectureNumber": 2,
        "title": "Networking Models, Protocols & The IoT Stack",
        "titleAr": "نماذج الشبكات، بروتوكولات الاتصال ومعمارية طبقات الـ IoT",
        "brief": "The network communication dilemma, why layered architectures prevent proprietary vendor chaos, OSI 7-layer reference vs TCP/IP 4-layer reality, TCP 3-way handshake vs UDP datagrams, and the complete 5-layer IoT stack designed for constrained hardware.",
        "briefAr": "معضلة الاتصال الشبكي، كيف تمنع النماذج الطبقية فوضى احتكار الشركات، مقارنة نموذج OSI المرجعي السباعي مع نموذج TCP/IP الواقعي، صراع بروتوكولات النقل TCP و UDP، والمعمارية الخماسية لطبقات إنترنت الأشياء المصممة للأجهزة محدودة الموارد.",
        "durationMinutes": 45,
        "interactiveTools": [
          "iot-stack-lab"
        ],
        "cheatSheet": [],
        "terms": [],
        "sections": [
          {
            "title": "1. The Network Communication Dilemma & The Modular Stack Solution",
            "titleAr": "1. معضلة الاتصال الشبكي والحل الهندسي بنموذج الطبقات",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "Why are open, standardized network protocols (like IP, TCP, and MQTT) universally required instead of proprietary protocols?",
              "questionAr": "لماذا تُعد البروتوكولات القياسية المفتوحة متطلباً عالمياً إلزامياً بدلاً من البروتوكولات المغلقة الخاصة بكل شركة؟",
              "options": [
                "To prevent multi-vendor communication chaos and guarantee seamless device interoperability",
                "To force everyone to buy from one single manufacturer",
                "Because open protocols eliminate the need for routers",
                "To make network cables unnecessary"
              ],
              "optionsAr": [
                "لمنع فوضى الاتصال وضمان تفاهم وتوافق الأجهزة المصنعة من شركات مختلفة (Interoperability)",
                "لإجبار الجميع على الشراء من مصنّع واحد فقط",
                "لأن البروتوكولات المفتوحة تلغي الحاجة لأجهزة الراوتر",
                "لجعل كابلات الشبكة غير ضرورية"
              ],
              "correctIndex": 0,
              "explanation": "Lecture 2 Slide 3 notes that without standardized protocol rules, devices from different companies speak mutually unintelligible languages, creating complete communication breakdown.",
              "explanationAr": "السلايد رقم 3 أكدت إن بدون المعايير القياسية الموحدة، كل جهاز هيكون ليه لغته الخاصة ومحدش هيفهم التاني، وبالتالي شبكة الإنترنت العالمية كانت هتفشل تماماً."
            }
          },
          {
            "title": "2. The OSI 7-Layer Reference Model vs The TCP/IP 4-Layer Reality",
            "titleAr": "2. نموذج OSI المرجعي السباعي مقابل نموذج TCP/IP الواقعي",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "Which TCP/IP layer handles packet routing and logical IP addressing across interconnected networks?",
              "questionAr": "أي طبقة في نموذج TCP/IP الرباعي تختص بتوجيه حزم البيانات والعنونة المنطقية (IP) عبر الشبكات المختلفة؟",
              "options": [
                "Internet Layer",
                "Transport Layer",
                "Network Access Layer",
                "Application Layer"
              ],
              "optionsAr": [
                "طبقة الإنترنت (Internet Layer)",
                "طبقة النقل (Transport Layer)",
                "طبقة الوصول للشبكة (Network Access Layer)",
                "طبقة التطبيقات (Application Layer)"
              ],
              "correctIndex": 0,
              "explanation": "In the TCP/IP model (Slide 9 & 10), the Internet layer (corresponding to OSI Network Layer 3) is solely responsible for logical IP addressing and packet routing.",
              "explanationAr": "السلايد 9 و 10 توضح صراحة أن طبقة الإنترنت (Internet Layer) هي المسؤولة عن الـ Routing وعناوين الـ IP المنطقية لتوصيل الحزم بين الشبكات."
            }
          },
          {
            "title": "3. Transport Protocols Head-to-Head: TCP 3-Way Handshake vs UDP Datagrams",
            "titleAr": "3. مقارنة بروتوكولات النقل: مصافحة TCP الموثوقة مقابل سرعة UDP",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "What is the decisive trade-off when selecting UDP over TCP for an IoT sensor deployment?",
              "questionAr": "ما هي المقايضة الأساسية (Trade-off) عند اختيار بروتوكول UDP بدلاً من TCP لنظام حساسات إنترنت الأشياء؟",
              "options": [
                "Sacrificing guaranteed delivery in exchange for ultra-low latency and zero connection-handshake overhead",
                "Gaining 100% reliable retransmission with higher packet size",
                "Encrypting data automatically with military-grade keys",
                "Preventing packets from being routed across the internet"
              ],
              "optionsAr": [
                "التضحية بضمان وصول الحزم مقابل سرعة استجابة فائقة وانعدام عبء المصافحة والـ Overhead",
                "الحصول على ضمان وصول بنسبة 100% مع زيادة حجم الباكت",
                "تشفير البيانات تلقائياً بمفاتيح عسكرية",
                "منع الحزم من المرور عبر شبكة الإنترنت"
              ],
              "correctIndex": 0,
              "explanation": "Lecture 2 Slide 12 contrasts TCP (reliable, connection-oriented with 3-way handshake) vs UDP (connectionless, lightweight, fast, no delivery guarantee).",
              "explanationAr": "السلايد 12 بتشرح المقايضة الشهيرة: الـ TCP بيضمن وصول كل باكت عبر المصافحة الثلاثية لكنه أثقل، بينما الـ UDP بيضحي بضمان الوصول عشان يبعت الداتا اللحظية بسرعة البرق وبأقل استهلاك طاقة."
            }
          },
          {
            "title": "4. The 5-Layer IoT Theoretical Stack: From Perception to Cloud Applications",
            "titleAr": "4. المعمارية الخماسية لطبقات إنترنت الأشياء: من الإدراك للتطبيقات",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "At which layer of the IoT Stack do physical transducers (temperature sensors, gas detectors, and servo motors) reside?",
              "questionAr": "في أي طبقة من معمارية طبقات إنترنت الأشياء الخماسية تتواجد المحولات الفيزيائية (حساسات الحرارة، كواشف الغاز، ومحركات السيرفو)؟",
              "options": [
                "Perception / Device Layer",
                "Network Layer",
                "Middleware / Processing Layer",
                "Application Layer"
              ],
              "optionsAr": [
                "طبقة الإدراك والاستشعار (Perception / Device Layer)",
                "طبقة الشبكة (Network Layer)",
                "طبقة البرمجيات الوسيطة والمعالجة (Middleware Layer)",
                "طبقة التطبيقات وواجهة المستخدم (Application Layer)"
              ],
              "correctIndex": 0,
              "explanation": "The Perception layer (Layer 1 of the IoT stack, Slide 14 & 15) represents the physical edge interface containing sensors, actuators, and hardware interfaces.",
              "explanationAr": "السلايد 14 و 15 تؤكدان أن طبقة الإدراك والاستشعار (Perception Layer) هي القاعدة التأسيسية التي تضم الحساسات والمحركات التي تتفاعل مع العالم الفيزيائي المحيط."
            }
          },
          {
            "title": "5. IoT Stack vs Traditional TCP/IP: The Constrained-Device Paradigm Shift",
            "titleAr": "5. معمارية الـ IoT في مواجهة TCP/IP التقليدي: نقلة الأجهزة محدودة الموارد",
            "content": "",
            "contentAr": "",
            "quickCheck": {
              "question": "Why do resource-constrained IoT nodes frequently adopt lightweight protocols like CoAP and MQTT instead of heavy HTTP/HTTPS?",
              "questionAr": "لماذا تعتمد أجهزة الـ IoT محدودة الموارد على بروتوكولات خفيفة مثل CoAP و MQTT بدلاً من بروتوكول HTTP التقليدي؟",
              "options": [
                "Because microcontrollers have strictly limited RAM, processing power, and battery life that cannot afford heavy HTTP headers",
                "Because HTTP was permanently banned for wireless devices",
                "Because CoAP only works with satellite communication",
                "Because MQTT cannot send numbers"
              ],
              "optionsAr": [
                "لأن المتحكمات الدقيقة لها ذاكرة وبطارية وقدرات معالجة محدودة جداً لا تتحمل حجم ترويسة (Headers) بروتوكول HTTP الضخمة",
                "لأن بروتوكول HTTP تم حظره نهائياً على الأجهزة اللاسلكية",
                "لأن بروتوكول CoAP يعمل حصرياً عبر الأقمار الصناعية",
                "لأن بروتوكول MQTT غير قادر على نقل الأرقام"
              ],
              "correctIndex": 0,
              "explanation": "Lecture 2 Slide 17 emphasizes that IoT edge devices are resource-constrained in battery and memory, requiring lightweight protocols with minimal header overhead.",
              "explanationAr": "السلايد 17 توضح أن عتاد الـ IoT في الغالب شغال ببطارية متناهية الصغر وذاكرة RAM بالكيلوبايت، فترويسة HTTP الكبيرة تفرغ البطارية في ساعات؛ لذلك صُممت بروتوكولات خفيفة زي MQTT لتعيش البطارية سنين."
            }
          }
        ],
        "questions": [
          {
            "id": "q-iot2-1",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "mcq",
            "question": "What fundamental communication problem would arise if vendors like Cisco, HP, and Microsoft created proprietary protocols without common standards?",
            "questionAr": "ما هي المشكلة الجوهرية التي تحدث إذا قامت شركات مثل Cisco و HP و Microsoft بتصميم بروتوكولات احتكارية دون معايير موحدة؟",
            "options": [
              "Data transmission would become too fast for modern cables",
              "Devices from different vendors could not understand each other, destroying interoperability",
              "The physical layer would no longer require cabling",
              "All devices would automatically become backwards-compatible"
            ],
            "optionsAr": [
              "سرعة الاتصال ستصبح أسرع من قدرة الكابلات الحديثة",
              "أجهزة الشركات المختلفة لن تستطيع التفاهم مع بعضها وتنعدم التوافقية تماماً",
              "الطبقة الفيزيائية لن تحتاج لأي كابلات توصيل",
              "جميع الأجهزة ستصبح متوافقة تلقائياً"
            ],
            "correctAnswer": 1,
            "explanation": "Without common industry standards, proprietary protocols create isolated vendor islands, resulting in chaos and total loss of cross-vendor interoperability.",
            "explanationAr": "غياب المعايير الموحدة بيخلي كل شركة تعمل لغة خاصة بيها، فتعجز أجهزة الشركات المختلفة عن فهم بعضها وتنعدم التوافقية (Interoperability)."
          },
          {
            "id": "q-iot2-2",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "mcq",
            "question": "How does the modular layered stack architecture support network evolution without breaking existing systems?",
            "questionAr": "كيف يدعم نموذج الطبقات المكدسة (Layered Stack) تطوير وتحديث الشبكات دون انهيار الأنظمة القائمة؟",
            "options": [
              "Every layer must duplicate the exact algorithmic work of all other layers",
              "A protocol in one layer can be upgraded or replaced without altering or breaking adjacent layers",
              "It forces every device on earth to run the exact same operating system",
              "It eliminates the need for addressing and routing"
            ],
            "optionsAr": [
              "كل طبقة تكرر نفس العمل الخوارزمي لباقي الطبقات",
              "يمكن ترقية أو استبدال بروتوكول في طبقة معينة دون الحاجة لتغيير أو كسر الطبقات المجاورة",
              "إلزام جميع أجهزة العالم بتشغيل نفس نظام التشغيل",
              "إلغاء الحاجة للعنونة والتوجيه"
            ],
            "correctAnswer": 1,
            "explanation": "Layering isolates responsibilities: e.g., the transition from IPv4 to IPv6 only modified the Network layer; Transport and Application layers remained completely unaffected.",
            "explanationAr": "نموذج الطبقات بيفصل المسؤوليات؛ تقدر تطور بروتوكول في طبقة معينة (زي الانتقال من IPv4 لـ IPv6 في طبقة الشبكة) وتفضل باقي الطبقات والتطبيقات شغالة طبيعي."
          },
          {
            "id": "q-iot2-3",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "mcq",
            "question": "How many distinct layers are defined in the conceptual OSI reference model vs the practical TCP/IP suite?",
            "questionAr": "كم عدد الطبقات المعتمدة في نموذج OSI المرجعي النظري مقارنة بنموذج TCP/IP العملي؟",
            "options": [
              "OSI has 7 layers, while TCP/IP has 4 layers",
              "OSI has 4 layers, while TCP/IP has 7 layers",
              "Both models define exactly 5 layers",
              "OSI has 6 layers, while TCP/IP has 3 layers"
            ],
            "optionsAr": [
              "نموذج OSI يتكون من 7 طبقات، بينما TCP/IP يتكون من 4 طبقات",
              "نموذج OSI يتكون من 4 طبقات، بينما TCP/IP يتكون من 7 طبقات",
              "كلا النموذجين يتكون من 5 طبقات بالتمام",
              "نموذج OSI يتكون من 6 طبقات، بينما TCP/IP يتكون من 3 طبقات"
            ],
            "correctAnswer": 0,
            "explanation": "The ISO OSI model is a 7-layer reference framework, whereas the practical operational TCP/IP internet model consists of 4 layers.",
            "explanationAr": "نموذج OSI السباعي (7 طبقات) إطار نظري، بينما معمارية TCP/IP للإنترنت العملي تتكون من 4 طبقات."
          },
          {
            "id": "q-iot2-4",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "mcq",
            "question": "Which statement accurately contrasts TCP with UDP at the Transport layer?",
            "questionAr": "أياً من العبارات الآتية تقارن بدقة بين بروتوكول TCP وبروتوكول UDP في طبقة النقل؟",
            "options": [
              "TCP is connectionless and fast; UDP establishes a 3-way handshake",
              "TCP is connection-oriented, guarantees delivery, and retransmits lost packets; UDP is connectionless and prioritizes speed without delivery guarantee",
              "Both TCP and UDP guarantee delivery, but UDP is encrypted by default",
              "TCP operates at the Network layer, while UDP operates at the Transport layer"
            ],
            "optionsAr": [
              "بروتوكول TCP غير متصل وسريع، بينما UDP ينشئ مصافحة ثلاثية",
              "بروتوكول TCP متصل وموثوق ويعيد إرسال المفقود، بينما UDP غير متصل وموجه للسرعة دون ضمان للوصول",
              "كلا البروتوكولين يضمن وصول الحزم، لكن UDP مشفر تلقائياً",
              "بروتوكول TCP يعمل في طبقة الشبكة، بينما UDP يعمل في طبقة النقل"
            ],
            "correctAnswer": 1,
            "explanation": "TCP guarantees reliability via connection-oriented 3-way handshaking and acknowledgments; UDP is connectionless, dropping error recovery for minimal latency.",
            "explanationAr": "بروتوكول TCP بيعمل اتصال مسبق (Handshake) ويضمن وصول كل بايت، بينما UDP بيبعت الحزم فوراً بدون انتظار مصافحة ولا يضمن الوصول للحصول على أعلى سرعة."
          },
          {
            "id": "q-iot2-5",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "mcq",
            "question": "Which layer in the 5-layer IoT architecture contains physical transducers, sensors, and actuators that interface with the ambient world?",
            "questionAr": "ما هي الطبقة في معمارية الـ IoT الخماسية التي تضم الحساسات والمشغلات الفيزيائية المتصلة بالعالم الواقعي؟",
            "options": [
              "Application Layer",
              "Middleware Layer",
              "Perception Layer",
              "Edge/Processing Layer"
            ],
            "optionsAr": [
              "طبقة التطبيقات (Application)",
              "طبقة الوسيط (Middleware)",
              "طبقة الإدراك الحسي (Perception)",
              "طبقة الحافة (Edge)"
            ],
            "correctAnswer": 2,
            "explanation": "The Perception layer (Layer 1) is the physical transducer foundation where sensors, cameras, and actuators observe and manipulate real-world conditions.",
            "explanationAr": "طبقة الإدراك الحسي (Perception Layer) هي الطبقة الأولى في معمارية إنترنت الأشياء وفيها الحساسات والمشغلات اللي بتتعامل مع الواقع المادي."
          },
          {
            "id": "q-iot2-6",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "true_false",
            "question": "Network standards ensure that devices from competing manufacturers can seamlessly interconnect and exchange data.",
            "questionAr": "تضمن المعايير الشبكية الموحدة قدرة الأجهزة المصنوعة من شركات متنافسة على الاتصال وتبادل البيانات بسلاسة.",
            "correctAnswer": true,
            "explanation": "True: Industry standards eliminate proprietary lock-in, enabling multi-vendor interoperability.",
            "explanationAr": "صح! المعايير القياسية الموحدة هي اللي بتسمح لأجهزة من مصنعين مختلفين إنها تتصل وتفهم بعض بدون أي مشاكل."
          },
          {
            "id": "q-iot2-7",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "true_false",
            "question": "In a modular layered stack model, every layer must manage and expose all its internal code algorithms to all other layers.",
            "questionAr": "في نموذج الطبقات المكدسة، يجب على كل طبقة إدارة وكشف كافة تفاصيل خوارزمياتها الداخلية لجميع الطبقات الأخرى.",
            "correctAnswer": false,
            "explanation": "False: A fundamental principle of layering is encapsulation/information hiding; layers interact strictly across standard APIs without knowing internal implementations.",
            "explanationAr": "غلط! مبدأ الطبقات قائم على إخفاء التفاصيل الداخلية (Encapsulation)؛ كل طبقة بتقدم خدمة للطبقة اللي فوقها عبر واجهة واضحة من غير ما تكشف تفاصيل كودها الداخلي."
          },
          {
            "id": "q-iot2-8",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "true_false",
            "question": "UDP is a connectionless transport protocol that guarantees every transmitted data packet will be successfully delivered.",
            "questionAr": "يعتبر UDP بروتوكول نقل غير متصل يضمن وصول كافة حزم البيانات المرسلة بنجاح ودون فقدان.",
            "correctAnswer": false,
            "explanation": "False: UDP is a best-effort datagram protocol that does NOT provide delivery guarantees or packet retransmissions.",
            "explanationAr": "غلط! بروتوكول UDP لا يقدم أي ضمان لوصول الحزم (No delivery guarantee)، ولا يعيد إرسال الحزم التالفة أو المفقودة."
          },
          {
            "id": "q-iot2-9",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "true_false",
            "question": "When the internet transitioned from IPv4 to IPv6, the Network layer changed while the Application and Transport layers continued to function normally.",
            "questionAr": "عندما انتقل الإنترنت من بروتوكول IPv4 إلى IPv6، تغيرت طبقة الشبكة فقط بينما ظلت طبقات التطبيقات والنقل تعمل بشكل طبيعي.",
            "correctAnswer": true,
            "explanation": "True: This is the prime real-world demonstration of modular layering: Network layer packet formats changed without rewriting applications or web browsers.",
            "explanationAr": "صح! دي أشهر تجربة واقعية لميزة الطبقات؛ تم تعديل بروتوكول وعنونة طبقة الشبكة بدون ما نضطر نعدل متصفحات الويب أو بروتوكولات النقل."
          },
          {
            "id": "q-iot2-10",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "true_false",
            "question": "The IoT architectural stack is concerned strictly with packet transmission protocols and excludes physical device hardware and cloud applications.",
            "questionAr": "تقتصر معمارية طبقات إنترنت الأشياء على بروتوكولات نقل الحزم فقط وتستبعد العتاد الفيزيائي للأجهزة وتطبيقات السحابة.",
            "correctAnswer": false,
            "explanation": "False: Unlike traditional network stacks, the IoT stack encompasses the entire cyber-physical lifecycle, explicitly including device hardware, firmware, middleware platforms, and user applications.",
            "explanationAr": "غلط! معمارية الـ IoT بتشمل المنظومة كاملة من عتاد الأجهزة والحساسات إلى طبقات الحافة ومنصات السحابة وتطبيقات المستخدم."
          },
          {
            "id": "q-iot2-11",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "essay",
            "question": "Explain the three steps of the TCP 3-Way Handshake, and contrast TCP reliability with UDP best-effort transmission.",
            "questionAr": "اشرح الخطوات الثلاث لعملية المصافحة الثلاثية (3-Way Handshake) في بروتوكول TCP، وقارن موثوقية TCP مع أسلوب الإرسال الأفضل الممكن (Best-effort) في UDP.",
            "correctAnswer": "SYN, SYN-ACK, ACK steps explained and compared to UDP.",
            "modelAnswer": "The TCP 3-Way Handshake establishes a synchronized, reliable connection before data transfer begins: 1) Step 1 (SYN): The initiating client sends a SYN (Synchronize) packet containing its initial sequence number (ISN). 2) Step 2 (SYN-ACK): The server receives the SYN and responds with a SYN-ACK packet, acknowledging client ISN (ACK = ISN + 1) and providing its own sequence number. 3) Step 3 (ACK): The client sends an ACK packet confirming the server sequence number. Once complete, full-duplex communication starts. In contrast, UDP sends raw datagrams with zero connection setup (no handshake), no sequence numbering, and no retransmissions, making UDP much faster for real-time video/gaming, but vulnerable to packet loss, whereas TCP guarantees byte-exact delivery for web and file transfers.",
            "modelAnswerAr": "تتم المصافحة الثلاثية في TCP عبر 3 خطوات متتابعة لتأسيس الاتصال ومزامنة أرقام الترتيب: 1) الخطوة الأولى (SYN): يرسل العميل حزمة مزامنة (SYN) تتضمن رقم التسلسل الابتدائي الخاص به (ISN). 2) الخطوة الثانية (SYN-ACK): يستقبل الخادم الطلب ويرد بحزمة تأكيد ومزامنة معاً، يؤكد فيها رقم العميل (ACK = ISN + 1) ويرسل رقم تسلسله هو. 3) الخطوة الثالثة (ACK): يرسل العميل حزمة تأكيد نهائية (ACK). بعدها يبدأ نقل البيانات الفعلي في الاتجاهين. بالمقابل، يرسل بروتوكول UDP حزم البيانات فوراً بدون أي مصافحة أو حجز جلسة، وبدون ترقيم للحزم أو إعادة إرسال لما يفقد منها؛ مما يجعل UDP فائق السرعة ومناسباً للألعاب والبث المباشر، بينما يضمن TCP سلامة كل بايت للتصفح والملفات والإيميلات.",
            "keyPoints": [
              "Step 1 SYN, Step 2 SYN-ACK, Step 3 ACK described correctly",
              "TCP provides sequence numbers, acknowledgments, and retransmissions",
              "UDP provides connectionless best-effort delivery without handshaking"
            ]
          },
          {
            "id": "q-iot2-12",
            "courseId": "iot",
            "lectureId": "iot-lec-2",
            "type": "essay",
            "question": "Describe the 5 layers of the theoretical IoT architecture, detailing the function and typical technology examples for each layer.",
            "questionAr": "صف الطبقات الخمس لمعمارية إنترنت الأشياء النظرية، موضحاً وظيفة كل طبقة وأمثلة للتقنيات المستخدمة فيها.",
            "correctAnswer": "Perception, Network, Edge, Middleware, Application layers described.",
            "modelAnswer": "1) Perception Layer (Hardware): Senses and interacts with the physical environment via sensors, cameras, and actuators (e.g., DHT22 temperature sensor, solenoid valves, ESP32 GPIO). 2) Network Layer (Communication): Transports digitized telemetry over energy-efficient protocols tailored for constrained hardware (e.g., LoRaWAN, Zigbee, BLE, NB-IoT, Wi-Fi). 3) Edge / Processing Layer: Local intermediate nodes (Gateways, Raspberry Pi) that filter noise, compress streams, and execute instant safety shutdowns with zero cloud latency. 4) Middleware / Platform Layer: Cloud brokers and platforms that translate diverse device protocols and manage data ingestion (e.g., MQTT broker like Mosquitto, AWS IoT Core, Azure IoT Hub). 5) Application Layer: End-user monitoring and control software (e.g., mobile apps, web dashboards, operational SCADA alerts).",
            "modelAnswerAr": "1) طبقة الإدراك الحسي (Perception Layer): الطبقة الفيزيائية التي تضم الحساسات والمشغلات لقياس الطبيعة والتأثير فيها (مثل حساسات الحرارة DHT22 ومحابس المياه والري). 2) طبقة الشبكة (Network Layer): بروتوكولات الاتصال اللاسلكية الموفرة للطاقة لنقل الحزم (مثل LoRaWAN و Zigbee و BLE و Wi-Fi). 3) طبقة الحافة (Edge / Processing Layer): بوابات وسيطة (Gateways و Raspberry Pi) تقوم بفلترة القراءات محلياً وتشغيل أوامر الطوارئ اللحظية دون انتظار السحابة. 4) طبقة الوسيط والمنصة (Middleware / Platform Layer): خوادم إدارة الأجهزة والوساطة التي تستقبل البيانات وتترجم البروتوكولات (مثل وسيط MQTT ومنصات AWS IoT و Azure). 5) طبقة التطبيقات (Application Layer): واجهات الاستخدام النهائية التي يتعامل معها المستخدم (مثل تطبيقات الهواتف الذكية ولوحات التحكم والداشبورد).",
            "keyPoints": [
              "All 5 layers identified in correct order from bottom to top",
              "Functions of Perception, Network, Edge, Middleware, and Application explained",
              "Concrete technology examples provided for each layer"
            ]
          }
        ]
      }
    ],
    "sheets": [
      {
        "id": "iot-sheet-1",
        "courseId": "iot",
        "sheetNumber": 1,
        "title": "Lecture 1 Sheet",
        "titleAr": "شيت المحاضرة الأولى",
        "brief": "Lecture 1 practice exercises and problem sets.",
        "briefAr": "تمارين ومسائل المحاضرة الأولى.",
        "problemsCount": 8,
        "hasSolution": true,
        "problems": [
          {
            "id": "p-iot1-1",
            "problemNumber": 1,
            "partTitle": "Part 1: True / False",
            "partTitleAr": "الجزء الأول: صح أو خطأ",
            "type": "true_false",
            "question": "A sensor is a device that detects physical input from the environment and converts physical phenomena into measurable signals.",
            "questionAr": "الحساس هو جهاز يكتشف المدخلات الفيزيائية من البيئة المحيطة ويحول الظواهر الفيزيائية إلى إشارات قابلة للقياس.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Lecture 1, Slide 3 defines a sensor verbatim as: \"A sensor is a device that detects and responds to physical input from the environment, converting physical phenomena into measurable signals.\" Examples include thermometers, smoke detectors, and camera sensors.",
            "solutionAr": "الإجابة: صح (TRUE). السلايد رقم 3 من المحاضرة الأولى تعرّف الحساس نصاً بأنه: جهاز يكتشف ويستجيب للمدخلات الفيزيائية من البيئة المحيطة ويحول الظواهر الطبيعية لإشارات قابلة للقياس (زي قياس الحرارة والدخان والحركة)."
          },
          {
            "id": "p-iot1-2",
            "problemNumber": 2,
            "partTitle": "Part 1: True / False",
            "partTitleAr": "الجزء الأول: صح أو خطأ",
            "type": "true_false",
            "question": "According to the lecture, every IoT system is built upon four essential components.",
            "questionAr": "وفقاً للمحاضرة، كل نظام إنترنت أشياء مبني على أربعة مكونات أساسية.",
            "correctAnswer": "False",
            "solution": "Answer: FALSE. Lecture 1, Slide 5 explicitly states: \"Every Internet of Things (IoT) system is fundamentally built upon THREE essential components: Devices, Sensors, and Networks.\" Databases/Cloud platforms are backend storage/analytics destinations, not one of the foundational three.",
            "solutionAr": "الإجابة: غلط (FALSE). السلايد رقم 5 توضح نصاً أن أي نظام إنترنت أشياء مبني أساساً على ثلاثة مكونات أساسية فقط (Devices, Sensors, Networks) مش أربعة؛ وقواعد البيانات والسحابة ليست من هذا الثلاثي التأسيسي."
          },
          {
            "id": "p-iot1-3",
            "problemNumber": 3,
            "partTitle": "Part 1: True / False",
            "partTitleAr": "الجزء الأول: صح أو خطأ",
            "type": "true_false",
            "question": "IoT devices connect and exchange data over the internet, and this always requires human intervention.",
            "questionAr": "تتصل أجهزة إنترنت الأشياء وتتبادل البيانات عبر الإنترنت، وهذا يتطلب دائماً تدخلاً بشرياً.",
            "correctAnswer": "False",
            "solution": "Answer: FALSE. Lecture 1, Slide 6 states that IoT devices \"connect and exchange data over the internet, often WITHOUT human intervention.\" Machine-to-Machine (M2M) autonomous operation is the core defining characteristic of IoT.",
            "solutionAr": "الإجابة: غلط (FALSE). السلايد رقم 6 تؤكد أن أجهزة الـ IoT تتصل وتتبادل البيانات عبر الإنترنت دون اشتراط تدخل بشري (often without human intervention)؛ والتشغيل الآلي الذاتي (M2M) هو جوهر إنترنت الأشياء."
          },
          {
            "id": "p-iot1-4",
            "problemNumber": 4,
            "partTitle": "Part 1: True / False",
            "partTitleAr": "الجزء الأول: صح أو خطأ",
            "type": "true_false",
            "question": "Edge computing is presented as a solution to the scalability and performance challenge in IoT adoption.",
            "questionAr": "تم تقديم معالجة الحافة (Edge Computing) كحل لتحدي قابلية التوسع والأداء في تبني إنترنت الأشياء.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Lecture 1, Slide 12 addresses the \"Scalability & Performance\" challenge and directly presents the architectural solution: \"Solution: Edge computing for localized processing and cloud-based scalable architectures.\"",
            "solutionAr": "الإجابة: صح (TRUE). السلايد رقم 12 توضح نصاً تحت بند تحدي التوسع والأداء (Scalability & Performance) أن الحل الهندسي المعتمد هو: معالجة الحافة للمعالجة المحلية (Edge computing for localized processing) مع بنية سحابية مرنة."
          },
          {
            "id": "p-iot1-5",
            "problemNumber": 5,
            "partTitle": "Part 2: Multiple Choice",
            "partTitleAr": "الجزء الثاني: اختيار من متعدد",
            "type": "mcq",
            "question": "Which of the following is NOT one of the three main components of an IoT system?",
            "questionAr": "أي مما يلي لا يعتبر واحداً من المكونات الثلاثة الرئيسية لنظام إنترنت الأشياء؟",
            "options": [
              "Sensors",
              "Devices",
              "Networks",
              "Databases"
            ],
            "optionsAr": [
              "الحساسات (Sensors)",
              "الأجهزة (Devices)",
              "الشبكات (Networks)",
              "قواعد البيانات (Databases)"
            ],
            "correctAnswer": 3,
            "solution": "Answer: D) Databases. Slide 5 defines the primary triad as Devices, Sensors, and Networks. Databases store data at the cloud tier, but are not one of the 3 primary architectural pillars.",
            "solutionAr": "الإجابة النموذجية: د) قواعد البيانات (Databases). السلايد رقم 5 حددت نصاً الثلاثي الأساسي لمنظومة الـ IoT: (Sensors, Devices, Networks)؛ بينما قواعد البيانات مخازن في السحابة وليست من الأركان التأسيسية الثلاثة."
          },
          {
            "id": "p-iot1-6",
            "problemNumber": 6,
            "partTitle": "Part 2: Multiple Choice",
            "partTitleAr": "الجزء الثاني: اختيار من متعدد",
            "type": "mcq",
            "question": "What is the proposed solution to the \"Interoperability\" challenge?",
            "questionAr": "ما هو الحل المقترح لتحدي \"التوافقية والتشغيل البيني\" (Interoperability)؟",
            "options": [
              "Edge computing for localized processing",
              "Standardized communication protocols and open-source ecosystems",
              "Robust encryption and strict access controls",
              "Cloud-based scalable architectures"
            ],
            "optionsAr": [
              "الحوسبة الطرفية للمعالجة المحلية",
              "بروتوكولات اتصال قياسية موحدة ومنظومات مفتوحة المصدر",
              "تشفير قوي وضوابط وصول صارمة",
              "بنى تحتية سحابية قابلة للتوسع"
            ],
            "correctAnswer": 1,
            "solution": "Answer: B) Standardized communication protocols and open-source ecosystems. Slide 12 explicitly links Interoperability (communication between diverse vendor platforms) to standardized protocols and open standards.",
            "solutionAr": "الإجابة النموذجية: ب) بروتوكولات الاتصال المعيارية والمنظومات مفتوحة المصدر (Standardized communication protocols). السلايد رقم 12 تؤكد أن تفاهم أجهزة من مصنعين مختلفين يتطلب معايير اتصال موحدة ومفتوحة."
          },
          {
            "id": "p-iot1-7",
            "problemNumber": 7,
            "partTitle": "Part 2: Multiple Choice",
            "partTitleAr": "الجزء الثاني: اختيار من متعدد",
            "type": "mcq",
            "question": "What is the correct sequence of how IoT works?",
            "questionAr": "ما هو التسلسل الصحيح لآلية عمل إنترنت الأشياء؟",
            "options": [
              "Cloud analyzes → Sensors collect → Connectivity transmits",
              "Connectivity transmits → Cloud analyzes → Sensors collect",
              "Sensors collect → Connectivity transmits → Cloud analyzes",
              "Cloud analyzes → Connectivity transmits → Sensors collect"
            ],
            "optionsAr": [
              "السحابة تحلل ← الحساسات تجمع ← الاتصال ينقل",
              "الاتصال ينقل ← السحابة تحلل ← الحساسات تجمع",
              "الحساسات تجمع ← الاتصال ينقل ← السحابة تحلل",
              "السحابة تحلل ← الاتصال ينقل ← الحساسات تجمع"
            ],
            "correctAnswer": 2,
            "solution": "Answer: C) Sensors collect → Connectivity transmits → Cloud analyzes. Slide 8 diagrams this exact chronological horizontal flow pipeline.",
            "solutionAr": "الإجابة النموذجية: ج) الحساسات تجمع ← الاتصال ينقل ← السحابة تحلل (Sensors collect → Connectivity transmits → Cloud analyzes). السلايد رقم 8 تشرح هذا التدفق الثلاثي المتسلسل بالتفصيل."
          },
          {
            "id": "p-iot1-8",
            "problemNumber": 8,
            "partTitle": "Part 2: Multiple Choice",
            "partTitleAr": "الجزء الثاني: اختيار من متعدد",
            "type": "mcq",
            "question": "Which of the following best defines a \"network\"?",
            "questionAr": "أي مما يلي يمثل أفضل تعريف لـ \"الشبكة\" (Network)؟",
            "options": [
              "Any piece of hardware designed to perform a specific task",
              "A device that converts physical phenomena into measurable signals",
              "A collection of interconnected devices that can communicate and share resources",
              "A cloud platform that analyzes IoT data"
            ],
            "optionsAr": [
              "أي قطعة عتاد مصممة لأداء مهمة محددة",
              "جهاز يحول الظواهر الفيزيائية إلى إشارات قابلة للقياس",
              "مجموعة من الأجهزة المترابطة التي يمكنها التواصل ومشاركة الموارد",
              "منصة سحابية لتحليل بيانات إنترنت الأشياء"
            ],
            "correctAnswer": 2,
            "solution": "Answer: C) A collection of interconnected devices that can communicate and share resources. Slide 4 defines a network as: \"A collection of interconnected devices that can communicate and share resources with each other.\"",
            "solutionAr": "الإجابة النموذجية: ج) مجموعة من الأجهزة المترابطة القادرة على الاتصال ومشاركة الموارد مع بعضها. السلايد رقم 4 تعرف الشبكة نصاً بهذا التعريف الدقيق."
          }
        ]
      },
      {
        "id": "iot-sheet-2",
        "courseId": "iot",
        "sheetNumber": 2,
        "title": "Lecture 2 Sheet",
        "titleAr": "شيت المحاضرة الثانية",
        "brief": "Lecture 2 practice exercises and problem sets.",
        "briefAr": "تمارين ومسائل المحاضرة الثانية.",
        "problemsCount": 20,
        "hasSolution": true,
        "problems": [
          {
            "id": "p-iot2-1",
            "problemNumber": 1,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "What is one major challenge when sending data across a network?",
            "questionAr": "ما هو أحد التحديات الرئيسية عند إرسال البيانات عبر الشبكة؟",
            "options": [
              "Making every device use the same screen size",
              "Breaking messages into manageable packets",
              "Removing all communication protocols",
              "Preventing devices from using addresses"
            ],
            "optionsAr": [
              "جعل كل جهاز يستخدم نفس حجم الشاشة",
              "تقطيع الرسائل الكبيرة إلى حزم صغيرة يمكن إدارتها وتوجيهها (Packetization)",
              "إلغاء جميع بروتوكولات الاتصال",
              "منع الأجهزة من استخدام العناوين"
            ],
            "correctAnswer": 1,
            "solution": "Answer: B. Breaking messages into manageable packets. Lecture 2, Slide 2 lists the core communication challenges: packetization (breaking messages into small packets), routing packets across continents, data integrity, and translating electrical signals back to text.",
            "solutionAr": "الإجابة النموذجية: ب. تقطيع الرسائل إلى حزم صغيرة يمكن إدارتها (Breaking messages into manageable packets). السلايد 2 توضح تحديات الاتصال ومن أبرزها تقطيع البيانات لحزم ونقلها عبر القارات والتأكد من سلامتها."
          },
          {
            "id": "p-iot2-2",
            "problemNumber": 2,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "What can happen when companies create network protocols independently without common standards?",
            "questionAr": "ماذا يمكن أن يحدث عندما تنشئ الشركات بروتوكولات شبكات خاصة بها بشكل مستقل دون معايير مشتركة؟",
            "options": [
              "All devices automatically become compatible",
              "Communication always becomes faster",
              "Devices may not understand one another",
              "The network no longer needs layers"
            ],
            "optionsAr": [
              "تصبح جميع الأجهزة متوافقة تلقائياً",
              "يصبح الاتصال أسرع دائماً",
              "قد تعجز الأجهزة عن فهم بعضها البعض (انعدام التوافقية)",
              "لا تعود الشبكة بحاجة إلى طبقات"
            ],
            "correctAnswer": 2,
            "solution": "Answer: C. Devices may not understand one another. Lecture 2, Slide 3 (\"Without Standards = Chaos\") highlights that proprietary protocols lead to devices being unable to understand each other, making communication impossible.",
            "solutionAr": "الإجابة النموذجية: ج. قد لا تفهم الأجهزة بعضها البعض (Devices may not understand one another). السلايد 3 تؤكد أن غياب المعايير الموحدة ينتج عنه فوضى وعجز أجهزة الشركات المختلفة عن التفاهم."
          },
          {
            "id": "p-iot2-3",
            "problemNumber": 3,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "What is the main idea behind a layered stack model?",
            "questionAr": "ما هي الفكرة الأساسية وراء نموذج الطبقات المكدسة (Stack Model)؟",
            "options": [
              "One layer performs every communication task",
              "Each layer has a clear function and cooperates with other layers",
              "Layers must all use the same protocol",
              "It removes the need for standards"
            ],
            "optionsAr": [
              "طبقة واحدة تقوم بجميع مهام الاتصال",
              "كل طبقة لها وظيفة محددة وتتعاون مع باقي الطبقات عبر واجهات واضحة",
              "يجب أن تستخدم جميع الطبقات نفس البروتوكول",
              "يلغي الحاجة إلى المعايير القياسية"
            ],
            "correctAnswer": 1,
            "solution": "Answer: B. Each layer has a clear function and cooperates with other layers. Slide 4 explains that the stack model creates a unified system where each layer specializes in its area and passes work to adjacent layers without interference.",
            "solutionAr": "الإجابة النموذجية: ب. كل طبقة لها وظيفة واضحة وتتعاون مع باقي الطبقات. السلايد 4 توضح أن نموذج الطبقات يقسم المهام لفريق متخصص كل طبقة تقوم بدورها وتسلمه للطبقة التالية بسلاسة."
          },
          {
            "id": "p-iot2-4",
            "problemNumber": 4,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "What is one benefit of using layers?",
            "questionAr": "ما هي إحدى فوائد استخدام الطبقات؟",
            "options": [
              "Changes in one layer can be made without necessarily changing the whole system",
              "Devices become unable to communicate across vendors",
              "Every layer must duplicate the work of the others",
              "Scalability is reduced"
            ],
            "optionsAr": [
              "إمكانية إجراء التعديلات في طبقة معينة دون الحاجة لتغيير النظام بأكمله (Flexibility)",
              "عجز الأجهزة عن الاتصال بين المصنعين",
              "وجوب قيام كل طبقة بتكرار عمل باقي الطبقات",
              "انخفاض قابلية التوسع"
            ],
            "correctAnswer": 0,
            "solution": "Answer: A. Changes in one layer can be made without necessarily changing the whole system. Slide 5 (\"Why Layers Are Important - Flexibility\") and Slide 6 explain that modularity allows one layer to evolve (e.g. IPv4 to IPv6) without breaking applications.",
            "solutionAr": "الإجابة النموذجية: أ. إمكانية إجراء التعديلات في طبقة معينة دون الحاجة لتغيير النظام بأكمله (Flexibility). السلايد 5 و 6 توضح أن ميزة المرونة تسمح بتطوير بروتوكول طبقة دون كسر باقي طبقات الشبكة."
          },
          {
            "id": "p-iot2-5",
            "problemNumber": 5,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "How many layers are in the OSI model?",
            "questionAr": "كم عدد الطبقات في نموذج الـ OSI المرجعي؟",
            "options": [
              "4",
              "5",
              "6",
              "7"
            ],
            "optionsAr": [
              "4 طبقات",
              "5 طبقات",
              "6 طبقات",
              "7 طبقات"
            ],
            "correctAnswer": 3,
            "solution": "Answer: D. 7. Slide 7 explicitly lists the 7 OSI layers: 1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application.",
            "solutionAr": "الإجابة النموذجية: د. 7 طبقات. السلايد 7 توضح نموذج الـ OSI المكون من 7 طبقات محددة بالترتيب من الفيزيائية إلى التطبيقات."
          },
          {
            "id": "p-iot2-6",
            "problemNumber": 6,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "Which OSI layer is associated with routing and addressing (IP)?",
            "questionAr": "أي طبقة في نموذج الـ OSI ترتبط بالتوجيه والعنونة المنطقية (IP)؟",
            "options": [
              "Physical",
              "Network",
              "Session",
              "Presentation"
            ],
            "optionsAr": [
              "الطبقة الفيزيائية (Physical)",
              "طبقة الشبكة (Network)",
              "طبقة الجلسة (Session)",
              "طبقة العرض والتقديم (Presentation)"
            ],
            "correctAnswer": 1,
            "solution": "Answer: B. Network. Slide 8 (\"OSI Model - Quick Overview\") lists for Network: \"Packet routing, addressing (IP)\".",
            "solutionAr": "الإجابة النموذجية: ب. طبقة الشبكة (Network). السلايد 8 تحدد صراحة أن وظيفة طبقة الشبكة هي توجيه الحزم (Routing) وإدارة العناوين (IP)."
          },
          {
            "id": "p-iot2-7",
            "problemNumber": 7,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "Which OSI layer is associated with framing and error detection?",
            "questionAr": "أي طبقة في نموذج الـ OSI ترتبط بتقسيم الإطارات (Framing) واكتشاف الأخطاء؟",
            "options": [
              "Data Link",
              "Application",
              "Transport",
              "Session"
            ],
            "optionsAr": [
              "طبقة ربط البيانات (Data Link)",
              "طبقة التطبيقات (Application)",
              "طبقة النقل (Transport)",
              "طبقة الجلسة (Session)"
            ],
            "correctAnswer": 0,
            "solution": "Answer: A. Data Link. Slide 8 lists for Data Link: \"Framing, physical addressing (MAC), error detection.\"",
            "solutionAr": "الإجابة النموذجية: أ. طبقة ربط البيانات (Data Link). السلايد 8 توضح أن Data Link هي المسؤولة عن تحويل البتات إلى إطارات (Framing) وعناوين الماك واكتشاف أخطاء النقل."
          },
          {
            "id": "p-iot2-8",
            "problemNumber": 8,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "Which pair contains transport-layer protocols mentioned in the lecture?",
            "questionAr": "أي زوج مما يلي يحتوي على بروتوكولات طبقة النقل المذكورة في المحاضرة؟",
            "options": [
              "HTTP and FTP",
              "IP and ICMP",
              "TCP and UDP",
              "Ethernet and Wi-Fi"
            ],
            "optionsAr": [
              "HTTP و FTP",
              "IP و ICMP",
              "TCP و UDP",
              "Ethernet و Wi-Fi"
            ],
            "correctAnswer": 2,
            "solution": "Answer: C. TCP and UDP. Slide 10 and Slide 12 detail TCP and UDP under the Transport Layer.",
            "solutionAr": "الإجابة النموذجية: ج. TCP و UDP. السلايد 10 و 12 تفردان شرحاً مقارناً كاملاً لبروتوكولي النقل الأساسيين TCP و UDP."
          },
          {
            "id": "p-iot2-9",
            "problemNumber": 9,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "Which statement best describes UDP?",
            "questionAr": "أي عبارة تصف بروتوكول UDP بأفضل شكل؟",
            "options": [
              "It guarantees delivery and performs extensive error correction",
              "It is connectionless and offers no delivery guarantee",
              "It is used only for physical cabling",
              "It is always slower than TCP"
            ],
            "optionsAr": [
              "يضمن وصول البيانات ويقوم بتصحيح شامل للأخطاء",
              "غير متصل (Connectionless) ولا يقدم أي ضمانات لوصول البيانات",
              "يستخدم فقط في كابلات التوصيل الفيزيائية",
              "أبطأ دائماً من بروتوكول TCP"
            ],
            "correctAnswer": 1,
            "solution": "Answer: B. It is connectionless and offers no delivery guarantee. Slide 12 explicitly defines UDP as: \"Connectionless, Fast, lightweight, No delivery guarantee, No error correction.\"",
            "solutionAr": "الإجابة النموذجية: ب. غير متصل (Connectionless) ولا يضمن وصول البيانات. السلايد 12 تعرف UDP صراحة بأنه سريع وخفيف وبدون ضمان لوصول الحزم أو تصحيح الأخطاء."
          },
          {
            "id": "p-iot2-10",
            "problemNumber": 10,
            "partTitle": "PART A / MULTIPLE CHOICE",
            "partTitleAr": "الجزء أ: اختيار من متعدد",
            "type": "mcq",
            "question": "What is a key focus of the IoT stack compared with OSI/TCP-IP models?",
            "questionAr": "ما هو التركيز الأساسي لنموذج طبقات إنترنت الأشياء مقارنة بنماذج OSI و TCP/IP التقليدية؟",
            "options": [
              "It focuses only on desktop computers",
              "It excludes sensors and hardware",
              "It includes device hardware, communication, platforms, and applications",
              "It eliminates the need for cloud services"
            ],
            "optionsAr": [
              "يركز فقط على أجهزة الكمبيوتر المكتبية",
              "يستبعد الحساسات والعتاد المادي",
              "يشمل عتاد الأجهزة، الاتصالات، المنصات البرمجية، والتطبيقات من النهاية للنهاية",
              "يلغي الحاجة إلى الخدمات السحابية"
            ],
            "correctAnswer": 2,
            "solution": "Answer: C. It includes device hardware, communication, platforms, and applications. Slide 14, 15, and 17 emphasize that the IoT stack explicitly spans device hardware (Sensors/Actuators) through cloud platforms and business applications.",
            "solutionAr": "الإجابة النموذجية: ج. يشمل عتاد الأجهزة والاتصالات والمنصات السحابية والتطبيقات. السلايدات 14 و 15 و 17 تؤكد أن معمارية الـ IoT لا تقتصر على نقل البيانات الشبكية بل تبدأ من العتاد والحساسات وتنتهي بتطبيقات المستخدم."
          },
          {
            "id": "p-iot2-11",
            "problemNumber": 11,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "Network standards help devices from different manufacturers communicate with one another.",
            "questionAr": "تساعد معايير الشبكات الأجهزة المصنعة من شركات مختلفة على التواصل والتفاهم مع بعضها البعض.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Slide 3 states: \"Standards solve this problem... Allow different companies to create devices that work together.\"",
            "solutionAr": "الإجابة: صح (TRUE). السلايد 3 تؤكد نصاً أن المعايير القياسية تحل مشكلة اختلاف الشركات وتسمح للأجهزة بالعمل سوياً بتوافق تام."
          },
          {
            "id": "p-iot2-12",
            "problemNumber": 12,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "In a layered model, every layer must know and manage all the internal details of every other layer.",
            "questionAr": "في نموذج الطبقات، يجب على كل طبقة معرفة وإدارة جميع التفاصيل الداخلية لجميع الطبقات الأخرى.",
            "correctAnswer": "False",
            "solution": "Answer: FALSE. Slide 4 states: \"Pass work to the next layer without interfering.\" Modularity and encapsulation ensure layers do NOT manage the internal details of other layers.",
            "solutionAr": "الإجابة: غلط (FALSE). السلايد 4 تؤكد أن كل طبقة متخصصة وتسلم البيانات للطبقة المجاورة دون التدخل في تفاصيل عملها الداخلية (تجريد وفصل المهام)."
          },
          {
            "id": "p-iot2-13",
            "problemNumber": 13,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "The OSI model contains Application, Presentation, Session, Transport, Network, Data Link, and Physical layers.",
            "questionAr": "يتكون نموذج OSI من طبقات التطبيقات، العرض، الجلسة، النقل، الشبكة، ربط البيانات، والفيزيائية.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Slide 7 explicitly lists all 7 of these exact layers in order.",
            "solutionAr": "الإجابة: صح (TRUE). السلايد 7 تسرد نصاً هذه الطبقات السبع الدقيقة لنموذج OSI بالترتيب."
          },
          {
            "id": "p-iot2-14",
            "problemNumber": 14,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "The TCP/IP model is presented in the lecture as a four-layer model.",
            "questionAr": "تم تقديم نموذج TCP/IP في المحاضرة كنموذج مكون من أربع طبقات.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Slide 9 presents TCP/IP with exactly four distinct layers: 01 Application, 02 Transport, 03 Internet, 04 Network Access.",
            "solutionAr": "الإجابة: صح (TRUE). السلايد 9 تعرف نموذج TCP/IP صراحة بنموذج من أربع طبقات (Application, Transport, Internet, Network Access)."
          },
          {
            "id": "p-iot2-15",
            "problemNumber": 15,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "The TCP/IP Internet layer is associated with packet routing across networks and protocols such as IP and ICMP.",
            "questionAr": "ترتبط طبقة الإنترنت في نموذج TCP/IP بتوجيه الحزم عبر الشبكات وبروتوكولات مثل IP و ICMP.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Slide 10 and Slide 11 state explicitly: \"03 Internet Layer: Packet routing across networks (IP, ICMP)\".",
            "solutionAr": "الإجابة: صح (TRUE). السلايدات 10 و 11 تحدد صراحة وظيفة طبقة الإنترنت في توجيه الحزم ببروتوكولات IP و ICMP."
          },
          {
            "id": "p-iot2-16",
            "problemNumber": 16,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "TCP is described as reliable and connection-oriented.",
            "questionAr": "يوصف بروتوكول TCP بأنه بروتوكول موثوق ويعتمد على الاتصال المسبق.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Slide 12 explicitly defines TCP as: \"Reliable, connection-oriented, Guarantees data delivery, Error checking and correction\".",
            "solutionAr": "الإجابة: صح (TRUE). السلايد 12 تصف TCP نصاً بأنه: موثوق ويعتمد على الاتصال ويضمن تسليم البيانات وتصحيح الأخطاء."
          },
          {
            "id": "p-iot2-17",
            "problemNumber": 17,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "UDP guarantees that every transmitted data packet will be delivered successfully.",
            "questionAr": "يضمن بروتوكول UDP وصول كل حزمة بيانات مرسلة بنجاح.",
            "correctAnswer": "False",
            "solution": "Answer: FALSE. Slide 12 highlights under UDP: \"No delivery guarantee... Faster but less reliable\". Lost datagrams are never retransmitted.",
            "solutionAr": "الإجابة: غلط (FALSE). السلايد 12 توضح نصاً أن UDP لا يضمن وصول البيانات (No delivery guarantee)؛ ولا يعيد إرسال الحزم المفقودة."
          },
          {
            "id": "p-iot2-18",
            "problemNumber": 18,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "In the IPv4-to-IPv6 example, the lecture states that the network layer changed while the other layers remained the same.",
            "questionAr": "في مثال التحول من IPv4 إلى IPv6، أوضحت المحاضرة أن طبقة الشبكة هي التي تغيرت بينما ظلت الطبقات الأخرى دون تغيير.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Slide 6 (\"Real-World Example: Evolution Without Breaking\") states: \"Only the Network layer changed; All other layers remained the same; Applications still work normally; Transport, Physical layers unaffected.\"",
            "solutionAr": "الإجابة: صح (TRUE). السلايد 6 توضح نصاً أن التحول لـ IPv6 اقتصر على طبقة الشبكة فقط وظلت باقي الطبقات والتطبيقات تعمل دون أي تغيير."
          },
          {
            "id": "p-iot2-19",
            "problemNumber": 19,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "IoT systems may use lightweight protocols and emphasize power efficiency for resource-constrained devices.",
            "questionAr": "قد تستخدم أنظمة إنترنت الأشياء بروتوكولات خفيفة الوزن وتركز على كفاءة استهلاك الطاقة للأجهزة محدودة الموارد.",
            "correctAnswer": "True",
            "solution": "Answer: TRUE. Slide 14 and Slide 17 highlight that IoT devices have limited memory and battery, requiring lightweight protocols and power efficiency.",
            "solutionAr": "الإجابة: صح (TRUE). السلايد 14 و 17 تؤكدان أن طبيعة أجهزة الـ IoT محدودة المعالجات والبطارية تفرض استخدام بروتوكولات خفيفة موفرة للطاقة."
          },
          {
            "id": "p-iot2-20",
            "problemNumber": 20,
            "partTitle": "PART B / TRUE OR FALSE",
            "partTitleAr": "الجزء ب: صح أو خطأ",
            "type": "true_false",
            "question": "The IoT stack is concerned only with network communication protocols and does not include device hardware or applications.",
            "questionAr": "تهتم معمارية طبقات إنترنت الأشياء ببروتوكولات الاتصال الشبكي فقط ولا تشمل عتاد الأجهزة أو التطبيقات.",
            "correctAnswer": "False",
            "solution": "Answer: FALSE. Slide 17 explicitly highlights that unlike OSI/TCP-IP, the IoT stack \"Starts from hardware itself (Sensors) to end user application... Includes device management, cloud platforms, and user interfaces.\"",
            "solutionAr": "الإجابة: غلط (FALSE). السلايد 17 توضح نصاً أن معمارية الـ IoT تبدأ من العتاد الفيزيائي نفسه وتصل لتطبيقات المستخدم وإدارة المنصات السحابية."
          }
        ]
      }
    ]
  },
  {
    "id": "windows-programming",
    "title": "Windows Programming",
    "titleAr": "برمجة Windows",
    "instructor": "هيئة التدريس",
    "description": "Desktop GUI application development using C# and the Microsoft .NET Framework, Windows Forms, event-driven programming, and database connectivity.",
    "descriptionAr": "تطوير تطبيقات سطح المكتب ذات الواجهات الرسومية (GUI) باستخدام لغة C# وإطار عمل Microsoft .NET وتقنية Windows Forms، وبرمجة الأحداث (Event-Driven)، والاتصال بقواعد البيانات.",
    "term": 1,
    "icon": "Layout",
    "isAvailable": false,
    "lectures": [],
    "sheets": []
  },
  {
    "id": "mobile-programming",
    "title": "Mobile Programming",
    "titleAr": "برمجة تطبيقات الموبايل",
    "description": "Mobile Programming lectures and study materials will be added soon.",
    "descriptionAr": "محاضرات ومحتوى مادة برمجة تطبيقات الموبايل هيتضافوا قريبًا.",
    "term": 1,
    "icon": "Smartphone",
    "isAvailable": false,
    "lectures": [],
    "sheets": []
  }
];

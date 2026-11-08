import type { CheatSheetItem, Lecture, SummarySection, TermDefinition } from '../types';

type IoTLectureSeed = Pick<Lecture, 'id' | 'courseId' | 'lectureNumber' | 'title' | 'titleAr' | 'durationMinutes' | 'interactiveTools' | 'questions'>;

const SOURCE_LECTURES: IoTLectureSeed[] = [
  {
    id: 'iot-lec-1',
    courseId: 'iot',
    lectureNumber: 1,
    title: 'IoT Fundamentals, Architecture & Ecosystem',
    titleAr: 'أساسيات إنترنت الأشياء، المعمارية والمنظومة الشاملة',
    durationMinutes: 35,
    interactiveTools: ['edge-vs-cloud', 'iot-simulator'],
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
    durationMinutes: 45,
    interactiveTools: ['iot-stack-lab'],
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
];

const section = (
  title: string,
  titleAr: string,
  content: string,
  contentAr: string,
  bulletPoints: string[],
  bulletPointsAr: string[],
  keyRule: string,
  keyRuleAr: string,
): SummarySection => ({ title, titleAr, content, contentAr, bulletPoints, bulletPointsAr, keyRule, keyRuleAr });

const LECTURE_1_SECTIONS: SummarySection[] = [
  section(
    '1. Devices, Sensors, Networks, and IoT',
    '1. الأجهزة والحساسات والشبكات وإنترنت الأشياء',
    'A device is equipment built to perform a task; a sensor detects a physical condition and converts it into a measurable signal; a network connects devices so they can exchange data and share resources. IoT combines physical things, sensing, software, and connectivity into an ecosystem that can exchange data with little direct human intervention. Source coverage: PDF pp. 2–6.',
    'الجهاز معدّة معمولة لمهمة، والحساس يرصد حالة فيزيائية ويحوّلها لإشارة قابلة للقياس، والشبكة بتوصل الأجهزة عشان تتبادل البيانات والموارد. إنترنت الأشياء بيجمع أشياء مادية واستشعار وبرمجيات واتصال في منظومة تقدر تتبادل البيانات بتدخل بشري محدود. تغطية المصدر: صفحات PDF من 2 إلى 6.',
    [
      'Device: general-purpose or dedicated hardware, such as a computer, phone, printer, or appliance.',
      'Sensor: an input transducer, such as a thermometer, smoke detector, motion detector, or camera sensor.',
      'Network: interconnected devices that communicate; the internet is a network of networks.',
      'The lecture presents Devices, Sensors, and Networks as three foundational IoT components; a sensor may itself be part of a device.',
    ],
    [
      'الجهاز: عتاد عام أو مخصص، زي الكمبيوتر أو الموبايل أو الطابعة أو جهاز منزلي.',
      'الحساس: محوّل إدخال، زي مقياس الحرارة أو كاشف الدخان أو الحركة أو مستشعر الكاميرا.',
      'الشبكة: أجهزة مترابطة بتتواصل؛ والإنترنت شبكة من شبكات.',
      'المحاضرة بتعرض الأجهزة والحساسات والشبكات كثلاثة مكونات أساسية؛ والحساس ممكن يكون جزءًا من جهاز.',
    ],
    'Do not use “device” and “sensor” as synonyms: a sensor measures; an actuator produces a physical output.',
    'ما تخلطش بين الجهاز والحساس: الحساس بيقيس، والمشغّل بينفّذ مخرجًا فيزيائيًا.',
  ),
  section(
    '2. How an IoT Data Flow Works',
    '2. إزاي تدفق بيانات إنترنت الأشياء بيشتغل',
    'The lecture’s illustrated pipeline has three stages: sensors collect readings, connectivity transmits them, and a cloud service analyzes them. AI and edge computing can augment this flow for monitoring, prediction, and automation. An actuator can be added as a teaching extension that acts on a decision and may create a feedback loop; it is not a fourth stage in the source’s three-stage figure. Source coverage: PDF pp. 7–8.',
    'خط البيانات المرسوم في المحاضرة له ثلاث مراحل: الحساسات بتجمع القراءات، والاتصال بينقلها، وخدمة سحابية بتحللها. الذكاء الاصطناعي ومعالجة الـ Edge ممكن يضيفوا مراقبة وتوقعًا وأتمتة. وممكن نضيف المشغّل كامتداد تعليمي ينفّذ القرار ويبدأ حلقة تغذية راجعة؛ لكنه مش مرحلة رابعة في الرسم الأصلي ذي المراحل الثلاث. تغطية المصدر: صفحات PDF 7 و8.',
    [
      'Collect: a sensor samples a physical condition and encodes a reading.',
      'Transmit: a connectivity link carries the reading to a gateway, edge node, or cloud service.',
      'Analyze: software applies rules or analytics and presents an insight or decision.',
      'Actuate/feedback is a useful system-design extension, not part of the slide’s three named stages.',
      'The slide describes efficiency, automation, and data-driven insight as benefits across industries.',
    ],
    [
      'الجمع: الحساس بياخد عينة من حالة فيزيائية ويمثّلها كقراءة.',
      'النقل: وصلة اتصال بتنقل القراءة لبوابة أو عقدة Edge أو خدمة سحابية.',
      'التحليل: البرمجيات بتطبّق قواعد أو تحليلات وتعرض نتيجة أو قرارًا.',
      'التنفيذ والتغذية الراجعة امتداد مفيد للتصميم، لكن مش من المراحل الثلاث المذكورة في الشريحة.',
      'الشريحة بتعرض الكفاءة والأتمتة والرؤى المبنية على البيانات كفوائد في قطاعات مختلفة.',
    ],
    'Remember the source figure as Collect → Transmit → Analyze; label any Act stage as an added feedback extension.',
    'احفظ رسم المصدر: جمع ← نقل ← تحليل؛ وسمّي مرحلة التنفيذ امتدادًا إضافيًا للتغذية الراجعة.',
  ),
  section(
    '3. Applications and the Agriculture Case',
    '3. التطبيقات ودراسة حالة الزراعة',
    'IoT applications connect measurements to useful services in homes, healthcare, agriculture, and Industry 4.0. The lecture’s agriculture example combines soil-moisture sensors, weather stations, and drones to help optimize irrigation, fertilization, and crop yield. Source coverage: PDF pp. 9–11.',
    'تطبيقات إنترنت الأشياء بتربط القياسات بخدمات مفيدة في المنازل والرعاية الصحية والزراعة والصناعة 4.0. مثال الزراعة في المحاضرة بيجمع حساسات رطوبة التربة ومحطات الطقس والدرونز لتحسين قرارات الري والتسميد والمحصول. تغطية المصدر: صفحات PDF من 9 إلى 11.',
    [
      'Smart homes: connected lighting, climate control, and security can improve convenience and energy use.',
      'Healthcare: wearables and remote monitoring can help clinicians observe patients between visits.',
      'Agriculture: sensing and aerial data support more targeted use of water and farm inputs.',
      'Industry 4.0: telemetry can support predictive maintenance, supply-chain monitoring, and automated quality checks.',
      'The slide names John Deere and Climate Corp as examples; it does not provide a readable quantified yield result.',
    ],
    [
      'المنازل الذكية: الإضاءة والتحكم في المناخ والأمان المتصل ممكن يحسّنوا الراحة واستخدام الطاقة.',
      'الرعاية الصحية: الأجهزة القابلة للارتداء والمراقبة عن بُعد بيساعدوا الطاقم الطبي يتابع المريض بين الزيارات.',
      'الزراعة: الاستشعار والبيانات الجوية بيساعدوا على استخدام أدق للمياه ومدخلات الزراعة.',
      'الصناعة 4.0: بيانات الأجهزة بتدعم الصيانة التنبؤية ومتابعة سلاسل الإمداد وفحص الجودة الآلي.',
      'الشريحة بتذكر John Deere وClimate Corp كأمثلة، لكنها ما بتعرضش رقمًا مقروءًا لزيادة المحصول.',
    ],
    'Treat the agriculture slide as an example of sensor-assisted decisions; do not invent the yield percentage missing from the source.',
    'اعتبر مثال الزراعة توضيحًا لقرارات مدعومة بالحساسات؛ وما تخترعش نسبة زيادة محصول مش موجودة بوضوح في المصدر.',
  ),
  section(
    '4. Adoption Challenges and Engineering Responses',
    '4. تحديات التبنّي والحلول الهندسية',
    'Wider IoT deployment increases the number and diversity of connected endpoints. The lecture groups the resulting concerns into security and privacy, interoperability, and scalability/performance, with practical mitigations for each. Source coverage: PDF p. 12.',
    'انتشار إنترنت الأشياء بيزوّد عدد الأجهزة المتصلة وتنوعها. المحاضرة بتجمع التحديات في الأمان والخصوصية، والتوافقية، وقابلية التوسع والأداء، وبتقترح إجراءات عملية لكل تحدٍ. تغطية المصدر: صفحة PDF رقم 12.',
    [
      'Security and privacy: protect sensitive data with encryption, secure protocols, access control, and appropriate compliance practices.',
      'Interoperability: use shared or standardized protocols and open ecosystems so devices from different vendors can work together.',
      'Scalability and performance: use edge processing for local decisions and cloud services for elastic storage and processing.',
      'These measures reduce risk; no single control guarantees a secure or interoperable deployment.',
    ],
    [
      'الأمان والخصوصية: احمِ البيانات الحساسة بالتشفير والبروتوكولات الآمنة وضبط الوصول ومراعاة متطلبات الامتثال.',
      'التوافقية: استخدم بروتوكولات مشتركة أو موحّدة ومنظومات مفتوحة عشان أجهزة شركات مختلفة تشتغل مع بعض.',
      'التوسع والأداء: استخدم معالجة الـ Edge للقرارات المحلية وخدمات السحابة للتخزين والمعالجة القابلة للتوسع.',
      'الإجراءات دي بتقلّل المخاطر؛ ومفيش إجراء واحد بيضمن الأمان أو التوافقية بالكامل.',
    ],
    'Match each challenge to its response: protection, shared standards, or a suitable edge/cloud split.',
    'اربط كل تحدٍ بحلّه: حماية البيانات أو معايير مشتركة أو توزيع مناسب بين الـ Edge والسحابة.',
  ),
  section(
    '5. Trends, Forecasts, and Future Integrations',
    '5. الاتجاهات والتوقعات والتكاملات المستقبلية',
    'The slides list 5G expansion, stronger security and privacy, AI-powered analytics, and integrated platforms as trends framed for 2025. They also print a “more than 14 billion” device estimate for 2025 and a 2030 forecast whose number is unreadable in the reviewed source. These are dated lecture forecasts, not verified current counts. The future-integration slide mentions AI, blockchain for security, and augmented reality for immersive experiences. Source coverage: PDF pp. 7, 10, and 13.',
    'الشرائح بتسرد توسّع 5G، وتعزيز الأمان والخصوصية، وتحليلات الذكاء الاصطناعي، والمنصات المتكاملة كاتجاهات مؤرخة بسنة 2025. كمان بتطبع تقديرًا بأكتر من 14 مليار جهاز لعام 2025، وتوقعًا لعام 2030 رقمه مش مقروء في المصدر اللي اتراجع. دي توقعات تاريخية للمحاضرة، مش أرقام حالية مؤكدة. شريحة التكاملات المستقبلية بتذكر الذكاء الاصطناعي والـ Blockchain للأمان والواقع المعزز للتجارب التفاعلية. تغطية المصدر: صفحات PDF 7 و10 و13.',
    [
      '5G: the lecture anticipates broader connectivity and faster transfer for real-time use cases.',
      'Security/privacy and integrated platforms: the slide highlights stronger protection and cross-device integration.',
      'AI analytics: applying AI to large IoT data sets is presented as a way to derive deeper insights.',
      'AI, blockchain, and augmented reality are presented as emerging integrations, not guaranteed outcomes.',
      'Forecast values are tied to the lecture’s 2025/2030 framing; the 2030 count is not legible and should not be inferred.',
    ],
    [
      '5G: المحاضرة بتتوقع اتصالًا أوسع ونقلًا أسرع لاستخدامات لحظية.',
      'الأمان والخصوصية والمنصات المتكاملة: الشريحة بتسلّط الضوء على حماية أقوى وربط الأجهزة ببعض.',
      'تحليلات الذكاء الاصطناعي: تطبيقها على بيانات IoT الكبيرة معروض كطريقة لاستخراج رؤى أعمق.',
      'الذكاء الاصطناعي والـ Blockchain والواقع المعزز تكاملات ناشئة، مش نتائج مضمونة.',
      'قيم التوقعات مرتبطة بإطار المحاضرة لعامَي 2025 و2030؛ رقم 2030 مش واضح وما ينفعش نستنتجه.',
    ],
    'Quote forecasts with their source date; never restate the slide’s projections as present-day verified facts.',
    'انقل التوقعات ومعاها تاريخ المصدر؛ وما تعرضش توقعات الشريحة كأنها حقائق حالية مؤكدة.',
  ),
];

const LECTURE_2_SECTIONS: SummarySection[] = [
  section(
    '1. Communication Problems and Layering',
    '1. تحديات الاتصال وتقسيم الطبقات',
    'Sending a message across networks requires packetization, delivery across links, integrity checks, and reconstruction at the destination. Common standards let products from different vendors interoperate. A layered model divides the work into responsibilities with defined interfaces, so one layer can evolve without redesigning the whole system; the lecture uses IPv4-to-IPv6 as a network-layer change example. Source coverage: PDF pp. 2–6.',
    'إرسال رسالة عبر الشبكات محتاج تقسيمها لحزم ونقلها بين الوصلات والتحقق من سلامتها وإعادة تركيبها عند الوصول. المعايير المشتركة بتسمح لأجهزة شركات مختلفة إنها تتوافق. النموذج الطبقي بيوزّع المهام على وظائف وواجهات واضحة، فممكن طبقة تتطور من غير إعادة تصميم النظام كله؛ والمحاضرة بتستخدم الانتقال من IPv4 إلى IPv6 كمثال لتغيير في طبقة الشبكة. تغطية المصدر: صفحات PDF من 2 إلى 6.',
    [
      'Packets make large messages manageable for transmission; the receiver interprets and reassembles them.',
      'Without shared protocols, independently designed systems may fail to communicate.',
      'Layering simplifies a complex problem, supports specialization, and helps preserve compatibility as protocols change.',
      'In the slide’s IPv4-to-IPv6 example, the Network layer changes while the application continues to work.',
    ],
    [
      'الحزم بتخلّي الرسائل الكبيرة قابلة للنقل؛ والمستقبِل بيفسّرها ويعيد تجميعها.',
      'من غير بروتوكولات مشتركة، الأنظمة المصممة بشكل مستقل ممكن ما تعرفش تتواصل.',
      'تقسيم الطبقات بيبسّط المشكلة المعقدة ويدعم التخصص والتوافق مع تغيّر البروتوكولات.',
      'في مثال الانتقال من IPv4 إلى IPv6، طبقة الشبكة هي اللي بتتغير والتطبيق بيستمر في العمل.',
    ],
    'A layered model describes responsibilities and interfaces; it is not a requirement that every implementation use identical internals.',
    'النموذج الطبقي بيوصف المسؤوليات والواجهات؛ ومش معناه إن كل تنفيذ لازم يستخدم نفس التفاصيل الداخلية.',
  ),
  section(
    '2. The Seven-Layer OSI Reference Model',
    '2. نموذج OSI المرجعي ذو السبع طبقات',
    'OSI is a conceptual reference framework organized from user-facing services down to physical signaling. Each layer provides services to the one above and uses the one below. Source coverage: PDF pp. 7–8.',
    'نموذج OSI إطار مرجعي تصوري مترتب من خدمات المستخدم لحد الإشارات الفيزيائية. كل طبقة بتقدّم خدمات للطبقة اللي فوقها وبتستخدم الطبقة اللي تحتها. تغطية المصدر: صفحات PDF 7 و8.',
    [
      '7 Application: network services used by applications, such as HTTP, FTP, and SMTP.',
      '6 Presentation: data representation, formatting, compression, and encryption functions.',
      '5 Session: coordinates sessions between communicating applications.',
      '4 Transport: end-to-end transport services; TCP and UDP are transport protocols.',
      '3 Network: logical addressing and routing (IP); 2 Data Link: frames and link-level error detection; 1 Physical: signals and media.',
    ],
    [
      '7 التطبيق: خدمات الشبكة اللي بتستخدمها التطبيقات، زي HTTP وFTP وSMTP.',
      '6 العرض: تمثيل البيانات وتنسيقها وضغطها ووظائف التشفير.',
      '5 الجلسة: تنسيق الجلسات بين التطبيقات المتواصلة.',
      '4 النقل: خدمات النقل بين الطرفين؛ وTCP وUDP بروتوكولا نقل.',
      '3 الشبكة: العنونة المنطقية والتوجيه (IP)؛ 2 ربط البيانات: الإطارات وفحص أخطاء الوصلة؛ 1 الفيزيائية: الإشارات ووسائط النقل.',
    ],
    'Memorize OSI from Layer 7 (Application) down to Layer 1 (Physical); ports belong to Transport, and IP routing belongs to Network.',
    'احفظ OSI من الطبقة 7 (التطبيق) لحد الطبقة 1 (الفيزيائية)؛ المنافذ في النقل، وتوجيه IP في الشبكة.',
  ),
  section(
    '3. The Four-Layer TCP/IP Model and Mapping',
    '3. نموذج TCP/IP ذي الأربع طبقات والمقارنة',
    'TCP/IP is the practical model used to describe Internet communication in the lecture. Its four layers are Application, Transport, Internet, and Network Access. The mapping to OSI is approximate: TCP/IP Application combines OSI Application, Presentation, and Session; Internet corresponds broadly to Network; Network Access combines Data Link and Physical. Source coverage: PDF pp. 9–11 and 13.',
    'نموذج TCP/IP هو النموذج العملي اللي بتستخدمه المحاضرة لوصف اتصال الإنترنت. بيتكوّن من أربع طبقات: التطبيق والنقل والإنترنت والوصول للشبكة. المقابلة مع OSI تقريبية: تطبيق TCP/IP بيجمع التطبيق والعرض والجلسة في OSI؛ وطبقة الإنترنت تقابل الشبكة بصورة عامة؛ والوصول للشبكة بيجمع ربط البيانات والطبقة الفيزيائية. تغطية المصدر: صفحات PDF من 9 إلى 11 و13.',
    [
      'Application: user services such as HTTP, FTP, SMTP, and DNS.',
      'Transport: process-to-process communication with TCP or UDP.',
      'Internet: logical addressing and routing with IP; the source also lists ICMP.',
      'Network Access: access to the local link, including Ethernet and Wi-Fi.',
      'OSI is a seven-layer conceptual reference; TCP/IP groups functions into a four-layer practical model.',
    ],
    [
      'التطبيق: خدمات المستخدم زي HTTP وFTP وSMTP وDNS.',
      'النقل: اتصال بين العمليات باستخدام TCP أو UDP.',
      'الإنترنت: العنونة المنطقية والتوجيه باستخدام IP؛ والمصدر بيذكر ICMP كمان.',
      'الوصول للشبكة: الوصول للوصلة المحلية، ومنها Ethernet وWi-Fi.',
      'OSI مرجع تصوري من سبع طبقات؛ وTCP/IP بيجمع الوظائف في نموذج عملي من أربع طبقات.',
    ],
    'Treat the OSI/TCP-IP correspondence as grouping, not a strict one-protocol-per-layer equivalence.',
    'اعتبر المقارنة بين OSI وTCP/IP تجميعًا للوظائف، مش تطابقًا حرفيًا بروتوكولًا بطبقة.',
  ),
  section(
    '4. TCP and UDP at the Transport Layer',
    '4. بروتوكولا TCP وUDP في طبقة النقل',
    'TCP establishes a connection with a three-way handshake and provides an ordered byte stream with acknowledgements and retransmission behavior. UDP sends independent datagrams without a transport connection setup or built-in delivery guarantee. UDP checksums can detect corruption, but neither protocol encrypts traffic by itself; applications can add security or reliability. Source coverage: PDF p. 12.',
    'TCP بيبدأ اتصال بمصافحة من ثلاث رسائل وبيقدّم تدفق بايتات مرتب مع إقرارات وسلوك لإعادة الإرسال. UDP بيبعت مخططات بيانات مستقلة من غير إعداد اتصال في طبقة النقل ومن غير ضمان تسليم مدمج. فحص UDP ممكن يكتشف تلف البيانات، لكن ولا بروتوكول فيهم بيشفّر الحركة لوحده؛ والتطبيقات ممكن تضيف الأمان أو الاعتمادية. تغطية المصدر: صفحة PDF رقم 12.',
    [
      'TCP: connection-oriented; sequence numbers, acknowledgements, ordering, and retransmission support reliable delivery to an application.',
      'UDP: connectionless datagrams with less transport overhead and no built-in retransmission or ordering guarantee.',
      'UDP has a checksum mechanism; “no delivery guarantee” does not mean “no error detection.”',
      'The slide lists web, email, and file transfer for TCP; gaming, streaming, and DNS for UDP. Real applications may use either protocol depending on design.',
      'Security is provided by protocols such as TLS or by application design, not automatically by TCP versus UDP.',
    ],
    [
      'TCP: قائم على اتصال؛ أرقام تسلسل وإقرارات وترتيب وإعادة إرسال بتدعم تسليمًا موثوقًا للتطبيق.',
      'UDP: مخططات بيانات من غير اتصال، بحمل أقل في النقل ومن غير ضمان مدمج لإعادة الإرسال أو الترتيب.',
      'UDP عنده آلية Checksum؛ وغياب ضمان التسليم مش معناه غياب اكتشاف الأخطاء.',
      'الشريحة بتذكر الويب والبريد ونقل الملفات مع TCP؛ والألعاب والبث وDNS مع UDP. التطبيق الفعلي ممكن يختار أيًا منهما حسب تصميمه.',
      'الأمان بتوفره بروتوكولات زي TLS أو تصميم التطبيق، مش TCP أو UDP لوحده.',
    ],
    'Choose TCP when the application needs ordered, reliable transport; choose UDP when it can handle datagrams and tradeoffs itself.',
    'اختار TCP لما التطبيق محتاج نقلًا مرتبًا وموثوقًا؛ واختار UDP لما يقدر يدير مخططات البيانات ومقايضاتها بنفسه.',
  ),
  section(
    '5. Why IoT Needs a Purpose-Fit Stack',
    '5. ليه إنترنت الأشياء محتاج طبقات مناسبة لطبيعته',
    'Many IoT endpoints have limited processing, memory, and battery capacity. The lecture motivates lightweight communication, device hardware/software optimization, and cloud platforms for scalable storage and processing rather than assuming every endpoint behaves like a desktop computer. Source coverage: PDF pp. 14 and 18.',
    'أجهزة IoT كتير قدراتها محدودة في المعالجة والذاكرة والبطارية. المحاضرة بتوضح أهمية الاتصال الخفيف وتحسين عتاد وبرمجيات الجهاز ومنصات السحابة للتخزين والمعالجة القابلة للتوسع، بدل افتراض إن كل جهاز زي كمبيوتر مكتبي. تغطية المصدر: صفحات PDF 14 و18.',
    [
      'Resource limits affect protocol choice, power use, and how much processing can happen on-device.',
      'Lightweight protocols reduce communication cost for small sensors and battery-powered devices.',
      'Device optimization, gateways/edge nodes, and cloud services can divide the work across the system.',
      'An IoT stack focuses on constrained endpoints and connected services; OSI/TCP-IP explain general communication functions.',
    ],
    [
      'محدودية الموارد بتأثر على اختيار البروتوكول واستهلاك الطاقة ومقدار المعالجة الممكنة على الجهاز.',
      'البروتوكولات الخفيفة بتقلل تكلفة الاتصال للحساسات الصغيرة والأجهزة العاملة بالبطارية.',
      'تحسين الجهاز والبوابات أو عقد Edge وخدمات السحابة ممكن يوزعوا المهام على أجزاء النظام.',
      'طبقات IoT بتركز على الأجهزة محدودة الموارد والخدمات المتصلة؛ وOSI وTCP/IP بيشرحوا وظائف الاتصال العامة.',
    ],
    'Select protocols and processing locations for the device’s actual power, memory, link, and latency constraints.',
    'اختار البروتوكولات ومكان المعالجة حسب قيود الطاقة والذاكرة والاتصال والتأخير الفعلية للجهاز.',
  ),
  section(
    '6. Two IoT Architecture Views: Five Layers and Six Stages',
    '6. منظوران لمعمارية IoT: خمس طبقات وست مراحل',
    'Keep the lecture’s theoretical five-layer model separate from its practical implementation diagram. The conceptual layers are Perception/Hardware, Network/Communication, Edge/Processing, Middleware/Platform, and Application. The practical diagram instead names six blocks from the physical object upward: Things, Device Hardware, Device Software, Communications, Cloud Platform, and Cloud Applications. These views organize the system differently and do not map one-to-one. Source coverage: PDF pp. 15–17.',
    'افصل نموذج المحاضرة النظري ذي الخمس طبقات عن رسم التنفيذ العملي. الطبقات التصورية هي الإدراك/العتاد، والشبكة/الاتصال، ومعالجة الـ Edge، والوسيط/المنصة، والتطبيق. أما رسم التنفيذ العملي فبيسمّي ست كتل من الشيء المادي لفوق: الأشياء، وعتاد الجهاز، وبرمجيات الجهاز، والاتصالات، ومنصة السحابة، وتطبيقات السحابة. المنظوران بيرتبوا النظام بطرق مختلفة ومش بيتطابقوا واحد لواحد. تغطية المصدر: صفحات PDF من 15 إلى 17.',
    [
      'Theoretical Perception: sensors and actuators interface with the physical world.',
      'Network/Communication carries data; Edge/Processing filters or aggregates it near devices.',
      'Middleware/Platform brokers messages and connects devices to services; Application presents dashboards, alerts, or controls.',
      'Practical implementation: Things → Device Hardware → Device Software → Communications → Cloud Platform → Cloud Applications.',
      'Things are physical objects; hardware is embedded components; software runs on the device; communication links connect it; cloud platform ingests/stores/processes data; cloud applications provide user-facing functions.',
    ],
    [
      'الإدراك نظريًا: الحساسات والمشغّلات بتتصل بالعالم المادي.',
      'الشبكة والاتصال بينقلوا البيانات؛ ومعالجة الـ Edge بتنقّيها أو تجمعها بالقرب من الأجهزة.',
      'الوسيط والمنصة بيديروا الرسائل ويربطوا الأجهزة بالخدمات؛ والتطبيق بيعرض لوحات وتنبيهات وتحكمًا.',
      'التنفيذ العملي: الأشياء ← عتاد الجهاز ← برمجيات الجهاز ← الاتصالات ← منصة السحابة ← تطبيقات السحابة.',
      'الأشياء أجسام مادية؛ والعتاد مكوّنات مدمجة؛ والبرمجيات بتشتغل على الجهاز؛ ووصلات الاتصال بتربطه؛ والمنصة السحابية بتستقبل البيانات وتخزنها وتعالجها؛ وتطبيقات السحابة بتقدّم وظائف للمستخدم.',
    ],
    'Five conceptual layers are not six implementation blocks: preserve each diagram’s labels and explain correspondence as approximate.',
    'الخمس طبقات التصورية مش هي كتل التنفيذ الست: حافظ على تسميات كل رسم واشرح أي تقابل على إنه تقريبي.',
  ),
];

const TERMS: Record<string, TermDefinition[]> = {
  'iot-lec-1': [
    { term: 'Device', termAr: 'الجهاز (Device)', definition: 'Hardware designed to perform a specific task.', definitionAr: 'عتاد مصمم لتنفيذ مهمة محددة.' },
    { term: 'Sensor', termAr: 'الحساس (Sensor)', definition: 'A transducer that detects a physical input and produces a measurable signal.', definitionAr: 'محوّل يرصد مدخلًا فيزيائيًا وينتج إشارة قابلة للقياس.' },
    { term: 'Network', termAr: 'الشبكة (Network)', definition: 'Interconnected devices that communicate and share resources.', definitionAr: 'أجهزة مترابطة بتتواصل وبتشارك الموارد.' },
    { term: 'Actuator', termAr: 'المشغّل (Actuator)', definition: 'A component that turns a control signal into a physical action.', definitionAr: 'مكوّن بيحوّل إشارة تحكم إلى فعل فيزيائي.' },
    { term: 'Interoperability', termAr: 'التوافقية (Interoperability)', definition: 'The ability of different systems or devices to exchange and use information.', definitionAr: 'قدرة أنظمة أو أجهزة مختلفة على تبادل المعلومات واستخدامها.' },
    { term: 'Edge Computing', termAr: 'معالجة الـ Edge (Edge Computing)', definition: 'Processing data near its source instead of sending every operation to a remote cloud.', definitionAr: 'معالجة البيانات بالقرب من مصدرها بدل إرسال كل عملية إلى سحابة بعيدة.' },
  ],
  'iot-lec-2': [
    { term: 'OSI Model', termAr: 'نموذج OSI (OSI Model)', definition: 'A conceptual seven-layer reference model for communication functions.', definitionAr: 'نموذج مرجعي تصوري من سبع طبقات لوظائف الاتصال.' },
    { term: 'TCP/IP Model', termAr: 'نموذج TCP/IP (TCP/IP Model)', definition: 'A practical four-layer model used to describe Internet communication.', definitionAr: 'نموذج عملي من أربع طبقات لوصف اتصال الإنترنت.' },
    { term: 'TCP', termAr: 'بروتوكول TCP (TCP)', definition: 'A connection-oriented transport protocol that supports ordered, reliable byte-stream delivery.', definitionAr: 'بروتوكول نقل قائم على اتصال ويدعم تسليم تدفق بايتات مرتب وموثوق.' },
    { term: 'UDP', termAr: 'بروتوكول UDP (UDP)', definition: 'A connectionless transport protocol that sends datagrams without built-in delivery or ordering guarantees.', definitionAr: 'بروتوكول نقل من غير اتصال بيبعت مخططات بيانات من غير ضمان مدمج للتسليم أو الترتيب.' },
    { term: 'IoT Stack', termAr: 'طبقات إنترنت الأشياء (IoT Stack)', definition: 'An architecture view for constrained devices, communications, platforms, and applications.', definitionAr: 'منظور معماري للأجهزة محدودة الموارد والاتصالات والمنصات والتطبيقات.' },
  ],
};

const CHEAT_SHEETS: Record<string, CheatSheetItem[]> = {
  'iot-lec-1': [
    { en: 'Sensor → connectivity → analysis is the lecture’s three-stage diagram; actuator feedback is an extension.', ar: 'الحساس ← الاتصال ← التحليل هي مراحل رسم المحاضرة الثلاث؛ والتغذية الراجعة بالمشغّل امتداد إضافي.' },
    { en: 'Device performs a task; sensor measures; network carries data; actuator acts.', ar: 'الجهاز بينفّذ مهمة؛ الحساس بيقيس؛ الشبكة بتنقل البيانات؛ والمشغّل بينفّذ فعلًا.' },
    { en: 'Applications: smart homes, healthcare, agriculture, and Industry 4.0.', ar: 'التطبيقات: المنازل الذكية والرعاية الصحية والزراعة والصناعة 4.0.' },
    { en: 'Challenges: security/privacy, interoperability, and scalability/performance.', ar: 'التحديات: الأمان والخصوصية والتوافقية وقابلية التوسع والأداء.' },
    { en: '2025/2030 slide figures are historical forecasts; the reviewed 2030 number is unreadable.', ar: 'أرقام شريحة 2025 و2030 توقعات تاريخية؛ ورقم 2030 غير مقروء في المصدر المُراجع.' },
  ],
  'iot-lec-2': [
    { en: 'OSI layers: Application, Presentation, Session, Transport, Network, Data Link, Physical.', ar: 'طبقات OSI: التطبيق، العرض، الجلسة، النقل، الشبكة، ربط البيانات، الفيزيائية.' },
    { en: 'TCP/IP: Application, Transport, Internet, Network Access.', ar: 'طبقات TCP/IP: التطبيق، النقل، الإنترنت، الوصول للشبكة.' },
    { en: 'TCP handshake: SYN → SYN-ACK → ACK; UDP datagrams have no transport handshake.', ar: 'مصافحة TCP: SYN ← SYN-ACK ← ACK؛ ومخططات UDP لا تحتاج مصافحة نقل.' },
    { en: 'Theoretical IoT model: five layers. Practical source diagram: six named blocks; do not conflate them.', ar: 'نموذج IoT النظري: خمس طبقات. الرسم العملي في المصدر: ست كتل؛ ما تخلطش بينهم.' },
    { en: 'TCP and UDP do not provide encryption on their own.', ar: 'TCP وUDP ما بيوفروش تشفيرًا بمفردهم.' },
  ],
};

export const IOT_LECTURES: Lecture[] = SOURCE_LECTURES.map((lecture) => ({
  ...lecture,
  brief: lecture.id === 'iot-lec-1'
    ? 'Device, sensor, and network definitions; the source’s three-stage IoT flow; applications and the agriculture case; adoption challenges; and dated 2025/2030 forecasts and emerging AI, blockchain, and AR integrations.'
    : 'Communication layering, the OSI and TCP/IP models, TCP and UDP tradeoffs, constrained-device design, and the distinct theoretical five-layer and practical six-block IoT architecture views.',
  briefAr: lecture.id === 'iot-lec-1'
    ? 'تعريفات الجهاز والحساس والشبكة؛ وتدفق IoT الأصلي ذي المراحل الثلاث؛ والتطبيقات ومثال الزراعة؛ وتحديات التبنّي؛ وتوقعات 2025 و2030 المؤرخة وتكاملات الذكاء الاصطناعي والـ Blockchain والواقع المعزز.'
    : 'تقسيم الاتصال إلى طبقات، ونموذجا OSI وTCP/IP، ومقايضات TCP وUDP، وتصميم الأجهزة محدودة الموارد، والتمييز بين منظور IoT النظري ذي الخمس طبقات والتنفيذ العملي ذي الكتل الست.',
  sections: lecture.id === 'iot-lec-1' ? LECTURE_1_SECTIONS : LECTURE_2_SECTIONS,
  terms: TERMS[lecture.id],
  cheatSheet: CHEAT_SHEETS[lecture.id],
}));

# -*- coding: utf-8 -*-
import json
import os
import sys

def build_ai_data():
    course = {
        "id": "ai",
        "title": "Artificial Intelligence",
        "titleAr": "الذكاء الاصطناعي",
        "instructor": "د. نسمة محمود",
        "description": "Comprehensive academic study of Artificial Intelligence: Foundations, historical timeline and AI Winters, the 4 approaches matrix, Turing Test & 6 disciplines, Rational Agents, PEAS task environments, environmental dimensions, formal search problem formulation, and uninformed search strategies (BFS, DFS, UCS).",
        "descriptionAr": "الدراسة الأكاديمية الشاملة للذكاء الاصطناعي: الأسس الفلسفية والرياضية، الخط الزمني وظاهرة شتاء الذكاء الاصطناعي (AI Winters)، مصفوفة المناهج الأربعة، اختبار تورينج والتخصصات الستة، نظرية الوكلاء العقلانيين (Rational Agents)، توصيف بيئات PEAS، الأبعاد البيئية السبعة، صياغة مسائل البحث، وخوارزميات البحث غير الموجه (BFS, DFS, UCS).",
        "term": 1,
        "icon": "Bot",
        "isAvailable": True,
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
                "interactiveTools": ["turing-test"],
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
                            "options": ["Big Data", "Sequential CPUs", "Logic Theorist Program", "Analog Sensors"],
                            "optionsAr": ["البيانات الضخمة (Data)", "المعالجات المركزية التسلسلية (CPUs)", "برامج المنطق الصوري", "الحساسات التناظرية"],
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
                            "options": ["1956", "1943", "1950", "1969"],
                            "optionsAr": ["1956", "1943", "1950", "1969"],
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
                            "options": ["Computer Vision and Robotics", "Natural Language Processing and Machine Learning", "Knowledge Representation and Automated Reasoning", "Speech Synthesis and Web Scraping"],
                            "optionsAr": ["الرؤية الحاسوبية والروبوتات (Computer Vision & Robotics)", "معالجة اللغات الطبيعية والتعلم الآلي", "تمثيل المعرفة والاستدلال الآلي", "توليد الكلام وسحب بيانات الويب"],
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
                        "correctAnswer": True,
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
                        "correctAnswer": False,
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
                        "options": ["Robotics", "Natural Language Processing", "Knowledge Representation", "Machine Learning"],
                        "optionsAr": ["الروبوتات (Robotics)", "معالجة اللغات الطبيعية (NLP)", "تمثيل المعرفة (Knowledge Representation)", "التعلم الآلي (Machine Learning)"],
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
                        "correctAnswer": True,
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
                        "correctAnswer": True,
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
                "interactiveTools": ["vacuum-world"],
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
                            "options": ["Architecture", "Agent Program", "Lookup Table", "Utility Function"],
                            "optionsAr": ["المعمارية (Architecture)", "برنامج الوكيل (Agent Program)", "جدول البحث المسبق", "دالة المنفعة"],
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
                            "options": ["Planning (Goal-Based) Agent", "Simple Reflex Agent", "Lookup Table Agent", "Hard-coded Circuit"],
                            "optionsAr": ["وكيل التخطيط القائم على الأهداف (Goal-Based Agent)", "الوكيل الانعكاسي البسيط (Simple Reflex Agent)", "وكيل جداول الحفظ", "الدوائر المنطقية المبرمجة مسبقاً"],
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
                            "options": ["Sensors (S)", "Actuators (A)", "Environment (E)", "Performance Measure (P)"],
                            "optionsAr": ["الحساسات (Sensors - S)", "المشغلات (Actuators - A)", "البيئة (Environment - E)", "مقياس الأداء (Performance - P)"],
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
                        "options": ["Agent = Architecture + Agent Program", "Agent = Sensors + Actuators", "Agent = Data + Algorithms + Hardware", "Agent = Percepts + Actions"],
                        "optionsAr": ["الوكيل = المعمارية + برنامج الوكيل", "الوكيل = الحساسات + المشغلات", "الوكيل = البيانات + الخوارزميات + العتاد", "الوكيل = المدركات + الأفعال"],
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
                        "correctAnswer": True,
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
                        "correctAnswer": False,
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
                        "options": ["Deterministic environment", "Stochastic environment", "Dynamic environment", "Partially observable environment"],
                        "optionsAr": ["بيئة حتمية (Deterministic)", "بيئة احتمالية (Stochastic)", "بيئة ديناميكية (Dynamic)", "بيئة ملاحظة جزئياً (Partially observable)"],
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
                        "correctAnswer": True,
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
                        "correctAnswer": True,
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
                "interactiveTools": ["search-visualizer"],
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
                            "options": ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Uniform-Cost Search (UCS)", "Iterative Deepening Search"],
                            "optionsAr": ["البحث في العمق (Depth-First Search - DFS)", "البحث في العرض (Breadth-First Search - BFS)", "البحث متساوي التكلفة (Uniform-Cost Search - UCS)", "البحث متكرر التعميق"],
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
                        "correctAnswer": False,
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
                        "options": ["181,440 states (9! / 2)", "362,880 states (9!)", "8 states", "64 states"],
                        "optionsAr": ["181,440 حالة (9! مقسومة على 2)", "362,880 حالة (9!)", "8 حالات فقط", "64 حالة"],
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
                        "correctAnswer": True,
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
                        "correctAnswer": True,
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
                        "options": ["LIFO Queue (Stack)", "FIFO Queue", "Priority Queue", "Hash Table"],
                        "optionsAr": ["طابور LIFO (مكدس - Stack)", "طابور FIFO", "طابور أولويات (Priority Queue)", "جدول تجزئة (Hash Table)"],
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
                        "correctAnswer": True,
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
                "interactiveTools": ["search-visualizer"],
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
                            "options": ["Explored Set (Closed List)", "Priority Matrix", "Recursion Stack", "Neural Weight Array"],
                            "optionsAr": ["مجموعة الحالات المستكشفة (Explored Set / Closed List)", "مصفوفة الأولويات", "مكدس الاستدعاء الذاتي", "مصفوفة أوزان الشبكة العصبية"],
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
                        "options": ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Uniform-Cost Search (UCS)", "Depth-Limited Search"],
                        "optionsAr": ["البحث في العرض (Breadth-First Search - BFS)", "البحث في العمق (Depth-First Search - DFS)", "البحث متساوي التكلفة (Uniform-Cost Search - UCS)", "البحث محدود العمق"],
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
                        "correctAnswer": True,
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
                        "options": ["O(b * m) [Linear space]", "O(b^d) [Exponential space]", "O(b^m) [Exponential space]", "O(1) [Constant space]"],
                        "optionsAr": ["O(b * m) [تعقيد مكاني خطي]", "O(b^d) [تعقيد مكاني أسي]", "O(b^m) [تعقيد مكاني أسي]", "O(1) [تعقيد مكاني ثابت]"],
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
                        "correctAnswer": True,
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
                        "options": ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "A* Search", "Iterative Deepening Search"],
                        "optionsAr": ["البحث في العرض (Breadth-First Search - BFS)", "البحث في العمق (Depth-First Search - DFS)", "بحث A* الاستكشافي", "البحث متكرر التعميق"],
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
                        "correctAnswer": False,
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
                        "correctAnswer": True,
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
                "hasSolution": True,
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
                        "options": ["Algorithms", "Computing Power", "Data"],
                        "optionsAr": ["الخوارزميات (Algorithms)", "القدرة الحوسبية (Computing Power)", "البيانات (Data)"],
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
                "hasSolution": True,
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
                        "options": ["Agent Program", "Architecture", "Utility Function", "Lookup Table"],
                        "optionsAr": ["برنامج الوكيل (Agent Program)", "المعمارية (Architecture)", "دالة المنفعة (Utility Function)", "جدول البحث (Lookup Table)"],
                        "solution": "Correct Answer: B) Architecture.\nAcademic Justification: In the fundamental equation Agent = Architecture + Agent Program (Lecture 2 Slide 11), the Architecture provides the physical devices, sensors, and actuators, while the Agent Program implements the decision-making logic.",
                        "solutionAr": "الإجابة النموذجية: B) المعمارية (Architecture).\nالتعليل الأكاديمي: في معادلة الوكيل التأسيسية (الوكيل = المعمارية + برنامج الوكيل - سلايد 11)، توفر المعمارية العتاد والحساسات والمشغلات، بينما ينفذ البرنامج المنطق والخوارزمية."
                    },
                    {
                        "id": "p-ai2-6",
                        "problemNumber": 6,
                        "question": "What is an environment called if the agent's sensors give it complete access to the complete state of the world relevant to choosing an action?\n○ A) Stochastic environment   B) Partially observable environment   C) Fully observable environment   D) Dynamic environment",
                        "questionAr": "ماذا تسمى البيئة إذا كانت حساسات الوكيل تمنحه وصولاً كاملاً للحالة الكلية للعالم ذات الصلة باختيار الفعل؟\n○ A) بيئة احتمالية   B) بيئة ملاحظة جزئياً   C) بيئة ملاحظة بالكامل   D) بيئة ديناميكية",
                        "options": ["Stochastic environment", "Partially observable environment", "Fully observable environment", "Dynamic environment"],
                        "optionsAr": ["بيئة احتمالية (Stochastic)", "بيئة ملاحظة جزئياً (Partially observable)", "بيئة ملاحظة بالكامل (Fully observable)", "بيئة ديناميكية (Dynamic)"],
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
                "hasSolution": True,
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
                "hasSolution": True,
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
                        "options": ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Uniform-Cost Search (UCS)", "Best-First Search"],
                        "optionsAr": ["البحث في العرض (Breadth-First Search - BFS)", "البحث في العمق (Depth-First Search - DFS)", "البحث متساوي التكلفة (Uniform-Cost Search - UCS)", "البحث الأفضل أولاً"],
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
    }
    return course

def main():
    target_path = '/Users/0xbedo/study-platform/src/data/coursesData.ts'
    with open(target_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the AI block
    start_marker = "  {\n    id: 'ai',"
    end_marker = "  {\n    id: 'iot',"

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx == -1 or end_idx == -1:
        print(f"Error: Could not locate markers in {target_path}. start_idx={start_idx}, end_idx={end_idx}")
        sys.exit(1)

    print(f"Found AI block from index {start_idx} to {end_idx}")

    course_obj = build_ai_data()
    course_json = json.dumps(course_obj, ensure_ascii=False, indent=2)

    # Indent by 2 spaces to match COURSES_DATA array
    indented_json = '\n'.join('  ' + line if line.strip() else line for line in course_json.split('\n'))
    replacement = indented_json + ',\n'

    new_content = content[:start_idx] + replacement + content[end_idx:]

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Successfully injected AI curriculum into coursesData.ts!")

if __name__ == '__main__':
    main()

import type { Lecture, SummarySection, TermDefinition, CheatSheetItem } from '../types';
import { COURSES_DATA } from './courseSeeds';

const existingAiLectures = COURSES_DATA.find((course) => course.id === 'ai')?.lectures ?? [];
const preserveLecture = (id: string) => {
  const lecture = existingAiLectures.find((item) => item.id === id);
  if (!lecture) throw new Error(`Missing source lecture ${id}`);
  return lecture;
};

// Paired source rows keep the two reading columns aligned without a new layout.
const sourceSection = (title: string, titleAr: string, content: string, contentAr: string, rows: [string, string][], keyRule: string, keyRuleAr: string): SummarySection => ({
  title, titleAr, content, contentAr,
  bulletPoints: rows.map(([en]) => en), bulletPointsAr: rows.map(([, ar]) => ar), keyRule, keyRuleAr,
});

const ai2Sections: SummarySection[] = [
  {
    title: '1. Agents, Percepts & Architecture',
    titleAr: '١. الوكلاء والإدراكات والبنية',
    content: 'An agent perceives its environment through sensors and changes it through actuators. Its abstract agent function maps percept histories to actions; an agent program is the concrete implementation running on an architecture.',
    contentAr: 'الـ Agent بيدرك البيئة من خلال الـ Sensors وبيأثر فيها عن طريق الـ Actuators. الـ Agent Function هي تحويل مجرد لتاريخ الإدراكات إلى أفعال، أما الـ Agent Program فهو التنفيذ الفعلي على الـ Architecture.',
    bulletPoints: [
      'Agent = Architecture + Agent Program; the architecture supplies the mechanisms the program can use.',
      'A percept is the agent’s immediate input; a percept sequence is the complete history available to its decision process.',
      'The agent function describes what action to choose for every possible percept sequence; the program implements that mapping.',
      'A lookup table is impractical because the number of possible percept histories can be enormous or unbounded.',
      'A chatbot mainly answers questions; an AI agent can use tools and take actions to complete a task.',
      'Source examples (pp. 9–10): eyes sense a red light, the red light is a percept, a foot is an actuator, and braking is an action. For email, a mail interface receives the message and mailbox functions move or delete it.',
      'Chatbot/agent infographic (p. 8): answering a marketing question is contrasted with checking a calendar, booking, reminding, and updating records. This is a teaching comparison of roles; conversational systems can also have tools.',
    ],
    bulletPointsAr: [
      'الـ Agent = الـ Architecture + الـ Agent Program؛ والـ Architecture بتوفّر الإمكانات اللي البرنامج يقدر يستخدمها.',
      'الـ Percept هو المدخل الحالي للـ Agent، والـ Percept Sequence هو تاريخ الإدراكات المتاح لعملية اتخاذ القرار.',
      'الـ Agent Function بتحدد الفعل المناسب لكل تاريخ إدراكات ممكن، والـ Program هو اللي بينفّذ التحويل ده.',
      'تطبيق الـ Function كجدول بحث مش عملي لأن عدد تواريخ الإدراك الممكنة ممكن يبقى ضخم جدًا أو غير محدود.',
      'الـ Chatbot غالبًا بيرد على الأسئلة، لكن الـ AI Agent ممكن يستخدم أدوات وينفّذ أفعال عشان ينجز مهمة.',
      'أمثلة المصدر في ص 9–10: العين بتشوف إشارة حمراء، والإشارة إدراك، والرجل مشغّل، والفرملة فعل. في البريد، واجهة البريد بتستقبل الرسالة، ودوال صندوق البريد بتنقلها أو تحذفها.',
      'رسم الـ Chatbot والـ Agent في صفحة 8: الرد على سؤال تسويقي بيتقارن بفحص التقويم والحجز والتذكير وتحديث السجلات. دي مقارنة تعليمية للأدوار؛ أنظمة المحادثة ممكن يكون معاها أدوات كمان.',
    ],
    keyRule: 'Keep the abstract mapping (agent function) separate from its concrete implementation (agent program).',
    keyRuleAr: 'فرّق بين التحويل المجرد (الـ Agent Function) والتنفيذ الفعلي ليه (الـ Agent Program).',
  },
  {
    title: '2. Rationality & Agent Types',
    titleAr: '٢. العقلانية وأنواع الوكلاء',
    content: 'A rational agent chooses the action expected to maximize its performance measure, given what it has perceived and what it knows. Rationality is not omniscience: outcomes can remain uncertain, and rational choices can still have poor results.',
    contentAr: 'الـ Rational Agent بيختار الفعل المتوقع إنه يحقق أفضل نتيجة حسب مقياس الأداء، والإدراكات والمعرفة المتاحة. العقلانية مش معناها معرفة كل حاجة؛ النتيجة ممكن تفضل غير مؤكدة، والاختيار العقلاني ممكن ينتهي بنتيجة ضعيفة.',
    bulletPoints: [
      'Rational action depends on the performance measure, prior knowledge, available actions, and the percept sequence so far.',
      'A simple reflex agent applies condition–action rules to the current percept; it does not explicitly plan ahead.',
      'A goal-based agent uses a model and goals to consider future states and choose a sequence of actions.',
      'Source terminology (p. 7): the slide calls rational agents intelligent, while intelligence alone need not imply rational action. This is its capability/performance convention, not a universal test of intelligence; exploration can improve later decisions.',
      'Comparison table (p. 13): reflex rules lack explicit lookahead; goal-based planning combines a model and a goal, often with factored or structured states. Changing a goal can change a plan without rewriting every rule, but success still depends on a suitable model and search.',
    ],
    bulletPointsAr: [
      'الفعل العقلاني بيتحدد حسب مقياس الأداء، والمعرفة السابقة، والأفعال المتاحة، وتاريخ الإدراكات لحد دلوقتي.',
      'الـ Simple Reflex Agent بيطبّق قواعد شرط وفعل على الإدراك الحالي، من غير تخطيط صريح للمستقبل.',
      'الـ Goal-Based Agent بيستخدم Model وأهداف عشان يتوقع حالات مستقبلية ويختار تسلسل أفعال.',
      'مصطلحات المصدر في صفحة 7: الشريحة بتسمّي الوكيل العقلاني ذكي، لكن الذكاء لوحده مش شرط يعني فعل عقلاني. ده اصطلاحها للقدرة والأداء، مش اختبار عالمي للذكاء؛ والاستكشاف ممكن يحسّن القرارات بعدين.',
      'جدول المقارنة في صفحة 13: قواعد رد الفعل مفيهاش نظرة صريحة لقدّام؛ والتخطيط القائم على الهدف بيجمع Model وهدف، وغالبًا حالات بعوامل أو بنية. تغيير الهدف ممكن يغيّر الخطة من غير إعادة كتابة كل قاعدة، لكن النجاح لسه محتاج نموذج وبحث مناسبين.',
    ],
    keyRule: 'Rationality means choosing well from available evidence—not guaranteeing a perfect outcome.',
    keyRuleAr: 'العقلانية معناها تختار كويس حسب المعلومات المتاحة، مش إنك تضمن نتيجة مثالية.',
  },
  {
    title: '3. Specify a Task with PEAS',
    titleAr: '٣. وصف المهمة باستخدام PEAS',
    content: 'PEAS is a checklist for describing an agent’s task environment before designing its program. It names the Performance measure, Environment, Actuators, and Sensors.',
    contentAr: 'الـ PEAS طريقة منظمة لوصف بيئة مهمة الـ Agent قبل تصميم البرنامج. الحروف بتمثل مقياس الأداء (Performance)، والبيئة (Environment)، والمشغّلات (Actuators)، والمستشعرات (Sensors).',
    bulletPoints: [
      'Performance measure states what counts as success, such as safe, timely, comfortable taxi journeys.',
      'Environment is the external world the agent operates in, such as roads, traffic, passengers, and weather.',
      'Actuators are the controls that affect the world; a taxi may steer, accelerate, brake, and signal.',
      'Sensors provide percepts; a taxi may use cameras, GPS, speed sensors, and engine sensors.',
      'Taxi table (p. 17): performance also includes legality, profit, and limiting impact on other road users; the environment includes police and pedestrians. Horn/display/speech are actuators; radar, accelerometer, microphone, and touchscreen are additional sensors.',
      'Vacuum score (p. 16): award one point per clean square at every time step, not one point per Suck action. The model assumes known rules, initially unknown dirt/location, perfect local location/dirt sensing, only Left/Right/Suck, and ineffective boundary moves; NoOp is absent from this scoring example.',
    ],
    bulletPointsAr: [
      'مقياس الأداء بيحدد النجاح، زي رحلة تاكسي آمنة وفي وقت مناسب ومريحة.',
      'البيئة هي العالم الخارجي اللي الـ Agent بيشتغل فيه، زي الطرق والمرور والركاب والطقس.',
      'الـ Actuators هي وسائل التأثير في العالم؛ التاكسي ممكن يوجّه ويزوّد السرعة ويفرمل ويستخدم الإشارات.',
      'الـ Sensors بتوفّر الإدراكات؛ التاكسي ممكن يستخدم كاميرات وGPS ومستشعرات السرعة والمحرك.',
      'جدول التاكسي في صفحة 17: الأداء بيشمل كمان قانونية القيادة والربح وتقليل التأثير على مستخدمي الطريق؛ والبيئة فيها الشرطة والمشاة. البوق والعرض والكلام مشغّلات؛ والـ Radar والـ Accelerometer والميكروفون وشاشة اللمس مستشعرات إضافية.',
      'درجة المكنسة في صفحة 16: نقطة لكل مربع نضيف عند كل خطوة زمنية، مش نقطة لكل فعل Suck. النموذج بيفترض قواعد معروفة، ومكان وأوساخ غير معروفين في البداية، وإدراك محلي دقيق للمكان والأوساخ، وأفعال Left وRight وSuck بس، وحركة حدودية من غير تأثير؛ وNoOp مش موجود في مثال الدرجة ده.',
    ],
    keyRule: 'PEAS order: Performance measure → Environment → Actuators → Sensors.',
    keyRuleAr: 'ترتيب PEAS هو: مقياس الأداء ← البيئة ← المشغّلات ← المستشعرات.',
  },
  {
    title: '4. Classify the Environment',
    titleAr: '٤. تصنيف البيئة',
    content: 'Environment properties determine what information and internal capabilities an agent needs. Classify observability, number of agents, uncertainty, task structure, change over time, state/action values, and whether the rules are known.',
    contentAr: 'خصائص البيئة بتحدد المعلومات والقدرات الداخلية اللي الـ Agent محتاجها. صنّف قابلية الملاحظة، وعدد الوكلاء، وعدم اليقين، وطبيعة المهمة، والتغيّر مع الوقت، وطبيعة الحالات والأفعال، وهل القواعد معروفة.',
    bulletPoints: [
      'Observability: fully observable or partially observable; partial observation may require memory. The slide also lists unobservable (no sensors). Full observation concerns information relevant to choosing an action, not every fact in the universe.',
      'Other dimensions: single-agent or multiagent; deterministic or stochastic; episodic or sequential.',
      'Time and representation: static, dynamic, or semidynamic; discrete or continuous.',
      'Knowledge: rules and action outcomes are known, or the agent must learn how an unknown environment works.',
      'Taxi driving is typically partially observable, multiagent, stochastic, sequential, dynamic, and continuous; its current percept does not reveal the whole traffic state.',
      'Chess with a clock is fully observable, multiagent, deterministic, sequential, semidynamic, and discrete: the board can stay fixed while time falls. Image analysis is a contrasting episodic task.',
      'Representation correction (pp. 21–22): discrete means distinct/countable possibilities; it need not mean finite. Known rules may describe stochastic outcomes, so known is not synonymous with deterministic or fully observable.',
      'Decision infographic (p. 25): ask what can be sensed, whether outcomes can be predicted, whether choices affect later episodes, what changes during deliberation, how values are represented, who else acts, and whether rules are known. Nondeterministic outcomes need not have assigned probabilities.',
    ],
    bulletPointsAr: [
      'قابلية الملاحظة: كاملة أو جزئية؛ والملاحظة الجزئية ممكن تحتاج ذاكرة. الشريحة بتذكر كمان انعدام الملاحظة (مفيش مستشعرات). الملاحظة الكاملة تخص المعلومات المهمة لاختيار الفعل، مش كل حقيقة في الكون.',
      'أبعاد تانية: وكيل واحد أو عدة وكلاء؛ حتمية أو احتمالية؛ حلقية مستقلة أو متتابعة.',
      'الوقت والتمثيل: ثابتة أو ديناميكية أو شبه ديناميكية؛ ومتقطعة أو مستمرة.',
      'المعرفة: قواعد البيئة ونتائج الأفعال معروفة، أو إن الـ Agent محتاج يتعلم إزاي البيئة المجهولة بتشتغل.',
      'قيادة التاكسي غالبًا جزئية الملاحظة ومتعددة الوكلاء واحتمالية ومتتابعة وديناميكية ومستمرة؛ الإدراك الحالي مش بيكشف حالة المرور كلها.',
      'الشطرنج مع ساعة كامل الملاحظة ومتعدد الوكلاء وحتمي ومتتابع وشبه ديناميكي ومتقطع: اللوحة ممكن تفضل ثابتة والوقت يقل. تحليل الصور مثال مختلف لمهمة حلقية مستقلة.',
      'تصحيح التمثيل في ص 21–22: المتقطع معناه احتمالات متميزة وقابلة للعد، ومش لازم تكون محدودة العدد. القواعد المعروفة ممكن توصف نتائج احتمالية؛ فالمعروف مش مرادف للحتمي أو كامل الملاحظة.',
      'رسم القرار في صفحة 25: اسأل إيه اللي تقدر تدركه، وهل النتيجة متوقعة، وهل الاختيار بيأثر على حلقات بعدين، وإيه اللي بيتغير أثناء التفكير، وإزاي القيم ممثلة، ومين كمان بيتصرف، وهل القواعد معروفة. النتائج غير الحتمية مش لازم يكون ليها احتمالات محددة.',
    ],
    keyRule: 'Match the design to the task. Sequential consequences often motivate planning, but do not prove that every rational agent must search; the lecture’s reflex vacuum is a counterexample under its assumptions. Source: pp. 19–26.',
    keyRuleAr: 'اختار التصميم حسب المهمة. النتائج المتتابعة غالبًا بتشجع التخطيط، لكنها مش دليل إن كل وكيل عقلاني لازم يبحث؛ مكنسة رد الفعل في المحاضرة مثال مضاد مع افتراضاتها. المصدر: ص 19–26.',
    experimentIds: ['ai-environments'],
  },
];

ai2Sections.push(
  sourceSection('5. PEAS Examples from the Source Tables', '5. أمثلة PEAS من جداول المصدر',
    'The email and other-agent tables describe concrete tasks. In each row below, the order is Performance; Environment; Actuators; Sensors. A displayed recommendation is an action even when the system does not physically administer treatment.',
    'جداول البريد والوكلاء التانيين بتوصف مهام محددة. ترتيب كل صف هنا: الأداء؛ البيئة؛ المشغّلات؛ المستشعرات. عرض توصية يعتبر فعل حتى لو النظام مش بينفّذ العلاج جسديًا.', [
      ['Spam filtering: minimize false positives/negatives; user account and mail server; mark/move/delete messages; incoming messages and account information.', 'تصفية البريد المزعج: قلّل التصنيفات الإيجابية والسلبية الغلط؛ حساب المستخدم وخادم البريد؛ علّم الرسائل وانقلها واحذفها؛ الرسائل الواردة ومعلومات الحساب.'],
      ['Medical diagnosis: patient health and reduced cost; patient/hospital/staff; display diagnoses, tests, and treatments; touchscreen/voice entry of symptoms and findings.', 'التشخيص الطبي: صحة المريض وتقليل التكلفة؛ المريض والمستشفى والطاقم؛ عرض التشخيصات والفحوصات والعلاجات؛ إدخال الأعراض والنتايج باللمس أو الصوت.'],
      ['Satellite image analysis: correct object/terrain categories; orbiting satellite/downlink/weather; display scene classification; high-resolution digital camera.', 'تحليل صور الأقمار: تصنيف صحيح للأجسام والتضاريس؛ القمر في مداره والوصلة الهابطة والطقس؛ عرض تصنيف المشهد؛ كاميرا رقمية عالية الدقة.'],
      ['Part-picking robot: proportion of parts in correct bins; conveyor/parts/bins; jointed arm and hand; camera, tactile, and joint-angle sensors.', 'روبوت التقاط القطع: نسبة القطع في الصناديق الصحيحة؛ السير والقطع والصناديق؛ ذراع بمفاصل ويد؛ كاميرا ومستشعرات لمس وزوايا المفاصل.'],
      ['Refinery controller: purity/yield/safety; refinery/materials/operators; valves/pumps/heaters/stirrers/displays; temperature/pressure/flow/chemical sensors.', 'متحكم المصفاة: النقاء والإنتاج والأمان؛ المصفاة والخامات والمشغّلين؛ صمامات ومضخات وسخانات وخلاطات وشاشات؛ مستشعرات حرارة وضغط وتدفق ومواد كيميائية.'],
      ['English tutor: student test score; students/testing agency; exercises/feedback/speech output; keyboard and voice input.', 'مدرّس English: درجة الطالب في الاختبار؛ الطلاب وجهة الاختبار؛ تمارين وتغذية راجعة وكلام؛ إدخال بالكيبورد والصوت.'],
    ], 'Keep the measure of success separate from the mechanism of action. Source: AI-2 pp. 17–18; the bin-picking photo illustrates the robot row.',
    'فرّق بين مقياس النجاح ووسيلة تنفيذ الفعل. المصدر: AI-2 ص 17–18؛ وصورة التقاط القطع بتوضح صف الروبوت.'),
  sourceSection('6. The Ten Task-Environment Classifications', '6. تصنيفات بيئات المهام العشرة',
    'These are the classifications printed on p. 23, under the slide’s task assumptions. Each row follows observability; agents; determinism; episode structure; dynamics; representation. A different task boundary or performance measure can change a classification.',
    'دي التصنيفات المطبوعة في صفحة 23 حسب افتراضات مهام الشريحة. ترتيب كل صف: الملاحظة؛ الوكلاء؛ الحتمية؛ طبيعة الحلقات؛ الديناميكية؛ التمثيل. تغيير حدود المهمة أو مقياس الأداء ممكن يغيّر التصنيف.', [
      ['Crossword: full; single; deterministic; sequential; static; discrete.', 'الكلمات المتقاطعة: كاملة؛ واحد؛ حتمية؛ متتابعة؛ ثابتة؛ متقطعة.'],
      ['Chess with a clock: full; multiple/competitive; deterministic; sequential; semidynamic; discrete.', 'الشطرنج بساعة: كاملة؛ متعددون متنافسون؛ حتمية؛ متتابعة؛ شبه ديناميكية؛ متقطعة.'],
      ['Poker: partial; multiple/competitive; stochastic; sequential; static; discrete.', 'الـ Poker: جزئية؛ متعددون متنافسون؛ احتمالية؛ متتابعة؛ ثابتة؛ متقطعة.'],
      ['Backgammon: full; multiple/competitive; stochastic; sequential; static; discrete.', 'الطاولة: كاملة؛ متعددون متنافسون؛ احتمالية؛ متتابعة؛ ثابتة؛ متقطعة.'],
      ['Taxi: partial; multiple/partly cooperative; stochastic; sequential; dynamic; continuous.', 'التاكسي: جزئية؛ متعددون ومتعاونون جزئيًا؛ احتمالية؛ متتابعة؛ ديناميكية؛ مستمرة.'],
      ['Medical diagnosis: partial; single; stochastic; sequential; dynamic; continuous.', 'التشخيص الطبي: جزئية؛ واحد؛ احتمالية؛ متتابعة؛ ديناميكية؛ مستمرة.'],
      ['Image analysis: full; single; deterministic; episodic; semidynamic; continuous. Its time-dependent score motivates the semidynamic label.', 'تحليل الصور: كاملة؛ واحد؛ حتمية؛ حلقات مستقلة؛ شبه ديناميكية؛ مستمرة. مقياس الأداء المرتبط بالوقت هو مبرر وصفها شبه ديناميكية.'],
      ['Part picking: partial; single; stochastic; episodic; dynamic; continuous.', 'التقاط القطع: جزئية؛ واحد؛ احتمالية؛ حلقات مستقلة؛ ديناميكية؛ مستمرة.'],
      ['Refinery: partial; single; stochastic; sequential; dynamic; continuous.', 'المصفاة: جزئية؛ واحد؛ احتمالية؛ متتابعة؛ ديناميكية؛ مستمرة.'],
      ['English tutor: partial; multiple/cooperative; stochastic; sequential; dynamic; discrete.', 'مدرّس English: جزئية؛ متعددون متعاونون؛ احتمالية؛ متتابعة؛ ديناميكية؛ متقطعة.'],
    ], 'Explain each label from the defined task rather than memorizing the application name alone. Source: AI-2 p. 23.',
    'فسّر كل وصف من المهمة المحددة بدل ما تحفظ اسم التطبيق لوحده. المصدر: AI-2 صفحة 23.'),
  sourceSection('7. Additional Examples & Model Assumptions', '7. أمثلة إضافية وافتراضات النموذج',
    'The image-only table on p. 24 adds eight examples. It explicitly uses question marks and alternative labels; preserve those uncertainties. “Static” is judged during deliberation in the chosen model, not throughout the real activity.',
    'الجدول الموجود كصورة في صفحة 24 بيضيف 8 أمثلة. فيه علامات استفهام وتصنيفات بديلة صراحةً؛ حافظ على عدم اليقين ده. الثبات بيتحدد أثناء التفكير في النموذج المختار، مش طول النشاط الحقيقي.', [
      ['Soccer: partial; multiagent; stochastic; sequential; dynamic; continuous.', 'كرة القدم: جزئية؛ متعدد؛ احتمالية؛ متتابعة؛ ديناميكية؛ مستمرة.'],
      ['Titan subsurface exploration: partial; “single?”; stochastic; sequential; dynamic; continuous.', 'استكشاف باطن Titan: جزئية؛ «واحد؟»؛ احتمالية؛ متتابعة؛ ديناميكية؛ مستمرة.'],
      ['Used-book shopping online: partial; “single?”; deterministic; sequential; static; discrete. These labels assume a fixed shopping model, not changing real inventory or competing buyers.', 'شراء كتب مستعملة أونلاين: جزئية؛ «واحد؟»؛ حتمية؛ متتابعة؛ ثابتة؛ متقطعة. الأوصاف دي بتفترض نموذج شراء ثابت، مش مخزون حقيقي بيتغير أو مشترين متنافسين.'],
      ['Tennis match: full; multiagent; stochastic; episodic/sequential; dynamic; continuous. Wall practice changes multiagent to single-agent in the table.', 'مباراة التنس: كاملة؛ متعدد؛ احتمالية؛ حلقات مستقلة أو متتابعة؛ ديناميكية؛ مستمرة. التدريب قدّام حائط بيغيّر متعدد الوكلاء لواحد في الجدول.'],
      ['High jump: full; single; stochastic; sequential; static; continuous. Knitting: full; single; deterministic; sequential; static; continuous.', 'القفز العالي: كاملة؛ واحد؛ احتمالية؛ متتابعة؛ ثابتة؛ مستمرة. التريكو: كاملة؛ واحد؛ حتمية؛ متتابعة؛ ثابتة؛ مستمرة.'],
      ['Auction bidding: full; multiagent; stochastic/strategic; sequential; static; discrete. Strategic uncertainty comes from other agents’ choices.', 'المزايدة: كاملة؛ متعدد؛ احتمالية أو استراتيجية؛ متتابعة؛ ثابتة؛ متقطعة. عدم اليقين الاستراتيجي بييجي من اختيارات الوكلاء التانيين.'],
    ], 'Question-mark entries and task-dependent alternatives are unresolved classifications in the source, not errors to silently fill. Source: AI-2 p. 24.',
    'علامات الاستفهام والبدائل المرتبطة بالمهمة تصنيفات غير محسومة في المصدر؛ ما تملاش فراغها من عندك. المصدر: AI-2 صفحة 24.'),
);

const ai3Sections: SummarySection[] = [
  {
    title: '1. Why Agents Search',
    titleAr: '١. ليه الوكلاء بيستخدموا البحث؟',
    content: 'A problem-solving agent uses search to find an action sequence that reaches a goal. It first formulates a goal and a problem, then explores candidate paths before carrying out a solution.',
    contentAr: 'الـ Problem-Solving Agent بيستخدم البحث عشان يلاقي تسلسل أفعال يوصّله لهدف. الأول بيحدد الهدف والمشكلة، وبعدها بيستكشف مسارات محتملة قبل ما ينفّذ الحل.',
    bulletPoints: [
      'A goal describes a desirable state; a problem formulation makes the route to that state explicit.',
      'Search is useful when no single immediate action is guaranteed to reach the goal.',
      'Abstraction removes irrelevant real-world detail while retaining the states, actions, and costs needed for the task.',
      'A solution is an action sequence; its execution produces a path through states in the environment.',
      'Examples include finding a Romania road route, solving an 8-puzzle, and planning actions in vacuum world.',
      'Diagnostic tree (p. 7): branch on whether a car starts, the engine turns over, and lights come on to narrow a battery fault. The diagram contains unfinished “ask” branches, so it is an illustration rather than a complete diagnostic procedure.',
      'Applications (pp. 6–9): route/robot motion, chip routing and verification, resource/repair planning, protein design, language/translation, games, and speech. Offline search explores a model; only executing its actions changes the world. Model errors can invalidate a plan.',
    ],
    bulletPointsAr: [
      'الهدف بيوصف حالة مرغوبة، وصياغة المشكلة بتوضح الطريق اللي ممكن يوصل للحالة دي.',
      'البحث بيفيد لما مفيش فعل فوري واحد مضمون إنه يوصل للهدف.',
      'الـ Abstraction بتشيل تفاصيل العالم الحقيقي اللي مش مهمة، وبتسيب الحالات والأفعال والتكاليف اللي المهمة محتاجاها.',
      'الحل هو تسلسل أفعال، وتنفيذه بيعمل مسار بين حالات البيئة.',
      'أمثلة: إيجاد طريق بين مدن رومانيا، وحل لغز 8-puzzle، والتخطيط في عالم المكنسة.',
      'شجرة التشخيص في صفحة 7: اسأل هل العربية بتشتغل، وهل المحرك بيلف، وهل الأنوار بتنور عشان تضيق احتمالات عطل البطارية. الرسم فيه فروع «اسأل» مش مكتملة؛ فهو توضيح، مش إجراء تشخيص كامل.',
      'التطبيقات في ص 6–9: الطرق وحركة الروبوتات، وتوصيل الشرائح والتحقق منها، وتخطيط الموارد والإصلاح، وتصميم البروتين، واللغة والترجمة، والألعاب والكلام. البحث قبل التنفيذ بيستكشف نموذج؛ تنفيذ الأفعال بس هو اللي بيغيّر العالم. خطأ النموذج ممكن يبطل الخطة.',
    ],
    keyRule: 'Goal formulation says where to go; search finds a sequence for getting there.',
    keyRuleAr: 'صياغة الهدف بتحدد هنوصل لفين، والبحث بيلاقي تسلسل الأفعال اللي يوصلنا.',
  },
  {
    title: '2. Formulate the Search Problem',
    experimentIds: ['ai-eight-puzzle'],
    titleAr: '٢. صياغة مشكلة البحث',
    content: 'A search problem makes the state space and the rules for reaching a goal explicit. Its core components are an initial state, actions, a transition model, a goal test, and a path-cost function.',
    contentAr: 'مشكلة البحث بتوضح فضاء الحالات والقواعد اللي بتوصل للهدف. مكوّناتها الأساسية هي الحالة الابتدائية، والأفعال، ونموذج الانتقال، واختبار الهدف، ودالة تكلفة المسار.',
    bulletPoints: [
      'Initial state identifies where the search begins; actions specify the choices available in a state.',
      'Transition model RESULT(s, a) gives the state that results from taking action a in state s.',
      'The goal test checks whether a state satisfies the target condition.',
      'Path cost adds action costs along a route, allowing solutions to be compared by total cost.',
      'Romania (pp. 12–13): initial city Arad; actions follow adjacent roads; results are destination cities; goal is Bucharest; step costs are road distances. Static, observable, single-agent, discrete, deterministic labels describe this fixed map, not live traffic.',
      '8-puzzle (p. 14): source start rows are [7,2,4], [5,blank,6], [8,3,1]; goal rows are [1,2,3], [4,5,6], [7,8,blank]. Move the blank up/down/left/right only within the board; every move costs 1. The existing studio uses the same goal with easier supplementary starts.',
      'Vacuum graph (pp. 15–16): state = location × dirt configuration, so 2 × 2² = 8 states, or n × 2^n for n binary-dirt locations. Left at A, Right at B, and Suck in a clean room are self-loops. The goal/path-cost text is clipped on p. 15; the two-clean-room goal with unit costs is a stated teaching completion, not recovered missing slide text.',
    ],
    bulletPointsAr: [
      'الحالة الابتدائية بتحدد نقطة البداية، والأفعال بتحدد الاختيارات المتاحة في كل حالة.',
      'نموذج الانتقال RESULT(s, a) بيحدد الحالة الناتجة من تنفيذ الفعل a في الحالة s.',
      'اختبار الهدف بيتأكد إن الحالة حققت الشرط المطلوب.',
      'تكلفة المسار بتجمع تكاليف الأفعال على الطريق عشان نقارن الحلول بالتكلفة الكلية.',
      'رومانيا في ص 12–13: البداية Arad؛ الأفعال بتتبع الطرق المجاورة؛ النتيجة مدينة الوصول؛ الهدف Bucharest؛ وتكلفة الخطوة مسافة الطريق. أوصاف ثابتة وكاملة الملاحظة ووكيل واحد ومتقطعة وحتمية تخص الخريطة الثابتة دي، مش المرور الحي.',
      'الـ 8-puzzle في صفحة 14: صفوف البداية في المصدر [7,2,4] و[5,blank,6] و[8,3,1]؛ وصفوف الهدف [1,2,3] و[4,5,6] و[7,8,blank]. حرّك الفراغ فوق أو تحت أو شمال أو يمين داخل اللوحة بس؛ كل حركة تكلفتها 1. الاستوديو الحالي بيستخدم نفس الهدف مع بدايات إضافية أسهل.',
      'رسم المكنسة في ص 15–16: الحالة = المكان × توزيع الأوساخ؛ يعني 2 × 2² = 8 حالات، أو n × 2^n لما فيه n أماكن بأوساخ ثنائية. Left عند A وRight عند B وSuck في غرفة نضيفة انتقالات لنفس الحالة. نص الهدف والتكلفة مقصوص في صفحة 15؛ هدف الغرفتين النضيفتين والتكلفة 1 استكمال تعليمي معلن، مش نص مفقود اتقرأ من الشريحة.',
    ],
    keyRule: 'State the start, legal actions, results, goal condition, and path cost before choosing an algorithm.',
    keyRuleAr: 'قبل اختيار الخوارزمية، حدّد البداية والأفعال والنتائج وشرط الهدف وتكلفة المسار.',
  },
  {
    title: '3. State-Space Graphs & Search Trees',
    experimentIds: ['ai-search-states'],
    titleAr: '٣. رسم فضاء الحالات وشجرة البحث',
    content: 'A state-space graph represents possible world states and transitions. A search tree records the paths an algorithm has generated; distinct tree nodes may refer to the same underlying state.',
    contentAr: 'رسم فضاء الحالات بيمثل حالات العالم والانتقالات الممكنة بينها. شجرة البحث بتسجل المسارات اللي الخوارزمية ولّدتها؛ وممكن عقد مختلفة في الشجرة تشير لنفس الحالة الفعلية.',
    bulletPoints: [
      'A state describes the world; a search node additionally stores a parent, the action, depth, and path cost.',
      'Different action sequences can reach the same state, so a tree may contain repeated state descriptions.',
      'The frontier (fringe) contains generated nodes waiting to be expanded.',
      'An explored set can prevent repeatedly expanding states in cyclic state spaces.',
      'Graph/tree figures (pp. 18–19): one graph state can have multiple incoming paths; each search-tree record has one parent. A four-state cyclic graph may unfold into an infinite tree; a finite acyclic graph may still have many different paths.',
      'Cost-aware duplicate handling (p. 20): compare state descriptions, and replace a frontier record if the same state is reached more cheaply. A single visited flag on first generation is sufficient for unit-cost FIFO BFS, but not for general UCS.',
    ],
    bulletPointsAr: [
      'الـ State بتوصف العالم؛ أما عقدة البحث فبتخزن كمان الأب والفعل والعمق وتكلفة المسار.',
      'تسلسلات أفعال مختلفة ممكن توصل لنفس الحالة، فالشجرة ممكن تضم أوصاف حالات متكررة.',
      'الـ Frontier أو الـ Fringe فيها العقد اللي اتولدت ولسه مستنية التوسيع.',
      'مجموعة الحالات المستكشفة ممكن تمنع توسيع نفس الحالة كذا مرة في فضاء فيه دورات.',
      'رسوم الشجرة والـ Graph في ص 18–19: حالة واحدة في الرسم ممكن يوصلها مسارات كتير؛ كل سجل في شجرة البحث ليه أب واحد. رسم دوري من 4 حالات ممكن يتحول لشجرة لا نهائية؛ ورسم محدود من غير دورات ممكن يفضل فيه مسارات مختلفة كتير.',
      'التعامل مع التكرار حسب التكلفة في صفحة 20: قارن أوصاف الحالات، واستبدل سجل الـ Frontier لو وصلت لنفس الحالة بتكلفة أقل. علامة زيارة عند أول توليد تكفي للـ FIFO BFS بتكلفة موحدة، لكنها مش كفاية للـ UCS العامة.',
    ],
    keyRule: 'A state is a world configuration; a node is a record in one particular search path.',
    keyRuleAr: 'الـ State هي وصف لحالة العالم؛ والـ Node سجل في مسار بحث معين.',
  },
  {
    title: '4. Tree Search & Frontier Order',
    titleAr: '٤. البحث في الشجرة وترتيب الـ Frontier',
    content: 'Tree-search algorithms repeatedly remove one node from the frontier, test or expand it, and add its successors. The search strategy is defined by which frontier node is selected next.',
    contentAr: 'خوارزميات البحث في الشجرة بتكرر اختيار عقدة من الـ Frontier، وفحصها أو توسيعها، وإضافة خلفائها. استراتيجية البحث بتتحدد بالعقدة اللي بتختارها من الـ Frontier بعد كده.',
    bulletPoints: [
      'Expanding a node applies its available actions and creates successor nodes using the transition model.',
      'Breadth-first search uses FIFO order; depth-first search uses LIFO order.',
      'DFS follows one branch deeply, then backtracks when it cannot continue.',
      'Source animation (pp. 25–36): the finite binary tree contains 1–15, with successors 2n and 2n+1 where present, and green goal 13. Left-first removals are 1,2,4,8,9,5,10,11,3,6,12,13; solution path is 1 → 3 → 6 → 13.',
      'Separate sheet exercise (p. 37): goal 11 gives removals 1,2,4,8,9,5,10,11 and path 1 → 2 → 5 → 11. The studio’s goal-11 preset matches this exercise, not the goal-13 animation.',
      'Frontier snapshots for goal 13: [1] → [2,3] → [4,5,3] → [8,9,5,3] → [9,5,3] → [5,3] → [10,11,3] → [11,3] → [3] → [6,7] → [12,13,7] → [13,7]. Pop/test the goal before expanding its children.',
      'Strategy taxonomy (p. 23): uninformed methods use legal actions, goal tests, and costs without a heuristic estimate. Greedy/best-first and A* are named informed methods; “uninformed” does not mean ignoring all state information.',
    ],
    bulletPointsAr: [
      'توسيع العقدة بيطبّق الأفعال المتاحة وبيكوّن عقد خلفاء باستخدام نموذج الانتقال.',
      'الـ BFS بتستخدم ترتيب FIFO، والـ DFS بتستخدم ترتيب LIFO.',
      'الـ DFS بتكمل في فرع لعمق كبير، وبترجع للخلف لما متقدرش تكمل.',
      'الشرح المصوّر في ص 25–36: الشجرة الثنائية المحدودة فيها 1–15، وخلفاء n هما 2n و2n+1 لو موجودين، والهدف الأخضر 13. السحب مع اختيار الشمال الأول: 1,2,4,8,9,5,10,11,3,6,12,13؛ ومسار الحل 1 ← 3 ← 6 ← 13.',
      'تمرين الشيت المنفصل في صفحة 37: الهدف 11 بيدي سحب 1,2,4,8,9,5,10,11 ومسار 1 ← 2 ← 5 ← 11. إعداد الهدف 11 في الاستوديو مطابق للتمرين ده، مش للشرح المصوّر بهدف 13.',
      'لقطات الـ Frontier للهدف 13: [1] ← [2,3] ← [4,5,3] ← [8,9,5,3] ← [9,5,3] ← [5,3] ← [10,11,3] ← [11,3] ← [3] ← [6,7] ← [12,13,7] ← [13,7]. اسحب الهدف واختبره قبل توسيع أبنائه.',
      'تصنيف الاستراتيجيات في صفحة 23: الطرق غير الموجهة بتستخدم الأفعال القانونية واختبار الهدف والتكلفة من غير تقدير Heuristic. الشريحة بتسمّي Greedy وBest-first وA* طرق موجهة؛ غير الموجه مش معناه تجاهل كل معلومات الحالة.',
    ],
    keyRule: 'The frontier is the same idea across algorithms; the selection order changes the search.',
    keyRuleAr: 'الـ Frontier موجودة في كل الخوارزميات؛ ترتيب الاختيار هو اللي بيغيّر البحث.',
  },
];

const ai4Sections: SummarySection[] = [
  {
    title: '1. Uninformed Search & Evaluation',
    titleAr: '١. البحث غير الموجّه والتقييم',
    experimentIds: ['search-visualizer'],
    content: 'Uninformed (blind) search uses the problem definition but no extra estimate of how close a state is to the goal. Compare strategies by completeness, time, space, and optimality.',
    contentAr: 'البحث غير الموجّه بيستخدم تعريف المشكلة من غير تقدير إضافي لقرب الحالة من الهدف. قارن الاستراتيجيات بالاكتـمال والوقت والمساحة والأمثلية.',
    bulletPoints: [
      'Completeness asks whether the strategy finds a solution whenever one exists under its assumptions.',
      'Time and space describe the number of generated nodes and how many must be stored.',
      'Optimality asks whether the returned solution has the lowest path cost.',
      'BFS expands shallowest nodes and can safely test a generated goal early when step costs are equal; the frontier rule distinguishes BFS, DFS, and UCS.',
    ],
    bulletPointsAr: [
      'الاكتمال بيسأل هل الاستراتيجية هتلاقي حل كل ما يكون فيه حل، مع مراعاة شروطها.',
      'الوقت والمساحة بيوصفوا عدد العقد اللي بتتولد وعدد العقد اللي لازم تتخزن.',
      'الأمثلية بتسأل هل الحل اللي رجعته أقل حل في تكلفة المسار.',
      'الـ BFS بتوسّع الأقل عمقًا وممكن تختبر الهدف عند توليده لما تكاليف الخطوات متساوية؛ وقاعدة الـ Frontier بتفرّق بين BFS وDFS وUCS.',
    ],
    keyRule: 'Evaluate a search method on all four properties—not only whether it reaches the goal.',
    keyRuleAr: 'قيّم طريقة البحث بالخصائص الأربعة، مش بس بقدرتها على الوصول للهدف.',
  },
  {
    title: '2. BFS, DFS & UCS Mechanics',
    titleAr: '٢. آلية BFS وDFS وUCS',
    experimentIds: ['bfs-queue-lab', 'dfs-stack-lab'],
    content: 'The three uninformed methods differ mainly in how they order the frontier. BFS prefers shallow nodes, DFS prefers the deepest node, and UCS prefers the node with the lowest accumulated path cost g(n).',
    contentAr: 'الطرق الثلاثة بتختلف أساسًا في ترتيب الـ Frontier. الـ BFS بتختار العقدة الأقل عمقًا، والـ DFS بتختار الأعمق، والـ UCS بتختار أقل عقدة في تكلفة المسار المتراكمة g(n).',
    bulletPoints: [
      'BFS uses a FIFO queue and expands level by level; with equal step costs it is optimal.',
      'DFS uses a LIFO stack and follows one branch deeply; it can use much less memory than BFS.',
      'UCS uses a priority queue ordered by cumulative path cost, not by depth.',
      'UCS tests for a goal when the lowest-cost node is removed for expansion; stopping when it is first generated can miss a cheaper route.',
      'BFS animation (pp. 11–23): its green goal is 13 in the finite 1–15 tree; dequeue/goal-test order is 1 through 13 and the solution path is 1 → 3 → 6 → 13. Goal 11 belongs to the separate p. 36 exercise.',
      'Weighted figure (p. 25): root children cost 5 and 2; the right child produces a cost-3 descendant. Removal costs are 0,2,3,5,6(goal), while the solution goes through the left cost-5 child. Expansion history is not the solution path; bracketed numbers are g(n), not node IDs.',
    ],
    bulletPointsAr: [
      'الـ BFS بتستخدم طابور FIFO وبتوسّع مستوى بمستوى؛ وبتكون مثالية لو تكلفة كل خطوة متساوية.',
      'الـ DFS بتستخدم مكدس LIFO وبتتبع فرع بعمق؛ وممكن تحتاج ذاكرة أقل بكتير من BFS.',
      'الـ UCS بتستخدم Priority Queue مرتبة حسب تكلفة المسار المتراكمة، مش حسب العمق.',
      'الـ UCS بتختبر الهدف لما العقدة الأقل تكلفة تتشال للتوسيع؛ إيقافها عند توليد الهدف ممكن يفوّت طريق أرخص.',
      'شرح BFS المصوّر في ص 11–23: الهدف الأخضر 13 في شجرة 1–15 المحدودة؛ ترتيب السحب واختبار الهدف من 1 لحد 13، ومسار الحل 1 ← 3 ← 6 ← 13. الهدف 11 يخص تمرين صفحة 36 المنفصل.',
      'الرسم الموزون في صفحة 25: تكلفة ابني الجذر 5 و2؛ والابن اليمين بيولّد حفيد بتكلفة 3. تكاليف السحب 0,2,3,5,6(الهدف)، لكن مسار الحل بيعدّي بابن الشمال بتكلفة 5. سجل التوسيع مش هو مسار الحل؛ الأرقام بين الأقواس g(n)، مش أسماء العقد.',
    ],
    keyRule: 'BFS orders by depth; UCS orders by g(n); DFS orders by recency (last in, first out).',
    keyRuleAr: 'الـ BFS بترتب حسب العمق، والـ UCS حسب g(n)، والـ DFS حسب الأحدث دخولًا (LIFO).',
  },
  {
    title: '3. Completeness, Cost & Complexity',
    titleAr: '٣. الاكتمال والتكلفة والتعقيد',
    experimentIds: ['ucs-priority-lab'],
    content: 'The guarantees of each strategy depend on branching, depth, and step costs. Let b be the maximum branching factor, m the maximum depth, C* the cheapest solution cost, and ε a positive lower bound on step cost.',
    contentAr: 'ضمانات كل استراتيجية بتعتمد على التفرّع والعمق وتكاليف الخطوات. خلّي b أكبر عامل تفرّع، وm أقصى عمق، وC* تكلفة أرخص حل، وε أقل تكلفة موجبة للخطوة.',
    bulletPoints: [
      'BFS is complete with finite branching and a finite-depth goal; equal positive step costs are a sufficient condition for optimality. The p. 30 early-generation-test convention gives O(b^s) time/space for shallowest depth s, assuming b > 1; testing on removal can generate an extra tier and give O(b^(s+1)).',
      'DFS has O(b^m) time and O(bm) space in the standard tree-search analysis; it is not optimal and may fail in infinite-depth spaces.',
      'UCS is complete and optimal with finite branching, finite optimal cost C*, and step costs at least ε > 0. Page 31 uses the simplified O(b^(C*/ε)); the generation-inclusive bound is O(b^(1 + floor(C*/ε))) for time and space.',
      'When all edge costs are equal, UCS and BFS expand nodes in the same cost/depth order.',
      'Numerical table (p. 32): b=10, s=5, m=10, ε=1 gives dominant-term estimates 10^5 for BFS/UCS and 10^10 time versus 100 space for tree DFS. These are asymptotic illustrations, not exact visit counts.',
      'Figure correction (p. 33): the Romania route sums 450 and 418 km are supported by the map. Its “64 nodes” and “4096 nodes” are complexity illustrations, not measured search traces; the 4096 exponent lacks a stated ε that justifies it for the pictured roads.',
      'Finite graph qualification: UCS/Dijkstra can handle zero-cost edges with correct duplicate/cost handling, but arbitrary infinite zero-cost paths invalidate the usual completeness guarantee. DFS with cycle checking is complete in a finite reachable space, not in every infinite space.',
    ],
    bulletPointsAr: [
      'الـ BFS كاملة مع تفرّع محدود وهدف بعمق محدود؛ تساوي التكاليف الموجبة شرط كافٍ للأمثلية. اصطلاح اختبار الهدف المبكر عند التوليد في صفحة 30 بيدي وقت ومساحة O(b^s) لعمق أقرب حل s، بافتراض b > 1؛ الاختبار عند السحب ممكن يولّد طبقة إضافية ويدي O(b^(s+1)).',
      'في تحليل شجرة البحث المعتاد، وقت DFS هو O(b^m) ومساحتها O(bm)؛ وهي مش مثالية وممكن تفشل مع عمق لا نهائي.',
      'الـ UCS كاملة ومثالية مع تفرّع محدود وتكلفة حل مثالي محدودة C* وتكلفة خطوة على الأقل ε > 0. صفحة 31 بتستخدم التبسيط O(b^(C*/ε))؛ والحد اللي بيحسب التوليد هو O(b^(1 + floor(C*/ε))) للوقت والمساحة.',
      'لما كل الحواف تكلفتها متساوية، UCS وBFS بيوسّعوا العقد بنفس ترتيب التكلفة والعمق.',
      'الجدول العددي في صفحة 32: b=10 وs=5 وm=10 وε=1 بيدّوا تقديرات الحد الغالب 10^5 للـ BFS والـ UCS، ووقت 10^10 مقابل مساحة 100 للـ Tree DFS. دي أمثلة تقاربية، مش أعداد زيارة دقيقة.',
      'تصحيح رسم صفحة 33: مجموعا طريق رومانيا 450 و418 كم مدعومان بالخريطة. «64 عقدة» و«4096 عقدة» أمثلة تعقيد، مش تتبع بحث مقاس؛ وأسّ 4096 مفيش ε معلنة تبرره للطرق المرسومة.',
      'توضيح الرسم المحدود: UCS وDijkstra ممكن يتعاملوا مع حواف تكلفتها صفر لو التعامل مع التكرار والتكلفة صحيح، لكن مسارات لا نهائية بتكلفة صفر بتلغي ضمان الاكتمال المعتاد. DFS مع فحص الدورات كاملة في فضاء وصول محدود، مش في كل فضاء لا نهائي.',
    ],
    keyRule: 'UCS needs a positive minimum step cost for its completeness guarantee.',
    keyRuleAr: 'ضمان اكتمال UCS محتاج أقل تكلفة خطوة تكون موجبة.',
  },
  {
    title: '4. Repeated States & Worked Traces',
    titleAr: '٤. الحالات المتكررة وتتبع الحل',
    experimentIds: ['search-visualizer', 'ucs-priority-lab'],
    content: 'Graph search avoids wasting work on states that have already been reached. The lecture traces both route costs and node order to show why a strategy’s frontier rule matters.',
    contentAr: 'البحث في الرسم البياني بيتجنب تكرار الشغل على حالات وصلنا لها قبل كده. المحاضرة بتتبع تكلفة الطرق وترتيب العقد عشان توضح أهمية قاعدة ترتيب الـ Frontier.',
    bulletPoints: [
      'BFS can discard a newly generated state if it has already been generated; DFS can check the current path or all generated states.',
      'For Arad to Bucharest, BFS returns a shallow route of 450 km, while UCS finds a lower-cost route of 418 km.',
      'The 418 km UCS route is Arad → Sibiu → Rimnicu Vilcea → Pitesti → Bucharest.',
      'Route arithmetic (pp. 24,26,33): BFS follows Arad → Sibiu → Fagaras → Bucharest, 140+99+211=450 km (3 edges); UCS follows 140+80+97+101=418 km (4 edges). Pending costs include Craiova 366 and Dobreta 384 before Bucharest 418.',
      'Original p. 36 tree: A→{B,C,D,E}; B→{F,G}; C→H; D→{I,J}; G→{K,L}; I→M; J→N; L→O. With left-first children, unit costs, FIFO ties and goal testing on removal, BFS/UCS removals are A,B,C,D,E,F,G,H,I,J,K,L,M,N,O; DFS removals are A,B,F,G,K,L,O; path A → B → G → L → O has 4 edges.',
      'Unspecified costs: p. 36 prints no edge weights, so its UCS trace is conditional on the explicit unit-cost assumption. A goal removed and tested is a visited node; it need not be expanded. Different goal-test timing changes the counted work.',
      'On the binary DFS exercise, the left-first visit order toward goal 11 is 1, 2, 4, 8, 9, 5, 10, 11.',
    ],
    bulletPointsAr: [
      'الـ BFS ممكن تستبعد حالة اتولدت قبل كده؛ والـ DFS ممكن تراجع المسار الحالي أو كل الحالات اللي اتولدت.',
      'في مسار Arad إلى Bucharest، الـ BFS بترجع طريق أقصر في عدد الخطوات تكلفته 450 كم، بينما UCS بتلاقي طريق أقل تكلفة بمقدار 418 كم.',
      'طريق UCS بتكلفة 418 كم هو Arad ← Sibiu ← Rimnicu Vilcea ← Pitesti ← Bucharest.',
      'حساب الطرق في ص 24 و26 و33: BFS بتتبع Arad ← Sibiu ← Fagaras ← Bucharest، بتكلفة 140+99+211=450 كم (3 حواف)؛ UCS بتتبع 140+80+97+101=418 كم (4 حواف). التكاليف المنتظرة بتشمل Craiova 366 وDobreta 384 قبل Bucharest 418.',
      'شجرة صفحة 36 الأصلية: A←{B,C,D,E}؛ B←{F,G}؛ C←H؛ D←{I,J}؛ G←{K,L}؛ I←M؛ J←N؛ L←O. مع اختيار الشمال أولًا وتكلفة موحدة وتعادل FIFO واختبار الهدف عند السحب، سحب BFS وUCS هو A,B,C,D,E,F,G,H,I,J,K,L,M,N,O؛ وسحب DFS هو A,B,F,G,K,L,O؛ والمسار A ← B ← G ← L ← O فيه 4 حواف.',
      'تكاليف غير محددة: صفحة 36 مفيهاش أوزان للحواف؛ فتتبع UCS مشروط بافتراض التكلفة الموحدة المعلن. سحب الهدف واختباره بيحسب زيارة، ومش لازم يحسب توسيع. تغيير توقيت اختبار الهدف بيغيّر كمية الشغل المحسوبة.',
      'في تمرين DFS الثنائي، ترتيب الزيارة ناحية الهدف 11 مع اختيار اليسار الأول هو 1، 2، 4، 8، 9، 5، 10، 11.',
    ],
    keyRule: 'A shallowest solution is not necessarily the least-cost solution.',
    keyRuleAr: 'الحل الأقل عمقًا مش لازم يكون هو الحل الأقل تكلفة.',
  },
];

const ai2Terms: TermDefinition[] = [
  { term: 'Agent', termAr: 'الـ Agent', definition: 'A system that perceives and acts in an environment.', definitionAr: 'نظام بيدرك البيئة وبيتصرف فيها.' },
  { term: 'Percept', termAr: 'الـ Percept', definition: 'The agent’s immediate sensory input.', definitionAr: 'المدخل الحسي الحالي للـ Agent.' },
  { term: 'Agent function', termAr: 'الـ Agent Function', definition: 'An abstract mapping from percept sequences to actions.', definitionAr: 'تحويل مجرد من تسلسلات الإدراك إلى أفعال.' },
  { term: 'Agent program', termAr: 'الـ Agent Program', definition: 'The concrete implementation of the agent function.', definitionAr: 'التنفيذ الفعلي للـ Agent Function.' },
  { term: 'Rational agent', termAr: 'الـ Rational Agent', definition: 'An agent that chooses actions expected to maximize performance.', definitionAr: 'وكيل بيختار أفعال يُتوقع إنها تحسّن الأداء.' },
  { term: 'PEAS', termAr: 'الـ PEAS', definition: 'Performance, Environment, Actuators, and Sensors.', definitionAr: 'مقياس الأداء والبيئة والمشغّلات والمستشعرات.' },
  { term: 'Semidynamic', termAr: 'شبه ديناميكية', definition: 'The environment itself stays fixed while the performance measure changes over time.', definitionAr: 'البيئة نفسها بتفضل ثابتة بينما مقياس الأداء بيتغير مع الوقت.' },
];

const ai3Terms: TermDefinition[] = [
  { term: 'Search problem', termAr: 'مشكلة البحث', definition: 'A formal description of states, actions, transitions, a goal, and path costs.', definitionAr: 'وصف رسمي للحالات والأفعال والانتقالات والهدف وتكاليف المسارات.' },
  { term: 'State space', termAr: 'فضاء الحالات', definition: 'The set of states reachable in the problem and their transitions.', definitionAr: 'مجموعة الحالات الممكن الوصول لها والانتقالات بينها.' },
  { term: 'Transition model', termAr: 'نموذج الانتقال', definition: 'A rule such as RESULT(s, a) that returns the successor state.', definitionAr: 'قاعدة زي RESULT(s, a) بترجع الحالة الناتجة.' },
  { term: 'Goal test', termAr: 'اختبار الهدف', definition: 'A test that determines whether a state satisfies the goal.', definitionAr: 'اختبار بيحدد هل الحالة حققت الهدف.' },
  { term: 'Path cost', termAr: 'تكلفة المسار', definition: 'The sum of action costs along a path.', definitionAr: 'مجموع تكاليف الأفعال على المسار.' },
  { term: 'Frontier', termAr: 'الـ Frontier', definition: 'Generated search nodes that have not yet been expanded.', definitionAr: 'عقد البحث اللي اتولدت ولسه متوسّعتش.' },
  { term: 'Explored set', termAr: 'مجموعة الحالات المستكشفة', definition: 'States already considered, tracked to avoid repeated work.', definitionAr: 'حالات اتفحصت وبتتسجل لتجنب تكرار الشغل.' },
];

const ai4Terms: TermDefinition[] = [
  { term: 'Uninformed search', termAr: 'البحث غير الموجّه', definition: 'Search that uses no estimate of distance to the goal.', definitionAr: 'بحث مبيستخدمش تقدير للمسافة للهدف.' },
  { term: 'Breadth-first search', termAr: 'البحث بالعرض BFS', definition: 'Expands the shallowest frontier node first using FIFO order.', definitionAr: 'بيوسّع أقل عقدة في العمق باستخدام ترتيب FIFO.' },
  { term: 'Depth-first search', termAr: 'البحث بالعمق DFS', definition: 'Expands the deepest frontier node first using LIFO order.', definitionAr: 'بيوسّع أعمق عقدة باستخدام ترتيب LIFO.' },
  { term: 'Uniform-cost search', termAr: 'البحث الأقل تكلفة UCS', definition: 'Expands the frontier node with the lowest accumulated path cost.', definitionAr: 'بيوسّع عقدة الـ Frontier الأقل في تكلفة المسار المتراكمة.' },
  { term: 'Completeness', termAr: 'الاكتمال', definition: 'Whether a strategy finds a solution whenever one exists.', definitionAr: 'هل الاستراتيجية بتلاقي حل كل ما يكون فيه حل.' },
  { term: 'Optimality', termAr: 'الأمثلية', definition: 'Whether a strategy finds a lowest-cost solution.', definitionAr: 'هل الاستراتيجية بتلاقي الحل الأقل تكلفة.' },
  { term: 'Repeated state', termAr: 'حالة متكررة', definition: 'A state reached by a path when it has already been generated or explored.', definitionAr: 'حالة وصل لها مسار بعد ما تكون اتولدت أو اتفحصت قبل كده.' },
];

const ai2Cheats: CheatSheetItem[] = [
  { en: 'Agent = Architecture + Agent Program.', ar: 'الـ Agent = الـ Architecture + الـ Agent Program.' },
  { en: 'Agent function: percept sequence → action.', ar: 'الـ Agent Function: تسلسل الإدراك ← فعل.' },
  { en: 'Rationality uses performance, prior knowledge, available actions, and percept history.', ar: 'العقلانية بتعتمد على الأداء والمعرفة السابقة والأفعال المتاحة وتاريخ الإدراك.' },
  { en: 'Simple reflex: current percept + condition–action rule.', ar: 'الـ Simple Reflex: الإدراك الحالي + قاعدة شرط وفعل.' },
  { en: 'PEAS = Performance, Environment, Actuators, Sensors.', ar: 'PEAS = مقياس الأداء والبيئة والمشغّلات والمستشعرات.' },
  { en: 'Environment dimensions include observable, agent count, deterministic, episodic, dynamic, discrete, and known.', ar: 'أبعاد البيئة تشمل الملاحظة وعدد الوكلاء والحتمية والحلقية والديناميكية والتقطّع والمعرفة.' },
  { en: 'Semidynamic: world fixed, performance measure changes with time.', ar: 'شبه ديناميكية: العالم ثابت ومقياس الأداء بيتغير مع الوقت.' },
];

const ai3Cheats: CheatSheetItem[] = [
  { en: 'Search problem = initial state + actions + transition model + goal test + path cost.', ar: 'مشكلة البحث = الحالة الابتدائية + الأفعال + نموذج الانتقال + اختبار الهدف + تكلفة المسار.' },
  { en: 'RESULT(s, a) returns the state reached by action a from state s.', ar: 'RESULT(s, a) بترجع الحالة الناتجة من الفعل a في الحالة s.' },
  { en: 'A solution is an action sequence that reaches a goal.', ar: 'الحل هو تسلسل أفعال بيوصل للهدف.' },
  { en: 'A state-space graph models configurations; a search tree models explored paths.', ar: 'رسم فضاء الحالات بيمثل التكوينات؛ وشجرة البحث بتمثل المسارات المستكشفة.' },
  { en: 'A node stores path details; a state describes the world.', ar: 'الـ Node بتخزن تفاصيل المسار؛ والـ State بتوصف العالم.' },
  { en: 'Frontier = generated, unexpanded nodes.', ar: 'الـ Frontier = عقد اتولدت ولسه متوسعتش.' },
  { en: 'DFS uses LIFO; binary successors are 2n and 2n+1.', ar: 'الـ DFS بتستخدم LIFO؛ وخلفاء الشجرة الثنائية هما 2n و2n+1.' },
];

const ai4Cheats: CheatSheetItem[] = [
  { en: 'BFS: FIFO, shallowest first, optimal only with equal step costs.', ar: 'الـ BFS: ترتيب FIFO، الأقل عمقًا أولًا، ومثالية بس مع تساوي تكاليف الخطوات.' },
  { en: 'DFS: LIFO, deepest first, low memory, not optimal.', ar: 'الـ DFS: ترتيب LIFO، الأعمق أولًا، ذاكرة قليلة، ومش مثالية.' },
  { en: 'UCS: lowest g(n) first; goal-test when removed for expansion.', ar: 'الـ UCS: أقل g(n) أولًا؛ واختبار الهدف عند سحب العقدة للتوسيع.' },
  { en: 'Completeness, time, space, and optimality are separate evaluation criteria.', ar: 'الاكتمال والوقت والمساحة والأمثلية معايير تقييم منفصلة.' },
  { en: 'BFS and UCS are optimal under their respective cost assumptions.', ar: 'الـ BFS والـ UCS مثاليتان مع افتراضات التكلفة المناسبة لكل واحدة.' },
  { en: 'UCS needs a positive minimum step cost ε for its standard completeness guarantee.', ar: 'الـ UCS محتاجة أقل تكلفة خطوة موجبة ε لضمان الاكتمال المعتاد.' },
  { en: 'Graph search tracks repeated states to avoid cycles and duplicate work.', ar: 'البحث في الرسم البياني بيتابع الحالات المتكررة عشان يتجنب الدورات وتكرار الشغل.' },
];


import type { Question } from '../types';

const extraAiQuestions: Record<string, Question[]> = {
  'ai-lec-2': [
    {
      id: 'q-ai2-11', courseId: 'ai', lectureId: 'ai-lec-2', type: 'essay',
      question: 'Formalize the PEAS framework for an Automated Taxi Driver: specify Performance measure, Environment, Actuators, and Sensors, and discuss the inherent tradeoffs between safety, speed, and profitability.',
      questionAr: 'صف إطار PEAS الرسمي لتاكسي ذاتي القيادة: حدد معيار الأداء (P)، والبيئة (E)، والمشغلات (A)، والمستشعرات (S)، وناقش المفاضلات الحتمية بين الأمان والسرعة والربحية.',
      correctAnswer: 'Automated Taxi Driver PEAS formalization and trade-offs.',
      modelAnswer: '1. Performance Measure (P): Safe travel (zero collisions), fast arrival, legal operation (respecting traffic laws), passenger comfort, and maximum trip profit. 2. Environment (E): Roads, highways, pedestrian crossings, other vehicular traffic, traffic police, weather conditions (rain, fog), and paying passengers. 3. Actuators (A): Steering wheel assembly, accelerator throttle, hydraulic brakes, turn signals, headlights, horn, voice synthesizer, and dashboard UI display. 4. Sensors (S): Video cameras, radar, LiDAR, GPS receiver, speedometer, engine sensors, accelerometer, and interior microphone/touchscreen. 5. Tradeoffs: Strict safety and comfort (gentle braking, lower speeds) may increase travel time, while maximizing speed risks traffic fines or collisions; a rational agent must balance expected utility across these competing objectives.',
      modelAnswerAr: '1. معيار الأداء (P): الأمان (عدم وقوع حوادث)، وسرعة الوصول، والالتزام بالقوانين المرورية، وراحة الركاب، وتعظيم الربح المالي. 2. البيئة (E): شوارع المدينة، والطرق السريعة، والمشاة، والسيارات الأخرى، وشرطة المرور، والطقس المتغير، والركاب. 3. المشغلات (A): عجلة القيادة، ودواسة الوقود، والفرامل، وإشارات الانعطاف، والبوق، ومكبرات الصوت، وشاشة العرض. 4. المستشعرات (S): كاميرات الفيديو، والرادار، والليدار (LiDAR)، ونظام GPS، ومقياس السرعة، ومستشعرات المحرك، وشاشة اللمس. 5. المفاضلات: الأمان والراحة التامة (كالقيادة الحذرة والسرعة الهادئة) تزيد من زمن الرحلة، بينما التسرع يعرض الركاب للخطر والمخالفات؛ لذا يوازن الوكيل العقلاني بين هذه الأهداف المتضاربة.',
      keyPoints: ['P: safety, speed, legality, comfort, profit', 'E: roads, traffic, pedestrians, weather', 'A: steering, throttle, brakes, signals, display', 'S: cameras, radar, GPS, speedometer', 'Tradeoffs between safety and trip speed/profit']
    },
    {
      id: 'q-ai2-12', courseId: 'ai', lectureId: 'ai-lec-2', type: 'essay',
      question: 'Detail the architectural progression across the four agent programs: Simple Reflex, Model-based Reflex, Goal-based, and Utility-based agents, explaining what internal state each maintains.',
      questionAr: 'فصل التدرج المعماري بين برامج الوكلاء الأربعة: الوكيل الانعكاسي البسيط، والوكيل المعتمد على النموذج، والوكيل المعتمد على الأهداف، والوكيل المعتمد على المنفعة، موضحاً الحالة الداخلية لكل منها.',
      correctAnswer: 'Four agent program architectures and their internal states.',
      modelAnswer: '1. Simple Reflex Agent: Selects actions based solely on the current percept using condition-action rules (IF car-in-front-brakes THEN brake). It maintains zero internal state and fails in partially observable environments. 2. Model-based Reflex Agent: Maintains internal state tracking how the world evolves independently of the agent and how the agent actions affect the world. This internal world model allows decision-making in partially observable environments. 3. Goal-based Agent: Combines the world model with explicit goal information. Rather than hardcoded reactive rules, it uses search and planning to evaluate which sequence of future actions will lead to the desired goal state. 4. Utility-based Agent: Employs a real-valued utility function to quantify how desirable particular states are. It handles conflicting goals (e.g. speed vs safety) and trades off likelihood of success against importance of goals under uncertainty.',
      modelAnswerAr: '1. الوكيل الانعكاسي البسيط (Simple Reflex): يقرر الفعل بناءً على المدرك اللحظي الحالي فقط باستخدام قواعد (شرط - فعل) مباشرة دون أي ذاكرة داخلية؛ ويفشل في البيئات الملاحظة جزئياً. 2. الوكيل المعتمد على النموذج (Model-based Reflex): يحتفظ بحالة داخلية تسجل كيف يتطور العالم وكيف تؤثر أفعاله فيه؛ مما يمكنه من العمل في البيئات الملاحظة جزئياً باستنتاج ما لا يراه حالياً. 3. الوكيل المعتمد على الأهداف (Goal-based): يدمج نموذج العالم مع أهداف واضحة؛ ويستخدم خوارزميات البحث والتخطيط للمفاضلة بين مسارات الأفعال المستقبلية التي تحقق الهدف. 4. الوكيل المعتمد على المنفعة (Utility-based): يستخدم دالة منفعة رياضية لتقييم مدى جودة كل حالة؛ مما يتيح له الموازنة بين الأهداف المتضاربة (مثل السرعة مقابل الأمان) واختيار أفضل خطة تحت ظروف عدم اليقين.',
      keyPoints: ['Simple reflex: condition-action rules without internal state', 'Model-based: internal state modeling unseen world aspects', 'Goal-based: uses search/planning to achieve explicit goals', 'Utility-based: quantifies desirability and resolves conflicting goals']
    },
    {
      id: 'q-ai2-13', courseId: 'ai', lectureId: 'ai-lec-2', type: 'essay',
      question: 'Classify the task environments for 1) Chess with a clock, 2) Poker, 3) Automated Taxi Driving, and 4) Medical Image Diagnosis across the 6 dimensions: Observability, Agents, Determinism, Episodic, Dynamism, and Continuity.',
      questionAr: 'صنف بيئات المهام التالية: 1) الشطرنج بساعة، 2) لعبة البوكر، 3) قيادة التاكسي، 4) تشخيص الصور الطبية، عبر الأبعاد الستة: الملاحظة، عدد الوكلاء، الحتمية، التتابع، الديناميكية، والاتصال.',
      correctAnswer: 'Task environment classification across 6 dimensions for 4 domains.',
      modelAnswer: '1. Chess with Clock: Fully observable (entire board visible), Multi-agent (adversarial competitive), Deterministic (rules specify outcomes without dice), Sequential (moves affect future states), Semi-dynamic (board does not change while thinking, but clock ticks down), Discrete (finite board squares and pieces). 2. Poker: Partially observable (opponent cards hidden), Multi-agent (competitive), Stochastic (random card dealing), Sequential (betting rounds affect future pot), Static (cards do not change while player decides), Discrete (discrete card values and chips). 3. Automated Taxi Driving: Partially observable (blind spots, hidden traffic), Multi-agent (pedestrians, other drivers), Stochastic (unpredictable human behavior, weather), Sequential (driving actions have persistent future effects), Dynamic (traffic continuously changes while computing), Continuous (speed, steering angle, time are continuous). 4. Medical Image Diagnosis: Fully observable (the image pixels are fully available), Single-agent (diagnosing the given image), Deterministic (the image contents do not change randomly), Episodic (each independent patient scan is a self-contained episode), Static (image does not change during analysis), Discrete/Continuous (pixel grids with continuous intensity values).',
      modelAnswerAr: '1. الشطرنج مع ساعة: كاملة الملاحظة (الرقعة كلها مكشوفة)، متعددة الوكلاء (تنافسية)، حتمية (القواعد قطعية)، تتابعية (الحركات تؤثر على المستقبل)، شبه ديناميكية (الرقعة ثابتة أثناء التفكير لكن الوقت ينفد)، منفصلة (مربعات وقطع محددة). 2. لعبة البوكر: جزئية الملاحظة (أوراق الخصوم مخفية)، متعددة الوكلاء، احتمالية (توزيع الأوراق عشوائي)، تتابعية (الرهانات تؤثر على الجولات القادمة)، ساكنة، منفصلة. 3. قيادة التاكسي: جزئية الملاحظة (زوايا عمياء وحركة سيارات مفاجئة)، متعددة الوكلاء، احتمالية، تتابعية، ديناميكية (المرور يتحرك باستمرار أثناء التفكير)، متصلة (السرعة وزاوية التوجيه قيم مستمرة). 4. تشخيص الصور الطبية: كاملة الملاحظة (الصورة متاحة بالكامل للتحليل)، وكيل منفرد، حتمية، مجزأة (Episodic - كل صورة فحص مستقل بذاته ولا يؤثر على المريض التالي)، ساكنة، منفصلة/متصلة.',
      keyPoints: ['Chess with clock: Fully, Multi, Det, Seq, Semi-dynamic, Discrete', 'Poker: Partially, Multi, Stoch, Seq, Static, Discrete', 'Taxi: Partially, Multi, Stoch, Seq, Dynamic, Continuous', 'Image Analysis: Fully, Single, Det, Episodic, Static']
    },
    {
      id: 'q-ai2-14', courseId: 'ai', lectureId: 'ai-lec-2', type: 'essay',
      question: 'Analyze the Vacuum World 8-state space: derive the total state count formula for n rooms, state why a Simple Reflex agent can get trapped in infinite loops without full observability, and explain how a Model-based agent overcomes this limitation.',
      questionAr: 'حلل فضاء حالات عالم المكنسة (Vacuum World) ذي الحالات الثمانية: استنتج قانون عدد الحالات لـ n غرفة، ووضح لماذا يسقط الوكيل الانعكاسي في حلقات مفرغة بدون ملاحظة كاملة، وكيف يتغلب الوكيل المعتمد على النموذج على ذلك.',
      correctAnswer: 'Vacuum world state derivation, reflex failure, model-based solution.',
      modelAnswer: '1. State Space Derivation: A state is defined by the robot location multiplied by the binary dirt status of each room. For 2 rooms (A and B), the robot can be in 2 positions, and each room is either Clean or Dirty (2^2 = 4 configurations). Total state space = 2 * 2^2 = 8 distinct world states. For n binary-dirt rooms, the general formula is n * 2^n states. 2. Simple Reflex Failure: If the agent sensors detect only the local room dirt status but not which room it is in (partially observable), a simple reflex agent has rules: [Dirty -> Suck, Clean -> Move]. If both rooms are cleaned, the agent in Room A sees Clean and moves Right to Room B; in Room B it sees Clean and moves Left to Room A, oscillating in an infinite useless loop. 3. Model-based Solution: A model-based agent maintains an internal world model with state variables: [Room_A_Status: Clean, Room_B_Status: Clean, Current_Location: B]. When it perceives clean in Room B and its model records that Room A is already clean, it infers the entire environment is cleaned and executes NoOp, terminating correctly.',
      modelAnswerAr: '1. استنتاج فضاء الحالات: تتحدد الحالة بموقع الروبوت مضروباً في حالة نظافة كل غرفة. لغرفتين (A و B)، يمتلك الروبوت موقعين محتملين، وكل غرفة إما نظيفة أو متسخة (2² = 4 احتمالات). إذن إجمالي الحالات = 2 × 2² = 8 حالات متميزة. ولـ n غرفة تصبح المعادلة العامة n × 2ⁿ حالة. 2. فشل الوكيل الانعكاسي البسيط: إذا كان الحساس يرى نظافة الغرفة الحالية فقط دون معرفة اسم الغرفة (ملاحظة جزئية)، وقواعده هي [اتساخ -> اشفط، نظيفة -> تحرك]. بعد تنظيف الغرفتين، يرى الغرفة نظيفة فيتحرك يميناً، وفي الغرفة الثانية يراها نظيفة فيتحرك يساراً، ويدخل في حلقة تذبذب لا نهائية. 3. تفوق الوكيل المعتمد على النموذج: يحتفظ الوكيل بسجل داخلي: [الغرفة A: نظيفة، الغرفة B: نظيفة]. عندما يرى الغرفة B نظيفة، يرجع لنموذجه الداخلي فيكتشف أن الغرفة A تم تنظيفها مسبقاً، فيدرك أن كامل البيئة أصبحت نظيفة ويتوقف عن الحركة (NoOp).',
      keyPoints: ['State space formula: n * 2^n (8 states for 2 rooms)', 'Simple reflex oscillates in infinite loops in partially observable clean environments', 'Model-based agent maintains internal memory of room statuses to stop appropriately']
    }
  ],
  'ai-lec-3': [
    {
      id: 'q-ai3-11', courseId: 'ai', lectureId: 'ai-lec-3', type: 'essay',
      question: 'Formulate the 5 formal components of a Search Problem for the Romania route-finding task (Arad to Bucharest), explaining the role of Abstraction in simplifying real-world road networks.',
      questionAr: 'صغ المكونات الرسمية الخمسة لمسألة البحث لمسار رومانيا (من Arad إلى Bucharest)، موضحاً دور التجريد (Abstraction) في تبسيط شبكات الطرق الحقيقية.',
      correctAnswer: 'Romania 5 components formulation and Abstraction role.',
      modelAnswer: '1. Initial State: In(Arad) - the agent begins in the city of Arad. 2. Actions: ACTIONS(s) returns the set of legal roads leading to adjacent connected cities (e.g. from Arad: Go(Zerind), Go(Sibiu), Go(Timisoara)). 3. Transition Model: RESULT(s, a) returns the resulting state (e.g. RESULT(In(Arad), Go(Sibiu)) = In(Sibiu)). 4. Goal Test: Checks if the current state satisfies the target destination: state == In(Bucharest). 5. Path Cost: Sum of road step costs c(s, a, s) representing highway kilometer distances (e.g. Arad to Sibiu = 140 km). 6. Role of Abstraction: Abstraction intentionally eliminates irrelevant real-world complexities (weather, road color, roadside scenery, potholes, vehicle brand) while preserving the essential topological states, actions, and distances necessary to construct a valid navigation route.',
      modelAnswerAr: '1. الحالة الابتدائية (Initial State): In(Arad) - وجود الوكيل في مدينة أراد. 2. الأفعال (Actions): الطرق المتاحة المؤدية لمدن مجاورة مباشرة (من أراد: الذهاب إلى زيريندا أو سيبيو أو تيميشوارا). 3. دالة الانتقال (Transition Model): الحالة الناتجة من تنفيذ الفعل، مثل RESULT(In(Arad), Go(Sibiu)) = In(Sibiu). 4. اختبار الهدف (Goal Test): فحص هل المدينة الحالية هي بوخارست (state == In(Bucharest)). 5. تكلفة المسار (Path Cost): مجموع المسافات الكيلومترية بين المدن على طول المسار (مثل 140 كم بين أراد وسيبيو). 6. دور التجريد (Abstraction): إزالة كافة التفاصيل الدقيقة غير المؤثرة في القرار (كلون السيارات، وتعرجات الأسفلت، والمشاهد الجانبية) والاحتفاظ فقط بالمدن والمسافات والاتصالات الضرورية لبناء مسار ملاحة سليم.',
      keyPoints: ['Initial state: In(Arad)', 'Actions: Go to adjacent cities', 'Transition: RESULT(s, a) = adjacent city', 'Goal test: state == In(Bucharest)', 'Path cost: sum of road distances', 'Abstraction removes irrelevant physical details']
    },
    {
      id: 'q-ai3-12', courseId: 'ai', lectureId: 'ai-lec-3', type: 'essay',
      question: 'Analyze the 8-Puzzle problem formulation: calculate the total permutation count, explain the Inversion Parity Invariant, and explain why an arbitrary configuration has exactly a 50% chance of being solvable.',
      questionAr: 'حلل صياغة مسألة لغز البلاطات الثمانية (8-Puzzle): احسب إجمالي التباديل الممكنة، واشرح قاعدة زوجية الانعكاسات (Inversion Parity)، ووضح لماذا تمتلك أي لوحة عشوائية احتمالية 50% فقط للحل.',
      correctAnswer: '8-puzzle formulation, 9! / 2 states, inversion parity proof.',
      modelAnswer: '1. State Formulation: The 3x3 board contains 8 numbered tiles and 1 blank space. Total possible permutations of placing 9 distinct items across 9 squares is 9! = 362,880. Actions: Move the blank space Up, Down, Left, or Right within grid boundaries. Path Cost: 1 unit per move. 2. Inversion Parity Invariant: In an unwrapped 1D sequence of the tiles (ignoring the blank), an inversion is a pair of tiles (A, B) where A appears before B but A > B. Moving the blank horizontally does not change tile ordering; moving the blank vertically jumps a tile over exactly two other tiles, changing the inversion count by either +2, -2, or 0. Thus, legal moves strictly preserve the parity (evenness or oddness) of the inversion count. 3. Reachable States: The state space is partitioned into two mutually unreachable graphs of equal size: 9! / 2 = 181,440 even-parity states and 181,440 odd-parity states. An arbitrary random board has an even chance (50%) of matching the goal parity; an odd-parity start can never reach an even-parity goal.',
      modelAnswerAr: '1. صياغة المسألة: شبكة 3×3 تضم 8 بلاطات مرقمة ومربعاً فارغاً واحداً. إجمالي التباديل الرياضية لترتيب 9 عناصر في 9 خانات هو !9 = 362,880 حالة. الأفعال: تحريك الفراغ (أعلى، أسفل، يمين، يسار) داخل حدود اللوحة. تكلفة المسار: 1 لكل حركة. 2. ثابت زوجية الانعكاسات (Inversion Parity): عند فرد الأرقام في تسلسل خطي (مع تجاهل الفراغ)، الانعكاس هو أي زوج (A, B) حيث A يسبق B وقيمة A أكبر من B. تحريك الفراغ أفقياً لا يغير ترتيب الأرقام؛ وتحريكه رأسياً يقفز فوق رقمين بالضبط فيغير عدد الانعكاسات بمقدار +2 أو -2 أو 0. وبالتالي، الحركات القانونية تحافظ تماماً على صفة الزوجية أو الفردية لعدد الانعكاسات. 3. الحالات القابلة للحل: ينقسم فضاء الحالات إلى مجموعتين منفصلتين تماماً متساويتين في الحجم: !9 ÷ 2 = 181,440 حالة ذات زوجية متوافقة، ومثلها ذات زوجية مخالفة. بالتالي فإن أي لوحة عشوائية لديها احتمال 50% فقط للتوافق مع زوجية الهدف وإمكانية الوصول للحل.',
      keyPoints: ['Total permutations: 9! = 362,880', 'Inversion parity: vertical blank moves change inversions by 0, +2, or -2', 'Reachable state space is 9! / 2 = 181,440 states', '50% solvability: odd-parity starts cannot reach even-parity goal']
    },
    {
      id: 'q-ai3-13', courseId: 'ai', lectureId: 'ai-lec-3', type: 'essay',
      question: 'Distinguish rigorously between a World State and a Search Node, explaining why multiple distinct search nodes can correspond to the same underlying state, and compare Tree Search with Graph Search regarding cycle handling.',
      questionAr: 'فرق بدقة هندسية بين حالة العالم (World State) وعقدة البحث (Search Node)، موضحاً لماذا يمكن لعقد بحث متعددة أن تمثل نفس الحالة، وقارن بين بحث الشجرة وبحث الرسم من حيث معالجة الدورات والتكرار.',
      correctAnswer: 'State vs Node distinction and Tree vs Graph search comparison.',
      modelAnswer: '1. World State vs Search Node: A World State represents a physical configuration of the environment (e.g., In(Sibiu) or a specific 8-puzzle board layout). A Search Node is a bookkeeping data structure created by the search algorithm containing: node.STATE (the state it represents), node.PARENT (pointer to node that generated it), node.ACTION (action applied to parent), node.PATH_COST g(n) (cumulative cost from root), and node.DEPTH. Multiple distinct search nodes frequently represent the identical world state because different paths reach the same configuration (e.g. Arad -> Sibiu vs Arad -> Zerind -> Oradea -> Sibiu are two distinct nodes both representing In(Sibiu)). 2. Tree Search vs Graph Search: Standard Tree Search generates new child nodes for every expanded branch without checking if the state was already visited. On state spaces with loops or reversible actions (like Go(Arad) -> Go(Sibiu) -> Go(Arad)), tree search creates duplicate paths and can enter infinite loops. Graph Search augments tree search with an Explored Set (Closed List) of visited states; if a newly generated node contains a state already in the explored set or frontier, it is discarded, guaranteeing termination in finite state spaces.',
      modelAnswerAr: '1. حالة العالم مقابل عقدة البحث: حالة العالم (State) تصف التكوين الفيزيائي للبيئة (مثل التواجد في مدينة سيبيو أو شكل لوحة الأرقام). أما عقدة البحث (Node) فهي بنية بيانات برمجية ينشئها الخوارزمي وتتكون من: الحالة التي تمثلها، ومؤشر إلى العقدة الأب، والفعل المنفذ، وتكلفة المسار التراكمية g(n)، وعمق العقدة. وبالتالي، يمكن لمسارات مختلفة أن تنتج عدة عقد بحث منفصلة تشير كلها لنفس حالة العالم الحقيقية (مثل الوصول لسيبيو مباشرة أو عبر زيريندا وأوراديا). 2. بحث الشجرة مقابل بحث الرسم: بحث الشجرة (Tree Search) يستمر في تفريع العقد دون فحص ما إذا كانت الحالة قد زيرت مسبقاً؛ مما يجعله يسقط في حلقات مفرغة لانهائية عند وجود مسارات دائرية أو أفعال عكسية. أما بحث الرسم (Graph Search) فيحتفظ بقائمة استكشاف (Explored Set / Closed List) تسجل الحالات التي تمت معالجتها؛ وعند توليد أي عقدة تمثل حالة مسجلة مسبقاً يتم تجاهلها فوراً، مما يمنع التكرار ويضمن التوقف في فضاءات الحالات المحدودة.',
      keyPoints: ['State = physical world configuration', 'Node = bookkeeping data structure with state, parent, action, path-cost g(n), depth', 'Multiple nodes represent identical state via different paths', 'Tree search fails on cycles; Graph search checks Explored Set to prevent duplicates']
    },
    {
      id: 'q-ai3-14', courseId: 'ai', lectureId: 'ai-lec-3', type: 'essay',
      question: 'Define the Frontier (Fringe) in search algorithms, and compare the underlying data structures, expansion disciplines, and queue behaviors of Breadth-First Search (BFS), Depth-First Search (DFS), and Uniform-Cost Search (UCS).',
      questionAr: 'عرف جبهة البحث (Frontier / Fringe) في خوارزميات البحث، وقارن بين هياكل البيانات المستخدمة، وسياسة التوسيع، وسلوك الطابور لكل من خوارزميات BFS و DFS و UCS.',
      correctAnswer: 'Frontier definition and FIFO vs LIFO vs Priority Queue comparison.',
      modelAnswer: '1. The Frontier (Fringe): The collection of all search leaf nodes that have been generated by expanding parent nodes but have not yet been expanded themselves. It forms the boundary between explored states and unexplored state space. 2. Breadth-First Search (BFS): Uses a First-In, First-Out (FIFO) Queue. Newly generated child nodes are enqueued at the back; nodes are dequeued from the front. This enforces shallowest-node-first expansion, exploring the tree level-by-level. 3. Depth-First Search (DFS): Uses a Last-In, First-Out (LIFO) Stack. Newly generated children are pushed onto the top of the stack and popped immediately. This enforces deepest-node-first expansion, plunging down the deepest branch before backtracking. 4. Uniform-Cost Search (UCS): Uses a Priority Queue ordered by cumulative path cost g(n). At each step, it dequeues the node with the minimum accumulated cost min(g(n)). This expands the lowest-cost path first, guaranteeing optimal solutions even when edge weights differ.',
      modelAnswerAr: '1. جبهة البحث (Frontier / Fringe): هي مجموعة كافة عقد البحث الورقية التي تم توليدها ولكن لم يتم توسيعها بعد؛ وتمثل الحد الفاصل بين فضاء الحالات المستكشف وفضاء الحالات المجهول. 2. البحث بالعرض (BFS): يستخدم طابوراً من نوع FIFO (يدخل أولاً يخرج أولاً). تضاف العقد الجديدة في نهاية الطابور وتُسحب من المقدمة؛ مما يفرض توسيع العقد الأقل عمقاً أولاً مستوى تلو الآخر. 3. البحث بالعمق (DFS): يستخدم مكدساً من نوع LIFO (يدخل آخراً يخرج أولاً). تضاف العقد في قمة المكدس وتُسحب فوراً؛ مما يفرض النزول في أقصى عمق للفرع قبل التراجع (Backtracking). 4. البحث الأقل تكلفة (UCS): يستخدم طابور أولوية (Priority Queue) مرتباً تصاعدياً حسب تكلفة المسار التراكمية g(n). في كل خطوة يسحب العقدة صاحبة أقل تكلفة متراكمة، مما يضمن الوصول للحل الأقل تكلفة على الإطلاق في الرسومات الموزونة.',
      keyPoints: ['Frontier represents generated nodes awaiting expansion', 'BFS uses FIFO queue expanding shallowest nodes first', 'DFS uses LIFO stack expanding deepest nodes first', 'UCS uses Priority Queue expanding minimum path cost g(n) first']
    }
  ],
  'ai-lec-4': [
    {
      id: 'q-ai4-11', courseId: 'ai', lectureId: 'ai-lec-4', type: 'essay',
      question: 'Trace search node visits on the finite binary tree 1–15 with left-first child expansion (2n, 2n+1): Detail the exact visit sequences and solution paths for 1) Goal 11 (worksheet problem 5), and 2) Goal 13 (lecture animation pp. 11–23), explaining why the slide animation and worksheet assign different targets.',
      questionAr: 'تتبع ترتيب زيارة العقد في الشجرة الثنائية المحدودة 1-15 مع التفرع للأبناء جهة اليسار أولاً (2n, 2n+1): وضح تسلسل الزيارة ومسار الحل لكل من: 1) الهدف 11 (مسألة الشيت 5)، و2) الهدف 13 (شرح السلايد ص 11-23)، مبيناً سبب اختلاف الهدف بين السلايد والشيت.',
      correctAnswer: 'Binary tree search traces for Goal 11 and Goal 13 explained.',
      modelAnswer: '1. Binary Tree Structure: Root is 1. Children of n are 2n and 2n+1. Level 0: [1]; Level 1: [2, 3]; Level 2: [4, 5, 6, 7]; Level 3: [8, 9, 10, 11, 12, 13, 14, 15]. 2. Case 1 - Goal 11 (Worksheet 4, Problem 5): (a) BFS: Expands level-by-level: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 (11 nodes removed/tested). Solution path: 1 -> 2 -> 5 -> 11 (cost/depth = 3). (b) DFS (left-first): Dives down left branches: 1 -> 2 -> 4 -> 8 -> 9 -> 5 -> 10 -> 11 (8 nodes removed/tested, 7 non-goal nodes expanded). Solution path: 1 -> 2 -> 5 -> 11. (c) UCS: With uniform costs, UCS matches BFS expansion: 1 through 11. 3. Case 2 - Goal 13 (Slide Presentation Animation pp. 11-23): In the animated lecture slides, the lecturer illustrates BFS with Goal 13. BFS dequeues nodes 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13. The solution path is 1 -> 3 -> 6 -> 13. 4. Discrepancy Resolution: The slide animation uses 13 to illustrate a right-subtree target in lecture presentation, whereas Worksheet 4 explicitly assigns Goal 11 as a student homework problem to test left-subtree depth exploration. Both targets are authentic and pedagogically valid.',
      modelAnswerAr: '1. بنية الشجرة الثنائية: الجذر 1، وأبناء n هما 2n و 2n+1. المستوى 0: [1]؛ المستوى 1: [2, 3]؛ المستوى 2: [4, 5, 6, 7]؛ المستوى 3: [8, 9, 10, 11, 12, 13, 14, 15]. 2. الحالة الأولى - الهدف 11 (مسألة الشيت الرسمية): (أ) BFS: يتوسع مستوى بمستوى: 1، 2، 3، 4، 5، 6، 7، 8، 9، 10، 11 (سحب واختبار 11 عقدة). مسار الحل: 1 ← 2 ← 5 ← 11 (العمق والتكلفة = 3). (ب) DFS (الشمال أولاً): يتعمق في أقصى اليسار: 1 ← 2 ← 4 ← 8 ← 9 ← 5 ← 10 ← 11 (سحب واختبار 8 عقد، وتوسيع 7 عقد غير الهدف). مسار الحل: 1 ← 2 ← 5 ← 11. (ج) UCS: مع التكاليف الموحدة يطابق ترتيب BFS تماماً من 1 إلى 11. 3. الحالة الثانية - الهدف 13 (شرح السلايد المصور ص 11-23): في السلايدات المصورة تشرح المحاضرة BFS باستهداف العقدة 13، فيسحب BFS العقد 1 حتى 13، ومسار الحل هو 1 ← 3 ← 6 ← 13. 4. حل التعارض الظاهري: الهدف 13 هو مثال الشرح المصور في السلايدات لتوضيح الوصول للجانب الأيمن، بينما الهدف 11 هو المسألة الرسمية المخصصة للشيت لاختبار مهارة الطالب في تتبع الشجرة اليسرى؛ وكلاهما صحيح وموثق في مكانه.',
      keyPoints: ['Goal 11 BFS visits 1 through 11 (11 nodes dequeued); path 1-2-5-11', 'Goal 11 DFS visits 1,2,4,8,9,5,10,11 (8 nodes dequeued); path 1-2-5-11', 'Goal 13 BFS visits 1 through 13; path 1-3-6-13', 'Discrepancy resolved: 13 in lecture slides animation vs 11 in worksheet problem']
    },
    {
      id: 'q-ai4-12', courseId: 'ai', lectureId: 'ai-lec-4', type: 'essay',
      question: 'Prove why standard Tree Depth-First Search (DFS) has linear space complexity O(bm) while Breadth-First Search (BFS) has exponential space complexity O(b^d), and explain why memory is the primary practical failure mode of BFS.',
      questionAr: 'أثبت رياضياً لماذا يمتلك بحث العمق (DFS) تعقيداً مكانياً خطياً O(bm) بينما يمتلك بحث العرض (BFS) تعقيداً مكانياً أسياً O(b^d)، ووضح لماذا تمثل الذاكرة نقطة الانهيار العملية الأساسية لـ BFS.',
      correctAnswer: 'DFS linear O(bm) vs BFS exponential O(b^d) memory proof.',
      modelAnswer: '1. BFS Space Complexity Proof: BFS expands all nodes at depth d before moving to depth d+1. At the shallowest goal depth d, the frontier contains all leaf nodes generated at that level, which is b^d nodes. Including internal nodes, total memory is O(b^d). For b=10, d=6, BFS must store 1,000,000 nodes; at d=10, it requires 10^10 nodes (terabytes of RAM). 2. DFS Space Complexity Proof: Standard Tree DFS follows a single path from the root down to the deepest leaf at depth m. At any instant, the stack needs only to store: (a) the active path from the root to the current node (m nodes), and (b) the unexplored sibling nodes at each level along that path ((b - 1) nodes per level). Total stored nodes = 1 + m(b - 1) = O(bm), which is strictly linear in maximum depth m. For b=10, m=10, DFS stores only ~91 nodes (kilobytes of RAM). 3. Memory as Fatal Bottleneck: Computer processors can continue computing for days or weeks (time bottleneck), but operating systems crash immediately when physical RAM and swap space are exhausted (memory bottleneck). Because BFS frontier grows exponentially, BFS runs out of RAM in minutes on realistic problems long before running out of compute time.',
      modelAnswerAr: '1. إثبات التعقيد المكاني لـ BFS: يستكشف BFS جميع عقد المستوى d بالكامل قبل الانتقال للمستوى التالي. عند الوصول لعمق الهدف d، تحتوي جبهة البحث (Frontier) على كافة العقد الورقية المولدة في هذا المستوى وعددها b^d عقدة. بإضافة العقد السابقة يصبح الحجم O(b^d). عند عامل تفرع b=10 وعمق d=6 يتطلب تخزين مليون عقدة، وعند d=10 يتطلب 10 مليار عقدة (تيرابايتات من الذاكرة). 2. إثبات التعقيد المكاني لـ DFS: يتتبع DFS مساراً واحداً متصلاً من الجذر حتى أقصى عمق m. وفي أي لحظة، لا يحتاج المكدس إلا لتخزين: (أ) العقد الواقعة على المسار الحالي من الجذر (m عقدة)، و (ب) العقد الشقيقة المتبقية في كل مستوى على طول هذا المسار (b - 1 عقدة لكل مستوى). إجمالي العقد = 1 + m(b - 1) = O(bm)، وهو تعقيد خطي تماماً مع أقصى عمق m. عند b=10 و m=10 لا يخزن DFS سوى 91 عقدة فقط (بضعة كيلوبايتات). 3. الذاكرة كعائق قاتل: يمكن للمعالجات الاستمرار في الحساب لساعات وأيام (عائق زمني)، لكن أنظمة التشغيل تنهار فوراً عند امتلاء الذاكرة العشوائية RAM (عائق مكاني). وبسبب النمو الأسي لجبهة BFS، ينفد الرام خلال دقائق معدودة متسبباً في توقف البرنامج قبل نفاد وقت المعالجة.',
      keyPoints: ['BFS stores full frontier tier: O(b^d) exponential memory', 'DFS stores only active path plus siblings: O(bm) linear memory', 'Numerical contrast: b=10, d=10 requires 10^10 nodes for BFS vs ~91 nodes for DFS', 'Memory exhausts within minutes causing system crash, making space the critical limit of BFS']
    },
    {
      id: 'q-ai4-13', courseId: 'ai', lectureId: 'ai-lec-4', type: 'essay',
      question: 'Explain why Uniform-Cost Search (UCS) tests the goal state only upon node removal from the frontier rather than upon node generation, and explain why step costs must satisfy c(s, a, s) >= epsilon > 0 for completeness.',
      questionAr: 'اشرح لماذا تختبر خوارزمية البحث الأقل تكلفة (UCS) الهدف فقط عند سحب العقدة من جبهة الانتظار وليس عند توليدها، ووضح لماذا يجب أن تحقق تكاليف الخطوات الشرط c(s, a, s) >= epsilon > 0 لضمان الاكتمال.',
      correctAnswer: 'UCS goal test on removal and epsilon step cost requirement.',
      modelAnswer: '1. Goal Test Upon Removal: UCS orders its frontier priority queue by cumulative path cost g(n). If UCS stopped immediately when a goal state was first generated (early goal test), it might accept an expensive direct path (e.g., S -> G costing 10) that was generated early, while a cheaper multi-step path (e.g., S -> A -> B -> G costing 1 + 2 + 1 = 4) was still waiting in the frontier with lower cumulative cost. By deferring the goal test until a node is removed from the priority queue (late goal test), UCS guarantees that all paths with total cost less than g(n) have already been explored and exhausted, proving optimality. 2. The Step Cost Bound epsilon > 0: To guarantee completeness in infinite or graph state spaces, every action must carry a strictly positive cost bounded away from zero by some small epsilon > 0. If zero-cost edges or infinitesimal step costs are allowed (e.g. step 1 = 1/2, step 2 = 1/4, step 3 = 1/8...), an infinite sequence of actions can have a finite sum without ever reaching the goal cost threshold, trapping UCS in an infinite expansion loop along a zero-cost cycle and breaking completeness.',
      modelAnswerAr: '1. اختبار الهدف عند السحب: يرتب UCS طابور الأولوية تصاعدياً حسب التكلفة التراكمية g(n). لو توقف الخوارزمي فور توليد الهدف (اختبار مبكر)، فقد يقبل مساراً مكلفاً ظهر مبكراً (مثل S إلى G بتكلفة 10)، بينما يوجد مسار بديل متعدد الخطوات أقل تكلفة (مثل S إلى A إلى B إلى G بتكلفة 1 + 2 + 1 = 4) لا يزال ينتظر في الطابور بتكلفة أقل. لكن بتأجيل فحص الهدف حتى سحبه من الطابور، يضمن الخوارزمي أن كافة المسارات ذات التكلفة الأقل قد تم فحصها واستبعادها بالكامل، مما يثبت قطعية الحل الأمثل. 2. شرط أن تكون التكلفة أكبر من epsilon > 0: لضمان اكتمال الخوارزمي وتوقفه عند الحل، يجب أن تكون تكلفة كل خطوة موجبة وأكبر من حد أدنى epsilon > 0. إذا سمحنا بخطوات ذات تكلفة صفرية أو متناهية الصغر، فيمكن للخوارزمي الدخول في مسار لانهائي من الخطوات مجموع تكاليفها لا يصل أبداً لتكلفة الهدف، مما يحبسه في حلقة مفرغة ويفقده ميزة الاكتمال.',
      keyPoints: ['Early goal test upon generation can accept sub-optimal path', 'Testing upon removal guarantees no cheaper path remains in frontier', 'Step cost c >= epsilon > 0 prevents infinite zero-cost loops and ensures completeness']
    },
    {
      id: 'q-ai4-14', courseId: 'ai', lectureId: 'ai-lec-4', type: 'essay',
      question: 'Contrast Early Goal Testing (upon node generation) with Late Goal Testing (upon node expansion/removal), explaining under what specific cost conditions early goal testing is safe, and demonstrate using a small 3-node weighted graph why it fails when edge weights are unequal.',
      questionAr: 'قارن بين اختبار الهدف المبكر (عند توليد العقدة) واختبار الهدف المتأخر (عند سحب وتوسيع العقدة)، موضحاً تحت أي شروط تكلفة يكون الاختبار المبكر آمناً، وأثبت باستخدام رسم بياني موزون من 3 عقد لماذا يفشل مع الأوزان غير المتساوية.',
      correctAnswer: 'Early vs Late goal testing and weighted graph failure demonstration.',
      modelAnswer: '1. Early Goal Test (Generation): Checks whether child == GOAL immediately when the child node is created by the transition function, before inserting it into the frontier. If true, search halts. Safe Condition: Early testing is safe and optimal ONLY when all step costs are identical and positive (e.g. unit-cost BFS). In unit-cost trees, any path generated at depth d is guaranteed to be shorter than or equal to all paths generated at depth d+1. Benefit: Saves generating and storing an entire extra level of b^(d+1) frontier nodes. 2. Late Goal Test (Removal / Expansion): The node is inserted into the frontier; the goal test runs only when the node is popped/dequeued for expansion. Required Condition: Mandatory for non-uniform step costs (UCS / Dijkstra) to preserve optimality. 3. Counterexample on 3-Node Weighted Graph: Consider nodes S (start), A, and G (goal). Edges: S -> G with weight 10; S -> A with weight 1; A -> G with weight 2. When expanding root S, child G is generated with cost 10 and child A is generated with cost 1. Under Early Goal Testing: The algorithm sees that generated child G is the goal and halts immediately, returning path S -> G with total cost 10 (SUB-OPTIMAL). Under Late Goal Testing: Both G (cost 10) and A (cost 1) enter the priority queue. Next, lowest-cost node A (cost 1) is dequeued. Expanding A generates G with cumulative cost 1 + 2 = 3, which is inserted into the queue. Next, G with cost 3 is dequeued and passes the goal test, returning optimal path S -> A -> G with cost 3.',
      modelAnswerAr: '1. اختبار الهدف المبكر (عند التوليد): يفحص هل العقدة الابن هي الهدف لحظة إنشائها مباشرة وقبل إضافتها للطابور، وإذا تحقق يتوقف فوراً. شرط الأمان: يكون الاختبار المبكر آمناً ومثالياً فقط عندما تكون جميع تكاليف الخطوات متساوية وموجبة (مثل BFS بتكلفة موحدة). في هذه الحالة، أي عقدة تتولد في العمق d مضمون أنها أقصر من أو تساوي أي عقدة تتولد في العمق d+1. الفائدة: يوفر توليد وتخزين مستوى كامل إضافي من العقد b^(d+1). 2. اختبار الهدف المتأخر (عند السحب): تضاف العقدة للطابور، ولا يُفحص شرط الهدف إلا عند سحبها للتوسيع. شرط الوجوب: إلزامي في الخوارزميات ذات التكاليف غير المتساوية (UCS و Dijkstra) لضمان الأمثلية. 3. مثال مضاد على رسم موزون من 3 عقد: افترض البداية S والهدف G وعقدة وسيطة A. الحواف: مسار مباشر S إلى G بوزن 10؛ ومسار S إلى A بوزن 1، ومن A إلى G بوزن 2. عند توسيع البداية S، يتولد G بتكلفة 10 ويتولد A بتكلفة 1. مع الاختبار المبكر: يرى الخوارزمي أن G هو الهدف فيتوقف فوراً ويعلن المسار S إلى G بتكلفة 10 (حل غير مثالي وفاشل). أما مع الاختبار المتأخر: يدخل G (تكلفة 10) و A (تكلفة 1) طابور الأولوية. يُسحب A أولاً لأنه الأقل تكلفة (1)؛ وتوسيعه يولد G بتكلفة تراكمية 1 + 2 = 3. في الخطوة التالية يُسحب G صاحب التكلفة 3 ويجتاز فحص الهدف، فيرجع المسار الأمثل S إلى A إلى G بتكلفة 3 فقط.',
      keyPoints: ['Early test runs on node generation; saves an entire tier of memory', 'Early test is optimal ONLY when all step costs are equal', 'Late test runs on node removal/expansion; mandatory for unequal edge weights', 'Counterexample: S->G (cost 10) vs S->A->G (cost 3) proves early test failure on weighted graphs']
    }
  ]
};

const makeLecture = (
  id: string,
  sections: SummarySection[],
  terms: TermDefinition[],
  cheatSheet: CheatSheetItem[],
  interactiveTools: string[],
  brief: string,
  briefAr: string,
): Lecture => {
  const existing = preserveLecture(id);
  return {
    ...existing,
    brief,
    briefAr,
    sections: sections.map((section, index) => ({
      ...section,
      quickCheck: existing.sections[index]?.quickCheck,
    })),
    terms,
    cheatSheet,
    interactiveTools,
    questions: [
      ...existing.questions.map(question => {
      switch (question.id) {
        case 'q-ai3-4': return { ...question,
          explanation: 'Supplementary mathematical clarification: of the 9! tile/blank permutations, exactly half are reachable from a fixed 3×3 goal because legal moves preserve inversion parity. AI-3 p. 14 gives the puzzle formulation; it does not print this calculation.',
          explanationAr: 'توضيح رياضي إضافي: من 9! ترتيبات للبلاطات والفراغ، نصفها بالضبط قابل للوصول من هدف ثابت 3×3 لأن الحركة القانونية بتحافظ على زوجية أو فردية الانعكاسات. AI-3 صفحة 14 بتعرض صياغة اللغز؛ مش بتطبع الحساب ده.' };
        case 'q-ai4-3': return { ...question,
          question: 'UCS is complete and optimal with finite branching, finite optimal solution cost, and every step cost at least ε > 0.',
          questionAr: 'UCS كاملة ومثالية مع تفرّع محدود وتكلفة حل مثالي محدودة، وتكلفة كل خطوة على الأقل ε > 0.',
          explanation: 'True under these assumptions (AI-4 p. 31). Arbitrary infinite zero-cost paths can prevent termination, so a general guarantee for every non-negative-cost state space is too strong.',
          explanationAr: 'صح مع الافتراضات دي (AI-4 صفحة 31). المسارات اللانهائية بتكلفة صفر ممكن تمنع التوقف؛ فضمان عام لكل فضاء بتكاليف غير سالبة ادعاء أوسع من اللازم.' };
        case 'q-ai4-5': return { ...question,
          question: 'The exponential frontier of BFS can make memory a major practical bottleneck in broadly branching search trees.',
          questionAr: 'الـ Frontier اللي بتزيد أُسّيًا في BFS ممكن تخلّي الذاكرة عائق عملي كبير في أشجار البحث واسعة التفرّع.',
          explanation: 'True: the frontier can grow exponentially with shallowest goal depth (AI-4 p. 30). Whether memory or execution time is exhausted first depends on the task and implementation; the slide does not establish a universal ordering.',
          explanationAr: 'صح: الـ Frontier ممكن تزيد أُسّيًا مع عمق أقرب هدف (AI-4 صفحة 30). الذاكرة ولا وقت التنفيذ يخلص الأول بيعتمد على المهمة والتنفيذ؛ والشريحة مش بتثبت ترتيب عام لكل الحالات.' };
        case 'q-ai4-9': return { ...question,
          explanation: 'True: without cycle checking, DFS can repeatedly follow a cycle and fail to terminate. This is a possibility, not a claim that every cyclic graph traps every DFS run. Source: AI-4 pp. 29,34.',
          explanationAr: 'صح: من غير فحص الدورات، DFS ممكن تكرر نفس الدورة وما تتوقفش. ده احتمال، مش ادعاء إن كل رسم دوري بيحبس كل تشغيل DFS. المصدر: AI-4 ص 29 و34.' };
        case 'q-ai4-10': return { ...question,
          question: 'In the finite binary tree 1–15, with left-first children 2n, 2n+1 and goal 11 tested on removal, which method visits fewer nodes?',
          questionAr: 'في الشجرة الثنائية المحدودة 1–15، مع أبناء 2n و2n+1 والشمال الأول والهدف 11 بيتختبر عند السحب، أنهي طريقة بتزور عقد أقل؟',
          options: ['DFS removes/tests 8 nodes; BFS removes/tests 11 nodes', 'BFS visits 3 nodes; DFS visits 50 nodes', 'Both visit exactly 15 nodes', 'UCS fails to terminate'],
          optionsAr: ['DFS بتسحب وتختبر 8 عقد؛ BFS بتسحب وتختبر 11 عقدة', 'BFS بتزور 3 عقد؛ DFS بتزور 50 عقدة', 'الاتنين بيزوروا 15 عقدة بالضبط', 'UCS مش بتتوقف'],
          explanation: 'With the stated removal convention, DFS visits 1,2,4,8,9,5,10,11; BFS visits 1 through 11. The goal is tested but not expanded: there are 7 versus 10 non-goal expansions. Source: AI-4 p. 36. An infinite binary tree needs a depth/cycle policy before using this finite trace.',
          explanationAr: 'مع اصطلاح السحب المحدد، DFS بتزور 1,2,4,8,9,5,10,11؛ وBFS من 1 لحد 11. الهدف بيتختبر من غير توسيع: فيه 7 مقابل 10 توسيعات لعقد غير الهدف. المصدر: AI-4 صفحة 36. الشجرة الثنائية اللانهائية محتاجة سياسة عمق أو دورات قبل استخدام التتبع المحدود ده.' };
        default: return question;
      }
    }),
      ...(extraAiQuestions[id] ?? []),
    ],
  };
};

export const AI_REMAINING_LECTURES: Lecture[] = [
  makeLecture(
    'ai-lec-2', ai2Sections, ai2Terms, ai2Cheats, ['vacuum-world', 'vacuum-world-3d', 'agent-architecture', 'ai-environments'],
    'How agents perceive and act, rationality, reflex and goal-based designs, PEAS, and task-environment dimensions.',
    'إزاي الوكلاء بيدركوا وبيتصرفوا، والعقلانية، وتصميمات رد الفعل والهدف، وPEAS، وأبعاد بيئة المهمة.',
  ),
  makeLecture(
    'ai-lec-3', ai3Sections, ai3Terms, ai3Cheats, ['search-visualizer', 'ai-eight-puzzle', 'ai-search-states'],
    'Problem-solving agents, search formulation, state spaces versus search trees, frontiers, and DFS.',
    'وكلاء حل المشكلات، وصياغة البحث، والفرق بين فضاء الحالات وشجرة البحث، والـ Frontier، وDFS.',
  ),
  makeLecture(
    'ai-lec-4', ai4Sections, ai4Terms, ai4Cheats, ['search-visualizer', 'bfs-queue-lab', 'dfs-stack-lab', 'ucs-priority-lab'],
    'Uninformed search with BFS, DFS, and UCS; guarantees, costs, complexity, and repeated-state handling.',
    'البحث غير الموجّه باستخدام BFS وDFS وUCS؛ وضماناتها وتكاليفها وتعقيدها والتعامل مع الحالات المتكررة.',
  ),
];

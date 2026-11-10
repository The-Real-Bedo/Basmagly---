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
    questions: existing.questions.map(question => {
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
    'ai-lec-4', ai4Sections, ai4Terms, ai4Cheats, ['search-visualizer'],
    'Uninformed search with BFS, DFS, and UCS; guarantees, costs, complexity, and repeated-state handling.',
    'البحث غير الموجّه باستخدام BFS وDFS وUCS؛ وضماناتها وتكاليفها وتعقيدها والتعامل مع الحالات المتكررة.',
  ),
];

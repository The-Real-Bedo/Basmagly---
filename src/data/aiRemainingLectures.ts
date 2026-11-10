import type { Lecture, SummarySection, TermDefinition, CheatSheetItem } from '../types';
import { COURSES_DATA } from './courseSeeds';

const existingAiLectures = COURSES_DATA.find((course) => course.id === 'ai')?.lectures ?? [];
const preserveLecture = (id: string) => {
  const lecture = existingAiLectures.find((item) => item.id === id);
  if (!lecture) throw new Error(`Missing source lecture ${id}`);
  return lecture;
};

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
    ],
    bulletPointsAr: [
      'الـ Agent = الـ Architecture + الـ Agent Program؛ والـ Architecture بتوفّر الإمكانات اللي البرنامج يقدر يستخدمها.',
      'الـ Percept هو المدخل الحالي للـ Agent، والـ Percept Sequence هو تاريخ الإدراكات المتاح لعملية اتخاذ القرار.',
      'الـ Agent Function بتحدد الفعل المناسب لكل تاريخ إدراكات ممكن، والـ Program هو اللي بينفّذ التحويل ده.',
      'تطبيق الـ Function كجدول بحث مش عملي لأن عدد تواريخ الإدراك الممكنة ممكن يبقى ضخم جدًا أو غير محدود.',
      'الـ Chatbot غالبًا بيرد على الأسئلة، لكن الـ AI Agent ممكن يستخدم أدوات وينفّذ أفعال عشان ينجز مهمة.',
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
      'All rational agents are intelligent, but an intelligent agent is not necessarily rational; exploration can help when information is expected to improve later decisions.',
    ],
    bulletPointsAr: [
      'الفعل العقلاني بيتحدد حسب مقياس الأداء، والمعرفة السابقة، والأفعال المتاحة، وتاريخ الإدراكات لحد دلوقتي.',
      'الـ Simple Reflex Agent بيطبّق قواعد شرط وفعل على الإدراك الحالي، من غير تخطيط صريح للمستقبل.',
      'الـ Goal-Based Agent بيستخدم Model وأهداف عشان يتوقع حالات مستقبلية ويختار تسلسل أفعال.',
      'كل وكيل عقلاني ذكي، لكن مش كل وكيل ذكي عقلاني؛ والاستكشاف ممكن يفيد لما المعلومات تحسّن القرارات بعدين.',
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
    ],
    bulletPointsAr: [
      'مقياس الأداء بيحدد النجاح، زي رحلة تاكسي آمنة وفي وقت مناسب ومريحة.',
      'البيئة هي العالم الخارجي اللي الـ Agent بيشتغل فيه، زي الطرق والمرور والركاب والطقس.',
      'الـ Actuators هي وسائل التأثير في العالم؛ التاكسي ممكن يوجّه ويزوّد السرعة ويفرمل ويستخدم الإشارات.',
      'الـ Sensors بتوفّر الإدراكات؛ التاكسي ممكن يستخدم كاميرات وGPS ومستشعرات السرعة والمحرك.',
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
      'Observability: fully observable or partially observable; agents in partial environments may need memory.',
      'Other dimensions: single-agent or multiagent; deterministic or stochastic; episodic or sequential.',
      'Time and representation: static, dynamic, or semidynamic; discrete or continuous.',
      'Knowledge: rules and action outcomes are known, or the agent must learn how an unknown environment works.',
      'Taxi driving is typically partially observable, multiagent, stochastic, sequential, dynamic, and continuous; its current percept does not reveal the whole traffic state.',
      'Chess with a clock is fully observable, multiagent, deterministic, sequential, semidynamic, and discrete: the board can stay fixed while time falls. Image analysis is a contrasting episodic task.',
    ],
    bulletPointsAr: [
      'قابلية الملاحظة: كاملة أو جزئية؛ والبيئة الجزئية ممكن تحتاج من الـ Agent إنه يحتفظ بذاكرة.',
      'أبعاد تانية: وكيل واحد أو عدة وكلاء؛ حتمية أو احتمالية؛ حلقية مستقلة أو متتابعة.',
      'الوقت والتمثيل: ثابتة أو ديناميكية أو شبه ديناميكية؛ ومتقطعة أو مستمرة.',
      'المعرفة: قواعد البيئة ونتائج الأفعال معروفة، أو إن الـAgent محتاج يتعلم إزاي البيئة المجهولة بتشتغل.',
      'قيادة التاكسي غالبًا جزئية الملاحظة ومتعددة الوكلاء واحتمالية ومتتابعة وديناميكية ومستمرة؛ الإدراك الحالي مش بيكشف حالة المرور كلها.',
      'الشطرنج مع ساعة كامل الملاحظة ومتعدد الوكلاء وحتمي ومتتابع وشبه ديناميكي ومتقطع: اللوحة ممكن تفضل ثابتة والوقت يقل. تحليل الصور مثال مختلف لمهمة حلقية مستقلة.',
    ],
    keyRule: 'A sequential, stochastic, or multiagent environment generally needs more than a current-percept reflex.',
    keyRuleAr: 'البيئة المتتابعة أو الاحتمالية أو متعددة الوكلاء غالبًا محتاجة أكتر من رد فعل على الإدراك الحالي.',
    experimentIds: ['ai-environments'],
  },
];

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
    ],
    bulletPointsAr: [
      'الهدف بيوصف حالة مرغوبة، وصياغة المشكلة بتوضح الطريق اللي ممكن يوصل للحالة دي.',
      'البحث بيفيد لما مفيش فعل فوري واحد مضمون إنه يوصل للهدف.',
      'الـ Abstraction بتشيل تفاصيل العالم الحقيقي اللي مش مهمة، وبتسيب الحالات والأفعال والتكاليف اللي المهمة محتاجاها.',
      'الحل هو تسلسل أفعال، وتنفيذه بيعمل مسار بين حالات البيئة.',
      'أمثلة: إيجاد طريق بين مدن رومانيا، وحل لغز 8-puzzle، والتخطيط في عالم المكنسة.',
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
    ],
    bulletPointsAr: [
      'الحالة الابتدائية بتحدد نقطة البداية، والأفعال بتحدد الاختيارات المتاحة في كل حالة.',
      'نموذج الانتقال RESULT(s, a) بيحدد الحالة الناتجة من تنفيذ الفعل a في الحالة s.',
      'اختبار الهدف بيتأكد إن الحالة حققت الشرط المطلوب.',
      'تكلفة المسار بتجمع تكاليف الأفعال على الطريق عشان نقارن الحلول بالتكلفة الكلية.',
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
    ],
    bulletPointsAr: [
      'الـ State بتوصف العالم؛ أما عقدة البحث فبتخزن كمان الأب والفعل والعمق وتكلفة المسار.',
      'تسلسلات أفعال مختلفة ممكن توصل لنفس الحالة، فالشجرة ممكن تضم أوصاف حالات متكررة.',
      'الـ Frontier أو الـ Fringe فيها العقد اللي اتولدت ولسه مستنية التوسيع.',
      'مجموعة الحالات المستكشفة ممكن تمنع توسيع نفس الحالة كذا مرة في فضاء فيه دورات.',
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
      'On the binary example, node n has successors 2n and 2n+1; the lecture traces DFS toward goal 11.',
    ],
    bulletPointsAr: [
      'توسيع العقدة بيطبّق الأفعال المتاحة وبيكوّن عقد خلفاء باستخدام نموذج الانتقال.',
      'الـ BFS بتستخدم ترتيب FIFO، والـ DFS بتستخدم ترتيب LIFO.',
      'الـ DFS بتكمل في فرع لعمق كبير، وبترجع للخلف لما متقدرش تكمل.',
      'في المثال الثنائي، خلفاء العقدة n هما 2n و2n+1، والمحاضرة بتتبع DFS لحد الهدف 11.',
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
    ],
    bulletPointsAr: [
      'الـ BFS بتستخدم طابور FIFO وبتوسّع مستوى بمستوى؛ وبتكون مثالية لو تكلفة كل خطوة متساوية.',
      'الـ DFS بتستخدم مكدس LIFO وبتتبع فرع بعمق؛ وممكن تحتاج ذاكرة أقل بكتير من BFS.',
      'الـ UCS بتستخدم Priority Queue مرتبة حسب تكلفة المسار المتراكمة، مش حسب العمق.',
      'الـ UCS بتختبر الهدف لما العقدة الأقل تكلفة تتشال للتوسيع؛ إيقافها عند توليد الهدف ممكن يفوّت طريق أرخص.',
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
      'BFS is complete with finite branching and is optimal only when all step costs are equal; for shallowest solution depth s, its time and memory are O(b^s).',
      'DFS has O(b^m) time and O(bm) space in the standard tree-search analysis; it is not optimal and may fail in infinite-depth spaces.',
      'UCS is complete and optimal when each step cost is at least ε > 0; its cost-based bound grows exponentially with C*/ε.',
      'When all edge costs are equal, UCS and BFS expand nodes in the same cost/depth order.',
    ],
    bulletPointsAr: [
      'الـ BFS كاملة مع تفرّع محدود، ومثالية بس لما تكاليف الخطوات كلها متساوية؛ ولو عمق أقرب حل s، فالوقت والذاكرة O(b^s).',
      'في تحليل شجرة البحث المعتاد، وقت DFS هو O(b^m) ومساحتها O(bm)؛ وهي مش مثالية وممكن تفشل مع عمق لا نهائي.',
      'الـ UCS كاملة ومثالية لما تكلفة كل خطوة على الأقل ε > 0؛ وحدّها المعتمد على التكلفة بيزيد أُسّيًا مع C*/ε.',
      'لما كل الحواف تكلفتها متساوية، UCS وBFS بيوسّعوا العقد بنفس ترتيب التكلفة والعمق.',
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
      'On the binary DFS exercise, the left-first visit order toward goal 11 is 1, 2, 4, 8, 9, 5, 10, 11.',
    ],
    bulletPointsAr: [
      'الـ BFS ممكن تستبعد حالة اتولدت قبل كده؛ والـ DFS ممكن تراجع المسار الحالي أو كل الحالات اللي اتولدت.',
      'في مسار Arad إلى Bucharest، الـ BFS بترجع طريق أقصر في عدد الخطوات تكلفته 450 كم، بينما UCS بتلاقي طريق أقل تكلفة بمقدار 418 كم.',
      'طريق UCS بتكلفة 418 كم هو Arad ← Sibiu ← Rimnicu Vilcea ← Pitesti ← Bucharest.',
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

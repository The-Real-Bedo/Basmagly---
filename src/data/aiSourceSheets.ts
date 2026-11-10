import type { CourseSheet, SheetProblem } from '../types';

const answers: Record<string, [string, string, string]> = {
  'p-ai1-1': [
    'The three interacting drivers are advanced algorithms, abundant data, and increased computing power. AI-1 p. 9 calls data the fuel and illustrates CPU/GPU/TPU specialization. CPU letter/GPU line/TPU page printing is an analogy, not a measured speed ratio: CPUs also support parallel work, and accelerator performance depends on workload and data movement. The 2017 Transformer is a separate milestone on p. 8.',
    'المحركات الثلاثة المتكاملة هي الخوارزميات المتقدمة والبيانات الوفيرة وزيادة القدرة الحوسبية. AI-1 صفحة 9 بتسمّي البيانات الوقود وبتوضح تخصص CPU وGPU وTPU. طباعة حروف وسطور وصفحات تشبيه، مش نسبة سرعة مقاسة: CPUs فيها توازي كمان، وأداء المسرّع بيعتمد على المهمة ونقل البيانات. الـ Transformer في 2017 محطة منفصلة بصفحة 8.', 'AI-1 PDF pp. 8–9; question: AI-2 p. 4.',
  ],
  'p-ai2-1': [
    'Perceive through sensors, reason/process inputs, learn when the design supports it, and act through actuators. AI-2 p. 9 diagrams perception, reasoning/cognition, and action; the learning capability is stated on p. 7. Loop: Environment → percepts → Sensors → Agent Program (reasoning, optional state/learning) → Actuators → actions → Environment. A simple reflex program does not require every optional capability.',
    'ادرك بالمستشعرات، واستدل أو عالج المدخلات، واتعلّم لو التصميم بيدعم ده، واتصرف بالمشغّلات. AI-2 صفحة 9 بترسم الإدراك والاستدلال أو المعالجة والفعل؛ وقدرة التعلّم مذكورة في صفحة 7. الحلقة: البيئة ← الإدراكات ← المستشعرات ← برنامج الوكيل (استدلال وحالة أو تعلّم اختياري) ← المشغّلات ← الأفعال ← البيئة. برنامج رد الفعل البسيط مش لازم يستخدم كل قدرة اختيارية.', 'AI-2 PDF pp. 7,9,11; question p. 27.',
  ],
  'p-ai2-3': [
    'P: safe, fast, legal, comfortable trips; profit; limited impact on other road users. E: roads, other traffic, police, pedestrians, customers, weather. A: steering, accelerator, brake, signals, horn, display, speech. S: cameras, radar, speedometer, GPS, engine sensors, accelerometer, microphones, touchscreen. These are the p. 17 entries. LiDAR, sonar, and odometry are possible supplementary designs, not entries transcribed from this table.',
    'P: رحلات آمنة وسريعة وقانونية ومريحة؛ ربح؛ وتأثير محدود على مستخدمي الطريق. E: الطرق والمرور والشرطة والمشاة والزبائن والطقس. A: التوجيه والتسارع والفرملة والإشارات والبوق والعرض والكلام. S: كاميرات وRadar وSpeedometer وGPS ومستشعرات المحرك وAccelerometer وميكروفونات وشاشة لمس. دي بنود صفحة 17. LiDAR وSonar وOdometry اختيارات تصميم إضافية ممكنة، مش بنود منقولة من الجدول ده.', 'AI-2 PDF p. 17; question p. 27.',
  ],
  'p-ai2-4': [
    'Fully observable: sensors provide all current state information relevant to choosing an action; history is unnecessary merely to recover that current state, though learning or objectives may still use memory. Partially observable: relevant state is hidden or noisy; memory and a belief/world model may help infer it, without guaranteeing certainty. Examples in p. 23 include chess versus poker and taxi driving. Known rules and full observability are separate dimensions.',
    'كاملة الملاحظة: المستشعرات بتوفّر معلومات الحالة الحالية كلها اللي تخص اختيار الفعل؛ التاريخ مش مطلوب لمجرد استرجاع الحالة الحالية، لكن التعلّم أو الأهداف ممكن يفضلوا محتاجين ذاكرة. جزئية الملاحظة: حالة مهمة مخفية أو مشوشة؛ الذاكرة ونموذج العالم أو الاعتقاد ممكن يساعدوا في استنتاجها من غير ضمان يقين. أمثلة صفحة 23 تشمل الشطرنج مقابل Poker وقيادة التاكسي. معرفة القواعد وكمال الملاحظة بُعدان منفصلان.', 'AI-2 PDF pp. 20–23; question p. 27.',
  ],
  'p-ai3-1': [
    'Abstraction removes details irrelevant to the goal and retains states, legal actions, transitions, and costs needed for a valid solution. In the fixed Romania route model, cities and road distances matter; vehicle colour does not. Real traffic may matter in a different task. The search explores this simplified model before execution, so its solution is only as applicable as the model’s assumptions.',
    'الـ Abstraction بتشيل التفاصيل اللي ملهاش علاقة بالهدف وبتحتفظ بالحالات والأفعال القانونية والانتقالات والتكاليف المطلوبة لحل صالح. في نموذج طريق رومانيا الثابت، المدن ومسافات الطرق مهمة؛ لون العربية مش مهم. المرور الحقيقي ممكن يبقى مهم في مهمة مختلفة. البحث بيستكشف النموذج المبسط قبل التنفيذ؛ فصلاحية الحل بتعتمد على افتراضات النموذج.', 'AI-3 PDF pp. 9,12–13; question p. 37.',
  ],
  'p-ai3-2': [
    'Five components: initial state s0; legal actions ACTIONS(s); transition model RESULT(s,a); goal test; path-cost function. The initial state, actions, and results define the reachable state space. A step cost c(s,a,s′) is the cost of one transition; total path cost is the sum of these costs, not a synonym for one step cost.',
    'المكوّنات الخمسة: البداية s0؛ الأفعال القانونية ACTIONS(s)؛ نموذج الانتقال RESULT(s,a)؛ اختبار الهدف؛ ودالة تكلفة المسار. البداية والأفعال والنتايج بيحددوا فضاء الحالات القابلة للوصول. تكلفة الخطوة c(s,a,s′) تخص انتقال واحد؛ تكلفة المسار الكلية مجموع التكاليف دي، مش مرادف لتكلفة خطوة واحدة.', 'AI-3 PDF p. 11; question p. 37.',
  ],
  'p-ai4-1': [
    'B. Search constructs candidate action sequences in a model without physically executing every candidate. The returned sequence achieves the goal if the model and execution assumptions hold. Optimality depends on the chosen algorithm and cost assumptions; ordinary DFS does not guarantee an optimal plan.',
    'B. البحث بيبني تسلسلات أفعال محتملة في نموذج من غير تنفيذ كل احتمال جسديًا. التسلسل الناتج بيحقق الهدف لو افتراضات النموذج والتنفيذ سليمة. الأمثلية بتعتمد على الخوارزمية وافتراضات التكلفة؛ DFS المعتادة مش بتضمن خطة مثالية.', 'AI-4 PDF pp. 5–6,29; question p. 35.',
  ],
  'p-ai4-3': [
    'In standard tree DFS, store the active root-to-node path and pending siblings: O(bm) space for branching factor b and finite maximum depth m. BFS stores a whole frontier tier: O(b^d) in the slide’s early-test convention. A global explored set for graph DFS adds storage for reached states, so its total memory is not necessarily O(bm). Actual exhaustion of memory versus time depends on the implementation.',
    'في Tree DFS المعتادة، خزّن المسار الحالي من الجذر والعقد الشقيقة المنتظرة: مساحة O(bm) لعامل تفرّع b وعمق أقصى محدود m. BFS بتخزن طبقة كاملة من الـ Frontier: مساحة O(b^d) باصطلاح الاختبار المبكر في الشريحة. مجموعة زيارة عامة للـ Graph DFS بتضيف تخزين للحالات اللي وصلنا لها؛ فذاكرتها الكلية مش لازم تبقى O(bm). انتهاء الذاكرة ولا الوقت بيعتمد على التنفيذ.', 'AI-4 PDF pp. 29–32; question p. 35.',
  ],
  'p-ai4-5': [
    'For the finite tree 1–15, with left-first children, goal tests on removal and unit costs/FIFO ties: BFS and UCS visit 1,2,3,4,5,6,7,8,9,10,11; DFS visits 1,2,4,8,9,5,10,11. The path is 1 → 2 → 5 → 11, depth/cost 3. These are 11 versus 8 removals including the goal, or 10 versus 7 non-goal expansions. Goal 13 in the animated slides is a separate example. On the unbounded number tree, DFS can descend forever without a depth limit.',
    'للشجرة المحدودة 1–15، مع الشمال الأول واختبار الهدف عند السحب وتكلفة موحدة وتعادل FIFO: BFS وUCS بتزوروا 1,2,3,4,5,6,7,8,9,10,11؛ وDFS بتزور 1,2,4,8,9,5,10,11. المسار 1 ← 2 ← 5 ← 11، بعمق وتكلفة 3. دول 11 مقابل 8 سحبات شاملة الهدف، أو 10 مقابل 7 توسيعات لعقد غير الهدف. الهدف 13 في الشرائح المصوّرة مثال منفصل. في شجرة الأرقام غير المحدودة، DFS ممكن تنزل للأبد من غير حد عمق.', 'AI-4 PDF p. 36.',
  ],
};

const missingDfs: SheetProblem = {
  id: 'p-ai3-6', problemNumber: 6, type: 'problem',
  question: 'Consider a state space where the start state is number 1 and the successor function for state n returns two states, numbers 2n and 2n+1. Draw the portion of the state space from 1 to 15. Suppose the goal state is 11. List the order in which nodes will be visited for Depth-first search.',
  questionAr: 'اعتبر فضاء حالات بدايته الرقم 1، ودالة الخلفاء للحالة n بترجع حالتين رقمهما 2n و2n+1. ارسم الجزء من فضاء الحالات من 1 إلى 15. افترض إن الهدف 11. اكتب ترتيب زيارة العقد باستخدام البحث بالعمق.',
  solution: 'Source: AI-3 p. 37, sixth listed question. Treat the drawn 1–15 portion as a finite tree; levels are [1], [2,3], [4,5,6,7], [8,9,10,11,12,13,14,15]. Left-first DFS with goal testing on removal visits 1,2,4,8,9,5,10,11; parent-chain solution is 1 → 2 → 5 → 11. Eight nodes are removed/tested, seven non-goal nodes expanded. Without the finite-tree/depth assumption, DFS on the unbounded successor rule can follow 1,2,4,8,16,… forever. This authored solution is not an official answer key.',
  solutionAr: 'المصدر: AI-3 صفحة 37، السؤال السادس في القائمة. اعتبر الجزء المرسوم 1–15 شجرة محدودة؛ مستوياتها [1] و[2,3] و[4,5,6,7] و[8,9,10,11,12,13,14,15]. DFS مع الشمال الأول واختبار الهدف عند السحب بتزور 1,2,4,8,9,5,10,11؛ ومسار الآباء للحل 1 ← 2 ← 5 ← 11. اتسحبت واتختبرت 8 عقد، واتوسعت 7 عقد غير الهدف. من غير افتراض الشجرة المحدودة أو حد العمق، DFS مع قاعدة الخلفاء غير المحدودة ممكن تتبع 1,2,4,8,16,… للأبد. ده حل دراسي مكتوب، مش مفتاح إجابة رسمي.',
  conciseSolution: 'Left-first, finite 1–15 tree: 1,2,4,8,9,5,10,11. Goal path 1 → 2 → 5 → 11.',
  conciseSolutionAr: 'مع الشمال الأول وشجرة 1–15 المحدودة: 1,2,4,8,9,5,10,11. مسار الهدف 1 ← 2 ← 5 ← 11.',
  sourceReference: 'AI-3 PDF p. 37, sixth listed problem; conditional authored study solution.',
};

export function auditedAiSheets(sheets: CourseSheet[] = []): CourseSheet[] {
  return sheets.map(sheet => {
    const problems = sheet.problems?.map(problem => {
      const answer = answers[problem.id];
      const corrected = answer ? { ...problem, solution: answer[0], solutionAr: answer[1], sourceReference: answer[2] } : problem;
      if (problem.id === 'p-ai3-5') return { ...corrected,
        question: 'What does the frontier (or fringe) represent in a search tree algorithm?\nA) The set of states that have already been fully explored and discarded.\nB) The collection of all leaf nodes that have been generated but are currently awaiting expansion.\nC) The final optimal sequence of actions leading to the goal.\nD) The complete state space graph stored in memory.',
        questionAr: 'الـ Frontier أو الـ Fringe بتمثل إيه في خوارزمية شجرة البحث؟\nA) الحالات اللي اتستكشفت بالكامل واتشالت.\nB) كل العقد الورقية اللي اتولدت ولسه مستنية التوسيع.\nC) تسلسل الأفعال المثالي النهائي للهدف.\nD) رسم فضاء الحالات الكامل المتخزن في الذاكرة.',
      };
      return corrected;
    });
    if (sheet.id === 'ai-sheet-3' && problems && !problems.some(problem => problem.id === missingDfs.id)) problems.push(missingDfs);
    return { ...sheet, problems, problemsCount: problems?.length ?? sheet.problemsCount };
  });
}

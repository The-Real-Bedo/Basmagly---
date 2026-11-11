import type { Course, CourseSheet, SheetProblem } from '../types';
export const MOBILE_PROGRAMMING_PROBLEMS: SheetProblem[] = [
  {
    "id": "p-mob-bank-1",
    "problemNumber": 1,
    "type": "true_false",
    "question": "The continue statement skips the current iteration of a loop without terminating the loop.",
    "questionAr": "جملة continue بتتخطى التكرار الحالي في الـ Loop من غير ما تنهي الـ Loop كلها.",
    "correctAnswer": true,
    "solution": "The continue statement immediately bypasses remaining statements in the current iteration and jumps to the next loop cycle.",
    "solutionAr": "جملة continue بتفوّت باقي السطور في اللفة الحالية وبتنقل فوراً للّفة اللي بعدها من غير ما توقف التكرار.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #1"
  },
  {
    "id": "p-mob-bank-2",
    "problemNumber": 2,
    "type": "true_false",
    "question": "A variable declared using var can be assigned values of different data types after its initial declaration.",
    "questionAr": "المتغير المعرّف باستخدام var يقدر يستقبل قيم من أنواع بيانات مختلفة بعد تعريفه الأول.",
    "correctAnswer": false,
    "solution": "In Dart, var infers the data type from the initial value at compile time. Once assigned, its type is locked and cannot hold a different type (use dynamic for changing types).",
    "solutionAr": "في دارت، لما تعرّف متغير بـ var واديتله قيمة، نوعه بيتحدد فوراً ومينفعش تديله نوع تاني بعد كده (لو عايز نوع متغير استخدم dynamic).",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #2"
  },
  {
    "id": "p-mob-bank-3",
    "problemNumber": 3,
    "type": "true_false",
    "question": "The index of the third element in a List is 3.",
    "questionAr": "الفهرس (Index) بتاع العنصر التالت في الـ List هو 3.",
    "correctAnswer": false,
    "solution": "Dart lists are 0-indexed; therefore, the third element has index 2 (indices: 0, 1, 2).",
    "solutionAr": "القوائم في دارت بتبدأ من الصفر (0-indexed)، فالعنصر الأول 0، والتاني 1، والتالت مؤشره 2.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #3"
  },
  {
    "id": "p-mob-bank-4",
    "problemNumber": 4,
    "type": "true_false",
    "question": "The do-while loop executes its statements at least once, even if the condition is false.",
    "questionAr": "حلقة do-while بتنفذ التعليمات اللي جواها مرة واحدة على الأقل حتى لو كان الشرط خطأ.",
    "correctAnswer": true,
    "solution": "Because the exit condition in a do-while loop is evaluated after executing the body, it is guaranteed to execute at least once.",
    "solutionAr": "حلقة do-while بتفحص الشرط في النهاية بعد ما تنفذ البلوك، عشان كده مضمون تتنفذ مرة واحدة على الأقل.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #4"
  },
  {
    "id": "p-mob-bank-5",
    "problemNumber": 5,
    "type": "true_false",
    "question": "The == operator is used to compare two values, while = is used for assignment.",
    "questionAr": "المعامل == بيُستخدم لمقارنة قيمتين، بينما = بيُستخدم للإسناد (Assignment).",
    "correctAnswer": true,
    "solution": "The single equal sign (=) assigns a value to a variable, whereas the double equal sign (==) evaluates equality.",
    "solutionAr": "علامة = بتخزن القيمة في المتغير، وعلامة == بتقارن هل القيمتين متساويتين ولا لأ.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #5"
  },
  {
    "id": "p-mob-bank-6",
    "problemNumber": 6,
    "type": "true_false",
    "question": "A function in Dart can accept parameters and return a value of a different data type.",
    "questionAr": "الدالة في Dart تقدر تستقبل معاملات (Parameters) وترجع قيمة من نوع بيانات مختلف.",
    "correctAnswer": true,
    "solution": "A function parameter types and return type are independent; for example, a function can accept String parameters and return an int.",
    "solutionAr": "الدالة تقدر تاخد مدخلات من نوع وترجع ناتج من نوع تاني خالص، زي دالة بتاخد String وترجع int.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #6"
  },
  {
    "id": "p-mob-bank-7",
    "problemNumber": 7,
    "type": "true_false",
    "question": "The && operator returns true only when both conditions are true.",
    "questionAr": "المعامل && بيرجع true بس لما يكون الشرطان معاً true.",
    "correctAnswer": true,
    "solution": "Logical AND (&&) requires both left and right operands to evaluate to true.",
    "solutionAr": "معامل الضرب المنطقي AND (&&) مش بيرجع true إلا لو كان الشرطان صحيحين معاً.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #7"
  },
  {
    "id": "p-mob-bank-8",
    "problemNumber": 8,
    "type": "true_false",
    "question": "The break statement can be used to terminate the execution of a loop.",
    "questionAr": "جملة break بتُستخدم لإنهاء تنفيذ الـ Loop تماماً.",
    "correctAnswer": true,
    "solution": "The break statement causes the control flow to immediately exit the enclosing loop or switch construct.",
    "solutionAr": "أمر break بيكسر الحلقة التكرارية ويخرج برّاها فوراً في نفس اللحظة.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #8"
  },
  {
    "id": "p-mob-bank-9",
    "problemNumber": 9,
    "type": "true_false",
    "question": "A List declared using const cannot have its elements modified after creation.",
    "questionAr": "الـ List المعرفة باستخدام const مينفعش نعدل عناصرها بعد إنشائها.",
    "correctAnswer": true,
    "solution": "A const list creates an immutable compile-time constant; modifying its elements throws an UnsupportedError at runtime.",
    "solutionAr": "القائمة المعرفة بـ const بتكون ثابتة وقت الترجمة (Immutable)، وتعديل أي عنصر فيها بيعمل خطأ runtime.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #9"
  },
  {
    "id": "p-mob-bank-10",
    "problemNumber": 10,
    "type": "true_false",
    "question": "The / operator in Dart always returns an integer when both operands are integers.",
    "questionAr": "معامل القسمة / في Dart دايماً بيرجع عدد صحيح (Integer) لما يكون المعاملان أعداد صحيحة.",
    "correctAnswer": false,
    "solution": "In Dart, the standard division operator (/) always returns a double, even if both operands are integers (e.g. 4 / 2 returns 2.0). Integer division uses ~/.",
    "solutionAr": "في دارت، معامل القسمة العادي / دايماً بيرجع عدد عشري double (زي 4 / 2 = 2.0). لو عايز قسمة صحيحة بتستخدم ~/.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #10"
  },
  {
    "id": "p-mob-bank-11",
    "problemNumber": 11,
    "type": "true_false",
    "question": "Widgets are basically user interface components used to create the user interface of the application.",
    "questionAr": "الـ Widgets هي المكونات الأساسية لبناء واجهة المستخدم في التطبيق.",
    "correctAnswer": true,
    "solution": "In Flutter, all UI building blocks (structural, stylistic, layout) are represented as widgets.",
    "solutionAr": "في فلاتر، كل عناصر واجهة المستخدم من نصوص وأزرار وتخطيطات هي عبارة عن Widgets.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #11"
  },
  {
    "id": "p-mob-bank-12",
    "problemNumber": 12,
    "type": "true_false",
    "question": "MaterialApp is the top-level widget and its UI is built using one or more children (widgets).",
    "questionAr": "MaterialApp هي الـ Widget الأساسية في القمة وواجهتها بتتبني باستخدام طفل أو أكتر (Widgets).",
    "correctAnswer": true,
    "solution": "MaterialApp wraps the core application, providing themes, routing, and localization.",
    "solutionAr": "MaterialApp هي الغلاف الرئيسي لتطبيقات Material Design اللي بيحدد الثيمات ونظام التوجيه وشاشة البداية.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #12"
  },
  {
    "id": "p-mob-bank-13",
    "problemNumber": 13,
    "type": "true_false",
    "question": "MyHomePage is built using another Flutter native widget, Scaffold.",
    "questionAr": "MyHomePage مبنية باستخدام الـ Widget الأصلية Scaffold.",
    "correctAnswer": true,
    "solution": "Standard Flutter template projects implement the main screen using Scaffold.",
    "solutionAr": "القالب الافتراضي لتطبيقات فلاتر بيبني شاشة الصفحة الرئيسية معتمداً على Scaffold.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #13"
  },
  {
    "id": "p-mob-bank-14",
    "problemNumber": 14,
    "type": "true_false",
    "question": "Scaffold has two properties – body and appBar.",
    "questionAr": "Scaffold عندها خاصيتين فقط – body و appBar.",
    "correctAnswer": false,
    "solution": "Scaffold has many properties including floatingActionButton, drawer, bottomNavigationBar, backgroundColor, and bottomSheet.",
    "solutionAr": "الـ Scaffold فيها خواص كتير تانية غير body و appBar زي drawer و floatingActionButton و bottomNavigationBar.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #14"
  },
  {
    "id": "p-mob-bank-15",
    "problemNumber": 15,
    "type": "true_false",
    "question": "Body UI is built using Flutter native widget AppBar and Body UI is built using Center widget.",
    "questionAr": "واجهة الـ Body بتتبني بـ AppBar وواجهة الـ Body بتتبني بـ Center widget.",
    "correctAnswer": false,
    "solution": "AppBar belongs in the appBar property of Scaffold, not body; body can host any widget such as Center, Column, or Container.",
    "solutionAr": "الـ AppBar مكانه في خاصية appBar مش في الـ body، وخاصية body بتاخد أي Widget زي Center أو Container.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #15"
  },
  {
    "id": "p-mob-bank-16",
    "problemNumber": 16,
    "type": "true_false",
    "question": "The Center widget has a property, Child, which refers to the actual content, and it is built using Text widget.",
    "questionAr": "الـ Center widget عندها خاصية Child بتشير للمحتوى الفعلي، وبتتبني باستخدام Text widget.",
    "correctAnswer": true,
    "solution": "Center is a single-child widget whose child property holds the nested widget, commonly a Text widget in introductory examples.",
    "solutionAr": "الـ Center بتاخد child واحد، وفي الأمثلة التعليمية بيكون جواه Text widget بيتعرض في نص الشاشة.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #16"
  },
  {
    "id": "p-mob-bank-17",
    "problemNumber": 17,
    "type": "true_false",
    "question": "Flutter offers layered design so that any layer can be programmed depending on the complexity of the task.",
    "questionAr": "فلاتر بتقدم تصميم طبقي (Layered Design) بحيث كل طبقة تتبَرمج حسب تعقيد المهمة.",
    "correctAnswer": true,
    "solution": "Flutter architecture consists of the framework layer (Widgets, Rendering, Painting), the C++ engine (Skia/Impeller), and platform embedders.",
    "solutionAr": "معمارية فلاتر مبنية على طبقات؛ من طبقة الـ Widgets العالية لحد محرك الرسوميات C++ وقنوات المنصة.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #17"
  },
  {
    "id": "p-mob-bank-18",
    "problemNumber": 18,
    "type": "true_false",
    "question": "In Flutter, everything is a widget, and a complex widget is composed of already existing widgets.",
    "questionAr": "في فلاتر، كل شيء عبارة عن Widget، والـ Widget المعقدة بتتركب من Widgets موجودة مسبقاً.",
    "correctAnswer": true,
    "solution": "Composition over inheritance is a core Flutter philosophy where complex layouts are trees of simpler widgets.",
    "solutionAr": "فلسفة فلاتر الأساسية هي التركيب (Composition)، والواجهات المعقدة بتتبني من تجميع ويدجتس بسيطة.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #18"
  },
  {
    "id": "p-mob-bank-19",
    "problemNumber": 19,
    "type": "true_false",
    "question": "Dart is an object-oriented language with C-style syntax.",
    "questionAr": "Dart هي لغة كائنية التوجه (OOP) بصياغة مستوحاة من نمط لغة C.",
    "correctAnswer": true,
    "solution": "Dart uses curly braces, semicolons, and class-based object orientation similar to C, Java, and JavaScript.",
    "solutionAr": "لغة دارت بتستخدم الأقواس المعقوفة والفواصل المنقوطة ومفاهيم الكائنات على نمط لغات عائلة C.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #19"
  },
  {
    "id": "p-mob-bank-20",
    "problemNumber": 20,
    "type": "true_false",
    "question": "Dart supports programming concepts like interfaces, classes, and arrays.",
    "questionAr": "Dart بتدعم مفاهيم برمجية زي الـ Interfaces والـ Classes والـ Arrays (Lists).",
    "correctAnswer": true,
    "solution": "Dart supports classes, implicit interfaces (every class can be implemented), and array-like lists.",
    "solutionAr": "دارت بتدعم الكلاسات والواجهات (Interfaces) والقوائم المصفوفية (Lists).",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #20"
  },
  {
    "id": "p-mob-bank-21",
    "problemNumber": 21,
    "type": "true_false",
    "question": "Dart collections can be used to replicate data structures such as generics, and optional typing.",
    "questionAr": "مجموعات Dart (Collections) بتُستخدم لتمثيل هياكل البيانات مع الـ Generics والأنواع الاختيارية.",
    "correctAnswer": true,
    "solution": "Dart collections (List, Set, Map) integrate with generics to enforce or allow optional type safety.",
    "solutionAr": "مجموعات دارت زي List و Map بتدعم الأنواع المعممة (Generics) لضمان صحة أنواع البيانات.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #21"
  },
  {
    "id": "p-mob-bank-22",
    "problemNumber": 22,
    "type": "true_false",
    "question": "A class definition includes Fields, Getters and setters, Constructors and Functions.",
    "questionAr": "تعريف الـ Class بيشمل الحقول (Fields)، الـ Getters/Setters، الـ Constructors، والدوال (Functions).",
    "correctAnswer": true,
    "solution": "A full Dart class definition can contain variables/fields, accessors, constructors, and instance/static methods.",
    "solutionAr": "الـ Class في دارت بيضم المتغيرات والدوال البنائية (Constructors) ودوال الوصول والتعديل.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #22"
  },
  {
    "id": "p-mob-bank-23",
    "problemNumber": 23,
    "type": "true_false",
    "question": "Dart supports for, for..in, while and does not support do..while loops.",
    "questionAr": "Dart بتدعم حلقات for و for..in و while ومش بتدعم do..while.",
    "correctAnswer": false,
    "solution": "Dart fully supports do-while loops along with for, for-in, and while.",
    "solutionAr": "دارت بتدعم do-while بشكل كامل مع باقي الحلقات التكرارية.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #23"
  },
  {
    "id": "p-mob-bank-24",
    "problemNumber": 24,
    "type": "true_false",
    "question": "Center widget and Container widget are examples of Multiple Child Widgets.",
    "questionAr": "الـ Center widget والـ Container widget هما أمثلة على Multiple Child Widgets.",
    "correctAnswer": false,
    "solution": "Center and Container are single-child widgets that take a child property, not a children list.",
    "solutionAr": "الـ Center والـ Container هما Single Child Widgets وبياخدوا خاصية child واحدة مش مصفوفة children.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #24"
  },
  {
    "id": "p-mob-bank-25",
    "problemNumber": 25,
    "type": "true_false",
    "question": "Row widget, Column widget and ListView widget are examples of Multiple Child Widgets.",
    "questionAr": "الـ Row والـ Column والـ ListView هما أمثلة على Multiple Child Widgets.",
    "correctAnswer": true,
    "solution": "Row, Column, and ListView all take a children property accepting a List<Widget>.",
    "solutionAr": "الـ Row والـ Column والـ ListView بياخدوا خاصية children وبيرتبوا قائمة من الويدجتس.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #25"
  },
  {
    "id": "p-mob-bank-26",
    "problemNumber": 26,
    "type": "true_false",
    "question": "The main() function is the entry point of a Dart application.",
    "questionAr": "الدالة main() هي نقطة البداية (Entry Point) لتنفيذ أي تطبيق Dart.",
    "correctAnswer": true,
    "solution": "Execution begins unconditionally at the top-level main() function in every Dart program.",
    "solutionAr": "تنفيذ أي برنامج أو تطبيق دارت بيبدأ حتماً من دالة main() الرئيسية.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #26"
  },
  {
    "id": "p-mob-bank-27",
    "problemNumber": 27,
    "type": "true_false",
    "question": "In Flutter, the Padding widget is used to add space around its child widget.",
    "questionAr": "في فلاتر، الـ Padding widget بتُستخدم لإضافة مسافة وهامش حول الـ child widget.",
    "correctAnswer": true,
    "solution": "Padding insets its child by the given EdgeInsets.",
    "solutionAr": "ويدجت Padding بتضيف مسافة داخلية فارغة حوالين الويدجت الابن بتاعها.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #27"
  },
  {
    "id": "p-mob-bank-28",
    "problemNumber": 28,
    "type": "true_false",
    "question": "The Expanded widget can be used inside a Row or Column to fill the available space.",
    "questionAr": "الـ Expanded widget بتُستخدم جوا الـ Row أو الـ Column عشان تملأ المساحة المتاحة.",
    "correctAnswer": true,
    "solution": "Expanded expands a child of a Row, Column, or Flex along the main axis to consume available space.",
    "solutionAr": "ويدجت Expanded بتخلي العنصر يتمدد ويملأ أي مساحة فاضية متبقية في الـ Row أو الـ Column.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #28"
  },
  {
    "id": "p-mob-bank-29",
    "problemNumber": 29,
    "type": "true_false",
    "question": "The TextField widget is used to display images in a Flutter application.",
    "questionAr": "الـ TextField widget بتُستخدم لعرض الصور في تطبيق فلاتر.",
    "correctAnswer": false,
    "solution": "TextField is used for user text input; Image widgets (Image.asset, Image.network) display images.",
    "solutionAr": "الـ TextField بتُستخدم لكتابة النصوص وإدخال المستخدم، والصور بتتعرض بويدجت Image.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #29"
  },
  {
    "id": "p-mob-bank-30",
    "problemNumber": 30,
    "type": "true_false",
    "question": "A StatelessWidget does not maintain internal mutable state over time.",
    "questionAr": "الـ StatelessWidget مش بتحتفظ بحالة داخلية متغيرة على مدار الوقت.",
    "correctAnswer": true,
    "solution": "StatelessWidget instances are immutable once built and do not preserve dynamic state across frames.",
    "solutionAr": "الـ StatelessWidget ثابتة بعد بنائها ومش بتحتفظ بأي حالة داخلية بتتغير مع الوقت.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #30"
  },
  {
    "id": "p-mob-bank-31",
    "problemNumber": 31,
    "type": "true_false",
    "question": "A StatefulWidget can dynamically alter its visual state and rebuild its interface during execution.",
    "questionAr": "الـ StatefulWidget بتقدر تغير حالتها وشكلها وتعمل rebuild للواجهة أثناء التشغيل.",
    "correctAnswer": true,
    "solution": "StatefulWidget delegates mutable state to a State object, which triggers rebuilds when setState() is called.",
    "solutionAr": "الـ StatefulWidget بتخزن حالتها في كائن State، وتقدر تعيد بناء شكلها لما البيانات تتغير.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #31"
  },
  {
    "id": "p-mob-bank-32",
    "problemNumber": 32,
    "type": "true_false",
    "question": "In Flutter, invoking setState() notifies the framework that the internal state has changed, scheduling a rebuild.",
    "questionAr": "في فلاتر، دالة setState() بتطلب إعادة بناء الواجهة (rebuild) لما الحالة تتغير.",
    "correctAnswer": true,
    "solution": "Calling setState() marks the widget dirty and queues build() execution for the next frame.",
    "solutionAr": "استدعاء setState() بيعرّف فلاتر إن فيه بيانات اتغيرت ومحتاجين نعيد رسم الواجهة من جديد.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #32"
  },
  {
    "id": "p-mob-bank-33",
    "problemNumber": 33,
    "type": "true_false",
    "question": "Hot Reload terminates the application process completely and relaunches it from scratch.",
    "questionAr": "الـ Hot Reload بيقفل التطبيق تماماً ويعيد تشغيله من الصفر.",
    "correctAnswer": false,
    "solution": "Hot Restart resets state, but Hot Reload injects updated source code into the running Dart VM without restarting the app.",
    "solutionAr": "الـ Hot Restart هو اللي بيبدأ من الصفر، أما Hot Reload بيحقن الكود الجديد فوراً من غير ما يقفل البرنامج.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #33"
  },
  {
    "id": "p-mob-bank-34",
    "problemNumber": 34,
    "type": "true_false",
    "question": "Hot Reload allows developers to inspect UI modifications immediately without discarding application state.",
    "questionAr": "الـ Hot Reload بيسمح للمطورين يشوفوا التعديلات فوراً في الواجهة من غير ما يفقدوا حالة التطبيق.",
    "correctAnswer": true,
    "solution": "Hot Reload preserves existing state, enabling instant UI feedback during development.",
    "solutionAr": "ميزة Hot Reload بتخليك تعدل في التصميم وتشوف النتيجة في ثانية من غير ما تفقد مكانك أو بياناتك.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #34"
  },
  {
    "id": "p-mob-bank-35",
    "problemNumber": 35,
    "type": "true_false",
    "question": "SingleChildScrollView enables scrolling for views whose child content exceeds screen dimensions.",
    "questionAr": "الـ SingleChildScrollView بتُستخدم عشان تسمح بالتمرير للشاشات اللي محتواها بيعدي حجم الشاشة.",
    "correctAnswer": true,
    "solution": "SingleChildScrollView prevents overflow errors by making a single box scrollable.",
    "solutionAr": "ويدجت SingleChildScrollView بتمنع مشاكل الـ Overflow وتخلي المحتوى قابل للتمرير (Scroll).",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #35"
  },
  {
    "id": "p-mob-bank-36",
    "problemNumber": 36,
    "type": "true_false",
    "question": "FloatingActionButton is a circular button that hovers over content to trigger the primary screen action.",
    "questionAr": "الـ FloatingActionButton هو زر دائري بيطفو فوق المحتوى لعمل الإجراء الرئيسي في الشاشة.",
    "correctAnswer": true,
    "solution": "In Material Design, FAB is positioned above the layout to perform the most important user action.",
    "solutionAr": "الـ FAB هو الزر الدائري البارز المخصص لأهم وظيفة في الشاشة زي إضافة عنصر جديد.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #36"
  },
  {
    "id": "p-mob-bank-37",
    "problemNumber": 37,
    "type": "true_false",
    "question": "In Dart, a variable declared as dynamic has its data type permanently fixed at compile time.",
    "questionAr": "في دارت، المتغير المعرّف كـ dynamic نوعه بيتحدد في وقت الـ Compile ومينفعش يتغير.",
    "correctAnswer": false,
    "solution": "A dynamic variable disables static type checking, allowing its assigned type to change freely at runtime.",
    "solutionAr": "المتغير dynamic معناه إيقاف فحص النوع الصارم، وينفع تشيل جواه رقم وبعدين تحط نص عادي جداً.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #37"
  },
  {
    "id": "p-mob-bank-38",
    "problemNumber": 38,
    "type": "true_false",
    "question": "In Dart, the ! operator serves as a null assertion confirming an expression is non-null.",
    "questionAr": "في دارت، المعامل ! بيُستخدم للـ Null Assertion عشان يأكد إن القيمة مش null.",
    "correctAnswer": true,
    "solution": "The null assertion operator (!) casts a nullable type to its non-nullable variant, throwing if null.",
    "solutionAr": "علامة التعجب ! بتأكد لمترجم دارت إن المتغير مش فاضي (not null) ومضمون فيه قيمة.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #38"
  },
  {
    "id": "p-mob-bank-39",
    "problemNumber": 39,
    "type": "true_false",
    "question": "The main.dart file is not the standard entry point of a Flutter project.",
    "questionAr": "الـ main.dart مش هو الملف الرئيسي في أي مشروع فلاتر.",
    "correctAnswer": false,
    "solution": "lib/main.dart is the universal default entry point for all Flutter mobile, web, and desktop projects.",
    "solutionAr": "ملف lib/main.dart هو دايماً نقطة الانطلاق الأساسية لأي مشروع فلاتر.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #39"
  },
  {
    "id": "p-mob-bank-40",
    "problemNumber": 40,
    "type": "true_false",
    "question": "The pubspec.yaml file is used exclusively to store application images.",
    "questionAr": "الـ pubspec.yaml بيُستخدم بس عشان نخزن صور التطبيق.",
    "correctAnswer": false,
    "solution": "pubspec.yaml manages packages, dependencies, SDK constraints, metadata, fonts, and assets.",
    "solutionAr": "ملف pubspec.yaml هو ملف ضبط المشروع كامل؛ لإدارة المكتبات والخطوط والبيانات الأساسية مش للصور بس.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #40"
  },
  {
    "id": "p-mob-bank-41",
    "problemNumber": 41,
    "type": "true_false",
    "question": "The pubspec.yaml file contains project metadata, external dependencies, and asset configurations.",
    "questionAr": "الـ pubspec.yaml بيحتوي على إعدادات المشروع والمكتبات الخارجية (Dependencies) والخطوط.",
    "correctAnswer": true,
    "solution": "pubspec.yaml is the definitive configuration manifest for Dart and Flutter packages.",
    "solutionAr": "ملف pubspec.yaml هو المسئول عن تعريف مكتبات المشروع الخارجية وضبط مسارات الأصول والخطوط.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #41"
  },
  {
    "id": "p-mob-bank-42",
    "problemNumber": 42,
    "type": "true_false",
    "question": "The Icon widget is used to render glyphs from the built-in Icons collection in Flutter.",
    "questionAr": "الـ Icon widget بتُستخدم لعرض أيقونات من مكتبة Icons الجاهزة في فلاتر.",
    "correctAnswer": true,
    "solution": "Icon displays glyphs defined in IconData, such as Icons.home or Icons.favorite.",
    "solutionAr": "ويدجت Icon بتعرض الأيقونات الجاهزة من حزمة Icons في فلاتر بكل سهولة.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #42"
  },
  {
    "id": "p-mob-bank-43",
    "problemNumber": 43,
    "type": "true_false",
    "question": "The Divider widget renders a 1-pixel thin horizontal rule to separate list items or view segments.",
    "questionAr": "الـ Divider widget بتعمل خط أفقي فاصل بين العناصر في القائمة أو الشاشة.",
    "correctAnswer": true,
    "solution": "Divider provides a horizontal line, with configurable thickness, indentation, and color.",
    "solutionAr": "ويدجت Divider بتفصل بين العناصر أو السطور بخط أفقي منسق.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #43"
  },
  {
    "id": "p-mob-bank-44",
    "problemNumber": 44,
    "type": "true_false",
    "question": "The Card widget provides an elevated surface with rounded corners and drop shadows for grouping information.",
    "questionAr": "الـ Card widget بتقدم سطح مرتفع وله ظل وحواف مستديرة لتجميع البيانات.",
    "correctAnswer": true,
    "solution": "Card is a Material Design sheet that has slightly rounded corners and elevation.",
    "solutionAr": "الـ Card هي بطاقة بتصميم Material لها بروز وظل وحواف منحنية لتجميع البيانات المترابطة.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #44"
  },
  {
    "id": "p-mob-bank-45",
    "problemNumber": 45,
    "type": "true_false",
    "question": "In Dart, a variable marked as final can have its value reassigned multiple times after declaration.",
    "questionAr": "في دارت، المتغير من نوع final ينفع نغير قيمته كذا مرة بعد تعريفه.",
    "correctAnswer": false,
    "solution": "A final variable can be set only once; subsequent reassignments cause compile-time errors.",
    "solutionAr": "المتغير final بيتعين قيمته مرة واحدة بس ومستحيل يتغير بعد كده.",
    "conciseSolution": "Answer is false.",
    "conciseSolutionAr": "الإجابة خاطئة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #45"
  },
  {
    "id": "p-mob-bank-46",
    "problemNumber": 46,
    "type": "true_false",
    "question": "ListView.builder efficiently constructs long or infinite lists on demand as items scroll into view.",
    "questionAr": "الـ ListView.builder بيُستخدم لبناء قوائم طويلة أو لانهائية بكفاءة وحسب الحاجة.",
    "correctAnswer": true,
    "solution": "ListView.builder uses lazy rendering, creating only the child widgets currently visible on screen.",
    "solutionAr": "الـ ListView.builder بيوفر استهلاك الذاكرة جداً لأنه مش بيبني غير العناصر اللي ظاهرة قدامك على الشاشة بس.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #46"
  },
  {
    "id": "p-mob-bank-47",
    "problemNumber": 47,
    "type": "true_false",
    "question": "The Navigator widget manages application routing and screen navigation via a stack model.",
    "questionAr": "الـ Navigator بيُستخدم للتنقل بين الشاشات والصفحات في فلاتر.",
    "correctAnswer": true,
    "solution": "Navigator manages routes using push() and pop() operations on a history stack.",
    "solutionAr": "الـ Navigator هو المسئول عن فتح الشاشات الجديدة والرجوع منها بنظام المكدس (Stack).",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #47"
  },
  {
    "id": "p-mob-bank-48",
    "problemNumber": 48,
    "type": "true_false",
    "question": "The Drawer widget provides a sliding side panel anchored to the edge of a Scaffold.",
    "questionAr": "الـ Drawer بيُستخدم لعرض قائمة جانبية تنزلق من جانب الشاشة في فلاتر.",
    "correctAnswer": true,
    "solution": "Drawer renders a slide-in navigation menu from the start or end edge of a Scaffold.",
    "solutionAr": "الـ Drawer هو القائمة الجانبية اللي بتظهر لما تسحب من حافة الشاشة أو تدوس على أيقونة المنيو.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #48"
  },
  {
    "id": "p-mob-bank-49",
    "problemNumber": 49,
    "type": "true_false",
    "question": "The InkWell widget adds touch ripple effects and gesture handlers to non-interactive widgets.",
    "questionAr": "الـ InkWell بيضيف تأثير مائي (Ripple effect) واستجابة للمس على أي عنصر.",
    "correctAnswer": true,
    "solution": "InkWell wraps widgets to provide Material ink splash responses on tap.",
    "solutionAr": "ويدجت InkWell بتخلي أي عنصر يستجيب للنقر مع ظهور تأثير انتشار الحبر (Ripple) الشهير.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #49"
  },
  {
    "id": "p-mob-bank-50",
    "problemNumber": 50,
    "type": "true_false",
    "question": "The Text widget is used to display text on the screen.",
    "questionAr": "الـ Text widget بتُستخدم لعرض نصوص على الشاشة في فلاتر.",
    "correctAnswer": true,
    "solution": "Text is the standard widget for rendering a run of styled text within Flutter.",
    "solutionAr": "الـ Text هي الويدجت القياسية في فلاتر لكتابة وعرض النصوص على الشاشة.",
    "conciseSolution": "Answer is true.",
    "conciseSolutionAr": "الإجابة صحيحة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #50"
  },
  {
    "id": "p-mob-bank-51",
    "problemNumber": 51,
    "type": "mcq",
    "question": "What is the main function where Dart program execution starts?",
    "questionAr": "ما هي الدالة الرئيسية التي يبدأ منها تنفيذ برنامج Dart؟",
    "options": [
      "start()",
      "main()",
      "run()",
      "print()"
    ],
    "optionsAr": [
      "start()",
      "main()",
      "run()",
      "print()"
    ],
    "correctAnswer": 1,
    "solution": "Execution begins in main(), the required top-level entry point in Dart.",
    "solutionAr": "يبدأ تشغيل أي تطبيق دارت من دالة main() وهي نقطة الدخول الإلزامية.",
    "conciseSolution": "Option b: main().",
    "conciseSolutionAr": "الخيار b: main().",
    "sourceReference": "Flutter & Dart Question Bank, Problem #51"
  },
  {
    "id": "p-mob-bank-52",
    "problemNumber": 52,
    "type": "mcq",
    "question": "Which of the following is used to define a class in Dart?",
    "questionAr": "أي مما يلي يُستخدم لتعريف كلاس (Class) في لغة Dart؟",
    "options": [
      "object",
      "class",
      "function",
      "define"
    ],
    "optionsAr": [
      "object",
      "class",
      "function",
      "define"
    ],
    "correctAnswer": 1,
    "solution": "The 'class' keyword declares a new class blueprint in Dart.",
    "solutionAr": "تُستخدم الكلمة المحجوزة class لإنشاء وتعريف كلاس جديد في دارت.",
    "conciseSolution": "Option b: class.",
    "conciseSolutionAr": "الخيار b: class.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #52"
  },
  {
    "id": "p-mob-bank-53",
    "problemNumber": 53,
    "type": "mcq",
    "question": "What is the output of: int x=10; int y=5; print(x+y);",
    "questionAr": "ما ناتج الكود: int x=10; int y=5; print(x+y);؟",
    "options": [
      "5",
      "10",
      "15",
      "50"
    ],
    "optionsAr": [
      "5",
      "10",
      "15",
      "50"
    ],
    "correctAnswer": 2,
    "solution": "The + operator calculates the sum of 10 and 5, producing 15.",
    "solutionAr": "عملية الجمع 10 + 5 تعطي الناتج 15 ويتم طباعته على الشاشة.",
    "conciseSolution": "Option c: 15.",
    "conciseSolutionAr": "الخيار c: 15.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #53"
  },
  {
    "id": "p-mob-bank-54",
    "problemNumber": 54,
    "type": "mcq",
    "question": "Which of the following is used to print data to the screen?",
    "questionAr": "أي مما يلي يُستخدم لطباعة البيانات والمخرجات على الشاشة؟",
    "options": [
      "display()",
      "show()",
      "print()",
      "output()"
    ],
    "optionsAr": [
      "display()",
      "show()",
      "print()",
      "output()"
    ],
    "correctAnswer": 2,
    "solution": "The print() function outputs strings and variable values to the debug console.",
    "solutionAr": "دالة print() هي الدالة القياسية لطباعة النصوص والمخرجات في نافذة الكونسول.",
    "conciseSolution": "Option c: print().",
    "conciseSolutionAr": "الخيار c: print().",
    "sourceReference": "Flutter & Dart Question Bank, Problem #54"
  },
  {
    "id": "p-mob-bank-55",
    "problemNumber": 55,
    "type": "mcq",
    "question": "What is the appropriate data type to store a text value?",
    "questionAr": "ما هو نوع البيانات المناسب لتخزين قيمة نصية؟",
    "options": [
      "int",
      "String",
      "double",
      "bool"
    ],
    "optionsAr": [
      "int",
      "String",
      "double",
      "bool"
    ],
    "correctAnswer": 1,
    "solution": "String represents sequences of UTF-16 code units for textual data.",
    "solutionAr": "نوع البيانات String هو المخصص لتخزين النصوص والكلمات في لغة دارت.",
    "conciseSolution": "Option b: String.",
    "conciseSolutionAr": "الخيار b: String.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #55"
  },
  {
    "id": "p-mob-bank-56",
    "problemNumber": 56,
    "type": "mcq",
    "question": "What data type is used to store integer values?",
    "questionAr": "ما هو نوع البيانات المستخدم لتخزين الأعداد الصحيحة؟",
    "options": [
      "String",
      "bool",
      "int",
      "double"
    ],
    "optionsAr": [
      "String",
      "bool",
      "int",
      "double"
    ],
    "correctAnswer": 2,
    "solution": "The int type stores 64-bit non-fractional integer values.",
    "solutionAr": "نوع البيانات int مخصص لحفظ الأعداد الصحيحة بدون كسور.",
    "conciseSolution": "Option c: int.",
    "conciseSolutionAr": "الخيار c: int.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #56"
  },
  {
    "id": "p-mob-bank-57",
    "problemNumber": 57,
    "type": "mcq",
    "question": "What data type is used to store decimal numbers?",
    "questionAr": "ما هو نوع البيانات المستخدم لتخزين الأعداد العشرية؟",
    "options": [
      "int",
      "double",
      "String",
      "bool"
    ],
    "optionsAr": [
      "int",
      "double",
      "String",
      "bool"
    ],
    "correctAnswer": 1,
    "solution": "The double type represents 64-bit floating-point numbers.",
    "solutionAr": "نوع البيانات double مخصص للأرقام التي تحتوي على كسور عشرية.",
    "conciseSolution": "Option b: double.",
    "conciseSolutionAr": "الخيار b: double.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #57"
  },
  {
    "id": "p-mob-bank-58",
    "problemNumber": 58,
    "type": "mcq",
    "question": "What keyword is used to define a variable whose value can change?",
    "questionAr": "ما هي الكلمة المحجوزة لتعريف متغير يمكن تغيير قيمته لاحقاً؟",
    "options": [
      "final",
      "const",
      "var",
      "static"
    ],
    "optionsAr": [
      "final",
      "const",
      "var",
      "static"
    ],
    "correctAnswer": 2,
    "solution": "var declares a mutable variable whose type is inferred.",
    "solutionAr": "الكلمة var تُستخدم لتعريف متغير قابل لتعديل وتغيير قيمته أثناء التشغيل.",
    "conciseSolution": "Option c: var.",
    "conciseSolutionAr": "الخيار c: var.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #58"
  },
  {
    "id": "p-mob-bank-59",
    "problemNumber": 59,
    "type": "mcq",
    "question": "What is the main difference between final and const?",
    "questionAr": "ما هو الفرق الأساسي بين final و const؟",
    "options": [
      "There is no difference",
      "final is assigned once, while const is for compile-time constants",
      "const can always be changed",
      "final is for texts only"
    ],
    "optionsAr": [
      "لا يوجد فرق",
      "final تُحدد قيمته مرة واحدة وقت التشغيل، بينما const للثوابت وقت الترجمة",
      "const يمكن تعديلها دائماً",
      "final للنصوص فقط"
    ],
    "correctAnswer": 1,
    "solution": "const variables must be known at compile time, whereas final values can be calculated at runtime but set only once.",
    "solutionAr": "المتغير const ثابت معروف وقت الترجمة (Compile-time)، أما final يمكن حسابه وقت التشغيل ويتعين مرة واحدة فقط.",
    "conciseSolution": "Option b: final is assigned once, while const is for compile-time constants.",
    "conciseSolutionAr": "الخيار b: final تُحدد قيمته مرة واحدة وقت التشغيل، بينما const للثوابت وقت الترجمة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #59"
  },
  {
    "id": "p-mob-bank-60",
    "problemNumber": 60,
    "type": "mcq",
    "question": "What is the output of: int x=20; print(x ~/ 4);",
    "questionAr": "ما ناتج الكود: int x=20; print(x ~/ 4);؟",
    "options": [
      "4",
      "5",
      "6",
      "8"
    ],
    "optionsAr": [
      "4",
      "5",
      "6",
      "8"
    ],
    "correctAnswer": 1,
    "solution": "The ~/ operator performs truncating integer division: 20 ~/ 4 = 5.",
    "solutionAr": "المعامل ~/ يُجري قسمة صحيحة بدون كسور، ناتج 20 ÷ 4 يساوي 5.",
    "conciseSolution": "Option b: 5.",
    "conciseSolutionAr": "الخيار b: 5.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #60"
  },
  {
    "id": "p-mob-bank-61",
    "problemNumber": 61,
    "type": "mcq",
    "question": "What is the function of return inside a function?",
    "questionAr": "ما وظيفة جملة return داخل الدالة؟",
    "options": [
      "Repeat commands",
      "Return a value and terminate the function",
      "Define a variable",
      "Print a value"
    ],
    "optionsAr": [
      "تكرار الأوامر",
      "إرجاع قيمة وإنهاء تنفيذ الدالة فوراً",
      "تعريف متغير جديد",
      "طباعة قيمة على الشاشة"
    ],
    "correctAnswer": 1,
    "solution": "return passes a result back to the caller and terminates the function.",
    "solutionAr": "تعيد جملة return النتيجة لجهة الاستدعاء وتنهي عمل الدالة فوراً.",
    "conciseSolution": "Option b: Return a value and terminate the function.",
    "conciseSolutionAr": "الخيار b: إرجاع قيمة وإنهاء تنفيذ الدالة فوراً.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #61"
  },
  {
    "id": "p-mob-bank-62",
    "problemNumber": 62,
    "type": "mcq",
    "question": "What is the output of: int x=10; if(x>5){print('A');} else {print('B');}",
    "questionAr": "ما ناتج الكود: int x=10; if(x>5){print('A');} else {print('B');}؟",
    "options": [
      "A",
      "B",
      "10",
      "Nothing"
    ],
    "optionsAr": [
      "A",
      "B",
      "10",
      "لا شيء"
    ],
    "correctAnswer": 0,
    "solution": "Since 10 > 5 is true, the if branch executes and prints 'A'.",
    "solutionAr": "بما أن 10 أكبر من 5 فالشرط صحيح ويتم تنفيذ جملة print('A').",
    "conciseSolution": "Option a: A.",
    "conciseSolutionAr": "الخيار a: A.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #62"
  },
  {
    "id": "p-mob-bank-63",
    "problemNumber": 63,
    "type": "mcq",
    "question": "Which operator is used to check inequality between two values?",
    "questionAr": "أي معامل يُستخدم للتحقق من عدم تساوي قيمتين (Inequality)؟",
    "options": [
      "==",
      "=",
      "!=",
      ">="
    ],
    "optionsAr": [
      "==",
      "=",
      "!=",
      ">="
    ],
    "correctAnswer": 2,
    "solution": "!= evaluates whether two values are not equal.",
    "solutionAr": "المعامل != يتحقق من عدم التساوي ويرجع true إذا كانت القيمتان مختلفتين.",
    "conciseSolution": "Option c: !=.",
    "conciseSolutionAr": "الخيار c: !=.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #63"
  },
  {
    "id": "p-mob-bank-64",
    "problemNumber": 64,
    "type": "mcq",
    "question": "Which keyword is used to create an object from a class?",
    "questionAr": "أي كلمة محجوزة تُستخدم لإنشاء كائن (Object) من الكلاس في النمط الكلاسيكي؟",
    "options": [
      "new",
      "class",
      "return",
      "extends"
    ],
    "optionsAr": [
      "new",
      "class",
      "return",
      "extends"
    ],
    "correctAnswer": 0,
    "solution": "Historically 'new' instantiates objects; in modern Dart it is optional.",
    "solutionAr": "تُستخدم الكلمة new لإنشاء كائن جديد من الكلاس (وهي اختيارية في دارت الحديثة).",
    "conciseSolution": "Option a: new.",
    "conciseSolutionAr": "الخيار a: new.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #64"
  },
  {
    "id": "p-mob-bank-65",
    "problemNumber": 65,
    "type": "mcq",
    "question": "What is the function of the Constructor?",
    "questionAr": "ما هي وظيفة الدالة الإنشائية (Constructor)؟",
    "options": [
      "Delete the object",
      "Initialize the object when created",
      "Print data",
      "Repeat commands"
    ],
    "optionsAr": [
      "حذف الكائن",
      "تهيئة الكائن وتعيين قيمه الابتدائية عند إنشائه",
      "طباعة البيانات",
      "تكرار الأوامر"
    ],
    "correctAnswer": 1,
    "solution": "Constructors initialize the newly created object and its state.",
    "solutionAr": "وظيفة Constructor هي تهيئة كائن جديد وتجهيز بياناته وحقوله الأولية.",
    "conciseSolution": "Option b: Initialize the object when created.",
    "conciseSolutionAr": "الخيار b: تهيئة الكائن وتعيين قيمه الابتدائية عند إنشائه.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #65"
  },
  {
    "id": "p-mob-bank-66",
    "problemNumber": 66,
    "type": "mcq",
    "question": "Which of the following is used to define a list in Dart?",
    "questionAr": "أي مما يلي يُستخدم لتعريف قائمة (List) في Dart؟",
    "options": [
      "List",
      "Loop",
      "Class",
      "Function"
    ],
    "optionsAr": [
      "List",
      "Loop",
      "Class",
      "Function"
    ],
    "correctAnswer": 0,
    "solution": "List represents an ordered indexable collection of elements.",
    "solutionAr": "نوع البيانات List هو الكائن المخصص لإنشاء القوائم والمصفوفات في دارت.",
    "conciseSolution": "Option a: List.",
    "conciseSolutionAr": "الخيار a: List.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #66"
  },
  {
    "id": "p-mob-bank-67",
    "problemNumber": 67,
    "type": "mcq",
    "question": "What is the index number of the first element in a List?",
    "questionAr": "ما هو رقم الفهرس (Index) لأول عنصر في القائمة List؟",
    "options": [
      "1",
      "0",
      "2",
      "-1"
    ],
    "optionsAr": [
      "1",
      "0",
      "2",
      "-1"
    ],
    "correctAnswer": 1,
    "solution": "Dart uses 0-based indexing for collections.",
    "solutionAr": "الفهرسة في دارت تبدأ من الصفر، فالعنصر الأول يحمل الفهرس 0.",
    "conciseSolution": "Option b: 0.",
    "conciseSolutionAr": "الخيار b: 0.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #67"
  },
  {
    "id": "p-mob-bank-68",
    "problemNumber": 68,
    "type": "mcq",
    "question": "What is the output of: List<int> numbers=[10, 20, 30]; print(numbers[1]);",
    "questionAr": "ما ناتج الكود: List<int> numbers=[10, 20, 30]; print(numbers[1]);؟",
    "options": [
      "10",
      "20",
      "30",
      "1"
    ],
    "optionsAr": [
      "10",
      "20",
      "30",
      "1"
    ],
    "correctAnswer": 1,
    "solution": "Index 1 targets the second item in the list, which is 20.",
    "solutionAr": "الفهرس 1 يشير للعنصر الثاني في القائمة وهو القيمة 20.",
    "conciseSolution": "Option b: 20.",
    "conciseSolutionAr": "الخيار b: 20.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #68"
  },
  {
    "id": "p-mob-bank-69",
    "problemNumber": 69,
    "type": "mcq",
    "question": "Which loop is used to execute commands a specific number of times?",
    "questionAr": "أي حلقة تكرارية تُستخدم لتكرار الأوامر لعدد محدد من المرات؟",
    "options": [
      "if",
      "for",
      "switch",
      "return"
    ],
    "optionsAr": [
      "if",
      "for",
      "switch",
      "return"
    ],
    "correctAnswer": 1,
    "solution": "The standard for loop executes a block a known number of iterations.",
    "solutionAr": "حلقة for التكرارية هي الأنسب لتكرار الأوامر لعدد محدد ومسبق من المرات.",
    "conciseSolution": "Option b: for.",
    "conciseSolutionAr": "الخيار b: for.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #69"
  },
  {
    "id": "p-mob-bank-70",
    "problemNumber": 70,
    "type": "mcq",
    "question": "What is the function of break?",
    "questionAr": "ما هي وظيفة أمر break؟",
    "options": [
      "Skip current iteration",
      "Terminate the loop",
      "Start the loop",
      "Define a variable"
    ],
    "optionsAr": [
      "تخطي التكرار الحالي",
      "إنهاء الحلقة التكرارية تماماً والخروج منها",
      "بدء الحلقة",
      "تعريف متغير"
    ],
    "correctAnswer": 1,
    "solution": "break halts loop execution immediately and transfers control out of the loop.",
    "solutionAr": "أمر break ينهي التكرار فوراً ويخرج من جسم الحلقة تماماً.",
    "conciseSolution": "Option b: Terminate the loop.",
    "conciseSolutionAr": "الخيار b: إنهاء الحلقة التكرارية تماماً والخروج منها.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #70"
  },
  {
    "id": "p-mob-bank-71",
    "problemNumber": 71,
    "type": "mcq",
    "question": "What is the function of continue?",
    "questionAr": "ما هي وظيفة أمر continue؟",
    "options": [
      "Terminate the program",
      "Skip current iteration and move to next",
      "Stop all loops permanently",
      "Return a value"
    ],
    "optionsAr": [
      "إنهاء البرنامج",
      "تخطي التكرار الحالي والانتقال للتكرار التالي",
      "إيقاف كل الحلقات",
      "إرجاع قيمة"
    ],
    "correctAnswer": 1,
    "solution": "continue abandons the current iteration and begins the next iteration cycle.",
    "solutionAr": "أمر continue يتخطى باقي السطور في اللفة الحالية وينتقل للّفة التالية مباشرة.",
    "conciseSolution": "Option b: Skip current iteration and move to next.",
    "conciseSolutionAr": "الخيار b: تخطي التكرار الحالي والانتقال للتكرار التالي.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #71"
  },
  {
    "id": "p-mob-bank-72",
    "problemNumber": 72,
    "type": "mcq",
    "question": "Which of the following is used to check more than one condition?",
    "questionAr": "أي مما يلي يُستخدم لاختبار أكثر من شرط متتالي؟",
    "options": [
      "if / else if",
      "print",
      "return",
      "class"
    ],
    "optionsAr": [
      "if / else if",
      "print",
      "return",
      "class"
    ],
    "correctAnswer": 0,
    "solution": "if / else if chains permit evaluating multiple alternate conditions.",
    "solutionAr": "تُستخدم بنية if / else if لفحص شروط متعددة واختيار المسار المناسب.",
    "conciseSolution": "Option a: if / else if.",
    "conciseSolutionAr": "الخيار a: if / else if.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #72"
  },
  {
    "id": "p-mob-bank-73",
    "problemNumber": 73,
    "type": "mcq",
    "question": "What is the output of: int x=5; int y=2; print(x*y);",
    "questionAr": "ما ناتج الكود: int x=5; int y=2; print(x*y);؟",
    "options": [
      "7",
      "10",
      "3",
      "2"
    ],
    "optionsAr": [
      "7",
      "10",
      "3",
      "2"
    ],
    "correctAnswer": 1,
    "solution": "The * operator calculates 5 multiplied by 2, yielding 10.",
    "solutionAr": "عملية الضرب 5 × 2 تعطي الناتج 10.",
    "conciseSolution": "Option b: 10.",
    "conciseSolutionAr": "الخيار b: 10.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #73"
  },
  {
    "id": "p-mob-bank-74",
    "problemNumber": 74,
    "type": "mcq",
    "question": "Which logical operator returns true when both conditions are true?",
    "questionAr": "أي معامل منطقي يرجع true فقط إذا تحقق كلا الشرطين معاً؟",
    "options": [
      "||",
      "!",
      "&&",
      "!="
    ],
    "optionsAr": [
      "||",
      "!",
      "&&",
      "!="
    ],
    "correctAnswer": 2,
    "solution": "The && (logical AND) operator requires truth from both conditions.",
    "solutionAr": "المعامل المنطقي && (AND) يشترط تحقق كلا الشرطين معاً ليرجع true.",
    "conciseSolution": "Option c: &&.",
    "conciseSolutionAr": "الخيار c: &&.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #74"
  },
  {
    "id": "p-mob-bank-75",
    "problemNumber": 75,
    "type": "mcq",
    "question": "What keyword is used to create a class that inherits from another class?",
    "questionAr": "ما هي الكلمة المحجوزة لإنشاء كلاس يرث من كلاس آخر؟",
    "options": [
      "implements",
      "extends",
      "return",
      "import"
    ],
    "optionsAr": [
      "implements",
      "extends",
      "return",
      "import"
    ],
    "correctAnswer": 1,
    "solution": "extends designates the superclass from which the new class inherits.",
    "solutionAr": "تُستخدم الكلمة extends لوراثة الخصائص والدوال من كلاس أساسي آخر.",
    "conciseSolution": "Option b: extends.",
    "conciseSolutionAr": "الخيار b: extends.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #75"
  },
  {
    "id": "p-mob-bank-76",
    "problemNumber": 76,
    "type": "mcq",
    "question": "What is the function of a Function in Dart?",
    "questionAr": "ما وظيفة الدالة (Function) في لغة Dart؟",
    "options": [
      "Organize commands and reuse them",
      "Store images only",
      "Create files only",
      "Change screen color only"
    ],
    "optionsAr": [
      "تنظيم الأوامر وإعادة استخدامها",
      "تخزين الصور فقط",
      "إنشاء ملفات فقط",
      "تغيير ألوان الشاشة فقط"
    ],
    "correctAnswer": 0,
    "solution": "Functions package executable logic into modular, reusable blocks.",
    "solutionAr": "تُستخدم الدوال لتجميع الأوامر البرمجية وإعادة استخدامها وتنظيم الكود.",
    "conciseSolution": "Option a: Organize commands and reuse them.",
    "conciseSolutionAr": "الخيار a: تنظيم الأوامر وإعادة استخدامها.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #76"
  },
  {
    "id": "p-mob-bank-77",
    "problemNumber": 77,
    "type": "mcq",
    "question": "Which of the following is used to store a boolean value?",
    "questionAr": "أي من الأنواع التالية يُستخدم لتخزين قيمة منطقية (صح أو خطأ)؟",
    "options": [
      "String",
      "int",
      "bool",
      "double"
    ],
    "optionsAr": [
      "String",
      "int",
      "bool",
      "double"
    ],
    "correctAnswer": 2,
    "solution": "bool stores boolean values: true or false.",
    "solutionAr": "نوع البيانات bool مخصص لتخزين القيم المنطقية true أو false.",
    "conciseSolution": "Option c: bool.",
    "conciseSolutionAr": "الخيار c: bool.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #77"
  },
  {
    "id": "p-mob-bank-78",
    "problemNumber": 78,
    "type": "mcq",
    "question": "What is the output of: var x=10; x=15; print(x);",
    "questionAr": "ما ناتج الكود: var x=10; x=15; print(x);؟",
    "options": [
      "10",
      "15",
      "25",
      "Error"
    ],
    "optionsAr": [
      "10",
      "15",
      "25",
      "خطأ"
    ],
    "correctAnswer": 1,
    "solution": "The mutable variable x is reassigned 15, which is then printed.",
    "solutionAr": "المتغير x تم تعريفه بـ 10 ثم تعديل قيمته إلى 15، فيتم طباعة 15.",
    "conciseSolution": "Option b: 15.",
    "conciseSolutionAr": "الخيار b: 15.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #78"
  },
  {
    "id": "p-mob-bank-79",
    "problemNumber": 79,
    "type": "mcq",
    "question": "Which loop executes commands at least once before checking the condition?",
    "questionAr": "أي حلقة تكرارية تنفذ الأوامر مرة واحدة على الأقل قبل فحص الشرط؟",
    "options": [
      "for",
      "while",
      "do-while",
      "for-in"
    ],
    "optionsAr": [
      "for",
      "while",
      "do-while",
      "for-in"
    ],
    "correctAnswer": 2,
    "solution": "do-while checks its exit boolean after the body executes.",
    "solutionAr": "حلقة do-while تنفذ جسم التكرار أولاً ثم تفحص الشرط في النهاية.",
    "conciseSolution": "Option c: do-while.",
    "conciseSolutionAr": "الخيار c: do-while.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #79"
  },
  {
    "id": "p-mob-bank-80",
    "problemNumber": 80,
    "type": "mcq",
    "question": "What is the function of List.length?",
    "questionAr": "ما هي وظيفة خاصية List.length؟",
    "options": [
      "Delete list elements",
      "Get number of elements in list",
      "Add element to list",
      "Sort list elements[10][20][30][1] *Second: Flutter (20 Questions)*"
    ],
    "optionsAr": [
      "حذف عناصر القائمة",
      "معرفة عدد العناصر الموجودة في القائمة",
      "إضافة عنصر جديد للقائمة",
      "ترتيب عناصر القائمة"
    ],
    "correctAnswer": 1,
    "solution": "List.length returns the integer count of elements in the collection.",
    "solutionAr": "الخاصية List.length ترجع إجمالي عدد العناصر المخزنة في القائمة.",
    "conciseSolution": "Option b: Get number of elements in list.",
    "conciseSolutionAr": "الخيار b: معرفة عدد العناصر الموجودة في القائمة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #80"
  },
  {
    "id": "p-mob-bank-81",
    "problemNumber": 81,
    "type": "mcq",
    "question": "Which widget provides the basic visual structure for an app screen?",
    "questionAr": "أي ويدجت توفر الهيكل البصري والتخطيط الأساسي لشاشات التطبيق؟",
    "options": [
      "Text",
      "Scaffold",
      "Image",
      "Container"
    ],
    "optionsAr": [
      "Text",
      "Scaffold",
      "Image",
      "Container"
    ],
    "correctAnswer": 1,
    "solution": "Scaffold implements the basic Material Design visual layout structure.",
    "solutionAr": "توفر ويدجت Scaffold الهيكل العام للصفحة كشريط العنوان وجسم الصفحة والأزرار العائمة.",
    "conciseSolution": "Option b: Scaffold.",
    "conciseSolutionAr": "الخيار b: Scaffold.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #81"
  },
  {
    "id": "p-mob-bank-82",
    "problemNumber": 82,
    "type": "mcq",
    "question": "What is the main purpose of MaterialApp?",
    "questionAr": "ما هو الهدف الأساسي من ويدجت MaterialApp؟",
    "options": [
      "Display an image",
      "Create a text field",
      "Provide the base structure for a Material Design app",
      "Arrange elements horizontally"
    ],
    "optionsAr": [
      "عرض صورة",
      "إنشاء حقل نصي",
      "توفير البنية التحتية لتطبيق مبني بنمط Material Design",
      "ترتيب العناصر أفقياً"
    ],
    "correctAnswer": 2,
    "solution": "MaterialApp initializes routing, theme configuration, and Material widgets.",
    "solutionAr": "ويدجت MaterialApp تضبط إعدادات التطبيق العامة والثيم والتوجيه بنمط تصميم Material.",
    "conciseSolution": "Option c: Provide the base structure for a Material Design app.",
    "conciseSolutionAr": "الخيار c: توفير البنية التحتية لتطبيق مبني بنمط Material Design.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #82"
  },
  {
    "id": "p-mob-bank-83",
    "problemNumber": 83,
    "type": "mcq",
    "question": "Which property inside Scaffold is used to display the main content of the screen?",
    "questionAr": "أي خاصية داخل Scaffold تُستخدم لعرض المحتوى الرئيسي للشاشة؟",
    "options": [
      "appBar",
      "body",
      "backgroundColor",
      "title"
    ],
    "optionsAr": [
      "appBar",
      "body",
      "backgroundColor",
      "title"
    ],
    "correctAnswer": 1,
    "solution": "The body property contains the primary widget tree displayed below the app bar.",
    "solutionAr": "خاصية body في Scaffold هي المسؤولة عن احتواء وعرض المحتوى الأساسي للشاشة.",
    "conciseSolution": "Option b: body.",
    "conciseSolutionAr": "الخيار b: body.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #83"
  },
  {
    "id": "p-mob-bank-84",
    "problemNumber": 84,
    "type": "mcq",
    "question": "Which widget is used to display an image from the internet?",
    "questionAr": "أي ويدجت تُستخدم لعرض صورة محملة عبر رابط الإنترنت؟",
    "options": [
      "Image.asset()",
      "Image.file()",
      "Image.network()",
      "Image.text()"
    ],
    "optionsAr": [
      "Image.asset()",
      "Image.file()",
      "Image.network()",
      "Image.text()"
    ],
    "correctAnswer": 2,
    "solution": "Image.network downloads and renders image data from a specified URI.",
    "solutionAr": "تُستخدم Image.network لتحميل وعرض الصور مباشرة من الإنترنت عبر رابط URL.",
    "conciseSolution": "Option c: Image.network().",
    "conciseSolutionAr": "الخيار c: Image.network().",
    "sourceReference": "Flutter & Dart Question Bank, Problem #84"
  },
  {
    "id": "p-mob-bank-85",
    "problemNumber": 85,
    "type": "mcq",
    "question": "What is the function of the Center widget?",
    "questionAr": "ما هي وظيفة ويدجت Center؟",
    "options": [
      "Add color to screen",
      "Place its child in the center",
      "Display an image",
      "Create multiple screens"
    ],
    "optionsAr": [
      "إضافة لون للشاشة",
      "وضع الويدجت الابن في منتصف المساحة المتاحة تماماً",
      "عرض صورة",
      "إنشاء شاشات متعددة"
    ],
    "correctAnswer": 1,
    "solution": "Center positions its single child widget directly in the middle of itself.",
    "solutionAr": "تقوم ويدجت Center بمحاذاة العنصر التابع لها في المركز تماماً أفقياً ورأسياً.",
    "conciseSolution": "Option b: Place its child in the center.",
    "conciseSolutionAr": "الخيار b: وضع الويدجت الابن في منتصف المساحة المتاحة تماماً.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #85"
  },
  {
    "id": "p-mob-bank-86",
    "problemNumber": 86,
    "type": "mcq",
    "question": "Which of the following is a property of Scaffold?",
    "questionAr": "أي مما يلي يُعد من خصائص ويدجت Scaffold؟",
    "options": [
      "fontSize",
      "backgroundColor",
      "borderRadius",
      "fontWeight"
    ],
    "optionsAr": [
      "fontSize",
      "backgroundColor",
      "borderRadius",
      "fontWeight"
    ],
    "correctAnswer": 1,
    "solution": "backgroundColor sets the background color of the entire Scaffold canvas.",
    "solutionAr": "خاصية backgroundColor تتيح تحديد لون خلفية الشاشة بالكامل داخل Scaffold.",
    "conciseSolution": "Option b: backgroundColor.",
    "conciseSolutionAr": "الخيار b: backgroundColor.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #86"
  },
  {
    "id": "p-mob-bank-87",
    "problemNumber": 87,
    "type": "mcq",
    "question": "What does the child property inside a widget mean?",
    "questionAr": "ماذا تعني خاصية child داخل الويدجت؟",
    "options": [
      "Background color",
      "The widget inside another widget",
      "Screen height",
      "Text size"
    ],
    "optionsAr": [
      "لون الخلفية",
      "الويدجت التابعة والموجودة بداخل ويدجت أخرى",
      "ارتفاع الشاشة",
      "حجم النص"
    ],
    "correctAnswer": 1,
    "solution": "The child property houses the single nested sub-widget within a parent container.",
    "solutionAr": "خاصية child تعبر عن الويدجت الفردية المتضمنة داخل ويدجت الحاوية الأب.",
    "conciseSolution": "Option b: The widget inside another widget.",
    "conciseSolutionAr": "الخيار b: الويدجت التابعة والموجودة بداخل ويدجت أخرى.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #87"
  },
  {
    "id": "p-mob-bank-88",
    "problemNumber": 88,
    "type": "mcq",
    "question": "Which widget is used to create a rectangular area with width, height, color and margin?",
    "questionAr": "أي ويدجت تُستخدم لإنشاء مساحة مستطيلة بأبعاد محددة ولون وهوامش؟",
    "options": [
      "Text",
      "Container",
      "Center",
      "MaterialApp"
    ],
    "optionsAr": [
      "Text",
      "Container",
      "Center",
      "MaterialApp"
    ],
    "correctAnswer": 1,
    "solution": "Container combines painting, positioning, and sizing widgets into a rectangular box.",
    "solutionAr": "ويدجت Container تمثل صندوقاً مستطيلاً يمكن التحكم في عرضه وارتفاعه ولونه وهوامشه.",
    "conciseSolution": "Option b: Container.",
    "conciseSolutionAr": "الخيار b: Container.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #88"
  },
  {
    "id": "p-mob-bank-89",
    "problemNumber": 89,
    "type": "mcq",
    "question": "Which of the following is a single-child layout widget?",
    "questionAr": "أي مما يلي يُعتبر ويدجت يستقبل ابناً واحداً فقط (Single-child layout)؟",
    "options": [
      "Row",
      "Column",
      "Container",
      "ListView"
    ],
    "optionsAr": [
      "Row",
      "Column",
      "Container",
      "ListView"
    ],
    "correctAnswer": 2,
    "solution": "Container accepts a single child, while Row, Column, and ListView accept children arrays.",
    "solutionAr": "ويدجت Container تأخذ ابناً واحداً فقط عبر خاصية child، بينما البقية تأخذ children.",
    "conciseSolution": "Option c: Container.",
    "conciseSolutionAr": "الخيار c: Container.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #89"
  },
  {
    "id": "p-mob-bank-90",
    "problemNumber": 90,
    "type": "mcq",
    "question": "Which widget is used to arrange multiple widgets horizontally?",
    "questionAr": "أي ويدجت تُستخدم لترتيب عدة عناصر أفقياً بجانب بعضها البعض؟",
    "options": [
      "Column",
      "Row",
      "Center",
      "Container"
    ],
    "optionsAr": [
      "Column",
      "Row",
      "Center",
      "Container"
    ],
    "correctAnswer": 1,
    "solution": "Row arranges multiple children widgets in a horizontal sequence.",
    "solutionAr": "ويدجت Row ترتب مجموعة الويدجتس التابعة لها في صف أفقي جنباً إلى جنب.",
    "conciseSolution": "Option b: Row.",
    "conciseSolutionAr": "الخيار b: Row.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #90"
  },
  {
    "id": "p-mob-bank-91",
    "problemNumber": 91,
    "type": "mcq",
    "question": "Which widget arranges its children vertically?",
    "questionAr": "أي ويدجت ترتب عناصرها التابعة بشكل رأسي فوق بعضها البعض؟",
    "options": [
      "Row",
      "Image",
      "Column",
      "Scaffold"
    ],
    "optionsAr": [
      "Row",
      "Image",
      "Column",
      "Scaffold"
    ],
    "correctAnswer": 2,
    "solution": "Column arranges its children vertically along the y-axis.",
    "solutionAr": "ويدجت Column ترتب الويدجتس رأسياً في عمود واحد من الأعلى للأسفل.",
    "conciseSolution": "Option c: Column.",
    "conciseSolutionAr": "الخيار c: Column.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #91"
  },
  {
    "id": "p-mob-bank-92",
    "problemNumber": 92,
    "type": "mcq",
    "question": "What is the purpose of the margin property inside Container?",
    "questionAr": "ما هي وظيفة خاصية margin داخل ويدجت Container؟",
    "options": [
      "Add space outside the widget",
      "Change text color",
      "Add an image",
      "Change font size"
    ],
    "optionsAr": [
      "إضافة مسافة فارغة خارج حدود الويدجت",
      "تغيير لون النص",
      "إضافة صورة",
      "تغيير حجم الخط"
    ],
    "correctAnswer": 0,
    "solution": "margin creates empty clearance space around the outside of the Container decoration.",
    "solutionAr": "خاصية margin تنشئ مسافة وهوامش فارغة خارج حدود الصندوق المستطيل.",
    "conciseSolution": "Option a: Add space outside the widget.",
    "conciseSolutionAr": "الخيار a: إضافة مسافة فارغة خارج حدود الويدجت.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #92"
  },
  {
    "id": "p-mob-bank-93",
    "problemNumber": 93,
    "type": "mcq",
    "question": "Which property is used to control the width of a Container?",
    "questionAr": "أي خاصية تُستخدم للتحكم في عرض (Width) ويدجت Container؟",
    "options": [
      "color",
      "height",
      "width",
      "child"
    ],
    "optionsAr": [
      "color",
      "height",
      "width",
      "child"
    ],
    "correctAnswer": 2,
    "solution": "width explicitly specifies the horizontal extent of a Container.",
    "solutionAr": "خاصية width تحدد العرض الأفقي لصندوق Container بالبكسل.",
    "conciseSolution": "Option c: width.",
    "conciseSolutionAr": "الخيار c: width.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #93"
  },
  {
    "id": "p-mob-bank-94",
    "problemNumber": 94,
    "type": "mcq",
    "question": "What is the purpose of borderRadius?",
    "questionAr": "ما هي وظيفة خاصية borderRadius؟",
    "options": [
      "Change background image",
      "Make widget corners rounded",
      "Increase width",
      "Change font style"
    ],
    "optionsAr": [
      "تغيير صورة الخلفية",
      "جعل حواف وزوايا الويدجت دائرية ومستديرة",
      "زيادة العرض",
      "تغيير نمط الخط"
    ],
    "correctAnswer": 1,
    "solution": "borderRadius rounds the corners of a box decoration.",
    "solutionAr": "خاصية borderRadius تجعل زوايا وحواف الصندوق أو البطاقة منحنية ومستديرة.",
    "conciseSolution": "Option b: Make widget corners rounded.",
    "conciseSolutionAr": "الخيار b: جعل حواف وزوايا الويدجت دائرية ومستديرة.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #94"
  },
  {
    "id": "p-mob-bank-95",
    "problemNumber": 95,
    "type": "mcq",
    "question": "Which widget is commonly used to display a circular or profile image?",
    "questionAr": "أي ويدجت تُستخدم عادة لعرض صورة شخصية دائرية (Profile Avatar)؟",
    "options": [
      "CircleAvatar",
      "Scaffold",
      "Text",
      "Padding"
    ],
    "optionsAr": [
      "CircleAvatar",
      "Scaffold",
      "Text",
      "Padding"
    ],
    "correctAnswer": 0,
    "solution": "CircleAvatar clips its background or image into a circular profile badge.",
    "solutionAr": "تُستخدم CircleAvatar خصيصاً لعرض الصور الدائرية أو الأحرف الأولى للمستخدم.",
    "conciseSolution": "Option a: CircleAvatar.",
    "conciseSolutionAr": "الخيار a: CircleAvatar.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #95"
  },
  {
    "id": "p-mob-bank-96",
    "problemNumber": 96,
    "type": "mcq",
    "question": "Which property controls the text size in Flutter?",
    "questionAr": "أي خاصية تتحكم في حجم الخط (Text Size) في فلاتر؟",
    "options": [
      "fontWeight",
      "fontSize",
      "color",
      "backgroundColor"
    ],
    "optionsAr": [
      "fontWeight",
      "fontSize",
      "color",
      "backgroundColor"
    ],
    "correctAnswer": 1,
    "solution": "fontSize inside TextStyle specifies text size in logical pixels.",
    "solutionAr": "الخاصية fontSize داخل TextStyle تحدد حجم الخط بالبكسل المنطقي.",
    "conciseSolution": "Option b: fontSize.",
    "conciseSolutionAr": "الخيار b: fontSize.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #96"
  },
  {
    "id": "p-mob-bank-97",
    "problemNumber": 97,
    "type": "mcq",
    "question": "Which property is used to change text color?",
    "questionAr": "أي خاصية تُستخدم لتغيير لون النص داخل TextStyle؟",
    "options": [
      "width",
      "height",
      "color",
      "margin"
    ],
    "optionsAr": [
      "width",
      "height",
      "color",
      "margin"
    ],
    "correctAnswer": 2,
    "solution": "color within TextStyle specifies the font foreground color.",
    "solutionAr": "خاصية color داخل TextStyle تحدد لون رسم الحروف والكلمات.",
    "conciseSolution": "Option c: color.",
    "conciseSolutionAr": "الخيار c: color.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #97"
  },
  {
    "id": "p-mob-bank-98",
    "problemNumber": 98,
    "type": "mcq",
    "question": "Which class provides a set of predefined colors in Flutter?",
    "questionAr": "أي كلاس في فلاتر يوفر لوحة ألوان جاهزة ومحددة مسبقاً؟",
    "options": [
      "TextStyle",
      "Colors",
      "Scaffold",
      "Image"
    ],
    "optionsAr": [
      "TextStyle",
      "Colors",
      "Scaffold",
      "Image"
    ],
    "correctAnswer": 1,
    "solution": "The Colors class provides static constants for standard Material color palettes.",
    "solutionAr": "كلاس Colors يحتوي على ثوابت الألوان القياسية الجاهزة مثل Colors.blue و Colors.amber.",
    "conciseSolution": "Option b: Colors.",
    "conciseSolutionAr": "الخيار b: Colors.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #98"
  },
  {
    "id": "p-mob-bank-99",
    "problemNumber": 99,
    "type": "mcq",
    "question": "What is the purpose of the Icon widget?",
    "questionAr": "ما هي وظيفة ويدجت Icon؟",
    "options": [
      "Display an icon",
      "Arrange elements",
      "Display a text paragraph",
      "Create a container"
    ],
    "optionsAr": [
      "عرض أيقونة رسومية",
      "ترتيب العناصر",
      "عرض فقرة نصية",
      "إنشاء حاوية"
    ],
    "correctAnswer": 0,
    "solution": "Icon renders scalable vector glyphs defined in Material or Cupertino packages.",
    "solutionAr": "تُستخدم ويدجت Icon لعرض الأيقونات والرموز الرسومية المضمنة في النظام.",
    "conciseSolution": "Option a: Display an icon.",
    "conciseSolutionAr": "الخيار a: عرض أيقونة رسومية.",
    "sourceReference": "Flutter & Dart Question Bank, Problem #99"
  },
  {
    "id": "p-mob-bank-100",
    "problemNumber": 100,
    "type": "mcq",
    "question": "In a widget tree, what does a Parent Widget contain?",
    "questionAr": "في شجرة الويدجت (Widget Tree)، ماذا يحتوي الويدجت الأب (Parent Widget)؟",
    "options": [
      "Colors only",
      "Other widgets inside called Children",
      "Images only",
      "Texts only"
    ],
    "optionsAr": [
      "ألوان فقط",
      "ويدجتس أخرى تابعة بداخله تُسمى الأبناء (Children)",
      "صور فقط",
      "نصوص فقط"
    ],
    "correctAnswer": 1,
    "solution": "Parent layout widgets contain other sub-widgets as child or children nodes.",
    "solutionAr": "يحتوي الويدجت الأب على ويدجتس تابعة مدمجة داخله تُعرف بالأبناء (Children) لبناء الواجهة.",
    "conciseSolution": "Option b: Other widgets inside called Children.",
    "conciseSolutionAr": "الخيار b: ويدجتس أخرى تابعة بداخله تُسمى الأبناء (Children).",
    "sourceReference": "Flutter & Dart Question Bank, Problem #100"
  }
];

export const MOBILE_PROGRAMMING_SHEET: CourseSheet = {
  id: 'mobile-sheet-1',
  courseId: 'mobile-programming',
  sheetNumber: 1,
  title: 'Question Bank',
  titleAr: 'بنك الأسئلة',
  brief: 'Mobile Programming Question Bank (100 questions).',
  briefAr: 'بنك أسئلة برمجة تطبيقات الموبايل (100 سؤال).',
  problemsCount: 100,
  hasSolution: true,
  problems: MOBILE_PROGRAMMING_PROBLEMS,
};

export const MOBILE_PROGRAMMING_COURSE: Course = {
  id: 'mobile-programming',
  title: 'Mobile Programming',
  titleAr: 'برمجة تطبيقات الموبايل',
  description: 'Mobile Programming question bank and study materials covering Dart programming language fundamentals and Flutter UI framework architecture.',
  descriptionAr: 'بنك أسئلة وتطبيقات مادة برمجة تطبيقات الموبايل يغطي أساسيات لغة Dart ومعمارية إطار العمل Flutter.',
  term: 1,
  icon: 'Smartphone',
  isAvailable: true,
  lectures: [],
  sheets: [MOBILE_PROGRAMMING_SHEET],
};

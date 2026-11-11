import type { Course } from '../types';

export const SIGNAL_PROCESSING_COURSE: Course = {
  "id": "signal-processing",
  "title": "Signal Processing",
  "titleAr": "معالجة الإشارات",
  "term": 1,
  "icon": "Activity",
  "description": "Book Chapter 1 only: signal digitization, discrete-time signals and transformations, system properties, convolution and difference equations, with visual experiments and source-based chapter exercises.",
  "descriptionAr": "الفصل الأول من الكتاب بس: رقمنة الإشارة والإشارات المتقطعة وتحويلاتها وخواص الأنظمة والالتفاف ومعادلات الفروق، مع تجارب بصرية وأسئلة نهاية الفصل من المصدر.",
  "isAvailable": true,
  "lectures": [
    {
      "id": "signal-lec-1",
      "courseId": "signal-processing",
      "lectureNumber": 1,
      "title": "Chapter 1: Foundations of Discrete-Time Signals and Systems",
      "titleAr": "الفصل الأول: أساسيات الإشارات والأنظمة المتقطعة",
      "brief": "The complete first book chapter: DSP conversion and hardware, elementary sequences, shifts and periodicity, system properties, convolution and difference equations. Worked examples and the original end-of-chapter exercises stay linked to their source pages.",
      "briefAr": "الفصل الأول كامل من الكتاب: التحويل والعتاد في DSP، والتتابعات الأساسية والإزاحات والدورية وخواص الأنظمة والالتفاف ومعادلات الفروق. الأمثلة المحلولة وأسئلة نهاية الفصل مربوطين بصفحات المصدر.",
      "durationMinutes": 55,
      "sections": [
        {
          "title": "1. A DSP System: Sample → Compute → Reconstruct",
          "titleAr": "1. من الإشارة للمعالجة والرجوع تاني",
          "content": "Digital signal processing manipulates numerical signal samples to filter, compress, enhance or analyze information. The first chapter follows the chain ADC → digital signal processor → DAC: digitize the input, compute an algorithm, and convert a result back to analog when the application needs it.",
          "contentAr": "معالجة الإشارات الرقمية بتتعامل مع عينات رقمية عشان ترشّح أو تضغط أو تحسّن أو تحلّل المعلومات. أول فصل بيتابع المسار ADC ← معالج الإشارة الرقمي ← DAC: حوّل الدخل لأرقام، نفّذ الخوارزمية، وارجع لإشارة مستمرة لو التطبيق محتاج ده.",
          "bulletPoints": [
            "Analog versus digital: Analog signals are continuous in their independent variable and amplitude; digitized signals have sampled time indices and finite encoded amplitude levels. A discrete-time sequence can still have continuous-valued samples before quantization.",
            "Signal flow: A microphone voltage enters an ADC, a processor filters its sample values, and a DAC can drive a loudspeaker through an analog output stage. A data-analysis application may not require a DAC.",
            "Why DSP: Programs can be changed without redesigning the analog circuit; repeatable arithmetic, storage and compression support audio, images, communications, biomedical sensing and radar/sonar. Digital systems are not immune to noise, clipping or transmission errors."
          ],
          "bulletPointsAr": [
            "مستمر ولا رقمي: الإشارة المستمرة زمنها وقيمتها مستمرين؛ والإشارة المُرقمنة ليها فهارس زمن متقطعة وقيم ممثلة بمستويات محدودة. التتابع المتقطع ممكن يفضل بقيم مستمرة قبل التكميم.",
            "مسار الإشارة: جهد الميكروفون يدخل ADC، والمعالج يرشّح أرقام العينات، والـ DAC ممكن يغذّي سماعة عبر مرحلة خرج مستمرة. تطبيق تحليل بيانات ممكن ما يحتاجش DAC.",
            "ليه DSP: نقدر نغيّر البرنامج بدل إعادة تصميم الدائرة المستمرة؛ والحساب المتكرر والتخزين والضغط بيخدموا الصوت والصور والاتصالات والطب والرادار والسونار. الأنظمة الرقمية مش محصّنة ضد الضوضاء أو القص أو أخطاء النقل."
          ],
          "keyRule": "ADC digitizes; the processor computes; DAC reconstructs an analog output. Do not confuse a DSP algorithm with the ADC hardware. Source: SignalProcessing.pdf, PDF pp. 4–5, 9–11, 16.",
          "keyRuleAr": "الـ ADC بيرقمن، والمعالج بيحسب، والـ DAC بيرجع خرج مستمر. ما تخلطش خوارزمية DSP بعتاد الـ ADC. المصدر: SignalProcessing.pdf، صفحات PDF 4–5, 9–11, 16.",
          "experimentIds": [
            "signal-sampling"
          ]
        },
        {
          "title": "2. Sampling and Quantization Are Different Decisions",
          "titleAr": "2. الزمن حاجة ودقة القيمة حاجة تانية",
          "content": "Sampling chooses when to measure; quantization chooses which representable amplitude to store. For a uniform sampling rate fₛ, Tₛ = 1/fₛ. N bits give 2ᴺ levels. These two settings control different axes and cannot substitute for one another.",
          "contentAr": "أخذ العينات بيحدد هنقيس إمتى؛ والتكميم بيحدد أنهي قيمة مسموح نخزّنها. لو معدل العينات ثابت fₛ، الفترة Tₛ = 1/fₛ. وعدد N بِت بيدي 2ᴺ مستوى. الإعدادين بيغيّروا محورين مختلفين، وواحد مش بديل عن التاني.",
          "bulletPoints": [
            "Sampling requirement: The book uses fₛ ≥ 2fmax for a band-limited input. In design, use margin above twice the highest retained frequency and an anti-alias filter; equality can be ambiguous for a sinusoid with an unfortunate phase.",
            "Worked sampling example: At fₛ = 8,000 samples/s, Tₛ = 125 microseconds. For a 3 kHz input component, 8 kHz exceeds 6 kHz; for an 8 kHz sine sampled at 12 kHz, a 4 kHz folded frequency illustrates aliasing.",
            "Worked amplitude example: 8 bits give 256 levels; 16 bits give 65,536. Nearest-level rounding introduces quantization error. With uniform step Δ and no overload, |error| ≤ Δ/2; the plot states its endpoint-level convention.",
            "Do not confuse resources: Raising the sampling rate adds time samples; raising bit depth refines each amplitude. Either can increase data size. More bits cannot recover frequency information already lost by aliasing."
          ],
          "bulletPointsAr": [
            "شرط أخذ العينات: الكتاب بيستخدم fₛ ≥ 2fmax لدخل محدود النطاق. عمليًا استخدم هامش أعلى من الضعف ومرشّح قبل أخذ العينات؛ المساواة ممكن تكون ملتبسة لموجة جيبية بطور غير مناسب.",
            "مثال على الزمن: عند 8,000 عينة/ثانية، Tₛ = 125 ميكروثانية. لمكوّن تردده 3 كيلوهرتز، معدل 8 أعلى من 6 كيلوهرتز؛ وموجة 8 كيلوهرتز بمعدل 12 ممكن تظهر كتردد مطوي 4 كيلوهرتز، وده مثال Aliasing.",
            "مثال على القيمة: 8 بِت بيدّوا 256 مستوى؛ و16 بِت بيدّوا 65,536. التقريب لأقرب مستوى بيعمل خطأ تكميم. بخطوة منتظمة Δ ومن غير تجاوز للمدى، مقدار الخطأ ≤ Δ/2؛ والرسم موضّح اتفاق مستويات الأطراف اللي بيستخدمه.",
            "ما تخلطش الموارد: زيادة معدل العينات بتضيف عينات زمنية؛ وزيادة البتات بتدقّق قيمة كل عينة. الاتنين ممكن يزوّدوا حجم البيانات. زيادة البتات مش هترجّع تردد ضاع بسبب Aliasing."
          ],
          "keyRule": "Sampling: time spacing. Quantization: amplitude spacing. Identify the axis before choosing a remedy. Source: SignalProcessing.pdf, PDF pp. 5–8.",
          "keyRuleAr": "أخذ العينات: مسافات الزمن. التكميم: مسافات القيم. حدّد المحور الأول قبل ما تختار الحل. المصدر: SignalProcessing.pdf، صفحات PDF 5–8.",
          "experimentIds": [
            "signal-sampling"
          ]
        },
        {
          "title": "3. The Processor: Why MAC and Harvard Matter",
          "titleAr": "3. المعالج بيكسب وقت إزاي؟",
          "content": "A digital signal processor is optimized for repeated numerical operations and predictable data movement. The book highlights multiply–accumulate (MAC), separate instruction/data access, and addressing modes for sample buffers and transform algorithms.",
          "contentAr": "معالج الإشارة الرقمي متجهّز لتكرار الحسابات ونقل البيانات بطريقة منتظمة. الكتاب بيركّز على الضرب والجمع MAC، والوصول المنفصل للتعليمات والبيانات، وطرق عنونة تخدم مخازن العينات وخوارزميات التحويل.",
          "bulletPoints": [
            "MAC: A filter tap computes accumulator += coefficient × sample. A three-tap moving average needs three products and their sum for each output; specialized hardware accelerates this common pattern.",
            "Harvard architecture: Separate program and data memory paths can fetch an instruction and data concurrently. It is not the same claim as completing an arbitrary convolution in one cycle.",
            "Addressing modes: Circular addressing reuses a sample ring buffer; bit-reversed addressing helps FFT access patterns. This chapter names their role; deriving the FFT belongs to a later chapter."
          ],
          "bulletPointsAr": [
            "الـ MAC: معامل الترشيح بيتحسب بالشكل accumulator += coefficient × sample. المتوسط المتحرك من 3 عينات محتاج 3 نواتج ضرب ومجموعهم لكل خرج؛ والعتاد المتخصص بيسرّع النمط المتكرر ده.",
            "معمارية Harvard: مسارات منفصلة لبرنامج وبيانات ممكن تجيب تعليمة وعينة في نفس الوقت. ده مش معناه إن أي عملية التفاف كاملة بتخلص في دورة واحدة.",
            "طرق العنونة: العنونة الدائرية بتعيد استخدام مخزن عينات حلقي؛ والعنونة بترتيب البتات المعكوس بتخدم الوصول في FFT. الفصل بيسمّي دورهم؛ اشتقاق FFT موضوع فصل لاحق."
          ],
          "keyRule": "MAC is multiply plus accumulation. Harvard is instruction/data access organization. They solve different bottlenecks. Source: SignalProcessing.pdf, PDF pp. 8–10.",
          "keyRuleAr": "الـ MAC ضرب مع تجميع. وHarvard تنظيم الوصول للتعليمات والبيانات. كل واحد بيعالج قيد مختلف. المصدر: SignalProcessing.pdf، صفحات PDF 8–10.",
          "experimentIds": [
            "signal-convolution"
          ]
        },
        {
          "title": "4. Impulse, Step and Exponential Building Blocks",
          "titleAr": "4. ثلاث إشارات تفهم بيهم الباقي",
          "content": "The unit impulse δ[n] is 1 only at n = 0. The unit step u[n] is 1 for n ≥ 0 and 0 otherwise. Real exponential sequences aⁿ model growth, decay and alternating signs. A shifted argument changes the input index, not the stored sample values themselves.",
          "contentAr": "نبضة الوحدة δ[n] قيمتها 1 عند n = 0 بس. وخطوة الوحدة u[n] قيمتها 1 لما n ≥ 0 وصفر غير كده. والأسّي الحقيقي aⁿ بيمثّل النمو والاضمحلال وتبادل الإشارة. تغيير وسيط التتابع بيغيّر الفهرس اللي بنسحب منه، مش قيمة العينة المتخزنة نفسها.",
          "bulletPoints": [
            "Impulse–step relation: δ[n] = u[n] − u[n−1]. Conversely u[n] = Σₖ₌₋∞ⁿ δ[k]. Therefore u[n] + u[−n] equals 1 away from 0 but equals 2 at 0 under this convention.",
            "Exponential cases: For increasing n, 0 < a < 1 decays; a > 1 grows; −1 < a < 0 decays with alternating sign; a < −1 grows in magnitude with alternating sign. A two-sided aⁿ need not be bounded in both directions.",
            "LTI eigenfunction property (book p. 14): Exponential sequences are eigenfunctions of LTI systems. When an exponential signal x[n] = zⁿ (or eʲʷⁿ) is applied to an LTI system, the output is the identical exponential sequence scaled by a complex scalar H(z), so y[n] = H(z)zⁿ. This property simplifies system analysis and forms the mathematical foundation of both the Z-transform and the Discrete-Time Fourier Transform (DTFT).",
            "Support example: If x is zero outside −2 ≤ n ≤ 4, x[n−3] can only be nonzero for 1 ≤ n ≤ 7. For x[−n+2], solve −2 ≤ −n+2 ≤ 4 to obtain −2 ≤ n ≤ 4. These intervals permit, but do not guarantee, nonzero values."
          ],
          "bulletPointsAr": [
            "العلاقة بين النبضة والخطوة: δ[n] = u[n] − u[n−1]. والعكس u[n] مجموع δ[k] من سالب ما لا نهاية لحد n. عشان كده u[n] + u[−n] قيمتها 1 بعيد عن الصفر، لكن 2 عند الصفر حسب التعريف ده.",
            "حالات الأسّي: مع زيادة n، لو 0 < a < 1 بيضمحل؛ ولو a > 1 بينمو؛ ولو −1 < a < 0 بيضمحل وإشارته بتتبادل؛ ولو a < −1 مقداره بينمو وإشارته بتتبادل. الإشارة aⁿ على الاتجاهين مش لازم تكون محدودة في الاتجاهين.",
            "خاصية الدالة الذاتية لأنظمة LTI (الكتاب ص 14): الإشارات الأسية دوال ذاتية (Eigenfunctions) لأنظمة LTI. عند تمرير x[n] = zⁿ (أو eʲʷⁿ) عبر نظام LTI، بيكون الخرج هو نفس الإشارة الأسية مضروبة في معامل قياسي مركب H(z)، بحيث y[n] = H(z)zⁿ. الخاصية دي بتبسّط تحليل الأنظمة وهي الأساس الرياضي لتحويل Z وتحويل فورييه للزمن المتقطع (DTFT).",
            "مثال حدود الإشارة: لو x صفر خارج −2 ≤ n ≤ 4، يبقى x[n−3] ممكن تكون غير صفر بس عند 1 ≤ n ≤ 7. وفي x[−n+2] حل −2 ≤ −n+2 ≤ 4 فتلاقي −2 ≤ n ≤ 4. المجالات دي بتسمح بقيم غير صفر، لكنها مش بتضمنها."
          ],
          "keyRule": "Work with the full argument inside x[·]. For guaranteed zeros, state the complement of the allowed support interval. Source: SignalProcessing.pdf, PDF pp. 12–15, 22.",
          "keyRuleAr": "اشتغل بوسيط x[·] كامل. ولما يُطلب الصفر المضمون، اكتب خارج مجال الدعم المسموح. المصدر: SignalProcessing.pdf، صفحات PDF 12–15, 22.",
          "experimentIds": [
            "discrete-signals",
            "signal-support"
          ]
        },
        {
          "title": "5. Periodicity, Reversal and Even/Odd Decomposition",
          "titleAr": "5. التكرار والتماثل من غير لخبطة",
          "content": "A discrete-time signal is periodic if some positive integer N makes x[n+N] = x[n] for every integer n. Even signals satisfy x[−n] = x[n]; odd signals satisfy x[−n] = −x[n]. Every sequence splits as xₑ[n] = (x[n]+x[−n])/2 and xₒ[n] = (x[n]−x[−n])/2.",
          "contentAr": "الإشارة المتقطعة دورية لو فيه عدد صحيح موجب N يخلّي x[n+N] = x[n] لكل n صحيح. الزوجية فيها x[−n] = x[n]؛ والفردية فيها x[−n] = −x[n]. أي تتابع ينقسم لجزء زوجي xₑ[n] = (x[n]+x[−n])/2 وجزء فردي xₒ[n] = (x[n]−x[−n])/2.",
          "bulletPoints": [
            "Integer period: For eʲʷⁿ or a nondegenerate sinusoid, require ωN = 2πk with integers N > 0 and k. A rational ω/(2π) gives a finite integer period; an irrational ratio does not.",
            "Book exercise 3: eʲ⁷πⁿ = eʲπⁿ = (−1)ⁿ. The smallest positive integer with 7πN = 2πk is N = 2. Do not use the continuous-time expression 2π/ω as a noninteger discrete-time period.",
            "Single exception breaks periodicity: u[n]+u[−n] is 1 except for value 2 at n=0, so it is not periodic. A finite plot may suggest a pattern; a proof must cover all n.",
            "Transforms and decomposition: Reverse first by replacing the input index n with −n; evaluate both x[n] and x[−n] after any specified shift. Check xₑ[n]+xₒ[n] = x[n] at each index."
          ],
          "bulletPointsAr": [
            "دورة صحيحة: في eʲʷⁿ أو موجة جيبية غير منعدمة، لازم ωN = 2πk بأعداد صحيحة N > 0 وk. لو ω/(2π) نسبي، فيه دورة صحيحة محدودة؛ ولو غير نسبي، مفيش.",
            "تمرين الكتاب 3: eʲ⁷πⁿ = eʲπⁿ = (−1)ⁿ. أصغر عدد صحيح موجب يحقق 7πN = 2πk هو N = 2. ما تستخدمش 2π/ω بتاعة الزمن المستمر وتطلع دورة متقطعة مش عدد صحيح.",
            "استثناء واحد يكسر الدورية: u[n]+u[−n] قيمتها 1 ما عدا 2 عند n=0، فمش دورية. الرسم المحدود ممكن يوحي بنمط؛ لكن الإثبات لازم يشمل كل n.",
            "التحويلات والتحليل: اعكس بتعويض فهرس الدخل n بـ −n، واحسب x[n] وx[−n] بعد الإزاحة المطلوبة. راجع إن xₑ[n]+xₒ[n] = x[n] عند كل فهرس."
          ],
          "keyRule": "Discrete-time periods are positive integers. Odd sequences necessarily have x[0] = 0. Source: SignalProcessing.pdf, PDF pp. 15–16, 22–23.",
          "keyRuleAr": "دورة الزمن المتقطع لازم تكون عدد صحيح موجب. والإشارة الفردية لازم قيمتها عند الصفر تساوي صفر. المصدر: SignalProcessing.pdf، صفحات PDF 15–16, 22–23.",
          "experimentIds": [
            "discrete-signals",
            "signal-periodicity"
          ]
        },
        {
          "title": "6. System Tests: Linear, Time-Invariant, Causal, Stable",
          "titleAr": "6. أربع خواص وكل واحدة ليها اختبار",
          "content": "A system maps an input sequence to an output. Linearity combines additivity and homogeneity. Time invariance compares a shifted-input experiment with a shifted-output experiment. Causality asks about future-input dependence; BIBO stability asks about every bounded input, not one attractive plot.",
          "contentAr": "النظام بيحوّل تتابع دخل لخرج. الخطية بتجمع قابلية الجمع مع التجانس. والثبات الزمني بيقارن تجربة دخل مزاح بتجربة خرج مزاح. السببية بتسأل هل النظام محتاج دخل مستقبلي؛ والاستقرار BIBO بيسأل عن كل دخل محدود، مش رسم واحد شكله كويس.",
          "bulletPoints": [
            "Linearity test: T{a·x₁+b·x₂} must equal a·T{x₁}+b·T{x₂} for arbitrary inputs and scalars. Squaring fails: T{2x} = 4x² while 2T{x} = 2x².",
            "Time-invariance test: Compare T{x[n−n₀]} against y[n−n₀]. The system y[n]=n·x[n] is linear but time-varying because n and n−n₀ yield different gains.",
            "Causality versus speed: y[n]=x[n−1] is causal; y[n]=x[n+1] is noncausal because it needs a future sample. A fast processor does not make a future-dependent rule causal.",
            "Stability: For an LTI system, Σₙ|h[n]| < ∞ is the BIBO condition. A finite moving average is stable; the accumulator h[n]=u[n] is not absolutely summable and maps a bounded unit step to unbounded growth."
          ],
          "bulletPointsAr": [
            "اختبار الخطية: لازم T{a·x₁+b·x₂} تساوي a·T{x₁}+b·T{x₂} لأي مدخلين وثابتين. التربيع بيفشل: T{2x} = 4x²، لكن 2T{x} = 2x².",
            "اختبار الثبات الزمني: قارن T{x[n−n₀]} بـ y[n−n₀]. النظام y[n]=n·x[n] خطي لكنه متغيّر زمنيًا لأن معاملات n وn−n₀ مختلفة.",
            "السببية مش السرعة: y[n]=x[n−1] سببي؛ وy[n]=x[n+1] غير سببي لأنه محتاج عينة مستقبلية. المعالج السريع مش بيحوّل قاعدة محتاجة المستقبل لقاعدة سببية.",
            "الاستقرار: لنظام LTI، شرط BIBO هو Σₙ|h[n]| < ∞. المتوسط المتحرك المحدود مستقر؛ والمجمّع h[n]=u[n] مش قابل للجمع المطلق وبيحوّل دخل خطوة محدود لنمو غير محدود."
          ],
          "keyRule": "Use a counterexample to disprove a property. Passing a finite simulator test alone does not prove the property for every input. Source: SignalProcessing.pdf, PDF pp. 17–20.",
          "keyRuleAr": "مثال مضاد واحد ينفي الخاصية. نجاح اختبار محاكاة محدود لوحده مش إثبات لكل المدخلات. المصدر: SignalProcessing.pdf، صفحات PDF 17–20.",
          "experimentIds": [
            "signal-systems"
          ]
        },
        {
          "title": "7. Convolution and the Difference-Equation Blueprint",
          "titleAr": "7. من استجابة النبضة لكود الترشيح",
          "content": "For a zero-state LTI system, h[n] = T{δ[n]} determines every output: y[n] = Σₖ x[k]h[n−k]. A linear constant-coefficient difference equation is a computable realization of that relationship; initial conditions must be specified and zero initial state is assumed when deriving the impulse response.",
          "contentAr": "لنظام LTI بحالة ابتدائية صفرية، h[n] = T{δ[n]} بتحدد أي خرج: y[n] = Σₖ x[k]h[n−k]. ومعادلة الفروق الخطية بمعاملات ثابتة تنفيذ حسابي للعلاقة دي؛ لازم نحدد الشروط الابتدائية ونفترض حالة صفرية لما نطلع استجابة النبضة.",
          "bulletPoints": [
            "Why convolution works: Decompose x[n] into scaled shifted impulses. Time invariance shifts h by the same amount; linearity scales and adds those responses. Flip h[k] into h[n−k], multiply overlaps, and sum.",
            "Moving-average example: h[0]=h[1]=h[2]=1/3, with zero elsewhere. For x=[3,0,6], zero-padded convolution is y=[1,1,3,2,2]. The n=2 output is (6+0+3)/3 = 3.",
            "Foundation slide convolution example and table correction (sig.pdf pp. 5–11): For input x[n] = [2, 3, 1] (n = 0, 1, 2) and impulse response h[n] = [1, −0.5] (n = 0, 1), the convolution output has length Lx + Lh − 1 = 4 spanning n = 0, 1, 2, 3: y[0] = 2, y[1] = 2, y[2] = −0.5, and y[3] = −0.5. Crucial source correction: Slide 11 summarizes this in a table whose final row is labeled 'All other n' with −0.5 in the y[n] column. This is misleading; −0.5 is strictly the output for n = 3 (calculated on slide 10 as 1 × (−0.5) = −0.5). For all other indices (n < 0 and n > 3), y[n] is 0, maintaining finite support.",
            "Difference equation: a₀y[n]+Σₖ₌₁ᴺ aₖy[n−k] = Σₖ₌₀ᴹ bₖx[n−k]. With a₀≠0, divide by a₀ and solve for y[n]; the signs of feedback terms change when moved to the right.",
            "FIR versus feedback: An output formed only from a finite set of current/past inputs is FIR. Feedback can yield an IIR response, but constant coefficients alone do not guarantee causality or stability; the equation and realization matter."
          ],
          "bulletPointsAr": [
            "ليه الالتفاف بينفع: فكّك x[n] لنبضات مزاحة ومضروبة في معاملات. الثبات الزمني بيزيح h بنفس المقدار؛ والخطية بتضرب وتجمع الاستجابات. اعكس h[k] إلى h[n−k]، واضرب نقاط التداخل واجمع.",
            "مثال المتوسط المتحرك: h[0]=h[1]=h[2]=1/3 وصفر غير كده. لدخل x=[3,0,6] مع أصفار خارج المجال، الالتفاف y=[1,1,3,2,2]. والخرج عند n=2 هو (6+0+3)/3 = 3.",
            "مثال الالتفاف وتصحيح جدول الشرائح (ملف sig.pdf ص 5–11): لدخل x[n] = [2, 3, 1] عند n = 0, 1, 2 واستجابة نبضة h[n] = [1, −0.5] عند n = 0, 1، خرج الالتفاف طوله Lx + Lh − 1 = 4 على الفهارس n = 0, 1, 2, 3 وقيمه: y[0] = 2 و y[1] = 2 و y[2] = −0.5 و y[3] = −0.5. تصحيح مهم لجدول المصدر: شريحة 11 تلخص ذلك في جدول صفه الأخير مسمى 'All other n' وتحته −0.5 في عمود y[n]. هذا مضلل لأن −0.5 هي قيمة y[3] فقط (المحسوبة في شريحة 10: 1 × (−0.5) = −0.5). لكل الفهارس الأخرى (n < 0 و n > 3) الخرج y[n] يساوي 0 تماماً حفاظاً على محدودية الدعم.",
            "معادلة الفروق: a₀y[n]+Σₖ₌₁ᴺ aₖy[n−k] = Σₖ₌₀ᴹ bₖx[n−k]. لو a₀≠0 اقسم عليه واعزل y[n]؛ وإشارات حدود التغذية الراجعة بتتغيّر لما ننقلها للطرف التاني.",
            "الـ FIR والتغذية الراجعة: خرج من عدد محدود من المدخلات الحالية والسابقة بس يبقى FIR. التغذية الراجعة ممكن تطلع استجابة IIR، لكن ثبات المعاملات لوحده مش ضمان للسببية أو الاستقرار؛ المعادلة وطريقة التنفيذ مهمين."
          ],
          "keyRule": "Impulse → h[n]; arbitrary input → convolution. For the book’s three-point average, the tap coefficients are all 1/3. Source: SignalProcessing.pdf, PDF pp. 19–22.",
          "keyRuleAr": "النبضة بتطلع h[n]؛ والدخل العام بنحسبه بالالتفاف. في متوسط الكتاب من 3 عينات، معاملات الترشيح كلها 1/3. المصدر: SignalProcessing.pdf، صفحات PDF 19–22.",
          "experimentIds": [
            "signal-convolution"
          ],
          "codeExamples": [
            {
              "title": "Three-sample moving average",
              "titleAr": "متوسط متحرك من 3 عينات",
              "language": "C++ · bounded teaching example",
              "code": "#include <array>\n\nstd::array<double, 3> recent{};\n\ndouble processSample(double input) {\n    recent[2] = recent[1];\n    recent[1] = recent[0];\n    recent[0] = input;\n    return (recent[0] + recent[1] + recent[2]) / 3.0;\n}",
              "explanation": "Zero-initialized delay storage implements the book’s equation one incoming sample at a time. It models the zero-state response; reset the array to restart the experiment.",
              "explanationAr": "ذاكرة التأخير المتصفّرة بتنفّذ معادلة الكتاب مع كل عينة داخلة. ده نموذج استجابة بحالة ابتدائية صفر؛ صفّر المصفوفة لما تبدأ تجربة جديدة.",
              "memoryCue": "Shift → insert → add three → divide by three.",
              "memoryCueAr": "ازح ← دخّل ← اجمع تلاتة ← اقسم على تلاتة.",
              "sourceReference": "Equation: SignalProcessing.pdf, PDF p.22; implementation is a teaching example."
            }
          ]
        }
      ],
      "terms": [
        {
          "term": "DSP",
          "termAr": "معالجة الإشارات الرقمية",
          "definition": "Numerical manipulation of signal samples.",
          "definitionAr": "معالجة عينات الإشارة بحسابات رقمية."
        },
        {
          "term": "Sampling",
          "termAr": "أخذ العينات",
          "definition": "Selecting signal values at discrete instants.",
          "definitionAr": "اختيار قيم الإشارة عند لحظات متقطعة."
        },
        {
          "term": "Quantization",
          "termAr": "التكميم",
          "definition": "Mapping sample amplitudes to a finite set of levels.",
          "definitionAr": "تقريب قيم العينات لمجموعة مستويات محدودة."
        },
        {
          "term": "Impulse response",
          "termAr": "استجابة النبضة",
          "definition": "The zero-state output h[n] produced by δ[n].",
          "definitionAr": "الخرج h[n] بحالة ابتدائية صفرية لما ندخّل δ[n]."
        },
        {
          "term": "Convolution",
          "termAr": "الالتفاف",
          "definition": "The sum y[n] = Σₖx[k]h[n−k] for a zero-state LTI system.",
          "definitionAr": "المجموع y[n] = Σₖx[k]h[n−k] لنظام LTI بحالة ابتدائية صفرية."
        },
        {
          "term": "BIBO stability",
          "termAr": "استقرار الدخل والخرج المحدودين",
          "definition": "Every bounded input produces a bounded output.",
          "definitionAr": "أي دخل محدود يطلع خرج محدود."
        },
        {
          "term": "Fundamental period",
          "termAr": "الدورة الأساسية",
          "definition": "The smallest positive integer N with x[n+N] = x[n] for all n.",
          "definitionAr": "أصغر عدد صحيح موجب N يحقق x[n+N] = x[n] لكل n."
        },
        {
          "term": "Causality",
          "termAr": "السببية",
          "definition": "No output sample depends on future input samples.",
          "definitionAr": "ولا عينة خرج بتحتاج عينات دخل مستقبلية."
        },
        {
          "term": "Time invariance",
          "termAr": "الثبات الزمني",
          "definition": "An input shift produces the same output shift with no other change.",
          "definitionAr": "إزاحة الدخل تطلع نفس إزاحة الخرج من غير تغيير تاني."
        }
      ],
      "cheatSheet": [
        {
          "en": "ADC digitizes; the processor computes; DAC reconstructs an analog output. Do not confuse a DSP algorithm with the ADC hardware. Source: SignalProcessing.pdf, PDF pp. 4–5, 9–11, 16.",
          "ar": "الـ ADC بيرقمن، والمعالج بيحسب، والـ DAC بيرجع خرج مستمر. ما تخلطش خوارزمية DSP بعتاد الـ ADC. المصدر: SignalProcessing.pdf، صفحات PDF 4–5, 9–11, 16."
        },
        {
          "en": "Sampling: time spacing. Quantization: amplitude spacing. Identify the axis before choosing a remedy. Source: SignalProcessing.pdf, PDF pp. 5–8.",
          "ar": "أخذ العينات: مسافات الزمن. التكميم: مسافات القيم. حدّد المحور الأول قبل ما تختار الحل. المصدر: SignalProcessing.pdf، صفحات PDF 5–8."
        },
        {
          "en": "MAC is multiply plus accumulation. Harvard is instruction/data access organization. They solve different bottlenecks. Source: SignalProcessing.pdf, PDF pp. 8–10.",
          "ar": "الـ MAC ضرب مع تجميع. وHarvard تنظيم الوصول للتعليمات والبيانات. كل واحد بيعالج قيد مختلف. المصدر: SignalProcessing.pdf، صفحات PDF 8–10."
        },
        {
          "en": "Work with the full argument inside x[·]. For guaranteed zeros, state the complement of the allowed support interval. Source: SignalProcessing.pdf, PDF pp. 12–15, 22.",
          "ar": "اشتغل بوسيط x[·] كامل. ولما يُطلب الصفر المضمون، اكتب خارج مجال الدعم المسموح. المصدر: SignalProcessing.pdf، صفحات PDF 12–15, 22."
        },
        {
          "en": "Discrete-time periods are positive integers. Odd sequences necessarily have x[0] = 0. Source: SignalProcessing.pdf, PDF pp. 15–16, 22–23.",
          "ar": "دورة الزمن المتقطع لازم تكون عدد صحيح موجب. والإشارة الفردية لازم قيمتها عند الصفر تساوي صفر. المصدر: SignalProcessing.pdf، صفحات PDF 15–16, 22–23."
        },
        {
          "en": "Use a counterexample to disprove a property. Passing a finite simulator test alone does not prove the property for every input. Source: SignalProcessing.pdf, PDF pp. 17–20.",
          "ar": "مثال مضاد واحد ينفي الخاصية. نجاح اختبار محاكاة محدود لوحده مش إثبات لكل المدخلات. المصدر: SignalProcessing.pdf، صفحات PDF 17–20."
        },
        {
          "en": "Impulse → h[n]; arbitrary input → convolution. For the book’s three-point average, the tap coefficients are all 1/3. Source: SignalProcessing.pdf, PDF pp. 19–22.",
          "ar": "النبضة بتطلع h[n]؛ والدخل العام بنحسبه بالالتفاف. في متوسط الكتاب من 3 عينات، معاملات الترشيح كلها 1/3. المصدر: SignalProcessing.pdf، صفحات PDF 19–22."
        }
      ],
      "interactiveTools": [
        "signal-sampling",
        "discrete-signals",
        "signal-support",
        "signal-periodicity",
        "signal-systems",
        "signal-convolution"
      ],
      "questions": [
        {
          "id": "sp1-q1",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "What is a central goal of digital signal processing?",
          "questionAr": "إيه واحد من الأهداف الأساسية لمعالجة الإشارات الرقمية؟",
          "options": [
            "Improve signal quality or extract useful information",
            "Change every signal into a periodic one",
            "Remove the need for sensors"
          ],
          "optionsAr": [
            "تحسين جودة الإشارة أو استخراج معلومات مفيدة",
            "تحويل كل إشارة لإشارة دورية",
            "الاستغناء عن الحساسات"
          ],
          "correctAnswer": 0,
          "explanation": "DSP applies algorithms to improve a signal or reveal information in it.",
          "explanationAr": "الـ DSP بيطبّق خوارزميات لتحسين الإشارة أو إظهار معلومات موجودة فيها.",
          "difficulty": "easy"
        },
        {
          "id": "sp1-q2",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "Which order describes a typical analog-to-digital-to-analog DSP chain?",
          "questionAr": "إيه الترتيب المعتاد لمسار معالجة إشارة تماثلية ورجوعها؟",
          "options": [
            "DAC → processor → ADC",
            "ADC → processor → DAC",
            "Processor → DAC → ADC"
          ],
          "optionsAr": [
            "الـ DAC ← المعالج ← الـ ADC",
            "الـ ADC ← المعالج ← الـ DAC",
            "المعالج ← الـ DAC ← الـ ADC"
          ],
          "correctAnswer": 1,
          "explanation": "The ADC digitizes the input, the processor works on the samples, and the DAC produces an analog output.",
          "explanationAr": "الـ ADC بيرقمن الدخل، والمعالج بيشتغل على العينات، والـ DAC بيطلع خرج تماثلي.",
          "difficulty": "easy"
        },
        {
          "id": "sp1-q3",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "Sampling discretizes which signal dimension?",
          "questionAr": "الـ Sampling بيحوّل أنهي بُعد لقيم منفصلة؟",
          "options": [
            "Time",
            "Amplitude",
            "Both time and amplitude by itself"
          ],
          "optionsAr": [
            "الزمن",
            "السعة",
            "الزمن والسعة لوحده"
          ],
          "correctAnswer": 0,
          "explanation": "Sampling selects signal values at discrete time instants; quantization discretizes amplitude.",
          "explanationAr": "الـ Sampling بياخد قيم الإشارة عند أزمنة منفصلة؛ والـ Quantization بيخلّي السعة مستويات منفصلة.",
          "difficulty": "easy"
        },
        {
          "id": "sp1-q4",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "Which conversion introduces amplitude rounding error?",
          "questionAr": "أنهي خطوة بتحصل فيها غلطة تقريب في السعة؟",
          "options": [
            "Sampling",
            "Quantization",
            "Digital-to-analog conversion only"
          ],
          "optionsAr": [
            "الـ Sampling",
            "الـ Quantization",
            "التحويل من رقمي لتماثلي بس"
          ],
          "correctAnswer": 1,
          "explanation": "Quantization maps a sample amplitude to one of a finite set of levels, so a rounding difference can remain.",
          "explanationAr": "الـ Quantization بتقرّب سعة العينة لأقرب مستوى من عدد محدود، فممكن يفضل فرق تقريب.",
          "difficulty": "easy"
        },
        {
          "id": "sp1-q5",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "How is a digital signal distinguished from an analog signal in the lecture?",
          "questionAr": "إيه الفرق بين الإشارة الرقمية والتماثلية حسب المحاضرة؟",
          "options": [
            "It is discrete in time and amplitude",
            "It is continuous in time and amplitude",
            "It can only represent sound"
          ],
          "optionsAr": [
            "منفصلة في الزمن والسعة",
            "مستمرة في الزمن والسعة",
            "ما بتمثلش غير الصوت"
          ],
          "correctAnswer": 0,
          "explanation": "The lecture describes digital signals as discrete in both time and amplitude.",
          "explanationAr": "المحاضرة بتوصف الإشارة الرقمية إنها منفصلة في الزمن والسعة.",
          "difficulty": "easy"
        },
        {
          "id": "sp1-q6",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "What does a DSP multiply-accumulate (MAC) unit support?",
          "questionAr": "وحدة الـ Multiply-Accumulate (MAC) بتساعد في إيه؟",
          "options": [
            "Fast multiply-and-accumulate operations",
            "Changing the sampling interval automatically",
            "Converting every analog signal to a square wave"
          ],
          "optionsAr": [
            "تنفيذ عمليات الضرب والتجميع بسرعة",
            "تغيير فترة أخذ العينات تلقائيًا",
            "تحويل كل إشارة تماثلية لموجة مربعة"
          ],
          "correctAnswer": 0,
          "explanation": "The slides identify a MAC unit as specialized DSP hardware for multiplication and accumulation.",
          "explanationAr": "الشرائح بتذكر إن وحدة الـ MAC جزء متخصص في الـ DSP لتنفيذ الضرب والتجميع.",
          "difficulty": "easy"
        },
        {
          "id": "sp1-q7",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "Which statement about the sampling rate is correct?",
          "questionAr": "أنهي عبارة عن معدل أخذ العينات صحيحة؟",
          "options": [
            "A rate that is too low can cause aliasing",
            "It sets the number of quantization levels",
            "It is the same as the signal amplitude"
          ],
          "optionsAr": [
            "المعدل القليل جدًا ممكن يسبب Aliasing",
            "هو اللي بيحدد عدد مستويات الـ Quantization",
            "هو نفسه سعة الإشارة"
          ],
          "correctAnswer": 0,
          "explanation": "Sampling rate controls how densely time is sampled; bit depth controls the number of amplitude codes.",
          "explanationAr": "معدل أخذ العينات بيحدد تقارب العينات على محور الزمن؛ وعمق البِت بيحدد عدد أكواد السعة.",
          "difficulty": "easy"
        },
        {
          "id": "sp2-q1",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "What is the value of the unit impulse δ[n] at n = 0?",
          "questionAr": "قيمة النبضة الوحدة δ[n] عند n = 0 كام؟",
          "options": [
            "0",
            "1",
            "It is undefined"
          ],
          "optionsAr": [
            "0",
            "1",
            "مش معرّفة"
          ],
          "correctAnswer": 1,
          "explanation": "The unit impulse is 1 at zero and 0 at every other integer index.",
          "explanationAr": "النبضة الوحدة قيمتها 1 عند الصفر و0 عند كل فهرس صحيح تاني.",
          "difficulty": "easy"
        },
        {
          "id": "sp2-q2",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "For an LTI system, what is the impulse response?",
          "questionAr": "إيه استجابة النبضة لنظام خطي ثابت مع الزمن (LTI)؟",
          "options": [
            "The output when the input is a unit impulse",
            "The input when the output is a unit step",
            "The system output for every possible input at once"
          ],
          "optionsAr": [
            "الخرج لما يكون الدخل نبضة وحدة",
            "الدخل لما يكون الخرج خطوة وحدة",
            "خرج النظام لكل المداخل الممكنة مرة واحدة"
          ],
          "correctAnswer": 0,
          "explanation": "The impulse response is the system output caused by a unit-impulse input.",
          "explanationAr": "استجابة النبضة هي خرج النظام الناتج عن دخل نبضة وحدة.",
          "difficulty": "easy"
        },
        {
          "id": "sp2-q3",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "With u[n] = 1 for n ≥ 0 and 0 otherwise, which identity links step and impulse?",
          "questionAr": "لو u[n] = 1 لما n ≥ 0 و0 غير كده، أنهي علاقة بتربط الخطوة بالنبضة؟",
          "options": [
            "δ[n] = u[n] − u[n−1]",
            "δ[n] = u[n] + u[n−1]",
            "u[n] = δ[n] − δ[n−1]"
          ],
          "optionsAr": [
            "δ[n] = u[n] − u[n−1]",
            "δ[n] = u[n] + u[n−1]",
            "u[n] = δ[n] − δ[n−1]"
          ],
          "correctAnswer": 0,
          "explanation": "The step changes from 0 to 1 at zero; subtracting its one-sample delay leaves a single unit impulse.",
          "explanationAr": "الخطوة بتتغير من 0 لـ1 عند الصفر؛ وطرح نسخة متأخرة عينة واحدة بيسيب نبضة واحدة.",
          "difficulty": "easy"
        },
        {
          "id": "sp2-q4",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "For x[n] = aⁿ with 0 < a < 1, what happens as n increases?",
          "questionAr": "في x[n] = aⁿ لما 0 < a < 1، بيحصل إيه لما n يزيد؟",
          "options": [
            "The positive-valued sequence decays toward zero",
            "The sequence alternates sign and grows",
            "The sequence is periodic for every a"
          ],
          "optionsAr": [
            "التتابع الموجب بيقل تدريجيًا ناحية الصفر",
            "التتابع بيبدّل الإشارة وبيكبر",
            "التتابع دوري لأي قيمة a"
          ],
          "correctAnswer": 0,
          "explanation": "A positive base strictly between zero and one gives exponential decay as the integer index increases.",
          "explanationAr": "لما الأساس موجب وأقل من واحد، الإشارة الأسية بتضمحل مع زيادة الفهرس الصحيح.",
          "difficulty": "easy"
        },
        {
          "id": "sp2-q5",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "What is the condition for x[n] to be periodic with integer period N?",
          "questionAr": "إيه شرط إن x[n] تكون دورية بفترة صحيحة N؟",
          "options": [
            "x[n + N] = x[n] for every integer n",
            "x[n + 1] = −x[n] for every n",
            "x[n] must be positive"
          ],
          "optionsAr": [
            "x[n + N] = x[n] لكل فهرس صحيح n",
            "x[n + 1] = −x[n] لكل n",
            "لازم x[n] تكون موجبة"
          ],
          "correctAnswer": 0,
          "explanation": "A discrete-time signal repeats exactly after an integer shift N for all indices.",
          "explanationAr": "الإشارة المتقطعة لازم تتكرر زي ما هي بعد إزاحة صحيحة N عند كل الفهارس.",
          "difficulty": "easy"
        },
        {
          "id": "sp2-q6",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "Which equation defines an even signal?",
          "questionAr": "أنهي معادلة بتعرّف الإشارة الزوجية؟",
          "options": [
            "x[−n] = x[n]",
            "x[−n] = −x[n]",
            "x[n + 1] = x[n]"
          ],
          "optionsAr": [
            "x[−n] = x[n]",
            "x[−n] = −x[n]",
            "x[n + 1] = x[n]"
          ],
          "correctAnswer": 0,
          "explanation": "An even signal is symmetric about n = 0.",
          "explanationAr": "الإشارة الزوجية متناظرة حوالين n = 0.",
          "difficulty": "easy"
        },
        {
          "id": "sp2-q7",
          "courseId": "signal-processing",
          "lectureId": "signal-lec-1",
          "type": "mcq",
          "question": "Which equation defines an odd signal?",
          "questionAr": "أنهي معادلة بتعرّف الإشارة الفردية؟",
          "options": [
            "x[−n] = x[n]",
            "x[−n] = −x[n]",
            "x[n] = 1 for all n"
          ],
          "optionsAr": [
            "x[−n] = x[n]",
            "x[−n] = −x[n]",
            "x[n] = 1 لكل n"
          ],
          "correctAnswer": 1,
          "explanation": "An odd signal changes sign when its index is reversed; this also requires x[0] = 0.",
          "explanationAr": "الإشارة الفردية بتغيّر إشارتها لما نعكس الفهرس؛ وده كمان معناه إن x[0] = 0.",
          "difficulty": "easy"
        }
      ]
    }
  ],
  "sheets": [
    {
      "id": "signal-chapter-1-sheet",
      "courseId": "signal-processing",
      "sheetNumber": 1,
      "title": "Chapter 1 Sheet",
      "titleAr": "شيت الفصل الأول",
      "brief": "Chapter 1 exercises.",
      "briefAr": "تمارين الفصل الأول.",
      "problemsCount": 23,
      "hasSolution": true,
      "problems": [
        {
          "id": "signal-ch1-p1",
          "problemNumber": 1,
          "type": "problem",
          "partTitle": "Worked problems",
          "partTitleAr": "مسائل محلولة",
          "question": "Let x[n] be a signal with x[n] = 0 for n < −2 and n > 4. For each signal given below, determine the values of n for which it is guaranteed to be zero.\n(a) x[n − 3]\n(b) x[n + 4]\n(c) x[−n]\n(d) x[−n + 2]\n(e) x[−n − 2]",
          "questionAr": "لتكن x[n] إشارة بتساوي صفر لما n < −2 أو n > 4. حدّد قيم n اللي كل إشارة فيها مضمونة تساوي صفر:\n(a) x[n − 3]\n(b) x[n + 4]\n(c) x[−n]\n(d) x[−n + 2]\n(e) x[−n − 2]",
          "solution": "Start from −2 ≤ argument ≤ 4, the interval where nonzero values are permitted.\n(a) −2 ≤ n−3 ≤ 4 ⇒ 1 ≤ n ≤ 7; zero for n < 1 or n > 7.\n(b) −2 ≤ n+4 ≤ 4 ⇒ −6 ≤ n ≤ 0; zero for n < −6 or n > 0.\n(c) −2 ≤ −n ≤ 4 ⇒ −4 ≤ n ≤ 2; zero for n < −4 or n > 2.\n(d) −2 ≤ −n+2 ≤ 4 ⇒ −2 ≤ n ≤ 4; zero for n < −2 or n > 4.\n(e) −2 ≤ −n−2 ≤ 4 ⇒ −6 ≤ n ≤ 0; zero for n < −6 or n > 0.\nAll n are integers. Values inside each interval are not guaranteed nonzero; the source specifies only zeros outside the original support.",
          "solutionAr": "ابدأ من −2 ≤ الوسيط ≤ 4، المجال اللي ممكن يكون فيه قيم غير صفر.\n(a) حل −2 ≤ n−3 ≤ 4 فتلاقي المجال [1,7]؛ والصفر المضمون لما n < 1 أو n > 7.\n(b) المجال [−6,0]؛ والصفر المضمون لما n < −6 أو n > 0.\n(c) المجال [−4,2]؛ والصفر المضمون لما n < −4 أو n > 2.\n(d) المجال [−2,4]؛ والصفر المضمون لما n < −2 أو n > 4.\n(e) المجال [−6,0]؛ والصفر المضمون لما n < −6 أو n > 0.\nكل الفهارس أعداد صحيحة. القيم جوّه المجال مش مضمونة غير صفر؛ المصدر محدد الصفر برّه الدعم الأصلي بس.",
          "conciseSolution": "Guaranteed zero outside: (a) [1,7]; (b) [−6,0]; (c) [−4,2]; (d) [−2,4]; (e) [−6,0].",
          "conciseSolutionAr": "الصفر مضمون خارج المجالات: (a) [1,7]؛ (b) [−6,0]؛ (c) [−4,2]؛ (d) [−2,4]؛ (e) [−6,0].",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.22; answer grounded in PDF pp.12–16."
        },
        {
          "id": "signal-ch1-p2",
          "problemNumber": 2,
          "type": "problem",
          "partTitle": "Worked problems",
          "partTitleAr": "مسائل محلولة",
          "question": "Determine whether or not each of the following signals is periodic:\n(a) x[n] = u[n] + u[−n]\n(b) x[n] = Σₖ₌₋zᶻ {δ[n − 4k] − δ[n − 1 − 4k]}.\nSource notation: the summation limits in the supplied PDF look like −z and z; the alternative all-integer interpretation is discussed in the answer.",
          "questionAr": "حدّد هل كل إشارة دورية ولا لأ:\n(a) x[n] = u[n] + u[−n]\n(b) x[n] = Σₖ₌₋zᶻ {δ[n − 4k] − δ[n − 1 − 4k]}.\nملاحظة المصدر: حدود المجموع في ملف PDF ظاهرين كـ −z وz؛ والإجابة بتوضح كمان تفسير الجمع على كل الأعداد الصحيحة.",
          "solution": "(a) With u[0]=1, x[0]=2 and x[n]=1 for n≠0. Any positive period would imply x[N]=x[0]=2, but x[N]=1; therefore it is aperiodic.\n(b) If z is a finite nonnegative integer, this is a finite, nonzero impulse train, so it is aperiodic: a nonzero periodic sequence cannot have finite support. If the limits were intended to mean −∞ to ∞, then x[n] repeats [1,−1,0,0] and its fundamental period is 4. Do not silently replace finite limits by infinity; ask for clarification if the examiner uses the printed finite notation.",
          "solutionAr": "(a) حسب u[0]=1، عند الصفر x[0]=2 وفي غيره x[n]=1. أي دورة موجبة N كانت هتفرض x[N]=2، لكن هي 1؛ إذن مش دورية.\n(b) لو z عدد صحيح محدود وغير سالب، ده قطار نبضات غير صفري بدعم محدود، فمش دوري؛ الإشارة الدورية غير الصفرية ما ينفعش دعمها يبقى محدود. لو المقصود من الحدود سالب ما لا نهاية لموجب ما لا نهاية، النمط [1,−1,0,0] بيتكرر والدورة الأساسية 4. ما تبدّلش الحدود المحدودة بلانهاية من نفسك؛ وضّح الاتفاق لو الامتحان استخدم نفس الطباعة.",
          "conciseSolution": "(a) Aperiodic. (b) Finite z: aperiodic; all integer k: periodic with fundamental N = 4. State which interpretation is used.",
          "conciseSolutionAr": "(a) مش دورية. (b) لو z محدود فمش دورية؛ لو k على كل الأعداد الصحيحة فالدورة الأساسية 4. اذكر التفسير المستخدم.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.22; answer grounded in PDF pp.12–16."
        },
        {
          "id": "signal-ch1-p3",
          "problemNumber": 3,
          "type": "problem",
          "partTitle": "Worked problems",
          "partTitleAr": "مسائل محلولة",
          "question": "Determine whether or not the following signals is periodic. If a signal is periodic, specify its fundamental period: X[n] = e^(j7πn).",
          "questionAr": "حدّد هل X[n] = e^(j7πn) دورية ولا لأ، ولو دورية اكتب دورتها الأساسية.",
          "solution": "Periodic. Require e^(j7πN)=1, so 7πN=2πm with integer m. Hence 7N=2m, and the smallest positive integer N is 2 (m=7). Equivalently e^(j7πn)=e^(jπn)=(−1)^n for integer n, giving the sequence 1,−1,1,−1,… . A proposed period 2/7 is invalid because a discrete-time period must be an integer.",
          "solutionAr": "دورية. اشترط e^(j7πN)=1، يعني 7πN=2πm بعدد صحيح m. إذن 7N=2m وأصغر N صحيح موجب هو 2 عند m=7. وكمان e^(j7πn)=e^(jπn)=(−1)^n للفهارس الصحيحة، فالتتابع 1,−1,1,−1,… . القيمة 2/7 مش دورة متقطعة لأنها مش عدد صحيح.",
          "conciseSolution": "Periodic; fundamental period N₀ = 2.",
          "conciseSolutionAr": "دورية؛ الدورة الأساسية N₀ = 2.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.15–16."
        },
        {
          "id": "signal-ch1-p4",
          "problemNumber": 4,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What is the primary difference between analog signal processing and digital signal processing (DSP)?",
          "questionAr": "إيه الفرق الأساسي بين المعالجة المستمرة ومعالجة الإشارات الرقمية؟",
          "solution": "Analog processing operates directly on continuous signals, typically using analog circuits. DSP operates numerically on digitized samples using a programmable processor or computer. Sampling and quantization are needed when the original input is analog.",
          "solutionAr": "المعالجة المستمرة بتشتغل مباشرةً على إشارة مستمرة بدوائر مستمرة غالبًا. والـ DSP بيشتغل بحسابات رقمية على عينات مُرقمنة بمعالج أو كمبيوتر. لو الدخل أصله مستمر بنحتاج أخذ عينات وتكميم.",
          "conciseSolution": "Analog: continuous signals/circuits. DSP: numerical processing of digitized samples.",
          "conciseSolutionAr": "المستمرة: إشارات ودوائر مستمرة. الـ DSP: حسابات رقمية على عينات مُرقمنة.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.4–5, 11."
        },
        {
          "id": "signal-ch1-p5",
          "problemNumber": 5,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "Name the three key components of a DSP system in the order of signal flow.",
          "questionAr": "سمّي مكوّنات منظومة DSP التلاتة بترتيب تدفق الإشارة.",
          "solution": "ADC → digital signal processor → DAC. The ADC digitizes the analog input, the processor performs the algorithm, and the DAC converts processed digital values to an analog output when needed.",
          "solutionAr": "ADC ← معالج إشارة رقمي ← DAC. الأول بيرقمن الدخل المستمر، والمعالج بينفّذ الخوارزمية، والأخير بيحوّل القيم المعالجة لخرج مستمر لو مطلوب.",
          "conciseSolution": "ADC → DSP processor → DAC.",
          "conciseSolutionAr": "ADC ← معالج DSP ← DAC.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.4–10."
        },
        {
          "id": "signal-ch1-p6",
          "problemNumber": 6,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What is the critical requirement for the sampling rate, as defined by the Nyquist-Shannon sampling theorem?",
          "questionAr": "إيه شرط معدل أخذ العينات حسب نظرية Nyquist–Shannon؟",
          "solution": "For the book’s band-limited input, the stated condition is fₛ ≥ 2fmax. Use fₛ > 2fmax with practical margin and an anti-alias filter for retained frequencies. The equality boundary is phase-sensitive; for example, sampling sin(2πft) at 2f with phase zero gives all-zero samples.",
          "solutionAr": "حسب الكتاب للدخل محدود النطاق، الشرط fₛ ≥ 2fmax. عمليًا استخدم fₛ > 2fmax بهامش ومرشّح قبل أخذ العينات. المساواة حسّاسة للطور؛ مثلًا أخذ عينات sin(2πft) عند 2f بطور صفر بيطلع عينات كلها صفر.",
          "conciseSolution": "Book condition: fₛ ≥ 2fmax for a band-limited signal; practical choice exceeds it.",
          "conciseSolutionAr": "شرط الكتاب: fₛ ≥ 2fmax لإشارة محدودة النطاق؛ والاختيار العملي أعلى من كده.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.5–6."
        },
        {
          "id": "signal-ch1-p7",
          "problemNumber": 7,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What is quantization noise, and what introduces it?",
          "questionAr": "إيه ضوضاء التكميم وإيه اللي بيعملها؟",
          "solution": "Quantization error is the difference between a sampled amplitude and its assigned representable level. It is introduced by rounding to a finite set of levels, not by sampling time itself. Increasing bit depth gives finer levels and usually reduces this error for a fixed range.",
          "solutionAr": "خطأ التكميم هو الفرق بين قيمة العينة والمستوى المسموح اللي اتقرّبت له. سببه التقريب لمجموعة مستويات محدودة، مش تقطيع الزمن لوحده. زيادة البتات بتدقّق المستويات وبتقلّل الخطأ عادةً لنفس المدى.",
          "conciseSolution": "Rounding a sample to a finite amplitude grid introduces quantization error/noise.",
          "conciseSolutionAr": "تقريب العينة لشبكة قيم محدودة بيعمل خطأ أو ضوضاء تكميم.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.6–7."
        },
        {
          "id": "signal-ch1-p8",
          "problemNumber": 8,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What is the purpose of the MAC (Multiply-Accumulate) Unit in a Digital Signal Processor?",
          "questionAr": "إيه وظيفة وحدة MAC في معالج الإشارة الرقمي؟",
          "solution": "The MAC unit efficiently multiplies two numbers and adds the product to an accumulator, a common repeated operation in filters, correlations and transforms. It accelerates a sum of products; it is not just an adder.",
          "solutionAr": "وحدة MAC بتضرب رقمين وتضيف الناتج لمجمّع بكفاءة؛ وده بيتكرر في المرشّحات والارتباطات والتحويلات. بتسرّع مجموع نواتج الضرب، مش مجرد وحدة جمع.",
          "conciseSolution": "Multiply two operands and add their product to an accumulator.",
          "conciseSolutionAr": "اضرب معاملين واجمع ناتج الضرب على قيمة المجمّع.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.8–9."
        },
        {
          "id": "signal-ch1-p9",
          "problemNumber": 9,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "How are analog signals defined in terms of their independent variable and amplitude?",
          "questionAr": "الإشارة المستمرة بتتوصف إزاي من ناحية المتغيّر المستقل والقيمة؟",
          "solution": "An analog signal has a continuous independent variable, commonly time, and a continuous range of amplitude values within its physical range. A voltage waveform can therefore be defined at every instant, not only integer sample indices.",
          "solutionAr": "الإشارة المستمرة متغيّرها المستقل مستمر، وغالبًا الزمن، ومدى قيمها مستمر داخل المدى الفيزيائي. يعني موجة الجهد متعرفة عند كل لحظة، مش عند فهارس عينات صحيحة بس.",
          "conciseSolution": "Continuous independent variable and continuous amplitude.",
          "conciseSolutionAr": "المتغيّر المستقل مستمر والقيمة مستمرة.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.11."
        },
        {
          "id": "signal-ch1-p10",
          "problemNumber": 10,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What is the key advantage of digital signals over analog signals regarding transmission?",
          "questionAr": "إيه ميزة الإشارات الرقمية الأساسية أثناء النقل مقارنةً بالمستمرة؟",
          "solution": "Digital levels can be distinguished and regenerated, so modest channel disturbances need not accumulate exactly like analog waveform noise. This improves robustness and supports error detection/correction, but severe noise can still cause bit errors.",
          "solutionAr": "المستويات الرقمية ممكن نميّزها ونعيد توليدها، فاضطراب القناة البسيط مش لازم يتراكم زي ضوضاء الموجة المستمرة. ده بيزوّد المتانة ويدعم اكتشاف وتصحيح الأخطاء، لكن الضوضاء الشديدة لسه ممكن تغيّر البتات.",
          "conciseSolution": "Greater noise resistance and regeneration of discrete levels; not immunity to errors.",
          "conciseSolutionAr": "مقاومة أعلى للضوضاء وإعادة توليد المستويات؛ مش مناعة من الأخطاء.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.11."
        },
        {
          "id": "signal-ch1-p11",
          "problemNumber": 11,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What is the definition of the Unit Impulse Signal (δ[n])?",
          "questionAr": "إيه تعريف نبضة الوحدة δ[n]؟",
          "solution": "δ[n]=1 at n=0 and δ[n]=0 at all other integer indices. It is also called the unit sample sequence. A shifted δ[n−n₀] is 1 only at n=n₀.",
          "solutionAr": "δ[n]=1 عند n=0 وصفر في أي فهرس صحيح تاني. اسمها كمان تتابع عينة الوحدة. والنبضة المزاحة δ[n−n₀] بتساوي 1 عند n=n₀ بس.",
          "conciseSolution": "δ[0]=1; δ[n]=0 for n≠0.",
          "conciseSolutionAr": "δ[0]=1؛ وصفر لما n≠0.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.12–13."
        },
        {
          "id": "signal-ch1-p12",
          "problemNumber": 12,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "How does the Unit Impulse Signal completely characterize a Linear Time-Invariant (LTI) system?",
          "questionAr": "إزاي نبضة الوحدة بتوصف نظام LTI بالكامل؟",
          "solution": "Apply δ[n] to obtain the zero-state impulse response h[n]. Any input is a sum of shifted, scaled impulses; time invariance shifts h and linearity scales and adds the outputs. Therefore y[n]=Σₖx[k]h[n−k]. The claim assumes the LTI system and zero initial conditions, not an arbitrary nonlinear system.",
          "solutionAr": "دخّل δ[n] عشان تطلع استجابة النبضة h[n] بحالة ابتدائية صفر. أي دخل ينفع مجموع نبضات مزاحة ومضروبة في معاملات؛ والثبات الزمني بيزيح h والخطية بتضرب وتجمع الخرج. إذن y[n]=Σₖx[k]h[n−k]. الكلام لنظام LTI وحالة ابتدائية صفر، مش لأي نظام غير خطي.",
          "conciseSolution": "Its output h[n] determines every zero-state LTI output by convolution: y=x*h.",
          "conciseSolutionAr": "خرجها h[n] بيحدد أي خرج لنظام LTI بحالة صفرية عن طريق y=x*h.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.12–13, 19–22."
        },
        {
          "id": "signal-ch1-p13",
          "problemNumber": 13,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "For a discrete-time exponential signal x[n] = aⁿ, what range of 'a' values causes the signal to decay exponentially with alternating signs?",
          "questionAr": "في الإشارة x[n]=aⁿ، أنهي مدى لقيمة a بيخلّي المقدار يضمحل والإشارة تتبادل مع زيادة n؟",
          "solution": "−1 < a < 0. A negative base causes sign alternation, while |a|<1 causes the magnitude to decay as n increases. The phrase concerns increasing n; a two-sided sequence can grow toward negative n.",
          "solutionAr": "−1 < a < 0. سالبية الأساس بتخلّي الإشارة تتبادل، و|a|<1 بتخلّي المقدار يضمحل مع زيادة n. الكلام ناحية n الموجبة؛ والتتابع ثنائي الاتجاه ممكن ينمو ناحية الفهارس السالبة.",
          "conciseSolution": "−1 < a < 0.",
          "conciseSolutionAr": "−1 < a < 0.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.14–15."
        },
        {
          "id": "signal-ch1-p14",
          "problemNumber": 14,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What two conditions must a system satisfy to be considered linear?",
          "questionAr": "إيه الشرطين اللي لازم النظام يحققهم عشان يبقى خطي؟",
          "solution": "Additivity: T{x₁+x₂}=T{x₁}+T{x₂}. Homogeneity: T{a·x}=a·T{x} for any scalar a. Together they give superposition: T{a·x₁+b·x₂}=a·T{x₁}+b·T{x₂}.",
          "solutionAr": "قابلية الجمع: T{x₁+x₂}=T{x₁}+T{x₂}. والتجانس: T{a·x}=a·T{x} لأي ثابت a. الاتنين مع بعض بيدّوا التراكب T{a·x₁+b·x₂}=a·T{x₁}+b·T{x₂}.",
          "conciseSolution": "Additivity and homogeneity (superposition).",
          "conciseSolutionAr": "قابلية الجمع والتجانس؛ يعني مبدأ التراكب.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.17."
        },
        {
          "id": "signal-ch1-p15",
          "problemNumber": 15,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "Define the property of time-invariance for a system.",
          "questionAr": "عرّف خاصية الثبات الزمني للنظام.",
          "solution": "If T{x[n]}=y[n], then T{x[n−n₀]}=y[n−n₀] for every input and integer shift n₀. The system responds in the same way regardless of when the input is applied; the output is shifted but otherwise unchanged.",
          "solutionAr": "لو T{x[n]}=y[n]، لازم T{x[n−n₀]}=y[n−n₀] لكل دخل وإزاحة صحيحة n₀. النظام بيستجيب بنفس الطريقة مهما وقت تطبيق الدخل؛ الخرج بيتزاح بس من غير تغيير تاني.",
          "conciseSolution": "An input delay produces the identical output delay: T{x[n−n₀]}=y[n−n₀].",
          "conciseSolutionAr": "تأخير الدخل يطلع نفس تأخير الخرج: T{x[n−n₀]}=y[n−n₀].",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.17–18."
        },
        {
          "id": "signal-ch1-p16",
          "problemNumber": 16,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What distinguishes a causal system from a non-causal system?",
          "questionAr": "إيه اللي بيميّز النظام السببي عن غير السببي؟",
          "solution": "A causal system uses only present and past input values to determine y[n]. A noncausal system requires at least one future input value. x[n−1] is a causal one-sample delay; x[n+1] is a noncausal advance.",
          "solutionAr": "النظام السببي بيستخدم المدخلات الحالية والسابقة بس عشان يحدد y[n]. غير السببي بيحتاج قيمة دخل مستقبلية واحدة على الأقل. x[n−1] تأخير سببي عينة واحدة؛ وx[n+1] تقديم غير سببي.",
          "conciseSolution": "Causal: present/past inputs only. Noncausal: future input required.",
          "conciseSolutionAr": "السببي: الحاضر والماضي بس. غير السببي: محتاج المستقبل.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.18."
        },
        {
          "id": "signal-ch1-p17",
          "problemNumber": 17,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "In a Linear Time-Invariant (LTI) system, what mathematical operation relates the input signal x[n] and the system's impulse response h[n] to produce the output signal y[n]?",
          "questionAr": "في نظام LTI، إيه العملية اللي بتربط الدخل x[n] باستجابة النبضة h[n] عشان تطلع y[n]؟",
          "solution": "Convolution: y[n]=(x*h)[n]=Σₖ₌₋∞∞ x[k]h[n−k]. For finite sequences, zero-pad outside their supports; the full output has length Lx+Lh−1.",
          "solutionAr": "الالتفاف: y[n]=(x*h)[n]=Σₖ₌₋∞∞ x[k]h[n−k]. للتتابعات المحدودة افترض أصفار برّه مجالها؛ وطول الخرج الكامل Lx+Lh−1.",
          "conciseSolution": "Convolution: y[n]=Σₖx[k]h[n−k].",
          "conciseSolutionAr": "الالتفاف: y[n]=Σₖx[k]h[n−k].",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.19."
        },
        {
          "id": "signal-ch1-p18",
          "problemNumber": 18,
          "type": "problem",
          "partTitle": "Short-answer questions",
          "partTitleAr": "أسئلة إجابات قصيرة",
          "question": "What are the constant coefficients aₖ and bₖ in a linear constant-coefficient difference equation for an LTI system?",
          "questionAr": "إيه معاملات aₖ وbₖ الثابتة في معادلة الفروق الخطية لنظام LTI؟",
          "solution": "They are fixed weights defining the input–output relationship. In Σₖ₌₀ᴺaₖy[n−k]=Σₖ₌₀ᴹbₖx[n−k], the a coefficients multiply output/feedback terms and the b coefficients multiply input/feedforward terms. Their values do not vary with n; assume a₀≠0 to solve explicitly for the current output.",
          "solutionAr": "دي أوزان ثابتة بتحدد العلاقة بين الدخل والخرج. في Σₖ₌₀ᴺaₖy[n−k]=Σₖ₌₀ᴹbₖx[n−k]، معاملات a بتضرب حدود الخرج والتغذية الراجعة، ومعاملات b بتضرب حدود الدخل والتغذية الأمامية. قيمهم مش بتتغير مع n؛ وافترض a₀≠0 لعزل الخرج الحالي.",
          "conciseSolution": "aₖ weight output/feedback terms; bₖ weight input/feedforward terms; both are constant in n.",
          "conciseSolutionAr": "aₖ أوزان الخرج والتغذية الراجعة؛ وbₖ أوزان الدخل والتغذية الأمامية؛ والاتنين ثابتين مع n.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.23; answer grounded in PDF pp.20–22."
        },
        {
          "id": "signal-ch1-p19",
          "problemNumber": 19,
          "type": "mcq",
          "partTitle": "Multiple choice",
          "partTitleAr": "اختيار من متعدد",
          "question": "Which component of a Digital Signal Processing (DSP) system performs the function of converting a continuous, analog signal into a discrete, digital signal?",
          "questionAr": "أنهي جزء في منظومة DSP بيحوّل الإشارة المستمرة لإشارة رقمية متقطعة؟",
          "solution": "The ADC performs sampling and quantization of the analog input. The DAC performs the opposite conversion at the output.",
          "solutionAr": "الـ ADC بياخد عينات ويكمّم الدخل المستمر؛ والـ DAC بيعمل التحويل العكسي في الخرج.",
          "conciseSolution": "Option C — Analog-to-Digital Converter (ADC)",
          "conciseSolutionAr": "الاختيار C — محوّل مستمر لرقمي ADC",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.24; answer grounded in PDF pp.5–7.",
          "options": [
            "Digital-to-Analog Converter (DAC)",
            "Digital Signal Processor (DSP)",
            "Analog-to-Digital Converter (ADC)",
            "Multiply-Accumulate (MAC) Unit"
          ],
          "optionsAr": [
            "محوّل رقمي لمستمر DAC",
            "معالج إشارة رقمي DSP",
            "محوّل مستمر لرقمي ADC",
            "وحدة ضرب وتجميع MAC"
          ],
          "correctAnswer": 2
        },
        {
          "id": "signal-ch1-p20",
          "problemNumber": 20,
          "type": "mcq",
          "partTitle": "Multiple choice",
          "partTitleAr": "اختيار من متعدد",
          "question": "The process of approximating a sampled value with a continuous amplitude to the nearest value in a finite set of discrete numbers is called:",
          "questionAr": "عملية تقريب قيمة عينة لقيمة أقرب في مجموعة أرقام محدودة اسمها إيه؟",
          "solution": "Quantization acts on amplitude. Sampling acts on the time axis; aliasing is frequency ambiguity from inadequate sampling.",
          "solutionAr": "التكميم بيشتغل على القيمة؛ وأخذ العينات على محور الزمن؛ والـ Aliasing التباس ترددي بسبب معدل عينات غير كافي.",
          "conciseSolution": "Option C — Quantization",
          "conciseSolutionAr": "الاختيار C — التكميم",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.24; answer grounded in PDF pp.6–7.",
          "options": [
            "Sampling",
            "Aliasing",
            "Quantization",
            "Homogeneity"
          ],
          "optionsAr": [
            "أخذ العينات",
            "تداخل الترددات Aliasing",
            "التكميم",
            "التجانس"
          ],
          "correctAnswer": 2
        },
        {
          "id": "signal-ch1-p21",
          "problemNumber": 21,
          "type": "mcq",
          "partTitle": "Multiple choice",
          "partTitleAr": "اختيار من متعدد",
          "question": "According to the Nyquist-Shannon sampling theorem, what must the sampling rate be to prevent irreversible signal distortion known as aliasing?",
          "questionAr": "حسب Nyquist–Shannon، معدل أخذ العينات يبقى كام لتجنّب Aliasing؟",
          "solution": "Option C matches the textbook formulation. A band-limited input is assumed; practical sampling uses a margin above the boundary and anti-alias filtering, rather than relying on equality for every phase.",
          "solutionAr": "الاختيار C بيطابق صياغة الكتاب. بنفترض دخل محدود النطاق؛ وعمليًا نستخدم هامش أعلى من الحد ومرشّح قبل العينات بدل الاعتماد على المساواة لأي طور.",
          "conciseSolution": "Option C — At least twice the highest frequency of the signal.",
          "conciseSolutionAr": "الاختيار C — على الأقل ضعف أعلى تردد في الإشارة.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.24; answer grounded in PDF pp.5–6.",
          "options": [
            "Less than the highest frequency of the signal.",
            "Equal to the highest frequency of the signal.",
            "At least twice the highest frequency of the signal.",
            "Exactly the same as the quantization noise."
          ],
          "optionsAr": [
            "أقل من أعلى تردد في الإشارة.",
            "يساوي أعلى تردد في الإشارة.",
            "على الأقل ضعف أعلى تردد في الإشارة.",
            "يساوي ضوضاء التكميم بالضبط."
          ],
          "correctAnswer": 2
        },
        {
          "id": "signal-ch1-p22",
          "problemNumber": 22,
          "type": "mcq",
          "partTitle": "Multiple choice",
          "partTitleAr": "اختيار من متعدد",
          "question": "A specialized microprocessor optimized for the high-speed mathematical computations required for DSP algorithms often utilizes a Harvard Architecture. What is the key feature of this architecture?",
          "questionAr": "معالج متخصص لحسابات DSP غالبًا بيستخدم Harvard Architecture. إيه أهم خاصية للمعمارية دي؟",
          "solution": "Separate instruction and data paths allow concurrent instruction fetch and data access. This is distinct from the MAC operation and from circular addressing.",
          "solutionAr": "مسارات منفصلة للتعليمات والبيانات بتسمح بجلب تعليمة والوصول للبيانات مع بعض. ودي حاجة مختلفة عن MAC وعن العنونة الدائرية.",
          "conciseSolution": "Option C — It uses separate memory for program instructions and data, allowing for simultaneous access.",
          "conciseSolutionAr": "الاختيار C — بتستخدم ذاكرة منفصلة لتعليمات البرنامج والبيانات تسمح بوصول متزامن.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.24; answer grounded in PDF pp.8–9.",
          "options": [
            "It performs convolution in a single clock cycle.",
            "It uses a dedicated MAC unit for addition.",
            "It uses separate memory for program instructions and data, allowing for simultaneous access.",
            "It relies on circular addressing modes exclusively."
          ],
          "optionsAr": [
            "بتنفّذ الالتفاف في دورة واحدة.",
            "بتستخدم وحدة MAC للجمع.",
            "بتستخدم ذاكرة منفصلة لتعليمات البرنامج والبيانات تسمح بوصول متزامن.",
            "بتعتمد حصريًا على العنونة الدائرية."
          ],
          "correctAnswer": 2
        },
        {
          "id": "signal-ch1-p23",
          "problemNumber": 23,
          "type": "mcq",
          "partTitle": "Multiple choice",
          "partTitleAr": "اختيار من متعدد",
          "question": "How is a system mathematically characterized as time-invariant?\nSource note: expressions are absent from options (a)–(c) in the supplied PDF. The surviving wording is transcribed below with explicit placeholders.",
          "questionAr": "النظام بيتوصف رياضيًا إزاي إنه ثابت زمنيًا؟\nملاحظة المصدر: معادلات ناقصة من الاختيارات (a)–(c) في ملف PDF المرفوع. الكلمات الظاهرة منقولة تحت مع تحديد مكان النقص.",
          "options": [
            "If an input [expression missing] gives output [expression missing], then [expression missing] gives [expression missing].",
            "If an input [expression missing] gives output [expression missing], then a time-shifted input [expression missing] gives a time-shifted output [expression missing].",
            "If an input [expression missing] and [expression missing] gives outputs [expression missing] and [expression missing], then [expression missing] gives [expression missing].",
            "Its output at any given time depends only on current and past input values."
          ],
          "optionsAr": [
            "لو دخل [تعبير ناقص] بيدي خرج [تعبير ناقص]، يبقى [تعبير ناقص] بيدي [تعبير ناقص].",
            "لو دخل [تعبير ناقص] بيدي خرج [تعبير ناقص]، يبقى الدخل المزاح زمنيًا [تعبير ناقص] بيدي خرج مزاح زمنيًا [تعبير ناقص].",
            "لو دخل [تعبير ناقص] و[تعبير ناقص] بيدّوا خرجين [تعبير ناقص] و[تعبير ناقص]، يبقى [تعبير ناقص] بيدي [تعبير ناقص].",
            "الخرج عند أي وقت بيعتمد على المدخلات الحالية والسابقة بس."
          ],
          "correctAnswer": 1,
          "solution": "B is supported by the surviving time-shift wording. The complete criterion, from the Chapter 1 explanation, is: if T{x[n]}=y[n], then T{x[n−n₀]}=y[n−n₀] for every input and shift. This formula explains the answer; it is not claimed to be a recovered transcription of the missing expressions in the option. D defines causality, not time invariance.",
          "solutionAr": "الاختيار B تدعمه كلمات الإزاحة الزمنية اللي لسه ظاهرة. المعيار الكامل من شرح الفصل: لو T{x[n]}=y[n]، لازم T{x[n−n₀]}=y[n−n₀] لكل دخل وإزاحة. المعادلة دي شرح للإجابة، مش ادّعاء إننا استرجعنا نص المعادلات الناقصة في الاختيار. والاختيار D بيعرّف السببية مش الثبات الزمني.",
          "conciseSolution": "B — a shifted input gives the identically shifted output: T{x[n−n₀]}=y[n−n₀]. The original option formulas are partly absent.",
          "conciseSolutionAr": "B — إزاحة الدخل تطلع نفس إزاحة الخرج: T{x[n−n₀]}=y[n−n₀]. معادلات الاختيارات الأصلية ناقصة جزئيًا.",
          "sourceReference": "SignalProcessing.pdf · Chapter 1 · prompt PDF p.25, above Chapter 2; answer PDF pp.17–18. Source omissions explicitly marked."
        }
      ]
    }
  ]
};

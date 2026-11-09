import type { LabId } from './labCatalog';

export interface LabGuide {
  tryEn: string;
  tryAr: string;
  observeEn: string;
  observeAr: string;
}

export const LAB_GUIDES = {
  'ai-fuel': {
    tryEn:
      'Load the data-poor preset. Increase data, then compare with increasing compute alone.',
    tryAr:
      'اختار إعداد البيانات المحدودة. زوّد البيانات، وبعدها قارن بزيادة الحوسبة لوحدها.',
    observeEn:
      'The lowest resource constrains this qualitative model. The levels do not predict accuracy.',
    observeAr:
      'أقل مورد هو القيد في النموذج النوعي ده. المستويات مش توقع للدقة.',
  },
  'ai-history': {
    tryEn:
      'Compare the expert-systems boom with the following bust. Hide the dates and recall the sequence.',
    tryAr:
      'قارن ازدهار الأنظمة الخبيرة بالتراجع اللي بعده. اخفي التواريخ وافتكر ترتيب الأحداث.',
    observeEn:
      'A breakthrough, adoption, and sustained progress are different claims; inspect each milestone’s context.',
    observeAr:
      'الاكتشاف والانتشار والتقدم المستمر ادعاءات مختلفة؛ راجع سياق كل محطة.',
  },
  'ai-foundations': {
    tryEn:
      'Choose navigation. Toggle Mathematics and Control Theory separately, and inspect their pipeline stages.',
    tryAr:
      'اختار الملاحة. بدّل الرياضيات ونظرية التحكم كل واحدة لوحدها، وراجع مراحل مساهمتهم.',
    observeEn:
      'Mathematics helps compare routes; feedback helps monitor progress and reroute. Suggested modules are not a score.',
    observeAr:
      'الرياضيات بتساعد تقارن الطرق؛ والتغذية الراجعة بتتابع التقدم وتغيّر المسار. التخصصات المقترحة مش درجات.',
  },
  'ai-approaches': {
    tryEn:
      'Read the stated goal, choose a quadrant, then check your prediction. Compare thinking with acting.',
    tryAr:
      'اقرا الهدف المذكور، واختار خلية، وبعدها راجع توقعك. قارن التفكير بالفعل.',
    observeEn:
      'The focus and the standard are separate axes: human or rational, thinking or acting.',
    observeAr:
      'محور التركيز والمعيار محورين مختلفين: بشري أو عقلاني، وتفكير أو فعل.',
  },
  'turing-test': {
    tryEn:
      'Ask both responders the same question before guessing. Compare text conversation with physical interaction.',
    tryAr:
      'اسأل الطرفين نفس السؤال قبل ما تخمّن. قارن المحادثة النصية بالتفاعل المادي.',
    observeEn:
      'The responses are scripted. A text imitation test does not establish every capability in the Total Turing Test.',
    observeAr:
      'الردود مكتوبة مسبقًا. اختبار تقليد نصي مش بيثبت كل قدرات Total Turing Test.',
  },
  'ai-rationality': {
    tryEn:
      'At 50% blockage risk, choose a route before revealing a clear day. Then compare with 10% risk.',
    tryAr:
      'عند احتمال انسداد 50 بالمية، اختار طريق قبل ما تكشف يوم الطريق فيه فاضي. بعدها قارن باحتمال 10 بالمية.',
    observeEn:
      'At 50%, the shortcut averages 11 minutes versus 8 for the safe route. One lucky trip does not change that expectation.',
    observeAr:
      'عند 50 بالمية، متوسط المختصر 11 دقيقة مقابل 8 للآمن. رحلة واحدة محظوظة مش بتغيّر التوقع ده.',
  },
  'vacuum-world': {
    tryEn:
      'Make both rooms dirty, then step through cleaning, moving, and cleaning again. Inspect the percept after each action.',
    tryAr:
      'خلّي الأوضتين وسخين، وبعدها امشِ خطوة خطوة: تنظيف، حركة، وتنظيف تاني. راجع الـ Percept بعد كل فعل.',
    observeEn:
      'The reflex rule uses the current room only. The score adds one point for each clean room after an action.',
    observeAr:
      'قاعدة الـ Reflex بتستخدم الأوضة الحالية بس. التقييم بيزوّد نقطة لكل أوضة نضيفة بعد الفعل.',
  },
  'vacuum-world-3d': {
    tryEn:
      'Use All dirty, switch to Agent view, and step until the simulator stops. Count actions and points.',
    tryAr:
      'اختار All dirty، وبدّل لمنظور الـ Agent، واتقدّم لحد ما المحاكاة تقف. عدّ الأفعال والنقاط.',
    observeEn:
      'This fixed-route extension takes 7 actions and scores 16. Hidden rooms remain unknown to the agent; the simulator decides when to stop.',
    observeAr:
      'الامتداد ده بمساره الثابت بياخد 7 أفعال وبيجمع 16 نقطة. الأوض المخفية مجهولة للـ Agent؛ والمحاكاة هي اللي بتقرر التوقف.',
  },
  'agent-architecture': {
    tryEn:
      'Advance one complete cycle. Change the scenario and compare the same five stages.',
    tryAr: 'امشِ دورة كاملة. غيّر السيناريو وقارن نفس المراحل الخمسة.',
    observeEn:
      'Perception, model update, choice, action, and feedback have different roles within the agent loop.',
    observeAr:
      'الإدراك وتحديث النموذج والاختيار والفعل والتغذية الراجعة ليهم أدوار مختلفة في دورة الوكيل.',
  },
  'search-visualizer': {
    tryEn:
      'Use the lecture tree and compare BFS, DFS, and UCS. Inspect the frontier before each expansion.',
    tryAr:
      'استخدم شجرة المحاضرة وقارن BFS وDFS وUCS. راجع الـ Frontier قبل كل توسّع.',
    observeEn:
      'Unit costs and FIFO ties give BFS and UCS the same priority order, but their goal tests make them stop at different steps here. DFS follows depth first. The goal path has depth 4.',
    observeAr:
      'التكاليف المتساوية والتعادل بترتيب FIFO بيدّوا BFS وUCS نفس أولوية الاختيار، لكن اختبار الهدف بيخلّيهم يقفوا عند خطوات مختلفة هنا. DFS بيتعمّق الأول. عمق مسار الهدف 4.',
  },
  'network-devices': {
    tryEn:
      'Send a unicast frame through a hub, then a switch. Compare normal and simultaneous transmissions.',
    tryAr:
      'ابعت Unicast عبر Hub، وبعدها Switch. قارن الإرسال العادي بالإرسال المتزامن.',
    observeEn:
      'A hub repeats signals on the shared medium. A switch uses its MAC table and separate ports; a router selects an IP interface.',
    observeAr:
      'الـ Hub بيكرر الإشارة على الوسيط المشترك. الـ Switch بيستخدم جدول MAC ومنافذ مستقلة؛ والـ Router بيختار واجهة حسب IP.',
  },
  'network-3d': {
    tryEn:
      'On a switch, compare known and unknown destination MACs. Then try a router broadcast and two senders on a hub.',
    tryAr:
      'على Switch، قارن MAC معروف بمجهول. بعدها جرّب Broadcast على Router وراسلين على Hub.',
    observeEn:
      'Unknown unicast floods other switch ports. Routers stop the modeled broadcast, while simultaneous hub signals collide.',
    observeAr:
      'Unicast المجهول بيتوزّع على منافذ الـ Switch التانية. الـ Router بيوقف الـ Broadcast الممثّل، وإشارات الـ Hub المتزامنة بتتصادم.',
  },
  'packet-journey': {
    tryEn:
      'Step across the router and compare the IP and MAC header fields before and after that hop.',
    tryAr: 'اتقدّم عبر الـ Router وقارن حقول IP وMAC قبل الـ Hop وبعدها.',
    observeEn:
      'In this route without NAT, endpoint IPs stay the same while the Layer-2 addresses change at the routed hop.',
    observeAr:
      'في المسار ده من غير NAT، عناوين IP النهائية ثابتة، لكن عناوين Layer 2 بتتغير عند الـ Hop الموجّهة.',
  },
  'osi-visualizer': {
    tryEn:
      'Encapsulate a message, then reverse the direction. Inspect the highlighted layer and its PDU.',
    tryAr:
      'غلّف رسالة، وبعدها اعكس الاتجاه. راجع الطبقة المظللة والـ PDU بتاعها.',
    observeEn:
      'Encapsulation adds layer information; decapsulation removes it in reverse order. Follow data, segment, packet, frame, and bits.',
    observeAr:
      'Encapsulation بيضيف معلومات الطبقات؛ وDecapsulation بيشيلها بترتيب عكسي. تابع Data وSegment وPacket وFrame وBits.',
  },
  'subnet-calculator': {
    tryEn:
      'Try 192.168.1.130 with /26. Compare the network, broadcast, and usable hosts, then inspect /31.',
    tryAr:
      'جرّب 192.168.1.130 مع /26. قارن عنوان الشبكة والـ Broadcast والـ Hosts المتاحة، وبعدها راجع /31.',
    observeEn:
      'The /26 network is .128, broadcast is .191, and usable range is .129–.190 (62 hosts). /31 uses the point-to-point exception.',
    observeAr:
      'شبكة /26 هي .128 والـ Broadcast هو .191، والمدى المتاح .129–.190 (62 جهاز). /31 ليها استثناء الوصلة Point-to-point.',
  },
  'transmission-lab': {
    tryEn:
      'Choose one destination, then all destinations, then a multicast group. Compare which endpoints accept each frame.',
    tryAr:
      'اختار وجهة واحدة، وبعدها كل الوجهات، وبعدها مجموعة Multicast. قارن الأجهزة اللي بتقبل كل Frame.',
    observeEn:
      'Unicast targets one endpoint; broadcast targets the LAN; multicast targets subscribed group members.',
    observeAr:
      'Unicast بيستهدف جهاز واحد؛ وBroadcast بيستهدف الـ LAN؛ وMulticast بيستهدف أعضاء المجموعة المشتركين.',
  },
  'topology-simulator': {
    tryEn:
      'Break a spoke in a star, then compare a mesh with one failed link. Send again after each change.',
    tryAr:
      'اقطع وصلة في Star، وبعدها قارن Mesh فيها وصلة بايظة واحدة. ابعت تاني بعد كل تغيير.',
    observeEn:
      'Delivery depends on the remaining graph: redundancy can preserve a path, while a failed required link prevents delivery.',
    observeAr:
      'الوصول بيعتمد على الوصلات الباقية: الوصلات البديلة ممكن تحافظ على مسار، لكن قطع وصلة ضرورية يمنع الوصول.',
  },
  'edge-vs-cloud': {
    tryEn:
      'Set 70°C and run the cloud case with internet disconnected. Reset, then compare a local Edge decision.',
    tryAr:
      'اضبط 70 درجة مئوية وشغّل حالة الـ Cloud والإنترنت مفصول. اعمل Reset، وبعدها قارن بقرار Edge محلي.',
    observeEn:
      'The remote rule needs a working route. The local rule can return an actuator command without a WAN round trip. Playback is illustrative.',
    observeAr:
      'القاعدة البعيدة محتاجة مسار شغال. القاعدة المحلية ممكن ترجع أمر للمشغّل من غير رحلة WAN. توقيت العرض توضيحي.',
  },
  'iot-simulator': {
    tryEn:
      'In agriculture, compare soil readings 18 and 30 against the threshold 25. Trace all stages for both.',
    tryAr:
      'في الزراعة، قارن قراءة رطوبة 18 و30 بالحد 25. تابع كل المراحل في الحالتين.',
    observeEn:
      'Collect, Transmit, and Analyze are the source stages. Act is a teaching extension; irrigation activates below the example threshold.',
    observeAr:
      'Collect وTransmit وAnalyze مراحل المصدر. Act امتداد تعليمي؛ والري بيشتغل تحت الحد الافتراضي.',
  },
  'iot-stack-lab': {
    tryEn:
      'Trace the theoretical stack, compare the practical view, then step through TCP and UDP exchanges.',
    tryAr:
      'تتبّع المنظومة النظرية، وقارن العرض العملي، وبعدها تابع تبادل TCP وUDP خطوة خطوة.',
    observeEn:
      'The views have five layers and six practical blocks. TCP establishes a connection and acknowledges bytes; UDP has no built-in handshake or acknowledgement.',
    observeAr:
      'العرضين فيهم خمس طبقات وست كتل عملية. TCP بيبدأ اتصال وبيقرّ بالبايتات؛ UDP مفيهوش مصافحة أو إقرار مدمجين.',
  },
  'windows-message-loop': {
    tryEn:
      'Queue a click and a key event, then retrieve, translate, and dispatch them one step at a time.',
    tryAr:
      'حط ضغطة وحدث كتابة في الطابور، وبعدها استرجع وترجم ووزّع الرسائل خطوة خطوة.',
    observeEn:
      'Retrieving is different from dispatching. TranslateMessage can enqueue WM_CHAR for a later iteration. This is a browser model.',
    observeAr:
      'استرجاع الرسالة مختلف عن توزيعها. TranslateMessage ممكن يحط WM_CHAR لدورة جاية. ده نموذج في المتصفح.',
  },
  'event-driven-lab': {
    tryEn:
      'Compare sequential and event-driven modes with the same events. Watch the highlighted work and response path.',
    tryAr:
      'قارن التنفيذ المتسلسل والمعتمد على الأحداث بنفس الأحداث. تابع الشغل المظلل ومسار الاستجابة.',
    observeEn:
      'The event loop delivers events to handlers; the program does not have to process every event as one fixed sequential script.',
    observeAr:
      'حلقة الأحداث بتوصل الأحداث للـ Handlers؛ والبرنامج مش لازم يعالج كل حدث كسكريبت متسلسل ثابت.',
  },
  'win32-code-lab': {
    tryEn:
      'Trace a click, a character, and closing the window. Match each visible change with the call and callback.',
    tryAr:
      'تتبّع ضغطة وحرف وقفل النافذة. اربط كل تغيير ظاهر بالاستدعاء والـ Callback.',
    observeEn:
      'WndProc handles dispatched window messages. WM_QUIT ends the message loop instead of being dispatched as a normal window message.',
    observeAr:
      'WndProc بيعالج رسائل النافذة الموزعة. WM_QUIT بينهي حلقة الرسائل بدل ما يتوزع كرسالة نافذة عادية.',
  },
  'win32-types-lab': {
    tryEn:
      'Compare DWORD on x86 and x64. Compare char and TCHAR in both text builds, then choose a pointer-safe type.',
    tryAr:
      'قارن DWORD على x86 وx64. قارن char وTCHAR في إعدادات النص، وبعدها اختار نوع آمن لحجم المؤشر.',
    observeEn:
      'DWORD stays 32-bit and char stays 8-bit. TCHAR follows the text build; UINT_PTR follows the target pointer width.',
    observeAr:
      'DWORD بيفضل 32-bit وchar بيفضل 8-bit. TCHAR بيتبع إعداد النص؛ وUINT_PTR بيتبع حجم مؤشر المعمارية.',
  },
  'network-media': {
    tryEn:
      'Compare short and long links under interference. Raise the requested rate and inspect all three media.',
    tryAr:
      'قارن الوصلات القصيرة والطويلة مع التشويش. زوّد المعدل المطلوب وراجع وسائط النقل التلاتة.',
    observeEn:
      'Throughput stays at or below the modeled capacity. All capacities and condition factors are illustrative, not certified limits.',
    observeAr:
      'Throughput بيفضل عند السعة الممثلة أو أقل. السعات ومعاملات الظروف توضيحية، مش حدود معيارية.',
  },
  'ai-environments': {
    tryEn:
      'Compare Percept and World views for a taxi. Then advance the chess clock and load another image episode.',
    tryAr:
      'قارن منظور Percept والعالم في التاكسي. بعدها قدّم ساعة الشطرنج واعرض حلقة صورة تانية.',
    observeEn:
      'Hidden state remains unknown. Chess illustrates a fixed board with a changing performance measure; image samples are independent episodes.',
    observeAr:
      'الحالة المخفية بتفضل مجهولة. الشطرنج بيوضح لوحة ثابتة ومقياس أداء بيتغير؛ والصور حلقات مستقلة.',
  },
  'signal-sampling': {
    tryEn:
      'Change sampling rate while keeping the signal frequency fixed. Then change bit depth and compare amplitude levels.',
    tryAr:
      'غيّر معدل العينات مع تثبيت تردد الإشارة. بعدها غيّر عدد البتات وقارن مستويات السعة.',
    observeEn:
      'Sampling controls time spacing; quantization controls amplitude levels. Equality at the Nyquist boundary can be phase-ambiguous.',
    observeAr:
      'Sampling بيتحكم في المسافات الزمنية؛ وQuantization في مستويات السعة. المساواة عند حد Nyquist ممكن تبقى ملتبسة حسب الطور.',
  },
  'discrete-signals': {
    tryEn:
      'Select an impulse and change its shift. Compare reversal and the displayed even/odd decomposition.',
    tryAr: 'اختار Impulse وغيّر إزاحتها. قارن العكس وتحليل Even/Odd المعروض.',
    observeEn:
      'A shift moves the indexed sequence. Even and odd parts sum to the original sequence; the finite plot is a viewing window.',
    observeAr:
      'الإزاحة بتحرك الإشارة المفهرسة. الجزئين Even وOdd مجموعهم الإشارة الأصلية؛ والرسم نافذة محدودة للعرض.',
  },
  'signal-support': {
    tryEn:
      'Choose a transformation and follow each output index back to the input support. Compare shift and reversal.',
    tryAr:
      'اختار تحويل وتابع كل فهرس خرج لحدود الإشارة الداخلة. قارن الإزاحة بالعكس.',
    observeEn:
      'Map the argument into the known input interval. Indices outside it are guaranteed zeros; values inside are not necessarily nonzero.',
    observeAr:
      'اربط معامل الفهرس بالفترة المعروفة للمدخل. الفهارس برّهها أكيد صفر؛ والقيم جوّهها مش لازم تبقى غير صفرية.',
  },
  'signal-periodicity': {
    tryEn:
      'Overlay a candidate integer shift on a sinusoid. Compare its mismatch with the analytic integer-period rule.',
    tryAr:
      'راكب إزاحة بعدد صحيح على موجة جيبية. قارن الاختلاف بقاعدة الدورة الصحيحة التحليلية.',
    observeEn:
      'A discrete-time period must be an integer. Agreement over a finite window alone does not prove periodicity for every index.',
    observeAr:
      'الدورة في الزمن المتقطع لازم تبقى عدد صحيح. التطابق في نافذة محدودة لوحده مش بيثبت الدورية لكل الفهارس.',
  },
  'signal-systems': {
    tryEn:
      'Compare a gain system with a nonlinear example. Inspect the two paths for linearity and time invariance.',
    tryAr:
      'قارن نظام تكبير بمثال غير خطي. راجع المسارين لاختبار الخطية وثبات الزمن.',
    observeEn:
      'One failed comparison is a counterexample. A finite successful plot alone does not prove the property for all inputs.',
    observeAr:
      'مقارنة واحدة فاشلة تعتبر مثال مضاد. رسم محدود ناجح لوحده مش بيثبت الخاصية لكل المدخلات.',
  },
  'signal-convolution': {
    tryEn:
      'Step through the three-tap moving average. Inspect overlapping products before accumulating each output.',
    tryAr:
      'اتقدّم في متوسط التلات معاملات. راجع حاصل ضرب العينات المتداخلة قبل جمع كل خرج.',
    observeEn:
      'For the teaching input [3,0,6] and taps [1/3,1/3,1/3], full convolution is [1,1,3,2,2].',
    observeAr:
      'للمدخل التعليمي [3,0,6] والمعاملات [1/3,1/3,1/3]، الـ Convolution الكامل هو [1,1,3,2,2].',
  },
} satisfies Record<LabId, LabGuide>;

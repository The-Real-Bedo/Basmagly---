import React, { useState, useEffect } from 'react';
import { COURSES_DATA } from './data/coursesData';
import { Course, Lecture } from './types';
import { Navbar } from './components/Navbar';
import { CourseCard } from './components/CourseCard';
import { CourseDetail } from './components/CourseDetail';
import { LectureSummary } from './components/LectureSummary';
import { Footer } from './components/Footer';
import { ArabicText } from './components/ArabicText';
import { Wrench, Clock, ArrowRight, Zap, Bot, Cpu, Network, Route, Calculator, Radio, Sliders, Layers } from 'lucide-react';

interface LabDirectoryItem {
  id: string;
  courseId: string;
  lectureId: string;
  category: 'networks' | 'ai' | 'iot';
  categoryLabel: string;
  categoryLabelAr: string;
  title: string;
  subtitleAr: string;
  descriptionAr: string;
  icon: any;
  badge: string;
}

const ALL_LABS: LabDirectoryItem[] = [
  {
    id: 'network-devices',
    courseId: 'networks',
    lectureId: 'net-lec-1',
    category: 'networks',
    categoryLabel: 'Networks',
    categoryLabelAr: 'شبكات الحاسب',
    title: 'Network Devices & Collision Domain',
    subtitleAr: 'محاكي أجهزة الشبكة وتصادم الإشارات',
    descriptionAr: 'شوف بعينك ليه الهب (Hub) غبي وبيعمل تصادم (Collision) والسويتش بيعزل البورتات والراوتر بيفصل البث.',
    icon: Zap,
    badge: 'Hardware & L1-L3'
  },
  {
    id: 'packet-journey',
    courseId: 'networks',
    lectureId: 'net-lec-2',
    category: 'networks',
    categoryLabel: 'Networks',
    categoryLabelAr: 'شبكات الحاسب',
    title: 'Hop-by-Hop Packet Journey & MAC Rewrite',
    subtitleAr: 'رحلة الحزمة ونطة الراوتر والماك',
    descriptionAr: 'أهم سؤال في الامتحان: ليه الـ IP بيفضل ثابت طول الرحلة والـ MAC بيتغير مع كل نطة راوتر؟',
    icon: Route,
    badge: 'Routing & Frames'
  },
  {
    id: 'osi-visualizer',
    courseId: 'networks',
    lectureId: 'net-lec-2',
    category: 'networks',
    categoryLabel: 'Networks',
    categoryLabelAr: 'شبكات الحاسب',
    title: 'OSI 7 Layers vs TCP/IP Encapsulation',
    subtitleAr: 'محاكي طبقات الشبكة وتغليف الحزمة',
    descriptionAr: 'تتبع نزول البيانات وتغليف الترويسات (Headers) طبقة بطبقة مع طريقة ذكية لحفظ الترتيب للامتحان.',
    icon: Layers,
    badge: 'OSI vs TCP/IP'
  },
  {
    id: 'subnet-calculator',
    courseId: 'networks',
    lectureId: 'net-lec-2',
    category: 'networks',
    categoryLabel: 'Networks',
    categoryLabelAr: 'شبكات الحاسب',
    title: 'IPv4 Subnetting & Bitwise AND Engine',
    subtitleAr: 'حاسبة الـ Subnetting بالوحايد والأصفار',
    descriptionAr: 'سلايدر مباشر لحساب الـ CIDR وعنوان الشبكة (Network ID) والبث (Broadcast) وعدد الأجهزة الصالحة.',
    icon: Calculator,
    badge: 'CIDR & Binary'
  },
  {
    id: 'transmission-lab',
    courseId: 'networks',
    lectureId: 'net-lec-1',
    category: 'networks',
    categoryLabel: 'Networks',
    categoryLabelAr: 'شبكات الحاسب',
    title: 'Unicast vs Broadcast vs Multicast',
    subtitleAr: 'طرق الإرسال في السويتش والأجهزة',
    descriptionAr: 'تجربة حية للفرق بين إرسال لشخص واحد، أو نداء عام لكل الأجهزة، أو بث لجروب مشتركين.',
    icon: Radio,
    badge: 'Traffic Modes'
  },
  {
    id: 'topology-simulator',
    courseId: 'networks',
    lectureId: 'net-lec-1',
    category: 'networks',
    categoryLabel: 'Networks',
    categoryLabelAr: 'شبكات الحاسب',
    title: 'Network Topologies & Link Failure Lab',
    subtitleAr: 'معمل طوبولوجيا التوصيل وقطع الكابلات',
    descriptionAr: 'جرب تقطع كابل في الـ Bus وشوف الشبكة بتقف إزاي، وجرب الـ Star والـ Mesh والـ Ring عملياً.',
    icon: Network,
    badge: 'Topologies'
  },
  {
    id: 'vacuum-world',
    courseId: 'ai',
    lectureId: 'ai-lec-1',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    categoryLabelAr: 'ذكاء اصطناعي',
    title: 'Vacuum World & Rational Agent Lab',
    subtitleAr: 'معمل المكنسة الذكية وإطار PEAS',
    descriptionAr: 'روبوت كنس تفاعلي بأنيميشن شفط التراب، قياس نقاط الأداء، ومصفوفة الـ PEAS لأسئلة الفاينل.',
    icon: Bot,
    badge: 'Rational Agents'
  },
  {
    id: 'turing-test',
    courseId: 'ai',
    lectureId: 'ai-lec-1',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    categoryLabelAr: 'ذكاء اصطناعي',
    title: 'Alan Turing Test & 6 Disciplines',
    subtitleAr: 'محاكي اختبار تورينج والتخصصات الستة',
    descriptionAr: 'شات تفاعلي بين إنسان وآلة والمحقق البشري، مع شرح قدرات الذكاء الاصطناعي الشاملة.',
    icon: Bot,
    badge: 'Turing Test'
  },
  {
    id: 'edge-vs-cloud',
    courseId: 'iot',
    lectureId: 'iot-lec-1',
    category: 'iot',
    categoryLabel: 'Internet of Things',
    categoryLabelAr: 'إنترنت الأشياء',
    title: 'Edge vs Cloud Computing Tradeoff Lab',
    subtitleAr: 'معمل الـ Edge مقابل الـ Cloud في الطوارئ',
    descriptionAr: 'محاكاة حريق في مصنع: شوف سرعة استجابة الـ Edge (3ms) مقارنة بالـ Cloud (240ms)، وإيه اللي بيحصل لو النت فصل.',
    icon: Cpu,
    badge: 'Edge vs Cloud'
  },
  {
    id: 'iot-simulator',
    courseId: 'iot',
    lectureId: 'iot-lec-1',
    category: 'iot',
    categoryLabel: 'Internet of Things',
    categoryLabelAr: 'إنترنت الأشياء',
    title: 'IoT 4-Stage End-to-End Pipeline',
    subtitleAr: 'محاكي السلسلة الرباعية لإنترنت الأشياء',
    descriptionAr: 'سلايدرات تحكم حية لسنسور الحرارة، نقل الداتا عبر MQTT، التحليل على الـ Cloud، وتشغيل المحابس أوتوماتيك.',
    icon: Sliders,
    badge: 'IoT Pipeline'
  }
];

export const App: React.FC = () => {
  const [currentTerm, setCurrentTerm] = useState<1 | 2>(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [lectureInitialTab, setLectureInitialTab] = useState<'summary' | 'cheatSheet' | 'terms' | 'interactive' | 'quiz'>('summary');
  const [labFilter, setLabFilter] = useState<'all' | 'networks' | 'ai' | 'iot'>('all');

  const [isDark, setIsDark] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  const termCourses = COURSES_DATA.filter(c => c.term === currentTerm);
  const totalLecturesCount = COURSES_DATA.reduce((acc, c) => acc + c.lectures.length, 0);

  const handleHomeClick = () => {
    setSelectedCourse(null);
    setSelectedLecture(null);
    setLectureInitialTab('summary');
  };

  const handleOpenLecture = (course: Course, lecture: Lecture, tab: 'summary' | 'interactive' = 'summary') => {
    setSelectedCourse(course);
    setSelectedLecture(lecture);
    setLectureInitialTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLab = (lab: LabDirectoryItem) => {
    const course = COURSES_DATA.find(c => c.id === lab.courseId);
    if (!course) return;
    const lecture = course.lectures.find(l => l.id === lab.lectureId);
    if (!lecture) return;
    handleOpenLecture(course, lecture, 'interactive');
  };

  const filteredLabs = ALL_LABS.filter(lab => labFilter === 'all' || lab.category === labFilter);

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121214] flex flex-col font-sans transition-colors duration-200">
      {/* Navbar */}
      <Navbar
        currentTerm={currentTerm}
        onSelectTerm={(t) => {
          setCurrentTerm(t);
          handleHomeClick();
        }}
        isDark={isDark}
        onToggleDark={toggleDarkMode}
        onHomeClick={handleHomeClick}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedLecture ? (
          /* View 3: Lecture Study & Quiz Unit */
          <LectureSummary
            lecture={selectedLecture}
            initialTab={lectureInitialTab}
            onBackToCourse={() => {
              setSelectedLecture(null);
              setLectureInitialTab('summary');
            }}
          />
        ) : selectedCourse ? (
          /* View 2: Course Outline & Lectures */
          <CourseDetail
            course={selectedCourse}
            onSelectLecture={(lec) => handleOpenLecture(selectedCourse, lec, 'summary')}
            onBack={() => setSelectedCourse(null)}
          />
        ) : currentTerm === 2 ? (
          /* Term 2: Clean, simple placeholder */
          <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-12 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-beige-100 dark:bg-stone-800 text-stone-700 dark:text-zinc-300 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Term 2 Curriculum (Spring Semester)
              </h2>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 pt-1 text-center">
                هنا هينزل كل منهج الترم التاني بملخصاته ومعامله وأسئلته أول ما يبدأ الترم على طول يا هندسة!
              </ArabicText>
            </div>
            <button
              onClick={() => setCurrentTerm(1)}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-sm font-bold transition-all active:scale-95 shadow-sm"
            >
              <ArabicText as="span" className="text-white dark:text-stone-900">الرجوع لمواد الترم الأول (Back to Term 1)</ArabicText>
            </button>
          </div>
        ) : (
          /* View 1: Clean, Practical Course Dashboard */
          <div className="space-y-8">
            {/* Practical Academic Banner */}
            <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                {/* Requirement 8: Calm neutral badge instead of amber overload */}
                <span className="text-[13px] font-mono font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider block">
                  Academic Year 2026 / 2027 • Term 1
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight flex flex-wrap items-center gap-2">
                  <span className="font-arabic">بصمجّلي شكرًا</span>
                  <span className="text-xl sm:text-2xl font-sans font-bold text-stone-500 dark:text-zinc-400 font-mono">• Basmagly</span>
                </h1>
                {/* Secondary description */}
                <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed pt-1">
                  Concise lecture summaries, bilingual translations, interactive labs for deep conceptual understanding, and exam-standard quizzes.
                </p>
                <ArabicText className="text-sm font-medium text-stone-600 dark:text-zinc-300">
                  زتونة المنهج من غير رغي وحشو.. الشرح ببساطة ومن الآخر، معامل تفاعلية تفهمك الفكرة في ثواني، وبنك أسئلة يخليك تدخل الامتحان متطمن وشكرًا.
                </ArabicText>
              </div>

              {/* Minimalist Summary Badges */}
              <div className="flex items-center gap-3 shrink-0">
                {[
                  { label: 'Courses', value: termCourses.length },
                  { label: 'Lectures', value: totalLecturesCount },
                  { label: 'Labs', value: ALL_LABS.length },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="bg-[#FAF7F2] dark:bg-stone-950 p-3.5 rounded-2xl text-center min-w-[85px] border border-beige-300 dark:border-stone-800"
                  >
                    <span className="text-[13px] text-stone-600 dark:text-zinc-400 block font-mono">{stat.label}</span>
                    <span className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses Grid Section */}
            <div className="space-y-4">
              <div className="flex items-start sm:items-center justify-between gap-3 border-b border-beige-200 dark:border-stone-800 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    Courses Curriculum ({termCourses.length} Subjects)
                  </h2>
                  <ArabicText className="text-sm font-normal text-stone-600 dark:text-zinc-300">
                    مواد الترم الأول — ادخل على المادة وذاكر محاضرة محاضرة
                  </ArabicText>
                </div>
                {/* Requirement 1: Increased contrast on Semester 1 badge */}
                <span className="text-[13px] font-mono font-bold px-3 py-1 rounded-lg bg-beige-100 dark:bg-stone-800 text-stone-700 dark:text-zinc-200 border border-beige-200 dark:border-stone-700 shadow-sm whitespace-nowrap shrink-0">
                  Term 1
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {termCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={(c) => setSelectedCourse(c)}
                  />
                ))}
              </div>
            </div>

            {/* Comprehensive Interactive Labs Explorer (10 Labs) */}
            <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-200 dark:border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-stone-700 dark:text-zinc-300" />
                    <span>Interactive Labs & Visual Simulations ({ALL_LABS.length} Labs)</span>
                  </h3>
                  <ArabicText className="text-sm text-stone-600 dark:text-zinc-300 pt-0.5">
                    المعامل التفاعلية الجاهزة للتطبيق العملي ورؤية الداتا وهي بتتحرك وتتغلف قدام عينك
                  </ArabicText>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-sm bg-[#FAF7F2] dark:bg-stone-950 p-1 rounded-2xl border border-beige-300 dark:border-stone-800">
                  {[
                    { id: 'all', label: `كل المعامل (${ALL_LABS.length})` },
                    { id: 'networks', label: `الشبكات (${ALL_LABS.filter(l => l.category === 'networks').length})` },
                    { id: 'ai', label: `الذكاء الاصطناعي (${ALL_LABS.filter(l => l.category === 'ai').length})` },
                    { id: 'iot', label: `إنترنت الأشياء (${ALL_LABS.filter(l => l.category === 'iot').length})` },
                  ].map(tab => {
                    const isSelected = labFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setLabFilter(tab.id as any)}
                        className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
                          isSelected
                            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                            : 'text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Labs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLabs.map((lab) => {
                  const IconComp = lab.icon;
                  return (
                    <div
                      key={lab.id}
                      onClick={() => handleOpenLab(lab)}
                      className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-md transition-all flex flex-col justify-between gap-3 group cursor-pointer"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          {/* Requirement 8: Calm neutral badge */}
                          <span className="text-[13px] font-mono font-bold px-2.5 py-1 rounded-md bg-white dark:bg-stone-900 text-stone-800 dark:text-zinc-200 border border-beige-200 dark:border-stone-800">
                            {lab.badge}
                          </span>
                          <span className="text-[13px] text-stone-600 dark:text-zinc-400 font-mono">
                            {lab.categoryLabel}
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-beige-200 dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-zinc-200 shrink-0 mt-0.5 group-hover:bg-stone-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-stone-900 transition-colors shadow-sm">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            {/* Requirement 8: Calm titles on hover */}
                            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                              {lab.title}
                            </h4>
                            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
                              {lab.subtitleAr}
                            </ArabicText>
                          </div>
                        </div>

                        {/* Requirement 1: Secondary text contrast & min 14px body */}
                        <ArabicText className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed line-clamp-2">
                          {lab.descriptionAr}
                        </ArabicText>
                      </div>

                      <div className="pt-3 border-t border-beige-200 dark:border-stone-800/80 flex items-center justify-between text-sm text-stone-600 dark:text-zinc-300">
                        <span className="text-[13px] font-arabic font-semibold text-stone-700 dark:text-zinc-300">
                          {lab.categoryLabelAr}
                        </span>
                        <span className="flex items-center gap-1.5 font-bold text-sm text-stone-800 dark:text-zinc-200 group-hover:translate-x-0.5 transition-transform">
                          <span>فتح المعمل</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
};

export default App;

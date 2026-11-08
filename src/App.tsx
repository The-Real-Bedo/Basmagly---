import React, { useState, useEffect } from 'react';
import { COURSES_DATA } from './data/coursesData';
import { Course, Lecture } from './types';
import { Navbar } from './components/Navbar';
import { CourseCard } from './components/CourseCard';
import { CourseDetail } from './components/CourseDetail';
import { LectureSummary } from './components/LectureSummary';
import { LAB_CATALOG, LabCategory } from './data/labCatalog';
import { Footer } from './components/Footer';
import { ArabicText } from './components/ArabicText';
import { BrandLogo } from './components/BrandLogo';
import { Wrench, Clock, ArrowRight, TriangleAlert } from 'lucide-react';

type LabDirectoryItem = typeof LAB_CATALOG[number];
const ALL_LABS = LAB_CATALOG;

// Helper to parse location state from URL hash
const parseLocationState = () => {
  if (typeof window === 'undefined') return null;
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return null;

  if (raw.includes('=')) {
    const params = new URLSearchParams(raw);
    return {
      courseId: params.get('course'),
      lectureId: params.get('lecture'),
      tab: params.get('tab') as 'summary' | 'cheatSheet' | 'terms' | 'interactive' | 'quiz' | null,
      sheetId: params.get('sheet') || null,
      term: params.get('term') ? (parseInt(params.get('term')!) as 1 | 2) : null,
    };
  }

  const [courseId, lectureId, tab] = raw.split('/');
  return {
    courseId: courseId || null,
    lectureId: lectureId || null,
    tab: (tab as any) || null,
    sheetId: null,
    term: null,
  };
};

export const App: React.FC = () => {
  const initialNav = parseLocationState();
  const initialCourse = initialNav?.courseId ? COURSES_DATA.find((c) => c.id === initialNav.courseId) || null : null;
  const initialLecture = initialCourse && initialNav?.lectureId ? initialCourse.lectures.find((l) => l.id === initialNav.lectureId) || null : null;

  const [currentTerm, setCurrentTerm] = useState<1 | 2>(initialNav?.term || (initialCourse ? initialCourse.term : 1));
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(initialCourse);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(initialLecture);
  const [selectedSheetId, setSelectedSheetId] = useState<string | null>(initialNav?.sheetId || null);
  const [lectureInitialTab, setLectureInitialTab] = useState<'summary' | 'cheatSheet' | 'terms' | 'interactive' | 'quiz'>(
    initialNav?.tab || 'summary'
  );
  const [lectureInitialExperiment, setLectureInitialExperiment] = useState<string | undefined>();
  const [labFilter, setLabFilter] = useState<'all' | LabCategory>('all');

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

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const state = parseLocationState();
      if (!state?.courseId) {
        setSelectedCourse(null);
        setSelectedLecture(null);
        setSelectedSheetId(null);
        if (state?.term) {
          setCurrentTerm(state.term);
        }
        return;
      }

      const course = COURSES_DATA.find((c) => c.id === state.courseId);
      if (!course) return;

      setSelectedCourse(course);
      setCurrentTerm(course.term);
      setSelectedSheetId(state.sheetId || null);

      if (state.lectureId) {
        const lecture = course.lectures.find((l) => l.id === state.lectureId);
        setSelectedLecture(lecture || null);
        if (state.tab) {
          setLectureInitialTab(state.tab);
        }
      } else {
        setSelectedLecture(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Synchronize URL hash when navigation state changes
  useEffect(() => {
    if (selectedLecture && selectedCourse) {
      const newHash = `#course=${selectedCourse.id}&lecture=${selectedLecture.id}&tab=${lectureInitialTab}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
      }
    } else if (selectedCourse) {
      const newHash = selectedSheetId ? `#course=${selectedCourse.id}&sheet=${selectedSheetId}` : `#course=${selectedCourse.id}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
      }
    } else if (currentTerm === 2) {
      const newHash = `#term=2`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
      }
    } else {
      if (window.location.hash && window.location.hash !== '#') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [selectedCourse, selectedLecture, lectureInitialTab, selectedSheetId, currentTerm]);

  const termCourses = COURSES_DATA.filter(c => c.term === currentTerm);

  const handleHomeClick = () => {
    setSelectedCourse(null);
    setSelectedLecture(null);
    setSelectedSheetId(null);
    setLectureInitialTab('summary');
  };

  const handleOpenLecture = (course: Course, lecture: Lecture, tab: 'summary' | 'interactive' = 'summary') => {
    setSelectedCourse(course);
    setSelectedLecture(lecture);
    setSelectedSheetId(null);
    setLectureInitialTab(tab);
    setLectureInitialExperiment(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLab = (lab: LabDirectoryItem) => {
    const course = COURSES_DATA.find(c => c.id === lab.courseId);
    if (!course) return;
    const lecture = course.lectures.find(l => l.id === lab.lectureId);
    if (!lecture) return;
    handleOpenLecture(course, lecture, 'interactive');
    setLectureInitialExperiment(lab.id);
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
            initialExperiment={lectureInitialExperiment}
            onTabChange={(tab) => setLectureInitialTab(tab)}
            onBackToCourse={() => {
              setSelectedLecture(null);
              setLectureInitialTab('summary');
            }}
          />
        ) : selectedCourse ? (
          /* View 2: Course Outline & Lectures */
          <CourseDetail
            course={selectedCourse}
            initialSheetId={selectedSheetId}
            onSheetChange={(sheetId) => setSelectedSheetId(sheetId)}
            onSelectLecture={(lec) => handleOpenLecture(selectedCourse, lec, 'summary')}
            onBack={() => {
              setSelectedCourse(null);
              setSelectedSheetId(null);
            }}
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
            <div className="bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="min-w-0 w-full flex-1 space-y-2">
                {/* Requirement 8: Calm neutral badge instead of amber overload */}
                <span className="text-[13px] font-mono font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider block">
                  Academic Year 2026 / 2027 • Term 1
                </span>
                <h1 className="pt-1">
                  <BrandLogo size="hero" />
                </h1>
                <aside data-testid="hero-study-notice" className="mt-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-[#FAF7F2] dark:bg-stone-950 min-h-[240px] p-5 sm:p-6 flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-end gap-2 text-amber-800 dark:text-amber-300">
                    <ArabicText as="span" className="text-[13px] font-semibold text-inherit">تنبيه قبل البصمجة</ArabicText>
                    <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </div>
                  <ArabicText as="h2" className="text-xl sm:text-2xl font-semibold leading-relaxed text-stone-900 dark:text-stone-100">
                    <span className="block">البصمجة ياما جابت تقديرات.</span>
                    <span className="block">بس هتظبط المرة دي؟</span>
                    <span className="mt-2 block text-3xl sm:text-4xl font-bold text-amber-800 dark:text-amber-300">موعدكش.</span>
                  </ArabicText>
                  <ArabicText className="text-sm sm:text-base text-stone-700 dark:text-zinc-300">
                    اللي نقدر عليه: نلمّ لك المنهج، ونفكّ لك الفكرة. الباقي عليك يا هندسة.
                  </ArabicText>
                </aside>
              </div>

              {/* Minimalist Summary Badges */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {[
                  { label: 'Courses', value: termCourses.length },
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

            {/* Experiment catalogue */}
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
                <div className="flex flex-wrap items-center gap-1.5 text-sm bg-[#FAF7F2] dark:bg-stone-950 p-1 rounded-2xl border border-beige-300 dark:border-stone-800">
                  {[
                    { id: 'all', label: `All (${ALL_LABS.length})` },
                    { id: 'networks', label: `Networks (${ALL_LABS.filter(l => l.category === 'networks').length})` },
                    { id: 'ai', label: `AI (${ALL_LABS.filter(l => l.category === 'ai').length})` },
                    { id: 'iot', label: `IoT (${ALL_LABS.filter(l => l.category === 'iot').length})` },
                    { id: 'windows', label: `Windows (${ALL_LABS.filter(l => l.category === 'windows').length})` },
                    { id: 'signals', label: `Signals (${ALL_LABS.filter(l => l.category === 'signals').length})` },
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
                      role="button"
                      tabIndex={0}
                      onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleOpenLab(lab); } }}
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
                        <p className="text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">{lab.description}</p>
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

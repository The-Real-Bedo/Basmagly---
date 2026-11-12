export interface LectureSlideConfig {
  lectureId: string;
  courseId: string;
  title: string;
  titleAr: string;
  sourceDocName: string;
  basePath: string;
  pageCount: number;
}

export const SLIDE_CONFIGS: Record<string, LectureSlideConfig> = {
  'net-lec-1': {
    lectureId: 'net-lec-1',
    courseId: 'networks',
    title: 'CCNA - Lecture 1',
    titleAr: 'شبكات الحاسب - المحاضرة الأولى',
    sourceDocName: 'CCNA-1.pdf',
    basePath: '/slides/net-lec-1',
    pageCount: 27,
  },
  'net-lec-2': {
    lectureId: 'net-lec-2',
    courseId: 'networks',
    title: 'CCNA - Lecture 2',
    titleAr: 'شبكات الحاسب - المحاضرة الثانية',
    sourceDocName: 'CCNA-2.pdf',
    basePath: '/slides/net-lec-2',
    pageCount: 31,
  },
  'net-lec-3': {
    lectureId: 'net-lec-3',
    courseId: 'networks',
    title: 'CCNA - Lecture 3',
    titleAr: 'شبكات الحاسب - المحاضرة الثالثة',
    sourceDocName: 'CCNA-3.pdf',
    basePath: '/slides/net-lec-3',
    pageCount: 32,
  },
  'net-lec-4': {
    lectureId: 'net-lec-4',
    courseId: 'networks',
    title: 'CCNA - Lecture 4',
    titleAr: 'شبكات الحاسب - المحاضرة الرابعة',
    sourceDocName: 'CCNA-4.pdf',
    basePath: '/slides/net-lec-4',
    pageCount: 35,
  },
};

export const getSlideUrl = (lectureId: string, pageNumber: number): string => {
  const config = SLIDE_CONFIGS[lectureId];
  if (!config) return `/slides/${lectureId}/page-${pageNumber}.jpg`;
  const safePage = Math.max(1, Math.min(pageNumber, config.pageCount));
  return `${config.basePath}/page-${safePage}.jpg`;
};

export const getCourseUnitLabels = (courseId: string) => {
  const chapters = courseId === 'windows-programming' || courseId === 'signal-processing';
  return {
    singular: chapters ? 'Chapter' : 'Lecture',
    plural: chapters ? 'Chapters' : 'Lectures',
    pluralAr: chapters ? 'الفصول' : 'المحاضرات',
    emptyAr: chapters ? 'لا توجد فصول متاحة للمادة حاليًا.' : 'لا توجد محاضرات متاحة للمادة حاليًا.',
  };
};

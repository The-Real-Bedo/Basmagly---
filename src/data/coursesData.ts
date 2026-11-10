import type { Course } from '../types';
import { COURSES_DATA as COURSE_SEEDS } from './courseSeeds';
import { AI_LECTURE_ONE } from './aiLectureOne';
import { AI_REMAINING_LECTURES } from './aiRemainingLectures';
import { auditedAiSheets } from './aiSourceSheets';
import { NETWORK_LECTURES } from './networkLectures';
import { IOT_LECTURES } from './iotLectures';
import { WINDOWS_PROGRAMMING_COURSE } from './windowsProgrammingCourse';
import { SIGNAL_PROCESSING_COURSE } from './signalProcessingCourse';

export const COURSES_DATA: Course[] = [
  ...COURSE_SEEDS.map(course => {
    switch (course.id) {
      case 'ai': return { ...course, lectures: [AI_LECTURE_ONE, ...AI_REMAINING_LECTURES], sheets: auditedAiSheets(course.sheets) };
      case 'networks': return { ...course, lectures: NETWORK_LECTURES };
      case 'iot': return { ...course, lectures: IOT_LECTURES };
      case 'windows-programming': return WINDOWS_PROGRAMMING_COURSE;
      default: return course;
    }
  }),
  SIGNAL_PROCESSING_COURSE,
];

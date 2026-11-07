export type QuestionType = 'mcq' | 'true_false' | 'essay';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  courseId: string;
  lectureId: string;
  type: QuestionType;
  question: string;
  questionAr: string;
  options?: string[];
  optionsAr?: string[];
  correctAnswer: number | boolean | string;
  explanation?: string;
  explanationAr?: string;
  modelAnswer?: string;
  modelAnswerAr?: string;
  keyPoints?: string[];
  difficulty?: Difficulty;
}

export interface QuickCheck {
  question: string;
  questionAr: string;
  options: string[];
  optionsAr: string[];
  correctIndex: number;
  explanation: string;
  explanationAr: string;
}

export interface SummarySection {
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  bulletPoints?: string[];
  bulletPointsAr?: string[];
  keyRule?: string;
  keyRuleAr?: string;
  quickCheck?: QuickCheck;
}

export interface TermDefinition {
  term: string;
  termAr: string;
  definition: string;
  definitionAr: string;
}

export interface CheatSheetItem {
  en: string;
  ar: string;
}

export interface Lecture {
  id: string;
  courseId: string;
  lectureNumber: number;
  title: string;
  titleAr: string;
  brief: string;
  briefAr: string;
  durationMinutes: number;
  sections: SummarySection[];
  terms: TermDefinition[];
  cheatSheet: CheatSheetItem[];
  interactiveTools: string[];
  questions: Question[];
}

export interface SheetProblem {
  id: string;
  problemNumber: number;
  partTitle?: string;
  partTitleAr?: string;
  type?: 'mcq' | 'true_false' | 'problem';
  question: string;
  questionAr: string;
  options?: string[];
  optionsAr?: string[];
  correctAnswer?: number | boolean | string;
  solution?: string;
  solutionAr?: string;
}

export interface CourseSheet {
  id: string;
  courseId: string;
  sheetNumber: number;
  title: string;
  titleAr: string;
  brief: string;
  briefAr: string;
  problemsCount: number;
  hasSolution: boolean;
  problems?: SheetProblem[];
}

export interface Course {
  id: string;
  title: string;
  titleAr: string;
  instructor?: string;
  description: string;
  descriptionAr: string;
  term: 1 | 2;
  icon: string;
  lectures: Lecture[];
  sheets?: CourseSheet[];
  isAvailable: boolean;
}

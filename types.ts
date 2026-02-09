
export enum QuestionStatus {
  NOT_VISITED = 'NOT_VISITED',
  NOT_ANSWERED = 'NOT_ANSWERED',
  ANSWERED = 'ANSWERED',
  MARKED_FOR_REVIEW = 'MARKED_FOR_REVIEW',
  ANSWERED_AND_MARKED = 'ANSWERED_AND_MARKED'
}

export interface Question {
  id: number;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  text: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number | null;
  status: QuestionStatus;
  explanation?: string;
}

export type View = 'DASHBOARD' | 'TEST' | 'ANALYSIS';

export interface SubjectResult {
  score: number;
  attempted: number;
  correct: number;
  incorrect: number;
  total: number;
}

export interface TestResult {
  totalScore: number;
  maxScore: number;
  accuracy: number;
  timeSpent: number; // in seconds
  questions: Question[];
  subjects: {
    Physics: SubjectResult;
    Chemistry: SubjectResult;
    Mathematics: SubjectResult;
  };
}

export interface PerformanceStats {
  auraScore: number;
  dailyStreak: number;
  accuracy: number;
  rankEstimate: number;
  subjectMastery: {
    physics: number;
    chemistry: number;
    maths: number;
  };
}

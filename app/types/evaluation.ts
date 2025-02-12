export interface ScoreDetail {
  score: number;
  summary: string;
  title: string;
}

export type EvaluationMetric = {
  score: number;
  summary: string;
  title: string;
};

export type Applicant = {
  applicantName: string;
  recruitmentTitle: string;
  applicantId: number;
  scoreDetails: EvaluationMetric[];
  resumeSummary: string; 
};

export type Applicants = {
  applicantList: Applicant[];
};

export type IsPassedApplicant = {
  passedList: boolean[];
};

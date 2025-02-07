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
  applicationName: string;
  recruitmentTitle: string;
  scoreDetails: EvaluationMetric[];
};

export type Applicants = {
  applicantList: Applicant[];
};

export type IsPassedApplicant = {
  passedList: boolean[];
};
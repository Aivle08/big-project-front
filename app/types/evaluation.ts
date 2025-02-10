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
  // applicantId: number;  // 이 필드가 있는지 확인
  // applicationName: string;
  // recruitmentTitle: string;
  // scoreDetails: ScoreDetail[];
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

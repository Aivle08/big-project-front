export interface ScoreDetail {
  score: number;
  summary: string;
  title: string;
}

export interface PassedApplicant {
  [x: string]: any;
  recruitmentTitle: string;
  applicationName: string;
  scoreDetails: ScoreDetail[];
}

export interface PassedResponse {
  recruitmentTitle: string;
  passList: PassedApplicant[];
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
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
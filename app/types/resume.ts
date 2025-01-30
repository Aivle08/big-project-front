export interface EvaluationItem {
  item: string;
  detail: string;
}

export interface ResumeAnalysisRequest {
  title: string;
  job: string;
  evaluationList: EvaluationItem[];
}
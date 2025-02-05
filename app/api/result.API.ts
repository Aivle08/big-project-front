import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// 토큰 자동 삽입
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const resultAPI = {
  // 모든 지원자 평가 저장
  async getApplicantsEvaluations(recruitmentId: number, passed: boolean = false) {
    const response = await AxiosInstance.get(`/recruitment/${recruitmentId}/applicants`, {
      params: { passed }
    });
    return response.data;
  },

  // 지원자 평가 조회
  async getApplicantEvaluation(recruitmentId: number, applicantId: number) {
    const response = await AxiosInstance.get(`/recruitment/${recruitmentId}/applicant/${applicantId}`);
    return response.data;
  }
};

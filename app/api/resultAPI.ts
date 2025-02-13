import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://picks-up.site/api/v1';

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
  // 모든 지원자 평가 조회
  getApplicantsEvaluations: async (recruitmentId: number, passed: boolean = false) => {
    const response = await AxiosInstance.get(`/recruitment/${recruitmentId}/applicants`, {
      params: { passed }
    });
    return response.data;
  },

  // 지원자 평가 조회
  getApplicantEvaluation: async (recruitmentId: number, applicantId: number) => {
    console.log('API call params:', { recruitmentId, applicantId }); // 디버깅용
    const response = await AxiosInstance.get(
      `/recruitment/${recruitmentId}/applicant/${applicantId}`
    );
    return response.data;
  }
};

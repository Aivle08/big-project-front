import axios from 'axios';
import { ResumeAnalysisRequest } from '../types/resume';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

// 토큰을 유틸리티나 서비스로 관리
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

export const analyzeResume = async (data: ResumeAnalysisRequest) => {
  const token = getAccessToken();
  const response = await api.post('/recruitment', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return response.data;

  // try {
  //   const response = await api.post('/recruitment', data);
  //   return response.data;
  // } catch (error) {
  //   console.error('분석 결과 조회 실패 : ', error);
  //   throw error;
  // }
};

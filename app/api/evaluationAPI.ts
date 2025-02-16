import axios from 'axios';
import Cookies from 'js-cookie';
import { PassedResponse } from '../types/evaluation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://picks-up.site/api/v1';

const evaluationAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

evaluationAxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', config);  // 요청 설정 로깅
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

evaluationAxiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response Data:', response.data);  // 응답 데이터 로깅
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export const evaluationAPI = {
  getPassedApplicants: async (recruitmentId: number): Promise<PassedResponse> => {
    try {
      console.log('Fetching passed applicants for recruitmentId:', recruitmentId);
      const response = await evaluationAxiosInstance.get(
        `/recruitment/${recruitmentId}/applicants`, 
        { 
          params: { passed: true },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Passed applicants response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching passed applicants:', error);
      throw error;
    }
  },
  setPasser: async (recruitmentId: number, passerID: number): Promise<PassedResponse> => {
    try {
      console.log('Post passed applicants for recruitmentId:' + recruitmentId + "passerID" + passerID);
      const response = await evaluationAxiosInstance.post(
        `/recruitment/${recruitmentId}/applicants/pass`,
        passerID,  // 객체에서 배열 형식으로 변경
        { 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
      console.log('Passed applicants response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching passed applicants:', error);
      throw error;
    }
  }
};
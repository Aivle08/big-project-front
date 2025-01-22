
import axios, { AxiosResponse } from 'axios';
import {
  LoginCredentials,
  RegisterFormData,
  ApiResponse,
  LoginResponse,
  RegisterResponse,
  IdCheckResponse
} from '../types/auth';


interface EmailVerificationResponse {
  success: boolean;
  message: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 토큰 요청
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const authAPI = {
  // 로그인 API
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<LoginResponse>> = 
        await axiosInstance.post('/users/login', credentials);
      
      // 로그인 성공 시 토큰 저장
      if (response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          success: false,
          message: error.response?.data?.message || '로그인에 실패했습니다.',
          data: null
        };
      }
      throw error;
    }
  },

  // 회원가입 API
  register: async (userData: RegisterFormData): Promise<ApiResponse<RegisterResponse>> => {
    try {
      const response = await axiosInstance.post('/users/register', userData);
      console.log('API response:', response);

        return {
          success: true,
          message: '회원가입이 완료되었습니다!',
          data: response.data,
          status: response.status
        };
      
    } catch (error: any) {
      console.error('API error:', error);

      throw {
        success: false,
        message: error.response?.data?.message || '회원가입 처리 중 오류가 발생했습니다.',
        status: error.response?.status
      };
    }
  },
  // register: async (userData: RegisterFormData): Promise<AxiosResponse<ApiResponse<RegisterResponse>>> => {
  //   try {
  //     const response: AxiosResponse<ApiResponse<RegisterResponse>> = 
  //       await axiosInstance.post('/users/register', userData);
  //     return response; // AxiosResponse 자체를 반환
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       throw {
  //         success: false,
  //         message: error.response?.data?.message || '회원가입에 실패했습니다.',
  //         data: null,
  //         status: error.response?.status || 500, // 상태 코드 포함
  //       };
  //     }
  //     throw error;
  //   }
  // },

  // 로그아웃 API
  logout: () => {
    localStorage.removeItem('token');
    // 추가적인 로그아웃 로직 (예: 서버에 로그아웃 요청 등)
    return { success: true, message: '로그아웃 되었습니다.', data: null };
  },

  // 이메일 인증 코드 발송
  sendVerificationEmail: async (email: string): Promise<EmailVerificationResponse> => {
    try {
      const response = await axiosInstance.post('/users/email/verify', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          success: false,
          message: error.response?.data?.message || '이메일 전송에 실패했습니다.',
        };
      }
      throw error;
    }
  },

  // 이메일 인증 코드 확인
  verifyEmailCode: async (email: string, code: string): Promise<EmailVerificationResponse> => {
    try {
      const response = await axiosInstance.post('/users/email/verify-code', {
        email,
        code
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          success: false,
          message: error.response?.data?.message || '인증 코드 확인에 실패했습니다.',
        };
      }
      throw error;
    }
  },

  // 아이디 중복 확인 API
  checkIdAvailability: async (userId: string): Promise<ApiResponse<IdCheckResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<IdCheckResponse>> = 
        await axiosInstance.get(`/users/check-id/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          success: false,
          message: error.response?.data?.message || '아이디 중복 확인에 실패했습니다.',
          data: null
        };
      }
      throw error;
    }
  }
};
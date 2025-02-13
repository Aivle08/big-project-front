import axios, { AxiosResponse } from 'axios';
import {
  LoginCredentials,
  RegisterFormData,
  ApiResponse,
  LoginResponse,
  RegisterResponse,
  IdCheckResponse,
  UserInfoResponse
} from '../types/auth';
import Cookies from 'js-cookie';


interface EmailVerificationResponse {
  success: boolean;
  message: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://picks-up.site/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const cookieOptions:object = {
  path: '/',
  secure: false,
  sameSite: 'Strict',
};

// 인터셉터 (쿠키 가져옴)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    // 토큰이 있고 특정 경로가 아닌 경우 Authorization 헤더 설정
    if (token && config.headers && !config.url?.includes('/users/register') && !config.url?.includes('/users/login')) {
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
  login: async (credentials: LoginCredentials): Promise<AxiosResponse<ApiResponse<LoginResponse>>> => {
    try {
      console.log(credentials);
      const response = await axiosInstance.post('/users/login', credentials);

      // console.log(response);
      // console.log(response.headers);
      // const token = response.data;
      // console.log(token);
      const token = response.headers['authorization'].replace('Bearer ', '').trim();
      // 로그인 성공 시 토큰 저장
      if (token) {
        Cookies.set('token', token, cookieOptions);
      }
      
      return response; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error);
        throw error;
      }else{
        console.error("Unexpected Error:", error);
        throw error;
      }
    }
  },

  // 회원가입 API
  register: async (userData: RegisterFormData): Promise<ApiResponse<RegisterResponse>> => {
    try {
      console.log(userData);

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

  getUserInfo: async (): Promise<ApiResponse<UserInfoResponse>> => {
    try {
      const response = await axiosInstance.get('/users');
      console.log('User Info response:', response);
  
      return {
        success: true,
        message: '사용자 정보를 성공적으로 가져왔습니다.',
        data: response.data,
        status: response.status
      };
    } catch (error: any) {
      console.error('User Info API error:', error);
      throw {
        success: false,
        message: error.response?.data?.message || '사용자 정보를 가져오는 중 오류가 발생했습니다.',
        status: error.response?.status,
        error: error
      };
    }
  },

  // 로그아웃 API
  logout: () => {
    Cookies.remove('token', cookieOptions);
    return { success: true, message: '로그아웃 되었습니다.', data: null };
  },

  // 이메일 인증코드 발송
  sendVerificationEmail: async (email: string)=> {
    try {
      console.log(email);
      const response = await axiosInstance.post(`/users/initiate-email?email=${encodeURIComponent(email)}`);
      return response;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 200) {
            // 200 상태코드지만 에러로 잡힌 경우 정상 응답으로 처리
            return error.response;
        }
        throw error;
    }
    // console.log(email);
    // const response = await axiosInstance.post(`/users/initiate-email?email=${encodeURIComponent(email)}`);
    
    // return response;
  },

  // 이메일 인증 코드 확인
  verifyEmailCode: async (code: string)=> {
    try {
      const response = await axiosInstance.get(`/users/verify-email?token=${encodeURIComponent(code)}`);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          success: false,
          message: error.response?.data?.message || '인증 코드 확인 실패.',
        };
      }
      throw error;
    }
  },

  // 아이디 중복 확인 API
  checkIdAvailability: async (userId: string) => {
    try {
      const response: AxiosResponse<ApiResponse<IdCheckResponse>> = 
        await axiosInstance.get(`/users/check-username?username=${encodeURIComponent(userId)}`);
      return response;
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
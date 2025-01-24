
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../api/authAPI';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure
} from '../features/authSlice';
import { LoginCredentials, RegisterFormData } from '../../types/auth';

// 로그인 Thunk
export const loginUser = createAsyncThunk(
  'users/login',
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await authAPI.login(credentials);
      console.log("loginUser");
      console.log("로그인 정보:", response);

      // HTTP status 200인 경우에만 성공
      if (response.status === 200) {
        // user data 받아오기
        // (loginSuccess 슬라이스로 상태 저장)
        try {
          const user = await authAPI.getUserInfo(); // authAPI.getUserInfo() 호출
          
          console.log(user);
          if(user.status === 200){
            console.log("사용자 정보:", user.data);

            dispatch(loginSuccess(user.data));
          }
        } catch (error: any) {
          console.error("사용자 정보 가져오기 실패:", error);
          throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
        }

        return response; // 전체 AxiosResponse 반환
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || '로그인 실패';
      dispatch(loginFailure(message));
      throw new Error(message);
    }
  }
);

// 회원가입 Thunk
export const registerUser = createAsyncThunk(
  'users/register',
  async (userData: RegisterFormData, { dispatch }) => {
    try {
      dispatch(registerStart());
      const response = await authAPI.register(userData);

      // HTTP status 201일 때 성공임
      if (response.status === 201) {
        dispatch(registerSuccess());
        return response.data;
      } else {
        throw new Error('회원가입 실패');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || '회원가입 실패';
      dispatch(registerFailure(message));
      throw new Error(message);
    }
  }
);


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
      const { data } = response;
      
      // 토큰 저장
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess(data.user));
      
      return data;
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
      dispatch(registerSuccess());
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || '회원가입 실패';
      dispatch(registerFailure(message));
      throw new Error(message);
    }
  }
);
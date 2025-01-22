// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  userId: string;
  name: string;
  companyName: string;
  department: string;
  phone: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  userId: string;
  password: string;
  companyName: string;
  department: string;
  name: string;
  phone: string;
}

export interface EmailVerificationData {
  email: string;
  code?: string;
}

export interface ApiResponse<T> {
  [x: string]: any;
  data: T;
  message: string;
  success: boolean;
}

export interface LoginResponse {
  success: any;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
}

export interface IdCheckResponse {
  available: boolean;
  message: string;
}
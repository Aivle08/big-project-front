
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
  id: string;
  password: string;
}

export interface RegisterFormData {
  userId: string;
  password: string;
  username: string;
  email: string;
  position: string;
  companyName: string;
  departmentName: string;
  contact: string;
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
  status: number;
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
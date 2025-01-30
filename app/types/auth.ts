
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  position: string;
  contact: string;
  company: {
    id: number;
    name: string;
    departmentList: Department[];
  };
  department: Department;
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

// UserInfoResponse 인터페이스 추가
export interface UserInfoResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  position: string;
  contact: string;
  company: {
    id: number;
    name: string;
    departmentList: Department[];
  };
  department: Department;
}

// 추가로 UserInfo 인터페이스도 정의
export interface UserInfo {
  id: number;
  username: string;
  name: string;
  email: string;
  position: string;
  contact: string;
  company: {
    id: number;
    name: string;
    departmentList: Department[];
  };
  department: Department;
}

interface Department {
  id: number;
  name: string;
  recruitmentList: Recruitment[];
  applicantList: Applicant[];
}

// 아래 둘은 공고랑 지원자 반형식 보고 적어줄 예정
type Recruitment = object

type Applicant = object


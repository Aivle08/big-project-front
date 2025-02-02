import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types/auth';


// const storedUser = localStorage.getItem('user');
// const storedAuth = localStorage.getItem('isAuthenticated');

// const initialState: AuthState = {
//   user: storedUser ? JSON.parse(storedUser) : null,
//   isAuthenticated: storedAuth === 'true',
//   loading: false,
//   error: null,
// };

// // 초기 상태를 함수로 만들어서 실행 시점에 localStorage를 체크하도록 수정
// const getInitialState = (): AuthState => {
//   // 서버사이드 렌더링인지 확인
//   if (typeof window === 'undefined') {
//     return {
//       user: null,
//       isAuthenticated: false,
//       loading: false,
//       error: null,
//     };
//   }

//   // 클라이언트 사이드에서만 localStorage 접근
//   const storedUser = localStorage.getItem('user');
//   const storedAuth = localStorage.getItem('isAuthenticated');

//   return {
//     user: storedUser ? JSON.parse(storedUser) : null,
//     isAuthenticated: storedAuth === 'true',
//     loading: false,
//     error: null,
//   };
// };

// ---------------------------------------------------------

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: 'users',
  initialState,
  // initialState,
  reducers: {
    initializeAuth: (state) => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          const storedAuth = localStorage.getItem('isAuthenticated');
          
          if (storedUser) {
            state.user = JSON.parse(storedUser);
            state.isAuthenticated = storedAuth === 'true';
          }
        }
      } catch (error) {
        // 에러가 발생해도 초기 상태를 유지
        console.error('Auth initialization error:', error);
      }
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      // localStorage.setItem('user', JSON.stringify(action.payload));  // 로컬 스토리지에 저장해주기
      // localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
      // localStorage 접근을 클라이언트 사이드에서만 하도록 수정
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('isAuthenticated', 'true');
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      // localStorage.removeItem('user');  // 로그아웃 시 제거
      // localStorage.removeItem('isAuthenticated');
      // localStorage 접근을 클라이언트 사이드에서만 하도록 수정
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    },
  },
  

});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  initializeAuth
} = authSlice.actions;

export default authSlice.reducer;
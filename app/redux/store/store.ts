import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import resumeReducer from '../features/resumeSlice';
import postReducer from '../features/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    post: postReducer,
  },

  /// 미들웨어 설정 추가
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // 특정 액션에 대해서 직렬화 체크를 비활성화
        ignoredActions: ['users/login/fulfilled', 'users/login/rejected'],
        // 특정 경로의 직렬화 체크를 비활성화
        ignoredPaths: ['payload.headers', 'auth.user'],
      },
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
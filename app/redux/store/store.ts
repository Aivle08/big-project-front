import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import resumeReducer from '../features/resumeSlice';
import postReducer from '../features/postSlice';
import commentReducer from '../features/commentSlice';
import evalauationReducer from '../features/evaluationSlice'
import passerReducer from '../features/passerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    post: postReducer,
    comments: commentReducer,
    eval: evalauationReducer,
    passer: passerReducer
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
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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
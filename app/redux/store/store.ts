import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import resumeReducer from '../features/resumeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ResumeAnalysisRequest } from '../../types/resume';
import { analyzeResume } from '../../api/resumeAPI';
import axios from 'axios';

export const submitResumeAnalysis = createAsyncThunk(
  'recruitment/result',
  async (data: ResumeAnalysisRequest, { rejectWithValue }) => {
    try {
      const response = await analyzeResume(data);
      return response;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ||  error.message);
      }
      return rejectWithValue('예상 못한 에러 발생 비상임 지금;;')
    }
  }
);

interface ResumeState {
  loading: boolean;
  error: string | null;
  result: any | null;
}

const initialState: ResumeState = {
  loading: false,
  error: null,
  result: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitResumeAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitResumeAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(submitResumeAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default resumeSlice.reducer;
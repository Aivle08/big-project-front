import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ResumeAnalysisRequest } from '../../types/resume';
import { analyzeResume, getRecruitmentList } from '../../api/resumeAPI';
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

export const fetchRecruitmentList = createAsyncThunk(
  'recruitment/list',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRecruitmentList();
      return data; // 서버로부터 받은 JSON 배열
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      // "모르면 그대로" 넘기는 경우
      return rejectWithValue(error);
    }
  }
);

interface ResumeState {
  loading: boolean;
  error: string | null;
  result: any | null;

  recruitmentList: Array<{
    title: string;
    job: string;
    evaluations: Array<{ item: string; detail: string }>;
  }>;
}

const initialState: ResumeState = {
  loading: false,
  error: null,
  result: null,
  recruitmentList: []
};


const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // post
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

      // get
      builder
      .addCase(fetchRecruitmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruitmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.recruitmentList = action.payload;
      })
      .addCase(fetchRecruitmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? String(action.payload)
          : action.error.message || '목록 가져오기 실패';
      });
  },
});

export default resumeSlice.reducer;
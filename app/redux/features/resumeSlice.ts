import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ResumeAnalysisRequest } from '../../types/resume';
import { saveResumeData, uploadResumePDF, getRecruitmentList } from '../../api/resumeAPI';
import axios from 'axios';

interface ResumeState {
  loading: boolean;
  error: string | null;  // error 타입을 string | null로 수정
  result: any | null;
  savedId: number | null;

  recruitmentList: Array<{
    [x: string]: string;
    title: string;
    job: string;
    evaluations: Array<{ item: string; detail: string }>;
  }>;
}

const initialState: ResumeState = {
  loading: false,
  error: null,
  result: null,
  savedId: null,
  recruitmentList: []
};

// 이력서 데이터 저장
export const saveResume = createAsyncThunk(
  'resume/save',
  async (data: ResumeAnalysisRequest, { rejectWithValue }) => {
    try {
      const response = await saveResumeData(data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || '저장 중 오류가 발생했습니다.');
      }
      return rejectWithValue('예상치 못한 오류가 발생했습니다.');
    }
  }
);

// PDF 업로드
export const uploadPDF = createAsyncThunk(
  'resume/uploadPDF',
  async ({ id, files }: { id: number; files: File[] }, { rejectWithValue }) => {
    try {
      const response = await uploadResumePDF(id, files);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || '파일 업로드 중 오류가 발생했습니다.');
      }
      return rejectWithValue('예상치 못한 오류가 발생했습니다.');
    }
  }
);


export const fetchRecruitmentList = createAsyncThunk(
  'recruitment/list',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRecruitmentList();
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue(error);
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearResult: (state) => {
      state.result = null;
    }
  },
  extraReducers: (builder) => {
    // 채용공고목록
    builder
      .addCase(fetchRecruitmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruitmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.recruitmentList = action.payload;
        state.error = null;
      })
      .addCase(fetchRecruitmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || '채용 공고 목록 불러오기 중 오류가 발생했습니다.';
      });
    
    // 이력서 저장
    builder
      .addCase(saveResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveResume.fulfilled, (state, action) => {
        state.loading = false;
        state.savedId = action.payload.id;
        state.error = null;
      })
      .addCase(saveResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || '저장 중 오류가 발생했습니다.';
      });

    builder
      .addCase(uploadPDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPDF.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || '파일 업로드 중 오류가 발생했습니다.';
      });
  }
});

export const { clearError, clearResult } = resumeSlice.actions;
export default resumeSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ResumeAnalysisRequest } from '../../types/resume';
import { saveResumeData, uploadResumePDF, analyzeResume } from '../../api/resumeAPI';
import axios from 'axios';

interface ResumeState {
  loading: boolean;
  error: string | null;  // error 타입을 string | null로 수정
  result: any | null;
  savedId: number | null;
}

const initialState: ResumeState = {
  loading: false,
  error: null,
  result: null,
  savedId: null
};

// 이력서 데이터 저장
export const saveResume = createAsyncThunk(
  'resume/save',
  async (data: ResumeAnalysisRequest, { rejectWithValue }) => {
    try {
      const response = await saveResumeData(data);
      return response;
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

// 이력서 분석
export const submitResumeAnalysis = createAsyncThunk(
  'resume/analyze',
  async (data: ResumeAnalysisRequest, { rejectWithValue }) => {
    try {
      const response = await analyzeResume(data);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || '분석 중 오류가 발생했습니다.');
      }
      return rejectWithValue('예상치 못한 오류가 발생했습니다.');
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
    // 저장 관련 상태 처리
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
      })
      
    // PDF 업로드 관련 상태 처리
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
      })
      
    // 분석 관련 상태 처리
    builder
      .addCase(submitResumeAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitResumeAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(submitResumeAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || '분석 중 오류가 발생했습니다.';
      });
  }
});

export const { clearError, clearResult } = resumeSlice.actions;
export default resumeSlice.reducer;



// interface ResumeState {
//   loading: boolean;
//   error: string | null;
//   result: any | null;
//   savedId: number | null;
//   recruitmentList: Array<{
//     title: string;
//     job: string;
//     evaluations: Array<{ item: string; detail: string }>;
//   }>;
// }

// const initialState: ResumeState = {
//   loading: false,
//   error: null,
//   result: null,
//   savedId: null,
//   recruitmentList: []
// };

// const resumeSlice = createSlice({
//   name: 'resume',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // 저장 관련 상태 처리
//     builder
//       .addCase(saveResume.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(saveResume.fulfilled, (state, action) => {
//         state.loading = false;
//         state.savedId = action.payload.id;
//       })
//       .addCase(saveResume.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || '저장 중 오류가 발생했습니다.';
//       })

//     // PDF 업로드 관련 상태 처리
//     builder
//       .addCase(uploadPDF.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadPDF.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(uploadPDF.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'PDF 업로드 중 오류가 발생했습니다.';
//       });
//   },
// });

// export default resumeSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { ResumeAnalysisRequest } from '../../types/resume';
// import { analyzeResume, getRecruitmentList } from '../../api/resumeAPI';
// import axios from 'axios';

// export const submitResumeAnalysis = createAsyncThunk(
//   'recruitment/result',
//   async (data: ResumeAnalysisRequest, { rejectWithValue }) => {
//     try {
//       const response = await analyzeResume(data);
//       return response;

//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue(error.response?.data ||  error.message);
//       }
//       return rejectWithValue('예상 못한 에러 발생 비상임 지금;;')
//     }
//   }
// );

// export const fetchRecruitmentList = createAsyncThunk(
//   'recruitment/list',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getRecruitmentList();
//       return data; // 서버로부터 받은 JSON 배열
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue(error.response?.data || error.message);
//       }
//       // "모르면 그대로" 넘기는 경우
//       return rejectWithValue(error);
//     }
//   }
// );

// interface ResumeState {
//   loading: boolean;
//   error: string | null;
//   result: any | null;

//   recruitmentList: Array<{
//     title: string;
//     job: string;
//     evaluations: Array<{ item: string; detail: string }>;
//   }>;
// }

// const initialState: ResumeState = {
//   loading: false,
//   error: null,
//   result: null,
//   recruitmentList: []
// };


// const resumeSlice = createSlice({
//   name: 'resume',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // post
//     builder
//       .addCase(submitResumeAnalysis.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(submitResumeAnalysis.fulfilled, (state, action) => {
//         state.loading = false;
//         state.result = action.payload;
//       })
//       .addCase(submitResumeAnalysis.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'An error occurred';
//       });

//       // get
//       builder
//       .addCase(fetchRecruitmentList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRecruitmentList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recruitmentList = action.payload;
//       })
//       .addCase(fetchRecruitmentList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload
//           ? String(action.payload)
//           : action.error.message || '목록 가져오기 실패';
//       });
//   },
// });

// export default resumeSlice.reducer;
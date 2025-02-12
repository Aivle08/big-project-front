import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resultAPI } from '../../api/resultAPI';
import { evaluationAPI } from '@/app/api/evaluationAPI';

const initialState = {
  id: null,
  title: '',
  job: '',
  applicantId: '',
  evaluationList: [],
  status: 'idle',
  error: null,
};

// 모든 지원자 평가 가져오기
export const fetchApplicantsEvaluations = createAsyncThunk(
  'evaluation/fetchApplicantsEvaluations',
  async ({ recruitmentId, passed } : {recruitmentId:number, passed:boolean}, { rejectWithValue }) => {
    try {
      const data = await resultAPI.getApplicantsEvaluations(recruitmentId, passed);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 특정 지원자 평가 가져오기
export const fetchApplicantEvaluation = createAsyncThunk(
  'evaluation/fetchApplicantEvaluation',
  async ({ recruitmentId, applicantId }: {recruitmentId: number, applicantId: number}, { rejectWithValue }) => {
    try {
      console.log('Fetching evaluation for:', { recruitmentId, applicantId }); // 디버깅용
      const data = await resultAPI.getApplicantEvaluation(recruitmentId, applicantId);
      console.log('Fetched data!!!!!!!!!!!!!!!:', data); // 디버깅용
      return data;
    } catch (error) {
      console.error('Error fetching evaluation:', error); // 디버깅용
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    setEvaluationData: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.job = action.payload.job;
      state.evaluationList = action.payload.evaluationList;
    },
    updateEvaluationTitle: (state, action) => {
      state.title = action.payload;
    },
    updateEvaluationJob: (state, action) => {
      state.job = action.payload;
    },
    addEvaluationItem: (state, action) => {
      state.evaluationList.push(action.payload);
    },
    updateEvaluationItem: (state, action) => {
      const index = state.evaluationList.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.evaluationList[index] = action.payload;
      }
    },
    deleteEvaluationItem: (state, action) => {
      state.evaluationList = state.evaluationList.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicantsEvaluations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplicantsEvaluations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.evaluationList = action.payload;
      })
      .addCase(fetchApplicantsEvaluations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchApplicantEvaluation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplicantEvaluation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, title, job, evaluationList } = action.payload;
        state.id = id;
        state.title = title;
        state.job = job;
        state.evaluationList = evaluationList;
      })
      .addCase(fetchApplicantEvaluation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setEvaluationData,
  updateEvaluationTitle,
  updateEvaluationJob,
  addEvaluationItem,
  updateEvaluationItem,
  deleteEvaluationItem,
} = evaluationSlice.actions;

export default evaluationSlice.reducer;

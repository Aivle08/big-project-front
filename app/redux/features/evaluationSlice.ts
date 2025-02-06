import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 1,
  title: "",
  job: "",
  evaluationList: [],
};

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
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { evaluationAPI } from '../../api/evaluationAPI';

const initialState = {
  status: 'idle', 
  error: null,
};

export const setPasser = createAsyncThunk(
  'evaluation/setPasser',
  async ({ recruitmentId, passerID }: { recruitmentId: number; passerID: number }, { rejectWithValue }) => {
    try {
      const data = await evaluationAPI.setPasser(recruitmentId, passerID);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const passerSlice = createSlice({
  name: 'passer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPasser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setPasser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(setPasser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default passerSlice.reducer;

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
      console.log('Dispatching setPasser with:', { recruitmentId, passerID });
      const data = await evaluationAPI.setPasser(recruitmentId, passerID);
      return data;
    } catch (error:any) {
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
      // return rejectWithValue(error.response?.data || error.message);
  }
);

const passerSlice = createSlice({
  name: 'passer',
  initialState,
  // reducers: {},
  reducers: {
    resetPasserStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
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

export const { resetPasserStatus } = passerSlice.actions;
export default passerSlice.reducer;

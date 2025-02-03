
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecruitmentList } from '@/app/api/resumeAPI';
import axios from 'axios';

export const getRecruitmentList = createAsyncThunk(
  'recruitment/getRecruitmentList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchRecruitmentList();
      return data; // 서버에서 받은 JSON 배열
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('알 .');
    }
  }
);

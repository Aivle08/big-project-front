import axios from 'axios';
import { ResumeAnalysisRequest } from '../types/resume';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://picks-up.site/api/v1';

const getAccessToken = () => Cookies.get('token');

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});


// 이력서 데이터 저장
export const saveResumeData = async (data: ResumeAnalysisRequest) => {
  const token = getAccessToken();

  console.log(data);

  try {
    const response = await api.post('/recruitment', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log(response);
    return response;
  } catch (error: any) {
    console.error('이력서 저장 데이터 에러 : ', error);
    
    if (error.response) {
      throw new Error(error.response.data?.message || '이력서 데이터 저장 중 오류가 발생했습니다.');
    }

    throw new Error('이력서 데이터 저장 중 네트워크 오류가 발생했습니다.');
  }
};

// PDF 파일 업로드
export const uploadResumePDF = async (id: number, files: File[]) => {
  const token = getAccessToken();
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await api.post(`/recruitment/${id}/upload-resume-pdf`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Upload PDF error: ', error);
    throw new Error('PDF 파일 업로드 중 오류가 발생했습니다.');
  }
};

export const getRecruitmentList = async () => {
  const token = getAccessToken();
  const response = await api.get('/recruitment', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response);
  return response.data;
};

export const getApplicantInRecruiment = async (id: number) =>{
  const token = getAccessToken();
  const response = await api.get(`/recruitment/${id}/applicant`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });

  console.log(response);
  return response.data;
}
import type { Post, Posts } from '@/app/types/post';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://picks-up.site/api/v1';

const postAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// 헤더는 아래처럼 인터셉터 써서 넣으면 돼
// 
postAxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // 토큰 키는 accessToken 아니고 token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const postAPI = {
  // 글 목록 조회
  fetchPosts: async (): Promise<Posts[]> => {
    try {
      const response = await postAxiosInstance.get('/posts');
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error('Fetch Posts Error:', error);
      throw new Error(error.response?.data?.message || '게시글 목록을 불러오기 실패.');
    }
  },

  // 단일 게시글 조화화
  fetchPostById: async (id: number): Promise<Posts> => {
    try {
      const response = await postAxiosInstance.get(`/posts/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Fetch Single Post Error:', error);
      throw new Error(error.response?.data?.message || '게시글을 불러오기 실패.');
    }
  },

  // 글 생성
  createPost: async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
    try {
      console.log('글 생성 데이터 : ', postData);
      const response = await postAxiosInstance.post('/posts', postData);
      console.log('글 생성 응답 : ', response.data);
      return response.data;
    } catch (error: any) {
      console.error('글 생성 에러 : ', error);
      throw new Error(error.response?.data?.message || '게시글 작성 실패.');
    }
  },

  // 글 수정
  updatePost: async (postData: Post): Promise<Post> => {
    try {
      const { id, ...restData } = postData;
      const response = await postAxiosInstance.put(`/posts/${id}`, restData);
      return response.data;
    } catch (error: any) {
      console.error('Update Post Error:', error);
      throw new Error(error.response?.data?.message || '게시글 수정에 실패.');
    }
  },

  // 글 삭제
  deletePost: async (id: number): Promise<number> => {
    try {
      await postAxiosInstance.delete(`/posts/${id}`);
      return id;
    } catch (error: any) {
      console.error('Delete Post Error:', error);
      throw new Error(error.response?.data?.message || '게시글 삭제에 실패.');
    }
  }
};
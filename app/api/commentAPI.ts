import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://picks-up.site/api/v1';

const commentAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

commentAxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  postId: number;
  usersId: number;
  username?: string; // 화면 표시용
}

export const commentAPI = {
  // 댓글 조회 
  fetchComments: async (postId: number): Promise<Comment[]> => {
    try {
      const response = await commentAxiosInstance.get(`/post/${postId}/comment`);
      console.log('Fetched comments:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('댓글 조회 에러:', error);
      return [];
    }
  },

  // 댓글 생성
  createComment: async (postId: number, content: string): Promise<Comment> => {
    try {
      const response = await commentAxiosInstance.post(`/post/${postId}/comment`, { content });
      console.log('Created comment:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('댓글 생성 에러:', error);
      throw new Error(error.response?.data?.message || '댓글 작성에 실패했습니다.');
    }
  },

  // 댓글 수정
  updateComment: async (postId: number, commentId: number, content: string): Promise<Comment> => {
    try {
      const response = await commentAxiosInstance.put(
        `/post/${postId}/comment/${commentId}`, 
        { content }
      );
      console.log('Updated comment:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('댓글 수정 에러:', error);
      throw new Error(error.response?.data?.message || '댓글 수정에 실패했습니다.');
    }
  },

  // 댓글 삭제
  deleteComment: async (postId: number, commentId: number): Promise<void> => {
    try {
      await commentAxiosInstance.delete(`/post/${postId}/comment/${commentId}`);
      console.log('Deleted comment:', commentId);
    } catch (error: any) {
      console.error('댓글 삭제 에러:', error);
      throw new Error(error.response?.data?.message || '댓글 삭제에 실패했습니다.');
    }
  }
};

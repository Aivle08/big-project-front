import type { Post } from '@/app/types/post';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export const postAPI = {
  // 글 조회 (R) --------------------------------------------------------------------
  fetchPosts: async () => {
    // 수정필요
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('게시글 목록을 불러오는데 실패했습니다.');
    return response.json();
  },

  // 단일 게시글 조회 추가
  fetchPostById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('게시글을 불러오는데 실패했습니다.');
    return response.json();
  },

  // 글 작성 (생성 C) ---------------------------------------------------------------
  createPost: async (postData: Omit<Post, 'id' | 'date'>) => {
    // 수정필요
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('게시글 작성에 실패했습니다.');
    return response.json();
  },

  // 글 수정 (U) ----------------------------------------------------------------
  updatePost: async (postData: Post) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postData.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('게시글 수정에 실패했습니다.');
    return response.json();
  },

  // 글 삭제 (D) -------------------------------------------------------------------
  deletePost: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('게시글 삭제에 실패했습니다.');
    return id;
  },
};
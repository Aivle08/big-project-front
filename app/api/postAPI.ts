import type { Post } from '@/app/types/post';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';
// const API_BASE_URL = '/api/v1';

const getAuthHeaders = () => {
  // const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    // ...(token && { 'Authorization': `Bearer ${token}` }),
    'Accept': 'application/json'
    // 'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const postAPI = {
  // 글 조회 (R) --------------------------------------------------------------------
  fetchPosts: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      console.log('Current token:', token); // 토큰 값 확인용 로그

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'GET',
        credentials: 'include',
        headers: getAuthHeaders()
        // headers: {
        //   'Content-Type': 'application/json',
        //   // 토큰이 있다면 Authorization 헤더 추가
        //   ...(localStorage.getItem('token') && {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   })
        // }
      });

      console.log('Response status:', response.status); // 응답 상태 확인용 로그

      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || '접근 권한이 없습니다.');
        }
        throw new Error('게시글 목록을 불러오는데 실패했습니다.');
      }  
      
      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('Fetch Posts Error:', error);
      throw error;
    }
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
  // createPost: async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
  //   try {
  //     const token = localStorage.getItem('accessToken');
  //     if (!token) {
  //       throw new Error('인증 토큰이 없습니다.');
  //     }

  //     const response = await fetch(`${API_BASE_URL}/posts`, {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         title: postData.title.trim(),
  //         content: postData.content.trim(),
  //         authorName: postData.authorName
  //       })
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || '게시글 작성에 실패했습니다.');
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error: any) {
  //     console.error('Create Post Error:', error);
  //     throw new Error(error.message || '게시글 작성에 실패했습니다.');
  //   }
  createPost: async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // const token = localStorage.getItem('accessToken');
      // console.log('토큰 확인 : ', token);
      console.log('글 생성 데이터 : ', postData)

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'http://localhost:3000'
        },
        body: JSON.stringify(postData)
      });

      console.log(' 글생성 응답 상태 확인 췤 : ', response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('서버 에러 응답 : ', errorData);
        throw new Error(errorData.message || '게시글 작성에 실패했습니다.');
      }

      const data = await response.json();
      console.log('생성된 게시글 : ', data);
      return data;
  
      // return await response.json();
    } catch (error: any) {
      console.error('글 생성 에러 : ', error);
      throw error;
    }
  },

  // 글 수정 (U) ----------------------------------------------------------------
  updatePost: async (postData: Post) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postData.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: getAuthHeaders(),
        body: JSON.stringify(postData)
      });

      if (!response.ok) throw new Error('게시글 수정에 실패했습니다.');
      return response.json();
    } catch (error) {
      console.error('Update Post Error:', error);
      throw error;
    }
  },

  // 글 삭제 (D) -------------------------------------------------------------------
  deletePost: async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: getAuthHeaders()
      });

      if (!response.ok) throw new Error('게시글 삭제에 실패했습니다.');
      return id;
    } catch (error) {
      console.error('Delete Post Error:', error);
      throw error;
    }
  }
};
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Post, Posts } from '@/app/types/post';
import { postAPI } from '@/app/api/postAPI';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPost: Post | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null,
};


// crud api 통신 코드 리스트
export const fetchPosts = createAsyncThunk(
  // 수정필요
  'posts/fetchPosts',
  async () => {
    return await postAPI.fetchPosts();
  }
);

// 요것도 단일 게시글 조회
export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: number) => {
    return await postAPI.fetchPostById(id);
  }
);

// export const createPost = createAsyncThunk(
//   'posts/createPost',
//   async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
//     try {
//       const response = await postAPI.createPost(postData);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await postAPI.createPost(postData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
    //   const token = localStorage.getItem('accessToken');
    //   if (!token) {
    //     throw new Error('로그인이 필요합니다.');
    //   }
    //   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

    //   const response = await fetch(`${API_BASE_URL}/posts`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify({
    //       title: postData.title,
    //       content: postData.content,
    //       authorName: postData.authorName
    //     })
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || '게시글 작성에 실패했습니다.');
    //   }

    //   const data = await response.json();
    //   console.log('Create post API response:', data);
    //   return data;
      
    // } catch (error: any) {
    //   console.error('Create post error in slice:', error);
    //   return rejectWithValue(error.message);
    // }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (postData: Post) => {
    return await postAPI.updatePost(postData);
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number) => {
    return await postAPI.deletePost(id);
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        // state.posts = action.payload.list;
        state.posts = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '게시글 목록을 불러오는데 실패했습니다.';
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '게시글을 불러오는데 실패했습니다.';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export const { setCurrentPost , clearError } = postSlice.actions;
export default postSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, commentAPI } from '@/app/api/commentAPI';

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null
};

// 댓글 조회
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return await commentAPI.fetchComments(postId);
  }
);

// 댓글 생성
export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ postId, content }: { postId: number; content: string }) => {
    return await commentAPI.createComment(postId, content);
  }
);

// 댓글 수정
export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ postId, commentId, content }: { postId: number; commentId: number; content: string }) => {
    return await commentAPI.updateComment(postId, commentId, content);
  }
);

// 댓글 삭제
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ postId, commentId }: { postId: number; commentId: number }) => {
    await commentAPI.deleteComment(postId, commentId);
    return commentId;
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '댓글을 불러오는데 실패했습니다.';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(comment => comment.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      });
  },
});

export default commentSlice.reducer;
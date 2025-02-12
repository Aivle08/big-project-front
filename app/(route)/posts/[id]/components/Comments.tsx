import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/redux/store/store';
import { fetchComments, createComment, deleteComment, updateComment } from '@/app/redux/features/commentSlice';
import { AuthorName, CommentForm, CommentItem, CommentList, CommentSection } from './styles/commentStyled';
import { MessageCircle } from 'lucide-react';


interface CommentsProps {
  postId: number;
}

export default function Comments({ postId }: CommentsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading } = useSelector((state: RootState) => state.comments);
  const { user } = useSelector((state: RootState) => state.auth);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await dispatch(createComment({ postId, content: newComment.trim() })).unwrap();
      setNewComment('');
      // 새 댓글 생성 후 새로고침
      dispatch(fetchComments(postId));
    } catch (error: any) {
      alert(error.message || '댓글 작성에 실패했습니다.');
    }
  };

  const handleEditStart = (comment: Comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdate = async (commentId: number) => {
    if (!editContent.trim() || !user) return;

    try {
      console.log('댓글 수정 시작:', { postId, commentId, content: editContent.trim() });
      const result = await dispatch(updateComment({ 
        postId, 
        commentId, 
        content: editContent.trim() 
      })).unwrap();
      console.log('댓글 수정 결과:', result);
      
      setEditingId(null);
      setEditContent('');
      await dispatch(fetchComments(postId));
    } catch (error: any) {
      console.error('댓글 수정 에러:', error);
      alert(error.message || '댓글 수정에 실패했습니다.');
    }
  };

  // 댓글 삭제
  const handleDelete = async (commentId: number) => {
    if (!user || !window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;

    try {
      await dispatch(deleteComment({ postId, commentId })).unwrap();
      dispatch(fetchComments(postId));
    } catch (error: any) {
      console.error('댓글 삭제 에러:', error);
      alert(error.message || '댓글 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return <div>댓글을 불러오는 중...</div>;
  }

  return (
    <CommentSection>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
      <MessageCircle size={20} />
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg> */}
        댓글  {comments?.length || 0}개
      </h3>
      
      {user && (
        <CommentForm onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded min-h-[100px] mb-2 bg-lightyellow"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성해주세요"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-yellow text-white rounded hover:bg-[#E1A204] transition-colors disabled:bg-gray-300"
          >
            댓글 작성
          </button>
        </CommentForm>
      )}

      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <AuthorName>{comment.username}</AuthorName>
            {editingId === comment.id ? (
              <div>
                <textarea
                  className="w-full p-2 border rounded min-h-[100px] mb-2"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(comment.id)}
                    className="px-4 py-2 bg-yellow text-white rounded hover:bg-[#E1A204] transition-colors"
                  >
                    수정 완료
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditContent('');
                    }}
                    className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-2">{comment.content}</p>
                <div className="text-sm text-gray-500 flex justify-between items-center">
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  {user && user.username === comment.username && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStart(comment)}
                        className="text-blue-500 hover:font-bold"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red hover:font-bold"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </CommentItem>
        ))}
      </CommentList>
    </CommentSection>
  );
}
'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/redux/store/store';
import { fetchPostById, deletePost, updatePost } from '@/app/redux/features/postSlice';
import { BackButton, Container, Content, Detail, Section, Section2, Title } from './styles/Page.styled';
import { Post } from '@/app/types/post';
import Comments from './components/Comments';

interface PostDetailProps {
  postId: number;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost: post, loading, error } = useSelector((state: RootState) => state.post);
  const { user } = useSelector((state: RootState) => state.auth);


  // 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  // 디버깅을 위한 로그 추가
  useEffect(() => {
    if (post && user) {
      console.log('Current post:', post);
      console.log('Current user:', user);
      console.log('Post author:', post.author);
      console.log('Is author check:', post.author.name === user.username);
    }
  }, [post, user]);


  useEffect(() => {
    if (post) {
      setEditedContent({
        title: post.title,
        content: post.content
      });
    }
  }, [post]);

  // 제목 글자수 제한 처리
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setEditedContent(prev => ({ ...prev, title: value }));
    }
  };

  // 작성자 체크 함수 추가
  const isAuthor = () => {
    if (!user || !post) return false;
    return user.username === post.author.username; // username으로 비교
  };

  // 수정 저장 
  const handleSave = async () => {
    if (!isAuthor()) {
      alert('본인이 작성한 글만 삭제할 수 있습니다.');
      return;
    }
    // if (!user || !post || post.authorName !== user.username) {
    //   alert('본인이 작성한 글만 수정할 수 있습니다.');
    //   return;
    // }

    if (!editedContent.title.trim() || !editedContent.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const updatedPost = {
        ...post,
        title: editedContent.title.trim(),
        content: editedContent.content.trim(),
      };

      await dispatch(updatePost(updatedPost)).unwrap();
      await dispatch(fetchPostById(postId));
      setIsEditing(false);
      alert('글이 성공적으로 수정되었습니다.');
    } catch (error: any) {
      alert(error.message || '글 수정에 실패했습니다.');
    }
  };

  // 글 삭제 처리
  const handleDelete = async () => {
    // if (!user || !post || post.authorName !== user.username) {
    //   alert('본인이 작성한 글만 삭제할 수 있습니다.');
    //   return;
    // }
    if (!isAuthor()) {
      alert('본인이 작성한 글만 삭제할 수 있습니다.');
      return;
    }

    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        await dispatch(deletePost(postId)).unwrap();
        alert('글이 성공적으로 삭제되었습니다.');
        router.push('/posts'); // 목록 페이지로 이동
      } catch (error: any) {
        alert(error.message || '글 삭제에 실패했습니다.');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩중...</div>;
  }

  if (error || !post) {
    return (
      <div className="mx-20 px-20 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <span className="mr-2">←</span> 목록으로 돌아가기
          </button>
        </div>
        <div className="text-center py-10">
          {error || '게시글을 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <Container>
      <Section>
        <BackButton onClick={() => router.back()}>
          ←  목록으로 돌아가기
        </BackButton>
      </Section>

      <Section2>
      {isEditing ? (
          // 수정 모드
          <>
            <div className="mb-2">
              <input
                className="text-lg font-semibold w-full p-2 border rounded"
                value={editedContent.title}
                onChange={handleTitleChange}
                placeholder="제목을 입력하세요"
              />
              <div className="text-sm text-right mt-1">
                <span className={editedContent.title.length >= 15 ? 'text-red-500' : 'text-gray-500'}>
                  {editedContent.title.length}/15
                </span>
              </div>
            </div>
          </>
        ) : (
          <Title>{post?.title}</Title>
        )}
        {/* <Title>{post.title}</Title> */}
        
        <Detail>
          <div>
            <div>작성자: {post?.author?.name || post?.authorName}</div>
            <div>작성일: {post && new Date(post.createdAt).toLocaleDateString()}</div>
          </div>
          {/* 수정 삭제 버튼 표시 조건 수정 */}
          {isAuthor() && (
            <div className="flex">
              {isEditing ? (
                <div className='mt-5 flex gap-2'>
                  <button 
                    onClick={handleSave}
                    className="px-4 bg-yellow text-white rounded hover:bg-[#E1A204] transition-colors"
                  >
                    저장
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditedContent({ title: post.title, content: 
                        
                        post.content });
                    }}
                    className="px-4 bg-[#E3E3E3] text-white rounded hover:bg-[#AAA9A9] transition-colors"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-transparent text-yellow rounded hover:font-extrabold"
                  >
                    수정
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 bg-transparent text-red rounded hover:font-bold"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          )}
        </Detail>


        {isEditing ? (
          <textarea
            className="w-full p-4 border rounded min-h-[200px] mt-4"
            value={editedContent.content}
            onChange={(e) => setEditedContent(prev => ({ ...prev, content: e.target.value }))}
            placeholder="내용을 입력하세요"
          />
        ) : (
          <Content>
            {post?.content}
          </Content>
          
        )}

        <Comments postId={postId} /> 

      </Section2>

    </Container>
  );
}
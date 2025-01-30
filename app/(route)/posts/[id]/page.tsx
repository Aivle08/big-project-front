'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/redux/store/store';
import { fetchPostById } from '@/app/redux/features/postSlice';
import { BackButton, Container, Content, Detail, Section, Section2, Title } from './styles/Page.styled';

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   date: string;
// }

interface PostDetailProps {
  params: Promise<{
    id: string;
  }>
}

export default function PostDetail({ params }: PostDetailProps) {
  // const router = useRouter();
  // const [post, setPost] = useState<Post | null>(null);
  // const resolvedParams = React.use(params);
  // const postId = parseInt(resolvedParams.id);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost: post, loading, error } = useSelector((state: RootState) => state.post);
  const resolvedParams = React.use(params);
  const postId = parseInt(resolvedParams.id);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  if (loading) {
    return (
      <div className="text-center py-10">
        로딩중...
      </div>
    );
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

  // // 실제 구현시에는 API나 데이터베이스에서 게시글 정보를 가져옴
  // useEffect(() => {
  //   // localStorage에서 게시글 데이터 불러오기
  //   const savedPost = localStorage.getItem('currentPost');
  //   if (savedPost) {
  //     const parsedPost = JSON.parse(savedPost);
  //     if (parsedPost.id === postId) {
  //       setPost(parsedPost);
  //     }
  //   }
  // }, [postId]);

  // // 데이터가 없는 경우 처리
  // if (!post) {
  //   return (
  //     <div className="mx-20 px-20 py-8">
  //       <div className="mb-6">
  //         <button
  //           onClick={() => router.back()}
  //           className="text-gray-600 hover:text-gray-800 flex items-center"
  //         >
  //           <span className="mr-2">←</span> 목록으로 돌아가기
  //         </button>
  //       </div>
  //       <div className="text-center py-10">
  //         게시글을 찾을 수 없습니다.
  //       </div>
  //     </div>
  //   );
  // }


  return (
    <Container>
      <Section>
        <BackButton onClick={() => router.back()}>
          ←  목록으로 돌아가기
        </BackButton>
      </Section>

      <Section2>
        <Title>{post.title}</Title>
        
        <Detail>
          <div>작성자: {post.author}</div>
          <div>작성일: {post.date}</div>
        </Detail>

        <Content>
          {post.content}
        </Content>
      </Section2>
    </Container>
  );
}
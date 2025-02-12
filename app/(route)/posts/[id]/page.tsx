// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '@/app/redux/store/store';
// import { fetchPostById } from '@/app/redux/features/postSlice';
// import { BackButton, Container, Content, Detail, Section, Section2, Title } from './styles/Page.styled';
// import {
//   fetchPosts,
//   updatePost,
//   deletePost
// } from '@/app/redux/features/postSlice';
// import { Post } from '@/app/types/post';

// interface PostDetailProps {
//   params:{ 
//     id: string;
//   }
// }

// export default function PostDetail({ params }: PostDetailProps) {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { currentPost: post, loading, error } = useSelector((state: RootState) => state.post);
  
//   // const postParams = React.use(Promise.resolve(params));
//   // const postId = parseInt(postParams.id);
//   const postId = parseInt(id);
  
//   const [editingPost, setEditingPost] = useState<Post | null>(null);
  
//   // 글 수정
//   const handleUpdate = async (post: Post) => {
//     if (!user || post.author.name != user.username) {
//       alert('본인 게시글만 수정 가능합니다.');
//       return;
//     }
//     try {
//       await dispatch(updatePost(post)).unwrap();
//       await dispatch(fetchPosts());
//       setEditingPost(null);
//     } catch (error: any) {
//       alert(error.message || '게시글 수정에 실패했습니다!');
//     }
//   };

//   // 글 삭제
//   const handleDelete = async (id: number) => {
//     const post = posts.find((p) => p.id === id);
//     if (!user || !post) return;

//     if (!user || post.author.name != user.username) {
//       alert('본인 게시글만 삭제 가능합니다.');
//       return;
//     }

//     if (confirm('정말로 삭제하시겠습니까?')) {
//       try {
//         await dispatch(deletePost(id)).unwrap();
//       } catch (error: any) {
//         alert(error.message || '게시글을 삭제하지 못했습니다.');
//       }
//     }
//   };

// useEffect(() => {
//   dispatch(fetchPostById(postId));
// }, [dispatch, postId]);

//   if (loading) {
//     return (
//       <div className="text-center py-10">
//         로딩중...
//       </div>
//     );
//   }

//   if (error || !post) {
//     return (
//       <div className="mx-20 px-20 py-8">
//         <div className="mb-6">
//           <button
//             onClick={() => router.back()}
//             className="text-gray-600 hover:text-gray-800 flex items-center"
//           >
//             <span className="mr-2">←</span> 목록으로 돌아가기
//           </button>
//         </div>
//         <div className="text-center py-10">
//           {error || '게시글을 찾을 수 없습니다.'}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Container>
//       <Section>
//         <BackButton onClick={() => router.back()}>
//           ←  목록으로 돌아가기
//         </BackButton>
//       </Section>

//       <Section2>
//         <Title>{post.title}</Title>
        
//         <Detail>
//           <div>작성자: {post.authorName}</div>
//           <div>작성일: {new Date(post.createdAt).toLocaleDateString()}</div>
//           {/* 삭제 버튼 - 작성자만 보이도록 조건부 렌더링 */}
//           {user && post.authorName === user.username && (
//             <button 
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//             >
//               삭제
//             </button>
//           )}
//         </Detail>

//         <Content>
//           {post.content}
//         </Content>
//       </Section2>
//     </Container>
//   );
// }



// 'use client'

import PostDetail from './PostDetail';

interface PageProps {
  params: Promise<{
    id: number;
  }> | {
    id: number;
  }
}
// 서버 컴포넌트
export default function Page({ params }: PageProps) {
  
  // PostDetail은 클라이언트 컴포넌트로 id만 전달
  return <PostDetail postId={params.id} />;
}
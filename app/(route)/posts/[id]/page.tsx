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
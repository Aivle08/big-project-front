'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface PostDetailProps {
  params: Promise<{
    id: string;
  }>
}

export default function PostDetail({ params }: PostDetailProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const resolvedParams = React.use(params);
  const postId = parseInt(resolvedParams.id);


  // 실제 구현시에는 API나 데이터베이스에서 게시글 정보를 가져옴
  useEffect(() => {
    // localStorage에서 게시글 데이터 불러오기
    const savedPost = localStorage.getItem('currentPost');
    if (savedPost) {
      const parsedPost = JSON.parse(savedPost);
      if (parsedPost.id === postId) {
        setPost(parsedPost);
      }
    }
  }, [postId]);

  // 데이터가 없는 경우 처리
  if (!post) {
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
          게시글을 찾을 수 없습니다.
        </div>
      </div>
    );
  }


  return (
    <div className="mx-20 px-20 py-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray hover:text-black"
        >
          ←  목록으로 돌아가기
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex justify-between text-gray-600 mb-6 pb-4 border-b">
          <div>작성자: {post.author}</div>
          <div>작성일: {post.date}</div>
        </div>

        <div className="min-h-[200px] whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </div>
  );
}
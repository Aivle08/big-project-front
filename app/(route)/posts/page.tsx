'use client'
import { useEffect, useState } from "react";
import { ChartContainer, Container, Num, SectionLine, Table, Title, TitleContainer, WriteButton, TableDetail, TableDetail2, FixButton, DeleteButton, ModalContainer, ModalBox, TitleBox, SaveButton, ButtonContainer, CancelButton, TextNum } from "./styles/Page.styled";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/redux/store/store";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost
} from '@/app/redux/features/postSlice';
import { Post } from '@/app/types/post';
import { title } from "process";



export default function NoticeBoard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts = [], loading, error } = useSelector((state: RootState) => state.post);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    authorName: user?.username || ""
  });
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  
  // 1번째에 했던 코드
  // useEffect(() => {
    //   if (error) {
  //     alert(error);
  //     dispatch(clearError());
  //   }
  // }, [error, dispatch]);
  
  // useEffect(() => {
    //   dispatch(fetchPosts());
    // }, [dispatch]);
    
    // 2번째에 했던 코드
    // useEffect(() => {
    //   // 로그인 상태 확인
    //   if (!user) {
    //     alert('로그인이 필요한 서비스입니다.');
    //     router.push('/login'); // 로그인 페이지로 리다이렉트
    //     return;
    //   }
  
    //   const fetchData = async () => {
    //     try {
    //       await dispatch(fetchPosts()).unwrap();
    //     } catch (error: any) {
    //       if (error.message.includes('로그인이 필요합니다')) {
    //         router.push('/login');
    //       }
    //     }
    //   };
  
    //   fetchData();
    // }, [dispatch, user, router]);

    useEffect(() => {
      const checkAuthAndFetchData = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          
          // 토큰이 없고 user도 없는 경우
          if (!token && !user) {
            return; // 조용히 리턴하고 아래 JSX에서 처리
          }

          // 토큰이 있으면 게시글 데이터 요청
          if (token) {
            await dispatch(fetchPosts()).unwrap();
          }
        } catch (error: any) {
          console.error('Fetch error:', error);
          if (error.message?.includes('접근 권한이 없습니다') || error.message?.includes('만료')) {
            localStorage.removeItem('accessToken');
            // 얼럿 메시지 제거하고 리다이렉트만 수행
            router.push('/login');
          }
        }
      };

      checkAuthAndFetchData();
    }, [dispatch, user, router]);


  // 게시글 상세 페이지로 이동
  const handlePostClick = (post: Post) => {
    // 클릭한 게시글 데이터를 localStorage에 저장
  localStorage.setItem('currentPost', JSON.stringify(post));
    router.push(`/posts/${post.id}`);
  };

  const handleCreate = async () => {
    try {
      // const token = localStorage.getItem('accessToken');
      // console.log('현재 토큰 : ', token);
      // console.log('현재 유저 : ', user);

      // 로그인 체크 
      if (!user) {
        alert('로그인이 필요합니다.');
        router.push('/login');
        return;
      }

      if (newPost.title.length > 15) {
        alert('제목은 15글자 이내로 작성해주세요.');
        return;
      }

      if (!newPost.title.trim() || !newPost.content.trim()) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }

      const postData = {
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        authorName: user.username
      };
      console.log('전송할 데이터 : ', postData);

      const result = await dispatch(createPost(postData)).unwrap();
      console.log('Create post result:', result);

      // 성공시
      await dispatch(fetchPosts());
      setNewPost({ title: "", content: "", authorName: user.username });
      setIsModalOpen(false);
      
    } catch (error: any) {
      console.error('handleCreate 에러 : ', error);
      if (error.message?.includes('로그인')) {
        router.push('/login');
      } else {
        alert(error.message || '게시글 작성에 실패했습니다.');
      }
    }
  };
  // const handleCreate = async () => {
  //   if (!user) {
  //     alert('로그인이 필요합니다.');
  //     return;
  //   }

  //   if (newPost.title.length > 15) {
  //     alert('제목은 15글자 이내로 작성해주세요.');
  //     return;
  //   }

  //   try {
  //     await dispatch(createPost({
  //       title: newPost.title,
  //       content: newPost.content,
  //       authorName: user.username
  //     })).unwrap();

  //     // 글 작성 성공 후 목록 새로고침
  //     await dispatch(fetchPosts());
  //     setNewPost({ title: "", content: "", authorName: user.username });
  //     setIsModalOpen(false);
  //   } catch (error: any) {
  //     alert(error.message || '게시글 작성에 실패했습니다.');
  //   }
  // };


  const handleUpdate = async (post: Post) => {
    if (!user || post.authorName !== user.username) {
      alert('자신의 게시글만 수정할 수 있습니다.');
      return;
    }

    try {
      await dispatch(updatePost(post)).unwrap();
      // 수정 성공 후 목록 새로고침
      await dispatch(fetchPosts());
      setEditingPost(null);
    } catch (error: any) {
      alert(error.message || '게시글 수정에 실패했습니다.');
    }
  };

  
  const handleDelete = async (id: number) => {
    const post = posts.find((p: { id: number; }) => p.id === id);
    if (!user || post?.authorName !== user.username) {
      alert('자신의 게시글만 삭제할 수 있습니다.');
      return;
    }

    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        await dispatch(deletePost(id)).unwrap();
      } catch (error) {
        // 얘도 똑같음 ㅇㅇ
      }
    }
  };


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit') => {
    const value = e.target.value;
    if (value.length <= 15) {
      if (type === 'new') {
        setNewPost(prev => ({ ...prev, title: value }));
      } else if (editingPost) {
        setEditingPost(prev => prev ? { ...prev, title: value } : null);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중 ...</div>
  }





  // const [currentPost, setCurrentPost] = useState<Post | null>(null);

  // CRUD 기능
  // const handleCreate = () => {
  //   if (newPost.title.length > 15) {
  //     alert("제목은 15글자 이내로 작성해주세요.");
  //     return;
  //   }

  //   const post: Post = {
  //     id: posts.length + 1,
  //     title: newPost.title,
  //     content: newPost.content,
  //     author: currentUser,
  //     date: new Date().toISOString().split('T')[0]
  //   };
    
  //   setPosts([...posts, post]);
  //   setNewPost({ title: "", content: "", author: currentUser });
  //   setIsModalOpen(false);
  // };

  // const handleUpdate = (post: Post) => {
  //   // 작성자 권한 확인해주기
  //   if (post.author !== currentUser) {
  //     alert("자신의 게시글만 수정할 수 있습니다.");
  //     return;
  //   }

  //   // 제목 길이 검증 필수
  //   if (post.title.length > 15) {
  //     alert("제목은 15글자 이내로 작성해주세요.");
  //     return;
  //   }

  //   const updatedPosts = posts.map(p => 
  //     p.id === post.id ? post : p
  //   );
  //   setPosts(updatedPosts);
  //   setCurrentPost(null);
  // };

  // const handleDelete = (id: number) => {
  //   // 작성자 권한 확인
  //   const post = posts.find(p => p.id === id);
  //   if (post?.author !== currentUser) {
  //     alert("자신의 게시글만 삭제할 수 있습니다.");
  //     return;
  //   }

  //   const updatedPosts = posts.filter(post => post.id !== id);
  //   setPosts(updatedPosts);
  // };

  // // 제목 글자수 제한 처리 함수 추가
  // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit') => {
  //   const value = e.target.value;
  //   if (value.length <= 15) {
  //     if (type === 'new') {
  //       setNewPost({ ...newPost, title: value });
  //     } else {
  //       setCurrentPost(currentPost ? { ...currentPost, title: value } : null);
  //     }
  //   }
  // };


  return (
    <Container>
      <Title>게시판</Title>
      <SectionLine />

      <TitleContainer>
        <span>총</span>
        <Num>{posts?.length || 0}</Num>
        <span>건의 글이 있습니다.</span>
      </TitleContainer>

      <ChartContainer>
        {/* <WriteButton
          onClick={() => setIsModalOpen(true)}
        >
          글쓰기
        </WriteButton> */}

        {user ? (
          <WriteButton onClick={() => setIsModalOpen(true)}>
            글쓰기
          </WriteButton>
        ) : (
          <div className="text-gray-500">글쓰기는 로그인 후 이용 가능합니다.</div>
        )}
      </ChartContainer>

      <Table>
        <thead>
          <tr>
            <TableDetail>번호</TableDetail>
            <TableDetail>제목</TableDetail>
            <TableDetail>작성자</TableDetail>
            <TableDetail>날짜</TableDetail>
            <TableDetail>관리</TableDetail>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id}>
              <TableDetail2>{post.id}</TableDetail2>
              <TableDetail2 
                className="cursor-pointer hover:underline"
                onClick={() => handlePostClick(post)}
              >
                {post.title}
              </TableDetail2>
              <TableDetail2>{post.authorName}</TableDetail2>
              <TableDetail2>{new Date(post.createdAt).toLocaleDateString()}</TableDetail2>
              <TableDetail2>
                {user && post.authorName === user.username && (
                  <>
                    <FixButton onClick={() => setEditingPost(post)}>
                      수정
                    </FixButton>
                    <DeleteButton onClick={() => handleDelete(post.id)}>
                      삭제
                    </DeleteButton>
                  </>
                )}
              </TableDetail2>
            </tr>
          ))}
          {/* {posts.map((post) => (
            <tr key={post.id}>
              <TableDetail2>{post.id}</TableDetail2>
              <TableDetail2 onClick={() => handlePostClick(post)}>{post.title}</TableDetail2>
              <TableDetail2>{post.author}</TableDetail2>
              <TableDetail2>{post.date}</TableDetail2>
              <TableDetail2>
              {post.author === currentUser && (
                <>
                <FixButton
                  onClick={() => setCurrentPost(post)}
                >
                  수정
                </FixButton>
                <DeleteButton
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </DeleteButton>
                </>
              )}
              </TableDetail2>
            </tr>
          ))} */}
        </tbody>
      </Table>

      {/* 글쓰기 모달 */}
      {isModalOpen && (
        <ModalContainer>
          <ModalBox>
            <TitleBox>새 글 작성</TitleBox>
            <input
              className="border border-gray-300 rounded p-2 w-full mb-4"
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => handleTitleChange(e, 'new')}
            />
            <div className={`text-sm mt-1 text-right ${
              newPost.title.length >= 15 ? 'text-red-500 font-semibold' : 
              newPost.title.length >= 12 ? 'text-yellow' : 
              'text-gray'
            }`}>
              {newPost.title.length}/15
            </div>
            <textarea
              className="border border-gray-300 rounded p-2 w-full h-32 mb-4"
              placeholder="내용"
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              // onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            />
            <ButtonContainer>
              <SaveButton onClick={handleCreate}>저장</SaveButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>취소</CancelButton>
            </ButtonContainer>
          </ModalBox>
        </ModalContainer>
      )}

      {/* 수정 모달 */}
      {editingPost && (
        <ModalContainer>
          <ModalBox>
            <TitleBox>게시글 수정</TitleBox>
            <input
              className="border border-gray-300 rounded p-2 w-full mb-4"
              placeholder="제목"
              value={editingPost.title}
              onChange={(e) => handleTitleChange(e, 'edit')}
            />
            <div className="text-sm mt-1 text-right">
              <span className={editingPost.title.length >= 15 ? 'text-red-500' : 'text-gray-500'}>
                {editingPost.title.length}/15
              </span>
            </div>
            <textarea
              className="border border-gray-300 rounded p-2 w-full h-32 mb-4"
              placeholder="내용"
              value={editingPost.content}
              onChange={(e) => setEditingPost(prev => 
                prev ? { ...prev, content: e.target.value } : null
              )}
            />
            <ButtonContainer>
              <SaveButton onClick={() => handleUpdate(editingPost)}>수정</SaveButton>
              <CancelButton onClick={() => setEditingPost(null)}>취소</CancelButton>
            </ButtonContainer>
          </ModalBox>
        </ModalContainer>
      )}
      {/* {currentPost && (
        <ModalContainer>
          <ModalBox>
            <TitleBox>게시글 수정</TitleBox>
            <input
              className="border border-gray-300 rounded p-2 w-full mb-4"
              placeholder="제목"
              value={currentPost.title}
              onChange={(e) => handleTitleChange(e, 'edit')}
            />
            <div className={`text-sm mt-1 text-right ${
              newPost.title.length >= 15 ? 'text-red-500 font-semibold' : 
              newPost.title.length >= 12 ? 'text-yellow-500' : 
              'text-gray-500'
            }`}>
              {currentPost.title.length}/15
            </div>
            <textarea
              className="border border-gray-300 rounded p-2 w-full h-32 mb-4"
              placeholder="내용"
              value={currentPost.content}
              onChange={(e) => setCurrentPost({
                ...currentPost,
                content: e.target.value
              })}
            />
            <ButtonContainer>
              <SaveButton onClick={() => handleUpdate(currentPost)}>수정</SaveButton>
              <CancelButton onClick={() => setCurrentPost(null)}>취소</CancelButton>
            </ButtonContainer>
          </ModalBox>
        </ModalContainer>
      )} */}
    </Container>
  )
}
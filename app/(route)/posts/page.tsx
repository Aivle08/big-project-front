"use client";
import { useEffect, useState } from "react";
import { Container, Num, SectionLine, Table, Title, TitleContainer, WriteButton, TableDetail, TableDetail2, FixButton, DeleteButton, ModalContainer, ModalBox, TitleBox, SaveButton, ButtonContainer, CancelButton, ChartContainer } from "./styles/Page.styled";
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

export default function NoticeBoard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts , loading } = useSelector((state: RootState) => state.post);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    authorId: user?.username
  });

  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchPosts());
    }
  }, [dispatch, user]);

  // console.log(posts);
  
  // 게시글 상세 페이지로 이동
  const handlePostClick = (post: Post) => {
    localStorage.setItem('currentPost', JSON.stringify(post));
    router.push(`/posts/${post.id}`);
  };

  // 글 생성
  const handleCreate = async () => {
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

    try {
      const postData = {
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        authorId: user?.username
      };
      console.log('전송할 데이터 : ', postData);

      await dispatch(createPost(postData)).unwrap();
      await dispatch(fetchPosts());

      setNewPost({
        title: "",
        content: "",
        authorId: user?.username
      });
      setIsModalOpen(false);
    } catch (error: any) {
      console.error('handleCreate 에러 : ', error);
      alert(error.message || '게시글 작성에 실패.');
    }
  };

  // // 글 수정
  // const handleUpdate = async (post: Post) => {
  //   if (!user || post.author.name != user.username) {
  //     alert('본인 게시글만 수정 가능.');
  //     return;
  //   }
  //   try {
  //     await dispatch(updatePost(post)).unwrap();
  //     await dispatch(fetchPosts());
  //     setEditingPost(null);
  //   } catch (error: any) {
  //     alert(error.message || '게시글 수정에 실패.');
  //   }
  // };

  // // 글 삭제
  // const handleDelete = async (id: number) => {
  //   const post = posts.find((p) => p.id === id);
  //   if (!user || !post) return;

  //   if (!user || post.author.name != user.username) {
  //     alert('본인 게시글만 삭제 가능능.');
  //     return;
  //   }

  //   if (confirm('정말로 삭제하시겠습니까?')) {
  //     try {
  //       await dispatch(deletePost(id)).unwrap();
  //     } catch (error: any) {
  //       alert(error.message || '게시글 삭제에 실패.');
  //     }
  //   }
  // };

  // 제목 입력 글자수 제한
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'new' | 'edit'
  ) => {
    const value = e.target.value;
    if (value.length <= 15) {
      if (type === 'new') {
        setNewPost((prev) => ({ ...prev, title: value }));
      } else if (editingPost) {
        setEditingPost((prev) => prev ? { ...prev, title: value } : null);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중 ...</div>;
  }

  console.log(user);

  return (
    <Container>
      <Title>게시판</Title>
      <SectionLine />

      <TitleContainer>
        <span>총</span>
        <Num>{posts.length || 0}</Num>
        <span>건의 글이 있습니다.</span>
      </TitleContainer>

      <ChartContainer>
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
          </tr>
        </thead>
        {/* <div>{String(posts[0])}</div> */}
        <tbody>
          {posts.length > 0 && posts.map((post) => ( // posts의 0번째는 list임
            <tr key={String(post.id)}>
              <TableDetail2>{post.id}</TableDetail2>
              <TableDetail2
                className="cursor-pointer hover:underline"
                onClick={() => handlePostClick(post)}
              >
                {/* {post} */}
                {post.title}
              </TableDetail2>
              <TableDetail2>{post.author.name}</TableDetail2>
              <TableDetail2>
                {new Date(post.createdAt).toLocaleDateString()}
              </TableDetail2>
              {/* <TableDetail2>
                {user && post.author.name === user.username ? (
                  <>
                    <FixButton onClick={() => setEditingPost(post)}>
                      수정
                    </FixButton>
                    <DeleteButton onClick={() => handleDelete(post.id)}>
                      삭제
                    </DeleteButton>
                  </>
                )
                :
                (
                  <>
                  </>
                )
              }
              </TableDetail2> */}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 새 글 작성 모달 */}
      {isModalOpen && (
        <ModalContainer>
          <ModalBox>
            <TitleBox>새 글 작성</TitleBox>
            <input
              className="border border-gray-300 rounded p-2 w-full mb-4"
              placeholder="제목 (최대 15자)"
              value={newPost.title}
              onChange={(e) => handleTitleChange(e, 'new')}
            />
            <div
              className={`text-sm mt-1 text-right ${
                newPost.title.length >= 15
                  ? 'text-red-500 font-semibold'
                  : newPost.title.length >= 12
                  ? 'text-yellow'
                  : 'text-gray'
              }`}
            >
              {newPost.title.length}/15
            </div>
            <textarea
              className="border border-gray-300 rounded p-2 w-full h-32 mb-4"
              placeholder="내용"
              value={newPost.content}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <ButtonContainer>
              <SaveButton onClick={handleCreate}>저장</SaveButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>
                취소
              </CancelButton>
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
              placeholder="제목 (최대 15자)"
              value={editingPost.title}
              onChange={(e) => handleTitleChange(e, 'edit')}
            />
            <div className="text-sm mt-1 text-right">
              <span
                className={
                  editingPost.title.length >= 15 ? 'text-red-500' : 'text-gray-500'
                }
              >
                {editingPost.title.length}/15
              </span>
            </div>
            <textarea
              className="border border-gray-300 rounded p-2 w-full h-32 mb-4"
              placeholder="내용"
              value={editingPost.content}
              onChange={(e) =>
                setEditingPost((prev) =>
                  prev ? { ...prev, content: e.target.value } : null
                )
              }
            />
            <ButtonContainer>
              <SaveButton onClick={() => handleUpdate(editingPost)}>
                수정
              </SaveButton>
              <CancelButton onClick={() => setEditingPost(null)}>
                취소
              </CancelButton>
            </ButtonContainer>
          </ModalBox>
        </ModalContainer>
      )}
    </Container>
  );
}
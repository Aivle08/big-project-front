'use client'
import { useState } from "react";
import { ChartContainer, Container, Num, SectionLine, Table, Title, TitleContainer, WriteButton, TableDetail, TableDetail2, FixButton, DeleteButton, ModalContainer, ModalBox, TitleBox, SaveButton, ButtonContainer, CancelButton, TextNum } from "./styles/Page.styled";
import { useRouter } from "next/navigation";


interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}


export default function NoticeBoard() {
  const router = useRouter();

  // 현재 로그인한 사용자 임의로 일단 지정해
  const [currentUser] = useState("작성자1");

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "안녕하세요. 저는 강해찬입니달라.",
      content: "게시글 내용입니다.",
      author: "작성자1",
      date: "2025-01-20"
    },
    {
      id: 2,
      title: "두번째 게시글 어쩌루 전 강크롱.",
      content: "게시글 내용입니다.",
      author: "작성자2",
      date: "2025-01-20"
    },
    {
      id: 3,
      title: "첫 번째 게시글",
      content: "게시글 내용입니다.",
      author: "작성자2",
      date: "2025-01-20"
    },
    {
      id: 4,
      title: "첫 번째 게시글",
      content: "게시글 내용입니다.",
      author: "작성자3",
      date: "2025-01-20"
    },
    {
      id: 5,
      title: "첫 번째 게시글",
      content: "게시글 내용입니다.",
      author: "작성자4",
      date: "2025-01-20"
    },
  ]);

  // 게시글 상세 페이지로 이동
  const handlePostClick = (post: Post) => {
    // 클릭한 게시글 데이터를 localStorage에 저장
  localStorage.setItem('currentPost', JSON.stringify(post));
    router.push(`/posts/${post.id}`);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: currentUser
  });

  // CRUD 기능
  const handleCreate = () => {
    if (newPost.title.length > 15) {
      alert("제목은 15글자 이내로 작성해주세요.");
      return;
    }

    const post: Post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: currentUser,
      date: new Date().toISOString().split('T')[0]
    };
    
    setPosts([...posts, post]);
    setNewPost({ title: "", content: "", author: currentUser });
    setIsModalOpen(false);
  };

  const handleUpdate = (post: Post) => {
    // 작성자 권한 확인해주기
    if (post.author !== currentUser) {
      alert("자신의 게시글만 수정할 수 있습니다.");
      return;
    }

    // 제목 길이 검증 필수
    if (post.title.length > 15) {
      alert("제목은 15글자 이내로 작성해주세요.");
      return;
    }

    const updatedPosts = posts.map(p => 
      p.id === post.id ? post : p
    );
    setPosts(updatedPosts);
    setCurrentPost(null);
  };

  const handleDelete = (id: number) => {
    // 작성자 권한 확인
    const post = posts.find(p => p.id === id);
    if (post?.author !== currentUser) {
      alert("자신의 게시글만 삭제할 수 있습니다.");
      return;
    }

    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
  };


  // 제목 글자수 제한 처리 함수 추가
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit') => {
    const value = e.target.value;
    if (value.length <= 15) {
      if (type === 'new') {
        setNewPost({ ...newPost, title: value });
      } else {
        setCurrentPost(currentPost ? { ...currentPost, title: value } : null);
      }
    }
  };

  return (
    <Container>
      <Title>게시판</Title>
      <SectionLine />

      <TitleContainer>
        <span>총</span>
        <Num>{posts.length}</Num>
        <span>건의 글이 있습니다.</span>
      </TitleContainer>

      <ChartContainer>
        <WriteButton
          onClick={() => setIsModalOpen(true)}
        >
          글쓰기
        </WriteButton>
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
          {posts.map((post) => (
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
          ))}
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
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            />
            <ButtonContainer>
              <SaveButton onClick={handleCreate}>저장</SaveButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>취소</CancelButton>
            </ButtonContainer>
          </ModalBox>
        </ModalContainer>
      )}

      {/* 수정 모달 */}
      {currentPost && (
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
      )}
    </Container>
  )
}
"use client";

import { ButtonContainer, CateButton, Category, CategoryContainer, CateTitle, Company, Container, Dept, Etc, Section, SectionLine, Title, UserArea, UserContainer, UserName } from "./styles/Page.styled";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '@/app/redux/store/store';
import { fetchRecruitmentList } from '@/app/redux/features/resumeSlice';
import Link from "next/link";
import ResumeActionButtons from "@/components/ResumeActionButtons";



export default function Mypage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const { recruitmentList, loading, error } = useSelector(
    (state: RootState) => state.resume
  );

  console.log(recruitmentList);

  // 컴포넌트가 처음 렌더링될 때 요청청
  useEffect(() => {
    dispatch(fetchRecruitmentList());
  }, [dispatch]);

  const handleLoadData = async (id: string) => {
    // 데이터 불러오기 로직 구현
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    // 실제 데이터 로딩 로직으로 교체 필요
  };

  const handleEvaluate = async (id: string) => {
    // 평가 처리 로직 구현
    await new Promise(resolve => setTimeout(resolve, 2000));
    // 실제 평가 처리 로직으로 교체 필요
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <SectionLine />
      <Section />

      {/* 사용자 개인 정보 표시 */}
      <UserContainer>
        <UserArea>
          <Company>{user?.company?.name}</Company>
          <div className="flex space-x-2">
            <Dept>{user?.department?.name}</Dept>
            <Dept>/</Dept>
            <Dept>{user?.position}</Dept>
          </div>
          <UserName>{user?.name}</UserName>
          <Etc>
            <p>{user?.contact}</p>
            <p>{user?.email}</p>
          </Etc>
        </UserArea>
      </UserContainer>

      {loading && <p>이건 로딩중에 뜰 컴포넌트</p>}
      {/* 잘못되었으면, 잘못되었다 말하기 */}
      {error && <p style={{ color: 'red' }}>에러: {error}</p>}

      <Category>
        {recruitmentList.map((item, index) => (
          <CategoryContainer key={index}>
            <CateTitle>
              {item.title} ({item.job})
            </CateTitle>
            <ButtonContainer>
            <ResumeActionButtons
              id={item.id}
              isNewUpload={!item.isCompleted}
            />
              {/* <Link
                href={`/result/${item.id}`}
              >
                <CateButton>이력서 확인</CateButton>
              </Link> */}
            </ButtonContainer>
          </CategoryContainer>
        ))}
      </Category>
    </Container>
  );
}

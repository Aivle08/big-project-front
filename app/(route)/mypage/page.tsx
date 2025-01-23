"use client"

import { ButtonContainer, CateButton, Category, CategoryContainer, CateTitle, Company, Container, Dept, Etc, Section, SectionLine, Title, UserArea, UserContainer, UserName } from "./styles/Page.styled";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';

interface JobPosting {
  id: number;
  title: string;
  year: string;
  status: string;
}

export default function Mypage() {

  const user = useSelector((state: RootState) => state.auth.user);

  const jobPostings: JobPosting[] = [
    {
      id: 1,
      title: 'KT 제일제당(식품/공통부문) 신입사원',
      year: '2024년 하반기',
      status: '이력서 확인'
    },
    {
      id: 2,
      title: 'CJ제일제당(식품/공통부문) 신입사원',
      year: '2024년 하반기',
      status: '이력서 확인'
    },
    {
      id: 3,
      title: 'CJ제일제당(식품/공통부문) 신입사원',
      year: '2024년 하반기',
      status: '이력서 확인'
    },
    {
      id: 4,
      title: 'CJ제일제당(식품/공통부문) 신입사원',
      year: '2024년 하반기',
      status: '이력서 확인'
    },
    {
      id: 5,
      title: 'CJ제일제당(식품/공통부문) 신입사원',
      year: '2024년 하반기',
      status: '이력서 확인'
    }
  ];


  return (

    <Container>
      <Title>마이페이지</Title>
      <SectionLine></SectionLine>
      <Section></Section>


      {/* 사용자 개인 정보 입력칸 */}
      <UserContainer>
        <UserArea>
          <Company>{user?.company?.name}</Company>
          <Dept>{user?.department?.name}</Dept>
          <UserName>{user?.name}</UserName>
          <Etc>
            <p>{user?.contact}</p>
            <p>{user?.email}</p>
          </Etc>
        </UserArea>
      </UserContainer>

      {/* 직무 카테고리란 */}
      <Category>
        {jobPostings.map((job) => (
          <CategoryContainer key={job.id}>
            <CateTitle>{job.year} {job.title}</CateTitle>
            <ButtonContainer>
              <CateButton>
                {job.status}
              </CateButton>
            </ButtonContainer>
          </CategoryContainer>
        ))}
      </Category>

    </Container>
  )
}
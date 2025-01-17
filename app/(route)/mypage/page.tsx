import { ButtonContainer, CateButton, Category, CategoryContainer, CateTitle, Company, Container, Dept, Etc, Section, SectionLine, Title, UserArea, UserContainer, UserName } from "./styles/Page.styled";


interface JobPosting {
  id: number;
  title: string;
  year: string;
  status: string;
}

export default function Mypage() {

  const userInfo = {
    company: 'KT',
    dept_name: 'IT관제/보안관제',
    username: '최우식',
    phone: '010-5787-0422',
    email: 'chany0422@kt.com'
  };

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
          <Company>{userInfo.company}</Company>
          <Dept>{userInfo.dept_name}</Dept>
          <UserName>{userInfo.username}</UserName>
          <Etc>
            <p>{userInfo.phone}</p>
            <p>{userInfo.email}</p>
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
s
    </Container>
  )
}
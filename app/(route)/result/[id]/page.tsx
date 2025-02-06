'use client'

import { use, useEffect, useState } from "react";
import { 
  Box1, Box1Container, Box2, Box3, BoxContainer,
  Container, EvaluationInput, Img, InputContent, Label1, Label2, Left, 
  Num, PassButton, PassList, People, Right, Score, Section, SectionCon, SectionLine, SubLabel, 
  Title, Title1, Title2 } from "../styles/Page.styled"
import Image from "next/image";
import Appliant from "../../../../public/images/TotalAppliant.png";
import _ from 'lodash';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import ApplicantTableContainer from "@/components/ApplicantTableContainer";
import { fetchRecruitmentList } from "@/app/redux/features/resumeSlice";

// 전체 평점 계산 함수
const calculateOverallAverage = (applicants: {
    name: string; // 이름
    // 이름
    jobFit: number; // 채용공고 부합
    // 채용공고 부합
    idealCandidate: number; // 인재상
    // 인재상
    education: number; // 학력
    // 학력
    extracurricular: number; // 대외활동 및 기타
    // 대외활동 및 기타
    experience: number; // 경력
    // 경력
    overallScore: number; // 종합 평점
  }[]) => {
  const average = _.meanBy(applicants, 'overallScore');
  return average.toFixed(2); // 소수점 2자리까지 표시
};

interface Props{
  params : Promise<{
    id: string
  }>;
}


export default function Result({ params } : Props) {
  const resolvedParams = use(params);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { recruitmentList, loading, error } = useSelector(
    (state: RootState) => state.resume
  );

  const [evaluationData, setEvaluationData] = useState({
    id: 1,
    title: "",
    job: "",
    evaluationList: [],
  });

  const recruitmentId = Number(resolvedParams.id);

  useEffect(() => {
    dispatch(fetchRecruitmentList());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && recruitmentList.length > 0) {
      const selectedRecruitment = recruitmentList.find(
        (item) => item.id === recruitmentId
      );

      console.log(recruitmentList);
      console.log(selectedRecruitment);

      if (selectedRecruitment) {
        setEvaluationData({
          id: selectedRecruitment.id,
          title: selectedRecruitment.title,
          job: selectedRecruitment.job,
          evaluationList: selectedRecruitment.evaluations.map(
            (evaluation, index) => ({
              id: index + 1,
              item: evaluation.item,
              detail: evaluation.detail,
            })
          ),
        });
      }
    }
  }, [recruitmentList, loading, recruitmentId]);

  const getDetailByItem = (itemName: string) => {
    const evaluation = evaluationData.evaluationList.find(
      item => item.item === itemName
    );
    return evaluation?.detail || "";
  };

  // 지원자 데이터
  type Applicant = {
    name: string; // 이름
    jobFit: number; // 채용공고 부합
    idealCandidate: number; // 인재상
    education: number; // 학력
    extracurricular: number; // 대외활동 및 기타
    experience: number; // 경력
    overallScore: number; // 종합 평점
  };

  // 임시 데이터
  const mockApplicants: Applicant[] = [
    {
      name: '이준호',
      jobFit: 4.7,
      idealCandidate: 4.5,
      education: 4.2,
      extracurricular: 3.8,
      experience: 4.9,
      overallScore: 4.6,
    },
    {
      name: '김민지',
      jobFit: 3.9,
      idealCandidate: 4.1,
      education: 4.8,
      extracurricular: 4.0,
      experience: 3.7,
      overallScore: 4.2,
    },
    {
      name: '박성훈',
      jobFit: 4.6,
      idealCandidate: 4.3,
      education: 4.4,
      extracurricular: 4.1,
      experience: 4.5,
      overallScore: 4.5,
    },
    {
      name: '최서연',
      jobFit: 4.2,
      idealCandidate: 3.8,
      education: 4.9,
      extracurricular: 4.5,
      experience: 4.3,
      overallScore: 4.4,
    },
    {
      name: '정하영',
      jobFit: 4.9,
      idealCandidate: 4.8,
      education: 4.5,
      extracurricular: 4.2,
      experience: 4.6,
      overallScore: 4.8,
    },
    {
      name: '이도윤',
      jobFit: 3.7,
      idealCandidate: 3.9,
      education: 4.0,
      extracurricular: 3.5,
      experience: 4.1,
      overallScore: 3.8,
    },
    {
      name: '한지민',
      jobFit: 4.3,
      idealCandidate: 4.0,
      education: 4.7,
      extracurricular: 4.1,
      experience: 4.4,
      overallScore: 4.5,
    },
    {
      name: '배승우',
      jobFit: 4.1,
      idealCandidate: 3.7,
      education: 4.2,
      extracurricular: 3.9,
      experience: 4.0,
      overallScore: 4.0,
    },
    {
      name: '윤하늘',
      jobFit: 4.8,
      idealCandidate: 4.6,
      education: 4.4,
      extracurricular: 4.3,
      experience: 4.7,
      overallScore: 4.7,
    },
    {
      name: '조예린',
      jobFit: 3.8,
      idealCandidate: 3.6,
      education: 4.1,
      extracurricular: 3.7,
      experience: 3.9,
      overallScore: 3.9,
    },
  ];
  

  // 전체 평점 계산
  const totalAverage = calculateOverallAverage(mockApplicants);

  // 합격자 페이지로 이동하는 함수
  // 해당 페이지로 넘어가기 전 합격자 목록을 보내기.
  const handlePasserClick = () => {
    router.push('/passer');
  };

  return (
    <Container>
      <Title>이력서 분석 및 평가 결과</Title>
      <SectionLine></SectionLine>
      <Section></Section>

      <Section>
        <Label1>제목</Label1>
        <SubLabel>{evaluationData.title}</SubLabel>
      </Section>

      <Section>
        <Label1>직무</Label1>
        <SubLabel>{evaluationData.job}</SubLabel>
      </Section>

      <Section></Section>
      <Section>
        <Label1>평가 항목</Label1>
        <br />  

        <EvaluationInput>
          {/* 1. 채용 공고 */}
          <Section>
            <Label2> 채용 공고</Label2>
            <SectionCon><InputContent> {getDetailByItem("채용 공고")}</InputContent></SectionCon>
          </Section>
          {/* 2. 인재상 */}
          <Section>
            <Label2> 인재상</Label2>
            <SectionCon><InputContent> {getDetailByItem("인재상")}</InputContent></SectionCon>
          </Section>
          {/* 3. 학력 */}
          <Section>
            <Label2> 학력</Label2>
            <SectionCon><InputContent> {getDetailByItem("학력")}</InputContent></SectionCon>
          </Section>
          {/* 4. 대외활동 + 수상내역 + 어학 + 대외활동 */}
          <Section>
            <Label2> 대외활동&nbsp;/&nbsp;수상내역&nbsp;/&nbsp;어학&nbsp;/&nbsp;자격증</Label2>
            <SectionCon><InputContent> {getDetailByItem("대외활동/수상내역/어학/자격증")}</InputContent></SectionCon>
          </Section>
          {/* 5. 경력 */}
          <Section>
            <Label2> 경력</Label2>
            <SectionCon><InputContent>{getDetailByItem("경력")}</InputContent></SectionCon>
          </Section>     
        </EvaluationInput>

    </Section>

    <Section></Section>

    <Section>
      <BoxContainer>
      <Left>
        <Box1>
          <Title1>총 지원자 수</Title1>
          <Box1Container>
            <People>544</People>
            <Num>명</Num>
            <Img> {/* 원하는 크기로 조절 */}
              <Image 
                src={Appliant} 
                alt="사진" 
                className="w-[100%] h-[100%] object-contain"
              />
            </Img>
          </Box1Container>

        </Box1>
      </Left>

      <Right>
        <Box2>
          <Title2>전체 평점</Title2>
          {/* 추후에 전체 평점 계산하는 로직 추가해야함 */}
          <Score>{totalAverage}</Score>

        </Box2>

        <Box3>
          <Title2>합격 명단</Title2>
          <PassList>이력서를 제출한 지원자 중 합격된 지원자의 정보만 저장한 리스트입니다.</PassList>
          <div className="flex justify-end"><PassButton  onClick={handlePasserClick}>바로가기</PassButton></div>
        </Box3>
        
      </Right>

      </BoxContainer>
    </Section>

    <Section></Section>
    <br />

    <Section>
      <Label1>평점 리스트</Label1>
      <Section></Section>

      <ApplicantTableContainer
        applicantList={mockApplicants}
      />

    </Section>
    </Container>
  )
}
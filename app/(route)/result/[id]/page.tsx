'use client'

import { useEffect, useState } from "react";
import { 
  Alarm, ApplicantRow, AverageRow, BoldCell, Box1, Box1Container, Box2, Box3, BoxContainer,
  Cell, Container, EvaluationInput, ImageCell, Img, InputContent, Label1, Label2, Left, 
  ModalButtons, ModalContent, ModalHeader, ModalHeader2, ModalOverlay, NoButton, Num, 
  PassButton, PassList, People, Right, Score, Section, SectionLine, SubLabel, TableContainer, 
  TableHeader, Title, Title1, Title2, YesButton } from "../styles/Page.styled"
import Image from "next/image";
import Appliant from "../../../../public/images/TotalAppliant.png";
import Add_Before from "../../../../public/images/add_before.png";
import Add_After from "../../../../public/images/add_after.png";
import Info from "../../../../public/images/Info.png";
import _ from 'lodash';
import { useRouter } from "next/navigation";
import ResumeModal from "@/components/ResumeModal";
import { getApplicantInRecruiment } from "@/app/api/resumeAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";

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
  params :{
    id: string
  }
}


export default function Result({params} : Props) {

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

  useEffect(() => {
    if (!loading && recruitmentList.length > 0) {
      // 특정 ID를 기준으로 찾음 (예: id = 1)
      const selectedRecruitment = recruitmentList.find((item) => item.id === 1);

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
  }, [recruitmentList, loading]);

  const getDetailByItem = (itemName: string) => {
    const evaluation = evaluationData.evaluationList.find(
      item => item.item === itemName
    );
    return evaluation?.detail || "";
  };


  // 모달 상태 관리
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  // 합격 상태 관리
  const [approvedApplicants, setApprovedApplicants] = useState<number[]>([]);

  // 모달 열기
  const handleAddClick = (index: number) => {
    setSelectedApplicant(index);
    setShowModal(true);
  };

  // 모달에서 "예" 선택
  const handleApprove = () => {
    if (selectedApplicant !== null) {
      setApprovedApplicants([...approvedApplicants, selectedApplicant]);
    }
    setShowModal(false);
  };

  // 모달에서 "아니오" 선택
  const handleReject = () => {
    setShowModal(false);
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

  // 지원자 목록 생성
  const renderApplicantRows = (applicants: Applicant[]) => {
    getApplicantInRecruiment(1);

    return applicants.map((applicant, idx) => (
      <ApplicantRow key={idx}>
        <ImageCell>
          <div>
            <ResumeModal
              name={"유창현"}
              pdfUrl={"/File.pdf"} 
            />
          </div>
        </ImageCell>
        <Cell>{applicant.name}</Cell>
        <Cell>{applicant.jobFit}</Cell>
        <Cell>{applicant.idealCandidate}</Cell>
        <Cell>{applicant.education}</Cell>
        <Cell>{applicant.extracurricular}</Cell>
        <Cell>{applicant.experience}</Cell>
        <Cell>{applicant.overallScore}</Cell>
        <ImageCell>
          <button onClick={() => handleAddClick(idx)}>
            <Image
              src={approvedApplicants.includes(idx) ? Add_After : Add_Before}
              alt="Details"
              width={27}
              height={27}
              className="object-cover"
            />
          </button>
        </ImageCell>
      </ApplicantRow>
    ));
};

// 임시 데이터
const mockApplicants: Applicant[] = [
  {
    name: '유창현',
    jobFit: 4.5,
    idealCandidate: 4.2,
    education: 4.8,
    extracurricular: 4.0,
    experience: 4.3,
    overallScore: 4.7,
  },
  {
    name: '김유라',
    jobFit: 4.0,
    idealCandidate: 4.1,
    education: 4.6,
    extracurricular: 4.3,
    experience: 4.1,
    overallScore: 4.4,
  },
  {
    name: '강해찬',
    jobFit: 4.5,
    idealCandidate: 4.2,
    education: 4.8,
    extracurricular: 4.0,
    experience: 4.3,
    overallScore: 4.7,
  },
  {
    name: '박수민',
    jobFit: 4.0,
    idealCandidate: 4.1,
    education: 4.6,
    extracurricular: 4.3,
    experience: 4.1,
    overallScore: 4.4,
},
{
    name: '유창현',
    jobFit: 4.5,
    idealCandidate: 4.2,
    education: 4.8,
    extracurricular: 4.0,
    experience: 4.3,
    overallScore: 4.7,
  },
  {
    name: '심용훈',
    jobFit: 4.0,
    idealCandidate: 4.1,
    education: 4.6,
    extracurricular: 4.3,
    experience: 4.1,
    overallScore: 4.4,
  },
  {
    name: '최찬',
    jobFit: 4.5,
    idealCandidate: 4.2,
    education: 4.8,
    extracurricular: 4.0,
    experience: 4.3,
    overallScore: 4.7,
  },
  {
    name: '강해찬',
    jobFit: 4.0,
    idealCandidate: 4.1,
    education: 4.6,
    extracurricular: 4.3,
    experience: 4.1,
    overallScore: 4.4,
  },
  {
    name: '이정하',
    jobFit: 4.5,
    idealCandidate: 4.2,
    education: 4.8,
    extracurricular: 4.0,
    experience: 4.3,
    overallScore: 4.7,
  },
  {
    name: '유창현',
    jobFit: 4.0,
    idealCandidate: 4.1,
    education: 4.6,
    extracurricular: 4.3,
    experience: 4.1,
    overallScore: 4.4,
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
            <Label2>채용 공고</Label2>
            <InputContent> {evaluationData.title}</InputContent>
          </Section>
          {/* 2. 인재상 */}
          <Section>
            <Label2>인재상</Label2>
            <InputContent> {getDetailByItem("인재상")}</InputContent>
          </Section>
          {/* 3. 학력 */}
          <Section>
            <Label2>학력</Label2>
            <InputContent> {getDetailByItem("학력")}</InputContent>
          </Section>
          {/* 4. 대외활동 + 수상내역 + 어학 + 대외활동 */}
          <Section>
            <Label2>대외활동&nbsp;/&nbsp;수상내역&nbsp;/&nbsp;어학&nbsp;/&nbsp;자격증</Label2>
            <InputContent> {getDetailByItem("대외활동/수상내역/어학/자격증")}</InputContent>
          </Section>
          {/* 5. 경력 */}
          <Section>
            <Label2>경력</Label2>
            <InputContent>{getDetailByItem("경력")}</InputContent>
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

      <div className="relative">
        {/* 테이블 */}
        <TableContainer>
            {/* 헤더 */}
            <TableHeader>
                <BoldCell></BoldCell>
                <BoldCell>이름</BoldCell>
                <BoldCell>채용공고 부합</BoldCell>
                <BoldCell>인재상</BoldCell>
                <BoldCell>학력</BoldCell>
                <BoldCell>대외활동 및 기타</BoldCell>
                <BoldCell>경력</BoldCell>
                <BoldCell>종합 평점</BoldCell>
                <BoldCell>합격</BoldCell>
            </TableHeader>

            {/* 평균 점수 행 */}
            <AverageRow>
                <Cell></Cell>
                <BoldCell>평균점수</BoldCell>
                <Cell>5.0</Cell>
                <Cell>5.0</Cell>
                <Cell>5.0</Cell>
                <Cell>5.0</Cell>
                <Cell>5.0</Cell>
                <Cell>5.0</Cell>
                <Cell></Cell>
            </AverageRow>

            {/* 지원자 행 */}
            {renderApplicantRows(mockApplicants)}
      
        </TableContainer>


        {/* 확인 모달 */}
        {showModal && (
          <ModalOverlay>
            <ModalContent>
              {/* 모달 헤더 */}
              <ModalHeader>
                <ModalHeader2>
                  <Image src={Info} alt={"알림"} className="flex-1 w-55" />
                  {/* <span className="text-gray-500">!</span> */}
                </ModalHeader2>
                <Alarm>알림</Alarm>
              </ModalHeader>
              <p>선택한 지원자를 합격자 명단에 추가하시겠습니까?</p>
              <Section></Section>
              <hr />

              <ModalButtons>
                <NoButton onClick={handleReject}>취소</NoButton>
                <YesButton onClick={handleApprove}>추가</YesButton>
              </ModalButtons>
            </ModalContent>
          </ModalOverlay>
        )}
    </div>


    </Section>





    </Container>


  )
}
'use client'
import React, { useState } from 'react'
import { Alarm, ApplicantRow, AverageRow, BoldCell, Cell, ImageCell, ModalButtons, ModalContent, ModalHeader, ModalHeader2, ModalOverlay, NoButton, Section, TableContainer, TableHeader, YesButton } from './styles/tableStyled';
import ResumeModal from './ResumeModal';
import Image from 'next/image';
// images
import Add_Before from "../public/images/add_before.png";
import Add_After from "../public/images/add_after.png";
import Info from "../public/images/Info.png";

type Applicant = {
  name: string; // 이름
  jobFit: number; // 채용공고 부합
  idealCandidate: number; // 인재상
  education: number; // 학력
  extracurricular: number; // 대외활동 및 기타
  experience: number; // 경력
  overallScore: number; // 종합 평점
};

type Applicants = {
    applicantList: Applicant[];
};


export default function ApplicantTableContainer({applicantList} : Applicants) {
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
    
    const renderApplicantRows = (applicants: Applicant[]) => {
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

  return (
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
            {renderApplicantRows(applicantList)}
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
  )
}

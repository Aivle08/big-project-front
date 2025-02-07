'use client'
import React, { useState } from 'react'
import { Alarm, ApplicantRow, AverageRow, BoldCell, Cell, ImageCell, ModalButtons, ModalContent, ModalHeader, ModalHeader2, ModalOverlay, NoButton, Section, TableContainer, TableHeader, YesButton } from './styles/tableStyled';
import ResumeModal from './ResumeModal';
import Image from 'next/image';
// images
import Add_Before from "../public/images/add_before.png";
import Add_After from "../public/images/add_after.png";
import Info from "../public/images/Info.png";
import arrowCouple from "../public/images/sort-arrows-couple.png"
import { Applicant, Applicants } from "@/app/types/evaluation"
import detailicon from '../public/images/details_icon.png';
import Link from 'next/link';


interface Props{
  applicantList: Applicant[],
  pass: boolean
}

export default function ApplicantTableContainer({applicantList, pass} : Props) {
    const [selectedApplicant, setSelectedApplicant] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [sortBy, setSortBy] = useState("overallScore");
    const [isAsc, setIsAsc] = useState(true);

    const sortApplicants = (applicants: Applicant[], sortBy: keyof Applicant | null, isAsc: boolean) => {
      if (!sortBy) return applicants;

      return [...applicants].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue === bValue) return 0;
        return isAsc ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
      });
    };

    const handleSortClick = (key) => {
      if (sortBy === key) {
        setIsAsc(!isAsc); // 같은 정렬 기준이면 방향 토글
      } else {
        setSortBy(key);
        setIsAsc(true); // 새 정렬 기준이면 오름차순 기본값
      }
    };

    const sortedApplicants = sortApplicants(applicantList, sortBy, isAsc);

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
    
    // 지원자 목록
    const renderApplicantRows = (applicants: Applicant[]) => {
      // 지원자 정렬 (localeCompare는 두 문자열을 비교하는 함수라고 함.)
      applicants.sort((a, b) => a.applicationName.localeCompare(b.applicationName));
  
      return applicants.map((applicant, idx) => {
          // `scoreDetails`에서 각 평가 항목을 찾아 매칭
          const jobFit = applicant.scoreDetails.find(item => item.title === "채용 공고")?.score || "-";
          const idealCandidate = applicant.scoreDetails.find(item => item.title === "인재상")?.score || "-";
          const education = applicant.scoreDetails.find(item => item.title === "학력")?.score || "-";
          const extracurricular = applicant.scoreDetails.find(item => item.title === "대외활동/수상내역/어학/자격증")?.score || "-";
          const experience = applicant.scoreDetails.find(item => item.title === "경력")?.score || "-";
          const overallScore = applicant.scoreDetails.reduce((acc, item) => acc + item.score, 0) / applicant.scoreDetails.length;
  
          return (
              <ApplicantRow key={idx}>
                  <ImageCell>
                      <div>
                          <ResumeModal
                              name={applicant.applicationName}
                              pdfUrl={"/File.pdf"} 
                          />
                      </div>
                  </ImageCell>
                  <Cell>{applicant.applicationName}</Cell>
                  <Cell>{jobFit}</Cell>
                  <Cell>{idealCandidate}</Cell>
                  <Cell>{education}</Cell>
                  <Cell>{extracurricular}</Cell>
                  <Cell>{experience}</Cell>
                  <Cell>{overallScore.toFixed(1)}</Cell> {/* 평균 점수 계산 */}

                  { !pass ? 
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
                    :
                    <ImageCell>
                      <Link href={`/details`}>
                        <Image
                          src={detailicon}
                          alt="Details"
                          width={27}
                          height={27}
                          className="object-cover"
                        />
                      </Link>
                    </ImageCell>
                  }
              </ApplicantRow>
          );
      });
  };

  return (
    <div className="relative">
        {/* 테이블 */}
        <TableContainer>
            {/* 헤더 */}
            <TableHeader>
                <BoldCell></BoldCell>

                <BoldCell>
                    <span>이름</span>
                </BoldCell>

                <BoldCell>
                  <span>채용공고 부합 </span>
                  <button
                   onClick={() => handleSortClick("jobFit")}>
                    {sortBy === "jobFit" ? (isAsc ? "▲" : "▼") : 
                    <Image
                        src={arrowCouple} alt={"정렬전 화살표"} className="flex-1 w-55" 
                        width={12} height={12}
                    />
                    }
                  </button>
                </BoldCell>
                <BoldCell>
                  <span>인재상 </span>
                  <button onClick={() => handleSortClick("idealCandidate")}>
                    {sortBy === "idealCandidate" ? (isAsc ? "▲" : "▼") : 
                    <Image
                    src={arrowCouple} alt={"정렬전 화살표"} className="flex-1 w-55" 
                    width={12} height={12}
                    />
                    }
                  </button>
                </BoldCell>
                <BoldCell>
                  <span>학력 </span>
                  <button onClick={() => handleSortClick("education")}>
                    {sortBy === "education" ? (isAsc ? "▲" : "▼") : 
                    <Image
                        src={arrowCouple} alt={"정렬전 화살표"} className="flex-1 w-55" 
                        width={12} height={12}
                    />
                    }
                  </button>
                </BoldCell>
                <BoldCell>
                  <span>대외활동 및 기타 </span>
                  <button onClick={() => handleSortClick("extracurricular")}>
                    {sortBy === "extracurricular" ? (isAsc ? "▲" : "▼") : 
                    <Image
                    src={arrowCouple} alt={"정렬전 화살표"} className="flex-1 w-55" 
                    width={12} height={12}
                    />
                    }
                  </button>
                </BoldCell>
                <BoldCell>
                  <span>경력 </span>
                  <button onClick={() => handleSortClick("experience")}>
                    {sortBy === "experience" ? (isAsc ? "▲" : "▼") : 
                    <Image
                    src={arrowCouple} alt={"정렬전 화살표"} className="flex-1 w-55" 
                    width={12} height={12}
                    />
                    }
                  </button>
                </BoldCell>
                <BoldCell>
                  <span>종합 평점 </span>
                  <button onClick={() => handleSortClick("overallScore")}>
                    {sortBy === "overallScore" ? (isAsc ? "▲" : "▼") : 
                    <Image
                    src={arrowCouple} alt={"정렬전 화살표"} className="flex-1 w-55" 
                    width={12} height={12}
                    />
                    }
                  </button>
                </BoldCell>

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
            {renderApplicantRows(sortedApplicants)}
        </TableContainer>

        {/* 확인 모달 */}
        {showModal && (
          <ModalOverlay>
            <ModalContent>
              {/* 모달 헤더 */}
              <ModalHeader>
                <ModalHeader2>
                  <Image src={Info} alt={"알림"} className="flex-1 w-55" />
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

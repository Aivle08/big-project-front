'use client'
import React, { useEffect, useState } from 'react'
import { Alarm, ApplicantRow, AverageRow, BoldCell, Cell, ImageCell, ModalButtons, ModalContent, ModalHeader, ModalHeader2, ModalOverlay, NoButton, Section, TableContainer, TableHeader, YesButton } from './styles/tableStyled';
import ResumeModal from './ResumeModal';
import Image from 'next/image';
// images
import Add_Before from "../public/images/add_before.png";
import Add_After from "../public/images/add_after.png";
import Info from "../public/images/Info.png";
import arrowCouple from "../public/images/sort-arrows-couple.png"
import { Applicant } from "@/app/types/evaluation"
import detailicon from '../public/images/details_icon.png';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setPasser } from '@/app/redux/features/passerSlice';
import { AppDispatch } from '@/app/redux/store/store';
import { fetchApplicantsEvaluations } from '@/app/redux/features/evaluationSlice';
import DetailsModal from './DetailsModal';

interface Props{
  applicantList: Applicant[],
  pass: boolean,
  recruitmentId: number;
  isResultPage?: boolean; // 새로 추가
}

const getTitleFromKey = (key: string): string => {
  const mapping: { [key: string]: string } = {
    jobFit: "채용 공고",
    idealCandidate: "인재상",
    education: "학력",
    extracurricular: "대외활동/수상내역/어학/자격증",
    experience: "경력",
    overallScore: "종합 평점"
  };

  return mapping[key] || key;
};


export default function ApplicantTableContainer({applicantList, pass, recruitmentId, isResultPage = false} : Props) {
  const dispatch = useDispatch<AppDispatch>(); 

  // recruitmentId가 유효한지 확인
  useEffect(() => {
    if (!recruitmentId) {
      console.error('Invalid recruitmentId 확인해ㅐㅐㅐㅐㅐㅐ:', recruitmentId);
    }
  }, [recruitmentId]);

  // 지원자
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(null);

  // 모달 보여줄지 여부
  const [showModal, setShowModal] = useState(false);

  // 정렬을 위함함
  const [sortBy, setSortBy] = useState("overallScore");
  const [isAsc, setIsAsc] = useState(true);

  // 총점 합산을 위함 
  const [totalScores, setTotalScores] = useState([0,0,0,0,0,0]);

  useEffect(() => {
    if (applicantList.length === 0) {
        setTotalScores([0, 0, 0, 0, 0, 0]);
        return;
    }

    const sumScores = [0, 0, 0, 0, 0, 0];
    let count = 0;

    applicantList.forEach(applicant => {
      const jobFit = applicant.scoreDetails.find(item => item.title === "채용 공고")?.score || 0;
      const idealCandidate = applicant.scoreDetails.find(item => item.title === "인재상")?.score || 0;
      const education = applicant.scoreDetails.find(item => item.title === "학력")?.score || 0;
      const extracurricular = applicant.scoreDetails.find(item => item.title === "대외활동/수상내역/어학/자격증")?.score || 0;
      const experience = applicant.scoreDetails.find(item => item.title === "경력")?.score || 0;
      const overallScore = applicant.scoreDetails.length > 0 
          ? applicant.scoreDetails.reduce((acc, item) => acc + item.score, 0) / applicant.scoreDetails.length 
          : 0;

      sumScores[0] += jobFit;
      sumScores[1] += idealCandidate;
      sumScores[2] += education;
      sumScores[3] += extracurricular;
      sumScores[4] += experience;
      sumScores[5] += overallScore;
      count++;
    });

    const averageScores: number[] = count > 0 
      ? sumScores.map(score => parseFloat((score / count).toFixed(1))) 
      : [0, 0, 0, 0, 0, 0];

    setTotalScores(averageScores);
  }, [applicantList]);

  const sortApplicants = (applicants: Applicant[], sortBy: string | null, isAsc: boolean) => {
    if (!sortBy) return applicants;

    return [...applicants].sort((a, b) => {
        let aValue, bValue;

        if (sortBy === "overallScore") {
            // 종합 평점(평균) 계산
            aValue = a.scoreDetails.length > 0 
                ? a.scoreDetails.reduce((acc, item) => acc + item.score, 0) / a.scoreDetails.length 
                : 0;

            bValue = b.scoreDetails.length > 0 
                ? b.scoreDetails.reduce((acc, item) => acc + item.score, 0) / b.scoreDetails.length 
                : 0;
        } else {
            // 일반 점수 정렬
            aValue = a.scoreDetails.find(item => item.title === getTitleFromKey(sortBy))?.score ?? 0;
            bValue = b.scoreDetails.find(item => item.title === getTitleFromKey(sortBy))?.score ?? 0;
        }

        return isAsc ? aValue - bValue : bValue - aValue;
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
  // const handleApprove = async () => {
  //   if (selectedApplicant !== null) {
  //     const applicantId = sortedApplicants[selectedApplicant].applicantId;
  //     await dispatch(setPasser({ recruitmentId:recruimentId, passerID: applicantId }));
  //   }
  //   setShowModal(false);
  // };
  // const handleApprove = async () => {
  //   if (selectedApplicant !== null) {
  //     try {
  //       const applicantId = sortedApplicants[selectedApplicant].applicantId;
        
  //       // API 호출로 합격자 처리
  //       await dispatch(setPasser({ 
  //         recruitmentId: recruitmentId, 
  //         passerID: [applicantId]  // 배열로 전달
  //       })).unwrap();
        
  //       // 즉시 UI 업데이트를 위해 현재 applicant를 필터링
  //       setApprovedApplicants(prev => [...prev, selectedApplicant]);
        
  //       // 모달 닫기
  //       setShowModal(false);
        
  //       // 성공 메시지 표시
  //       alert('지원자가 합격자 명단에 추가되었습니다.');
  
  //       // 서버에서 업데이트된 목록 다시 가져오기
  //       await dispatch(fetchApplicantsEvaluations({ 
  //         recruitmentId, 
  //         passed: false
  //       }));
  
  //     } catch (error) {
  //       console.error('Error approving applicant:', error);
  //       alert('합격자 처리 중 오류가 발생했습니다.');
  //       setShowModal(false);
  //     }
  //   }
  // };
  // 모달에서 "예" 선택
  const handleApprove = async () => {
    if (selectedApplicant !== null && recruitmentId) {
      try {
        const applicantId = sortedApplicants[selectedApplicant].applicantId;
        
        console.log('Sending request with:', {
          recruitmentId,
          applicantId
        });

        // API 호출로 합격자 처리
        await dispatch(setPasser({ 
          recruitmentId: Number(recruitmentId), 
          passerID: [applicantId]
        })).unwrap();
        
        // 성공시 UI 업데이트
        setApprovedApplicants(prev => [...prev, selectedApplicant]);
        setShowModal(false);
        
        // 성공 메시지 표시
        alert('지원자가 합격자 명단에 추가되었습니다.');
  
        // 리스트 새로고침하여 합격자 제거된 목록 표시
        await dispatch(fetchApplicantsEvaluations({ 
          recruitmentId: Number(recruitmentId), 
          passed: false
        }));
  
      } catch (error) {
        console.error('Error approving applicant:', error);
        alert('합격자 처리 중 오류가 발생했습니다.');
        setShowModal(false);
      }
    } else {
      console.error('Invalid selectedApplicant or recruitmentId:', { selectedApplicant, recruitmentId });
      alert('필요한 정보가 누락되었습니다.');
      setShowModal(false);
    }
  };
  

  // 모달에서 "아니오" 선택
  const handleReject = () => {
    setShowModal(false);
  };
  
  // 지원자 목록
  const updateApplicantRows = (applicants: Applicant[]) => {
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
                  name={applicant.applicantName}
                  pdfUrl={applicant.applicantId.toString()} 
                />
              </div>
          </ImageCell>

          {isResultPage ? (
            <Cell>
              <DetailsModal
                name={applicant.applicantName}
                summary={applicant.resumeSummary} 
                jobFit={applicant.scoreDetails.find(item => item.title === "채용 공고")?.summary || ""}
                education={applicant.scoreDetails.find(item => item.title === "학력")?.summary || ""}
                teamFit={applicant.scoreDetails.find(item => item.title === "인재상")?.summary || ""}
                activity={applicant.scoreDetails.find(item => item.title === "대외활동/수상내역/어학/자격증")?.summary || ""}
                experience={applicant.scoreDetails.find(item => item.title === "경력")?.summary || ""}
                jobFitScore={Number(jobFit)}
                educationScore={Number(education)}
                teamFitScore={Number(idealCandidate)}
                activityScore={Number(extracurricular)}
                experienceScore={Number(experience)}
              />
            </Cell>
          ) : (
            <Cell>{applicant.applicantName}</Cell>
          )}
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
              <Link href={`/details/${recruitmentId}/${applicant.applicantId}`}>
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
          <Cell>{ totalScores[0] }</Cell>
          <Cell>{ totalScores[1] }</Cell>
          <Cell>{ totalScores[2] }</Cell>
          <Cell>{ totalScores[3] }</Cell>
          <Cell>{ totalScores[4] }</Cell>
          <Cell>{ totalScores[5] }</Cell>
          <Cell></Cell>
        </AverageRow>

        {/* 지원자 행 */}
        {updateApplicantRows(sortedApplicants)}
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
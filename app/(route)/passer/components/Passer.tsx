"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  MainContainer,
  SectionLine,
  SectionTitle,
  TextBox,
  TableContainer,
  TableHeader,
  AverageRow,
  ApplicantRow,
  ImageCell,
  FooterLine,
  BoldCell,
  Cell,
  SmallTitle,
  SmallContent,
} from '../styles/pageStyled';
import ResumeModal from '@/components/ResumeModal';
import detailicon from '../../../../public/images/details_icon.png';
import { useRouter } from 'next/navigation';
import { evaluationAPI } from '@/app/api/evaluationAPI';
import { PassedApplicant, PassedResponse } from '@/app/types/evaluation';


interface PasserProps {
    recruitmentId: number; 
  }

  
export default function Passer({ recruitmentId }: PasserProps) {
    const router = useRouter();
    const [passedData, setPassedData] = useState<PassedResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [averageScores, setAverageScores] = useState({
        jobFit: 0,
        idealCandidate: 0,
        education: 0,
        extracurricular: 0,
        experience: 0
    });

    useEffect(() => {
        console.log('Received recruitmentId:', recruitmentId);  // props 로깅
        
        const fetchPassedApplicants = async () => {
          try {
            setLoading(true);
            setError(null);
            const data = await evaluationAPI.getPassedApplicants(recruitmentId);
            console.log('Fetched passed data:', data);  // 받아온 데이터 로깅
            
            setPassedData(data);
            if (data.passList && data.passList.length > 0) {
              calculateAverages(data.passList);
            }
          } catch (error: any) {
            console.error('Error fetching passed applicants:', error);
            setError(error.message || '합격자 목록을 불러오는데 실패했습니다.');
          } finally {
            setLoading(false);
          }
        };
    
        if (recruitmentId) {
          fetchPassedApplicants();
        }
      }, [recruitmentId]);
    
    const calculateAverages = (passList: PassedApplicant[]) => {
      console.log('Calculating averages for:', passList);  // 계산 데이터 로깅
      
      const scores = {
        jobFit: 0,
        idealCandidate: 0,
        education: 0,
        extracurricular: 0,
        experience: 0
      };
  
      passList.forEach(applicant => {
        applicant.scoreDetails.forEach(detail => {
          switch (detail.title) {
            case '채용 공고':
              scores.jobFit += detail.score;
              break;
            case '인재상':
              scores.idealCandidate += detail.score;
              break;
            case '학력':
              scores.education += detail.score;
              break;
            case '대외활동/수상내역/어학/자격증':
              scores.extracurricular += detail.score;
              break;
            case '경력':
              scores.experience += detail.score;
              break;
          }
        });
      });
  
      const applicantCount = passList.length;
      const newAverages = {
        jobFit: Number((scores.jobFit / applicantCount).toFixed(1)),
        idealCandidate: Number((scores.idealCandidate / applicantCount).toFixed(1)),
        education: Number((scores.education / applicantCount).toFixed(1)),
        extracurricular: Number((scores.extracurricular / applicantCount).toFixed(1)),
        experience: Number((scores.experience / applicantCount).toFixed(1))
      };
      
      console.log('Calculated averages:', newAverages);  // 계산된 평균 로깅
      setAverageScores(newAverages);
    };
  
    if (loading) {
      return <div className="flex justify-center items-center min-h-screen">
        <p>Loading passed applicants...</p>
      </div>;
    }
  
    if (error) {
      return <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>;
    }
  
    if (!passedData || !passedData.passList) {
      return <div className="flex justify-center items-center min-h-screen">
        <p>No passed applicants data available</p>
      </div>;
    }
    
    

    return (
        <MainContainer>
            {/* 섹션 제목 */}
            <SectionTitle>합격 명단</SectionTitle>
            <SectionLine />

            <TextBox>
              <SmallTitle>
                직무
              </SmallTitle>
              <SmallContent>
                {passedData?.recruitmentTitle}
              </SmallContent>
            </TextBox>

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
                    <BoldCell>상세</BoldCell>
                </TableHeader>

                {/* 평균 점수 행 */}
                <AverageRow>
                  <Cell></Cell>
                  <BoldCell>평균점수</BoldCell>
                  <Cell>{averageScores.jobFit}</Cell>
                  <Cell>{averageScores.idealCandidate}</Cell>
                  <Cell>{averageScores.education}</Cell>
                  <Cell>{averageScores.extracurricular}</Cell>
                  <Cell>{averageScores.experience}</Cell>
                  <Cell>
                  {Number(
                    (Object.values(averageScores).reduce((a, b) => a + b, 0) / 5).toFixed(1)
                  )}
                  </Cell>
                  <Cell></Cell>
                </AverageRow>

                {/* 지원자 행 */}
                {passedData?.passList.map((applicant, idx) => (
            <ApplicantRow key={idx}>
              <ImageCell>
                <ResumeModal 
                  name={applicant.applicationName}
                  pdfUrl={`/${applicant.fileName}`}
                />
              </ImageCell>
              <Cell>{applicant.applicationName}</Cell>
              <Cell>{getApplicantScore(applicant, '채용 공고')}</Cell>
              <Cell>{getApplicantScore(applicant, '인재상')}</Cell>
              <Cell>{getApplicantScore(applicant, '학력')}</Cell>
              <Cell>{getApplicantScore(applicant, '대외활동/수상내역/어학/자격증')}</Cell>
              <Cell>{getApplicantScore(applicant, '경력')}</Cell>
              <Cell>{calculateOverallScore(applicant)}</Cell>
              <ImageCell>
                <button onClick={() => handleDetailClick(applicant.applicationName)}>
                  <Image
                    src={detailicon}
                    alt="Details"
                    width={27}
                    height={27}
                    className="object-cover"
                  />
                </button>
              </ImageCell>
            </ApplicantRow>
          ))}
        </TableContainer>
      </div>

      <FooterLine />
    </MainContainer>
  );
}
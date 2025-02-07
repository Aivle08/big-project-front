"use client"

import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import {
  MainContainer,
  SectionLine,
  SectionTitle,
  TextBox,
  FooterLine,
  SmallTitle,
  SmallContent,
} from '../styles/pageStyled';
import { useRouter } from 'next/navigation';
import { evaluationAPI } from '@/app/api/evaluationAPI';
import { PassedApplicant, PassedResponse } from '@/app/types/evaluation';
import { fetchApplicantsEvaluations } from '@/app/redux/features/evaluationSlice';
import ApplicantTableContainer from '@/components/ApplicantTableContainer';

interface PasserProps {
  params : Promise<{
    id: number; 
  }>;
}

export default function Passer({ params }: PasserProps) {
    const resolvedParams = use(params);
    const recruitmentId = Number(resolvedParams.id);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { evaluationList, status, error: evaluationError } = useSelector((state: RootState) => state.eval);
    
    useEffect(() => {
      dispatch(fetchApplicantsEvaluations({ recruitmentId, passed: false }));
    }, [dispatch, recruitmentId]);
  
    
    // 밑에가 수민이 state (전역상태 기반으로 교체 예정 )
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
        <ApplicantTableContainer
          applicantList={evaluationList}
        />
      <FooterLine />
    </MainContainer>
  );
}
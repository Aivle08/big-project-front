'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { CateButton } from '@/app/(route)/mypage/styles/Page.styled';
import { getApplicantInRecruiment } from '@/app/api/resumeAPI';
import { evaluationAPI } from '@/app/api/evaluationAPI';

interface ResumeActionButtonsProps {
  id: string;
  isNewUpload?: boolean;
//   onLoadData: () => Promise<void>;
//   onEvaluate: () => Promise<void>;
}

const ResumeActionButtons = ({
  id,
  isNewUpload = false,

}: ResumeActionButtonsProps) => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingEval, setIsLoadingEval] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const handleLoadData = async () => {
    setIsLoadingData(true);
    try {
     // 이력서 데이터 가져오기
     const response = await getApplicantInRecruiment(Number(id));
     console.log('이력서 데이터 로드 완료:----->', response);
     setDataLoaded(true);
    } catch (error) {
      console.error('이력서 데이터 로딩 실패:---', error);
      alert('이력서 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleEvaluate = async () => {
    setIsLoadingEval(true);
    try {
       // 평가 데이터 가져오기 및 처리
       const response = await evaluationAPI.getPassedApplicants(Number(id));
       console.log('평가 완료:-----------', response);
       setEvaluated(true);
    } catch (error) {
      console.error('평가 처리 실패ㅜㅜㅜㅜㅜㅜㅜㅜ:', error);
      alert('평가 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoadingEval(false);
    }
  };

  // 이력서 가져오기 + 평가하기
  if (isNewUpload) {
    return (
      <div className="space-y-2">
        <CateButton
          onClick={handleLoadData}
          disabled={isLoadingData || dataLoaded}
          className={` ${
            dataLoaded ? 'bg-yellow' : 'bg-transparent'
          }`}
        >
          {isLoadingData ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               이력서 데이터 불러오는 중 ...
            </>
          ) : dataLoaded ? (
            '이력서 가져오기 완료'
          ) : (
            '이력서 가져오기'
          )}
        </CateButton>

        <CateButton
          onClick={handleEvaluate}
          disabled={!dataLoaded || isLoadingEval || evaluated}
          className={` ${
            evaluated ? 'bg-yellow' : 'bg-transparent'
          }`}
        >
          {isLoadingEval ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              평가 진행중...
            </>
          ) : evaluated ? (
            '평가 완료'
          ) : (
            '평가하기'
          )}
        </CateButton>
      </div>
    );
  }

  // 이력서 확인 버튼
  if (!isNewUpload && dataLoaded && evaluated) {
    return (
      <Link href={`/result/${id}`} className="block">
        <CateButton>
          이력서 확인
        </CateButton>
      </Link>
    );
  }


  return null;
};

export default ResumeActionButtons;
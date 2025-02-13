'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { CateButton } from '@/app/(route)/mypage/styles/Page.styled';

interface ResumeActionButtonsProps {
  id: string; // recruitmentId (문자열로 전달됨)
  isNewUpload?: boolean;
}

// ProcessingStatus 열거형 (문자열로 처리)
type ProcessingStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

const ResumeActionButtons = ({
  id,
  isNewUpload = false,
}: ResumeActionButtonsProps) => {
  const recruitmentId = Number(id);

  // 상태 API 결과를 보관하는 상태값
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('NOT_STARTED');
  const [scoreStatus, setScoreStatus] = useState<ProcessingStatus>('NOT_STARTED');

  // 버튼 클릭시 로딩 상태
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [isLoadingSecond, setIsLoadingSecond] = useState(false);

  // 채용 상태(fetch /status)
  const fetchProcessingStatus = async () => {
    try {
      const res = await fetch(`https://picks-up.site/api/v1/recruitment/${recruitmentId}/status`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch processing status');
      const data = await res.json();
      console.log("Processing status response:", data);
      // 만약 응답이 단순 문자열이라면 data 자체를 사용
      setProcessingStatus(typeof data === 'object' && data.status ? data.status : data);
    } catch (error) {
      console.error('Error fetching processing status:', error);
    }
  };

  // 점수 상태(fetch /score-status)
  const fetchScoreStatus = async () => {
    try {
      const res = await fetch(`https://picks-up.site/api/v1/recruitment/${recruitmentId}/score-status`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch score status');
      const data = await res.json();
      console.log("Score status response:", data);
      setScoreStatus(typeof data === 'object' && data.status ? data.status : data);
    } catch (error) {
      console.error('Error fetching score status:', error);
    }
  };

  // 컴포넌트 마운트 시 한 번 상태 조회
  useEffect(() => {
    fetchProcessingStatus();
    fetchScoreStatus();
  }, [recruitmentId]);

  // 10초마다 상태를 폴링
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchProcessingStatus();
      fetchScoreStatus();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [recruitmentId]);

  // 첫 번째 버튼: 이력서 PDF 비동기 처리 호출
  const handleLoadData = async () => {
    setIsLoadingFirst(true);
    try {
      const res = await fetch(`https://picks-up.site/api/v1/ai-api/${recruitmentId}/resume-pdf-async`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // 필요 시 요청 본문 추가
      });
      if (!res.ok) {
        throw new Error('Failed to trigger resume pdf async');
      }
      console.log('Resume PDF async triggered successfully');
      // 작업 완료 후 채용 상태 재갱신
      await fetchProcessingStatus();
    } catch (error) {
      console.error('Error in resume pdf async:', error);
      alert('이력서 PDF 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoadingFirst(false);
    }
  };

  // 두 번째 버튼: 평가 비동기 처리 호출
  const handleEvaluate = async () => {
    setIsLoadingSecond(true);
    try {
      const res = await fetch(`https://picks-up.site/api/v1/ai-api/${recruitmentId}/score-async`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        throw new Error('Failed to trigger score async');
      }
      console.log('Score async triggered successfully');
      // 작업 완료 후 점수 상태 재갱신
      await fetchScoreStatus();
    } catch (error) {
      console.error('Error in score async:', error);
      alert('평가 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoadingSecond(false);
    }
  };

  // 상태에 따라 버튼 렌더링
  // 1. 채용 상태가 NOT_STARTED일 때 → 첫 번째 버튼만 활성화
  if (processingStatus === 'NOT_STARTED') {
    return (
      <div className="space-y-2">
        <CateButton
          onClick={handleLoadData}
          disabled={isLoadingFirst}
          className={isLoadingFirst ? 'bg-yellow' : 'bg-transparent'}
        >
          {isLoadingFirst ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              이력서 모델이 PDF 처리 중...
            </>
          ) : (
            '이력서 PDF 처리 시작'
          )}
        </CateButton>
      </div>
    );
  }

  // 2. 채용 상태가 IN_PROGRESS인 경우 → 진행중임을 표시하고 버튼 클릭 불가
  if (processingStatus === 'IN_PROGRESS') {
    return (
      <div className="space-y-2">
        <CateButton disabled className="bg-yellow">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          이력서 모델이 PDF 처리 중...
        </CateButton>
      </div>
    );
  }

  // 3. 채용 상태가 COMPLETED인데 점수 상태가 IN_PROGRESS인 경우 → 두 번째 버튼 비활성화 (평가 진행 중)
  if (processingStatus === 'COMPLETED' && scoreStatus === 'IN_PROGRESS') {
    return (
      <div className="space-y-2">
        <CateButton disabled className="bg-yellow">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          평가 모델이 평가 진행 중...
        </CateButton>
      </div>
    );
  }

  // 4. 채용 상태가 COMPLETED이고 점수 상태가 COMPLETED가 아닌 경우 → 두 번째 버튼 활성화 (평가 처리 시작)
  if (processingStatus === 'COMPLETED' && scoreStatus !== 'COMPLETED') {
    return (
      <div className="space-y-2">
        <CateButton
          onClick={handleEvaluate}
          disabled={isLoadingSecond}
          className={isLoadingSecond ? 'bg-yellow' : 'bg-transparent'}
        >
          {isLoadingSecond ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              평가 처리 중...
            </>
          ) : (
            '평가 처리 시작'
          )}
        </CateButton>
      </div>
    );
  }

  // 5. 점수 상태가 COMPLETED이면 결과 확인 버튼을 링크로 보여줌
  if (scoreStatus === 'COMPLETED') {
    return (
      <Link href={`/result/${id}`} className="block">
        <CateButton>
          결과 확인
        </CateButton>
      </Link>
    );
  }

  // 기타 상황 처리 (예: FAILED 상태 등)
  return null;
};

export default ResumeActionButtons;

'use client'

import { use, useEffect, useState } from 'react';
import { fetchApplicantsEvaluations } from '@/app/redux/features/evaluationSlice';
import { AppDispatch, RootState } from '@/app/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecruitmentList } from '@/app/redux/features/resumeSlice';
import _ from 'lodash';
import { FooterLine, MainContainer, SectionLine, SectionTitle, SmallContent, SmallTitle, TextBox } from '../styles/pageStyled';
import ApplicantTableContainer from '@/components/ApplicantTableContainer';

interface Props {
  params : Promise<{
    id: number; 
  }>;
}

const calculateOverallAverage = (applicants: {
    name: string;
    jobFit: number;
    idealCandidate: number;
    education: number;
    extracurricular: number;
    experience: number;
    overallScore: number;
  }[]) => {
  const average = _.meanBy(applicants, 'overallScore');
  return average.toFixed(2); // 소수점 2자리까지 표시
};

export default function PasserPage({ params }: Props) {
  const resolvedParams = use(params);
  const dispatch = useDispatch<AppDispatch>();
  // const router = useRouter();
  const recruitmentId = Number(resolvedParams.id);

  console.log(recruitmentId+"resike")

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

  // 지원자 데이터 불러오는 부분
  const { evaluationList, status, error: evaluationError } = useSelector((state: RootState) => state.eval);

  useEffect(() => {
    dispatch(fetchApplicantsEvaluations({ recruitmentId, passed: true }));
  }, [dispatch, recruitmentId]);

  console.log(recruitmentId+"aaaaa");
  console.log(evaluationList);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recruitmentId) return <div>No recruitment found</div>;

  return <>
    <MainContainer>
        {/* 섹션 제목 */}
        <SectionTitle>합격 명단</SectionTitle>
        <SectionLine />
        <TextBox>
          <SmallTitle>
            직무
          </SmallTitle>
          <SmallContent>
            {evaluationData?.job}
          </SmallContent>
        </TextBox>
        {
          evaluationList.length > 0 ?
          <ApplicantTableContainer
            applicantList={evaluationList}
            pass={true}
            recruitmentId={recruitmentId}
            isResultPage={false} 
          />
          :
          <>
          </>
        }
      <FooterLine />
    </MainContainer>
  </>;
}
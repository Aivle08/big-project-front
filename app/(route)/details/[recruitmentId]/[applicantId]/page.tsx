"use client";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import { 
    CenterRow,
    FloatingButton, 
    InfoRow, 
    MainContainer, 
    QuestionListItem, 
    QuestionListSection, 
    QuestionSection, 
    QustionTitle, 
    Section, 
    SectionHeader, 
    SectionLine, 
    SectionTitle, 
    SmallTitle, 
    TextContent, 
    YellowButton 
} from "../../styles/pageStyled";
import ResumeModal from "@/components/ResumeModal";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicantEvaluation } from "@/app/redux/features/evaluationSlice";

interface Props {
    params: Promise<{
      recruitmentId: string;
      applicantId: string;
    }>
  }
  
export default function Details({ params }: Props) {
    const resolvedParams = use(params);
    const dispatch = useDispatch<AppDispatch>();
    // const { scoreDetails, status, error } = useSelector((state: RootState) => state.eval);
    const { evaluationList, status, error } = useSelector((state: RootState) => state.eval);
    const recruitmentId = Number(resolvedParams.recruitmentId);
    const applicantId = Number(resolvedParams.applicantId);

    const [questions, setQuestions] = useState<string[]>([]);
    const [questionsVisible, setQuestionsVisible] = useState(false);

    useEffect(() => {
        console.log('Details component params:', { recruitmentId, applicantId }); // 디버깅용
        if (recruitmentId && applicantId) {
            dispatch(fetchApplicantEvaluation({ recruitmentId, applicantId }));
        }
    }, [dispatch, recruitmentId, applicantId]);

    const handleGenerateQuestions = () => {
        // 기본 질문 리스트 - 나중에 API로 대체 가능
        const defaultQuestions = [
        '본인을 간단히 소개해주세요.',
        '가장 어려웠던 프로젝트와 그 문제를 어떻게 해결했는지 설명해주세요.',
        "팀 프로젝트에서 발생했던 갈등 상황을 공유하고, 이를 어떻게 해결했는지 말씀해주세요.",
        "지금까지의 경험 중 지원하신 직무에 가장 적합한 사례를 이야기해주세요.",
        "우리 회사에서 이루고 싶은 목표는 무엇이며, 그를 위해 어떻게 기여할 수 있다고 생각하나요?"
        ];
        setQuestions(defaultQuestions);
        setQuestionsVisible(true);
    };

    // if (status === 'loading') return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    // if (!evaluationList || !evaluationList.length) return <div>No data available</div>;
   if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!evaluationList) return <div>No data available</div>;

    const applicant = evaluationList[0];
    console.log('Applicant data:', applicant); // 디버깅용

    return (

        <MainContainer>
            <TextContent>
                {/* 이름은 사이즈 좀 키우기 */}
                <div className="flex items-center">
                    <SectionTitle>지원자  {applicant.applicationName}  상세사항</SectionTitle>
                </div>
                <SectionLine />

                <Section></Section>

                {applicant.scoreDetails.map((detail, index) => (
                <React.Fragment key={index}>
                    <InfoRow>
                    <SmallTitle>{detail.title}</SmallTitle>
                    <p className="text-gray-600">{detail.score}점</p>
                    </InfoRow>
                    <p>{detail.summary}</p>
                    <Section></Section>
                </React.Fragment>
                ))}
            </TextContent>

            <CenterRow>
                <YellowButton 
                className="mt-[10vh]"
                onClick={handleGenerateQuestions}
                >질문 생성</YellowButton>
            </CenterRow>

            <FloatingButton>
                <div>
                    <ResumeModal
                        name={applicant.applicationName}
                        recruitmentId={recruitmentId}
                        applicantId={applicantId}
                    />
                </div>
            </FloatingButton>

            <TextContent>
                <SectionHeader className="mt-[1vh]">
                    
                    <SectionTitle>질문 리스트</SectionTitle>
                    <SectionLine />
                </SectionHeader>
                
                {/* figma에서는 흰색 네모이나, 구문을 위해 회색 네모로 해둠. */}
                {/* 추후 변경 필요 */}
                {/* {questionsVisible && (
                    <QuestionSection>
                    <QustionTitle>맞춤 질문 리스트</QustionTitle>
                    <QuestionListSection>
                        {questions.questions.map((question, index) => (
                        <QuestionListItem
                            key={index}
                        >
                            <p>{`${question}`}</p>
                        </QuestionListItem>
                        ))}
                    </QuestionListSection>
                    </QuestionSection>
                )} */}


            {questionsVisible && (
            <QuestionSection>
                <QustionTitle>맞춤 질문 리스트</QustionTitle>
                <QuestionListSection>
                {questions.map((question, index) => (
                    <QuestionListItem key={index}>
                    <p>{question}</p>
                    </QuestionListItem>
                ))}
                </QuestionListSection>
            </QuestionSection>
            )}
            </TextContent>
        </MainContainer>
    );
}

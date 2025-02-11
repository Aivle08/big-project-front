"use client";
import React, { use, useEffect, useState } from "react";
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
  YellowButton,
} from "../../styles/pageStyled";
import ResumeModal from "@/components/ResumeModal";

interface Props {
  params: Promise<{
    recruitmentId: string;
    applicantId: string;
  }>;
}

interface QuestionCategory {
  title: string;
  finalQuestion: string[];
  chunk: string[];
}


export default function Details({ params }: Props) {
  const resolvedParams = use(params);
  const recruitmentId = Number(resolvedParams.recruitmentId);
  const applicantId = Number(resolvedParams.applicantId);

  // API 호출 관련 상태
  // const [applicantData, setApplicantData] = useState<ApplicantData | null>(null);
  const [applicantData, setApplicantData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 질문 생성 관련 상태
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionsVisible, setQuestionsVisible] = useState(false);

  useEffect(() => {
    console.log("Details component params:", { recruitmentId, applicantId }); // 디버깅용
    if (recruitmentId && applicantId) {
      fetch(`http://localhost:8080/api/v1/recruitment/${recruitmentId}/applicant/${applicantId}`, {
        headers: {
          accept: "*/*",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched data:", data);
          setApplicantData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setFetchError(error.message || "An error occurred");
          setLoading(false);
        });
    }
  }, [recruitmentId, applicantId]);

  const handleGenerateQuestions = () => {
    // 임시 데이터 구조
    const mockQuestions: QuestionCategory[] = [
      {
        title: "직무",
        finalQuestion: [
          "현재 지원하신 직무와 관련된 전문 지식이나 기술을 어떻게 습득하셨나요?",
          "이 직무에서 가장 중요하다고 생각하는 역량은 무엇이며, 그 이유는 무엇인가요?"
        ],
        chunk: ["string"]
      },
      {
        title: "경험",
        finalQuestion: [
          "지금까지의 경험 중 가장 도전적이었던 순간은 언제였으며, 어떻게 극복하셨나요?",
          "팀 프로젝트에서 맡았던 역할과 그 과정에서 배운 점을 공유해주세요."
        ],
        chunk: ["string"]
      },
      {
        title: "일",
        finalQuestion: [
          "업무 수행 시 우선순위를 어떻게 결정하시나요?",
          "스트레스가 많은 상황에서 본인만의 업무 관리 방법은 무엇인가요?"
        ],
        chunk: ["string"]
      }
    ];

    setQuestions(mockQuestions);
    setQuestionsVisible(true);
  };


  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;
  if (!applicantData) return <div>No data available</div>;

  const applicant = applicantData; // API에서 반환된 데이터

  return (
    <MainContainer>
      <TextContent>
        {/* 이름은 사이즈 좀 키우기 */}
        <div className="flex items-center">
          <SectionTitle>지원자 {applicant.applicantName} 상세사항</SectionTitle>
        </div>
        <SectionLine />

        <Section></Section>

        {applicant.scoreDetails.map((detail: any, index: number) => (
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
        <YellowButton className="mt-[10vh]" onClick={handleGenerateQuestions}>
          질문 생성
        </YellowButton>
      </CenterRow>

      <FloatingButton>
        <div>
          <ResumeModal
            name={applicant.applicantName}
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

        {questionsVisible && (
          <QuestionSection>
            {questions.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-6">
                <QustionTitle>{category.title}</QustionTitle>
                <QuestionListSection>
                  {category.finalQuestion.map((question, questionIndex) => (
                    <QuestionListItem key={questionIndex}>
                      <p>{question}</p>
                    </QuestionListItem>
                  ))}
                </QuestionListSection>
              </div>
            ))}
          </QuestionSection>
        )}

        {/* {questionsVisible && (
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
        )} */}
      </TextContent>
    </MainContainer>
  );
}

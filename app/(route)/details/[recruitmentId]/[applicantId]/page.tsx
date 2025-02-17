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
      fetch(`https://picks-up.site/api/v1/recruitment/${recruitmentId}/applicant/${applicantId}`, {
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

  const handleGenerateQuestions = async () => {
    try {
      console.log("start")
      // POST 요청 보내기 (요청 본문은 curl에서 -d ''로 빈 값 전송하므로, 여기서는 빈 객체로 전송)
      const response = await fetch("https://picks-up.site/api/v1/ai-api/"+applicantId+"/question", {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}) // 요청 본문이 필요없다면 빈 객체 혹은 빈 문자열("") 전송
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // API 응답을 JSON 형태로 파싱 (응답 형식에 따라 조정)
      const data: QuestionCategory[] = await response.json();
  
      // 받아온 질문 데이터를 상태에 저장하고, 질문 리스트 보이도록 설정
      setQuestions(data);
      setQuestionsVisible(true);
    } catch (error) {
      console.error("Error generating questions:", error);
    }
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
            pdfUrl={applicantId}
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
      </TextContent>
    </MainContainer>
  );
}
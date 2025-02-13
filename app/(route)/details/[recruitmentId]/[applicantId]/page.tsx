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

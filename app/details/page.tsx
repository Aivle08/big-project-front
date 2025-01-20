"use client";
import { 
    FloatingButton, 
    MainContainer, 
    QustionTitle, 
    SectionHeader, 
    SectionLine, 
    SectionTitle, 
    SmallTitle, 
    TextContent, 
    YellowButton 
} from "./styles/pageStyled";
import ResumeModal from "@/components/ResumeModal";
import React, { useState } from "react";

export default function Home() {
    type Summary = {
        name: string; // 이름
        summary: string; // 요약
        educationScore: number; 
        education: string; 
        teamFitScore: number; 
        teamFit: string;
        activityScore: number;
        activity: string;
        experienceScore: number;
        experience: string
    };

    // 나중에 요청 후 받아오는 방식으로 변경 필요.
    const getSummary = (): Summary => {
        // 예시 데이터 반환
        return {
            name: "홍길동",
            summary: "React와 Next.js를 활용한 프론트엔드 개발 경력 5년 이상.",
            educationScore: 85,
            education: `
                서울대학교 컴퓨터공학과 졸업 (2015 ~ 2019)
                - 데이터 구조 및 알고리즘, 운영체제, 네트워크 등 기초 CS 지식 수강
                - 학부 연구생으로 참여하여 머신러닝 기반의 이미지 분석 연구 수행
                - 교내 IT 동아리 활동: 팀 프로젝트로 IoT 기반 스마트홈 애플리케이션 개발
            `,
            teamFitScore: 90,
            teamFit: `
                - 팀 내에서 상호 존중과 개방적인 커뮤니케이션을 중시
                - 애자일 프로세스에서 협업 경험: 데일리 스크럼, 리뷰 및 회고에 적극적으로 참여
                - 목표 지향적인 태도로 어려운 프로젝트에서도 해결책을 찾아냄
                - 동료들로부터 '책임감이 강하고 신뢰할 수 있는 팀원'이라는 평가를 받음
            `,
            activityScore: 75,
            activity: `
                - 구글 코드잼 준결승 진출 (2019): 문제 해결 능력과 알고리즘 설계 능력을 입증
                - TOEIC 980점: 영어 실력을 기반으로 해외 협업 프로젝트 참여 가능
                - 정보처리기사 자격증 취득 (2020): 소프트웨어 개발 및 IT 지식의 전문성을 증명
                - 교내 해커톤에서 '최우수상' 수상 (2018): 스마트 시티 관리 시스템 개발
                - 봉사활동: IT 교육 봉사 (2017 ~ 2018), 초등학생 대상의 기초 프로그래밍 교육
            `,
            experienceScore: 95,
            experience: `
                - 네이버 프론트엔드 개발팀 (2019 ~ 2022)
                  - 주요 서비스 UI/UX 개선 및 유지보수
                  - 웹 성능 최적화로 페이지 로드 속도를 평균 20% 개선
                  - React, Redux를 활용한 대규모 프로젝트 참여
                
                - 카카오페이 프론트엔드 엔지니어 (2022 ~ 현재)
                  - 신규 서비스 런칭 참여: 사용자 맞춤형 결제 페이지 설계 및 개발
                  - TypeScript 도입 및 코드베이스 표준화로 유지보수성 향상
                  - 협업 툴을 활용하여 기획, 디자이너와의 원활한 협업 주도
            `
        };
    };

    const summary = getSummary();

    // 질문 생성
    const [questionsVisible, setQuestionsVisible] = useState(false);

    const handleGenerateQuestions = () => {
      setQuestionsVisible(true);
    };

    return (
        <>
            <MainContainer>
                <TextContent className="border">
                    <SectionHeader className="mt-[1vh]">
                        <SectionTitle>상세사항</SectionTitle>
                        <SectionLine />
                    </SectionHeader>
                    <div className="flex justify-between items-center">
                        <SmallTitle>학력</SmallTitle>
                        <p className="text-gray-600">{summary.educationScore}점</p>
                    </div>
                    <p>{summary.education}</p>
                    <div className="flex justify-between items-center">
                        <SmallTitle>인재상</SmallTitle>
                        <p className="text-gray-600">{summary.teamFitScore}점</p>
                    </div>
                    <p>{summary.teamFit}</p>
                    <div className="flex justify-between items-center">
                        <SmallTitle>대외활동 + 수상내역 + 어학 + 자격증</SmallTitle>
                        <p className="text-gray-600">{summary.activityScore}점</p>
                    </div>
                    <p>{summary.activity}</p>
                    <div className="flex justify-between items-center">
                        <SmallTitle>경력</SmallTitle>
                        <p className="text-gray-600">{summary.experienceScore}점</p>
                    </div>
                    <p>{summary.experience}</p>
                </TextContent>
                <div className="flex justify-center items-center">
                    <YellowButton 
                    className="mt-[10vh]"
                    onClick={handleGenerateQuestions}
                    >질문 생성</YellowButton>
                </div>

                <FloatingButton>
                    <div className="mt-1">
                        <ResumeModal
                            name={"유창현"}
                            pdfUrl={"/File.pdf"} 
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
                    {questionsVisible && (
                      <div className="bg-gray-100 rounded-md p-4 shadow-md mt-10 max-h-[70vh]">
                        <QustionTitle>맞춤 질문 리스트</QustionTitle>
                        <div className="max-h-[57vh] mt-5 overflow-y-auto">
                          {[...Array(5)].map((_, index) => (
                            <div
                              key={index}
                              className="bg-gray-200 rounded-md p-3 shadow-sm flex items-center justify-between my-1"
                            >
                              <p>질문 {index + 1}: 다른 사람들은 지원자님을 어떤 사람이라고 이야기하나요?</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </TextContent>
            </MainContainer>
        </>
    );
}

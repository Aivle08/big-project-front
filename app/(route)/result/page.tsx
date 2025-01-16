'use client'

import { useEffect, useState } from "react";
import { Box1, Box2, Box3, Container, EvaluationInput, InputContent, Label1, Label2, Left, Right, Section, SectionLine, SubLabel, Title } from "./styles/Page.styled"


export default function Result() {

  // 일단 더미 데이터 넣어놓으려고 해놓음
  const [evaluationData, setEvaluationData] = useState({
    id: 1,
    title: "백엔드 개발자",
    job: "서버 개발 및 데이터베이스 관리",
    evaluationList: [
      {
        id: 1,
        item: "채용 공고",
        detail: "서버 개발 및 시스템 아키텍처 설계를 담당할 백엔드 개발자를 모집합니다. Java/Spring 기반의 서버 개발 경험이 있으며, MSA 환경에서의 개발 경험이 있는 분을 우대합니다. 데이터베이스 설계 및 최적화 능력이 필요합니다."
      },
      {
        id: 2,
        item: "인재상",
        detail: "새로운 기술에 대한 지속적인 학습 의지가 있고, 팀원들과의 원활한 커뮤니케이션이 가능한 인재를 찾습니다. 문제 해결에 대한 적극적인 태도와 책임감 있는 업무 수행이 가능한 분을 선호합니다."
      },
      {
        id: 3,
        item: "학력",
        detail: "컴퓨터공학 또는 관련 학과 학사 이상 (석사 우대). 전공자가 아니더라도 관련 분야에서의 실무 경험이 풍부하다면 지원 가능합니다."
      },
      {
        id: 4,
        item: "대외활동/수상내역/어학/자격증",
        detail: "정보처리기사 자격증 소지자 우대, AWS/GCP 등 클라우드 관련 자격증 보유자 우대. TOEIC 700점 이상 또는 이에 준하는 어학 성적 보유자 선호. 개발 관련 대회 수상 경력이 있다면 가점."
      },
      {
        id: 5,
        item: "경력",
        detail: "3년 이상의 백엔드 개발 경력 필수. Spring Framework 기반 개발 경험 3년 이상, RESTful API 설계 및 개발 경험, MySQL/PostgreSQL 등 RDBMS 활용 경험이 필요합니다."
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출 로직은 나중에
        // const response = await fetch('/api/evaluation/1');
        // const data = await response.json();
        // setEvaluationData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 의존성 배열 수정

  const getDetailByItem = (itemName: string) => {
    const evaluation = evaluationData.evaluationList.find(
      item => item.item === itemName
    );
    return evaluation?.detail || "";
  };


  return (
    <Container>
      <Title>이력서 분석 및 평가 결과</Title>
      <SectionLine></SectionLine>
      <Section></Section>

      <Section>
        <Label1>직무</Label1>
        <SubLabel>2024년 하반기 CJ제일제당(식품/공통부문) 신입사원</SubLabel>
      </Section>

      <Section></Section>
      <Section>
        <Label1>평가 항목</Label1>
        <br />  

        <EvaluationInput>
          {/* 1. 채용 공고 */}
          <Section>
            <Label2>채용 공고</Label2>
            <InputContent> {getDetailByItem("채용 공고")}</InputContent>
          </Section>
          {/* 2. 인재상 */}
          <Section>
            <Label2>인재상</Label2>
            <InputContent> {getDetailByItem("인재상")}</InputContent>
          </Section>
          {/* 3. 학력 */}
          <Section>
            <Label2>학력</Label2>
            <InputContent> {getDetailByItem("학력")}</InputContent>
          </Section>
          {/* 4. 대외활동 + 수상내역 + 어학 + 대외활동 */}
          <Section>
            <Label2>대외활동&nbsp;/&nbsp;수상내역&nbsp;/&nbsp;어학&nbsp;/&nbsp;자격증</Label2>
            <InputContent> {getDetailByItem("대외활동/수상내역/어학/자격증")}</InputContent>
          </Section>
          {/* 5. 경력 */}
          <Section>
            <Label2>경력</Label2>
            <InputContent>{getDetailByItem("경력")}</InputContent>
          </Section>     
        </EvaluationInput>

    </Section>

    <Section></Section>

    <Section>
      <Left>
        <Box1></Box1>
      </Left>

      <Right>
        <Box2></Box2>

        <Box3></Box3>
        
      </Right>


    </Section>


    <Section>
      <Label1>평점 리스트</Label1>

      
    </Section>





    </Container>


  )
}
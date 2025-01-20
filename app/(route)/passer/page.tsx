"use client"

import React from 'react';
import Image from 'next/image';
import {
  MainContainer,
  SectionHeader,
  SectionLine,
  SectionTitle,
  TextBox,
  TableContainer,
  TableHeader,
  AverageRow,
  ApplicantRow,
  ImageCell,
  FooterLine,
  BoldCell,
  Cell,
  SmallTitle,
  SmallContent,
} from './styles/pageStyled';

export default function Home() {
    // 지원자 데이터
    type Applicant = {
        name: string; // 이름
        jobFit: number; // 채용공고 부합
        idealCandidate: number; // 인재상
        education: number; // 학력
        extracurricular: number; // 대외활동 및 기타
        experience: number; // 경력
        overallScore: number; // 종합 평점
    };

    // 지원자 목록 생성성
    const renderApplicantRows = (applicants: Applicant[]) => {
        return applicants.map((applicant, idx) => (
            <ApplicantRow key={idx}>
                <ImageCell>
                    <button>
                        <Image
                            src="/paper.png"
                            alt="Resume Link"
                            layout="intrinsic"
                            width={24}
                            height={24}
                            className="object-cover"
                        />
                    </button>
                </ImageCell>
                <Cell>{applicant.name}</Cell>
                <Cell>{applicant.jobFit}</Cell>
                <Cell>{applicant.idealCandidate}</Cell>
                <Cell>{applicant.education}</Cell>
                <Cell>{applicant.extracurricular}</Cell>
                <Cell>{applicant.experience}</Cell>
                <Cell>{applicant.overallScore}</Cell>
                <ImageCell>
                    <button>
                        <Image
                            src="/details_icon.png"
                            alt="Details"
                            layout="intrinsic"
                            width={27}
                            height={27}
                            className="object-cover"
                        />
                    </button>
                </ImageCell>
            </ApplicantRow>
        ));
    };

    // 임시 데이터
    const mockApplicants: Applicant[] = [
        {
            name: '유창현',
            jobFit: 4.5,
            idealCandidate: 4.2,
            education: 4.8,
            extracurricular: 4.0,
            experience: 4.3,
            overallScore: 4.7,
        },
        {
            name: '유창현',
            jobFit: 4.0,
            idealCandidate: 4.1,
            education: 4.6,
            extracurricular: 4.3,
            experience: 4.1,
            overallScore: 4.4,
        },
        {
            name: '유창현',
            jobFit: 4.5,
            idealCandidate: 4.2,
            education: 4.8,
            extracurricular: 4.0,
            experience: 4.3,
            overallScore: 4.7,
        },
        {
            name: '유창현',
            jobFit: 4.0,
            idealCandidate: 4.1,
            education: 4.6,
            extracurricular: 4.3,
            experience: 4.1,
            overallScore: 4.4,
        },
        {
            name: '유창현',
            jobFit: 4.5,
            idealCandidate: 4.2,
            education: 4.8,
            extracurricular: 4.0,
            experience: 4.3,
            overallScore: 4.7,
        },
        {
            name: '유창현',
            jobFit: 4.0,
            idealCandidate: 4.1,
            education: 4.6,
            extracurricular: 4.3,
            experience: 4.1,
            overallScore: 4.4,
        },
        {
            name: '유창현',
            jobFit: 4.5,
            idealCandidate: 4.2,
            education: 4.8,
            extracurricular: 4.0,
            experience: 4.3,
            overallScore: 4.7,
        },
        {
            name: '유창현',
            jobFit: 4.0,
            idealCandidate: 4.1,
            education: 4.6,
            extracurricular: 4.3,
            experience: 4.1,
            overallScore: 4.4,
        },
        {
            name: '유창현',
            jobFit: 4.5,
            idealCandidate: 4.2,
            education: 4.8,
            extracurricular: 4.0,
            experience: 4.3,
            overallScore: 4.7,
        },
        {
            name: '유창현',
            jobFit: 4.0,
            idealCandidate: 4.1,
            education: 4.6,
            extracurricular: 4.3,
            experience: 4.1,
            overallScore: 4.4,
        },
    ];

    return (
        <>
            <MainContainer>
                {/* 섹션 제목 */}
                <SectionHeader className="mt-[10vh]">
                    <SectionTitle>합격 명단</SectionTitle>
                    <SectionLine />
                </SectionHeader>

                <TextBox>
                    <SmallTitle>
                        직무
                    </SmallTitle>
                    <SmallContent>
                        2024년 하반기 CJ제일제당(식품/공통부문) 신입사원
                    </SmallContent>
                </TextBox>

                <div className="relative">
                    {/* 테이블 */}
                    <TableContainer>
                        {/* 헤더 */}
                        <TableHeader>
                            <BoldCell></BoldCell>
                            <BoldCell>이름</BoldCell>
                            <BoldCell>채용공고 부합</BoldCell>
                            <BoldCell>인재상</BoldCell>
                            <BoldCell>학력</BoldCell>
                            <BoldCell>대외활동 및 기타</BoldCell>
                            <BoldCell>경력</BoldCell>
                            <BoldCell>종합 평점</BoldCell>
                            <BoldCell>상세</BoldCell>
                        </TableHeader>

                        {/* 평균 점수 행 */}
                        <AverageRow>
                            <Cell></Cell>
                            <BoldCell>평균점수</BoldCell>
                            <Cell>5.0</Cell>
                            <Cell>5.0</Cell>
                            <Cell>5.0</Cell>
                            <Cell>5.0</Cell>
                            <Cell>5.0</Cell>
                            <Cell>5.0</Cell>
                            <Cell></Cell>
                        </AverageRow>

                        {/* 지원자 행 */}
                        {renderApplicantRows(mockApplicants)}
                    </TableContainer>
                </div>

                {/* 하단 라인 */}
                <FooterLine />
            </MainContainer>
        </>
    );
}

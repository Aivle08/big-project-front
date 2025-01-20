"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { CloseButton, ModalBackground, ModalContainer, ModalHeader, ModalSubtitle, ModalTitle, 
    SectionHeader, SectionLine, SectionTitle, TitleContainer, SmallTitle, TextContent } from "./styles/modalStyled";

type DetailsModalProps = {
    name: string;
    summary: string;
    education: string;
    teamFit: string;
    activity: string;
    experience: string;
    educationScore: number;
    teamFitScore: number;
    activityScore: number;
    experienceScore: number;
  };

export default function DetailsModal(
    { name, summary, education, teamFit, activity, experience, 
        educationScore, teamFitScore, activityScore, experienceScore }
    :DetailsModalProps
) {
  const [openModal, setModal] = useState(false);
  
  const handleModal = () => {
    setModal(!openModal);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleModal}
      >
        <Image
            src="/paper.png"
            alt="Resume Link"
            layout="intrinsic"
            width={24}
            height={24}
            className="object-cover"
        />
      </button>
      {openModal && (
        <ModalBackground>
          <ModalContainer>
            {/* 위쪽 영역 */}
            <ModalHeader>
              <TitleContainer>
                <ModalTitle>{name}</ModalTitle>
                <ModalSubtitle>지원자</ModalSubtitle>
              </TitleContainer>
              <CloseButton onClick={handleModal}>
                <Image src="/modalclose_icon.png" alt="close" width={32} height={32} />
              </CloseButton>
            </ModalHeader>
              {/* 내부 콘텐츠 */}
              <TextContent>
                
                <SectionHeader className="mt-[1vh]">
                  <SectionTitle>이력서 요약</SectionTitle>
                  <SectionLine />
                </SectionHeader>

                <p className='mt-5'>{summary}</p>
                <SectionHeader className="mt-[1vh]">
                  <SectionTitle>평가 항목</SectionTitle>
                  <SectionLine />
                </SectionHeader>

                <div className="flex justify-between items-center">
                    <SmallTitle>학력</SmallTitle>
                    <p className="text-gray-600">{educationScore}점</p>
                </div>
                <p>
                  {education}
                </p>

                <div className="flex justify-between items-center">
                    <SmallTitle>인재상</SmallTitle>
                    <p className="text-gray-600">{teamFitScore}점</p>
                </div>
                <p>
                  {teamFit}
                </p>

                <div className="flex justify-between items-center">
                    <SmallTitle>대외활동 + 수상내역 + 어학 + 자격증</SmallTitle>
                    <p className="text-gray-600">{activityScore}점</p>
                </div>
                <p>
                  {activity}
                </p>

                <div className="flex justify-between items-center">
                    <SmallTitle>경력</SmallTitle>
                    <p className="text-gray-600">{experienceScore}점</p>
                </div>
                <p>
                  {experience}
                </p>
              </TextContent>
            </ModalContainer>
          </ModalBackground>
        )}
      </div>
  )
}
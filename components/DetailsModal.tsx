"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { CloseButton, ModalBackground, ModalContainer, ModalHeader, ModalSubtitle, ModalTitle, 
    SectionHeader, SectionLine, SectionTitle, TitleContainer, SmallTitle, TextContent, 
    SectionTitle2,
    SectionLine2,
    SmallTitle2} from "./styles/modalStyled";
import modalClose from '@/public/images/modalclose_icon.png';

type DetailsModalProps = {
    name: string;
    summary: string;
    jobFit: string;
    education: string;
    teamFit: string;
    activity: string;
    experience: string;
    jobFitScore: number;
    educationScore: number;
    teamFitScore: number;
    activityScore: number;
    experienceScore: number;
  };

export default function DetailsModal(
    { name, summary, jobFit, education, teamFit, activity, experience, 
        jobFitScore, educationScore, teamFitScore, activityScore, experienceScore }
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
       className="hover:text-blue-600 font-bold w-full"
     >
       {name}
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
                <Image src={modalClose} alt="close" width={32} height={32} />
              </CloseButton>
            </ModalHeader>
              {/* 내부 콘텐츠 */}
              <TextContent>
                
                <SectionHeader className="mt-[1vh]">
                  <SectionTitle2>이력서 요약</SectionTitle2>
                  <SectionLine2 />
                </SectionHeader>

                <p className='mt-5'>{summary}</p>
                <SectionHeader className="mt-[1vh]">
                  <SectionTitle2>평가 항목</SectionTitle2>
                  <SectionLine2 />
                </SectionHeader>

                <div className="flex justify-between items-center">
                    <SmallTitle2>채용 공고</SmallTitle2>
                    <p className="text-gray-600">{jobFitScore}점</p>
                </div>
                <p className='text-left ml-3 my-2'>
                  {jobFit}
                </p>

                <div className="flex justify-between items-center">
                    <SmallTitle2>학력</SmallTitle2>
                    <p className="text-gray-600">{educationScore}점</p>
                </div>
                <p className='text-left ml-3 my-2'>
                  {education}
                </p>

                <div className="flex justify-between items-center">
                    <SmallTitle2>인재상</SmallTitle2>
                    <p className="text-gray-600">{teamFitScore}점</p>
                </div>
                <p className='text-left ml-3 my-2'>
                  {teamFit}
                </p>

                <div className="flex justify-between items-center">
                    <SmallTitle2>대외활동 + 수상내역 + 어학 + 자격증</SmallTitle2>
                    <p className="text-gray-600">{activityScore}점</p>
                </div>
                <p className='text-left ml-3 my-2'>
                  {activity}
                </p>

                <div className="flex justify-between items-center">
                    <SmallTitle2>경력</SmallTitle2>
                    <p className="text-gray-600">{experienceScore}점</p>
                </div>
                <p className='text-left ml-3 my-2'>
                  {experience}
                </p>
              </TextContent>
            </ModalContainer>
          </ModalBackground>
        )}
      </div>
  )
}
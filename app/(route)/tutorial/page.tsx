"use client"

import React from 'react';
import { BackgroundSection, CenteredHeading, CenterHeadSection, Heading, HeroBackground, HeroTextSection, ImageContainer, LargeParagraph, MainContainer, Paragraph, SectionContainer, TextBox, YellowBox } from './styles/pageStyled';
import Image from 'next/image';
import big1 from "../../../public/images/big_1.png";
import big2 from "../../../public/images/big_2.png";
import image115 from "../../../public/images/image115.png";
import image120 from "../../../public/images/image120.png";


export default function Home() {
  return (
    <>
        {/* 배경과 텍스트 */}
        <HeroBackground>
            <HeroTextSection>
                <Heading
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    기업의 채용 시스템에 도움을 주는 최고의 서비스
                </Heading>
                <Paragraph
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    기업의 채용 기준에 따른 종합적인 점수 부여와 인재상에 맞는지 여부에 따라 지원자를 <br/>
                    평가하는 데 도움을 줍니다. 또한, 이력서와 포트폴리오를 세밀하게 분석해 채용 면접 시 <br/>
                    필요한 질문 리스트를 출력합니다. <br/>
                </Paragraph>
            </HeroTextSection>
        </HeroBackground>
        <MainContainer>
            {/* 중앙 텍스트 */}
            <CenterHeadSection>
                <CenteredHeading
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    채용 기준에 맞게 지원자를 평가하고<br />
                    면접 질문 리스트를 만들어<br />
                    최적의 인재 선발에 도움을 제공합니다.
                </CenteredHeading>
            </CenterHeadSection>
            
            {/* 왼쪽 텍스트와 이미지 섹션 */}
            <SectionContainer
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1}}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
            >
                <ImageContainer>
                    <Image
                        src={big1}
                        alt="1"
                        layout="intrinsic"
                        width={100}
                        height={100}
                        className="object-cover"
                    />
                </ImageContainer>
                <TextBox>
                    <Heading>이력서 분석 및 평가</Heading>
                    <Paragraph>
                        지원자의 이력서를 업로드 한 후, 평가 항목을 작성해 평가 기준을 정해줍니다.
                    </Paragraph>
                </TextBox>
            </SectionContainer>
            
            {/* 오른쪽 텍스트와 배경 */}
            <BackgroundSection className='mt-40'>
                <LargeParagraph className="mr-[15vw]"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    AI를 이용한 <br />
                    이력서 분석 및 평가 결과를 <br />
                    제공합니다.
                </LargeParagraph>
                <ImageContainer
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <YellowBox className="top-[-16vh] right-0 w-[32vw] h-[70vh]" />
                    <Image
                        src={image115}
                        alt="2"
                        layout="intrinsic"
                        width={400}
                        height={400}
                        className="object-cover relative z-10 mt-[-7vh]"
                    />
                </ImageContainer>
            </BackgroundSection>
            
            {/* 두 번째 benefit 섹션 */}
            <SectionContainer
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1}}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
            >
                <ImageContainer>
                    <Image
                        src={big2}
                        alt="2"
                        layout="intrinsic"
                        width={100}
                        height={100}
                        className="object-cover"
                    />
                </ImageContainer>
                <TextBox>
                    <Heading>면접 질문리스트를 제공</Heading>
                    <Paragraph>
                        지원자의 이력서를 바탕으로 채용 면접에 활용할 질문리스트를 출력합니다.
                    </Paragraph>
                </TextBox>
            </SectionContainer>
            
            {/* 오른쪽 텍스트와 이미지 */}
            <BackgroundSection>
                <LargeParagraph className="mr-[15vw]"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    각 면접자에 알맞는<br />
                    AI 맞춤 질문을<br />
                    항목별로 제공합니다.
                </LargeParagraph>
                <ImageContainer
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <YellowBox className="top-[-5.5vh] right-[0] w-[30vw] h-[60vh]" />
                    <Image
                        src={image120}
                        alt="question list"
                        layout="intrinsic"
                        width={400}
                        height={400}
                        className="object-cover relative z-10"
                    />
                </ImageContainer>
            </BackgroundSection>
        </MainContainer>
    </>
  );
}
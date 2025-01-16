import React from 'react';
import { BackgroundSection, CenteredHeading, Heading, HeroBackground, HeroTextSection, ImageContainer, LargeParagraph, MainContainer, Paragraph, SectionContainer, TextBox, YellowBox } from './styles/pageStyled';
import Image from 'next/image';

export default function Home() {
  return (
    <>
        <MainContainer>
            {/* 배경과 텍스트 */}
            <HeroBackground>
                <HeroTextSection>
                    <Heading>
                        기업의 채용 시스템에 도움을 주는 최고의 서비스
                    </Heading>
                    <Paragraph>
                        기업의 채용 기준에 따른 종합적인 점수 부여와 인재상에 맞는지 여부에 따라 지원자를 <br/>
                        평가하는 데 도움을 줍니다. 또한, 이력서와 포트폴리오를 세밀하게 분석해 채용 면접 시 <br/>
                        필요한 질문 리스트를 출력합니다. <br/>
                    </Paragraph>
                </HeroTextSection>
            </HeroBackground>
            
            {/* 중앙 텍스트 */}
            <div className="flex justify-center items-center mt-[30vh]">
                <CenteredHeading>
                    채용 기준에 맞게 지원자를 평가하고<br />
                    면접 질문 리스트를 만들어<br />
                    최적의 인재 선발에 도움을 제공합니다.
                </CenteredHeading>
            </div>
            
            {/* 왼쪽 텍스트와 이미지 섹션 */}
            <SectionContainer>
                <ImageContainer>
                    <Image
                        src="/big_1.png"
                        alt="1"
                        layout="intrinsic"
                        width={200}
                        height={200}
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
            <BackgroundSection>
                <LargeParagraph className="mr-96 ml-5">
                    AI를 이용한 <br />
                    이력서 분석 및 평가 결과를 <br />
                    제공합니다.
                </LargeParagraph>
                <ImageContainer>
                    <YellowBox className="top-[-20vh] right-[0] w-[50vw] h-[107.3vh]" />
                    <Image
                        src="/image115.png"
                        alt="2"
                        layout="intrinsic"
                        width={500}
                        height={500}
                        className="object-cover relative z-10"
                    />
                </ImageContainer>
            </BackgroundSection>
            
            {/* 두 번째 benefit 섹션 */}
            <SectionContainer>
                <ImageContainer>
                    <Image
                        src="/big_2.png"
                        alt="2"
                        layout="intrinsic"
                        width={200}
                        height={200}
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
            <BackgroundSection className="mt-60">
                <LargeParagraph className="mr-96 ml-5">
                    각 면접자에 알맞는<br />
                    AI 맞춤 질문을<br />
                    항목별로 제공합니다.
                </LargeParagraph>
                <ImageContainer>
                    <YellowBox className="top-[-2.8vh] right-[0] w-[40vw] h-[80vh]" />
                    <Image
                        src="/image120.png"
                        alt="question list"
                        layout="intrinsic"
                        width={500}
                        height={500}
                        className="object-cover relative z-10"
                    />
                </ImageContainer>
            </BackgroundSection>
        </MainContainer>
    </>
  );
}
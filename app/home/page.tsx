import Image from 'next/image';
import React from 'react';
import {
    MainContainer,
    GreetingContainer,
    GreetingText,
    GreetingContent,
    GreetingTitle,
    GreetingDescription,
    SectionHeader,
    SectionTitle,
    SectionLine,
    CardContainer,
    Card,
    CardDescriptionContainer,
    CardDescription,
    CardTitle,
    CardText,
    CardButton,
    CardButtonText,
    ImageContainer
  } from './styles/pageStyled';

export default function Home() {
  return (
    <>
      {/* navbar 자리 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
          minHeight: '80px',
          marginTop: '20px',
          backgroundColor: '#f0f0f0',
        }}
      ></div>

    <MainContainer>
      {/* 인사말 */}
      <GreetingContainer>
        <GreetingText>안녕하세요, 채용 시스템 어시스턴트 pick up 입니다.</GreetingText>
        <GreetingContent>
          <GreetingTitle>기업의 채용 시스템에 도움을 주는 최고의 서비스</GreetingTitle>
          <GreetingDescription>
            기업의 채용 기준에 따른 종합적인 점수 부여와 인재상에 맞는지 여부에 따라 지원자를 평가하는 데 도움을 줍니다.
            또한, 이력서와 포트폴리오를 세밀하게 분석해 채용 면접 시 필요한 질문 리스트를 출력합니다.
          </GreetingDescription>
        </GreetingContent>
      </GreetingContainer>

      {/* 서비스 단락 */}
      <SectionHeader>
        <SectionTitle>Service</SectionTitle>
        <SectionLine />
      </SectionHeader>

      {/* 첫째 카드 */}
      <CardContainer>
        <Card>
          <CardDescriptionContainer>
            <CardDescription>
              <CardTitle>채용 평가기준 반영 시스템</CardTitle>
              <CardText>
                이력서에 기재된 항목과 회사가 기입한 인재상 및 우대 사항 등을 기반으로 점수를 부여해 제공합니다.
              </CardText>
              <CardButton>
                <CardButtonText>Get Started</CardButtonText>
              </CardButton>
            </CardDescription>
          </CardDescriptionContainer>
          <ImageContainer className='rounded-tr-[24px] rounded-br-[24px]'>
            <Image src="/image_111.png" alt="Project Image" layout="fill" objectFit="cover" />
          </ImageContainer>
        </Card>
      </CardContainer>

      {/* 둘째 카드 */}
      <CardContainer>
        <Card className="flex-row-reverse">
          <CardDescriptionContainer>
            <CardDescription>
              <CardTitle className='w-[80%]'>채용 질문 생성 시스템</CardTitle>
              <CardText>
                채용 시 지원자의 포트폴리오와 이력서를 대조해 보다 구체적인 검증 질문 생성을 통해서 채용 면접 시 면접관의 업무에 편리함을 더합니다.
              </CardText>
              <CardButton>
                <CardButtonText>Get Started</CardButtonText>
              </CardButton>
            </CardDescription>
          </CardDescriptionContainer>
          <ImageContainer className='rounded-tl-[24px] rounded-bl-[24px]'>
            <Image src="/image_110.png" alt="Project Image" layout="fill" objectFit="cover" />
          </ImageContainer>
        </Card>
      </CardContainer>
    </MainContainer>

      {/* Footer 자리*/}
      <footer className="flex flex-col justify-center items-center w-full bg-gray-300 py-4">
        <div className="w-[192px] h-[102px] flex flex-col justify-center items-center gap-[32px]">
          <div className="w-full h-full border border-gray-500 flex items-center justify-center">
          </div>
        </div>
      </footer>
    </>
  );
}

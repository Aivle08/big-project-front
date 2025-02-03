"use client"

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
import Link from 'next/link';
import image111 from '@/public/images/image_111.png';
import image110 from '@/public/images/image_110.png';


export default function Home() {
  return (
    <>
    <MainContainer>
      {/* 인사말 */}
      <GreetingContainer
        initial={{ x: -200, opacity: 0 }} // 시작: 왼쪽으로 이동, 투명
        whileInView={{ x: 0, opacity: 1}} // whileInView : 뷰포트에 들어오면 실행할 것.
        transition={{
          duration: 1, // 애니메이션 지속 시간
          ease: "easeOut", // 부드러운 애니메이션
        }}
        viewport={{ once: true }}
      >
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
      <CardContainer
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Card>
          <CardDescriptionContainer>
            <CardDescription>
              <CardTitle>채용 평가기준 반영 <br />시스템</CardTitle>
              <CardText>
                이력서에 기재된 항목과 회사가 기입한 인재상 및 우대 사항 등을 기반으로 점수를 부여해 제공합니다.
              </CardText>
              <Link
                href='/login?form=signin'
                >
                  <CardButton>
                  <CardButtonText>Get Started</CardButtonText>
                </CardButton>
              </Link>
            </CardDescription>
          </CardDescriptionContainer>
          <ImageContainer className='rounded-tr-[24px] rounded-br-[24px]'>
            <Image src={image111} alt="Project Image" layout="fill" objectFit="cover" />
          </ImageContainer>
        </Card>
      </CardContainer>

      {/* 둘째 카드 */}
      <CardContainer
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Card className="flex-row-reverse">
          <CardDescriptionContainer>
            <CardDescription>
              <CardTitle className='w-[80%]'>채용 질문 생성 <br />시스템</CardTitle>
              <CardText>
                채용 시 지원자의 포트폴리오와 이력서를 대조해 보다 구체적인 검증 질문 생성을 통해서 채용 면접 시 면접관의 업무에 편리함을 더합니다.
              </CardText>
                <Link
                href='/login?form=signin'
                >
                <CardButton>
                  <CardButtonText>Get Started</CardButtonText>
                </CardButton>
                </Link>
            </CardDescription>
          </CardDescriptionContainer>
          <ImageContainer className='rounded-tl-[24px] rounded-bl-[24px]'>
            <Image src={image110} alt="Project Image" layout="fill" objectFit="cover" />
          </ImageContainer>
        </Card>
      </CardContainer>
    </MainContainer>
    </>
  );
}

import tw from 'tailwind-styled-components';
import { motion } from "framer-motion";

// 본 단락
export const MainContainer = tw.div`
  flex 
  flex-col 
  relative 
  justify-center 
  mx-[5vw] 
  px-[5vw] 
  items-center
`;

// 인사말 컨테이너
export const GreetingContainer = tw(motion.div)`
  absolute 
  left-[13vw] 
  top-[20vh] 
  w-[60vw] 
  h-[55vh] 
  flex 
  flex-col 
  items-start 
  p-0 
  gap-[1rem] 
`;

// 인사말 텍스트
export const GreetingText = tw.p`
  w-full 
  font-nunito 
  font-bold 
  text-[1.5rem] 
  leading-[2rem] 
  text-[#FDC435] 
`;

// 인사말 세부 컨텐츠
export const GreetingContent = tw.div`
  flex 
  flex-col 
  items-start 
  gap-[2rem] 
  w-full 
`;

// 인사말 제목
export const GreetingTitle = tw.h1`
  w-full 
  font-montserrat 
  font-bold 
  text-[4.5vw] 
  leading-[5vw] 
  text-[#25282B]
`;

// 인사말 설명
export const GreetingDescription = tw.p`
  w-full 
  font-nunito 
  font-normal 
  text-[1.7vw] 
  leading-[2.5vw] 
  text-[#828282]
`;

// 단락 제목
export const SectionHeader = tw.div`
  flex 
  flex-col 
  justify-center 
  items-center 
  mt-[85vh]
`;

export const SectionTitle = tw.div`
  text-[3vw] 
  font-bold 
  leading-[3vw] 
  text-center 
  text-[#25282B]
`;

export const SectionLine = tw.div`
  w-[7vw] 
  h-[0.5vh] 
  bg-[#FDC435] 
  rounded-[0.3vw]
`;

// 카드 컨테이너
export const CardContainer = tw(motion.div)`
  flex 
  justify-center 
  items-center 
  w-full 
  my-[10vh]
  flex-wrap
`;

// 카드
export const Card = tw.div`
  flex 
  flex-col 
  md:flex-row 
  items-start 
  w-[85vw] 
  max-w-[1020px]
  h-[72vh] 
  rounded-[2vw] 
  shadow-xl
`;

// 카드 설명 컨테이너
export const CardDescriptionContainer = tw.div`
  flex-1 
  bg-[#FFFFFF] 
  p-[3vw]
  flex 
  flex-col
  h-full
`;

// 카드 설명
export const CardDescription = tw.div`
  relative 
  flex 
  flex-col 
  items-start 
  gap-[1.5rem] 
`;

// 카드 제목
export const CardTitle = tw.h1`
  text-[#25282B] 
  font-bold 
  text-[2.5vw] 
  leading-[1.2]
`;

// 카드 텍스트
export const CardText = tw.p`
  text-[#828282] 
  font-normal 
  text-[1.2vw] 
  leading-[1.5]
`;

// 버튼
export const CardButton = tw.button`
  flex 
  items-center 
  px-[1.5vw] 
  py-[0.8vw] 
  border 
  border-[#25282B] 
  rounded-[2vw]
  text-[#25282B] 
  hover:bg-black
  hover:text-white
  hover:scale-105
  transition-all
`;

// 버튼 텍스트
export const CardButtonText = tw.span`
  font-medium 
  text-[1.2vw]
`;

// 이미지 컨테이너
export const ImageContainer = tw.div`
  flex-1 
  h-full 
  relative 
  overflow-hidden
  max-w-[50%]
  md:max-w-none
`;

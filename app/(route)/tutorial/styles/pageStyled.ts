import tw from 'tailwind-styled-components';
import { motion } from "framer-motion";

// 본 단락
export const MainContainer = tw.div`
    flex 
    flex-col 
    relative 
    mx-20
    px-20
    py-8
`;

// 배경과 텍스트 섹션
export const BackgroundSection = tw.div`
    flex 
    items-center 
    justify-end 
    pr-[5vw] 
    mt-80
`;

// 큰 제목
export const Heading = tw(motion.h1)`
    font-bold 
    text-[64px] 
    leading-[96px] 
    text-[#25282B]
`;

export const CenterHeadSection = tw.div`
    flex 
    justify-center 
    items-center 
    mt-[8vh] 
`;

// 큰 제목 (중앙 정렬)
export const CenteredHeading = tw(motion.h1)`
    w-[80vw] 
    font-bold 
    text-[64px] 
    leading-[96px] 
    text-center 
    text-[#25282B]
`;

// 작은 본문 텍스트
export const Paragraph = tw(motion.p)`
    text-[18px] 
    leading-[28px] 
    text-[#828282] 
    mt-2
`;

// 노란박스 옆 본문
export const LargeParagraph = tw(motion.p)`
    text-[30px] 
    font-bold 
    leading-[150%] 
    text-black 
    mt-60 
    mx-20
    text-left 
`;

// 이미지 컨테이너
export const ImageContainer = tw(motion.div)`
    relative 
    flex-shrink-0
`;

// 노란 네모 배경
export const YellowBox = tw.div`
    absolute 
    bg-[#FFD167] 
    rounded-l-xl 
    z-[-1]
`;

// 왼쪽 텍스트와 이미지 섹션
export const SectionContainer = tw(motion.div)`
    flex 
    justify-start 
    items-center 
    gap-8 
    pl-[10vw] 
    mt-[20vh]
`;

// 텍스트 박스 섹션
export const TextBox = tw.div`
    flex 
    flex-col 
    mt-[20vh]
    mx-20
`;

export const HeroBackground = tw.div`
    w-[100%] 
    h-[70vh] 
    bg-[#FFD167] 
    mt-[10vh] 
`;

export const HeroTextSection = tw.div`
    relative 
    w-[858px] 
    left-[32vh] 
    top-[10vh] 
    flex 
    flex-col 
    items-start 
    gap-[32px]
`;

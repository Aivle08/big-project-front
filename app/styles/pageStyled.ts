import tw from 'tailwind-styled-components';

// 본 단락
export const MainContainer = tw.div`
  flex 
  flex-col 
  relative 
  justify-center 
  mx-20
  px-20
  items-center
`;

// 인사말 컨테이너
export const GreetingContainer = tw.div`
  absolute 
  left-[181px] 
  top-[20vh] 
  w-[858px] 
  h-[408px] 
  flex 
  flex-col 
  items-start 
  p-0 
  gap-[12px] 
`;

// 인사말 텍스트
export const GreetingText = tw.p`
  w-[858px] 
  h-[27px] 
  font-nunito 
  font-bold 
  text-[20px] 
  leading-[27px] 
  text-[#FDC435] 
`;

// 인사말 세부 컨텐츠
export const GreetingContent = tw.div`
  flex 
  flex-col 
  items-start 
  p-0 
  gap-[32px] 
  w-[858px] 
  h-[369px] 
`;

// 인사말 제목
export const GreetingTitle = tw.h1`
  w-[853px] 
  h-[154px] 
  font-montserrat 
  font-bold 
  text-[64px] 
  leading-[77px] 
  text-[#25282B]
`;

// 인사말 설명
export const GreetingDescription = tw.p`
  w-[853px] 
  h-[108px] 
  font-nunito 
  font-normal 
  text-[24px] 
  leading-[36px] 
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
  w-[162px] 
  h-[72px] 
  font-bold 
  text-[48px] 
  leading-[72px] 
  text-center 
  text-[#25282B]
`;

export const SectionLine = tw.div`
  w-[100px] 
  h-[4px] 
  bg-[#FDC435] 
  rounded-[2px]
`;


// 카드 컨테이너
export const CardContainer = tw.div`
  flex 
  justify-center 
  items-center 
  w-full 
  my-[10vh]
`;

export const Card = tw.div`
  flex 
  flex-row 
  items-start 
  p-0 
  w-[1020px] 
  h-[524px] 
  rounded-[24px] 
  shadow-xl
`;

// 카드 설명 컨테이너
export const CardDescriptionContainer = tw.div`
  w-[496px] 
  h-[524px] 
  bg-[#FFFFFF] 
  flex-none 
  order-0 
  overflow-hidden
`;

export const CardDescription = tw.div`
  relative 
  flex 
  flex-col 
  items-start 
  p-0 
  gap-[24px] 
  left-[5%] 
  right-[7.84%] 
  top-[30%] 
  bottom-[27.67%] 
  w-[90%]
`;

export const CardTitle = tw.h1`
  text-[#25282B] 
  font-bold 
  text-[50px] 
  leading-[100%]
`;

export const CardText = tw.p`
  text-[#828282] 
  font-normal 
  text-[18px] 
  leading-[150%]
`;

export const CardButton = tw.button`
  flex 
  items-center 
  px-[24px] 
  py-[8px] 
  border 
  border-[#25282B] 
  rounded-[24px]
`;

export const CardButtonText = tw.span`
  text-[#25282B] 
  font-medium 
  text-[18px]
`;

export const ImageContainer = tw.div`
  w-[530px] 
  h-[524px] 
  flex-none 
  order-1 
  relative 
  overflow-hidden 
`;
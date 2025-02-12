import tw from 'tailwind-styled-components';

// 본 단락
export const MainContainer = tw.div`
  mx-20
  px-20

  py-8
`;
export const SectionHeader = tw.div`
  flex 
  flex-col 
`;

export const SectionTitle = tw.h1`
  text-2xl 
  font-bold 
  pb-2
`;

export const SectionLine = tw.div`
  ml-1
  w-[60px] 
  h-[3px] 
  bg-yellow
  rounded-[2px]
`;


export const Section = tw.section`
  mb-8
`;

// 단랙 내 소제목목
export const SmallTitle = tw.div`
  block 
  text-xl
  font-semibold 
  mb-2
`;

// 텍스트 박스
export const TextBox = tw.div`
    flex 
    flex-col 
    mt-[5vh]
    mb-[2vh]
`;


// 작은 내용
export const SmallContent = tw.div`
    font-normal 
    text-[24px] 
    leading-[150%] 
    text-[#828282]
`;

// 테이블 컨테이너
export const TableContainer = tw.div`
  relative 
  w-[80vw] 
  h-[60vh] 
  overflow-auto
`;

// 테이블 헤더
export const TableHeader = tw.div`
  grid 
  grid-cols-9 
  items-center 
  w-full 
  h-[54px] 
  bg-white 
  border 
  border-[rgba(0,0,0,0.1)] 
  rounded-[2px] 
  mt-[10px] 
  sticky 
  top-0 
  z-10
`;

// 평균 점수 행
export const AverageRow = tw.div`
  grid 
  grid-cols-9 
  items-center 
  w-full 
  h-[54px] 
  bg-[#FFD167] 
  border 
  border-[rgba(255, 209, 103, 0.44)] 
  rounded-[2px] 
  sticky 
  top-[54px] 
  z-10
`;

// 지원자 행
export const ApplicantRow = tw.div`
  grid 
  grid-cols-9 
  items-center 
  w-full 
  h-[54px] 
  bg-white 
  border 
  border-[rgba(0,0,0,0.1)] 
  rounded-[2px] 
  mt-[1px]
`;

// 일반 셀
export const Cell = tw.span`
    text-center
`;

// 볼드 셀
export const BoldCell = tw.span`
    text-center
    font-bold
`;

// 이미지 셀
export const ImageCell = tw.span`
  flex 
  items-center 
  justify-center
`;

// 하단 라인
export const FooterLine = tw.div`
  left-[11.63%] 
  right-[11.21%] 
  top-[73.53%] 
  bottom-[26.47%] 
  border 
  border-[#CED4DA]
`;

export const TextContent = tw.div`
  px-10
  pb-4
  p-4
  mx-[3vw]
  w-[75vw]
`;

// 노란버튼(질문생성)
export const YellowButton = tw.button`
    bg-yellow 
    text-black 
    font-bold 
    py-3
    px-6
    shadow-sm
    rounded-xl
    hover:bg-lightorange
    active:scale-95 
    transition
`;

export const FloatingButton = tw.button`
    fixed
    bottom-[8vh]
    right-[8vw]
    bg-[#FFD167]
    text-white 
    rounded-full 
    w-10 
    h-10
    flex 
    items-center 
    justify-center 
    shadow-lg 
    hover:bg-[#FFBD26] 
    transition
    border-2
    border-black
`;

export const InfoRow = tw.div`
  flex 
  justify-between 
  items-center
`;

export const CenterRow = tw.div`
  flex 
  justify-center 
  items-center
`;

// 질문 목록을 위한 친구들
export const QustionTitle = tw.div`
  flex
  items-center
  justify-center
  bg-yellow
  rounded-full
  px-4
  py-2
  shadow-sm
  w-[10vw]
  h-[5vh]
    font-bold
`;

export const QuestionSection = tw.div`
  bg-gray-100 
  rounded-md 
  p-4 
  shadow-md 
  mt-10 
`;

export const QuestionListSection = tw.div`
  max-h-[57vh] 
  mt-3 
  overflow-y-auto
`;

export const QuestionListItem = tw.div`
  bg-black/5
  rounded-md 
  p-3 
  shadow-sm 
  flex 
  items-center 
  justify-between 
  my-1
`;

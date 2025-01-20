import tw from 'tailwind-styled-components';

// 본 단락
export const MainContainer = tw.div`
  flex 
  flex-col 
  relative 
  justify-center 
  w-full
  ml-[10vw]
  mr-[10vw]
  w-[80vw]
`;
export const SectionHeader = tw.div`
  flex 
  flex-col 
`;

export const SectionTitle = tw.div`
  w-[250px] 
  h-[72px] 
  font-bold 
  text-[30px] 
  leading-[72px] 
  text-[#25282B]
`;

export const SectionLine = tw.div`
  w-[100px] 
  h-[4px] 
  bg-[#FDC435] 
  rounded-[2px]
  mt-0
`;

// 단랙 내 소제목목
export const SmallTitle = tw.div`
    font-semibold 
    mt-5
    text-[24px] 
    leading-[48px] 
    text-[#25282B]
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
    bg-yellow-400 
    text-black 
    font-bold 
    py-2 
    px-4 
    w-[10vw]
    h-[6vh]
    rounded-lg 
    hover:bg-yellow-500 
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

// 질문 목록을 위한 친구들
export const QustionTitle = tw.div`
    bg-[#FFD167]
    rounded-full
    px-4
    py-2
    shadow-md
    w-[10vw]
    h-[5vh]
    font-bold
`;


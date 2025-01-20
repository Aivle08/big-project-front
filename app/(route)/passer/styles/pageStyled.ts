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
`;

// 단락 제목
export const SectionHeader = tw.div`
  flex 
  flex-col 
  mt-[770px]
`;

export const SectionTitle = tw.div`
  w-[250px] 
  h-[72px] 
  font-bold 
  text-[48px] 
  leading-[72px] 
  text-[#25282B]
`;

export const SectionLine = tw.div`
  w-[100px] 
  h-[4px] 
  bg-[#FDC435] 
  rounded-[2px]
`;

// 텍스트 박스
export const TextBox = tw.div`
    flex 
    flex-col 
    mt-[5vh]
    mb-[2vh]
`;

// 작은 제목(직무)
export const SmallTitle = tw.div`
    font-semibold 
    text-[35px] 
    leading-[48px] 
    text-[#25282B]
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

import tw from 'tailwind-styled-components';

export const Container = tw.div`
  mx-20
  px-20
  
  py-8
`;

export const Title = tw.h1`
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

export const SectionCon = tw.div`
 bg-white
 rounded-[4px]
 p-5
 shadow-sm
`;

export const SectionCon1 = tw.div`
 bg-yellow
 rounded-[4px]
 p-5
`;


export const Label1 = tw.label`
  block 
  text-xl
  font-semibold 
  mb-2
`;


export const SubLabel = tw.p`
  text-gray
  text-md
  mb-4
`;


export const EvaluationInput = tw.div`
px-2

`;

export const Label2 = tw.label`
  block 
  text-md
  font-semibold 
  bg-yellow
  p-3
`;

export const InputContent = tw.p`
  w-full 
  p-3 
`;


// 박스 덩어리 컴포넌트
export const BoxContainer = tw.div`
  flex 
  justify-center
  items-center
  gap-24
  w-[85%]
  mb-5
`;

export const Left = tw.div`
  flex-1
  ml-2
`;

// 지원자 수 박스
export const Box1 = tw.div`
  mt-4
  border-2
  border-lightyellow
  bg-lightyellow
  rounded-2xl
  shadow-sm
  ml-6
  p-8
`;

export const Box1Container = tw.div`
  flex 
  gap-2
`;

// 총 지원자 수 
export const Title1 = tw.h2`
  text-orange
  text-2xl 
  font-bold 
  pb-2
`;

// 숫자 (544)
export const People = tw.h1`
  mt-4
  text-orange
  text-7xl
  flex-1
  mt-10
`;

// 명
export const Num = tw.h2`
  text-orange
  text-2xl 
  font-bold 
  pb-2 
  mt-10
  flex
  items-center
  justify-center
  flex-1
`;


export const Img = tw.div`
  w-20 
  h-40

`;



export const Right = tw.div`
  flex-2
  flex 
  flex-col

`;

// 전체 평점 박스
export const Box2 = tw.div`
  flex
  gap-32
  mt-4
  border-2 
  border-lightorange
  bg-lightorange
  rounded-xl
  shadow-sm
  px-8
  py-4
  mb-2
`;

// 전체 평점 / 합격 명단 (글자)
export const Title2 = tw.h2`
  text-black
  text-2xl 
  font-bold 
  pb-2
`;

// 전체 평점 (점수)
export const Score = tw.h1`
  text-black
  mt-4
  text-5xl
  flex-1
`;

// 합격명단 박스
export const Box3 = tw.div`
  flex
  flex-col
  border-2 
  border-yellow
  bg-yellow
  rounded-xl
  shadow-sm
  px-8
  py-4
  mb-2
`;

// 합격 명단 (세부사항)
export const PassList = tw.p`
  text-gray
  text-sm
  mb-2
`;


// 합격명단 버튼
export const PassButton = tw.button`
  bg-transparent
  border
  border-black
  p-2
  text-medium
  rounded-full
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

// 이미지 셀
export const ImageCell = tw.span`
  flex 
  items-center 
  justify-center
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


// 볼드 셀
export const BoldCell = tw.span`
  text-center
  font-bold
`;

// 모달 스타일
export const ModalOverlay = tw.div`
  fixed 
  inset-0 
  bg-black 
  bg-opacity-50 
  flex 
  items-center 
  justify-center 
  z-50
`;

export const ModalContent = tw.div`
  bg-white 
  p-3
  px-5
  rounded-lg 
  shadow-xl 
  w-[400px] 
  relative
`;

export const ModalHeader = tw.div`
  px-5 
  py-2
  flex 
  items-center 
  gap-2 
`;

export const ModalHeader2 = tw.div`
  w-5
  h-5
  flex 
  items-center 
  justify-center 
  rounded-full 

`;

export const Alarm = tw.h2`
  ml-4
  mt-2
  text-lg
  font-bold 
  mb-4
`;

export const ModalButtons = tw.div`
  flex
  justify-center
  gap-4
  mt-6
`;

export const Button = tw.button`
  px-8 
  py-2 
  rounded 
  cursor-pointer 
  hover:opacity-90
`;

export const YesButton = tw(Button)`
  bg-yellow
  text-black
`;

export const NoButton = tw(Button)`
  bg-[#A6A6A6]
  text-white
`;

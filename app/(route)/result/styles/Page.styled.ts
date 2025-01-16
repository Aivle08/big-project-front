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
`;

export const InputContent = tw.p`
  w-full 
  p-3 
`;


// 박스 덩어리 컴포넌트
export const BoxContainer = tw.div`
  flex 
  gap-12
  w-full
`;

export const Left = tw.div`
  gap-6 
  flex-1
  mr-10
`;

export const Box1 = tw.div`
  border
  border-lightyellow
  bg-lightyellow
`;

// 총 지원자 수 
export const Title1 = tw.h2`
`;

// 
export const People = tw.h1`
  text-orange
`;

export const Right = tw.div`
  flex-1
  ml-5
  flex 
  flex-col 
`;


export const Box2 = tw.div`
  bg-lightorange
  rounded-lg
`;

export const Title2 = tw.h2`

`;

// 전체 평점
export const Score = tw.h1`
  text-black
`;

export const Box3 = tw.div`
  bg-yellow
  rounded-lg
`;

// 합격 명단
export const PassList = tw.h1`
  text-black
`;

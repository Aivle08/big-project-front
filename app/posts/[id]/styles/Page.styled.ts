import tw from 'tailwind-styled-components';

export const Container = tw.div`
  mx-20
  px-20
  py-8
`;

export const Section = tw.div`
  mb-6
`;

export const Section2 = tw.div`
  bg-white 
  rounded-lg 
  shadow-md 
  p-6
`;

export const BackButton = tw.button`
  text-gray 
  hover:text-black
`;

export const Title = tw.h1`
  text-2xl 
  font-bold 
  mb-4
`;

export const Detail = tw.div`
  flex 
  justify-between 
  text-gray 
  mb-6 
  pb-4 
  border-b
`;

export const Content = tw.div`
  min-h-[200px] 
  whitespace-pre-wrap
`;
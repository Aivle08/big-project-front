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
  mb-8
`;

export const Section = tw.section`
  mb-8
`;


export const TitleContainer = tw.div`
  flex 
  items-center 
  space-x-2
`;

export const TitleContainer2 = tw.div`
  flex 
  items-center
`;

export const Num = tw.span`
  text-yellow
  mx-1 
  font-bold
`;

export const ChartContainer = tw.div`
  flex 
  justify-end 
  mb-4
`;

export const WriteButton = tw.button`
  bg-yellow 
  text-white 
  px-4 
  py-2 
  rounded 
  hover:bg-yellow-500 
  transition-colors
`;

export const Table = tw.table`
  w-full 
  border-collapse 
  mt-4
`;

export const TableDetail = tw.th`
  border-b-2 
  border-yellow 
  p-4 
`;

export const TableDetail2 = tw.th`
  border-b
  border-gray 
  p-4
`;

export const FixButton = tw.button`
  text-blue-600 
  mr-2 
  hover:text-blue-800
`;

export const DeleteButton = tw.button`
  text-red-600 
  hover:text-red-800
`;

export const ModalContainer = tw.div`
  fixed 
  inset-0 
  bg-black 
  bg-opacity-50 
  flex 
  items-center 
  justify-center
`;

export const ModalBox = tw.div`
  bg-white 
  p-6
  rounded-xl
  w-full 
  max-w-xl
`;

export const TitleBox  = tw.h2`
  text-xl 
  font-bold
  mb-4
`;

export const ButtonContainer = tw.div`
  flex 
  justify-end 
  space-x-2
`;

export const SaveButton = tw.button`
  bg-yellow 
  text-white 
  px-4 
  py-2 
  rounded 
  hover:bg-yellow-500
`;

export const CancelButton = tw.button`
  bg-gray 
  text-white 
  px-4 
  py-2 
  rounded 
  hover:bg-gray-600
`;

export const TextNum = tw.div`
  text-sm 
  text-gray
  text-right 
  mb-4
`;
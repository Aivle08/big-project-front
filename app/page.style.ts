import tw from 'tailwind-styled-components';

export const ContainerForm = tw.div`
  flex 
  flex-col 
  items-center 
  w-full 
  px-12
`;

export const Title = tw.h1`
  font-bold 
  text-2xl 
  m-1
`;

export const Detail = tw.span`
  text-sm 
  mb-4
`;

export const Form1 = tw.input`
  bg-[#eee] 
  border-none 
  px-4 
  py-3 
  my-2 
  w-full 
  rounded
`;

export const EmailContainer = tw.div`
  w-full 
  space-y-2
`;

export const EmailInputWrapper = tw.div`
  flex 
  gap-2 
  w-full
`;

export const VerifyButton = tw.button`
  bg-[#FDC435] 
  text-[#25282B] 
  px-4 
  py-2 
  rounded 
  text-sm 
  whitespace-nowrap
  hover:bg-[#fdb503]
  transition-colors
  disabled:bg-gray-300 
  disabled:cursor-not-allowed
`;

export const VerificationMessage = tw.p`
  text-xs 
  text-green-500
`;

export const ErrorMessage = tw.p`
  text-xs 
  text-red-500
`;

export const ContainerButton = tw.button`
  rounded-full 
  border 
  border-[#FDC435] 
  bg-[#FDC435] 
  text-[#25282B] 
  text-sm 
  font-bold 
  px-11 
  py-3 
  uppercase 
  tracking-wider 
  mt-6 
  transition-transform 
  duration-80 
  ease-in 
  hover:bg-[#fdb503]
  active:scale-95 
  focus:outline-none
`;
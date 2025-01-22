import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
  bg-[#f6f5f7] 
  flex 
  justify-center 
  items-center 
  flex-col 
  font-montserrat 
  min-h-screen 
  -mt-5 
  mb-12
`;

export const Container = tw.div`
  bg-white 
  rounded-[5%]
  shadow-2xl 
  relative
  overflow-hidden 
  w-[800px] 
  max-w-full 
  min-h-[480px]
  font-montserrat 
`;


export const ContainerForm = tw.form`
  bg-white 
  flex 
  items-center 
  justify-center 
  flex-col 
  px-12 
  h-full 
  text-center
  font-montserrat 
`;


export const BackContainer = tw.div`
relative 
w-full
`;


export const BackButton = tw.button`
  absolute 
  left-0 
  top-0 
  p-2 
  hover:bg-gray-100 
  rounded-full 
  transition-colors
`;


export const Title = tw.h1`
  font-montserrat 
  font-bold 
  text-2xl
  m-1
`;


export const Detail = tw.span`
  text-xs
  text-gray
  my-1

`;

export const Form1 = tw.input`
  bg-[#fffff] 
  rounded-sm
  outline-[#E8ECF4]
  outline
  h-[28px]
  px-4 
  py-0
  text-sm
  my-1
  w-[85%]

`;


export const JobContainer = tw.div`
  flex
  w-[85%]
  gap-4
`;

export const Form2 = tw.input`
  bg-[#fffff] 
  border-[#E8ECF4]
  outline-[#E8ECF4]
  outline
  rounded-sm
  text-md
  px-4 
  py-2
  my-3 
  w-[85%]
`;

export const ContainerButton = tw.button`
  mt-2
  rounded-[15px] 
  border 
  border-yellow
  bg-yellow
  text-black
  text-xs 
  font-bold       
  px-5
  py-3 
  uppercase 
  tracking-wider 
  transition-transform 
  duration-80 
  ease-in 
  active:scale-95 
  focus:outline-none
`;


// 오버레이 패널

export const OverlayContainer = tw.div<{ $isActive?: boolean }>`
  absolute 
  top-0 
  left-1/2 
  w-1/2 
  h-full 
  overflow-hidden 
  transition 
  transform 
  duration-600 
  ease-in-out 
  z-100
  ${p => p.$isActive && '-translate-x-full'}
`;

export const OverlayBox = tw.div<{ $isActive?: boolean }>`
  bg-gradient-to-r 
  from-lightyellow
  to-lightyellow
  bg-no-repeat 
  bg-cover 
  bg-center 
  text-black
  relative 
  -left-full 
  h-full 
  w-[200%] 
  transform 
  transition-transform 
  duration-600 
  ease-in-out
  ${p => p.$isActive && 'translate-x-1/2'}
`;

export const OverlayPanel = tw.div<{ $position: 'left' | 'right'; $isActive?: boolean }>`
  absolute 
  flex 
  items-center 
  justify-center 
  flex-col 
  px-10 
  text-center 
  top-0 
  h-full 
  w-1/2
  transition-transform 
  duration-600 
  ease-in-out
  ${p => p.$position === 'left' ? `
    -translate-x-[20%]
    ${p.$isActive && 'translate-x-0'}
  ` : `
    right-0
    ${p.$isActive && 'translate-x-[20%]'}
  `}
`;


export const Description = tw.p`
  text-sm
  font-thin 
  leading-5 
  tracking-wider 
  text-gray
  my-5 
  mx-0
  px-15
`;

export const OverlayButton = tw.button`
  rounded-xl
  border 
  border-yellow
  bg-transparent 
  text-yellow
  text-xs
  font-bold 
  mt-2
  px-6
  py-3 
  uppercase 
  tracking-wider 
  transition-transform 
  duration-80 
  ease-in 
  active:scale-95 
  focus:outline-none
`;


// 이메일 관련 style

export const EmailContainer = tw.div`
  w-[85%]
  space-y-2
`;

export const EmailInputWrapper = tw.div`
  flex 
  gap-2 
`;

export const VerifyButton = tw.button`
  bg-[#FDC435] 
  text-[#25282B] 
  py-2
  px-2
  h-[28px]
  rounded-xl
  flex
  justify-center
  items-center
  text-center
  text-[10px]
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
  text-left
  text-red-500
`;


// 아이디 관련 style
export const InputWrapper = tw.div`
  flex 
  gap-2 
  w-[85%]
`;

export const CheckButton = tw.button`
  bg-[#FDC435] 
  text-[#25282B] 
  py-2
  px-2
  h-[28px]
  rounded-xl
  flex
  justify-center
  items-center
  text-center
  text-[10px]
  whitespace-nowrap
  hover:bg-[#fdb503]
  transition-colors
  disabled:bg-gray-300 
  disabled:cursor-not-allowed
`;

export const SuccessMessage = tw.p`
  text-xs 
  text-green-500
`;
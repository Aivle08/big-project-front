import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
  flex 
  justify-center 
  items-center 
  max-w-full 
  min-h-[80px] 
  mt-5
`;

export const Ul = tw.ul`
  flex gap-14
  list-none 
  m-0 
  p-0 
  items-center
`;

export const Nav = tw.nav`
  max-w-[1485px] 
  flex items-center 
  justify-between 
  px-5 
  py-2 
  h-[80px] 
  w-full
`;

export const NavButtons = tw.div`
  flex 
  items-center 
  gap-3
  ml-20
`;

export const BtnSpan = tw.span`
  font-bold whitespace-nowrap
`;

// 검은 버튼
export const BlackButton = tw.button`
  w-[120px]
  h-[42px]
  rounded-md
  border
  border-black
  bg-black
  text-white
  transition-all
  duration-300
  hover:bg-white
  hover:text-black
`;

// 노란 버튼
export const YellowButton = tw.button`
  w-[120px]
  h-[42px]
  rounded-md
  border
  border-[#fde047]
  bg-yellow
  text-black
  transition-all
  duration-300
  hover:bg-[#fde047]
`;
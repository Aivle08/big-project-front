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
  flex gap-5 
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
`;

export const BtnSpan = tw.span`
  font-bold whitespace-nowrap
`;

export const NavBtn = tw.button`
  gap-30 
  rounded-md 
  border 
  w-[120px] 
  h-[42px]
  border-3
`;


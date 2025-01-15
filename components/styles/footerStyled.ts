import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
    flex 
    flex-col 
    justify-center 
    items-center 
    w-full 
    py-4
`;

export const IconWrapper = tw.div`
    w-[192px] 
    h-[102px] 
    flex 
    flex-row 
    justify-between 
    items-center 
    gap-[24px]
`;

export const UnderText = tw.p`
    text-[#828282] 
    font-normal 
    text-[16px] 
    leading-[22px]
`;

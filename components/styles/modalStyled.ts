import tw from 'tailwind-styled-components';

// common
export const ModalBackground = tw.div`
  fixed 
  top-0 
  left-0 
  w-full 
  min-h-screen 
  bg-black
  bg-opacity-50 
  overflow-y-auto 
  flex 
  justify-center 
  pt-16 
  pb-16
  z-10
`;

export const ModalContainer = tw.div`
  max-w-[60vw] 
  w-full 
  bg-white 
  shadow-lg 
  py-2 
  rounded-md 
  z-20
`;

export const ModalHeader = tw.div`
  border-b 
  border-gray-300 
  py-3 
  px-4 flex 
  justify-between 
  items-center
`;

export const TitleContainer = tw.div`
  flex 
  items-baseline 
  space-x-4
`;

export const ModalTitle = tw.h2`
  text-4xl 
  font-bold
  text-black
`;

export const ModalSubtitle = tw.p`
  text-lg 
  text-gray
`;

export const CloseButton = tw.button`
  h-8 
  px-2 
  text-4xl 
  font-bold 
  rounded-md 
  bg-white 
  text-black
`;

export const ModalContent = tw.div`
  px-4 
  pb-4
`;

// pdf viewer
export const PDFViewer = tw.div`
  border 
  rounded-md 
  overflow-hidden 
  h-[75vh] 
  w-[58vw]
`;

export const TextContent = tw.div`
  px-10
  pb-4
  max-h-[78vh] 
  overflow-y-auto 
  p-4
  mx-[3vw]
`;

// details modal
// 단락 제목
export const SectionHeader = tw.div`
  flex 
  flex-col 
`;

export const SectionTitle = tw.div`
  w-[250px] 
  h-[72px] 
  font-bold 
  text-[30px] 
  leading-[72px] 
  text-[#25282B]
`;

export const SectionTitle2 = tw.div`
  text-left
  font-bold 
  text-2xl
  mb-2
  text-[#25282B]
`;

export const SectionLine = tw.div`
  w-[100px] 
  h-[4px] 
  bg-[#FDC435] 
  rounded-[2px]
  mt-0
`;
export const SectionLine2 = tw.div`
  w-[65px] 
  h-[4px] 
  bg-[#FDC435] 
  rounded-[2px]
`;

export const SmallTitle2 = tw.div`
    font-bold
    mt-5
    text-lg
    bg-lightyellow
    rounded-lg
    px-3
    leading-[48px] 
    text-[#25282B]
`;

// 단랙 내 소제목
export const SmallTitle = tw.div`
    font-semibold 
    mt-5
    text-[24px] 
    leading-[48px] 
    text-[#25282B]
`;


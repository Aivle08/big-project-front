import tw from 'tailwind-styled-components';

export const ModalBackground = tw.div`
  fixed 
  top-0 
  left-0 
  w-full 
  min-h-screen 
  bg-gray-900 
  bg-opacity-50 
  overflow-y-auto 
  flex 
  justify-center 
  pt-16 
  pb-16
`;

export const ModalContainer = tw.div`
  max-w-[60vw] 
  w-full 
  bg-white 
  shadow-lg 
  py-2 
  rounded-md
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
`;

export const ModalSubtitle = tw.p`
  text-lg 
  text-gray-500
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

export const PDFViewer = tw.div`
  border 
  rounded-md 
  overflow-hidden 
  h-[75vh] 
  w-[58vw]
`;


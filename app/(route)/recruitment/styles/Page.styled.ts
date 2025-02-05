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

export const FirstContainer = tw.div`
  flex 
  gap-12
  w-full
`;


export const Left = tw.div`
  flex 
  flex-col 

  gap-6 
  flex-1
  mr-10
`;

export const Right = tw.div`
  flex-1
  ml-5
`;

export const Label1 = tw.label`
  block 
  text-xl
  font-semibold 
  mb-2
`;

export const SubLabel = tw.p`
  text-gray
  text-sm 
  mb-4
`;

export const Input1 = tw.input`
  w-full 
  p-3 
  border 
  border-2
  border-[#E8ECF4]
  rounded-lg 
  focus:outline-none 
  focus:border-gray
`;

export const UploadContainer = tw.div`
  border-2 
  border-white
  bg-white
  rounded-xl
  shadow-sm
  p-16
  mb-4
`;


export const FileList = tw.div`
  space-y-2
  bg-White
  border-2 
  border-white
  bg-white
  rounded-lg 
  shadow-sm
  p-16
  overflow-y-scroll 
  max-h-[30rem]
  min-h-[24rem] 
`;

export const FileItem = tw.div`
  flex 
  items-center 
  gap-3 
  bg-[#EEF1F7]
  p-3
  rounded-xl
`;

export const FileContainer = tw.div`
  flex 
  items-center 
  justify-center 
  w-8 
  h-8
`;

export const FileContainer2 = tw.div`
  flex-1
`;

export const FileIcon = tw.svg`
  w-6 
  h-6 
  text-red-500
`;

export const FileInfo = tw.div`
  flex-1
  flex
  flex-col
`;

export const FileSize = tw.span`
  text-sm 
  text-gray-500
`;


export const SecondContainer = tw.div`
  my-2
`;

export const DeleteButton = tw.button`
  text-gray-400 
  hover:text-gray-600
`;

export const Description = tw.p`
  text-gray-600 
  text-sm 
  mb-4
`;

export const InfoButton = tw.button`
  bg-yellow-400 
  text-white 
  px-4 
  py-2 
  rounded-lg 
  hover:bg-yellow-500 
  mb-4
`;

export const EvaluationList = tw.div`
  space-y-4
`;

export const EvaluationItem = tw.div`
  border 
  border-gray-200 
  rounded-lg 
  p-4
`;

export const EvaluationHeader = tw.div`
  flex 
  justify-between 
  items-center 
`;

export const Span = tw.span`
  font-medium
`;

export const Progress = tw.div`
  w-full 
  bg-gray-200 
  rounded-full 
  h-1.5 
  mt-2
`;

export const Bar = tw.div`
  bg-yellow
  h-1.5 
  rounded-full
`;

export const EvaluationTextarea = tw.textarea`
  w-full 
  h-24 
  p-2 
  border 
  border-gray-200 
  rounded-lg 
  resize-none 
  focus:outline-none 
  focus:border-yellow-400
`;

export const SubmitButton = tw.button`
  w-full 
  bg-yellow-400 
  text-white 
  py-3 
  rounded-lg 
  hover:bg-yellow-500 
  font-semibold
  mt-8
`;


export const Detail = tw.div`
  text-gray
`;

// 평가 항목 style
export const Label2 = tw.label`
  block 
  text-lg 
  font-semibold 
  mb-2
`;

export const Input2 = tw.textarea`
  w-full 
  p-3 
  border 
  border-2
  border-[#E8ECF4]
  rounded-lg 
  focus:outline-none 
  focus:border-gray
  h-32
`;

export const CharCount = tw.span`
  absolute 
  bottom-2 
  right-3 
  text-xs 
  text-gray-500 
  pointer-events-none
`;

export const AnalysisButton = tw.button`
  text-md
  bg-yellow
  text-black
  border
  border-black
  p-2
  rounded-lg
`;

export const ButtonArea = tw.div`
  flex
  justify-center
  items-center
  p-2
`;
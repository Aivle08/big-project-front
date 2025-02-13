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

export const UserContainer = tw.div`
  bg-white 
  rounded-lg 
  p-6 
  mb-8 
  shadow-sm
`;

export const UserArea = tw.div`
  space-y-2
`;

export const Company = tw.h2`
  text-xl 
  font-bold 
  mb-4
`;

export const Dept = tw.p`
  text-gray-600
`;

export const UserName = tw.p`
  font-medium
`;


export const Etc = tw.div`
  flex space-x-8
`;

export const Category = tw.div`
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-10
`;

export const CategoryContainer = tw.div`
  bg-white 
  rounded-lg 
  p-10
  shadow-md
`;

export const CateTitle = tw.h3`
  font-medium 
  mb-4
`;

export const ButtonContainer = tw.div`
  flex
  justify-end
`;


export const CateButton = tw.button`
  px-4 
  py-2 
  border 
  border-gray-300 
  rounded-full 
  text-sm
  text-gray-600 
  hover:bg-gray-50 
  transition-colors 
  duration-200
`;

// export const CateButton2 = tw.button`
//   px-4 
//   py-2 
//   border 
//   border-gray-300 
//   rounded-full 
//   text-sm
//   text-gray-600 
//   hover:bg-gray-50 
//   transition-colors 
//   duration-200
// `;
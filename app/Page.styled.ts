// page.styled.ts
import tw from 'tailwind-styled-components';

export const Container = tw.div`
  container 
  mx-auto 
  p-6
`;

export const Actions = tw.div`
  flex 
  justify-between 
  items-center 
  mb-8
`;

export const FileInputButton = tw.label`
  inline-flex 
  items-center 
  gap-2 
  px-4 
  py-2 
  bg-green-500 
  text-white 
  rounded 
  hover:bg-green-600 
  cursor-pointer
`;

interface ActionButtonProps {
  variant?: 'primary' | 'warning' | 'danger';
}

export const ActionButton = tw.button<ActionButtonProps>`
  inline-flex 
  items-center 
  gap-2 
  px-4 
  py-2 
  rounded 
  text-white
  mx-2
  ${(p) => p.variant === 'primary' && 'bg-blue-500 hover:bg-blue-600'}
  ${(p) => p.variant === 'warning' && 'bg-yellow-500 hover:bg-yellow-600'}
  ${(p) => p.variant === 'danger' && 'bg-red-500 hover:bg-red-600'}
`;

export const TotalProgress = tw.div`
  w-64
`;

export const ProgressBar = tw.div`
  h-2 
  bg-gray-200 
  rounded-full 
  overflow-hidden
`;

export const PreviewsContainer = tw.div`
  w-full 
  border 
  border-gray-200 
  rounded-lg
`;

interface FileRowProps {
  success?: boolean;
}

export const FileRow = tw.div<FileRowProps>`
  grid 
  grid-cols-4 
  gap-4 
  p-4 
  border-b 
  border-gray-200 
  items-center
  ${(p) => p.success ? 'bg-green-50' : 'odd:bg-gray-50'}
`;

export const PreviewCell = tw.div`
  flex 
  items-center 
  justify-center
`;

export const PreviewImage = tw.img`
  w-20 
  h-20 
  object-cover 
  rounded
`;

export const FileInfoCell = tw.div`
  flex 
  flex-col
`;

export const FileName = tw.p`
  text-sm 
  font-medium
`;

export const ErrorMessage = tw.strong`
  text-red-500 
  text-sm
`;

export const FileProgressCell = tw.div`
  flex 
  flex-col 
  gap-2
`;

export const FileSize = tw.p`
  text-sm 
  text-gray-500
`;

export const FileProgress = tw.div`
  h-2 
  bg-gray-200 
  rounded-full 
  overflow-hidden
`;

export const FileProgressInner = tw.div`
  h-full 
  bg-blue-500 
  transition-all 
  duration-300
`;

export const ActionCell = tw.div`
  flex 
  items-center 
  gap-2
`;
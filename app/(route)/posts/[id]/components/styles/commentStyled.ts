import tw from 'tailwind-styled-components';

export const CommentSection = tw.div`
  mt-8 
  pt-8 
  border-t 
  border-gray
`;

export const CommentForm = tw.form`
  mb-4
`;

export const CommentList = tw.div`
  gap-1
`;

export const CommentItem = tw.div`
  border-b
  padding: 1rem
  border-black
  radius-[4px]
  py-3
`;

export const AuthorName = tw.div`
  font-bold
  mb-[0.5rem]
`;

import tw from 'tailwind-styled-components';



// Wrapper
export const Wrapper = tw.div`
  w-full 
  h-screen 
  flex 
  justify-center 
  items-center 
  bg-[#ebecf0] 
  overflow-hidden
  font-montserrat
`;

// Container
export const Container = tw.div`
  relative 
  w-[768px] 
  min-h-[480px] 
  max-w-full
  bg-white
  rounded-[10px] 
  shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)] 
  overflow-hidden
  transition-all
  duration-500
  ease-in-out
`;

// Form Containers
export const Form = tw.form`
  flex 
  flex-col 
  justify-center 
  items-center 
  p-[50px] 
  h-full 
  bg-[#fffff]
`;

export const Title = tw.h1`
text-2xl
font-bold
my-1
`;

export const Detail = tw.span`
text-gray
my-1
`;

export const FormInput1 = tw.input`
  w-[85%] 
  p-2
  my-1
  rounded-[20px] 
  bg-[#fffff] 
  border-none 
  outline-none 
  shadow-inner
`;

export const FormInput2 = tw.input`
  w-[85%] 
  p-4 
  my-2 
  rounded-[20px] 
  bg-[#fffff] 
  border 
  border-gray-300 
  focus:outline-none 
  focus:ring-2 
  focus:ring-blue-400
`;

export const FormButton = tw.button`
  w-auto
  py-2
  px-6
  rounded-[10px] 
  border-none 
  text-sm
  outline-none 
  font-bold 
  uppercase 
  tracking-wider 
  py-3
  px-8
  my-3 
  transition-transform 
  duration-100 
  bg-yellow 
  shadow-md 
  active:shadow-inner
`;

export const P = tw.p`
my-3
text-gray
text-xs
`;

export const OverlayButton = tw.button`
  text-yellow
  font-medium
  outline
  bg-transparent
  outline-yellow
  rounded-[10px] 
  py-1
  px-4
  my-3
}
`;

// Panels
export const SignInContainer = tw.div`
  absolute 
  left-0 
  w-1/2 
  h-full 
  transition-all 
  duration-500
`;

export const SignUpContainer = tw(SignInContainer)`
  left-0 
  opacity-0 
  z-10
`;



// overlay 영역
export const OverlayContainer = tw.div`
  absolute 
  top-0 
  right-0 
  w-1/2 
  h-full 
  bg-lightyellow
  transition-transform 
  duration-500 
  overflow-hidden 
  z-[100]
`;

export const Div = tw.div`
  w-[70%]
  mx-auto
  flex
  flex-col
`;

export const RightPanelActiveOverlayContainer = tw(SignUpContainer)`
  translate-x-[-100%]
`;

export const Overlay = tw.div`
  bg-gradient-to-r 
  from-[#fffad8] 
  to-[#fffad8] 
  bg-no-repeat 
  text-[#31363b] 
  h-full 
  translate-x-10
  transition-transform 
  duration-500
`;

export const RightPanelActiveOverlay = tw(Overlay)`
  translate-x-[50%]
`;

export const OverlayPanel = tw.div`
  flex 
  flex-col 
  justify-center 
  items-center 
  text-center 
  w-1/2 
  h-full 
  transition-transform 
  duration-500
`;

export const OverlayLeft = tw(OverlayPanel)`
  translate-x-full
`;

export const RightPanelActiveOverlayLeft = tw(OverlayLeft)`
translate-x-0
`;
// flex 
// flex-col 
// justify-center 
// items-center 
// p-[50px] 

export const OverlayRight = tw(OverlayPanel)`
  translate-x-0
`;

export const RightPanelActiveOverlayRight = tw(OverlayRight)`
  translate-x-[20%]
`;
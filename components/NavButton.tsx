import React from 'react'
import { BtnSpan } from './styles/componentStyled'

type ButtonProps = {
    type : 'button' | 'submit';
    title : string;
    bgColor : string;
    txtColor : string;
    borderColor : 'border-yellow-200' | 'border-black';
}

export default function NavBtn ({type, title, bgColor, txtColor, borderColor}: ButtonProps) {
  return (
    <button
        className={`
          gap-30 
          rounded-md  
          w-[120px] 
          h-[42px]
          border-3
          border bg-[${bgColor}] text-[${txtColor}] ${borderColor}`}
        type={type}
    >
        <BtnSpan>{title}</BtnSpan>
    </button>
  )
}
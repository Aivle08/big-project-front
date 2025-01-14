import React from 'react'
import { BtnSpan } from './styles/componentStyled'

type ButtonProps = {
    type : 'button' | 'submit';
    title : string;
    bgColor : string;
    txtColor : string;
    borderColor : 'border-yellow-200' | 'border-black';
}

const NavBtn = ({type, title, bgColor, txtColor, borderColor}: ButtonProps) => {
  return (
    <button
        className={`
            bg-[${bgColor}] text-[${txtColor}] border-${borderColor} 
            `}
        type={type}
    >
        <BtnSpan>{title}</BtnSpan>
    </button>
  )
}

export default NavBtn
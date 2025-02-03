import React from 'react'
import Image from 'next/image'
import { IconWrapper, UnderText, Wrapper } from './styles/footerStyled'

const Footer = () => {
  return (
    <Wrapper>
        {/* 아이콘 영역 */}
        <IconWrapper>
        </IconWrapper>

        {/* 텍스트 영역 */}
        <UnderText>
          &copy; AIvler 08조 2025
        </UnderText>
    </Wrapper>
  )
}

export default Footer
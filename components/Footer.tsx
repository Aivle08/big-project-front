import React from 'react'
import Image from 'next/image'
import { IconWrapper, UnderText, Wrapper } from './styles/footerStyled'

const Footer = () => {
  return (
    <Wrapper>
        {/* 아이콘 영역 */}
        <IconWrapper>
          <Image src="/instagram_icon.png" alt="Instagram" width={48} height={48} />
          <Image src="/linkedin_icon.png" alt="Linked In" width={48} height={48} />
          <Image src="/mail_icon.png" alt="Mail" width={48} height={48} />
        </IconWrapper>

        {/* 텍스트 영역 */}
        <UnderText>
          &copy; AIvler 08조 2025
        </UnderText>
    </Wrapper>
  )
}

export default Footer
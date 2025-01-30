import React from 'react'
import Image from 'next/image'
import { IconWrapper, UnderText, Wrapper } from './styles/footerStyled'
import instagram from '@/public/images/instagram_icon.png';
import linked from '@/public/images/linkedin_icon.png';
import mail from '@/public/images/mail_icon.png';

const Footer = () => {
  return (
    <Wrapper>
        {/* 아이콘 영역 */}
        <IconWrapper>
          <Image src={instagram} alt="Instagram" width={48} height={48} />
          <Image src={linked} alt="Linked In" width={48} height={48} />
          <Image src={mail} alt="Mail" width={48} height={48} />
        </IconWrapper>

        {/* 텍스트 영역 */}
        <UnderText>
          &copy; AIvler 08조 2025
        </UnderText>
    </Wrapper>
  )
}

export default Footer
import { NAV_LINK } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { 
  Ul, 
  Wrapper, 
  Nav, 
  NavButtons, 
  BlackButton, 
  YellowButton 
} from './styles/componentStyled';

export default function Navbar() {
  return (
    <Wrapper>
      <Nav>
        {/* 로고 */}
        <Link
          href="/"
        >
          <Image src="/logo.png" alt="logo" width={300} height={50} />
        </Link>

        {/* 링크 리스트 */}
        <Ul>
          {NAV_LINK.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="text-black text-xl cursor-pointer transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </Ul>

        {/* 버튼 */}
        <NavButtons>
          <Link href="/login?form=signin">
            <BlackButton>회원가입</BlackButton>
          </Link>

          <Link href="/login">
            <YellowButton>로그인</YellowButton>
          </Link>
        </NavButtons>
      </Nav>
    </Wrapper>
  );
}

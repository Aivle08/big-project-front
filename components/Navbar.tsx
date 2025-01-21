"use client"

import { NAV_LINK } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { 
  Ul, 
  Wrapper, 
  Nav, 
  NavButtons, 
  BlackButton, 
  YellowButton 
} from './styles/componentStyled';

export default function Navbar() {

  // 아래 state는 목업을 위한 임시 state임. 나중에 redux를 이용한 구문으로 수정해야함
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

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

        {!isLoggedIn ? (
          <NavButtons>
            <Link href="/login?form=signin">
              <BlackButton>회원가입</BlackButton>
            </Link>

            {/* 아래 로그인 버튼의 본래 route는 "/login"이나, 테스트를 위해 상태 변경함수를 적용했음. 당황안해도 됨 */}
            <Link
              href="/"
              onClick={handleLogin}
            > 
              <YellowButton>로그인</YellowButton>
            </Link>
          </NavButtons>
          ) :
          (
            <NavButtons
              className='mr-5'
            >
              <Image
                src="/images/avatar.png" alt="profile" width={32} height={32}
              />
              <Link 
                href="/"
              >
                <span>KT 기업회원 / </span>
              </Link>

              <Link 
                href="/"
                onClick={handleLogout}
              >
                <span>로그아웃</span>
              </Link>

            </NavButtons>
          )
        }
      </Nav>
    </Wrapper>
  );
}

"use client"

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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import { logout } from '@/app/redux/features/authSlice';

export default function Navbar() {
  // Redux 상태 가져오기
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticated, user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <Nav>
        {/* 로고 */}
        <Link href="/">
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
        {!isAuthenticated ? (
          <NavButtons>
            <Link href="/login?form=signin">
              <BlackButton>회원가입</BlackButton>
            </Link>
            <Link href="/login">
              <YellowButton>로그인</YellowButton>
            </Link>
          </NavButtons>
        ) : (
          <NavButtons className="mr-5">
            <span className="flex items-center">
              <Image
                src="/images/avatar.png"
                alt="profile"
                width={32}
                height={32}
                className="mr-2"
              />
              <span>kt기업회원 / </span>
            </span>
            <Link href="/" onClick={handleLogout}>
              <span>로그아웃</span>
            </Link>
          </NavButtons>
        )}
      </Nav>
    </Wrapper>
  );
}
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
import logo from '@/public/images/logo.png';
import profile from '@/public/images/avatar.png';
import { authAPI } from '@/app/api/authAPI';
// import { useRouter } from 'next/navigation';

export default function Navbar() {

  // Redux 상태 가져오기
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  // console.log(isAuthenticated, user);
  const dispatch = useDispatch();

  // 로그인 안 된 경우는 튜토리얼 제외한 navbar의 페이지는 전부 다 로그인으로 라우팅되게 하려고 함
  // const handleNavigation = (href: string) => {
  //   // 로그인 필요한 페이지 목록
  //   const authRequiredPages = ['/resume', '/', '/mypage'];

  //   if (!isAuthenticated && authRequiredPages.includes(href)) {
  //     router.push('/login');
  //   } else {
  //     router.push(href);
  //   }
  // };

  const handleLogout = () => {
    authAPI.logout();
    dispatch(logout());
    console.log('로그아웃 완료');
  };

  return (
    <Wrapper>
      <Nav>
        {/* 로고 */}
        <Link href="/">
          <Image src={logo} alt="logo" width={300} height={50} />
        </Link>

        {/* 링크 리스트 */}
        <Ul>
          {NAV_LINK.map((link) => (
            <Link
              key={link.key}
              href={link.href}
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
                src={profile}
                alt="profile"
                width={32}
                height={32}
                className="mr-2"
              />
              <span>{user?.name || "kt기업회원"} / </span>
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
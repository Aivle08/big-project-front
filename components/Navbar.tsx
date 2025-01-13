import { NAV_LINK } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import NavButton from './NavButton'
import { Ul, Wrapper, Nav, NavButtons } from './styles/pageStyled'

export default function Navbar() {
  return (
    <Wrapper>
      <Nav>
        {/* 로고 */}
        <Image src="/logo.png" alt="logo" width={309} height={74} />

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
          <NavButton
            type="button"
            title="회원가입"
            bgColor="#FFFFFF"
            txtColor="#000000"
            borderColor="border-black"
          />

          <NavButton
            type="button"
            title="로그인"
            bgColor="#FFBD26"
            txtColor="#FFFFFF"
            borderColor="border-yellow-200"
          />
        </NavButtons>
      </Nav>
    </Wrapper>
  )
}


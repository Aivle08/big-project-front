import { NAV_LINK } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import NavBtn from './NavButton'
import { Ul, Wrapper, Nav, NavButtons } from './styles/componentStyled'

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
          <Link href="/login?form=signin">
            <NavBtn
              type="button"
              title="회원가입"
              bgColor="#FFFFFF"
              txtColor="#000000"
              borderColor="border-black"

            />
          </Link>
          

          <Link href="/login">
            <NavBtn
              type="button"
              title="로그인"
              bgColor="#FFBD26"
              txtColor="#FFFFFF"
              borderColor="border-yellow-200"
            />
          </Link>
        </NavButtons>
      </Nav>
    </Wrapper>
  )
}


'use client'
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import logo from "../../logo.png";
import { Container, Form, FormButton, FormInput1, OverlayButton, OverlayContainer, RightPanelActiveOverlayLeft, RightPanelActiveOverlayRight, SignInContainer, SignUpContainer, Wrapper, Title, Div, P, Detail, FormInput2 } from "./styles/Page.styled";

export default function Login() {

  // 로그인, 회원가입 패널 전환 처리해주는 부분
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    
    <Wrapper>


{/* input type="text" name="price" id="price" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="0.00 */}

      <Container className={isRightPanelActive ? "right-panel-active" : ""}>
        {/* Sign Up */}
        <SignUpContainer>
          <Form>
            <Title>회원가입</Title>
            <br />
            <span>정보를 입력해주세요.</span>
            <FormInput1 type="text" placeholder="Name" />
            <FormInput1 type="email" placeholder="Email" />
            <FormInput1 type="password" placeholder="Password" />
            <FormButton>Sign Up</FormButton>
          </Form>
        </SignUpContainer>

        {/* Sign In */}
        <SignInContainer>
          <Form>
            <Title>로그인</Title>

            <Detail>정보를 입력해주세요.</Detail>
            <FormInput2 type="text" placeholder="아이디" />
            <FormInput2 type="password" placeholder="비밀번호" />
            <FormButton>로그인</FormButton>
          </Form>
        </SignInContainer>

        {/* Overlay */}
        <OverlayContainer>
          <Div>
          {isRightPanelActive ? (
            <RightPanelActiveOverlayLeft>
              <Image src={logo} alt="logo" />
              <P>이미 회원가입을 완료했다면 로그인</P>
              <OverlayButton onClick={handleSignInClick}>
                로그인
              </OverlayButton>
            </RightPanelActiveOverlayLeft>
          ) : (
            <RightPanelActiveOverlayRight>
              <Image src={logo} alt="logo" />
              <P>아직 픽업의 회원이 아니시라고요?</P>
              <OverlayButton onClick={handleSignUpClick}>
                회원가입
              </OverlayButton>
            </RightPanelActiveOverlayRight>
          )}
          </Div>
        </OverlayContainer>
      </Container>
    </Wrapper>
  );
}







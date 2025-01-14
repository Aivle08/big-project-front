'use client'
import Image from "next/image";
import { SetStateAction, useState } from "react";
import Link from "next/link";
import { CheckButton, Container, ContainerButton, ContainerForm, Description, Detail, EmailContainer, EmailInputWrapper, ErrorMessage, Form1, Form2, InputWrapper, OverlayBox, OverlayButton, OverlayContainer, OverlayPanel, SuccessMessage, Title, VerificationMessage, VerifyButton, Wrapper } from "./styles/Page.styled";
import logo from "../../logo.png";

export default function Login() {

  // 로그인/회원가입 창 왔다리갔다리 구현
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };


  // 이메일 인증 구현  ---------------------------------------------------------------------------
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // 이메일 형식 췤
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 인증 메일 발송
  const handleSendVerification = () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    // 여기에 실제 이메일 발송 로직 구현
    setIsEmailSent(true);
    setError('');
  };

  // 인증번호 확인
  const handleVerifyCode = () => {
    if (!verificationCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }

    // 여기에 실제 인증번호 확인 로직 구현
    if (verificationCode === '123456') { // 예시 코드
      setIsVerified(true);
      setError('');
    } else {
      setError('잘못된 인증번호입니다.');
    }
  };


   // 아이디 관련 구현 ---------------------------------------------------------------------------
   const [userId, setUserId] = useState('');
   const [isIdChecked, setIsIdChecked] = useState(false);
   const [isIdAvailable, setIsIdAvailable] = useState(false);

    // 아이디 형식 췤 (4-20자의 영문, 숫자만 ok)
    const isValidId = (id: string) => {
        return /^[A-Za-z0-9]{4,20}$/.test(id);
    };


    // 아이디 중복 체크
    const handleIdCheck = async () => {
        if (!userId) {
        setError('아이디를 입력해주세요.');
        return;
        }

        if (!isValidId(userId)) {
        setError('아이디는 4-20자의 영문과 숫자만 사용 가능합니다.');
        return;
        }

        // 여기에 실제 아이디 중복 체크 로직 구현
        try {
        // API 호출 예시
        // const response = await fetch('/api/check-id', {
        //   method: 'POST',
        //   body: JSON.stringify({ userId }),
        // });
        // const data = await response.json();
        
        // 임시 체크 로직 (실제 구현 시에는 API 호출로 대체)
        const isAvailable = !['admin', 'test', 'user'].includes(userId);
        
        if (isAvailable) {
            setIsIdAvailable(true);
            setIsIdChecked(true);
            setError('');
        } else {
            setIsIdAvailable(false);
            setError('이미 사용 중인 아이디입니다.');
        }
        } catch (err) {
        setError('아이디 중복 확인 중 오류가 발생했습니다.');
        }
    };

    // 아이디 입력값 변경 시
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
        setIsIdChecked(false);
        setIsIdAvailable(false);
    };

  return (
    <Wrapper>
    
    <Container className={`${
      isRightPanelActive ? 'right-panel-active' : ''
    }`}>
      {/* 회원가입 Container */}
      <div className="absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 opacity-0 z-1 
        transform sign-up-container ${isRightPanelActive ? 'translate-x-full opacity-100 z-5 animate-show' : ''}">
        <ContainerForm>
          <Title>회원가입</Title>
          <Detail>정보를 입력하세요.</Detail>
            <Form1 type="text" placeholder="기업명" />
            <Form1 type="text" placeholder="부서" /> 
            {/* <Form1 type="email" placeholder="이메일(변경 불가)" className="mt-4" /> */}
            {/* 이메일 인증 섹션 */}
            <EmailContainer className="mt-4">
                <EmailInputWrapper>
                <Form1
                    type="email"
                    placeholder="이메일(변경 불가)"
                    value={email}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    disabled={isVerified}
                />
                <VerifyButton
                    onClick={handleSendVerification}
                    disabled={isVerified || !email}
                >
                    {isEmailSent ? '재전송' : '인증하기'}
                </VerifyButton>
                </EmailInputWrapper>
        
                {isEmailSent && !isVerified && (
                <EmailInputWrapper>
                    <Form1
                    type="text"
                    placeholder="인증번호 6자리 입력"
                    value={verificationCode}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    />
                    <VerifyButton
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6}
                    >
                    확인
                    </VerifyButton>
                </EmailInputWrapper>
                )}
        
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {isVerified && (
                <VerificationMessage>이메일 인증이 완료되었습니다.</VerificationMessage>
                )}
            </EmailContainer>
                
            <InputWrapper>
                <Form1
                type="text"
                placeholder="아이디 (4-20자의 영문, 숫자)"
                value={userId}
                onChange={handleIdChange}
                disabled={isIdAvailable}
                />
                <CheckButton
                onClick={handleIdCheck}
                disabled={isIdAvailable || !userId}
                >
                중복확인
                </CheckButton>
            </InputWrapper>
            {isIdAvailable && (
                <SuccessMessage>사용 가능한 아이디입니다.</SuccessMessage>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}    
          {/* <Form1 type="text" placeholder="아이디" /> */}
          <Form1 type="password" placeholder="비밀번호(8자리 이상, 영문/숫자/기호 포함)" />
          <Form1 type="password" placeholder="비밀번호 확인" />
          <Form1 type="text" placeholder="이름" className="mt-4" /> 
          <Form1 type="tel" placeholder="휴대폰 번호" /> 
          <ContainerButton>
            회원가입
          </ContainerButton>
        </ContainerForm>
      </div>

      {/* 로그인 Container */}
      <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 
        ${isRightPanelActive ? 'translate-x-full' : ''}`}>
        <ContainerForm>
          <Title>로그인</Title>
          <Detail>로그인해주세요.</Detail>
          <Form2 type="email" placeholder="아이디" />
          <Form2 type="password" placeholder="비밀번호" />
          <ContainerButton>
            로그인
          </ContainerButton>
        </ContainerForm>
      </div>



      {/* 노란박스 Container */}
      <OverlayContainer $isActive={isRightPanelActive}>
        <OverlayBox $isActive={isRightPanelActive}>
            {/* 왼쪽 패널 - 회원가입 */}
            <OverlayPanel $position="left" $isActive={isRightPanelActive}>
                <Image src={logo} alt="logo" />
                <Description>아직 픽업의 회원이 아니시라고요?</Description>
                <OverlayButton onClick={handleSignInClick}>회원가입</OverlayButton>
            </OverlayPanel>

            {/* 오른쪽 패널 - 로그인 */}
            <OverlayPanel $position="right" $isActive={isRightPanelActive}>
                <Image src={logo} alt="logo" />
                <Description>이미 회원가입을 완료했다면 로그인 해주세요.</Description>
                <OverlayButton onClick={handleSignUpClick}>로그인</OverlayButton>
            </OverlayPanel>
        </OverlayBox>
      </OverlayContainer>
    </Container>
  </Wrapper>


  );
}







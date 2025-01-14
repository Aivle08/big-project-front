'use client'
import Image from "next/image";
import { SetStateAction, useState } from "react";
import {
  ContainerForm,
  Title,
  Detail,
  Form1,
  EmailContainer,
  EmailInputWrapper,
  VerifyButton,
  VerificationMessage,
  ErrorMessage,
  ContainerButton
} from './page.style';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  
  // 이메일 형식 검증
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

    // 여기에 실제 인증번호 확인 로직 구현 (예정, 아직 구현 안 함)
    if (verificationCode === '123456') { // 예시 코드
      setIsVerified(true);
      setError('');
    } else {
      setError('잘못된 인증번호입니다.');
    }
  };

  #fdb503

  return (
    <ContainerForm>
      <Title>회원가입</Title>
      <Detail>정보를 입력하세요.</Detail>
      <Form1 type="text" placeholder="기업명" />
      <Form1 type="text" placeholder="부서" />
      {/* 이메일 input */}
      <EmailContainer>
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

      <Form1 type="text" placeholder="아이디" />
      <Form1
        type="password"
        placeholder="비밀번호(8자리 이상, 영문/숫자/기호 포함)"
      />
      <Form1 type="password" placeholder="비밀번호 확인" />
      <Form1 type="text" placeholder="이름" className="mt-4" />
      <Form1 type="tel" placeholder="휴대폰 번호" />
      
      <ContainerButton>회원가입</ContainerButton>
    </ContainerForm>
  );
}
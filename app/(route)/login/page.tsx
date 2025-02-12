'use client'
import Image from "next/image";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { BackButton, BackContainer, CheckButton, Container, ContainerButton, ContainerForm, Description, Detail, EmailContainer, EmailInputWrapper, ErrorMessage, Form1, Form2, InputWrapper, JobContainer, OverlayBox, OverlayButton, OverlayContainer, OverlayPanel, SuccessMessage, Title, VerificationMessage, VerifyButton, Wrapper } from "./styles/Page.styled";
import logo from "@/public/images/logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { loginUser, registerUser } from '../../redux/thunks/authThunks';
import { authAPI } from '../../api/authAPI';
import LoadingSpinner from "@/components/SmallLoadingSpinner";


interface FormElements extends HTMLFormControlsCollection {
  companyName: HTMLInputElement;
  departmentName: HTMLInputElement;
  username: HTMLInputElement;
  contact: HTMLInputElement;
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const searchParams = useSearchParams();
  // 라우팅 (뒤로가기 화살표)
  const router = useRouter();
  // 로그인/회원가입 창 왔다리갔다리 구현
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  // 회원가입 시 필요함------------------------------------------------------------------------
  const [companyName, setCompanyName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [username, setUserName] = useState('');
  const [contact, setContact] = useState('');
  const [position, setPosition] = useState('');
  // 이메일 인증 구현  ---------------------------------------------------------------------------
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [emailError, setEmailError] = useState('');
  // 아이디 관련 구현 ---------------------------------------------------------------------------
  const [userId, setUserId] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [idError, setIdError] = useState('');
  // 비밀번호 췤 ----------------------------------------------------------------------------
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // for loading ui
  const [isEmailSending, setIsEmailSending] = useState(false);

  // URL 파라미터를 확인하여 초기 상태 설정
  useEffect(() => {
    const form = searchParams.get('form');
    if (form === 'signin') {
      setIsRightPanelActive(false);  // 로그인 폼 표시
    } else {
      setIsRightPanelActive(true);   // 회원가입 폼 표시
    }
  }, [searchParams]);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  // 이메일 형식 췤
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 인증 메일 발송
  const handleSendVerification = async () => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    
    if (!isValidEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    // 로딩 시작
    setIsEmailSending(true);
  
    try {
      // API 호출하여 이메일 인증 요청
      const response = await authAPI.sendVerificationEmail(email);
      
      console.log(response);
      if (response.status === 200) {
        setIsEmailSent(true);
        setEmailError('');
        // 성공 메시지 표시
        alert('인증 메일이 발송되었습니다. 이메일을 확인해주세요.');
      } else {
        setEmailError('이메일 발송에 실패했습니다. 이미 이메일 요청을 수행했는지 확인해주세요요');
      }
    } catch (error: any) {
      console.error('Email verification error:', error);
      setEmailError(error.response?.data?.message || '이메일 발송 중 오류가 발생했습니다.');
      setIsEmailSent(false);
    }finally{
      setIsEmailSending(false);
    }
  };
  

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setEmailError('인증번호를 입력해주세요.');
      return;
    }
  
    try {
      const response = await authAPI.verifyEmailCode(verificationCode);
      
      if (response.status === 200) {
        setIsVerified(true);
        setEmailError('');
      } else {
        setEmailError('잘못된 인증번호입니다.');
      }
    } catch (error: any) {
      console.error('Code verification error:', error);
      setEmailError(error.response?.data?.message || '인증번호 확인 중 오류가 발생했습니다.');
    }
  };

    // 아이디 형식 췤 (4-20자의 영문, 숫자만 ok)
    const isValidId = (id: string): boolean => {
        return /^[A-Za-z0-9]{4,20}$/.test(id);
    };


    // 아이디 중복 체크
    const handleIdCheck = async () => {
      if (!userId) {
        setIdError('아이디를 입력해주세요.');
        return;
      }

      if (!isValidId(userId)) {
        setIdError('아이디는 4-20자의 영문과 숫자만 사용 가능합니다.');
        return;
      }

      try {
        const response = await authAPI.checkIdAvailability(userId);
        if (response.status === 200) {
          setIsIdAvailable(true);
          setIsIdChecked(true);
          setIdError('');
        } else {
          setIsIdAvailable(false);
          setIdError('이미 사용 중인 아이디입니다.');
        }
      } catch (err: any) {
        setIdError(err.response?.data?.message || '아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e: { target: { value: string } }) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      
      // 비밀번호 확인란이 비어있지 않은 경우에만 검증
      if (confirmPassword && newPassword !== confirmPassword) {
          setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
          setPasswordError('');
        }
    };

    // 비밀번호 확인 입력 핸들러
    const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
      const newConfirmPassword = e.target.value;
      setConfirmPassword(newConfirmPassword);
      
      if (newConfirmPassword !== password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
      setPasswordError('');
      }
    };


     // 로그인 처리
     const handleLogin = async (e: FormEvent) => {
      e.preventDefault();
      
      if (!loginUserId || !loginPassword) {
        setEmailError('아이디와 비밀번호를 모두 입력해주세요.');
        return;
      }

      console.log("로그인 시도");
    
      try {
        const result = await dispatch(loginUser({
          id: loginUserId,
          password: loginPassword
        }));
        
        console.log(result);

        if (result.payload.status === 200) {
          console.log("로그인 성공 확인!");
          router.push('/'); // 로그인 성공 시 홈페이지로 이동
        }
      } catch (err: any) {
        setEmailError(err.message || '로그인에 실패했습니다.');
      }
    };

    // 회원가입 처리
    const handleRegister = async (e: FormEvent) => {
      e.preventDefault();

      // 필수 필드 검사
      if (!companyName || !departmentName || !position || !email || !userId || !password || !username || !contact) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      const numericContact = contact.replace(/[^\d]/g, '');
      if (numericContact.length < 10 || numericContact.length > 11) {
        alert('유효한 휴대폰 번호를 입력해주세요.');
        return;
      }

      const formData = {
        companyName,
        departmentName,
        position,
        email,
        userId,
        password,
        username,
        contact,
      };
    
      try {
        // dispatch 대신 직접 API 호출
        const response = await authAPI.register(formData);
        console.log('Registration response:', response); // 응답 확인용
    
        if (response.success || response.status === 201) {
          alert('회원가입이 완료되었습니다.');
          // 입력 필드 초기화
          setCompanyName('');
          setDepartmentName('');
          setPosition('');
          setEmail('');
          setUserId('');
          setPassword('');
          setConfirmPassword('');
          setUserName('');
          setContact('');
          setIsEmailSent(false);
          setVerificationCode('');
          setIsVerified(false);
          setIsIdChecked(false);
          setIsIdAvailable(false);
          
          // 회원가입한 아이디와 비밀번호를 로그인 폼에 자동 입력
          setLoginUserId(userId);
          setLoginPassword(password);
          
          // 로그인 폼으로 전환
          handleSignUpClick();
          // setIsRightPanelActive(false);
          
          // URL 업데이트 (선택사항)
          window.history.pushState({}, '', '/login?form=signin');
        } else {
          throw new Error(response.message || '회원가입에 실패했습니다.');
        }
      } catch (error: any) {
        console.error('Registration error details:', error); // 에러 상세 확인용
        
        // 에러 메시지 상세 처리
        const errorMessage = error.response?.data?.message 
          || error.message 
          || '회원가입 처리 중 오류가 발생했습니다.';
        
        alert(errorMessage);
      }
    }

    // 전화번호 입력할 떄 - 추가해주고, 글자수 제한해주는 핸들러임
    // contact state 관리하는 부분은 그대로 두고 새로운 핸들러 함수 추가
    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // 숫자만 추출
      const numbers = value.replace(/[^\d]/g, '');
      
      // 최대 11자리까지만 허용 (010-1234-5678 형식)
      const trimmed = numbers.slice(0, 11);
      
      let formattedNumber = '';
      if (trimmed.length <= 3) {
        formattedNumber = trimmed;
      } else if (trimmed.length <= 7) {
        formattedNumber = `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
      } else {
        formattedNumber = `${trimmed.slice(0, 3)}-${trimmed.slice(3, 7)}-${trimmed.slice(7)}`;
      }
      
      setContact(formattedNumber);
    };


    

  return (
    <Wrapper>
    
    <Container className={`${
      isRightPanelActive ? 'right-panel-active' : ''
    }`}>
      {/* 회원가입 Container */}
      <div className="absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 opacity-0 z-1 
        transform sign-up-container ${isRightPanelActive ? 'translate-x-full opacity-100 z-5 animate-show' : ''}">
        <ContainerForm onSubmit={handleRegister}>
          <BackContainer>
            <BackButton onClick={() => router.back()} aria-label="뒤로 가기">
              <ArrowLeft size={24} />
            </BackButton>
          </BackContainer>
          <Title>회원가입</Title>
          <Detail>정보를 입력하세요.</Detail>

            {/* 기업명 & 부서 */}
            <Form1 
              name="companyName" 
              type="text" 
              placeholder="기업명"
              value={companyName}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCompanyName(e.target.value)}
            />
            <JobContainer>
              <Form1 
                name="departmentName" 
                type="text" 
                placeholder="부서"
                value={departmentName}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDepartmentName(e.target.value)}
              /> 
              <Form1 
                name="position" 
                type="text" 
                placeholder="직무"
                value={position}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPosition(e.target.value)}
              /> 
            </JobContainer>

            {/* 이메일 인증 섹션 */}
            <EmailContainer className="mt-4">
              <EmailInputWrapper>
                <Form1
                  name="email"
                  type="email"
                  placeholder="이메일(변경 불가)"
                  value={email}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                  disabled={isVerified}
                />
                <VerifyButton
                  type="button"
                  onClick={handleSendVerification}
                  disabled={isVerified || !email || isEmailSending}
                >
                  {isEmailSending ? (
                    <LoadingSpinner />
                  ) : (
                    isEmailSent ? '재전송' : '인증하기'
                  )}
                </VerifyButton>
              </EmailInputWrapper>
        
              {isEmailSent && !isVerified && (
                <EmailInputWrapper>
                  <Form1
                    type="text"
                    placeholder="이메일 인증코드 입력"
                    value={verificationCode}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setVerificationCode(e.target.value)}
                  />
                  <VerifyButton
                    type="button"
                    onClick={handleVerifyCode}
                  >
                  확인
                  </VerifyButton>
                </EmailInputWrapper>
              )}
        
              {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
              {isVerified && (
                <VerificationMessage>이메일 인증이 완료되었습니다.</VerificationMessage>
              )}
            </EmailContainer>
            
            {/* 아이디 */}
            <InputWrapper>
              <Form1
                name="userId"
                type="text"
                placeholder="아이디 (4-20자의 영문, 숫자)"
                value={userId}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserId(e.target.value)}
                disabled={isIdAvailable}
              />
              <CheckButton
                type="button"
                onClick={handleIdCheck}
                disabled={isIdAvailable || !userId}
              >
              중복확인
              </CheckButton>
            </InputWrapper>
            {isIdAvailable && (
              <SuccessMessage>사용 가능한 아이디입니다.</SuccessMessage>
            )}
            {idError && <ErrorMessage>{idError}</ErrorMessage>}    

          {/* 비밀번호 */}
          <Form1 
            name="password"
            type="password" 
            placeholder="비밀번호(8자리 이상, 영문/숫자/기호 포함)" 
            value={password}
            onChange={handlePasswordChange}
            />
            <Form1 
              type="password" 
              placeholder="비밀번호 확인" 
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

          {/* 이름 & 휴대폰 번호   */}
          <Form1 
            name="username" 
            type="text" 
            placeholder="이름" 
            className="mt-4" 
            value={username}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserName(e.target.value)}
          /> 
          <Form1 
            name="contact" 
            type="tel" 
            placeholder="휴대폰 번호" 
            value={contact}
            onChange={handleContactChange}
            maxLength={13} // 하이픈 포함 13자리
          /> 

          <ContainerButton type="submit">
            회원가입
          </ContainerButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ContainerForm>
      </div>

      {/* 로그인 Container */}
      <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 
        ${isRightPanelActive ? 'translate-x-full' : ''}`}>
        <ContainerForm onSubmit={handleLogin}>
          <Title>로그인</Title>
          <Detail>로그인해주세요.</Detail>
          <Form2 
            type="text" 
            placeholder="아이디"
            value={loginUserId}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLoginUserId(e.target.value)}
          />
          <Form2 
            type="password" 
            placeholder="비밀번호" 
            value={loginPassword}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLoginPassword(e.target.value)}
          />
          <ContainerButton type="submit">
            로그인
          </ContainerButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ContainerForm>
      </div>

      {/* 노란박스 Container */}
      <OverlayContainer $isActive={isRightPanelActive}>
        <OverlayBox $isActive={isRightPanelActive}>
          {/* 왼쪽 패널 - 회원가입 */}
          <OverlayPanel $position="left" $isActive={isRightPanelActive}>
            <BackButton onClick={() => router.back()} className="mt-7 ml-7">
              <ArrowLeft size={24} />
            </BackButton>
            <Image src={logo}  alt="logo" />
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





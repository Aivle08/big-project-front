'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { Container, FileList, SectionLine, Section, Label1, Input1, Input2, SubLabel, UploadContainer, FileItem, FileIcon, FileSize, DeleteButton, Title, FirstContainer, Left, Right, SecondContainer, Detail, Label2, FileContainer, FileContainer2, EvaluationHeader, Span, Progress, Bar, AnalysisButton, ButtonArea, CharCount } from "./styles/Page.styled";
import { X } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { submitResumeAnalysis } from '../../redux/features/resumeSlice';
import { ResumeAnalysisRequest } from '../../types/resume';

interface FileData {
  file: File;
  name: string;
  size: string;
  progress: number;
}

export default function Resume() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.resume);

  const [files, setFiles] = useState<FileData[]>([]);
  const [job, setJob] = useState('');

  // 각 입력 필드의 값을 관리할 상태
  const [inputs, setInputs] = useState({
    jobPosting: '',     // 채용 공고
    ideals: '',         // 인재상
    education: '',      // 학력
    activities: '',     // 대외활동 등
    experience: ''      // 경력
  });

  // 직무 입력 핸들러
  const handleJobChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJob(e.target.value);
  };

  // 파일 업로드 핸들러
  const handleFileUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    const uploadedFiles: FileData[] = Array.from(event.target.files).map(file => ({
      file,
      name: file.name,
      size: `${Math.round((file.size / 1024) * 100) / 100} KB`,
      progress: 100 // 실제 업로드 프로그레스 로직 필요 시 변경
    }));
    
    setFiles((prev) => [...prev, ...uploadedFiles]);
  }, []);

  // 파일 삭제 핸들러
  const handleFileDelete = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 각 항목 최대 200자 입력 제한
  const handleInputChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setInputs((prev) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // "분석하기" 버튼 클릭 시 호출되는 함수
  const handleAnalysis = async () => {
    const evaluationList = [
      { item: '인재상', detail: inputs.ideals },
      { item: '학력', detail: inputs.education },
      { item: '대외활동/수상내역/어학/자격증', detail: inputs.activities },
      { item: '경력', detail: inputs.experience },
    ];

    const analysisData: ResumeAnalysisRequest = {
      title: inputs.jobPosting,
      job: job,
      evaluationList: evaluationList
    };

    try {
      // Redux Thunk 호출 -> 실제 서버로 요청
      await dispatch(submitResumeAnalysis(analysisData)).unwrap();
      alert('분석 요청 전송완완');
    } catch (err) {
      // 에러 처리
      console.error('failes:', err);
      alert('오류발생.');
    }
  };

  return (
    <Container>
      <Title>이력서 분석</Title>
      <SectionLine />
      <Section />

      {/* 첫 번째 섹션 */}
      <FirstContainer>
        {/* 왼쪽 */}
        <Left>
          <Section>
            <Label1>직무</Label1>
            <Input1
              type="text"
              placeholder="채용 직무를 입력하세요."
              value={job}
              onChange={handleJobChange}
            />
          </Section>

          <Section>
            <Label1>이력서 업로드</Label1>
            <SubLabel>해당 직무에 지원한 이력서를 업로드 하세요.</SubLabel>
            <UploadContainer>
              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full"
                accept=".pdf"
                multiple
              />
            </UploadContainer>
          </Section>
        </Left>

        {/* 오른쪽 */}
        <Right>
          <Section />
          <FileList>
            {files.map((file, index) => (
              <FileItem key={index}>
                <FileContainer>
                  <FileIcon viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </FileIcon>
                </FileContainer>
                <FileContainer2>
                  <EvaluationHeader>
                    <Span>{file.name}</Span>
                    <DeleteButton onClick={() => handleFileDelete(index)}>
                      <X size={16} />
                    </DeleteButton>
                  </EvaluationHeader>
                  <FileSize>{file.size}</FileSize>
                  <Progress>
                    <Bar style={{ width: `${file.progress}%` }} />
                  </Progress>
                </FileContainer2>
              </FileItem>
            ))}
          </FileList>
        </Right>
      </FirstContainer>

      {/* 두 번째 섹션 */}
      <SecondContainer>
        <Section>
          <Label1>평가 항목 입력</Label1>
          <Detail>5개의 채용 평가 기준에 대한 상세 내용을 입력하세요.</Detail>
          <Detail>각 항목은 최대 200자까지 작성 가능합니다.</Detail>
        </Section>

        {/* 1. 채용 공고 */}
        <Section>
          <Label2>채용 공고</Label2>
          <div className="relative">
            <Input2
              type="text"
              placeholder="채용 공고를 입력하세요."
              value={inputs.jobPosting}
              onChange={handleInputChange('jobPosting')}
            />
            <CharCount
              style={{
                color:
                  inputs.jobPosting.length >= 200
                    ? '#ef4444'
                    : inputs.jobPosting.length >= 180
                    ? '#f59e0b'
                    : '#888'
              }}
            >
              {inputs.jobPosting.length}/200
            </CharCount>
          </div>
        </Section>

        {/* 2. 인재상 */}
        <Section>
          <Label2>인재상</Label2>
          <div className="relative">
            <Input2
              type="text"
              placeholder="인재상 부문의 평가 내용을 입력하세요."
              value={inputs.ideals}
              onChange={handleInputChange('ideals')}
            />
            <CharCount
              style={{
                color:
                  inputs.ideals.length >= 200
                    ? '#ef4444'
                    : inputs.ideals.length >= 180
                    ? '#f59e0b'
                    : '#888'
              }}
            >
              {inputs.ideals.length}/200
            </CharCount>
          </div>
        </Section>

        {/* 3. 학력 */}
        <Section>
          <Label2>학력</Label2>
          <div className="relative">
            <Input2
              type="text"
              placeholder="학력 부문의 평가 내용을 입력하세요."
              value={inputs.education}
              onChange={handleInputChange('education')}
            />
            <CharCount
              style={{
                color:
                  inputs.education.length >= 200
                    ? '#ef4444'
                    : inputs.education.length >= 180
                    ? '#f59e0b'
                    : '#888'
              }}
            >
              {inputs.education.length}/200
            </CharCount>
          </div>
        </Section>

        {/* 4. 대외활동 + 수상내역 + 어학 + 자격증 */}
        <Section>
          <Label2>대외활동&nbsp;/&nbsp;수상내역&nbsp;/&nbsp;어학&nbsp;/&nbsp;자격증</Label2>
          <div className="relative">
            <Input2
              type="text"
              placeholder="대외활동/ 수상내역/ 어학/ 자격증 부문의 평가 내용을 입력하세요."
              value={inputs.activities}
              onChange={handleInputChange('activities')}
            />
            <CharCount
              style={{
                color:
                  inputs.activities.length >= 200
                    ? '#ef4444'
                    : inputs.activities.length >= 180
                    ? '#f59e0b'
                    : '#888'
              }}
            >
              {inputs.activities.length}/200
            </CharCount>
          </div>
        </Section>

        {/* 5. 경력 */}
        <Section>
          <Label2>경력</Label2>
          <div className="relative">
            <Input2
              type="text"
              placeholder="경력 부문의 평가 내용을 입력하세요."
              value={inputs.experience}
              onChange={handleInputChange('experience')}
            />
            <CharCount
              style={{
                color:
                  inputs.experience.length >= 200
                    ? '#ef4444'
                    : inputs.experience.length >= 180
                    ? '#f59e0b'
                    : '#888'
              }}
            >
              {inputs.experience.length}/200
            </CharCount>
          </div>
        </Section>
      </SecondContainer>

      <ButtonArea>
        <AnalysisButton
          onClick={handleAnalysis}
          disabled={loading || !job || !inputs.jobPosting}
        >
          {loading ? '분석 중...' : '분석하기'}
        </AnalysisButton>
      </ButtonArea>
    </Container>
  );
}

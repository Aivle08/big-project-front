"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CloseButton, ModalBackground, ModalContainer, ModalContent, ModalHeader, ModalSubtitle, ModalTitle, PDFViewer, TitleContainer } from "./styles/modalStyled";
import modalcloseicon from '../public/images/modalclose_icon.png';
import paper from '../public/images/paper.png';

type ResumeModalProps = {
  name: string;
  pdfUrl: string; // PDF 파일의 URL
};

export default function ResumeModal({ name, pdfUrl }: ResumeModalProps) {
    const [openModal, setModal] = useState(false);
  
    const handleModal = () => {
      setModal(!openModal);
    };

    const [pdfs, setPdfs] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchPdfUrl = async () => {
        try {
          const response = await fetch(
            `https://picks-up.site/api/v1/recruitment/0/applicant/${pdfUrl}/pdf`,
            {
              headers: {
                Accept: "*/*",
              },
            }
          );
  
          if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.statusText}`);
          }
  
          // Blob 데이터를 가져와서 브라우저에서 사용할 URL 생성
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPdfs(url);
        } catch (err: any) {
          console.error("Error fetching PDF:", err);
          setError("PDF를 불러오는 중 오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchPdfUrl();
    }, [pdfUrl]);

    
  
    return (
      <div>

        {/* 이 버튼은 나중에 지원서 아이콘 이미지를 넣을거임임 */}
        <div
          onClick={handleModal}
          className="cursor-pointer"
        >
          <Image
              src={paper}
              alt="Resume Link"
              layout="intrinsic"
              width={24}
              height={24}
              className="object-cover"
          />
        </div>
        {openModal && (
          <ModalBackground>
            <ModalContainer>
              {/* 위쪽 영역 */}
              <ModalHeader>
                <TitleContainer>
                  <ModalTitle>{name}</ModalTitle>
                  <ModalSubtitle>지원자</ModalSubtitle>
                </TitleContainer>
                <CloseButton onClick={handleModal}>
                  <Image src={modalcloseicon} alt="close" width={32} height={32} />
                </CloseButton>
              </ModalHeader>
  
              {/* 내부 콘텐츠 */}
              <ModalContent>
                <PDFViewer>
                  <iframe
                    src={pdfs + "#toolbar=0"}
                    title="pdfView"
                    width="100%"
                    height="100%"
                    className="border rounded-md"
                  ></iframe>
                </PDFViewer>
              </ModalContent>
            </ModalContainer>
          </ModalBackground>
        )}
      </div>
    );
  }
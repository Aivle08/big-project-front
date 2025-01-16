"use client";
import React, { useState } from "react";
import Image from "next/image"
import { CloseButton, ModalBackground, ModalContainer, ModalContent, ModalHeader, ModalSubtitle, ModalTitle, PDFViewer, TitleContainer } from "./styles/modalStyled";

type ResumeModalProps = {
  name: string;
  pdfUrl: string; // PDF 파일의 URL
};

export default function ResumeModal({ name, pdfUrl }: ResumeModalProps) {
    const [openModal, setModal] = useState(false);
  
    const handleModal = () => {
      setModal(!openModal);
    };
  
    return (
      <div>

        {/* 이 버튼은 나중에 지원서 아이콘 이미지를 넣을거임임 */}
        <button
          type="button"
          onClick={handleModal}
        >
          모달열기
        </button>
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
                  <Image src="/modalclose_icon.png" alt="close" width={32} height={32} />
                </CloseButton>
              </ModalHeader>
  
              {/* 내부 콘텐츠 */}
              <ModalContent>
                <PDFViewer>
                  <iframe
                    src={pdfUrl + "#toolbar=0"}
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
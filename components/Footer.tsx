import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center w-full py-4">
        {/* 아이콘 영역 */}
        <div className="w-[192px] h-[102px] flex flex-row justify-between items-center gap-[24px]">
          <Image src="/instagram_icon.png" alt="Instagram" width={48} height={48} />
          <Image src="/linkedin_icon.png" alt="Linked In" width={48} height={48} />
          <Image src="/mail_icon.png" alt="Mail" width={48} height={48} />
        </div>

        {/* 텍스트 영역 */}
        <p className="text-[#828282] font-normal text-[16px] leading-[22px]">
          &copy; AIvler 08조 2025
        </p>
    </footer>
  )
}

export default Footer
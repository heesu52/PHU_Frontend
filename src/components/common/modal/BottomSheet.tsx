import { useEffect } from 'react';
import compactup from "../../../assets/compact-up.svg";
import SubmitButton from "../button/SubmitButton";
import Input from "../Input";

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean; 
}

function BottomSheet({ onClose, isOpen }: BottomSheetProps) {
  useEffect(() => {
    // BottomSheet가 열릴 때 스크롤을 비활성화
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed bottom-0 w-[600px] h-[250px] bg-white border shadow-lg rounded-md transition-transform duration-300 transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } z-20`}
      >
        <div className="flex flex-col items-center justify-between p-1">
          <img
            src={compactup}
            className="w-12 transform rotate-180 cursor-pointer"
            onClick={onClose}
          />
          <span className="text-sm">추가할 회원의 이메일을 입력하세요</span>
        </div>
        <div className="flex flex-col items-center p-7">
          <Input
            size="medium"
            placeholder="email"
            type="email"
            className="placeholder:text-custom-softgrey"
            required
          />
          <SubmitButton
            label="확인"
            size="small"
            className={`m-7 cursor-pointer bg-custom-blue`}
          />
        </div>
      </div>
    </>
  );
}

export default BottomSheet;

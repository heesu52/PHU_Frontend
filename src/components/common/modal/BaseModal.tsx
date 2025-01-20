import { ReactNode } from "react";
import { useModal } from "../../../hooks/useModal"; // useModal 훅 임포트

interface ModalProps {
  onClose: () => void;           // 모달을 닫는 함수
  isOpen: boolean;               // 모달의 열림 상태
  title: string;                 // 모달 제목
  message1: string;               // 모달 내용
  message2?: string;               // 모달 내용
  confirmText: string;           // 확인 버튼 텍스트
  cancelText?: string;            // 취소 버튼 텍스트
  children?: ReactNode;          // 추가적으로 넣고 싶은 내용
  onConfirm?: () => void;        // 확인 버튼 클릭 시 실행할 함수 (선택적)
}

function Modal({
  onClose,
  title,
  message1,
  message2,
  onConfirm,
  confirmText,
  cancelText,
  children,
  isOpen,
}: ModalProps) {
  useModal({ isOpen, onClose }); // useModal 훅을 사용하여 모달의 상태를 관리


  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="mb-4 text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{message1}</p>
        <p className="text-sm text-gray-600">{message2}</p>
        {children && <div className="mt-4">{children}</div>} 
        <div className="flex justify-end gap-4 mt-4">
          {onConfirm && (
            <button
              onClick={onConfirm} 
              className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              {confirmText}
            </button>
          )}
          <button
            onClick={onClose}  
            className="px-4 py-2 text-sm text-gray-700 rounded-md bg-custom-softgrey hover:bg-custom-grey"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import { useNavigate } from "react-router-dom";
import BaseModal from "./BaseModal";  

interface ChangetoTextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChangetoTextModal({ isOpen, onClose }: ChangetoTextModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); 
    navigate("/member/summary"); 
  };

  return (
    <BaseModal
    isOpen={isOpen}  
    onClose={onClose}
    title="녹음이 종료되었습니다"
    message1={"녹음 내용을 텍스트로 변환 할까요?"}
    message2={"변환하지 않으시면 요약 리스트 페이지로 이동합니다!"}
    confirmText=" 네"
    cancelText="다음에 할게요"
    onConfirm={handleClose}  
  />
  );
}

export default ChangetoTextModal;

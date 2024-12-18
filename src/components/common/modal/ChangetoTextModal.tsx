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
    title="텍스트 변환"
    message1={"녹음 내용을 텍스트로 변환 할까요?"}
    message2={"나중에도 대화 내용을 텍스트로 변환할 수 있어요!"}
    confirmText=" 네"
    cancelText="다음에 할게요"
    onConfirm={handleClose}  
  />
  );
}

export default ChangetoTextModal;

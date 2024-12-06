import { useNavigate } from "react-router-dom";
import BaseModal from "./BaseModal";  

interface SummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

function SummaryModal({ isOpen, onClose }: SummaryModalProps) {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose(); // 기존 onClose 호출
        navigate("/member/summary"); // /member/summary로 이동
    };

    return (
        <BaseModal
        isOpen={isOpen}  
        onClose={onClose}
        title="텍스트 변환이 완료되었습니다"
        message1={"AI를 이용해서 대화 내용을 요약할까요?"}
        message2={"나중에도 대화 내용을 요약할 수 있습니다!"}
        confirmText=" 네"
        cancelText="다음에 할게요"
        onConfirm={handleClose}  
        />
    );
}

export default SummaryModal;

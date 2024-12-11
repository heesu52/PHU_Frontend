import { useNavigate } from "react-router-dom";
import BaseModal from "./BaseModal";  

interface UploadRecordFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function UploadRecordFileModal({ isOpen, onClose }: UploadRecordFileModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); 
    navigate("/member/summary"); 
  };

  return (
    <BaseModal
    isOpen={isOpen}  
    onClose={onClose}
    title="녹음종료"
    message1={"녹음 파일을 업로드됐습니다"}
    message2={"변환하지 않으시면 요약 리스트 페이지로 이동합니다!"}
    confirmText=" 네"
    cancelText="다음에 할게요"
    onConfirm={handleClose}  
  />
  );
}

export default UploadRecordFileModal;

import BaseModal from "./BaseModal";  


interface SummaryDeleteModalProps {
  isOpen: boolean;
  onClose: () => void; 
  }
  
  function SummaryDeleteModal({ isOpen, onClose}: SummaryDeleteModalProps) {

    const handleClose = () => {
      onClose(); 
    };
    
    return (
      <BaseModal
      isOpen={isOpen}  
      onClose={onClose}
      title="요약 내용 삭제"
      message1={"대화 요약 내용를 삭제하시겠습니까? "}
      confirmText=" 삭제"
      cancelText="취소"
      onConfirm={handleClose}  
      />
    );
  }
  
  export default SummaryDeleteModal;
  
import BaseModal from "./BaseModal";  

interface ChartDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}


function ChartDeleteModal({ isOpen, onClose }: ChartDeleteModalProps) {

  const handleClose = () => {
    onClose(); 
  };

  return (
    <BaseModal
    isOpen={isOpen}  
    onClose={onClose}
    title="데일리차트 삭제"
    message1={"차트를 삭제할까요?"}
    confirmText=" 삭제"
    cancelText="취소"
    onConfirm={handleClose}  
  />
    );
  }
  
  export default ChartDeleteModal;
  
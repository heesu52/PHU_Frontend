import BaseModal from "./BaseModal";  

interface DeleteIDModalProps {
  isOpen: boolean;
  onClose: () => void;
}


function DeleteIDModal({ isOpen, onClose,}: DeleteIDModalProps) {


  return (
    <BaseModal
    isOpen={isOpen}  
    onClose={onClose}
    title="회원 탈퇴"
    message1={"회원을 탈퇴하시겠어요?"}
    message2={"등록한 모든 정보가 사라집니다"}
    confirmText=" 탈퇴"
    cancelText="취소"
    onConfirm={onClose}  
  />
    );
  }
  
  export default DeleteIDModal;
  
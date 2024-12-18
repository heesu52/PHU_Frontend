import BaseModal from "./BaseModal";  

interface NoMemberInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NoMemberInfoModal({isOpen, onClose }: NoMemberInfoModalProps) {

  const handleClose = () => {
    onClose(); 
  };

  return (
    <BaseModal
    isOpen={isOpen}  
    onClose={onClose}
    title="회원정보 없음"
    message1={"현재 저장되어있는 회원님의 정보가 없어요."}
    message2={"회원님의 정보를 추가해주세요!"}
    confirmText=" 확인"
    onConfirm={handleClose}  
  />
  );
}

export default NoMemberInfoModal;

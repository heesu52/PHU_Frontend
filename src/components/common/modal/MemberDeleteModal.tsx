import { deleteMemberApi } from "../../../store/api/info/MemberApi";
import { useListDataStore } from '../../../store/store';
import { notify } from '../../common/ToastMessage/ToastMessageItem';  // notify 함수 import
import BaseModal from "./BaseModal";  

interface MemberDeleteModalProps {
  memberId: number | null;
  memberName: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function MemberDeleteModal({ isOpen, onClose, memberId, memberName }: MemberDeleteModalProps) {
  const { listData, setListData } = useListDataStore();

  // 삭제 API 호출 함수
  const handleDelete = async () => {
    if (memberId !== null) {
      const response = await deleteMemberApi(memberId);  // 회원 삭제 API 호출
      if (response?.success) {
        const updatedListData = listData.filter(member => member.id !== memberId);
        setListData(updatedListData);
        notify('success', "회원이 삭제됐어요💪🏻"); 
        onClose();
      }
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}  
      onClose={onClose}
      title="회원 삭제"
      message1={`'${memberName}' 님을 삭제할까요?`}
      message2={"회원정보는 삭제되지 않아요."}
      confirmText="삭제"
      cancelText="취소"
      onConfirm={handleDelete}  
    />
  );
}

export default MemberDeleteModal;

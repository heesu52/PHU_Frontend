import { deleteMemberApi, getPTListApi} from "../../../store/api/user/member/MemberApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MemberDeleteModalProps {
  onClose: () => void; 
  memberId: number | null;  
  memberName: string | null;  
}

function MemberDeleteModal({ onClose, memberId, memberName }: MemberDeleteModalProps) {
  // 삭제 API 호출 함수
  const handleDelete = async () => {
    if (memberId !== null) {
      const response = await deleteMemberApi(memberId);  // 회원 삭제 API 호출
      if (response?.success) {
        toast.success("회원이 삭제됐어요💪🏻");
        getPTListApi();
        onClose(); 
      } else {
        console.log('회원 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <ToastContainer position='top-center'/>
      <div className="p-6 bg-white rounded-md shadow-lg w-80">
        <h2 className="mb-4 text-lg font-bold">회원 삭제</h2>
        <p className="text-sm text-gray-600">
          정말로 '{memberName}' 님을 삭제하시겠습니까?
        </p>
        <p className="mb-6 text-sm text-gray-600">
          회원정보는 삭제되지 않습니다.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDelete}  // 삭제 버튼 클릭 시 handleDelete 실행
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            삭제
          </button>
          <button
            onClick={onClose}  // 취소 버튼 클릭 시 모달 닫기
            className="px-4 py-2 text-sm text-gray-700 rounded-md bg-custom-softgrey hover:bg-custom-grey"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberDeleteModal;

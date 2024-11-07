import { deleteMemberApi } from "../../../store/api/user/member/MemberApi";

interface MemberDeleteModalProps {
  onClose: () => void; 
  memberId: number | null;  // 선택된 회원의 ID를 prop으로 전달
}

function MemberDeleteModal({ onClose, memberId }: MemberDeleteModalProps) {
  // 삭제 API 호출 함수
  const handleDelete = async () => {
    if (memberId !== null) {
      const response = await deleteMemberApi(memberId);  // 회원 삭제 API 호출
      if (response?.success) {
        alert('회원이 삭제되었습니다.');
        onClose(); 
      } else {
        console.log('회원 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="p-6 bg-white rounded-md shadow-lg w-80">
        <h2 className="mb-4 text-lg font-bold">회원 삭제</h2>
        <p className="text-sm text-gray-600">
          정말로 이 회원을 삭제하시겠습니까?
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

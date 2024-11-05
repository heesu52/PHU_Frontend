

interface MemberDeleteModalProps {
  onClose: () => void; 
}

function MemberDeleteModal({ onClose}: MemberDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="p-6 bg-white rounded-md shadow-lg w-80">
        <h2 className="mb-4 text-lg font-bold">회원 삭제</h2>
        <p className="text-sm text-gray-600">
          정우혁 회원님을 삭제하시겠습니까? 
        </p>
        <p className="mb-6 text-sm text-gray-600">
        회원정보는 삭제되지 않습니다.
        </p>
        <div className="flex justify-end gap-4">
        <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            삭제
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 rounded-md bg-custom-softgrey hover:bg-custom-grey">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberDeleteModal;

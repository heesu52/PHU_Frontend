import { useNavigate } from "react-router-dom";

function NoMemberInfoModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); // 기존 onClose 호출
    navigate("/member/summary"); // /member/summary로 이동
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-bold">회원 정보 없음</h2>
        <p className="text-sm text-gray-600">
          현재 저장되어있는 회원님의 정보가 없습니다.
        </p>
        <p className="mb-6 text-sm text-gray-600">
          회원님의 정보를 추가할까요?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            네
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-700 rounded-md bg-custom-softgrey hover:bg-custom-grey"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoMemberInfoModal;

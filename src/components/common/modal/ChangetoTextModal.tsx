import { useNavigate } from "react-router-dom";

function ChangetoTextModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); // 기존 onClose 호출
    navigate("/member/summary"); // /member/summary로 이동
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-bold">녹음이 종료되었습니다</h2>
        <p className="text-sm text-gray-600">
          녹음 내용을 텍스트로 변환 할까요?
        </p>
        <p className="mb-6 text-sm text-gray-600">
          변환하지 않으시면 요약 리스트 페이지로 이동합니다!
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
            다음에 할게요
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangetoTextModal;

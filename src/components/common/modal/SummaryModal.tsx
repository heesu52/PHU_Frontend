import { useNavigate } from "react-router-dom";

function SummaryModal({ onClose }: { onClose: () => void }) {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose(); // 기존 onClose 호출
        navigate("/member/summary"); // /member/summary로 이동
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-lg font-bold">녹음이 종료되었습니다</h2>
                <p className="mb-6 text-sm text-gray-600">
                    대화 내용을 요약하시겠습니까?
                    나중에 다시 요약할 수 있어요!
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700">
                        네
                    </button>
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 text-sm text-gray-700 rounded-md bg-custom-softgrey hover:bg-custom-grey">
                        다음에 할게요
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SummaryModal;

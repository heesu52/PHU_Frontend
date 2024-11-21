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
                <h2 className="mb-4 text-lg font-bold">텍스트 변환이 완료되었습니다</h2>
                <p className="mb-6 text-sm text-gray-600">
                    AI를 이용해서 대화 내용을 요약할까요?
                    나중에도 대화 내용을 요약할 수 있습니다!
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

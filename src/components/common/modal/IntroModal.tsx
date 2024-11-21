import ximg from "../../../assets/x.svg";

interface IntroModalProps {
    onClose: () => void; 
}

function IntroModal({ onClose }: IntroModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="relative bg-white rounded-md shadow-lg p-7 w-80">
                {/* Close Button */}
                <img
                    src={ximg}
                    onClick={onClose}
                    className="absolute w-4 h-4 cursor-pointer top-3 right-3"
                    alt="닫기 버튼"
                />
                {/* Modal Content */}
                <h2 className="mb-4 text-lg font-black">맞춤형 PT 관리를 위한 핏한 선택!</h2>
                <p className="mb-6 text-sm font-normal text-gray-600 ">
                    Fitee는 PT(퍼스널 트레이닝)와 비슷한 발음에서 착안하여,
                    트레이너와 회원을 FIT하게 맞춰주는 솔루션을 제공합니다.
                    <p>클라이언트 관리부터 대화 요약까지!</p>
                    <p>Fitee와 함께 스마트한 PT 관리의 시작을 경험하세요!</p>
                </p>
                <div className="flex justify-end gap-4"></div>
            </div>
        </div>
    );
}

export default IntroModal;

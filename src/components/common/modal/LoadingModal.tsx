import LoadingLottie from "../../lottie/LoadingLottie";

interface LoadingModalProps {
    onClose: () => void; 
}

function LoadingModal({ onClose }: LoadingModalProps) {
    return (
        <div className="flex items-center justify-center space-x-2">
          <LoadingLottie />
          <span className="typing-effect">잠시만 기다려 주세요...!</span>
        </div>
    );
}

export default LoadingModal;

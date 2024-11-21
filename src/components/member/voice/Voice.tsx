import meatball from "../../../assets/three-dots.svg";
import arrow from "../../../assets/arrow.svg";
import stopicon from "../../../assets/stop-circle.svg";
import starticon from "../../../assets/voicestart.svg";
import Dropdown from "../../common/DropDown";
import ChangetoTextModal from "../../common/modal/ChangetoTextModal";
import voice from "../../lottie/voice.json";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

function Voice() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [timer, setTimer] = useState(0); // 타이머 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 상태
    const lottieRef = useRef<LottieRefCurrentProps>(null); // Lottie ref 추가

    useEffect(() => {
        let timerInterval: ReturnType<typeof setInterval> | null = null;
    
        if (isRecording) {
            timerInterval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000); // 1초마다 타이머 증가
        } else if (!isRecording && timerInterval) {
            clearInterval(timerInterval);
        }
    
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [isRecording]);
    

    const handleGoBack = () => navigate(-1);
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const handleIconClick = () => navigate("/member/summary/edit");

    const toggleRecording = () => {
        setIsRecording((prev) => {
            const nextState = !prev;

            // Lottie 애니메이션 상태 제어
            if (nextState) {
                lottieRef.current?.play(); // 녹음 시작 시 재생
                setTimer(0); // 타이머 초기화
            } else {
                lottieRef.current?.stop(); // 녹음 중지 시 정지
                setIsModalOpen(true); // 녹음 중지 시 모달 표시
            }

            return nextState;
        });
    };

    // 모달 닫기 핸들러
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 타이머를 시:분:초 형식으로 변환
    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        // 각 값이 두 자리로 표시되도록 변환
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <div className="relative flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full h-[55px]">
                <div className="flex p-3 ml-3 space-x-4">
                    <img src={arrow} onClick={handleGoBack} />
                    <p className="text-lg cursor-default">음성녹음</p>
                </div>
                <img src={meatball} className="mr-5" onClick={toggleDropdown} />
            </div>

            {isDropdownOpen && (
                <Dropdown
                    options={[
                        { label: "요약 내용 수정", onClick: handleIconClick },
                    ]}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}

            {/* Component */}
            <div className="flex flex-col items-center justify-center mt-14 w-[90%] space-y-8">
                <div className="text-center">
                    <p className="text-lg">음성녹음 후 대화 요약 및 전체본을 볼 수 있습니다.</p>
                    <p className="text-sm font-bold">녹음을 할 경우, 상대방에게 꼭 고지해주세요!</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <Lottie 
                        animationData={voice} 
                        style={{ width: "200px", height: "200px" }} 
                        loop
                        lottieRef={lottieRef} 
                    />
                    {isRecording && (
                        <p className="text-lg font-bold text-custom-indigo">
                            {formatTime(timer)}
                        </p>
                    )}
                    <img 
                        src={isRecording ? stopicon : starticon} 
                        onClick={toggleRecording} 
                        className="cursor-pointer w-[50px] h-[50px]"
                        alt={isRecording ? "Stop Recording" : "Start Recording"}
                    />
                </div>
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <ChangetoTextModal onClose={closeModal} />
            )}
        </div>
    );
}

export default Voice;

import meatball from "../../assets/three-dots.svg";
import arrow from "../../assets/arrow.svg";
import stopicon from "../../assets/stop.svg";
import starticon from "../../assets/voicestart.svg";
import pauseicon from "../../assets/pause.svg";
import playicon from "../../assets/play.svg";
import Dropdown from "../common/DropDown";
import ChangetoTextModal from "../common/modal/ChangetoTextModal";
import voice from "../lottie/voice.json";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";


function Voice() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // 녹음 일시 정지 상태
    const [timer, setTimer] = useState(0); // 타이머 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 상태
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null); // MediaRecorder 인스턴스
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]); // 녹음된 데이터 조각
    const [recordingIndex, setRecordingIndex] = useState(1); // 녹음 인덱스
    const lottieRef = useRef<LottieRefCurrentProps>(null); // Lottie ref 추가

    useEffect(() => {
        let timerInterval: ReturnType<typeof setInterval> | null = null;

        if (isRecording && !isPaused) {
            timerInterval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000); // 1초마다 타이머 증가
        } else if (timerInterval) {
            clearInterval(timerInterval);
        }

        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [isRecording, isPaused]);

    const handleGoBack = () => navigate(-1);
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
    
            recorder.ondataavailable = (event) => {
                setAudioChunks((prev) => [...prev, event.data]);
            };
    
            recorder.onstop = async () => {
                console.log("녹음 종료");
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    
                const audioUrl = URL.createObjectURL(audioBlob);
                const link = document.createElement("a");
                link.href = audioUrl;
                link.download = `recording_${recordingIndex}.wav`;
                link.click();
    
                setIsModalOpen(true);
                setRecordingIndex((prev) => prev + 1);
            };
    
            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            setAudioChunks([]); // 이전 데이터 클리어
            setTimer(0); // 타이머 리셋
            console.log("녹음 시작");
        } catch (error) {
            console.error("마이크 권한 요청 실패 또는 오류 발생:", error);
        }
    };
    

    const stopRecording = () => {
        mediaRecorder?.stop();
        setIsRecording(false);
        setIsPaused(false);
        console.log("녹음 중지");
    };

    const togglePause = () => {
        if (!mediaRecorder) return;

        setIsPaused((prev) => {
            const nextState = !prev;

            if (nextState) {
                mediaRecorder.pause();
                lottieRef.current?.pause(); // 일시 정지
            } else {
                mediaRecorder.resume();
                lottieRef.current?.play(); // 다시 시작
            }

            return nextState;
        });
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
                        { label: "요약 내용 수정", onClick: () => navigate("/member/summary/edit") },
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
                            Recording {recordingIndex} - {formatTime(timer)}
                        </p>
                    )}
                    <div className="flex space-x-4">
                        <img
                            src={isRecording ? stopicon : starticon}
                            onClick={isRecording ? stopRecording : startRecording}
                            className="cursor-pointer w-[50px] h-[50px]"
                            alt={isRecording ? "Stop Recording" : "Start Recording"}
                        />
                        {isRecording && (
                            <img
                                src={isPaused ? playicon : pauseicon}
                                onClick={togglePause}
                                className="cursor-pointer w-[50px] h-[50px]"
                                alt={isPaused ? "Resume Recording" : "Pause Recording"}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* 모달 */}
            <ChangetoTextModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default Voice;

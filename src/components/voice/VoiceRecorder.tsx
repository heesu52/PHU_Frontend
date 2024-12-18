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
import { formatTime } from "../utils/formatTime";

function Voice() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false); // 녹음 진행 여부
    const [isPaused, setIsPaused] = useState(false); // 녹음 일시 정지 상태
    
    const [timer, setTimer] = useState(0); // 타이머 상태
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null); // MediaRecorder 인스턴스
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]); // 녹음된 오디오 조각
    const [audioUrl, setAudioUrl] = useState<string | null>(null); // 오디오 URL

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    // 타이머 관리
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

    // 녹음 시작
    const onRec = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (event) => {
                setAudioChunks((prevChunks) => [...prevChunks, event.data]);
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl); // 녹음이 끝난 후 오디오 URL 생성
            };

            recorder.start();
            setMediaRecorder(recorder);
            setAudioChunks([]); // 새로 녹음할 때마다 초기화
            setIsRecording(true);
            setIsPaused(false);
        } catch (err) {
            console.error("녹음 시작 실패:", err);
        }
    };

    // 녹음 종료
    const offRec = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    // 녹음 일시 정지/재개
    const togglePause = () => {
        if (mediaRecorder) {
            if (isPaused) {
                mediaRecorder.resume();
            } else {
                mediaRecorder.pause();
            }
            setIsPaused((prev) => !prev);
        }
    };

    // 돌아가기
    const handleGoBack = () => navigate(-1);
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

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
                           {formatTime(timer)}
                        </p>
                    )}
                    <div className="flex space-x-4">
                        <img
                            src={isRecording ? stopicon : starticon}
                            onClick={isRecording ? offRec : onRec}
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

                    {/* 녹음이 끝나면 오디오 재생 */}
                    {audioUrl && !isRecording && (
                        <div className="mt-4">
                            <audio controls src={audioUrl}></audio>
                            <a
                                href={audioUrl}
                                download="recording.wav"
                                className="mt-2 text-blue-600"
                            >
                                녹음 파일 다운로드
                            </a>
                        </div>
                    )}
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

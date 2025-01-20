import meatball from "../../assets/three-dots.svg";
import arrow from "../../assets/arrow.svg";
import stopicon from "../../assets/stop.svg";
import starticon from "../../assets/voicestart.svg";
import pauseicon from "../../assets/pause.svg";
import playicon from "../../assets/play.svg";
import downloadIcon from "../../assets/download.svg"
import Dropdown from "../common/DropDown";
import UploadRecordFileModal from "../common/modal/UploadRecordFileModal";
import voice from "../lottie/voice.json";
import {useNavigate} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { formatTime } from "../utils/formatTimeUtils";
import { VoiceFileUploadApi } from "../../store/api";
import { useIdStore, useVoiceDataStore } from "../../store/store";


function Voice() {
    const navigate = useNavigate();
    const { memberId } = useIdStore();
    const { voiceData, setVoiceData } = useVoiceDataStore();
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timer, setTimer] = useState(0);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    // 타이머 관리
    useEffect(() => {
        let timerInterval: ReturnType<typeof setInterval> | null = null;

        if (isRecording && !isPaused) {
            timerInterval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
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
                setAudioUrl(audioUrl);
                setIsModalOpen(true); // 녹음 종료 후 모달 열기
            };

            recorder.start();
            setMediaRecorder(recorder);
            setAudioChunks([]);
            setIsRecording(true);
            setIsPaused(false);
            console.log("녹음 시작");
        } catch (err) {
            console.error("녹음 시작 실패:", err);
        }
    };

    //녹음 종료
    const offRec = async () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            setTimer(0);
            console.log("녹음 중지");
            
            // 녹음 종료 후 파일 업로드
            if (memberId) {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });
                const response = await VoiceFileUploadApi(audioFile, Number(memberId));
                if (response?.success) {
                    setVoiceData(response.data)
                    console.log(voiceData)
                } 
            } 
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
                    <img src={arrow} onClick={handleGoBack} className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </div>
                <img src={meatball} className="w-4 h-4 mr-5 md:w-5 md:h-5 lg:w-6 lg:h-6" onClick={toggleDropdown} />
            </div>

            {isDropdownOpen && (
                <Dropdown
                    options={[{ label: "요약 내용 수정", onClick: () => navigate("/member/summary/edit") }]}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}

            {/* Component */}
            <div className="flex flex-col items-center justify-center space-y-5 mt-14">
                <div className="text-center">
                    <p className="text-sm md:text-lg lg:text-lg">음성녹음 후 대화 요약 및 전체본을 볼 수 있습니다.</p>
                    <p className="text-xs font-bold md:text-sm lg:text-sm">녹음을 할 경우, 상대방에게 꼭 고지해주세요!</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <Lottie
                        animationData={voice}
                        style={{ width: "40%", height: "auto" }}
                        loop
                        lottieRef={lottieRef}
                    />
                    {isRecording && (
                        <p className="text-base font-bold md:text-lg lg:text-lg text-custom-indigo">
                            {formatTime(timer)}
                        </p>
                    )}
                    <div className="flex space-x-4">
                        <img
                            src={isRecording ? stopicon : starticon}
                            onClick={isRecording ? offRec : onRec}
                            className="w-12 h-12 cursor-pointer md:w-14 md:h-14 lg:w-15 lg:h-15"
                            alt={isRecording ? "Stop Recording" : "Start Recording"}
                        />
                        {isRecording && (
                            <img
                                src={isPaused ? playicon : pauseicon}
                                onClick={togglePause}
                                className="w-12 h-12 cursor-pointer md:w-14 md:h-14 lg:w-15 lg:h-15"
                                alt={isPaused ? "Resume Recording" : "Pause Recording"}
                            />
                        )}
                    </div>

                    {/* 녹음이 끝나면 오디오 재생 */}
                    {audioUrl && !isRecording && (
                        <div className="flex items-center justify-center mt-5 space-x-3">
                            <audio controls src={audioUrl}></audio>
                            <a
                                href={audioUrl}
                                download="recording.wav"
                                className="flex items-center"
                            >
                                <img
                                    src={downloadIcon}
                                    alt="Download"
                                    className="w-6 h-6 cursor-pointer"
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* 모달 */}
            <UploadRecordFileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default Voice;

import { useState, useRef } from "react";

export const useRecording = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (event) => {
                setAudioChunks((prev) => [...prev, event.data]);
            };

            recorder.start();
            mediaRecorderRef.current = recorder;
            setIsRecording(true);
        } catch (error) {
            console.error("녹음 시작 실패:", error);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const togglePause = () => {
        if (!mediaRecorderRef.current) return;

        if (isPaused) {
            mediaRecorderRef.current.resume();
        } else {
            mediaRecorderRef.current.pause();
        }

        setIsPaused((prev) => !prev);
    };

    return {
        isRecording,
        isPaused,
        startRecording,
        stopRecording,
        togglePause,
        audioChunks,
    };
};

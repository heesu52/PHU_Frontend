// formatTime.ts

/**
 * 초 단위의 시간을 시:분:초 형식으로 변환하는 함수
 * @param time - 초 단위의 시간
 * @returns 변환된 시간 문자열 (형식: HH:mm:ss)
 */
export const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // 두 자리 형식으로 표시
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

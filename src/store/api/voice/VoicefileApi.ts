import axios from "axios";
import { useApiUrlStore } from "../../store";

// API URL을 가져오는 변수
const apiUrl = useApiUrlStore.getState().apiUrl;

// 공통 헤더 설정 함수
const getAuthHeaders = () => {
  const access = localStorage.getItem('token');
  return {
    Authorization: access,
    "Content-Type": "application/json"
  };
};

// 에러 코드 상수
const ERROR_CODES = {
  VF001: "음성파일을 찾을 수 없습니다.",
  VF002: "음성 텍스트를 변환하는데 실패했습니다.",
  VF003: "텍스트 변환 데이터를 찾을 수 없습니다.",
  DEFAULT: "알 수 없는 오류가 발생했습니다."
} as const;


// 음성녹음 파일 업로드 API
export const VoiceFileUploadApi = async (file: File, memberid: number) => {
  try {
    const formData = new FormData(); // FormData 객체 생성
    formData.append('file', file);  // 'file'은 서버에서 기대하는 키

    const response = await axios.post(
      `${apiUrl}/pt/voice-file/${memberid}`,
      formData,
      { headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" } }
    );

    if (response.status === 200) {
      console.log("파일 업로드 성공");
      return {
        success: true,
        data: response.data
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data?.code as keyof typeof ERROR_CODES;  // errorCode 타입을 ERROR_CODES의 키로 지정
      const message = ERROR_CODES[errorCode] || ERROR_CODES.DEFAULT;
      console.log(message);
      return {
        success: false,
        errorCode,
        message
      };
    } else {
      console.error("파일 업로드 실패:", error);
      return { success: false, message: ERROR_CODES.DEFAULT };
    }
  }
};


// 회원의 음성파일 리스트 조회 API
export const getVoiceFileListApi = async (memberid: number) => {
  try {
    const response = await axios.get(
      `${apiUrl}/pt/voice-file/${memberid}`,
      { headers: getAuthHeaders() }
    );

    if (response.status === 200) {
      console.log("파일 리스트 조회 성공");
      return {
        success: true,
        data: response.data
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data?.code as keyof typeof ERROR_CODES;  // errorCode 타입을 ERROR_CODES의 키로 지정
      const message = ERROR_CODES[errorCode] || ERROR_CODES.DEFAULT;
      console.log(message);
      return {
        success: false,
        errorCode,
        message
      };
    } else {
      console.error("파일 리스트 조회 실패:", error);
      return { success: false, message: ERROR_CODES.DEFAULT };
    }
  }
};


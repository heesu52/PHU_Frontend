import axios from "axios";
import { useApiUrlStore } from "../../store";

// API URL을 가져오는 변수
const apiUrl = useApiUrlStore.getState().apiUrl; 

// 에러 코드 상수
const ERROR_CODES = {
  M002: "존재하지 않는 이메일이거나 비밀번호입니다.",
  DEFAULT: "알 수 없는 오류가 발생했습니다."
} as const;


//소셜 로그인 api
export const GoogleLoginApi = () => {
    try {
      // 구글 로그인 URL로 리디렉션
      window.location.href = 'https://fitee.site/oauth2/authorization/google';
    } catch (error) {
      console.error("구글 로그인 에러", error);
    }
  };



// 일반 로그인 api
export const LoginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/login`,
      { email, password },
    );

    if (response.status === 200) {
      console.log("로그인 성공");
      const token = response.headers['authorization'];
      localStorage.setItem('token', token);
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
      console.error("로그인 실패:", error);
      return { success: false, message: ERROR_CODES.DEFAULT };
    }
  }
};






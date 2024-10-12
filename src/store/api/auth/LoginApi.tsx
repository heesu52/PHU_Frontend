import axios from "axios";
import { useApiUrlStore } from "../../store";

const apiUrl = useApiUrlStore.getState().apiUrl; 

//소셜 로그인 api
export const GoogleLoginApi = () => {
    try {
      // 구글 로그인 URL로 리디렉션
      window.location.href = 'https://fitee.site/oauth2/authorization/google';
    } catch (error) {
      console.error("구글 로그인 에러", error);
    }
  };


// 로그인 api
export const LoginApi = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${apiUrl}/login`, { email, password }, { withCredentials: true });

    if (res.status === 200) {
      console.log("로그인 성공");
      return { success: true };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data?.code; // 응답 코드 확인

      // 중복 이메일을 입력했을 경우
      if (errorCode === "M002") {
        console.log(error.response?.data.message);
        return { 
          success: false, 
          errorCode: "M002", 
          message: "존재하지 않는 이메일이거나 비밀번호입니다" 
        };
      }
      return { success: false };
    } else {
      console.error("로그인 실패:", error);
    }
  }
};

// 리프레시 토큰 발급 api
export const RefreshTokenApi = async () => {
  try {
    const res = await axios.post(`${apiUrl}/reissue`,
       {}, { withCredentials: true });

    if (res.status === 200) {
      console.log("토큰 재발급 성공");
      return { success: true };
    }
  } catch (error) {
    console.error("리프레시 토큰 재발급 실패", error);
    return { success: false };
  }
};

  

//로그아웃 api
export const LogoutApi = async () => {
    try {

        const res = await axios.post('https://fitee.site/logout', {
        });
        if (res.status === 200) {
            console.log(res.data);
        }
    } catch (error) {
        console.error(error);
    }
};


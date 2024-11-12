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
      const token = res.headers['authorization'];
      localStorage.setItem('token', token);
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

// 리프레시 토큰 발급 API
export const RefreshTokenApi = async () => {
  try {
    const res = await axios.post(`${apiUrl}/reissue`, {}, { withCredentials: true });

    // 서버에서 새 액세스 토큰을 발급하여 응답 헤더에서 가져옴
    const newToken = res.headers['authorization'];

    if (newToken) {
      // 'Bearer ' 포함된 새로운 액세스 토큰을 localStorage에 저장
      localStorage.setItem('token', newToken); 
      return { success: true };
    } else {
      console.error("새 액세스 토큰을 발급받지 못했습니다.");
      return { success: false };
    }
  } catch (error) {
    console.error("리프레시 토큰 발급 실패", error);
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
            localStorage.removeItem('token');
            window.alert("로그아웃이 되었습니다.")
        }
    } catch (error) {
        console.error(error);
    }
};


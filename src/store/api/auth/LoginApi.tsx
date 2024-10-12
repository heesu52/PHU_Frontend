import axios, {AxiosError} from "axios";
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


//로그인 api
export const LoginApi = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${apiUrl}/login`,
      { email, password }, { withCredentials: true });

    if (res.status === 200) {
      console.log("로그인 성공");
      return { success: true };
    }
  } catch (error) {
     // AxiosError에 대한 처리
    if (error instanceof AxiosError) {
      const errorCode = error.response?.data?.code; // 응답 코드 확인

      if (errorCode === 'J001') {
        // 엑세스 토큰 만료 시 리프레시 토큰으로 재발급 시도
        window.alert("로그인 토큰이 만료되었습니다.")
        await RefreshTokenApi(); // 리프레시 토큰 발급 API 호출
        console.log("엑세스 토큰 만료");
        return; 
      }
      if (errorCode === "M001"){
        console.error(error.response?.data?.message);
        return { success: false };
      }
     
    } else {
      // AxiosError가 아닌 경우 (예: 네트워크 오류, 기타 예외 처리)
      console.error("로그인 실패:", error);
    }
  }
};


  //리프레시 토큰 발급  api
  export const RefreshTokenApi = async () => {
    try {
      const res = await axios.post(`${apiUrl}/reissue`,
        { withCredentials: true });
  
      if (res.status === 200) {
        console.log("토큰 재발급 성공");
      }
    } catch (error) {
      console.error("리프레시 토큰 재발급 실패", error)
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


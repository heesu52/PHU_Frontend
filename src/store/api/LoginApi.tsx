import axios, {AxiosError} from "axios";
import { useApiUrlStore } from "../store";

const apiUrl = useApiUrlStore.getState().apiUrl; 

//소셜 로그인 api
export const GoogleLoginApi = async () => {
    try {
        const res = await axios.post(`${apiUrl}/oauth2/authorization/google`, {
        });
        console.log(res.data)
        if (res.status === 200) {
            console.log("로그인 성공");
            return res.data;
        }
    } catch (error) {
        console.error("구글 로그인 에러", error);
    }
};

//로그인 api
export const LoginApi = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
  
      if (res.status === 200) {
        console.log("로그인 성공");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // AxiosError에 대한 처리
        console.error("로그인 요청 실패:", error.response?.data?.message);
        return error.response?.data?.message;
      } else {
        // AxiosError가 아닌 경우 (예: 네트워크 오류, 기타 예외 처리)
        console.error("로그인 실패:", error);
      }
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


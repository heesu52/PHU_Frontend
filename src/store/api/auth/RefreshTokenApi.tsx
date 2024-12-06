import axios from "axios";
import { useApiUrlStore } from "../../store";

// API URL을 가져오는 변수
const apiUrl = useApiUrlStore.getState().apiUrl; 

// 리프레시 토큰 발급 API
export const RefreshTokenApi = async () => {
    try {
      const response = await axios.post(`${apiUrl}/reissue`, {},);
  
      // 서버에서 새 액세스 토큰을 발급하여 응답 헤더에서 가져옴
      const newToken = response.headers['authorization'];
  
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
  
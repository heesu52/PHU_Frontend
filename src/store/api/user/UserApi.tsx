import axios from "axios";
import { useApiUrlStore } from "../../store";

const apiUrl = useApiUrlStore.getState().apiUrl; 


// 사용자 회원조회 api
export const getUserApi = async () => {
  try {
    const access = localStorage.getItem('token')
    const response = await axios.get(`${apiUrl}/member`,{
      headers: {Authorization: access},
    });
    
    if (response.status === 200) {
      console.log("사용자 정보 조회 성공");
      return response.data.name
    }
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
  }
};


import axios from "axios";
import { useApiUrlStore } from "../../store";

const apiUrl = useApiUrlStore.getState().apiUrl; 


// 회원조회 api
export const getUserApi = async () => {
  try {
    const access = localStorage.getItem('token')
    const response = await axios.get(`${apiUrl}/member`,{
      headers: {Authorization: `Bearer ${access}`},
    });
    
    if (response.status === 200) {
      console.log(response.data);
      return response.data.name;
    }
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
  }
};


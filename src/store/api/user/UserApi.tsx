import axios from "axios";
import { useApiUrlStore } from "../../store";

const apiUrl = useApiUrlStore.getState().apiUrl; 

// 공통 헤더 설정 함수
const getAuthHeaders = () => {
  const access = localStorage.getItem('token');
  return {
    Authorization: access,
    "Content-Type": "application/json"
  };
};

// 사용자 회원조회 api
export const getUserApi = async () => {
  try {
    const response = await axios.get(`${apiUrl}/member`,{
      headers: getAuthHeaders(),
    });
    
    if (response.status === 200) {
      console.log("사용자 정보 조회 성공");
      return {
        success: true,
        data: response.data
        };
    }
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    return { success: false, message: "사용자 정보 조회 실패" };
  }
};


// 사용자 정보 수정 API
export const editUserApi = async (name: string, age: number, tel: string) => {
  try {
    const response = await axios.put(`${apiUrl}/pt/member`, 
      { 
        name,
        age, 
        tel
      },
      {headers: getAuthHeaders()});

    if (response.status === 200) {
      console.log("사용자 정보 수정 성공");
      return {
        success: true,
        data: response.data
        };
    }
  } catch (error) {
    console.error("사용자 정보 수정 실패:", error);
    return { success: false, message: "사용자 정보 수정 실패" };
  }
};

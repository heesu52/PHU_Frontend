import axios from "axios";
import { useApiUrlStore } from "../../../store";

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



// 회원 상세 정보 추가 API
export const addPTInforApi = async (memberId: number, memberTarget: string, significant: string, ptStartDate: string, ptEndDate: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/pt/add/info/${memberId}`,
      { 
        memberTarget,
        significant,
        ptStartDate,
        ptEndDate
      },
      { headers: getAuthHeaders() }
    );

    if (response.status === 200) {
      console.log("회원 상세정보 추가 성공");
      return {
        success: true,
        data: response.data
       };
    }
  } catch (error) {
    console.error("회원 상세정보 추가 실패:", error);
    return { success: false, message: "회원 상세정보 추가 실패" };
  }
};


// 트레이너의 회원 상세정보 조회 API
export const getPTInfoApi = async (memberId: number) => {
  try {
    const response = await axios.get(`${apiUrl}/pt/info/${memberId}`, {
      headers: getAuthHeaders()
    });

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("회원 상세정보 조회 실패:", error);
    return { success: false, message: "회원 상세정보 조회 실패" };
  }
};


// 트레이너의 회원 상세정보 수정 API
export const editInfoApi = async (memberId: number) => {
    try {
      const response = await axios.put(`${apiUrl}/pt/info/${memberId}`, {
        headers: getAuthHeaders()
      });
  
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("회원 상세정보 수정 실패:", error);
      return { success: false, message: "회원 상세정보 수정 실패" };
    }
  };

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

// 에러 코드 상수
const ERROR_CODES = {
  M006: "트레이너는 추가할 수 없습니다.",
  M003: "회원을 찾지 못했습니다.",
  M004: "해당 기능은 트레이너만 가능합니다.",
  M005: "이미 리스트에 존재하는 회원입니다.",
  DEFAULT: "알 수 없는 오류가 발생했습니다."
} as const;


// 회원 상세 정보 추가 API
export const addPTInforApi = async (listid: number, memberTarget: string, significant: string, ptStartDate: string, ptEndDate: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/pt/add/info/${listid}`,
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
export const getPTInfoApi = async (listid: number) => {
  try {
    const response = await axios.get(`${apiUrl}/pt/info/${listid}`, {
      headers: getAuthHeaders()
    });

    if (response.status === 200) {
      return response.data;
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
      console.error("회원 상세정보 조회 실패:", error);
      return { success: false, message: ERROR_CODES.DEFAULT };
    }
  }
};


// 트레이너의 회원 상세정보 수정 API
export const editInfoApi = async (memberid: number, memberTarget: string, significant: string, ptStartDate: string, ptEndDate: string) => {
    try {
      const response = await axios.put(`${apiUrl}/pt/member/${memberid}`, 
        { 
          memberTarget,
          significant,
          ptStartDate,
          ptEndDate
        },
        {headers: getAuthHeaders()});
  
      if (response.status === 200) {
        console.log("회원 상세정보 수정 성공");
        return {
          success: true,
          data: response.data
          };
      }
    } catch (error) {
      console.error("회원 상세정보 수정 실패:", error);
      return { success: false, message: "회원 상세정보 수정 실패" };
    }
  };

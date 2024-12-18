import axios from "axios";
import { useApiUrlStore } from "../../store";

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
  M003: "회원을 찾지 못했습니다.",
  D003: "트레이너의 회원목록에 해당 회원이 존재하지 않습니다",
  D004: "해당회원은 피티를 받고있는 회원이 아닙니다",
  DEFAULT: "알 수 없는 오류가 발생했습니다."
} as const;


// 트레이너가 PT 차트 생성 API
export const addPTChartApi = async (id: number, branch: string, chartDate: string, weight: number, memo: string, routines: string[]) => {
    try {
      const response = await axios.post(
        `${apiUrl}/pt/chart`,
        { 
          id, 
          branch, 
          chartDate,
          weight,
          memo,
          routines
        },
        { headers: getAuthHeaders() } 
      );
  
      if (response.status === 200) {
        console.log("PT 차트 생성 성공");
        return {
          success: true,
          data: response.data
        };
      }
    } catch (error) {
      console.error("PT 차트 생성 실패:", error);
      return { success: false, message: "PT 차트 생성 실패" };
    }
  };


  // 회원이 개인운동 차트 생성 API
  export const addPrivateChartApi = async (chartDate: string, weight: number, memo: string, routines: string[]) => {
    try {
      const response = await axios.post(
        `${apiUrl}/member/chart`,
        { 
          chartDate,
          weight,
          memo,
          routines
        },
        { headers: getAuthHeaders() } 
      );
  
      if (response.status === 200) {
        console.log("개인운동 차트 생성 성공");
        return {
          success: true,
          data: response.data
        };
      }
    } catch (error) {
      console.error("개인운동 차트 생성 실패:", error);
      return { success: false, message: "개인운동 차트 생성 실패" };
    }
  };
  

// 데일리차트 리스트 조회 API
export const getChartListApi = async (memberId: number) => {
  try {
    const response = await axios.get(`${apiUrl}/chart/all/${memberId}`, {
      headers: getAuthHeaders()
    });

    if (response.status === 200) {
      console.log("차트 리스트 조회 성공");
      return {
        success: true,
        data: response.data
      };
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
      console.error("차트 리스트 조회 실패:", error);
      return { success: false, message: ERROR_CODES.DEFAULT };
    }
  }
};


// 데일리차트 개별 조회 API
export const getChartApi = async (chartid: number) => {
    try {
      const response = await axios.get(`${apiUrl}/chart/${chartid}`, {
        headers: getAuthHeaders()
      });
  
      if (response.status === 200) {
        console.log("데일리차트 조회 성공");
        console.log(response.data)
        return {
          success: true,
          data: response.data
        };
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
        console.error("데일리차트 개별조회 실패:", error);
        return { success: false, message: ERROR_CODES.DEFAULT };
      }
    }
  };
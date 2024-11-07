import axios from "axios";
import { useApiUrlStore } from "../../../store";

const apiUrl = useApiUrlStore.getState().apiUrl; 

// 회원추가 조회 api
export const addPTMemberApi = async (email: string) => {
    try {
      const access = localStorage.getItem('token')
      const response = await axios.post(`${apiUrl}/member/add`,
        {email: email},
        {headers: 
        
            { Authorization: access,
            "Content-Type": "application/json",
        }
      });
      
      if (response.status === 200) {
        console.log("회원추가 성공")
        return {success:true};
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.code; // 응답 코드 확인
        // 중복 이메일을 입력했을 경우
        if (errorCode === "M006") {
          console.log(error.response?.data.message);
          return { 
            success: false, 
            errorCode: "M006", 
            message: "트레이너는 추가할 수 없습니다." 
          };
        }
        if (errorCode === "M003") {
          console.log(error.response?.data.message);
          return { 
            success: false, 
            errorCode: "M003", 
            message: "찾을 수 없는 회원입니다." 
          };
        }
        if (errorCode === "M004") {
          console.log(error.response?.data.message);
          return { 
            success: false, 
            errorCode: "M004", 
            message: "해당 기능은 트레이너만 가능합니다." 
          };
        }
        if (errorCode === "M005") {
          console.log(error.response?.data.message);
          return { 
            success: false, 
            errorCode: "M005", 
            message: "이미 리스트에 존재하는 회원입니다." 
          };
        }
        return { success: false };
      } else {
        console.error("로그인 실패:", error);
      }
    }
  };

// 트레이너의 전체 회원조회 api
export const getPTListApi = async () => {
  try {
    const access = localStorage.getItem('token')
    const response = await axios.get(`${apiUrl}/pt/member`,{
      headers: {Authorization: access},
    });
    
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("회원 전체 조회 실패:", error);
  }
};

// 트레이너의 회원정보 조회 api
export const getPTMemberApi = async (memberId: number) => {
    try {
      const access = localStorage.getItem('token')
      const response = await axios.get(`${apiUrl}/pt/member/${memberId}`,{
        headers: {Authorization: access},
      });
      
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("회원 조회 실패:", error);
    }
  };

  // 트레이너의 회원 삭제 api
export const deleteMemberApi = async (memberId: number) => {
  try {
    const access = localStorage.getItem('token')
    const response = await axios.delete(`${apiUrl}/pt/member/${memberId}`,{
      headers: {Authorization: access},
    });
    
    if (response.status === 200) {
      console.log(response.data);
      return {success: true};
    }
  } catch (error) {
    console.error("회원 삭제 실패:", error);
  }
};
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
      console.error("회원 추가 실패:", error);
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
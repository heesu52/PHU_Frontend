import axios, {AxiosError} from "axios";
import { useApiUrlStore } from "../../store";

const apiUrl = useApiUrlStore.getState().apiUrl; 


//회원가입Api
export const SignUpApi = async (formData: {
    name: string;
    age: string;
    email: string;
    password: string;
    gender: string;
    tel: string;
    part: string;
  }) => {
    try {
      const res = await axios.post(`${apiUrl}/sign-up`, {
        name: formData.name,
        age: formData.age,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        tel: formData.tel,
        part: formData.part,
      });
  
      if (res.status === 200) {
        console.log("회원가입 성공", res.data);
        return {success:true};
      }
    } catch (error) {
       // AxiosError에 대한 처리
      if (error instanceof AxiosError) {
        const errorCode = error.response?.data?.code; // 응답 코드 확인

        if (errorCode === "M001"){
          console.error(error.response?.data?.message);
          return { 
            success: false, 
            errorCode: "M001", 
            message: "중복된 이메일 입니다." 
          };
        }
      } else {
        // AxiosError가 아닌 경우 (예: 네트워크 오류, 기타 예외 처리)
        console.error("회원가입 실패:", error);
        window.alert("회원가입에 실패했습니다. 다시 시도해주세요.")
      }
    }
  };
  

  //회원가입Api
export const SocialSignUpApi = async (formData: {
  age: string;
  gender: string;
  tel: string;
  part: string;
}) => {
  try {
    const res = await axios.post(`${apiUrl}/sign-up/social`, {
      age: formData.age,
      gender: formData.gender,
      tel: formData.tel,
      part: formData.part,
    });

    if (res.status === 200) {
      console.log("소셜 회원가입 성공", res.data);
      return res.data;
    }
  } catch (error) {
     // AxiosError에 대한 처리
    if (error instanceof AxiosError) {
      const errorCode = error.response?.data?.code; // 응답 코드 확인

      if (errorCode === "M001"){
        console.error(error.response?.data?.message);
        return { 
          success: false, 
          errorCode: "M001", 
          message: "중복된 이메일 입니다." 
        };
      }
    } else {
      // AxiosError가 아닌 경우 (예: 네트워크 오류, 기타 예외 처리)
      console.error("소셜 회원가입 실패:", error);
      window.alert("회원가입에 실패했습니다. 다시 시도해주세요.")
    }
  }
};



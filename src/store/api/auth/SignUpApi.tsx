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
  M001: "중복된 이메일 입니다." ,
  DEFAULT: "알 수 없는 오류가 발생했습니다."
} as const;


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
      const response = await axios.post(`${apiUrl}/sign-up`, {
        name: formData.name,
        age: formData.age,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        tel: formData.tel,
        part: formData.part,
      });
  
      if (response.status === 200) {
        console.log("회원가입 성공");
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
        console.error("회원가입 실패:", error);
        return { success: false, message: ERROR_CODES.DEFAULT };
      }
    }
  };
  

  //소셜 회원가입Api
export const SocialSignUpApi = async (formData: {
  age: string;
  gender: string;
  tel: string;
  part: string;
}) => {
  try {
    const response = await axios.post(`${apiUrl}/sign-up/social`, {
      age: formData.age,
      gender: formData.gender,
      tel: formData.tel,
      part: formData.part,
    },
    { headers: getAuthHeaders() }
  );

    if (response.status === 200) {
      console.log("소셜 회원가입 성공");
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
      console.error("회원가입 실패:", error);
      return { success: false, message: ERROR_CODES.DEFAULT };
    }
  }
};



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
        return res.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // AxiosError에 대한 처리
        console.error("회원가입 요청 실패:", error.response?.data?.message);
        return error.response?.data?.message;
      } else {
        // AxiosError가 아닌 경우 (예: 네트워크 오류, 기타 예외 처리)
        console.error("회원가입 실패:", error);
      }
    }
  };
  

  export const SocialSignUpApi = async (socialformData: {
    age: number;
    password: string;
    gender: string;
    tel: string;
    part: string;
}) => {
    try {

        const res = await axios.post(
            `${apiUrl}/sign-up/social`,
            {
                age: socialformData.age,
                password: socialformData.password,
                gender: socialformData.gender,
                tel: socialformData.tel,
                part: socialformData.part
            },
        );
        if (res.status === 200) {
            console.log("회원가입 성공", res.data);
        } else if (res.data.code === 'M001') {
            console.log(res.data.message);
        }
    } catch (error) {
        console.error("회원가입 에러", error);
    }
};



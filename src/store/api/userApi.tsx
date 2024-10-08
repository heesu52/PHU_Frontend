import axios from "axios";
import { useApiUrlStore } from "../store";

//소셜 로그인 api
export const GoogleLoginApi = async () => {
    try {
        const res = await axios.post('https://fitee.site/oauth2/authorization/google', {
        });
        console.log(res.data)
        if (res.status === 200) {
            console.log("로그인 성공", res.data);
            return res.data;
        }
    } catch (error) {
        console.error("구글 로그인 에러", error);
    }
};

//일반 로그인 api
export const LoginApi = async (email: string, password: string) => {
    try {
        const res = await axios.post('https://fitee.site/login', {
            email, password
        });
        if (res.status === 200) {
            console.log("로그인 성공", res.data);
            return res.data;
        }
        else if(res.data.code === 'M002'){
            console.log(res.data.message)
        }
    } catch (error) {
        console.error("로그인 실패:", error);
    }
};

//회원가입Api
export const SignUpApi = async (formData: {
    name: string;
    age: string;
    email: string;
    password: string;
    gender: string;
    tel: string;
    part: string;}) => {
        
        const apiUrl = useApiUrlStore.getState().apiUrl; 
    try {
        const res = await axios.post(`${apiUrl}/sign-up`, {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            tel: formData.tel,
            part: formData.part
        });
        if (res.status === 200) {
            console.log("회원가입 성공", res.data);
        } else if (res.data.code === 'M001') {
            console.log(res.data.message);
        }
    } catch (error) {
        console.error("회원가입 에러", error);
    }
};

//소셜 로그인 회원가입Api
export const SocialSignUpApi = async (formData: {
    name: string;
    age: string;
    email: string;
    password: string;
    gender: string;
    tel: string;
    part: string;}) => {
    try {
        const res = await axios.post('https://fitee.site/sign-up', {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            tel: formData.tel,
            part: formData.part
        });
        if (res.status === 200) {
            console.log("회원가입 성공", res.data);
        } else if (res.data.code === 'M001') {
            console.log(res.data.message);
        }
    } catch (error) {
        console.error("회원가입 에러", error);
    }
};

//로그아웃 api
export const LogoutApi = async () => {
    try {

        const res = await axios.post('https://fitee.site/logout', {
        });
        if (res.status === 200) {
            console.log(res.data);
        }
    } catch (error) {
        console.error(error);
    }
};


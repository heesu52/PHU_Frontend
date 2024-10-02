import { useState } from "react";
import Input from "../components/common/Input"; 
import SubmitButton from "../components/common/button/SubmitButton";
import NavigationBar from "../components/common/button/NavigationBar";
// import { GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        console.log("로그인 클릭됨");
    };

    // const handleGoogleLogin = async (response: GoogleLoginResponse) => {
    //     try {
    //         // 구글 로그인 성공 시 받은 credential (토큰)
    //         const googleToken = response.credential;

    //         // 백엔드로 구글 토큰 전송
    //         const res = await axios.post('https://fitee.site/oauth2/authorization/google', {
    //             token: googleToken,
    //         });

    //         // 로그인 성공 시 처리
    //         if (res.status === 200) {
    //             console.log("로그인 성공", res.data);
    //             // 예: 로그인 후 리다이렉션 처리
    //         }
    //     } catch (error) {
    //         console.error("구글 로그인 에러", error);
    //     }
    // };

    return (
        <div>
            <NavigationBar label="로그인" />
            <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}> 
                <Input 
                    size="large"           
                    placeholder="이메일"
                    type="email"
                    value={email}
                    className="mb-6"       
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input 
                    size="large"           
                    placeholder="비밀번호" 
                    type="password"
                    value={password}        
                    className=""       
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <SubmitButton
                    label="로그인"            
                    size="large"              
                    className={`mt-6 mb-3 ${isFormValid ? 'bg-custom-blue' : 'bg-custom-skyblue'}`} 
                    disabled={!isFormValid} 
                />
                <div className="flex items-center mb-9">
                    <span className="text-[14px] mr-[10px] text-custom-darkgrey">아직 회원이 아니신가요?</span>
                    <a href="/signup" className="text-custom-darkgrey text-[14px] font-semibold hover:text-custom-indigo ">회원 가입</a>
                </div>
                <span className="p-5 border border-custom-softgrey">구글로그인</span>
                {/* <GoogleLogin
                    onSuccess={handleGoogleLogin} 
                /> */}
            </form>
        </div>
    );
}

export default LoginPage;

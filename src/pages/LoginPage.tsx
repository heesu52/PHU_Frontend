import { useState } from "react";
import Input from "../components/common/Input"; 
import Button from "../components/common/button/Button";
import NavigationBar from "../components/common/button/NavigationBar";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        console.log("로그인 클릭됨");
    };

    return (
        <div>
            <NavigationBar />
            <form className="flex flex-col items-center mt-9" onSubmit={handleSubmit}> {/* 폼 제출 이벤트 연결 */}
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
                <Button
                    label="로그인"            
                    size="large"             
                    type="submit"  // 버튼 타입을 submit으로 설정
                    className={`mt-6 ${isFormValid ? 'bg-custom-blue' : 'bg-custom-skyblue'}`} // 조건에 따른 배경색 변경
                    disabled={!isFormValid} // 입력이 유효하지 않으면 버튼 비활성화         
                />
            </form>
        </div>
    );
}

export default LoginPage;

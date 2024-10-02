import { useState } from "react";
import Input from "../components/common/Input"; 
import SubmitButton from "../components/common/button/SubmitButton";
import Button from "../components/common/button/Button";
import NavigationBar from "../components/common/button/NavigationBar";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    // formData 상태를 객체로 초기화
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        gender: '',
        tel: '',
        part: ''
    });

    // 모든 필드가 비어 있지 않으면 form이 유효하도록 설정
    const isFormValid = formData.name !== '' && 
                    formData.age !== '' && 
                    formData.email !== '' && 
                    formData.password !== '' &&
                    formData.tel !== '' && 
                    formData.gender !== '' &&  // 성별이 선택되지 않으면 유효하지 않음
                    formData.part !== '';       // 파트가 선택되지 않으면 유효하지 않음


    // 필드 값 변경 처리
    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 성별 및 파트 버튼 클릭 시 처리
    const handleButtonClick = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,  // 성별 또는 파트 값을 해당 필드에 설정
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/login');
        console.log("회원가입 정보:", formData);
    };

    return (
        <div>
            <NavigationBar label="회원가입" />
            <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}> 
                <div className="flex flex-col">
                    <span className="text-[14px] text-[#858585] mb-1">이름</span>
                    <Input 
                        size="large"           
                        type="text"
                        name="name"
                        value={formData.name} 
                        className="mb-4"       
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] text-[#858585] mb-1">나이</span>
                    <Input 
                    size="large"           
                    type="text"
                    name="age"
                    value={formData.age} 
                    className="mb-4"       
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] text-[#858585] mb-1">이메일</span>
                    <Input 
                    size="large"           
                    type="email"
                    name="email"
                    value={formData.email} 
                    className="mb-4"       
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] text-[#858585] mb-1">비밀번호</span>
                    <Input 
                    size="large"           
                    type="password"
                    name="password"
                    value={formData.password}  
                    className="mb-4"       
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] text-[#858585] mb-1">핸드폰 번호</span>
                    <Input 
                    size="large"           
                    type="text"
                    name="tel"
                    placeholder="( - 제외 )"
                    value={formData.tel}  
                    className="mb-4"       
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="flex flex-col w-[550px]">
                    <span className="text-[14px] text-[#858585] mb-1">성별</span>
                    <div className="flex justify-center gap-20 mb-4">
                    <Button
                        label="여성" 
                        size="medium"             
                        value="women"
                        onClick={() => handleButtonClick('gender', 'women')} 
                        className={formData.gender === 'women' ? 'bg-custom-blue text-white' : 'border border-custom-softgrey text-custom-softgrey'}  
                        />
                        <Button
                        label="남성" 
                        size="medium"             
                        value="men"
                        onClick={() => handleButtonClick('gender', 'men')}
                        className={formData.gender === 'men' ? 'bg-custom-blue text-white' : 'border border-custom-softgrey text-custom-softgrey'} 
                    />
                    </div>
                </div>
                <div className="flex flex-col w-[550px]">
                    <span className="text-[14px] text-[#858585] mb-1">파트</span>
                    <div className="flex justify-center gap-20">
                    <Button
                        label="트레이너" 
                        size="medium"             
                        value="trainer"
                        onClick={() => handleButtonClick('part', 'trainer')} 
                        className={formData.part === 'trainer' ? 'bg-custom-blue text-white' : 'border border-custom-softgrey'}
                        />
                    <Button
                        label="회원" 
                        size="medium"             
                        value="member"
                        onClick={() => handleButtonClick('part', 'member')}
                        className={formData.part === 'member' ? 'bg-custom-blue text-white' : 'border border-custom-softgrey'}
                    />
                    </div>
                </div>
                <SubmitButton
                    label="회원가입" 
                    size="large"              
                    className={`mt-6 mb-3 ${isFormValid ? 'bg-custom-blue' : 'bg-custom-skyblue'}`} 
                    disabled={!isFormValid}  // 폼이 유효하지 않으면 버튼 비활성화
                    
                />
            </form>
        </div>
    );
}

export default SignUp;

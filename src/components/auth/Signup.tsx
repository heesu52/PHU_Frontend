import { useState } from "react";
import Input from "../../components/common/Input";
import SubmitButton from "../../components/common/button/SubmitButton";
import Button from "../../components/common/button/Button";
import HeaderBar from "../../components/common/bar/ArrowHeaderBar";
import { useNavigate } from "react-router-dom";
import { SignUpApi } from "../../store/api/index";

function SignUp() {
  const navigate = useNavigate();
  const [errormessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    gender: "",
    tel: "",
    part: "",
  });

  // 모든 필드가 비어 있지 않으면 form이 유효하도록 설정
  const isFormValid =
    formData.name !== "" &&
    formData.age !== "" &&
    formData.email !== "" &&
    formData.password !== "" &&
    formData.tel !== "" &&
    formData.gender !== "" &&
    formData.part !== "";

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
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await SignUpApi(formData);
    if (response?.success) {
      navigate('/login');
    } else {
      // 중복된 이메일 경우 에러메세지
      setErrorMessage(response?.message || "회원가입에 실패했습니다");
    }
  };

  return (
    <div>
      <HeaderBar label="회원가입" />
      <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col">
            <span className="text-sm text-[#858585] mb-1">이름</span>
            <Input
              size="large"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#858585] mb-1 ">나이</span>
            <Input
              size="large"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#858585] mb-1">이메일</span>
            <Input
              size="large"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {errormessage && (
            <div className="text-xs text-red-500">{errormessage}</div>
          )}
          <div className="flex flex-col">
            <span className="text-sm text-[#858585] mb-1">비밀번호</span>
            <Input
              size="large"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#858585] mb-1">핸드폰 번호</span>
            <Input
              size="large"
              type="text"
              name="tel"
              placeholder="( - 제외 )"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#858585] mb-1 ">성별</span>
            <div className="flex justify-center gap-20">
              <Button
                label="여성"
                name="gender"
                value="FEMALE"
                onClick={() => handleButtonClick("gender", "FEMALE")}
                checked={formData.gender === "FEMALE"}
              />
              <Button
                label="남성"
                name="gender"
                value="MALE"
                onClick={() => handleButtonClick("gender", "MALE")}
                checked={formData.gender === "MALE"}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#858585] mb-1">파트</span>
            <div className="flex justify-center gap-20 mb-4">
              <Button
                label="트레이너"
                name="part"
                value="TRAINER"
                onClick={() => handleButtonClick("part", "TRAINER")}
                checked={formData.part === "TRAINER"}
              />
              <Button
                label="회원"
                name="part"
                value="MEMBER"
                onClick={() => handleButtonClick("part", "MEMBER")}
                checked={formData.part === "MEMBER"}
              />
            </div>
          </div>
          <SubmitButton
            label="회원가입"
            size="large"
            className={`${
              isFormValid ? "bg-custom-blue" : "bg-custom-skyblue"
            }`}
            disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;

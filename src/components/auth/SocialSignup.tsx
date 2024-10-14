import { useState} from "react";
import Input from "../../components/common/Input";
import SubmitButton from "../../components/common/button/SubmitButton";
import Button from "../../components/common/button/Button";
import HeaderBar from "../../components/common/bar/ArrowHeaderBar";
import { useNavigate } from "react-router-dom";
import { SocialSignUpApi } from "../../store/api";

function SocialSignUp() {
  const navigate = useNavigate();

  // 사용자 정보를 담는 상태
  const [socialformData, setSoicalFormData] = useState({
    age: 0,
    password: "",
    gender: "",
    tel: "",
    part: "",
    social_id: "",
    name: "",
    email: ""
  });

  // 폼이 유효한지 확인
  const isFormValid =
    socialformData.age !== 0 &&
    socialformData.password !== "" &&
    socialformData.tel !== "" &&
    socialformData.gender !== "" &&
    socialformData.part !== "";



  // 필드 값 변경 처리
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setSoicalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 성별 및 파트 버튼 클릭 시 처리
  const handleButtonClick = (name: string, value: string) => {
    setSoicalFormData((prevData) => ({
      ...prevData,
      [name]: value, // 성별 또는 파트 값을 해당 필드에 설정
    }));
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API 호출
    SocialSignUpApi(socialformData);
    navigate('/login');
  };

  return (
    <div>
      <HeaderBar label="소셜회원가입" />
      <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span className="text-[14px] text-[#858585] mb-1">이름</span>
          <Input
            size="large"
            type="text"
            name="name"
            className="mb-4"
            value={socialformData.name} // 상태에서 가져온 이름
            readOnly={true}
            disabled={true}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] text-[#858585] mb-1">나이</span>
          <Input
            size="large"
            type="number"
            name="age"
            value={socialformData.age}
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
            value={socialformData.email} 
            className="mb-4"
            readOnly={true}
            disabled={true}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] text-[#858585] mb-1">비밀번호</span>
          <Input
            size="large"
            type="password"
            name="password"
            value={socialformData.password}
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
            value={socialformData.tel}
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
              value="FEMALE"
              onClick={() => handleButtonClick("gender", "FEMALE")}
              className={
                socialformData.gender === "FEMALE"
                  ? "bg-custom-blue text-white"
                  : "border border-custom-softgrey text-custom-softgrey"
              }
            />
            <Button
              label="남성"
              size="medium"
              value="MALE"
              onClick={() => handleButtonClick("gender", "MALE")}
              className={
                socialformData.gender === "MALE"
                  ? "bg-custom-blue text-white"
                  : "border border-custom-softgrey text-custom-softgrey"
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-[550px]">
          <span className="text-[14px] text-[#858585] mb-1">파트</span>
          <div className="flex justify-center gap-20">
            <Button
              label="트레이너"
              size="medium"
              value="TRAINER"
              onClick={() => handleButtonClick("part", "TRAINER")}
              className={
                socialformData.part === "TRAINER"
                  ? "bg-custom-blue text-white"
                  : "border border-custom-softgrey"
              }
            />
            <Button
              label="회원"
              size="medium"
              value="MEMBER"
              onClick={() => handleButtonClick("part", "MEMBER")}
              className={
                socialformData.part === "MEMBER"
                  ? "bg-custom-blue text-white"
                  : "border border-custom-softgrey"
              }
            />
          </div>
        </div>
        <SubmitButton
          label="회원가입"
          size="large"
          className={`mt-6 mb-3 ${isFormValid ? "bg-custom-blue" : "bg-custom-skyblue"}`}
          disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
        />
      </form>
    </div>
  );
}

export default SocialSignUp;

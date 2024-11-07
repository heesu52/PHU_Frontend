import { useState} from "react";
import Input from "../../components/common/Input";
import SubmitButton from "../../components/common/button/SubmitButton";
import Button from "../../components/common/button/Button";
import HeaderBar from "../../components/common/bar/ArrowHeaderBar";
import { useNavigate } from "react-router-dom";
import { SocialSignUpApi } from "../../store/api";

function SocialSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    tel: "",
    part: "",
  });

    // 모든 필드가 비어 있지 않으면 form이 유효하도록 설정
    const isFormValid =
    formData.age !== "" &&
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
      [name]: value, // 성별 또는 파트 값을 해당 필드에 설정
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await SocialSignUpApi(formData);
    if (response?.success) {
      navigate('/login');
    }
  };

  return (
    <div>
      <HeaderBar label="소셜회원가입" />
      <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span className="text-[14px] text-[#858585] mb-1">나이</span>
          <Input
            size="large"
            type="number"
            name="age"
            value={formData.age}
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
        <div className="flex flex-col w-[500px]">
          <span className="text-[14px] text-[#858585] mb-1">성별</span>
          <div className="flex justify-center gap-20 mb-4">
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
        <div className="flex flex-col w-[500px]">
          <span className="text-[14px] text-[#858585] mb-1">파트</span>
          <div className="flex justify-center gap-20">
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
          className={`mt-6 mb-3 ${isFormValid ? "bg-custom-blue" : "bg-custom-skyblue"}`}
          disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
        />
      </form>
    </div>
  );
}

export default SocialSignUp;

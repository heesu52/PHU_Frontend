import { useState } from "react";
import Input from "../../components/common/Input";
import SubmitButton from "../../components/common/button/SubmitButton";
import Button from "../../components/common/button/Button";
import HeaderBar from "../../components/common/bar/ArrowHeaderBar";

function Edit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    tel: "",
  });

  // 모든 필드가 비어 있지 않으면 form이 유효하도록 설정
  const isFormValid =
    formData.name !== "" &&
    formData.email !== "" &&
    formData.tel !== "" &&
    formData.gender !== "" 

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
    
  }

  return (
    <div>
      <HeaderBar label="내 정보 변경"/>
      <div>
      <form className="flex flex-col items-center mt-5 border" onSubmit={handleSubmit}>
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
              value="FEMALE"
              onClick={() => handleButtonClick("gender", "FEMALE")}
              className={
                formData.gender === "FEMALE"
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
                formData.gender === "MALE"
                  ? "bg-custom-blue text-white"
                  : "border border-custom-softgrey text-custom-softgrey"
              }
            />
          </div>
        </div>
      </form>
      <div className="border">
        <SubmitButton
          label="확인"
          size="large"
          className={`mt-6 mb-3 ${
            isFormValid ? "bg-custom-blue" : "bg-custom-skyblue"
          }`}
          disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
        />
        </div>
      </div>
    </div>
  );
}

export default Edit;

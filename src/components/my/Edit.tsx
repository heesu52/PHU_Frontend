import { useEffect, useState } from "react";
import Input from "../../components/common/Input";
import SubmitButton from "../../components/common/button/SubmitButton";
import HeaderBar from "../../components/common/bar/ArrowHeaderBar";
import { getUserApi, editUserApi } from "../../store/api";
import { useMemberDataStore } from "../../store/store";
import { notify } from "../common/ToastMessage/ToastMessageItem";
import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const { memberData } = useMemberDataStore();

  // 상태 변수 설정
  const [name, setName] = useState<string>(memberData?.name || "");
  const [age, setAge] = useState<number>(memberData?.age || 0);
  const [tel, setTel] = useState<string>(memberData?.tel || "");

  // 회원 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserApi();
        // 받은 데이터로 상태 업데이트
        setName(response?.data.name);
        setAge(response?.data.age);
        setTel(response?.data.tel);
      } catch (error) {
        console.error("회원 정보를 불러오는 중 에러 발생:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await editUserApi(name, age, tel);
      if (response?.success) {
        notify("success", "회원정보가 수정됐어요💪🏻");
        navigate("/my"); // 수정 성공 후 마이 페이지로 이동
      } else {
        notify("error", "회원정보 수정에 실패했어요.");
      }
    } catch (error) {
      console.error("회원정보 수정 중 에러 발생:", error);
      notify("error", "회원정보 수정 중 문제가 발생했어요.");
    }
  };

  return (
    <div>
      <HeaderBar label="내 정보 변경" />
      <div>
        <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <span className="text-[14px] text-[#858585] mb-1">이름</span>
            <Input
              size="large"
              type="text"
              name="name"
              value={name}
              className="mb-4"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] text-[#858585] mb-1">나이</span>
            <Input
              size="large"
              type="number"
              name="age"
              value={age}
              className="mb-4"
              onChange={(e) => setAge(Number(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] text-[#858585] mb-1">핸드폰 번호</span>
            <Input
              size="large"
              type="text"
              name="tel"
              value={tel}
              className="mb-4"
              onChange={(e) => setTel(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <SubmitButton
              label="확인"
              size="small"
              className="bg-blue-500"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;

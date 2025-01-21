import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import SubmitButton from "../../components/common/button/SubmitButton";
import HeaderBar from "../../components/common/bar/ArrowHeaderBar";
import googleLogin from "../../assets/google.svg";
import { GoogleLoginApi, LoginApi } from "../../store/api/index";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await LoginApi(email, password);
    if (response?.success) {
      navigate("/my");
    } else {
      if (response?.errorCode === "M002") {
        setErrorMessage(response.message);
      }
    }
  };

  const onGoogleLogin = async () => {
    GoogleLoginApi();
  };

  return (
    <div>
      <HeaderBar label="로그인" />
      <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <Input
              size="large"
              placeholder="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <Input
              size="large"
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
            {errormessage && (
              <div className="text-xs text-red-500">{errormessage}</div>
            )}
            <SubmitButton
              label="로그인"
              size="large"
              className={`-mb-2 ${
                isFormValid ? "bg-custom-blue" : "bg-custom-skyblue"
              }`}
              disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
            />
            <div className="flex justify-center text-xs text-center">
              <span className="mr-2 text-custom-darkgrey">
                아직 회원이 아니신가요?
              </span>
              <a
                href="/signup"
                className="font-semibold text-custom-darkgrey hover:text-custom-indigo"
              >
                회원 가입
              </a>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <img
              src={googleLogin}
              onClick={onGoogleLogin}
              className="h-8 cursor-pointer lg:h-9"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

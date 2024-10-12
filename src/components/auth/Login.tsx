import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import SubmitButton from "../../components/common/button/SubmitButton";
import NavigationBar from "../../components/common/bar/NavigationBar";
import googleLogin from "../../assets/google.svg"
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
      navigate("/list"); 
    } else {
      setErrorMessage("존재하지 않는 아이디 또는 비밀번호 입니다.");  
    }
  };

  const onGoogleLogin = async () => {
    GoogleLoginApi();
  };

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
        {errormessage && (
          <div className="text-red-500 ">{errormessage}</div>
        )}
        <SubmitButton
          label="로그인"
          size="large"
          className={`mt-6 mb-3 ${
            isFormValid ? "bg-custom-blue" : "bg-custom-skyblue"
          } cursor-pointer`}
          disabled={!isFormValid}
        />
        <div className="flex items-center mb-9">
          <span className="text-[14px] mr-[10px] text-custom-darkgrey">
            아직 회원이 아니신가요?
          </span>
          <a
            href="/signup"
            className="text-custom-darkgrey text-[14px] font-semibold hover:text-custom-indigo "
          >
            회원 가입
          </a>
        </div>
        <div className="flex items-center justify-center mb-4">
          <img
            src={googleLogin}
            onClick={onGoogleLogin}
            className="cursor-pointer"
            />
        </div>
      </form>
    </div>
  );
}

export default Login;

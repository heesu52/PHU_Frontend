import { useEffect, useState } from 'react';
import compactup from "../../../assets/compact-up.svg";
import SubmitButton from "../button/SubmitButton";
import Input from "../Input";
import { addPTMemberApi } from '../../../store/api/user/member/MemberApi';
import { useListDataStore } from '../../../store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean; 
}

function BottomSheet({ onClose, isOpen }: BottomSheetProps) {
  const [email, setEmail] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const {listData, setListData} = useListDataStore();
  
  useEffect(() => {
    // BottomSheet가 열릴 때 스크롤을 비활성화
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
  
    const response = await addPTMemberApi(email);
    if (response?.success) {
      setListData([...listData, response.data])
      toast.success("회원이 추가됐어요💪🏻");
      onClose(); // 추가 후 BottomSheet 닫기
    } else {
      if (response?.errorCode === "M003"){
        setErrorMessage(response.message);
      }
      if (response?.errorCode === "M004"){
        setErrorMessage(response.message);
      }
      if (response?.errorCode === "M005"){
        setErrorMessage(response.message);
      }
      if (response?.errorCode === "M006"){
        setErrorMessage(response.message);
      }
    } 
  };

  return (
    <>
    <ToastContainer position='top-center'/>
      <div
        className={`fixed bottom-0 w-[600px] h-[250px] bg-white border shadow-lg rounded-md transition-transform duration-300 transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } z-50`}
      >
        <div className="flex flex-col items-center justify-between p-1">
          <img
            src={compactup}
            className="w-12 transform rotate-180 cursor-pointer"
            onClick={onClose}
          />
          <span className="text-sm">추가할 회원의 이메일을 입력하세요</span>
        </div>
        <form className="flex flex-col items-center p-7" onSubmit={handleSubmit}>
          <Input
            size="medium"
            placeholder="email"
            type="email"
            className="placeholder:text-custom-softgrey"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errormessage && (
          <div className="text-red-500 ">{errormessage}</div>
          )}
          <SubmitButton
            label="확인"
            size="small"
            className={`m-7 cursor-pointer bg-custom-blue`}
          />
        </form>
      </div>
    </>
  );
}

export default BottomSheet;

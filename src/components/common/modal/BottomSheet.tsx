import { useEffect, useState } from 'react';
import compactup from "../../../assets/compact-up.svg";
import SubmitButton from "../button/SubmitButton";
import Input from "../Input";
import { addPTMemberApi, getPTListApi } from '../../../store/api/info/MemberApi';
import { useListDataStore } from '../../../store/store';
import { notify } from "../ToastMessage/ToastMessageItem";

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
}

function BottomSheet({ onClose, isOpen }: BottomSheetProps) {
  const [email, setEmail] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const { setListData } = useListDataStore();
  const [isMemberAdded, setIsMemberAdded] = useState(false); // 회원 추가 여부 상태 관리

  // BottomSheet가 열릴 때 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    // 회원 추가가 성공하면 리스트를 새로고침
    if (isMemberAdded) {
      const fetchPTList = async () => {
        const listResponse = await getPTListApi();
        if (listResponse?.success) {
          setListData(listResponse.data);
          notify('success',"회원이 추가됐어요💪🏻");
        }
      };
      fetchPTList();
      setIsMemberAdded(false);  // 추가 후 상태 초기화
    }
  }, [isMemberAdded, setListData]);
  

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await addPTMemberApi(email);

    if (response?.success) {
      setIsMemberAdded(true);  // 회원 추가 후 상태 변경
      onClose();  // BottomSheet 닫기
    } else {
      setErrorMessage(response?.message || "알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
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
  );
}

export default BottomSheet;

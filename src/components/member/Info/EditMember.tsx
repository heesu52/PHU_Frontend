import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubmitButton from "../../common/button/SubmitButton";
import { memberInfoDataStore } from "../../../store/store";
import { getPTInfoApi, addPTInforApi, editInfoApi } from "../../../store/api/user/member/MemberInfoApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditMemberInfoProps {
  onSubmit: () => void;
}

function EditMemberInfo({ onSubmit }: EditMemberInfoProps) {
  const { infoData, setInfoData } = memberInfoDataStore();
  const { memberid } = useParams();

  // 상태 변수 설정
  const [ptStartDate, setPtStartDate] = useState(infoData.ptStartDate);
  const [ptEndDate, setPtEndDate] = useState(infoData.ptEndDate);
  const [memberTarget, setMemberTarget] = useState(infoData.memberTarget);
  const [significant, setSignificant] = useState(infoData.significant);
  const [isExistingMember, setIsExistingMember] = useState(false); // 기존 회원 여부 상태 추가

  // 수정을 위한 useEffect 최적화
  useEffect(() => {
    const fetchMemberInfo = async () => {
      const response = await getPTInfoApi(Number(memberid));
      if (response && response.errorCode === "M003") {
        setIsExistingMember(false); // 신규 회원으로 설정
      } else {
        setIsExistingMember(true); // 기존 회원으로 설정
        // 받은 데이터로 상태 업데이트
        setPtStartDate(response.ptStartDate);
        setPtEndDate(response.ptEndDate);
        setMemberTarget(response.memberTarget);
        setSignificant(response.significant);
        setInfoData(response);
      }
    };
    fetchMemberInfo();
  }, [memberid, setInfoData]);

  // textarea의 높이를 자동으로 조정하는 함수
  const adjustTextareaHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto"; // 기존 높이를 리셋
    textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰서 높이 조정
  };

  // onSubmit에서 addPTInforApi 또는 editInfoApi 호출
const handleSubmit = async () => {
  if (isExistingMember) {
    // 기존 회원이면 editInfoApi 호출
    await editInfoApi(
      infoData.id,
      memberTarget,  // memberTarget 전달
      significant,   // significant 전달
      ptStartDate,   // ptStartDate 전달
      ptEndDate      // ptEndDate 전달
    );
    toast.success("회원정보가 수정됐어요💪🏻");
  } else {
    // 신규 회원이면 addPTInforApi 호출
    await addPTInforApi(
      Number(memberid),
      memberTarget,  // memberTarget 전달
      significant,   // significant 전달
      ptStartDate,   // ptStartDate 전달
      ptEndDate      // ptEndDate 전달
    );
    toast.success("회원정보가 추가됐어요💪🏻");
  }

  onSubmit(); // 부모 컴포넌트의 onSubmit 호출
};



  return (
    <div className="flex-col w-[80%] justify-between flex h-[90%]">
      <ToastContainer position="top-center"/>
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="text-base">PT 날짜</div>
          <input
            type="date"
            value={ptStartDate}
            onChange={(e) => setPtStartDate(e.target.value)}
          />
          <span className="mx-3">~</span>
          <input
            type="date"
            value={ptEndDate}
            onChange={(e) => setPtEndDate(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="text-base">목표</div>
          <textarea
            className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1"
            onInput={adjustTextareaHeight}
            maxLength={150}
            value={memberTarget}
            onChange={(e) => setMemberTarget(e.target.value)}
            placeholder="ex) 어깨가 불편함, 식단을 하지 않음"
          />
        </div>

        <div className="space-y-1">
          <div className="text-base">특이사항</div>
          <textarea
            className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-2 p-1"
            onInput={adjustTextareaHeight}
            maxLength={150}
            value={significant}
            onChange={(e) => setSignificant(e.target.value)}
            placeholder="ex) 어깨가 불편함, 식단을 하지 않음"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <SubmitButton label="확인" size="small" onClick={handleSubmit} className="bg-blue-500" />
      </div>
    </div>
  );
}

export default EditMemberInfo;

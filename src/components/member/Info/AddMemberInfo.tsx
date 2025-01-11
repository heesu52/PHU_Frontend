import { useState } from "react";
import { useParams } from "react-router-dom";
import SubmitButton from "../../common/button/SubmitButton";
import { adjustTextareaHeight } from "../../common/adjustTextareaHeight";
import { useInfoDataStore } from "../../../store/store";
import { addPTInforApi} from "../../../store/api/info/MemberInfoApi";
import { notify } from "../../common/ToastMessage/ToastMessageItem";


interface AddMemberInfoProps {
  onSubmit: () => void;
}

function AddMemberInfo({ onSubmit }: AddMemberInfoProps) {
  const { setInfoData } = useInfoDataStore();
  const { listid } = useParams();
;

  // 상태 변수 설정
  const [ptStartDate, setPtStartDate] = useState("");
  const [ptEndDate, setPtEndDate] = useState("");
  const [memberTarget, setMemberTarget] = useState("");
  const [significant, setSignificant] = useState("");

  

  // onSubmit에서 addPTInforApi 호출
  const handleSubmit = async () => {
    const response = await addPTInforApi(
      Number(listid), 
      memberTarget,
      significant,
      ptStartDate,
      ptEndDate
    );
    if (response?.success) {
      notify('success',"회원정보가 추가됐어요💪🏻");
    } else {
      notify('error',"회원정보 추가에 실패했어요. 다시 시도해 주세요.");
    }
    setInfoData(response?.data);
    onSubmit(); 
  };

  return (
      <div className="flex-col w-[80%] justify-between flex h-[90%]">
        <div className="space-y-6">
          <div className="text-lg font-semibold">회원 정보 추가</div>
          
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
              placeholder="ex) 10kg감량"
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

export default AddMemberInfo;

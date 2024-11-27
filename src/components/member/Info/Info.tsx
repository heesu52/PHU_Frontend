import { useEffect } from "react";
import { memberInfoDataStore } from "../../../store/store";
import { getPTInfoApi } from "../../../store/api/user/member/MemberInfoApi";
import { useParams } from "react-router-dom";
import Loadinglottie from "../../lottie/LoadingLottie";

function MemberInfo() {
  const { listid } = useParams();
  const { infoData, setInfoData } = memberInfoDataStore();

  // textarea의 높이를 자동조절하는 함수
  const adjustTextareaHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto"; // 기존 높이를 리셋
    textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰서 높이 조정
  };

  // 회원 상세정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      const response = await getPTInfoApi(Number(listid));
      if (response) {
        setInfoData(response); 
      }
    };
    fetchMemberInfo();
  }, [listid, setInfoData]); 

  if (!infoData) {
    return( 
    <div className="flex items-center justify-center h-full">
      <Loadinglottie/>
      <div className="ml-2">Loading...</div>; // infoData가 없으면 로딩 표시
    </div>
    )
  }

  return (
    <div className="flex-col w-[80%] space-y-6 flex h-[90%]">
      <div className="space-y-1">
        <div className="text-base">PT 날짜</div>
        <span>{infoData.ptStartDate}</span>
        <span className="mx-3">~</span>
        <span>{infoData.ptEndDate}</span>
      </div>

      <div className="space-y-1">
        <div className="text-base">목표</div>
        <textarea
          className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1"
          onInput={adjustTextareaHeight}
          value={infoData.memberTarget}
          disabled
        />
      </div>

      <div className="space-y-1">
        <div className="text-base">특이사항</div>
        <textarea
          className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-2 p-1"
          onInput={adjustTextareaHeight}
          value={infoData.significant}
          disabled
        />
      </div>
    </div>
  );
}

export default MemberInfo;

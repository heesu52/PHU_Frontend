import { useInfoDataStore } from "../../../store/store";
import LoadingLottie from "../../lottie/LoadingLottie";

function Info() {
  const { infoData } = useInfoDataStore(); // zustand 스토어에서 infoData 불러오기

  // textarea의 높이를 자동조절하는 함수
  const adjustTextareaHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto"; // 기존 높이를 리셋
    textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰서 높이 조정
  };

  // infoData가 로딩 중일 때 표시
  if (!infoData || Object.keys(infoData).length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingLottie />
        <div className="ml-2">Loading...</div> {/* 로딩 상태 표시 */}
      </div>
    );
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

export default Info;

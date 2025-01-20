import { useInfoDataStore } from "../../../store/store";
import { adjustTextareaHeight } from "../../common/adjustTextareaHeight";

function Info() {
  const { infoData } = useInfoDataStore(); // zustand 스토어에서 infoData 불러오기

  return (
    <div className="flex flex-col w-[90%] lg:w-[80%] space-y-6 h-[90%] mx-auto">
      <div className="space-y-1">
        <div className="text-sm font-medium md:text-base lg:text-base">PT 날짜</div>
        <div className="flex flex-wrap items-center">
          <span className="text-sm">{infoData.ptStartDate}</span>
          <span className="mx-3">~</span>
          <span className="text-sm">{infoData.ptEndDate}</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm font-medium md:text-base lg:text-base">목표</div>
        <textarea
          className="border w-full sm:w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-2"
          onInput={adjustTextareaHeight}
          value={infoData.memberTarget}
          disabled
        />
      </div>

      <div className="space-y-1">
        <div className="text-sm font-medium md:text-base lg:text-base">특이사항</div>
        <textarea
          className="border w-full sm:w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-2 p-2"
          onInput={adjustTextareaHeight}
          value={infoData.significant}
          disabled
        />
      </div>
    </div>
  );
}

export default Info;

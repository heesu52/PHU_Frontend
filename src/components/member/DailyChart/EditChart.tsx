import arrow from "../../../assets/arrow.svg";
import imageupload from "../../../assets/image.svg";
import RadioButton from "../../common/button/RadioButton";
import CheckButton from "../../common/button/CheckButton";
import SubmitButton from "../../common/button/SubmitButton";
import { adjustTextareaHeight } from "../../common/adjustTextareaHeight";
import { getChartApi, editChartApi } from "../../../store/api";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useChartDataStore } from "../../../store/store";
import { notify } from "../../common/ToastMessage/ToastMessageItem";


function EditChart() {
  const navigate = useNavigate();
  const {chartid} = useParams();
  const {chartData, setChartData} = useChartDataStore();
  const [sessionType, setSessionType] = useState<string>("PT");
  
  // 상태 변수 설정
  const [chartDate, setChartDate] = useState<string>(chartData?.chartDate || "");
  const [weight, setWeight] = useState<string>(chartData?.weight || "");
  const [routines, setRoutines] = useState<string[]>(chartData?.routines || []);
  const [memo, setMemo] = useState<string>(chartData?.memo || "");

  
  const handleGoBack = () => {
    navigate(-1); 
  };


  // 차트 정보 가져오기 
  useEffect(() => {
    const fetchChart = async () => {
      const response = await getChartApi(Number(chartid));
      // 받은 데이터로 상태 업데이트
      setChartDate(response?.data.chartDate);
      setWeight(response?.data.weight);
      setRoutines(response?.data.routines);
      setMemo(response?.data.memo);
    };
    fetchChart();
  }, [chartid, setChartData]);

  
  
  const handleSubmit = async () => {
    const response = await editChartApi(
      chartData.id,
      chartDate,
      Number(weight),
      memo,
      routines
    );
    if (response?.success) {
      notify('success',"회원정보가 수정됐어요💪🏻");
    } else {
      notify('error',"회원정보 수정에 실패했어요. 다시 시도해 주세요.");
    }
    navigate(-1);
  };
  
  return (
    <div className="relative flex flex-col items-center w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between w-full h-[55px]">
        <div className="flex p-3 ml-3 space-x-4">
          <img src={arrow} onClick={handleGoBack} className="w-3 h-3 md:w-4 md:h-4" />
          <p className="cursor-default text-md md:text-lg">뒤로가기</p>
        </div>
      </div>

      {/* Component */}
      <div className="w-[90%] mt-3 space-y-5">
        {/* PT 날짜 */}
        <div className="space-y-2">
          <div className="text-sm md:text-md lg:text-base">PT 날짜</div>
          <div className="flex items-center ml-5">
            <input
              type="date"
              value={chartDate}
              onChange={(e) => setChartDate(e.target.value)}
              className="p-2 ml-5 text-xs md:text-sm lg:text-sm"
            />

            {/* 세션 타입 (PT/개인운동) */}
            <div className="flex p-2 ml-6 space-x-4">
              <RadioButton
                id="radio-pt-session"
                label="PT"
                value="PT"
                name="session-type"
                checked={sessionType === "PT"}
                onChange={() => setSessionType("PT")}
              />
              <RadioButton
                id="radio-personal-session"
                label="개인운동"
                value="PRIVATE"
                name="session-type"
                checked={sessionType === "PRIVATE"}
                onChange={() => setSessionType("PRIVATE")}
              />
            </div>
          </div>
        </div>

        {/* 몸무게 */}
        <div className="space-y-2">
          <p className="text-sm md:text-md lg:text-base">몸무게</p>
          <div className="flex items-center gap-2 ml-7">
            <input
              type="number"
              value={weight}
              className="w-[80px] h-8 text-sm border rounded-lg border-custom-skyblue flex text-center"
              onChange={(e) => setWeight(e.target.value)}
            />
            <p className="text-xs md:text-sm lg:text-sm">kg</p>
          </div>
        </div>

        {/* 운동부위 */}
        <div className="space-y-2">
          <p className="text-sm md:text-md lg:text-base">운동부위</p>
          <div className="flex items-center justify-center gap-5 p-2">
            {["SHOLDER", "CHEST", "ABS", "ARM", "LEG", "BACK", "CARDIO"].map((part) => (
              <CheckButton
                key={part}
                id={part}
                label={
                  part === "SHOLDER"
                    ? "어깨"
                    : part === "CHEST"
                    ? "가슴"
                    : part === "ABS"
                    ? "복근"
                    : part === "ARM"
                    ? "팔"
                    : part === "LEG"
                    ? "하체"
                    : part === "BACK"
                    ? "등"
                    : "유산소"
                }
                value={part}
                name="session-type"
                checked={routines.includes(part)}
                onChange={() => setRoutines((prev) => 
                    prev.includes(part) ? prev.filter((routine) => routine !== part) : [...prev, part]
                )}
              />
            ))}
          </div>
        </div>

        {/* 메모 */}
        <div className="space-y-2">
          <div className="text-sm md:text-md lg:text-base">메모</div>
          <textarea
            className="border w-72 md:w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1 ml-7"
            onInput={adjustTextareaHeight}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="ex) 목표 몸무게, 감량하고 싶은 부위"
            maxLength={150}
          />
        </div>

        {/* 인증샷 */}
        <div className="space-y-2">
          <div className="text-sm md:text-md lg:text-base">인증샷</div>
          <div className="border w-72 md:w-[450px] min-h-[150px] rounded-lg text-sm bg-[#f6f6f6] p-1 ml-7 flex flex-col items-center justify-center gap-2">
            <img src={imageupload} alt="업로드 아이콘" />
            <p className="text-xs text-custom-darkgrey">사진 업로드</p>
          </div>
        </div>

        <div className="flex justify-end mt-3 ml-auto">
          <SubmitButton label="확인" size="small" className="bg-blue-500" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default EditChart;

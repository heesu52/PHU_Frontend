import meatball from "../../../assets/three-dots.svg";
import arrow from "../../../assets/arrow.svg";
import RadioButton from "../../common/button/RadioButton";
import CheckButton from "../../common/button/CheckButton";
import Dropdown from "../../common/DropDown";
import ChartDeleteModal from "../../common/modal/ChartDeleteModal";
import { adjustTextareaHeight } from "../../common/adjustTextareaHeight";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getChartApi } from "../../../store/api/chart/DailyChartApi";
import { useChartDataStore } from "../../../store/store";

function Chart() {
    const navigate = useNavigate();
    const { chartid } = useParams();
    const {chartData, setChartData} = useChartDataStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleGoBack = () => {
        navigate(-1);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };


    const handleIconClick = () => {
        navigate(`/member/chart/edit/${chartid}`);
      };


    // 데일리 차트 가져오기
    useEffect(() => {
        const fetchChart = async () => {
        if (chartid) { 
            const response = await getChartApi(Number(chartid));
            if (response?.success) {
                setChartData(response.data);
              }
        }
        };
        fetchChart();
    }, [chartid, setChartData]);

    return (
       <div className="relative flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full h-[55px]">
                <div className="flex p-3 ml-3 space-x-4">
                    <img src={arrow} onClick={handleGoBack} />
                    <p className="text-lg cursor-default">뒤로가기</p>
                </div>
                <img src={meatball} className="mr-5" onClick={toggleDropdown} />
            </div>

            {isDropdownOpen && (
                <Dropdown
                    options={[
                        { label: "차트 수정", onClick: handleIconClick},
                        { label: "차트 삭제", onClick: ()=>setIsModalOpen(true) },
                    ]}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}

            {/* Component */}
            <div className="w-[90%] mt-4 space-y-4 ml-6">
                {/* PT 날짜 */}
                <div className="space-y-2">
                    <div className="text-base">PT 날짜</div>
                    <div className="flex items-center ml-5">
                        <p className="p-2 text-sm">{chartData.chartDate}</p>
                        <div className="flex p-2 ml-6 space-x-4">
                        <RadioButton
                            id="radio-pt"
                            label="PT"
                            value="PT"
                            name="session-type"
                            checked={chartData.branch === "PT"}
                            readOnly
                        />
                        <RadioButton
                            id="radio-personal"
                            label="개인운동"
                            value="Private"
                            name="session-type"
                            checked={chartData.branch === "PRIVATE"}
                            readOnly
                        />
                        </div>
                    </div>
                </div>

                {/* 몸무게 */}
                <div className="space-y-2">
                    <p>몸무게</p>
                    <div className="flex items-center gap-2 ml-7">
                        <p className="text-sm">{chartData.weight} kg</p>
                    </div>
                </div>

                {/* 운동부위 */}
                <div className="space-y-2">
                <p>운동부위</p>
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
                    checked={chartData.routines.includes(part)}
                    readOnly
              />
            ))}
          </div>
                </div>

                {/* 메모 */}
                <div className="space-y-2">
                    <div className="text-base">메모</div>
                    <textarea
                        className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1 ml-7"
                        onInput={adjustTextareaHeight}
                        value={chartData.memo}
                        maxLength={150}
                        disabled
                    />
                </div>

                {/* 인증샷 */}
                <div className="space-y-2">
                    <div className="text-base">인증샷</div>
                    <div className="border w-[450px] min-h-[150px] rounded-lg text-sm bg-[#f6f6f6] p-1 ml-7 flex flex-col items-center justify-center gap-2">
                        <p className="text-xs text-custom-darkgrey">아직 인증샷이 없어요. 인증샷을 업로드 해보세요!</p>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <ChartDeleteModal
            isOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)} 
            chartId={Number(chartid)}/>
       </div>
    );
}

export default Chart;

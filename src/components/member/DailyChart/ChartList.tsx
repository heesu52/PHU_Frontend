import { useEffect, useState } from "react";
import threedots from "../../../assets/three-dots.svg";
import plusbtn from "../../../assets/plus-circle-fill.svg";
import { useNavigate } from "react-router-dom";
import { getChartListApi } from "../../../store/api/chart/DailyChartApi";
import { useChartListDataStore, useIdStore } from "../../../store/store";
import { getYearMonth, filterDataByMonth, generateMonthOptions, sortDataByDate } from "../../utils/dateUtils";

function ChartList() {
  const navigate = useNavigate();
  const { chartlistData, setChartListData } = useChartListDataStore();
  const { memberId } = useIdStore();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  const routineLabels: { [key: string]: string } = {
    SHOLDER: "어깨",
    CHEST: "가슴",
    ABS: "복근",
    ARM: "팔",
    LEG: "하체",
    BACK: "등",
    CARDIO: "유산소",
  };

  const sortedChartList = sortDataByDate(
    filterDataByMonth(chartlistData, selectedDate),
    sortOrder
  );

  useEffect(() => {
    const fetchChartList = async () => {
      if (memberId) {
        const response = await getChartListApi(memberId);
        if (response?.success) {
          setChartListData(response.data);
        }
      }
    };
    fetchChartList();
  }, [memberId, setChartListData]);

  const handleIconClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-[80%] flex flex-col space-y-5">
      <div className="flex items-center justify-between">
        {/* 월 선택 드롭다운 */}
        <select
          className="block p-2 text-sm text-gray-900 border rounded-lg border-custom-grey"
          value={getYearMonth(selectedDate)}
          onChange={(e) => {
            const [year, month] = e.target.value.split("-");
            setSelectedDate(new Date(Number(year), Number(month) - 1));
          }}
        >
          {generateMonthOptions(chartlistData).map((month) => (
            <option key={month} value={month}>
              {month.replace("-", "년 ")}월
            </option>
          ))}
        </select>

        {/* 정렬 기준 드롭다운 */}
        <select
          className="block p-2 text-sm text-gray-900 border rounded-lg border-custom-grey"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'latest' | 'oldest')}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>

      <ul className="flex flex-col items-center space-y-3 text-xs cursor-default">
        {sortedChartList.length > 0 ? (
          sortedChartList.map((chart, index) => (
            <li
              key={index}
              className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center cursor-default"
            >
              <div className="flex w-full" onClick={() => handleIconClick(`/member/chart/detail/${chart.id}`)}>
                <p className="flex-1 text-center">{chart.chartDate}</p>
                <p className="flex-1 text-center">
                  {chart.routines.map((routine: string) => routineLabels[routine] || routine).join(", ")}
                </p>
                <p className="flex-1 text-center">{chart.branch}</p>
              </div>
              <img className="mr-2 rotate-90 cursor-pointer" src={threedots} alt="More options" />
            </li>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </ul>

      <div>
        <img
          src={plusbtn}
          className="fixed bottom-0 mb-20 transform -translate-x-1/2 cursor-pointer left-1/2 w-7 h-7"
          onClick={() => handleIconClick(`/member/chart/detail`)}
        />
      </div>
    </div>
  );
}

export default ChartList;

import { useEffect } from "react";
import threedots from "../../../assets/three-dots.svg";
import { useNavigate } from "react-router-dom";
import { getChartListApi } from "../../../store/api/chart/DailyChartApi";
import { useChartListDataStore, useIdStore } from "../../../store/store";

function ChartList () {
  const navigate = useNavigate();
  const { chartlistData, setChartListData } = useChartListDataStore();
  const { memberId } = useIdStore(); 

  const handleIconClick = (path: string) => {
    navigate(path);
  };

  // 회원 차트 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      if (memberId) { 
        const response = await getChartListApi(memberId);
        if (response) {
          setChartListData(response);
        }
      }
    };
    fetchMemberInfo();
  }, [memberId, setChartListData]);


  return (
    <div className="w-[80%] flex flex-col space-y-5">
      <div className="flex items-center justify-between">
        <p>2024년 11월</p>
        <select className="block p-2 text-sm text-gray-900 border rounded-lg border-custom-grey">
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>
      <ul className="flex flex-col items-center space-y-3 text-xs cursor-default">
        {chartlistData && chartlistData.length > 0 ? (
          chartlistData.map((chart, index) => (
            <li
              key={index}
              className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center cursor-default"
            >
              <div className="flex w-full" onClick={() => handleIconClick(`/chart/detail/${chart.id}`)}>
                <p className="flex-1 text-center">{chart.chartDate}</p>
                <p className="flex-1 text-center">{chart.routines}</p>
                <p className="flex-1 text-center">{chart.branch}</p>
              </div>
              <img
                className="mr-2 rotate-90 cursor-pointer"
                src={threedots}
                alt="More options"
              />
            </li>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default ChartList;

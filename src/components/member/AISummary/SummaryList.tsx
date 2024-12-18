import { useEffect, useState } from "react";
import threedots from "../../../assets/three-dots.svg";
import plusbtn from "../../../assets/plus-circle-fill.svg";
import { useNavigate } from "react-router-dom";
import { getVoiceFileListApi } from "../../../store/api";
import { useVoiceListDataStore, useIdStore} from "../../../store/store";
import { getYearMonth, filterDataByMonth, generateMonthOptions, sortDataByDate } from "../../utils/dateUtils";

function SummaryList () {
    const navigate = useNavigate();
    const { memberId } = useIdStore();
    const { voicelistData, setVoiceListData, setVoiceTextId } = useVoiceListDataStore();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
    
    // 음성파일 리스트 가져오기
    useEffect(() => {
        const fetchVoiceList = async () => {
            if (memberId) {
                const response = await getVoiceFileListApi(memberId);
                if (response?.success) {
                    setVoiceListData(response.data);
                    
                }
            }
        };
        fetchVoiceList();
    }, [memberId, setVoiceListData]);
  

    const handleIconClick = (path: string, voiceTextId: string) => {
        setVoiceTextId(voiceTextId)
        navigate(path);
      };
      

    // 선택된 월에 맞는 음성 파일 필터링
    const filteredVoiceList = filterDataByMonth(voicelistData, selectedDate);

    // 정렬된 음성 파일 리스트
    const sortedVoiceList = sortDataByDate(filteredVoiceList, sortOrder);

    return (
       <div className="w-[80%] flex flex-col space-y-5 mx-auto">
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
          {generateMonthOptions(voicelistData).map((month) => (
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
        {voicelistData.length > 0 ? (
          voicelistData.map((file, index) => (
            <li 
            key={index}
            className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center cursor-default">
                <div className="flex w-full" onClick={() =>  handleIconClick(`/member/summary/file/${file.fileId}`, file.voiceTextId)}>
                    <p className="flex-1 ml-3 text-center">{file.createAt.split(" ")[0]}</p> 
                    <p className="flex-1 text-center">{file.isTransformation ? "텍스트 추출 O" : "텍스트 추출 X"}</p>
                    <p className="flex-1 ml-3 text-center">요약 여부</p>
                </div>
                <img className="mr-2 rotate-90 cursor-pointer" src={threedots} />
            </li>
          ))
        ) : (
            <p>음성파일이 없습니다.</p>
        )}
        </ul>

        <div>
            <img 
                src={plusbtn} 
                className="fixed bottom-0 mb-20 transform -translate-x-1/2 cursor-pointer left-1/2 w-7 h-7"
                onClick={() => navigate('/member/voice')}
            />
        </div>
       </div>
    );
}
export default SummaryList;

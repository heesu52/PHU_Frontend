import { useEffect } from "react";
import threedots from "../../../assets/three-dots.svg"
import plusbtn from "../../../assets/plus-circle-fill.svg";
import { useNavigate } from "react-router-dom";
import { getVoiceFileListApi } from "../../../store/api";
import { useVoiceListDataStore, useIdStore } from "../../../store/store";


function SummaryList () {
    const navigate = useNavigate();
    const { memberId } = useIdStore();
    const {voicelistData, setVoiceListData} = useVoiceListDataStore();
    

    // 음성파일 리스트 가져오기
  useEffect(() => {
    const fetchChartList = async () => {
      if (memberId) {
        const response = await getVoiceFileListApi(memberId);
        if (response?.success) {
            setVoiceListData(response.data);
        }
      }
    };
    fetchChartList();
  }, [memberId, setVoiceListData]);

  const handleIconClick = (path: string) => {
    navigate(path);
  };
  

    return (
       <div className="w-[80%] flex flex-col space-y-5 mx-auto">
        <div className="flex items-center justify-between">
            <p>2024년 11월</p>
            <select className="block p-2 text-sm text-gray-900 border rounded-lg border-custom-grey">
                <option selected value="US">최신순</option>
                <option value="CA">오래된순</option>
            </select>
        </div>
        <ul className="flex flex-col items-center space-y-3 text-xs cursor-default">
        {voicelistData.length > 0 ? (
          voicelistData.map((file, index) => (
            <li 
            key={index}
            className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center cursor-default">
                <div className="flex w-full" onClick={() => handleIconClick(':id')}>
                    <p className="flex-1 ml-3 text-center">{file.createAt.split(" ")[0]}</p> 
                    <p className="flex-1 text-center">{file.isTransformation ? "텍스트 추출 O":"텍스트 추출X"}</p> 
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
                onClick={() => handleIconClick('/member/voice')}
            />
        </div>
       </div>
    );
}
export default SummaryList;

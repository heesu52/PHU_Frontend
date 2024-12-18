import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import meatball from "../../../assets/three-dots.svg";
import arrow from "../../../assets/arrow.svg";
import movetodailychart from "../../../assets/movetodailychart.svg"
import Dropdown from "../../common/DropDown";
import SummaryDeleteModal from "../../common/modal/SummaryDeleteModal";
import { getVoicetoTextFileApi } from "../../../store/api";
import { useVoiceListDataStore, useTextDataStore } from "../../../store/store";

function Summary() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {voiceTextId} = useVoiceListDataStore();
    const {textData, setTextData} = useTextDataStore();
    const { fileid } = useParams();


    const handleGoBack = () => {
        navigate(-1);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };


    const handleIconClick = () => {
        navigate("/member/summary/edit");
      };

    // 음성파일에서 추출된 텍스트 가져오기
    useEffect(() => {
        const fetchVoicetoText = async () => {
            if (fileid && voiceTextId) {  
                const response = await getVoicetoTextFileApi(Number(fileid), voiceTextId);
                if (response?.success && response.data) {
                    setTextData(response.data);  
                } else {
                    console.error('텍스트 추출에 실패했습니다:', response?.message);
                }
            }
        };
        fetchVoicetoText();
    }, [fileid]); 



    return (
       <div className="relative flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full h-[55px]">
                <div className="flex p-3 ml-3 space-x-4">
                    <img src={arrow} onClick={handleGoBack} />
                    <p className="text-lg cursor-default">2023. 12. 05 오전 9:48 녹음</p>
                </div>
                <img src={meatball} className="mr-5" onClick={toggleDropdown} />
            </div>

            {isDropdownOpen && (
                <Dropdown
                    options={[
                        { label: "요악 내용 수정", onClick: handleIconClick },
                        { label: "요약 내용 삭제", onClick: ()=>setIsModalOpen(false) },
                    ]}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}

            {/* Component */}
            <div className="flex flex-col items-center mt-5">
                <ul className="w-[90%] space-y-4">
                    {textData.list && textData.list.length > 0 ? (
                        textData.list.map((item, index) => (
                            <li key={index}>
                                <h4>요약{index + 1}</h4>
                                <p className="text-sm">{item.text}</p> {/* text 부분을 화면에 출력 */}
                            </li>
                        ))
                    ) : (
                        <p>변환된 텍스트가 없습니다. 텍스트 추출을 진행해보세요!</p>
                    )}
                </ul>
                <img src={movetodailychart} className="mt-10 ml-auto mr-7"></img>
            </div>
            
            {/* Modal */}
            <SummaryDeleteModal
            isOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)} />
       </div>
    );
}

export default Summary;

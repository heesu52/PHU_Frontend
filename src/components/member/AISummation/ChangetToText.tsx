import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import meatball from "../../../assets/three-dots.svg";
import arrow from "../../../assets/arrow.svg";
import movetodailychart from "../../../assets/movetodailychart.svg"
import Dropdown from "../../common/DropDown";
import SummaryDeleteModal from "../../common/modal/SummaryDeleteModal";
import ChangetoTextModal from "../../common/modal/ChangetoTextModal";
import { getVoicetoTextFileApi } from "../../../store/api";
import { useVoiceListDataStore, useTextDataStore } from "../../../store/store";

function Summation() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isChangetoTextModalOpen, setIsChangetoTextModalOpen] = useState(false);
    const [isSummaryDeleteModalOpen, setIsSummaryDeleteModalOpen] = useState(false); // 삭제 모달 상태
    const { voiceTextId } = useVoiceListDataStore();
    const { textData, setTextData } = useTextDataStore();
    const { fileid } = useParams();

    const handleGoBack = () => {
        navigate(-1);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // 음성파일에서 추출된 텍스트 가져오기
    useEffect(() => {
        const fetchVoicetoText = async () => {
            if (fileid && voiceTextId) {
                const response = await getVoicetoTextFileApi(Number(fileid), voiceTextId);
                if (response?.success && response.data) {
                    setTextData(response.data);  // 텍스트 데이터 업데이트
                    console.log(response.data)
                } else {
                    console.error('텍스트 추출에 실패했습니다:', response?.message);
                }
            }
        };
        fetchVoicetoText();
    }, [fileid, voiceTextId, setTextData]); 

    
    useEffect(() => {
        if (voiceTextId === "Before Conversion") {
            setIsChangetoTextModalOpen(true); 
        }
    }, [voiceTextId]);

    const handleModalClose = () => {
        setIsChangetoTextModalOpen(false);
    };

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
                        { label: "요약 내용 수정", onClick: () => navigate("/member/summary/edit") },
                        { label: "요약 내용 삭제", onClick: () => setIsSummaryDeleteModalOpen(true) }, // 삭제 모달 열기
                    ]}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}

            {/* Component */}
            <div className="flex flex-col items-center w-full mt-5">
                <ul className="w-[90%] space-y-4">
                    {(voiceTextId === "Before Conversion" || (textData.list && textData.list.length === 0)) ? (
                        <div className="flex flex-col items-center justify-center w-full text-sm text-custom-grey">
                            <p>변환된 텍스트가 없습니다. </p>
                            <p>텍스트 추출을 진행해보세요!</p>
                        </div>
                    ) : (
                        textData.list.map((item, index) => (
                            <li key={index}>
                                <h4>내용{index + 1}</h4>
                                <p className="text-sm">{item.text}</p>
                            </li>
                        ))
                    )}
                </ul>
                <img src={movetodailychart} className="mt-10 ml-auto mr-7" />
            </div>

            {/* SummaryDeleteModal */}
            <SummaryDeleteModal
                isOpen={isSummaryDeleteModalOpen}
                onClose={() => setIsSummaryDeleteModalOpen(false)}  // 모달 닫기
            />

            {/* ChangetoTextModal */}
            <ChangetoTextModal
                isOpen={isChangetoTextModalOpen}
                onClose={handleModalClose}  // 모달 닫을 때 텍스트 상태 반영 후 이동
            />
        </div>
    );
}

export default Summation;

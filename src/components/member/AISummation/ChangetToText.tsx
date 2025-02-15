import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SummaryDeleteModal from "../../common/modal/SummaryDeleteModal";
import ChangetoTextModal from "../../common/modal/ChangetoTextModal";
import DynamicSpeakerList from "./DynamicSpeakerList";
import { getVoicetoTextFileApi } from "../../../store/api";
import { useVoiceListDataStore, useTextDataStore } from "../../../store/store";

function ChangeToText() {
    const [isChangetoTextModalOpen, setIsChangetoTextModalOpen] = useState(false);
    const [isSummaryDeleteModalOpen, setIsSummaryDeleteModalOpen] = useState(false); // 삭제 모달 상태
    const { voiceTextId } = useVoiceListDataStore();
    const { textData, setTextData } = useTextDataStore();
    const { fileid } = useParams();

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
            {/* Component */}
            <div className="flex flex-col items-center w-full mt-2">
                <ul className="w-[90%] space-y-4">
                    {(voiceTextId === "Before Conversion" || (textData.list && textData.list.length === 0)) ? (
                        <div className="flex flex-col items-center justify-center w-full text-sm text-custom-grey">
                            <p>변환된 텍스트가 없습니다. </p>
                            <p>텍스트 추출을 진행해보세요!</p>
                        </div>
                    ) : (
                        <DynamicSpeakerList list={textData.list}/>
                    )}
                </ul>
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

export default ChangeToText;

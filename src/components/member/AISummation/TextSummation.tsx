import { useEffect, useState } from "react";
import SummaryDeleteModal from "../../common/modal/SummaryDeleteModal";
import SummationModal from "../../common/modal/SummationModal";
import { getSummationApi } from "../../../store/api";
import { useVoiceListDataStore, useSummationDataStore } from "../../../store/store";

function Summation() {
    const [isSummationModalOpen, setIsSummationModallOpen] = useState(true);
    const [isSummaryDeleteModalOpen, setIsSummaryDeleteModalOpen] = useState(false); // 삭제 모달 상태
    const { voiceTextId } = useVoiceListDataStore();
    const { summationData, setSummationData } = useSummationDataStore();

    // 요약된 텍스트 조회하기
    useEffect(() => {
        const fetchTextSummation = async () => {
            const summarization_id = summationData.summarizationId;
            const response = await getSummationApi(summarization_id);
            if (response?.success && response.data) {
                setSummationData(response.data);
            } else {
                console.error("텍스트 요약에 실패했습니다:", response?.message);
            }
        };
        fetchTextSummation();
    }, [setSummationData]);

    useEffect(() => {
        if (voiceTextId === "Before Conversion") {
            setIsSummationModallOpen(true);
        }
    }, [voiceTextId]);

    const handleModalClose = () => {
        setIsSummationModallOpen(false);
    };

    // 요약 텍스트를 '-' 기준으로 문단 나누기
    const splitTextByDash = (text: string) => {
        return text
            .split("-")
            .map((paragraph, index) => paragraph.trim() && <p key={index}>- {paragraph.trim()}</p>);
    };

    return (
        <div className="relative flex flex-col items-center w-full">
            {/* Component */}
            <div className="flex flex-col items-center w-full mt-2">
                <ul className="w-[90%] space-y-4">
                    {voiceTextId === "Before Conversion" ? (
                        <div className="flex flex-col items-center justify-center w-full text-sm text-custom-grey">
                            <p>요약된 텍스트가 없습니다. </p>
                            <p>대화내용을 요약 해보세요!</p>
                        </div>
                    ) : (
                        <div >
                            <div className="space-y-2 text-sm">
                                {splitTextByDash(summationData.texts || "")}
                            </div>
                        </div>
                    )}
                </ul>
            </div>

            {/* SummaryDeleteModal */}
            <SummaryDeleteModal
                isOpen={isSummaryDeleteModalOpen}
                onClose={() => setIsSummaryDeleteModalOpen(false)}
            />

            {/* SummationModal */}
            <SummationModal isOpen={isSummationModalOpen} onClose={handleModalClose} />
        </div>
    );
}

export default Summation;

import BaseModal from "./BaseModal";  
import { SummaryTextApi } from "../../../store/api/voice/VoiceSummaryApi";
import { notify } from "../ToastMessage/ToastMessageItem";
import { useSummationDataStore, useTextDataStore } from "../../../store/store";

interface SummationModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

function SummationModal({ isOpen, onClose }: SummationModalProps) {
    const {setSummationData} = useSummationDataStore();
    const {textData} = useTextDataStore();


      // 텍스트 추출 API 함수
      const fetchSummaztionText = async () => {
        
        const textid = textData.voiceListId;
        console.log(textid);
        const response = await SummaryTextApi(textid);  
        
        if (response?.success) {
            setSummationData(response.data);
            notify('success', "텍스트가 요약됐어요💪🏻");
            onClose(); // 변환 후 모달 닫기
        }
      };

    return (
        <BaseModal
        isOpen={isOpen}  
        onClose={onClose}
        title="대화 내용 요약"
        message1={"AI를 이용해서 대화 내용을 요약할까요?"}
        message2={"나중에도 대화 내용을 요약할 수 있어요!"}
        confirmText=" 네"
        cancelText="다음에 할게요"
        onConfirm={fetchSummaztionText}  
        />
    );
}

export default SummationModal;

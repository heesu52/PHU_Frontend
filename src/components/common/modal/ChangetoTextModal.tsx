import BaseModal from "./BaseModal";
import { changeFiletoTextApi } from "../../../store/api";
import { useTextDataStore, useIdStore } from "../../../store/store";
import { notify } from "../ToastMessage/ToastMessageItem";
import { useParams } from "react-router-dom";


interface ChangetoTextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChangetoTextModal({ isOpen, onClose }: ChangetoTextModalProps) {
  const { setTextData } = useTextDataStore();
  const { fileid } = useParams();
  const { memberId } = useIdStore();

  

  // 텍스트 추출 API 함수
  const fetchFileToText = async () => {
    if (memberId !== null && fileid) {
      const response = await changeFiletoTextApi(memberId, Number(fileid));  

      if (response?.success) {
        setTextData(response.data);
        notify('success', "텍스트가 추출됐어요💪🏻");
        onClose(); // 변환 후 모달 닫기
      }
    }
  };


  return (
    <BaseModal
      isOpen={isOpen}  
      onClose={onClose}
      title="텍스트 변환"
      message1={"녹음 내용을 텍스트로 변환 할까요?"}
      message2={"나중에도 대화 내용을 텍스트로 변환할 수 있어요!"}
      confirmText=" 네"
      cancelText="다음에 할게요"
      onConfirm={fetchFileToText}  
    >
    </BaseModal>
  );
}

export default ChangetoTextModal;

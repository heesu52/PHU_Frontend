import { useNavigate, useParams } from "react-router-dom";
import BaseModal from "./BaseModal";
import { changeFiletoTextApi } from "../../../store/api";
import { useTextDataStore, useVoiceDataStore } from "../../../store/store";
import { notify } from "../ToastMessage/ToastMessageItem";


interface UploadRecordFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function UploadRecordFileModal({ isOpen, onClose }: UploadRecordFileModalProps) {
  const navigate = useNavigate();

  const {setTextData} = useTextDataStore();
  const { voiceData } = useVoiceDataStore();
  const { memberid } = useParams();


  // 텍스트 추출 API 함수
  const fetchFileToText = async () => {
    if (memberid !== null) {
      const fileid = voiceData.fileId;
      const response = await changeFiletoTextApi(Number(memberid), fileid);  
      if (response?.success) {
        setTextData(response.data);
        notify('success', "텍스트가 추출됐어요💪🏻"); 
        onClose();
      }
    }
  };

  const handleClose = () => {
    onClose(); 
    navigate(`/member/summary/${memberid}`); 
  };

  return (
    <BaseModal
    isOpen={isOpen}  
    onClose={handleClose}
    title="녹음 종료"
    message1={"녹음 파일이 업로드됐어요. 텍스트로 변환할까요?"}
    message2={"취소 클릭 시 요약 리스트 페이지로 이동해요!"}
    confirmText=" 네"
    cancelText="다음에 할게요"
    onConfirm={fetchFileToText}  
  />
  );
}

export default UploadRecordFileModal;

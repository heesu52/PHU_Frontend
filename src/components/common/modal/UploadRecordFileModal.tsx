import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseModal from "./BaseModal";
import { changeFiletoTextApi } from "../../../store/api";
import { useTextDataStore, useVoiceDataStore } from "../../../store/store";
import { notify } from "../ToastMessage/ToastMessageItem";
import LoadingLottie from "../../lottie/LoadingLottie";


interface UploadRecordFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function UploadRecordFileModal({ isOpen, onClose }: UploadRecordFileModalProps) {
  const navigate = useNavigate();
  const { setTextData } = useTextDataStore();
  const { voiceData } = useVoiceDataStore();
  const { memberid } = useParams();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  // 텍스트 추출 API 함수
  const fetchFileToText = async () => {
    if (memberid !== null) {
      const fileid = voiceData.fileId;
      setIsLoading(true); // 로딩 시작
      const response = await changeFiletoTextApi(Number(memberid), fileid);
      if (response?.success) {
        setTextData(response.data);
        notify("success", "텍스트가 추출됐어요💪🏻");
        onClose();
      }
      setIsLoading(false); // 로딩 끝
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
    >
      {isLoading && (
        <div className="flex items-center justify-center mt-4">
          <LoadingLottie />
          <span className="ml-4">텍스트를 추출중이에요, 기다려주세요...</span>
        </div>
      )}
    </BaseModal>
  );
}

export default UploadRecordFileModal;

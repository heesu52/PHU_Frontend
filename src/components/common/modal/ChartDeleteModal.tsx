import { useNavigate } from "react-router-dom";
import { deleteChartApi } from "../../../store/api";
import { useChartListDataStore } from "../../../store/store";
import { notify } from '../../common/ToastMessage/ToastMessageItem'; 
import BaseModal from "./BaseModal";  

interface ChartDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartId : number | null;
}


function ChartDeleteModal({ isOpen, onClose, chartId }: ChartDeleteModalProps) {
  const { chartlistData, setChartListData } = useChartListDataStore();
  const navigate = useNavigate();


   // 삭제 API 호출 함수
    const handleDelete = async () => {
      if (chartId !== null) {
        const response = await deleteChartApi(chartId);  // 회원 삭제 API 호출
        if (response?.success) {
          const updatedListData = chartlistData.filter(chart => chart.id !== chartId);
          setChartListData(updatedListData);
          notify('success', "차트가 삭제됐어요💪🏻"); 
          onClose();
          navigate(-1)
        }
      }
    };

  return (
    <BaseModal
    isOpen={isOpen}  
    onClose={onClose}
    title="데일리차트 삭제"
    message1={"차트를 삭제할까요?"}
    confirmText=" 삭제"
    cancelText="취소"
    onConfirm={handleDelete}  
  />
    );
  }
  
  export default ChartDeleteModal;
  
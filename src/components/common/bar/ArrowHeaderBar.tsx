import { useNavigate } from 'react-router-dom';
import arrowimg from '../../../assets/arrow.svg';

interface ArrowHeaderBarProps {
  label: string;  // 동적으로 변경할 label 텍스트
}

function ArrowHeaderBar({ label }: ArrowHeaderBarProps) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };
    
  return (
    <div className="w-full h-[55px] border border-b-custom-softgrey bg-custom-softblue flex items-center">
      <img src={arrowimg} alt="arrow" className="w-[18px] h-[18px] ml-4" onClick={handleGoBack}/>
      <div className="ml-3 text-center">
        <span className="text-lg font-medium">{label}</span>
      </div>
    </div>
  );
}

export default ArrowHeaderBar;
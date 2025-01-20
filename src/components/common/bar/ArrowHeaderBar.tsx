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
    <div className="sticky top-0 w-full max-w-[var(--max-width)] h-12 md:h-14 lg:h-14 border border-b-custom-softgrey bg-custom-softblue flex items-center">
      <img src={arrowimg} alt="arrow" className="w-3 h-3 ml-4 md:h-4 md:w-4 lg:w-4 lg:h-4" onClick={handleGoBack}/>
      <div className="ml-3 text-center">
        <span className="font-medium text-md md:text-base lg:text-lg">{label}</span>
      </div>
    </div>
  );
}

export default ArrowHeaderBar;
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderBarProps {
    label: string; 
    icon?: string; 
    onIconClick?: () => void; 
  }
  
  function TabBar({ label, icon, onIconClick }: HeaderBarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleIconClick = (path: string) => {
        navigate(path);
    };
    return (
      <div className="relative top-0 w-full max-w-[var(--max-width)] h-[120px] border border-b-custom-softgrey bg-custom-softblue flex flex-col justify-between">
        <div className="flex items-center justify-between w-full mt-4">
            <div className="flex items-center ml-5 text-center">
            <span className="text-lg font-bold">{label}</span>
            <p className="ml-2 text-lg font-bold">회원님</p>
            <p className="ml-2 text-lg font-bold">(25세)</p>
            </div>
            <div className="relative">
            <img 
                src={icon} 
                alt="icon" 
                className="w-[18px] h-[18px] mr-5 cursor-pointer" 
                onClick={onIconClick} 
            />
            </div>
        </div>
        <div className="flex w-[360px] h-10  ml-5">
            <div className={`w-[120px] h-full flex justify-center items-center cursor-pointer hover:text-custom-orange
            ${location.pathname === '/member/info' ? 'text-custom-orange font-bold border-b border-custom-orange' : 'text-custom-softgrey'}`}
            onClick={() => handleIconClick('/member/info')}>회원정보</div>
            <div className={`w-[120px] h-full flex justify-center items-center cursor-pointer hover:text-custom-orange
            ${location.pathname === '/member/daily' ? 'text-custom-orange font-bold border-b border-custom-orange' : 'text-custom-softgrey'}`}
            onClick={() => handleIconClick('/member/daily')}>데일리 차트</div>
            <div className={`w-[120px] h-full flex justify-center items-center cursor-pointer hover:text-custom-orange
            ${location.pathname === '/member/summary' ? 'text-custom-orange font-bold border-b border-custom-orange' : 'text-custom-softgrey'}`}
            onClick={() => handleIconClick('/member/summary')}>AI 요약</div>
        </div>
      </div>
    );
  }
  
  
  export default TabBar;
  

interface HeaderBarProps {
  label: string;  // 동적으로 변경할 label 텍스트
  icon : string;
  onIconClick: () => void; 
}

function HeaderBar({ label, icon, onIconClick }: HeaderBarProps) {

    
  return (
    <div className="w-full h-[55px] border border-b-custom-softgrey bg-custom-softblue flex items-center justify-between">
      <div className="ml-5 text-center">
        <span className="text-[20px] font-semibold">{label}</span>
      </div>
      <img src={icon} alt="icon" className="w-[20px] h-[20px] mr-5" onClick={onIconClick} />
    </div>
  );
}

export default HeaderBar;
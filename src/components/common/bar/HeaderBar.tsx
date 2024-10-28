interface HeaderBarProps {
  label: string; 
  icon: string; 
  onIconClick?: () => void; 
}

function HeaderBar({ label, icon, onIconClick }: HeaderBarProps) {
  return (
    <div className="relative w-full h-[55px] border border-b-custom-softgrey bg-custom-softblue flex items-center justify-between">
      <div className="ml-5 text-center">
        <span className="text-lg font-medium">{label}</span>
      </div>
      <div>
      <img 
        src={icon} 
        alt="icon" 
        className="w-[18px] h-[18px] mr-5 cursor-pointer relative" 
        onClick={onIconClick} 
      />
      </div>
      
    </div>
  );
}

export default HeaderBar;

interface HeaderBarProps {
  label: string; 
  icon: string; 
  onIconClick?: () => void; 
}

function HeaderBar({ label, icon, onIconClick }: HeaderBarProps) {
  return (
    <div className="relative top-0 w-full max-w-[var(--max-width)] h-[55px] border border-b-custom-softgrey bg-custom-softblue flex items-center justify-between">
      <div className="ml-5 text-center">
        <span className="text-lg font-medium">{label}</span>
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
  );
}


export default HeaderBar;

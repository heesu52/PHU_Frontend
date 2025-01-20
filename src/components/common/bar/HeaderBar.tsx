interface HeaderBarProps {
  label: string; 
  icon: string; 
  onIconClick?: () => void; 
}

function HeaderBar({ label, icon, onIconClick }: HeaderBarProps) {
  return (
    <div className="relative top-0 w-full max-w-[var(--max-width)]  h-12 md:h-14 lg:h-14 border border-b-custom-softgrey bg-custom-softblue flex items-center justify-between">
      <div className="ml-5 text-center">
        <span className="font-medium text-md md:text-base lg:text-lg">{label}</span>
      </div>
      <div className="relative">
        <img 
          src={icon} 
          alt="icon" 
          className="w-4 h-4 ml-4 mr-5 cursor-pointer" 
          onClick={onIconClick} 
        />
      </div>
    </div>
  );
}


export default HeaderBar;

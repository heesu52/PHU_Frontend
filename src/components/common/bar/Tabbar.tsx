interface HeaderBarProps {
    label: string; 
    icon: string; 
    onIconClick?: () => void; 
  }
  
  function TabBar({ label, icon, onIconClick }: HeaderBarProps) {
    return (
      <div className="flex flex-col border border-custom-orange">
        <div className="relative top-0 w-full max-w-[var(--max-width)] h-[120px] border border-b-custom-softgrey bg-custom-softblue flex items-center justify-between">
          <div className="ml-5 text-center">
            <span className="text-lg font-bold">{label}</span>
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
        <div className="border w-[360px] h-[40px] border-custom-blue">
            dfsdf
        </div>
       </div>
    );
  }
  
  
  export default TabBar;
  
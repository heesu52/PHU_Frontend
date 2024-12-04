import HeaderBar from "../common/bar/HeaderBar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import { useState } from "react";
import notfound from "../../assets/404notfound.jpg"

function Chat() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <HeaderBar
        label="채팅"
        icon={meatball}
        onIconClick={toggleDropdown}
      />
      {/* Centered content */}
        <div className="flex flex-col items-center justify-center h-[600px]">
        <img src={notfound} className="w-[350px]"/>
        <p className="text-lg text-center">채팅 기능은 조금만 기다려주세요!</p>
        </div>
      
      <NavigationBar />
    </div>
  );
}

export default Chat;

import HeaderBar from "../common/bar/HeaderBar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import profile from "../../assets/basic-profile.svg";
import Dropdown from "../common/DropDown";
import { useState } from "react";
import plusbtn from "../../assets/plus-circle-fill.svg"

function MemberList() {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  };

 
  
  return (
    <div className="flex flex-col items-center justify-center">
      <HeaderBar
        label="회원목록"
        icon={meatball}
        onIconClick={handleClick}
      />
      {isDropdownOpen && ( 
        <Dropdown options={[
          { label: "회원 수정", path: "/my/setting" },
          { label: "회원 추가", },
        ]}
        />
      )}
      <div className="flex items-center w-full overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
       <ul className="w-full ">
        <li className="border-b h-[55px] flex items-center justify-between hover:bg-custom-softblue">
        <div className="flex items-center justify-center p-3 ml-5">
            <img src={profile} alt="icon" className="w-[30px] h-[30px] mr-3"/>
            <span>정우혁</span>
        </div>
        <div className="w-[215px] h-[30px] border border-custom-blue rounded-lg mr-5 flex items-center justify-center">
            <span className="text-xs">어꺠가 안좋음</span>
        </div>
        </li>
        <li className="border-b h-[55px] flex items-center justify-between hover:bg-custom-softblue">
        <div className="flex items-center justify-center p-3 ml-5">
            <img src={profile} alt="icon" className="w-[30px] h-[30px] mr-3"/>
            <span>정우혁</span>
        </div>
        <div className="w-[215px] h-[30px] border border-custom-blue rounded-lg mr-5 flex items-center justify-center">
            <span className="text-xs">어꺠가 안좋음</span>
        </div>
        </li>
       </ul>
      </div>
      <img src={plusbtn} className="fixed bottom-0 mb-20 w-7 h-7"/>
      <NavigationBar />
    </div>
  );
}
export default MemberList;

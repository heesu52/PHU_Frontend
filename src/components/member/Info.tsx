import TabBar from "../common/bar/Tabbar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import Dropdown from "../common/DropDown";
import { useState } from "react";
import plusbtn from "../../assets/plus-circle-fill.svg";
import MemberInfoComponent from "./Info/MemberInfo";
//import { useNavigate } from "react-router-dom";

function Info() {
  //const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isdeletebtnOpen, setIsdeletebtnOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const toggledeleteBtn = () => {
    setIsdeletebtnOpen(!isdeletebtnOpen);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <TabBar
        label="정우혁"
        icon={meatball}
        onIconClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <Dropdown
          options={[
            { label: "정보 수정", onClick: toggledeleteBtn },
            { label: "정보 삭제", onClick: toggleBottomSheet },
          ]}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] flex justify-center items-center">
      <MemberInfoComponent/>
      </div>
      <img src={plusbtn} className="fixed bottom-0 mb-20 w-7 h-7" onClick={toggleBottomSheet} />
      {isBottomSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-30"
          onClick={toggleBottomSheet}
        />
      )}
      <NavigationBar />
    </div>
  );
}

export default Info;

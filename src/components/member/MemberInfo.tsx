import TabBar from "../common/bar/Tabbar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import Dropdown from "../common/DropDown";
import { useState } from "react";
import MemberInfoComponent from "./Info/Member";
import EditMemberInfo from "./Info/EditMember";

function Info() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  const handleEditInfo = () => {
    setIsEditInfo(true);
  };

  const handleSubmit = () => {
    setIsEditInfo(false);
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
            { label: "정보 수정", onClick: handleEditInfo }
          ]}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] flex justify-center items-center">
        {isEditInfo ? (
          <EditMemberInfo onSubmit={handleSubmit} />
        ) : (
          <MemberInfoComponent />
        )}
      </div>
      <NavigationBar />
    </div>
  );
}

export default Info;

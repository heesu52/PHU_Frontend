import HeaderBar from "../common/bar/HeaderBar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import Dropdown from "../common/DropDown";
import { useState } from "react";
import ChartDeleteModal from "../common/modal/ChartDeleteModal";

function Chat() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isdeletebtnOpen, setIsdeletebtnOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsdeletebtnOpen(false);
  };

  const toggledeleteBtn = () => {
    setIsdeletebtnOpen(!isdeletebtnOpen);
  }

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#f6f6f6]">
      <HeaderBar
        label="캘린더"
        icon={meatball}
        onIconClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <Dropdown
          options={[
            { label: "회원 수정", onClick: toggledeleteBtn },
            { label: "회원 추가", onClick: toggleBottomSheet },
          ]}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
      {/* Centered content */}
        <div className="flex flex-col items-center justify-center h-[600px]">
        
        </div>
      
      {/* MemberDeleteModal */}
      {isModalOpen && <ChartDeleteModal onClose={toggleModal} />}
      <NavigationBar />
    </div>
  );
}

export default Chat;

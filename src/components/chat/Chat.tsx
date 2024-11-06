import HeaderBar from "../common/bar/HeaderBar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import Dropdown from "../common/DropDown";
import { useState } from "react";
import notfound from "../../assets/404notfound.jpg"
import MemberDeleteModal from "../common/modal/MemberDeleteModal";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
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

  const handleIconClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <HeaderBar
        label="채팅"
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
        <img src={notfound} className="w-[350px]"/>
        <p className="text-lg text-center">채팅 기능은 조금만 기다려주세요!</p>
        </div>
      
      {/* MemberDeleteModal */}
      {isModalOpen && <MemberDeleteModal onClose={toggleModal} />}
      <NavigationBar />
    </div>
  );
}

export default Chat;

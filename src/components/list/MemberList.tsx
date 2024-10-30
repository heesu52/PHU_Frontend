import HeaderBar from "../common/bar/HeaderBar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import profile from "../../assets/basic-profile.svg";
import Dropdown from "../common/DropDown";
import { useState } from "react";
import plusbtn from "../../assets/plus-circle-fill.svg";
import deletebtm from "../../assets/dash-circle-fill.svg"
import BottomSheet from "../common/modal/BottomSheet";
import MemberDeleteModal from "../common/modal/MemberDeleteModal";
import { useNavigate } from "react-router-dom";

function MemberList() {
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
        label="회원목록"
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
      <div className="flex items-center w-full">
        <ul className="w-full">
          {/* 회원 리스트 */}
          <li className="border-b h-[55px] flex items-center justify-between hover:bg-custom-softblue">
            <div className="flex items-center justify-center p-3 ml-5 cursor-pointer" onClick={() => handleIconClick('/member/info')}>
              <img src={profile} alt="icon" className="w-[30px] h-[30px] mr-3" />
              <span>정우혁</span>
            </div>
            <div className="flex">
              <div className="w-[215px] h-[30px] border border-custom-blue rounded-lg mr-5 flex items-center justify-center">
                <span className="text-xs">어꺠가 안좋음</span>
              </div>
              {isdeletebtnOpen &&
              <img src={deletebtm} className="mr-5" onClick={toggleModal}/>
              }
            </div>
          </li>
        </ul>
      </div>
      <img src={plusbtn} className="fixed bottom-0 mb-20 w-7 h-7" onClick={toggleBottomSheet} />
      {isBottomSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-30"
          onClick={toggleBottomSheet}
        />
      )}
      {/* BottomSheet */}
      <BottomSheet onClose={toggleBottomSheet} isOpen={isBottomSheetOpen} />
      {/* MemberDeleteModal */}
      {isModalOpen && <MemberDeleteModal onClose={toggleModal} />}
      <NavigationBar />
    </div>
  );
}

export default MemberList;

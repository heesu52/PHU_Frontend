import { useState } from "react";
import TabBar from "../common/bar/Tabbar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import Dropdown from "../common/DropDown";
import MemberDeleteModal from "../common/modal/MemberDeleteModal";
import ChartList from "./DailyChart/ChartList";

function DailyChart() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
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
            { label: "정보 수정", onClick: toggleModal },
            { label: "정보 삭제", onClick: toggleModal },
          ]}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] justify-center flex py-4">
        <ChartList/>
      </div>
      {isModalOpen && <MemberDeleteModal onClose={toggleModal} />}
      <NavigationBar />
    </div>
  );
}

export default DailyChart;

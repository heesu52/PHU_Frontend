import { useState } from "react";
import TabBar from "../../common/bar/Tabbar";
import NavigationBar from "../../common/bar/NavigationBar";
import MemberDeleteModal from "../../common/modal/MemberDeleteModal";
import ChartList from "./ChartList"

function DailyChart() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

 

  return (
    <div className="relative flex flex-col items-center justify-center">
      <TabBar
        label="정우혁"
      />
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] justify-center flex py-4">
        <ChartList/>
      </div>
      {isModalOpen && <MemberDeleteModal onClose={toggleModal} />}
      <NavigationBar />
    </div>
  );
}

export default DailyChart;

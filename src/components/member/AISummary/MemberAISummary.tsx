import { useState } from "react";
import TabBar from "../../common/bar/Tabbar";
import NavigationBar from "../../common/bar/NavigationBar";
import ChartDeleteModal from "../../common/modal/ChartDeleteModal";
import SummaryList from "./SummaryList";
import { useInfoDataStore } from "../../../store/store";

function AISummary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { infoData } = useInfoDataStore();

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

 

  return (
    <div className="relative flex flex-col items-center justify-center">
      <TabBar
        label={infoData.memberName}
        age={infoData.memberAge}
      />
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] justify-center flex py-4">
        <SummaryList/>
      </div>
      {isModalOpen && <ChartDeleteModal onClose={toggleModal} />}
      <NavigationBar />
    </div>
  );
}

export default AISummary;

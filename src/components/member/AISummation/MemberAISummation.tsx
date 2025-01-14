import TabBar from "../../common/bar/Tabbar";
import NavigationBar from "../../common/bar/NavigationBar";
import SummaryList from "./SummationList";
import { useInfoDataStore } from "../../../store/store";

function MemberAISummation() {
  const { infoData } = useInfoDataStore();



  return (
    <div className="relative flex flex-col items-center justify-center">
      <TabBar
        label={infoData.memberName}
        age={infoData.memberAge}
      />
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] justify-center flex py-4">
        <SummaryList/>
      </div>
      <NavigationBar />
    </div>
  );
}

export default MemberAISummation;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TabBar from "../../common/bar/Tabbar";
import meatball from "../../../assets/three-dots.svg";
import NavigationBar from "../../common/bar/NavigationBar";
import Dropdown from "../../common/DropDown";
import MemberInfoComponent from "./Info";
import AddMemberCpmonent from "./AddMemberInfo";
import NoMemberInfoModal from "../../common/modal/NoMemberInfoModal";
import { useInfoDataStore } from "../../../store/store";
import { getPTInfoApi } from "../../../store/api/user/member/MemberInfoApi";
import EditMemberInfo from "./EditMemberInfo";  // 오타 수정


function Info() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isAddInfo, setIsAddInfo] = useState(false);
  const [isNoMemberModalOpen, setIsNoMemberModalOpen] = useState(false); // 모달 상태 추가
  const { infoData } = useInfoDataStore();
  const { listid } = useParams();


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEditInfo = () => {
    setIsEditInfo(true);
  };

  const handleAddInfo = () => {
    setIsAddInfo(true);
  };


  const handleCloseNoMemberModal = () => {
    setIsNoMemberModalOpen(false); // 모달 닫기
  };

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const response = await getPTInfoApi(Number(listid));
      if (response.errorCode === "M003") {
        setIsNoMemberModalOpen(true); 
        handleAddInfo();
      }
    };

    fetchMemberInfo();
  }, [listid]);


  return (
    <div className="relative flex flex-col items-center justify-center">
      <TabBar
        label={infoData.memberName}
        icon={meatball}
        onIconClick={toggleDropdown}
        memberid={infoData.id}
      />
      {isDropdownOpen && (
        <Dropdown
          options={[{ label: "정보 수정", onClick: handleEditInfo }]}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] flex justify-center items-center">
        {isAddInfo ? (
          <AddMemberCpmonent onSubmit={()=>setIsAddInfo(false)} />
        ) : isEditInfo ? (
          <EditMemberInfo onSubmit={()=>setIsEditInfo(false)}/>
        ) : (
          <MemberInfoComponent />
        )}
      </div>
      <NavigationBar />

      {/* NoMemberInfoModal이 열리는 조건 추가 */}
      {isNoMemberModalOpen && (
        <NoMemberInfoModal onClose={handleCloseNoMemberModal} />
      )}
    </div>
  );
}

export default Info;

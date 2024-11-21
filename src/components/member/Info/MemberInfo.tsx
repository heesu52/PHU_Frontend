import TabBar from "../../common/bar/Tabbar";
import meatball from "../../../assets/three-dots.svg";
import NavigationBar from "../../common/bar/NavigationBar";
import Dropdown from "../../common/DropDown";
import { useState, useEffect } from "react";
import MemberInfoComponent from "./Info";
import EditMemberCpmonent from "./EditMember";
import { memberInfoDataStore } from "../../../store/store";
import { getPTInfoApi } from "../../../store/api/user/member/MemberInfoApi";
import { useMemberContext } from "../../../context/MemberContext";


function Info() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const { infoData, setInfoData } = memberInfoDataStore();
  const { MemberId } = useMemberContext();

  console.log(MemberId);
  
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEditInfo = () => {
    setIsEditInfo(true);
  };

  const handleSubmit = () => {
    setIsEditInfo(false);
  };

  useEffect(() => {
    if (MemberId === null) {
      console.error("No valid MemberId available.");
      return;
    }

    const fetchMemberInfo = async () => {
      const response = await getPTInfoApi(MemberId);  
      if (response.errorCode === "M003") {
        handleEditInfo();  // 오류 코드 M003 처리
      } else if (response) {
        setInfoData(response); 
      }
    };

    fetchMemberInfo();
  }, [MemberId, setInfoData]);  

  
  return (
    <div className="relative flex flex-col items-center justify-center">
      <TabBar
        label={infoData.memberName}
        icon={meatball}
        onIconClick={toggleDropdown}
        memberid={MemberId}
      />
      {isDropdownOpen && (
        <Dropdown
          options={[{ label: "정보 수정", onClick: handleEditInfo }]}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] flex justify-center items-center">
        {isEditInfo ? (
          <EditMemberCpmonent onSubmit={handleSubmit} />
        ) : (
          <MemberInfoComponent />
        )}
      </div>
      <NavigationBar />
    </div>
  );
}

export default Info;

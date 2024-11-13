import TabBar from "../../common/bar/Tabbar";
import meatball from "../../../assets/three-dots.svg"
import NavigationBar from "../../common/bar/NavigationBar";
import Dropdown from "../../common/DropDown";
import { useState, useEffect } from "react";
import MemberInfoComponent from "./Info";
import EditMemberCpmonent from "./EditMember";
import { memberInfoDataStore, } from "../../../store/store";
import { getPTInfoApi } from "../../../store/api/user/member/MemberInfoApi";
import { useParams } from "react-router-dom";

function Info() {
  const {memberid} = useParams();
  //const {listData} = useListDataStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const {setInfoData} = memberInfoDataStore();
  //const member = listData.find((member) => member.id === Number(memberid));

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEditInfo = () => {
    setIsEditInfo(true);
  };

  const handleSubmit = () => {
    setIsEditInfo(false);
  };
  
    //회원 상세정보 가져오기
    useEffect(() => {
      const fetchMemberInfo = async () => {
        const response = await getPTInfoApi(Number(memberid));
        if (response) {
          setInfoData(response); // 받아온 response 데이터를 infoData에 저장
        }
      };
      fetchMemberInfo();
    }, [memberid, setInfoData]); // memberid와 setInfoData가 바뀔 때마다 실행되도록 의존성 배열 설정

  return (
    <div className="relative flex flex-col items-center justify-center">
      <TabBar
        label={"정우혁"}
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
          <EditMemberCpmonent onSubmit={handleSubmit} />
        ) : (
          <MemberInfoComponent/>
        )}
      </div>
      <NavigationBar />
    </div>
  );
}

export default Info;

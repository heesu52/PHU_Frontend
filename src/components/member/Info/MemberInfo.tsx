import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import meatball from "../../../assets/three-dots.svg";
import TabBar from "../../common/bar/Tabbar";
import NavigationBar from "../../common/bar/NavigationBar";
import Dropdown from "../../common/DropDown";
import NoMemberInfoModal from "../../common/modal/NoMemberInfoModal";
import InfoComponent from "./Info";
import AddMemberComponent from "./AddMemberInfo";
import EditMemberInfoComponent from "./EditMemberInfo";
import { useInfoDataStore, useIdStore } from "../../../store/store";  
import { getPTInfoApi } from "../../../store/api/info/MemberInfoApi";


function MemberInfo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isAddInfo, setIsAddInfo] = useState(false);
  const [isModalOpen, setIsrModalOpen] = useState(false);
  
  const { infoData, setInfoData } = useInfoDataStore();
  const { setListId, setMemberId } = useIdStore();  
  
  const { listid } = useParams<{ listid: string }>();  // URL 파라미터에서 listid 가져오기
  
  useEffect(() => {
    if (listid) {
      setListId(Number(listid));  // zustand 상태에 listid 저장
    }

    const fetchMemberInfo = async () => {
      const response = await getPTInfoApi(Number(listid)); 
    
      if (response.errorCode === "M003") {
        setIsrModalOpen(true);
        setIsAddInfo(true);  // 회원 정보 추가 모드로 변경
      } else {
        setInfoData(response);
        setMemberId(response.memberId);  // zustand 상태에 memberId 저장
      }
    };

    fetchMemberInfo();  
  }, []);  

  return (
    <div className="relative flex flex-col items-center justify-center">
      <TabBar
        label={infoData.memberName}
        icon={meatball}
        age={infoData.memberAge}
        onIconClick={() => setIsDropdownOpen((prev) => !prev)}  
      />
      {isDropdownOpen && (
        <Dropdown
          options={[{ label: "정보 수정", onClick: () => setIsEditInfo(true) }]} 
          onClose={() => setIsDropdownOpen(false)}  // 드롭다운 닫기
        />
      )}
      <div className="w-full h-[calc(100vh-185px)] bg-[#f6f6f6] flex justify-center items-center">
        {isAddInfo ? (
          <AddMemberComponent onSubmit={() => setIsAddInfo(false)} />  // 회원 정보 추가 컴포넌트
        ) : isEditInfo ? (
          <EditMemberInfoComponent onSubmit={() => setIsEditInfo(false)} />  // 회원 정보 수정 컴포넌트
        ) : (
          <InfoComponent />  // 회원 정보 컴포넌트
        )}
      </div>
      <NavigationBar />
      
        <NoMemberInfoModal 
        isOpen={isModalOpen}
        onClose={() => setIsrModalOpen(false)} />  
    </div>
  );
}

export default MemberInfo;

import { To, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserApi, getPTListApi } from "../../store/api";
import HeaderBar from "../common/bar/HeaderBar";
import settingimg from "../../assets/setting.svg";
import NavigationBar from "../common/bar/NavigationBar";
import DeleteIDModal from "../common/modal/deleteIDModal";
import profile from "../../assets/basic-profile.svg";
import mark from "../../assets/TRAINER 마크.svg";
import { useListDataStore, useMemberDataStore } from "../../store/store";

function Profile() {
  const navigate = useNavigate();
  const { listData, setListData } = useListDataStore();
  const { memberData, setMemberData } = useMemberDataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 아이콘 클릭 핸들러
  const handleIconClick = (path: To) => {
    navigate(path);
  };

  // 사용자 정보 및 PT 리스트 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Promise.all을 사용해 두 API를 병렬로 호출하여 성능 최적화
        const [userResponse, ptListResponse] = await Promise.all([
          getUserApi(),
          getPTListApi(),
        ]);

        if (userResponse?.data) setMemberData(userResponse.data);
        if (ptListResponse?.data) setListData(ptListResponse.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchData();
  }, [setListData, setMemberData]);

  // 회원 탈퇴 클릭 핸들러
  const handleMemberDeleteClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* 헤더 바 */}
      <HeaderBar
        label="마이 페이지"
        icon={settingimg}
        onIconClick={() => handleIconClick("/my/setting")}
      />

      {/* 사용자 정보 */}
      <div className="flex items-center w-full p-5 mb-5">
        <img src={profile} alt="icon" className="w-10 h-10 mr-3 lg:w-14 lg:h-14" />
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <span className="text-sm md:text-md lg:text-base">{memberData?.name || "사용자 이름"}</span>
            <img src={mark} alt="Trainer Mark" className="w-12 h-5 ml-2" />
          </div>
          <span className="text-sm text-custom-darkgrey">{listData?.length || 0} 명</span>
        </div>
      </div>

      <ul className="m-6">
        <li
          className="p-3 mb-1 text-sm border-b cursor-default"
          onClick={() => handleIconClick("/my/edit")}
        >
          내 정보 변경
        </li>
        <li className="p-3 mb-1 text-sm border-b cursor-default">로그아웃</li>
        <li
          className="p-3 mb-1 text-sm border-b cursor-default"
          onClick={handleMemberDeleteClick} // 회원 탈퇴 클릭 시 모달 열기
        >
          회원 탈퇴
        </li>
      </ul>
      <DeleteIDModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // 모달 닫기 시 상태 초기화
      />
      {/* 네비게이션 바 */}
      <NavigationBar />
    </div>
  );
}

export default Profile;

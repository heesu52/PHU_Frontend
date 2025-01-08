import HeaderBar from "../common/bar/HeaderBar";
import settingimg from "../../assets/setting.svg";
import NavigationBar from "../common/bar/NavigationBar";
import profile from "../../assets/basic-profile.svg";
import mark from "../../assets/TRAINER 마크.svg";
import { To, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserApi, getPTListApi } from "../../store/api";
import { useListDataStore, useMemberDataStore } from "../../store/store";

function Profile() {
  const navigate = useNavigate();
  const { listData, setListData } = useListDataStore(); 
  const { memberData, setMemberData } = useMemberDataStore();
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setListData, setMemberData]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태 표시
  }

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
        <img src={profile} alt="icon" className="w-[60px] h-[60px] mr-3" />
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <span className="text-base">{memberData?.name || "사용자 이름"}</span>
            <img src={mark} alt="Trainer Mark" className="w-[50px] h-[20px] ml-1" />
          </div>
          <span className="text-sm text-custom-darkgrey">{listData?.length || 0} 명</span>
        </div>
      </div>

      {/* 그래프 영역 */}
      <div className="flex flex-col items-center">
        <div className="w-[360px] h-[245px] border border-custom-grey rounded-xl mb-10 flex items-center justify-center">
          <span>그래프</span>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <NavigationBar />
    </div>
  );
}

export default Profile;

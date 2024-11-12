import HeaderBar from "../common/bar/HeaderBar";
import settingimg from "../../assets/setting.svg";
import NavigationBar from "../common/bar/NavigationBar";
import profile from "../../assets/basic-profile.svg";
import mark from "../../assets/TRAINER 마크.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserApi, getPTListApi } from "../../store/api";
import { useListDataStore } from "../../store/store";

function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { listData, setListData } = useListDataStore(); 

  const handleIconClick = (path: string) => {
    navigate(path);
  };

  // 사용자의 이름과 트레이너 목록 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userName = await getUserApi();
      
      if (userName) {
        setName(userName);
      }
    };

    // getPTListApi에서 데이터 가져오고 상태 업데이트
    const fetchPTList = async () => {
      const ptList = await getPTListApi();
      setListData(ptList); // 리스트 데이터 상태에 업데이트
    };

    fetchUserInfo();
    fetchPTList();
  }, [setListData]);

  return (
    <div>
      <HeaderBar
        label="마이 페이지"
        icon={settingimg}
        onIconClick={() => handleIconClick("/my/setting")}
      />
      <div className="flex items-center w-full p-5 mb-5">
        <img src={profile} alt="icon" className="w-[60px] h-[60px] mr-3" />
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <span className="text-base">{name}</span>
            <img src={mark} className="w-[50px] h-[20px] ml-1" />
          </div>
          <span className="text-sm text-custom-darkgrey">{listData.length} 명</span> {/* 리스트 길이 출력 */}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[360px] h-[245px] border border-custom-grey rounded-xl mb-10">
          <span>그래프</span>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}

export default Profile;

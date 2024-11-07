import HeaderBar from "../common/bar/HeaderBar";
import settingimg from "../../assets/setting.svg";
import NavigationBar from "../common/bar/NavigationBar";
import profile from "../../assets/basic-profile.svg";
import mark from "../../assets/TRAINER 마크.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserApi, getPTListApi } from "../../store/api";

function Profile() {
  const navigate = useNavigate();
  const [name, sestName] = useState("");
  
  const handleIconClick = (path: string) => {
    navigate(path);
  };

  //사용자의 이름 가져오기
  useEffect(()=>{
    const fetchUserInfo = async () => {
      const userName = await getUserApi();
      if(userName){
        sestName(userName);
      }
    };

    fetchUserInfo();
  },[]);

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
            <img src={mark} className="w-[50px] h-[20px] ml-1"></img>
          </div>
          <span className="text-sm text-custom-darkgrey"> </span>
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

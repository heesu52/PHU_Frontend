import HeaderBar from "../common/bar/ArrowHeaderBar";
import NavigationBar from "../common/bar/NavigationBar";
import profile from "../../assets/basic-profile.svg"
import mark from "../../assets/TRAINER 마크.svg"
import { useNavigate } from "react-router-dom";
import {useMemberDataStore } from "../../store/store";

function Setting() {
    const navigate = useNavigate(); 
const { memberData} = useMemberDataStore();

    const handleIconClick = (path: string) => {
        navigate(path);
    };
    
  return (
    <div>
      <HeaderBar label="프로필 설정"/>
      <div className="flex items-center justify-between w-full p-5">
        <div className="flex items-center ml-1">
            <img src={profile} alt="icon" className="w-[70px] h-[70px] mr-3"/>
            <div className="flex flex-col">
            <div className="flex items-center mb-1">
                <span className="text-lg">{memberData?.name}</span>
                <img src={mark} className="w-[50px] h-[20px] ml-2"></img>
            </div>
            </div>
        </div>
        <div className="w-[200px] h-[35px] border flex items-center justify-center rounded-md mr-3">
            <span className="text-xs cursor-pointer">프로필 이미지 변경</span>
        </div>
      </div>
      <ul className="m-6">
        <li className="p-3 mb-1 text-sm border-b cursor-default" onClick={()=>handleIconClick('/my/edit')}>내 정보 변경</li>
        <li className="p-3 mb-1 text-sm border-b cursor-default">로그아웃</li>
        <li className="p-3 mb-1 text-sm border-b cursor-default">회원 탈퇴</li>
      </ul>
      <NavigationBar />
    </div>
  );
}
export default Setting;

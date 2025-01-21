import HeaderBar from "../common/bar/ArrowHeaderBar";
import NavigationBar from "../common/bar/NavigationBar";
import profile from "../../assets/basic-profile.svg"
import {useMemberDataStore } from "../../store/store";


function Setting() {
const { memberData} = useMemberDataStore();

    
  return (
    <div>
      <HeaderBar label="프로필 설정"/>
      <div className="flex items-center justify-between w-full p-5">
        <div className="flex items-center ml-1">
        <img src={profile} alt="icon" className="w-10 h-10 mr-3 lg:w-14 lg:h-14" />
            <div className="flex flex-col">
            <div className="flex flex-col items-center mb-1">
              <span className="text-sm md:text-md lg:text-base">{memberData?.name || "사용자 이름"}</span>
            </div>
            </div>
        </div>
        <div className="flex items-center justify-center w-40 mr-3 bg-white border rounded-md h-9">
            <span className="text-xs cursor-pointer">프로필 이미지 변경</span>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}
export default Setting;

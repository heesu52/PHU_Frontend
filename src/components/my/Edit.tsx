import HeaderBar from "../common/bar/HeaderBar";
import settingimg from "../../assets/setting.svg";
import NavigationBar from "../common/bar/NavigationBar";
import { useNavigate } from "react-router-dom";

function Edit() {
const nagivate = useNavigate();

  const handleClick = () =>{
    nagivate("/edit")
    console.log("클릭됨")
  }
  return (
    <div>
      <HeaderBar label="내 정보 변경" icon={settingimg} />
      <NavigationBar />
      <div onClick={handleClick}>클릭하세요</div>
    </div>
  );
}
export default Edit;

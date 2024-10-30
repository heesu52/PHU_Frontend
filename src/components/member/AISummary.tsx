import HeaderBar from "../common/bar/HeaderBar";
import meatball from "../../assets/three-dots.svg";

function AISummary() {


  return (
    <div className="relative flex flex-col items-center justify-center">
      <HeaderBar
        label="회원목록"
        icon={meatball}
      
      />
    </div>
  );
}

export default AISummary;

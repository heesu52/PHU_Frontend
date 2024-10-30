import HeaderBar from "../common/bar/HeaderBar";
import meatball from "../../assets/three-dots.svg";

function DailyChart() {


  return (
    <div className="relative flex flex-col items-center justify-center">
      <HeaderBar
        label="회원목록"
        icon={meatball}
        size="large"
      />
    </div>
  );
}

export default DailyChart;

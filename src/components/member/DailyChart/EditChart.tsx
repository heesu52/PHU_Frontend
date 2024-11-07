import arrow from "../../../assets/arrow.svg";
import imageupload from "../../../assets/image.svg";
import RadioButton from "../../common/button/RadioButton";
import CheckButton from "../../common/button/CheckButton";
import SubmitButton from "../../common/button/SubmitButton";
import ChartDeleteModal from "../../common/modal/ChartDeleteModal";
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from "react";



function EditChart() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const goalRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto"; 
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full h-[55px]">
        <div className="flex p-3 ml-3 space-x-4">
          <img src={arrow} onClick={handleGoBack} />
          <p className="text-lg cursor-default">뒤로가기</p>
        </div>
      </div>

      {/* Component */}
      <div className="w-[90%] mt-5 space-y-5 ml-6">
        {/* PT 날짜 */}
        <div className="space-y-2">
          <div className="text-base">PT 날짜</div>
          <div className="flex items-center ml-5">
            <p className="p-2 text-sm">2024년 11월 21일</p>
            <div className="flex p-2 ml-6 space-x-4">
              <RadioButton id="radio-pt-session" label="PT" value="PT" name="session-type" />
              <RadioButton id="radio-personal-session" label="개인운동" value="Private" name="session-type" />
            </div>
          </div>
        </div>

        {/* 몸무게 */}
        <div className="space-y-2">
          <p>몸무게</p>
          <div className="flex items-center gap-2 ml-7">
            <input type="number" className="w-[80px] h-8 border rounded-lg border-custom-skyblue flex text-center" />
            <p className="text-sm">kg</p>
          </div>
        </div>

        {/* 운동부위 */}
        <div className="space-y-2">
          <p>운동부위</p>
          <div className="flex items-center justify-center gap-5 p-2">
            <CheckButton id="shoulder" label="어깨" value="sholder" name="session-type" />
            <CheckButton id="chest" label="가슴" value="chest" name="session-type" />
            <CheckButton id="abs" label="복근" value="d" name="session-type" />
            <CheckButton id="arm" label="팔" value="arm" name="session-type" />
            <CheckButton id="leg" label="하체" value="leg" name="session-type" />
            <CheckButton id="back" label="등" value="back" name="session-type" />
            <CheckButton id="cardio" label="유산소" value="run" name="session-type" />
          </div>
        </div>

        {/* 메모 */}
        <div className="space-y-2">
          <div className="text-base">메모</div>
          <textarea
            ref={goalRef}
            className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1 ml-7"
            onInput={() => adjustTextareaHeight(goalRef)}
            placeholder="ex) 목표 몸무게, 감량하고 싶은 부위"
            maxLength={150}
          />
        </div>

        {/* 인증샷 */}
        <div className="space-y-2">
          <div className="text-base">인증샷</div>
          <div className="border w-[450px] min-h-[150px] rounded-lg text-sm bg-[#f6f6f6] p-1 ml-7 flex flex-col items-center justify-center gap-2">
            <img src={imageupload} alt="업로드 아이콘" />
            <p className="text-xs text-custom-darkgrey">사진 업로드</p>
          </div>
        </div>

        <div className="flex justify-end mt-3 ml-auto">
          <SubmitButton label="수정" size="small" className="bg-blue-500" />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <ChartDeleteModal onClose={toggleModal} />}
    </div>
  );
}

export default EditChart;

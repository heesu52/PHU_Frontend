import meatball from "../../../assets/three-dots.svg";
import arrow from "../../../assets/arrow.svg"
import RadioButton from "../../common/button/RadioButton";
import CheckButton from "../../common/button/CheckButton";
import Dropdown from "../../common/DropDown";
import ChartDeleteModal from "../../common/modal/ChartDeleteModal";
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from "react";

function Chart () {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const goalRef = useRef<HTMLTextAreaElement | null>(null);
    
    //textarea의 높이를 자동조절하는 함수
    const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
        if (ref.current) {
        ref.current.style.height = "auto"; // 높이를 초기화한 후
        ref.current.style.height = `${ref.current.scrollHeight}px`; // 내용에 맞춰 높이 설정
        }
    };

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
      };

      const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
      };
  
    return (
       <div className="relative flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full h-[55px]">
                <div className="flex p-3 ml-3 space-x-4">
                    <img src={arrow} onClick={handleGoBack}/>
                    <p className="text-lg cursor-default">뒤로가기</p>
                </div>
                <img src={meatball} className="mr-5" onClick={toggleDropdown}/>
            </div>
            {isDropdownOpen && (
            <Dropdown
            options={[
                { label: "차트 수정", onClick: toggleModal },
                { label: "차트 삭제", onClick: toggleModal },
            ]}
            onClose={() => setIsDropdownOpen(false)}
            />
      )}
            {/* Component */}
            <div className="w-[90%]  mt-6 space-y-5">
                {/* pt 날짜 */}
                <div className="space-y-2">
                    <div className="text-base">PT 날짜</div>
                    <div className="flex items-center ml-5">
                        <p className="p-2 text-sm">2024년 11월 21일</p>
                        <div className="flex p-2 ml-6 space-x-4">
                            <RadioButton id="radio-pt" label="PT" name="session-type" readOnly={true} />
                            <RadioButton id="radio-personal" label="개인운동" name="session-type" readOnly={true}/>
                        </div>
                    </div>
                </div>
                {/* 몸무게 */}
                <div className="space-y-2">
                    <p>몸무게</p>
                    <div className="flex items-center gap-2 ml-7">
                        <input type="number" className="w-[80px] h-8 border rounded-lg border-custom-skyblue flex text-center" disabled></input>
                        <p className="text-sm">kg</p>
                    </div>
                </div>
                {/* 운동부위 */}
                <div className="space-y-2">
                    <p>운동부위</p>
                    <div className="flex items-center justify-center gap-5 p-2">
                        <CheckButton id="radio-pt" label="어깨" name="session-type" readOnly={true}/>
                        <CheckButton id="radio-pt" label="가슴" name="session-type" readOnly={true}/>
                        <CheckButton id="radio-pt" label="복근" name="session-type" readOnly={true}/>
                        <CheckButton id="radio-pt" label="팔" name="session-type" readOnly={true}/>
                        <CheckButton id="radio-pt" label="하체" name="session-type" readOnly={true}/>
                        <CheckButton id="radio-pt" label="등" name="session-type" readOnly={true}/>
                        <CheckButton id="radio-pt" label="유산소" name="session-type" readOnly={true}/>
                    </div>
                </div>
                {/* 메모*/}
                <div className="space-y-2">
                    <div className="text-base">메모</div>
                    <textarea
                        ref={goalRef}
                        className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1 ml-7"
                        onInput={() => adjustTextareaHeight(goalRef)}
                        placeholder="ex) 목표 몸무게, 감량하고 싶은 부위"
                        maxLength={150}
                        disabled
                        />
                </div>
                {/* 인증샷*/}
                <div className="space-y-2">
                    <div className="text-base">인증샷</div>
                   <div className="border w-[450px] min-h-[150px] rounded-lg text-sm bg-[#f6f6f6] p-1 ml-7 flex flex-col items-center justify-center gap-2">
                    <p className="text-xs text-custom-darkgrey">아직 인증샷이 없어요. 인증샷을 업로드 해보세요!</p>
                   </div>
                </div>
            </div>
            {isModalOpen && <ChartDeleteModal onClose={toggleModal} />}
       </div>
    )
}
export default Chart;
import meatball from "../../../assets/three-dots.svg";
import arrow from "../../../assets/arrow.svg";
import movetodailychart from "../../../assets/movetodailychart.svg"
import Dropdown from "../../common/DropDown";
import SummaryDeleteModal from "../../common/modal/SummaryDeleteModal";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Summary() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleGoBack = () => {
        navigate(-1);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleIconClick = () => {
        navigate("/member/daily/edit");
      };


    return (
       <div className="relative flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full h-[55px]">
                <div className="flex p-3 ml-3 space-x-4">
                    <img src={arrow} onClick={handleGoBack} />
                    <p className="text-lg cursor-default">2023. 12. 05 오전 9:48 녹음</p>
                </div>
                <img src={meatball} className="mr-5" onClick={toggleDropdown} />
            </div>

            {isDropdownOpen && (
                <Dropdown
                    options={[
                        { label: "요악 내용 수정", onClick: handleIconClick },
                        { label: "요약 내용 삭제", onClick: toggleModal },
                    ]}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}

            {/* Component */}
            <div className="flex flex-col items-center mt-5">
                <ul className="w-[90%] space-y-4">
                    <li>
                        <h4 >요약1</h4>
                        <p className="text-sm">가나다라마사 아자차카 칸예는 N!에서 뒤에서부터 처음 0이 아닌 숫자가 나올 때까지 0의 개수를 구하는 프로그램을 작성하시오</p>
                    </li>
                    <li>
                        <h4>요약2</h4>
                        <p className="text-sm">가나다라마사 아자차카 칸예는 N!에서 뒤에서부터 처음 0이 아닌 숫자가 나올 때까지 0의 개수를 구하는 프로그램을 작성하시오</p>
                    </li>
                    
                </ul>
                <img src={movetodailychart} className="mt-10 ml-auto mr-7"></img>
            </div>
            {/* Modal */}
            {isModalOpen && <SummaryDeleteModal onClose={toggleModal} />}
       </div>
    );
}

export default Summary;

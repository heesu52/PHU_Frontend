import { SetStateAction, useState } from "react";
import { useNavigate} from 'react-router-dom';
import meatball from "../../../assets/three-dots.svg";
import movetodailychart from "../../../assets/movetodailychart.svg"
import arrow from "../../../assets/arrow.svg";
import Dropdown from "../../common/DropDown";
import Button from "../../common/button/Button";
import SummaryDeleteModal from "../../common/modal/SummaryDeleteModal";
import ChangetoTextModal from "../../common/modal/ChangetoTextModal";
import ChangeToText from "./ChangetToText";
import TextSummation from "./TextSummation";

function Summation() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isChangetoTextModalOpen, setIsChangetoTextModalOpen] = useState(false);
    const [isSummaryDeleteModalOpen, setIsSummaryDeleteModalOpen] = useState(false); // 삭제 모달 상태
    const [value, setValue] = useState("change"); // 버튼 상태


    const handleGoBack = () => {
        navigate(-1);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };


    const handleModalClose = () => {
        setIsChangetoTextModalOpen(false);
    };

    const handleButtonClick = (selectedValue: SetStateAction<string>) => {
        setValue(selectedValue); // 버튼 상태 업데이트
    };

    return (
        <div className="relative flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full h-[55px]">
                <div className="flex p-3 ml-3 space-x-4">
                    <img src={arrow} onClick={handleGoBack} />
                </div>
                <img src={meatball} className="mr-5" onClick={toggleDropdown} />
            </div>
            <div className="flex w-[90%] gap-4 mt-2">
                {/* 버튼 클릭 시 handleButtonClick 호출 */}
                <Button
                    label={"텍스트 추출"}
                    name={"changeText"}
                    value={"change"}
                    onClick={() => handleButtonClick("change")}
                    checked={value === "change"}
                />
                <Button
                    label={"텍스트 요약"}
                    name={"summation"}
                    value={"summation"}
                    onClick={() => handleButtonClick("summation")}
                    checked={value === "summation"}
                />
            </div>
            
            {isDropdownOpen && (
                <Dropdown
                    options={[
                        { label: "요약 내용 수정", onClick: () => navigate("/member/summary/edit") },
                        { label: "요약 내용 삭제", onClick: () => setIsSummaryDeleteModalOpen(true) },
                    ]}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}
            
            {/* 조건부 렌더링 */}
            <div className="w-full mt-4">
                {value === "change" && <ChangeToText />}
                {value === "summation" && <TextSummation />}
            </div>
            <img src={movetodailychart} className="mt-10 ml-auto mr-7" />
            {/* SummaryDeleteModal */}
            <SummaryDeleteModal
                isOpen={isSummaryDeleteModalOpen}
                onClose={() => setIsSummaryDeleteModalOpen(false)} // 모달 닫기
            />

            {/* ChangetoTextModal */}
            <ChangetoTextModal
                isOpen={isChangetoTextModalOpen}
                onClose={handleModalClose} // 모달 닫을 때 텍스트 상태 반영 후 이동
            />

            
        </div>
    );
}

export default Summation;

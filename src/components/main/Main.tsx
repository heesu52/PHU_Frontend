import backgroundimg from "../../assets/bg.png";
import questionmark from "../../assets/question-circle 1.svg";
import chevrondown from "../../assets/chevron-down 1.svg";
import IntroModal from "../common/modal/IntroModal";
import FITEE from "../../assets/FITEE.png"
import { useState } from "react";

function MainComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div
            className="relative h-full bg-cover"
            style={{ backgroundImage: `url(${backgroundimg})` }}
        >
            {/* 핏티가 뭔가요? 버튼 */}
            <div
                className="absolute flex items-center justify-between cursor-pointer top-3 right-4 w-fit"
                onClick={toggleModal}
            >
                <img src={questionmark} className="mr-2" alt="Question Mark" />
                <span className="hidden text-sm font-bold sm:block">핏티가 뭔가요🤔?</span>
            </div>

            <div>
                <div className="flex flex-col items-center justify-center h-[310px] mt-[50px] text-center">
                    <span className="mb-2 text-sm sm:text-base lg:text-lg">
                        맞춤형 PT 관리를 위한 FIT한 선택!
                    </span>
                    <img src={FITEE} className="w-40 md:w-48 lg:w-52" alt="FITEE Logo" />
                </div>
                <div className="flex flex-col justify-center gap-5 h-[310px]">
                    <div className="flex flex-col items-center gap-2 transition duration-500 ease-in-out animate-slideUpDown">
                        <p className="text-[#121212] text-sm sm:text-base">지금 시작하러 가기</p>
                        <img src={chevrondown} className="w-6 h-6 sm:w-8 sm:h-8" alt="Chevron Down" />
                    </div>
                    <div className="flex flex-col items-center gap-5 animate-fadeIn">
                        <a
                            href="/login"
                            className="w-[100px] h-[40px] border flex items-center justify-center rounded-lg border-black hover:bg-custom-softblue transition duration-300">
                            로그인
                        </a>
                        <a
                            href="/signup"
                            className="w-[100px] h-[40px] border flex items-center justify-center rounded-lg border-black hover:bg-custom-softblue transition duration-300">
                            회원가입
                        </a>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <IntroModal
                    onClose={toggleModal}
                />
            )}
        </div>
    );
}

export default MainComponent;

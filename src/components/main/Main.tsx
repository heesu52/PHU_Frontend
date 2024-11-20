import backgroundimg from "../../assets/bg.png";
import questionmark from "../../assets/question-circle 1.svg";
import chevrondown from "../../assets/chevron-down 1.svg";


function MainComponent() {
    return (
        <div className="relative">
            <div
                className="absolute inset-0 bg-cover"
                style={{ backgroundImage: `url(${backgroundimg})` }}
            ></div>
            <div>
                <div className="flex justify-end w-full p-4 text-sm font-bold">
                    <img src={questionmark} className="mr-1" />
                    <span>핏티가 뭔가요🤔?</span>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center h-[320px] mt-[50px] text-center">
                        <span className="text-sm sm:text-base lg:text-lg">
                            맞춤형 PT 관리를 위한 핏한 선택!
                        </span>
                        <h1 className="text-[48px] sm:text-[64px] font-black">
                            핏티
                        </h1>
                        <h2 className="text-[20px] sm:text-[28px] font-bold mt-[-5px]">
                            Fitee
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center gap-5 space-y-2 h-[300px]">
                        <div className="flex flex-col items-center gap-2 transition duration-500 ease-in-out animate-slideUpDown">
                            <p className="text-[#121212]">지금 시작하러 가기</p>
                            <img src={chevrondown} />
                        </div>
                        <div className="flex flex-col items-center gap-5 animate-fadeIn">
                            <a
                                href="/login"
                                className="w-[100px] h-[40px] border flex items-center justify-center rounded-lg border-black hover:bg-custom-softblue hover:text-white transition duration-300">
                                로그인
                            </a>
                            <a
                                href="/signup"
                                className="w-[100px] h-[40px] border flex items-center justify-center rounded-lg border-black hover:bg-custom-softblue hover:text-white transition duration-300">
                                회원가입
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainComponent;

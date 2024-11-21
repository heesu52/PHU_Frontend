import threedots from "../../../assets/three-dots.svg"
import plusbtn from "../../../assets/plus-circle-fill.svg";
import { useNavigate } from "react-router-dom";

function SummaryList () {
    const navigate = useNavigate();

    const handleIconClick = (path: string) => {
        navigate(path);
    };

    return (
       <div className="w-[80%] flex flex-col space-y-5 mx-auto">
        <div className="flex items-center justify-between">
            <p>2024년 11월</p>
            <select className="block p-2 text-sm text-gray-900 border rounded-lg border-custom-grey">
                <option selected value="US">최신순</option>
                <option value="CA">오래된순</option>
            </select>
        </div>
        <ul className="flex flex-col items-center space-y-3 text-xs cursor-default">
            <li className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center cursor-default">
                <div className="flex w-full" onClick={() => handleIconClick(':id')}>
                    <p className="flex-0.5 text-center ml-3">2024.11.01</p> 
                    <p className="flex-1 text-center">파일제목</p> 
                    <p className="flex-1 text-center">텍스트 추출</p> 
                    <p className="flex-1 text-center">대화 요약</p> 
                </div>
                <img className="mr-2 rotate-90 cursor-pointer" src={threedots} />
            </li>
            <li className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center cursor-default">
                <div className="flex w-full" onClick={() => handleIconClick(':id')}>
                    <p className="flex-0.5 text-center ml-3">2024.11.01</p> 
                    <p className="flex-1 text-center">파일제목</p> 
                    <p className="flex-1 text-center">텍스트 추출</p> 
                    <p className="flex-1 text-center">텍스트 추출</p> 
                </div>
                <img className="mr-2 rotate-90 cursor-pointer" src={threedots} />
            </li>
        </ul>
        <div>
            <img 
                src={plusbtn} 
                className="fixed bottom-0 mb-20 transform -translate-x-1/2 cursor-pointer left-1/2 w-7 h-7"
                onClick={() => handleIconClick('/member/voice')}
            />
        </div>
       </div>
    );
}
export default SummaryList;

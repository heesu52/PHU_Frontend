import threedots from "../../../assets/three-dots.svg"
import { useNavigate } from "react-router-dom";

function SummaryList () {
    const navigate = useNavigate();

    const handleIconClick = (path: string) => {
        navigate(path);
      };

    return (
       <div className="w-[80%] flex flex-col space-y-5">
        <div className="flex items-center justify-between">
            <p>2024년 11월</p>
            <select className="block p-2 text-sm text-gray-900 border rounded-lg border-custom-grey ">
                <option selected value="US">최신순</option>
                <option value="CA">오래된순</option>
            </select>
        </div>
        <ul className="flex flex-col items-center space-y-3 text-xs cursor-default">
            <li className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center cursor-default">
                <div className="flex w-full" onClick={()=>handleIconClick(':id')}>
                    <p className="flex-0.5 text-center ml-3">2024.11.01</p> 
                    <p className="flex-1 text-center">2023. 12. 05 오전 9:48 녹음</p> 
                </div>
                <img className="mr-2 rotate-90 cursor-pointer" src={threedots}/>
            </li>
            <li className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center cursor-default">
                <div className="flex w-full" onClick={()=>handleIconClick(':id')}>
                    <p className="flex-0.5 text-center ml-3">2024.11.01</p> 
                    <p className="flex-1 text-center">2023. 12. 05 오전 9:48 녹음</p> 
                </div>
                <img className="mr-2 rotate-90 cursor-pointer" src={threedots}/>
            </li>
        </ul>
       </div>
    )
}
export default SummaryList;
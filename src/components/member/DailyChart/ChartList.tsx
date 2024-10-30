function ChartList () {
    return (
       <div className="w-[80%] flex flex-col space-y-5">
        <div className="flex items-center justify-between">
            <p className="font-semibold">2024년 11월</p>
            <select className="block p-2 text-sm text-gray-900 border rounded-lg border-custom-grey ">
                <option selected value="US">최신순</option>
                <option value="CA">오래된순</option>
            </select>
        </div>
        <ul className="flex flex-col items-center space-y-3 text-xs">
            <li className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center ">
                <div className="flex w-full">
                    <p className="flex-1 text-center">2024.11.01</p> 
                    <p className="flex-1 text-center">어깨 / 가슴</p> 
                    <p className="flex-1 text-center">50kg</p> 
                    <p className="flex-1 text-center">PT</p> 
                </div>
            </li>
            <li className="w-[80%] h-[55px] bg-white shadow-md rounded-xl flex items-center justify-center ">
                <div className="flex w-full">
                    <p className="flex-1 text-center">2024.11.01</p> 
                    <p className="flex-1 text-center">어깨 / 가슴</p> 
                    <p className="flex-1 text-center">50kg</p> 
                    <p className="flex-1 text-center">개인운동</p> 
                </div>
            </li>
        </ul>
       </div>
    )
}
export default ChartList;
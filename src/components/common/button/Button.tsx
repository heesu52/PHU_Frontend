interface RadioBtnProps {
    className?: string;
    onClick?: (value: string) => void;
    label: string;
    name: string; 
    value: string; 
    checked?: boolean; 
}

function RadioBtn({ className, onClick, label, name, value, checked = false }: RadioBtnProps) {
    const handleChange = () => {
        if (onClick) {
            onClick(value); // 선택된 값 전달
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <input
                id={value}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onClick={handleChange}
                className="hidden" // 기본 라디오 버튼 숨김
            />
            <div 
                className={`px-6 py-2 rounded-full border border-custom-softgrey flex items-center justify-center cursor-pointer 
                ${checked ? " bg-blue-100" : "bg-transparent"} 
                sm:px-4 sm:py-2 md:px-7 md:py-2 lg:px-8 lg:py-2`} // 반응형 크기 조정
                onClick={handleChange} // 클릭 시 onChange 호출
            >
                <span className={`text-xs sm:text-sm md:text-md lg:text-md font-medium ${checked ? "text-blue-500" : "text-custom-softgrey"}`}>
                    {label}
                </span>
            </div>
        </div>
    );
}

export default RadioBtn;

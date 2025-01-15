interface RadioBtnProps {
    className?: string;
    onClick?: (value: string) => void;
    label: string;
    name: string; 
    value: string; 
    checked?: boolean; 
}

function Button({ className, onClick, label, name, value, checked = false }: RadioBtnProps) {
    const handleChange = () => {
        if (onClick) {
            onClick(value); // 선택된 값 전달
        }
    };

    return (
        <div className={`flex items-center gap-1 ${className}`}>
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
                className={`px-8 py-2 rounded-full border border-custom-softgrey flex items-center hover:bg-blue-200 justify-center cursor-pointer 
                ${checked ? " bg-blue-100" : "bg-transparent"}`} // 선택 시 배경색 변경
                onClick={handleChange} // 클릭 시 onChange 호출
            >
                <span className={`text-sm font-medium ${checked ? "text-blue-500" : "text-custom-softgrey"}`}>{label}</span>
            </div>
        </div>
    );
}

export default Button;

interface ButtonProps {
    className?: string;
    onClick?: (value: string) => void;  
    label: string;         
    size?: 'large' | 'medium' | 'small'; // 크기 선택
    type?: 'button'; 
    value?: string;
}

function Button({ className, onClick, value, label, size = 'medium',}: ButtonProps) {
    // 크기에 따른 너비 설정
    const sizeClasses = {
        large: 'w-[550px]',
        medium: 'w-[116px]',
        small: 'w-[92px]',
    };

    const handleClick = () => {
        if (onClick && value) {
            onClick(value);  // value를 onClick으로 전달
        }
    };

    return (
        <button
        onClick={handleClick}
            value={value} 
            type="button"
            className={`text-[16px] h-[45px] font-semibold flex items-center justify-center text-custom-softgrey p-4 rounded-[5px] ${sizeClasses[size]}  ${className}`}>
            {label}
        </button>
    );
}

export default Button;

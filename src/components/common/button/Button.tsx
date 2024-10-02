interface ButtonProps {
    className?: string;
    onClick?: () => void;  
    label: string;         
    size?: 'large' | 'medium' | 'small'; // 크기 선택
    disabled?: boolean;    // 비활성화 상태
    type?: string; // 기본적으로 텍스트 타입, 필요 시 다른 타입 지원 가능
}

function Button({ className, onClick, label, size = 'large', disabled = false }: ButtonProps) {
    // 크기에 따른 너비 설정
    const sizeClasses = {
        large: 'w-[550px]',
        medium: 'w-[116px]',
        small: 'w-[92px]',
    };

    return (
        <button
            onClick={onClick}  
            className={`text-[16px] h-[45px] font-semibold flex items-center justify-center text-white p-4 rounded-[5px] ${sizeClasses[size]}  ${className}`}
            disabled={disabled}  // disabled 속성 추가
        >
            {label}
        </button>
    );
}

export default Button;

interface SubmitButtonProps {
    className?: string;
    onClick?: () => void;  
    label: string;         
    size?: 'large' | 'medium' | 'small'; // 크기 선택
    disabled?: boolean;    // 비활성화 상태
    type?: 'submit'; 
    value?: string;
}

function SubmitButton({ className, onClick, value, label, size = 'large', disabled = false }: SubmitButtonProps) {
    // 크기에 따른 너비 설정
    const sizeClasses = {
        large: 'w-[550px]',
        medium: 'w-[116px]',
        small: 'w-[92px]',
    };

    return (
        <button
        onClick={onClick}
            value={value} 
            type="submit"
            className={`text-base h-[45px] flex items-center justify-center text-white p-4 rounded-[5px] ${sizeClasses[size]}  ${className}`}
            disabled={disabled}  // disabled 속성 추가
        >
            {label}
        </button>
    );
}

export default SubmitButton;

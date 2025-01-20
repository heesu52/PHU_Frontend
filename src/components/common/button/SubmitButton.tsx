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
        large: 'w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[31rem]',  // sm: 25rem / md: 30rem / lg: 31rem
        medium: 'w-28 sm:w-32 md:w-40 lg:w-48', // sm: 7rem (28) / sm: 8rem (32) / md: 10rem (40) / lg: 12rem (48)
        small: 'w-22 sm:w-24 md:w-32 lg:w-22',  // sm: 5rem (20) / sm: 6rem (24) / md: 8rem (32) / lg: 10rem (40)
    };
    
      
      
    

    return (
        <button
            onClick={onClick}
            value={value} 
            type="submit"
            className={`px-8 py-2 text-white rounded-full transition-colors ${sizeClasses[size]} 
                sm:px-6 sm:py-2 md:px-8 md:py-3
                ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-custom-blue'} 
                ${className}`}
            disabled={disabled}  // disabled 속성 추가
        >
            {label}
        </button>
    );
}

export default SubmitButton;

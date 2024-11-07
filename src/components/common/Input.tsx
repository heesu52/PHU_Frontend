interface InputProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string | number;  // string 또는 number 값 처리
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search'; 
    name?: string;
    size?: 'large' | 'medium' | 'small';  // 크기 선택
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
}

function Input({
    className,
    onChange,
    placeholder,
    value,
    name,
    type,
    size = 'large',
    required = false,
    readOnly = false,
    disabled = false,
}: InputProps) {
    // 크기에 따른 너비 설정
    const sizeClasses = {
        large: 'w-[500px]',
        medium: 'w-[300px]',
        small: 'w-[92px]',
    };

    // 입력값의 존재 여부에 따른 배경 색상 결정
    const inputBgColor = value ? 'bg-custom-softblue' : 'bg-white';

    return (
        <input 
            type={type}
            className={`text-[16px] h-[40px] p-4 border border-custom-softgrey rounded-[5px] ${sizeClasses[size]} ${inputBgColor} ${className}`}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
        />
    );
}

export default Input;

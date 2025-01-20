interface InputProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string | number;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search';
    name?: string;
    size?: 'large' | 'medium' | 'small';
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

    const sizeClasses = {
        large: 'w-80 sm:w-[25rem] md:w-[28rem] lg:w-[31rem]',
        medium: 'w-60 sm:w-72 md:w-[25rem] lg:w-[28rem]',
        small: 'w-40 sm:w-48 md:w-56 lg:w-64',
    };

    // 입력값의 존재 여부에 따른 배경 색상 결정
    const inputBgColor = value ? 'bg-custom-softblue' : 'bg-white';

    return (
        <div className={`w-full ${sizeClasses[size]} ${className}`}>
            <input 
                type={type}
                className={`text-sm sm:text-sm md:text-base lg:text-base h-9 p-4 md:h-10 lg:h-11 border border-custom-softgrey rounded-[5px] ${inputBgColor} w-full`}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                required={required}
                readOnly={readOnly}
                disabled={disabled}
            />
        </div>
    );
}

export default Input;

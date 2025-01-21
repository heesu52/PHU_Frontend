interface CheckBtnProps {
    id: string;
    label: string;
    name: string;
    readOnly?: boolean;
    value: string;
    checked: boolean; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

function CheckButton({
    id,
    label,
    name,
    value,
    readOnly = false,
    checked,
    onChange,
}: CheckBtnProps) {
    return (
        <div className="flex items-center md:gap-1">
            <input
                id={id}
                type="checkbox"
                name={name}
                value={value}
                checked={checked} 
                onChange={onChange} 
                className={`w-2 h-2 md:w-4 md:h-4 border mr-0.5 border-gray-700 rounded-full appearance-none checked:bg-[url('/src/assets/checked.svg')] bg-no-repeat bg-center checked:border-none ${
                    readOnly ? 'pointer-events-none opacity-60' : ''
                }`}
                readOnly={readOnly}
            />
            <label htmlFor={id} className="text-xs font-medium md:text-sm ">{label}</label>
        </div>
    );
}

export default CheckButton;

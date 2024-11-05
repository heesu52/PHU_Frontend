interface RadioBtnProps {
    id: string;
    label: string;
    name: string;
    readOnly?: boolean; 
    value: string;
}

function RadioButton({ id, label, name, value, readOnly = false }: RadioBtnProps) {
    return (
        <div className="flex items-center gap-1">
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                className={`w-4 h-4 border border-gray-700 rounded-full appearance-none checked:bg-[url('/src/assets/checked.svg')] bg-no-repeat bg-center checked:border-none ${
                    readOnly ? 'pointer-events-none opacity-60' : ''
                }`}
                readOnly={readOnly} 
            />
            <label htmlFor={id} className="text-sm font-medium ms-1">{label}</label>
        </div>
    );
}

export default RadioButton;

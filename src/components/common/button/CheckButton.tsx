
interface CheckBtnProps {
    id: string,
    label: string,
    name: string,
    readOnly: boolean
}

function CheckButton({ id, label, name, readOnly }: CheckBtnProps) {
    return (
        <div className="flex items-center gap-1">
            <input
                id={id}
                type="checkbox"
                name={name}
                className={`w-4 h-4 border border-gray-700 rounded-full appearance-none checked:bg-[url('/src/assets/checked.svg')] bg-no-repeat bg-center checked:border-none ${
                    readOnly ? 'pointer-events-none opacity-60' : ''
                }`}
                readOnly={readOnly} // 추가: readOnly 속성 설정
            />
            <label htmlFor={id} className="text-sm font-medium ms-1">{label}</label>
        </div>
    );
}
export default CheckButton;
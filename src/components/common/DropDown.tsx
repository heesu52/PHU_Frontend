import { useNavigate } from "react-router-dom";

interface DropdownOption {
  label: string;
  path?: string;
  onClick?: () => void; // 경로 대신 다른 동작을 원할 때 사용
}

interface DropdownProps {
  options: DropdownOption[];
  onClose: () => void;
}

function Dropdown({ options, onClose }: DropdownProps) {
  const navigate = useNavigate();

  const handleNavigate = (path?: string, onClick?: () => void) => {
    if (onClick) {
      onClick(); // onClick이 있을 경우 실행
    }
    if (path) {
      navigate(path); // path가 있을 경우 이동
    }
    onClose();
  };

  return (
    <ul className="absolute z-10 bg-white border rounded-md shadow-md top-10 right-5 border-custom-softgrey">
      {options.map((option, index) => (
        <li
          key={index}
          className="text-xs border-b cursor-pointer w-[100px] flex justify-center p-3 border-custom-softgrey hover:font-bold hover:text-custom-blue"
          onClick={() => handleNavigate(option.path, option.onClick)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}


export default Dropdown;

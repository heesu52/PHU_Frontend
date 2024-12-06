import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast 옵션 설정
const option = {
  position: 'top-center' as ToastPosition,
  autoClose: 2000,  // autoClose 시간을 3000ms로 변경
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// 타입별 메시지 함수
export const notify = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
  switch (type) {
    case 'success':
      toast.success(message, option);
      break;
    case 'error':
      toast.error(message, option);
      break;
    case 'info':
      toast.info(message, option);
      break;
    case 'warning':
      toast.warn(message, option);
      break;
    default:
      break;
  }
};

// ToastContainer 컴포넌트는 option을 전달하여 설정
export default function Toast() {
  return <ToastContainer {...option} />;
}

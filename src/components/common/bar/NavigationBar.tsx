import { useNavigate, useLocation } from 'react-router-dom';
import memberlsit from '../../../assets/person-lines-fill.svg';
import calendar from '../../../assets/calendar-check.svg';
import chat from '../../../assets/chat-left-dots.svg';
import my from '../../../assets/person-circle.svg';

function ArrowHeaderBar() {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 경로를 가져오기

    const handleIconClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="w-[600px] h-[65px] border border-t-custom-softgrey flex items-center fixed bottom-0">
            <div className="flex items-center justify-between w-full ml-10 mr-10">
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/list')}>
                    <img 
                        src={memberlsit} 
                        alt="회원 목록" 
                        className={`w-[25px] h-[25px] ${location.pathname === '/list' ? 'text-red-500' : 'text-custom-softgrey'}`} 
                    />
                    <span className={location.pathname === '/list' ? 'text-red-500' : 'text-custom-softgrey'}>회원 목록</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/calendar')}>
                    <img 
                        src={calendar} 
                        alt="캘린더" 
                        className={`w-[25px] h-[25px] ${location.pathname === '/calendar' ? 'text-red-500' : 'text-custom-softgrey'}`} 
                    />
                    <span className={location.pathname === '/calendar' ? 'text-red-500' : 'text-custom-softgrey'}>캘린더</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/chat')}>
                    <img 
                        src={chat} 
                        alt="채팅" 
                        className={`w-[25px] h-[25px] ${location.pathname === '/chat' ? 'text-red-500' : 'text-custom-softgrey'}`} 
                    />
                    <span className={location.pathname === '/chat' ? 'text-red-500' : 'text-custom-softgrey'}>채팅</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/my')}>
                    <img 
                        src={my} 
                        alt="마이" 
                        className={`w-[25px] h-[25px] bg-orange-300 ${location.pathname === '/my' ? 'custom-indigo' : 'text-custom-softgrey'}`} 
                    />
                    <span className={location.pathname === '/my' ? 'text-red-500' : 'text-custom-softgrey'}>마이</span>
                </div>
            </div>
        </div>
    );
}

export default ArrowHeaderBar;

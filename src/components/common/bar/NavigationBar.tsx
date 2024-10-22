import { useNavigate, useLocation } from 'react-router-dom';
import memberlsit from '../../../assets/list.svg';
import calendar from '../../../assets/calendar.svg';
import chat from '../../../assets/chat.svg';
import my from '../../../assets/my.svg';
import clickmemberlsit from '../../../assets/clicklist.svg';
import clickcalendar from '../../../assets/clickcalendar.svg';
import clickchat from '../../../assets/clickchat.svg';
import clickmy from '../../../assets/clickmy.svg';


function ArrowHeaderBar() {
    const navigate = useNavigate();
    const location = useLocation(); 

    const handleIconClick = (path: string) => {
        navigate(path);
      
    };

    return (
        <div className="w-[600px] h-[65px] border border-t-custom-softgrey flex items-center fixed bottom-0">
            <div className="flex items-center justify-between w-full ml-10 mr-10">
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/list')}>
                    <img 
                        src={location.pathname === '/list' ? clickmemberlsit : memberlsit} 
                        alt="회원 목록" 
                        className={"w-[25px] h-[25px]"} 
                    />
                    <span className={location.pathname === '/list' ? 'text-custom-indigo' : 'text-custom-softgrey'}>회원 목록</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/calendar')}>
                    <img 
                        src={location.pathname === '/calendar' ? clickcalendar : calendar} 
                        alt="캘린더" 
                        className={"w-[25px] h-[25px]"} 
                    />
                    <span className={location.pathname === '/calendar' ? 'text-custom-indigo' : 'text-custom-softgrey'}>캘린더</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/chat')}>
                    <img 
                        src={location.pathname === '/chat' ? clickchat : chat} 
                        alt="채팅" 
                        className={"w-[25px] h-[25px]"} 
                    />
                    <span className={location.pathname === '/chat' ? 'text-custom-indigo' : 'text-custom-softgrey'}>채팅</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/my')}>
                    <img 
                        src={location.pathname === '/my' ? clickmy : my} 
                        alt="마이" 
                        className={"w-[25px] h-[25px]"} 
                    />
                    <span className={location.pathname === '/my' ? 'text-custom-indigo font-bold' : 'text-custom-softgrey'}>마이</span>
                </div>
            </div>
        </div>
    );
}

export default ArrowHeaderBar;

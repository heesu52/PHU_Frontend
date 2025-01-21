import { useNavigate, useLocation } from 'react-router-dom';
import memberlsit from '../../../assets/list.svg';
import calendar from '../../../assets/calendar.svg';
import chat from '../../../assets/chat.svg';
import my from '../../../assets/my.svg';
import clickmemberlsit from '../../../assets/clicklist.svg';
import clickcalendar from '../../../assets/clickcalendar.svg';
import clickchat from '../../../assets/clickchat.svg';
import clickmy from '../../../assets/clickmy.svg';


function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation(); 

    const handleIconClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="fixed w-full max-w-[var(--max-width)] h-14 lg:h-16 border border-t-custom-softgrey flex items-center bottom-0 bg-white">
            <div className="flex items-center justify-between w-full ml-10 mr-10">
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/member')}>
                    <img 
                        src={location.pathname.includes('/member') ? clickmemberlsit : memberlsit} 
                        alt="회원" 
                        className={"w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"} 
                    />
                    <span className={location.pathname.includes('/member') ? 'text-sm md:text-md lg:text-base text-custom-indigo' : 'text-sm md:text-md lg:text-base text-custom-softgrey'}>회원</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/calendar')}>
                    <img 
                        src={location.pathname === '/calendar' ? clickcalendar : calendar} 
                        alt="캘린더" 
                        className={"w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"} 
                    />
                    <span className={location.pathname === '/calendar' ? 'text-sm md:text-md lg:text-base text-custom-indigo' : 'text-sm md:text-md lg:text-base text-custom-softgrey'}>캘린더</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/chat')}>
                    <img 
                        src={location.pathname === '/chat' ? clickchat : chat} 
                        alt="채팅" 
                        className={"w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"} 
                    />
                    <span className={location.pathname === '/chat' ? 'text-sm md:text-md lg:text-base text-custom-indigo' : 'text-sm md:text-md lg:text-base text-custom-softgrey'}>채팅</span>
                </div>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => handleIconClick('/my')}>
                    <img 
                        src={location.pathname.includes('/my') ? clickmy : my} 
                        alt="마이" 
                        className={"w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"} 
                    />
                    <span className={location.pathname.includes('/my') ? 'text-sm md:text-md lg:text-base text-custom-indigo' : 'text-sm md:text-md lg:text-base text-custom-softgrey'}>마이</span>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;

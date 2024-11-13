import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import SignupPage from './pages/auth/Signup';
import SocialSignupPage from './pages/auth/SocialSignup';
//import PublicLayout from './components/PublicLayout';
import MyPage from './pages/my/Profile';
import SettingPage from "./pages/my/Setting"
import EditPage from './pages/my/Edit';
import MemberListPage from './pages/list/List';
import MemberInfoPage from './pages/member/info/Info';
import DaliyChartListPage from './pages/member/dailychart/DailyChartList';
import DailyChartPage from './pages/member/dailychart/Chart';
import DailyChartEditChartPage from './components/member/DailyChart/EditChart';
import AISummaryListPage from './pages/member/AISummary/SummaryList';
import SummaryPage from './pages/member/AISummary/Summary'
import EditSummaryPage from './components/member/AISummary/EditSummary';
import ChatPage from './pages/chat/Chat';
import CalendarPage from './pages/calendar/Calendar';

function App() {
  return (
    <Router>
      <div className='w-[600px] h-screen mx-auto font-[Pretendard] overflow-y-auto'>
        <div className="h-screen border border-custom-softgrey ">
          <Routes>
            {/* <Route element={<PublicLayout/>}/>   */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/social/sign-up" element={<SocialSignupPage />} />
            
            <Route path="/my" element={<MyPage />} />
            <Route path="/my/setting" element={<SettingPage />} />
            <Route path='/my/edit' element={<EditPage/>} />

            <Route path='/member' element={<MemberListPage/>} />

            <Route path='/member/info/:memberid' element={<MemberInfoPage/>} />
            <Route path='/member/daily' element={<DaliyChartListPage/>} />
            <Route path='/member/daily/:memberid' element={<DailyChartPage/>} />
            <Route path='/member/daily/edit' element={<DailyChartEditChartPage/>} />
            <Route path='/member/summary' element={<AISummaryListPage/>} />
            <Route path='/member/summary/:memberid' element={<SummaryPage/>} />
            <Route path='/member/summary/edit' element={<EditSummaryPage/>} />

            <Route path='/calendar' element={<CalendarPage/>} />
            
            <Route path='/chat' element={<ChatPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


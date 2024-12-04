import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MemberProvider } from './context/MemberContext';
import MainPage from './pages/main/Main';
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
import AddDailyChartPage from './components/member/DailyChart/AddChart';
import EditDailyChartPage from './components/member/DailyChart/EditChart';
import AISummaryListPage from './pages/member/AISummary/SummaryList';
import SummaryPage from './pages/member/AISummary/Summary'
import EditSummaryPage from './components/member/AISummary/EditSummary';
import ChatPage from './pages/chat/Chat';
import CalendarPage from './pages/calendar/Calendar';
import VoicePage from './pages/voice/Voice';

function App() {
  return (
    <MemberProvider>
      <Router>
        <div className='w-[600px] h-screen mx-auto font-[Pretendard] overflow-y-auto'>
          <div className="h-screen border border-custom-softgrey ">
            <Routes>
              {/* <Route element={<PublicLayout/>}/>   */}
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/social/sign-up" element={<SocialSignupPage />} />
              
              <Route path="/my" element={<MyPage />} />
              <Route path="/my/setting" element={<SettingPage />} />
              <Route path='/my/edit' element={<EditPage/>} />

              <Route path='/member' element={<MemberListPage/>} />
              <Route path='/member/info/:listid' element={<MemberInfoPage/>} />
              
              <Route path='/member/chart/:memberid' element={<DaliyChartListPage/>} />
              <Route path='/member/chart/detail/:chartid' element={<DailyChartPage/>} />
              <Route path='/member/chart/detail' element={<AddDailyChartPage/>} />
              <Route path='/member/chart/edit/:chartid' element={<EditDailyChartPage/>} />
              
              <Route path='/member/summary/:memberid' element={<AISummaryListPage/>} />
              <Route path='/member/summary/:memberid/:summaryid' element={<SummaryPage/>} />
              <Route path='/member/summary/:summaryid/edit' element={<EditSummaryPage/>} />

              <Route path='/member/voice' element={<VoicePage/>} />

              <Route path='/calendar' element={<CalendarPage/>} />
              
              <Route path='/chat' element={<ChatPage/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </MemberProvider>
  );
}

export default App;


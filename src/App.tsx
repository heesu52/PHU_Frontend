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
import MemberInfoPage from './pages/member/Info';
import MemberDaliyChartListPage from './pages/member/dailychart/DailyChartList';
import MemberDailyChartPage from './pages/member/dailychart/Chart';
import MemberSummaryPage from './pages/member/AISummary';

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

            <Route path='/member/info' element={<MemberInfoPage/>} />
            <Route path='/member/daily' element={<MemberDaliyChartListPage/>} />
            <Route path='/member/daily/:id' element={<MemberDailyChartPage/>} />
            <Route path='/member/summary' element={<MemberSummaryPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


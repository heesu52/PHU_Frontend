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
import MemberDaliyChartPage from './pages/member/DailyChart';
import MemberSummaryPage from './pages/member/AISummary';

function App() {
  return (
    <Router>
      <div className='w-[600px] h-screen mx-auto font-[Pretendard]'>
        <div className="h-full border border-custom-softgrey">
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
            <Route path='/member/chart' element={<MemberDaliyChartPage/>} />
            <Route path='/member/summary' element={<MemberSummaryPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


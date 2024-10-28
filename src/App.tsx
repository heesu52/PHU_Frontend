import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import SignupPage from './pages/auth/Signup';
import SocialSignupPage from './pages/auth/SocialSignup';
//import PublicLayout from './components/PublicLayout';
import MyPage from './pages/my/Profile';
import SettingPage from "./pages/my/Setting"
import EditPage from './pages/my/Edit';
import MemberListPage from './components/list/MemberList';

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

            <Route path='/list' element={<MemberListPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


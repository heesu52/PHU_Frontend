import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/main/Main";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import SocialSignupPage from "./pages/auth/SocialSignup";
import MyPage from "./pages/my/Profile";
import SettingPage from "./pages/my/Setting";
import EditPage from "./pages/my/Edit";
import MemberListPage from "./pages/list/List";
import MemberInfoPage from "./pages/member/info/Info";
import DaliyChartListPage from "./pages/member/dailychart/DailyChartList";
import DailyChartPage from "./pages/member/dailychart/Chart";
import AddDailyChartPage from "./components/member/DailyChart/AddChart";
import EditDailyChartPage from "./components/member/DailyChart/EditChart";
import AISummationListPage from "./pages/member/Summation/AISummation";
import SummationPage from "./pages/member/Summation/Summation";
import EditSummationPage from "./components/member/AISummation/EditSummation";
import ChatPage from "./pages/chat/Chat";
import CalendarPage from "./pages/calendar/Calendar";
import VoicePage from "./pages/voice/Voice";
import Toast from "./components/common/ToastMessage/ToastMessageItem"; // Toast 컴포넌트 import

function App() {
  return (
    <Router>
      <div className="container">
        <div className="h-screen border border-custom-softgrey ">
          {/* ToastContainer를 한 번만 추가 */}
          <Toast />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/social/sign-up" element={<SocialSignupPage />} />

            <Route path="/my" element={<MyPage />} />
            <Route path="/my/setting" element={<SettingPage />} />
            <Route path="/my/edit" element={<EditPage />} />

            <Route path="/member" element={<MemberListPage />} />
            <Route path="/member/info/:listid" element={<MemberInfoPage />} />

            <Route path="/member/chart/:memberid" element={<DaliyChartListPage />}/>
            <Route path="/member/chart/detail/:chartid" element={<DailyChartPage />}/>
            <Route path="/member/chart/detail" element={<AddDailyChartPage />}/>
            <Route path="/member/chart/edit/:chartid" element={<EditDailyChartPage />}/>

            <Route path="/member/summation/:memberid" element={<AISummationListPage />}/>
            <Route path="/member/summation/file/:fileid" element={<SummationPage />}/>
            <Route path="/member/summation/edit/:fileid" element={<EditSummationPage />}/>

            <Route path="/member/voice/:memberid" element={<VoicePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

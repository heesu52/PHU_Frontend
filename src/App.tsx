import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import SocialSignup from './pages/auth/SocialSignup';
import PublicLayout from './components/auth/PublicLayout';

function App() {
  return (
    <Router>
      <div className='w-[600px] h-screen mx-auto font-[Pretendard]'>
        <div className="h-full border border-custom-softgrey">
          <Routes>
            <Route element={<PublicLayout/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/social/sign-up" element={<SocialSignup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

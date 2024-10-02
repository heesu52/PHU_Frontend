import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SocialSignup from './pages/SocialSignup';

function App() {
  return (
    <Router>
      <div className='w-[600px] h-screen mx-auto font-[Pretendard]'>
        <div className="h-full border border-custom-softgrey">
          <Routes>
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

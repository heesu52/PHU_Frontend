import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <div className='w-[600px] h-screen mx-auto font-[Pretendard]'>
        <div className="h-full border border-custom-softgrey">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/social/sign-up" element={<SignUpPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

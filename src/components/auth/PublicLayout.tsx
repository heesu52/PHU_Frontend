import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Outlet 임포트
import axiosInstance from '../../store/api/auth/axiosInstance';

const PublicLayout: React.FC = () => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await axiosInstance.get('/member'); 
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div>
      <h1>Welcome to Public Layout</h1>
      {/* Outlet 추가 */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;

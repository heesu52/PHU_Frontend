import axios from 'axios';
import { RefreshTokenApi } from './LoginApi'; 

const apiUrl = "https://fitee.site"; // 실제 API URL로 변경

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // 쿠키와 함께 요청
});

//요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Interceptor start", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config; // 원래 요청 정보

    // 코드가 J001일 경우 리프레시 토큰 요청
    if (error.response && error.response.data.code === 'J001') {
      try {
        // 리프레시 토큰 요청
        const refreshResponse = await RefreshTokenApi();

        if (refreshResponse?.success) {
          localStorage.removeItem('token');
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // 리프레시 토큰 요청 실패 시 로그인 페이지로 리디렉션
        window.alert("로그인 토큰이 만료되었습니다. 로그인 페이지로 이동합니다.")
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';
import { RefreshTokenApi } from './LoginApi'; // 리프레시 토큰 발급 API 경로

const apiUrl = "https://fitee.site"; // 실제 API URL로 변경

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `${localStorage.getItem('token')}`, // 기존 액세스 토큰
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Interceptor start", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (응답이 올 때)
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // 정상 응답 처리
  },
  async (error) => {
    const originalRequest = error.config; // 원래 요청 정보

    // 오류 코드가 'J001'인 경우 (액세스 토큰 만료)
    if (error.response && error.response.data.code === 'J001') {
      window.alert("로그인 토큰 만료");
      try {
        const refreshResponse = await RefreshTokenApi();

        if (refreshResponse?.success) {
          const newToken = localStorage.getItem('token'); 
          originalRequest.headers['Authorization'] = newToken;

          // 새 토큰을 사용하여 원래 요청을 다시 보내는 부분
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        window.alert("로그인 토큰이 만료되었습니다. 로그인 페이지로 이동합니다.");
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 다른 오류는 그대로 처리
  }
);

export default axiosInstance;

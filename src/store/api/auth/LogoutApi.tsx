import axios from "axios";
import { useApiUrlStore } from "../../store";

// API URL을 가져오는 변수
const apiUrl = useApiUrlStore.getState().apiUrl; 


//로그아웃 api
export const LogoutApi = async () => {
    try {
        const response = await axios.post(`${apiUrl}/logout`, {
        });
        if (response.status === 200) {
            localStorage.removeItem('token');
            window.alert("로그아웃 되었습니다.")
        }
    } catch (error) {
        console.error(error);
    }
};

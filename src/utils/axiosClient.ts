import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import { persistor, store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import type { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

// Khởi tạo axiosClient
const axiosClient = axios.create({
    baseURL: 'http://localhost:3052/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params),
});


// Thêm interceptor cho request
// Interceptor để thêm accessToken vào header
axiosClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Interceptor để xử lý lỗi 401 và làm mới token
axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/refresh-token')) {
            originalRequest._retry = true;
            try {
                const response = await axiosClient.post('/auth/refresh-token');
                const newAccessToken = response.data.metadata.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // Nếu làm mới token thất bại, xóa token và yêu cầu đăng nhập lại
                try {
                    await axiosClient.post('/auth/logout', {
                        userId: useSelector((state: RootState) => state.auth.user?.userId)
                    });
                } catch (logoutError) {
                    console.error('Lỗi khi logout:', logoutError);
                }
                // localStorage.removeItem('accessToken');
                // store.dispatch(logout());
                // persistor.purge();
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default axiosClient;
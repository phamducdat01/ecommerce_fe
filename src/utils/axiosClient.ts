import axios, { InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';

// Khởi tạo axiosClient
const axiosClient = axios.create({
    baseURL: 'https://your-api-url.com',
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

// Hàm lấy token (giả lập, thay bằng logic thực tế của bạn)
async function getToken(): Promise<string | null> {
    // Ví dụ: Lấy token từ localStorage hoặc API
    return new Promise((resolve) => {
        setTimeout(() => resolve('your-token-here'), 1000);
    });
}

// Thêm interceptor cho request
axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        try {
            const accesstoken = await getToken();
            if (accesstoken) {
                config.headers.Authorization = `Bearer ${accesstoken}`;
            }
            // Giữ nguyên các header khác
            config.headers.Accept = 'application/json';
            return config;
        } catch (error) {
            console.error('Lỗi khi lấy token:', error);
            return Promise.reject(error);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor để xử lý lỗi 401 và làm mới token
// api.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         const originalRequest = error.config as any;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const refreshTokenValue = localStorage.getItem('refreshToken');
//                 if (!refreshTokenValue) {
//                     throw new Error('No refresh token available');
//                 }
//                 const response = await api.post('/auth/refresh-token', { refreshToken: refreshTokenValue });
//                 const newAccessToken = response.data.metadata.accessToken;
//                 localStorage.setItem('accessToken', newAccessToken);
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // Nếu làm mới token thất bại, xóa token và yêu cầu đăng nhập lại
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );


export default axiosClient;
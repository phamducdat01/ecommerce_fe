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

export default axiosClient;
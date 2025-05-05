import axiosClient from '../utils/axiosClient'

const api = axiosClient;

export const signup = async (data: { name: string; email: string; password: string; phone?: string; address?: string; role?: 'customer' | 'admin' }) => {
    const response = await api.post('/auth/sign-up', data);
    return response.data;
};

// API đăng nhập
export const login = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// API làm mới token
export const refreshToken = async () => {
    const response = await api.post('/auth/refresh-token');
    return response.data;
};

// API đăng xuất
export const logout = async (userId: string) => {
    const response = await api.post('/auth/logout', { userId });
    return response.data;
};

// API quên mật khẩu
export const forgotPassword = async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

// API đặt lại mật khẩu
export const resetPassword = async (data: { resetToken: string; newPassword: string }) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
};
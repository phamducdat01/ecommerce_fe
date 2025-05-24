import axiosClient from '../utils/axiosClient';

const api = axiosClient;

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: 'customer' | 'admin';
    createdAt?: string;
    updatedAt?: string;
}

// Tạo người dùng mới
export const createUser = async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role?: 'customer' | 'admin';
}) => {
    const response = await api.post('/users', data);
    return response.data.metadata as IUser;
};

// Lấy danh sách người dùng
export const getAllUsers = async () => {
    const response = await api.get('/users');
    return response.data as IUser[];
};

// Lấy người dùng theo ID
export const getUserById = async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data.metadata as IUser;
};

export type DataUser = Partial<{
    name: string;
    email: string;
    phone?: string;
    address?: string;
}>;


// Cập nhật người dùng
export const updateUser = async (userId: string, data: DataUser) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data as IUser;
};

// Xóa người dùng
export const deleteUser = async (userId: string) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};

import axiosClient from '../utils/axiosClient';

const api = axiosClient;

// Định nghĩa giao diện cho dữ liệu mục giỏ hàng
interface CartItemData {
    userId: string;
    productId: string;
    quantity: number;
}

interface UpdateCartItemData {
    quantity?: number;
    productId?: string;
}

// Tạo mục giỏ hàng mới
export const createCartItem = async (data: CartItemData) => {
    const response = await api.post('/cart', data);
    return response.data;
};

// Lấy danh sách tất cả mục giỏ hàng
export const getAllCartItems = async () => {
    const response = await api.get('/cart');
    return response.data;
};

// Lấy mục giỏ hàng theo ID
export const getCartItemById = async (cartItemId: string) => {
    const response = await api.get(`/cart/${cartItemId}`);
    return response.data;
};

// Lấy danh sách mục giỏ hàng theo userId
export const getCartItemsByUserId = async (userId: string) => {
    const response = await api.get(`/cart/user/${userId}`);
    return response.data;
};

// Cập nhật mục giỏ hàng
export const updateCartItem = async (cartItemId: string, data: UpdateCartItemData) => {
    const response = await api.put(`/cart/${cartItemId}`, data);
    return response.data;
};

// Xóa mục giỏ hàng
export const deleteCartItem = async (cartItemId: string) => {
    const response = await api.delete(`/cart/${cartItemId}`);
    return response.data;
};
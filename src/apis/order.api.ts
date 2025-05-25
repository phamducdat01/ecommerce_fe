import axiosClient from '../utils/axiosClient';

const api = axiosClient;

// Định nghĩa giao diện cho mục đơn hàng
interface OrderItemData {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

// Định nghĩa giao diện cho dữ liệu đơn hàng
interface OrderData {
    userId: string;
    shippingAddress: string;
    items: OrderItemData[];
    paymentMethod: 'cash' | 'bank_transfer';
}

// Định nghĩa giao diện cho cập nhật đơn hàng
interface UpdateOrderData {
    status?: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
    shippingAddress?: string;
    paymentMethod?: 'cash' | 'bank_transfer';
}

// Tạo đơn hàng mới
export const createOrder = async (data: OrderData) => {
    const response = await api.post('/orders', data);
    return response.data;
};

// Lấy danh sách tất cả đơn hàng
export const getAllOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

// Lấy đơn hàng theo ID
export const getOrderById = async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

// Lấy danh sách đơn hàng theo userId
export const getOrdersByUserId = async (userId: string) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
};

// Cập nhật đơn hàng
export const updateOrder = async (orderId: string, data: UpdateOrderData) => {
    const response = await api.put(`/orders/${orderId}`, data);
    return response.data;
};

// Xóa đơn hàng
export const deleteOrder = async (orderId: string) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
};
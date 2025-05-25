import axiosClient from '../utils/axiosClient';

const api = axiosClient;

// Định nghĩa giao diện cho dữ liệu đánh giá
interface ReviewData {
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
}

// Định nghĩa giao diện cho cập nhật đánh giá
interface UpdateReviewData {
    rating?: number;
    comment?: string;
}

// Tạo đánh giá mới
export const createReview = async (data: ReviewData) => {
    const response = await api.post('/reviews', data);
    return response.data;
};

// Lấy danh sách tất cả đánh giá
export const getAllReviews = async () => {
    const response = await api.get('/reviews');
    return response.data;
};

// Lấy đánh giá theo ID
export const getReviewById = async (reviewId: string) => {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
};

// Lấy danh sách đánh giá theo productId
export const getReviewsByProductId = async (productId: string) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
};

// Cập nhật đánh giá
export const updateReview = async (reviewId: string, data: UpdateReviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, data);
    return response.data;
};

// Xóa đánh giá
export const deleteReview = async (reviewId: string) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
};
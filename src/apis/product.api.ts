import axiosClient from '../utils/axiosClient'

const api = axiosClient;

// Product APIs
export const getAllProducts = async (params?: { category?: string; page?: number }) => {
    const response = await api.get('/products', { params });
    return response.data;
};

export const getProductBySlug = async (slug: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
};

export const createProduct = async (data: { name: string; description: string; price: number; stock: number; categoryId: string; type?: string; thumbnail?: string; images?: string[] }) => {
    const response = await api.post('/products', data);
    return response.data;
};

export const updateProduct = async (slug: string, data: Partial<{ name: string; description: string; price: number; stock: number; categoryId: string; type?: string; thumbnail?: string; images?: string[] }>) => {
    const response = await api.put(`/products/${slug}`, data);
    return response.data;
};

export const deleteProduct = async (slug: string) => {
    const response = await api.delete(`/products/${slug}`);
    return response.data;
};
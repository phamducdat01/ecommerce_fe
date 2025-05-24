import axiosClient from '../utils/axiosClient';

const api = axiosClient;

export const getAllCategories = async () => {
    const response = await api.get('/categories');
    return response.data; // giả sử trả về mảng Category[]
};

export const getCategoryBySlug = async (slug: string) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data; // trả về 1 Category
};

export const createCategory = async (data: {
    name: string;
    slug: string;
    parentId?: string | null;
}) => {
    const response = await api.post('/categories', data);
    return response.data;
};

export const updateCategory = async (
    slug: string,
    data: Partial<{ name: string; slug: string; parentId?: string | null }>
) => {
    const response = await api.put(`/categories/${slug}`, data);
    return response.data;
};

export const deleteCategory = async (slug: string) => {
    const response = await api.delete(`/categories/${slug}`);
    return response.data;
};

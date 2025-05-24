import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
    Checkbox,
    Col,
    Layout,
    Pagination,
    Row,
    Spin
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllCategories } from '../../apis/category.api';
import { getAllProducts } from '../../apis/product.api';
import ProductCard from '../../components/CartItem';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    thumbnail: string;
    images: string[];
    createdAt?: string; // hoặc Date nếu bạn xử lý chuỗi thành Date
    updatedAt?: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    parentId?: string | null;
    createdAt?: string;
}

const { Sider, Content } = Layout;

const pageSize = 10;

const HomePage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [products, setProducts] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const pageParam = parseInt(searchParams.get('page') || '1', 10);

        setSelectedCategory(categoryParam || '');
        setCurrentPage(pageParam);
    }, [searchParams]);

    const {
        data: categories,
        isLoading: isCategoryLoading,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
    });

    const { data, isLoading, isPlaceholderData } = useQuery({
        queryKey: ['products', selectedCategory, currentPage] as const,
        queryFn: () => getAllProducts({ category: selectedCategory, page: currentPage }),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (data) {
            setProducts(data.metadata.products);
            setTotal(data.metadata.total);
        }
    }, [data, selectedCategory, currentPage]);

    const updateURL = (category: string | null, page: number) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (page > 1) params.append('page', String(page));
        setSearchParams(params);
    };

    const handleCategoryChange = (slug: string) => {
        const newCategory = slug === selectedCategory ? '' : slug;
        setSelectedCategory(newCategory);
        setCurrentPage(1);
        updateURL(newCategory, 1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateURL(selectedCategory, page);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} style={{ background: '#fff', padding: '20px' }}>
                <h2>Lọc theo danh mục</h2>
                {isCategoryLoading ? (
                    <Spin />
                ) : (
                    categories?.metadata.map((category: Category) => (
                        <Checkbox
                            key={category.slug}
                            checked={selectedCategory === category.slug}
                            onChange={() => handleCategoryChange(category.slug)}
                        >
                            {category.name}
                        </Checkbox>
                    ))
                )}
            </Sider>
            <Layout style={{ padding: '0 20px' }}>
                <Content style={{ padding: '20px' }}>
                    {isLoading && !isPlaceholderData ? (
                        <Spin size="large" />
                    ) : (
                        <>
                            <Row gutter={[16, 16]}>
                                {products.map((product) => (
                                    <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                                        <ProductCard
                                            product={product}
                                            onAddToCart={() => { }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={total}
                                onChange={handlePageChange}
                                style={{ marginTop: 20, textAlign: 'center' }}
                            />
                        </>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomePage;

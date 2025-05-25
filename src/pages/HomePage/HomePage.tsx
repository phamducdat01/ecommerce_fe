import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Checkbox, Col, Layout, Pagination, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllCategories } from '../../apis/category.api';
import { getAllProducts } from '../../apis/product.api';
import ProductCard from '../../components/ProductCard';

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
    createdAt?: string;
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
const { Title } = Typography;

const pageSize = 12; // Tăng số sản phẩm mỗi trang để hiển thị nhiều hơn

// Styled Components
const PageLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const StyledSider = styled(Sider)`
  background: #ffffff;
  padding: 24px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 12px 12px 0;
  overflow-y: auto;
  height: 100vh;
  position: sticky;
  top: 0;

  @media (max-width: 768px) {
    border-radius: 0;
    padding: 16px;
    height: auto;
    position: relative;
  }
`;

const CategoryTitle = styled(Title)`
  font-size: 18px;
  color: #2d3748;
  margin-bottom: 16px;
`;

const CategoryCheckbox = styled(Checkbox)`
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  color: #4a5568;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1890ff;
    border-color: #1890ff;
  }

  &:hover {
    color: #1890ff;
  }
`;

const StyledContent = styled(Content)`
  padding: 24px;
  background: transparent;

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const ProductRow = styled(Row)`
  margin-bottom: 24px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const HomePage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const pageParam = parseInt(searchParams.get('page') || '1', 10);

        setSelectedCategory(categoryParam || '');
        setCurrentPage(pageParam);
    }, [searchParams]);

    const { data: categories, isLoading: isCategoryLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
        staleTime: 5 * 60 * 1000,
    });

    const { data, isLoading, isPlaceholderData } = useQuery({
        queryKey: ['products', selectedCategory, currentPage] as const,
        queryFn: () => getAllProducts({ category: selectedCategory, page: currentPage }),
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000,
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
        <PageLayout>
            <StyledSider
                width={250}
                breakpoint="md"
                collapsedWidth={0}
                trigger={null}
            >
                <CategoryTitle level={4}>Danh mục sản phẩm</CategoryTitle>
                {isCategoryLoading ? (
                    <LoadingContainer>
                        <Spin />
                    </LoadingContainer>
                ) : (
                    <div>
                        {categories?.metadata.map((category: Category) => (
                            <CategoryCheckbox
                                key={category.slug}
                                checked={selectedCategory === category.slug}
                                onChange={() => handleCategoryChange(category.slug)}
                            >
                                {category.name}
                            </CategoryCheckbox>
                        ))}
                    </div>
                )}
            </StyledSider>
            <Layout>
                <StyledContent>
                    {isLoading && !isPlaceholderData ? (
                        <LoadingContainer>
                            <Spin size="large" />
                        </LoadingContainer>
                    ) : (
                        <>
                            <ProductRow gutter={[16, 16]}>
                                {products.map((product) => (
                                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product._id}>
                                        <ProductCard product={product} onAddToCart={() => { }} />
                                    </Col>
                                ))}
                            </ProductRow>
                            <PaginationContainer>
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={total}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                    responsive
                                />
                            </PaginationContainer>
                        </>
                    )}
                </StyledContent>
            </Layout>
        </PageLayout>
    );
};

export default HomePage;
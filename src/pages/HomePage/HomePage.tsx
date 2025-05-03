import {
    Button,
    Card,
    Checkbox,
    Col,
    Layout,
    Row,
    Pagination,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const { Sider, Content } = Layout;

const products = [
    { id: 1, name: 'Product 1', type: 'electronics', price: '$100' },
    { id: 2, name: 'Product 2', type: 'clothing', price: '$50' },
    { id: 3, name: 'Product 3', type: 'electronics', price: '$200' },
    { id: 4, name: 'Product 4', type: 'furniture', price: '$150' },
    { id: 5, name: 'Product 5', type: 'clothing', price: '$30' },
    { id: 6, name: 'Product 6', type: 'furniture', price: '$250' },
    { id: 7, name: 'Product 7', type: 'electronics', price: '$120' },
    { id: 8, name: 'Product 8', type: 'clothing', price: '$40' },
    { id: 9, name: 'Product 9', type: 'furniture', price: '$300' },
];

const productTypes = ['electronics', 'clothing', 'furniture'];

const pageSize = 6;

const HomePage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        // ✅ đọc params từ URL khi vào trang
        const typesParam = searchParams.get('types');
        const pageParam = searchParams.get('page');

        if (typesParam) {
            setSelectedTypes(typesParam.split(','));
        }

        if (pageParam) {
            const pageNum = parseInt(pageParam, 10);
            if (!isNaN(pageNum)) {
                setCurrentPage(pageNum);
            }
        }
    }, [searchParams]);

    const updateURL = (types: string[], page: number) => {
        const params = new URLSearchParams();
        if (types.length > 0) params.append('types', types.join(','));
        if (page > 1) params.append('page', String(page));
        setSearchParams(params);
    };

    const handleTypeChange = (type: string) => {
        let updatedTypes: string[];

        setSelectedTypes((prev) => {
            updatedTypes = prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type];
            updateURL(updatedTypes, 1); // reset về trang 1 khi filter
            return updatedTypes;
        });

        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateURL(selectedTypes, page);
    };

    const filteredProducts = products.filter((product) =>
        selectedTypes.length === 0
            ? true
            : selectedTypes.includes(product.type)
    );

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} style={{ background: '#fff', padding: '20px' }}>
                <h2>Filter by Type</h2>
                {productTypes.map((type) => (
                    <Checkbox
                        key={type}
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                    >
                        {type}
                    </Checkbox>
                ))}
            </Sider>
            <Layout style={{ padding: '0 20px' }}>
                <Content style={{ padding: '20px' }}>
                    <Row gutter={[16, 16]}>
                        {paginatedProducts.map((product) => (
                            <Col span={8} key={product.id}>
                                <Card
                                    title={product.name}
                                    extra={
                                        <Button type="primary">Add to Cart</Button>
                                    }
                                    bordered={false}
                                    style={{ width: '100%' }}
                                >
                                    <p>Price: {product.price}</p>
                                    <p>Type: {product.type}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={filteredProducts.length}
                        onChange={handlePageChange}
                        style={{ marginTop: 20, textAlign: 'center' }}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomePage;

import { Button, Card, Checkbox, Col, Layout, Row } from 'antd';
import React, { useState } from 'react';

const { Sider, Content } = Layout;

const products = [
    { id: 1, name: 'Product 1', type: 'electronics', price: '$100' },
    { id: 2, name: 'Product 2', type: 'clothing', price: '$50' },
    { id: 3, name: 'Product 3', type: 'electronics', price: '$200' },
    { id: 4, name: 'Product 4', type: 'furniture', price: '$150' },
    { id: 5, name: 'Product 5', type: 'clothing', price: '$30' },
];

const productTypes = ['electronics', 'clothing', 'furniture'];

const HomePage: React.FC = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const handleTypeChange = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
        );
    };

    const filteredProducts = products.filter((product) =>
        selectedTypes.length === 0 ? true : selectedTypes.includes(product.type)
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
                        {filteredProducts.map((product) => (
                            <Col span={8} key={product.id}>
                                <Card
                                    title={product.name}
                                    extra={<Button type="primary">Add to Cart</Button>}
                                    bordered={false}
                                    style={{ width: '100%' }}
                                >
                                    <p>Price: {product.price}</p>
                                    <p>Type: {product.type}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomePage;

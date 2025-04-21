// src/pages/HomePage.tsx
import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

// Mock data cho sản phẩm
const products = [
    { id: 1, title: 'Sản phẩm 1', imageUrl: 'https://via.placeholder.com/150', price: 200 },
    { id: 2, title: 'Sản phẩm 2', imageUrl: 'https://via.placeholder.com/150', price: 250 },
    { id: 3, title: 'Sản phẩm 3', imageUrl: 'https://via.placeholder.com/150', price: 150 },
    { id: 4, title: 'Sản phẩm 4', imageUrl: 'https://via.placeholder.com/150', price: 300 },
    { id: 5, title: 'Sản phẩm 5', imageUrl: 'https://via.placeholder.com/150', price: 180 },
    { id: 6, title: 'Sản phẩm 6', imageUrl: 'https://via.placeholder.com/150', price: 220 },
];

const { Meta } = Card;

const HomePage: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Danh sách Sản phẩm</h1>
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col span={8} key={product.id}>
                        <Card
                            hoverable
                            cover={<img alt={product.title} src={product.imageUrl} />}
                        >
                            <Meta title={product.title} description={`Giá: ${product.price} VND`} />
                            <Button
                                type="primary"
                                icon={<ShoppingCartOutlined />}
                                style={{ marginTop: 10 }}
                                onClick={() => console.log(`Thêm ${product.title} vào giỏ hàng`)}
                            >
                                Thêm vào giỏ
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
export default HomePage;

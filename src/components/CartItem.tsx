import React from 'react';
import { Card, Button, Image } from 'antd';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <Card
            title={product.name}
            extra={
                <Button type="primary" onClick={() => onAddToCart?.(product)}>
                    Add to Cart
                </Button>
            }
            bordered={false}
            style={{ width: '100%' }}
        >
            <Image
                src={product.thumbnail}
                alt={product.name}
                width="100%"
                style={{ marginBottom: 16, borderRadius: 8 }}
                preview={false}
            />
            <p><strong>Price:</strong> {product.price.toLocaleString('vi-VN')}₫</p>
            {/* <p><strong>Description:</strong> {product.description}</p> */}
        </Card>
    );
};

export default ProductCard;

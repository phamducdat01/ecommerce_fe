import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Image, Row, Typography, Space } from 'antd';
import styled from 'styled-components';
import { ShoppingCartOutlined } from '@ant-design/icons';

// Interface từ model
export interface IProduct {
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

export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    parentId?: string | null;
    createdAt?: string;
}

// Dữ liệu giả (mock data) 

const largeImages = [
    'https://placehold.co/400x400?text=Image1',
    'https://placehold.co/400x400?text=Image2',
    'https://placehold.co/400x400?text=Image3'
];

const mockProduct: IProduct = {
    _id: 'prod1',
    name: 'Tai nghe không dây cao cấp',
    slug: 'tai-nghe-khong-day-cao-cap',
    description: 'Tai nghe không dây với công nghệ khử tiếng ồn tiên tiến, âm thanh chất lượng cao, thời lượng pin lên đến 20 giờ.',
    price: 99.99,
    stock: 15,
    categoryId: 'cat1',
    thumbnail: 'https://placehold.co/400x400?text=Thumbnail',
    images: [
        'https://placehold.co/80x80?text=Image1',
        'https://placehold.co/80x80?text=Image2',
        'https://placehold.co/80x80?text=Image3',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

const mockCategory: ICategory = {
    _id: 'cat1',
    name: 'Điện tử',
    slug: 'dien-tu',
    createdAt: new Date().toISOString(),
};

const { Title, Text } = Typography;

// Styled Components
const PageContainer = styled.div`
  padding: 24px;
  background-color: #f0f2f5;
  min-height: 100vh;

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const ProductCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: #ffffff;

  .ant-card-body {
    padding: 24px;
  }

  @media (max-width: 576px) {
    .ant-card-body {
      padding: 16px;
    }
  }
`;

const ThumbnailImage = styled(Image)`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 576px) {
    height: 200px;
  }
`;

const GalleryImage = styled(Image)`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 576px) {
    width: 60px;
    height: 60px;
  }
`;

const ProductTitle = styled(Title)`
  color: #2d3748;
  margin-bottom: 16px;
`;

const ProductPrice = styled(Text)`
  font-size: 24px;
  color: #1890ff;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ProductInfo = styled(Text)`
  font-size: 16px;
  color: #4a5568;
  display: block;
  margin-bottom: 8px;
`;

const AddToCartButton = styled(Button)`
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 16px;
  height: auto;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>(); // Lấy productId từ URL
    const [selectedImage, setSelectedImage] = useState<string>('');

    // Sử dụng dữ liệu giả thay vì gọi API
    const product = mockProduct;
    const category = mockCategory;

    // Cập nhật ảnh chính khi sản phẩm được tải
    useEffect(() => {
        setSelectedImage(product.thumbnail || product.images[0] || '');
    }, [product]);

    // Kiểm tra productId giả lập
    if (!productId || productId !== product._id) {
        return (
            <PageContainer>
                <Text type="danger">Không tìm thấy sản phẩm.</Text>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ProductCard variant="outlined">
                <Row gutter={[24, 24]}>
                    {/* Hình ảnh sản phẩm */}
                    <Col xs={24} md={12}>
                        <ThumbnailImage src={selectedImage} alt={product.name} />
                        <Space size={8} style={{ marginTop: 16, flexWrap: 'wrap' }}>
                            {product.images.map((image, index) => (
                                <GalleryImage
                                    key={index}
                                    src={image}
                                    preview={false}
                                    onClick={() => setSelectedImage(largeImages[index])}
                                />
                            ))}
                            {product.thumbnail && (
                                <GalleryImage
                                    src="https://placehold.co/80x80?text=Thumbnail"
                                    preview={false}
                                    onClick={() => setSelectedImage(product.thumbnail)}
                                />
                            )}
                        </Space>
                    </Col>

                    {/* Thông tin sản phẩm */}
                    <Col xs={24} md={12}>
                        <ProductTitle level={2}>{product.name}</ProductTitle>
                        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                        <ProductInfo>
                            <strong>Danh mục:</strong> {category.name}
                        </ProductInfo>
                        <ProductInfo>
                            <strong>Tồn kho:</strong> {product.stock} sản phẩm
                        </ProductInfo>
                        <ProductInfo>
                            <strong>Mô tả:</strong> {product.description}
                        </ProductInfo>
                        <AddToCartButton
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => alert('Đã thêm vào giỏ hàng!')} // Placeholder action
                            disabled={product.stock === 0}
                        >
                            Thêm vào giỏ hàng
                        </AddToCartButton>
                    </Col>
                </Row>
            </ProductCard>
        </PageContainer>
    );
};

export default ProductDetailPage;
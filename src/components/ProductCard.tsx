import styled from 'styled-components';
import { Card, Button } from 'antd';
import { Product } from '../pages/HomePage/HomePage';

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
}

const StyledProductCard = styled(Card)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .ant-card-cover img {
    height: 200px;
    object-fit: cover;
  }

  .ant-card-body {
    padding: 16px;
  }
`;

const ProductName = styled.h3`
  font-size: 16px;
  color: #2d3748;
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  color: #1890ff;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <StyledProductCard
            cover={<img alt={product.name} src={product.thumbnail} />}
            actions={[
                <Button type="primary" onClick={onAddToCart}>
                    Thêm vào giỏ
                </Button>,
            ]}
        >
            <ProductName>{product.name}</ProductName>
            <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
        </StyledProductCard>
    );
};

export default ProductCard;
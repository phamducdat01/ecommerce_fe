import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Input, Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Header } = Layout;
const { Search } = Input;

// Sử dụng React.ComponentProps để lấy kiểu đúng cho props
const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px #f0f1f2;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const HeaderComponent: React.FC = () => {
    return (
        <StyledHeader>
            <Logo>E-Shop</Logo>
            <Search
                placeholder="Tìm sản phẩm..."
                onSearch={(value) => console.log(value)}
                style={{ width: 400 }}
                ref={null}
            />
            <RightMenu>
                <Badge count={3} offset={[0, 0]}>
                    <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                </Badge>
                <UserOutlined style={{ fontSize: '20px' }} />
            </RightMenu>
        </StyledHeader>
    );
};

export default HeaderComponent;

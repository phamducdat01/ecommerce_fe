// components/FooterComponent.tsx
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Footer } = Layout;

// StyledFooter sử dụng forwardRef để truyền ref vào Footer
const StyledFooter = styled(Footer)`
  text-align: center;
  background-color: #001529;
  color: #fff;
  padding: 24px 50px;
  font-size: 14px;
  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const FooterComponent: React.FC = () => {
    return (
        <StyledFooter>
            <p>© 2025 E-Shop. All rights reserved.</p>
            <p>Powered by React + Ant Design + Styled Components</p>
        </StyledFooter>
    );
};

export default FooterComponent;

import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();  // Sử dụng useNavigate thay vì useHistory

    const handleGoHome = () => {
        navigate('/');  // Dẫn người dùng về trang chủ
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>404 - Page Not Found</h2>
            <Button type="primary" onClick={handleGoHome}>Go to Home</Button>
        </div>
    );
};

export default NotFoundPage;

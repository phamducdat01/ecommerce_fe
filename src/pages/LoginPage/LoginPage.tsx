import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../apis/access.api';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppDispatch } from '../../redux/store';
import { setUser } from '../../redux/slices/authSlice';

const { Title } = Typography;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const LoginCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

interface LoginFormValues {
    email: string;
    password: string;
}

interface AuthResponse {
    message: string;
    metadata: {
        user: { _id: string; name: string; email: string; role: string };
        accessToken: string;
        refreshToken: string;
    };
}


const LoginPage: React.FC = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    // Mutation cho đăng nhập
    const loginMutation = useMutation<AuthResponse, Error, { email: string; password: string }>({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.metadata.accessToken);
            const userData = {
                userId: data.metadata.user._id,
                role: data.metadata.user.role
            }
            dispatch(setUser(userData))
            alert(data.message);
            navigate('/');
        },
        onError: (error) => {
            alert(`Lỗi: ${error.message}`);
        }
    });

    const onFinish = (values: LoginFormValues) => {
        console.log('Login data:', values);

        loginMutation.mutate(values);
    };

    return (
        <LoginWrapper>
            <LoginCard>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 30 }}>
                    Login to Your Account
                </Title>
                <Form
                    name="login_form"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Invalid email format!' },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <StyledButton type="primary" htmlType="submit">
                            Login
                        </StyledButton>
                    </Form.Item>
                </Form>
            </LoginCard>
        </LoginWrapper>
    );
};

export default LoginPage;

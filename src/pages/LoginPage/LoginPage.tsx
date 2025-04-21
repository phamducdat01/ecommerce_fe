import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import styled from 'styled-components';

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

const LoginPage: React.FC = () => {
    const onFinish = (values: LoginFormValues) => {
        console.log('Login data:', values);
        // TODO: Handle authentication logic here
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

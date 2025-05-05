// Trước: SignUpForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { refreshToken, signup } from '../../apis/access.api';
import { useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';
import axiosClient from '../../utils/axiosClient';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
    confirm: string;
}

interface AuthResponse {
    message: string;
    metadata: {
        user: { _id: string; name: string; email: string; role: string };
        accessToken: string;
        refreshToken: string;
    };
}

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    // Mutation cho đăng ký
    const signupMutation = useMutation<AuthResponse, AxiosError<{ message: string }>, { name: string; email: string; password: string }>({
        mutationFn: signup,
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.metadata.accessToken);
            alert(data.message);
            // navigate('/');
        },
        onError: (error) => {
            console.log(error);
            alert(`Lỗi: ${error?.response?.data.message}`);
        }
    });

    // // Mutation cho đăng nhập
    // const loginMutation = useMutation<AuthResponse, Error, { email: string; password: string }>({
    //     mutationFn: login,
    //     onSuccess: (data) => {
    //         localStorage.setItem('accessToken', data.metadata.accessToken);
    //         localStorage.setItem('refreshToken', data.metadata.refreshToken);
    //         setUserId(data.metadata.user._id);
    //         alert(data.message);
    //     },
    //     onError: (error) => {
    //         alert(`Lỗi: ${error.message}`);
    //     }
    // });

    // // Mutation cho đăng xuất
    // const logoutMutation = useMutation<LogoutResponse, Error, string>({
    //     mutationFn: logout,
    //     onSuccess: (data) => {
    //         localStorage.removeItem('accessToken');
    //         localStorage.removeItem('refreshToken');
    //         setUserId('');
    //         alert(data.message);
    //     },
    //     onError: (error) => {
    //         alert(`Lỗi: ${error.message}`);
    //     }
    // });

    // // Mutation cho quên mật khẩu
    // const forgotPasswordMutation = useMutation<ForgotPasswordResponse, Error, string>({
    //     mutationFn: forgotPassword,
    //     onSuccess: (data) => {
    //         alert(`${data.message}. Kiểm tra email để lấy liên kết: ${data.metadata.resetUrl}`);
    //     },
    //     onError: (error) => {
    //         alert(`Lỗi: ${error.message}`);
    //     }
    // });

    // // Mutation cho đặt lại mật khẩu
    // const resetPasswordMutation = useMutation<ResetPasswordResponse, Error, { resetToken: string; newPassword: string }>({
    //     mutationFn: resetPassword,
    //     onSuccess: (data) => {
    //         alert(data.message);
    //     },
    //     onError: (error) => {
    //         alert(`Lỗi: ${error.message}`);
    //     }
    // });

    const onFinish = async (values: SignUpFormValues) => {
        console.log('values', values);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirm: _confirm, ...value } = values;
        // signupMutation.mutate(value);

        const response = await axiosClient.get('/products');
        return response.data;
    };

    return (
        <Wrapper>
            <Card>
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, type: 'string', message: 'Enter a valid email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="passwordHash"
                        rules={[{ required: true, message: 'Enter your password' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirm"
                        dependencies={['passwordHash']}
                        rules={[
                            { required: true, message: 'Confirm your password' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('passwordHash') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Wrapper>
    );
};

export default SignUpPage;


import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
`;

const ResetPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const onFinish = async (values: { password: string }) => {
        if (!token) return message.error("Invalid or missing token");

        setLoading(true);
        try {
            await axios.post("/api/auth/reset-password", {
                token,
                password: values.password,
            });
            message.success("Password has been reset!");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                message.error(error.response?.data?.message || "Reset failed.");
            } else {
                message.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <h2>Reset Password</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="password"
                    label="New Password"
                    rules={[{ required: true, message: "Please input new password!" }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};

export default ResetPassword;
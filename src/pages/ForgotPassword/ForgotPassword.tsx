import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  max-width: 400px;
  margin: 100px auto;
`;

const ForgotPassword = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: { email: string }) => {
        try {
            await axios.post('/api/auth/forgot-password', values);
            message.success('Check your email to reset password.');
        } catch (err) {
            console.log('err', err);
            message.error('Failed to send reset link.');
        }
    };

    return (
        <Wrapper>
            <h2>Forgot Password</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Send Reset Link
                </Button>
            </Form>
        </Wrapper>
    );
};

export default ForgotPassword;

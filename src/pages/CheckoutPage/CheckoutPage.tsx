import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';

const CheckoutPage: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values: any) => {
        setLoading(true);
        // Simulate checkout process (replace with actual API)
        setTimeout(() => {
            message.success('Order placed successfully!');
            setLoading(false);
        }, 2000);
    };

    return (
        <div>
            <h2>Checkout</h2>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Shipping Address" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="payment" label="Payment Method" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="total" label="Total Amount" rules={[{ required: true }]}>
                    <InputNumber min={0} value={100} disabled />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Place Order</Button>
            </Form>
        </div>
    );
};

export default CheckoutPage;

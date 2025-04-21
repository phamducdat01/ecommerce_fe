import React from 'react';
import { Button, Form, Input, message } from 'antd';

const CustomerSupportPage: React.FC = () => {
    const handleSubmit = (values: any) => {
        message.success('Your message has been sent!');
    };

    return (
        <div>
            <h2>Customer Support</h2>
            <p>If you have any questions, feel free to reach out to us:</p>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item name="message" label="Your Message" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Button type="primary" htmlType="submit">Send Message</Button>
            </Form>
        </div>
    );
};

export default CustomerSupportPage;

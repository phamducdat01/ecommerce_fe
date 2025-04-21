// src/pages/OrderDetailPage/OrderDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

type OrderItem = {
    product: string;
    quantity: number;
    price: string; // hoặc number nếu muốn xử lý giá trị số
};

type Order = {
    orderId: string;
    customerName: string;
    status: 'Completed' | 'Pending' | 'Cancelled'; // có thể mở rộng thêm các trạng thái
    totalAmount: string;
    items: OrderItem[];
    date: string; // dạng ISO yyyy-mm-dd
};

const OrderDetailPage: React.FC = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState<Order | null>(null);

    // Giả lập gọi API để lấy chi tiết đơn hàng
    useEffect(() => {
        if (orderId) {
            // Giả lập chi tiết đơn hàng
            setOrderDetails({
                orderId: orderId,
                customerName: 'John Doe',
                status: 'Completed',
                totalAmount: '$100',
                items: [
                    { product: 'Product A', quantity: 1, price: '$50' },
                    { product: 'Product B', quantity: 2, price: '$25' },
                ],
                date: '2025-04-20',
            });
        }
    }, [orderId]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Title level={2}>Order Detail: {orderDetails.orderId}</Title>
            <Card title="Customer Information">
                <Paragraph><strong>Name:</strong> {orderDetails.customerName}</Paragraph>
                <Paragraph><strong>Status:</strong> {orderDetails.status}</Paragraph>
                <Paragraph><strong>Total Amount:</strong> {orderDetails.totalAmount}</Paragraph>
                <Paragraph><strong>Date:</strong> {orderDetails.date}</Paragraph>
            </Card>

            <Title level={3}>Items</Title>
            {orderDetails.items.map((item: OrderItem, index: number) => (
                <Card key={index} title={item.product}>
                    <Paragraph><strong>Quantity:</strong> {item.quantity}</Paragraph>
                    <Paragraph><strong>Price:</strong> {item.price}</Paragraph>
                </Card>
            ))}
        </div>
    );
};

export default OrderDetailPage;

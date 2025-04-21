// src/pages/OrderPage/OrderPage.tsx

import { Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

// Giả lập dữ liệu đơn hàng
const mockOrders = [
    {
        key: '1',
        orderId: 'ORD001',
        customerName: 'John Doe',
        status: 'Completed',
        totalAmount: '$100',
        date: '2025-04-20',
    },
    {
        key: '2',
        orderId: 'ORD002',
        customerName: 'Jane Smith',
        status: 'Pending',
        totalAmount: '$150',
        date: '2025-04-21',
    },
    {
        key: '3',
        orderId: 'ORD003',
        customerName: 'Sam Green',
        status: 'Shipped',
        totalAmount: '$200',
        date: '2025-04-22',
    },
];

const OrderPage: React.FC = () => {
    const [orders, setOrders] = useState(mockOrders);

    // Bạn có thể thực hiện gọi API ở đây để lấy dữ liệu đơn hàng thực tế

    useEffect(() => {
        // Giả lập gọi API và nhận dữ liệu đơn hàng
        setOrders(mockOrders);
    }, []);

    // Cấu hình bảng Ant Design
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text: string) => <Link to={`/order/${text}`}>{text}</Link>, // Điều hướng chi tiết đơn hàng
        },
        {
            title: 'Customer',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    return (
        <div>
            <Title level={2}>Order List</Title>
            <Table dataSource={orders} columns={columns} />
        </div>
    );
};

export default OrderPage;

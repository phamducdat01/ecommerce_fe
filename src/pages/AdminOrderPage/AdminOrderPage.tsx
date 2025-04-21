import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Select, Input, DatePicker } from 'antd';
type AdminOrder = {
    orderId: string;
    customerName: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
    totalAmount: string;
    items: {
        product: string;
        quantity: number;
        price: string;
    }[];
    date: string;
};

const fakeAdminOrders: AdminOrder[] = [
    {
        orderId: 'ORD12345',
        customerName: 'John Doe',
        status: 'Completed',
        totalAmount: '$150',
        items: [
            { product: 'Product A', quantity: 2, price: '$50' },
            { product: 'Product B', quantity: 1, price: '$50' },
        ],
        date: '2025-04-20',
    },
    {
        orderId: 'ORD12346',
        customerName: 'Jane Smith',
        status: 'Pending',
        totalAmount: '$200',
        items: [
            { product: 'Product C', quantity: 4, price: '$50' },
        ],
        date: '2025-04-21',
    },
    {
        orderId: 'ORD12347',
        customerName: 'Alice Johnson',
        status: 'Cancelled',
        totalAmount: '$75',
        items: [
            { product: 'Product D', quantity: 1, price: '$75' },
        ],
        date: '2025-04-22',
    },
];

const { Option } = Select;

const AdminOrderPage: React.FC = () => {
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter] = useState({
        status: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        // Fetch orders từ API (Giả sử API đã có sẵn)
        const fetchOrders = async () => {
            // const response = await fetch('/api/admin/orders'); // Endpoint giả sử
            // const data = await response.json();
            const data = fakeAdminOrders;
            setOrders(data);
        };
        fetchOrders();
    }, []);

    const handleViewOrderDetails = (order: AdminOrder) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedOrder(null);
    };

    const columns = [
        { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
        { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: AdminOrder) => (
                <Button onClick={() => handleViewOrderDetails(record)}>View Details</Button>
            ),
        },
    ];

    const handleStatusChange = (value: string) => {
        setFilter((prevFilter) => ({ ...prevFilter, status: value }));
    };

    const handleDateChange = (date: any, dateString: string) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            startDate: dateString ? dateString[0] : '',
            endDate: dateString ? dateString[1] : '',
        }));
    };

    const filteredOrders = orders.filter((order) => {
        let matches = true;
        if (filter.status && order.status !== filter.status) {
            matches = false;
        }
        if (filter.startDate && order.date < filter.startDate) {
            matches = false;
        }
        if (filter.endDate && order.date > filter.endDate) {
            matches = false;
        }
        return matches;
    });

    return (
        <div>
            <h1>Admin - Orders</h1>
            <div style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Filter by Status"
                    onChange={handleStatusChange}
                    style={{ width: 200, marginRight: 10 }}
                >
                    <Option value="">All</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Cancelled">Cancelled</Option>
                </Select>
                <DatePicker.RangePicker
                    onChange={handleDateChange}
                    style={{ marginRight: 10 }}
                />
                <Input.Search
                    placeholder="Search by Order ID"
                    style={{ width: 200 }}
                    onSearch={(value) => {
                        // Logic tìm kiếm đơn hàng theo Order ID
                        const filtered = orders.filter((order) =>
                            order.orderId.includes(value)
                        );
                        setOrders(filtered);
                    }}
                />
            </div>
            <Table columns={columns} dataSource={filteredOrders} rowKey="orderId" />
            {selectedOrder && (
                <Modal
                    title={`Order Details: ${selectedOrder.orderId}`}
                    visible={modalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                >
                    <div>
                        <h3>Customer: {selectedOrder.customerName}</h3>
                        <h4>Status: {selectedOrder.status}</h4>
                        <h4>Total Amount: {selectedOrder.totalAmount}</h4>
                        <h4>Date: {selectedOrder.date}</h4>
                        <h5>Items:</h5>
                        <ul>
                            {selectedOrder.items.map((item, index) => (
                                <li key={index}>
                                    {item.product} - {item.quantity} x {item.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminOrderPage;

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';

const AdminProductPage: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        // Fetch products (replace with actual API)
        setProducts([
            { id: '1', name: 'Product A', price: 50, description: 'Description A' },
            { id: '2', name: 'Product B', price: 30, description: 'Description B' },
        ]);
    }, []);

    const handleAddProduct = () => {
        setIsModalVisible(true);
    };

    const handleSaveProduct = () => {
        form.validateFields().then((values) => {
            setProducts([...products, { ...values, id: (products.length + 1).toString() }]);
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const columns = [
        { title: 'Product ID', dataIndex: 'id', key: 'id' },
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Button onClick={() => handleEditProduct(record.id)}>Edit</Button>
            ),
        },
    ];

    const handleEditProduct = (id: string) => {
        const product = products.find((prod) => prod.id === id);
        form.setFieldsValue(product);
        setIsModalVisible(true);
    };

    return (
        <div>
            <h2>Admin Product Page</h2>
            <Button onClick={handleAddProduct} type="primary">Add Product</Button>
            <Table columns={columns} dataSource={products} rowKey="id" />
            <Modal
                title="Add/Edit Product"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSaveProduct}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminProductPage;

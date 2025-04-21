import React, { useState } from 'react';
import { Button, InputNumber, Checkbox, Table, message } from 'antd';

type CartItem = {
    productId: string;
    productName: string;
    price: string;
    quantity: number;
    selected: boolean;
};

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            productId: '1',
            productName: 'Product A',
            price: '$50',
            quantity: 1,
            selected: false,
        },
        {
            productId: '2',
            productName: 'Product B',
            price: '$25',
            quantity: 2,
            selected: false,
        },
    ]);

    // Cập nhật số lượng sản phẩm
    const handleQuantityChange = (productId: string, value: number) => {
        setCartItems(prevState =>
            prevState.map(item =>
                item.productId === productId ? { ...item, quantity: value } : item
            )
        );
    };

    // Cập nhật trạng thái ô tích (chọn sản phẩm)
    const handleSelectChange = (productId: string) => {
        setCartItems(prevState =>
            prevState.map(item =>
                item.productId === productId
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    };

    // Mua sản phẩm đã chọn
    const handleBuy = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        if (selectedItems.length === 0) {
            message.warning('Please select at least one product to buy!');
            return;
        }
        // Giả sử gửi data đến server hoặc thực hiện hành động mua
        message.success('Products purchased successfully!');
    };

    const columns = [
        { title: 'Product', dataIndex: 'productName', key: 'productName' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: any, record: CartItem) => (
                <InputNumber
                    value={record.quantity}
                    onChange={(value) => handleQuantityChange(record.productId, value)}
                    min={1}
                />
            ),
        },
        {
            title: 'Select',
            key: 'selected',
            render: (text: any, record: CartItem) => (
                <Checkbox
                    checked={record.selected}
                    onChange={() => handleSelectChange(record.productId)}
                />
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Cart Page</h2>
            <Table
                columns={columns}
                dataSource={cartItems}
                rowKey="productId"
                pagination={false}
            />
            <Button type="primary" onClick={handleBuy} style={{ marginTop: '20px' }}>
                Buy Selected Items
            </Button>
        </div>
    );
};

export default CartPage;

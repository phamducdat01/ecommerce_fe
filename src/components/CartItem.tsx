// src/components/CartItem.tsx

import React from 'react';
import { Card, Button, InputNumber } from 'antd';

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    onQuantityChange: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, onQuantityChange, onRemove }) => {
    return (
        <Card style={{ marginBottom: 16 }}>
            <h3>{name}</h3>
            <p>Price: ${price}</p>
            <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => onQuantityChange(id, value as number)}
                style={{ marginRight: 8 }}
            />
            <Button type="primary" danger onClick={() => onRemove(id)}>
                Remove
            </Button>
            <p>Total: ${price * quantity}</p>
        </Card>
    );
};

export default CartItem;

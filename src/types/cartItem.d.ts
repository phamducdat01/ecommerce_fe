// src/types/cart.d.ts

export interface ICartItem {
    _id: string;
    userId: string;
    productId: string;
    quantity: number;
}
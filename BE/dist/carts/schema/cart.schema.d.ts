import { Document } from 'mongoose';
export type CartDocument = Cart & Document;
type TypeCard = {
    name: string;
    price: number;
    image: string;
    quantity: number;
    status: string;
};
export declare class Cart {
    name: string;
    phone: string;
    address: string;
    cart: TypeCard[];
    status: string;
}
export declare const CartSchema: import("mongoose").Schema<Document<Cart, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
export {};

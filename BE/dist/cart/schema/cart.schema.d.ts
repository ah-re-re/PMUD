import { Document } from 'mongoose';
export type CartDocument = Cart & Document;
type TypeCard = {
    name: string;
    price: number;
    image: string;
    quantity: number;
};
export declare class Cart {
    name: string;
    phone: string;
    adress: string;
    cart: TypeCard[];
}
export declare const CartSchema: import("mongoose").Schema<Document<Cart, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
export {};

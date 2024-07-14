type TypeCard = {
    name: string;
    price: number;
    image: string;
    quantity: number;
    status: string;
};
export declare class CreateCartDto {
    name: string;
    phone: string;
    address: string;
    cart: TypeCard[];
    status: string;
}
export {};

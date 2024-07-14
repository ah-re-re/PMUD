type TypeCard = {
    name: string;
    price: number;
    image: string;
    quantity: number;
};
export declare class CreateCartDto {
    name: string;
    phone: string;
    adress: string;
    card: TypeCard[];
}
export {};

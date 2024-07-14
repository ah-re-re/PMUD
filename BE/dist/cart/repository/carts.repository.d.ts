import { FilterQuery, Model } from 'mongoose';
import { CreateCartDto } from '../dto/create-product.dto';
import { CartDocument } from '../schema/cart.schema';
export declare class CartsRepository {
    private productModel;
    constructor(productModel: Model<CartDocument>);
    create(createDto: CreateCartDto): Promise<CartDocument>;
    findAll(filter?: FilterQuery<any>): Promise<CartDocument[]>;
}

import { FilterQuery } from 'mongoose';
import { CreateCartDto } from '../dto/create-product.dto';
import { CartsRepository } from '../repository/carts.repository';
export declare class CartsService {
    private readonly cartsRepository;
    constructor(cartsRepository: CartsRepository);
    create(createUserDto: CreateCartDto): Promise<import("../schema/cart.schema").CartDocument>;
    findAll(filter?: FilterQuery<any>): Promise<import("../schema/cart.schema").CartDocument[]>;
}

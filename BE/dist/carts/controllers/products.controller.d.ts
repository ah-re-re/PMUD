import { CartsService } from '../services/carts.service';
import { CreateCartDto } from '../dto/create-product.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    create(createProductDto: CreateCartDto): Promise<import("../schema/cart.schema").CartDocument>;
    findAll(): Promise<import("../schema/cart.schema").CartDocument[]>;
    find(): Promise<any>;
    active(id: string): Promise<import("../schema/cart.schema").CartDocument>;
}

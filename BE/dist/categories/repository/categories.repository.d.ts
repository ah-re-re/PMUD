import { FilterQuery, Model } from 'mongoose';
import { CategoryDocument } from '../schema/category.schema';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
export declare class CategoriesRepository {
    private userModel;
    constructor(userModel: Model<CategoryDocument>);
    findOne(filter: FilterQuery<any>): Promise<CategoryDocument | null>;
    create(createDto: CreateCategoryDto): Promise<CategoryDocument>;
    update(id: string, updateDto: Partial<UpdateCategoryDto>): Promise<CategoryDocument>;
    findAll(filter?: FilterQuery<any>): Promise<CategoryDocument[]>;
    delete(_id: string): Promise<CategoryDocument>;
}

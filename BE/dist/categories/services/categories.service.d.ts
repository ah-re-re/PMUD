import { FilterQuery } from 'mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesRepository } from '../repository/categories.repository';
export declare class CategoriesService {
    private readonly siteconfigsRepository;
    constructor(siteconfigsRepository: CategoriesRepository);
    create(createUserDto: CreateCategoryDto): Promise<import("../schema/category.schema").CategoryDocument>;
    findAll(filter?: FilterQuery<any>): Promise<import("../schema/category.schema").CategoryDocument[]>;
    findOne(filter: FilterQuery<any>): Promise<import("../schema/category.schema").CategoryDocument>;
    update(id: string, updateUserDto: UpdateCategoryDto): Promise<import("../schema/category.schema").CategoryDocument>;
    remove(id: string): Promise<import("../schema/category.schema").CategoryDocument>;
}

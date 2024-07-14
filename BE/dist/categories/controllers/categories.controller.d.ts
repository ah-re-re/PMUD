import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ImagesService } from 'src/images/images.service';
export declare class CategoriesController {
    private readonly categoriesService;
    private readonly imagesService;
    constructor(categoriesService: CategoriesService, imagesService: ImagesService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("../schema/category.schema").CategoryDocument>;
    findByFillter(updateCategoryDto: UpdateCategoryDto): Promise<import("../schema/category.schema").CategoryDocument[]>;
    findBySearch(search: any): Promise<{
        name: {
            name: string;
            language: string;
        }[];
        url: string;
        path: string;
    }[]>;
    findAll(updateCategoryDto: UpdateCategoryDto): Promise<import("../schema/category.schema").CategoryDocument[]>;
    findOne(id: string): Promise<import("../schema/category.schema").CategoryDocument>;
    update(id: string, updateProductDto: UpdateCategoryDto): Promise<import("../schema/category.schema").CategoryDocument>;
    remove(id: string): Promise<import("../schema/category.schema").CategoryDocument>;
}

import { FilterQuery } from 'mongoose';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { PagesRepository } from '../repository/pages.repository';
export declare class PagesService {
    private readonly pagesRepository;
    constructor(pagesRepository: PagesRepository);
    create(createUserDto: CreatePageDto): Promise<import("../schema/page.schema").PageDocument>;
    findAll(): Promise<import("../schema/page.schema").PageDocument[]>;
    findOne(filter: FilterQuery<any>): Promise<import("../schema/page.schema").PageDocument>;
    update(id: string, updateUserDto: UpdatePageDto): Promise<import("../schema/page.schema").PageDocument>;
    remove(id: number): string;
}

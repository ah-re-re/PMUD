import { FilterQuery, Model } from 'mongoose';
import { PageDocument } from '../schema/page.schema';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
export declare class PagesRepository {
    private userModel;
    constructor(userModel: Model<PageDocument>);
    findOne(filter: FilterQuery<any>): Promise<PageDocument | null>;
    create(createDto: CreatePageDto): Promise<PageDocument>;
    update(id: string, updateDto: Partial<UpdatePageDto>): Promise<PageDocument>;
    findAll(filter?: FilterQuery<any>): Promise<PageDocument[]>;
    delete(_id: string): Promise<PageDocument>;
}

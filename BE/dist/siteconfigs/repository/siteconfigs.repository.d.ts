import { FilterQuery, Model } from 'mongoose';
import { SiteConfigDocument } from '../schema/siteconfig.schema';
import { CreateSiteConfigDto } from '../dto/create-siteconfig.dto';
import { UpdateSiteConfigDto } from '../dto/update-siteconfig.dto';
export declare class SiteConfigsRepository {
    private userModel;
    constructor(userModel: Model<SiteConfigDocument>);
    findOne(filter: FilterQuery<any>): Promise<SiteConfigDocument | null>;
    create(createDto: CreateSiteConfigDto): Promise<SiteConfigDocument>;
    update(id: string, updateDto: Partial<UpdateSiteConfigDto>): Promise<SiteConfigDocument>;
    findAll(filter?: FilterQuery<any>): Promise<SiteConfigDocument[]>;
    delete(_id: string): Promise<SiteConfigDocument>;
}

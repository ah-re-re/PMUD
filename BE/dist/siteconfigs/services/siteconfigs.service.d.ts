import { FilterQuery } from 'mongoose';
import { CreateSiteConfigDto } from '../dto/create-siteconfig.dto';
import { UpdateSiteConfigDto } from '../dto/update-siteconfig.dto';
import { SiteConfigsRepository } from '../repository/siteconfigs.repository';
export declare class SiteConfigsService {
    private readonly siteconfigsRepository;
    constructor(siteconfigsRepository: SiteConfigsRepository);
    create(createUserDto: CreateSiteConfigDto): Promise<import("../schema/siteconfig.schema").SiteConfigDocument>;
    findAll(): Promise<import("../schema/siteconfig.schema").SiteConfigDocument[]>;
    findOne(filter: FilterQuery<any>): Promise<import("../schema/siteconfig.schema").SiteConfigDocument>;
    update(id: string, updateUserDto: UpdateSiteConfigDto): Promise<import("../schema/siteconfig.schema").SiteConfigDocument>;
    remove(id: number): string;
}

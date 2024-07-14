import { SiteConfigsService } from '../services/siteconfigs.service';
import { CreateSiteConfigDto } from '../dto/create-siteconfig.dto';
import { UpdateSiteConfigDto } from '../dto/update-siteconfig.dto';
export declare class SiteConfigsController {
    private readonly siteconfigsService;
    constructor(siteconfigsService: SiteConfigsService);
    create(createUserDto: CreateSiteConfigDto): Promise<import("../schema/siteconfig.schema").SiteConfigDocument>;
    findAll(): Promise<import("../schema/siteconfig.schema").SiteConfigDocument[]>;
    findOne(id: string): Promise<import("../schema/siteconfig.schema").SiteConfigDocument>;
    update(id: string, updateUserDto: UpdateSiteConfigDto): Promise<import("../schema/siteconfig.schema").SiteConfigDocument>;
    remove(id: string): string;
}

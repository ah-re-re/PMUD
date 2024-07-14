import { PagesService } from '../services/pages.service';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    create(createPageDto: CreatePageDto): Promise<import("../schema/page.schema").PageDocument>;
    findAll(): Promise<import("../schema/page.schema").PageDocument[]>;
    findOne(id: string): Promise<import("../schema/page.schema").PageDocument>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<import("../schema/page.schema").PageDocument>;
    remove(id: string): string;
}

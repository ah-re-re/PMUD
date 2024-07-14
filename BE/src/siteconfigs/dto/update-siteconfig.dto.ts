import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteConfigDto } from './create-siteconfig.dto';

export class UpdateSiteConfigDto extends PartialType(CreateSiteConfigDto) {}
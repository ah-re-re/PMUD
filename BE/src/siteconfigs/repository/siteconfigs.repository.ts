import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SiteConfig, SiteConfigDocument } from '../schema/siteconfig.schema';
import { CreateSiteConfigDto } from '../dto/create-siteconfig.dto';
import { UpdateSiteConfigDto } from '../dto/update-siteconfig.dto';

@Injectable()
export class SiteConfigsRepository {
  constructor(@InjectModel(SiteConfig.name) private userModel: Model<SiteConfigDocument>) { }

  async findOne(filter: FilterQuery<any>): Promise<SiteConfigDocument | null> {
    return this.userModel.findOne(filter);
  }

  async create(createDto: CreateSiteConfigDto): Promise<SiteConfigDocument> {
    const created = new this.userModel(createDto);
    return await created.save();
  }

  async update(
    id: string,
    updateDto: Partial<UpdateSiteConfigDto>,
  ): Promise<SiteConfigDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateDto);
  }

  async findAll(filter?: FilterQuery<any>): Promise<SiteConfigDocument[]> {
    return this.userModel.find(filter);
  }

  async delete(_id: string): Promise<SiteConfigDocument> {
    return await this.userModel.findByIdAndDelete(_id);
  }
}

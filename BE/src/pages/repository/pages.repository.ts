import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Page, PageDocument } from '../schema/page.schema';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';

@Injectable()
export class PagesRepository {
  constructor(@InjectModel(Page.name) private userModel: Model<PageDocument>) { }

  async findOne(filter: FilterQuery<any>): Promise<PageDocument | null> {
    return this.userModel.findOne(filter);
  }

  async create(createDto: CreatePageDto): Promise<PageDocument> {
    const created = new this.userModel(createDto);
    return await created.save();
  }

  async update(
    id: string,
    updateDto: Partial<UpdatePageDto>,
  ): Promise<PageDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateDto);
  }

  async findAll(filter?: FilterQuery<any>): Promise<PageDocument[]> {
    return this.userModel.find(filter);
  }

  async delete(_id: string): Promise<PageDocument> {
    return await this.userModel.findByIdAndDelete(_id);
  }
}

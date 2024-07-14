import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schema/category.schema';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class CategoriesRepository {
  constructor(@InjectModel(Category.name) private userModel: Model<CategoryDocument>) { }

  async findOne(filter: FilterQuery<any>): Promise<CategoryDocument | null> {
    return this.userModel.findOne(filter);
  }

  async create(createDto: CreateCategoryDto): Promise<CategoryDocument> {
    const created = new this.userModel(createDto);
    return await created.save();
  }

  async update(
    id: string,
    updateDto: Partial<UpdateCategoryDto>,
  ): Promise<CategoryDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateDto);
  }

  async findAll(filter?: FilterQuery<any>): Promise<CategoryDocument[]> {
    return this.userModel.find(filter).sort({ createdAt: -1 }).exec();;
  }

  async delete(_id: string): Promise<CategoryDocument> {
    return await this.userModel.findByIdAndDelete(_id);
  }
}

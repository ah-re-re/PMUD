import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesRepository } from '../repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly siteconfigsRepository: CategoriesRepository) {}
  async create(createUserDto: CreateCategoryDto) {
    return await this.siteconfigsRepository.create(createUserDto);
  }

  async findAll(filter?: FilterQuery<any>) {
    return await this.siteconfigsRepository.findAll(filter);
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.siteconfigsRepository.findOne(filter);
  }

  async update(id: string, updateUserDto: UpdateCategoryDto) {
    return await this.siteconfigsRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.siteconfigsRepository.delete(id)
  }
}

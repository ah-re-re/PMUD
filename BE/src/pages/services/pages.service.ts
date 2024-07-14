import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { PagesRepository } from '../repository/pages.repository';

@Injectable()
export class PagesService {
  constructor(private readonly pagesRepository: PagesRepository) {}
  async create(createUserDto: CreatePageDto) {
    return await this.pagesRepository.create(createUserDto);
  }

  async findAll() {
    return await this.pagesRepository.findAll();
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.pagesRepository.findOne(filter);
  }

  async update(id: string, updateUserDto: UpdatePageDto) {
    return await this.pagesRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

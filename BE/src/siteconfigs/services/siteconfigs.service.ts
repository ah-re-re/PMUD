import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateSiteConfigDto } from '../dto/create-siteconfig.dto';
import { UpdateSiteConfigDto } from '../dto/update-siteconfig.dto';
import { SiteConfigsRepository } from '../repository/siteconfigs.repository';

@Injectable()
export class SiteConfigsService {
  constructor(private readonly siteconfigsRepository: SiteConfigsRepository) {}
  async create(createUserDto: CreateSiteConfigDto) {
    return await this.siteconfigsRepository.create(createUserDto);
  }

  async findAll() {
    return await this.siteconfigsRepository.findAll();
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.siteconfigsRepository.findOne(filter);
  }

  async update(id: string, updateUserDto: UpdateSiteConfigDto) {
    return await this.siteconfigsRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

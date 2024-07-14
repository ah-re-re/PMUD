import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateCartDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CartsRepository } from '../repository/carts.repository';

@Injectable()
export class CartsService {
  constructor(private readonly cartsRepository: CartsRepository) {}
  async create(createUserDto: CreateCartDto) {
    return await this.cartsRepository.create(createUserDto);
  }

  async findAll(filter?: FilterQuery<any>) {
    return await this.cartsRepository.findAll(filter);
  }
  async active(id: string) {
    return await this.cartsRepository.active(id);
  }
  async filterAndGroupByDate(){
    return await this.cartsRepository.filterAndGroupByDate()
  }
}

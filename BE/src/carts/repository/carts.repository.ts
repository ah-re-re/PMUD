import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCartDto } from '../dto/create-product.dto';
import { Cart, CartDocument } from '../schema/cart.schema';

@Injectable()
export class CartsRepository {
  constructor(@InjectModel(Cart.name) private productModel: Model<CartDocument>) { }

  async create(createDto: CreateCartDto): Promise<CartDocument> {
    const created = new this.productModel(createDto);
    return await created.save();
  }

  async findAll(filter?: FilterQuery<any>): Promise<CartDocument[]> {
    return this.productModel.find(filter).sort({ createdAt: -1 }).exec();
  }
  async active(
    id: string,
  ): Promise<CartDocument> {
    return await this.productModel.findByIdAndUpdate(id, {status: "active"});
  }

  async filterAndGroupByDate(): Promise<any> {
    return this.productModel.aggregate([
      {
        $project: {
          yearMonthDay: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          cart: 1,
        },
      },
      {
        $group: {
          _id: '$yearMonthDay',
          records: { $push: { cart: '$cart' } },
        },
      },
    ]);
  }
}

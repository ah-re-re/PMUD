import { Module } from '@nestjs/common';
import { CartsService } from './services/carts.service';
import { CartsController } from './controllers/products.controller';
import { CartsRepository } from './repository/carts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
})
export class CartsModule {}

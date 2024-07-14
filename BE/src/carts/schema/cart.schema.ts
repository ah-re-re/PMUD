import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

type TypeCard = {
  name: string,
  price: number,
  image: string,
  quantity: number,
  status: string,
}

@Schema({
  timestamps: true
})
export class Cart {
  @Prop({
    required: true,
    type: String,
  })
  name: string;
  @Prop({
    required: true,
    type: String,
  })
  phone: string;
  @Prop({
    required: true,
    type: String,
  })
  address: string;
  @Prop({
    required: true,
    type: Array,
  })
  cart: TypeCard[];

  @Prop({
    required: true,
    type: String,
    default: "None"
  })
  status: string;

}

export const CartSchema = SchemaFactory.createForClass(Cart);

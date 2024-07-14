import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

type typeName = {
  name: string;
  language: string
}

type typeDes = {
  des: string;
  language: string; 
}


@Schema({
  timestamps: true
})
export class Category {

  @Prop({
    required: true,
    type: [Object]
  })
  name: typeName[];

  @Prop({
    required: true,
    type: [Object]
  })
  description: typeDes[];

  @Prop({
    required: false,
    type: String
  })
  parent_id?: string;

  @Prop({
    required: false,
    type: String,
  })
  url?: string;

  @Prop({
    required: true,
    type: String,
  })
  page: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

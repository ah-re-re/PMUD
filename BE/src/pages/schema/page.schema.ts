import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LANGUAGE } from 'src/config/enum';

export type PageDocument = Page & Document;


type namePage = {
  name: string;
  language: LANGUAGE;
}

@Schema({
  timestamps: true
})
export class Page {

  @Prop({
    required: true,
    type: [Object],
  })
  name: namePage[];

  @Prop({
    required: true,
    type: String,
  })
  paths: string;
  
}

export const PageSchema = SchemaFactory.createForClass(Page);

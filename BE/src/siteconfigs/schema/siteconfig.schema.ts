import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SiteConfigDocument = SiteConfig & Document;

@Schema({
  timestamps: true
})
export class SiteConfig {

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  value: string;
}

export const SiteConfigSchema = SchemaFactory.createForClass(SiteConfig);

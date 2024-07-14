import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateCartDto) {}
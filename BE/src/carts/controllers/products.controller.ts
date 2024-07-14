import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from '../services/carts.service';
import { CreateCartDto } from '../dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@Controller('carts')
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post()
  async create(@Body() createProductDto: CreateCartDto) {
    return this.cartsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Get()
  findAll() {
    return this.cartsService.findAll({status: "None"});
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Get("all")
  async find() {
    let data = await this.cartsService.filterAndGroupByDate()
    return data.map(d => ({_id: d._id, total: d?.records.map(cart => cart.cart.reduce((sum, c) => sum + c.price, 0)).reduce((sum, c) => sum + c, 0)}))
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Get(':id')
  active(@Param('id') id: string) {
    return this.cartsService.active(id);
  }

}

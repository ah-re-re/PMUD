import express from 'express';
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
  Req,
  Res,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ImagesService } from 'src/images/images.service';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService, private readonly imagesService: ImagesService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    createCategoryDto.url = await this.imagesService.upload(createCategoryDto.url)
    return this.categoriesService.create(createCategoryDto);
  }

  @Post('find')
  findByFillter(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.findAll(updateCategoryDto)
  }
  @Post('search')
  async findBySearch(@Body() search: any) {
    const categories = await this.categoriesService.findAll({
      name: {
        $elemMatch: {
          name: {
            $regex: search.query,
            $options: "i"
          }
        }
      }
    })

    let rs = categories.map(v => ({
      name: v.name,
      url: v.url,
      path: (v.page == 'home' ? '' : `/${v.page}`) + '/' + v.name[0].name
    }))
    return rs
  }

  @Get()
  findAll(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.findAll(updateCategoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ _id: id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateCategoryDto) {
    updateProductDto.url = await this.imagesService.upload(updateProductDto.url)
    return this.categoriesService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoriesService.findOne({ _id: id });
    const pathImage = category.url.split('/').pop()
    this.imagesService.delete(pathImage.toString())
    return this.categoriesService.remove(id);
  }
}

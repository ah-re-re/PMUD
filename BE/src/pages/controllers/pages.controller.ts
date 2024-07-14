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
import { PagesService } from '../services/pages.service';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('pages')
@ApiTags('Pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne({ _id: id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(id, updatePageDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(+id);
  }
}

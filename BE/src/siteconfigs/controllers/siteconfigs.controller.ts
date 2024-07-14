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
import { SiteConfigsService } from '../services/siteconfigs.service';
import { CreateSiteConfigDto } from '../dto/create-siteconfig.dto';
import { UpdateSiteConfigDto } from '../dto/update-siteconfig.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('siteconfigs')
@ApiTags('SiteConfigs')
export class SiteConfigsController {
  constructor(private readonly siteconfigsService: SiteConfigsService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Post()
  create(@Body() createUserDto: CreateSiteConfigDto) {
    return this.siteconfigsService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.siteconfigsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteconfigsService.findOne({ _id: id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateSiteConfigDto) {
    return this.siteconfigsService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteconfigsService.remove(+id);
  }
}

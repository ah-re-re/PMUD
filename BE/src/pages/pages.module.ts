import { Module } from '@nestjs/common';
import { PagesService } from './services/pages.service';
import { PagesController } from './controllers/pages.controller';
import { PagesRepository } from './repository/pages.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schema/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository],
  exports: [PagesService],
})
export class PagesModule {}

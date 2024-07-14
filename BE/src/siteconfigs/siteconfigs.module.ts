import { Module } from '@nestjs/common';
import { SiteConfigsService } from './services/siteconfigs.service';
import { SiteConfigsController } from './controllers/siteconfigs.controller';
import { SiteConfigsRepository } from './repository/siteconfigs.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteConfig, SiteConfigSchema } from './schema/siteconfig.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SiteConfig.name, schema: SiteConfigSchema }]),
  ],
  controllers: [SiteConfigsController],
  providers: [SiteConfigsService, SiteConfigsRepository],
  exports: [SiteConfigsService],
})
export class SiteConfigsModule {}

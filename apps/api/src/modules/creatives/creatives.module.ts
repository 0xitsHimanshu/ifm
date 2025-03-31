import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { CreativesController } from './creatives.controller';
import { CreativesService } from './creatives.service';
import { Creative, CreativeSchema } from './creative.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Creative.name, schema: CreativeSchema },
    ]),
    MulterModule.register({
      dest: './uploads', // Temporary storage, should be replaced with cloud storage
    }),
  ],
  controllers: [CreativesController],
  providers: [CreativesService],
  exports: [CreativesService],
})
export class CreativesModule {} 
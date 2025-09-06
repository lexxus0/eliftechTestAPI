import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';
import { Flower, FlowerSchema } from './schemas/flower.schema';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flower.name, schema: FlowerSchema }]),
  ],
  controllers: [FlowersController],
  providers: [FlowersService, CloudinaryService],
  exports: [FlowersService],
})
export class FlowersModule {}

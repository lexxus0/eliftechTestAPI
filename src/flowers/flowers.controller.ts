import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { QueryFlowerDto } from './dto/query-flower.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Controller('flowers')
export class FlowersController {
  constructor(
    private flowers: FlowersService,
    private cloud: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateFlowerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Image file is required');

    const up = await this.cloud.uploadImage(file.buffer);

    const flowerData = {
      ...dto,
      imageUrl: up.secure_url,
    };

    return this.flowers.create(flowerData);
  }
  @Get()
  findAll(@Query() q: QueryFlowerDto) {
    return this.flowers.findAll(q);
  }
}

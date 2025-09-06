import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Flower, FlowerDocument } from './schemas/flower.schema';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { QueryFlowerDto } from './dto/query-flower.dto';

@Injectable()
export class FlowersService {
  constructor(@InjectModel(Flower.name) private model: Model<FlowerDocument>) {}

  async create(data: CreateFlowerDto & { imageUrl: string }) {
    const doc = new this.model(data);
    return doc.save();
  }

  async findAll(q: QueryFlowerDto) {
    const {
      page = 1,
      limit = 8,
      priceMin,
      priceMax,
      dateFrom,
      dateTo,
      sort = 'createdAt',
      order = 'desc',
    } = q;

    const filter: FilterQuery<FlowerDocument> = {};

    if (priceMin != null || priceMax != null) {
      filter.price = {} as any;
      if (priceMin != null) (filter.price as any).$gte = priceMin;
      if (priceMax != null) (filter.price as any).$lte = priceMax;
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {} as any;
      if (dateFrom) (filter.createdAt as any).$gte = new Date(dateFrom);
      if (dateTo) (filter.createdAt as any).$lte = new Date(dateTo);
    }

    const skip = (page - 1) * limit;
    const sortObj: any = { [sort]: order === 'asc' ? 1 : -1 };

    const [items, total] = await Promise.all([
      this.model.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
    };
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id).lean();
    if (!doc) throw new NotFoundException('Flower not found');
    return doc;
  }
}

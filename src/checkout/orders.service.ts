import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(dto: CreateOrderDto) {
    const order = new this.orderModel(dto);
    return order.save();
  }

  async findAll() {
    return this.orderModel.find().sort({ createdAt: -1 }).lean();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).lean();
  }
}

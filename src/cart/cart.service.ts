import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument, CartItem } from './schemas/cart.schema';
import { FlowersService } from '../flowers/flowers.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private model: Model<CartDocument>,
    private flowers: FlowersService,
  ) {}

  // Створити нову корзину
  async create() {
    return this.model.create({ items: [] });
  }

  // Отримати корзину з total
  async get(cartId: string) {
    const cart = await this.model.findById(cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    const total = cart.items.reduce(
      (s, it) => s + it.unitPrice * it.quantity,
      0,
    );

    return {
      id: cart._id,
      items: cart.items,
      total,
    };
  }

  // Додати елемент у корзину
  async addItem(cartId: string, flowerId: string, quantity: number) {
    const cart = await this.model.findById(cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    const flower = await this.flowers.findOne(flowerId);

    const existing = cart.items.find((i) => i.flowerId.toString() === flowerId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        flowerId: new Types.ObjectId(flowerId),
        quantity,
        unitPrice: (flower as any).price,
      } as CartItem);
    }

    await cart.save();
    return this.get(cartId);
  }

  async updateItem(cartId: string, itemId: string, quantity: number) {
    const cart = await this.model.findById(cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    // будь-який каст в any дозволяє викликати id()
    const item = (cart.items as any).id(itemId);
    if (!item) throw new NotFoundException('Item not found');

    item.quantity = quantity;
    await cart.save();
    return this.get(cartId);
  }

  async removeItem(cartId: string, itemId: string) {
    const cart = await this.model.findById(cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    const item = (cart.items as any).id(itemId);
    if (!item) throw new NotFoundException('Item not found');

    item.remove();
    await cart.save();
    return this.get(cartId);
  }
}

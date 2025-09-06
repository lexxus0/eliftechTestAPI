// src/cart/schemas/cart.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class CartItem {
  @Prop({ type: Types.ObjectId, ref: 'Flower', required: true })
  flowerId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: [CartItemSchema], default: [] }) // ✅ вкладена схема
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);

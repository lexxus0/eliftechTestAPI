import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ required: true })
  imageUrl: string;
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    required: true,
  })
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

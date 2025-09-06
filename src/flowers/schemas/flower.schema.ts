import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FlowerDocument = HydratedDocument<Flower>;

@Schema({ timestamps: true })
export class Flower {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  imageUrl: string;
}

export const FlowerSchema = SchemaFactory.createForClass(Flower);
FlowerSchema.index({ price: 1 });
FlowerSchema.index({ createdAt: -1 });

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schemas/cart.schema';
import { FlowersModule } from '../flowers/flowers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    FlowersModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}

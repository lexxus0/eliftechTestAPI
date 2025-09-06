import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowersModule } from './flowers/flowers.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './checkout/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI!),
    CloudinaryModule,
    FlowersModule,
    CartModule,
    OrdersModule,
  ],
})
export class AppModule {}

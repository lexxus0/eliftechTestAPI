import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  ValidateNested,
  IsArray,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class CustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

class OrderItemDto {
  @IsString()
  _id: string;

  @IsString()
  imageUrl: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @Min(0)
  totalPrice: number;
}

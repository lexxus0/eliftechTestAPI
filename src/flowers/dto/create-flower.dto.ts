import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsString,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateFlowerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;
}

import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive } from 'class-validator';

export class QueryFlowerDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 12;

  @IsOptional()
  @Type(() => Number)
  priceMin?: number;

  @IsOptional()
  @Type(() => Number)
  priceMax?: number;

  @IsOptional()
  dateFrom?: string;

  @IsOptional()
  dateTo?: string;

  @IsOptional()
  @IsIn(['price', 'createdAt'])
  sort?: 'price' | 'createdAt' = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}

import { IsMongoId, IsInt, Min } from 'class-validator';

export class AddItemDto {
  @IsMongoId()
  flowerId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

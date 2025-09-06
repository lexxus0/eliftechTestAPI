import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('carts')
export class CartController {
  constructor(private carts: CartService) {}

  @Post()
  create() {
    return this.carts.create();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.carts.get(id);
  }

  @Post(':id/items')
  addItem(@Param('id') id: string, @Body() dto: AddItemDto) {
    return this.carts.addItem(id, dto.flowerId, dto.quantity);
  }

  @Patch(':id/items/:itemId')
  updateItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemDto,
  ) {
    return this.carts.updateItem(id, itemId, dto.quantity);
  }

  @Delete(':id/items/:itemId')
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.carts.removeItem(id, itemId);
  }
}

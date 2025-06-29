import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import {CreateOrderDto} from './dto/create-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() CreateOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user, CreateOrderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserOrders(@Request() req) {
    return this.ordersService.getUserOrders(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/cancel')
  async cancelOrder(@Param('id') orderId: string) {
    return this.ordersService.cancelOrder(orderId);
  }
}

import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Ticket } from '../tickets/ticket.entity';
import { Service } from '../services/service.entity';
import { OrderTicket } from './order-ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Ticket]),
    TypeOrmModule.forFeature([Service]),
    TypeOrmModule.forFeature([OrderTicket]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService]
})
export class OrdersModule {}

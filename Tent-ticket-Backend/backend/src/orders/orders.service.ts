import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../users/user.entity';
import { Ticket } from '../tickets/ticket.entity';
import { Service } from '../services/service.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderTicket } from './order-ticket.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(OrderTicket)
    private orderTicketsRepository: Repository<OrderTicket>,
  ) {}

  async createOrder(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create({
      user,
      totalPrice: 0,
      status: 'created',
    })

    let totalPrice = 0;
    const savedOrder = await this.ordersRepository.save(order);

    for (const ticketData of createOrderDto.tickets) {
      const ticket = await this.ticketsRepository.findOne({
        where: {
          id: ticketData.ticketId
        },
        relations: ['seats']
      });
      if(!ticket) throw new NotFoundException(`Ticket not found: ${ticketData.ticketId}`);
      totalPrice += ticket.price;

      const orderTicket = this.orderTicketsRepository.create({
        order: savedOrder,
        ticket,
        selectedSeat: ticketData.selectedSeat,
      })

      if(ticketData.selectedSeat) {
        this.updateSeatAvailability(ticket, ticketData.selectedSeat);
      }

      if(ticketData.serviceId) {
        const service = await this.servicesRepository.findOne({
          where: {
            id: ticketData.serviceId,
          }
        });

        if(service) {
          orderTicket.service = service;
          orderTicket.serviceDetails = ticketData.serviceDetails;
          totalPrice += service.price;
        }
      }

      await this.orderTicketsRepository.save(orderTicket);
    }

    savedOrder.totalPrice = totalPrice

    return this.ordersRepository.save(savedOrder);
  }

  private updateSeatAvailability(ticket: Ticket, seatNumber: string): void {
    ticket.seats.map = ticket.seats.map.map(row => row.map(seat => seat === seatNumber ? `${seat}*` : seat))

    ticket.seats.available -= 1;

    this.ticketsRepository.save(ticket);
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        user: {
          id: userId
        },
      },
      relations: ['tickets', 'tickets.ticket', 'tickets.service']
    });
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: {
        id: orderId
      }
    });
    if(!order) throw new NotFoundException(`Order not found: ${orderId}`);
    
    if(order.status !== 'created') {
      throw new Error('Cannot cancel order in current status');
    }

    order.status = 'canceled';
    return this.ordersRepository.save(order);
  }
}

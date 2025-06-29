import { Entity, PrimaryGeneratedColumn, ManyToOne, Column} from 'typeorm';
import {Order} from './order.entity';
import { Ticket } from '../tickets/ticket.entity';
import { Service } from '../services/service.entity';

@Entity()
export class OrderTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=> Order, order => order.tickets)
  order: Order;

  @ManyToOne(()=> Ticket)
  ticket: Ticket;

  @ManyToOne(()=> Service, {nullable: true})
  service: Service;

  @Column({type: 'jsonb', nullable: true})
  serviceDetails: any;

  // Добавляем выбранное место
  @Column({ nullable: true })
  selectedSeat: string;
}
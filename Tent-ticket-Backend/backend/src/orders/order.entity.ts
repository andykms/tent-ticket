import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderTicket } from './order-ticket.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=> User)
  user: User;

  @Column({type: "decimal", precision: 10, scale: 2})
  totalPrice: number;

  @Column({default: 'created'})
  status: 'created' | 'confirmed' | 'canceled';

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(()=> OrderTicket, orderTicker => orderTicker.order)
  tickets: OrderTicket[];
}
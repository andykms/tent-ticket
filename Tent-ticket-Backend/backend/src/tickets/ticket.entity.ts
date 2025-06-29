import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Airport} from '../airports/airport.entity';
import {Airline} from '../airlines/airline.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'timestamptz'})
  departureDate: Date;

  @Column({type: 'timestamptz'})
  arrivalDate: Date;

  @ManyToOne(()=> Airport)
  @JoinColumn()
  departureAirport: Airport;

  @ManyToOne(()=> Airport)
  @JoinColumn()
  arrivalAirport: Airport;

  @ManyToOne(()=> Airline)
  @JoinColumn()
  airline: Airline;

  @Column()
  aircraftModel: string;

  @Column()
  tariffName: string;

  @Column({type: 'jsonb'})
  handLuggage: {
    allowed: boolean;
    quantity?: number;
    dimensions?: string,
    weight?: number
  };

  @Column()
  checkedBaggage: boolean;

  @Column()
  isRefundable: boolean;

  @Column()
  isExchangeable: boolean;

  @Column()
  seatSelectionType: 'auto' | 'manual'

  @Column({type: 'decimal', precision: 10, scale: 2}) 
  price: number;
  // Добавляем информацию о местах
  @Column({ type: 'jsonb' })
  seats: {
    total: number;
    available: number;
    map: string[][]; // матрица мест: [['1A', '1B'], ['2A', '2B']]
  };
}
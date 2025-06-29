import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Ticket } from './ticket.entity';
import {FindTicketsDto} from './dto/find-tickets.dto';


@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>
  ) {}

  async searchTickets(FindTicketsDto: FindTicketsDto): Promise<Ticket[]> {
    const {departureCity, arrivalCity, departureDate} = FindTicketsDto;

    const startDate = new Date(departureDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(departureDate);
    endDate.setHours(23, 59, 59, 999);

    return this.ticketsRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.departureAirport', 'departureAirport')
      .leftJoinAndSelect('ticket.arrivalAirport', 'arrivalAirport')
      .leftJoinAndSelect('ticket.airline', 'airline')
      .where('departureAirport.city = :departureCity', {
        departureCity
      })
      .andWhere('arrivalAirport.city = :arrivalCity', {arrivalCity})
      .andWhere('ticket.departureDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate
      })
      .getMany();
  }

  async findOne(id: string): Promise<Ticket|null> {
    return this.ticketsRepository.findOne({
      where: {id},
      relations: ['departureAirport', 'arrivalAirport', 'airline']
    })
  }
}

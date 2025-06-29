import { Controller, Get, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { FindTicketsDto } from './dto/find-tickets.dto';
import { Ticket } from './ticket.entity';
import { Param } from '@nestjs/common';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get("search")
  searchTickets(@Query() FindTicketsDto: FindTicketsDto): Promise<Ticket[]> {
    return this.ticketsService.searchTickets(FindTicketsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ticket|null> {
    return this.ticketsService.findOne(id);
  }
}

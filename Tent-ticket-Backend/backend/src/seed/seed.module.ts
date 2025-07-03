import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from '../airports/airport.entity';
import { Airline } from '../airlines/airline.entity';
import { Ticket } from '../tickets/ticket.entity';
import { Service } from '../services/service.entity';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Airport,
      Airline,
      Ticket,
      Service
    ])
  ],
  providers: [SeedService],
  controllers: [SeedController]
})
export class SeedModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from '../airports/airport.entity';
import { Airline } from '../airlines/airline.entity';
import { Ticket } from '../tickets/ticket.entity';
import { Service } from '../services/service.entity';
import { AIRPORTS_SEED } from '../utils/seedData/airports';
import { AIRLINES_SEED } from '../utils/seedData/airlines';
import { generateSeatMap } from '../utils/Functions/generateSeatMap';
import { generateTickets } from '../utils/Functions/generateTickets';
import { SERVICE_SEED } from '../utils/seedData/service';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Airport)
    private airportRepository: Repository<Airport>,
    @InjectRepository(Airline)
    private airlineRepository: Repository<Airline>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async seedInitialData() {
    await this.seedAirports();
    await this.seedAirlines();
    await this.seedTickets();
    await this.seedServices();
    console.log('Initial data seeded successfully');
    return 'Initial data seeded successfully';
  }

  private async seedAirports() {
    // TODO: seed airports
    const airports = AIRPORTS_SEED;
    for (const airport of airports) {
      const exists = await this.airportRepository.findOne({
        where: {
          code: airport.code,
        },
      });
      if (!exists) {
        await this.airportRepository.save(
          this.airportRepository.create(airport),
        );
      }
    }
  }

  private async seedAirlines() {
    // TODO: seed airlines
    const airlines = AIRLINES_SEED;

    for (const airline of airlines) {
      const exists = await this.airlineRepository.findOne({
        where: {
          code: airline.code,
        },
      });
      if (!exists) {
        await this.airlineRepository.save(
          this.airlineRepository.create(airline),
        );
      }
    }
  }

  private async seedTickets() {
    // TODO: seed tickets
    const airports = await this.airportRepository.find();
    const airlines = await this.airlineRepository.find();
    const tickets = generateTickets(airports, airlines);
    for (const ticket of tickets) {
      const exists = await this.ticketRepository.findOne({
        where: {
          departureDate: ticket.departureDate,
          departureAirport: {
            id: ticket.departureAirport.id,
          },
          arrivalAirport: ticket.arrivalAirport,
        },
      });

      if (!exists) {
        await this.ticketRepository.save(this.ticketRepository.create(ticket));
      }
    }
  }

  private async seedServices() {
    // TODO: seed services
    const services = SERVICE_SEED;
    for (const service of services) {
      const exists = await this.serviceRepository.findOne({
        where: {
          name: service.name,
        },
      });
      if (!exists) {
        await this.serviceRepository.save(
          this.serviceRepository.create(service),
        );
      }
    }
  }
}

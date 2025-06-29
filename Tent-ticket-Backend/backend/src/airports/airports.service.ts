import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Airport } from './airport.entity';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airport)
    private airportsRepository: Repository<Airport>
  ) {}

  findAll(): Promise<Airport[]> {
    return this.airportsRepository.find();
  }

  findByCity(city: string): Promise<Airport[]> {
    return this.airportsRepository.find({
      where: {city}
    })
  }
}

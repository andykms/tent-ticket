import { Controller, Get, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { Airport } from './airport.entity';
import { Param } from '@nestjs/common';

@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @Get()
  findAll(): Promise<Airport[]> {
    return this.airportsService.findAll();
  }

  @Get('search')
  findByCity(@Query('city') city: string): Promise<Airport[]> {
    return this.airportsService.findByCity(city);
  }

  @Get(':code')
  findByCode(@Param('code') code: string): Promise<Airport|null> {
    return this.airportsService.findByCode(code);
  }
}

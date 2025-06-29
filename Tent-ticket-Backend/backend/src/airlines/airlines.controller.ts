import { Controller, Get } from '@nestjs/common';
import { AirlinesService } from './airlines.service';
import { Airline } from './airline.entity';

@Controller('airlines')
export class AirlinesController {
  constructor(
    private readonly airlinesService: AirlinesService
  ) {}

  @Get()
  findAll(): Promise<Airline[]> {
    return this.airlinesService.findAll();
  }
}

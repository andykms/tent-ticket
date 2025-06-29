import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from './airline.entity';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectRepository(Airline)
    private airlinesRepository: Repository<Airline>
  ) {}

  findAll(): Promise<Airline[]> {
    return this.airlinesRepository.find();
  }
}

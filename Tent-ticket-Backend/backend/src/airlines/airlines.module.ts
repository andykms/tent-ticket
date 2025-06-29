import { Module } from '@nestjs/common';
import { AirlinesService } from './airlines.service';
import { AirlinesController } from './airlines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from './airline.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Airline]), // Добавьте эту строку
    ],
  providers: [AirlinesService],
  controllers: [AirlinesController]
})
export class AirlinesModule {}

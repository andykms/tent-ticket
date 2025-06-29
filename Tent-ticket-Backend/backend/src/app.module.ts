import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {User} from './users/user.entity';
import {Airport} from './airports/airport.entity';
import {Airline} from './airlines/airline.entity';
import {Ticket} from './tickets/ticket.entity';
import {Service} from './services/service.entity';
import {Order} from './orders/order.entity';
import {OrderTicket} from './orders/order-ticket.entity';
import {UsersModule} from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { AirportsModule } from './airports/airports.module';
import { AirlinesModule } from './airlines/airlines.module';
import { ServicesModule } from './services/services.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Важно для глобального доступа
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '76911120',
      database: process.env.DB_DATABASE || 'tickets',
      entities: [
        User,
        Airport,
        Airline,
        Ticket,
        Service,
        Order,
        OrderTicket
      ],
      synchronize: true
    }),
    UsersModule,
    AirportsModule,
    AirlinesModule,
    TicketsModule,
    ServicesModule,
    OrdersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

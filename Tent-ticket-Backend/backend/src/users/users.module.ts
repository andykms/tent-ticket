import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Добавьте эту строку
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService] 
})
export class UsersModule {}

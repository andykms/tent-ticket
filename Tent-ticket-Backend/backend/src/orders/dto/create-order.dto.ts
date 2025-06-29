import { IsArray, IsNotEmpty, IsUUID, ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

class OrderTicketDto {
  @IsUUID()
  ticketId: string;
  
  @IsOptional()
  @IsUUID()
  serviceId?: string;

  @IsOptional()
  serviceDetails?: any;

  @IsOptional()
  @IsString()
  selectedSeat?: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> OrderTicketDto)
  tickets: OrderTicketDto[];
}
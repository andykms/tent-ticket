import { IsDateString, IsString } from "class-validator";

export class FindTicketsDto {
  @IsString()
  departureCity: string;

  @IsString()
  arrivalCity: string;

  @IsDateString()
  departureDate: string;
}
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Airline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  logoUrl: string;

  @Column({unique: true})
  code: string;
}
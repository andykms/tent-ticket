import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ unique: true })
  code: string; // IATA код (например, SVO, LED)
}
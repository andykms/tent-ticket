import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @Column({type: 'decimal',precision: 10, scale: 2})
  price: number;

  @Column({default: false})
  requiresDetails: boolean;
}
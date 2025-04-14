import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity({name: 'user_data'})
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn({type: 'integer'})
  id!: number;

  @AutoMap()
  @Column({type: 'text'})
  full_name!: string;

  @AutoMap()
  @Column({type: 'text'})
  role!: string;

  @AutoMap()
  @Column({type: 'integer'})
  efficiency!: number;
}

import { IsInt, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UserIdDto {
  @AutoMap()
  @IsNotEmpty()
  @IsInt()
  id!: number;
}

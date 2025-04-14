import { IsInt, IsNotEmpty } from 'class-validator';
import { UserCreateRequestDto } from './user-create-request.dto';
import { AutoMap } from '@automapper/classes';

export class UserReadDto extends UserCreateRequestDto {
  @AutoMap()
  @IsNotEmpty()
  @IsInt()
  id!: number;
}

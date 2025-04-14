import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UserCreateRequestDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  role!: string;

  @AutoMap()
  @IsInt()
  @IsNotEmpty()
  efficiency!: number;

}

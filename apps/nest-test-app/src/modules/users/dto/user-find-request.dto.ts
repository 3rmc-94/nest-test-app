import { IsInt, IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UserFindRequestDto {
  @AutoMap()
  @IsString()
  @IsOptional()
  full_name?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  role?: string;

  @AutoMap()
  @IsInt()
  @IsOptional()
  efficiency?: number;

}

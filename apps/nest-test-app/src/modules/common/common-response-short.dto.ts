import { AutoMap } from '@automapper/classes';

export class CommonResponseShortDto {
  @AutoMap()
  success!: boolean;
}

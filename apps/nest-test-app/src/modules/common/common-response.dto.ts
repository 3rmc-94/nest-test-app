import { AutoMap } from '@automapper/classes';
import { CommonResponseShortDto } from './common-response-short.dto';

export class CommonResponseDto<T> extends CommonResponseShortDto {
  @AutoMap()
  response!: T;
}

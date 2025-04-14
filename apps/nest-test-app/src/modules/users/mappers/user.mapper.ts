import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserCreateRequestDto } from '../dto/user-create-request.dto';
import { User } from '../entities/user.entity';
import { UserReadDto } from '../dto/user-read.dto';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { UserIdDto } from '../dto/user-id.dto';
import { UserPartialUpdateRequestDto } from '../dto/user-partial-update-request.dto';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, UserReadDto);
      createMap(mapper, UserCreateRequestDto, User, forMember((dest: User) => dest.id, ignore()));
      createMap(mapper, User, UserIdDto);
      createMap(mapper, User, UserPartialUpdateRequestDto);
    };
  }
}

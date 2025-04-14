import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { CommonResponseDto } from '../common/common-response.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UserReadDto } from './dto/user-read.dto';
import { UserFindRequestDto } from './dto/user-find-request.dto';
import { UserPartialUpdateRequestDto } from './dto/user-partial-update-request.dto';
import { CommonResponseShortDto } from '../common/common-response-short.dto';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('get')
  findAll(@Query() query: UserFindRequestDto): Promise<CommonResponseDto<{users: UserReadDto[]}>> {
    return this.usersService.findAll(query);
  }

  @Get('get/:id')
  findOne(@Param('id') id: number): Promise<CommonResponseDto<{users: UserReadDto[]}>> {
    return this.usersService.findOne(id);
  }

  @Post('create')
  create(@Body() user: UserCreateRequestDto): Promise<CommonResponseDto<UserIdDto>> {
    return this.usersService.create(user);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() user: UserPartialUpdateRequestDto): Promise<CommonResponseDto<UserReadDto>> {
    return this.usersService.update(id, user);
  }

  @Delete('delete')
  removeAll(): Promise<CommonResponseShortDto> {
    return this.usersService.removeAll();
  }

  @Delete('delete/:id')
  removeOne(@Param('id') id: number): Promise<CommonResponseShortDto> {
    return this.usersService.removeOne(id);
  }
}

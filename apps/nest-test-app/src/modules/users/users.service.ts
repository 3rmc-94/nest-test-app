import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserReadDto } from './dto/user-read.dto';
import { InjectMapper } from '@automapper/nestjs';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { Mapper } from '@automapper/core';
import { UserIdDto } from './dto/user-id.dto';
import { CommonResponseDto } from '../common/common-response.dto';
import { UserFindRequestDto } from './dto/user-find-request.dto';
import { UserPartialUpdateRequestDto } from './dto/user-partial-update-request.dto';
import { CommonResponseShortDto } from '../common/common-response-short.dto';
import { BaseService } from '../common/common.service';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectMapper() private readonly classMapper: Mapper,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {
    super(new Logger(UsersService.name));
  }

  async findAll(
    query: UserFindRequestDto
  ): Promise<CommonResponseDto<{ users: UserReadDto[] }>> {
    try {
      const users = this.classMapper.mapArray(
        await this.usersRepository.find({
          where: {
            role: query.role,
            full_name: query.full_name,
            efficiency: query.efficiency,
          },
        }),
        User,
        UserReadDto
      );

      return {
        success: true,
        response: {
          users,
        },
      };
    } catch (error) {
      return this.handleError('Failed to find users')(error);
    }
  }

  async findOne(
    id: number
  ): Promise<CommonResponseDto<{ users: UserReadDto[] }>> {
    try {
      const user = this.classMapper.map(
        await this.usersRepository.findOneBy({ id }),
        User,
        UserReadDto
      );

      return {
        success: true,
        response: {
          users: [user],
        },
      };
    } catch (error) {
      return this.handleError('Failed to find user')(error);
    }
  }

  async removeAll(): Promise<CommonResponseShortDto> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const count = await manager.count(User);

        if (count === 0) {
          throw new NotFoundException('No users to delete');
        }

        await manager.delete(User, {});

        return {
          success: true,
        };
      });
    } catch (error) {
      return this.handleError('Failed to remove users')(error);
    }
  }

  async removeOne(id: number): Promise<CommonResponseDto<UserReadDto>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const user = await manager.findOneBy(User, { id });

        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }

        await manager.delete(User, { id });

        const deletedUser = this.classMapper.map(user, User, UserReadDto);

        return {
          success: true,
          response: deletedUser,
        };
      });
    } catch (error) {
      return this.handleError('Failed to remove user')(error);
    }
  }

  async create(
    user: UserCreateRequestDto
  ): Promise<CommonResponseDto<UserIdDto>> {
    try {
      const entity = this.classMapper.map(user, UserCreateRequestDto, User);
      const savedUserId = this.classMapper.map(
        await this.usersRepository.save(entity),
        User,
        UserIdDto
      );

      return {
        success: true,
        response: savedUserId,
      };
    } catch (error) {
      return this.handleError('Failed to create user')(error);
    }
  }

  async update(
    id: number,
    user: UserPartialUpdateRequestDto
  ): Promise<CommonResponseDto<UserReadDto>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const updateResult = await manager.update(User, id, user);

        if (updateResult.affected === 0) {
          throw new NotFoundException(`User with id ${id} not found`);
        }

        const updatedUser = await manager.findOneBy(User, { id });

        const mapped = this.classMapper.map(updatedUser, User, UserReadDto);

        return {
          success: true,
          response: mapped,
        };
      });
    } catch (error) {
      return this.handleError('Failed to update user')(error);
    }
  }
}

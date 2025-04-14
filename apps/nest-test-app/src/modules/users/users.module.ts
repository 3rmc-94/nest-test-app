import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([User], )],
  providers: [UsersService, UserMapper],
  controllers: [UsersController],
})
export class UsersModule {}

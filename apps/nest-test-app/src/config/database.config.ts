import { ConfigService } from '@nestjs/config';
import { User } from '../modules/users/entities/user.entity';

export const databaseConfig = (configService: ConfigService) => ({
  type: configService.get<string>('DATABASE_TYPE') as 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: parseInt(configService.get<string>('DATABASE_PORT') ?? '3306'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [User],
  synchronize: configService.get<string>('MODE') === 'dev',
})

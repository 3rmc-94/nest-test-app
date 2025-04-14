import { HttpException, InternalServerErrorException, Logger } from '@nestjs/common';

export class BaseService {
  constructor(protected readonly logger: Logger) {}

  protected handleError(message: string): (error: unknown) => never {
    return (error: unknown) => {
      const msg =
        error instanceof Error ? error.message : String(error);
      const stack =
        error instanceof Error ? error.stack : undefined;

      this.logger.error(`${message}: ${msg}`, stack);

      if (error instanceof HttpException) {
        throw error; // проброс HTTP-ошибок
      }

      throw new InternalServerErrorException(message);
    };
  }
}

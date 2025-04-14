import { HttpException, InternalServerErrorException, Logger } from '@nestjs/common';

export function handleErrorWithLog(logger: Logger, message: string) {
  return (error: unknown) => {
    logger.error(`${message}: ${error instanceof Error ? error.message : error}`, error instanceof Error ? error.stack : '');
    if (error instanceof HttpException) throw error;
    throw new InternalServerErrorException(message);
  };
}

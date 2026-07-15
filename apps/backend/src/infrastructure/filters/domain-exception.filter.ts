import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import {
  AlreadyFollowedError,
  AuthenticationFailedError,
  EntityNotFoundError,
  ExternalServiceError,
} from '../../domain/exceptions/domain.errors';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  readonly #logger = new Logger(DomainExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    const status = this.#statusFor(exception);
    const message = exception instanceof Error ? exception.message : 'Erreur interne';
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.#logger.error(message, exception instanceof Error ? exception.stack : undefined);
    }
    response.status(status).json({ statusCode: status, message });
  }

  #statusFor(exception: unknown): number {
    if (exception instanceof EntityNotFoundError) return HttpStatus.NOT_FOUND;
    if (exception instanceof AlreadyFollowedError) return HttpStatus.CONFLICT;
    if (exception instanceof AuthenticationFailedError) return HttpStatus.UNAUTHORIZED;
    if (exception instanceof ExternalServiceError) return HttpStatus.BAD_GATEWAY;
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

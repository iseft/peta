import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { Response } from 'express';
import { Prisma } from '@db';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An error occurred';

    switch (exception.code) {
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        message = 'Resource already exists';
        break;
      }
      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        message = 'Resource not found';
        break;
      }
      case 'P2003': {
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid reference to related resource';
        break;
      }
      default: {
        this.logger.error(
          `Unhandled Prisma error: ${exception.code}`,
          exception,
        );
        Sentry.captureException(exception);
      }
    }

    response.status(status).json({ statusCode: status, message });
  }
}

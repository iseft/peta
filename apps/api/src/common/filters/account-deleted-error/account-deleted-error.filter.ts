import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountDeletedError } from '../../exceptions/account-deleted-error';

@Catch(AccountDeletedError)
export class AccountDeletedErrorFilter implements ExceptionFilter {
  catch(exception: AccountDeletedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(HttpStatus.GONE).json({
      statusCode: HttpStatus.GONE,
      message: exception.message,
      error: 'Gone',
    });
  }
}

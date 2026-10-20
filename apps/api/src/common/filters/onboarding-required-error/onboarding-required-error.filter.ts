import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { OnboardingRequiredError } from '../../exceptions/onboarding-required-error';

@Catch(OnboardingRequiredError)
export class OnboardingRequiredErrorFilter implements ExceptionFilter {
  catch(exception: OnboardingRequiredError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
      error: 'Onboarding Required',
    });
  }
}

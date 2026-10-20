import { INestApplication } from '@nestjs/common';
import express from 'express';
import helmet from 'helmet';
import { AccountDeletedErrorFilter } from './common/filters/account-deleted-error/account-deleted-error.filter';
import { ConflictErrorFilter } from './common/filters/conflict-error/conflict-error.filter';
import { NotFoundErrorFilter } from './common/filters/not-found-error/not-found-error.filter';
import { OnboardingRequiredErrorFilter } from './common/filters/onboarding-required-error/onboarding-required-error.filter';
import { ValidationErrorFilter } from './common/filters/validation-error/validation-error.filter';

// No CORS: the only client is the mobile app, which is not a browser origin.
export function setupApp(app: INestApplication): void {
  (app.getHttpAdapter().getInstance() as express.Application).set(
    'trust proxy',
    1,
  );
  app.use(helmet());
  app.use(express.json({ limit: '100kb' }));

  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new ValidationErrorFilter(),
    new ConflictErrorFilter(),
    new NotFoundErrorFilter(),
    new AccountDeletedErrorFilter(),
    new OnboardingRequiredErrorFilter(),
  );
}

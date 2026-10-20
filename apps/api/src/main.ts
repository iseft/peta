import './instrument';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './app-setup';
import { SentryForwardingLogger } from './observability/sentry-forwarding.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new SentryForwardingLogger(),
  });
  app.enableShutdownHooks();
  setupApp(app);

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}
void bootstrap();
